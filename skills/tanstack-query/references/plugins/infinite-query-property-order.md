---
source: https://tanstack.com/query/latest/docs/eslint/infinite-query-property-order
---

# @tanstack/query/infinite-query-property-order

Enforces a specific property order for `useInfiniteQuery`, `useSuspenseInfiniteQuery`, and `infiniteQueryOptions`, because the order of the passed object matters for type inference.

## Signature / Usage

```tsx
// ✅ correct order
useInfiniteQuery({
  queryFn: ...,
  getPreviousPageParam: ...,
  getNextPageParam: ...,
})
```

## Notes

- Required sequence: `queryFn` → `getPreviousPageParam` → `getNextPageParam`
- All other properties can appear in any order
- Recommended and automatically fixable with `--fix`

## Related

- [eslint-plugin-query](./eslint-plugin-query.md)
- [mutation-property-order](./mutation-property-order.md)
