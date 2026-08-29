---
source: https://tanstack.com/query/latest/docs/framework/react/guides/disabling-queries
---

# Disabling/Pausing Queries

Use `enabled: false` (or `skipToken`) to prevent a query from automatically running.

## Signature / Usage

```tsx
const { data, refetch } = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodoList,
  enabled: false,
})
```

Lazy queries (enable once a value exists):

```tsx
const { data } = useQuery({
  queryKey: ['todos', filter],
  queryFn: () => fetchTodos(filter),
  enabled: !!filter,
})
```

Type-safe disabling with `skipToken`:

```tsx
import { skipToken, useQuery } from '@tanstack/react-query'

const { data } = useQuery({
  queryKey: ['todos', filter],
  queryFn: filter ? () => fetchTodos(filter) : skipToken,
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `enabled` | `boolean \| (() => boolean)` | Disable/enable automatic execution |

## Notes

- When `enabled` is `false`: cached data (if any) makes the query `success`; otherwise it starts in `pending`/`fetchStatus: 'idle'`. It ignores `invalidateQueries`/`refetchQueries` and does not auto-refetch.
- `refetch()` still works with `enabled: false`, but **not** with `skipToken` — calling `refetch()` on a `skipToken` query throws `Missing queryFn`.
- Use `isLoading` (`isPending && isFetching`) instead of `isPending` to detect a genuine first-time fetch on lazy/disabled queries — this replaces the removed `isInitialLoading` flag.

## Related

- [dependent-queries.md](./dependent-queries.md)
- [query-retries.md](./query-retries.md)
