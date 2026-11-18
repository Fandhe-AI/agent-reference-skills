---
source: https://docs.cloud.google.com/logging/docs/export/using_exported_logs
---

# View logs routed to log buckets

Find log entries that sinks routed to Cloud Logging log buckets. Routed entries are available immediately. View them in the Logs Explorer by log view, or analyze them in Observability Analytics when the bucket is upgraded.

## Signature / Usage

Sample `syslog` entry of a Compute Engine instance (a `jsonPayload` entry):

```text
{
  insertId: "4zymupf98ac6v"
  jsonPayload: {
    message: "Jul 15 13:36:33 my-instance dhclient[328]: DHCPACK of 10.240.0.48 from 169.254.169.254"
  }
  logName: "projects/my-gcp-project-id/logs/syslog"
  receiveTimestamp: "2024-07-15T13:36:33.400534415Z"
  resource: {
    labels: {
      instance_id: "0123456789" (instance_name: my-instance)
      project_id: "my-gcp-project-id"
      zone: "us-central1-a"
    }
    type: "gce_instance"
  }
  timestamp: "2024-07-15T13:36:33.097822178Z"
}
```

Sample `activity` log (Admin Activity audit log; payload is an `AuditLog`):

```text
{
  insertId: "dlu8qwc69c"
  labels: {
    compute.googleapis.com/root_trigger_id: "a97f30b1-45ab-4c12-9309-8e8af3bb011f"
  }
  logName: "projects/my-gcp-project-id/logs/cloudaudit.googleapis.com%2Factivity"
  operation: {
    id: "operation-1721047950764-61d48b3bf2b65-1ba1f256-82e9b5fd"
    last: true
    producer: "compute.googleapis.com"
  }
  protoPayload: {
    @type: "type.googleapis.com/google.cloud.audit.AuditLog"
    authenticationInfo: {...}
    methodName: "v1.compute.instances.insert"
    request: {...}
    requestMetadata: {...}
    resourceName: "projects/my-gcp-project-id/zones/us-central1-f/instances/my-instance"
    serviceName: "compute.googleapis.com"
  }
  receiveTimestamp: "2024-07-15T12:52:41.376292847Z"
  resource: {
  labels: {
    instance_id: "2891866457752773984" (instance_name: my-instance)
    project_id: "my-gcp-project-id"
    zone: "us-central1-f"
    }
    type: "gce_instance"
  }
  severity: "NOTICE"
  timestamp: "2024-07-15T12:52:40.965840Z"
}
```

## Options / Props

### Where to view routed logs

| Interface | Steps |
|---|---|
| Logs Explorer | Action toolbar > Refine scope > Log view > select one or more log views > Apply |
| Observability Analytics (bucket upgraded to use it) | Log views list > select Query on the view (default query is filled in) > Run query; use the `_AllLogs` view to query every log in the bucket |

### Other log entry facts

| Item | Description |
|---|---|
| Entry type | `LogEntry` objects; entries with the same `LOG_ID` usually have the same format |
| `errorGroups` field | Set by Logging when an entry is stored in a log bucket; links to an Error Reporting error group |
| App Engine `request_log` | `protoPayload` of type `RequestLog`; log name `appengine.googleapis.com%2Frequest_log` |

## Notes

- The `request_log` sample in the source is not reproduced because it contains `...` and `{n}` placeholders; the `activity` sample keeps the source's `{...}` elisions, so it isn't valid JSON (and, like the syslog sample, is shown as Cloud Logging's display form). Treat both as illustrations.
- Audit and request payloads, `httpRequest` fields and Data Access logs can contain personal data; don't log credentials.
- For missing logs at a sink destination see Troubleshoot routing and sinks. For pricing see the Google Cloud Observability pricing page and the Cloud Storage, BigQuery and Pub/Sub pricing pages if you route there.
- Logs routed to Cloud Storage, BigQuery and Pub/Sub are covered by separate "View logs routed to ..." pages.
- Source: https://docs.cloud.google.com/logging/docs/export/using_exported_logs (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [configure-export-v2.md](./configure-export-v2.md)
