---
source: https://tanstack.com/query/latest/docs/framework/react/guides/filters
---

# Filters

`QueryFilters` and `MutationFilters` objects used by many `QueryClient` methods to match queries/mutations.

## Signature / Usage

```tsx
await queryClient.cancelQueries()
queryClient.removeQueries({ queryKey: ['posts'], type: 'inactive' })
await queryClient.refetchQueries({ type: 'active' })
await queryClient.refetchQueries({ queryKey: ['posts'], type: 'active' })

await queryClient.isMutating({ mutationKey: ['post'] })
await queryClient.isMutating({ predicate: (m) => m.state.variables?.id === 1 })
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `queryKey` | `QueryKey` | Prefix-matches by default |
| `exact` | `boolean` | Match the exact key only |
| `type` | `'active' \| 'inactive' \| 'all'` | Default `all` |
| `stale` | `boolean` | Match stale (`true`) or fresh (`false`) queries |
| `fetchStatus` | `'fetching' \| 'paused' \| 'idle'` | Match by fetch status |
| `predicate` | `(query) => boolean` | Final custom filter |
| `mutationKey` | `MutationKey` | Mutation filter equivalent of `queryKey` |
| `status` | `MutationStatus` | Filter mutations by status |

## Notes

- `matchQuery(filters, query)` and `matchMutation(filters, mutation)` utilities check a single item against a filter object.

## Related

- [query-invalidation.md](./query-invalidation.md)
