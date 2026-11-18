---
source: https://docs.cloud.google.com/logging/docs/view/correlate-logs
---

# Correlate log entries by trace

In the Logs Explorer you can group log entries that share a trace, so child entries appear nested under their parent request log entry. Correlation works on the `trace` field of the `LogEntry`.

## Signature / Usage

### `trace` field formats

The `trace` field must be a string in one of these forms (`PROJECT_ID` is your project ID, `TRACE_ID` the trace ID):

```text
TRACE_ID
```

```text
projects/PROJECT_ID/traces/TRACE_ID
```

### View correlated entries

In the Logs Explorer, choose the parent log name in the **Correlate by** menu (for example `request_log` for App Engine), then expand a parent entry to see its children. If none appear, no other entries in the query's time range share that trace ID. You can add a search term (for example `"app log message"`) to filter the correlated entries.

## Options / Props

### Correlation requirements

| Requirement |
|---|
| The `trace` field is set in one of the two formats above |
| The `trace` value is the same across all log entries |
| Each log entry has a different `logName` value |
| The timestamp of the parent entry is no later than that of any child entry |

### Roles

| Role | Access |
|---|---|
| Logs Viewer (`roles/logging.viewer`) on project, folder, or organization | Entries in `_Required` and the `_Default` view on `_Default`; select a log scope |
| Private Logs Viewer (`roles/logging.privateLogViewer`) on project, folder, or organization | All entries in `_Required` and `_Default` |

## Notes

- With OpenTelemetry instrumentation, trace and span IDs are extracted from the trace context and included in OTLP log data; Google Cloud exporters also extract them. You can also set `trace` manually.
- App Engine standard environment, Cloud Run functions, and Cloud Run capture trace data and write entries that include it. Compute Engine and GKE include trace data when using the Ops Agent or the OpenTelemetry Collector.
- OpenTelemetry tracing in Google Cloud is not the tracing of the OpenAI Agents SDK (`openai-agents`) or the Vercel AI SDK telemetry (`vercel-ai-sdk`).
- Source: https://docs.cloud.google.com/logging/docs/view/correlate-logs (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [structured-logging.md](./structured-logging.md)
- [log-entry-data-model.md](./log-entry-data-model.md)
