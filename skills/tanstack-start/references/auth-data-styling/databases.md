---
source: https://tanstack.com/start/latest/docs/framework/react/guide/databases
---

# Databases

TanStack Start works with any database provider — call the database's adapter/client/driver from a server function or server route.

## Signature / Usage

```tsx
import { createServerFn } from '@tanstack/react-start'

const db = createMyDatabaseClient()

export const getUser = createServerFn().handler(async ({ context }) => {
  const user = await db.getUser(context.userId)
  return user
})

export const createUser = createServerFn({ method: 'POST' }).handler(
  async ({ data }) => {
    const user = await db.createUser(data)
    return user
  },
)
```

## Recommended Providers

| Provider | Description |
|----------|-------------|
| [Neon](https://neon.tech) | Fully managed serverless Postgres; storage/compute separation, branching, autoscaling, bottomless storage, connection pooling |
| [Convex](https://convex.dev) | Serverless, real-time, transactional data backend; no manual server management |
| [Prisma Postgres](https://www.prisma.io) | Instant Postgres with edge-optimized routing, hosted web UI, auto-scaling, unikernel isolation |

## Notes

- Documentation for specific database integrations was not yet published as of this guide's writing; use examples and the general server function/server route pattern above.

## Related

- [Authentication Server Primitives](./authentication-server-primitives.md)
