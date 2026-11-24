import { existsSync } from 'node:fs'
import { homedir } from 'node:os'
import { join, resolve } from 'node:path'
import { Pool } from 'pg'
import seed from './catalogue-seed.json' with { type: 'json' }

let pool
const original = {
  categories: seed.map(c => ({
    id:c.id, title:c.title, label:c.shortTitle, description:c.description,
    image:c.image, alt:c.imageAlt, note:c.note || '', version:1
  })),
  products: seed.flatMap(c => c.groups.flatMap((group,g) => group.items.map((title,i) => ({
    id:c.id+'-'+g+'-'+i, category:c.id, section:group.name, title,
    description:'', image:'', version:1
  })))),
  developments:[]
}

async function readPublished(work) {
  if (process.env.DATABASE_URL) {
    if (!pool) {
      pool = new Pool({connectionString:process.env.DATABASE_URL,max:3,connectionTimeoutMillis:10000,idleTimeoutMillis:15000})
      pool.on('error',()=>console.error('LYCA database connection closed unexpectedly'))
    }
    const client = await pool.connect()
    try {
      await client.query('BEGIN ISOLATION LEVEL REPEATABLE READ READ ONLY')
      const query = async (sql, params=[]) => (await client.query(sql,params)).rows
      const result = await work(query)
      await client.query('COMMIT')
      return result
    } catch(error) {
      await client.query('ROLLBACK').catch(()=>{})
      // Before the first admin sign-in, an empty database serves the original portfolio.
      if (error.code === '42P01' && /relation "lyca_(categories|media)" does not exist/.test(error.message)) return null
      throw error
    } finally { client.release() }
  }
  if (process.env.VERCEL || (process.env.NODE_ENV==='production' && !process.env.LYCA_LOCAL_PREVIEW))
    throw new Error('DATABASE_URL is required')
  const file = resolve(process.env.LYCA_SQLITE_PATH || join(homedir(),'.lyca-foods','catalogue.sqlite'))
  if (!existsSync(file)) return null
  const {DatabaseSync} = await import('node:sqlite')
  const db = new DatabaseSync(file,{readOnly:true})
  try {
    db.exec('PRAGMA busy_timeout=5000; BEGIN')
    const query = (sql,params=[])=>db.prepare(sql.replace(/\$1/g,'?')).all(...params)
    return await work(query)
  } catch(error) {
    if (/no such table: lyca_(categories|media)\b/.test(error.message)) return null
    throw error
  } finally { db.close() }
}

export async function catalogue() {
  const published = await readPublished(async q => ({
    categories:await q('SELECT id,title,label,description,image,alt,note,version FROM lyca_categories ORDER BY position,id'),
    products:await q('SELECT id,category,section,title,description,image,version FROM lyca_products ORDER BY position,id'),
    developments:await q('SELECT id,title,description,image,version FROM lyca_developments ORDER BY position DESC,id')
  }))
  return published || original
}

export async function imageBytes(id) {
  if (!/^[a-f0-9-]{36}$/.test(id || '')) return null
  const rows = await readPublished(q=>q('SELECT photo FROM lyca_media WHERE id=$1',[id]))
  return rows?.length ? Buffer.from(rows[0].photo,'base64') : null
}
