---
source: https://tanstack.com/query/latest/docs/framework/react/guides/queries
---

# Queries

A query is a declarative dependency on an asynchronous data source identified by a unique key, subscribed to via `useQuery`.

## Signature / Usage

```tsx
import { useQuery } from '@tanstack/react-query'

function App() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodoList,
  })

  if (isPending) return <span>Loading...</span>
  if (isError) return <span>Error: {error.message}</span>

  return (
    <ul>
      {data.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  )
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `queryKey` | `unknown[]` | Unique key used for caching, refetching, sharing |
| `queryFn` | `(context) => Promise<T>` | Function that resolves data or throws |

## Notes

- A query is in exactly one `status`: `pending`, `error`, or `success` (v5 renamed the former `loading` to `pending`; `isLoading` now means `isPending && isFetching`).
- `fetchStatus` is orthogonal to `status`: `fetching`, `paused` (see [Network Mode](./network-mode.md)), or `idle`.
- Use `status`/`isPending` to know if data exists; use `fetchStatus`/`isFetching` to know if the `queryFn` is currently running.

## Related

- [query-keys.md](./query-keys.md)
- [query-functions.md](./query-functions.md)
- [network-mode.md](./network-mode.md)
