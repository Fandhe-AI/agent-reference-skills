# RPC

Type-safe client-server communication by sharing API specifications through TypeScript types.

## Server Setup

Define routes with validators, chain the definitions, and export the app type.

```ts
import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import * as z from 'zod'

const app = new Hono()
  .post(
    '/posts',
    zValidator('form', z.object({ title: z.string(), body: z.string() })),
    (c) => {
      return c.json({ ok: true, message: 'Created!' }, 201)
    }
  )

export type AppType = typeof app
```

## Client Setup

```ts
import type { AppType } from './server'
import { hc } from 'hono/client'

const client = hc<AppType>('http://localhost:8787/')

const res = await client.posts.$post({
  form: { title: 'Hello', body: 'Hono is cool' },
})

if (res.ok) {
  const data = await res.json() // typed
}
```

## Path Parameters and Query Strings

Path params and query values must be passed as strings.

```ts
const res = await client.posts[':id'].$get({
  param: { id: '123' },
  query: { page: '1' },
})
```

## Custom Headers and Fetch Options

```ts
const res = await client.search.$get(
  { query: { q: 'hono' } },
  { headers: { 'X-Custom-Header': 'value' } }
)
```

## Utility Types

| Export | Description |
|--------|-------------|
| `InferRequestType` | Extract request type from a client method |
| `InferResponseType` | Extract response type from a client method |
| `parseResponse()` | Type-safe response parsing with Content-Type handling |
| `ApplyGlobalResponse` | Merge global error handler response types into all routes |

```ts
import { InferRequestType, InferResponseType } from 'hono/client'

type PostRequest = InferRequestType<typeof client.posts.$post>
type PostResponse = InferResponseType<typeof client.posts.$post, 201>
```

### `ApplyGlobalResponse`

The RPC client does not automatically infer response types from global error handlers (`app.onError`). `ApplyGlobalResponse` merges those error types into all routes.

```ts
import type { ApplyGlobalResponse } from 'hono/client'

type AppType = ApplyGlobalResponse<typeof app, { 500: { json: { message: string } } }>
const client = hc<AppType>('http://localhost:8787/')
```

## Custom Fetch and Query Serialization

```ts
// Custom fetch (e.g., Cloudflare Service Bindings)
const client = hc<AppType>('/', { fetch: env.ANOTHER_SERVICE.fetch.bind(env.ANOTHER_SERVICE) })

// Custom query serialization (e.g., bracket notation for arrays)
const client = hc<AppType>('/', {
  buildSearchParams(record) {
    const params = new URLSearchParams()
    for (const [k, v] of Object.entries(record)) {
      if (Array.isArray(v)) v.forEach((val) => params.append(`${k}[]`, val))
      else params.set(k, String(v))
    }
    return params
  },
})
```

## URL Helpers

```ts
client.posts.$url()   // URL object (requires absolute base URL)
client.posts.$path()  // path string only
```

## File Uploads

```ts
const res = await client.user.picture.$put({
  form: { file: new File([blob], 'photo.jpg', { type: 'image/jpeg' }) },
})
```

## Notes

- Set `"strict": true` in `tsconfig.json` on both server and client (critical in monorepos).
- Use `c.json({ ... }, 404)` instead of `c.notFound()` — `notFound()` breaks type inference.
- Status codes explicitly specified in handlers are part of the type system; use them for precise response handling.
- Large apps may slow down the IDE. Mitigations: compile types at build time, use TypeScript project references, or split the app.
- Route chaining (`.get().post()...`) on a single `app` instance is required for RPC types to work correctly.

## Related

- [best-practices.md](./best-practices.md)
- [validation.md](./validation.md)
- [testing.md](./testing.md)
