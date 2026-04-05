# Middleware

How to write custom middleware in Hono. Middleware runs before and after handlers in a nested stack.

## Signature / Usage

Middleware must either call `await next()` and return nothing (to continue the chain), or return a `Response` to short-circuit.

```ts
app.use(async (c, next) => {
  // before handler
  await next()
  // after handler
})
```

## Inline Middleware

Define middleware directly in `app.use()` for one-off cases.

```ts
app.use('/message/*', async (c, next) => {
  await next()
  c.header('x-message', 'This is middleware!')
})
```

## Reusable Middleware with createMiddleware()

Use `createMiddleware()` from `hono/factory` to create typed, reusable middleware.

```ts
import { createMiddleware } from 'hono/factory'

const logger = createMiddleware(async (c, next) => {
  console.log(`[${c.req.method}] ${c.req.url}`)
  await next()
})
```

## Extending Context Variables

Pass typed data downstream using `c.set()`. Declare the variable type as a generic on `createMiddleware`.

```ts
import { createMiddleware } from 'hono/factory'

const echoMiddleware = createMiddleware<{
  Variables: {
    echo: (str: string) => string
  }
}>(async (c, next) => {
  c.set('echo', (str) => str)
  await next()
})

app.get('/echo', echoMiddleware, (c) => {
  return c.text(c.var.echo('Hello!'))
})
```

## Execution Order

Middleware executes in a nested stack. Code before `next()` runs on the way in; code after `next()` runs on the way out.

```
middleware 1 start
  middleware 2 start
    handler
  middleware 2 end
middleware 1 end
```

## Type Accumulation via Chaining

When chaining `.use()` calls, Hono accumulates `Variables` types automatically so all downstream handlers have access.

```ts
const app = new Hono()
  .use(authMiddleware)
  .use(dbMiddleware)
  .get('/', (c) => {
    const user = c.var.user // typed
    const db = c.var.db     // typed
    return c.json({ user })
  })
```

## Notes

- Do not wrap `next()` in try/catch — Hono catches errors from handlers and middleware automatically.
- Return a `Response` from middleware to short-circuit (e.g., for auth checks) without calling `next()`.

## Related

- [best-practices.md](./best-practices.md)
- [testing.md](./testing.md)
