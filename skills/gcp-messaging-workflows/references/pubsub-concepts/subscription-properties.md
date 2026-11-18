---
source: https://docs.cloud.google.com/pubsub/docs/subscription-properties
---

# Subscription properties

Properties common to all Pub/Sub subscription types, set when you create or update a subscription: message retention, expiration, acknowledgment deadline, SMTs, filter, ordering, dead-letter topic and retry policy.

## Signature / Usage

The source page has no code block. Snippet from the gcloud quickstart; the properties below map to the flags listed in the table.

```bash
gcloud pubsub subscriptions create my-sub --topic=my-topic
```

## Options / Props

| Property | gcloud flag | Values and behavior |
|---|---|---|
| Message retention duration | `--message-retention-duration` | Default 7 days; minimum 10 minutes; maximum 31 days. After it Pub/Sub might discard the message regardless of ack state. Retaining unacknowledged messages for more than 24 hours incurs additional charges. |
| Retain acknowledged messages | `--retain-acked-messages` | Retains acknowledged messages for the message retention duration; increases storage fees. |
| Expiration period | `--expiration-period` | Default 31 days; minimum 1 day; must be at least as long as the message retention duration; `never expire` keeps the subscription persistent. Activity or a property update restarts the clock. |
| Acknowledgment deadline | `--ack-deadline` | Default 10 seconds; minimum 10 seconds; maximum 600 seconds. Extend per message with `ModifyAckDeadline`. |
| Single Message Transforms | `--message-transforms-file` | Lightweight modification of attributes and data before delivery to the subscriber. |
| Subscription filter | `--message-filter` | Filtering expression on attributes (not on message data). Non-matching messages are automatically acknowledged. Cannot be changed or removed after being applied. |
| Message ordering | `--enable-message-ordering` | Messages in the same region with the same ordering key are received in publish order; the publisher must set the ordering key. Acks for later messages are not processed until acks for earlier ones are. |
| Dead letter topic | `--dead-letter-topic`, `--max-delivery-attempts`, `--dead-letter-topic-project` | Maximum delivery attempts default 5, any number from 5 to 100 inclusive. If the topic is in a different project, specify its project ID. |
| Retry policy | `--min-retry-delay`, `--max-retry-delay` | Default: retry immediately. Alternative: retry after exponential backoff delay with minimum and maximum backoff. |
| Exactly-once delivery | `--enable-exactly-once-delivery` | Referenced by the source for the client-library ack-extension settings. |

### Retry backoff values

| Setting | Value |
|---|---|
| Minimum backoff default (when only maximum is set) | 10 seconds |
| Maximum backoff default (when only minimum is set) | 600 seconds |
| Longest backoff you can specify | 600 seconds |

## Notes

- Avoiding retention charges: delete idle subscriptions; use topic message retention (stores messages once at the topic level) or retained acked messages instead of subscription retention as backup storage; add subscribers to process within a day.
- Expiration: when you change message retention or expiration, the expiration period must be greater than the message retention duration (defaults: 7 days and 31 days).
- Client libraries can adjust the ack deadline dynamically, so a message may be redelivered before the deadline you set; use `minDurationPerAckExtension` and `maxDurationPerAckExtension` to override.
- Filters: no egress fees for auto-acknowledged messages, but message delivery fees and seek-related storage fees apply. Filters can't be changed or removed once applied.
- Dead-letter and batch retry: with batched messages exponential backoff starts when the subscriber nacks every message in the batch or the ack deadline expires. On push subscriptions, redelivery uses the push backoff when it is longer than the exponential backoff.
- Subscribers must be idempotent: at-least-once delivery means duplicates.
- Snippet taken from https://docs.cloud.google.com/pubsub/docs/publish-receive-messages-gcloud ; flags verified against gcloud 593.0.0 help for `gcloud pubsub subscriptions create`.
- Source: https://docs.cloud.google.com/pubsub/docs/subscription-properties (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [subscription-overview.md](./subscription-overview.md)
- [topic-properties.md](./topic-properties.md)
