---
source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/view-logs
---

# View GKE logs

How to find and use GKE logs: console pages, Logs Explorer, `gcloud logging read`, GKE log resource types, and the Cloud Logging log names for system, event, application, control plane and identity issuance logs.

## Signature / Usage

### Ways to access logs

- Console, **Kubernetes Engine**: the **Logs** tab of a cluster (with suggested queries); a workload's **Container logs** / **Audit logs** links or **Logs** tab; the **AI/ML** section.
- Console, **Logging** > **Logs Explorer**: use filters for cluster, node, namespace, Pod, or container logs; use the **Logs field explorer** to pick Kubernetes values.
- Console, **Monitoring**: GKE dashboards show metrics and logs for clusters, nodes, and Pods.
- Google Cloud CLI: query logs with `gcloud logging read`. For custom aggregation or analytics, export with sinks to BigQuery, Cloud Storage, or Pub/Sub.

### Cloud Logging log names

```text
projects/PROJECT_ID/logs/cloudaudit.googleapis.com%2Fdata_access
projects/PROJECT_ID/logs/cloudaudit.googleapis.com%2Factivity
projects/PROJECT_ID/logs/cloudaudit.googleapis.com%2Fsystem_event
projects/PROJECT_ID/logs/events
projects/PROJECT_ID/logs/stderr
projects/PROJECT_ID/logs/stdout
projects/PROJECT_ID/logs/container.googleapis.com%2Fapiserver
projects/PROJECT_ID/logs/container.googleapis.com%2Fscheduler
projects/PROJECT_ID/logs/container.googleapis.com%2Fcontroller-manager
projects/PROJECT_ID/logs/container.googleapis.com%2Fkcp_connection
projects/PROJECT_ID/logs/container.googleapis.com%2Fkcp_ssh
```

## Options / Props

### Resource types

| Resource type | Description |
|---|---|
| `gke_cluster` | GKE cluster operations logs |
| `gke_nodepool` | GKE node pool operations logs |
| `k8s_cluster` | Kubernetes cluster logs |
| `k8s_node` | Kubernetes node logs |
| `k8s_pod` | Kubernetes Pod logs |
| `k8s_container` | Kubernetes container logs |
| `k8s_control_plane_component` | Kubernetes control plane component logs |

### Log categories

| Category | Log name / resource type | Notes |
|---|---|---|
| Audit (system) | `cloudaudit.googleapis.com%2Fdata_access` (Data Access), `%2Factivity` (Admin Activity), `%2Fsystem_event` (System Event) | See Audit logging docs. |
| Kubernetes Events | `events`; resource `k8s_pod` (Pod Events), `k8s_node` (Node Events), `k8s_cluster` (all other Events) | Events report state changes, node/Pod errors, scheduling failures. |
| Application | `stdout`, `stderr`; resource `k8s_container` | Workload `STDOUT` / `STDERR`. |
| Control plane component | `container.googleapis.com%2Fapiserver`, `%2Fscheduler`, `%2Fcontroller-manager`; resource `k8s_control_plane_component` | Only if control plane logs are enabled. |
| Control plane access | `container.googleapis.com%2Fkcp_connection`, `%2Fkcp_ssh`; resource `gke_cluster` | GKE control plane authority only; correlate with Access Transparency and API server logs. |
| Cluster identity issuance | `cloudaudit.googleapis.com%2Fsystem_event`; resource `gke_cluster` | GKE control plane authority with your own CAs and signing keys; audit of X.509 / JWT issuance. |

System logs come from all Pods in namespaces `kube-system`, `istio-system`, `knative-serving`, `gke-system`, `config-management-system`; non-containerized services (`docker`/`containerd`, `kubelet`, `kubelet-monitor`, `node-problem-detector`, `kube-container-runtime-monitor`); node serial port output when VM metadata `serial-port-logging-enable` is true; and Kubernetes Events.

## Notes

- Serial port output collection: as of GKE 1.16-13-gke.400 it is collected by the Logging agent. To disable it set `--metadata serial-port-logging-enable=false` during cluster creation; disabling might limit troubleshooting of crashes, failed boots, startup, or shutdown issues.
- Changing control plane log collection restarts the control plane. In zonal Standard clusters the control plane is unavailable until the restart completes; in regional and Autopilot clusters it remains available.
- The source has no code block; the log-name block lists the names given in the page text.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/view-logs (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-logs.md](./about-logs.md)
- [audit-policy.md](./audit-policy.md)
- [cluster-notifications.md](./cluster-notifications.md)
- [troubleshooting.md](./troubleshooting.md)
