---
source: https://tanstack.com/router/latest/docs/framework/react/guide/preloading
---

# Preloading

Load a route's data/chunks before the user navigates to it, using `intent` (hover/touch), `viewport` (Intersection Observer), or `render` strategies on `<Link>`.

## Signature / Usage

```tsx
import { createRouter } from '@tanstack/react-router'

const router = createRouter({
  // ...
  defaultPreload: 'intent',
  defaultPreloadDelay: 100, // ms, default 50
  defaultPreloadStaleTime: 10_000, // ms, default 30_000
})
```

Per-route override:

```tsx
// src/routes/posts.$postId.tsx
export const Route = createFileRoute('/posts/$postId')({
  loader: async ({ params }) => fetchPost(params.postId),
  preloadStaleTime: 10_000,
})
```

Manual preload:

```tsx
import { isNotFound } from '@tanstack/react-router'

const router = useRouter()
const matches = await router.preloadRoute({ to: postRoute, params: { id: 1 } })
const routeFailure = matches?.find(
  (match) =>
    match.status === 'error' ||
    match.status === 'notFound' ||
    isNotFound(match.error),
)
```

Preload only the JS chunk:

```tsx
await router.loadRouteChunk(router.routesByPath['/posts'])
```

## Options / Props

| Name | Description |
|------|-------------|
| `routerOptions.defaultPreload` | `'intent'` \| `'viewport'` \| `'render'` \| `false` — default preloading strategy for all `<Link>`s |
| `<Link preload>` | Per-link override of the default preload strategy |
| `routerOptions.defaultPreloadDelay` / `<Link preloadDelay>` | ms before intent/viewport preload starts (default 50ms) |
| `routerOptions.defaultPreloadStaleTime` / `routeOptions.preloadStaleTime` | freshness window for preloaded loader data (default 30s) |
| `routerOptions.defaultPreloadGcTime` / `routeOptions.preloadGcTime` | retention window before an unused preload is eligible for pruning (default 5min) |
| `routeOptions.preload: false` | speculative lane still runs `beforeLoad` but skips this route's `loader` |

## Notes

- Freshness (`preloadStaleTime`) and retention (`preloadGcTime`) are independent knobs; the latter does not schedule an exact-time eviction, only eligibility for pruning.
- The speculative preload lane is never promoted into router state — navigation always runs its own `beforeLoad` chain, though it may reuse settled loader data or join in-flight loader work.
- To let an external cache (e.g. TanStack Query) own freshness decisions, set `defaultPreloadStaleTime`/`preloadStaleTime` to `0`.
- Touch-based intent preloads immediately (no delay); hover/focus preloads are cancelled if the pointer/focus leaves before the delay elapses.

## Related

- [Data Loading](./data-loading.md)
- [Render Optimizations](./render-optimizations.md)
