# Events

| Name | Description | Path |
|------|-------------|------|
| Event Keys | Secret keys that authenticate event publishing to a specific Inngest environment. Required in production to ensure only authorized applications can send events. | [event-keys.md](./event-keys.md) |
| Event Naming Conventions | Recommended patterns for naming Inngest events consistently across your application. | [event-naming-conventions.md](./event-naming-conventions.md) |
| Event Payload Schema | The structure of an Inngest event object sent via `inngest.send()` or `step.sendEvent()`. | [event-payload-schema.md](./event-payload-schema.md) |
| Fan-out (One Event → Multiple Functions) | Trigger multiple independent functions in parallel by having them all listen on the same event name. No additional configuration required — each function with a matching trigger runs automatically. | [fan-out.md](./fan-out.md) |
| Multiple Triggers and Wildcards | A single function can listen on up to 10 triggers (events and/or cron schedules), and event names support wildcard matching after `/` and `.` separators. | [multiple-triggers.md](./multiple-triggers.md) |
| Sending Events from Functions | Broadcast events from within a running Inngest function to trigger downstream functions, implement fan-out, or decouple pipeline stages. | [sending-events-from-functions.md](./sending-events-from-functions.md) |
| Sending Events (`inngest.send`) | Send one or more events to Inngest from your application backend. Triggers any functions listening on the matching event name. | [sending-events.md](./sending-events.md) |
| Sessions | Sessions group function runs that belong to the same user flow, conversation, or job by attaching `meta.sessions` to an event. They add searchable metadata without changing which functions run. | [sessions.md](./sessions.md) |
| step.sendEvent | Send one or more events reliably from within an Inngest function. Preferred over `inngest.send()` inside functions because it adds automatic tracing context linking events to the current run. | [step-send-event.md](./step-send-event.md) |
| TypeScript Event Types | Define typed event schemas for compile-time safety in `inngest.send()`, `inngest.createFunction()`, and `step.waitForEvent()`. | [typescript-event-types.md](./typescript-event-types.md) |
| Webhooks | Consume HTTP webhook events from external services and convert them into Inngest events using transform functions. | [webhooks.md](./webhooks.md) |
| Writing Expressions | Expressions configure keys and conditional matching for functions (concurrency, rate limiting, debounce, idempotency keys, `waitForEvent`/cancellation matching, trigger `if`, run priority). All expressions use the [Common Expression Language (CEL)](https://github.com/google/cel-go). | [writing-expressions.md](./writing-expressions.md) |
