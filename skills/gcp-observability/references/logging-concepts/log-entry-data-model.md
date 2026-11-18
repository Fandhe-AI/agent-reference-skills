---
source: https://docs.cloud.google.com/logging/docs/log-entry-data-model
---

# Log entry data model

The Cloud Logging data model specifies the format in which log data is stored and the dimensions over which you can query it. A log is a named collection of entries that conform to the `LogEntry` structure.

## Signature / Usage

### Minimal content of a log entry

A log entry minimally consists of:

- A timestamp: when the event took place, or when it was received by Cloud Logging.
- The monitored resource that is the source of the entry (for example a Compute Engine instance or a GKE container).
- A payload, which must be one of `textPayload`, `jsonPayload` or `protoPayload`.
- The name of the log it belongs to (full resource path followed by an identifier), for example `projects/my-project/logs/stdout` or `projects/my-project/logs/compute.googleapis.com%2Factivity`.

You can query entries whose `LogEntry` field matches criteria, for example entries whose `severity` is `ERROR`.

### Example of entries as returned by `gcloud logging read`

Snippet taken from https://docs.cloud.google.com/logging/docs/write-query-log-entries-gcloud

```text
---
insertId: jpj9zjf73t1mn
jsonPayload:
  message: My second entry
  weather: partly cloudy
logName: projects/myloggingproject/logs/my-test-log
receiveTimestamp: '2018-11-01T18:39:31.114507977Z'
resource:
  labels:
    project_id: myloggingproject
  type: global
timestamp: '2018-11-01T18:39:31.114507977Z'
---
insertId: vd4m1if7h7u1a
logName: projects/myloggingproject/logs/my-test-log
receiveTimestamp: '2018-11-01T18:39:19.718100792Z'
resource:
  labels:
    project_id: myloggingproject
  type: global
textPayload: A simple entry
timestamp: '2018-11-01T18:39:19.718100792Z'
```

## Options / Props

### Payload types

| Field | Description |
|---|---|
| `textPayload` | Formatted as a single string. |
| `jsonPayload` | Structured, so you can query by key-value pairs. Applications should always write structured log data. |
| `protoPayload` | Follows the format of a proto file; fields are formatted as JSON. |

### Where entries are stored

| Bucket | Log entry types |
|---|---|
| `_Required` (in the project, billing account, folder, or organization in which they originate) | Admin Activity audit logs; System Event audit logs; Google Workspace Admin Audit logs; Enterprise Groups Audit logs; Login Audit logs; Access Transparency logs |
| `_Default` | All other log entries that originate in the project, billing account, folder, or organization. You can change which entries are stored in this bucket. |

## Notes

- Audit logs and Access Transparency logs provide information necessary to satisfy compliance regulations. Audit logs cover administrative activities and accesses within your resources; Access Transparency logs record actions taken by Google Cloud staff when accessing your content.
- The list of monitored resource types is on the "Monitored resources and services" page of the Logging documentation.
- Entries in `jsonPayload` may carry personal data or secrets; do not log credentials.
- Source: https://docs.cloud.google.com/logging/docs/log-entry-data-model (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Corrected from the official docs: the source's second log-name example is `projects/my-project/compute.googleapis.com/activity`, which lacks the `/logs/` segment and the URL-encoded `/` (`%2F`) in the log ID; the example uses the `LogEntry.logName` format `projects/PROJECT_ID/logs/LOG_ID`.

## Related

- [structured-logging.md](./structured-logging.md)
- [store-log-entries.md](./store-log-entries.md)
- [overview.md](./overview.md)
