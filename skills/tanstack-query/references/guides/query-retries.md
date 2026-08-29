---
source: https://tanstack.com/query/latest/docs/framework/react/guides/query-retries
---

# Query Retries

Failed queries automatically retry up to `retry` times (default `3`) with exponential backoff.

## Signature / Usage

```tsx
useQuery({
  queryKey: ['todos', 1],
  queryFn: fetchTodoListPage,
  retry: 10,
})
```

Custom retry delay:

```tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `retry` | `boolean \| number \| (failureCount, error) => boolean` | `false` disables, `true` retries infinitely, number caps attempts |
| `retryDelay` | `number \| (attemptIndex) => number` | Delay before each retry attempt |

## Notes

- On the server, `retry` defaults to `0` for fast SSR.
- `failureCount` starts at `0` for the first retry.
- Errors before the final attempt populate `failureReason`; the final error populates `error`.
- Retries pause on background tab when combined with `refetchIntervalInBackground: true` (they respect the same focus behavior). Disable `retry` and implement a custom `refetchInterval` for continuous background retries.

## Related

- [important-defaults.md](./important-defaults.md)
- [polling.md](./polling.md)
