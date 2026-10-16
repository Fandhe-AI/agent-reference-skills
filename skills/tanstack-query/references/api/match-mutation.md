---
source: https://tanstack.com/query/latest/docs/framework/react/reference/functions/matchMutation
---

# matchMutation

Checks whether a mutation matches the given `MutationFilters`. Every filter that is specified must match; unspecified filters are ignored.

## Signature / Usage

```ts
function matchMutation(filters: MutationFilters, mutation: Mutation<any, any>): boolean;

const mutationCache = queryClient.getMutationCache()

const matchingMutations = mutationCache
  .getAll()
  .filter((mutation) => matchMutation({ mutationKey: ['addPost'] }, mutation))
```

## Options / Props

`filters` properties:

| Name | Type | Description |
|------|------|-------------|
| `exact?` | `boolean` | Match mutation key exactly |
| `mutationKey?` | `readonly unknown[]` | Include mutations matching this mutation key |
| `predicate?` | `(mutation: Mutation<TData, TError, TVariables, TOnMutateResult>) => boolean` | Include mutations matching this predicate function |
| `status?` | `"error" \| "pending" \| "success" \| "idle"` | Filter by mutation status |

## Notes

- If a `mutationKey` filter is provided but the mutation has no `mutationKey` of its own, it does not match.
- Returns `true` if the mutation matches every specified filter.
- Defined in `packages/query-core/src/utils.ts`.

## Related

- [matchQuery](./match-query.md)
- [Mutation](./mutation.md)
- [MutationCache](./mutation-cache.md)
