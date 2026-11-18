---
source: https://docs.cloud.google.com/pubsub/docs/subscription-message-retention
---

# Subscription message retention

A subscription retains published messages on its own behalf. By default a message is discarded once acknowledged, and unacknowledged messages are kept for 7 days. You can change the retention duration and optionally keep acknowledged messages so they can be replayed with seek.

## Signature / Usage

### Create a subscription that retains acknowledged messages

Adapted (not in the official docs): `--topic=TOPIC_ID` is added because gcloud 593.0.0 requires `--topic` for `pubsub subscriptions create`.

```bash
gcloud pubsub subscriptions create SUBSCRIPTION_ID \
  --topic=TOPIC_ID \
  --message-retention-duration=5d \
  --retain-acked-messages
```

If you omit `--message-retention-duration`, messages are retained for the default 7 days.

### Update retention on an existing subscription

```bash
gcloud pubsub subscriptions update SUBSCRIPTION_ID \
  --message-retention-duration=1d \
  --retain-acked-messages
```

### Stop retaining acknowledged messages

```bash
gcloud pubsub subscriptions update SUBSCRIPTION_ID \
  --no-retain-acked-messages
```

## Options / Props

| Setting | Value |
|---------|-------|
| Default retention of unacknowledged messages | 7 days |
| Minimum message retention duration | 10 minutes |
| Maximum message retention duration | 31 days |
| Retain acknowledged messages | Off by default; kept up to the configured retention duration when enabled |
| Default subscription expiration period | 31 days; must be greater than the message retention duration |

## Notes

- Acknowledged messages retained by a subscription are billed as storage to the subscription's project.
- If the subscription's topic also has message retention enabled, a message is deleted from the subscription only when its age exceeds the maximum of the subscription retention and topic retention durations.
- When you change the retention duration or the expiration policy, the expiration period must be greater than the retention duration (defaults: 7 days retention, 31 days expiration).
- Data loss: shortening the retention duration, or running `--no-retain-acked-messages`, discards messages that would otherwise remain replayable; seek to a time or snapshot likewise replays or drops unacknowledged messages. Try retention and seek changes on a disposable project first.
- The retained-acked setting is what enables replay through seek (the Pub/Sub replay overview page).
- Adapted from the official docs: the source create command `gcloud pubsub subscriptions create SUBSCRIPTION_ID --message-retention-duration=5d --retain-acked-messages` omitted the required `--topic`. The source also shows the Console.
- Source: https://docs.cloud.google.com/pubsub/docs/subscription-message-retention (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [subscription-retry-policy.md](./subscription-retry-policy.md)
- [dead-letter-topics.md](./dead-letter-topics.md)
- [monitor-subscription.md](./monitor-subscription.md)
