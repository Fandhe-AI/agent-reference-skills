---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/managed-otel-gke
---

# Managed OpenTelemetry for GKE

Managed OpenTelemetry for GKE lets applications send OpenTelemetry Protocol (OTLP) traces, metrics, and logs to Google Cloud Observability without running your own collector. It has two components: managed collection (an in-cluster OTLP endpoint) and automatic configuration (an Instrumentation custom resource).

## Signature / Usage

### In-cluster OTLP endpoints

Managed collection deploys a managed OpenTelemetry collector. Workloads must be configured to send data to it:

```text
http://opentelemetry-collector.gke-managed-otel.svc.cluster.local:4318
http://opentelemetry-collector.gke-managed-otel.svc.cluster.local:4317
```

Port 4318 is the HTTP endpoint and port 4317 is the gRPC endpoint. Data is available in Cloud Logging, Cloud Monitoring, and Cloud Trace. The managed collector can be enabled per cluster with the console or the gcloud CLI (see "Deploy Managed OpenTelemetry for GKE" in the official docs).

### Automatic configuration

- Define an Instrumentation custom resource, `instrumentations.telemetry.googleapis.com`; GKE then injects OpenTelemetry environment variables into the containers of selected Pods or all Pods in a namespace.
- The Instrumentation object must exist when the application is deployed and the Pods are created. If you deployed first, restart the application's Pods to trigger injection.
- The Instrumentation resource controls: which Pods get variables, which signals are collected (logs, metrics, traces), the metrics export frequency, the trace sampling rate, and the OTLP transport (HTTP or gRPC).

## Options / Props

### Environment variables that can be injected

| Variable | Meaning |
|---|---|
| `OTEL_EXPORTER_OTLP_ENDPOINT` | Base endpoint URL: HTTP `http://opentelemetry-collector.gke-managed-otel.svc.cluster.local:4318` (default) or gRPC `...:4317`, depending on the exporter configured. |
| `OTEL_EXPORTER_OTLP_PROTOCOL` | `grpc` for the `otlp_grpc` transport; `http/protobuf` if no transport is specified or `otlp_http`. |
| `OTEL_TRACES_SAMPLER` | `parentbased_traceidratio` when sampling is configured in the custom resource; otherwise `parentbased_always_on` (default). |
| `OTEL_TRACES_SAMPLER_ARG` | Sampling ratio between 0.0 and 1.0; 1.0 if not configured. |
| `OTEL_METRIC_EXPORT_INTERVAL` | Milliseconds between the start of two export attempts (min 5000, max 300000, default 30000). |
| `OTEL_TRACES_EXPORTER` / `OTEL_METRICS_EXPORTER` / `OTEL_LOGS_EXPORTER` | `none` disables export of that signal (default `otlp`). Set when `tracer_provider`, `meter_provider`, or `logger_provider` is `null` in the Instrumentation resource. |
| `K8S_POD_UID` | Pod UID of a hostNetwork Pod, used to populate `k8s.pod.uid`. |
| `OTEL_RESOURCE_ATTRIBUTES` | Includes `k8s.pod.uid=$(K8S_POD_UID)` so the Kubernetes Attributes Processor can associate metadata (`k8s.namespace.name`, `k8s.deployment.name`, `k8s.node.name`) with hostNetwork Pods. |
| `OTEL_INSTRUMENTATION_GENAI_UPLOAD_FORMAT` | Fixed value `jsonl`: format Cloud Storage objects as JSON Lines. |
| `OTEL_INSTRUMENTATION_GENAI_COMPLETION_HOOK` | Fixed value `upload`: upload prompt and response data instead of embedding it in trace spans. |
| `OTEL_SEMCONV_STABILITY_OPT_IN` | Fixed value `gen_ai_latest_experimental`: latest generative AI semantic conventions. |
| `OTEL_INSTRUMENTATION_GENAI_UPLOAD_BASE_PATH` | Path for objects, for example `gs://STORAGE_BUCKET_NAME/PATH`. |

## Notes

- The workload must already be instrumented with the OpenTelemetry SDK and configured with standard OpenTelemetry environment variables (for example the Agent Development Kit natively supports it). If a workload supports only some signals, only those are collected.
- `instrumentations.telemetry.googleapis.com` is a different resource from the Instrumentation resource of the OpenTelemetry operator.
- OpenTelemetry configuration injection is not supported for privileged workloads from GKE Autopilot partners.
- Manual configuration (editing env vars or flags) is possible, but combining it with automatic configuration for the same workload is not recommended because automatic configuration can override manual changes.
- If you need collector-level filtering and controls, use the Google-Built OpenTelemetry Collector instead.
- Billing is by ingestion volume: metrics at Managed Service for Prometheus pricing, logs at Cloud Logging pricing, traces at Cloud Trace pricing. Cloud Logging, Cloud Monitoring, and Cloud Trace quotas apply.
- The source has no code block; the endpoint block is quoted from the page text.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/managed-otel-gke (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [observability.md](./observability.md)
- [configure-metrics.md](./configure-metrics.md)
- [about-logs.md](./about-logs.md)
