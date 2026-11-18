---
source: https://docs.cloud.google.com/trace/docs/trace-log-integration
---

# Trace and log integration

Correlate Cloud Logging entries with traces and spans by setting the `trace`, `spanId` and `traceSampled` fields of a `LogEntry`, manually or through Logging client libraries.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/trace/docs/trace-context: the fallback header from which libraries can populate trace fields.

```text
X-Cloud-Trace-Context: TRACE_ID/SPAN_ID;o=OPTIONS
```

## Options / Props

| LogEntry field | Value |
|---|---|
| `trace` | Preferred format: `TRACE_ID`. Legacy format: `projects/PROJECT_ID/traces/TRACE_ID`. |
| `spanId` | 16-character hexadecimal encoding of the span ID; for span ID `74` use `000000000000004a`. |
| `traceSampled` | Set to indicate trace sampling is used and the trace was sampled for storage when the entry was written. |

### Permissions to view logs

| Goal | Permission | Roles providing it |
|---|---|---|
| View any log entries | `logging.logEntries.list` in the project | Logs Viewer, Project Viewer |
| View VM instance logs | `compute.instances.get` in the project | Compute Engine Network Viewer, Project Viewer |

## Notes

- Applies to entries written with the Cloud Logging API or structured logs; for how the Ops Agent maps structured payloads to LogEntry fields see special fields in structured payloads in the Ops Agent configuration. Cloud Logging is the log backend; the `pino` skill covers the pino logger itself.
- Logging client libraries set the fields automatically in some cases: from an active OpenTelemetry span's context, or from the W3C `traceparent` or `X-Cloud-Trace-Context` of an HTTP request. Values set manually take precedence over automatic ones. Language docs exist for Go, Java, Node.js and Python.
- With trace sampling, a log entry can exist although the trace itself was not captured.
- In Logs Explorer opened from a trace, the time range is restricted to the trace's timestamps; "No entries found matching current filter" appears when none exist. In the trace details pane, Show logs is absent when no entries are available.
- Source: https://docs.cloud.google.com/trace/docs/trace-log-integration (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/trace/docs/trace-context (retrieved 2026-11-18).

## Related

- [finding-traces.md](./finding-traces.md)
- [trace-context.md](./trace-context.md)
