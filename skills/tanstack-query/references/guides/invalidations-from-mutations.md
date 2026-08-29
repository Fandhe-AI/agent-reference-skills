---
source: https://tanstack.com/query/latest/docs/framework/react/guides/invalidations-from-mutations
---

# Invalidations from Mutations

Invalidate related queries from a mutation's `onSuccess` callback.

## Signature / Usage

```tsx
import { useMutation, useQueryClient } from '@tanstack/react-query'

const queryClient = useQueryClient()

const mutation = useMutation({
  mutationFn: addTodo,
  onSuccess: async () => {
    await queryClient.invalidateQueries({ queryKey: ['todos'] })
    // or multiple:
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['todos'] }),
      queryClient.invalidateQueries({ queryKey: ['reminders'] }),
    ])
  },
})
```

## Notes

- Returning the invalidation Promise from `onSuccess` keeps the mutation's `isPending` true until invalidation completes.
- Any `useMutation` callback (`onSuccess`, `onSettled`, etc.) can be used to trigger invalidation.

## Related

- [query-invalidation.md](./query-invalidation.md)
- [mutations.md](./mutations.md)
