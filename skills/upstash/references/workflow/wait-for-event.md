# Wait for Event

Feature that pauses a workflow until an external event is received, without consuming compute resources. Uses `context.waitForEvent()` to pause and `client.notify()` or `context.notify()` to resume.

## Signature / Usage

```typescript
// Inside the workflow — pause until an event arrives
const { eventData, timeout } = await context.waitForEvent(
  "wait-for-payment",
  "payment-processed",
  { timeout: "7d" }
)

if (timeout) {
  // Handle timeout scenario
  return
}

// Outside the workflow — send the event to resume
await client.notify({
  eventId: "payment-processed",
  eventData: { amount: 100 },
  workflowRunId: workflowRunId, // enables lookback
})
```

## Timeout Limits by Plan

| Plan | Maximum timeout |
|------|----------------|
| Free | 7 days |
| Pay-as-you-go | 1 year |
| Fixed pricing | Custom |

## Race Condition Mitigations

| Strategy | Description |
|----------|-------------|
| Lookback (recommended) | Pass `workflowRunId` to `client.notify()`; notification is stored even if sent before `waitForEvent` is reached |
| Webhooks | Use `context.createWebhook()` / `context.waitForWebhook()` which have built-in lookback |
| Check-and-retry | Check the `waiters` array in the notify response; retry if empty |

## Notes

- Use specific, unique event IDs (e.g., `user-{userId}-verified`) to avoid fan-out performance issues when many workflows share an event ID

## Related

- [context.waitForEvent](./context-wait-for-event.md)
- [context.notify](./context-notify.md)
- [client.notify](./client-notify.md)
