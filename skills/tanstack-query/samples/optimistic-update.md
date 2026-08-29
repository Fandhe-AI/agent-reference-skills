---
source: https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates
---

# Optimistic Update with Rollback

Write the mutation's expected result into the cache immediately via `onMutate`, and roll back on error.

```tsx
import { useMutation, useQueryClient } from '@tanstack/react-query'

function useUpdateTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateTodo,
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] })

      const previousTodos = queryClient.getQueryData(['todos'])

      queryClient.setQueryData(['todos'], (old) =>
        old.map((todo) => (todo.id === newTodo.id ? newTodo : todo)),
      )

      return { previousTodos }
    },
    onError: (err, newTodo, onMutateResult) => {
      queryClient.setQueryData(['todos'], onMutateResult.previousTodos)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}
```

## Notes

- `cancelQueries` before writing avoids the optimistic write being clobbered by an in-flight refetch.
- The value returned from `onMutate` (here `{ previousTodos }`) is passed as the third argument to `onError`/`onSettled` for rollback — snapshot the cache before mutating it.
- `onSettled` re-invalidates regardless of success/failure so the cache eventually reconciles with the server's actual state.
- For UI shown in a single location, a simpler alternative is to read `variables` off the mutation object directly instead of writing to the cache (see `mutations-invalidation.md`).
