# Guides

| Name | Description | Path |
|------|-------------|------|
| Important Defaults | Aggressive-but-sane defaults: staleTime, gcTime, retries, structural sharing | [important-defaults.md](./important-defaults.md) |
| Queries | Core `useQuery` usage, status/fetchStatus states | [queries.md](./queries.md) |
| Query Keys | Array-based cache keys, hashing rules | [query-keys.md](./query-keys.md) |
| Query Functions | `queryFn` contract, QueryFunctionContext | [query-functions.md](./query-functions.md) |
| Query Options | `queryOptions` helper for shared, type-safe query config | [query-options.md](./query-options.md) |
| Network Mode | `online` / `always` / `offlineFirst` behavior without connectivity | [network-mode.md](./network-mode.md) |
| Parallel Queries | Manual and dynamic (`useQueries`) parallel fetching | [parallel-queries.md](./parallel-queries.md) |
| Dependent Queries | Serial queries via `enabled`, request waterfall tradeoffs | [dependent-queries.md](./dependent-queries.md) |
| Background Fetching Indicators | `isFetching` and `useIsFetching` for background refetch UI | [background-fetching-indicators.md](./background-fetching-indicators.md) |
| Window Focus Refetching | `refetchOnWindowFocus`, custom focus manager | [window-focus-refetching.md](./window-focus-refetching.md) |
| Polling | `refetchInterval` timer-based refetching | [polling.md](./polling.md) |
| Disabling/Pausing Queries | `enabled: false`, lazy queries, `skipToken` | [disabling-queries.md](./disabling-queries.md) |
| Query Retries | `retry` / `retryDelay` configuration | [query-retries.md](./query-retries.md) |
| Paginated / Lagged Queries | `placeholderData: keepPreviousData` for page transitions | [paginated-queries.md](./paginated-queries.md) |
| Infinite Queries | `useInfiniteQuery`, `getNextPageParam`, `maxPages` | [infinite-queries.md](./infinite-queries.md) |
| Initial Query Data | `initialData` / `initialDataUpdatedAt` to prepopulate cache | [initial-query-data.md](./initial-query-data.md) |
| Placeholder Query Data | Non-persisted placeholder data via `placeholderData` | [placeholder-query-data.md](./placeholder-query-data.md) |
| Mutations | `useMutation`, side-effect callbacks, mutation scopes | [mutations.md](./mutations.md) |
| Query Invalidation | `queryClient.invalidateQueries` and match rules | [query-invalidation.md](./query-invalidation.md) |
| Invalidation from Mutations | Invalidating queries from `onSuccess` | [invalidations-from-mutations.md](./invalidations-from-mutations.md) |
| Updates from Mutation Responses | `setQueryData` from mutation results, immutability | [updates-from-mutation-responses.md](./updates-from-mutation-responses.md) |
| Optimistic Updates | UI-based vs cache-based optimistic update strategies | [optimistic-updates.md](./optimistic-updates.md) |
| Query Cancellation | `AbortSignal`, manual `cancelQueries` | [query-cancellation.md](./query-cancellation.md) |
| Scroll Restoration | Why caching enables scroll restoration out of the box | [scroll-restoration.md](./scroll-restoration.md) |
| Filters | `QueryFilters` / `MutationFilters` shared by batch APIs | [filters.md](./filters.md) |
| Performance & Request Waterfalls | Diagnosing and flattening request waterfalls | [request-waterfalls.md](./request-waterfalls.md) |
| Prefetching & Router Integration | `queryClient.query` prefetching patterns, router loaders | [prefetching.md](./prefetching.md) |
| Server Rendering & Hydration | `dehydrate`/`hydrate`/`HydrationBoundary` basics | [ssr.md](./ssr.md) |
| Advanced Server Rendering | Server Components, Next.js app router, streaming | [advanced-ssr.md](./advanced-ssr.md) |
| Caching | Query cache lifecycle example (mount/refetch/GC) | [caching.md](./caching.md) |
| Render Optimizations | Structural sharing, tracked properties, `select` | [render-optimizations.md](./render-optimizations.md) |
| Default Query Fn | Shared default `queryFn` on `QueryClient` | [default-query-function.md](./default-query-function.md) |
| Suspense | `useSuspenseQuery` family and Error Boundary integration | [suspense.md](./suspense.md) |
| Testing | `renderHook`, retry/gcTime test config, mocking network | [testing.md](./testing.md) |
| Does this replace Redux/MobX/etc? | Server-state vs client-state library distinction | [does-this-replace-client-state.md](./does-this-replace-client-state.md) |
| Migrating to v5 | v4 → v5 breaking changes and new features | [migrating-to-v5.md](./migrating-to-v5.md) |
| Migrating to React Query 4 | v3 → v4 breaking changes and new features | [migrating-to-react-query-4.md](./migrating-to-react-query-4.md) |
| Migrating to React Query 3 | Pre-v3 → v3 breaking changes and new features | [migrating-to-react-query-3.md](./migrating-to-react-query-3.md) |
