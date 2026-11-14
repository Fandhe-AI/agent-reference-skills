# context.notify()

Sends an event notification from within a workflow to resume other workflows paused at `context.waitForEvent()`. Optionally includes a `workflowRunId` for lookback support.

## Signature / Usage

```typescript
const { notifyResponse } = await context.notify(
  "notify-payment-complete",
  "payment-processed",
  { orderId, status: "success" },
  "wfr_order_processor_123"  // optional: workflowRunId for lookback
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `stepName` | `string` | Unique step identifier |
| `eventId` | `string` | Event identifier; must match the `eventId` in the target `waitForEvent()` |
| `eventData` | `any` | Payload delivered to waiting workflows |
| `workflowRunId` | `string` (optional) | Target workflow run ID; enables lookback to handle race conditions |

### Response

Returns an object:

| Field | Type | Description |
|-------|------|-------------|
| `eventId` | `string` | The event ID that was notified |
| `eventData` | `any` | The event data sent with the notification |
| `notifyResponse` | `NotifyResponse[]` | One entry per workflow that was waiting on the event; an empty list means none was waiting |

Each `NotifyResponse` has `messageId` (unique per notification), `error` (set if delivery to that waiter failed) and `Waiter` details (`url`, `deadline`, `headers`, `timeoutUrl`, `timeoutBody`, `timeoutHeaders`).

## Notes

- When `workflowRunId` is provided, the notification is stored and delivered even if `notify()` is called before `waitForEvent()` is reached (lookback)
- Source: https://upstash.com/docs/workflow/steps/notify (fetched 2026-11-14; no version pin on the site)
- `context.notify()` is used from within a workflow step; use `client.notify()` for notifications from outside a workflow

## Related

- [context.waitForEvent](./context-wait-for-event.md)
- [client.notify](./client-notify.md)
- [wait-for-event feature](./wait-for-event.md)
