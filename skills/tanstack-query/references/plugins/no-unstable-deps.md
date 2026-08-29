---
source: https://tanstack.com/query/latest/docs/eslint/no-unstable-deps
---

# @tanstack/query/no-unstable-deps

Prevents directly including a query/mutation hook's return object in a React hook dependency array, since those objects lack referential stability.

## Signature / Usage

```tsx
// ❌ incorrect
const query = useQuery(...)
useEffect(() => {
  // ...
}, [query])

// ✅ correct — destructure first
const { data } = useQuery(...)
useEffect(() => {
  // ...
}, [data])
```

## Notes

- Applies to `useQuery`, `useSuspenseQuery`, `useQueries`, `useSuspenseQueries`, `useInfiniteQuery`, `useSuspenseInfiniteQuery`, and `useMutation`
- Placing these unstable objects into `useEffect` / `useMemo` / `useCallback` dependency arrays can cause unintended re-renders and side effects
- Recommended, but not automatically fixable — refactor manually

## Related

- [eslint-plugin-query](./eslint-plugin-query.md)
