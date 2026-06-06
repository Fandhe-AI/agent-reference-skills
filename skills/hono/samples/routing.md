# Routing

Path parameters, optional segments, wildcards, chained routes, and modular route grouping.

```ts
import { Hono } from 'hono'

// --- Path parameters ---
const app = new Hono()

app.get('/user/:name', (c) => {
  const name = c.req.param('name')
  return c.text(name)
})

app.get('/posts/:id/comment/:commentId', (c) => {
  const { id, commentId } = c.req.param()
  return c.json({ id, commentId })
})

// Optional parameter
app.get('/api/animal/:type?', (c) => c.text('Animal!'))

// Regex constraint
app.get('/post/:date{[0-9]+}/:title{[a-z]+}', (c) => {
  const { date, title } = c.req.param()
  return c.json({ date, title })
})

// Wildcard catch-all (register last)
app.get('*', (c) => c.text('Fallback'))

// --- Chained routes on same path ---
app
  .get('/endpoint', (c) => c.text('GET'))
  .post((c) => c.text('POST'))
  .delete((c) => c.text('DELETE'))

// --- Modular route grouping ---
const book = new Hono()
book.get('/', (c) => c.json([]))
book.get('/:id', (c) => c.json({}))
book.post('/', (c) => c.text('Created', 201))

app.route('/book', book)
```

## Notes

- Routes execute in registration order; the first matching route wins
- Append `?` to a segment to make it optional (`/api/animal/:type?`)
- Use `app.route()` to mount sub-applications; this is the recommended pattern for large apps
- Register wildcard and fallback routes last to avoid shadowing more specific routes
