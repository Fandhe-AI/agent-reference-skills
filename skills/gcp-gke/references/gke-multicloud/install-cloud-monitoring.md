---
source: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/generic/how-to/install-cloud-monitoring
---

# Install Cloud Monitoring for attached clusters

GKE attached clusters has built-in integration with Cloud Monitoring for system metrics of nodes, pods and containers. The `gke-metrics-agent` (based on OpenTelemetry Collector) runs on every node, samples metrics every minute and uploads them to your Google Cloud project, where you can aggregate, build dashboards and alerts.

## Signature / Usage

### Select a cluster in metrics

Metrics use the monitored resource types `k8s_node`, `k8s_container` and `k8s_pod`. For a specific cluster use this format:

```text
attachedClusters/CLUSTER_NAME
```

### Metrics Explorer (console)

Metrics explorer > Select a metric > filter `Kubernetes Container` > Active resources: Kubernetes Container > Active metric categories: Anthos > Active metrics: CPU usage time > Apply. Use Filter and Aggregation elements to refine; for one-sample-per-day metrics use a Stacked bar chart over at least one week.

## Options / Props

| Monitored resource type | Notes |
| --- | --- |
| `k8s_node` | Node measurements |
| `k8s_container` | Container measurements |
| `k8s_pod` | Pod measurements; labels include `pod_name` and `namespace_name` |

## Notes

- Prerequisites: cluster prerequisites and authorizing Cloud Logging and Cloud Monitoring (see [attach-cluster-generic.md](./attach-cluster-generic.md); unnecessary from Kubernetes 1.28).
- Collected metrics are listed per platform version at `https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/generic/reference/versions/<VERSION>/metrics` for versions v1.25.0-gke.8 through v1.35.0-gke.1 (for example v1.35.0-gke.1, v1.34.0-gke.2).
- Metric types per resource: https://cloud.google.com/monitoring/api/metrics_kubernetes
- Next: managed data collection with Managed Service for Prometheus (https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/generic/how-to/managed-service-prometheus).
- Snippet in this page is the single code block from the source.
- Source: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/generic/how-to/install-cloud-monitoring (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [install-cloud-logging.md](./install-cloud-logging.md)
- [attach-cluster-generic.md](./attach-cluster-generic.md)
