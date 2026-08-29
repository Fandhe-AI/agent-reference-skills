---
source: https://tanstack.com/query/latest/docs/framework/react/guides/query-keys
---

# Query Keys

Query keys identify and cache query data. They must be arrays at the top level and serializable via `JSON.stringify`.

## Signature / Usage

```tsx
useQuery({ queryKey: ['todos'], ... })
useQuery({ queryKey: ['todo', 5, { preview: true }], ... })
useQuery({ queryKey: ['todos', { status, page }], ... })
```

## Notes

- Simple keys (`['todos']`) work for generic list resources.
- Keys are hashed deterministically: object key order does not matter, but array item order does.
- Any variable used inside the `queryFn` should be included in the `queryKey` so caching/refetching stays correct.
- For larger apps consider a query key factory pattern for organization.

## Related

- [query-functions.md](./query-functions.md)
- [filters.md](./filters.md)
