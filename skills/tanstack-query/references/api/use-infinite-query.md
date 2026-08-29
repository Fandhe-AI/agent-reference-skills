---
source: https://tanstack.com/query/latest/docs/framework/react/reference/useInfiniteQuery
---

# useInfiniteQuery

Extends `useQuery` for managing paginated/infinite data fetching in either or both directions.

## Signature / Usage

```tsx
const {
  data,
  fetchNextPage,
  fetchPreviousPage,
  hasNextPage,
  hasPreviousPage,
  isFetchingNextPage,
  isFetchingPreviousPage,
} = useInfiniteQuery({
  queryKey: ['posts'],
  queryFn: ({ pageParam }) => fetchPage(pageParam),
  initialPageParam: 1,
  getNextPageParam: (lastPage, allPages) => lastPage.nextCursor,
})
```

## Options / Props

Accepts all `useQuery` options, plus:

| Name | Type | Description |
|------|------|-------------|
| `initialPageParam` | `TPageParam` | Required. The starting page parameter for the first fetch |
| `getNextPageParam` | `(lastPage, allPages, lastPageParam, allPageParams) => TPageParam \| undefined \| null` | Required. Returns the next page parameter, or `undefined`/`null` if no next page exists |
| `getPreviousPageParam` | `(firstPage, allPages, firstPageParam, allPageParams) => TPageParam \| undefined \| null` | Returns the previous page parameter, or `undefined`/`null` when none available |
| `maxPages` | `number` | Sets maximum stored pages; reaching the limit removes the oldest/newest page. `undefined` or `0` means unlimited. Both `getNextPageParam` and `getPreviousPageParam` must be defined if `maxPages > 0` |

## Returns

Includes all `useQuery` return properties, plus:

| Name | Type | Description |
|------|------|-------------|
| `data.pages` | `TData[]` | Array of all fetched pages |
| `data.pageParams` | `TPageParam[]` | Array of all page parameters used |
| `fetchNextPage(options?)` | function | Loads subsequent results; supports `cancelRefetch` option |
| `fetchPreviousPage(options?)` | function | Loads prior results; supports `cancelRefetch` option |
| `hasNextPage` / `hasPreviousPage` | `boolean` | Whether more pages are available in either direction |
| `isFetchingNextPage` / `isFetchingPreviousPage` | `boolean` | Loading states for directional fetches |
| `isFetchNextPageError` / `isFetchPreviousPageError` | `boolean` | Error states per direction |

## Notes

- Imperative fetch calls may interfere with default refetch behaviour, resulting in outdated data. Use these functions only for user-triggered actions or guard with conditions like `hasNextPage && !isFetching`

## Related

- [useSuspenseInfiniteQuery](./use-suspense-infinite-query.md)
- [infiniteQueryOptions](./infinite-query-options.md)
- [InfiniteQueryObserver](./infinite-query-observer.md)
