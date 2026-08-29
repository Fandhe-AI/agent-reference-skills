---
source: https://tanstack.com/query/latest/docs/framework/react/guides/query-options
---

# Query Options

`queryOptions` co-locates `queryKey` and `queryFn` (and other options) while giving full TypeScript inference across `useQuery`, `useQueries`, `useSuspenseQuery`, and `QueryClient` methods.

## Signature / Usage

```ts
import { queryOptions, useQuery } from '@tanstack/react-query'

function groupOptions(id: number) {
  return queryOptions({
    queryKey: ['groups', id],
    queryFn: () => fetchGroups(id),
    staleTime: 5 * 1000,
  })
}

useQuery(groupOptions(1))
useQueries({ queries: [groupOptions(1), groupOptions(2)] })
queryClient.query(groupOptions(23))
queryClient.setQueryData(groupOptions(42).queryKey, newGroups)
```

## Notes

- At runtime, `queryOptions` just returns what you pass in — the value is purely for type inference.
- For infinite queries, use the separate `infiniteQueryOptions` helper.
- You can still override options at the call site, e.g. adding a per-component `select`.

## Related

- [infinite-queries.md](./infinite-queries.md)
- [query-keys.md](./query-keys.md)
