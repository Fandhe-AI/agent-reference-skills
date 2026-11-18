---
source: https://docs.cloud.google.com/stackdriver/docs/solutions/grpc
---

# Microservices observability for gRPC

Observability plugins for gRPC workloads on Google Cloud and elsewhere that send telemetry to Cloud Monitoring, Cloud Logging and Cloud Trace. The plugin wraps the OpenCensus plugins for metrics, traces and gRPC logging into one unified plugin. Plugin packages exist for the gRPC languages C++, Go and Java.

## Signature / Usage

The twin has no code; the plugins read observability configuration from an environment variable. The command below enables the three backends' APIs (snippet taken from https://docs.cloud.google.com/stackdriver/docs/instrumentation/setup/sample-overview).

```bash
gcloud services enable logging.googleapis.com monitoring.googleapis.com cloudtrace.googleapis.com telemetry.googleapis.com
```

## Options / Props

### Features

| Feature | Detail |
|---|---|
| Telemetry integration | Plugins integrate with Google Cloud Observability by default; with minimal configuration they retrieve project and deployment metadata and set default tracing, metrics and logging generation. |
| RPC transport-level events | Metadata (headers and trailers), message and status events (OK / error) and finishing events; serialized message length, authority, client/server addresses, cancellation. Payload logging for messages or headers needs explicit settings: size limits, separate control of message and header payload logs, target methods with or without wildcards. |
| Distributed tracing | Built-in support to start traces, generate spans and propagate trace context. |
| Metrics | Message-, RPC- and method-level measurements uploaded to Cloud Monitoring; predefined dashboard in Metrics Explorer. |
| Traces and logs correlation | Logs automatically correlated with traces, sampled by upstream sampling decisions or user-defined rates. |
| Labels | Resource labels (for example Compute Engine node name or GKE namespace) by default; custom labels become span labels, metric labels and log entry labels. |
| Suggested queries | Provided in Cloud Logging. |

## Notes

- Configuration consists of fields set in an environment variable; it defines which spans go to Cloud Trace, which metrics to Cloud Monitoring and which RPC events to Cloud Logging.
- Pricing is the same as Google Cloud Observability pricing; no separate charge for the plugins.
- Payload logging of messages or headers can capture personal data or secrets; do not log credentials.
- Details are in the setup and reference pages at https://docs.cloud.google.com/stackdriver/docs/solutions/grpc/set-up-observability and `.../observability-reference`.
- OpenTelemetry tracing in Google Cloud; this is not the tracing of the OpenAI Agents SDK (`openai-agents`) or the Vercel AI SDK telemetry (`vercel-ai-sdk`).
- Source: https://docs.cloud.google.com/stackdriver/docs/solutions/grpc (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [otlp-overview.md](./otlp-overview.md)
- [choose-approach.md](./choose-approach.md)
