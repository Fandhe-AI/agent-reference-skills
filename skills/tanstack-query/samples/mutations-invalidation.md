---
source: https://tanstack.com/query/latest/docs/framework/react/guides/mutations, https://tanstack.com/query/latest/docs/framework/react/guides/invalidations-from-mutations
---

# Mutations with Invalidation

Run a mutation, then invalidate related queries so they refetch fresh data.

```tsx
import { useMutation, useQueryClient } from '@tanstack/react-query'

function AddTodo() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (newTodo: { title: string }) =>
      fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify(newTodo),
      }).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  return (
    <button
      onClick={() => mutation.mutate({ title: 'Do laundry' })}
      disabled={mutation.isPending}
    >
      {mutation.isPending ? 'Adding...' : 'Add Todo'}
    </button>
  )
}
```

## Notes

- `mutate()` is fire-and-forget (return value ignored); use `mutateAsync()` when the caller needs to `await` the result or handle its rejection locally.
- `invalidateQueries({ queryKey: ['todos'] })` prefix-matches, marking every query starting with `'todos'` stale and refetching the ones currently rendered.
- Prefer invalidating in `onSuccess` (or `onSettled` to also cover errors) rather than in the component, so it happens regardless of where the mutation is triggered.
