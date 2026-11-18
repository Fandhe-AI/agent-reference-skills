---
source: https://docs.cloud.google.com/pubsub/docs/ordering
---

# Message ordering

Message ordering delivers messages to subscribers in the order publishers published them, per ordering key. Publishers must publish keyed messages in the same region, and the subscription must have message ordering enabled at creation.

## Signature / Usage

### Enable message ordering (gcloud)

Adapted (not in the official docs): added the required `--topic` flag, which the source command omits (gcloud 593.0.0 lists `--topic` as required for `subscriptions create`).

```bash
gcloud pubsub subscriptions create SUBSCRIPTION_ID \
  --topic=TOPIC_ID \
  --enable-message-ordering
```

```text
Created subscription [SUBSCRIPTION_ID].
```

### Enable message ordering (REST)

```text
PUT https://pubsub.googleapis.com/v1/projects/PROJECT_ID/subscriptions/SUBSCRIPTION_ID
Authorization: Bearer $(gcloud auth application-default print-access-token)
```

Adapted (not in the official docs): the source body has unquoted values and trailing commas (invalid JSON) and a bare `TOPIC_ID`; the `topic` field is the full topic resource name.

```json
{
  "topic": "projects/PROJECT_ID/topics/TOPIC_ID",
  "enableMessageOrdering": true
}
```

Adapted (not in the official docs): response with valid JSON quoting.

```json
{
  "name": "projects/PROJECT_ID/subscriptions/SUBSCRIPTION_ID",
  "topic": "projects/PROJECT_ID/topics/TOPIC_ID",
  "enableMessageOrdering": true
}
```

### Enable message ordering (client libraries)

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

async function createSubscriptionWithOrdering(
  topicNameOrId,
  subscriptionNameOrId,
) {
  // Creates a new subscription
  await pubSubClient
    .topic(topicNameOrId)
    .createSubscription(subscriptionNameOrId, {
      enableMessageOrdering: true,
    });
  console.log(
    `Created subscription ${subscriptionNameOrId} with ordering enabled.`,
  );
  console.log(
    'To process messages in order, remember to add an ordering key to your messages.',
  );
}
```

```python
from google.cloud import pubsub_v1

# TODO(developer): Choose an existing topic.
# project_id = "your-project-id"
# topic_id = "your-topic-id"
# subscription_id = "your-subscription-id"

publisher = pubsub_v1.PublisherClient()
subscriber = pubsub_v1.SubscriberClient()
topic_path = publisher.topic_path(project_id, topic_id)
subscription_path = subscriber.subscription_path(project_id, subscription_id)

with subscriber:
    subscription = subscriber.create_subscription(
        request={
            "name": subscription_path,
            "topic": topic_path,
            "enable_message_ordering": True,
        }
    )
    print(f"Created subscription with ordering: {subscription}")
```

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
        .set_enable_message_ordering(true)
        .send()
        .await?;

    println!("successfully created subscription {subscription:?}");
    Ok(())
}
```

## Options / Props

### Ordering rules and limits

| Item | Value |
|---|---|
| Ordering key | string, up to 1 KB; empty key = not ordered |
| Publish throughput per ordering key | 1 MBps |
| Throughput across all keys on a topic | limited by the quota available in a publish region; can be increased to multiple GBps |
| Publisher region | all messages with the same key must be published in the same region (use a locational endpoint) |
| Subscriber region | subscribers can connect to any region; ordering is still maintained |
| Message ordering property | set only when creating the subscription; cannot be changed afterwards; may increase latency |
| Scale | ordered delivery scales to billions of ordering keys |

### Behavior by subscriber type

| Subscriber | Behavior |
|---|---|
| StreamingPull (client libraries; PHP excepted) | for a given key the callback runs to completion in order; async work scheduled inside the callback must be kept ordered by the client (for example a local work queue) |
| Pull | all messages for a key in a `PullResponse` are in order; only one batch of messages can be outstanding per ordering key at a time |
| Push | only one outstanding message per ordering key at a time (each message is a separate request); a poor choice where the same key is published frequently or latency is critical |
| BigQuery subscription | messages with the same key are written to the table in order |
| Cloud Storage subscription | messages with the same key might be spread across files; within a file they are ordered; later messages can appear in a file whose name has an earlier timestamp |

## Notes

- Messages 1, 2, 3 published in order in one region are received in that order only on subscriptions with ordering enabled. If subscription A has ordering enabled and B does not, only A preserves order, though both receive the same messages.
- Within-key ordering is expected; across-key ordering is not (message 1 on key A can arrive before or after message 4 on key B). An ordering key is not equivalent to a partition (much higher cardinality expected).
- Redelivery: delivery is at least once. Redelivery of a message triggers redelivery of all subsequent messages for that key, even acknowledged ones (for example when the ack deadline expired or a best-effort ack did not persist). With ordering plus a dead-letter topic this might not hold, because dead-letter forwarding is best effort; order might not be preserved when messages are written to a dead-letter topic.
- Unacknowledged messages for one key can delay other keys, especially during server restarts or traffic changes. Acknowledge promptly, or use a dead-letter topic to avoid indefinite holding.
- StreamingPull affinity: messages for a key usually go to the same subscriber client while messages are outstanding; affinity can shift for load balancing or disconnects, so any client must be able to handle any message of a key.
- Do not enable message ordering on subscriptions used with Dataflow; Dataflow has its own ordering and ordering keys can reduce pipeline performance.
- Ordered delivery decreases publish availability and increases end-to-end latency compared with unordered delivery. If a solution needs both ordered and unordered messages, use separate topics.
- Hot key: delivery throughput per key is limited by the subscriber's processing speed (the callback does not start until the previous message's callback completes), not by Pub/Sub. Use the most granular keys, minimize per-message processing time, and watch for a rising `subscription/oldest_unacked_message_age`.
- After a non-retryable publish error, publishing on that ordering key stops until you resume it; see publish-best-practices.md and the retry requests page.
- The source also shows Console, C++, C#, Go, Java, Ruby and a TypeScript variant of the Node.js sample.
- Corrected from the official docs: the REST body `{"topic": TOPIC_ID, "enableMessageOrdering": true,}` and response `"name": projects/PROJECT_ID/subscriptions/SUBSCRIPTION_ID,` were not valid JSON; the gcloud command `gcloud pubsub subscriptions create SUBSCRIPTION_ID --enable-message-ordering` lacked the required `--topic` flag (gcloud 593.0.0 help).
- Source: https://docs.cloud.google.com/pubsub/docs/ordering (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [publish-best-practices.md](./publish-best-practices.md)
- [batch-messaging.md](./batch-messaging.md)
