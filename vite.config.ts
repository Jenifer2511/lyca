import { defineConfig, loadEnv, type Plugin, type Connect } from 'vite'
import react from '@vitejs/plugin-react'

function cms(): Plugin {
  const middleware: Connect.NextHandleFunction = async (req, res, next) => {
    const path = req.url?.split('?')[0]
    if (path !== '/api/cms') return next()
    try {
      // @ts-expect-error The same Node handler also runs independently on Vercel.
      const { default: handle } = await import('./api/cms.mjs')
      await handle(req, res)
    } catch (error) {
      next(error)
    }
  }
  return {
    name: 'lyca-local-api',
    configureServer(server) {
      server.middlewares.use(middleware)
    },
    configurePreviewServer(server) {
      process.env.LYCA_LOCAL_PREVIEW = '1'
      server.middlewares.use(middleware)
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  for (const key of ['DATABASE_URL', 'LYCA_SQLITE_PATH']) {
    if (env[key] && !process.env[key]) process.env[key] = env[key]
  }
  return {
    plugins: [react(), cms()],
    build: {
      rolldownOptions: {output: {codeSplitting: {groups: [
        {name: 'react-runtime', test: /node_modules[\\/](react|react-dom|react-router|scheduler)[\\/]/}
      ]}}}
    },
    server: {
      host: '127.0.0.1',
      port: 8443,
      fs: {
        deny: ['.env', '.env.*', '*.{crt,pem}', '**/.git/**', '**/.lyca/**'],
      },
    },
    preview: { host: '127.0.0.1', port: 8443 },
  }
})
