---
source: https://tanstack.com/query/latest/docs/framework/react/quick-start
---

# Quick Start

Illustrates the 3 core concepts of TanStack Query: queries, mutations, and query invalidation.

## Signature / Usage

```tsx
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { getTodos, postTodo } from '../my-api'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>
  )
}

function Todos() {
  const queryClient = useQueryClient()

  const query = useQuery({ queryKey: ['todos'], queryFn: getTodos })

  const mutation = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  return (
    <div>
      <ul>
        {query.data?.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>

      <button
        onClick={() => {
          mutation.mutate({ id: Date.now(), title: 'Do Laundry' })
        }}
      >
        Add Todo
      </button>
    </div>
  )
}
```

## Notes

- These three concepts (Queries, Mutations, Query Invalidation) make up most of TanStack Query's core functionality

## Related

- [Overview](./overview.md)
- [Installation](./installation.md)
- [TypeScript](./typescript.md)
