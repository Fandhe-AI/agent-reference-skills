---
source: https://docs.cloud.google.com/pubsub/docs/lease-management
---

# Lease management (ack deadline extension)

A pull subscriber must process and acknowledge a message within the acknowledgment deadline or extend it with a `modifyAckDeadline` call. The high-level client libraries do this automatically (lease management); by default they can extend the deadline up to an hour with periodic `modifyAckDeadline` requests.

## Signature / Usage

### Manual unary pull with deadline extension (Node.js)

```javascript
/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
// const projectId = 'YOUR_PROJECT_ID';
// const subscriptionNameOrId = 'YOUR_SUBSCRIPTION_NAME_OR_ID';

// Imports the Google Cloud client library. v1 is for the lower level
// proto access.
const {v1} = require('@google-cloud/pubsub');

// Creates a client; cache this for further use.
const subClient = new v1.SubscriberClient();

async function synchronousPullWithLeaseManagement() {
  // The low level API client requires a name only.
  const formattedSubscription =
    subscriptionNameOrId.indexOf('/') >= 0
      ? subscriptionNameOrId
      : subClient.subscriptionPath(projectId, subscriptionNameOrId);

  // The maximum number of messages returned for this request.
  // Pub/Sub may return fewer than the number specified.
  const maxMessages = 1;
  const newAckDeadlineSeconds = 30;
  const request = {
    subscription: formattedSubscription,
    maxMessages: maxMessages,
    allowExcessMessages: false,
  };

  let isProcessed = false;

  // The worker function is meant to be non-blocking. It starts a long-
  // running process, such as writing the message to a table, which may
  // take longer than the default 10-sec acknowledge deadline.
  function worker(message) {
    console.log(`Processing "${message.message.data}"...`);

    setTimeout(() => {
      console.log(`Finished procesing "${message.message.data}".`);
      isProcessed = true;
    }, 30000);
  }

  // The subscriber pulls a specified number of messages.
  const [response] = await subClient.pull(request);

  // Obtain the first message.
  const message = response.receivedMessages[0];

  // Send the message to the worker function.
  worker(message);

  let waiting = true;
  while (waiting) {
    await new Promise(r => setTimeout(r, 10000));
    // If the message has been processed..
    if (isProcessed) {
      const ackRequest = {
        subscription: formattedSubscription,
        ackIds: [message.ackId],
      };

      //..acknowledges the message.
      await subClient.acknowledge(ackRequest);
      console.log(`Acknowledged: "${message.message.data}".`);
      // Exit after the message is acknowledged.
      waiting = false;
      console.log('Done.');
    } else {
      // If the message is not yet processed..
      const modifyAckRequest = {
        subscription: formattedSubscription,
        ackIds: [message.ackId],
        ackDeadlineSeconds: newAckDeadlineSeconds,
      };

      //..reset its ack deadline.
      await subClient.modifyAckDeadline(modifyAckRequest);

      console.log(
        `Reset ack deadline for "${message.message.data}" for ${newAckDeadlineSeconds}s.`,
      );
    }
  }
}

synchronousPullWithLeaseManagement().catch(console.error);
```

### Manual unary pull with deadline extension (Python)

Adapted (not in the official docs): replaced the module-level `return` (a syntax error outside a function) with `sys.exit(0)`.

```python
import logging
import multiprocessing
import sys
import time

from google.api_core import retry
from google.cloud import pubsub_v1

multiprocessing.log_to_stderr()
logger = multiprocessing.get_logger()
logger.setLevel(logging.INFO)
processes = dict()

# TODO(developer)
# project_id = "your-project-id"
# subscription_id = "your-subscription-id"

subscriber = pubsub_v1.SubscriberClient()
subscription_path = subscriber.subscription_path(project_id, subscription_id)

response = subscriber.pull(
    request={"subscription": subscription_path, "max_messages": 3},
    retry=retry.Retry(deadline=300),
)

if len(response.received_messages) == 0:
    sys.exit(0)

# Start a process for each message based on its size modulo 10.
for message in response.received_messages:
    process = multiprocessing.Process(
        target=time.sleep, args=(sys.getsizeof(message) % 10,)
    )
    processes[process] = (message.ack_id, message.message.data)
    process.start()

while processes:
    # Take a break every second.
    if processes:
        time.sleep(1)

    for process in list(processes):
        ack_id, msg_data = processes[process]
        # If the process is running, reset the ack deadline.
        if process.is_alive():
            subscriber.modify_ack_deadline(
                request={
                    "subscription": subscription_path,
                    "ack_ids": [ack_id],
                    # Must be between 10 and 600.
                    "ack_deadline_seconds": 15,
                }
            )
            logger.debug(f"Reset ack deadline for {msg_data}.")

        # If the process is complete, acknowledge the message.
        else:
            subscriber.acknowledge(
                request={"subscription": subscription_path, "ack_ids": [ack_id]}
            )
            logger.debug(f"Acknowledged {msg_data}.")
            processes.pop(process)
print(
    f"Received and acknowledged {len(response.received_messages)} messages from {subscription_path}."
)

# Close the underlying gPRC channel. Alternatively, wrap subscriber in
# a 'with' block to automatically call close() when done.
subscriber.close()
```

## Options / Props

### Lease management properties (high-level client libraries)

| Property | Description |
|---|---|
| Maximum acknowledgment extension period | Maximum total time the library can extend a message's ack deadline with `modify acknowledgment deadline`; sets how long subscribers may process messages. Default: up to one hour. |
| Maximum duration for each acknowledgment extension | Maximum time added by each `modify acknowledgment deadline` request; defines how long Pub/Sub takes to redeliver a message when the first subscriber crashes or becomes unhealthy and stops extending. |
| Minimum duration for each acknowledgment extension | Minimum time added by each request; the minimum time before a message can be redelivered. |

### Related values

| Item | Value |
|---|---|
| Extension length (Python, Go, Java high-level libraries) | Based on the 99th percentile of acknowledgment delay |
| `ack_deadline_seconds` in the Python sample | Must be between 10 and 600 |
| Java exactly-once variables | `minDurationPerAckExtension` and `maxDurationPerAckExtension`: Range=0 to 600, Default=none (see exactly-once delivery) |

## Notes

- Defaults and names for these properties differ per client library; no per-library default values are listed in the source beyond those above.
- Acknowledgment deadlines are not guaranteed to be respected unless exactly-once delivery is enabled.
- A low subscription-level ack deadline raises the chance of duplicates; a high one delays redelivery of failed messages. Lease management gives per-message control.
- Use the high-level client libraries; use manual `modifyAckDeadline` only if they do not work or you need unary pull. The C++ high-level library is an exception that provides lease management for unary pull.
- The samples acknowledge only after processing finishes. Messages acked before processing are lost on failure.
- Corrected from the official docs: the Python sample contained `return` at module level (`if len(response.received_messages) == 0:\n    return`), which is not valid outside a function.
- The source also shows C# and Java (`GrpcSubscriberStub`) and Ruby unary-pull samples; they are omitted.
- Source: https://docs.cloud.google.com/pubsub/docs/lease-management (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [exactly-once-delivery.md](./exactly-once-delivery.md)
- [replay-overview.md](./replay-overview.md)
