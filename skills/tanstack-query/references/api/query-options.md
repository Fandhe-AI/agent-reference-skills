---
source: https://tanstack.com/query/latest/docs/framework/react/reference/queryOptions
---

# queryOptions

A utility function that generates shareable query configuration options. Accepts everything to `queryOptions` that you can also pass to `useQuery`, providing option reuse across both hooks and imperative APIs like `queryClient.query`.

## Signature / Usage

```tsx
import { queryOptions } from '@tanstack/react-query'

const todosOptions = queryOptions({
  queryKey: ['todos'],
  queryFn: fetchTodos,
})

useQuery(todosOptions)
queryClient.prefetchQuery(todosOptions)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `queryKey` | `QueryKey` | Required. The query key to generate options for |
| `...options` | — | Accepts everything else that can also be passed to `useQuery` |

## Notes

- Options can be shared across multiple hooks and imperative query methods
- Recommended reading: "The Query Options API" by TkDodo, for the design and implementation background of this pattern

## Related

- [useQuery](./use-query.md)
- [infiniteQueryOptions](./infinite-query-options.md)
- [mutationOptions](./mutation-options.md)
