---
source: https://docs.cloud.google.com/monitoring/custom-metrics
---

# User-defined metrics overview

User-defined (custom) metrics capture application-specific or client-side telemetry that built-in metrics don't. Once written they can be charted, alerted on and read like built-in metrics. User-defined metrics are a chargeable feature.

## Signature / Usage

### Metric type names

A user-defined metric type must be unique in the project and start with an allowed prefix. Hierarchical naming is recommended for many metrics.

```text
    custom.googleapis.com/cpu_utilization
    custom.googleapis.com/instance/cpu/utilization
```

Resource names have the form `projects/PROJECT_ID/metricDescriptors/METRIC_TYPE`. In project `my-project-id`:

```text
    projects/my-project-id/metricDescriptors/custom.googleapis.com/cpu_utilization
    projects/my-project-id/metricDescriptors/custom.googleapis.com/instance/cpu/utilization
```

In the metric descriptor, `name` stores the resource name and `type` stores `METRIC_TYPE`.

## Options / Props

### Allowed prefixes

| Prefix |
|---|
| `custom.googleapis.com/` |
| `workload.googleapis.com/` |
| `external.googleapis.com/user` |
| `external.googleapis.com/prometheus` |

### Monitored-resource types allowed with user-defined metrics

| Type | Resource |
|---|---|
| `aws_ec2_instance` | Amazon EC2 instance. |
| `dataflow_job` | Dataflow job. |
| `gae_instance` | App Engine instance. |
| `gce_instance` | Compute Engine instance. |
| `generic_node` | User-specified computing node. |
| `generic_task` | User-defined task. |
| `gke_container` | GKE container instance. |
| `global` | Use only when no other type fits; `generic_node` or `generic_task` are usually better. |
| `k8s_cluster` | Kubernetes cluster. |
| `k8s_container` | Kubernetes container. |
| `k8s_node` | Kubernetes node. |
| `k8s_pod` | Kubernetes pod. |

### Monitoring API methods

| Method | User-defined | Built-in |
|---|---|---|
| `monitoredResourceDescriptors.get` / `.list` | yes | yes |
| `metricDescriptors.get` / `.list` | yes | yes |
| `timeSeries.list` | yes | yes |
| `timeSeries.create` | yes | |
| `metricDescriptors.create` | yes | |
| `metricDescriptors.delete` | yes | |

### Ways to collect

| Way | Use |
|---|---|
| OpenTelemetry (recommended) | Ops Agent OTLP receiver on Compute Engine; OpenTelemetry Collector sidecar on Cloud Run. |
| Prometheus | Managed Service for Prometheus on GKE / Kubernetes; Ops Agent Prometheus receiver on Compute Engine. |
| Cloud Monitoring API | Create descriptors and write points; the API docs show APIs Explorer, C#, Go, Java, Node.js, PHP, Python, Ruby. |
| Log-based metrics | Derive metrics from log entries in Cloud Logging instead. |

## Notes

- Cloud Monitoring can create the metric descriptor from the data you write, or you create it first. The descriptor defines the data organization, labels and name.
- Design: one metric per program (two series), or one metric with a label for the program (a series per label value; ratios are easy). A single metric with no distinguishing label merges the data and can't drive per-program alerts. Label cardinality must stay bounded.
- The monitored resource is not part of the metric type: each point references both. Pick the resource before creating the descriptor, since it determines which labels the descriptor needs (for example a `gce_instance` resource already has the instance ID). Use resource objects for the physical resources running the code: better performance, no out-of-order data from several processes writing one series, and grouping with other data from the same resources.
- `generic_task` / `generic_node` have common labels that identify unique objects. `global` has only `project_id`; many sources writing the same `global` resource can collide and overwrite data.
- Retention and limits are in Quotas and limits. To keep data beyond the retention period, manually copy it to Cloud Storage or BigQuery. Writes are typically visible within 3 to 7 seconds (see latency-n-retention.md).
- Pricing: https://cloud.google.com/products/observability/pricing. The Metrics Management page monitors metric ingestion.
- Source: https://docs.cloud.google.com/monitoring/custom-metrics (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [naming-conventions.md](./naming-conventions.md)
- [kinds-and-types.md](./kinds-and-types.md)
- [latency-n-retention.md](./latency-n-retention.md)
- [metric-model.md](./metric-model.md)
