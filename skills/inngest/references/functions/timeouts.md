# timeouts

Automatically cancels a function run that takes too long to start or to finish executing. Cancelled runs emit an `inngest/function.cancelled` system event.

## Signature / Usage

```ts
inngest.createFunction(
  {
    id: "process-payment",
    triggers: { event: "payments/charge.requested" },
    timeouts: {
      start: "10s",
      finish: "30s",
    },
  },
  async ({ event, step }) => {
    await step.run("charge-card", async () => {
      await chargeCard(event.data.paymentMethodId);
    });
  }
);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `timeouts.start` | `string` | Maximum duration a run may remain queued before execution begins. Accepts duration strings: `"10s"`, `"45m"`, `"2h"`. |
| `timeouts.finish` | `string` | Maximum duration a run may execute after it has started. Accepts same duration string format. |

## Notes

- `timeouts.start` prevents indefinite queueing caused by concurrency backlogs or throttling.
- Once the first step attempt begins, `timeouts.start` no longer applies.
- `timeouts.finish` limits total wall-clock execution time from first step start.
- Step-level timeouts are not affected by function-level `timeouts` settings.
- Concurrency delays may extend actual cancellation time beyond the configured threshold.
- Cancelled runs trigger the `inngest/function.cancelled` system event, which can be consumed by other functions.

## Related

- [create-function](./create-function.md)
- [cancel-on](./cancel-on.md)
- [retries](./retries.md)
