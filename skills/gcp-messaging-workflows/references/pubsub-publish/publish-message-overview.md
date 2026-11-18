---
source: https://docs.cloud.google.com/pubsub/docs/publish-message-overview
---

# Pub/Sub publish workflow, topics and messages overview

A publisher application creates messages and sends them to a Pub/Sub topic; the service routes each message to every subscription attached to the topic. This page describes topics (standard and import), topic replication, the message format, and the publish workflow.

## Signature / Usage

### Message as sent by a client

`data` is base64-encoded when you use the REST API directly. With client libraries, pass `data` as a byte array (for example a Node.js `Buffer`); encode strings to bytes (for example UTF-8) first.

```json
{
  "data": "VGhpcyBpcyB0aGUgY29yZSBtZXNzYWdlIGNvbnRlbnQu",
  "attributes": {
    "category": "notification",
    "user_id": "12345",
    "priority": "medium"
  },
  "orderingKey": "12345"
}
```

### Message as received by a subscriber

The service adds `messageId` and `publishTime`.

Adapted (not in the official docs): the source block has an extra closing brace after `"orderingKey"`, which makes it invalid JSON; the stray `}` and the odd indentation of the last line are removed.

```json
{
  "data": "VGhpcyBpcyB0aGUgY29yZSBtZXNzYWdlIGNvbnRlbnQu",
  "attributes": {
    "category": "notification",
    "user_id": "12345",
    "priority": "medium"
  },
  "messageId": "19443130675731448",
  "publishTime": "2026-05-04T23:15:19.863Z",
  "orderingKey": "12345"
}
```

## Options / Props

### Message fields

| Field | Description |
|---|---|
| Message data | Core content; any text or binary data. REST API: must be base64-encoded. |
| Ordering key | Optional identifier of the entity whose messages must be ordered; messages with the same key are expected to be delivered in publish order. Only needed for ordered delivery. |
| Attributes | Optional key-value pairs usable for routing, filtering or enriching (for example timestamps or transaction IDs). |
| Message ID | Added by Pub/Sub; unique to the topic. |
| Publish timestamp | Added by Pub/Sub; when the service receives the message. |

### Topic kinds

| Kind | Description |
|---|---|
| Standard topic | Publishers send messages to it. |
| Import topic | Pub/Sub ingests streaming data from another source and acts as the publisher. Only a single ingestion source can be attached; you can still publish to it manually. Sources: Amazon Kinesis Data Streams, Cloud Storage, Azure Event Hubs, Amazon MSK, Confluent Cloud. |

## Notes

- Message fields: A message must contain either message data or at least one attribute.
- Topic data is stored in three zones: synchronous replication to at least two zones and best-effort replication to a third. Replication is within one region only.
- Publish workflow: create the message, select optional attributes, send the publish request; Pub/Sub stores the message, replicates it across zones, finds subscriptions matching the topic and delivers a copy to each. If a subscription has multiple subscribers, only one receives the message.
- Pub/Sub offers at-least-once delivery and best-effort ordering to existing subscribers; subscribers must be prepared for duplicates.
- Import topics are recommended for streaming data. For batch ingestion into BigQuery the source suggests BigQuery Data Transfer Service; for Cloud Storage, Storage Transfer Service.
- The source describes topic properties by pointing to the create-topic page.
- Corrected from the official docs: the source block for the received message ends with an extra `  }` / `}` after `"orderingKey": "12345"`; it is removed so the JSON is valid.
- Source: https://docs.cloud.google.com/pubsub/docs/publish-message-overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-topic.md](./create-topic.md)
- [publisher.md](./publisher.md)
