---
source: https://tanstack.com/start/latest/docs/framework/react/guide/authentication-server-primitives
---

# Auth Middleware (createMiddleware + session cookie)

Cookie-based session helpers, a `createMiddleware` that loads the session into `context`, a login server function, and route-level protection with `beforeLoad`.

```ts
// src/server/session.ts
import {
  deleteCookie,
  getCookie,
  setCookie,
} from '@tanstack/react-start/server'

const SESSION_COOKIE = '__Host-session'
const ONE_DAY = 60 * 60 * 24

const sessionCookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'lax',
  path: '/',
} as const

export function setSessionCookie(token: string) {
  setCookie(SESSION_COOKIE, token, {
    ...sessionCookieOptions,
    maxAge: ONE_DAY,
  })
}

export function clearSessionCookie() {
  deleteCookie(SESSION_COOKIE, sessionCookieOptions)
}

export function readSessionToken(): string | null {
  return getCookie(SESSION_COOKIE) ?? null
}
```

```ts
// src/server/auth-middleware.ts
import { createMiddleware } from '@tanstack/react-start'
import { readSessionToken } from './session'

export const authMiddleware = createMiddleware({ type: 'function' }).server(
  async ({ next }) => {
    const token = readSessionToken()
    const session = token ? await db.sessions.findValid(token) : null
    if (!session) throw new Error('Unauthorized')
    return next({ context: { session } })
  },
)
```

```ts
// src/server/login.functions.ts
import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { setSessionCookie } from './session'

export const login = createServerFn({ method: 'POST' })
  .validator(z.object({ email: z.string().email(), password: z.string() }))
  .handler(async ({ data }) => {
    const user = await db.users.findByEmail(data.email)
    // Always run verifyPasswordHash — even when the user doesn't exist —
    // so the user-not-found branch takes the same time as wrong-password.
    const hashToCheck = user?.passwordHash ?? DUMMY_PASSWORD_HASH
    const passwordMatches = await verifyPasswordHash(hashToCheck, data.password)
    const ok = user != null && passwordMatches
    if (!ok) throw new Error('Invalid email or password')

    // Rotate: destroy any existing session, then issue fresh.
    await db.sessions.revokeAllForUser(user.id)
    const token = await db.sessions.create({ userId: user.id })
    setSessionCookie(token)
    return { ok: true }
  })
```

```ts
import { createServerFn } from '@tanstack/react-start'
import { authMiddleware } from '~/server/auth-middleware'

export const getMyOrders = createServerFn({ method: 'GET' })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    return db.orders.findMany({ where: { userId: context.session.userId } })
  })
```

Library-based alternative (iron-session, from the official `start-basic-auth` example `src/utils/session.ts`; `useSession` was removed in 1.169):

```ts
// src/utils/session.ts — import only from server code
import { getIronSession } from 'iron-session'
import { getCookie, setCookie } from '@tanstack/react-start/server'
import type { User } from '@prisma/client'

type SessionUser = {
  userEmail: User['email']
}

export function getAppSession() {
  const password = process.env.SESSION_PASSWORD
  if (!password || password.length < 32) {
    throw new Error('Set SESSION_PASSWORD to at least 32 characters')
  }

  return getIronSession<SessionUser>(
    { read: getCookie, write: setCookie },
    {
      cookieName: 'app-session',
      password,
      ttl: 7 * 24 * 60 * 60,
      cookieOptions: {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      },
    },
  )
}
```

Write with `session.userId = user.id; await session.save()` (field names follow your `SessionData` type) and clear with `session.destroy()`.

```tsx
// routes/_authed.tsx - Layout route for protected pages
import { createFileRoute, redirect } from '@tanstack/react-router'
import { getCurrentUserFn } from '../server/auth'

export const Route = createFileRoute('/_authed')({
  beforeLoad: async ({ location }) => {
    const user = await getCurrentUserFn()

    if (!user) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href },
      })
    }

    // Pass user to child routes
    return { user }
  },
})
```

## Notes

- Start does not provide a session API; `useSession` from `@tanstack/react-start/server` is no longer used here. Sessions are your own cookie (opaque session ID looked up in a database, shown above) or a library such as iron-session (see the authentication guide's `getAppSession` example). `db`, `verifyPasswordHash`, `DUMMY_PASSWORD_HASH`, and `getCurrentUserFn` are application-owned placeholders, as in the guide.
- `beforeLoad` protects route UX only; every server function/server route that returns or mutates private data must authorize the request itself — here `authMiddleware` throws when there is no valid session (the actual security boundary).
- Write cookies with `setCookie`, not `setResponseHeader('Set-Cookie', ...)`, which replaces every cookie on the outgoing response.
- The upstream authentication guide validates login input with a type-only validator; this sample uses a `zod` schema for runtime validation. Read cookies and env (`process.env`) inside the request, not at module scope.
