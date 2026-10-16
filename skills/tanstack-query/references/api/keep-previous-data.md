---
source: https://tanstack.com/query/latest/docs/framework/react/reference/functions/keepPreviousData
---

# keepPreviousData

Passed as a query's `placeholderData` option. Instead of resetting data to `undefined` while a new query key is fetching, keeps displaying the previously fetched data until the new data arrives.

## Signature / Usage

```ts
function keepPreviousData<T>(previousData: T | undefined): T | undefined;

new QueryObserver(queryClient, {
  queryKey: ['posts', page],
  queryFn: () => fetchPosts(page),
  placeholderData: keepPreviousData,
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `previousData` | `T \| undefined` | The data of the previous query key, passed by the observer |

## Notes

- Returns the previous data unchanged.
- Defined in `packages/query-core/src/utils.ts`.

## Related

- [useQuery](./use-query.md)
- [queryOptions](./query-options.md)
