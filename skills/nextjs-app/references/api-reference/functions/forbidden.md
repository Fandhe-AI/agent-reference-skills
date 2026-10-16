# forbidden

`forbidden` throws an error that renders a Next.js 403 error page, useful for handling authorization errors.

## Signature / Usage

```tsx
import { verifySession } from '@/app/lib/dal'
import { forbidden } from 'next/navigation'

export default async function AdminPage() {
  const session = await verifySession()
  if (session.role !== 'admin') {
    forbidden()
  }
  return <></>
}
```

## Notes

- **Experimental**: requires enabling `experimental.authInterrupts` in `next.config.js`. Not recommended for production.
- Can be invoked in Server Components, Server Functions, and Route Handlers.
- Cannot be called in the root layout.
- Injects `<meta name="robots" content="noindex" />`. Call it in the render path (a component, or a function a component `await`s); a call left in an un-awaited promise renders no forbidden UI.
- Inside `<Suspense>`: streaming has already started, so the status stays `200` and `noindex` is added. Calling it before streaming starts returns `403`.
- If `forbidden()` is reached during prerendering, the route can remain `○` Static and serve a `403`. A request-time check can run in Proxy.
- Customize the rendered UI via the `forbidden.js` file convention.
- Introduced in `v15.1.0`.

## Related

- [forbidden.js](https://nextjs.org/docs/app/api-reference/file-conventions/forbidden)
- [unauthorized](./unauthorized.md)
- [notFound](./not-found.md)
