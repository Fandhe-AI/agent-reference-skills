---
source: https://docs.cloud.google.com/pubsub/docs/flow-control-messages
---

# Publisher flow control

Publisher flow control limits outstanding publish requests (by message count and bytes) so a client that publishes faster than it can send does not accumulate requests in memory until they fail with `DEADLINE_EXCEEDED`.

## Signature / Usage

### Node.js

```javascript
/**
 * TODO(developer): Uncomment this variable before running the sample.
 */
// const topicNameOrId = 'YOUR_TOPIC_NAME_OR_ID';

// Imports the Google Cloud client library
const {PubSub} = require('@google-cloud/pubsub');

// Creates a client; cache this for further use
const pubSubClient = new PubSub();

async function publishWithFlowControl(topicNameOrId) {
  // Create publisher options
  const options = {
    flowControlOptions: {
      maxOutstandingMessages: 50,
      maxOutstandingBytes: 10 * 1024 * 1024, // 10 MB
    },
  };

  // Get a publisher. Cache topic objects (publishers) and reuse them.
  const topic = pubSubClient.topic(topicNameOrId, options);

  // For flow controlled publishing, we'll use a publisher flow controller
  // instead of `topic.publish()`.
  const flow = topic.flowControlled();

  // Publish messages in a fast loop.
  const testMessage = {data: Buffer.from('test!')};
  for (let i = 0; i < 1000; i++) {
    // You can also just `await` on `publish()` unconditionally, but if
    // you want to avoid pausing to the event loop on each iteration,
    // you can manually check the return value before doing so.
    const wait = flow.publish(testMessage);
    if (wait) {
      await wait;
    }
  }

  // Wait on any pending publish requests. Note that you can call `all()`
  // earlier if you like, and it will return a Promise for all messages
  // that have been sent to `flowController.publish()` so far.
  const messageIds = await flow.all();
  console.log(`Published ${messageIds.length} with flow control settings.`);
}
```

### Python

Adapted (not in the official docs): a failed publish only raised inside the done callback, after which the sample still printed that the messages were published; the futures are now checked with `result()` after `futures.wait`, so a failure stops the script.

```python
from concurrent import futures
from google.cloud import pubsub_v1
from google.cloud.pubsub_v1.types import (
    LimitExceededBehavior,
    PublisherOptions,
    PublishFlowControl,
)

# TODO(developer)
# project_id = "your-project-id"
# topic_id = "your-topic-id"

# Configure how many messages the publisher client can hold in memory
# and what to do when messages exceed the limit.
flow_control_settings = PublishFlowControl(
    message_limit=100,  # 100 messages
    byte_limit=10 * 1024 * 1024,  # 10 MiB
    limit_exceeded_behavior=LimitExceededBehavior.BLOCK,
)
publisher = pubsub_v1.PublisherClient(
    publisher_options=PublisherOptions(flow_control=flow_control_settings)
)
topic_path = publisher.topic_path(project_id, topic_id)
publish_futures = []

# Resolve the publish future in a separate thread.
def callback(publish_future: pubsub_v1.publisher.futures.Future) -> None:
    message_id = publish_future.result()
    print(message_id)

# Publish 1000 messages in quick succession may be constrained by
# publisher flow control.
for n in range(1, 1000):
    data_str = f"Message number {n}"
    # Data must be a bytestring
    data = data_str.encode("utf-8")
    publish_future = publisher.publish(topic_path, data)
    # Non-blocking. Allow the publisher client to batch messages.
    publish_future.add_done_callback(callback)
    publish_futures.append(publish_future)

futures.wait(publish_futures, return_when=futures.ALL_COMPLETED)
for publish_future in publish_futures:
    # Re-raise a failed publish instead of reporting success.
    publish_future.result()

print(f"Published messages with flow control settings to {topic_path}.")
```

## Options / Props

### Flow control settings per client library (from the source samples)

| Library | Settings | Default / behavior stated in the source |
|---|---|---|
| Node.js | `flowControlOptions: {maxOutstandingMessages, maxOutstandingBytes}`; `topic.flowControlled()` with `flow.publish()` / `flow.all()` | not stated |
| Python | `PublishFlowControl(message_limit, byte_limit, limit_exceeded_behavior)`; `LimitExceededBehavior.BLOCK` | not stated |
| Go (v2) | `FlowControlSettings{MaxOutstandingMessages, MaxOutstandingBytes, LimitExceededBehavior}` | `MaxOutstandingMessages` default 1000; `MaxOutstandingBytes` default 0 (unlimited); `LimitExceededBehavior` default Ignore, other options Block (`pubsub.FlowControlBlock`) and SignalError |
| Java | `FlowControlSettings` (`setLimitExceededBehavior`, `setMaxOutstandingRequestBytes`, `setMaxOutstandingElementCount`) passed through `BatchingSettings` | behaviors: Block, Ignore (continue publishing), ThrowException (error out); sample comment: "By default, messages are not batched." |
| C++ | `MaxPendingMessagesOption`, `MaxPendingBytesOption`, `FullPublisherActionOption` (`FullPublisherAction::kBlocks`) | by default the publisher never blocks; capacity is limited only by system memory |
| Ruby (v3) | `async: {flow_control: {message_limit, byte_limit, limit_exceeded_behavior}}` | behaviors: `:block`, `:ignore`, `:error` |

### Required role

| Role | Where |
|---|---|
| Pub/Sub Publisher (`roles/pubsub.publisher`) | on the topic |

## Notes

- Requests accumulate in memory until they fail with `DEADLINE_EXCEEDED` when the publish rate exceeds machine CPU / RAM / network capacity, network settings (outstanding requests, bandwidth) or publish-request latency.
- Diagnose with server-side metrics in Monitoring: failed `DEADLINE_EXCEEDED` requests are not visible, only successful ones; their rate shows the client machines' throughput capacity and is the baseline for the limits.
- Set the limits according to the throughput capacity of your client machines. Use flow control for periodic bursts; if the problem is persistent rather than a transient spike, increase the number of publisher client instances.
- The source also shows C++, Go, Java, Ruby and a TypeScript variant of the Node.js sample; these are omitted here (Go / Java / C++ / Ruby behaviors are in the table).
- Corrected from the official docs: the Python sample ended with `futures.wait(publish_futures, return_when=futures.ALL_COMPLETED)` followed by the success message, so a publish error raised only inside the `callback` and the script still reported success; each future's `result()` is now called after the wait.
- Source: https://docs.cloud.google.com/pubsub/docs/flow-control-messages (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [batch-messaging.md](./batch-messaging.md)
- [publish-best-practices.md](./publish-best-practices.md)
- [compress-messages.md](./compress-messages.md)
