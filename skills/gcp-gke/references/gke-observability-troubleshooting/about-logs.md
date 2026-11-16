---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/about-logs
---

# About GKE logs

Overview of GKE logging: the per-node logging agent, which logs are collected, the `--logging` flag values, throughput, custom agents, access control roles, best practices, pricing, quota, and access controls for control plane logs.

## Signature / Usage

### Log names written to Cloud Logging

Snippet taken from https://docs.cloud.google.com/kubernetes-engine/docs/how-to/view-logs (log names; `PROJECT_ID` is your project ID):

```text
projects/PROJECT_ID/logs/cloudaudit.googleapis.com%2Fdata_access
projects/PROJECT_ID/logs/cloudaudit.googleapis.com%2Factivity
projects/PROJECT_ID/logs/cloudaudit.googleapis.com%2Fsystem_event
projects/PROJECT_ID/logs/events
```

### How logs are collected

- GKE logs sent to Cloud Logging are stored in a dedicated, persistent datastore. GKE itself also stores logs, but not permanently: container logs are removed when their Pod is removed, when the disk runs out of space, or when replaced by newer logs. System logs are periodically removed. Cluster events are removed after one hour.
- By default GKE deploys a per-node, fluentbit-based logging agent that reads standard output/error from containerized processes, kubelet and container runtime logs, and system component logs (such as VM startup scripts), adds metadata, and sends them to Cloud Logging.
- Events are collected by a deployment in the `kube-system` namespace (event-exporter), which works on a best-effort basis; use logs and metrics in addition to Events.
- Logs go to the Log Router, from where they can be ingested, excluded, or exported to BigQuery, Pub/Sub, or Cloud Storage. A Standard cluster can capture system logs only. Exclusion filters reduce volume on both Autopilot and Standard.
- Log throughput: if nodes need more than the default throughput and a Standard cluster uses control plane version 1.23.13-gke.1000 or later, you can deploy an alternative agent configuration that maximizes throughput (see "Adjust log throughput" in the official docs).
- You cannot customize the managed agent directly, but you can deploy your own custom fluentd or fluentbit `DaemonSet` for application logs. Running it alongside the default agent for the same logs produces duplicate logs.
- Verbose operating system audit logs (Linux `auditd`) can be enabled on nodes running Container-Optimized OS.

## Options / Props

### `--logging` flag values

Supported by `gcloud container clusters create` and `update` (https://docs.cloud.google.com/sdk/gcloud/reference/container/clusters/create).

| Log source | `--logging` value | Logs collected |
|---|---|---|
| None | `NONE` | No logs sent to Cloud Logging; no log collection agent installed. Not supported for Autopilot clusters. |
| System | `SYSTEM` | All Pods in namespaces `kube-system`, `istio-system`, `knative-serving`, `gke-system`, `config-management-system`; non-containerized services (`docker`/`containerd` runtime, `kubelet`, `kubelet-monitor`, `node-problem-detector`, `kube-container-runtime-monitor`); node serial port output if VM metadata `serial-port-logging-enable` is true; Kubernetes events. Required for all cluster types. |
| Workloads | `WORKLOAD` | All logs from non-system containers on user nodes. On by default, optional for all cluster types. |
| API server | `API_SERVER` | All logs from `kube-apiserver`. Optional. |
| Scheduler | `SCHEDULER` | All logs from `kube-scheduler`. Optional. |
| Controller manager | `CONTROLLER_MANAGER` | All logs from `kube-controller-manager`. Optional. |
| Horizontal Pod Autoscaler | `KCP_HPA` | Atomic and final recommendation decision logs for each HPA object. |
| Vertical Pod autoscaler (Preview) | `KCP_VPA` | Decision logs for each VPA object. |
| Control plane network connections | `KCP_CONNECTION` | Only with GKE control plane authority. Inbound network connection logs for control plane instances. |
| Control plane SSH events | `KCP_SSHD` | Only with GKE control plane authority. Logs for SSH events (public key acceptance, session closure) when Google personnel connect to control plane instances. |

### Application log limitations

Application logs might fail to reach Cloud Logging when:

- JSON logs contain duplicated keys (not supported).
- `stream` is a reserved key in the GKE logging pipeline; a `stream` key in an application JSON log can cause unexpected behavior and dropped logs.
- A LogEntry exceeds the Cloud Logging size limit: dropped for `jsonPayload` logs, truncated for `textPayload` logs.

### IAM roles for logging

| Role / permission | Purpose |
|---|---|
| `roles/logging.logWriter` | Applications write logs; assign to the service account attached to the node pool. |
| `roles/logging.viewer` | View logs in the project. |
| `roles/logging.privateLogViewer` (Private Logs Viewer; includes the `logging.privateLogEntries.list` permission) | Access Data Access logs. |
| `roles/logging.configWriter` | Required to create a logging sink (for example to route a namespace's logs to a central bucket). |
| `roles/logging.admin` | Administrative capabilities. |

### Best practices

- Structured logging: the agent reads JSON documents serialized to single-line strings written to stdout/stderr and sends them as structured entries. `glog` logs have common fields parsed (`severity`, `pid`, `source_file`, `source_line`) but the message payload stays unparsed.
- Severities: stdout is `INFO`, stderr is `ERROR` by default; structured logs can set a `severity` field.
- Export to BigQuery or Pub/Sub for analysis; use logs-based metrics for alerting; use Error Reporting for application errors.

## Notes

- Audit logs for GKE cannot be disabled.
- If you disable Cloud Logging or Cloud Monitoring, or configure exclusion filters that block GKE logs and metrics, you cannot share them with Google Cloud support, so troubleshooting is less effective.
- Quota: control plane logs consume the per-region ingestion quotas of the Cloud Logging API. Check recent peak usage and request an increase before enabling them if you have many clusters per project. Exceeding the quota can cause "resource exhausted" write errors; it affects observability but does not throttle control plane operations or running workloads.
- Access control: store control plane logs in a separate log bucket with limited access so they are not visible to everyone with `roles/logging.viewer`, and so they can be deleted without affecting other logs.
- Pricing: Cloud Logging pricing applies; exporting to services such as BigQuery incurs their storage costs.
- The source has no code block; the snippet above is borrowed from the view-logs page in this category.
- Corrected from the official docs: the source says Data Access logs need "the `logging.privateLogViewer` IAM permission", but `logging.privateLogViewer` is a role (`roles/logging.privateLogViewer`); the permission that grants read access to private log entries is `logging.privateLogEntries.list`.
- Source (IAM roles): https://docs.cloud.google.com/iam/docs/roles-permissions/logging (retrieved 2026-11-16)
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/about-logs (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/view-logs (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [view-logs.md](./view-logs.md)
- [observability.md](./observability.md)
- [audit-policy.md](./audit-policy.md)
- [configure-metrics.md](./configure-metrics.md)
