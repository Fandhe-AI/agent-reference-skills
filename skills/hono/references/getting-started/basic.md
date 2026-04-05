# Basic

Core concepts for building Hono applications. The same application code works across all supported runtimes; only the entry point and serve call differ.

## Signature / Usage

```ts
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.text('Hello Hono!'))
app.get('/api/hello', (c) => c.json({ ok: true, message: 'Hello Hono!' }))
app.get('/posts/:id', (c) => {
  const id = c.req.param('id')
  const page = c.req.query('page')
  return c.text(`post ${id}, page ${page}`)
})

export default app
```

## Options / Props

| Method | Description |
|--------|-------------|
| `c.text(str)` | Return plain text response |
| `c.json(obj)` | Return JSON response |
| `c.html(str)` | Return HTML response |
| `c.req.param(name)` | Get path parameter |
| `c.req.query(name)` | Get query string parameter |
| `c.header(name, value)` | Set response header |

## Notes

- The same application code runs on any supported runtime; only the entry point differs
- Built-in middleware includes JWT, Bearer auth, CORS, and ETag
- Use `app.use('/admin/*', middleware)` to apply middleware to route groups
- `upgradeWebSocket` is available from runtime-specific adapters (e.g., `hono/cloudflare-workers`)

## Related

- [Node.js](./nodejs.md)
- [Bun](./bun.md)
- [Deno](./deno.md)
- [Cloudflare Workers](./cloudflare-workers.md)
