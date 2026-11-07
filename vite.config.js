import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

/**
 * Só no `npm run dev`: executa as funções da pasta `api/` (que na Vercel viram serverless),
 * para o chat de suporte funcionar localmente sem a Vercel CLI. Lê GEMINI_* do `.env.local`.
 */
function devApiFunctions(env) {
  return {
    name: 'cuida-dev-api-functions',
    apply: 'serve',
    configureServer(server) {
      for (const key of ['GEMINI_API_KEY', 'GEMINI_MODEL']) {
        if (env[key] && !process.env[key]) process.env[key] = env[key]
      }

      server.middlewares.use('/api/chat', async (req, res) => {
        try {
          const handlers = await server.ssrLoadModule('/api/chat.js')
          const handler = handlers[req.method]
          if (typeof handler !== 'function') {
            res.statusCode = 405
            res.end()
            return
          }

          const chunks = []
          for await (const chunk of req) chunks.push(chunk)
          const headers = new Headers()
          for (const [name, value] of Object.entries(req.headers)) {
            if (value !== undefined) headers.set(name, Array.isArray(value) ? value.join(', ') : value)
          }
          headers.set('x-forwarded-for', req.socket.remoteAddress ?? 'local')

          const request = new Request(`http://${req.headers.host}${req.originalUrl}`, {
            method: req.method,
            headers,
            body: chunks.length > 0 ? Buffer.concat(chunks) : undefined,
          })
          const response = await handler(request)

          res.statusCode = response.status
          response.headers.forEach((value, name) => res.setHeader(name, value))
          res.end(Buffer.from(await response.arrayBuffer()))
        } catch (error) {
          server.config.logger.error(`[api/chat] ${error.stack ?? error}`)
          res.statusCode = 500
          res.end()
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'GEMINI_')

  return {
    plugins: [react(), tailwindcss(), devApiFunctions(env)],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: 5174,
      strictPort: true,
    },
  }
})
