---
source: https://tanstack.com/router/latest/docs/framework/react/guide/external-data-loading
---

# External Data Loading

TanStack Router acts as a **coordinator** (not a store) for external data-fetching/caching libraries such as TanStack Query, SWR, RTK Query, urql, Relay, Apollo, Zustand, Jotai, Recoil, or Redux.

## Signature / Usage

```tsx
// src/routes/posts.tsx
const postsQueryOptions = queryOptions({
  queryKey: ['posts'],
  queryFn: () => fetchPosts(),
})

export const Route = createFileRoute('/posts')({
  loader: () => queryClient.ensureQueryData(postsQueryOptions),
  component: () => {
    const { data: { posts } } = useSuspenseQuery(postsQueryOptions)
    return <div>{posts.map((post) => <Post key={post.id} post={post} />)}</div>
  },
})
```

## SSR Dehydration/Hydration

```tsx
// src/router.tsx
export function createRouter() {
  const queryClient = new QueryClient()

  return createRouter({
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

## Related

- [Data Loading](./data-loading.md)
- [Deferred Data Loading](./deferred-data-loading.md)
- [Data Mutations](./data-mutations.md)
- [SSR](./ssr.md)
