# Hono App

The main application class. Provides routing, middleware registration, error handling, and execution entry points.

## Signature / Usage

```ts
import { Hono } from 'hono'

const app = new Hono()
const app = new Hono({ strict: false })
const app = new Hono({ router: new RegExpRouter() })
const app = new Hono<{ Bindings: Env; Variables: Vars }>()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `strict` | `boolean` | Distinguish `/hello` from `/hello/`. Default: `true` |
| `router` | `Router` | Override the router implementation (e.g. `RegExpRouter`, `TrieRouter`) |

## Methods

### HTTP routing methods

```ts
app.get(path, ...handlers)
app.post(path, ...handlers)
app.put(path, ...handlers)
app.delete(path, ...handlers)
app.patch(path, ...handlers)
app.all(path, ...handlers)
app.on(method | method[], path | path[], ...handlers)
```

All routing methods return the `Hono` instance (chainable).

```ts
app.get('/hello', (c) => c.text('Hello'))
app.on(['PUT', 'DELETE'], '/post/:id', (c) => c.text('Updated or deleted'))
```

### use()

Register global or path-scoped middleware.

```ts
app.use(middleware)
app.use(path, middleware)
```

### route()

Mount a sub-application under a path prefix.

```ts
const api = new Hono()
api.get('/users', (c) => c.json([]))

app.route('/api', api)  // → GET /api/users
```

### basePath()

Set an application-wide base path. Returns a new Hono instance.

```ts
const api = new Hono().basePath('/api')
api.get('/book', (c) => c.text('List'))  // → GET /api/book
```

### mount()

Mount an application built with another framework.

```ts
app.mount('/another-app', anotherFrameworkHandler)
```

### notFound()

Customize the 404 response. Only called from the top-level app.

```ts
app.notFound((c) => c.text('Custom 404', 404))
```

### onError()

Global error handler. Route-level handlers take priority over parent handlers.

```ts
app.onError((err, c) => {
  console.error(err)
  return c.text('Internal Server Error', 500)
})
```

### fetch()

The application entry point (Cloudflare Workers, Bun, Deno).

```ts
export default app
// or explicitly:
export default { fetch: app.fetch }
```

### request()

Send a test request. Useful in unit tests.

```ts
const res = await app.request('/hello')
const res = await app.request('http://localhost/hello', { method: 'POST' })
```

### showRoutes()

Print all registered routes to the console (for debugging).

```ts
app.showRoutes()
```

### routerName

Read-only property returning the name of the active router.

```ts
console.log(app.routerName)  // e.g. "SmartRouter"
```

### fire() (deprecated)

Automatically adds a global `fetch` event listener for Service Worker environments. Use `fire()` from `hono/service-worker` instead.

## Notes

- `strict: false` makes `/hello` and `/hello/` equivalent
- Generic type parameters `Bindings` and `Variables` enable type-safe `c.env` and `c.var` access
- `notFound()` and `onError()` are only effective when registered on the top-level app

## Related

- [context.md](./context.md)
- [request.md](./request.md)
- [routing.md](./routing.md)
