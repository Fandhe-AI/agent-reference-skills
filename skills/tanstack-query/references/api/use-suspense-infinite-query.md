---
source: https://tanstack.com/query/latest/docs/framework/react/reference/useSuspenseInfiniteQuery
---

# useSuspenseInfiniteQuery

A variant of `useInfiniteQuery` that integrates with React Suspense.

## Signature / Usage

```tsx
const result = useSuspenseInfiniteQuery({
  queryKey: ['posts'],
  queryFn: ({ pageParam }) => fetchPage(pageParam),
  initialPageParam: 1,
  getNextPageParam: (lastPage) => lastPage.nextCursor,
})
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| (all `useInfiniteQuery` options) | same as `useInfiniteQuery` | — | Same configuration as `useInfiniteQuery`, except the options below |
| `throwOnError` | — | — | Not supported |
| `enabled` | — | — | Not supported |
| `placeholderData` | — | — | Not supported |

## Returns

The same object as `useInfiniteQuery`, with these differences:

| Name | Description |
|------|-------------|
| `data` | Guaranteed to be defined |
| `isPlaceholderData` | Unavailable |
| `status` | Resolves to `'success'` or `'error'` only, with derived flags updated accordingly |

## Notes

- Cancellation does not work with this hook

## Related

- [useInfiniteQuery](./use-infinite-query.md)
- [useSuspenseQuery](./use-suspense-query.md)
- [usePrefetchInfiniteQuery](./use-prefetch-infinite-query.md)
