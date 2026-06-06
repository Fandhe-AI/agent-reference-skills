# Rate Limiting

Enforces a hard cap on function executions within a time period. Events that exceed the limit are **skipped** (not queued). Use when excess events can be safely discarded.

## Signature / Usage

```ts
export default inngest.createFunction(
  {
    id: "synchronize-data",
    rateLimit: {
      limit: 1,
      period: "4h",
      key: "event.data.company_id",
    },
  },
  async ({ event, step }) => { /* handler */ }
);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `limit` | `number` | Maximum function runs allowed within `period`. |
| `period` | `string` | Time window for the limit. Maximum: 24 hours. Starts when the first matching event arrives. |
| `key` | `string` (CEL expression, optional) | Applies independent limits per unique evaluated value (e.g., per user or company). |

## Notes

- Skipped events are still stored in Inngest's event history but do not trigger function runs.
- Implements GCRA: `bucket_time_window = limit / period`. Each bucket must pass before the next run is allowed.
- Do not use rate limiting when every event must be processed — use throttling instead.
- `idempotency` is equivalent to `rateLimit` with `limit: 1` and `period: "24h"` combined with a `key`.
- Maximum `period` is 24 hours.

## Related

- [Throttling](./throttling.md)
- [Idempotency](./idempotency.md)
- [Debounce](./debounce.md)
