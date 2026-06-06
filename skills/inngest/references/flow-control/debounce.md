# Debounce

Delays function execution until a series of rapid events stops arriving. Each new matching event resets the delay timer. The function runs with the **last** received event in the window.

## Signature / Usage

```ts
inngest.createFunction(
  {
    id: "handle-user-update",
    debounce: {
      period: "5s",
      key: "event.data.user_id",
      timeout: "2m",
    },
  },
  async ({ event, step }) => { /* handler */ }
);
```

## Options / Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `period` | `string` | Yes | Delay duration after the last event before execution. Resets on each new matching event. Range: 1s–7d. |
| `key` | `string` (CEL expression) | No | Groups events by unique value; each group maintains its own debounce timer. |
| `timeout` | `string` | No | Maximum total delay. The function runs after `timeout` even if new events keep arriving. |

## Notes

- Executes with the last event received during the debounce window (unlike rate limiting, which uses the first).
- Incompatible with event batching.
- Each unique `key` value maintains an independent debounce timer.
- Useful for user-input changes, stabilizing unstable webhook streams, or preventing redundant reprocessing.

## Related

- [Rate Limiting](./rate-limiting.md)
- [Idempotency](./idempotency.md)
- [Throttling](./throttling.md)
