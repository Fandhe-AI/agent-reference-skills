---
source: https://docs.cloud.google.com/pubsub/docs/subscription-overview
---

# Subscription overview

To receive messages published to a topic you create a subscription. A topic can have multiple subscriptions, but a subscription belongs to a single topic. Only messages published after the subscription is created are available to it.

## Signature / Usage

The source page has no code block. Snippet from the gcloud quickstart.

```bash
gcloud pubsub subscriptions create my-sub --topic=my-topic
```

## Options / Props

### Subscription types

| Type | Delivery |
|---|---|
| Pull | The subscriber client requests messages from the Pub/Sub server. |
| Push | The Pub/Sub server initiates requests to your subscriber application. |
| BigQuery (export) | Exports data to a BigQuery table. |
| Bigtable (export, Preview) | Exports data to a Bigtable table. |
| Cloud Storage (export) | Exports data to a Cloud Storage bucket. |

### Default behavior

| Item | Value |
|---|---|
| Delivery | At-least-once with no ordering guarantees on all subscription types. |
| Ordering | Optional message ordering for messages with the same ordering key in the same region. |
| Exactly-once | Supported as an option. |
| Expiry | 31 days of subscriber inactivity or no updates to the subscription. Activity (open connections, active pulls, successful pushes) or a property update restarts the deletion clock. |

## Notes

- Subscription workflow: the subscriber must acknowledge each message; an unacknowledged message is outstanding; Pub/Sub repeatedly attempts delivery but tries not to deliver an outstanding message to another subscriber on the same subscription; after `ackDeadline` the message is redelivered.
- Messages might be delivered out of order or more than once, even after a successful acknowledgment request (server-side restarts, client-side issues). Subscribers must be idempotent.
- The type of message delivery can be updated at any time after creation.
- A new subscription with the same name as a deleted one has no relationship to the old one and no backlog.
- Topic retention lets a subscription seek back in time and replay previously published messages.
- Deleting a subscription discards its backlog; try it on a disposable project first.
- Snippet taken from https://docs.cloud.google.com/pubsub/docs/publish-receive-messages-gcloud
- Source: https://docs.cloud.google.com/pubsub/docs/subscription-overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [subscription-properties.md](./subscription-properties.md)
- [topic-properties.md](./topic-properties.md)
- [reliability-intro.md](./reliability-intro.md)
