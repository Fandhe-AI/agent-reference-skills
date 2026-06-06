# priority

Dynamically orders function runs within the same function based on event data. Higher values move a run ahead of recently queued runs; negative values push it back.

## Signature / Usage

```ts
inngest.createFunction(
  {
    id: "ai-generate-summary",
    triggers: { event: "ai/summary.requested" },
    priority: {
      run: "event.data.account_type == 'enterprise' ? 120 : 0",
    },
  },
  async ({ event, step }) => {
    // Enterprise runs execute ahead of standard runs
  }
);
```

## Options / Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `priority.run` | `string` | Yes | CEL expression returning an integer. The integer represents a **seconds offset** that shifts the run's position in the priority queue. Range: −600 to 600. Invalid expressions default to `0`. Out-of-range values are clipped to account limits. |

## Notes

- Priority is scoped to runs **within the same function** — it does not order across different functions.
- A positive value of `N` means the run executes before any tasks enqueued in the previous `N` seconds, effectively moving it forward in the queue.
- A negative value delays the run by `N` seconds relative to other queued runs.
- Priority works best when concurrency limits create queue backlogs; without backlog there is nothing to reorder.
- `priority` is incompatible with `batchEvents`.
- Maximum priority is capped at 600 seconds; enterprise accounts can prioritize runs enqueued up to 120 seconds prior by default.

## Related

- [create-function](./create-function.md)
- [batch-events](./batch-events.md)
- [concurrency](../flow-control/concurrency.md)
