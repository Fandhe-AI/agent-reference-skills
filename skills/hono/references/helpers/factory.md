# Factory Helper

Create typed middleware and handlers outside of route definitions, sharing a common `Env` type.

## Signature / Usage

```ts
import { createFactory, createMiddleware } from 'hono/factory'

// Standalone middleware (no factory required)
const logger = createMiddleware(async (c, next) => {
  console.log(c.req.url)
  await next()
})

// Parameterized middleware factory pattern
const withMessage = (msg: string) =>
  createMiddleware(async (c, next) => {
    await next()
    c.res.headers.set('X-Message', msg)
  })

// Factory with shared Env type
type Env = { Variables: { user: User } }
const factory = createFactory<Env>({
  initApp: (app) => { /* configure app */ },
})

const handlers = factory.createHandlers(
  logger,
  async (c) => c.json({ ok: true })
)
app.get('/route', ...handlers)
```

## Options / Props

### `createFactory<Env>(options?)`

| Option | Type | Description |
|--------|------|-------------|
| `defaultAppOptions` | `HonoOptions` | Default options passed to created Hono instances |
| `initApp` | `(app: Hono) => void` | Callback to initialize each created app |

Returns a factory instance with `createHandlers()` and `createApp()` methods.

### `createMiddleware<Env>(handler)`

| Parameter | Type | Description |
|-----------|------|-------------|
| `handler` | `(c: Context, next: Next) => Promise<void>` | Middleware implementation |

Returns: typed middleware function.

### `factory.createHandlers(...middleware, handler)`

Accepts any number of middleware followed by a final handler. Returns an array that can be spread into route definitions.

## Notes

- Use `createFactory<Env>()` to avoid repeating the `Env` generic on every middleware and app declaration
- `createHandlers` helps define handlers in a separate file from route registration

## Related

- [Route Helper](./route.md)
- [Testing Helper](./testing.md)
