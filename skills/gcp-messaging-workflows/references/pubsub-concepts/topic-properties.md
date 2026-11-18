---
source: https://docs.cloud.google.com/pubsub/docs/topic-properties
---

# Pub/Sub topic properties

Properties you can set when you create or update a topic: default subscription, schema, message retention duration, CMEK and single message transforms (SMTs).

## Signature / Usage

The source page has no code block. These are the gcloud help examples for `gcloud pubsub topics update`.

### Enable or update topic retention

```bash
gcloud pubsub topics update mytopic \
  --message-retention-duration=MESSAGE_RETENTION_DURATION
```

### Disable topic retention

```bash
gcloud pubsub topics update mytopic \
  --clear-message-retention-duration
```

### Protect message data with a Cloud KMS key (CMEK)

```bash
gcloud pubsub topics update mytopic \
  --topic-encryption-key=projects/PROJECT_ID/locations/\
KMS_LOCATION/keyRings/KEYRING/cryptoKeys/KEY
```

## Options / Props

| Property | Details |
|---|---|
| Add a default subscription | Subscription ID `-sub`; pull delivery type; message retention duration of seven days; expiration after 31 days of inactivity; acknowledgment deadline of 10 seconds; immediate retry policy. More subscriptions can be created after the topic exists. |
| Schema | A format the message data field must follow; a contract between publisher and subscriber that Pub/Sub enforces. Central authority for message types and permissions. |
| Message retention duration | How long the topic retains messages after publication. Default: not enabled. Minimum 10 minutes. Maximum 31 days. After it, Pub/Sub might discard the message regardless of acknowledgment state. Message storage fees are charged. |
| CMEK | Envelope encryption: Cloud KMS encrypts the Data Encryption Keys (DEKs) Pub/Sub creates for each topic, not the messages. Messages are encrypted with the newest DEK and decrypted shortly before delivery. Default is Google-owned and Google-managed keys. |
| Single Message Transforms (SMTs) | Lightweight modifications to message attributes and data inside Pub/Sub (cleaning, filtering, format conversion) before messages are published to the topic. |

## Notes

- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/pubsub/topics/update (gcloud 593.0.0 help).
- Shortening or clearing topic retention discards stored messages that later seeks could replay; try it on a disposable project first.
- Next steps named by the source: pull, push, BigQuery and Cloud Storage subscriptions.
- Source: https://docs.cloud.google.com/pubsub/docs/topic-properties (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [subscription-properties.md](./subscription-properties.md)
- [pubsub-basics.md](./pubsub-basics.md)
