---
source: https://tanstack.com/query/latest/docs/framework/react/guides/network-mode
---

# Network Mode

Controls how Queries and Mutations behave without a network connection. Configurable per query/mutation or globally via defaults.

## Signature / Usage

```tsx
useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
  networkMode: 'online', // 'online' | 'always' | 'offlineFirst'
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `networkMode` | `'online' \| 'always' \| 'offlineFirst'` | Default `'online'` |

## Notes

- `online` (default): queries/mutations do not fire without a network connection; `fetchStatus` becomes `paused` instead of `fetching`.
- `always`: ignores online/offline state entirely; retries do not pause; `refetchOnReconnect` defaults to `false`.
- `offlineFirst`: runs `queryFn` once (useful with service-worker/HTTP caching), then pauses retries like `online` mode if it fails.
- A query can be `pending` while `fetchStatus` is `paused` — checking `pending` alone is not sufficient to show a spinner.

## Related

- [queries.md](./queries.md)
- [mutations.md](./mutations.md)
