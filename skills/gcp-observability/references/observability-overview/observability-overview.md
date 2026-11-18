---
source: https://docs.cloud.google.com/stackdriver/docs
---

# Google Cloud Observability overview

Google Cloud Observability is the set of services (Monitoring, Logging, Trace, Error Reporting, Profiler, Application Monitoring) that collect, analyze and correlate telemetry data (logs, metrics, traces) for applications, including agentic applications, and the infrastructure they run on. This page defines the terms, lists what is collected automatically, and describes what to configure on Compute Engine, GKE and Cloud Run.

## Signature / Usage

### Check which scope the console pages query

The overview has no code block. This is the scope example from the observability scopes page: the default observability scope (`_Default`, location `global`) names the default log scope and default trace scope that Logs Explorer and Trace Explorer query when they open.

```bash
gcloud observability scopes describe OBSERVABILITY_SCOPE_ID \
   --location=LOCATION\
   --project=PROJECT_ID
```

## Options / Props

### Telemetry data types

| Type | Description |
|---|---|
| Metric data | Numeric data about health or performance measured at regular intervals (CPU utilization, request latency). |
| Log data | Timestamped log entries; each entry describes a specific event. |
| Trace data | A trace is the path of a request across components; it is composed of spans (one function or operation). For agentic applications, traces capture agent actions such as MCP calls. |
| Other data | Labels (alert severity, customer ID) and, for agents, prompts and responses. |

### Services enabled by default in a new project

| Service | Notes |
|---|---|
| Monitoring | Enabled by default when you create a Google Cloud project. |
| Logging | Enabled by default; audit logs are collected automatically for most Google Cloud services. |
| Trace | Enabled by default; Trace explorer shows traces, spans and metadata, including multimodal prompts and responses. |

### What is collected by default

| Environment | Default collection |
|---|---|
| Compute Engine, GKE, Cloud Run | System metric data and log data by default; additional data is configured. |
| Compute Engine VMs | Only basic system metric and log data until the Ops Agent is installed. |
| GKE clusters | System logs and system metrics are sent to Logging and Monitoring; Google Cloud Managed Service for Prometheus handles third-party and user-defined metrics. |
| Cloud Run functions, App Engine | Metric, log and trace data automatically. |

### Ops Agent collection (Compute Engine)

| Collected | Details |
|---|---|
| Host metrics | CPU, GPU, memory, process metrics. |
| System logs | syslog (Linux), Windows Event Log (Windows). |
| Applications | Third-party application integrations (for example Postgres, MongoDB, JVM) with pre-configured dashboards and alert policies; Prometheus metrics; OTLP metrics and traces; application logs. |

### Quickstarts

| Service | Quickstart |
|---|---|
| Logging | https://docs.cloud.google.com/logging/docs/logging-gce-quickstart |
| Monitoring | https://docs.cloud.google.com/monitoring/monitor-compute-engine-virtual-machine |
| Trace | https://docs.cloud.google.com/trace/docs/trace-app-latency |
| Error Reporting | https://docs.cloud.google.com/error-reporting/docs/check-app-crash |
| Profiler | https://docs.cloud.google.com/profiler/docs/measure-app-performance |

## Notes

- Instrumentation: the source recommends an open-source, vendor-neutral framework such as OpenTelemetry instead of vendor- and product-specific APIs or client libraries (see https://docs.cloud.google.com/stackdriver/docs/instrumentation/choose-approach).
- Agent observability: Application Monitoring derives metrics (error rates, token usage) by filtering and aggregating trace data using application-specific labels and events that follow the OpenTelemetry GenAI semantic conventions; for agents the source recommends building with the Agent Development Kit (ADK), whose telemetry is consistent with those conventions. This is OpenTelemetry tracing in Google Cloud, not the tracing of the OpenAI Agents SDK (`openai-agents`) or the Vercel AI SDK telemetry (`vercel-ai-sdk`).
- Error Reporting analyzes Cloud Logging log entries, annotates matching entries and creates error groups. Cloud Profiler analyzes CPU and memory usage.
- Cloud Run: a service writing Prometheus metrics uses the Prometheus sidecar; a service writing OTLP metrics uses an OpenTelemetry sidecar.
- The Ops Agent is deterministic software that collects telemetry; it is not an agentic application.
- Snippet taken from https://docs.cloud.google.com/stackdriver/docs/observability/scopes (the `gcloud observability scopes describe` example). The default scope must be `_Default` and the location `global`.
- Default dashboards exist for GKE, Compute Engine and Cloud SQL; Compute Engine VM setup is in `gcp-compute`, GKE cluster settings in `gcp-gke`, Cloud Run in `gcp-run`.
- Source: https://docs.cloud.google.com/stackdriver/docs (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [scopes.md](./scopes.md)
- [about-application-monitoring.md](./about-application-monitoring.md)
- [deprecations.md](./deprecations.md)
