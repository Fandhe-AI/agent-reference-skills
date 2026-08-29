---
source: https://tanstack.com/query/latest/docs/framework/react/guides/request-waterfalls
---

# Performance & Request Waterfalls

A request waterfall happens when a resource fetch does not start until a previous fetch finishes — each hop adds a full round trip of latency.

## Signature / Usage

```tsx
// Get the user
const { data: user } = useQuery({
  queryKey: ['user', email],
  queryFn: getUserByEmail,
})

const userId = user?.id

// Then get the user's projects
const {
  status,
  fetchStatus,
  data: projects,
} = useQuery({
  queryKey: ['projects', userId],
  queryFn: getProjectsByUser,
  // The query will not execute until the userId exists
  enabled: !!userId,
})
```

## Notes

- **Serial queries under Suspense**: multiple `useSuspenseQuery` calls execute sequentially; use `useSuspenseQueries` to fetch in parallel instead.
- **Nested component waterfalls**: a parent query gating a child's render before the child's own query starts. Fix by hoisting the child query to the parent.
- **Code splitting**: a lazy-loaded component with its own query creates a 5-step waterfall (markup → JS → query → JS for component → nested query). Prefetching or restructuring the API can flatten this.
- Regularly check the Network tab to identify high-impact waterfalls.

## Related

- [dependent-queries.md](./dependent-queries.md)
- [prefetching.md](./prefetching.md)
- [ssr.md](./ssr.md)
