# api

| Name | Description | Path |
|------|-------------|------|
| QueryClient | Programmatic control over query/mutation caching and state | [query-client.md](./query-client.md) |
| QueryCache | Underlying storage for all query data and state | [query-cache.md](./query-cache.md) |
| MutationCache | Underlying storage for all mutation data and state | [mutation-cache.md](./mutation-cache.md) |
| QueryObserver | Framework-agnostic observer for a single query | [query-observer.md](./query-observer.md) |
| InfiniteQueryObserver | Framework-agnostic observer for an infinite query | [infinite-query-observer.md](./infinite-query-observer.md) |
| QueriesObserver | Framework-agnostic observer for multiple queries | [queries-observer.md](./queries-observer.md) |
| streamedQuery | Helper to build query functions that stream AsyncIterable data | [streamed-query.md](./streamed-query.md) |
| focusManager | Controls window-focus refetch detection | [focus-manager.md](./focus-manager.md) |
| onlineManager | Controls network online/offline detection | [online-manager.md](./online-manager.md) |
| notifyManager | Batches and schedules cache-update notifications | [notify-manager.md](./notify-manager.md) |
| environmentManager | Controls server-environment detection | [environment-manager.md](./environment-manager.md) |
| timeoutManager | Manages setTimeout/setInterval timers used internally | [timeout-manager.md](./timeout-manager.md) |
| useQuery | React hook for fetching and caching a single query | [use-query.md](./use-query.md) |
| useQueries | React hook for fetching a variable number of queries | [use-queries.md](./use-queries.md) |
| useInfiniteQuery | React hook for paginated/infinite data fetching | [use-infinite-query.md](./use-infinite-query.md) |
| useMutation | React hook for asynchronous mutations | [use-mutation.md](./use-mutation.md) |
| useIsFetching | Count of queries currently fetching | [use-is-fetching.md](./use-is-fetching.md) |
| useIsMutating | Count of mutations currently in flight | [use-is-mutating.md](./use-is-mutating.md) |
| useMutationState | Access and filter mutations from the MutationCache | [use-mutation-state.md](./use-mutation-state.md) |
| useSuspenseQuery | Suspense-integrated variant of useQuery | [use-suspense-query.md](./use-suspense-query.md) |
| useSuspenseInfiniteQuery | Suspense-integrated variant of useInfiniteQuery | [use-suspense-infinite-query.md](./use-suspense-infinite-query.md) |
| useSuspenseQueries | Suspense-integrated variant of useQueries | [use-suspense-queries.md](./use-suspense-queries.md) |
| QueryClientProvider | React context provider for a QueryClient | [query-client-provider.md](./query-client-provider.md) |
| useQueryClient | Access the QueryClient from context | [use-query-client.md](./use-query-client.md) |
| queryOptions | Shareable query option builder | [query-options.md](./query-options.md) |
| infiniteQueryOptions | Shareable infinite query option builder | [infinite-query-options.md](./infinite-query-options.md) |
| mutationOptions | Shareable mutation option builder | [mutation-options.md](./mutation-options.md) |
| usePrefetchQuery | Prefetch a query during render, before a suspense boundary | [use-prefetch-query.md](./use-prefetch-query.md) |
| usePrefetchInfiniteQuery | Prefetch an infinite query during render, before a suspense boundary | [use-prefetch-infinite-query.md](./use-prefetch-infinite-query.md) |
| QueryErrorResetBoundary | Component to reset query errors for suspense/throwOnError | [query-error-reset-boundary.md](./query-error-reset-boundary.md) |
| useQueryErrorResetBoundary | Hook to reset query errors for suspense/throwOnError | [use-query-error-reset-boundary.md](./use-query-error-reset-boundary.md) |
| hydration | dehydrate/hydrate/HydrationBoundary for SSR and persistence | [hydration.md](./hydration.md) |
