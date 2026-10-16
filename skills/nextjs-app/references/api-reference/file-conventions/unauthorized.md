# unauthorized.js

Renders UI when the `unauthorized()` function is invoked. Before streaming starts, Next.js returns a `401` status code; after streaming starts, the status stays `200` and the unauthorized UI renders in the response. Next.js injects `<meta name="robots" content="noindex" />` in both cases.

## Signature / Usage

```tsx filename="app/unauthorized.tsx"
import Login from '@/app/components/Login'

export default function Unauthorized() {
  return (
    <main>
      <h1>401 - Unauthorized</h1>
      <p>Please log in to access this page.</p>
      <Login />
    </main>
  )
}
```

```tsx filename="app/dashboard/page.tsx"
import { verifySession } from '@/app/lib/dal'
import { unauthorized } from 'next/navigation'

export default async function DashboardPage() {
  const session = await verifySession()
  if (!session) {
    unauthorized()
  }
  return <div>Dashboard</div>
}
```

## Options / Props

`unauthorized.js` components do not accept any props.

## Notes

- This feature is currently **experimental** and not recommended for production.
- Introduced in `v15.1.0`.

## Related

- [unauthorized function](../functions/unauthorized.md)
- [forbidden.js](./forbidden.md)
