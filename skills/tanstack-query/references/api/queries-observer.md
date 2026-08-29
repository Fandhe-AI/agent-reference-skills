---
source: https://tanstack.com/query/latest/docs/reference/QueriesObserver
---

# QueriesObserver

The `QueriesObserver` enables monitoring of multiple queries simultaneously, allowing developers to subscribe to state changes across several query operations.

## Signature / Usage

```tsx
const observer = new QueriesObserver(queryClient, [
  { queryKey: ['post', 1], queryFn: fetchPost },
  { queryKey: ['post', 2], queryFn: fetchPost },
])

const unsubscribe = observer.subscribe((result) => {
  console.log(result)
})
```

## Options / Props

The options for the `QueriesObserver` are exactly the same as those of `useQueries`.

## Methods

| Name | Description |
|------|-------------|
| `subscribe(callback)` | Registers a callback function that executes when query results change. Returns an unsubscribe function to terminate the subscription |

## Related

- [useQueries](./use-queries.md)
- [QueryObserver](./query-observer.md)
