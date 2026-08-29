---
source: https://tanstack.com/query/latest/docs/framework/react/reference/useSuspenseQueries
---

# useSuspenseQueries

A variant of `useQueries` that integrates with React Suspense, ensuring data is available before component rendering.

## Signature / Usage

```tsx
const result = useSuspenseQueries({
  queries: [
    { queryKey: ['post', 1], queryFn: fetchPost },
    { queryKey: ['post', 2], queryFn: fetchPost },
  ],
})
```

## Options / Props

Accepts the same configuration as `useQueries`, except individual queries cannot include `throwOnError`, `enabled`, or `placeholderData`.

## Returns

Matches `useQueries` structure, with these differences:

| Name | Description |
|------|-------------|
| `data` | Guaranteed to be defined |
| `isPlaceholderData` | Absent |
| `status` | Either `'success'` or `'error'`, with corresponding derived flags |

## Notes

- The `select` parameter requires explicit type annotation or the `queryOptions` helper to maintain proper type inference
- The component won't mount until all queries have finished loading. If queries become stale during the loading period, they'll refetch upon mounting; increase `staleTime` to prevent unnecessary refetches
- Query cancellation functionality is unavailable with this hook

## Related

- [useQueries](./use-queries.md)
- [useSuspenseQuery](./use-suspense-query.md)
