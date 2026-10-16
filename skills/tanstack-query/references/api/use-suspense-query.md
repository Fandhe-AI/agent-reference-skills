---
source: https://tanstack.com/query/latest/docs/framework/react/reference/useSuspenseQuery
---

# useSuspenseQuery

A variant of `useQuery` that integrates with React Suspense.

## Signature / Usage

```tsx
const result = useSuspenseQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
})
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| (all `useQuery` options) | same as `useQuery` | — | Same options as `useQuery`, except the options below |
| `throwOnError` | — | — | Not available |
| `enabled` | — | — | Not available |
| `placeholderData` | — | — | Not available |

## Returns

Returns the same object as `useQuery`, with these differences:

| Name | Description |
|------|-------------|
| `data` | Always defined (never `undefined`) |
| `isPlaceholderData` | Absent |
| `status` | Can only be `'success'` or `'error'`, with derived flags updated accordingly |

## Notes

- Query cancellation does not work with this hook

## Related

- [useQuery](./use-query.md)
- [useSuspenseQueries](./use-suspense-queries.md)
- [useSuspenseInfiniteQuery](./use-suspense-infinite-query.md)
- [usePrefetchQuery](./use-prefetch-query.md)
