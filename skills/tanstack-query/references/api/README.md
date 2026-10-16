# api

| Name | Description | Path |
|------|-------------|------|
| CancelledError (+ isCancelledError, deprecated) | The error thrown by a `Retryer` when a fetch is cancelled, e.g. via `query.cancel()`. | [cancelled-error.md](./cancelled-error.md) |
| environmentManager | Controls how TanStack Query identifies server-side runtime environments. | [environment-manager.md](./environment-manager.md) |
| focusManager | Manages the focus state within TanStack Query. | [focus-manager.md](./focus-manager.md) |
| hashKey | Default query and mutation keys hash function. | [hash-key.md](./hash-key.md) |
| hydration | Enables transferring prefetched query states between server and client, or persisting data to storage. | [hydration.md](./hydration.md) |
| InfiniteQueryObserver | The `InfiniteQueryObserver` enables developers to observe and switch between infinite queries. | [infinite-query-observer.md](./infinite-query-observer.md) |
| infiniteQueryOptions | A utility function that generates shareable infinite query configuration options, for use across multiple hooks and imperative APIs like `queryClient.infiniteQuery`. | [infinite-query-options.md](./infinite-query-options.md) |
| keepPreviousData | Passed as a query's `placeholderData` option. | [keep-previous-data.md](./keep-previous-data.md) |
| matchMutation | Checks whether a mutation matches the given `MutationFilters`. | [match-mutation.md](./match-mutation.md) |
| matchQuery | Checks whether a query matches the given `QueryFilters`. | [match-query.md](./match-query.md) |
| MutationCache | The `MutationCache` serves as the storage mechanism for mutations. | [mutation-cache.md](./mutation-cache.md) |
| MutationObserver | Observes a single mutation and derives a `MutationObserverResult` from it. | [mutation-observer.md](./mutation-observer.md) |
| mutationOptions | A function for configuring shareable mutation options with type safety and consistency. | [mutation-options.md](./mutation-options.md) |
| Mutation (class) | Represents a single mutation attempt. | [mutation.md](./mutation.md) |
| noop | A function that does nothing. | [noop.md](./noop.md) |
| notifyManager | Manages scheduling and batching callbacks. | [notify-manager.md](./notify-manager.md) |
| onlineManager | Monitors and controls network connectivity status within TanStack Query. | [online-manager.md](./online-manager.md) |
| partialMatchKey | Checks if key `b` partially matches key `a`. | [partial-match-key.md](./partial-match-key.md) |
| QueriesObserver | The `QueriesObserver` enables monitoring of multiple queries simultaneously, allowing developers to subscribe to state changes across several query operations. | [queries-observer.md](./queries-observer.md) |
| QueryCache | The `QueryCache` serves as the storage mechanism for TanStack Query, maintaining all data, metadata, and query state. | [query-cache.md](./query-cache.md) |
| QueryClientProvider | Wraps and distributes a `QueryClient` instance throughout the application, enabling query management capabilities. | [query-client-provider.md](./query-client-provider.md) |
| QueryClient | The `QueryClient` manages interactions with the cache system. | [query-client.md](./query-client.md) |
| QueryErrorResetBoundary | When using suspense or `throwOnError` in queries, this component lets queries know that you want to try again when re-rendering after an error occurred. | [query-error-reset-boundary.md](./query-error-reset-boundary.md) |
| QueryObserver | The `QueryObserver` enables monitoring and switching between different queries without being bound to a specific framework or component lifecycle. | [query-observer.md](./query-observer.md) |
| queryOptions | A utility function that generates shareable query configuration options. | [query-options.md](./query-options.md) |
| Query (class) | Represents a single cached query. | [query.md](./query.md) |
| replaceEqualDeep | Returns `a` if `b` is deeply equal. If not, replaces any deeply equal children of `b` with those of `a`. | [replace-equal-deep.md](./replace-equal-deep.md) |
| shouldThrowError | Resolves a `throwOnError` option to a boolean. | [should-throw-error.md](./should-throw-error.md) |
| skipToken | Sentinel value passed as a query's `queryFn` to conditionally disable the query (equivalent to `enabled: false`) while preserving full type inference for the query's data. | [skip-token.md](./skip-token.md) |
| streamedQuery | A helper function designed to create query functions that stream data from an `AsyncIterable`. | [streamed-query.md](./streamed-query.md) |
| timeoutManager | Manages `setTimeout` and `setInterval` timers within TanStack Query. | [timeout-manager.md](./timeout-manager.md) |
| useInfiniteQuery | Extends `useQuery` for managing paginated/infinite data fetching in either or both directions. | [use-infinite-query.md](./use-infinite-query.md) |
| useIsFetching | An optional hook that returns the number of queries that your application is loading or fetching in the background. | [use-is-fetching.md](./use-is-fetching.md) |
| useIsMutating | An optional hook that provides the count of mutations currently being fetched by the application. | [use-is-mutating.md](./use-is-mutating.md) |
| useIsRestoring (+ IsRestoringProvider) | Hook that reports whether a persisted client is currently being restored. | [use-is-restoring.md](./use-is-restoring.md) |
| useMutationState | Provides access to all mutations stored in the `MutationCache`. | [use-mutation-state.md](./use-mutation-state.md) |
| useMutation | React hook for managing asynchronous mutations, with state management, automatic retries, optimistic updates, and lifecycle callbacks. | [use-mutation.md](./use-mutation.md) |
| usePrefetchInfiniteQuery | Prefetches data for an infinite query during render, typically before a suspense boundary that wraps a component using `useSuspenseInfiniteQuery`. | [use-prefetch-infinite-query.md](./use-prefetch-infinite-query.md) |
| usePrefetchQuery | Initiates data fetching during component rendering, typically before a suspense boundary that wraps components using `useSuspenseQuery`. | [use-prefetch-query.md](./use-prefetch-query.md) |
| useQueries | Enables fetching a variable number of queries in a single call. | [use-queries.md](./use-queries.md) |
| useQueryClient | Provides access to the current `QueryClient` instance within the application, enabling programmatic access to the query cache and client operations. | [use-query-client.md](./use-query-client.md) |
| useQueryErrorResetBoundary | Resets query errors within the nearest `QueryErrorResetBoundary` component. | [use-query-error-reset-boundary.md](./use-query-error-reset-boundary.md) |
| useQuery | React hook that manages asynchronous data fetching with built-in caching, synchronization, and state management. | [use-query.md](./use-query.md) |
| useSuspenseInfiniteQuery | A variant of `useInfiniteQuery` that integrates with React Suspense. | [use-suspense-infinite-query.md](./use-suspense-infinite-query.md) |
| useSuspenseQueries | A variant of `useQueries` that integrates with React Suspense, ensuring data is available before component rendering. | [use-suspense-queries.md](./use-suspense-queries.md) |
| useSuspenseQuery | A variant of `useQuery` that integrates with React Suspense. | [use-suspense-query.md](./use-suspense-query.md) |
