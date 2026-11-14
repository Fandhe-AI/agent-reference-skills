# Node.js

Run Hono on Node.js using `@hono/node-server`. Requires Node.js 18.14.1+, 19.7.0+, or 20.0.0+.

## Signature / Usage

```ts
import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()
app.get('/', (c) => c.text('Hello Node.js!'))

// serve(appOrOptions, callback?)
serve(app)
// or with options:
serve({ fetch: app.fetch, port: 8787 })
```

## Options / Props

| Parameter | Type | Description |
|-----------|------|-------------|
| `fetch` | `Function` | The app's fetch handler (`app.fetch`) |
| `port` | `number` | Port to listen on (default: `3000`) |
| `createServer` | `Function` | Custom server factory (e.g., `http2.createServer`) |
| `serverOptions` | `object` | Options passed to the server factory |
| `websocket` | `WebSocketServer` | A `ws.WebSocketServer` instance created with `{ noServer: true }` for WebSocket support |

## Notes

- Access Node.js-specific APIs via `c.env.incoming` (the raw `IncomingMessage`)
- Serve static files with `serveStatic` from `@hono/node-server/serve-static`; prefer `import.meta.url` for reliable path resolution
- HTTP/2 is supported by passing `createServer` / `createSecureServer` from `node:http2`
- Graceful shutdown: `serve()` returns a server instance; call `server.close()` on `SIGINT`/`SIGTERM`
- On Node.js, `serve()` wraps `node:http` and returns the underlying server instance, so closing it is up to you; Bun and Deno serve Fetch handlers natively and manage the server themselves, so their guides have no graceful-shutdown step
- Default dev port: `3000`
- WebSocket: `@hono/node-ws` is deprecated. Use `upgradeWebSocket` from `@hono/node-server` with the `websocket` serve option instead (requires `ws` package)
- Route matching is case-sensitive, but the file system may not be. On Windows and macOS, `/ADMIN/secret.txt` resolves to the same file as `/admin/secret.txt`, and Windows also accepts 8.3 short names such as `/PROTEC~1`. Path-scoped middleware such as `app.use('/admin/*', auth)` does not match those spellings, so do not rely on it to protect files under a static root. Keep protected files outside the directory you serve, or apply the middleware to every path that `serveStatic` handles.
- Since v4.13.14 `serveStatic` serves only GET and HEAD requests and respects q-values in `Accept-Encoding` for precompressed files; since v4.13.18 with `allowPercentInPath: true` the file path must equal the routed path, otherwise the response is 404.
- Source: https://hono.dev/docs/getting-started/nodejs (honojs/website@20aab4e0, retrieved 2026-11-14)
- Source: https://github.com/honojs/hono/releases/tag/v4.13.14
- Source: https://github.com/honojs/hono/releases/tag/v4.13.18

## Related

- [Basic](./basic.md)
- [Google Cloud Run](./google-cloud-run.md)
- [Next.js](./nextjs.md)
