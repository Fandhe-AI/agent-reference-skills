---
source: https://docs.cloud.google.com/pubsub/docs/create-subscription
---

# Create a Pull Subscription

How to create a Pub/Sub pull subscription with the Google Cloud console, the gcloud CLI, the REST API or a client library. A subscription created without a push configuration uses pull delivery.

## Signature / Usage

### gcloud

```bash
gcloud pubsub subscriptions create SUBSCRIPTION_ID --topic=TOPIC_ID
```

`SUBSCRIPTION_ID` is the name or ID of the new pull subscription and `TOPIC_ID` is the name or ID of the topic.

### REST

Call `projects.subscriptions.create`. The request must be authenticated with an access token in the `Authorization` header (`gcloud auth application-default print-access-token` returns one for the current Application Default Credentials).

```text
PUT https://pubsub.googleapis.com/v1/projects/PROJECT_ID/subscriptions/SUBSCRIPTION_ID
Authorization: Bearer ACCESS_TOKEN
```

Request body:

```json
{
"topic": "projects/PROJECT_ID/topics/TOPIC_ID"
}
```

Response:

```json
{
"name": "projects/PROJECT_ID/subscriptions/SUBSCRIPTION_ID",
"topic": "projects/PROJECT_ID/topics/TOPIC_ID",
"pushConfig": {},
"ackDeadlineSeconds": 10,
"messageRetentionDuration": "604800s",
"expirationPolicy": {
"ttl": "2678400s"
}
}
```

### Node.js

```javascript
/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
// const topicNameOrId = 'YOUR_TOPIC_NAME_OR_ID';
// const subscriptionNameOrId = 'YOUR_SUBSCRIPTION_NAME_OR_ID';

// Imports the Google Cloud client library
const {PubSub} = require('@google-cloud/pubsub');

// Creates a client; cache this for further use
const pubSubClient = new PubSub();

async function createSubscription(topicNameOrId, subscriptionNameOrId) {
  // Creates a new subscription
  await pubSubClient
    .topic(topicNameOrId)
    .createSubscription(subscriptionNameOrId);
  console.log(`Subscription ${subscriptionNameOrId} created.`);
}
```

### TypeScript

```typescript
/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
// const topicNameOrId = 'YOUR_TOPIC_NAME_OR_ID';
// const subscriptionNameOrId = 'YOUR_SUBSCRIPTION_NAME_OR_ID';

// Imports the Google Cloud client library
import {PubSub} from '@google-cloud/pubsub';

// Creates a client; cache this for further use
const pubSubClient = new PubSub();

async function createSubscription(
  topicNameOrId: string,
  subscriptionNameOrId: string,
) {
  // Creates a new subscription
  await pubSubClient
    .topic(topicNameOrId)
    .createSubscription(subscriptionNameOrId);
  console.log(`Subscription ${subscriptionNameOrId} created.`);
}
```

### Python

```python
from google.cloud import pubsub_v1

# TODO(developer)
# project_id = "your-project-id"
# topic_id = "your-topic-id"
# subscription_id = "your-subscription-id"

publisher = pubsub_v1.PublisherClient()
subscriber = pubsub_v1.SubscriberClient()
topic_path = publisher.topic_path(project_id, topic_id)
subscription_path = subscriber.subscription_path(project_id, subscription_id)

# Wrap the subscriber in a 'with' block to automatically call close() to
# close the underlying gRPC channel when done.
with subscriber:
    subscription = subscriber.create_subscription(
        request={"name": subscription_path, "topic": topic_path}
    )

print(f"Subscription created: {subscription}")
```

### Rust

```rust
use google_cloud_pubsub::client::SubscriptionAdmin;

pub async fn sample(
    client: &SubscriptionAdmin,
    project_id: &str,
    topic_id: &str,
    subscription_id: &str,
) -> anyhow::Result<()> {
    let subscription_name = format!("projects/{project_id}/subscriptions/{subscription_id}");
    let topic_name = format!("projects/{project_id}/topics/{topic_id}");

    let subscription = client
        .create_subscription()
        .set_name(subscription_name)
        .set_topic(topic_name)
        .send()
        .await?;

    println!("successfully created subscription {subscription:?}");
    Ok(())
}
```

## Options / Props

### Required roles and permissions

| Item | Value |
|------|-------|
| Predefined role | Pub/Sub Editor (`roles/pubsub.editor`), granted on the project |
| Permission 1 | `pubsub.subscriptions.create` on the project |
| Permission 2 | `pubsub.topics.attachSubscription` on the topic |
| Cross-project subscription | Subscription in one project, topic in another: `pubsub.subscriptions.create` on the project where the subscription is created and `pubsub.topics.attachSubscription` on the topic |

### Console options (all optional except topic and delivery type)

| Option | Description |
|--------|-------------|
| Subscription ID | Name of the subscription (see "Guidelines to name a topic or a subscription") |
| Delivery type | Select **Pull** |
| Transforms | One or more Single Message Transforms (SMTs) |
| Filter | Filter expression applied to messages of the subscription |
| Retry policy | Subscription retry policy (an option must be selected) |
| Dead lettering | Dead-letter topic plus **Maximum delivery attempts** |
| Delivery properties | Exactly-once delivery; message ordering |
| Acknowledgement deadline | Time for the subscriber to process and acknowledge messages (see lease management) |
| Message retention duration | How long unacknowledged messages are retained |
| Retain acknowledged messages | Also retain acknowledged messages |
| Expiration period | **Expire after this many days of inactivity**, or **Never expire** |

### Defaults shown in the REST response

| Field | Value in the source's example response |
|-------|----------------------------------------|
| `ackDeadlineSeconds` | `10` |
| `messageRetentionDuration` | `"604800s"` |
| `expirationPolicy.ttl` | `"2678400s"` |

## Notes

- Cross-project: the topic may live in another project; the caller needs the two permissions above on the respective resources.
- The Console also offers **Create subscription** from the **Topics** page, which pre-fills the topic ID.
- The Java sample comment states a default acknowledgement deadline of 10 seconds: messages not acknowledged within 10 seconds are resent. The source page gives no allowed range for the acknowledgement deadline.
- A subscription expires after the configured period of inactivity (see "Subscription expiry" in the subscription overview); choose **Never expire** to disable expiry.
- Monitoring: Cloud Monitoring provides metrics for subscriptions (see "Monitor subscriptions"); subscriptions can also be monitored from within Pub/Sub.
- The source also shows Console, C++, C#, Go, Java, PHP and Ruby.
- Source: https://docs.cloud.google.com/pubsub/docs/create-subscription (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [pull.md](./pull.md)
- [create-push-subscription.md](./create-push-subscription.md)
- [flow-control.md](./flow-control.md)
- [subscribe-best-practices.md](./subscribe-best-practices.md)
