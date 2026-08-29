---
source: https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation
---

# Query Invalidation

`queryClient.invalidateQueries` marks matching queries stale and refetches any that are currently rendered.

## Signature / Usage

```tsx
queryClient.invalidateQueries() // all queries
queryClient.invalidateQueries({ queryKey: ['todos'] }) // prefix match
queryClient.invalidateQueries({ queryKey: ['todos'], exact: true }) // exact match only
queryClient.invalidateQueries({
  predicate: (query) => query.queryKey[0] === 'todos' && query.queryKey[1]?.version >= 10,
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `queryKey` | `QueryKey` | Prefix-matches queries by default |
| `exact` | `boolean` | Match only the exact key |
| `predicate` | `(query) => boolean` | Custom matching logic |

## Notes

- Invalidation marks a query stale (overriding any `staleTime`) and, if currently rendered, refetches it in background.
- Uses the same [Query Filters](./filters.md#query-filters) syntax as other batch operations.

## Related

- [filters.md](./filters.md)
- [invalidations-from-mutations.md](./invalidations-from-mutations.md)
