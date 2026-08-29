---
source: https://tanstack.com/start/latest/docs/framework/react/guide/server-functions
---

# Server Function CRUD (createServerFn + .validator + .handler)

Read (`GET`) and write (`POST`) server functions with input validation, called from a route loader and a component.

```tsx
// src/server/users.ts
import { createServerFn } from '@tanstack/react-start'
import { notFound } from '@tanstack/react-router'
import { z } from 'zod'

const GetUserSchema = z.object({
  id: z.string().min(1),
})

const UserSchema = z.object({
  name: z.string().min(1),
  age: z.number().min(0),
})

export const getUser = createServerFn({ method: 'GET' })
  .validator(GetUserSchema)
  .handler(async ({ data }) => {
    const user = await db.findUser(data.id)
    if (!user) throw notFound()
    return user
  })

export const createUser = createServerFn({ method: 'POST' })
  .validator(UserSchema)
  .handler(async ({ data }) => {
    // data is fully typed and validated
    return db.createUser(data)
  })
```

```tsx
// src/routes/users.$id.tsx
import { createFileRoute } from '@tanstack/react-router'
import { getUser, createUser } from '../server/users'

export const Route = createFileRoute('/users/$id')({
  loader: ({ params }) => getUser({ data: { id: params.id } }),
  component: UserPage,
})

function UserPage() {
  const user = Route.useLoaderData()
  return (
    <button
      type="button"
      onClick={() => createUser({ data: { name: 'New User', age: 0 } })}
    >
      {user.name}
    </button>
  )
}
```

## Notes

- Validation is done with `.validator(schemaOrFn)`, not `.inputValidator()` — accepts a Zod schema or a plain function receiving raw input and returning parsed `data`. The upstream guide uses a type-only validator for `getUser` (`(data: { id: string }) => data`); this sample replaces it with the `zod` schema `GetUserSchema` for actual runtime validation.
- `.handler()` receives `{ data }` as the validated payload; `context` is added when `.middleware([...])` supplies it.
- `method: 'GET'` is the default and can be omitted; `method: 'POST'` is required for mutations.
- Throwing `notFound()` / `redirect({ to })` inside `.handler()` propagates to the router on the client.
