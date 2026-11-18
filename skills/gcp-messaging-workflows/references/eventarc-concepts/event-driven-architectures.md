---
source: https://docs.cloud.google.com/eventarc/docs/event-driven-architectures
---

# Event-driven architectures

Event producers publish immutable notifications, while an event router (or broker) filters and fans out messages to downstream event consumers (or sinks). This asynchronous decoupling lets you deploy, scale, and update components in isolation. Event delivery is managed by defining enrollments in Eventarc Advanced or triggers in Eventarc Standard.

## Signature / Usage

### Core components

Three decoupled components make up the system:

- Event producers: publish events.
- Event router: links services; receives, filters, and sends messages to the appropriate consumers asynchronously.
- Event consumers: react to events.

An event is a record of something that has happened; it captures an immutable fact that cannot be changed or deleted, occurs whether or not a service applies logic upon consuming it, and can be persisted indefinitely and consumed as many times as necessary.

### A trigger declares interest in an event (Eventarc Standard)

```bash
gcloud eventarc triggers create trigger-pubsub \
    --destination-run-service=hello \
    --destination-run-region=us-central1 \
    --location=us-central1 \
    --event-filters="type=google.cloud.pubsub.topic.v1.messagePublished" \
    --transport-topic=projects/your-projectid/topics/your-topic
```

## Notes

- When to use: monitor and alert on changes to resources; fan out one event to multiple consumers without custom code; interoperate between technology stacks; coordinate systems and teams across regions and accounts.
- Benefits: loose coupling, asynchronous eventing and resiliency (log events so a receiver can resume or replay), push-based messaging with less polling, simplified auditing and event sourcing.
- Architectural considerations: the event source must be durable and reliable if every event must be processed; the application must handle multiple asynchronous requests (do not rely on global scope or inelastic databases); flow tracking is dynamic via monitoring, not static via code analysis; to rebuild state from events, ensure data is deduplicated and ordered.
- Snippet taken from https://docs.cloud.google.com/eventarc/docs/understand-locations (the source page has no code).
- Source: https://docs.cloud.google.com/eventarc/docs/event-driven-architectures (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [eventarc-standard-overview.md](./eventarc-standard-overview.md)
- [eventarc-advanced-overview.md](./eventarc-advanced-overview.md)
