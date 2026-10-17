---
source: https://vite.dev/guide/api-javascript#createserver
---

# createServer

Creates a Vite dev server programmatically and returns a `ViteDevServer`.

## Signature / Usage

```ts
async function createServer(inlineConfig?: InlineConfig): Promise<ViteDevServer>
```

```ts
import { createServer } from 'vite'

const server = await createServer({
  // any valid user config options, plus `mode` and `configFile`
  configFile: false,
  root: import.meta.dirname,
  server: {
    port: 1337,
  },
})
await server.listen()

server.printUrls()
server.bindCLIShortcuts({ print: true })
```

Middleware mode combined with a WebSocket proxy: provide the parent http server in `middlewareMode`.

```ts
import http from 'http'
import { createServer } from 'vite'

const parentServer = http.createServer() // or express, koa, etc.

const vite = await createServer({
  server: {
    // Enable middleware mode
    middlewareMode: {
      // Provide the parent http server for proxy WebSocket
      server: parentServer,
    },
    proxy: {
      '/ws': {
        target: 'ws://localhost:3000',
        // Proxying WebSocket
        ws: true,
      },
    },
  },
})

parentServer.on('request', vite.middlewares)
```

## Notes

- When using `createServer` and `build` in the same Node.js process, both rely on `process.env.NODE_ENV`, which also depends on the `mode` config option. To prevent conflicting behavior, set `process.env.NODE_ENV` or the `mode` of the two APIs to `development`. Otherwise, spawn a child process to run the APIs separately.
- When using middleware mode with a WebSocket proxy config, the parent http server must be provided in `middlewareMode` so the proxy binds correctly.
- The upstream v8.3.4 snippet calls `parentServer.use(vite.middlewares)` (with a `@noErrors: 2339` directive), which only works when the parent is a Connect/Express/Koa app; with a bare `http.Server` attach the middlewares via `parentServer.on('request', vite.middlewares)`.
- `middlewares` on the returned server is a Connect instance. HTTP server frameworks themselves (express, etc.) are separate; see the fastify, hono, go-echo, fandhe-backend skills.

## Related

- [InlineConfig / ResolvedConfig](./inline-resolved-config.md)
- [ViteDevServer](./vite-dev-server.md)
- [build](./build.md)
- [server.middlewareMode](../config-dev/server-middleware-mode.md)
- [server.proxy](../config-dev/server-proxy.md)
