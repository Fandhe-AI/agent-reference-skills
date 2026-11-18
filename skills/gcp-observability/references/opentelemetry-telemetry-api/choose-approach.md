---
source: https://docs.cloud.google.com/stackdriver/docs/instrumentation/choose-approach
---

# Choose an instrumentation approach

Recommendations for GKE, Compute Engine, Cloud Run, Cloud Run functions and App Engine, deciding between the Google-Built OpenTelemetry Collector, the Ops Agent and direct in-process OpenTelemetry export. The recommendations are not the only solutions; contact Cloud Customer Care for additional guidance.

## Signature / Usage

### Collector-based export versus direct export

Adapted (not in the official docs): the source's `# ... existing content ...` placeholder line under `exporters:` is removed, and the block ends before the `otlp_grpc/otlp_logs` exporter.

```yaml
exporters:
  otlphttp:
    encoding: proto
    endpoint: https://telemetry.googleapis.com
    auth:
      authenticator: googleclientauth
```

- Collector-based export (vendor-neutral): the application uses the OpenTelemetry SDK with the in-process OTLP exporter to send data to a collector (the Google-Built OpenTelemetry Collector or an Ops Agent receiver), which forwards it to your project.
- Direct export (vendor-specific): the SDK sends to your project through the Telemetry API without a collector, but application code has vendor-specific dependencies.
- Use a collector when your compute environment supports one; use direct in-process export where a separate collector process is impractical.

## Options / Props

### General recommendations

| Signal | Recommendation |
|---|---|
| Logs | JSON-structured logs for Cloud Logging. Go: `slog`; Python: `logging`; JavaScript: Pino; Java: SLF4J with Log4j2. |
| Metrics | OpenTelemetry or Prometheus client libraries (metrics exposed at an HTTP endpoint and scraped by an agent). |
| Traces | OpenTelemetry. |

### Platform recommendations

| Platform | Metrics | Traces | Logs |
|---|---|---|---|
| GKE | Google Cloud Managed Service for Prometheus: Prometheus client libraries with managed collection, or OpenTelemetry SDK + OTLP exporter with the Google-Built OpenTelemetry Collector (configured to export metrics to Managed Service for Prometheus). | Google-Built OpenTelemetry Collector (sends via the Telemetry (OTLP) API) + OpenTelemetry SDK and OTLP exporter. | JSON to `stdout` / `stderr`; GKE collects them automatically. |
| Compute Engine | Ops Agent receives OTLP from the SDK (metrics sent with the Cloud Monitoring API, traces with the Cloud Trace API); for Prometheus-format only, the Ops Agent Prometheus receiver. | Same as metrics (Ops Agent OTLP). | JSON to a file; install the Ops Agent and configure a receiver. |
| Cloud Run | OpenTelemetry SDK + OTLP exporter and an OpenTelemetry sidecar (Google-Built OpenTelemetry Collector exports metrics with the `googlemanagedprometheus` exporter, logs and metrics with Google Cloud exporters); for Prometheus-format only, the Prometheus sidecar for Cloud Run. Use instance-based billing (CPU allocated for the whole instance lifecycle, needed for OpenTelemetry background processing). | Same sidecar approach. | JSON to `stdout` / `stderr`; collected automatically. |
| Cloud Run functions | Writing metric data directly isn't supported; generate log-based metrics. | OpenTelemetry SDK + OTLP exporter. | JSON to `stdout` / `stderr`; collected automatically. |
| App Engine | OpenTelemetry SDK + OTLP exporter. | OpenTelemetry SDK + OTLP exporter. | JSON to `stdout` / `stderr`; collected automatically. |

## Notes

- The source recommends that collectors receive and export telemetry using OTLP; the Telemetry (OTLP) API implements this protocol.
- The twin contains no code block. Snippet taken from https://docs.cloud.google.com/stackdriver/docs/otlp/migrate-collector-to-otlp-exporters (the `otlphttp` exporter).
- Adapted from the official docs: the source block starts `exporters:` / `  # ... existing content ...` / `  otlphttp:`; the placeholder comment line is removed so the fence holds no elision.
- The source links per-language OpenTelemetry SDK and OTLP exporter documentation for .NET, Go, Java, JavaScript and Python on opentelemetry.io; it also links "Observability for AI agent developers" (LangGraph / Agent Development Kit instrumentation).
- OpenTelemetry tracing in Google Cloud; this is not the tracing of the OpenAI Agents SDK (`openai-agents`) or the Vercel AI SDK telemetry (`vercel-ai-sdk`). The `pino` skill covers the pino logger itself (Cloud Logging reads its JSON from stdout only when the fields match the special fields). Cloud Run, GKE and Compute Engine settings themselves are in `gcp-run`, `gcp-gke` and `gcp-compute`.
- Source: https://docs.cloud.google.com/stackdriver/docs/instrumentation/choose-approach (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [application-developers.md](./application-developers.md)
- [google-built-otel.md](./google-built-otel.md)
- [sample-overview.md](./sample-overview.md)
- [otlp-overview.md](./otlp-overview.md)
