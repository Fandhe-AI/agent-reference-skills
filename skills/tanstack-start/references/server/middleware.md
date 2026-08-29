---
source: https://tanstack.com/start/latest/docs/framework/react/guide/middleware
---

# Middleware

`createMiddleware()` customizes server behavior for requests, SSR, and server functions — composable, chainable logic such as authentication, logging, and security. Server function middleware (`{ type: 'function' }`) is a subset of request middleware with extra `.client()` / `.validator()` capabilities.

## Signature / Usage

```tsx
import { createMiddleware } from '@tanstack/react-start'

const loggingMiddleware = createMiddleware().server(() => {
  //...
})

const authMiddleware = createMiddleware()
  .middleware([loggingMiddleware])
  .server(() => {
    //...
  })
```

```tsx
const loggingMiddleware = createMiddleware().server(async ({ next }) => {
  const result = await next() // <-- executes the next middleware in the chain
  return result
})
```

### Server function middleware (client + server)

```tsx
const loggingMiddleware = createMiddleware({ type: 'function' })
  .client(() => {
    //...
  })
  .server(() => {
    //...
  })
```

### Validated middleware input

```tsx
import { createMiddleware } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { z } from 'zod'

const mySchema = z.object({ workspaceId: z.string() })

const workspaceMiddleware = createMiddleware({ type: 'function' })
  .validator(zodValidator(mySchema))
  .server(({ next, data }) => {
    console.log('Workspace ID:', data.workspaceId)
    return next()
  })
```

### Applying to a server function

```tsx
import { createServerFn } from '@tanstack/react-start'
import { loggingMiddleware } from './middleware'

const fn = createServerFn()
  .middleware([loggingMiddleware])
  .handler(async () => {
    //...
  })
```

### Applying to server routes

```tsx
export const Route = createFileRoute('/foo')({
  server: {
    middleware: [loggingMiddleware],
    handlers: {
      GET: () => {
        //...
      },
    },
  },
})
```

### Context (server → next, client → server)

```tsx
const requestLogger = createMiddleware({ type: 'function' })
  .client(async ({ next, context }) => {
    return next({
      sendContext: { workspaceId: context.workspaceId },
    })
  })
  .server(async ({ next, data, context }) => {
    console.log('Workspace ID:', context.workspaceId)
    return next()
  })
```

Untrusted client-sent context must be validated server-side before use:

```tsx
const requestLogger = createMiddleware({ type: 'function' })
  .client(async ({ next, context }) => {
    return next({ sendContext: { workspaceId: context.workspaceId } })
  })
  .middleware([authMiddleware]) // session loaded server-side, NOT from sendContext
  .server(async ({ next, context }) => {
    const workspaceId = z.string().uuid().parse(context.workspaceId)
    const member = await db.memberships.find({
      userId: context.session.userId,
      workspaceId,
    })
    if (!member) throw new Error('Not a member of this workspace')
    return next({ context: { workspaceId } })
  })
```

### Global middleware (`src/start.ts`)

```tsx
// src/start.ts
import { createStart, createMiddleware } from '@tanstack/react-start'

const myGlobalMiddleware = createMiddleware().server(() => {
  //...
})

export const startInstance = createStart(() => {
  return { requestMiddleware: [myGlobalMiddleware] }
})
```

```tsx
// src/start.ts
import { createStart, createCsrfMiddleware } from '@tanstack/react-start'

const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === 'serverFn',
})

export const startInstance = createStart(() => ({
  requestMiddleware: [csrfMiddleware],
}))
```

### Custom headers / fetch on the client side

```tsx
import { createMiddleware } from '@tanstack/react-start'
import type { CustomFetch } from '@tanstack/react-start'

const customFetchMiddleware = createMiddleware({ type: 'function' }).client(
  async ({ next }) => {
    const customFetch: CustomFetch = async (url, init) => {
      const response = await fetch(url, init)
      return response
    }
    return next({ fetch: customFetch })
  },
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `type` | `'function'` | Marks the middleware as server-function middleware, unlocking `.client()` and `.validator()` (in addition to `.server()`) |

### Method chain

| Method | Description |
|--------|-------------|
| `.middleware([...])` | Composes other middleware before this one in the chain |
| `.validator(schemaOrFn)` | Validates data passed into `.server()` as `data` (server-function middleware only) |
| `.client(fn)` | Client-side logic; receives `{ next, context }`, can call `next({ sendContext, headers, fetch })` |
| `.server(fn)` | Server-side logic; receives `{ next, context, data, request }`, must call `next()` to continue the chain (or `next({ context })` to add context for downstream middleware/handler) |

## Notes

- `next()` must be called to proceed; omitting it short-circuits the chain (early return).
- Headers set via `next({ headers })` merge across middleware layers; the call-site (`myServerFn({ headers })`) takes final precedence, and later middleware's `X-Source`-style duplicate keys override earlier ones.
- `next({ fetch: customFetch })` lets middleware supply a custom `fetch` implementation for retries/telemetry; a later middleware's `fetch` overrides an earlier one, and a call-site `fetch` overrides all middleware.
- Global function middleware is registered via `functionMiddleware` in `createStart()` (`src/start.ts`), separate from `requestMiddleware`.
- CSRF protection is automatic via `createCsrfMiddleware()` unless `src/start.ts` is customized, in which case it must be added explicitly to `requestMiddleware`; it can also be disabled with `disableCsrfMiddlewareWarning: true` in the `tanstackStart()` plugin's `serverFns` options.
- Middleware factories (e.g. `authorizationMiddleware(permissions)`) can be functions returning a `createMiddleware()` chain, enabling per-call parameterization.

## Related

- [Server Functions](./server-functions.md)
- [Server Routes](./server-routes.md)
- [Environment Functions](./environment-functions.md)
