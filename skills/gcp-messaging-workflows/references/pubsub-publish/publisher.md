---
source: https://docs.cloud.google.com/pubsub/docs/publisher
---

# Publish messages to a Pub/Sub topic

A publisher application creates messages and sends them to a topic with the console, gcloud, the Pub/Sub API or the client libraries (which can publish asynchronously). This page covers the required role, message content, plain publishing, attributes (with their limits) and ordering keys.

## Signature / Usage

### Publish with gcloud

Syntax (the brackets mark the optional attribute flag):

```text
gcloud pubsub topics publish TOPIC_ID \
  --message=MESSAGE_DATA \
  [--attribute=KEY="VALUE",...]
```

### Publish with REST

Request line and headers:

```text
POST  https://pubsub.googleapis.com/v1/projects/PROJECT_ID/topics/TOPIC_ID:publish
Content-Type: application/json
Authorization: Bearer $(gcloud auth application-default print-access-token)
```

Adapted (not in the official docs): the source request body is tagged `restructuredtext` and is not valid JSON (a `...` elision and trailing commas); both are removed. `MESSAGE_DATA` must be a base64-encoded string. To publish with an ordering key, add `"orderingKey": "ORDERING_KEY"` next to `data` (the `PubsubMessage` JSON field name in the Pub/Sub v1 Discovery document; the source's ordering-key body spells it `ordering_key`).

```json
{
  "messages": [
    {
      "attributes": {
        "KEY": "VALUE"
      },
      "data": "MESSAGE_DATA"
    }
  ]
}
```

A successful response is a JSON object with a `messageIds` array.

### Publish with Node.js (TypeScript)

```typescript
/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
// const topicNameOrId = 'YOUR_TOPIC_NAME_OR_ID';
// const data = JSON.stringify({foo: 'bar'});

// Imports the Google Cloud client library
import {PubSub} from '@google-cloud/pubsub';

// Creates a client; cache this for further use
const pubSubClient = new PubSub();

async function publishMessage(topicNameOrId: string, data: string) {
  // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
  const dataBuffer = Buffer.from(data);

  // Cache topic objects (publishers) and reuse them.
  const topic = pubSubClient.topic(topicNameOrId);

  try {
    const messageId = await topic.publishMessage({data: dataBuffer});
    console.log(`Message ${messageId} published.`);
  } catch (error) {
    console.error(
      `Received error while publishing: ${(error as Error).message}`,
    );
    process.exitCode = 1;
  }
}
```

### Publish with Rust

Adapted (not in the official docs): the source `Err(e) => eprintln!(...)` arm only prints a failed publish and the function still returns `Ok(())`; each failure is now returned as an error so a failed publish is not reported as success.

```rust
use futures::future::join_all;
use google_cloud_pubsub::client::Publisher;
use google_cloud_pubsub::model::Message;

pub async fn sample(project_id: &str, topic_id: &str) -> anyhow::Result<()> {
    let topic_name = format!("projects/{project_id}/topics/{topic_id}");
    let publisher = Publisher::builder(topic_name).build().await?;

    let results = join_all(
        (0..10).map(|i| publisher.publish(Message::new().set_data(format!("message {i}")))),
    )
    .await;

    for (i, result) in results.into_iter().enumerate() {
        let message_id =
            result.map_err(|e| anyhow::anyhow!("failed to publish message {i}: {e}"))?;
        println!("published message {i}; message ID: {message_id}");
    }

    Ok(())
}
```

### Publish with attributes

gcloud:

```bash
gcloud pubsub topics publish my-topic --message="hello" \
  --attribute="origin=gcloud-sample,username=gcp,eventTime='2021-01-01T12:00:00Z'"
```

Python:

```python
from google.cloud import pubsub_v1

# TODO(developer)
# project_id = "your-project-id"
# topic_id = "your-topic-id"

publisher = pubsub_v1.PublisherClient()
topic_path = publisher.topic_path(project_id, topic_id)

for n in range(1, 10):
    data_str = f"Message number {n}"
    # Data must be a bytestring
    data = data_str.encode("utf-8")
    # Add two attributes, origin and username, to the message
    future = publisher.publish(
        topic_path, data, origin="python-sample", username="gcp"
    )
    print(future.result())

print(f"Published messages with custom attributes to {topic_path}.")
```

### Publish with an ordering key

gcloud:

```text
gcloud pubsub topics publish TOPIC_ID \
  --message=MESSAGE_DATA \
  --ordering-key=ORDERING_KEY
```

Node.js (the source has only a JavaScript form of this sample):

```javascript
/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
// const topicNameOrId = 'YOUR_TOPIC_NAME_OR_ID';
// const data = JSON.stringify({foo: 'bar'});
// const orderingKey = 'key1';

// Imports the Google Cloud client library
const {PubSub} = require('@google-cloud/pubsub');

// Creates a client; cache this for further use
const pubSubClient = new PubSub({
  // Sending messages to the same region ensures they are received in order
  // even when multiple publishers are used.
  apiEndpoint: 'us-east1-pubsub.googleapis.com:443',
});

async function publishOrderedMessage(topicNameOrId, data, orderingKey) {
  // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
  const dataBuffer = Buffer.from(data);

  // Be sure to set an ordering key that matches other messages
  // you want to receive in order, relative to each other.
  const message = {
    data: dataBuffer,
    orderingKey: orderingKey,
  };

  // Cache topic objects (publishers) and reuse them.
  //
  // Pub/Sub's ordered delivery guarantee only applies when publishes for an ordering
  // key are in the same region. For list of locational endpoints for Pub/Sub, see:
  // https://cloud.google.com/pubsub/docs/reference/service_apis_overview#list_of_locational_endpoints
  const publishOptions = {
    messageOrdering: true,
  };
  const topic = pubSubClient.topic(topicNameOrId, publishOptions);

  // Publishes the message
  const messageId = await topic.publishMessage(message);

  console.log(`Message ${messageId} published.`);

  return messageId;
}
```

## Options / Props

### Required role

| Role | Scope | Purpose |
|---|---|---|
| Pub/Sub Publisher (`roles/pubsub.publisher`) | On the topic | Publish messages to the topic. Additional permissions are needed to create or update topics and subscriptions. |

### Message attribute limits

| Item | Limit |
|---|---|
| Attributes per message | At most 100 |
| Attribute key and value types | Strings; no required encoding |
| Attribute key | Must not start with `goog`; must not exceed 256 bytes |
| Attribute value | Must not exceed 1024 bytes |

### Message content

| Rule | Detail |
|---|---|
| Required content | At least one of: message data, an ordering key, attributes. For REST, a non-empty `data` field or at least one attribute. |
| REST `data` | Base64-encoded string |
| Added by the service | Message ID (unique to the topic) and publish timestamp |

## Notes

- Pub/Sub offers at-least-once delivery and best-effort ordering to existing subscribers. For publish-side duplicates you can see different `publishTime` values for the same client-side original message, even with the same `messageId`.
- Message shape (source, pseudo-JSON): `data`: string, `attributes`: map of string to string, `messageId`: string, `publishTime`: string, `orderingKey`: string. Attributes can filter messages on the subscription and can carry event timestamps.
- Ordering keys, same publisher client: messages with the same key published in the same region are received in publish order.
- Ordering keys, multiple publisher clients: the order subscribers see matches the order Pub/Sub received them in the same region, but publishers do not know that order. If strict order across publishers is required, they must coordinate (for example a locking service) so they do not publish the same key simultaneously.
- Ordering keys, regions: the guarantee applies only when publishes for a key go to the same region; subscribers can connect to any region. Inside Google Cloud the client connects to the same-region endpoint by default; outside Google Cloud or in multiple regions use a locational endpoint (the samples use `us-east1-pubsub.googleapis.com:443`; the Rust sample uses `https://us-east1-pubsub.googleapis.com` via `with_endpoint`).
- Ordering keys, failures: when publishing with an ordering key fails, queued messages of the same key in the publisher fail, including future publish requests of that key; you must resume publishing for the key (see https://docs.cloud.google.com/pubsub/docs/retry-requests#retry_ordering).
- Adapted from the official docs: the REST bodies were tagged `restructuredtext` with `...` elisions and trailing commas (`"data": "MESSAGE_DATA",`, `"19916711285",`); the body is rewritten as valid JSON. The `gcloud pubsub topics publish` synopsis with `[--attribute=KEY="VALUE",...]` is tagged `text` (gcloud 593.0.0 help: `--attribute=[ATTRIBUTE,...]`, `--message`, `--ordering-key` exist).
- Corrected from the official docs: the source's ordering-key REST body uses the proto field name `"ordering_key": "ORDERING_KEY"`; the JSON field of `PubsubMessage` in the Discovery document is `orderingKey`, so the instruction above uses `orderingKey`.
- Corrected from the official docs: the Rust sample's `Err(e) => eprintln!("failed to publish message {i}: {e}")` arm (with the comment "Handle the error, e.g., log it, retry, or move the message to a queue.") swallowed publish failures; it now returns the error.
- The source also shows Console, C++, C#, Go, Java, PHP and Ruby; a plain JavaScript variant of the TypeScript plain-publish sample and a Python plain-publish sample with an error-handling callback; Rust attribute and ordering-key samples; Node.js attribute and Python ordering-key samples (`PublisherOptions(enable_message_ordering=True)` with the locational `api_endpoint`). Message size and batch limits are not stated on this page; see https://docs.cloud.google.com/pubsub/quotas.
- Further publish options linked by the source (not in this category): compress messages, retry requests, publish hedging, flow control, concurrency control, batch messaging, schemas, resource location restriction.
- Source: https://docs.cloud.google.com/pubsub/docs/publisher (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-topic.md](./create-topic.md)
- [publish-message-overview.md](./publish-message-overview.md)
