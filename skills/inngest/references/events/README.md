# Events

| Name | Description | Path |
|------|-------------|------|
| Sending Events (`inngest.send`) | Send one or more events from your application backend | [sending-events.md](./sending-events.md) |
| Event Payload Schema | Full schema of an Inngest event object (name, data, id, ts, user, v fields) | [event-payload-schema.md](./event-payload-schema.md) |
| step.sendEvent | Send events reliably from within a function with automatic tracing | [step-send-event.md](./step-send-event.md) |
| Event Keys | Secret keys that authenticate event publishing to an Inngest environment | [event-keys.md](./event-keys.md) |
| Event Naming Conventions | Recommended `prefix/entity.action` naming patterns | [event-naming-conventions.md](./event-naming-conventions.md) |
| TypeScript Event Types | Define typed event schemas with `eventType()`, `staticSchema`, Zod/Valibot | [typescript-event-types.md](./typescript-event-types.md) |
| Fan-out | Trigger multiple independent functions from a single event | [fan-out.md](./fan-out.md) |
| Webhooks | Consume external HTTP webhooks and transform them into Inngest events | [webhooks.md](./webhooks.md) |
| Sending Events from Functions | Broadcast events from within a running function for fan-out or pipeline stages | [sending-events-from-functions.md](./sending-events-from-functions.md) |
| Multiple Triggers and Wildcards | Configure up to 10 triggers per function with wildcard event matching | [multiple-triggers.md](./multiple-triggers.md) |
