# Custom Server

Programmatically start a Next.js server for custom patterns, ejecting from the default `next start` server. Only needed when the built-in router can't meet app requirements.

## Signature / Usage

```ts filename="server.ts"
import { createServer } from 'http'
import next from 'next'

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res)
  }).listen(port)
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `conf` | `object` | Same shape as `next.config.js`; defaults to `{}` |
| `dev` | `boolean` | Launch in dev mode; defaults to `false` |
| `dir` | `string` | Project location; defaults to `'.'` |
| `quiet` | `boolean` | Hides server-info error messages |
| `hostname` / `port` | `string` / `number` | Server binding info |
| `httpServer` | `node:http#Server` | Existing HTTP server Next.js runs behind |
| `turbopack` / `webpack` | `boolean` | Bundler selection (Turbopack enabled by default) |

## Notes

- `server.js`/`server.ts` is **not** processed by the Next.js compiler/bundler — its syntax must be directly compatible with the running Node.js version.
- Standalone output mode does not trace custom server files (it emits its own minimal `server.js`) — the two cannot be used together.
- Update `package.json` scripts to run `node server.js` for both `dev` and `start` (with `NODE_ENV=production` for start).

## Related

- [Backend for Frontend](./backend-for-frontend.md)
