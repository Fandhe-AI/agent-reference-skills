---
source: https://tanstack.com/query/latest/docs/framework/react/reference/usePrefetchQuery
---

# usePrefetchQuery

Initiates data fetching during component rendering, typically before a suspense boundary that wraps components using `useSuspenseQuery`.

## Signature / Usage

```tsx
usePrefetchQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
})
```

## Options / Props

Accepts configuration parameters available to `queryClient.query`.

| Name | Type | Description |
|------|------|-------------|
| `queryKey` | `QueryKey` | Required. The query key to prefetch during render |
| `queryFn` | function | Required conditionally — only necessary if no default query function exists. Returns `TQueryFnData \| Promise<TQueryFnData>` |

## Returns

No return value. Its sole purpose is executing prefetch operations during the render phase.

## Notes

- Works in tandem with `useSuspenseQuery` for optimal data loading patterns
- Should be positioned before suspense boundaries in the component hierarchy
- Requires either a `queryFn` parameter or a pre-configured default query function

## Related

- [useSuspenseQuery](./use-suspense-query.md)
- [usePrefetchInfiniteQuery](./use-prefetch-infinite-query.md)
