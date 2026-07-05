# unauthorized

`unauthorized` throws an error that renders a Next.js 401 error page, useful for handling authorization errors.

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
- Customize the rendered UI via the `unauthorized.js` file convention.
- Introduced in `v15.1.0`.

## Related

- [unauthorized.js](https://nextjs.org/docs/app/api-reference/file-conventions/unauthorized)
- [forbidden](./forbidden.md)
