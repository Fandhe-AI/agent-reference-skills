# client.notify()

Resumes workflows paused at `context.waitForEvent()` by delivering an event and optional payload. Called from outside a workflow (e.g., a webhook handler or API route).

## Signature / Usage

```typescript
import { Client } from "@upstash/workflow"

const client = new Client({ token: process.env.QSTASH_TOKEN! })

// Basic notify
await client.notify({
  eventId: "payment-processed",
  eventData: { amount: 100, status: "success" },
})

// With lookback (recommended for race condition prevention)
await client.notify({
  eventId: "payment-processed",
  eventData: { amount: 100 },
  workflowRunId: "wfr_abc123",
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `eventId` | `string` | **Required.** Identifier of the event to deliver; must match the `eventId` in `context.waitForEvent()` |
| `eventData` | `any` | Data delivered to the waiting workflow's `eventData` field |
| `workflowRunId` | `string` (optional) | Target a specific run; enables lookback — notification is stored even if sent before `waitForEvent` is reached |

## Response

Returns `Waiter[]` — a list of notified workflow runs.

## Notes

- Use `client.notify()` from external code (webhooks, API routes outside the workflow); use `context.notify()` from inside a workflow
- Providing `workflowRunId` is the recommended way to prevent race conditions

## Related

- [context.waitForEvent](./context-wait-for-event.md)
- [context.notify](./context-notify.md)
- [wait-for-event](./wait-for-event.md)
