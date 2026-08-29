---
source: https://tanstack.com/query/latest/docs/eslint/no-void-query-fn
---

# @tanstack/query/no-void-query-fn

Enforces that `queryFn` returns a value, since a void query function prevents TanStack Query from caching the result.

## Signature / Usage

```tsx
// ❌ incorrect — nothing returned
useQuery({
  queryKey: ['todos'],
  queryFn: async () => {
    await fetchTodos()
  },
})

// ✅ correct
useQuery({
  queryKey: ['todos'],
  queryFn: async () => {
    const response = await fetchTodos()
    return response
  },
})
```

## Notes

- Functions that don't return a value can lead to unexpected behavior and often indicate an implementation mistake
- Recommended, not automatically fixable

## Related

- [eslint-plugin-query](./eslint-plugin-query.md)
