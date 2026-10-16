# Authentication with Cache Components

With Cache Components enabled, a session read happens at request time and cannot be prerendered into the static shell, so authenticated UI streams in behind `<Suspense>` while session-derived data can still be cached.

## Signature / Usage

```tsx filename="lib/auth.ts"
import 'server-only'
import { redirect } from 'next/navigation'
import { getSession } from './session'
import { findUserById } from './data'

export type User = {
  id: string
  name: string
}

export async function getCurrentUser(): Promise<User> {
  'use cache: private'

  const { userId } = await getSession()
  if (!userId) {
    redirect('/login')
  }

  const user = await findUserById(userId)
  if (!user) {
    redirect('/login')
  }

  return { id: user.id, name: user.name }
}
```

```tsx filename="app/page.tsx"
<Suspense fallback={<p>Loading your dashboard…</p>}>
  <Dashboard />
</Suspense>
```

```ts filename="lib/data.ts"
async function getNotesByUserId(userId: string) {
  'use cache'
  cacheTag(`notes:${userId}`)
  cacheLife('minutes')

  return db.query.notes.findMany({
    where: (notes, { eq }) => eq(notes.userId, userId),
  })
}
```

```ts filename="app/actions.ts"
updateTag(`notes:${userId}`)
```

## Steps

| Step | Pattern |
|------|---------|
| 1. Read the current user | Wrap the session read in `"use cache: private"` (reads `cookies()` / `headers()` directly, result stays in the browser only) |
| 2. Show the user without blocking | Put the session-reading component behind `<Suspense>`; anything outside prerenders into the static shell |
| 3. Share the user | Create the promise once inside the boundary, pass it through context, unwrap with `use()` in Client Components |
| 4. Cache session-derived data | Resolve the user in an exported getter, pass only `userId` to an unexported `"use cache"` function with `cacheTag` / `cacheLife` |
| 5. Update session-derived data | In a Server Action, re-read the session and call `updateTag` with the same tag |
| 6. Instant authenticated navigations | `"use cache: private"` uses the `default` cacheLife profile (5-minute `stale`); keep `stale` >= 30 seconds; use `<Link prefetch={true}>` for routes that also depend on `params` / `searchParams` |

## Notes

- Source: https://nextjs.org/docs/app/guides/authentication-with-cache-components (v16.4.2)

- Requires `cacheComponents: true` in `next.config.ts`. Examples use iron-session, but the patterns apply to any session library.
- Neither plain `use cache` nor `use cache: remote` can call `cookies()`. `use cache: private` accepts `cookies()`, `headers()`, and `searchParams`, but not `connection()`.
- `redirect()` calls throw to interrupt rendering, so they are not cached; only a resolved user is.
- Reading `cookies()` outside a `<Suspense>` boundary with Cache Components is a build error. Do not `await` the session at the top level of a layout; push it into a component inside a boundary.
- Keep `getNotesByUserId` unexported so callers cannot request another user's data; resolving the user inside the exported getter is what makes it safe.
- Cache keys (function arguments, captured variables) and `cacheTag` values are stored in plain text. Use a stable identifier such as the user id; keep tokens, passwords, and raw emails out of arguments and tags.
- Plain `use cache` on the server is best-effort in memory (evicted under pressure; not persisted across serverless instances). Use `use cache: remote` for durable shared storage.
- Migrating: instant navigation validation flags every route that reads the session. Set `export const instant = false` on the page or layout to keep it blocking, then adopt the patterns one route at a time.
- Re-verify the session in every Server Action and Route Handler; UI checks hide elements but do not protect data.

## Related

- [Authentication](./authentication.md)
- [Data Security](./data-security.md)
- [Optimizing prefetching](./optimizing-prefetching.md)
- [Migrating to Cache Components](./migrating-to-cache-components.md)
