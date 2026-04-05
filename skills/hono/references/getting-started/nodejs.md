# Node.js

Run Hono on Node.js using `@hono/node-server`. Requires Node.js 18.14.1+, 19.7.0+, or 20.0.0+.

## Signature / Usage

```ts
import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()
app.get('/', (c) => c.text('Hello Node.js!'))

serve(app)
// or with options:
serve({ fetch: app.fetch, port: 8787 })
```

## Options / Props

`serve(appOrOptions, callback?)`

| Parameter | Type | Description |
|-----------|------|-------------|
| `fetch` | `Function` | The app's fetch handler (`app.fetch`) |
| `port` | `number` | Port to listen on (default: `3000`) |
| `createServer` | `Function` | Custom server factory (e.g., `http2.createServer`) |
| `serverOptions` | `object` | Options passed to the server factory |

## Notes

- Access Node.js-specific APIs via `c.env.incoming` (the raw `IncomingMessage`)
- Serve static files with `serveStatic` from `@hono/node-server/serve-static`; prefer `import.meta.url` for reliable path resolution
- HTTP/2 is supported by passing `createServer` / `createSecureServer` from `node:http2`
- Graceful shutdown: `serve()` returns a server instance; call `server.close()` on `SIGINT`/`SIGTERM`
- Default dev port: `3000`

## Related

- [Basic](./basic.md)
- [Google Cloud Run](./google-cloud-run.md)
- [Next.js](./nextjs.md)
