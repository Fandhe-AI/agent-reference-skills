# Adopting Partial Prefetching

Guide to enabling Partial Prefetching, which changes `<Link>` to prefetch a route's shared App Shell instead of the full dynamic render, and auditing existing `<Link prefetch={true}>` calls and URL-data reads.

## Signature / Usage

```ts filename="next.config.ts"
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
}

export default nextConfig
```

## Options / Props

| `<Link>` prop | Before (Cache Components default) | After Partial Prefetching |
|---------------|-------------------------------------|----------------------------|
| `<Link href="/x">` | Prefetched the cached page render | Loads the shared App Shell for `/x` |
| `<Link href="/x" prefetch>` | Prefetched cached render + dynamic content | Loads App Shell + per-link runtime prefetching when `/x` reads URL data |
| `<Link href="/x" prefetch={false}>` | Disabled prefetching | Unchanged |
| `prefetch = 'partial'` | route segment config | Opts one route into Partial Prefetching before the global flag is on (incremental adoption) |

## Notes

- Only works when `cacheComponents` is enabled; App Shell is shared across every link to a route regardless of dynamic params.
- `cookies()`/`headers()` vary per session (not per link) so cached session content still lands in the shared App Shell; only `params`/`searchParams` (URL data) can't be included and must stream in or use runtime prefetching.
- Audit each `<Link prefetch={true}>`: remove it for static/cached content, cache uncached content with `use cache` then remove it, keep it for URL-data-dependent content and pair with runtime prefetching.
- Incremental adoption: keep the global flag off, add `export const prefetch = 'partial'` per route, then remove the per-route exports later with the `remove-partial-prefetch` codemod once the global flag is enabled.
- The `instant-shell-url-data` insight fires when `params`/`searchParams` are read outside `<Suspense>`, tying the shared App Shell to one URL — fix by moving the read into a `<Suspense>`-wrapped child.
- The `next-partial-prefetching-adoption` skill (`npx skills add vercel/next.js --skill next-partial-prefetching-adoption`) automates this migration.

## Related

- [Ensuring Instant Navigations](./instant-navigation.md)
- [Migrating to Cache Components](./migrating-to-cache-components.md)
- [Prefetching](./prefetching.md)
