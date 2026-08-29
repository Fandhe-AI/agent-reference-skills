---
source: https://tanstack.com/query/latest/docs/eslint/prefer-query-options
---

# @tanstack/query/prefer-query-options

Requires wrapping `queryKey` and `queryFn` together via `queryOptions` instead of passing them separately to `useQuery`.

## Signature / Usage

```tsx
// ✅ correct
function getFooOptions(id: string) {
  return queryOptions({
    queryKey: ['foo', id],
    queryFn: () => fetchFoo(id),
  })
}

useQuery(getFooOptions(id))
queryClient.invalidateQueries({ queryKey: getFooOptions(id).queryKey })
```

## Notes

- Separating `queryKey` and `queryFn` can cause runtime issues when the same key is accidentally paired with more than one `queryFn`
- Extract `queryKey` from the `queryOptions` result for `getQueryData()` / `invalidateQueries()` instead of repeating the key array
- Recommended for strict-mode configuration, not currently auto-fixable

## Related

- [eslint-plugin-query](./eslint-plugin-query.md)
