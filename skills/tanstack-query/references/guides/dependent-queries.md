---
source: https://tanstack.com/query/latest/docs/framework/react/guides/dependent-queries
---

# Dependent Queries

Serial queries that depend on a previous query finishing, achieved via the `enabled` option.

## Signature / Usage

```tsx
const { data: user } = useQuery({ queryKey: ['user', email], queryFn: getUserByEmail })

const userId = user?.id

const { data: projects } = useQuery({
  queryKey: ['projects', userId],
  queryFn: getProjectsByUser,
  enabled: !!userId,
})
```

`useQueries` dependent on a prior query:

```tsx
const { data: userIds } = useQuery({
  queryKey: ['users'],
  queryFn: getUsersData,
  select: (users) => users.map((u) => u.id),
})

const usersMessages = useQueries({
  queries: userIds
    ? userIds.map((id) => ({ queryKey: ['messages', id], queryFn: () => getMessagesByUsers(id) }))
    : [],
})
```

## Notes

- Dependent queries are a form of [request waterfall](./request-waterfalls.md), which hurts performance under high latency — restructure the API to fetch in parallel where possible.

## Related

- [parallel-queries.md](./parallel-queries.md)
- [request-waterfalls.md](./request-waterfalls.md)
- [disabling-queries.md](./disabling-queries.md)
