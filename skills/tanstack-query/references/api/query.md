---
source: https://tanstack.com/query/latest/docs/framework/react/reference/classes/Query
---

# Query (class)

Represents a single cached query. Holds the query's key, options, state (data/error/status), and the observers subscribed to it. Extends `Removable`.

## Signature / Usage

```ts
const queryCache = queryClient.getQueryCache()
const query = queryCache.find({ queryKey: ['posts'] })

if (query) {
  console.log(query.state.dataUpdatedAt)
}
```

Type parameters: `TQueryFnData = unknown`, `TError = DefaultError`, `TData = TQueryFnData`, `TQueryKey extends QueryKey = QueryKey`.

```ts
new Query<TQueryFnData, TError, TData, TQueryKey>(config: QueryConfig<TQueryFnData, TError, TData, TQueryKey>)
```

## Properties

| Name | Type | Description |
|------|------|-------------|
| `gcTime` | `number` | Inherited from `Removable` |
| `observers` | `QueryObserver<any, any, any, any, any>[]` | Subscribed observers |
| `options` | `QueryOptions<TQueryFnData, TError, TData, TQueryKey>` | Query options |
| `queryHash` | `string` | Hash of the key |
| `queryKey` | `TQueryKey` | The query key |
| `state` | `QueryState<TData, TError>` | Current state |
| `meta` (getter) | `Record<string, unknown> \| undefined` | The `meta` passed in options, if any |
| `promise` (getter) | `Promise<TData> \| undefined` | Promise of the in-flight fetch; `undefined` when not fetching |

## Methods

| Name | Description |
|------|-------------|
| `cancel(options?: CancelOptions): Promise<void>` | Cancels the in-flight fetch, if any. `revert` restores the pre-fetch state; `silent` suppresses the cancellation error when a new fetch replaces it. Resolves immediately if no fetch is in progress |
| `destroy(): void` | Clears the gc timeout and silently cancels any in-flight fetch. Called by `QueryCache` on removal |
| `fetch(options?, fetchOptions?): Promise<TData>` | Runs `queryFn` and updates state. Reuses an in-flight fetch unless `fetchOptions.cancelRefetch` is set and the query has data. `options` replace current options before fetching (not applied when an in-flight fetch is reused) |
| `getObserversCount(): number` | Number of subscribed observers |
| `invalidate(): void` | Marks the query as invalidated (updates `state.isInvalidated`, notifies observers); does not itself trigger a refetch |
| `isActive(): boolean` | `true` if at least one observer has `enabled` not resolving to `false` |
| `isDisabled(): boolean` | With observers: none active. Without observers: `queryFn` is `skipToken` or never fetched |
| `isFetched(): boolean` | `true` if resolved with data or error at least once |
| `isStale(): boolean` | With observers: any observer result reports `isStale`. Without: no data or invalidated |
| `isStaleByTime(staleTime?: number \| "static"): boolean` | Stale relative to `staleTime` (default `0`). No data is always stale; `'static'` is never stale; invalidated is always stale |
| `isStatic(): boolean` | `true` if at least one observer has `staleTime: 'static'` |
| `reset(): void` | Resets to initial state (e.g. `initialData`), destroying first to cancel any fetch |
| `setState(state: Partial<QueryState<TData, TError>>): void` | Merges partial state and notifies observers. Used by persistence/broadcast plugins and devtools |

## Notes

- Instances are created and managed internally by `QueryCache`; application code normally uses `QueryClient` or hooks like `useQuery`. Direct access is via `queryCache.find()` / `findAll()`.
- Defined in `packages/query-core/src/query.ts`.

## Related

- [QueryCache](./query-cache.md)
- [QueryObserver](./query-observer.md)
- [matchQuery](./match-query.md)
- [skipToken](./skip-token.md)
