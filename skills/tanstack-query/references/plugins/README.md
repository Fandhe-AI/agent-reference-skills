# plugins

`kubb` は TanStack Query 用のフックコード生成ツールであり、本カテゴリ（ESLint ルール・永続化プラグイン）の対象外。

| Name | Description | Path |
| --- | --- | --- |
| eslint-plugin-query | ESLint plugin overview and setup for TanStack Query | [eslint-plugin-query.md](./eslint-plugin-query.md) |
| exhaustive-deps | Ensures query keys contain all serializable values used by queryFn | [exhaustive-deps.md](./exhaustive-deps.md) |
| stable-query-client | Enforces a single QueryClient instance for the app lifecycle | [stable-query-client.md](./stable-query-client.md) |
| no-rest-destructuring | Disallows rest destructuring on query results | [no-rest-destructuring.md](./no-rest-destructuring.md) |
| no-unstable-deps | Disallows unstable query/mutation objects in hook dependency arrays | [no-unstable-deps.md](./no-unstable-deps.md) |
| infinite-query-property-order | Enforces property order for useInfiniteQuery/infiniteQueryOptions | [infinite-query-property-order.md](./infinite-query-property-order.md) |
| no-void-query-fn | Disallows queryFn that returns nothing | [no-void-query-fn.md](./no-void-query-fn.md) |
| mutation-property-order | Enforces property order for useMutation callbacks | [mutation-property-order.md](./mutation-property-order.md) |
| prefer-query-options | Requires queryOptions to co-locate queryKey and queryFn | [prefer-query-options.md](./prefer-query-options.md) |
| persistQueryClient | Persists a QueryClient's cache across sessions via a Persister | [persist-query-client.md](./persist-query-client.md) |
| createSyncStoragePersister | Persister backed by synchronous Web Storage (deprecated) | [create-sync-storage-persister.md](./create-sync-storage-persister.md) |
| createAsyncStoragePersister | Persister backed by async storage (e.g. React Native AsyncStorage) | [create-async-storage-persister.md](./create-async-storage-persister.md) |
| broadcastQueryClient | Syncs QueryClient state across browser tabs (experimental) | [broadcast-query-client.md](./broadcast-query-client.md) |
| createPersister | Per-query persistence layer (experimental) | [create-persister.md](./create-persister.md) |
