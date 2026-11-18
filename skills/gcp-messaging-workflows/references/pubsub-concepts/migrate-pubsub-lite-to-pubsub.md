---
source: https://docs.cloud.google.com/pubsub/lite/docs/migrate-pubsub-lite-to-pubsub
---

# Migrate Pub/Sub Lite to Pub/Sub

Pub/Sub Lite is deprecated (turn-down January 31, 2027; not available to new customers after September 24, 2024). To migrate to Pub/Sub, use the Pub/Sub Lite export subscription, which converts Pub/Sub Lite messages to Pub/Sub messages, and move publishers and subscribers in phases.

## Signature / Usage

### Create a Pub/Sub Lite export subscription

The source page has no code block. This is the gcloud help example for exporting a Pub/Sub Lite topic to a Pub/Sub topic.

```bash
gcloud pubsub lite-subscriptions create mysubscription \
  --location=us-central1-a --topic=mytopic \
  --export-pubsub-topic=pubsubtopic
```

## Options / Props

### Differences that matter when migrating

| Area | Pub/Sub Lite | Pub/Sub | Key migration point |
|---|---|---|---|
| Data locality and replication | Regional topics replicate to a secondary zone in the region; zonal topics store data in one zone without replication. | Replicates data across three zones within a region. | Use message storage policies for preferred regions. No control over specific zones. Without a policy, storage follows the Resource Location Restriction organization policy; if none is set, all regions are allowed and one is selected automatically. |
| Delivery modes | Only the StreamingPull RPC API. | Multiple delivery options including StreamingPull. | To replicate Lite behavior (low latency, high efficiency) use StreamingPull consumers; push delivery is an alternative. |
| Parallelism and ordering | Parallelism per partition. | Parallelism per message. | Not partition-based; ordering needs ordering keys. The export subscription uses the Lite key as the Pub/Sub ordering key. Lite keys are bytes, ordering keys are strings, so keys must be UTF-8. Ordering keys have a maximum publisher throughput of 1 MBps; ordering is guaranteed only within a single region; message ordering must be enabled in the subscription settings. |
| Replay and purge | Seek works without extra configuration. | Seek needs configuration on both sides. | Topic: configure a message retention duration. Subscription: configure acknowledged message retention. |
| Capacity and pricing | Manually provisioned through Lite reservations. | Fully managed, scales automatically, billed on usage. | Manage capacity or cost with quota overrides or quota change requests. |

### Phased migration workflow

| Step | Action |
|---|---|
| 1 | Create the Pub/Sub topics and a subscription to the topic (configure message retention, acknowledgment and message storage policies; set quotas if required). |
| 2 | Create a Pub/Sub Lite export subscription per topic; use a Lite reservation to manage throughput of all export subscriptions collectively. |
| 3 | Subscribe to both Pub/Sub and Pub/Sub Lite subscriptions (run old and new subscribers in parallel and compare). |
| 4 | Gradually update publishers to send to the Pub/Sub topic. |
| 5 | Verify that the migrated workload works. |
| 6 | Turn down Pub/Sub Lite publishers, subscribers and resources. |

## Notes

- Deprecated: "Pub/Sub Lite is deprecated. Effective January 31, 2027, Pub/Sub Lite will be turned down." Current customers: remains functional until January 31, 2027; if not used within the 90-day period preceding July 15, 2025 (April 15, 2025 - July 15, 2025), access is lost starting July 15, 2025. New customers: no longer available after September 24, 2024. Migration targets: Managed Service for Apache Kafka or Pub/Sub.
- The source strongly recommends a dead-letter Pub/Sub Lite topic to capture messages that fail to migrate, so errors can be diagnosed and failed messages resent.
- After the export subscriptions are created, both topics receive the same messages from the point the export subscriptions were created.
- Pub/Sub offers pull and push delivery; the source recommends configuring the StreamingPull API to emulate Lite behavior.
- Turning down Lite resources is irreversible; do it only after all consumers and publishers run on Pub/Sub, and rehearse on a disposable project first.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/pubsub/lite-subscriptions/create (gcloud 593.0.0 help).
- Source: https://docs.cloud.google.com/pubsub/lite/docs/migrate-pubsub-lite-to-pubsub (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [pubsub-lite-deprecation.md](./pubsub-lite-deprecation.md)
- [migrate-pubsub-lite-to-managed-service-for-apache-kafka.md](./migrate-pubsub-lite-to-managed-service-for-apache-kafka.md)
- [subscription-properties.md](./subscription-properties.md)
