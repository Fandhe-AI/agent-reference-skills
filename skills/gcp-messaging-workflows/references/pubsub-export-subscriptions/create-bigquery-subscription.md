---
source: https://docs.cloud.google.com/pubsub/docs/create-bigquery-subscription
---

# Create a BigQuery Subscription

How to create a Pub/Sub subscription that writes to a BigQuery table: prerequisites, the roles Pub/Sub needs on the table, the BigQuery-specific properties (use topic schema, use table schema, drop unknown fields, write metadata, service account) and creation with gcloud and the client libraries.

## Signature / Usage

### Create with gcloud

```bash
gcloud pubsub subscriptions create SUBSCRIPTION_ID \
    --topic=TOPIC_ID \
    --bigquery-table=PROJECT_ID.DATASET_ID.TABLE_ID
```

Adapted (not in the official docs): the placeholder `SERVICE_ACCOUNT_NAME` is renamed `SERVICE_ACCOUNT_EMAIL` because `--bigquery-service-account-email` takes an email address.

```bash
gcloud pubsub subscriptions create SUBSCRIPTION_ID \
    --topic=TOPIC_ID \
    --bigquery-table=PROJECT_ID.DATASET_ID.TABLE_ID \
    --bigquery-service-account-email=SERVICE_ACCOUNT_EMAIL
```

- `TOPIC_ID`: the topic requires a schema when you use topic schema.
- `TABLE_ID`: an existing table; it requires a `data` field if your topic has no schema.
- `DATASET_ID`: an existing dataset.

### Create with Node.js (TypeScript)

```typescript
/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
// const topicNameOrId = 'YOUR_TOPIC_NAME_OR_ID';
// const subscriptionNameOrId = 'YOUR_SUBSCRIPTION_NAME_OR_ID';
// const bigqueryTableId = 'YOUR_TABLE_ID';

// Imports the Google Cloud client library
import {PubSub, CreateSubscriptionOptions} from '@google-cloud/pubsub';

// Creates a client; cache this for further use
const pubSubClient = new PubSub();

async function createBigQuerySubscription(
  topicNameOrId: string,
  subscriptionNameOrId: string,
  bigqueryTableId: string,
) {
  const options: CreateSubscriptionOptions = {
    bigqueryConfig: {
      table: bigqueryTableId,
      writeMetadata: true,
    },
  };

  await pubSubClient
    .topic(topicNameOrId)
    .createSubscription(subscriptionNameOrId, options);

  console.log(`Subscription ${subscriptionNameOrId} created.`);
}
```

### Create with Python

```python
from google.cloud import pubsub_v1

# TODO(developer)
# project_id = "your-project-id"
# topic_id = "your-topic-id"
# subscription_id = "your-subscription-id"
# bigquery_table_id = "your-project.your-dataset.your-table"

publisher = pubsub_v1.PublisherClient()
subscriber = pubsub_v1.SubscriberClient()
topic_path = publisher.topic_path(project_id, topic_id)
subscription_path = subscriber.subscription_path(project_id, subscription_id)

bigquery_config = pubsub_v1.types.BigQueryConfig(
    table=bigquery_table_id, write_metadata=True
)

# Wrap the subscriber in a 'with' block to automatically call close() to
# close the underlying gRPC channel when done.
with subscriber:
    subscription = subscriber.create_subscription(
        request={
            "name": subscription_path,
            "topic": topic_path,
            "bigquery_config": bigquery_config,
        }
    )

print(f"BigQuery subscription created: {subscription}.")
print(f"Table for subscription is: {bigquery_table_id}")
```

## Options / Props

### Required roles and permissions (to create the subscription)

| Item | Value |
|------|-------|
| Role | Pub/Sub Editor (`roles/pubsub.editor`) on the project |
| Permission | `pubsub.subscriptions.create` on the project |
| Permission | `pubsub.topics.attachSubscription` on the topic |
| Cross-project | Subscription in one project, topic in another: `pubsub.subscriptions.create` on the project where the subscription is created and `pubsub.topics.attachSubscription` on the topic |

### Roles for the Pub/Sub service account

| Principal | Required | Where to grant |
|-----------|----------|----------------|
| Pub/Sub service agent `service-PROJECT_NUMBER@gcp-sa-pubsub.iam.gserviceaccount.com` (default) | BigQuery Data Editor (`roles/bigquery.dataEditor`) | On the project or on the table |
| User-managed service account (custom) | BigQuery Data Editor (`roles/bigquery.dataEditor`) | Granted to that service account |
| Pub/Sub service agent (when a custom account is used) | `iam.serviceAccounts.getAccessToken` | On the user-managed service account |
| User creating the subscription (when a custom account is used) | `iam.serviceAccounts.actAs` (for example Service Account User, `roles/iam.serviceAccountUser`) | On the user-managed service account |

### BigQuery-specific properties

| Property | Description |
|----------|-------------|
| Use topic schema (`use_topic_schema`) | Use the schema of the attached topic and write message fields to matching columns. Mutually exclusive with Use table schema. |
| Use table schema (`use_table_schema`) | Use the BigQuery table schema to write the fields of a JSON message to columns. Mutually exclusive with Use topic schema. |
| Drop unknown fields | With either schema option, drop fields present in the topic schema or message but not in the BigQuery schema. |
| Write metadata | Write message metadata to additional table columns; otherwise metadata is not written. |
| Service account | Custom service account, or the default Pub/Sub service agent. |

### Use topic schema requirements

| Requirement |
|-------------|
| Topic schema and BigQuery schema fields must have the same names and compatible types. |
| An optional field in the topic schema must also be optional in the BigQuery schema. |
| Required topic-schema fields need not be required in BigQuery. |
| BigQuery fields absent from the topic schema must be `NULLABLE`. |
| Extra topic-schema fields that can be dropped need **Drop unknown fields**. |

### Use table schema requirements

| Requirement |
|-------------|
| Each BigQuery column name contains only letters (a-z, A-Z), numbers (0-9) or underscores (_). |
| Published messages must be JSON. |
| If the topic has an associated schema, the message encoding must be `JSON`. |
| BigQuery fields absent from the messages must be `NULLABLE`. |
| Extra message fields that can be dropped need **Drop unknown fields**. |

### JSON to BigQuery conversions (use table schema)

| JSON Type | BigQuery Data Type |
|-----------|--------------------|
| `string` | `NUMERIC`, `BIGNUMERIC`, `DATE`, `TIME`, `DATETIME`, or `TIMESTAMP` |
| `number` | `NUMERIC`, `BIGNUMERIC`, `DATE`, `TIME`, `DATETIME`, or `TIMESTAMP` |

### Write metadata columns

| Column | Type and meaning |
|--------|------------------|
| `subscription_name` | STRING. Name of a subscription. |
| `message_id` | STRING. ID of a message. |
| `publish_time` | TIMESTAMP. The time of publishing a message. |
| `data` | BYTES, STRING, or JSON. The message body; required for every destination table that selects neither Use topic schema nor Use table schema. If the type is JSON, the body must be valid JSON. |
| `attributes` | STRING or JSON. A JSON object with all message attributes, plus other message fields such as the ordering key, if present. |

## Notes

- Without Use topic schema or Use table schema, the table must have a column `data` of type `BYTES`, `STRING` or `JSON`; Pub/Sub writes the message there.
- Use table schema: for a `JSON` column named `myData` the message field must be valid JSON in an escaped string, for example `"myData": "{\"key\":\"value\"}"`; BigQuery rejects invalid JSON. For `number` to `NUMERIC` / `BIGNUMERIC` the precision is limited to IEEE 754 floating point (use `string` for high precision); a `string` is read as a human readable number such as `"123.124"`, and if that fails it is treated as bytes encoded with BigDecimalByteStringEncoder. For `number` to date or time types the value must follow the integer representations on the overview page.
- With Write metadata and Use topic schema both on, the topic schema must not contain fields whose names match the metadata names, including camelCase versions.
- Without Drop unknown fields, messages with extra fields are not written and stay in the backlog unless a dead letter topic is configured. Fields defined in neither schema are dropped during the BigQuery write regardless; make sure every field in the message is also in the table schema.
- Schema changes on the topic or table may not take effect immediately; the schemas eventually synchronize.
- Deleting a schema or schema revision is permanent: messages validated against a deleted revision cannot be written with Use topic schema enabled. Consider rolling back a schema instead; try schema changes on a disposable project first.
- Granting BigQuery Data Editor to the Pub/Sub service agent lets any user who can create subscriptions in the project write to the table. The source offers a project-level or table-level grant; prefer the table-level grant, or use a custom service account so only holders of `iam.serviceAccounts.actAs` can create the subscription.
- The source strongly recommends enabling dead lettering to handle message failures.
- Table name: the source and the Pub/Sub REST API use `PROJECT_ID.DATASET_ID.TABLE_ID`; the gcloud 593.0.0 help for `--bigquery-table` describes the form `{project}:{dataset_name}.{table_name}`.
- Corrected from the official docs: the second gcloud example used the placeholder `SERVICE_ACCOUNT_NAME` for `--bigquery-service-account-email`, which takes a service account email.
- The source also shows Console, C++, C#, Go, Java, Node.js (JavaScript), PHP and Ruby forms. Monitoring uses Cloud Monitoring subscription metrics (see `gcp-observability`).
- Source: https://docs.cloud.google.com/pubsub/docs/create-bigquery-subscription (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [bigquery.md](./bigquery.md)
- [cloudstorage.md](./cloudstorage.md)
