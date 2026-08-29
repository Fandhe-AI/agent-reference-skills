# samples

| Name | Description | Path |
| --- | --- | --- |
| Basic Query | Fetch data with `useQuery` and render pending/error/success states | [basic-query.md](./basic-query.md) |
| Dependent Queries | Chain a query to run only after a prerequisite value is available via `enabled` | [dependent-queries.md](./dependent-queries.md) |
| Pagination | Keep previous page's data visible with `placeholderData: keepPreviousData` | [pagination.md](./pagination.md) |
| Infinite Scroll | Load additional pages on demand with `useInfiniteQuery` | [infinite-scroll.md](./infinite-scroll.md) |
| Mutations with Invalidation | Run a mutation and invalidate related queries via `queryClient.invalidateQueries` | [mutations-invalidation.md](./mutations-invalidation.md) |
| Optimistic Update with Rollback | Write expected results into the cache in `onMutate` and roll back on error | [optimistic-update.md](./optimistic-update.md) |
| Prefetching on Interaction | Warm the cache ahead of navigation using `queryClient.query` | [prefetching.md](./prefetching.md) |
| SSR with HydrationBoundary | Prefetch on the server, dehydrate, and hydrate via `HydrationBoundary` | [ssr-hydration.md](./ssr-hydration.md) |
| Suspense with Error Reset Boundary | Use `useSuspenseQuery` with Suspense/ErrorBoundary and `QueryErrorResetBoundary` | [suspense.md](./suspense.md) |
| Persist Cache Offline | Persist the cache to `localStorage` via `PersistQueryClientProvider` | [offline-persist.md](./offline-persist.md) |
| Testing a Query Hook | Test `useQuery` hooks with `renderHook` and a per-test `QueryClientProvider` | [testing.md](./testing.md) |
