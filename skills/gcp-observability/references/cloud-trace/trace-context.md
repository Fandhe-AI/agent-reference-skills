---
source: https://docs.cloud.google.com/trace/docs/trace-context
---

# Trace context and context propagation

Trace context and context propagation let distributed applications pass request identifiers (trace ID, parent span ID, sampling status) across services in headers or metadata, so Cloud Trace can link spans into complete traces.

## Signature / Usage

### W3C traceparent header

```text
traceparent: VERSION-TRACE_ID-PARENT_SPAN_ID-TRACE_FLAGS
```

### Legacy X-Cloud-Trace-Context header

```text
X-Cloud-Trace-Context: TRACE_ID/SPAN_ID;o=OPTIONS
```

## Options / Props

### traceparent fields

| Field | Description |
|---|---|
| `VERSION` | Header version. Must be `00`. |
| `TRACE_ID` | 32-character hexadecimal value representing a 128-bit number. |
| `PARENT_SPAN_ID` | 16-character hexadecimal value identifying the parent span. |
| `TRACE_FLAGS` | 2-character hexadecimal value for the parent's sampling decision; `01` when the parent sampled the span. |

### X-Cloud-Trace-Context fields

| Field | Description |
|---|---|
| `TRACE_ID` | 32-character hexadecimal value representing a 128-bit number. |
| `SPAN_ID` | 64-bit decimal representation of the unsigned span ID. |
| `OPTIONS` | `0` (parent not sampled) or `1` (parent was sampled). |

### Header differences

| Attribute | `traceparent` | `X-Cloud-Trace-Context` |
|---|---|---|
| Separators | hyphens `(-)` | forward slash `(/)` and semicolon `(;)` |
| Span ID representation | Hexadecimal | Decimal |

## Notes

- `tracestate` is optional and carries vendor-specific metadata. Both headers are generally supported by Google Cloud services; use `traceparent` when possible and keep `X-Cloud-Trace-Context` only as a fallback.
- gRPC: context is carried in gRPC metadata; apps may use the `traceparent` header or the metadata key `grpc-trace-bin`. For components you own, use `traceparent`.
- Cloud Trace is not responsible for context propagation; Google Cloud services and user applications that submit data are. Services known to participate: Apigee, App Engine, Cloud Endpoints, Cloud Run functions, Cloud Load Balancing, Cloud Run, Cloud Scheduler, Cloud Tasks, Pub/Sub. Support depends on the service.
- OpenTelemetry can propagate a context object; for example a Go app should call `SetTextMapPropagator` to use the W3C `traceparent` format. Without a suitable library, your application must propagate the context to child operations.
- Source: https://docs.cloud.google.com/trace/docs/trace-context (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [trace-sampling.md](./trace-sampling.md)
- [traces-and-spans.md](./traces-and-spans.md)
