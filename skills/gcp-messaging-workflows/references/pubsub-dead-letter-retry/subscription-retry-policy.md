---
source: https://docs.cloud.google.com/pubsub/docs/subscription-retry-policy
---

# Subscription retry policy

When a subscriber can't acknowledge a message, Pub/Sub automatically redelivers it. This is the subscription retry policy; it can't be turned on or off, but you choose between immediate redelivery (the default) and exponential backoff.

## Signature / Usage

### Create a subscription with exponential backoff

```bash
gcloud pubsub subscriptions create SUBSCRIPTION_ID \
  --topic=TOPIC_ID \
  --min-retry-delay=MIN_RETRY_DELAY \
  --max-retry-delay=MAX_RETRY_DELAY
```

`SUBSCRIPTION_ID` is a unique ID for the subscription, `TOPIC_ID` the topic to attach it to, `MIN_RETRY_DELAY` and `MAX_RETRY_DELAY` the minimum and maximum backoff delays. In the Console, choose Retry policy "Retry after exponential backoff".

## Options / Props

### Retry policy types

| Type | Behavior |
|------|----------|
| Immediate redelivery (default) | Pub/Sub resends the message immediately, potentially to the same subscriber client. Can cause problems if the condition that prevented the ack hasn't changed: multiple unacknowledgeable messages may be resent. |
| Exponential backoff | After the first failure Pub/Sub waits the minimum backoff; each consecutive failure adds delay up to the maximum. |

### Exponential backoff settings

| Setting | gcloud flag | Range | Default |
|---------|-------------|-------|---------|
| Minimum backoff | `--min-retry-delay` | 0 to 600 seconds | 10 seconds |
| Maximum backoff | `--max-retry-delay` | 0 to 600 seconds | 600 seconds |

## Notes

- Exponential backoff settings: Flag values are `INTEGER[UNIT]` with UNIT one of `s`, `m`, `h`, `d` (seconds assumed if omitted), per the gcloud 593.0.0 help.
- Exponential backoff triggers on a negative acknowledgment (nack) and when a message's acknowledgment deadline expires. It is applied per message, not to the whole subscription; Pub/Sub keeps delivering other messages (unless you use ordered message delivery).
- Use it for a transient inability to process some messages. It is applied best-effort and each message is evaluated separately. Don't use it to introduce intentional delays: if you nack a large number of messages, some may be delivered with less or no backoff, and Pub/Sub might slow delivery of all messages. For scheduled deliveries, the source recommends Cloud Tasks (`gcp-run`).
- Independent from push backoff (see the push subscription page). Used together, the total delay is the maximum combined value of the push backoff and the retry policy value; check how they interact if delivery looks wrong.
- Requires `roles/pubsub.editor` on the project (or equivalent roles). A subscription can be created in one project and attached to a topic in another; check permissions in each.
- Redelivery means duplicates; subscribers must be idempotent.
- The source also shows the Console steps. Update flags (`--clear-retry-policy`) exist in gcloud 593.0.0 `pubsub subscriptions update` but are not in the source page.
- Source: https://docs.cloud.google.com/pubsub/docs/subscription-retry-policy (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [dead-letter-topics.md](./dead-letter-topics.md)
- [subscription-message-retention.md](./subscription-message-retention.md)
- [monitor-subscription.md](./monitor-subscription.md)
