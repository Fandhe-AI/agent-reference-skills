---
source: https://tanstack.com/router/latest/docs/framework/react/guide/data-loading
---

# Data Loading

Route `loader` functions preload async data before rendering, in parallel across matched routes, with a built-in SWR (stale-while-revalidate) cache.

## Signature / Usage

```tsx
// src/routes/posts.tsx
export const Route = createFileRoute('/posts')({
  loader: () => fetchPosts(),
})

// object form for loader-specific behavior (e.g. staleReloadMode)
export const Route = createFileRoute('/posts')({
  loader: {
    handler: () => fetchPosts(),
  },
})
```

Consume with `useLoaderData`:

```tsx
const posts = Route.useLoaderData()

// deep in the tree, without importing Route directly
import { getRouteApi } from '@tanstack/react-router'
const routeApi = getRouteApi('/posts')
const data = routeApi.useLoaderData()
```

## The route loading lifecycle

- Route Matching (Top-Down): `route.params.parse`, `route.validateSearch`
- Route Pre-Loading (Serial): `route.beforeLoad`, `route.onError`
- Route Loading (Parallel): `route.component.preload?`, `route.loader`, `route.pendingComponent`, `route.component`, `route.onError`

## `loader` Parameters

| Name | Description |
|------|-------------|
| `abortController` | AbortController for this shareable loader invocation; signal cancels once outdated with no consumers |
| `cause` | `enter` \| `preload` \| `stay` |
| `context` | Merged parent context + this route's `beforeLoad` context |
| `deps` | Value returned from `Route.loaderDeps` (empty object if undefined) |
| `location` | Current location |
| `params` | Route path params |
| `parentMatchPromise` | `Promise<RouteMatch>` (`undefined` for root route) |
| `preload` | `true` when the route is being preloaded instead of loaded |
| `route` | The route itself |

## Key caching options

| Name | Description |
|------|-------------|
| `routeOptions.loaderDeps` | Deterministic, side-effect-free function returning a serializable deps object from validated search params; deep-equality compared |
| `routeOptions.staleTime` / `routerOptions.defaultStaleTime` | ms before navigation data is considered stale (default `0`) |
| `routeOptions.preloadStaleTime` / `routerOptions.defaultPreloadStaleTime` | ms before preloaded data is considered stale (default 30s) |
| `routeOptions.gcTime` / `routerOptions.defaultGcTime` | ms before unused cache data is eligible for garbage collection (default 5min) |
| `routeOptions.shouldReload` | Function/boolean overriding whether the route should reload |
| `routeOptions.loader.staleReloadMode` / `routerOptions.defaultStaleReloadMode` | `'background'` (SWR, default) or `'blocking'` |

## Notes

- `loader` here has no relation to React Router's `loader`/`getServerSideProps` (Next.js) despite similar naming — see the [Data Loading](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading) guide's own comparison.
- By default `staleTime` is `0`: reusable successful data is immediately considered stale and revalidates in the background on reuse (`'background'` `staleReloadMode`).
- Do not access `search` params directly in `loader` — use `loaderDeps` to select only the params actually used, otherwise unrelated search-param changes trigger unnecessary reloads.
- `router.invalidate()` invalidates committed/cached/in-flight loader generations and retires matching preload lanes; pass `{ sync: true }` to await it.

## Related

- [Deferred Data Loading](./deferred-data-loading.md)
- [External Data Loading](./external-data-loading.md)
- [Preloading](./preloading.md)
- [Data Mutations](./data-mutations.md)
