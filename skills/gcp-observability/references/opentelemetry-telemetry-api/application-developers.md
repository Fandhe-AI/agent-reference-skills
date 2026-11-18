---
source: https://docs.cloud.google.com/stackdriver/docs/opentelemetry/application-developers
---

# Observability for application developers

Introduces in-process instrumentation (logs, metrics, traces generated inside your application), why Google recommends a vendor-neutral framework such as OpenTelemetry even when you send telemetry only to Google Cloud, and where the language-specific samples are.

## Signature / Usage

### Enable the Telemetry API (first step for every OTLP path)

```bash
gcloud services enable telemetry.googleapis.com
```

### Decide an instrumentation strategy

- Choose an instrumentation approach (collector, Ops Agent, or direct in-process export): see [choose-approach.md](./choose-approach.md).
- Collector-based code samples for Go, Java, Node.js and Python: see [sample-overview.md](./sample-overview.md).
- Migrate from the Trace exporter to the OTLP endpoint: `https://docs.cloud.google.com/stackdriver/docs/instrumentation/migrate-to-otlp-endpoints`.
- OpenTelemetry zero-code instrumentation for Java workloads on GKE: `https://docs.cloud.google.com/stackdriver/docs/instrumentation/otel-zerocode-java-gke`.

## Options / Props

### Benefits of vendor-neutral instrumentation frameworks

| Benefit | Meaning |
|---|---|
| No vendor lock-in | The framework has its own data model; you can send data to multiple vendors and usually change vendor without code changes. |
| Standardized telemetry collection | One framework for all supported languages; telemetry from all services is comparable. |
| Interoperable libraries | Trace and metric libraries can be used separately or together. |

## Notes

- The source says to use a vendor-neutral open source instrumentation framework even if you plan to send telemetry only to Google Cloud.
- In-process instrumentation code runs inside your application process and the framework exports telemetry to a configured storage system (here, your Google Cloud project).
- The twin contains no code. Snippet taken from https://docs.cloud.google.com/stackdriver/docs/otlp/migrate-collector-to-otlp-exporters (the Enable the Telemetry API step).
- OpenTelemetry tracing in Google Cloud; this is not the tracing of the OpenAI Agents SDK (`openai-agents`) or the Vercel AI SDK telemetry (`vercel-ai-sdk`).
- Source: https://docs.cloud.google.com/stackdriver/docs/opentelemetry/application-developers (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [choose-approach.md](./choose-approach.md)
- [sample-overview.md](./sample-overview.md)
- [otlp-overview.md](./otlp-overview.md)
