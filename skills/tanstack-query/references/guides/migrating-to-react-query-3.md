---
source: https://tanstack.com/query/latest/docs/framework/react/guides/migrating-to-react-query-3
---

# Migrating to React Query 3

Breaking changes and new features when upgrading to v3.

## Signature / Usage

```tsx
import { QueryClient } from 'react-query'

const queryClient = new QueryClient()
```

## Notes (Breaking changes)

- `QueryCache` split into `QueryClient` + lower-level `QueryCache`/`MutationCache`; `ReactQueryConfigProvider`/`ReactQueryCacheProvider` replaced by `QueryClientProvider`. Default options move under `defaultOptions: { queries, mutations }` on `new QueryClient()`.
- No default global `QueryCache` anymore — must create your own via `new QueryClient()`.
- `QueryCache.prefetchQuery()` moved to `QueryClient.prefetchQuery()` (does not return data); use `QueryClient.fetchQuery()` if you need the resolved data.
- `ReactQueryErrorResetBoundary`/`QueryCache.resetErrorBoundaries()` replaced by `QueryErrorResetBoundary`/`useQueryErrorResetBoundary()`.
- `QueryCache.getQuery()` → `QueryCache.find()`; `QueryCache.getQueries()` → `QueryCache.findAll()`; `QueryCache.isFetching` (property) → `QueryClient.isFetching()` (function); `useQueryCache` → `useQueryClient`.
- Query key parts are no longer auto-spread into the query function — use an inline function or the `QueryFunctionContext` (`context.queryKey[1]`).
- Infinite query page params now arrive via `QueryFunctionContext.pageParam` instead of as the query function's last positional arg.
- `usePaginatedQuery()` **removed** — use `keepPreviousData: true` on `useQuery`/`useInfiniteQuery`.
- `useInfiniteQuery()` is now bi-directional: `getFetchMore`→`getNextPageParam`, `canFetchMore`→`hasNextPage`, `fetchMore`→`fetchNextPage`, `isFetchingMore`→`isFetchingNextPage`; added `getPreviousPageParam`/`hasPreviousPage`/`fetchPreviousPage`/`isFetchingPreviousPage`. `data` is now `{ pages: [...], pageParams: [...] }`.
- `useMutation` now returns an **object**, not an array: `const [mutate, {status}] = useMutation()` → `const { mutate, status } = useMutation()`.
- `mutate` no longer returns a promise — use the new `mutateAsync` for async/await usage.
- Collapsed config object for `useQuery`: no more nested `config: {...}` — options are top-level.
- `enabled` must be a strict boolean (`true`/`false`); cast with `!!value`.
- `initialStale` option removed — `initialData` now always counts as regular (stale-by-default unless `staleTime` set) data.
- `forceFetchOnMount` replaced by `refetchOnMount: 'always'`.
- `refetchOnMount: false` now only affects its own component's observer, not all observers of that query.
- `queryFnParamsFilter` removed — filter within the query function using the `QueryFunctionContext`, which includes the query key.
- `notifyOnStatusChange` superseded by `notifyOnChangeProps`/`notifyOnChangePropsExclusions` for granular re-render control.
- `QueryResult.clear()` renamed to `QueryResult.remove()`.
- `QueryResult.updatedAt` split into `dataUpdatedAt` and `errorUpdatedAt`.
- `setConsole()` replaced by `setLogger()`.
- React Native no longer requires manually overriding the console/logger.
- TypeScript: `QueryStatus` changed from an enum to a string-literal union (`QueryStatus.Loading` → `'loading'`, etc.).

## New Features

- `select` option on `useQuery`/`useInfiniteQuery` to derive/transform part of the result.
- `useQueries()` hook for variable-length parallel query execution.
- Retry/offline support for mutations (`retry` option on `useMutation`).
- Mutation persistence to storage, resumable later.
- `QueryObserver`/`InfiniteQueryObserver`/`QueriesObserver` for observing queries outside React.
- `QueryClient.setQueryDefaults()`/`setMutationDefaults()` for per-key default configuration.
- `useIsFetching()` now accepts filters (e.g. by `queryKey`).
- Core logic separated from React (`react-query/core`), usable standalone or with other frameworks.
- Devtools bundled into the main package under `react-query/devtools`.

## Related

- [migrating-to-react-query-4.md](./migrating-to-react-query-4.md)
- [mutations.md](./mutations.md)
- [infinite-queries.md](./infinite-queries.md)
