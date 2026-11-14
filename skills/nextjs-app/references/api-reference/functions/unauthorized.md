# unauthorized

`unauthorized` throws an error that renders the unauthorized UI, useful for handling authorization errors.

## Signature / Usage

```tsx
import { verifySession } from '@/app/lib/dal'
import { unauthorized } from 'next/navigation'

export default async function DashboardPage() {
  const session = await verifySession()
  if (!session) {
    unauthorized()
  }
  return <main>Welcome, {session.user.name}.</main>
}
```

## Notes

- **Experimental**: requires enabling `experimental.authInterrupts` in `next.config.js`. Not recommended for production.
- Can be invoked in Server Components, Server Functions, and Route Handlers.
- Cannot be called in the root layout.
- Injects `<meta name="robots" content="noindex" />`. Call it in the render path (a component, or a function a component `await`s); a call left in an un-awaited promise renders no unauthorized UI.
- Inside `<Suspense>`: streaming has already started, so the status stays `200` and `noindex` is added. Calling it before streaming starts returns `401`.
- `unauthorized()` returns a `401` when it runs before the response starts, including during prerendering (the route can remain `○` Static and serve a `401`). See loading.js status codes.
- In a Route Handler, `unauthorized()` returns an empty `401` response (no unauthorized UI is rendered).
- Customize the rendered UI via the `unauthorized.js` file convention.
- Introduced in `v15.1.0`.

## Related

- [unauthorized.js](https://nextjs.org/docs/app/api-reference/file-conventions/unauthorized)
- [forbidden](./forbidden.md)
