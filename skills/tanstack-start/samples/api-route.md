---
source: https://tanstack.com/start/latest/docs/framework/react/guide/server-routes
---

# API Route (server.handlers on createFileRoute)

A file route exposing a raw HTTP endpoint (GET/POST) instead of, or alongside, a UI `component`.

```ts
// src/routes/api/users.$id.ts
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/users/$id')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const user = await findUser(params.id)
        if (!user) {
          return new Response('User not found', { status: 404 })
        }
        return Response.json(user)
      },
      POST: async ({ request }) => {
        const body = await request.json()
        const user = await createUser(body)
        return Response.json(user, { status: 201 })
      },
    },
  },
})
```

## Notes

- Server routes are addressable HTTP endpoints callable by any client (`fetch`, curl, third-party) — distinct from `createServerFn()`, which generates RPC stubs for in-app calls only (see `server-function-crud.md`).
- Dynamic segments (`$id`) and splats (`$`) are available as `params.id` / `params._splat`.
- Handler-specific middleware requires the `({ createHandlers }) => createHandlers({...})` form instead of a plain object (see `auth-middleware.md`).
