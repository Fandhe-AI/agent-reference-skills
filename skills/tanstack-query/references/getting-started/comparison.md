---
source: https://tanstack.com/query/latest/docs/framework/react/comparison
---

# Comparison: TanStack Query vs SWR vs Apollo vs RTK Query vs React Router

Feature-by-feature comparison of TanStack Query against SWR, Apollo Client, RTK Query, and React Router's data APIs. Key: 1st-class (yes), 3rd-party/community, requires extra code, or not supported.

## Signature / Usage

```tsx
// TanStack Query's hierarchical key -> value caching model
const query = useQuery({ queryKey: ['todos'], queryFn: getTodos })
```

## Options / Props

| Feature | TanStack Query | SWR | Apollo Client | RTK Query | React Router |
|---------|---------------|-----|----------------|-----------|---------------|
| Platform Requirements | React | React | React, GraphQL | Redux | React |
| Caching Strategy | Hierarchical Key -> Value | Unique Key -> Value | Normalized Schema | Unique Key -> Value | Nested Route -> value |
| Data Memoization | Full Structural Sharing | Identity (===) | Normalized Identity | Identity (===) | Identity (===) |
| Infinite Queries | yes | yes | requires extra code | yes | not supported |
| Query Cancellation | yes | not supported | not supported | not supported | yes |
| Offline Mutation Support | yes | not supported | 3rd-party | not supported | not supported |
| Stale Time Configuration | yes | not supported (has immutable mode) | not supported | yes | not supported |
| Normalized Caching | not supported | not supported | yes | not supported | not supported |
| React Suspense | yes | yes | yes | not supported | yes |

## Notes

- TanStack Query and RTK Query both lack normalized caching, unlike Apollo which stores entities in a flat, normalized schema
- "Lagged Query Data": TanStack Query lets you keep seeing an existing query's data while the next query loads, useful for pagination/infinite-loading UX
- Full table (30+ rows) available at the official docs; this page summarizes the most decision-relevant rows

## Related

- [Overview](./overview.md)
