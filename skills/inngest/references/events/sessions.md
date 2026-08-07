# Sessions

Sessions group function runs that belong to the same user flow, conversation, or job by attaching `meta.sessions` to an event. They add searchable metadata without changing which functions run.

## Signature / Usage

```ts
import { inngest } from "./client";

await inngest.send({
  name: "app/message.created",
  data: {
    messageId: "msg_01JYY8R9C5R6VAW5EJ0P4K7V90",
    conversationId: "conv_1234",
  },
  meta: {
    sessions: {
      conversation_id: "conv_1234",
    },
  },
});
```

The object key (`conversation_id`) is the session key; the value (`conv_1234`) is the session ID. The same session key can be reused across many events, and each unique session ID becomes a session in the dashboard.

## Options / Props

| Field | Limit |
|-------|-------|
| Session key | 128 bytes |
| Session ID | 512 bytes |
| Entries per event | Up to 5 in `meta.sessions` |
| Unique session key/ID pairs per batched run | First 25, ordered alphanumerically |

## Notes

- Requires TypeScript SDK v4.7.0 or later.
- Sessions are optimized for historical data with a few-minute indexing lag; they are not for monitoring live-executing runs. Use [Insights](https://www.inngest.com/docs-markdown/platform/monitor/insights) or normal run search for real-time filtering.
- Sessions follow events, not runs: `step.sendEvent()` attaches `meta.sessions` the same way as `inngest.send()`; `step.invoke()` requires explicit `meta.sessions` (not inherited from the calling run); `step.waitForEvent()` does not match on sessions, but the matched event's sessions are returned on `result.meta?.sessions`; failure/lifecycle events (`inngest/function.finished`, `.failed`, `.cancelled`) carry the `meta.sessions` of the event they report on.
- Session IDs must be strings or finite numbers (numbers are normalized to strings); booleans, `null`, objects, and arrays are rejected. Session keys and IDs cannot be empty.
- Use high-cardinality identifiers (e.g. `conversation_id`, `agent_run_id`, `ticket_id`) as session keys — not low-cardinality labels like `environment: prod`.
- Do not store secrets or sensitive personal data in session IDs.
- Webhook transforms can also add sessions by returning `meta.sessions` in the transformed event.
- Sessions are scoped to the selected environment in the dashboard, under **AI > Sessions**.

## Related

- [Sending Events](./sending-events.md)
- [step.sendEvent](./step-send-event.md)
