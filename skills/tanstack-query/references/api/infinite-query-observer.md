---
source: https://tanstack.com/query/latest/docs/reference/InfiniteQueryObserver
---

# InfiniteQueryObserver

The `InfiniteQueryObserver` enables developers to observe and switch between infinite queries.

## Signature / Usage

```tsx
const observer = new InfiniteQueryObserver(queryClient, {
  queryKey: ['posts'],
  queryFn: fetchPosts,
  getNextPageParam: (lastPage) => lastPage.nextCursor,
  getPreviousPageParam: (firstPage) => firstPage.prevCursor,
})

const unsubscribe = observer.subscribe((result) => {
  console.log(result)
})
```

## Options / Props

Options match those provided by the `useInfiniteQuery` hook, including `queryKey`, `queryFn`, `getNextPageParam`, and `getPreviousPageParam`.

## Methods

| Name | Description |
|------|-------------|
| `subscribe(callback)` | Registers a listener that fires when query state changes, returning an `unsubscribe` function |

## Notes

- Complete option documentation references the `useInfiniteQuery` API; the observer has feature parity with the hook implementation

## Related

- [useInfiniteQuery](./use-infinite-query.md)
- [QueryObserver](./query-observer.md)
