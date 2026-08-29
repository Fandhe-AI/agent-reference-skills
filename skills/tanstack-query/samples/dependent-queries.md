---
source: https://tanstack.com/query/latest/docs/framework/react/guides/dependent-queries
---

# Dependent Queries

Chain a second query so it only runs after a prerequisite value is available, using `enabled`.

```tsx
import { useQuery } from '@tanstack/react-query'

function UserProjects({ email }: { email: string }) {
  const { data: user } = useQuery({
    queryKey: ['user', email],
    queryFn: () => getUserByEmail(email),
  })

  const userId = user?.id

  const { data: projects, isPending } = useQuery({
    queryKey: ['projects', userId],
    queryFn: () => getProjectsByUser(userId),
    enabled: !!userId,
  })

  if (isPending) return <span>Loading...</span>
  return <ul>{projects.map((p) => <li key={p.id}>{p.name}</li>)}</ul>
}
```

## Notes

- `isPending` stays `true` while `enabled` is `false` and no data has ever been fetched — check `enabled`/`userId` in the UI if you need to distinguish "waiting on prerequisite" from "actually fetching".
- Dependent queries form a request waterfall; restructure the backend to allow parallel fetches when latency matters.
- For a list of dependent queries, build the `queries` array for `useQueries` conditionally (empty array until the prerequisite resolves).
