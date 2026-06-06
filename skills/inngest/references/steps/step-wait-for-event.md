# step.waitForEvent

Pauses function execution until a matching event arrives or a timeout expires. Returns the event payload or `null` on timeout.

## Signature / Usage

```ts
step.waitForEvent(
  id: string,
  options: {
    event: string;
    timeout: number | string | Date | Temporal.Duration | Temporal.Instant | Temporal.ZonedDateTime;
    match?: string;
    if?: string;
  }
): Promise<EventPayload | null>
```

```ts
const approval = await step.waitForEvent("wait-for-approval", {
  event: "app/order.approved",
  timeout: "3 days",
  match: "data.orderId",
});

if (approval === null) {
  await step.run("send-reminder", () => sendReminder(event.data.orderId));
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `id` | `string` | Unique step identifier used in logs and for memoizing state |
| `event` | `string` | The event name to wait for |
| `timeout` | `number \| string \| Date \| Temporal.*` | Maximum wait duration; accepts ms number, `ms`-compatible string, absolute date, or Temporal types |
| `match` | `string` | Dot-notation property path to correlate the trigger event with the waited event (e.g. `"data.userId"`). Cannot be combined with `if` |
| `if` | `string` | CEL expression for advanced matching using `event` (trigger) and `async` (waited event) objects. Cannot be combined with `match` |

## Notes

- Returns `null` if the timeout elapses before the event arrives; always check the return value
- Must be called with `await` to ensure the function actually pauses
- Events sent **before** the function reaches `waitForEvent` will not be matched (no lookback)
- Multiple function runs can all be resumed by a single matching event (fan-out)
- CEL expressions do not support the `in` operator; use multiple `||` equality checks instead
- `match: "data.userId"` is equivalent to `if: "event.data.userId == async.data.userId"`

## Related

- [step.run](./step-run.md)
- [step.sendEvent](./step-send-event.md)
