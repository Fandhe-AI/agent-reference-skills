---
source: https://tanstack.com/start/latest/docs/framework/react/guide/authentication
---

# Auth Middleware (createMiddleware + session)

Session-backed login server function, a middleware that loads the session into `context`, and route-level protection with `beforeLoad`.

```tsx
// src/utils/session.ts
import { useSession } from '@tanstack/react-start/server'

type SessionData = {
  userId?: string
  email?: string
}

export function useAppSession() {
  return useSession<SessionData>({
    name: 'app-session',
    password: process.env.SESSION_SECRET!, // at least 32 characters
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      httpOnly: true,
    },
  })
}
```

```tsx
// src/server/auth.ts
import { createServerFn, createMiddleware } from '@tanstack/react-start'
import { redirect } from '@tanstack/react-router'
import { z } from 'zod'
import { useAppSession } from '../utils/session'

const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
})

export const loginFn = createServerFn({ method: 'POST' })
  .validator(LoginSchema)
  .handler(async ({ data }) => {
    const user = await authenticateUser(data.email, data.password)
    if (!user) return { error: 'Invalid credentials' }

    const session = await useAppSession()
    await session.update({ userId: user.id, email: user.email })

    throw redirect({ to: '/dashboard' })
  })

// Loads the session into `context` for any server function that needs it
export const sessionMiddleware = createMiddleware({ type: 'function' }).server(
  async ({ next }) => {
    const session = await useAppSession()
    return next({ context: { session } })
  },
)

export const getCurrentUserFn = createServerFn({ method: 'GET' })
  .middleware([sessionMiddleware])
  .handler(async ({ context }) => {
    const userId = context.session.data.userId
    if (!userId) return null
    return db.findUser(userId)
  })
```

```tsx
// src/routes/_authed.tsx
import { createFileRoute, redirect } from '@tanstack/react-router'
import { getCurrentUserFn } from '../server/auth'

export const Route = createFileRoute('/_authed')({
  beforeLoad: async ({ location }) => {
    const user = await getCurrentUserFn()
    if (!user) {
      throw redirect({ to: '/login', search: { redirect: location.href } })
    }
    return { user }
  },
})
```

## Notes

- `session.data.userId` is how session state written by `session.update()` is read back on later requests — both go through the same `useSession()`-returned object.
- `beforeLoad` protects route UX only; every server function/server route that returns or mutates private data must authorize the request itself (the actual security boundary) — here `getCurrentUserFn`'s own `if (!userId) return null` check.
- Middleware created with `createMiddleware({ type: 'function' })` supports `.client()` / `.validator()` in addition to `.server()` (plain `createMiddleware()` request middleware only has `.server()`); calling `next({ context })` from `.server()` is what makes `session` available to the downstream `.handler()` via `context` — the middleware itself never redirects, only the route's `beforeLoad` does.
- The upstream guide uses a type-only validator (`(data: { email: string; password: string }) => data`); this sample replaces it with a `zod` schema (`LoginSchema`, using the top-level `z.email()` string-format validator) for actual runtime validation of the credentials payload.
