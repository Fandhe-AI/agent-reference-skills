---
source: https://docs.cloud.google.com/trace/docs/overview
---

# Cloud Trace overview

Cloud Trace is a distributed tracing system for Google Cloud that tracks request latency and helps you troubleshoot performance bottlenecks across services and generative AI applications. A tracing client collects traces and sends them to your project; you view them in the Trace Explorer and Observability Analytics pages of the Google Cloud console.

## Signature / Usage

### Access scope for Trace on GKE

Snippet taken from https://docs.cloud.google.com/trace/docs/setup: with custom access scopes, the Cloud Trace API scope `trace.append` must be enabled.

```text
gcloud container clusters create example-cluster-name --scopes=https://www.googleapis.com/auth/trace.append
```

### Components

- Tracing client: collects latency and span data from your application and exports it to your project, automatically or by manual instrumentation.
- Trace Explorer: aggregate trace data on a latency heatmap, individual spans and traces, filters. Multi-project viewing uses trace scopes.
- Observability Analytics: SQL query interface; queries can join trace and log data; results shown as table or chart. A linked BigQuery dataset lets you use BigQuery.

### Configurations with automatic tracing

- App Engine standard first-generation runtimes automatically intercept and send trace spans to Cloud Trace.
- App Engine standard second-generation runtimes automatically capture overall request latency and add the `X-Cloud-Trace-Context` HTTP header to requests.
- Cloud Run functions and Cloud Run: for incoming and outgoing HTTP requests, latency data is automatically sent to Trace.

### APIs that ingest trace data

The Telemetry API is recommended over the Cloud Trace API: OpenTelemetry ecosystem compatibility, limits often more generous, storage format generally consistent with OTLP protos, no Google Cloud-specific exporter for collector-based export, and features such as Application Monitoring rely on data sent to the Telemetry API.

## Options / Props

### Environment support (Linux)

| Environment | Note |
|---|---|
| Compute Engine | |
| Google Kubernetes Engine (GKE) | |
| Apigee | Public Preview |
| App Engine flexible environment | |
| App Engine standard environment | |
| Cloud Run | |
| Cloud Service Mesh | |
| Cloud SQL query insights | |
| Non-Google Cloud environments | |

### Service names and retention

| Item | Value |
|---|---|
| Cloud Trace service name (VPC Service Controls) | `cloudtrace.googleapis.com` |
| Telemetry API service name | `telemetry.googleapis.com` |
| Observability API service name | `observability.googleapis.com` |
| Retention: spans stored in the `_Trace` bucket | 30 days |

## Notes

- Instrument with an open-source, vendor-neutral framework such as OpenTelemetry rather than Cloud Trace client libraries or vendor APIs; OpenTelemetry libraries are simpler and export OTLP. Collector-based samples exist for Go, Java, Node.js and Python.
- Disabling the Cloud Trace API: Google Cloud services stop sending trace data to your project, requests to a Cloud Trace API endpoint get an error, and trace data sent to the trace-specific Telemetry API endpoint is discarded. Do not disable the Telemetry API, because it also receives log and metric data. To block Cloud Trace across an organization, create an organization policy constraint.
- Assured Workloads with data-residency or Impact Level 4 (IL4) requirements: do not use the Cloud Trace API to send trace spans; disable the Cloud Trace API (not the Telemetry API) to prevent storing trace data.
- Telemetry API is a consumer API: sending data requires a quota project and permission for the application's service account to use that quota.
- The Observability API sets defaults for region and customer-managed key of trace storage, linked BigQuery datasets and trace scopes. Visualization services use the Cloud Trace API to fetch the data they display.
- OpenTelemetry tracing in Google Cloud; it is not the tracing of the OpenAI Agents SDK (`openai-agents`) or the Vercel AI SDK telemetry (`vercel-ai-sdk`).
- Source: https://docs.cloud.google.com/trace/docs/overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/trace/docs/setup (retrieved 2026-11-18).

## Related

- [setup.md](./setup.md)
- [traces-and-spans.md](./traces-and-spans.md)
- [finding-traces.md](./finding-traces.md)
