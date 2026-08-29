---
source: https://tanstack.com/query/latest/docs/framework/react/guides/updates-from-mutation-responses
---

# Updates from Mutation Responses

When a mutation returns the updated object, write it directly into the cache with `setQueryData` instead of refetching.

## Signature / Usage

```tsx
const queryClient = useQueryClient()

const mutation = useMutation({
  mutationFn: editTodo,
  onSuccess: (data) => {
    queryClient.setQueryData(['todo', { id: 5 }], data)
  },
})
```

Reusable custom hook:

```tsx
const useMutateTodo = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: editTodo,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['todo', { id: variables.id }], data)
    },
  })
}
```

## Notes

- Updates via `setQueryData` must be **immutable** — never mutate `oldData` in place; always return a new object/array.

```tsx
// wrong
queryClient.setQueryData(['posts', { id }], (oldData) => {
  if (oldData) oldData.title = 'my new post title' // mutates in place — do not do this
  return oldData
})

// correct
queryClient.setQueryData(['posts', { id }], (oldData) =>
  oldData ? { ...oldData, title: 'my new post title' } : oldData,
)
```

## Related

- [mutations.md](./mutations.md)
- [optimistic-updates.md](./optimistic-updates.md)
