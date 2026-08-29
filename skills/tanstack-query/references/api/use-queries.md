---
source: https://tanstack.com/query/latest/docs/framework/react/reference/useQueries
---

# useQueries

Enables fetching a variable number of queries in a single call.

## Signature / Usage

```tsx
import { useQueries } from '@tanstack/react-query'

const results = useQueries({
  queries: [
    { queryKey: ['post', 1], queryFn: fetchPost },
    { queryKey: ['post', 2], queryFn: fetchPost },
  ],
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `queries` | `QueryOptions[]` | Required. An array of query configuration objects matching `useQuery` options (except `queryClient`) |
| `queryClient` | `QueryClient` | Custom QueryClient instance; defaults to the nearest context provider |
| `combine` | `(result: UseQueriesResults) => TCombinedResult` | Transforms multiple query results into a single combined value with structural sharing for referential stability |

## Returns

An array of query results in the same order as the input `queries`. When `combine` is used, returns the transformed single value instead.

## Notes

- Repeating query keys across the array may cause data sharing; consider deduplication strategies
- `placeholderData` behaves differently than in `useQuery` since query count can vary per render
- The `combine` function re-executes only when it changes referentially or query results update; wrap in `useCallback` to prevent unnecessary reruns
- TypeScript limitation: inline `select` parameters default to `unknown`; use explicit type annotations or the `queryOptions` helper

## Related

- [useQuery](./use-query.md)
- [useSuspenseQueries](./use-suspense-queries.md)
- [QueriesObserver](./queries-observer.md)
