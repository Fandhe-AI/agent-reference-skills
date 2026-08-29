---
source: https://tanstack.com/start/latest/docs/framework/react/guide/server-functions
---

# Server Functions

`createServerFn()` defines server-only logic that can be invoked from anywhere in a TanStack Start app — route loaders, components (via `useServerFn()`), hooks, or other server functions. TanStack Start applies CSRF protection automatically via `createCsrfMiddleware()` unless a custom `src/start.ts` disables it.

## Signature / Usage

```tsx
import { createServerFn } from '@tanstack/react-start'

export const getServerTime = createServerFn().handler(async () => {
  // This runs only on the server
  return new Date().toISOString()
})

// Call from anywhere - components, loaders, hooks, etc.
const time = await getServerTime()
```

```tsx
// GET request (default)
export const getData = createServerFn().handler(async () => {
  return { message: 'Hello from server!' }
})

// POST request
export const saveData = createServerFn({ method: 'POST' }).handler(async () => {
  return { success: true }
})
```

### Input validation

```tsx
import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

const UserSchema = z.object({
  name: z.string().min(1),
  age: z.number().min(0),
})

export const createUser = createServerFn({ method: 'POST' })
  .validator(UserSchema)
  .handler(async ({ data }) => {
    // data is fully typed and validated
    return `Created user: ${data.name}, age ${data.age}`
  })
```

### Errors, redirects, not-found

```tsx
import { createServerFn } from '@tanstack/react-start'
import { redirect } from '@tanstack/react-router'

export const requireAuth = createServerFn().handler(async () => {
  const user = await getCurrentUser()

  if (!user) {
    throw redirect({ to: '/login' })
  }

  return user
})
```

```tsx
import { createServerFn } from '@tanstack/react-start'
import { notFound } from '@tanstack/react-router'

export const getPost = createServerFn()
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const post = await db.findPost(data.id)

    if (!post) {
      throw notFound()
    }

    return post
  })
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `method` | `'GET' \| 'POST'` | HTTP method used for the underlying request. Defaults to `GET` |
| `strict` | `boolean \| { input?: boolean; output?: boolean }` | When `false` (fully or per-side), disables serialization type checks for input and/or output |

### Method chain

| Method | Description |
|--------|-------------|
| `.validator(schemaOrFn)` | Validates/transforms the input passed as `{ data }`. Accepts a plain function or a schema (e.g. Zod) |
| `.middleware([...])` | Applies middleware created with `createMiddleware()` before the handler runs |
| `.handler(fn)` | Server-only implementation. Receives `{ data }` (and `context` from middleware) |

## Notes

- Call server functions from route loaders, React components (via `useServerFn()`), other server functions, and event handlers.
- Organize larger apps as `*.functions.ts` (safe to import anywhere — wraps `createServerFn`), `*.server.ts` (server-only helpers), and shared `.ts` files for client-safe code.
- Errors thrown inside `.handler()` are serialized to the client and re-thrown on `catch`.
- Response headers/status can be set inside a handler with `setResponseHeaders()` / `setResponseStatus()` from `@tanstack/react-start/server`; `Cache-Control: public` must only be used for identity-independent responses — use `private` + `Vary` for per-user data.
- `generateFunctionId` in the `tanstackStart()` Vite/Rsbuild plugin (`serverFns.generateFunctionId`) customizes the ID used to identify a server function's RPC endpoint.
- This is distinct from Next.js Server Actions / Route Handlers and from `hono`'s router — `createServerFn` is TanStack Start's own RPC boundary, not a generic HTTP router (see `server-routes.md` for that).

## Related

- [Server Routes](./server-routes.md)
- [Middleware](./middleware.md)
- [Static Server Functions](./static-server-functions.md)
- [Streaming Data from Server Functions](./streaming-data-from-server-functions.md)
- [Execution Model](./execution-model.md)
