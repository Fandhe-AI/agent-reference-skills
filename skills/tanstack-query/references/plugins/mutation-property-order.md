---
source: https://tanstack.com/query/latest/docs/eslint/mutation-property-order
---

# @tanstack/query/mutation-property-order

Enforces a specific property order in `useMutation()` calls to ensure proper type inference.

## Signature / Usage

```tsx
// ✅ correct order
useMutation({
  mutationFn: ...,
  onMutate: ...,
  onError: ...,
  onSettled: ...,
})
```

## Notes

- Required sequence for the order-sensitive callbacks: `onMutate` → `onError` → `onSettled`
- Only these three callback properties are order-sensitive; `mutationFn` and others can appear in any order
- Recommended and automatically fixable

## Related

- [eslint-plugin-query](./eslint-plugin-query.md)
- [infinite-query-property-order](./infinite-query-property-order.md)
