---
source: https://tanstack.com/query/latest/docs/framework/react/guides/migrating-to-v5
---

# Migrating to v5

Breaking changes and new features when upgrading from v4 to v5.

## Signature / Usage

```tsx
useQuery(key, fn, options) // [!code --]
useQuery({ queryKey, queryFn, ...options }) // [!code ++]
```

## Notes (Breaking changes)

- **Single object signature only** — all overloads removed. `useQuery(key, fn, options)` → `useQuery({ queryKey, queryFn, ...options })`. Same for `useInfiniteQuery`, `useMutation`, `useIsFetching`, `useIsMutating`, and `QueryClient`/`QueryCache` methods (`isFetching`, `getQueriesData`, `setQueriesData`, `removeQueries`, `resetQueries`, `cancelQueries`, `invalidateQueries`, `refetchQueries`, `find`, `findAll`). A codemod (`jscodeshift` + `remove-overloads.cjs`) automates most of this.
- **Imperative methods deprecated**: `fetchQuery`/`prefetchQuery`/`fetchInfiniteQuery`/`prefetchInfiniteQuery`/`ensureQueryData`/`ensureInfiniteQueryData` → replaced by `queryClient.query(...)` / `queryClient.infiniteQuery(...)` (add `.catch(noop)` for prefetch-style fire-and-forget, `staleTime: 'static'` for `ensure*` semantics).
- `getQueryData`/`getQueryState` no longer accept a `filters` second argument — key only.
- Query-level `onSuccess`/`onError`/`onSettled` callbacks **removed** (mutations keep them).
- `refetchInterval` callback signature changed from `(data, query) => ...` to `(query) => ...`; read `query.state.data` instead.
- `query.remove()` removed — use `queryClient.removeQueries({ queryKey })`.
- Minimum TypeScript **4.7+**.
- `isDataEqual` removed — use `structuralSharing` (`replaceEqualDeep` available for custom logic).
- **`cacheTime` renamed to `gcTime`**.
- **`useErrorBoundary` renamed to `throwOnError`**.
- Default error type in TS is now `Error` instead of `unknown`.
- **`keepPreviousData: true` removed** — use `placeholderData: keepPreviousData` (imported from `@tanstack/react-query`); `isPreviousData` → `isPlaceholderData`. Note: `placeholderData` always yields `success` state, and `dataUpdatedAt` stays `0` for placeholders (workaround: track `dataUpdatedAt` via `useEffect`).
- Window focus refetching now uses `visibilitychange` only (no more `focus` event listener).
- Network status no longer trusts `navigator.onLine`; starts `online: true`, reacts to `online`/`offline` events only.
- Custom `context` prop removed from hooks — pass a `queryClient` instance directly instead.
- `refetchPage` removed for infinite queries — replaced by `maxPages`.
- `dehydrateQueries`/`dehydrateMutations` booleans replaced by `shouldDehydrateQuery`/`shouldDehydrateMutation` functions.
- Infinite queries **require `initialPageParam`**; "manual mode" overriding `pageParams` via `fetchNextPage`/`fetchPreviousPage` removed — `getNextPageParam` is mandatory. Returning `null` (not just `undefined`) from `getNextPageParam`/`getPreviousPageParam` now also signals no further page.
- Server default `retry` is now `0` (was `3`).
- **`status: 'loading'` renamed to `'pending'`**; `isLoading` renamed meaning: `isLoading` now means `isPending && isFetching` (replaces old `isInitialLoading`).
- `hashQueryKey` renamed to `hashKey` (hashes both query and mutation keys).
- **React 18.0+ required** (uses `useSyncExternalStore`).
- `contextSharing` prop removed from `QueryClientProvider` — share a `queryClient` instance directly.
- `unstable_batchedUpdates` auto-wiring removed (noop in React 18); use `notifyManager.setBatchNotifyFunction` for custom framework batching (e.g. Solid).
- **`Hydrate` renamed to `HydrationBoundary`**; `useHydrate` removed; mutations no longer hydrated by default.
- `getQueryDefaults` now **merges** all matching registrations (order generic → specific), instead of returning only the first match.

## New Features

- Simplified optimistic updates using `mutation.variables`/`isPending` without touching the cache (see [optimistic-updates.md](./optimistic-updates.md)).
- `maxPages` option limits stored infinite-query pages (requires both `getNextPageParam` and `getPreviousPageParam`).
- Infinite-query multi-page prefetching via the `pages` option.
- `combine` option on `useQueries` to transform aggregated results.
- Experimental `experimental_createPersister` for fine-grained persistence.
- New Suspense hooks: `useSuspenseQuery`, `useSuspenseInfiniteQuery`, `useSuspenseQueries` (the old `suspense: true` flag is removed).

## Related

- [migrating-to-react-query-4.md](./migrating-to-react-query-4.md)
- [disabling-queries.md](./disabling-queries.md)
- [infinite-queries.md](./infinite-queries.md)
- [placeholder-query-data.md](./placeholder-query-data.md)
- [ssr.md](./ssr.md)
