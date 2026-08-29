---
source: https://tanstack.com/query/latest/docs/framework/react/guides/query-functions
---

# Query Functions

Any function returning a Promise can be a `queryFn`. It must resolve data (never `undefined`) or throw/reject.

## Signature / Usage

```tsx
useQuery({
  queryKey: ['todos', todoId],
  queryFn: ({ queryKey, client, signal, meta }) => fetchTodoById(queryKey[1]),
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `queryKey` | `QueryKey` | The key for this query |
| `client` | `QueryClient` | The QueryClient instance |
| `signal` | `AbortSignal` | For [query cancellation](./query-cancellation.md) |
| `meta` | `Record<string, unknown> \| undefined` | Optional metadata |
| `pageParam` | `TPageParam` | Infinite queries only |
| `direction` | `'forward' \| 'backward'` | Infinite queries only, **deprecated** |

## Notes

- Resolving to `undefined` is treated as a failed query; resolve `null` instead to store "nothing".
- `fetch` does not throw on non-2xx responses by default — check `response.ok` and throw manually.
- For infinite queries, prefer adding `direction` to `pageParam` via `getNextPageParam`/`getPreviousPageParam` instead of the deprecated context field.

## Related

- [query-keys.md](./query-keys.md)
- [query-cancellation.md](./query-cancellation.md)
- [infinite-queries.md](./infinite-queries.md)
