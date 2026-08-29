---
source: https://tanstack.com/start/latest/docs/framework/react/guide/server-routes
---

# Server Routes

Server routes let a file route respond to raw HTTP requests (`GET`/`POST`/etc.) via a `server.handlers` block on `createFileRoute()`, alongside or instead of a `component`. Unlike server functions (RPC, called via generated client stubs), server routes are addressable HTTP endpoints — the closest TanStack Start equivalent to a REST/API route handler.

## Signature / Usage

```ts
// routes/hello.ts
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/hello')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        return new Response('Hello, World!')
      },
    },
  },
})
```

### Simple handlers object

```ts
export const Route = createFileRoute('/hello')({
  server: {
    handlers: {
      GET: async ({ request }) => new Response('Hello, World! from ' + request.url),
      POST: async ({ request }) => {
        const body = await request.json()
        return new Response(`Hello, ${body.name}!`)
      },
    },
  },
})
```

### Handler-specific middleware via `createHandlers`

```tsx
export const Route = createFileRoute('/hello')({
  server: {
    handlers: ({ createHandlers }) =>
      createHandlers({
        GET: {
          middleware: [loggerMiddleware],
          handler: async ({ request }) => {
            return new Response('Hello, World! from ' + request.url)
          },
        },
      }),
  },
})
```

### Route-level + handler-specific middleware combined

```tsx
export const Route = createFileRoute('/hello')({
  server: {
    middleware: [authMiddleware], // Runs first for all handlers
    handlers: ({ createHandlers }) =>
      createHandlers({
        GET: async ({ request }) => new Response('Hello, World!'),
        POST: {
          middleware: [validationMiddleware], // Runs after authMiddleware, only for POST
          handler: async ({ request }) => {
            const body = await request.json()
            return new Response(`Hello, ${body.name}!`)
          },
        },
      }),
  },
})
```

### Dynamic path params / splat

```ts
// routes/users/$id.ts
export const Route = createFileRoute('/users/$id')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const { id } = params
        return new Response(`User ID: ${id}`)
      },
    },
  },
})
```

```ts
// routes/file/$.ts
export const Route = createFileRoute('/file/$')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const { _splat } = params
        return new Response(`File: ${_splat}`)
      },
    },
  },
})
```

### JSON responses

```ts
export const Route = createFileRoute('/hello')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        return Response.json({ message: 'Hello, World!' })
      },
    },
  },
})
```

### Status codes and headers

```ts
export const Route = createFileRoute('/hello')({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        const user = await findUser(params.id)
        if (!user) {
          return new Response('User not found', { status: 404 })
        }
        return Response.json(user)
      },
    },
  },
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `server.handlers` | `Record<Method, Handler> \| (({ createHandlers }) => Handlers)` | Per-HTTP-method request handlers, either as a plain object or built with the `createHandlers` factory (needed for handler-specific `middleware`) |
| `server.middleware` | `Array<Middleware>` | Middleware applied to all handlers on the route, running before any handler-specific middleware |

### Handler function argument

| Name | Type | Description |
|------|------|-------------|
| `request` | `Request` | The raw incoming `Request` |
| `params` | `Record<string, string>` | Dynamic path params; a trailing splat segment (`$`) is exposed as `_splat` |

## Notes

- File route conventions (unique paths, escaped matching, pathless layout routes, nested-directory vs file-name naming) follow the same rules as UI file routes.
- A single file route can define both `server.handlers` (API behavior) and `component` (UI) simultaneously.
- This is a distinct API from `createServerFn()` (`server-functions.md`) — server routes are plain HTTP endpoints callable by any client (`fetch`, curl, third-party), not RPC stubs generated for in-app calls.
- Not the same as Next.js Route Handlers or `hono`'s router, though conceptually similar — handler signature and middleware composition are TanStack Start-specific.

## Related

- [Server Functions](./server-functions.md)
- [Middleware](./middleware.md)
- [Routing](./routing.md)
