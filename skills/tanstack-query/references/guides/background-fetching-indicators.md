---
source: https://tanstack.com/query/latest/docs/framework/react/guides/background-fetching-indicators
---

# Background Fetching Indicators

Show a refetch indicator distinct from the initial hard-loading state, using `isFetching`.

## Signature / Usage

```tsx
const { status, data: todos, error, isFetching } = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
})
```

Global indicator across all queries:

```tsx
import { useIsFetching } from '@tanstack/react-query'

function GlobalLoadingIndicator() {
  const isFetching = useIsFetching()
  return isFetching ? <div>Queries are fetching in the background...</div> : null
}
```

## Related

- [queries.md](./queries.md)
- [window-focus-refetching.md](./window-focus-refetching.md)
