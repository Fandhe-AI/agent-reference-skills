---
source: https://docs.cloud.google.com/pubsub/docs/reliability-intro
---

# Pub/Sub reliability features

Overview of isolation, failover semantics, customer-controlled redundancy, publisher and subscriber tuning, regional backlog metrics, and snapshot-and-seek for safe subscriber deployments.

## Signature / Usage

### Regional isolation: restrict storage and in-transit data to regions

The source page has no code block. This is the gcloud help example for the message storage policy with `enforceInTransit` (`--message-storage-policy-enforce-in-transit`).

```bash
gcloud pubsub topics update mytopic \
  --message-storage-policy-allowed-regions=some-cloud-region1,\
some-cloud-region2 --message-storage-policy-enforce-in-transit
```

## Options / Props

### Endpoints

| Endpoint | Example | Behavior |
|---|---|---|
| Global | `pubsub.googleapis.com` | Clients connect to the network-nearest region where Pub/Sub runs. |
| Regional | `pubsub.us-central1.rep.googleapis.com` | Clients connect to the specified region; more isolation, not yet available in all regions. |
| Locational | `us-central1-pubsub.googleapis.com` | Clients connect to the specified region; use where regional endpoints are unavailable. |

### Backlog metrics

| Use | Do not use |
|---|---|
| `subscription/num_unacked_messages_by_region` | `subscription/num_undelivered_messages` |
| `subscription/oldest_unacked_message_age_by_region` | `subscription/oldest_unacked_message_age` |

### Retention

| Item | Value |
|---|---|
| Subscription message retention default | 7 days |
| Topic message retention maximum | 31 days |

## Notes

- Regional isolation steps: create a topic per region (metadata for all resources is replicated to local data stores within each region, but updates may not propagate immediately during an outage); avoid global endpoints; use a message storage policy with `enforceInTransit` set to `True`. With this, an outage in one region stops delivery only in that region. For regionally isolated administrative operations and namespace, the source suggests Managed Service for Apache Kafka.
- Default failover: messages are persisted to multiple zones in the publish region (a zonal outage does not stop delivery; the whole region has to be unavailable). Pub/Sub prefers delivering within the publish region, otherwise to the network-nearest region with subscribers that have capacity. If every subscriber is down, messages are stored up to the message retention duration; choose a retention longer than the maximum outage you tolerate.
- Pub/Sub intentionally does not fail clients over to another region automatically, to avoid cascading failures; publishers and subscribers do not fail over even with the global endpoint.
- Customer-controlled redundancy: zonal resiliency is built in (run clients in several zones, roll out changes to clients one zone at a time). For regional resiliency either publish and subscribe simultaneously in several regions through different locational endpoints (no publish retries needed; message processing must be idempotent because every message is delivered several times; cost multiplies by the number of regions plus inter-region network usage), or use a primary region with a fallback region (messages are published once; messages already stored in the failed region may be unavailable until recovery). Fallback triggers: always subscribe to the fallback (ideal), manual switch, subscriber errors (streaming pull error rate is expected to be 100% even in normal operation, and libraries retry internally), or an unexpectedly long period without messages. Mind the quota for open streaming pull connections per region.
- Ordered delivery and exactly-once delivery guarantees apply within a region; with failover, order is guaranteed only for messages published in the same region.
- Publisher tuning: tune the initial RPC timeout and the total timeout of the retry settings for network-constrained publishers; repeated deadline exceeded errors can also indicate the need for publisher flow control (limit outstanding messages or bytes; block or return an error on the limit exceeded behavior).
- Subscriber tuning: flow control limits unacknowledged messages outstanding to a streaming pull client; with growing traffic add autoscaling (for example Compute Engine autoscaler on undelivered messages) together with flow control. The global backlog metrics need all regions known to have messages, so a regional outage causes a data gap; the `by_region` versions keep reporting other regions.
- Snapshot and seek: at-least-once delivery does not protect against subscriber bugs that ack without processing. Take a snapshot before each subscriber deployment and, if the new subscriber is faulty, seek back; delete the snapshot once the subscriber is deemed working. Seeking can cause duplicates of messages already processed. Seeking to a snapshot replays messages, so try it on a disposable project first.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/pubsub/topics/update (gcloud 593.0.0 help).
- Source: https://docs.cloud.google.com/pubsub/docs/reliability-intro (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [subscription-overview.md](./subscription-overview.md)
- [subscription-properties.md](./subscription-properties.md)
- [topic-properties.md](./topic-properties.md)
