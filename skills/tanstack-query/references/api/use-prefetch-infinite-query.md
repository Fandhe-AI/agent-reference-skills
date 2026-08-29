---
source: https://tanstack.com/query/latest/docs/framework/react/reference/usePrefetchInfiniteQuery
---

# usePrefetchInfiniteQuery

Prefetches data for an infinite query during render, typically before a suspense boundary that wraps a component using `useSuspenseInfiniteQuery`.

## Signature / Usage

```tsx
usePrefetchInfiniteQuery({
  queryKey: ['posts'],
  queryFn: ({ pageParam }) => fetchPage(pageParam),
  initialPageParam: 1,
  getNextPageParam: (lastPage) => lastPage.nextCursor,
})
```

## Options / Props

Accepts the same configuration options as `queryClient.infiniteQuery`.

| Name | Type | Description |
|------|------|-------------|
| `queryKey` | `QueryKey` | Required. The identifier for the query to prefetch |
| `queryFn` | function | Required unless a default is configured. The async function that fetches data |
| `initialPageParam` | `TPageParam` | Required. The starting page parameter for the first fetch |
| `getNextPageParam` | `(lastPage, allPages) => TPageParam \| undefined \| null` | Required. Determines the next page parameter; returns `undefined`/`null` when no additional pages exist |

## Returns

No return value; `usePrefetchInfiniteQuery` should be used just to fire a prefetch during render.

## Related

- [useSuspenseInfiniteQuery](./use-suspense-infinite-query.md)
- [usePrefetchQuery](./use-prefetch-query.md)
