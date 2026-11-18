---
source: https://docs.cloud.google.com/stackdriver/docs/instrumentation/setup/sample-overview
---

# Collector-based instrumentation samples overview

Architecture, required roles and APIs for the OpenTelemetry collector-based samples (Go, Java, Node.js, Python). An in-process OpenTelemetry SDK exports metrics and traces to a local collector sidecar, which sends logs, metrics and traces in OTLP format to your project through the Telemetry API. The samples run in Cloud Shell, on Google Cloud resources or locally, and are built and deployed with Docker (Docker is not required for OpenTelemetry itself).

## Signature / Usage

### Enable the required APIs

```bash
gcloud services enable logging.googleapis.com monitoring.googleapis.com cloudtrace.googleapis.com telemetry.googleapis.com
```

## Options / Props

### Sample files

| File | Purpose |
|---|---|
| `docker-compose.yaml` | Services for the app, the OpenTelemetry collector (`otelcol`) and a load generator; the collector endpoint comes from `OTEL_EXPORTER_OTLP_ENDPOINT` set in the `app` service. |
| `otel-collector-config.yaml` | `otlp` receiver for metrics and traces, `filelog` receiver for logs (read from the application's `stdout`), `otlphttp` exporter for logs, metrics and traces (Telemetry API). |
| `docker-compose.creds.yaml` | Optionally mounts a Google Cloud credentials file in `otelcol`; needed on a local machine where Application Default Credentials exist only as a file. |

### Roles to run the samples

| Role | Scope |
|---|---|
| `roles/logging.logWriter` (Logs Writer) | project |
| `roles/monitoring.metricWriter` (Monitoring Metric Writer) | project |
| `roles/telemetry.tracesWriter` (Cloud Telemetry Traces Writer) | project |
| `roles/serviceusage.serviceUsageConsumer` (Service Usage Consumer) | quota project |

### Roles to view data (on the project)

| Role |
|---|
| `roles/logging.viewer` (Logs Viewer) |
| `roles/monitoring.viewer` (Monitoring Viewer) |
| `roles/cloudtrace.user` (Cloud Trace User) |

## Notes

- Enabling APIs needs `serviceusage.services.enable` (in Owner `roles/owner` or Service Usage Admin `roles/serviceusage.serviceUsageAdmin`).
- Production applications typically use a service account; grant the writer roles to it.
- The samples configure a logging framework to write structured logs; GKE has built-in agents for structured logs, Compute Engine needs the Ops Agent. No agent is needed for the samples.
- Alternatives: migrate from the Trace exporter to the OTLP endpoint, correlate metrics and traces with exemplars (Go), and the Ops Agent with OTLP.
- The twin links per-language sample pages (Go, Java, Node.js, Python) at https://docs.cloud.google.com/stackdriver/docs/instrumentation/setup/nodejs and `.../python`; their code is not in this twin.
- Source: https://docs.cloud.google.com/stackdriver/docs/instrumentation/setup/sample-overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [choose-approach.md](./choose-approach.md)
- [google-built-otel.md](./google-built-otel.md)
- [otlp-overview.md](./otlp-overview.md)
- [instrument-nodejs.md](./instrument-nodejs.md)
- [instrument-python.md](./instrument-python.md)
