---
source: https://tanstack.com/query/latest/docs/eslint/no-rest-destructuring
---

# @tanstack/query/no-rest-destructuring

Prevents using object rest destructuring (`...rest`) on query results, since it subscribes to every field and causes unnecessary re-renders.

## Signature / Usage

```tsx
// ❌ incorrect
const { data: todos, ...rest } = useQuery(...)

// ✅ correct
const query = useQuery(...)
const todos = query.data
```

## Notes

- Only subscribe to the fields actually needed
- Can be disabled if `notifyOnChangeProps` is configured manually, since re-render triggers are then managed explicitly
- Recommended, but not yet automatically fixable

## Related

- [eslint-plugin-query](./eslint-plugin-query.md)
