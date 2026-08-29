---
source: https://tanstack.com/query/latest/docs/framework/react/guides/mutations
---

# Mutations

`useMutation` handles creating/updating/deleting data or server side-effects (as opposed to `useQuery` for reads).

## Signature / Usage

```tsx
function App() {
  const mutation = useMutation({
    mutationFn: (newTodo) => axios.post('/todos', newTodo),
  })

  return (
    <button onClick={() => mutation.mutate({ id: new Date(), title: 'Do Laundry' })}>
      Create Todo
    </button>
  )
}
```

Side effects:

```tsx
useMutation({
  mutationFn: addTodo,
  onMutate: (variables, context) => ({ id: 1 }),
  onError: (error, variables, onMutateResult, context) => {},
  onSuccess: (data, variables, onMutateResult, context) => {},
  onSettled: (data, error, variables, onMutateResult, context) => {},
})
```

Promise form:

```tsx
const mutation = useMutation({ mutationFn: addTodo })
const todo = await mutation.mutateAsync(todo)
```

Mutation scopes (serialize same-scope mutations):

```tsx
useMutation({ mutationFn: addTodo, scope: { id: 'todo' } })
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `mutationFn` | `(variables) => Promise<TData>` | The mutation function |
| `retry` | `boolean \| number` | Defaults to no retry (unlike queries) |
| `scope` | `{ id: string }` | Serializes mutations sharing the same `scope.id` |

## Notes

- States: `isIdle`, `isPending`, `isError`, `isSuccess` (v5 renamed `loading` → `pending`).
- The `mutate` function is asynchronous, which means you cannot use it directly in an event callback in React 16 and earlier; wrap it in your own handler that calls `event.preventDefault()` before invoking `mutate`.
- `reset()` clears `error`/`data` back to idle.
- Callbacks passed to `mutate(vars, { onSuccess, onError, onSettled })` fire once and only if the component is still mounted; `useMutation`-level callbacks fire on every `mutate` call.
- Mutations can be persisted/hydrated via `queryClient.setMutationDefaults` + `dehydrate`/`hydrate` + `resumePausedMutations()` for offline support.

## Related

- [invalidations-from-mutations.md](./invalidations-from-mutations.md)
- [optimistic-updates.md](./optimistic-updates.md)
- [updates-from-mutation-responses.md](./updates-from-mutation-responses.md)
