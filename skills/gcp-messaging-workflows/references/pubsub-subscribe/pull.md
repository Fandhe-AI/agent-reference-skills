---
source: https://docs.cloud.google.com/pubsub/docs/pull
---

# Pull Subscriptions (Pull and StreamingPull)

In a pull subscription the subscriber client requests messages from the Pub/Sub server, using the Pull or StreamingPull API through a high-level or low-level client library, with asynchronous or synchronous processing. For most use cases Google recommends the high-level client library with the StreamingPull API and asynchronous message processing.

## Signature / Usage

### Pull subscription workflow

1. The subscriber client calls the `pull` method (`PullRequest`).
2. The server responds with zero or more messages and acknowledgment IDs (`PullResponse`). A response with zero messages or with an error does not necessarily indicate that there are no messages available.
3. The client calls `acknowledge` with the acknowledgment ID to confirm the message is processed and need not be delivered again.

A single streaming pull request can return multiple responses over the open connection; each unary pull request returns exactly one response. Use the unary `Acknowledge` and `ModifyAckDeadline` RPCs with both APIs.

APIs used by the subscriber client:

- REST `Pull` API (`projects.subscriptions.pull`)
- RPC `PullRequest`
- RPC `StreamingPullRequest`

### StreamingPull workflow

1. The client opens a connection. If the connection quota is exceeded, the server returns a resource exhausted error (client libraries retry out-of-quota errors automatically).
2. The server continuously sends messages over the connection.
3. If the throughput quota is exceeded, the server stops sending messages but the connection is not broken; the stream resumes when quota is available.
4. The client or the server eventually closes the connection. The servers recurrently close the connection after a time period; the client library automatically reopens it.

### Example (high-level client library, StreamingPull, Python)

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

## Options / Props

### StreamingPull vs Pull

| Aspect | StreamingPull | Pull (unary) |
|--------|---------------|--------------|
| Model | Persistent bidirectional connection; messages sent as available | Request/response; one response per request |
| Latency and throughput | Minimizes latency, maximizes throughput; used by client libraries where possible | Low latency / high throughput needs multiple simultaneous outstanding requests (error-prone, hard to maintain) |
| When to use | Recommended for high throughput and low latency | Only when strict control is required over the number of messages the client can process and over client memory and resources, or when the subscriber is a proxy to a more pull-oriented service |
| Quota behavior | Connection quota exceeded: resource exhausted error; throughput quota exceeded: sending pauses, connection stays | Throughput quota exceeded: resource exhausted error |
| PHP | Not supported by the PHP client library | n/a |

### Message processing modes

| Mode | Description |
|------|-------------|
| Asynchronous pull | Decouples receiving from processing; default for most clients; works with StreamingPull or unary Pull, high-level or low-level library; lower latency and higher throughput |
| Synchronous pull | Receiving and processing occur in sequence; use only when low latency and high throughput are not the main factors (for example a synchronous-only programming model or exact control over memory, network or CPU); use with the unary Pull API |

### Client libraries

| Library | Features |
|---------|----------|
| High-level | Lease management options (more granular than the subscription-level ack deadline), ordered delivery, exactly-once delivery, flow control. Recommended with asynchronous pull and StreamingPull. Not every language supports the Pull API in the high-level library |
| Low-level auto-generated | For using the Pull API directly; synchronous or asynchronous; you must code ordered delivery, exactly-once delivery, flow control and lease management manually |

## Notes

- Snippet taken from https://docs.cloud.google.com/pubsub/docs/flow-control (Python flow-control sample); the pull page itself has no code.
- Pub/Sub is a managed publish/subscribe service; Cloudflare Queues are in `cloudflare-stateful`, Redis-backed BullMQ queues in `bullmq`, Cloud Tasks in `gcp-run`.
- Subscription properties are described in the subscription properties page; acknowledgment deadlines can be extended per message with lease management in the high-level library.
- Source: https://docs.cloud.google.com/pubsub/docs/pull (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-subscription.md](./create-subscription.md)
- [flow-control.md](./flow-control.md)
- [push.md](./push.md)
- [subscribe-best-practices.md](./subscribe-best-practices.md)
