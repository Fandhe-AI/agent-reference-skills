---
source: https://tanstack.com/query/latest/docs/framework/react/reference/infiniteQueryOptions
---

# infiniteQueryOptions

A utility function that generates shareable infinite query configuration options, for use across multiple hooks and imperative APIs like `queryClient.infiniteQuery`.

## Signature / Usage

```tsx
import { infiniteQueryOptions } from '@tanstack/react-query'

const postsOptions = infiniteQueryOptions({
  queryKey: ['posts'],
  queryFn: ({ pageParam }) => fetchPage(pageParam),
  initialPageParam: 1,
  getNextPageParam: (lastPage) => lastPage.nextCursor,
})

useInfiniteQuery(postsOptions)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `queryKey` | `QueryKey` | Required. The query key to generate options for |
| `...options` | — | Accepts all parameters compatible with `useInfiniteQuery` |

## Notes

- Options passed to this function can be shared across hooks and imperative APIs

## Related

- [useInfiniteQuery](./use-infinite-query.md)
- [queryOptions](./query-options.md)
