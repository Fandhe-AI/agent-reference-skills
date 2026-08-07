# Handling Connectivity Drops

Experimental `useOffline` support: keeps failed navigations, RSC fetches, prefetches, and Server Actions pending (instead of throwing) while the network is down, retrying automatically once the connection returns.

## Signature / Usage

```ts filename="next.config.ts"
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    useOffline: true,
  },
}

export default nextConfig
```

```tsx filename="app/dashboard/connectivity-fallback.tsx"
'use client'

import { useOffline } from 'next/offline'

export function ConnectivityFallback() {
  const isOffline = useOffline()
  return (
    <p>
      {isOffline
        ? 'Waiting for connection to load this section...'
        : 'Loading...'}
    </p>
  )
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `experimental.useOffline` | `next.config.js` boolean | Enables retry-on-reconnect for navigations, RSC data fetches, prefetches, and Server Actions |
| `useOffline()` | hook (`next/offline`) | Returns `true` on the browser's `offline` event or a failed nav/prefetch/Server Action; `false` after a successful background check; always `false` during SSR/initial hydration |

## Notes

- This is an **experimental** feature, not recommended for production.
- Only applies to soft navigations into prefetched routes and Server Action calls from the current page — a full page reload while offline still fails because the browser needs the network for the HTML (use a service worker / Progressive Web Apps guide for full offline loads).
- Requests issued directly via client-side `fetch()` or libraries like React Query/SWR are unaffected and follow their own retry policy.
- Without Cache Components, a route-level `loading.tsx` gives the same offline behavior at the segment level (the boundary Next.js prefetches as the route's shell).
- Test with `next build && next start`, not `next dev` — dev mode is not a reliable reference for offline behavior. Use Chrome/Firefox DevTools network throttling or real airplane-mode toggling.

## Related

- [Progressive Web Apps (PWAs)](./progressive-web-apps.md)
- [Ensuring Instant Navigations](./instant-navigation.md)
- [Prefetching](./prefetching.md)
