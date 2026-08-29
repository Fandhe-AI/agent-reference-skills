---
source: https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults
---

# Important Defaults

TanStack Query ships with aggressive but sane defaults. Understanding them avoids confusion when debugging refetch/caching behavior.

## Signature / Usage

```tsx
// staleTime: 0 by default — data is considered stale immediately after fetch
const { data } = useQuery({ queryKey: ['todos'], queryFn: fetchTodos })
```

## Notes

- Queries via `useQuery`/`useInfiniteQuery` consider cached data **stale** immediately by default (`staleTime: 0`).
- `staleTime` controls how long data is considered fresh:
  - a finite number (e.g. `2 * 60 * 1000`) delays refetch for that duration
  - `Infinity` never refetches until manually invalidated
  - `'static'` never refetches, even with manual `queryClient.invalidateQueries()` (v5.36+)
- Stale queries auto-refetch in background on: new query instance mount, window refocus, network reconnect.
- `refetchInterval` triggers periodic polling, independent of `staleTime`. See [Polling](./polling.md).
- Queries with no active observers become "inactive" and are garbage collected after `gcTime` (default **5 minutes**).
- Failed queries are silently retried **3 times** with exponential backoff before surfacing an error.
- Query results use **structural sharing**: unchanged data keeps the same object reference (helps `useMemo`/`useCallback`). Works only for JSON-compatible values; disable via `structuralSharing: false` or provide a custom function.

## Related

- [polling.md](./polling.md)
- [query-invalidation.md](./query-invalidation.md)
- [caching.md](./caching.md)
