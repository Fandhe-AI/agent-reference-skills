# context.waitForEvent()

Pauses workflow execution until an external event is received via `client.notify()` or `context.notify()`. No compute resources are consumed while waiting.

## Signature / Usage

```typescript
const { eventData, timeout } = await context.waitForEvent(
  "wait-for-payment",
  "payment-processed",
  { timeout: "1d" }
)

if (timeout) {
  // Event was not received within the timeout window
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `stepName` | `string` | Unique step identifier |
| `eventId` | `string` | Identifier of the event to wait for; must match the `eventId` passed to `notify()` |
| `options.timeout` | `string \| number` | Maximum wait time (string like `"1d"`, or seconds as number). Run fails if exceeded |

## Response

| Field | Type | Description |
|-------|------|-------------|
| `eventData` | `any` | Data delivered by the notifying caller |
| `timeout` | `boolean` | `true` if the event was not received before the timeout |

## Timeout Limits by Plan

| Plan | Maximum timeout |
|------|----------------|
| Free | 7 days |
| Pay-as-you-go | 1 year |
| Fixed pricing | Custom |

## Notes

- Race condition: if `notify()` is called before `waitForEvent()` is reached, the notification can be lost. Mitigations:
  1. **Lookback** — pass `workflowRunId` to `client.notify()` to store notifications for late delivery (recommended)
  2. **Webhooks** — use `context.createWebhook()` / `context.waitForWebhook()` which have built-in lookback
  3. **Check-and-retry** — verify the `waiters` array in the notify response and retry if empty
- Use specific, unique event IDs (e.g., `user-{userId}-verified`) to avoid fan-out performance issues

## Related

- [context](./context.md)
- [context.notify](./context-notify.md)
- [client.notify](./client-notify.md)
- [wait-for-event feature](./wait-for-event.md)
