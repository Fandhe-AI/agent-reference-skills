# Events

| Name | Description | Path |
|------|-------------|------|
| Event Keys | Secret keys that authenticate event publishing to a specific Inngest… | [event-keys.md](./event-keys.md) |
| Event Naming Conventions | Recommended patterns for naming Inngest events consistently across… | [event-naming-conventions.md](./event-naming-conventions.md) |
| Event Payload Schema | The structure of an Inngest event object sent via inngest.send() or… | [event-payload-schema.md](./event-payload-schema.md) |
| Fan-out (One Event → Multiple Functions) | Trigger multiple independent functions in parallel by having them… | [fan-out.md](./fan-out.md) |
| Multiple Triggers and Wildcards | A single function can listen on up to 10 triggers (events and/or… | [multiple-triggers.md](./multiple-triggers.md) |
| Sending Events from Functions | Broadcast events from within a running Inngest function to trigger… | [sending-events-from-functions.md](./sending-events-from-functions.md) |
| Sending Events (`inngest.send`) | Send one or more events to Inngest from your application backend | [sending-events.md](./sending-events.md) |
| Sessions | Sessions group function runs that belong to the same user flow,… | [sessions.md](./sessions.md) |
| step.sendEvent | Send one or more events reliably from within an Inngest function | [step-send-event.md](./step-send-event.md) |
| TypeScript Event Types | Define typed event schemas for compile-time safety in inngest.send()… | [typescript-event-types.md](./typescript-event-types.md) |
| Webhooks | Consume HTTP webhook events from external services and convert them… | [webhooks.md](./webhooks.md) |
| Writing Expressions | Expressions configure keys and conditional matching for functions… | [writing-expressions.md](./writing-expressions.md) |
