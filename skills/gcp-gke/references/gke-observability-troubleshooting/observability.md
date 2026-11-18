---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/observability
---

# Observability for GKE

Overview of the observability features in Google Kubernetes Engine (GKE) for monitoring application health and availability: default logs and metrics collection, optional metrics packages, Managed Service for Prometheus, dashboards, alerting, SLOs and related Google Cloud services.

## Signature / Usage

### Default behavior

By default, GKE clusters:

- Send system logs, audit logs, and application logs to Cloud Logging.
- Send system metrics to Cloud Monitoring.
- Use Google Cloud Managed Service for Prometheus to collect configured third-party and user-defined metrics and send them to Cloud Monitoring.

By default GKE creates a Logging repository for storing logs for each cluster. You can control which logs and metrics, if any, are sent to Cloud Logging and Cloud Monitoring, and whether to enable Managed Service for Prometheus.

### Control which metrics are collected

Snippet taken from https://docs.cloud.google.com/kubernetes-engine/docs/how-to/configure-metrics (the `--monitoring` flag sets which metrics are sent):

```bash
gcloud container clusters update CLUSTER_NAME \
    --location=COMPUTE_LOCATION \
    --enable-managed-prometheus \
    --monitoring=SYSTEM
```

## Options / Props

### Additional observability metrics

| Method | What it provides |
|---|---|
| Control plane metrics package | Metrics for the Kubernetes API server, Scheduler, and Controller Manager; useful signals for defining SLOs. |
| Kube state metrics package | Health of Kubernetes objects such as Deployments, Nodes, and Pods. |
| cAdvisor/Kubelet metrics package | Health of containers and the `kubelet`. |
| Managed Service for Prometheus (specific metrics) | Collect a metric that is not in a package, or only a subset of a package. |
| Prometheus exporters | Monitor third-party apps such as Postgres, MongoDB, Redis. You can also write custom exporters. |

### Using collected data

| Feature | Notes |
|---|---|
| GKE observability dashboards | Key cluster metrics (CPU, memory, open incidents); view by infrastructure, workloads, or Services; inspect namespaces, Nodes, workloads, Services, Pods, containers; Pod and container metrics over time and log entries. You can also create your own dashboards or import Grafana dashboards. |
| AI/ML workload view | Google Cloud console view of JobSets, RayJobs, PyTorchJobs, and Deployments for inference serving. |
| Observability tab alerts | Create recommended alert policies. |
| SLOs | Create SLOs from collected GKE metrics. |
| Playbooks | Troubleshoot unschedulable Pods and `CrashLoopBackOff`. |
| Explorers | Logs Explorer, Metrics Explorer, Error Reporting. |
| Audit logs | Cloud Audit Logs record administrative activities and accesses; the audit log policy decides Admin Activity vs Data Access entries. |

### Other features

| Feature | Notes |
|---|---|
| Security posture dashboard | Identify security concerns against standards and best practices. |
| Insights and recommendations | Optimize clusters. |
| Network policy logging | Troubleshoot Kubernetes network policies. Built in if you use GKE Dataplane V2. |

## Notes

- For GKE Autopilot clusters, you cannot disable the Cloud Monitoring and Cloud Logging integration.
- The provided GKE dashboards only display information for GKE clusters running on Google Cloud, not clusters running elsewhere (for example on-premises or bare metal).
- Pricing for Cloud Logging (including Cloud Audit Logs), Cloud Monitoring, and Managed Service for Prometheus is based on the amount of logs and metrics collected. Features of other Google Cloud services listed under "Other features" have separate pricing.
- Cloud Monitoring and Cloud Logging in general belong to `gcp-observability`; this page covers the GKE integration.
- The source has no code block; the snippet above is borrowed from the configure-metrics page in this category. The values passed to `--monitoring` override any previous setting, so `--monitoring=SYSTEM` turns off previously enabled metric packages; try it on a disposable cluster first.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/observability (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/configure-metrics (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-logs.md](./about-logs.md)
- [view-logs.md](./view-logs.md)
- [configure-metrics.md](./configure-metrics.md)
- [audit-policy.md](./audit-policy.md)
- [dashboards.md](./dashboards.md)
- [managed-otel-gke.md](./managed-otel-gke.md)
