---
source: https://docs.cloud.google.com/logging/docs/structured-logging
---

# Structured logging

A `LogEntry` can store its payload as structured data (a JSON object in `jsonPayload`) or unstructured text (a string in `textPayload`). Structured payloads let you query by JSON paths in the Logs Explorer, query individual fields in Observability Analytics, and index specific fields to speed up queries; with unstructured logs you can only search the text string.

## Signature / Usage

### Write a structured entry with the gcloud CLI

Snippet taken from https://docs.cloud.google.com/logging/docs/write-query-log-entries-gcloud

```bash
gcloud logging write --payload-type=json my-test-log '{ "message": "My second entry", "weather": "partly cloudy"}'
```

Without `--payload-type=json` the payload is interpreted as unstructured data.

### How structured entries are written

- OpenTelemetry and the Telemetry (OTLP) API: OTLP log records sent to Logging have structured log data converted into `jsonPayload`.
- Built-in logging agents: in managed compute environments (such as GKE and Cloud Run), built-in agents parse single-line JSON written to `stdout` or `stderr` into `jsonPayload`.
- Ops Agent: on Compute Engine VMs it writes structured logs when it collects JSON logs or parses text logs.
- Logging client libraries: write structured logs when you pass a JSON object or map as the payload, or when they output single-line JSON to `stdout` or `stderr`.
- Google Cloud CLI or the Logging API: `gcloud logging write` with `--payload-type=json`, or the `entries.write` method with a `jsonPayload` object.
- BindPlane: sends logs with JSON payloads from on-premises or hybrid sources.

## Options / Props

### Special JSON keys recognized by built-in logging agents

| JSON key | `LogEntry` field set |
|---|---|
| `severity` | `LogEntry.severity` |
| `message` | The main log message displayed in the Logs Explorer |
| `httpRequest` | `LogEntry.httpRequest` |
| `time` or `timestamp` (or `timestampSeconds` and `timestampNanos`) | `LogEntry.timestamp` |
| `logging.googleapis.com/insertId` | `LogEntry.insertId` |
| `logging.googleapis.com/labels` | User-defined `LogEntry.labels` key-value pairs |
| `logging.googleapis.com/operation` | `LogEntry.operation` |
| `logging.googleapis.com/sourceLocation` | `LogEntry.sourceLocation` |
| `logging.googleapis.com/trace`, `logging.googleapis.com/spanId`, `logging.googleapis.com/trace_sampled` | `trace`, `spanId`, `traceSampled` (for linking logs with traces) |

## Notes

- Special JSON keys recognized by built-in logging agents: On GKE, Cloud Run, Cloud Run functions, and App Engine, the built-in agent moves these top-level JSON keys (from `stdout` / `stderr`) into `LogEntry` fields. Remaining fields stay in `LogEntry.jsonPayload`.
- Ops Agent: the JSON fields mapped automatically with the `parse_json` processor or the `tcp` and `fluent_forward` receivers are listed under "Special fields in structured payloads" in the Ops Agent configuration page.
- OpenTelemetry: see the "OTLP log record to log entry mapping" page (https://docs.cloud.google.com/stackdriver/docs/reference/telemetry/otlp-log-record-to-log-entry).
- Cloud Logging is the log backend; the `pino` skill covers the pino logger itself (Cloud Logging reads its JSON from stdout only when the fields match the special fields listed here).
- Do not put credentials, tokens, or request headers in log payloads.
- Source: https://docs.cloud.google.com/logging/docs/structured-logging (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [log-entry-data-model.md](./log-entry-data-model.md)
- [agent-or-library.md](./agent-or-library.md)
- [correlate-logs.md](./correlate-logs.md)
