---
source: https://docs.cloud.google.com/pubsub/docs/create-cloud-storage-import-topic
---

# Create and Manage Cloud Storage Import Topics

A Cloud Storage import topic continuously ingests objects from a Cloud Storage bucket into Pub/Sub. Pub/Sub automatically detects new objects added to the bucket and ingests them, and you can then stream the data to any destination Pub/Sub supports. The bucket must already exist, and the Pub/Sub service agent needs publish rights on the topic and read rights on the bucket.

## Signature / Usage

### Grant the Pub/Sub service agent publish rights on one import topic

The service agent has the format `service-PROJECT_NUMBER@gcp-sa-pubsub.iam.gserviceaccount.com`. Granting `roles/pubsub.publisher` on a single existing topic (resource level) is shown below. The source also describes granting it for all topics in the project through the IAM page.

```bash
gcloud pubsub topics add-iam-policy-binding TOPIC_ID\
   --member="serviceAccount:service-PROJECT_NUMBER@gcp-sa-pubsub.iam.gserviceaccount.com"\
   --role="roles/pubsub.publisher"
```

### Create a Cloud Storage import topic

Only `TOPIC_ID`, `--cloud-storage-ingestion-bucket` and `--cloud-storage-ingestion-input-format` are required; the other flags are optional.

```bash
gcloud pubsub topics create TOPIC_ID \
    --cloud-storage-ingestion-bucket=BUCKET_NAME \
    --cloud-storage-ingestion-input-format=INPUT_FORMAT \
    --cloud-storage-ingestion-text-delimiter=TEXT_DELIMITER \
    --cloud-storage-ingestion-minimum-object-create-time=MINIMUM_OBJECT_CREATE_TIME \
    --cloud-storage-ingestion-match-glob=MATCH_GLOB
```

Adapted (not in the official docs): `seconds` is rounded down to an integer and `nanos` converts the non-negative millisecond remainder (`minimumDate - seconds * 1000`) to nanoseconds (`* 1000000`); the source computed `minimumDate / 1000` (fractional) and `(minimumDate % 1000) * 1000`. An invalid `inputFormat` now throws instead of only logging and returning.

```javascript
/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
// const topicNameOrId = 'YOUR_TOPIC_NAME_OR_ID';
// const bucket = 'YOUR_BUCKET_NAME';
// const inputFormat = 'text';
// const textDelimiter = '\n';
// const matchGlob = '**.txt';
// const minimumObjectCreateTime = 'YYYY-MM-DDThh:mm:ssZ';

// Imports the Google Cloud client library
const {PubSub} = require('@google-cloud/pubsub');

// Creates a client; cache this for further use
const pubSubClient = new PubSub();

async function createTopicWithCloudStorageIngestion(
  topicNameOrId,
  bucket,
  inputFormat,
  textDelimiter,
  matchGlob,
  minimumObjectCreateTime,
) {
  const minimumDate = Date.parse(minimumObjectCreateTime);
  const topicMetadata = {
    name: topicNameOrId,
    ingestionDataSourceSettings: {
      cloudStorage: {
        bucket,
        minimumObjectCreateTime: {
          seconds: Math.floor(minimumDate / 1000),
          nanos: (minimumDate - Math.floor(minimumDate / 1000) * 1000) * 1000000,
        },
        matchGlob,
      },
    },
  };

  // Make a format appropriately.
  switch (inputFormat) {
    case 'text':
      topicMetadata.ingestionDataSourceSettings.cloudStorage.textFormat = {
        delimiter: textDelimiter,
      };
      break;
    case 'avro':
      topicMetadata.ingestionDataSourceSettings.cloudStorage.avroFormat = {};
      break;
    case 'pubsub_avro':
      topicMetadata.ingestionDataSourceSettings.cloudStorage.pubsubAvroFormat =
        {};
      break;
    default:
      throw new Error('inputFormat must be in ("text", "avro", "pubsub_avro")');
  }

  // Creates a new topic with Cloud Storage ingestion.
  await pubSubClient.createTopic(topicMetadata);
  console.log(`Topic ${topicNameOrId} created with Cloud Storage ingestion.`);
}
```

Adapted (not in the official docs): the source sample is a function body that uses `return` at top level; it is wrapped in a function so the Python is valid, and invalid arguments now raise `ValueError` instead of printing and returning.

```python
from google.cloud import pubsub_v1
from google.protobuf import timestamp_pb2
from google.pubsub_v1.types import Topic
from google.pubsub_v1.types import IngestionDataSourceSettings


def create_topic_with_cloud_storage_ingestion(
    project_id,  # "your-project-id"
    topic_id,  # "your-topic-id"
    bucket,  # "your-bucket"
    input_format,  # can be one of "text", "avro", "pubsub_avro"
    text_delimiter,  # "\n"
    match_glob,  # "**.txt"
    minimum_object_create_time,  # "YYYY-MM-DDThh:mm:ssZ"
):
    publisher = pubsub_v1.PublisherClient()
    topic_path = publisher.topic_path(project_id, topic_id)

    cloud_storage_settings = IngestionDataSourceSettings.CloudStorage(
        bucket=bucket,
    )
    if input_format == "text":
        cloud_storage_settings.text_format = (
            IngestionDataSourceSettings.CloudStorage.TextFormat(
                delimiter=text_delimiter
            )
        )
    elif input_format == "avro":
        cloud_storage_settings.avro_format = (
            IngestionDataSourceSettings.CloudStorage.AvroFormat()
        )
    elif input_format == "pubsub_avro":
        cloud_storage_settings.pubsub_avro_format = (
            IngestionDataSourceSettings.CloudStorage.PubSubAvroFormat()
        )
    else:
        raise ValueError(
            "Invalid input_format: "
            + input_format
            + "; must be in ('text', 'avro', 'pubsub_avro')"
        )

    if match_glob:
        cloud_storage_settings.match_glob = match_glob

    if minimum_object_create_time:
        try:
            minimum_object_create_time_timestamp = timestamp_pb2.Timestamp()
            minimum_object_create_time_timestamp.FromJsonString(
                minimum_object_create_time
            )
            cloud_storage_settings.minimum_object_create_time = (
                minimum_object_create_time_timestamp
            )
        except ValueError:
            raise ValueError(
                "Invalid minimum_object_create_time: " + minimum_object_create_time
            )

    request = Topic(
        name=topic_path,
        ingestion_data_source_settings=IngestionDataSourceSettings(
            cloud_storage=cloud_storage_settings,
        ),
    )

    topic = publisher.create_topic(request=request)

    print(f"Created topic: {topic.name} with Cloud Storage Ingestion Settings")
```

### Edit a Cloud Storage import topic

Include every ingestion flag on each update; any flag left out is reset to its original default. `TOPIC_ID` cannot be updated.

```bash
gcloud pubsub topics update TOPIC_ID \
    --cloud-storage-ingestion-bucket=BUCKET_NAME\
    --cloud-storage-ingestion-input-format=INPUT_FORMAT\
    --cloud-storage-ingestion-text-delimiter=TEXT_DELIMITER\
    --cloud-storage-ingestion-minimum-object-create-time=MINIMUM_OBJECT_CREATE_TIME\
    --cloud-storage-ingestion-match-glob=MATCH_GLOB
```

## Options / Props

### gcloud placeholders

| Name | Description |
|------|-------------|
| `TOPIC_ID` | Name or ID of the topic. |
| `BUCKET_NAME` | Name of an existing bucket, for example `prod_bucket`. Must not include the project ID. |
| `INPUT_FORMAT` | `text`, `avro`, or `pubsub_avro`. |
| `TEXT_DELIMITER` | Single character used to split text objects into messages; set only when `INPUT_FORMAT` is `text`. Default newline (`\n`). Write it as `'\n'`; an unquoted `\n` gives a delimiter of `"n"`. |
| `MINIMUM_OBJECT_CREATE_TIME` | UTC time `YYYY-MM-DDThh:mm:ssZ`, for example `2024-10-14T08:30:30Z`. Any date from `0001-01-01T00:00:00Z` to `9999-12-31T23:59:59Z` inclusive is valid. |
| `MATCH_GLOB` | Glob pattern objects must match. In gcloud, escape `*` as `\*\*.txt` or quote the whole glob (`"**.txt"` or `'**.txt'`). |

### Input formats

| Format | Behavior |
|--------|----------|
| Text | Objects are plain text. Ingests all objects that meet the minimum object creation time and match the glob. Optional single-character delimiter, default `\n`. |
| Avro | Apache Avro binary format; objects not in valid Avro are not ingested. Avro versions 1.1.0 and 1.2.0 are not supported. Maximum Avro block size is 16 MB. |
| Pub/Sub Avro | Avro with the schema of objects written by a Pub/Sub Cloud Storage subscription with the Avro file format. The Avro `data` field populates the message data; `attributes` populate message attributes if `write_metadata` was set on the Cloud Storage subscription; an original ordering key is populated as attribute `original_message_ordering_key`. |

### Permissions the service agent needs

| Where | Role or permission |
|-------|--------------------|
| Import topic | `roles/pubsub.publisher` to the Pub/Sub service agent (granting user needs `roles/pubsub.admin`). |
| Bucket | `storage.objects.list`, `storage.objects.get`, `storage.buckets.get`. |
| Bucket level (preferred) | `roles/storage.legacyObjectReader` and `roles/storage.legacyBucketReader` on the bucket. |
| Project level (if you must) | `roles/storage.admin` on the project containing the bucket (granting user needs `roles/storage.admin`). |
| User managing the topic | `roles/pubsub.editor` on the topic or project. Permissions: `pubsub.topics.create`, `delete`, `get`, `list`, `publish`, `update`. Managing the topic's IAM policy (`pubsub.topics.getIamPolicy`, `setIamPolicy`) needs `roles/pubsub.admin` (see Notes). |

### Message storage policy vs bucket location

| Bucket location type | Policy must include |
|----------------------|---------------------|
| Region | That specific region (for example `us-central1`). |
| Dual-region or multi-region | At least one region within it; include at least two for full redundancy. |

## Notes

- Source inconsistency: the source lists `pubsub.topics.getIamPolicy` and `pubsub.topics.setIamPolicy` among the permissions of the Pub/Sub Editor role (`roles/pubsub.editor`), but the IAM roles reference (`references/iam/pubsub.md`, retrieved 2026-11-14) does not include them in that role; they are in Pub/Sub Admin (`roles/pubsub.admin`). The row lists the Editor permissions without them; grant `roles/pubsub.admin`, or a custom role, to a principal that also manages the topic's IAM policy.
- The message storage policy check applies only if the topic has one. If the policy does not include the bucket's region, topic creation fails.
- If the bucket already holds data, first create a standard topic and its subscriptions without ingestion settings, then convert the topic to an import topic (change topic type). Creating the topic and subscription separately leaves a window where messages sent to the topic are lost.
- Publisher throughput of import topics is bound by the publish quota of the topic (see Pub/Sub quotas and limits).
- The project-level `roles/storage.admin` grant is much broader than the bucket-level reader roles; prefer the bucket-level grant. Granting `roles/pubsub.publisher` at project level (IAM page) covers all topics; the topic-level command above is narrower.
- Editing resets omitted ingestion settings to their defaults, which can restart or change ingestion; try changes on a disposable project first.
- Corrected from the official docs: the Node.js sample's `seconds: minimumDate / 1000` and `nanos: (minimumDate % 1000) * 1000` were replaced with `Math.floor(minimumDate / 1000)` and `(minimumDate - Math.floor(minimumDate / 1000) * 1000) * 1000000` (JavaScript `%` keeps the sign of the dividend, so `minimumDate % 1000` is negative before the Unix epoch and `Timestamp.nanos` must be 0 to 999,999,999), and the comment string `'YYYY-MM-DDThh:mm:ssZ;` was closed. The Python sample's top-level `return` was wrapped in a function. Both samples' `console.error(...)` / `print(...)` followed by `return` on invalid input became `throw new Error(...)` / `raise ValueError(...)`, so a bad argument is not reported as success.
- The source also shows Console, C++, Go, Java and Node.js TypeScript tabs, and a Troubleshooting page.
- Source: https://docs.cloud.google.com/pubsub/docs/create-cloud-storage-import-topic (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-amazon-msk-import-topic.md](./create-amazon-msk-import-topic.md)
- [smts-overview.md](./smts-overview.md)
