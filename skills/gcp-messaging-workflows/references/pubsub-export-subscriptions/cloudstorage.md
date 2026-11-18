---
source: https://docs.cloud.google.com/pubsub/docs/cloudstorage
---

# Cloud Storage Subscriptions Overview

A Cloud Storage subscription is an export subscription that writes Pub/Sub messages to an existing Cloud Storage bucket as they are received, with no separate subscriber client. Messages are written in batches; each batch is one object in the bucket. For lightweight changes to messages or attributes attach a Single Message Transform (SMT); use a Dataflow pipeline for complex transformation, windowing or aggregation.

## Signature / Usage

Adapted (not in the official docs): the source command is missing the `\` line continuation after `--cloud-storage-write-metadata` and `--cloud-storage-use-topic-schema`, so the shell would run them as separate commands.

```bash
gcloud pubsub subscriptions create SUBSCRIPTION_ID \
    --topic=TOPIC_ID \
    --cloud-storage-bucket=BUCKET_NAME \
    --cloud-storage-file-prefix=CLOUD_STORAGE_FILE_PREFIX \
    --cloud-storage-file-suffix=CLOUD_STORAGE_FILE_SUFFIX \
    --cloud-storage-file-datetime-format=CLOUD_STORAGE_FILE_DATETIME_FORMAT \
    --cloud-storage-max-duration=CLOUD_STORAGE_MAX_DURATION \
    --cloud-storage-max-bytes=CLOUD_STORAGE_MAX_BYTES \
    --cloud-storage-max-messages=CLOUD_STORAGE_MAX_MESSAGES \
    --cloud-storage-output-format=CLOUD_STORAGE_OUTPUT_FORMAT \
    --cloud-storage-write-metadata \
    --cloud-storage-use-topic-schema
```

### Workflow

1. Pub/Sub uses the Cloud Storage API to send data to the bucket. After a successful write, the API returns an `OK` response.
2. Messages are sent in batches. A single batch corresponds to one object in the bucket; you configure batch settings by object size and time elapsed since the object was created.
3. Writing an object needs two `OK` responses: the first when a message is written to an object, the second when the object containing it is finalized. A message becomes visible in the bucket only after the object containing it is finalized.
4. If a write fails, the Pub/Sub message is negatively acknowledged and resent. If it fails enough times and a dead-letter topic is configured on the subscription, the message is moved to the dead-letter topic.

### Failure handling

- A message that cannot be written to the bucket is not acknowledged. Configure a dead-letter topic on the subscription to forward it.
- Pub/Sub backs off delivery in a way similar to push backoff behavior.

## Notes

- Quotas: Cloud Storage subscriber throughput is limited per region; see the export subscriber quota limits in Pub/Sub quotas and limits.
- Pricing is not copied; see https://cloud.google.com/pubsub/pricing#cloudstorage.
- Properties (filename format, batching limits, file format, roles) are on the create page; see the related page.
- Snippet taken from https://docs.cloud.google.com/pubsub/docs/create-cloudstorage-subscription (the source page of this overview has no code).
- Corrected from the official docs: in that snippet `--cloud-storage-write-metadata` and `--cloud-storage-use-topic-schema` had no trailing `\`, so the shell would have run them as separate commands.
- Cloud Storage buckets themselves belong to `gcp-storage`.
- Source: https://docs.cloud.google.com/pubsub/docs/cloudstorage (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-cloudstorage-subscription.md](./create-cloudstorage-subscription.md)
- [bigquery.md](./bigquery.md)
- [bigtable-subscriptions.md](./bigtable-subscriptions.md)
