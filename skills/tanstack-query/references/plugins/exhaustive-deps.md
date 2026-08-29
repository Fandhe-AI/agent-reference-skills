---
source: https://tanstack.com/query/latest/docs/eslint/exhaustive-deps
---

# @tanstack/query/exhaustive-deps

Ensures that query keys contain all serializable values needed to identify cached data, i.e. all values used inside `queryFn`.

## Signature / Usage

```tsx
// ❌ incorrect
useQuery({
  queryKey: ['todo'],
  queryFn: () => api.getTodo(todoId), // todoId missing from key
})

// ✅ correct
useQuery({
  queryKey: ['todo', todoId],
  queryFn: () => api.getTodo(todoId),
})
```

```json
{
  "@tanstack/query/exhaustive-deps": [
    "error",
    {
      "allowlist": {
        "variables": ["api"],
        "types": ["Config"]
      }
    }
  ]
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `allowlist.variables` | string[] | Variable names to exclude from the exhaustiveness check |
| `allowlist.types` | string[] | TypeScript type names to exclude from the check |

## Notes

- Function references themselves are excluded — only their call arguments are considered query key dependencies
- Recommended and auto-fixable in most cases

## Related

- [eslint-plugin-query](./eslint-plugin-query.md)
