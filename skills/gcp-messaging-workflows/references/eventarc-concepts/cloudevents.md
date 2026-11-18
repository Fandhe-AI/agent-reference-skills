---
source: https://docs.cloud.google.com/eventarc/docs/cloudevents
---

# CloudEvents HTTP format

Eventarc delivers events to the receiver as HTTP POST requests formatted to the CloudEvents version 1.0 HTTP protocol binding, sent to the root URL path (`/`) of the service. CloudEvents (cloudevents.io) is a CNCF specification for describing event data in a common way; Eventarc is the Google Cloud router that delivers events in that format.

## Signature / Usage

### Cloud Audit Logs headers (`google.cloud.audit.log.v1.written`)

```text
ce-specversion: 1.0
ce-type: google.cloud.audit.log.v1.written
ce-source: //SERVICE_NAME/projects/PROJECT_ID
ce-id: MESSAGE_ID
ce-time: PUBLISH_TIME
Content-Type: application/json; charset=utf-8
Content-Length: CONTENT_LENGTH
```

- `SERVICE_NAME`: the Google API URI for the service issuing the event; for example, `bigquery.googleapis.com` for events from BigQuery.
- `PROJECT_ID`: your Google Cloud project ID.
- `MESSAGE_ID`, `PUBLISH_TIME`, `CONTENT_LENGTH`: system-generated.

The body is a JSON object detailing the audit log event; `protoPayload` holds `resourceName`, `serviceName`, and `methodName`.

### Pub/Sub headers (`google.cloud.pubsub.topic.v1.messagePublished`)

```text
ce-specversion: 1.0
ce-type: google.cloud.pubsub.topic.v1.messagePublished
ce-source: //pubsub.googleapis.com/TOPIC
ce-id: MESSAGE_ID
ce-time: PUBLISH_TIME
Content-Type: application/json; charset=utf-8
Content-Length: CONTENT_LENGTH
```

- `TOPIC`: the Pub/Sub topic the event was published to.
- `MESSAGE_ID`, `PUBLISH_TIME`, `CONTENT_LENGTH`: system-generated.

The body is a Pub/Sub push message; the `data` field holds the message as a Base64-encoded string.

## Options / Props

### CloudEvents HTTP headers on all events

| Header | Description | Example |
|---|---|---|
| ce-id | Unique identifier for the event | `1096434104173400` |
| ce-source | Identifies the source of the event | `//pubsub.googleapis.com/projects/my-project/topics/my-topic` |
| ce-specversion | The CloudEvents specification version used for this event | `1.0` |
| ce-type | The type of event data | `google.cloud.pubsub.topic.v1.messagePublished` |
| ce-time | Event generation time, in RFC 3339 format (optional) | `2020-12-20T13:37:33.647Z` |

### Common events (protobuf messages)

| Provider | Envelope message(s) | Data message | Event type(s) | Extensions |
|---|---|---|---|---|
| Cloud Audit Logs | `google.events.cloud.audit.v1.AuditLogWrittenEvent` | `google.events.cloud.audit.v1.LogEntryData` | `google.cloud.audit.log.v1.written` | `serviceName`, `methodName`, `resourceName` |
| Cloud Storage | `google.events.cloud.storage.v1.ObjectFinalizedEvent`, `ObjectArchivedEvent`, `ObjectDeletedEvent`, `ObjectMetadataUpdatedEvent` | `google.events.cloud.storage.v1.StorageObjectData` | see direct event types | — |
| Firestore | `google.events.cloud.firestore.v1.DocumentCreatedEvent`, `DocumentUpdatedEvent`, `DocumentDeletedEvent`, `DocumentWrittenEvent` | `google.events.cloud.firestore.v1.DocumentEventData` | see direct event types | — |
| Pub/Sub | `google.events.cloud.pubsub.v1.MessagePublishedEvent` | `google.events.cloud.pubsub.v1.MessagePublishedData` | `google.cloud.pubsub.topic.v1.messagePublished` | — |

## Notes

- Eventarc may apply backwards-compatible changes: optional filtering attributes, output-only attributes, or optional fields in the event payload.
- Two protobuf messages exist per CloudEvent type: the envelope (complete CloudEvent including extension attributes) and the data message. Many types share a data message (every Cloud Storage object event uses `StorageObjectData`); each envelope names its CloudEvent type through a proto annotation.
- Proto files: `google/events/cloud/{audit,storage,firestore,pubsub}/v1/events.proto` and `data.proto` in https://github.com/googleapis/google-cloudevents (also generated JSON schemas and a public JSON schema catalog).
- Resource references: Cloud Storage `Objects`, Firestore `Document`, Pub/Sub `PubsubMessage`.
- Workflows destinations receive the JSON form instead; see cloudevents-json.md.
- Source: https://docs.cloud.google.com/eventarc/docs/cloudevents (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [cloudevents-json.md](./cloudevents-json.md)
- [event-types.md](./event-types.md)
- [eventarc-standard-overview.md](./eventarc-standard-overview.md)
