# onFailure

A callback function invoked automatically when a function exhausts all retry attempts and permanently fails. Appears in the Inngest dashboard as a separate function named `"<function name> (failure)"`.

## Signature / Usage

```ts
inngest.createFunction(
  {
    id: "process-order",
    triggers: { event: "orders/order.created" },
    retries: 3,
    onFailure: async ({ error, event, step, runId }) => {
      await step.run("notify-team", async () => {
        await sendSlackAlert({
          message: `Order processing failed: ${error.message}`,
          runId: event.data.run_id,
        });
      });
    },
  },
  async ({ event, step }) => {
    await step.run("charge-customer", async () => {
      await chargeCustomer(event.data.orderId);
    });
  }
);
```

## Options / Props

### `onFailure` handler parameters

| Name | Type | Description |
|------|------|-------------|
| `error` | `Error` | The JavaScript `Error` object from the final failed attempt. Custom error classes deserialize as standard `Error` — `instanceof` checks won't work. |
| `event` | `InngestEvent` | The `inngest/function.failed` system event. `event.data.run_id` contains the original failed function's run ID. |
| `step` | `StepTools` | Standard step utilities matching the main handler (`run`, `sleep`, etc.). |
| `runId` | `string` | The failure handler's own run ID (not the failed function's run ID). |

## Notes

- `onFailure` is triggered only after all retries are exhausted — errors that are successfully retried do not invoke it.
- The `runId` inside `onFailure` belongs to the failure handler itself. Use `event.data.run_id` to reference the original failed run.
- Common use cases: alerting (Slack, PagerDuty), metrics (Datadog, Sentry), user notifications, partial rollback logic.
- The failure handler itself can use `step.*` utilities and has its own retry behavior.

## Related

- [create-function](./create-function.md)
- [retries](./retries.md)
