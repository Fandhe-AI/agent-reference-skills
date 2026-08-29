---
source: https://tanstack.com/query/latest/docs/framework/react/guides/placeholder-query-data
---

# Placeholder Query Data

Lets a query render as if it already has data, without persisting to the cache — useful for previews or partial data while the real fetch runs.

## Signature / Usage

```tsx
const result = useQuery({
  queryKey: ['todos'],
  queryFn: () => fetch('/todos'),
  placeholderData: placeholderTodos,
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `placeholderData` | `T \| ((previousData, previousQuery) => T)` | Not persisted to cache; query starts in `success` state |

## Notes

- Unlike `initialData`, placeholder data is **not** written to the cache.
- Queries using `placeholderData` start in `success` state (not `pending`); use `isPlaceholderData` to distinguish placeholder from real data.
- Function form receives previous data/query — used e.g. for paginated queries via `keepPreviousData`.

## Related

- [initial-query-data.md](./initial-query-data.md)
- [paginated-queries.md](./paginated-queries.md)
