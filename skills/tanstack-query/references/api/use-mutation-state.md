---
source: https://tanstack.com/query/latest/docs/framework/react/reference/useMutationState
---

# useMutationState

Provides access to all mutations stored in the `MutationCache`. Filters can narrow down specific mutations, and a `select` function can transform the mutation state before returning it.

## Signature / Usage

```tsx
import { useMutationState } from '@tanstack/react-query'

const pendingMutations = useMutationState({
  filters: { status: 'pending' },
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `filters` | `MutationFilters` | Narrow down mutations by `status` or `mutationKey` |
| `select` | `(mutation: Mutation) => TResult` | Transform each matching mutation's state into a desired format |
| `queryClient` | `QueryClient` | Custom QueryClient instance; defaults to the nearest context provider |

## Returns

`Array<TResult>` — array length matches the number of mutations meeting the filter criteria.

## Notes

- Multiple invocations of `mutate` add separate cache entries persisting for the `gcTime` duration
- Access the most recent mutation via `data[data.length - 1]`
- Common use cases: tracking pending mutations' variables, retrieving specific mutation results by key

## Related

- [useMutation](./use-mutation.md)
- [useIsMutating](./use-is-mutating.md)
- [MutationCache](./mutation-cache.md)
