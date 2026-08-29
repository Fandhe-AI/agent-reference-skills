---
source: https://tanstack.com/query/latest/docs/framework/react/reference/useQuery
---

# useQuery

React hook that manages asynchronous data fetching with built-in caching, synchronization, and state management.

## Signature / Usage

```tsx
import { useQuery } from '@tanstack/react-query'

const result = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `queryKey` | `QueryKey` | Required. Unique identifier array hashed into a stable key; triggers auto-update on changes |
| `queryFn` | `(context: QueryFunctionContext) => Promise<TData>` | Required. The function that requests data; must return a Promise resolving data (not `undefined`) |
| `enabled` | `boolean` | Disables automatic query execution when `false` |
| `subscribed` | `boolean` | If set to `false`, this instance will not be subscribed to the cache |
| `networkMode` | `'online' \| 'always' \| 'offlineFirst'` | Default `'online'` |
| `retry` | `boolean \| number \| (failureCount, error) => boolean` | `false`: no retry. `true`: infinite retry. number: retry until that count. function: custom logic |
| `retryOnMount` | `boolean` | Whether to retry on mount if error exists; defaults `true` |
| `retryDelay` | `(attempt: number, error) => number` | Returns millisecond delay for a given retry attempt |
| `staleTime` | `number \| 'static' \| (query) => number` | Milliseconds until data considered stale (default `0`) |
| `gcTime` | `number` | Milliseconds inactive cache persists in memory (default 5 minutes) |
| `initialData` | `TData \| () => TData` | Sets initial cache value; considered stale unless `staleTime` specified |
| `initialDataUpdatedAt` | `number \| () => number` | Timestamp for when `initialData` was last updated |
| `refetchInterval` | `number \| false \| (query) => number \| false` | Continuous refetch frequency in milliseconds |
| `refetchIntervalInBackground` | `boolean` | Continues refetching when tab is inactive |
| `refetchOnMount` | `boolean \| 'always'` | Default `true` |
| `refetchOnWindowFocus` | `boolean \| 'always'` | Default `true` |
| `refetchOnReconnect` | `boolean \| 'always'` | Default `true` |
| `select` | `(data: TQueryFnData) => TData` | Transforms or selects part of the data returned by the query function |
| `placeholderData` | `TData \| (previousData, previousQuery) => TData` | Used as placeholder while the query is still `pending` |
| `structuralSharing` | `boolean` | Retains data references across renders (default `true`) |
| `throwOnError` | `boolean \| (error, query) => boolean` | Propagates errors to nearest error boundary |
| `meta` | `Record<string, unknown>` | Additional metadata stored on the cache entry |
| `queryKeyHashFn` | `(queryKey: QueryKey) => string` | Custom key hashing function |
| `notifyOnChangeProps` | `string[]` | Specifies which returned properties trigger a re-render |

## Returns

| Name | Type | Description |
|------|------|-------------|
| `status` | `'pending' \| 'error' \| 'success'` | Overall query status |
| `isPending` / `isSuccess` / `isError` | `boolean` | Derived from `status` |
| `isLoadingError` | `boolean` | `true` if first fetch failed |
| `isRefetchError` | `boolean` | `true` if refetch failed |
| `data` | `TData \| undefined` | Last successful response |
| `error` | `TError \| null` | Error object or `null` |
| `dataUpdatedAt` | `number` | Timestamp of last success |
| `errorUpdatedAt` | `number` | Timestamp of last error |
| `fetchStatus` | `'fetching' \| 'paused' \| 'idle'` | Current fetch activity |
| `isFetching` / `isPaused` | `boolean` | Derived from `fetchStatus` |
| `isLoading` | `boolean` | `true` whenever the first fetch for a query is in-flight |
| `isRefetching` | `boolean` | `true` whenever a background refetch is in-flight |
| `isFetched` / `isFetchedAfterMount` | `boolean` | Fetch completion indicators |
| `isStale` | `boolean` | `true` if invalidated or older than `staleTime` |
| `isPlaceholderData` | `boolean` | `true` if displaying placeholder data |
| `failureCount` | `number` | Incremented on failure, reset on success |
| `failureReason` | `TError \| null` | Error from last retry attempt |
| `errorUpdateCount` | `number` | Sum of all errors |
| `isEnabled` | `boolean` | Whether the query observer is active |
| `refetch(options?)` | `(options?: { throwOnError?, cancelRefetch? }) => Promise` | Manually refetches |

## Related

- [useQueries](./use-queries.md)
- [useSuspenseQuery](./use-suspense-query.md)
- [queryOptions](./query-options.md)
- [QueryObserver](./query-observer.md)
