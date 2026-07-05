# usePathname

`usePathname` is a Client Component hook that reads the current URL's pathname.

## Signature / Usage

```tsx
'use client'

import { usePathname } from 'next/navigation'

export default function ExampleClientComponent() {
  const pathname = usePathname()
  return <p>Current pathname: {pathname}</p>
}
```

## Notes

- Takes no parameters; returns a string (e.g. `/dashboard` for `/dashboard?v=2` — query string excluded).
- Reading the current URL from a Server Component is not supported (by design, to preserve layout state across navigations).
- When `cacheComponents` is enabled, may require a `Suspense` boundary if the route has a dynamic param (optional if using `generateStaticParams`).
- With rewrites (via `next.config` or Proxy), the client-read pathname may differ from the server-rendered one, risking hydration mismatches — isolate the pathname-dependent UI and update it after mount to avoid this.
- Returns `null` in Pages Router contexts before the router is initialized (e.g. fallback routes).
- Introduced in `v13.0.0`.

## Related

- [useSearchParams](./use-search-params.md)
- [useParams](./use-params.md)
