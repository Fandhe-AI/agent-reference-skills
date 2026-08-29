---
source: https://tanstack.com/query/latest/docs/framework/react/guides/caching
---

# Caching

Walkthrough of the query cache lifecycle: mount, background refetch, unmount, garbage collection.

## Signature / Usage

```tsx
// Mount 1: hard loading state -> fetch -> cache under ['todos']
const { data } = useQuery({ queryKey: ['todos'], queryFn: fetchTodos })
```

## Notes

- With default `gcTime` (5 minutes) and `staleTime` (`0`):
  - First `useQuery({ queryKey: ['todos'], queryFn: fetchTodos })` mount: hard loading state, fetches, caches result under `['todos']`, marked stale immediately.
  - A second mount elsewhere reuses cached data instantly, then triggers its own background refetch; both instances update together (same key).
  - When all instances unmount, a GC timer (`gcTime`) starts; the cache entry is deleted if no new instance mounts before it elapses.
  - A remount before GC fires returns cached data immediately while refetching in background.

## Related

- [important-defaults.md](./important-defaults.md)
- [scroll-restoration.md](./scroll-restoration.md)
