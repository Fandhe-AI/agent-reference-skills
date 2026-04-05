# Testing Helper

Create a type-safe RPC client from a Hono app for use in tests — no running server required.

## Signature / Usage

```ts
import { testClient } from 'hono/testing'

const app = new Hono().get('/search', (c) => {
  return c.json({ results: [] })
})

const client = testClient(app)

const res = await client.search.$get({ query: { q: 'hono' } })
const data = await res.json()
```

With auth headers:

```ts
const res = await client.search.$get(
  { query: { q: 'hono' } },
  { headers: { Authorization: `Bearer ${token}` } }
)
```

## Options / Props

### `testClient(app)`

| Parameter | Type | Description |
|-----------|------|-------------|
| `app` | `Hono` | Application instance with routes defined via chained methods |

Returns: typed client object matching the app's route definitions.

### Client method call signature

```ts
client[routePath].$[method](params?, requestInit?)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `params` | object | Route params, query, form, json body depending on route definition |
| `requestInit` | `RequestInit & { headers?: ... }` | Optional fetch init (headers, etc.) |

Returns: `Promise<Response>`

## Notes

- Routes **must** be defined using chained methods directly on the `Hono` instance for type inference to work: `new Hono().get(...)`, not `app.get(...)` after separate instantiation
- Response data is accessed via `await res.json()` or `res.status`
- No HTTP server is started; requests are handled in-process

## Related

- [Factory Helper](./factory.md)
