---
source: https://tanstack.com/start/latest/docs/framework/react/guide/authentication
---

# Authentication

Implementation patterns for DIY authentication in TanStack Start: server functions for login/logout/current-user, HTTP-only cookie sessions via `useSession`, an auth context, and `beforeLoad` route protection.

## Signature / Usage

```tsx
import { createServerFn } from '@tanstack/react-start'
import { redirect } from '@tanstack/react-router'

export const loginFn = createServerFn({ method: 'POST' })
  .validator((data: { email: string; password: string }) => data)
  .handler(async ({ data }) => {
    const user = await authenticateUser(data.email, data.password)
    if (!user) return { error: 'Invalid credentials' }

    const session = await useAppSession()
    await session.update({ userId: user.id, email: user.email })

    throw redirect({ to: '/dashboard' })
  })
```

## Session Management

```tsx
// utils/session.ts
import { useSession } from '@tanstack/react-start/server'

export function useAppSession() {
  return useSession<{ userId?: string; email?: string; role?: string }>({
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

## Route Protection

```tsx
// routes/_authed.tsx
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

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `name` | `string` | Session cookie name (`useSession`) |
| `password` | `string` | Session encryption secret, 32+ characters |
| `cookie.secure` | `boolean` | HTTPS-only in production |
| `cookie.sameSite` | `'lax' \| 'strict' \| 'none'` | CSRF mitigation |
| `cookie.httpOnly` | `boolean` | Blocks JS access (XSS protection) |

## Notes

- Protect the data/API boundary first: any server function/server route that returns or mutates private data must authorize the request itself; `beforeLoad` is for route UX, not the security boundary.
- Hosted alternatives mentioned here (Clerk, WorkOS, Better Auth, Auth.js) are compared in Authentication Overview; for Better Auth's own API, refer to the `better-auth` skill.
- `.validator((data: { email: string; password: string }) => data)` is a type annotation only, not runtime validation; production code should pass a Standard Schema (e.g. zod) to `.validator()` instead — see [Server Functions](../server/server-functions.md).

## Related

- [Authentication Overview](./authentication-overview.md)
- [Authentication Server Primitives](./authentication-server-primitives.md)
