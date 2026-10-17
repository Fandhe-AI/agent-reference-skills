---
source: https://tanstack.com/router/latest/docs/framework/react/guide/external-data-loading
---

# External Data Loading

TanStack Router acts as a **coordinator** (not a store) for external data-fetching/caching libraries such as TanStack Query, SWR, RTK Query, urql, Relay, Apollo, Zustand, Jotai, Recoil, or Redux.

## Signature / Usage

```tsx
// src/routes/posts.tsx
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

const postsQueryOptions = queryOptions({
  queryKey: ['posts'],
  queryFn: () => fetchPosts(),
})

export const Route = createFileRoute('/posts')({
  loader: ({ context: { queryClient } }) =>
    queryClient.query({ ...postsQueryOptions, staleTime: 'static' }),
  component: () => {
    const { data: { posts } } = useSuspenseQuery(postsQueryOptions)
    return <div>{posts.map((post) => <Post key={post.id} post={post} />)}</div>
  },
})
```

### SSR Dehydration/Hydration

```tsx
// src/router.tsx
import { createRouter as createTanstackRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider, dehydrate, hydrate } from '@tanstack/react-query'
import { routeTree } from './routeTree.gen'

export function createRouter() {
  const queryClient = new QueryClient()

  return createTanstackRouter({
    routeTree,
    context: { queryClient },
    dehydrate: () => ({ queryClientState: dehydrate(queryClient) }),
    hydrate: (dehydrated) => hydrate(queryClient, dehydrated.queryClientState),
    Wrap: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  })
}
```

## Notes

- Preload critical render data via `route.loader` (not component-level fetching) to avoid loading-state flashes, fetch waterfalls, and to keep data available at render time for SEO.
- Error handling with TanStack Query's `suspense` mode: call `useQueryErrorResetBoundary().reset()` in an effect when the `errorComponent` mounts, then use `router.invalidate()` in the retry handler.
- `dehydrate`/`hydrate` router options return/accept arbitrary serializable JSON merged into the router's dehydration payload — create per-request stores (e.g. `QueryClient`) inside `createRouter`, not at module scope.
- The official snippets call `createRouter` inside a function also named `createRouter` and read a module-scope `queryClient` in the loader; this page aliases the import as `createTanstackRouter` and reads `queryClient` from loader context.
- `queryClient.ensureQueryData` / `queryClient.prefetchQuery` are deprecated in TanStack Query in favor of `queryClient.query` (noted in the TanStack Query integration guide).
- If a custom `errorComponent` receives `error` as `unknown`, narrow it before use, e.g. `error instanceof Error ? error.message : String(error)`.
- For full-stack React apps, see the "TanStack Query with Start" guide in the tanstack-start skill (request-scoped SSR, hydration, and mutation invalidation).

## Related

- [Data Loading](./data-loading.md)
- [Deferred Data Loading](./deferred-data-loading.md)
- [Data Mutations](./data-mutations.md)
- [SSR](./ssr.md)
