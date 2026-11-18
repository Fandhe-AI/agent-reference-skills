---
source: https://docs.cloud.google.com/trace/docs/analytics-migrate
---

# Migrate from trace sinks to Observability Analytics

Trace sinks are deprecated and will be removed on or after February 18, 2027. Observability Analytics queries trace data directly with the same SQL as BigQuery, without export sinks; a linked BigQuery dataset can be created during or after migration.

## Signature / Usage

### Verify access to trace data

In Observability Analytics select the view `_Trace.Spans._AllSpans` in the Traces section of the Views menu. The FROM clause looks like:

```text
`PROJECT_ID.us._Trace.Spans._AllSpans`
```

### Delete trace sinks

The `trace` gcloud group exists only on the alpha track in gcloud 593.0.0.

```bash
gcloud alpha trace sinks list
```

```bash
gcloud alpha trace sinks delete SINK_NAME
```

## Options / Props

### Roles needed on the project

| Role | ID |
|---|---|
| Cloud Trace Admin | `roles/cloudtrace.admin` |
| Observability Editor | `roles/observability.editor` |
| BigQuery User | `roles/bigquery.user` |

### Schema comparison

| Name | Analytics | Legacy |
|---|---|---|
| Trace ID | `trace_id` | `extendedFields.traceId` |
| Span ID | `span_id` | `span.spanId` |
| Parent span ID | `parent_span_id` | `span.parentSpanId` |
| Span name | `name` | `span.displayName.value` |
| Span kind | `kind` (OpenTelemetry SpanKind) | `span.spanKind` (Cloud Trace API SpanKind) |
| Span start time | `start_time` | `span.startTime` |
| Span end time | `end_time` | `span.endTime` |
| Attributes | BigQuery JSON type: `attributes["somekey"]`, `resource.attributes["somekey"]`, `instrumentation_scope.attributes["somekey"]` | `span.attributes.attributeMap.ATTRIBUTE_KEY`, for example `span.attributes.attributeMap._http_method` |

## Notes

- Deprecated: "Trace sinks are deprecated and will be removed on or after February 18, 2027." Both commands are alpha: `gcloud alpha trace sinks list` / `delete` (gcloud 593.0.0 help: "This command is currently in alpha and might change without notice").
- Deleting a sink halts export of traces associated with it; traces already exported are not affected and other sinks keep exporting. Optionally delete unneeded BigQuery datasets, which is irreversible; check first and try it on a disposable project.
- If `_Trace.Spans._AllSpans` is missing, the project has no `_Trace` observability bucket; see the troubleshooting page "Trace storage initialization fails". If the toolbar shows Run in BigQuery, select Settings, then Analytics (default).
- Enable the Observability API as part of the before-you-begin steps.
- Source: https://docs.cloud.google.com/trace/docs/analytics-migrate (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [trace-export-overview.md](./trace-export-overview.md)
- [cross-project-traces.md](./cross-project-traces.md)
