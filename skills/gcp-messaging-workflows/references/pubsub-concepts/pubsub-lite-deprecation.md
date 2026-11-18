---
source: https://docs.cloud.google.com/pubsub/lite/docs/deprecations
---

# Pub/Sub Lite deprecation

Pub/Sub Lite is deprecated and is not an option for new work. It is a high-volume partition-based messaging service. This page records the deprecation dates and the two migration targets: Google Cloud Managed Service for Apache Kafka and Pub/Sub. It merges the Pub/Sub Lite landing page and the deprecations page.

## Signature / Usage

### Migration step: export a Pub/Sub Lite topic to a Pub/Sub topic

This is the gcloud help example for the export subscription that the Pub/Sub Lite to Pub/Sub migration guide uses. The source deprecation pages have no code block.

```bash
gcloud pubsub lite-subscriptions create mysubscription \
  --location=us-central1-a --topic=mytopic \
  --export-pubsub-topic=pubsubtopic
```

## Options / Props

### Deprecation timeline (copied from the source note)

| Item | Statement |
|---|---|
| Status | Pub/Sub Lite is deprecated. Effective January 31, 2027, Pub/Sub Lite will be turned down. |
| Current customers | Pub/Sub Lite remains functional until January 31, 2027. If you have not used Pub/Sub Lite within the 90-day period preceding July 15, 2025 (April 15, 2025 - July 15, 2025), you won't be able to access Pub/Sub Lite starting on July 15, 2025. |
| New customers | Pub/Sub Lite is no longer available for new customers after September 24, 2024. |

### Migration targets

| Target | Guide |
|---|---|
| Google Cloud Managed Service for Apache Kafka | [migrate-pubsub-lite-to-managed-service-for-apache-kafka.md](./migrate-pubsub-lite-to-managed-service-for-apache-kafka.md) |
| Pub/Sub | [migrate-pubsub-lite-to-pubsub.md](./migrate-pubsub-lite-to-pubsub.md) |

## Notes

- Deprecated: "Pub/Sub Lite is deprecated. Effective January 31, 2027, Pub/Sub Lite will be turned down." Migrate to Managed Service for Apache Kafka or Pub/Sub; do not start new work on Pub/Sub Lite.
- The deprecation policy is defined by the Google Cloud Platform Terms of Service (section "Discontinuation of Services"); a deprecated service stays available for at least the period defined in the Terms of Service, then is scheduled for shutdown. The deprecation policy applies only to the services, features or products listed in it.
- The landing page lists the retired documentation areas (quickstarts, authentication, access control, topics, reservations, publishing, subscriptions, subscribing, seek, monitoring, pricing, quotas, samples, client libraries, REST and RPC APIs, `gcloud pubsub` Lite commands). They are not summarized here because Pub/Sub Lite is not a current option.
- The gcloud `pubsub lite-*` groups still exist in gcloud 593.0.0 and are covered by the machine-generated gcloud pages of this skill.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/pubsub/lite-subscriptions/create (gcloud 593.0.0 help).
- Source: https://docs.cloud.google.com/pubsub/lite/docs/deprecations (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/pubsub/lite/docs (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [choose-pubsub-kafka.md](./choose-pubsub-kafka.md)
- [overview.md](./overview.md)
