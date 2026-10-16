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
| `<Link href="/x">` | Prefetched the cached page render | Prefetches the shared App Shell for `/x` |
| `<Link href="/x" prefetch>` | Prefetched cached render + dynamic content | Prefetches the App Shell plus cached URL-specific content through per-link prefetching when `/x` reads it; no longer includes uncached dynamic content |
| `<Link href="/x" prefetch={false}>` | Disabled prefetching | Unchanged |
| `prefetch = 'partial'` | route segment config | Opts one route into Partial Prefetching before the global flag is on (incremental adoption) |

## Notes

- Only works when `cacheComponents` is enabled; App Shell is shared across every link to a route regardless of dynamic params. Enabling `cacheComponents` without a `partialPrefetching` value logs a warning asking you to set `true` or `false` (set `false` only to keep the previous behavior while migrating). Both features will be enabled everywhere in the next major release, and the options will be removed.
- Adoption order by hand: (1) Migrate existing full prefetches (review each `<Link>` whose effective `prefetch` is `true`: `prefetch={true}`, the bare `prefetch` prop, or wrapper/conditional props resolving to `true`; the default, `"auto"` and `false` do not use the legacy full prefetch) and optionally verify prefetched UI with `instant()` tests; (2) enable `partialPrefetching`, or adopt incrementally with the flag off; (3) move URL data behind Suspense; (4) optionally prefetch URL data on routes where streaming in after navigation is not enough.
- Verify prefetched UI with tests: an `instant()` test (from `@next/playwright`) can capture the UI that should stay available from an existing full prefetch. Test the exact source link (different links to the same destination can use different prefetch settings). Run the baseline against a production build with `partialPrefetching` disabled (automatic prefetching does not run in `next dev`), then rerun after adopting the destination.
- After enabling the flag, links using the default, `prefetch="auto"` or `prefetch={true}` prefetch the App Shell; `prefetch={true}` can also resolve cached URL-specific content but no longer includes uncached dynamic content from the legacy full prefetch. New projects have no legacy full prefetches to migrate.
- `cookies()`/`headers()` vary per session (not per link) so cached session content still lands in the shared App Shell; only `params`/`searchParams` (URL data) can't be included and must stream in or use per-link prefetching.
- Per-destination recommendation: static/cached content: remove `prefetch={true}`; uncached content you want kept: cache with `use cache` then remove it; `cookies()`/`headers()` content: cache the lookup behind the session value then remove it; URL-data-dependent content: keep `prefetch={true}`; real-time content: remove it and let content stream in.
- Incremental adoption: keep the global flag off, add `export const prefetch = 'partial'` per route (clears the dev insight for every link to the route), then remove the per-route exports later with the `remove-partial-prefetch` codemod (`npx @next/codemod@canary remove-partial-prefetch ./app`; pass `./src/app` in a `src/` project, since a wrong path reports `0 ok` instead of failing). If the page already calls the `prefetch()` function, import it under another name (`import { prefetch as prefetchStage } from 'next/cache'`).
- Move URL data behind Suspense: the `instant-shell-url-data` insight fires when `params`/`searchParams` are read outside `<Suspense>`, tying the shared App Shell to one URL — fix by moving the read into a `<Suspense>`-wrapped child.
- Terminology: "runtime prefetching" is now per-link prefetching (see the Optimizing prefetching guide, `optimizing-prefetching.md`).
- The `next-partial-prefetching-adoption` skill (`npx skills add vercel/next.js --skill next-partial-prefetching-adoption`) automates this migration (reviews `<Link prefetch={true}>` calls, captures prefetched UI with `instant()` tests when a production test rig is available, then enables the flag and checks each route).

## Related

- [Ensuring Instant Navigations](./instant-navigation.md)
- [Migrating to Cache Components](./migrating-to-cache-components.md)
- [Prefetching](./prefetching.md)
