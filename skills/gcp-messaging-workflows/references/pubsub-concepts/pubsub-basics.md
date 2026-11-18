---
source: https://docs.cloud.google.com/pubsub/docs/pubsub-basics
---

# Pub/Sub service basics

Core components (publisher, message, topic, schema, subscription, subscriber), the life of a message, message states (acked / unacked / nacked), publish-subscribe patterns, configuration options, setup steps and resource naming rules.

## Signature / Usage

### Resource name format

```text
projects/project-identifier/collection/ID
```

## Options / Props

### Components

| Component | Description |
|---|---|
| Publisher (producer) | Creates messages and publishes them to a specified topic. |
| Message | The data that moves through the service. |
| Topic | A named entity that represents a feed of messages. |
| Schema | A named entity that governs the data format of a message. |
| Subscription | A named entity that represents an interest in receiving messages on a particular topic. |
| Subscriber (consumer) | Receives messages on a specified subscription. |

### Message states

| State | Behavior |
|---|---|
| Acknowledged (acked) | After all subscriptions on a topic have acknowledged the message, it is asynchronously deleted from the publish message source and from storage. |
| Unacknowledged (unacked) | Without an ack within the acknowledgment deadline (`ackDeadline`) the message might be delivered more than once, and keeps being delivered until the message retention duration since publication expires; then the message expires. |
| Negatively acknowledged (nacked) | Pub/Sub redelivers immediately based on the default retry settings (modifiable). `modifyAckDeadline` with a value of 0 nacks a message. |

### Publish-subscribe patterns

| Pattern | Shape |
|---|---|
| Fan in (many-to-one) | Multiple publishers, one topic, one subscription, one subscriber getting all messages. |
| Load balanced (many-to-many) | One or more publishers, one topic, one subscription, multiple subscribers each getting a distinct subset of messages; add subscribers to scale. |
| Fan out (one-to-many) | One or more publishers, one topic, multiple subscriptions each with its own subscriber; every subscription gets every message. Several subscribers per subscription give load-balanced subsets. |

### Resource ID rules

| Part | Rule |
|---|---|
| `project-identifier` | Project ID or project number. |
| `collection` | One of `topics`, `subscriptions`, `schemas`, `snapshots`. |
| `ID` | Must not begin with `goog`; start with a letter; 3 to 255 characters; only letters `[A-Za-z]`, numbers `[0-9]`, `-`, `_`, `.`, `~`, `+`, `%`. Other special characters must be URL-encoded (`mi-tópico` is invalid, `mi-t%C3%B3pico` is valid). |

### Configuration options

| Option | Note |
|---|---|
| Google Cloud console, Google Cloud CLI | For trying Pub/Sub. |
| Cloud Client libraries (high-level) | Recommended for high throughput and low latency; uses the StreamingPull API by default. |
| REST and RPC APIs (low-level) | Auto-generated gRPC library for direct service API use. |

## Notes

- Life of a message: the publisher sends a message to a topic; it is written to storage and delivered to all attached subscriptions; the subscriber acknowledges; after at least one subscriber for each subscription has acknowledged, Pub/Sub deletes the message from storage.
- While a message is outstanding to a subscriber, Pub/Sub does not try to deliver it to another subscriber on the same subscription; after `ackDeadline` it is available for delivery again.
- Setup steps: choose a project, enable the Pub/Sub API, get roles, create a topic, optionally define and attach a schema, configure a publisher (optionally flow control, batching, concurrency control), choose a subscription type, create a subscription, configure a subscriber (optionally exactly-once delivery, lease management, ordered delivery, flow control).
- Client library practices: performance varies by language (Java is more effective at scaling vertically than Python; Java, C++ and Go need fewer compute resources); use the latest library version; reuse publisher clients (in Node, save and reuse the topic object).
- Client libraries can specify the project identifier and the ID in separate fields.
- Source: https://docs.cloud.google.com/pubsub/docs/pubsub-basics (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [subscription-overview.md](./subscription-overview.md)
- [topic-properties.md](./topic-properties.md)
- [publish-receive-messages-gcloud.md](./publish-receive-messages-gcloud.md)
