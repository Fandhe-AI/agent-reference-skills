---
source: https://docs.cloud.google.com/stackdriver/docs/otlp-logs/write-logs-to-api
---

# Write OTLP-formatted logs to the Telemetry API

Send OTLP log records with `curl` to the logging endpoint of the Telemetry (OTLP) API, `telemetry.googleapis.com`, and read the resulting log entries with `gcloud logging read` or Logs Explorer.

## Signature / Usage

### Set up and enable APIs

```bash
export GOOGLE_CLOUD_PROJECT=PROJECT_ID

gcloud auth login
gcloud config set project PROJECT_ID
```

```bash
gcloud services enable logging.googleapis.com
gcloud services enable telemetry.googleapis.com
```

### Simple OTLP log (JSON file)

Adapted (not in the official docs): removed trailing commas that make the source JSON invalid.

```json
{
  "resourceLogs": [
    {
      "resource": {
        "attributes": [
          {"key": "gcp.project_id", "value": {"stringValue": "PROJECT_ID"}},
          {"key": "cloud.platform", "value": {"stringValue": "gcp_compute_engine"}},
          {"key": "zone", "value": {"stringValue": "us-central1"}},
          {"key": "instance_id", "value": {"stringValue": "12345"}}
        ]
      },
      "scopeLogs": [
      {
        "logRecords": [
          { "eventName": "otlp-test-log",
            "body": { "stringValue": "This is a trivial log message." }
          }
        ]
      }
      ]
    }
  ]
}
```

### More complex OTLP log (two records)

Adapted (not in the official docs): removed trailing commas that make the source JSON invalid.

```json
{
  "resourceLogs": [
    {
      "resource": {
        "attributes": [
          {"key": "gcp.project_id", "value": {"stringValue": "PROJECT_ID"}},
          {"key": "cloud.platform", "value": {"stringValue": "gcp_compute_engine"}},
          {"key": "zone", "value": {"stringValue": "us-central1"}},
          {"key": "instance_id", "value": {"stringValue": "12345"}}
        ]
      },
      "scopeLogs": [
      {
        "logRecords": [
          { "eventName": "otlp-test-log",
            "severityText": "INFO",
            "body": { "stringValue": "This is an informational message." },
            "attributes": [
              {"key": "string.attribute",
               "value": { "stringValue": "Here's some general info."}},
              {"key": "int.attribute",
               "value": { "intValue": "666"}},
              {"key": "double.attribute",
               "value": { "doubleValue": "3.14159"}},
              {"key": "boolean.attribute",
               "value": { "boolValue": true}}
            ]
          },
          { "eventName": "otlp-test-log",
            "severityText": "DEBUG",
            "body": { "stringValue": "This is a debug message." },
            "attributes": [
              {"key": "string.attribute",
               "value": { "stringValue": "Here's some debug info."}},
              {"key": "int.attribute",
               "value": { "intValue": "42"}},
              {"key": "double.attribute",
               "value": { "doubleValue": "6373.392"}},
              {"key": "boolean.attribute",
               "value": { "boolValue": false}}
            ]
          }
        ]
      }
      ]
    }
  ]
}
```

### Send the log

Adapted (not in the official docs): the source uses `${PROJECT_ID}`, which is never set in the page (only `GOOGLE_CLOUD_PROJECT` is exported); changed to `"${GOOGLE_CLOUD_PROJECT}"` and quoted. Replace `OTLP_LOG_JSON_FILE` with your file name.

```bash
curl -i -X POST -H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" -H "X-Goog-User-Project: ${GOOGLE_CLOUD_PROJECT}" \
-d @OTLP_LOG_JSON_FILE \
"https://telemetry.googleapis.com/v1/logs"
```

Success is HTTP 200 with an empty `{}` response body.

### Read the entries

```bash
gcloud logging read "LOG_ID(otlp-test-log)" --freshness=5m --format=json
```

Logs Explorer query:

```text
LOG_ID(otlp-test-log)
```

Resulting simple log entry:

```json
[
  {
    "insertId": "1yt9bu7a0",
    "logName": "projects/PROJECT_ID/logs/otlp-test-log",
    "otel": {
      "resource": {
        "attributes": {
          "cloud.platform": "gcp_compute_engine",
          "gcp.project_id": "PROJECT_ID",
          "instance_id": "12345",
          "zone": "us-central1"
        }
      }
    },
    "receiveTimestamp": "2026-03-18T20:17:00.128801819Z",
    "resource": {
      "labels": {
        "instance_id": "12345",
        "project_id": "PROJECT_ID",
        "zone": "us-central1"
      },
      "type": "gce_instance"
    },
    "textPayload": "This is a trivial log message.",
    "timestamp": "2026-03-18T20:17:00.128801819Z"
  }
]
```

## Options / Props

### Required IAM roles

| Role | Scope |
|---|---|
| `roles/logging.viewer` (Logs Viewer) | project |
| `roles/logging.logWriter` (Logs Writer) | project |
| `roles/serviceusage.serviceUsageConsumer` (Service Usage Consumer) | quota project |

### Mapping behavior

| Item | Result |
|---|---|
| Each `logRecord` in `scopeLogs` | One Cloud Logging log entry |
| Log name | Named for the `eventName` of the OTLP record (`projects/PROJECT_ID/logs/otlp-test-log`) |
| Sample resource type | `gce_instance` |
| OTLP `severityText` | `severity` of the entry |
| OTLP attributes | Entry `labels` |

## Notes

- Clean up: delete a newly created project if you no longer need it (this removes all its data; try with a disposable project).
- Do not put credentials in the log `body` or `attributes`; log entries are readable by anyone with the Logs Viewer role on the project.
- Quota project setup is described at https://docs.cloud.google.com/docs/quotas/set-quota-project.
- The twin also shows the multi-record log entry output and Logs Explorer Console steps; the other output of `curl -i` (response headers) is omitted.
- Cloud Logging is the log backend here; the `pino` skill covers the pino logger itself.
- Source: https://docs.cloud.google.com/stackdriver/docs/otlp-logs/write-logs-to-api (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Corrected from the official docs: trailing commas after `{"key": "instance_id", ...},` and `"body": {...},` removed; `${PROJECT_ID}` replaced by `"${GOOGLE_CLOUD_PROJECT}"`.

## Related

- [otlp-overview.md](./otlp-overview.md)
- [migrate-collector-to-otlp-exporters.md](./migrate-collector-to-otlp-exporters.md)
