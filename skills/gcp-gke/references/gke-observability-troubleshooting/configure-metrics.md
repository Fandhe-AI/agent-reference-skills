---
source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/configure-metrics
---

# Configure metrics collection

How to configure GKE to send metrics to Cloud Monitoring: system metrics, observability metrics packages (control plane, kube state, cAdvisor/Kubelet, NVIDIA DCGM), Managed Service for Prometheus, disabling packages, and controlling cost.

## Signature / Usage

### Enable or disable system metrics

Pass `SYSTEM` to `--monitoring` of `gcloud container clusters create` or `update` (https://docs.cloud.google.com/sdk/gcloud/reference/container/clusters/create) to enable system metrics; pass `NONE` to disable them.

### Disable metric packages

The set of values passed to `--monitoring` overrides any previous setting. For example, to turn off all metrics except system metrics:

```bash
gcloud container clusters update CLUSTER_NAME \
    --location=COMPUTE_LOCATION \
    --enable-managed-prometheus \
    --monitoring=SYSTEM
```

This disables the collection of any previously configured metric packages. The source also shows Console and Terraform (`monitoring_config` block of `google_container_cluster`).

### Find which metrics drive your Monitoring bill

In Cloud Monitoring **Metrics management**: open **Billable samples ingested** > **View charts** > **Namespace Volume Ingestion**; use metric `Metric Ingestion Attribution` / `Samples written by attribution id`, filter `attribution_dimension = cluster`, optionally filter `metric_type =~ .*apiserver.*` or `.*kube_pod.*`, group by `location`, `project_id`, or `attribution_dimension` + `attribution_id`, and sort the table by value. Metrics Management can also exclude unneeded metrics.

## Options / Props

### `--monitoring` values

| Source | Value | Metrics collected |
|---|---|---|
| None | `NONE` | No metrics sent; no agent installed. Not supported for Autopilot clusters. |
| System | `SYSTEM` | Essential system component metrics. |
| API server | `API_SERVER` | `kube-apiserver` metrics. |
| Scheduler | `SCHEDULER` | `kube-scheduler` metrics. |
| Controller Manager | `CONTROLLER_MANAGER` | `kube-controller-manager` metrics. |
| Persistent volume (Storage) | `STORAGE` | kube-state-metrics: PersistentVolume and PersistentVolumeClaim. |
| Pod | `POD` | kube-state-metrics Pod metrics. |
| Deployment | `DEPLOYMENT` | kube-state-metrics Deployment metrics. |
| StatefulSet | `STATEFULSET` | kube-state-metrics StatefulSet metrics. |
| DaemonSet | `DAEMONSET` | kube-state-metrics DaemonSet metrics. |
| HorizontalPodAutoscaler | `HPA` | kube-state-metrics HPA metrics. |
| JobSet | `JOBSET` | kube-state-metrics JobSet metrics. |
| cAdvisor | `CADVISOR` | cAdvisor metrics from the cAdvisor/Kubelet package. |
| kubelet | `KUBELET` | `kubelet` metrics from the cAdvisor/Kubelet package. |
| NVIDIA DCGM | `DCGM` | Metrics from NVIDIA Data Center GPU Manager. |

### Metric sources

| Source | Notes |
|---|---|
| System metrics | Ingested with prefix `kubernetes.io`; not charged by Cloud Monitoring. If you enable Cloud Monitoring you cannot disable system monitoring. |
| Managed Service for Prometheus | Monitor and alert on workloads with Prometheus without managing it at scale. |
| Kube state package | Curated kube-state-metrics for Pods, Deployments, StatefulSets, DaemonSets, HPAs, PersistentVolumes, PVCs, JobSets. Managed; disable it to run your own kube-state-metrics for more flexibility. |
| cAdvisor/Kubelet package | Curated subset of cAdvisor and `kubelet` metrics to reduce volume and cost. Managed; can be disabled to run your own. |
| Kubernetes metrics | Raw Prometheus metrics at component `/metrics` endpoints; ingest with PodMonitoring and ClusterNodeMonitoring custom resources. |
| Istio metrics | Also available for GKE clusters. |

## Notes

- Package metrics are charged by number of samples ingested. If you disable Cloud Logging or Cloud Monitoring, or apply exclusion filters, GKE customer support is best-effort and may need extra effort from your team.
- If system metric collection is disabled, basic CPU, memory, and disk usage are not available in the observability views. For Autopilot clusters you cannot disable system metrics collection.
- Setting `--monitoring=SYSTEM` is a destructive change for package collection (it turns off previously enabled packages); try it on a disposable cluster first.
- The source also shows Console and Terraform.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/configure-metrics (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [observability.md](./observability.md)
- [about-logs.md](./about-logs.md)
- [dashboards.md](./dashboards.md)
- [troubleshooting.md](./troubleshooting.md)
