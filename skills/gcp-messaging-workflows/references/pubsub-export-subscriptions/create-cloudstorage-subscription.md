---
source: https://docs.cloud.google.com/pubsub/docs/create-cloudstorage-subscription
---

# Create a Cloud Storage Subscription

How to create a Pub/Sub subscription that writes to a Cloud Storage bucket: required roles, the bucket and filename properties, file batching limits (max duration, max bytes, max messages), the Text and Avro output formats, and creation with gcloud and the client libraries.

## Signature / Usage

### Create with gcloud

Adapted (not in the official docs): the source command is missing the `\` line continuation after `--cloud-storage-write-metadata` and `--cloud-storage-use-topic-schema` (so the shell would run them as separate commands), the stray trailing blank line is removed, and the placeholder `SERVICE_ACCOUNT_NAME` is renamed `SERVICE_ACCOUNT_EMAIL` because `--cloud-storage-service-account-email` takes an email address.

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
    --cloud-storage-use-topic-schema \
    --cloud-storage-service-account-email=SERVICE_ACCOUNT_EMAIL
```

Only `SUBSCRIPTION_ID`, `--topic` and `--cloud-storage-bucket` are required; the remaining flags are optional.

- `BUCKET_NAME`: an existing bucket, for example `prod_bucket`; must not include the project ID.
- `CLOUD_STORAGE_FILE_PREFIX`: for example `log_events_`.
- `CLOUD_STORAGE_FILE_SUFFIX`: for example `.txt`.
- `CLOUD_STORAGE_FILE_DATETIME_FORMAT`: for example `YYYY-MM-DD/hh_mm_ssZ`.
- `CLOUD_STORAGE_MAX_DURATION`: between 1m and 10m, for example `5m`.
- `CLOUD_STORAGE_MAX_BYTES`: between 1KB and 10GB, for example `20MB`.
- `CLOUD_STORAGE_MAX_MESSAGES`: greater than or equal to 1000, for example `100000`.
- `CLOUD_STORAGE_OUTPUT_FORMAT`: `text` (raw text, newline separated) or `avro` (Avro binary). `--cloud-storage-write-metadata` and `--cloud-storage-use-topic-schema` only affect output format `avro`.

### Output Avro schema, write metadata enabled

```json
{
  "type": "record",
  "namespace": "com.google.pubsub",
  "name": "PubsubMessageWithMetadata",
  "fields": [
    { "name": "subscription_name", "type": "string" },
    { "name": "message_id", "type": "string"  },
    { "name": "publish_time", "type": {
        "type": "long",
        "logicalType": "timestamp-micros"
      }
    },
    { "name": "attributes", "type": { "type": "map", "values": "string" } },
    { "name": "data", "type": "bytes" }
  ]
}
```

### Create with Node.js (TypeScript)

```typescript
/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
// const topicName = 'YOUR_TOPIC_NAME';
// const subscriptionName = 'YOUR_SUBSCRIPTION_NAME';
// const bucket = 'YOUR_BUCKET_ID';
// const filenamePrefix = 'YOUR_FILENAME_PREFIX';
// const filenameSuffix = 'YOUR_FILENAME_SUFFIX';
// const maxDuration = 60;

// Imports the Google Cloud client library
import {CreateSubscriptionOptions, PubSub} from '@google-cloud/pubsub';

// Creates a client; cache this for further use
const pubSubClient = new PubSub();

async function createCloudStorageSubscription(
  topicName: string,
  subscriptionName: string,
  bucket: string,
  filenamePrefix: string,
  filenameSuffix: string,
  maxDuration: number,
) {
  const options: CreateSubscriptionOptions = {
    cloudStorageConfig: {
      bucket,
      filenamePrefix,
      filenameSuffix,
      maxDuration: {
        seconds: maxDuration,
      },
    },
  };

  await pubSubClient
    .topic(topicName)
    .createSubscription(subscriptionName, options);

  console.log(
    `Created subscription ${subscriptionName} with a cloud storage configuration.`,
  );
}
```

### Create with Python

```python
from google.cloud import pubsub_v1
from google.protobuf import duration_pb2

# TODO(developer)
# project_id = "your-project-id"
# topic_id = "your-topic-id"
# subscription_id = "your-subscription-id"
# bucket = "my-bucket"

filename_prefix = "log_events_"
filename_suffix = ".avro"
# Either CloudStorageConfig.AvroConfig or CloudStorageConfig.TextConfig
# defaults to TextConfig
avro_config = pubsub_v1.types.CloudStorageConfig.AvroConfig(write_metadata=True)

publisher = pubsub_v1.PublisherClient()
subscriber = pubsub_v1.SubscriberClient()
topic_path = publisher.topic_path(project_id, topic_id)
subscription_path = subscriber.subscription_path(project_id, subscription_id)
max_duration = duration_pb2.Duration()
max_duration.FromSeconds(300)

cloudstorage_config = pubsub_v1.types.CloudStorageConfig(
    bucket=bucket,
    filename_prefix=filename_prefix,
    filename_suffix=filename_suffix,
    avro_config=avro_config,
    # Min 1 minutes, max 10 minutes
    max_duration=max_duration,
    # Min 1 KB, max 10 GiB
    max_bytes=10000000,
)

# Wrap the subscriber in a 'with' block to automatically call close() to
# close the underlying gRPC channel when done.
with subscriber:
    subscription = subscriber.create_subscription(
        request={
            "name": subscription_path,
            "topic": topic_path,
            "cloud_storage_config": cloudstorage_config,
        }
    )

print(f"CloudStorage subscription created: {subscription}.")
print(f"Bucket for subscription is: {bucket}")
print(f"Prefix is: {filename_prefix}")
print(f"Suffix is: {filename_suffix}")
```

## Options / Props

### Required roles and permissions (to create the subscription)

| Item | Value |
|------|-------|
| Role | Pub/Sub Editor (`roles/pubsub.editor`) on the project |
| Permission | `pubsub.subscriptions.create` on the project |
| Permission | `pubsub.topics.attachSubscription` on the topic |
| Cross-project | `pubsub.subscriptions.create` on the project where the subscription is created, `pubsub.topics.attachSubscription` on the topic |

### Roles for the Pub/Sub service account

| Principal | Roles | Where to grant |
|-----------|-------|----------------|
| Pub/Sub service agent `service-PROJECT_NUMBER@gcp-sa-pubsub.iam.gserviceaccount.com` (default) | Storage Object Creator (`roles/storage.objectCreator`) and Storage Legacy Bucket Reader (`roles/storage.legacyBucketReader`) | On the project or on the bucket |
| User-managed service account (custom) | Storage Object Creator and Storage Legacy Bucket Reader | Granted to that service account |
| Pub/Sub service agent (when a custom account is used) | `iam.serviceAccounts.getAccessToken` | On the user-managed service account |
| User creating the subscription (when a custom account is used) | `iam.serviceAccounts.actAs` (for example Service Account User, `roles/iam.serviceAccountUser`) | On the user-managed service account |

### Filename format

| Part | Description |
|------|-------------|
| `<file-prefix>` | Optional custom prefix. |
| `<UTC-date-time>` | Customizable auto-generated string based on the object creation time. |
| `<uuid>` | Auto-generated random string. |
| `<file-suffix>` | Optional custom suffix; cannot end in "/". |

### Datetime format matchers

| Kind | Matchers | Rule |
|------|----------|------|
| Required, each only once | `YYYY` or `YY`, `MM`, `DD`, `hh`, `mm`, `ss` | For example `YY-YYYY` or `MMM` is invalid. |
| Optional, each only once | datetime separator `T`; timezone offset `Z` or `+00:00` | |
| Optional, any number of times | hyphen `-`, underscore `_`, colon `:`, forward slash `/` | |

| Datetime format | Sample object name (prefix `prod_`, suffix `_archive`) |
|-----------------|--------------------------------------------------------|
| `YYYY-MM-DD/hh_mm_ssZ` | `prod_2023-09-25/04_10_00Z_uNiQuE_archive` |
| `YYYY-MM-DDThh_mm_ss-` | `prod_2023-09-25T04_10_00-uNiQuE_archive` |

### File batching

| Condition | Required | Minimum | Default | Maximum |
|-----------|----------|---------|---------|---------|
| Storage batch max duration | Yes | 1 minute | 5 minutes | 10 minutes |
| Storage batch max bytes | No | 1 KB | none | 10 GiB |
| Storage batch max messages | No | 1000 | none | none stated |

### File format

| Format | Description |
|--------|-------------|
| Text | Plain text; a newline separates messages. Only message payloads are stored, not attributes or other metadata. |
| Avro | Apache Avro binary format. Optional: Write metadata, Use topic schema. |

| Avro option | Behavior |
|-------------|----------|
| Write metadata | `subscription_name`, `message_id`, `publish_time`, `attributes` are written to top-level fields; all other message properties except data (for example an ordering key) are added as entries in the `attributes` map. When disabled, only the payload is written. |
| Use topic schema | Use the topic schema when writing Avro files. The topic schema must be in Apache Avro format. If Write metadata is also on, the topic schema must have a Record at its root, and the Record cannot contain fields named `subscription_name`, `message_id`, `publish_time` or `attributes`. |

## Notes

- Filename format: Object name: `<file-prefix><UTC-date-time>_<uuid><file-suffix>`.
- Filename format: Without prefix and suffix the object name is `<UTC-date-time>_<uuid>`. Cloud Storage object naming requirements also apply to the prefix and suffix. Example: prefix `prod_` and suffix `_archive` give `prod_2023-09-25T04:10:00+00:00_uN1QuE_archive`.
- Datetime format matchers: If the format ends in a character that is not a matcher, that character replaces the separator between `<UTC-date-time>` and `<uuid>`.
- File batching: Pub/Sub writes a new output file when one of the conditions is met. Max duration is measured from when Pub/Sub begins writing to a new file until the file is finalized.
- The bucket must already exist, be given without the project ID or a `gs://` prefix, and must have Requester Pays disabled.
- A subscription may write to multiple files at the same time. Pub/Sub may start a new file earlier than the batching conditions, and a file may exceed Max bytes when a single message is larger than Max bytes. Example: max duration 6 minutes and max bytes 2 GB; if the file reaches 2 GB at minute 4, Pub/Sub finalizes it and starts a new one.
- gcloud 593.0.0 help gives the `--cloud-storage-max-bytes` range as 1000B to 10GB (KB is assumed when the unit is omitted); the source states 1 KB to 10 GiB.
- Granting the two roles to the Pub/Sub service agent lets any user who can create subscriptions in the project write to the bucket. The source offers a project-level or bucket-level grant; prefer the bucket-level grant, or use a custom service account so only holders of `iam.serviceAccounts.actAs` can create the subscription.
- When you pick a bucket in the console, Pub/Sub checks the service agent's permissions on the bucket and offers a Set Permission action.
- The source strongly recommends enabling dead lettering to handle message failures.
- For Parquet output the source recommends a BigQuery subscription with BigQuery tables for Apache Iceberg (see the BigQuery overview page).
- Omitted to keep the page short: the basic gcloud create command without the service-account flag (the command above is the same with one extra flag) and the Avro output schema with write metadata disabled (a record `com.google.pubsub.PubsubMessage` with the single field `data` of type `bytes`).
- The source also shows Console, C++, C#, Go, Java, Node.js (JavaScript), PHP and Ruby forms. Monitoring uses Cloud Monitoring subscription metrics (see `gcp-observability`).
- Corrected from the official docs: the gcloud examples ended `--cloud-storage-write-metadata` and `--cloud-storage-use-topic-schema` without a trailing `\`, and used `SERVICE_ACCOUNT_NAME` for `--cloud-storage-service-account-email`.
- Source: https://docs.cloud.google.com/pubsub/docs/create-cloudstorage-subscription (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [cloudstorage.md](./cloudstorage.md)
- [create-bigquery-subscription.md](./create-bigquery-subscription.md)
