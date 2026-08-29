---
source: https://tanstack.com/query/latest/docs/framework/react/guides/migrating-to-react-query-4
---

# Migrating to React Query 4

Breaking changes and new features when upgrading from v3 to v4.

## Signature / Usage

```bash
npm uninstall react-query
npm install @tanstack/react-query
npm install @tanstack/react-query-devtools
```

## Notes (Breaking changes)

- **Package renamed**: `react-query` → `@tanstack/react-query` (and `@tanstack/react-query-devtools`). A codemod (`replace-import-specifier.js`) automates import rewriting.
- **Query/mutation keys must be arrays**: `useQuery('todos', fetchTodos)` → `useQuery(['todos'], fetchTodos)`. A codemod (`key-transformation.js`) automates this.
- **`idle` status removed** — disabled queries now start as `status: 'loading'`, `fetchStatus: 'idle'`. Use `isInitialLoading` (not `isLoading`) to detect genuine first-fetch spinners on disabled queries.
- **`useQueries` new API**: takes `{ queries: [...] }` instead of a bare array.
- **`undefined` is an illegal cache value** for successful queries — a `queryFn` resolving to `undefined` now becomes a failed Promise/error (previously silently allowed, easy source of `Promise<void>` bugs).
- **Queries/mutations require network by default** (`networkMode: 'online'`) — opt back into pre-v4 behavior via `networkMode: 'offlineFirst'` globally.
- `notifyOnChangeProps` no longer accepts `"tracked"` — tracking is now the default; use `"all"` to opt out (emulate v3 always-re-render behavior).
- `notifyOnChangePropsExclusions` removed (no longer meaningful once tracked is default).
- **`cancelRefetch` now defaults to `true`** across `refetchQueries`, `invalidateQueries`, `resetQueries`, `refetch`, `fetchNextPage`/`fetchPreviousPage` (previously inconsistent).
- **Query filters simplified**: `active`/`inactive` booleans → single `type: 'active' | 'inactive' | 'all'`; `refetchActive`/`refetchInactive` → `refetchType: 'active' | 'inactive' | 'all' | 'none'`.
- **`onSuccess` no longer fires from `setQueryData`** — it is now tied to an actual request (like `onError`/`onSettled`); use a `useEffect` on `data` instead to react to cache changes.
- `persistQueryClient` plugins are no longer experimental; renamed: `createWebStoragePersistor` → `createSyncStoragePersister`, `createAsyncStoragePersistor` → `createAsyncStoragePersister`; import paths moved to dedicated packages (`@tanstack/react-query-persist-client`, `@tanstack/query-sync-storage-persister`, `@tanstack/query-async-storage-persister`).
- The old promise `cancel` method support removed — use the `AbortSignal`-based cancellation API.
- Minimum TypeScript **4.1+**.
- `setLogger` removed — pass `logger` when constructing `QueryClient` instead (this itself was later removed/deprecated in v5 territory).
- Server-side `cacheTime` (now `gcTime`) defaults to `Infinity`, avoiding high memory use from manual GC on the server.
- Production console error logging removed (dev-mode only).
- `QueryCacheNotifyEvent` types renamed: `queryAdded`→`added`, `queryRemoved`→`removed`, `queryUpdated`→`updated`; `MutationCacheNotifyEvent` follows the same scheme.
- Hydration exports consolidated into the core package (`react-query/hydration` sub-path removed).
- Undocumented `queryClient.cancelMutations`/`executeMutation`, `query.setDefaultOptions`, `mutation.cancel` removed.

## New Features

- First-class React 18 support.
- Proper offline support via the new `networkMode`.
- Tracked queries are the default (render-optimization).
- `setQueryData` functional updater can bail out by returning `undefined`.
- Mutation cache garbage collection (default `cacheTime` 5 minutes for mutations too).
- Custom `context` per hook to pair with a specific `QueryClientProvider` when multiple providers exist in the tree.

## Related

- [migrating-to-react-query-3.md](./migrating-to-react-query-3.md)
- [migrating-to-v5.md](./migrating-to-v5.md)
- [network-mode.md](./network-mode.md)
