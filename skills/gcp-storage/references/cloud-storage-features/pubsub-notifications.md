---
source: https://docs.cloud.google.com/storage/docs/pubsub-notifications
---

# Pub/Sub notifications for Cloud Storage

Pub/Sub notifications send information about object changes in a bucket to a Pub/Sub topic as messages with attributes and an optional JSON payload.

## Signature / Usage

Custom attributes (up to 10 per configuration) are set when creating a configuration, with `--custom-attributes` in a `gcloud storage buckets notifications create` command (https://docs.cloud.google.com/sdk/gcloud/reference/storage/buckets/notifications/create) or the `custom_attributes` object in a `POST notificationConfigs` JSON request.

Because notifications are not guaranteed to arrive in order, the source recommends using generation and metageneration preconditions when modifying an object based on a notification.

Snippet taken from https://docs.cloud.google.com/storage/docs/request-preconditions:

```bash
gcloud storage cp OBJECT_LOCATION gs://DESTINATION_BUCKET_NAME --if-generation-match=GENERATION
```

## Options / Props

### Event types

| Event type | Description |
|---|---|
| `OBJECT_FINALIZE` | New object or new generation successfully created (including copy, rewrite, restore; also finalizing an object in a zonal bucket). Failed uploads do not trigger it. |
| `OBJECT_INITIALIZE` | An object starts creation in a zonal bucket. |
| `OBJECT_METADATA_UPDATE` | Metadata of an existing object changes. |
| `OBJECT_DELETE` | Object permanently deleted, including replaced objects and lifecycle deletions. Not sent for objects becoming noncurrent (see `OBJECT_ARCHIVE`) or aborted multipart uploads. |
| `OBJECT_ARCHIVE` | Only with Object Versioning enabled: the live version became noncurrent (explicitly or by replacement). |

For other events (bucket operations, object reads) enable the matching Cloud Audit Logs type and route it to Pub/Sub with a filter.

### Limits

| Limit | Value |
|---|---|
| Notification configurations per bucket | up to 100 total |
| Configurations triggering on one specific event | up to 10 (more returns an error) |
| Custom attributes per configuration | up to 10 |
| Latency impact on triggering events | about 0.1 seconds |
| Delay before a new configuration starts sending | up to 30 seconds |
| Retention of undeliverable notifications | may be deleted after 7 days |

### Attributes

Always present: `notificationConfig` (for example `projects/_/buckets/foo/notificationConfigs/3`), `eventType`, `payloadFormat` (for example `JSON_API_V1`), `bucketId`, `objectId`, `objectGeneration`, `eventTime` (RFC 3339).

Sometimes present: `overwrittenByGeneration` (on `OBJECT_ARCHIVE` / `OBJECT_DELETE` after replacement) and `overwroteGeneration` (on `OBJECT_FINALIZE` after replacement).

### Payload

| Payload type | Description |
|---|---|
| `NONE` | No payload |
| `JSON_API_V1` | UTF-8 string of the object's JSON metadata resource representation |

For `OBJECT_DELETE` the payload is the metadata before delete plus a `timeDeleted` property; for others it is the metadata after the change.

## Notes

- Replacing an object triggers two events: `OBJECT_FINALIZE` for the new version and `OBJECT_ARCHIVE` or `OBJECT_DELETE` for the replaced one.
- Each configuration is identified by an integer returned on create, on list, and in the `notificationConfig` attribute. Creating and deleting configurations increments the bucket's metageneration.
- Delivery: no SLA for delivery time (typically seconds, sometimes substantially longer). At-least-once delivery from Cloud Storage to Pub/Sub, and Pub/Sub is also at-least-once, so duplicates with different message IDs can occur. Delivery fails if the topic is gone, permission to publish is lost, or the topic project exceeds its publishing quota.
- Alternative: Cloud Run functions (bucket must be in the same project as the function) for lightweight handlers without managing a topic.
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Source: https://docs.cloud.google.com/storage/docs/pubsub-notifications (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source (snippet): https://docs.cloud.google.com/storage/docs/request-preconditions

## Related

- [request-preconditions.md](./request-preconditions.md)
