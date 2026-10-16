---
source: https://tanstack.com/query/latest/docs/framework/react/reference/functions/matchQuery
---

# matchQuery

Checks whether a query matches the given `QueryFilters`. Every filter that is specified must match; unspecified filters are ignored.

## Signature / Usage

```ts
function matchQuery(filters: QueryFilters, query: Query<any, any, any, any>): boolean;

const queryCache = queryClient.getQueryCache()

const matchingQueries = queryCache
  .getAll()
  .filter((query) => matchQuery({ queryKey: ['posts'] }, query))
```

## Options / Props

`filters` properties:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `exact?` | `boolean` | `undefined` | Match query key exactly |
| `fetchStatus?` | `"fetching" \| "paused" \| "idle"` | `undefined` | Include queries matching their fetchStatus |
| `predicate?` | `(query: Query) => boolean` | `undefined` | Include queries matching this predicate function |
| `queryKey?` | `TQueryKey \| TuplePrefixes<TQueryKey>` | `undefined` | Include queries matching this query key |
| `stale?` | `boolean` | `undefined` | Include or exclude stale queries |
| `type?` | `QueryTypeFilter` | `'all'` | Filter to active queries, inactive queries or all queries |

## Notes

- Returns `true` if the query matches every specified filter.
- Defined in `packages/query-core/src/utils.ts`.

## Related

- [matchMutation](./match-mutation.md)
- [Query](./query.md)
- [QueryCache](./query-cache.md)
