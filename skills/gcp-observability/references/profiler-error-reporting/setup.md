---
source: https://docs.cloud.google.com/error-reporting/docs/setup
---

# Collect error events by using Error Reporting

Error data reaches Error Reporting through automatic log collection, client libraries, or the REST APIs (Error Reporting API `report` or Cloud Logging API `write`). Error Reporting is a global service built on Cloud Logging.

## Signature / Usage

### Log written by the Error Reporting API

Calls to `report` generate properly formatted log entries in this log:

Adapted (not in the official docs): added the missing `/logs/` segment to the log name.

```text
projects/PROJECT_ID/logs/clouderrorreporting.googleapis.com%2Freported_errors
```

## Options / Props

### Ways to collect error data

| Method | Description |
|---|---|
| Automatic log collection | Supported compute environments send error data to Cloud Logging for analysis; for example Cloud Run sends exceptions written to `stderr` to Logging |
| Client libraries | Language-specific libraries send error reports directly from the app (Go, Java, .NET, Node.js, Python, PHP, Ruby) |
| REST APIs | Error Reporting API method `report` (body is a `ReportedErrorEvent`) or Logging API method `write` (the `LogEntry` must include a stack trace or a `ReportedErrorEvent` object) |

### Environments with automatic reporting guides

| Environment |
|---|
| App Engine flexible environment |
| App Engine standard environment |
| Apps Script |
| Cloud Run functions |
| Cloud Run |
| Compute Engine |
| Google Kubernetes Engine |
| Amazon EC2 |

### Conditions for analyzing log entries

| Condition |
|---|
| Assured Workloads are disabled |
| CMEK is disabled on all log buckets that store the log entry (Error Reporting can't store log entries in CMEK-enabled buckets) |
| The log bucket is in the project where the entries originated, or entries were routed to a project that stored them in a log bucket it owns |

## Notes

- API key-based authentication requires the Error Reporting API `report` method.
- `report` calls create log entries, so Cloud Logging ingestion costs might apply; control ingestion with exclusion filters (excluded entries are not stored in the bucket).
- VPC Service Controls support Error Reporting; a service perimeter reduces data exfiltration risk.
- Per-language setup pages in this category: [setup-python.md](./setup-python.md) and [setup-nodejs.md](./setup-nodejs.md). The other languages are not included (the source also links Go, Java, .NET, PHP and Ruby guides).
- Corrected from the official docs: the log name was written `projects/PROJECT_ID/clouderrorreporting.googleapis.com%2Freported_errors`, without the `/logs/` segment; the Logging API Discovery document defines `LogEntry.logName` as "projects/[PROJECT_ID]/logs/[LOG_ID]" with `[LOG_ID]` URL-encoded, so the name is `projects/PROJECT_ID/logs/clouderrorreporting.googleapis.com%2Freported_errors`.
- Source: https://docs.cloud.google.com/error-reporting/docs/setup (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [setup-python.md](./setup-python.md)
- [formatting-error-messages.md](./formatting-error-messages.md)
- [grouping-errors.md](./grouping-errors.md)
- [troubleshooting.md](./troubleshooting.md)
