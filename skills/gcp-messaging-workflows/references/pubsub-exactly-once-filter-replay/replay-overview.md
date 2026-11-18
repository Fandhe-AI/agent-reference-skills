---
source: https://docs.cloud.google.com/pubsub/docs/replay-overview
---

# Replaying and discarding messages (snapshots and seek)

Seek alters the acknowledgment state of messages in bulk: replay previously acknowledged messages, or purge messages. A snapshot is a durable point-in-time view of a subscription's ack state, and seek to a snapshot or timestamp applies a state to a subscription.

## Signature / Usage

### Create a snapshot

```bash
gcloud pubsub snapshots create \
    --project=PROJECT_ID \
    --subscription=SUBSCRIPTION_ID \
    SNAPSHOT_ID
```

### Seek to a timestamp

Adapted (not in the official docs): removed the trailing line-continuation backslash after `--time=TIME`, which would join the command to the next line.

```bash
gcloud pubsub subscriptions seek SUBSCRIPTION_ID \
    --time=TIME
```

### Seek to a snapshot

```bash
gcloud pubsub subscriptions seek SUBSCRIPTION_ID \
    --snapshot=SNAPSHOT_ID
```

## Options / Props

### Snapshot and seek limits

| Item | Value |
|---|---|
| Snapshot lifetime | 7 days minus the age of the oldest unacknowledged message in the source subscription (for example, oldest unacked message 1 day old: expires after 6 days) |
| Maximum snapshot lifetime | 7 days |
| Minimum remaining lifetime | A snapshot that would expire in less than 1 hour after creation cannot be created; seeking to a snapshot fails if the resulting snapshot would expire in less than 1 hour |
| Snapshot contents | Unacknowledged messages of the source subscription at creation time, plus messages published to the topic after creation |
| Seek to a time in the past | Requires topic message retention or a subscription configured to retain acknowledged messages |
| Seek to a snapshot | No special subscription configuration needed; the snapshot's topic must match the subscription's topic |
| Time semantics | Messages received before the time are marked acknowledged; messages received after are marked unacknowledged. Seek to a future time purges all messages; seek to a past time replays |
| Publication time | `publishTime` set by Pub/Sub servers; imprecise due to possible clock skew and because it is arrival time of the publish request |
| Consistency | Eventually consistent; it can take as long as a minute to take full effect, and messages published before the seek timestamp or acked in a snapshot might still be delivered after the seek |

### Seek interaction with other subscription features

| Feature | Behavior |
|---|---|
| Filters | Seek to a timestamp redelivers only messages matching the filter. A snapshot of a filtered subscription holds all newer messages (including non-matching) plus older unacked messages; seeking to it redelivers only messages matching the seeking subscription's filter |
| Dead-letter topics | Seek sets delivery attempts to `0` |
| Retry policies | Seek resets the delay between the ack deadline expiring or nack, and the resend |
| Exactly-once delivery | Previously acknowledged eligible messages are resent; acks for deliveries made before the seek fail |

### Use cases

| Use case | Description |
|---|---|
| Update subscriber code safely | Snapshot during deployment to recover from erroneous acks |
| Recover from subscriber problems | With acknowledged-message retention, seek to a time in the past |
| Save processing time and cost | Bulk acknowledge a large irrelevant backlog |
| Test subscriber code | Apply the same snapshot to any subscription on the topic, including a new one |

## Notes

- Data loss: seeking to a future time or to a snapshot marks messages as acknowledged or unacknowledged in bulk, so unprocessed messages can be dropped and processed messages replayed. Try it on a disposable project first; deleting a snapshot is irreversible.
- Creating a snapshot immediately after creating a subscription can fail because of propagation delay.
- The source also shows the Console and Google APIs forms; they are omitted.
- Source: https://docs.cloud.google.com/pubsub/docs/replay-overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [replay-message.md](./replay-message.md)
- [subscription-message-filter.md](./subscription-message-filter.md)
- [exactly-once-delivery.md](./exactly-once-delivery.md)
