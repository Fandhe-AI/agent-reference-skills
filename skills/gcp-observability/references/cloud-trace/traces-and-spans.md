---
source: https://docs.cloud.google.com/trace/docs/traces-and-spans
---

# Traces and spans

A trace captures how a request runs end-to-end across services and is composed of spans, which record the individual operations, function calls and RPCs of that request.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/trace/docs/trace-context: the trace ID is propagated across service boundaries in the request context.

```text
traceparent: VERSION-TRACE_ID-PARENT_SPAN_ID-TRACE_FLAGS
```

## Options / Props

### Trace

| Part | Description |
|---|---|
| Trace ID | Unique identifier of the end-to-end operation; propagated in the request context across service boundaries. |
| Span collection | Spans sharing the same trace ID; they form a tree or a directed acyclic graph representing the call hierarchy. |

### Span fields

| Field | Description |
|---|---|
| Trace ID | Identifier of the overall request or trace the span belongs to. |
| Span ID | Unique identifier of the span. Each invocation of an operation in a trace generates a separate span with the same name but a unique span ID. |
| Parent span ID | The parent operation that invoked this span; the root span has parent span ID `null`. |
| Name | Name of the operation. |
| Kind | Tells tools such as Trace Explorer how spans relate (OpenTelemetry SpanKind). |
| Status | `Unset` (default, does not indicate an error), `Error`, or `Ok`. |
| Start time / End time | Start and end of the operation. |
| Events | Timestamped structured messages within a span. |
| Attributes | Key-value pairs; follow the OpenTelemetry Semantic Conventions where possible. |
| Links | Relate one span to another. |

## Notes

- Cloud Trace uses the trace ID to identify which spans in its repository belong to the same trace.
- Source: https://docs.cloud.google.com/trace/docs/traces-and-spans (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [trace-context.md](./trace-context.md)
- [trace-sampling.md](./trace-sampling.md)
