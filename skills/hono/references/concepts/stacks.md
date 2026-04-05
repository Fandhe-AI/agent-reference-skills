# Stacks

Hono Stacks is an integrated full-stack pattern combining Hono (API server), Zod (schema validation), Zod Validator Middleware, and the `hc` HTTP client to enable type-safe, end-to-end application development. "Hono makes easy things easy and hard things easy."

## Signature / Usage

```ts
// Server: define a type-safe route with Zod validation
import { z } from "zod"
import { zValidator } from "@hono/zod-validator"

const route = app.get(
  "/api/posts",
  zValidator("query", z.object({ page: z.string() })),
  (c) => {
    return c.json({ posts: [] })
  }
)

export type AppType = typeof route

// Client: infer types automatically via hc
import { hc } from "hono/client"
import type { AppType } from "./server"

const client = hc<AppType>("http://localhost:8787")
const res = await client.api.posts.$get({ query: { page: "1" } })
```

## Notes

- The `hc` client infers the full type of each endpoint from the exported app/route type — server-side changes are caught at compile time on the client
- All route methods must be **chained** (not split across statements) for type inference to work correctly
- The endpoint type must be derived from a **declared variable**, not an inline expression
- Integrates naturally with React Query and other client-side data fetching libraries for full-stack React applications
- Designed for serverless deployments (demonstrated on Cloudflare Pages)

## Related

- [Developer Experience](./developer-experience.md)
- [Middleware](./middleware.md)
