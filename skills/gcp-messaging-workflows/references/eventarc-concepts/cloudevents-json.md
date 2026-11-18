---
source: https://docs.cloud.google.com/eventarc/docs/cloudevents-json
---

# CloudEvents JSON format

The destination service (for example Workflows) converts the received CloudEvent to a JSON object following the JSON Event Format for CloudEvents version 1.0.1 and passes it into the workflow execution as a runtime argument. CloudEvents is the CNCF specification; Eventarc is the Google Cloud router that delivers events in it.

## Signature / Usage

### Pub/Sub event (`google.cloud.pubsub.topic.v1.messagePublished`)

```text
{
  "data":{ EVENT_DATA },
  "datacontenttype": "application/json; charset=utf-8",
  "id": "MESSAGE_ID",
  "source": "//pubsub.googleapis.com/TOPIC_NAME",
  "specversion": "1.0",
  "type": "google.cloud.pubsub.topic.v1.messagePublished",
  "time": "EVENT_GENERATION_TIME"
}
```

- `EVENT_DATA`: the decoded message content in JSON format.
- `MESSAGE_ID`, `EVENT_GENERATION_TIME`: system-generated.
- `TOPIC_NAME`: the Pub/Sub topic name to which the event was published.

The `data` field of a Pub/Sub event holds a push message with the message as a Base64-encoded string, for example:

```json
{ "subscription": "projects/my-project/subscriptions/my-sub", "message": { "attributes": { "attr1":"attr1-value" }, "data": "aGVsbG8gd29ybGQ=", "messageId": "2070443601311540", "publishTime":"2021-02-26T19:13:55.749Z" } }
```

### Cloud Audit Logs event (`google.cloud.audit.log.v1.written`)

```text
{
  "data":{ EVENT_DATA },
  "datacontenttype": "application/json; charset=utf-8",
  "id": "MESSAGE_ID",
  "source": "//cloudaudit.googleapis.com/projects/PROJECT_ID/logs/data_access",
  "specversion": "1.0",
  "type": "google.cloud.audit.log.v1.written",
  "time": "EVENT_GENERATION_TIME",
  "dataschema": "https://googleapis.github.io/google-cloudevents/jsonschema/google/events/cloud/audit/v1/LogEntryData.json",
  "methodName": "jobservice.jobcompleted",
  "resourceName": "projects/my-project/jobs/bqjob_r3ac45813612fa2d6_0000017d591922c9_1",
  "serviceName": "bigquery.googleapis.com",
  "subject": "bigquery.googleapis.com/projects/my-project/jobs/bqjob_r3ac45813612fa2d6_0000017d591922c9_1"
}
```

- `PROJECT_ID`: your Google Cloud project ID.
- `dataschema`, `methodName`, `resourceName`, `serviceName`, `subject`: attributes specific to the event type.

### Cloud Storage event (`google.cloud.storage.object.v1.finalized`)

```text
{
  "data":{ EVENT_DATA },
  "datacontenttype": "application/json",
  "id": "MESSAGE_ID",
  "source": "//storage.googleapis.com/projects/_/buckets/BUCKET_NAME",
  "specversion": "1.0",
  "type": "google.cloud.storage.object.v1.finalized",
  "time": "EVENT_GENERATION_TIME",
  "subject": "objects/my-file.txt"
}
```

- `BUCKET_NAME`: the name of the Cloud Storage bucket that gets updated.
- `subject`: attribute specific to the event type.

## Options / Props

### CloudEvents attributes

| Attribute | Description | Example |
|---|---|---|
| data | The payload of the event data | see the Pub/Sub `data` example above |
| datacontenttype | The type of data that has been passed | `application/json` |
| id | The unique identifier for the event | `2070443601311540` |
| source | The source of the event | `//pubsub.googleapis.com/projects/my-project/topics/my-topic` |
| specversion | The CloudEvents specification version used for this event | `1.0` |
| type | The type of event data | `google.cloud.pubsub.topic.v1.messagePublished` |
| time | Event generation time, in RFC 3339 format (optional) | `2020-12-20T13:37:33.647Z` |

## Notes

- The first three templates use the upper-case placeholder `EVENT_DATA` as a JSON object (`{ EVENT_DATA }`), so they are not literal JSON and are tagged `text`. `EVENT_DATA` is the decoded message content in JSON format; the other upper-case names are placeholders; system-generated values are `MESSAGE_ID` and `EVENT_GENERATION_TIME`.
- Audit log runtime arguments contain `resourceName`, `serviceName`, and `methodName` for trigger filters. Cloud Storage runtime arguments are changes to a bucket.
- The `data` example is the source's single-line JSON from the attributes table.
- Protobuf messages per provider (Cloud Audit Logs `AuditLogWrittenEvent` / `LogEntryData`, Cloud Storage `ObjectFinalizedEvent` etc. / `StorageObjectData`, Firestore `Document*Event` / `DocumentEventData`, Pub/Sub `MessagePublishedEvent` / `MessagePublishedData`) are listed in cloudevents.md; the structure of every event body is in https://github.com/googleapis/google-cloudevents.
- Source: https://docs.cloud.google.com/eventarc/docs/cloudevents-json (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [cloudevents.md](./cloudevents.md)
- [event-types.md](./event-types.md)
