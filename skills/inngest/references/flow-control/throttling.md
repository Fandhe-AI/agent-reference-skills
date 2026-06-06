# Throttling

Limits the number of new function runs that can start within a given time period. Excess runs are enqueued in FIFO order and start when capacity becomes available.

## Signature / Usage

```ts
inngest.createFunction(
  {
    id: "unique-function-id",
    throttle: {
      limit: 1,
      period: "5s",
      burst: 2,
      key: "event.data.user_id",
    },
  },
  async ({ event, step }) => { /* handler */ }
);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `limit` | `number` | Maximum runs allowed to start within the given `period`. |
| `period` | `string` | Time window for applying the limit. Range: 1s–7d (1-second minimum granularity). |
| `burst` | `number` | Additional runs permitted in a single window beyond `limit`. |
| `key` | `string` (CEL expression, optional) | Expression using event data to create per-entity throttle limits (e.g., per user). |

## Notes

- Throttling controls run *starts* only — it does not limit steps within a running function.
- Implements the Generic Cell Rate Algorithm (GCRA). Within each window, at most `limit + burst` runs may start.
- Excess runs are queued (not dropped) — use a start timeout to prevent unbounded queue growth.
- Distinct from rate limiting: throttling delays excess runs; rate limiting discards them.
- Identical keys across different functions maintain separate throttle counters.

## Related

- [Rate Limiting](./rate-limiting.md)
- [Concurrency](./concurrency.md)
- [Debounce](./debounce.md)
