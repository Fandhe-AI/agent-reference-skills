---
source: https://docs.cloud.google.com/pubsub/docs/create-topic
---

# Create a Pub/Sub standard topic

A Pub/Sub topic is a named resource that represents a feed of messages; it must exist before you can publish or subscribe to it. Pub/Sub has two kinds of topics, standard and import. This page covers creating a standard topic and the properties you can set on it (default subscription, schema, ingestion, retention, BigQuery / Cloud Storage export, transforms, encryption).

## Signature / Usage

### Create a topic with gcloud

```bash
gcloud pubsub topics create TOPIC_ID
```

### Create a topic with REST

Method: `projects.topics.create`. The request must carry an access token in the `Authorization` header; obtain one for the current Application Default Credentials with `gcloud auth application-default print-access-token`.

```text
PUT https://pubsub.googleapis.com/v1/projects/PROJECT_ID/topics/TOPIC_ID
Authorization: Bearer ACCESS_TOKEN
```

Response:

```json
{
"name": "projects/PROJECT_ID/topics/TOPIC_ID"
}
```

### Create a topic with Node.js (TypeScript)

```typescript
/**
 * TODO(developer): Uncomment this variable before running the sample.
 */
// const topicNameOrId = 'YOUR_TOPIC_NAME_OR_ID';

// Imports the Google Cloud client library
import {PubSub} from '@google-cloud/pubsub';

// Creates a client; cache this for further use
const pubSubClient = new PubSub();

async function createTopic(topicNameOrId: string) {
  // Creates a new topic
  await pubSubClient.createTopic(topicNameOrId);
  console.log(`Topic ${topicNameOrId} created.`);
}
```

### Create a topic with Python

```python
from google.cloud import pubsub_v1

# TODO(developer)
# project_id = "your-project-id"
# topic_id = "your-topic-id"

publisher = pubsub_v1.PublisherClient()
topic_path = publisher.topic_path(project_id, topic_id)

topic = publisher.create_topic(request={"name": topic_path})

print(f"Created topic: {topic.name}")
```

### Create a topic with Rust

```rust
use google_cloud_pubsub::client::TopicAdmin;

pub async fn sample(client: &TopicAdmin, project_id: &str, topic_id: &str) -> anyhow::Result<()> {
    let topic = client
        .create_topic()
        .set_name(format!("projects/{project_id}/topics/{topic_id}"))
        .send()
        .await?;

    println!("successfully created topic {topic:?}");
    Ok(())
}
```

## Options / Props

### Required role and permission

| Item | Value |
|---|---|
| Role | Pub/Sub Editor (`roles/pubsub.editor`) on the project |
| Permission to create a topic | `pubsub.topics.create` (on the project) |

### Topic properties

| Property | Behavior |
|---|---|
| Add a default subscription | Subscription ID of `-sub`; pull delivery; message retention of seven days; expiration after 31 days of inactivity; acknowledgment deadline of 10 seconds; immediate retry policy. Enabled by default in the console. |
| Use a schema | A format the message data field must follow (a contract between publisher and subscriber that Pub/Sub enforces). |
| Enable ingestion | Makes the topic an import topic. Sources: Amazon Kinesis Data Streams, Cloud Storage, Azure Event Hubs, Amazon MSK, Confluent Cloud. Leave unselected for a standard topic. |
| Enable topic message retention | Default: messages are discarded as soon as all attached subscriptions acknowledge them. Optional retention: up to 31 days, minimum 10 minutes. Lets subscriptions replay acknowledged messages or messages published before the subscription was created. Storage costs are billed to the topic's project. After the retention period Pub/Sub might discard the message regardless of acknowledgment state. |
| Export message data to BigQuery | Lets you create a BigQuery subscription that writes messages to an existing BigQuery table; no separate subscriber client needed. |
| Backup message data to Cloud Storage | Lets you create a Cloud Storage subscription that writes messages to an existing Cloud Storage bucket; no separate subscriber client needed. |
| Transforms | Topic single message transforms (SMTs): lightweight modifications to message data and attributes within Pub/Sub (data cleaning, filtering, format conversion) before messages are published to the topic. |
| Google-owned and Google-managed encryption key | Default encryption; no further configuration. |
| Cloud KMS key | Customer-managed encryption key (CMEK) using the envelope encryption pattern: Cloud KMS encrypts the Data Encryption Keys (DEKs) Pub/Sub creates for each topic, not the messages; messages are encrypted with the newest DEK for the topic and decrypted shortly before delivery. |

### Retention metrics (Cloud Monitoring)

| Metric | Description |
|---|---|
| `topic/num_retained_messages` | Number of retained messages |
| `topic/oldest_retained_message_age` | Age of the oldest retained message |
| `topic/retained_bytes` | Total size of the retained messages, in bytes |

## Notes

- Required role and permission: Access control can be set at the project level and at the individual resource level. A subscription can be created in one project and attached to a topic in a different project; you need the required permissions in each project.
- Organization policies can restrict topic creation, for example a policy restricting message storage to a Compute Engine region (message storage policy). Examine and update them before creating a topic. If the project is newly created, wait a few minutes for the organization policy to initialize. Organization Policy constraints are covered by the `gcp-foundation` skill.
- CMEK keys are created in Cloud KMS (`gcp-security` skill); see https://docs.cloud.google.com/pubsub/docs/encryption.
- The source also shows Console, C++, C#, Go, Java, PHP and Ruby. The Node.js tab of the source uses `require`; the TypeScript form above is the source's Node.ts sample.
- The `gcloud pubsub topics create` help for 593.0.0 documents `TOPIC [TOPIC ...]` and `--labels`; the source shows only the single-topic form.
- Deleting a topic does not delete its subscriptions: their backlog stays available to subscribers and their topic name becomes `_deleted-topic_`. Creating a topic with the same name as one just deleted can fail for a brief period. Try deletes and retention changes on a disposable project first.
- Source: https://docs.cloud.google.com/pubsub/docs/create-topic (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/pubsub/docs/delete-topic (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [publish-message-overview.md](./publish-message-overview.md)
- [publisher.md](./publisher.md)
