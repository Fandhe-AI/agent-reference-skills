---
source: https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates
---

# Optimistic Updates

Two strategies to update the UI before the mutation server response arrives.

## Signature / Usage

Via the UI (no cache writes, uses mutation `variables`):

```tsx
const addTodoMutation = useMutation({
  mutationFn: (newTodo: string) => axios.post('/api/data', { text: newTodo }),
  onSettled: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
})

const { isPending, variables, mutate, isError } = addTodoMutation
```

```tsx
<ul>
  {todoQuery.items.map((todo) => <li key={todo.id}>{todo.text}</li>)}
  {isPending && <li style={{ opacity: 0.5 }}>{variables}</li>}
</ul>
```

Via the cache (`onMutate` + rollback):

```tsx
useMutation({
  mutationFn: updateTodo,
  onMutate: async (newTodo, context) => {
    await context.client.cancelQueries({ queryKey: ['todos'] })
    const previousTodos = context.client.getQueryData(['todos'])
    context.client.setQueryData(['todos'], (old) => [...old, newTodo])
    return { previousTodos }
  },
  onError: (err, newTodo, onMutateResult, context) => {
    context.client.setQueryData(['todos'], onMutateResult.previousTodos)
  },
  onSettled: (data, error, variables, onMutateResult, context) =>
    context.client.invalidateQueries({ queryKey: ['todos'] }),
})
```

## Notes

- UI-based approach is simpler for single-location displays; when mutation and query live in different components, use `useMutationState` with a `mutationKey` to read `variables` elsewhere.
- Cache-based approach automatically syncs all UI locations referencing that query, at the cost of more code (cancel outgoing refetches, snapshot, apply, roll back on error).

## Related

- [mutations.md](./mutations.md)
- [updates-from-mutation-responses.md](./updates-from-mutation-responses.md)
