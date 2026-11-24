import { catalogue, imageBytes } from '../server/published.mjs'

export default async function handler(req,res) {
  res.setHeader('Cache-Control','no-store')
  res.setHeader('X-Content-Type-Options','nosniff')
  res.setHeader('Content-Type','application/json; charset=utf-8')
  const fail = (status,error) => { res.statusCode=status; res.end(JSON.stringify({error})) }
  if (req.method!=='GET') {
    res.setHeader('Allow','GET')
    return fail(405,'Method not allowed.')
  }
  try {
    const params = new URL(req.url,'http://localhost').searchParams
    if (params.get('action')==='catalogue') return res.end(JSON.stringify(await catalogue()))
    if (params.get('action')==='image') {
      const bytes = await imageBytes(params.get('id'))
      if (!bytes) return fail(404,'Photo not found.')
      res.setHeader('Content-Type','image/webp')
      res.setHeader('Cache-Control','public, max-age=31536000, immutable')
      return res.end(bytes)
    }
    return fail(404,'Endpoint not found.')
  } catch(error) {
    console.error('LYCA public catalogue read failed',error.code || error.name)
    return fail(503,'The catalogue is temporarily unavailable.')
  }
}
