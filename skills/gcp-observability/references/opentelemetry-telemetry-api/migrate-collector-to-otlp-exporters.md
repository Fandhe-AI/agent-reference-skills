---
source: https://docs.cloud.google.com/stackdriver/docs/otlp/migrate-collector-to-otlp-exporters
---

# Migrate a collector to the OTLP exporters

Steps to move a collector configuration from the `googlecloud` exporter (logs, traces) and the `googlemanagedprometheus` exporter (metrics) to the generic exporters that write to the Telemetry (OTLP) API: `otlp_grpc/otlp_logs` for logs and `otlphttp` for metrics and traces.

## Signature / Usage

### 1. Enable the Telemetry API

```bash
gcloud services enable telemetry.googleapis.com
```

### 2. Authorize the collector service account (GKE, Workload Identity Federation for GKE)

```bash
export PROJECT_NUMBER=$(gcloud projects describe PROJECT_ID --format="value(projectNumber)")

gcloud projects add-iam-policy-binding PROJECT_ID \
  --role=roles/telemetry.writer \
  --member=principal://iam.googleapis.com/projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/PROJECT_ID.svc.id.goog/subject/ns/opentelemetry/sa/opentelemetry-collector \
  --condition=None

gcloud projects add-iam-policy-binding PROJECT_ID \
  --role=roles/serviceusage.serviceUsageConsumer \
  --member=principal://iam.googleapis.com/projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/PROJECT_ID.svc.id.goog/subject/ns/opentelemetry/sa/opentelemetry-collector \
  --condition=None
```

### 3. Set `GOOGLE_CLOUD_PROJECT`

```yaml
env:
- name: GOOGLE_CLOUD_PROJECT
  value: PROJECT_ID
```

### 4. Add the `googleclientauth` extension

```yaml
extensions:
  googleclientauth:
    project: ${GOOGLE_CLOUD_PROJECT}
    quota_project: ${GOOGLE_CLOUD_PROJECT}
```

### 5. Add the exporters

The source shows a `# ... existing content ...` elision in this block, so it is tagged `text`.

```text
exporters:
  # ... existing content ...
  otlphttp:
    encoding: proto
    endpoint: https://telemetry.googleapis.com
    auth:
      authenticator: googleclientauth
  otlp_grpc/otlp_logs:
    auth:
      authenticator: googleclientauth
    balancer_name: pick_first
    endpoint: telemetry.googleapis.com:443
```

### 6. Add processors

```yaml
  resource/gcp_project_id:
    attributes:
      - action: insert
        value: ${GOOGLE_CLOUD_PROJECT}
        key: gcp.project_id
```

```yaml
  resourcedetection:
    detectors: ["env", "gcp"]
```

```yaml
batch:
  send_batch_max_size: 200
  send_batch_size: 200
  timeout: 5s
```

```yaml
processors:
  # This processor ensures the start time is set for Prometheus metrics.
  # Set in the pipeline before the k8sattributes processor, if used.
  # No-op for OTLP metrics.
  metricstarttime:
    strategy: subtract_initial_point
```

```yaml
  transform/otlp_grpc/preserve_instrumentation_source_version:
    error_mode: ignore
    log_statements:
      - context: log
        statements:
          - set(attributes["instrumentation_source"], instrumentation_scope.name) where instrumentation_scope.name != ""
          - set(attributes["instrumentation_version"], instrumentation_scope.version) where instrumentation_scope.version != ""
          - set(attributes["service.name"], resource.attributes["service.name"]) where resource.attributes["service.name"] != nil
          - set(attributes["service.namespace"], resource.attributes["service.namespace"]) where resource.attributes["service.namespace"] != nil
          - set(attributes["service.instance.id"], resource.attributes["service.instance.id"]) where resource.attributes["service.instance.id"] != nil
```

### 7. Update service pipelines (metrics double-write during validation)

```yaml
service:
  extensions: ["googleclientauth"]
  pipelines:
    logs:
      receivers: ["otlp"]
      processors:
        - resourcedetection
        - resource/gcp_project_id
        - transform/otlp_grpc/preserve_instrumentation_source_version
        - batch
      exporters: ["otlp_grpc/otlp_logs"]
    metrics:
      receivers: ["otlp"]
      processors:
        - resourcedetection
        - resource/gcp_project_id
        - metricstarttime
        - batch
      exporters: ["googlemanagedprometheus", "otlphttp"]
    traces:
      receivers: ["otlp"]
      processors:
        - resourcedetection
        - resource/gcp_project_id
        - batch
      exporters: ["otlphttp"]
```

### 10. Final state after removing vendor-specific exporters

```text
exporters:
  otlphttp: [...]
  otlp_grpc/otlp_logs: [...]

...
service:
  extensions: ["googleclientauth"]
  pipelines:
    logs:
      receivers: ["otlp"]
      processors: [...]
      exporters: ["otlp_grpc/otlp_logs"]
    metrics:
      receivers: ["otlp"]
      processors: [...]
      exporters: ["otlphttp"]
    traces:
      receivers: ["otlp"]
      processors: [...]
      exporters: ["otlphttp"]
```

## Options / Props

### Exporter mapping

| Signal | From | To |
|---|---|---|
| Logs | `googlecloud` (`googlecloud/logging`) | `otlp_grpc/otlp_logs` (`endpoint` in `host:port` form) |
| Metrics | `googlemanagedprometheus` | `otlphttp` |
| Traces | `googlecloud` | `otlphttp` |

### Required roles and permissions (on the service account running the collector, not a user)

| Role / permission | Note |
|---|---|
| `roles/telemetry.writer` | Cloud Telemetry Writer |
| `roles/serviceusage.serviceUsageConsumer` | Service Usage Consumer; on the quota project if you use a separate one |
| `logging.logEntries.create` | logs |
| `monitoring.timeSeries.create` | metrics |
| `telemetry.traces.write` | traces |
| `serviceusage.services.use` | quota consumption |

### Processors per pipeline

| Pipeline | Processors to add |
|---|---|
| Logs | `resource/gcp_project_id`, `transform/otlp_grpc/preserve_instrumentation_source_version`, `resourcedetection` (optional), `batch` (single write) |
| Metrics | `resource/gcp_project_id`, `metricstarttime` (required if the collector receives Prometheus metrics), `resourcedetection` (optional), `batch` (double write with `googlemanagedprometheus` until validated) |
| Traces | `resource/gcp_project_id`, `resourcedetection` (optional), `batch` (single write) |

## Notes

- The IAM commands grant roles at project level, as in the source; on Compute Engine or outside GKE grant the roles to the service account your deployment uses. For a Workload Identity Federation for GKE service account the source points to the Managed Service for Prometheus documentation, replacing `gmp-test-sa`.
- Validate: query logs for write errors, view error rates for the Cloud Logging, Cloud Monitoring and Telemetry APIs, and view time series in Metrics Explorer. Add charts and alerting policies for Telemetry API usage.
- `otlphttp` metric names differ from `googlemanagedprometheus`: the Telemetry API keeps `.` and `/` (the exporter converts them to `_`), and does not append a unit or a `_total` / `_ratio` suffix. Example: OTLP `prometheus.googleapis.com/foo.bar/gauge` versus `prometheus.googleapis.com/foo_bar/gauge`; `prometheus.googleapis.com/foo/counter` versus `prometheus.googleapis.com/foo_seconds_total/counter`. Dashboards and alerting policies must be rewritten (or query both names). Not required if the collector only receives Prometheus metrics; with a `prometheus` receiver, data-stream collisions occur until `googlemanagedprometheus` is removed. The source does not recommend recreating the old names with processor rules.
- Troubleshooting: missing metrics or spikes usually means `metricstarttime` is missing. `Value type DOUBLE does not match metric descriptor value type INT64` comes from earlier `INT64` `target_info` metrics (delete that descriptor; try on a disposable project first). `Points must be written in order...` means multiple sources write the same series; remove `googlemanagedprometheus`.
- The block in step 10 and step 5 use `text` because the source shows `...` / `[...]` elisions. The final removal step also drops processors used only by the removed exporters.
- Secrets: no secrets are placed in these configs; keep it that way (the `googlesecretmanager` provider is described in google-built-otel.md).
- Google Cloud Managed Service for Prometheus is not a self-hosted Prometheus server; this page concerns OTLP export from the collector. OpenTelemetry tracing in Google Cloud is not the tracing of `openai-agents` or `vercel-ai-sdk`.
- Source: https://docs.cloud.google.com/stackdriver/docs/otlp/migrate-collector-to-otlp-exporters (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [otlp-overview.md](./otlp-overview.md)
- [google-built-otel.md](./google-built-otel.md)
- [sample-overview.md](./sample-overview.md)
