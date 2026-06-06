# Batching

Processes multiple events in a single function run. The function receives an `events` array instead of a single `event`. Reduces API calls, consolidates DB writes, and lowers serverless costs.

## Signature / Usage

```ts
inngest.createFunction(
  {
    id: "record-api-calls",
    batchEvents: {
      maxSize: 100,
      timeout: "5s",
      key: "event.data.user_id",
      if: 'event.data.account_type == "free"',
    },
  },
  async ({ events, step }) => {
    const attrs = events.map((evt) => ({
      user_id: evt.data.user_id,
      endpoint: evt.data.endpoint,
    }));
    await step.run("bulk-write", () => db.bulkWrite(attrs));
  }
);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `maxSize` | `number` | Maximum events per batch. Execution triggers immediately when reached. Maximum: 100. |
| `timeout` | `string` | Duration to wait for a full batch before executing an incomplete one. |
| `key` | `string` (CEL expression, optional) | Groups events into separate batches by unique value (e.g., per user). Key is evaluated against the first event in the batch. |
| `if` | `string` (boolean CEL expression, optional) | If the expression evaluates to `false` or cannot be evaluated, the event bypasses batching and runs immediately. |

## Notes

- A 10 MiB hard limit applies per batch — the batch executes immediately if exceeded, regardless of `maxSize` or `timeout`.
- When combining `batchEvents` and `concurrency` with matching `key` expressions, use identical key expressions for predictable behavior.
- Incompatible with: idempotency, rate limiting, cancellation events, and priority.
- Compatible with concurrency limits.

## Related

- [Concurrency](./concurrency.md)
- [Idempotency](./idempotency.md)
- [Rate Limiting](./rate-limiting.md)
