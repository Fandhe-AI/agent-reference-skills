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
- Sessions are optimized for historical data with a few-minute indexing lag; they are not for monitoring live-executing runs. Use [Insights](https://www.inngest.com/docs-markdown/platform-and-operations/insights) or normal run search for real-time filtering.
- Session propagation (TypeScript SDK v4.18.0 or later, on by default): a run's sessions pass automatically to events it creates through `step.sendEvent()`, `step.invoke()`, `inngest.send()`, and `defer()`, and to its `inngest/function.finished`, `.failed`, and `.cancelled` events. A deferred scorer therefore joins the session of the run it scores. (Earlier versions of this page said `step.invoke()` needed explicit `meta.sessions`; with v4.18.0+ it inherits them.)
- An event can carry five sessions. When propagated and manual sessions together exceed that, manual sessions are kept first, then propagated sessions are added in alphabetical order until the limit is reached. Sessions you set manually always override propagated ones.
- Set a key to `null` to clear a propagated session without setting a new one (`meta: { sessions: { conversation_id: null, user_id: "usr_xyz" } }`); set `meta.sessions` to `null` to clear every propagated session.
- Disable propagation per client with `new Inngest({ id: "my-app", sessionPropagation: false })`. The Python client has no option to turn propagation off; clear `ctx.sessions` in a run, or set an outgoing event's `sessions` meta to `None`. Python `meta.sessions` requires the inngest release after 0.5.19.
- Propagation through `inngest.send()` relies on async local storage; it doesn't work in runtimes without it, such as Cloudflare Workers with `nodejs_compat` turned off.
- `step.waitForEvent()` does not match on sessions (only event name and the `match` / `if` expression); the matched event's sessions are returned on `result.meta?.sessions`.
- Batching: a batched run belongs to the sessions of every event in its batch (up to 25 unique key/ID pairs, ordered alphanumerically). Events the batched run creates only inherit sessions shared by every triggering event, up to five. If a run acts on one event from the batch, read that event's sessions and set them on child events yourself.
- Middleware can validate, encrypt, or strip sessions before events are sent: in TypeScript, `transformSendEvent` (for `step.sendEvent()` / `inngest.send()`) and `transformStepInput` for `invoke` steps can delete keys from `meta.propagated_sessions`; in Python, `before_send_events` can pop from `meta["propagated_sessions"]` (Python middleware doesn't see the event `ctx.step.invoke()` sends).
- Session IDs must be strings or finite numbers (numbers are normalized to strings); booleans, `null`, objects, and arrays are rejected. Session keys and IDs cannot be empty.
- Use high-cardinality identifiers (e.g. `conversation_id`, `agent_run_id`, `ticket_id`) as session keys — not low-cardinality labels like `environment: prod`.
- Do not store secrets or sensitive personal data in session IDs.
- Webhook transforms can also add sessions by returning `meta.sessions` in the transformed event.
- Sessions are scoped to the selected environment in the dashboard, under **AI > Sessions**.

## Related

- [Sending Events](./sending-events.md)
- [step.sendEvent](./step-send-event.md)
