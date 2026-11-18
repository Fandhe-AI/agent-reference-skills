---
source: https://docs.cloud.google.com/pubsub/docs/bigtable-subscriptions
---

# Bigtable Subscriptions Overview

Preview. A Bigtable subscription is an export subscription that writes Pub/Sub messages to an existing Bigtable table as they are received, with no separate subscriber client. Use it when messages need no further processing or the processing can be done by a Single Message Transform (SMT); for more complex transformation use a Dataflow pipeline with a pull subscription. Delivery is at-least-once.

## Signature / Usage

The source page has no code. The block below creates a Bigtable subscription; the Bigtable flags exist only on the `beta` / `alpha` tracks.

```bash
gcloud beta pubsub subscriptions create SUBSCRIPTION_ID \
  --topic=TOPIC_ID \
  --bigtable-table=projects/PROJECT_ID/instances/INSTANCE_ID/tables/TABLE_ID
```

The Bigtable destination table name format (gcloud 593.0.0 help for `--bigtable-table`, `gcloud beta pubsub subscriptions create`):

```text
projects/{project}/instances/{instance_name}/tables/{table_name}
```

### Workflow

1. A publisher sends a message to a Pub/Sub topic.
2. Pub/Sub forwards the message to the Bigtable subscription.
3. The subscription sends a write request to Bigtable, specifying an app profile that uses single-cluster routing.
4. Bigtable routes the message to the cluster that contains the table.
5. The write request is committed to the table.
6. After a successful write, the Bigtable API returns a success response.

If a write fails: the Pub/Sub message is negatively acknowledged, Pub/Sub resends it, and if it fails enough times and a dead-letter topic is configured, the message is moved to the dead-letter topic.

## Options / Props

### Delivery and failure behavior

| Topic | Behavior |
|-------|----------|
| Delivery semantics | At-least-once. For exact de-duplication, handle duplicates downstream in Bigtable or use Dataflow exactly-once processing. |
| Undeliverable messages | Not acknowledged; configure a dead-letter topic. The forwarded message has the attribute `CloudPubSubDeadLetterSourceDeliveryErrorMessage` with the reason for the write failure. |
| Backoff | Pub/Sub backs off delivery in a way similar to push backoff behavior. |
| Quotas | Bigtable subscriber throughput is limited per region (see Pub/Sub quotas and limits); Bigtable's own limits apply (see Bigtable quotas and limits). |

### gcloud flags for a Bigtable subscription (gcloud 593.0.0, `beta` and `alpha` tracks only)

| Flag | Description |
|------|-------------|
| `--bigtable-table` | Table, `projects/{project}/instances/{instance_name}/tables/{table_name}`. Must be specified if any other Bigtable flag is used. |
| `--bigtable-app-profile-id` | App profile for the writes. |
| `--bigtable-service-account-email` | Service account used to write; the Pub/Sub service agent if unspecified. |
| `--bigtable-write-metadata` | Write subscription name, `message_id`, `publish_time`, attributes and ordering key as additional fields. |
| `--bigtable-use-row-key-schema` | Write row keys from the row key schema of the target table. Not combinable with `--bigtable-key-fields`. |
| `--bigtable-key-fields` | Pub/Sub message fields joined for the row key. Not combinable with `--bigtable-use-row-key-schema`. |
| `--bigtable-delimiter` | Delimiter for joining row key fields; only with `--bigtable-key-fields`. |

## Notes

- Preview: subject to the "Pre-GA Offerings Terms" of the Service Specific Terms; available "as is" with possibly limited support.
- The Bigtable flags exist only in `gcloud beta` / `gcloud alpha` pubsub subscriptions create in gcloud 593.0.0, not in the GA command; the gcloud help states the Pub/Sub service account `service-{project_number}@gcp-sa-pubsub.iam.gserviceaccount.com` must have permission to write to the table. The roles and the create procedure are on the "Create a Bigtable subscription" page, which is not part of this category's source set.
- The REST `BigtableConfig` documents that the app profile must use single-cluster routing and that "default" is used when none is given.
- Snippet taken from https://docs.cloud.google.com/pubsub/docs/create-bigtable-subscription (the create command; the table must have a column family named `data` per that page).
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/beta/pubsub/subscriptions/create (gcloud 593.0.0 help): the table-name format and the flag table.
- Pricing is not copied; see https://cloud.google.com/pubsub/pricing.
- Bigtable itself belongs to `gcp-databases-nosql`.
- Source: https://docs.cloud.google.com/pubsub/docs/bigtable-subscriptions (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [bigquery.md](./bigquery.md)
- [cloudstorage.md](./cloudstorage.md)
