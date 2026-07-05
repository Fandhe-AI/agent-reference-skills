# not-found.js

Renders UI when the `notFound()` function is thrown within a route segment. `global-not-found.js` (experimental) defines a single 404 page for unmatched URLs across the entire app, handled at the routing level.

## Signature / Usage

```tsx filename="app/not-found.tsx"
import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}
```

```tsx filename="next.config.ts"
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
  },
}

export default nextConfig
```

```tsx filename="app/global-not-found.tsx"
import './globals.css'

export const metadata = {
  title: '404 - Page Not Found',
}

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <h1>404 - Page Not Found</h1>
      </body>
    </html>
  )
}
```

## Options / Props

`not-found.js` and `global-not-found.js` components do not accept any props.

## Notes

- `not-found.js` returns `200` for streamed responses and `404` for non-streamed responses; renders between `loading.js` and `page.js` in the component hierarchy, wrapped by the segment's `<Suspense>` (loading) and error boundary (error.js).
- The root `app/not-found.js` (and `app/global-not-found.js`) also handles any unmatched URL across the whole app, not just thrown `notFound()` calls.
- `global-not-found.js` bypasses normal app rendering — it must return a full `<html>`/`<body>` document and must import its own global styles/fonts; useful when multiple root layouts or top-level dynamic segments make a unified `layout.js` + `not-found.js` 404 impractical. Requires `experimental.globalNotFound` in `next.config.ts`.
- `not-found.js` is a Server Component by default and can be marked `async` to fetch data; Client Component hooks like `usePathname` require client-side data fetching instead.
- Next.js auto-injects `<meta name="robots" content="noindex">` on pages returning a 404 status, including `global-not-found.js`.
- Version history: `v15.4.0` `global-not-found.js` introduced (experimental); `v13.3.0` root `not-found` began handling global unmatched URLs; `v13.0.0` `not-found` introduced.

## Related

- [notFound function](../functions/not-found.md)
- [loading.js](./loading.md)
- [error.js](./error.md)
