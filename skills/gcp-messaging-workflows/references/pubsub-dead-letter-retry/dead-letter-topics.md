---
source: https://docs.cloud.google.com/pubsub/docs/dead-letter-topics
---

# Dead-letter topics

Pub/Sub can forward messages that a subscriber can't acknowledge to a dead-letter topic (dead-letter queue). The dead-letter topic is a property of the subscription, not of the topic it pulls from. After the configured number of delivery attempts, Pub/Sub wraps the original message in a new one, adds attributes that identify the source subscription, and publishes it to the dead-letter topic, where a separate subscription can receive it for analysis and offline debugging.

## Signature / Usage

Workflow: create a topic to use as the dead-letter topic, create a subscription on it, enable dead lettering on the source subscription and attach the topic, then grant the Pub/Sub service agent its roles (the grant must happen after the dead-letter topic exists).

### Create a subscription with a dead-letter topic

Adapted (not in the official docs): the source shows lower-case placeholders and `[...]` optional markers, which a shell would treat as literal text or glob patterns; the optional flags are written with upper-case placeholders and no brackets.

```bash
gcloud pubsub subscriptions create SUBSCRIPTION_ID \
  --topic=TOPIC_ID \
  --dead-letter-topic=DEAD_LETTER_TOPIC_NAME \
  --max-delivery-attempts=MAX_DELIVERY_ATTEMPTS \
  --dead-letter-topic-project=DEAD_LETTER_TOPIC_PROJECT
```

Node.js:

```javascript
/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
// const topicNameOrId = 'YOUR_TOPIC_NAME_OR_ID';
// const subscriptionNameOrId = 'YOUR_SUBSCRIPTION_NAME_OR_ID';
// const deadLetterTopicNameOrId = 'YOUR_DEAD_LETTER_TOPIC_NAME_OR_ID';

// Imports the Google Cloud client library
const {PubSub} = require('@google-cloud/pubsub');

// Creates a client; cache this for further use
const pubSubClient = new PubSub();

async function createSubscriptionWithDeadLetterPolicy(
  topicNameOrId,
  subscriptionNameOrId,
  deadLetterTopicNameOrId,
) {
  // Creates a new subscription
  const options = {
    deadLetterPolicy: {
      deadLetterTopic: pubSubClient.topic(deadLetterTopicNameOrId).name,
      maxDeliveryAttempts: 10,
    },
  };
  await pubSubClient
    .topic(topicNameOrId)
    .createSubscription(subscriptionNameOrId, options);
  console.log(
    `Created subscription ${subscriptionNameOrId} with dead letter topic ${deadLetterTopicNameOrId}.`,
  );
  console.log(
    'To process dead letter messages, remember to add a subscription to your dead letter topic.',
  );
}
```

Rust:

```rust
use google_cloud_pubsub::client::SubscriptionAdmin;
use google_cloud_pubsub::model::DeadLetterPolicy;

pub async fn sample(
    client: &SubscriptionAdmin,
    project_id: &str,
    topic_id: &str,
    subscription_id: &str,
    dead_letter_topic_id: &str,
) -> anyhow::Result<()> {
    let subscription_name = format!("projects/{project_id}/subscriptions/{subscription_id}");
    let topic_name = format!("projects/{project_id}/topics/{topic_id}");
    let dead_letter_topic_name = format!("projects/{project_id}/topics/{dead_letter_topic_id}");

    let subscription = client
        .create_subscription()
        .set_name(subscription_name)
        .set_topic(topic_name)
        .set_dead_letter_policy(
            DeadLetterPolicy::new()
                .set_dead_letter_topic(dead_letter_topic_name)
                .set_max_delivery_attempts(10),
        )
        .send()
        .await?;

    println!("successfully created subscription {subscription:?}");
    Ok(())
}
```

### Set a dead-letter topic on an existing subscription

Adapted (not in the official docs): upper-case placeholders and no `[...]` optional markers, as in the create command.

```bash
gcloud pubsub subscriptions update SUBSCRIPTION_ID \
  --dead-letter-topic=DEAD_LETTER_TOPIC_NAME \
  --max-delivery-attempts=MAX_DELIVERY_ATTEMPTS \
  --dead-letter-topic-project=DEAD_LETTER_TOPIC_PROJECT
```

### Grant the roles to the Pub/Sub service agent

Pub/Sub must be able to publish to the dead-letter topic and to acknowledge the forwarded messages on the source subscription. Both grants are at resource level, on the Pub/Sub service agent `service-PROJECT_NUMBER@gcp-sa-pubsub.iam.gserviceaccount.com` of the subscription's project. The dead-letter topic grant runs in the dead-letter topic's project.

Adapted (not in the official docs): the source writes `service-project-number@...` and unquoted `$PUBSUB_SERVICE_ACCOUNT`; `PROJECT_NUMBER` and the other names are upper-case placeholders, the variable is quoted, and `--project=DEAD_LETTER_TOPIC_PROJECT` names the dead-letter topic's project as the create and update commands do.

```bash
PUBSUB_SERVICE_ACCOUNT="service-PROJECT_NUMBER@gcp-sa-pubsub.iam.gserviceaccount.com"

gcloud pubsub topics add-iam-policy-binding DEAD_LETTER_TOPIC_NAME \
  --project=DEAD_LETTER_TOPIC_PROJECT \
  --member="serviceAccount:${PUBSUB_SERVICE_ACCOUNT}" \
  --role="roles/pubsub.publisher"
```

Adapted (not in the official docs): same placeholder and quoting fixes as the publisher grant.

```bash
PUBSUB_SERVICE_ACCOUNT="service-PROJECT_NUMBER@gcp-sa-pubsub.iam.gserviceaccount.com"

gcloud pubsub subscriptions add-iam-policy-binding SUBSCRIPTION_ID \
  --member="serviceAccount:${PUBSUB_SERVICE_ACCOUNT}" \
  --role="roles/pubsub.subscriber"
```

### Track delivery attempts

Adapted (not in the official docs): the source sample uses `timeout` without defining it; `timeout = 5.0` is added to the TODO variables.

```python
from concurrent.futures import TimeoutError
from google.cloud import pubsub_v1

# TODO(developer)
# project_id = "your-project-id"
# subscription_id = "your-subscription-id"
timeout = 5.0

subscriber = pubsub_v1.SubscriberClient()
subscription_path = subscriber.subscription_path(project_id, subscription_id)

def callback(message: pubsub_v1.subscriber.message.Message) -> None:
    print(f"Received {message}.")
    print(f"With delivery attempts: {message.delivery_attempt}.")
    message.ack()

streaming_pull_future = subscriber.subscribe(subscription_path, callback=callback)
print(f"Listening for messages on {subscription_path}..\n")

# Wrap subscriber in a 'with' block to automatically call close() when done.
with subscriber:
    # When `timeout` is not set, result() will block indefinitely,
    # unless an exception is encountered first.
    try:
        streaming_pull_future.result(timeout=timeout)
    except TimeoutError:
        streaming_pull_future.cancel()  # Trigger the shutdown.
        streaming_pull_future.result()  # Block until the shutdown is complete.
```

### Remove a dead-letter topic

```bash
gcloud pubsub subscriptions update SUBSCRIPTION_ID \
  --clear-dead-letter-policy
```

## Options / Props

### Dead-letter subscription properties

| Property | Value | Description |
|----------|-------|-------------|
| Maximum number of delivery attempts (`--max-delivery-attempts`, `maxDeliveryAttempts`) | Default 5; minimum 5; maximum 100 | Delivery attempts per message before it is forwarded. |
| Dead-letter topic (`--dead-letter-topic`) | Topic ID or fully qualified name | Must differ from the topic the subscription is attached to. |
| Project with the dead-letter topic (`--dead-letter-topic-project`) | Project ID | Specify it when the dead-letter topic is in a different project from the subscription. |
| Remove (`--clear-dead-letter-policy`) | flag | Stops forwarding. |

### Delivery attempt fields

| Subscription type | Where the count appears |
|-------------------|-------------------------|
| Pull | `delivery_attempt` field of `ReceivedMessage` (Java and C# client libraries: the `googclient_deliveryattempt` message attribute) |
| Push | `deliveryAttempt` field |

### Attributes added to forwarded messages

| Attribute | Meaning |
|-----------|---------|
| `CloudPubSubDeadLetterSourceDeliveryCount` | Delivery attempts to the source subscription. |
| `CloudPubSubDeadLetterSourceSubscription` | Name of the source subscription. |
| `CloudPubSubDeadLetterSourceSubscriptionProject` | Project that contains the source subscription. |
| `CloudPubSubDeadLetterSourceTopicPublishTime` | Timestamp when the message was originally published. |
| `CloudPubSubDeadLetterSourceDeliveryErrorMessage` | Why the message couldn't be delivered to the original destination; exists only for export subscriptions. |

### Roles for the Pub/Sub service agent

| Role | Granted on | Purpose |
|------|-----------|---------|
| `roles/pubsub.publisher` | Dead-letter topic | Publish forwarded messages. |
| `roles/pubsub.subscriber` | Source subscription | Acknowledge forwarded messages so they leave the subscription. |

## Notes

- The person configuring needs `roles/pubsub.editor` on the project (or equivalent custom / predefined roles). Access control can be project-level or resource-level; a subscription can be in a different project from its topic, so check permissions in each project.
- Pub/Sub counts delivery attempts only when the dead-letter topic is configured correctly and the service agent has the roles above. The maximum is approximate (best-effort): a message may be forwarded after fewer attempts or after a few more. The tracked count may reset to zero, especially for a pull subscription with inactive subscribers, so a message can be delivered more times than the configured maximum.
- Delivery attempts are available for every message of a subscription once a dead-letter topic is enabled.
- Create a subscription on the dead-letter topic: messages published to a topic with no subscriptions are lost (the source's own sample comment). Messages in an attached subscription use that subscription's expiration policy, not the expiration period of the subscription that has the dead-letter property.
- Forwarded messages are removed from the source subscription; monitor them with the `subscription/dead_letter_message_count` metric, which counts undeliverable messages forwarded from a subscription.
- Removing the dead-letter policy stops forwarding. Try dead-letter changes on a disposable project first.
- Fees: publish fees go to the project of the dead-letter topic, outbound subscription fees to the project of the subscription; if the dead-letter topic's message storage location policy doesn't allow the subscription's region, publish fees for outbound messages also apply. See the Pub/Sub pricing page.
- The samples ack right away to show the attempt count; a message acked before it is processed is lost if processing then fails. At-least-once delivery means subscribers must be idempotent.
- The source also shows Console, C++, C#, Go, Java, PHP, Ruby, a TypeScript sample, and Python / Java / Go forms of create / update / remove; the Node.js update sample is omitted.
- Adapted from the official docs: gcloud placeholders such as `service-project-number@gcp-sa-pubsub.iam.gserviceaccount.com` were rewritten to the exact service agent format with `PROJECT_NUMBER`, and `$PUBSUB_SERVICE_ACCOUNT` is quoted.
- Adapted from the official docs: the source's topic grant `gcloud pubsub topics add-iam-policy-binding dead-letter-topic-name` runs in the default project; `--project=DEAD_LETTER_TOPIC_PROJECT` is added so the grant targets the same topic as `--dead-letter-topic-project` in the create and update commands (when the topic is in the subscription's project, use that project ID).
- The service agent that must publish to the dead-letter topic is the one of the subscription's parent project (`service-{project_number}@gcp-sa-pubsub.iam.gserviceaccount.com`, per the `DeadLetterPolicy.deadLetterTopic` field description in the Pub/Sub v1 Discovery document).
- Adapted from the official docs: the `create` / `update` commands read `subscription-id`, `topic-id` and `[--max-delivery-attempts=max-delivery-attempts] \` with `[...]` optional markers; the brackets are removed so the command is runnable (all three optional flags are shown).
- Corrected from the official docs: the Python delivery-attempt sample uses `timeout` without defining it (its own comment says "When `timeout` is not set, result() will block indefinitely"); `timeout = 5.0` is added to the variables block.
- Source: https://docs.cloud.google.com/pubsub/docs/dead-letter-topics (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [subscription-retry-policy.md](./subscription-retry-policy.md)
- [subscription-message-retention.md](./subscription-message-retention.md)
- [monitor-subscription.md](./monitor-subscription.md)
