# batchEvents

Aggregates multiple events into a single function invocation. The handler receives an `events` array instead of a single `event`. Useful for reducing API calls, consolidating DB writes, or optimizing serverless costs.

## Signature / Usage

```ts
inngest.createFunction(
  {
    id: "process-analytics-events",
    triggers: { event: "analytics/event.tracked" },
    batchEvents: {
      maxSize: 100,
      timeout: "5s",
    },
  },
  async ({ events, step }) => {
    await step.run("bulk-insert", async () => {
      await db.insertMany(events.map((e) => e.data));
    });
    return { processed: events.length };
  }
);
```

## Options / Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `maxSize` | `number` | Yes | Maximum events per batch. Upper limit: `100`. |
| `timeout` | `string` | Yes | Duration to wait for the batch to fill before invoking. Range: `"1s"` to `"60s"`. |
| `key` | `string` | No | CEL expression to group events into separate batches per unique key value (e.g. `"event.data.user_id"`). |
| `if` | `string` | No | CEL boolean expression; events that evaluate to `false` bypass batching and are scheduled immediately. |

## Notes

- Inngest creates a new batch when the first matching event arrives. The function is invoked when either `maxSize` or `timeout` is reached, whichever comes first.
- A hard 10 MiB total batch size limit applies regardless of plan; reaching it forces immediate invocation.
- `batchEvents` is incompatible with `idempotency`, `rateLimit`, `cancelOn`, and `priority`.
- Use the `events` handler parameter (array) instead of `event` when batching is enabled; `event` still refers to the first event in the batch.
- Combining `key` with `concurrency` requires matching key expressions for predictable behavior.

## Related

- [create-function](./create-function.md)
- [idempotency](./idempotency.md)
- [priority](./priority.md)
