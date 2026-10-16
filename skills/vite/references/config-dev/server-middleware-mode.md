---
source: https://vite.dev/config/server-options#server-middlewaremode
---

# server.middlewareMode

Create the Vite server in middleware mode, to mount `vite.middlewares` inside another HTTP server.

## Signature / Usage

```js
import express from 'express'
import { createServer as createViteServer } from 'vite'

async function createServer() {
  const app = express()

  // Create Vite server in middleware mode
  const vite = await createViteServer({
    server: { middlewareMode: true },
    // don't include Vite's default HTML handling middlewares
    appType: 'custom',
  })
  // Use vite's connect instance as middleware
  app.use(vite.middlewares)

  app.use('*', async (req, res) => {
    // Since `appType` is `'custom'`, should serve response here.
    // Note: if `appType` is `'spa'` or `'mpa'`, Vite includes middlewares
    // to handle HTML requests and 404s so user middlewares should be added
    // before Vite's middlewares to take effect instead
  })
}

createServer()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `server.middlewareMode` | `boolean \| { server: http.Server }` | `false` | Create Vite server in middleware mode. If a proxy is set up for WebSocket, `server` should be provided to bind the proxy correctly |

## Notes

- This is Vite's own connect-based `vite.middlewares`. The HTTP server framework itself (routing, plugins, request handling) belongs to the fastify, hono, go-echo and fandhe-backend skills, not this skill.
- Related: `appType` (shared options) and "SSR - Setting Up the Dev Server" in the SSR guide.

## Related

- [server-proxy.md](./server-proxy.md)
- [server-hmr-ws.md](./server-hmr-ws.md)
