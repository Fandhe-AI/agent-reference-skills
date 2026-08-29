---
source: https://tanstack.com/query/latest/docs/framework/react/guides/parallel-queries
---

# Parallel Queries

Queries executed at the same time to maximize fetching concurrency.

## Signature / Usage

```tsx
function App() {
  const usersQuery = useQuery({ queryKey: ['users'], queryFn: fetchUsers })
  const teamsQuery = useQuery({ queryKey: ['teams'], queryFn: fetchTeams })
  const projectsQuery = useQuery({ queryKey: ['projects'], queryFn: fetchProjects })
}
```

Dynamic count (`useQueries`):

```tsx
function App({ users }) {
  const userQueries = useQueries({
    queries: users.map((user) => ({
      queryKey: ['user', user.id],
      queryFn: () => fetchUserById(user.id),
    })),
  })
}
```

## Notes

- Manual parallelism (side-by-side `useQuery` calls) does not work under Suspense mode — the first query suspends before the others run. Use `useSuspenseQueries` instead.
- `useQueries` is required when the number of queries varies between renders (avoids violating rules of hooks).
- TypeScript: an inline `select` on a `useQueries` entry cannot infer `data` from that entry's own `queryFn`; annotate the parameter or use `queryOptions`.

## Related

- [dependent-queries.md](./dependent-queries.md)
- [query-options.md](./query-options.md)
