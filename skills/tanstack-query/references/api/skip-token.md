---
source: https://tanstack.com/query/latest/docs/framework/react/reference/variables/skipToken
---

# skipToken

Sentinel value passed as a query's `queryFn` to conditionally disable the query (equivalent to `enabled: false`) while preserving full type inference for the query's data.

## Signature / Usage

```ts
const skipToken: typeof skipToken;

new QueryObserver(queryClient, {
  queryKey: ['post', postId],
  queryFn: postId != null ? () => fetchPost(postId) : skipToken,
})
```

## Notes

- Unlike `enabled: false`, a query disabled via `skipToken` cannot be triggered with `refetch`.
- Defined in `packages/query-core/src/utils.ts`.

## Related

- [useQuery](./use-query.md)
- [queryOptions](./query-options.md)
