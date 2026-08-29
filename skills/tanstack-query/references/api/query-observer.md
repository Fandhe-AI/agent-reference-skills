---
source: https://tanstack.com/query/latest/docs/reference/QueryObserver
---

# QueryObserver

The `QueryObserver` enables monitoring and switching between different queries without being bound to a specific framework or component lifecycle.

## Signature / Usage

```tsx
const observer = new QueryObserver(queryClient, { queryKey: ['posts'] })

const unsubscribe = observer.subscribe((result) => {
  console.log(result)
  unsubscribe()
})
```

## Options / Props

The options for the `QueryObserver` are exactly the same as those of `useQuery`.

## Methods

| Name | Description |
|------|-------------|
| `subscribe(callback)` | Registers a callback function that receives result updates. Returns an unsubscribe function for cleanup |

## Notes

- Provides a lower-level alternative to framework-specific hooks, allowing more manual control over query observation and lifecycle management

## Related

- [useQuery](./use-query.md)
- [InfiniteQueryObserver](./infinite-query-observer.md)
- [QueriesObserver](./queries-observer.md)
