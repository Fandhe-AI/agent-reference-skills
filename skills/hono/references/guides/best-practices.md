# Best Practices

Recommended patterns for building maintainable, type-safe Hono applications.

## Don't Separate Handlers into Controller Files

Avoid Rails-style controllers that separate handlers from route definitions. Path parameter types cannot be inferred without complex generics.

```ts
// Not recommended
const bookListHandler = (c: Context) => {
  return c.json('list books')
}
app.get('/books', bookListHandler)
```

## Inline Handler (Recommended)

Define handlers inline with route definitions to preserve TypeScript type inference.

```ts
app.get('/books/:id', (c) => {
  const id = c.req.param('id') // correctly typed
  return c.json(`get ${id}`)
})
```

## Factory Pattern for Controller-Style Organization

Use `createFactory()` from `hono/factory` when you want to separate handlers while retaining type safety and middleware composition.

```ts
import { createFactory } from 'hono/factory'

const factory = createFactory()

const middleware = factory.createMiddleware(async (c, next) => {
  c.set('foo', 'bar')
  await next()
})

const handlers = factory.createHandlers(logger(), middleware, (c) => {
  return c.json(c.var.foo)
})

app.get('/api', ...handlers)
```

## Modular Applications with app.route()

Split large apps into sub-applications mounted at specific paths.

```ts
// books.ts
const app = new Hono()
app.get('/', (c) => c.json('list books'))
app.post('/', (c) => c.json('created', 201))
export default app
```

```ts
// index.ts
import books from './books'
import authors from './authors'

app.route('/books', books)
app.route('/authors', authors)
```

## RPC-Compatible Route Chaining

Chain route definitions and export the app type for full end-to-end type inference with the RPC client.

```ts
const app = new Hono()
  .get('/', (c) => c.json('list'))
  .post('/', (c) => c.json('created', 201))
  .get('/:id', (c) => c.json(`get ${c.req.param('id')}`))

export type AppType = typeof app
```

## Notes

- Inline handlers are the simplest path to correct type inference for path parameters.
- `createFactory()` is the escape hatch when file organization requires separation.
- Chaining + `export type AppType` is required for RPC type sharing.

## Related

- [rpc.md](./rpc.md)
- [middleware.md](./middleware.md)
