# Basic App

Minimal Hono application with text, JSON, and path parameter routes.

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

app.notFound((c) => c.text('Not Found', 404))

app.onError((err, c) => {
  console.error(err)
  return c.text('Internal Server Error', 500)
})

export default app
```

## Notes

- `export default app` works as-is on Cloudflare Workers, Bun, and Deno
- `c.req.param()` returns path parameters; `c.req.query()` returns query string values
- `notFound()` and `onError()` must be registered on the top-level app to take effect
