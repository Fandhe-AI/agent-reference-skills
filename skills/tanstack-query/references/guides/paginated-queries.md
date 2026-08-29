---
source: https://tanstack.com/query/latest/docs/framework/react/guides/paginated-queries
---

# Paginated / Lagged Queries

`placeholderData: keepPreviousData` prevents the UI from flashing between `success`/`pending` when paging through query-key-parameterized data.

## Signature / Usage

```tsx
import { keepPreviousData, useQuery } from '@tanstack/react-query'

const { isPending, isError, error, data, isFetching, isPlaceholderData } = useQuery({
  queryKey: ['projects', page],
  queryFn: () => fetchProjects(page),
  placeholderData: keepPreviousData,
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `placeholderData` | `keepPreviousData \| (prev) => data` | Keeps previous page's data visible while the new page fetches |

## Notes

- Without `placeholderData`, each page value creates a brand-new query, causing UI flicker between `pending`/`success`.
- `isPlaceholderData` tells you whether currently-shown data is the previous page's stale data.
- Also works with `useInfiniteQuery` for lagging infinite-query results across key changes.

## Related

- [placeholder-query-data.md](./placeholder-query-data.md)
- [infinite-queries.md](./infinite-queries.md)
