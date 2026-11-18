---
source: https://docs.cloud.google.com/pubsub/docs/flow-control
---

# Subscriber Flow Control

Subscriber-side flow control lets a pull subscriber regulate the rate at which it ingests messages, handling transient traffic spikes without driving up costs or until the subscriber is scaled up. It is available in the Pub/Sub high-level client library; with a low-level client library you implement your own.

## Signature / Usage

### Node.js

Adapted (not in the official docs): an `error` listener is added so that a subscriber error, such as a missing subscription or a permission failure, is logged instead of ending the process.

```javascript
/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
// const subscriptionNameOrId = 'YOUR_SUBSCRIPTION_NAME_OR_ID';
// const maxInProgress = 5;
// const timeout = 10;

// Imports the Google Cloud client library
const {PubSub} = require('@google-cloud/pubsub');

// Creates a client; cache this for further use
const pubSubClient = new PubSub();

async function subscribeWithFlowControlSettings(
  subscriptionNameOrId,
  maxInProgress,
  timeout,
) {
  const subscriberOptions = {
    flowControl: {
      maxMessages: maxInProgress,
    },
  };

  // References an existing subscription.
  // Note that flow control settings are not persistent across subscribers.
  const subscription = pubSubClient.subscription(
    subscriptionNameOrId,
    subscriberOptions,
  );

  console.log(
    `Subscriber to subscription ${subscription.name} is ready to receive messages at a controlled volume of ${maxInProgress} messages.`,
  );

  const messageHandler = message => {
    console.log(`Received message: ${message.id}`);
    console.log(`\tData: ${message.data}`);
    console.log(`\tAttributes: ${message.attributes}`);

    // "Ack" (acknowledge receipt of) the message
    message.ack();
  };

  subscription.on('message', messageHandler);
  subscription.on('error', error => {
    console.error(`Received error: ${error.message}`);
  });

  // Wait a while for the subscription to run. (Part of the sample only.)
  setTimeout(async () => {
    await subscription.close();
  }, timeout * 1000);
}
```

### TypeScript

Adapted (not in the official docs): an `error` listener is added so that a subscriber error, such as a missing subscription or a permission failure, is logged instead of ending the process.

```typescript
/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
// const subscriptionNameOrId = 'YOUR_SUBSCRIPTION_NAME_OR_ID';
// const maxInProgress = 5;
// const timeout = 10;

// Imports the Google Cloud client library
import {Message, PubSub, SubscriberOptions} from '@google-cloud/pubsub';

// Creates a client; cache this for further use
const pubSubClient = new PubSub();

async function subscribeWithFlowControlSettings(
  subscriptionNameOrId: string,
  maxInProgress: number,
  timeout: number,
) {
  const subscriberOptions: SubscriberOptions = {
    flowControl: {
      maxMessages: maxInProgress,
    },
  };

  // References an existing subscription.
  // Note that flow control settings are not persistent across subscribers.
  const subscription = pubSubClient.subscription(
    subscriptionNameOrId,
    subscriberOptions,
  );

  console.log(
    `Subscriber to subscription ${subscription.name} is ready to receive messages at a controlled volume of ${maxInProgress} messages.`,
  );

  const messageHandler = (message: Message) => {
    console.log(`Received message: ${message.id}`);
    console.log(`\tData: ${message.data}`);
    console.log(`\tAttributes: ${message.attributes}`);

    // "Ack" (acknowledge receipt of) the message
    message.ack();
  };

  subscription.on('message', messageHandler);
  subscription.on('error', (error: Error) => {
    console.error(`Received error: ${error.message}`);
  });

  // Wait a while for the subscription to run. (Part of the sample only.)
  setTimeout(async () => {
    await subscription.close();
  }, timeout * 1000);
}
```

### Python

```python
from concurrent.futures import TimeoutError
from google.cloud import pubsub_v1

# TODO(developer)
# project_id = "your-project-id"
# subscription_id = "your-subscription-id"
# Number of seconds the subscriber should listen for messages
# timeout = 5.0

subscriber = pubsub_v1.SubscriberClient()
subscription_path = subscriber.subscription_path(project_id, subscription_id)

def callback(message: pubsub_v1.subscriber.message.Message) -> None:
    print(f"Received {message.data!r}.")
    message.ack()

# Limit the subscriber to only have ten outstanding messages at a time.
flow_control = pubsub_v1.types.FlowControl(max_messages=10)

streaming_pull_future = subscriber.subscribe(
    subscription_path, callback=callback, flow_control=flow_control
)
print(f"Listening for messages on {subscription_path}..\n")

# Wrap subscriber in a 'with' block to automatically call close() when done.
with subscriber:
    try:
        # When `timeout` is not set, result() will block indefinitely,
        # unless an exception is encountered first.
        streaming_pull_future.result(timeout=timeout)
    except TimeoutError:
        streaming_pull_future.cancel()  # Trigger the shutdown.
        streaming_pull_future.result()  # Block until the shutdown is complete.
```

### Rust

```rust
use google_cloud_pubsub::client::Subscriber;
use std::time::Duration;

pub async fn sample(project_id: &str, subscription_id: &str) -> anyhow::Result<()> {
    let subscription_name = format!("projects/{project_id}/subscriptions/{subscription_id}");
    let client = Subscriber::builder().build().await?;
    let mut stream = client
        .subscribe(subscription_name)
        // The server pauses message delivery to the application when either
        // this many messages, or this many bytes are outstanding. A message is
        // outstanding until it has been acked or nacked.
        .set_max_outstanding_messages(1000)
        .set_max_outstanding_bytes(10 * 1024 * 1024) // 10 MB
        .build();

    // Terminate the example after 10 seconds.
    let shutdown_token = stream.shutdown_token();
    let shutdown = tokio::spawn(async move {
        tokio::time::sleep(Duration::from_secs(10)).await;
        shutdown_token.shutdown().await;
    });

    println!("listening for messages...");

    while let Some((message, handler)) = stream.next().await.transpose()? {
        println!("received message: {message:?}");
        handler.ack();
    }
    shutdown.await?;

    println!("done listening for messages");
    Ok(())
}
```

## Options / Props

| Setting | Description |
|---------|-------------|
| Maximum outstanding messages (Java `setMaxOutstandingElementCount()`, Node.js `flowControl.maxMessages`, Python `FlowControl(max_messages=...)`, Rust `set_max_outstanding_messages`, Go `ReceiveSettings.MaxOutstandingMessages`) | Maximum number of messages for which Pub/Sub has not received acknowledgments or negative acknowledgments |
| Total outstanding message bytes (Java `setMaxOutstandingRequestBytes()`, Rust `set_max_outstanding_bytes`, Go `ReceiveSettings.MaxOutstandingBytes`) | Maximum size of messages for which Pub/Sub has not received acknowledgments or negative acknowledgments |

## Notes

- Defaults and variable names differ across client libraries. Set the limits according to the throughput capacity of your client machines.
- If either limit is crossed, the subscriber client does not pull more messages until the already-pulled messages are acknowledged or negatively acknowledged; this aligns throughput with the cost of running more subscribers.
- Use flow control in a pull subscriber client for transient spikes. If messages are persistently published faster than consumed, increase the number of subscriber client instances instead.
- Node.js: flow control settings are not persistent across subscribers.
- Adapted from the official docs: the Node.js and TypeScript samples register only a `message` listener. A `Subscription` is an event emitter, so a subscriber error with no `error` listener is an unhandled `error` event that ends the process; the examples add an `error` listener that logs the error. Handle it as the application requires (retry, alert or exit).
- C++ sample comments state that the library defaults to 0 and 1,000 for the message count watermarks and 0 and 10 MiB for the size watermarks; the library stops requesting messages when any high watermark is reached and resumes when both low watermarks are reached. These are C++ library defaults; the source sets 1000 messages and 8 MiB in that sample.
- The Rust sample comment: the server pauses delivery when either this many messages or this many bytes are outstanding; a message is outstanding until acked or nacked.
- The source also shows C++, C#, Go, Java and Ruby (Go: `sub.ReceiveSettings.MaxOutstandingMessages = 100`, `MaxOutstandingBytes = 1e8`; Java: 1,000 messages and 100 MiB; Ruby: `listen inventory: 10`).
- Source: https://docs.cloud.google.com/pubsub/docs/flow-control (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [pull.md](./pull.md)
- [subscribe-best-practices.md](./subscribe-best-practices.md)
- [create-subscription.md](./create-subscription.md)
