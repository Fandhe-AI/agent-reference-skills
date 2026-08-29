---
source: https://tanstack.com/query/latest/docs/framework/react/reference/mutationOptions
---

# mutationOptions

A function for configuring shareable mutation options with type safety and consistency. Accepts everything that can also be passed to `useMutation`.

## Signature / Usage

```tsx
import { mutationOptions } from '@tanstack/react-query'

const addTodoOptions = mutationOptions({
  mutationFn: addTodo,
})

useMutation(addTodoOptions)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `mutationFn` | function | Primary argument; performs the asynchronous mutation |
| `...options` | — | Accepts everything else that can also be passed to `useMutation` |

## Related

- [useMutation](./use-mutation.md)
- [queryOptions](./query-options.md)
