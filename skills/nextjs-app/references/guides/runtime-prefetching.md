# Runtime Prefetching

With Cache Components and Partial Prefetching enabled, `<Link prefetch={true}>` resolves a route's URL data (`searchParams`, `params`) ahead of the click by issuing a per-link server prefetch, on top of the shared App Shell every route already prefetches.

## Signature / Usage

```tsx filename="app/page.tsx"
import Link from 'next/link'

<Link href="/search?q=react" prefetch={true}>
  React
</Link>
```

```ts filename="next.config.ts"
const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `<Link prefetch={true}>` | prop | Opts a single link into runtime prefetching, resolving URL-data-dependent content before the click |
| `partialPrefetching` | `next.config` boolean | Globally enables the App Shell + Partial Prefetching model |
| `prefetch = 'partial'` | route segment config | Enables Partial Prefetching per segment instead of globally |
| `"use cache: private"` | directive | Caches a function reading `cookies()`/`headers()` directly, scoped per session in the client cache |

## Notes

- The App Shell (one per route) carries static output plus session-gated UI (from `cookies()`/`headers()`); it cannot carry per-link URL data (`searchParams`, `params`).
- Costs a server invocation per prefetchable link — opt in per link, not globally, especially for grids of many visible links (prefer hover-triggered prefetch there).
- Pages with fully static content are served from the static cache instead of a runtime prefetch.
- For session data shared across many sessions, extract `cookies()` outside the cached function and pass the value in as an argument (deterministic cache key); for data tied to one session, use `"use cache: private"` and colocate it close to the runtime data access.
- A cold cache means the first navigation may still show a loading spinner; warm-cache navigations are instant.
- Skip runtime prefetching when the route has little URL-data dependency, content must be fresh every request, or the route is rarely navigated to — the App Shell is already the instant baseline.
- Assumes the route is already structured for instant navigation (see Instant Navigation guide) before adopting this.

## Related

- [Prefetching](./prefetching.md)
- [Interactive Apps](./interactive-apps.md)
