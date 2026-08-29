---
source: https://tanstack.com/query/latest/docs/framework/react/guides/infinite-queries
---

# Infinite Queries

`useInfiniteQuery` handles "load more"/infinite-scroll UI, returning `{ pages: [], pageParams: [] }` plus pagination controls.

## Signature / Usage

```tsx
import { useInfiniteQuery } from '@tanstack/react-query'

const fetchProjects = async ({ pageParam }) => {
  const res = await fetch('/api/projects?cursor=' + pageParam)
  return res.json()
}

const {
  data,
  error,
  fetchNextPage,
  hasNextPage,
  isFetching,
  isFetchingNextPage,
  status,
} = useInfiniteQuery({
  queryKey: ['projects'],
  queryFn: fetchProjects,
  initialPageParam: 0,
  getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
})
```

Bi-directional:

```tsx
useInfiniteQuery({
  queryKey: ['projects'],
  queryFn: fetchProjects,
  initialPageParam: 0,
  getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  getPreviousPageParam: (firstPage, pages) => firstPage.prevCursor,
})
```

Limit stored pages:

```tsx
useInfiniteQuery({
  queryKey: ['projects'],
  queryFn: fetchProjects,
  initialPageParam: 0,
  getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  getPreviousPageParam: (firstPage, pages) => firstPage.prevCursor,
  maxPages: 3,
})
```

No cursor from API:

```tsx
useInfiniteQuery({
  queryKey: ['projects'],
  queryFn: fetchProjects,
  initialPageParam: 0,
  getNextPageParam: (lastPage, allPages, lastPageParam) =>
    lastPage.length === 0 ? undefined : lastPageParam + 1,
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `initialPageParam` | `TPageParam` | **Required** since v5. Initial value passed to `queryFn` |
| `getNextPageParam` | `(lastPage, allPages, lastPageParam) => TPageParam \| undefined \| null` | Computes next page param; `undefined`/`null` means no more pages |
| `getPreviousPageParam` | `(firstPage, allPages, firstPageParam) => TPageParam \| undefined \| null` | Enables bi-directional infinite lists |
| `maxPages` | `number` | Caps stored pages for memory/perf |

## Notes

- v5: `initialPageParam` and `getNextPageParam` are required; the old "manual mode" (overriding `pageParams` via `fetchNextPage`) was removed.
- Calling `fetchNextPage` while a fetch is already in progress risks overwriting a background refresh — check `isFetching` first.
- Manual cache edits (e.g. removing a page) must return a new `{ pages, pageParams }` object immutably via `queryClient.setQueryData`.
- Stale infinite queries refetch sequentially from the first page to avoid stale cursors causing duplicates/gaps.
- Prefetching supports multiple pages via the `pages` option on `queryClient.infiniteQuery` (needs `getNextPageParam`).

## Related

- [paginated-queries.md](./paginated-queries.md)
- [prefetching.md](./prefetching.md)
