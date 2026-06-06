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

## Response

Returns `NotifyResponse[]`. Each entry contains:

| Field | Type | Description |
|-------|------|-------------|
| `messageId` | `string` | Unique notification message identifier |
| `workflowRunId` | `string` | Run ID of the notified workflow |
| `workflowCreatedAt` | `number` | Unix timestamp (ms) of when the workflow was created |

## Notes

- When `workflowRunId` is provided, the notification is stored and delivered even if `notify()` is called before `waitForEvent()` is reached (lookback)
- `context.notify()` is used from within a workflow step; use `client.notify()` for notifications from outside a workflow

## Related

- [context.waitForEvent](./context-wait-for-event.md)
- [client.notify](./client-notify.md)
- [wait-for-event feature](./wait-for-event.md)
