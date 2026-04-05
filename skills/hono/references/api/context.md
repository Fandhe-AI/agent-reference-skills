# Context

The `Context` object (`c`) is passed to every handler and middleware. It wraps the incoming request and provides helpers for building responses and managing request-scoped state.

## Signature / Usage

```ts
app.get('/hello', (c) => {
  const name = c.req.query('name')
  return c.json({ message: `Hello, ${name}` })
})
```

## Properties

| Name | Type | Description |
|------|------|-------------|
| `c.req` | `HonoRequest` | The incoming request wrapper |
| `c.res` | `Response` | The response that will be returned; can be mutated to set headers |
| `c.env` | `Bindings` | Runtime environment (Cloudflare Workers bindings, Deno env, etc.) |
| `c.event` | `FetchEvent` | Service Worker `FetchEvent` — not recommended, use `c.executionCtx` |
| `c.executionCtx` | `ExecutionContext` | Cloudflare Workers execution context (e.g. `waitUntil`) |
| `c.error` | `Error \| undefined` | Error thrown by a handler; accessible inside `onError` middleware |
| `c.var` | `Variables` | Proxy for typed access to values set with `c.set()` |

## Response Methods

### c.text()

Return a plain-text response (`Content-Type: text/plain`).

```ts
return c.text('Hello!')
return c.text('Created', 201)
```

### c.json()

Return a JSON response (`Content-Type: application/json`).

```ts
return c.json({ message: 'Hello!' })
return c.json({ error: 'Not found' }, 404)
```

### c.html()

Return an HTML response (`Content-Type: text/html`).

```ts
return c.html('<h1>Hello!</h1>')
```

### c.body()

Return a raw response with full control over status and headers.

```ts
return c.body('Thank you', 201, { 'X-Message': 'Hello!' })
```

Prefer `c.text()` / `c.html()` / `c.json()` for common content types.

### c.redirect()

Return a redirect response. Default status is `302`.

```ts
return c.redirect('/')
return c.redirect('/login', 301)
```

### c.notFound()

Return a 404 Not Found response.

```ts
return c.notFound()
```

## Response Modifier Methods

### c.status()

Set the HTTP status code for the next response helper call.

```ts
c.status(201)
return c.text('Created')
```

Default status is `200`.

### c.header()

Set a single response header.

```ts
c.header('X-Message', 'Hello')
c.header('Content-Type', 'application/octet-stream')
```

## Request-Scoped State

### c.set() / c.get()

Store and retrieve arbitrary values for the duration of a single request.

```ts
// In middleware:
c.set('user', { id: 1, name: 'Alice' })

// In handler:
const user = c.get('user')
```

Values are **not** shared across requests.

### c.var

Typed dot-notation access to values set via `c.set()`. Requires `Variables` type on the Hono instance.

```ts
const app = new Hono<{ Variables: { user: User } }>()
// ...
const user = c.var.user
```

## Rendering

### c.setRenderer()

Define a layout template in middleware for `c.render()`.

```ts
app.use((c, next) => {
  c.setRenderer((content) =>
    c.html(`<html><body>${content}</body></html>`)
  )
  return next()
})
```

### c.render()

Render content through the previously set renderer.

```ts
return c.render('<h1>Hello</h1>')
```

## Notes

- `c.res` mutations must happen before the response is sent; best done in middleware
- `c.event` (Service Worker syntax) is discouraged; prefer `c.executionCtx`
- `c.executionCtx.waitUntil()` defers async work beyond the response lifecycle

## Related

- [request.md](./request.md)
- [hono.md](./hono.md)
