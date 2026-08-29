---
source: https://tanstack.com/query/latest/docs/framework/react/guides/queries, https://tanstack.com/query/latest/docs/framework/react/quick-start
---

# Basic Query

Fetch data with `useQuery` and render pending/error/success states.

```tsx
import { useQuery } from '@tanstack/react-query'

function Todos() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const res = await fetch('/api/todos')
      if (!res.ok) throw new Error('Network response was not ok')
      return res.json()
    },
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

## Notes

- `queryKey` must be a serializable array; it uniquely identifies the cached result.
- `queryFn` must throw (or return a rejected promise) on failure — `isError` only flips when the promise rejects.
- v5 uses `isPending` (no data yet, including `enabled: false`) instead of the old `isLoading`.
- `QueryClientProvider` must wrap the component tree with a `QueryClient` instance.
