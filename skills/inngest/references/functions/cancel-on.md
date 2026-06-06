# cancelOn

Stops execution of a running or sleeping function when a specific event is received. Functions are cancelled between steps — a currently executing step finishes before cancellation takes effect.

## Signature / Usage

```ts
inngest.createFunction(
  {
    id: "send-reminder",
    triggers: { event: "tasks/reminder.created" },
    cancelOn: [
      {
        event: "tasks/reminder.deleted",
        match: "data.reminderId",
      },
    ],
  },
  async ({ event, step }) => {
    await step.sleep("wait-before-reminder", "7d");
    await step.run("send-reminder", async () => {
      await sendReminder(event.data.reminderId);
    });
  }
);
```

## Options / Props

`cancelOn` accepts an array of cancellation objects (maximum 5):

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `event` | `string \| EventType` | Yes | Event name that triggers cancellation. |
| `match` | `string` | No | Dot-notation property path to match between the triggering event and the cancelling event. Mutually exclusive with `if`. |
| `if` | `string` | No | CEL expression for conditional matching. References the original trigger as `event` and the cancelling event as `async`. Mutually exclusive with `match`. |
| `timeout` | `string \| number \| Date` | No | Duration window for receiving the cancellation event. Accepts duration strings (`"30m"`, `"3 hours"`), milliseconds, `Date`, `Temporal.Duration`, `Temporal.Instant`, or `Temporal.ZonedDateTime`. |

## Notes

- Cancelled runs appear with status **Canceled** in the Inngest dashboard.
- A maximum of 5 cancellation events per function is supported.
- `match: "data.reminderId"` is shorthand for `if: "async.data.reminderId == event.data.reminderId"`.
- `if` allows complex multi-field conditions, e.g. `"async.data.userId == event.data.userId && async.data.billing_plan == 'pro'"`.
- Cancellation only applies while the function is waiting (sleeping, awaiting events) or between steps — it will not interrupt a step mid-execution.
- `cancelOn` is incompatible with `batchEvents`.

## Related

- [create-function](./create-function.md)
- [timeouts](./timeouts.md)
- [durable-execution](./durable-execution.md)
