---
source: https://docs.cloud.google.com/pubsub/docs/smts/smts-overview
---

# Single Message Transforms (SMTs) Overview

Single Message Transforms (SMTs) let you make lightweight changes to message data and attributes directly inside Pub/Sub, on a topic or on a subscription, without a separate transformation product. An SMT takes a Pub/Sub message (data and attributes) and outputs a transformed message. SMTs are part of the Pub/Sub API and are managed as part of topic or subscription configuration.

## Signature / Usage

SMTs are attached with a definition file passed to `--message-transforms-file`.

```bash
gcloud pubsub topics create TOPIC_ID \
  --message-transforms-file=TRANSFORMS_FILE
```

### Message flow with topic and subscription SMTs

1. Publishers publish messages to the topic.
2. The topic's SMTs transform the messages.
3. If a schema is attached to the topic, the transformed messages are validated against it. A message that does not match fails to publish with an error.
4. Transformed messages are written to Pub/Sub storage.
5. Pub/Sub delivers them to all attached subscriptions.
6. If a subscription has a filter, messages are evaluated against it; only matching messages proceed and the others are automatically acknowledged.
7. The subscription's SMTs transform the messages (an SMT can also filter a message out).
8. If the subscription is a push subscription with payload unwrapping enabled, the messages are unwrapped.
9. Subscribers receive the messages and acknowledge them; Pub/Sub deletes acknowledged messages from storage.

## Options / Props

### Types of SMTs

| Type | Description |
|------|-------------|
| AI Inference | Gets inferences on Pub/Sub messages from an Agent Platform model. |
| User Defined Functions | Calls a JavaScript user-defined function (UDF) for custom transformations. |

### Limitations

| Limit | Value |
|-------|-------|
| SMTs per topic or subscription | Up to 5 |
| Scope | One Pub/Sub message at a time; SMTs cannot aggregate multiple messages. |

## Notes

- Use cases named in the source: data masking and redaction (for example PII, credit card numbers), data format conversion, message filtering (more complex conditions than the built-in subscription filters), simple transformations (string, date formatting, math), and AI inferences through the AI Inference SMT.
- Topic SMTs run before the message is stored and apply to all subscribers; subscription SMTs run before delivery and apply only to that subscription (see `udfs-overview.md`).
- Snippet taken from https://docs.cloud.google.com/pubsub/docs/smts/udfs-overview (the source page of this overview has no code).
- Source: https://docs.cloud.google.com/pubsub/docs/smts/smts-overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [udfs-overview.md](./udfs-overview.md)
- [create-cloud-storage-import-topic.md](./create-cloud-storage-import-topic.md)
- [create-amazon-msk-import-topic.md](./create-amazon-msk-import-topic.md)
