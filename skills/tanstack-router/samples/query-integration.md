---
source: https://tanstack.com/router/latest/docs/framework/react/guide/external-data-loading
---

# TanStack Query Integration

Use the router's `loader` to call `queryClient.query` (with `staleTime: 'static'`) and the component to read it via `useSuspenseQuery`, so TanStack Query owns caching while the router owns preloading.

```tsx
// src/routes/posts.tsx
import { createFileRoute } from '@tanstack/react-router'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

const postsQueryOptions = queryOptions({
  queryKey: ['posts'],
  queryFn: () => fetch('/api/posts').then((r) => r.json()),
})

export const Route = createFileRoute('/posts')({
  loader: ({ context: { queryClient } }) =>
    queryClient.query({ ...postsQueryOptions, staleTime: 'static' }),
  component: PostsComponent,
})

function PostsComponent() {
  const { data: posts } = useSuspenseQuery(postsQueryOptions)
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

```tsx
// src/routes/__root.tsx — declare the context type so `context: { queryClient }` type-checks
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: () => <Outlet />,
})
```

```tsx
// src/router.tsx — create the QueryClient inside the router factory and inject it as context
import { createRouter as createTanstackRouter } from '@tanstack/react-router'
import { QueryClient } from '@tanstack/react-query'
import { routeTree } from './routeTree.gen'

export function createRouter() {
  const queryClient = new QueryClient()

  return createTanstackRouter({
    routeTree,
    context: { queryClient },
  })
}
```

## Notes

- `staleTime: 'static'` returns cached data immediately and otherwise executes a fetch. `queryClient.ensureQueryData` and `queryClient.prefetchQuery` are deprecated in TanStack Query in favor of `queryClient.query`.
- To prefetch without blocking SSR, do not await or return the promise: `void queryClient.query(opts).catch(noop)` (`noop` is exported from `@tanstack/react-query`).
- Preload via `route.loader` (not component-level fetching) to avoid loading-state flashes and fetch waterfalls, and to keep data ready for SEO.
- For an SSR app, additionally pass `dehydrate`/`hydrate` router options plus a `Wrap` with `QueryClientProvider` — see `references/data-rendering/external-data-loading.md`.
- Create the `QueryClient` inside the `createRouter()` factory function (not at module scope) so each SSR request gets its own instance, as shown above.
- For error handling in `suspense` mode, call `useQueryErrorResetBoundary().reset()` when `errorComponent` mounts, then `router.invalidate()` on retry.
