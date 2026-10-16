---
source: https://tanstack.com/start/latest/docs/framework/react/guide/authentication
---

# Implement Authentication in React

Implementation patterns for DIY authentication in TanStack Start: server functions for login/logout/current-user, HTTP-only cookie sessions via iron-session, an auth context in the root route, and `beforeLoad` route protection. Start does not provide a session API.

## Signature / Usage

```tsx
import { createServerFn } from '@tanstack/react-start'
import { redirect } from '@tanstack/react-router'
import { getAppSession } from '~/utils/session'

export const loginFn = createServerFn({ method: 'POST' })
  .validator((data: { email: string; password: string }) => data)
  .handler(async ({ data }) => {
    const user = await authenticateUser(data.email, data.password)

    if (!user) {
      return { error: 'Invalid credentials' }
    }

    const session = await getAppSession()
    session.userId = user.id
    await session.save()

    throw redirect({ to: '/dashboard' })
  })

export const logoutFn = createServerFn({ method: 'POST' }).handler(async () => {
  const session = await getAppSession()
  session.destroy()
  throw redirect({ to: '/' })
})
```

## Session Management

```sh
pnpm add iron-session
```

```tsx
// utils/session.ts — import only from server code
import { getIronSession } from 'iron-session'
import { getCookie, setCookie } from '@tanstack/react-start/server'

type SessionData = {
  userId: string
  oauthState: string
}

export function getAppSession(ttl = 7 * 24 * 60 * 60) {
  const password = process.env.SESSION_SECRET
  if (!password || password.length < 32) {
    throw new Error('SESSION_SECRET must be at least 32 characters')
  }

  return getIronSession<SessionData>(
    { read: getCookie, write: setCookie },
    {
      cookieName: 'app-session',
      password,
      ttl,
      cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        httpOnly: true,
        path: '/',
      },
    },
  )
}
```

## Authentication Context

```tsx
// routes/__root.tsx (merge into your existing root route)
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { getCurrentUserFn } from '../server/auth'

export const Route = createRootRoute({
  headers: () => ({ 'Cache-Control': 'private, no-store' }),
  beforeLoad: async () => ({ user: await getCurrentUserFn() }),
  component: Outlet,
})
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

`getIronSession<SessionData>(cookieAdapter, options)` (iron-session 9, as used in the guide):

| Name | Type | Description |
|------|------|-------------|
| `cookieAdapter` | `{ read, write }` | `{ read: getCookie, write: setCookie }` from `@tanstack/react-start/server` |
| `cookieName` | `string` | Session cookie name |
| `password` | `string` | Encryption secret; the guide requires 32+ characters |
| `ttl` | `number` (seconds) | Server-validated lifetime of the sealed credential from its latest save; saving again renews it |
| `cookieOptions.secure` | `boolean` | HTTPS-only (set `true` on HTTPS deployments) |
| `cookieOptions.sameSite` | `'lax' \| 'strict' \| 'none'` | CSRF mitigation |
| `cookieOptions.httpOnly` | `boolean` | Blocks JS access (XSS protection) |
| `cookieOptions.path` | `string` | Cookie path (`'/'` in the guide) |
| `cookieOptions.maxAge` | `number` | Browser retention. In iron-session 9, explicitly setting `maxAge: undefined` also disables seal expiry; omit the property to use `ttl` |

## Notes

- `useSession` from `@tanstack/react-start/server` was removed in 1.169. The new session library cannot read existing Start session cookies: use a new cookie name and sign users in again, or test a migration that reads the old cookies first.
- iron-session 9's Node runtime requires Node 22.13 or newer. Read fields directly from the returned session, then `await session.save()` before returning or redirecting; `session.destroy()` removes the cookie. Keep one session object per operation (another `getAppSession()` call re-reads the incoming request).
- `useServerFn` returns a callable function, not an object with `data`, `isLoading`, or `refetch`; a server function can also be called directly from `beforeLoad`. After login or logout, call `await router.invalidate()` to reload the user and rerun route guards.
- The root route carries session-specific data, so use `Cache-Control: private, no-store` and do not override it with public CDN caching.
- Protect the data/API boundary first: any server function/server route that returns or mutates private data must authorize the request itself; `beforeLoad` is for route UX, not the security boundary.
- Hosted alternatives mentioned here (Clerk, WorkOS, Better Auth, Auth.js) are compared in Authentication Overview; for Better Auth's own API, refer to the `better-auth` skill.
- `.validator((data: { email: string; password: string }) => data)` is a type annotation only, not runtime validation; production code should pass a Standard Schema (e.g. zod) to `.validator()` instead — see [Server Functions](../server/server-functions.md).

## Related

- [Authentication Overview](./authentication-overview.md)
- [Authentication Server Primitives](./authentication-server-primitives.md)
