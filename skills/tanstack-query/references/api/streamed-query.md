---
source: https://tanstack.com/query/latest/docs/reference/streamedQuery
---

# streamedQuery

A helper function designed to create query functions that stream data from an `AsyncIterable`. The accumulated data consists of all received chunks. The query maintains a `pending` state until the first chunk arrives, then transitions to `success`, while keeping `fetchStatus` as `fetching` until streaming completes.

## Signature / Usage

```tsx
import { experimental_streamedQuery as streamedQuery } from '@tanstack/react-query'

const query = queryOptions({
  queryKey: ['data'],
  queryFn: streamedQuery({
    streamFn: fetchDataInChunks,
  }),
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `streamFn` | `(context: QueryFunctionContext) => Promise<AsyncIterable<TData>>` | Required. The function that returns a Promise of an AsyncIterable with data to stream in |
| `refetchMode` | `'append' \| 'reset' \| 'replace'` | Handles refetch behavior; defaults to `'reset'` which clears data and returns to pending state |
| `reducer` | `(accumulator: TData, chunk: TQueryFnData) => TData` | Reduces streamed chunks into final data; defaults to appending chunks when `TData` is an array |
| `initialValue` | `TData` | Starting data while awaiting first chunk; required for custom reducers; defaults to empty array |

## Notes

- Currently marked experimental (`experimental_streamedQuery`); community feedback is encouraged
- See the [examples/react/chat directory](https://github.com/TanStack/query/tree/main/examples/react/chat) for a practical implementation

## Related

- [useQuery](./use-query.md)
- [queryOptions](./query-options.md)
