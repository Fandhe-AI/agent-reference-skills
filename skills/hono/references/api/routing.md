# Routing

Hono's routing system supports HTTP method matching, path parameters, optional parameters, regular expression constraints, wildcards, chaining, grouping, and hostname-based routing.

## HTTP Methods

```ts
app.get('/', (c) => c.text('GET /'))
app.post('/', (c) => c.text('POST /'))
app.put('/post/:id', (c) => c.text('PUT'))
app.delete('/post/:id', (c) => c.text('DELETE'))
app.all('/hello', (c) => c.text('Any method'))
app.on('PURGE', '/cache', (c) => c.text('PURGE'))
app.on(['PUT', 'DELETE'], '/post/:id', (c) => c.text('PUT or DELETE'))
```

## Path Parameters

```ts
app.get('/user/:name', (c) => {
  const name = c.req.param('name')
  return c.text(name)
})

app.get('/posts/:id/comment/:commentId', (c) => {
  const { id, commentId } = c.req.param()
  return c.json({ id, commentId })
})
```

## Optional Parameters

Append `?` to make a segment optional.

```ts
app.get('/api/animal/:type?', (c) => c.text('Animal!'))
// matches both /api/animal and /api/animal/cat
```

## Regular Expression Constraints

```ts
app.get('/post/:date{[0-9]+}/:title{[a-z]+}', (c) => {
  const { date, title } = c.req.param()
  return c.json({ date, title })
})

app.get('/posts/:filename{.+\\.png}', (c) => c.text('PNG only'))
```

## Wildcards

```ts
app.get('/wild/*/card', (c) => c.text('Wildcard'))
app.get('*', (c) => c.text('Fallback'))  // catch-all; register last
```

Routes execute in registration order. A wildcard registered early will prevent later handlers from matching.

## Chained Routes

Define multiple HTTP methods on the same path without repeating the path string.

```ts
app
  .get('/endpoint', (c) => c.text('GET'))
  .post((c) => c.text('POST'))
  .delete((c) => c.text('DELETE'))
```

## Route Grouping

Create separate `Hono` instances and mount them with `app.route()`.

```ts
const book = new Hono()
book.get('/', (c) => c.json([]))       // → GET /book
book.get('/:id', (c) => c.json({}))   // → GET /book/:id
book.post('/', (c) => c.text('Created', 201))

const app = new Hono()
app.route('/book', book)
```

## Base Path

Prefix all routes in an instance with a common path.

```ts
const api = new Hono().basePath('/api')
api.get('/book', (c) => c.text('List'))  // → GET /api/book
```

## Hostname-Based Routing

Override the path extraction function to route by hostname.

```ts
const app = new Hono({
  getPath: (req) => req.url.replace(/^https?:\/([^?]+).*$/, '$1'),
})
app.get('/www1.example.com/hello', (c) => c.text('hello www1'))
app.get('/www2.example.com/hello', (c) => c.text('hello www2'))
```

## Notes

- Handlers and middleware execute in **registration order**
- First matching route wins; later handlers for the same path are skipped
- Middleware should be registered before route handlers
- Fallback / catch-all handlers should be registered last

## Related

- [hono.md](./hono.md)
- [request.md](./request.md)
