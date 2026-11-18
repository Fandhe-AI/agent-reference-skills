---
source: https://docs.cloud.google.com/pubsub/docs/exactly-once-delivery
---

# Exactly-once delivery

Pub/Sub exactly-once delivery lets subscribers learn whether an acknowledgment succeeded and prevents redelivery after a successful ack or while a message is outstanding. It applies to pull subscriptions only (including StreamingPull) and only within a single cloud region.

## Signature / Usage

### Create a pull subscription with exactly-once delivery (gcloud)

```bash
gcloud pubsub subscriptions create SUBSCRIPTION_ID \
  --topic=TOPIC_ID \
  --enable-exactly-once-delivery
```

### Create with REST

```text
PUT https://pubsub.googleapis.com/v1/projects/PROJECT_ID/subscriptions/SUBSCRIPTION_ID
Authorization: Bearer $(gcloud auth print-access-token)
```

Adapted (not in the official docs): removed the trailing comma after `true` so the request body is valid JSON.

```json
{
  "topic": "projects/PROJECT_ID/topics/TOPIC_ID",
  "enableExactlyOnceDelivery": true
}
```

### Node.js (TypeScript)

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

async function createSubscriptionWithExactlyOnceDelivery(
  topicNameOrId: string,
  subscriptionNameOrId: string,
) {
  // Creates a new subscription
  await pubSubClient
    .topic(topicNameOrId)
    .createSubscription(subscriptionNameOrId, {
      enableExactlyOnceDelivery: true,
    });
  console.log(
    `Created subscription ${subscriptionNameOrId} with exactly-once delivery.`,
  );
  console.log(
    'To process messages, remember to check the return value of ackWithResponse().',
  );
}
```

### Python

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
            "enable_exactly_once_delivery": True,
        }
    )
    print(
        f"Created subscription with exactly once delivery enabled: {subscription}"
    )
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
        .set_enable_exactly_once_delivery(true)
        .send()
        .await?;

    println!("successfully created subscription {subscription:?}");
    Ok(())
}
```

## Options / Props

### Delivery semantics when enabled

| Guarantee | Detail |
|---|---|
| Ack outcome | Subscribers can determine whether an acknowledgment was successful. |
| After ack | No redelivery occurs after the message is successfully acknowledged. |
| While outstanding | No redelivery while a message is outstanding (until the ack deadline expires or the message is acknowledged). |
| Multiple valid deliveries | Only the latest acknowledgment ID can ack the message; requests with a previous ack ID fail. |

### Scope and limits

| Topic | Value |
|---|---|
| Supported subscription type | Pull only, including StreamingPull. Push and export subscriptions do not support exactly-once delivery. |
| Region | Guarantee applies only when subscribers connect to the service in the same region. Subscribers spread across regions can see duplicates. Publishers can publish to any region. |
| Outside Google Cloud / multi-region | Use a locational endpoint (all locational endpoints point to single regions). |
| Default ack deadline | 60 seconds if the ack deadline is not specified at CreateSubscription time. |
| Ordering | Supported with ordered delivery; acks must be in order or requests fail with temporary errors. Client throughput is limited to an order of thousands of messages per second. |
| Throughput | For high throughput, exactly-once clients must also use StreamingPull. |
| Latency | Significantly higher publish-to-subscribe latency than regular subscriptions. |
| Quotas | Additional quotas per region on messages consumed, and on messages acknowledged or whose deadline is extended, for exactly-once subscriptions (see the Pub/Sub quotas page). |

### Recommended minimum client library versions

| Library | Version |
|---|---|
| Python | v2.13.6 or higher |
| Java | v1.139.0 or higher |
| PHP | v1.39.0 or higher |
| C# | v3.2.0 or higher |
| C++ | v2.1.0 |
| Go | v1.25.1 or higher |
| Node | v3.2.0 or higher |
| Ruby | v2.12.1 or higher |

### Java client variables (names and defaults differ across libraries)

| Variable | Description | Value |
|---|---|---|
| `setEnableExactlyOnceDelivery` | Enables or disables exactly-once delivery. | true or false, Default=false |
| `minDurationPerAckExtension` | Minimum time in seconds for extending the modify acknowledgment deadline. | Range=0 to 600, Default=none |
| `maxDurationPerAckExtension` | Maximum time in seconds for extending the modify acknowledgment deadline. | Range=0 to 600, Default=none |

### Metrics

| Metric | Meaning |
|---|---|
| `subscription/exactly_once_warning_count` | Events that can lead to possible redeliveries (valid or duplicate): failed `ModifyAckDeadline` or `acknowledgment` requests, server- or client-based. Can be noisy. |
| `subscription/expired_ack_deadlines_count` | Number of ack ID expirations. |
| `service.serviceruntime.googleapis.com/api/request_count` | Captures failed `ModifyAckDeadline` / `acknowledgment` requests that reach Google Cloud but not Pub/Sub; does not capture disconnected clients. |

## Notes

- Redelivery (client nack or missed deadline extension) is valid and expected; a duplicate is a re-send after a successful ack or before deadline expiry. A redelivered message keeps the same message ID. Subscriptions with exactly-once delivery enabled do not receive duplicate deliveries.
- Supported client libraries have an acknowledgment-with-response interface; if the ack succeeds, no redelivery is guaranteed; if it fails, expect redelivery. Without that interface, ack failures can cause silent redeliveries.
- Set the minimum lease extension to a high number to avoid network-related ack expirations; the maximum is 600 seconds. Supported client libraries do not use the subscription default ack deadline.
- `acknowledgment` and `ModifyAckDeadline` fail with `INVALID_ARGUMENT` when the ack ID is expired (by design, a newer delivery may be in flight). With exactly-once disabled they return `OK`. Failures from invalid ack IDs cannot be retried; other failures are retried automatically by supported client libraries.
- Subscribers should acknowledge within the deadline, keep processing-progress information until the ack succeeds, and use it to avoid duplicate work when an ack fails.
- Publish-side duplicates can still occur: multiple unique publishes by the client across retries cause redeliveries with different message IDs; multiple unique publishes by the service cause redeliveries with the same message IDs.
- Push does not fit exactly-once: the client cannot know whether Pub/Sub received its success response.
- Java: if you set a custom gRPC channel with `setChannelProvider()`, also set `maxInboundMetadataSize` to at least 1MB (via `InstantiatingGrpcChannelProvider.Builder.setMaxInboundMetadataSize()` or `ManagedChannelBuilder.maxInboundMetadataSize()`).
- Corrected from the official docs: the REST request body in the source ended `"enableExactlyOnceDelivery": true,` with a trailing comma, which is invalid JSON.
- The source also shows Console, C++, C#, Go, Java, Ruby and PHP forms, and a CommonJS Node.js variant; they are omitted.
- Source: https://docs.cloud.google.com/pubsub/docs/exactly-once-delivery (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [lease-management.md](./lease-management.md)
- [replay-overview.md](./replay-overview.md)
- [subscription-message-filter.md](./subscription-message-filter.md)
