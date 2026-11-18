---
source: https://docs.cloud.google.com/pubsub/docs/subscribe-best-practices
---

# Subscribe Best Practices

Best practices for subscribing to Pub/Sub: choosing a subscription type, processing before acknowledging, preserving message IDs, flow control, handling duplicate deliveries and ordered messaging.

## Signature / Usage

### Flow control example (Node.js)

The page has no code of its own. For subscriber flow control, `flowControl.maxMessages` caps the number of outstanding messages. The lines come from inside `subscribeWithFlowControlSettings`; `maxInProgress`, `pubSubClient` and `subscriptionNameOrId` are defined in the full sample on [flow-control.md](./flow-control.md):

```javascript
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
```

## Options / Props

### Push versus pull

| Subscription type | Recommended when |
|-------------------|------------------|
| Push | You cannot include code that imports the client library as a dependency; the subscriber client cannot make outgoing requests; the same instance processes messages from different topics and subscriptions and doesn't know the list of subscriptions |
| Pull (high-level client library) | General cases. With unary pull, don't set `returnImmediately` to `true` (it adversely impacts pull performance; the field is deprecated) |
| Export (for example BigQuery) | Store messages directly in a Google Cloud resource without Dataflow as an intermediary |

### Duplicate and redelivery scenarios

| Scenario | Cause and action |
|----------|------------------|
| Consistent redelivery of many messages | Subscribers are overloaded or not acknowledging before the deadline. Pull: set custom flow control values or increase lease extension periods with lease management. Push: increase the acknowledgement deadline setting; follow "maintain a healthy subscription" practices |
| Occasional redelivery | Redelivery before the ack deadline passed or after acknowledgment within a few seconds is expected; spikes are rare but hit several messages at once. Build the system to tolerate occasional duplicates |
| Repeated redelivery of a few messages | First confirm you acknowledge them; consider a dead-letter topic to prevent further redelivery. Rarely, network or hardware disruptions deliver a few messages multiple times; self-healing can take several minutes. Process and acknowledge quickly to reduce likelihood |

### Ordered messaging checklist

| Practice | Detail |
|----------|--------|
| Choose StreamingPull or Pull | A push subscription supports only one outstanding message per ordering key at a time; push is not recommended where many messages share an ordering key or latency is critical |
| Enable message ordering on the subscription | Enable it only on the subscriptions that need ordered delivery; each subscription decides independently. Publishers send messages with an ordering key in the same region |
| Acknowledge in order | Acknowledgments for later messages are not processed until earlier ones are, per ordering key: if you receive messages 1, 2, 3 and acknowledge only 3, message 3 is not considered acknowledged until 1 and 2 are; if those acks never arrive, 1, 2 and 3 are all redelivered |

### Summary

| Topic | Task |
|-------|------|
| Choose a subscription type | Choose the right type; use the high-level client library where supported |
| Replay an acknowledged message | Process before acknowledging, or configure for seek so acknowledged messages are not lost |
| Flow control | Configure subscriber flow control so subscribers aren't overloaded until autoscaling or time catches up |
| Duplicates and message IDs | Preserve or log `messageId` to troubleshoot duplicates, redeliveries and missing messages |
| Ordering | Use StreamingPull or Pull, enable ordering on the subscription, acknowledge in order |

## Notes

- Snippet taken from https://docs.cloud.google.com/pubsub/docs/flow-control (Node.js sample, lines inside `subscribeWithFlowControlSettings`); the best-practices page itself has no code.
- Process before acknowledging: by default Pub/Sub discards a message after it is acknowledged. A message acknowledged before processing is lost on processing failure; it is only recoverable if acknowledged-message retention or topic retention is configured and you perform a seek operation (seeking can replay or drop unacknowledged messages; try it on a disposable project first). High-latency subscribers may need custom flow control and lease management values.
- Preserve message IDs: publishers and subscribers should store or log message IDs to troubleshoot duplicates, redeliveries and data loss.
- Flow control: set `maximum outstanding messages` and `total outstanding message bytes` (names and defaults vary by client library). It allows time for autoscaling (saves latency) or spreads the load over a longer period (saves costs).
- Delivery is at-least-once by default: messages can be delivered multiple times even after acknowledgment, so subscribers must be idempotent.
- Exactly-once delivery, if duplicates are intolerable, is only available for pull subscriptions and results in higher publish-to-subscribe latency; evaluate the trade-off first.
- Deprecated: "The field `returnImmediately` is now deprecated." (source statement; don't set it to `true` with unary pull).
- Source: https://docs.cloud.google.com/pubsub/docs/subscribe-best-practices (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [flow-control.md](./flow-control.md)
- [pull.md](./pull.md)
- [push.md](./push.md)
