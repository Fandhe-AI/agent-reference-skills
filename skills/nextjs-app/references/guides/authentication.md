# Authentication

Implementing authentication in Next.js breaks down into three concepts: Authentication (verify identity), Session Management (track auth state across requests), and Authorization (control access to routes/data).

## Signature / Usage

```tsx filename="app/ui/signup-form.tsx"
'use client'
import { useActionState } from 'react'
import { signup } from '@/app/actions/auth'

export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined)
  return (
    <form action={action}>
      <input name="email" />
      <input name="password" type="password" />
      <button disabled={pending} type="submit">Sign Up</button>
    </form>
  )
}
```

```ts filename="app/lib/dal.ts"
import 'server-only'
import { cache } from 'react'
import { cookies } from 'next/headers'
import { decrypt } from '@/app/lib/session'

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)
  if (!session?.userId) redirect('/login')
  return { isAuth: true, userId: session.userId }
})
```

## Notes

- Recommended: use an auth library (Auth0, Better Auth, Clerk, NextAuth.js, etc.) rather than a fully custom solution; the page walks through custom username/password auth for education only.
- Session types: stateless (encrypted session data/token in a cookie, e.g. via `jose`) vs database (session stored server-side, browser holds only an encrypted session ID).
- Centralize authorization in a Data Access Layer (DAL) with a `verifySession()` function memoized via React `cache()`, and return only necessary fields via Data Transfer Objects (DTOs) — never whole DB records.
- Do not rely on `return null` in a layout for auth gating — layouts don't re-render on every navigation (Partial Rendering), so checks belong close to the data source or in Proxy for optimistic checks.
- Proxy-based checks must stay optimistic (cookie-only, no DB calls) since Proxy runs on every route including prefetches; treat Server Actions and Route Handlers with the same security rigor as public API endpoints — always re-verify session/role inside them.
- React `context` is not available in Server Components; a Client Component context provider does not give session data to nested Server Components.

## Related

- [Forms](./forms.md)
- [Data Security](https://nextjs.org/docs/app/guides/data-security)
