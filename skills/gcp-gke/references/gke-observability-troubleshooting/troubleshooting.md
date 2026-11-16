---
source: https://docs.cloud.google.com/kubernetes-engine/docs/troubleshooting
---

# Troubleshoot GKE

Index of GKE troubleshooting documents grouped by area: introduction, cluster setup, autoscaling, storage, security, workloads, cluster management, monitoring, 4xx errors, and known issues. For networking see "Troubleshoot GKE networking" in the GKE networking docs.

## Signature / Usage

### Inspect the cluster configuration first

Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/container/clusters/describe (the source page itself has no code):

Adapted (not in the official docs): added `--location=CONTROL_PLANE_LOCATION`, which the source omits.

```bash
gcloud container clusters describe sample-cluster \
    --location=CONTROL_PLANE_LOCATION
```

## Options / Props

URLs are under `https://docs.cloud.google.com/kubernetes-engine/docs/troubleshooting/`.

| Area | Topic (path) | Covers |
|---|---|---|
| Introduction | `introduction` | Overall process and fundamentals. |
| Introduction | `introduction-service-health` | Check health of GKE and related services to rule out platform issues. |
| Introduction | `introduction-console` | Assess cluster and workload health in the console. |
| Introduction | `introduction-kubectl` | Common `kubectl` diagnostic commands. |
| Introduction | `introduction-logging` | Historical analysis with Cloud Logging. |
| Introduction | `introduction-monitoring` | Proactive monitoring with Cloud Monitoring. |
| Introduction | `introduction-gemini` | Gemini Cloud Assist. |
| Introduction | `introduction-example` | Example troubleshooting scenario. |
| Cluster setup | `cluster-creation` | Cluster creation issues. |
| Cluster setup | `autopilot-clusters` | Autopilot creation, namespace deletion, scaling, workloads. |
| Cluster setup | `kubectl` | Authentication, authorization, and the Konnectivity proxy (`kubectl logs`, `attach`, `exec`, `port-forward` hangs). |
| Cluster setup | `node-pools` | Standard node pool creation, best-effort provisioning, corrupted instance metadata, migrating workloads. |
| Cluster setup | `node-notready` | Node `NotReady` status. |
| Cluster setup | `node-registration` | Node registration failures. |
| Cluster setup | `container-runtime` | `containerd`, `dockershim`, private registries. |
| Cluster setup | `windows-server-node-pools` | Windows Server node pool issues. |
| Autoscaling | `cluster-autoscaler-scale-down` | Restrictive PDBs, local storage, `"cluster-autoscaler.kubernetes.io/safe-to-evict": "false"`. |
| Autoscaling | `cluster-autoscaler-scale-up` | Unschedulable Pods, size limits, quota, regional VM availability. |
| Autoscaling | `horizontal-pod-autoscaling` | HPA not scaling. |
| Autoscaling | `vertical-pod-autoscaling` | VPA not scaling. |
| Storage | `storage` | Regional persistent disks, disk performance, volume expansion. |
| Security | `authentication` | RBAC, Workload Identity Federation for GKE, GKE metadata server. |
| Security | `service-accounts` | Restoring the default service account, enabling the Compute Engine default service account. |
| Security | `troubleshoot-secrets` | Application-layer secrets encryption, Cloud KMS key errors. |
| Security | `how-to/credential-rotation` (under `/kubernetes-engine/docs/`) | Root CA expiring soon. |
| Workloads | `deployed-workloads` | `PodUnschedulable`, `MatchNodeSelector`, `Does not have minimum availability`. |
| Workloads | `image-pulls` | `ImagePullBackOff`, `ErrImagePull`. |
| Workloads | `crashloopbackoff-events` | Resource exhaustion, misconfiguration, liveness probe failures. |
| Workloads | `oom-events` | Container- and node-level OOM kills. |
| Workloads | `arm-workloads`, `tpus`, `gpus` | Arm, TPU (quota, node auto-provisioning, scheduling), GPU (driver install, device plugin). |
| Cluster management | `upgrades` | Long or incomplete upgrades, unexpected auto-upgrades, failures. |
| Cluster management | `how-to/optimize-webhooks` (under `/kubernetes-engine/docs/`) | Admission webhook stability. |
| Cluster management | `terminating-namespaces` | Namespace stuck in `Terminating`. |
| Cluster management | `concurrent-operations` | Concurrent operation errors. |
| Monitoring | `system-metrics` | System metrics missing in Cloud Monitoring. |
| Monitoring | `dashboards` | Monitoring dashboards: enabling, missing resources, permissions. |
| Monitoring | `logging` | Missing logs: API status, cluster settings, permissions, quotas, filters. |
| Errors | `4xx-errors` | 400, 401, 403, 404 errors, missing edit permissions on account. |
| Known issues | `known-issues` | Known issues affecting GKE use. |

## Notes

- This page is an index. The official page is for Admins and architects, Security, Networking, and Storage specialists. Support options: Cloud Customer Care, StackOverflow tag `google-kubernetes-engine`, the `#kubernetes-engine` Slack channel, and the public issue tracker.
- The source has no code block; the snippet above is borrowed from the gcloud help text of `clusters describe`. If `--location` / default `compute/region` or `compute/zone` is not set, add `--location=LOCATION`.
- Corrected from the official docs: the source runs `gcloud container clusters describe sample-cluster` without a location, which works only when a default `compute/zone` or `compute/region` is configured; the example now passes `--location=CONTROL_PLANE_LOCATION`.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/troubleshooting (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/clusters/describe (gcloud 593.0.0 help text, retrieved 2026-11-14)

## Related

- [about-logs.md](./about-logs.md)
- [view-logs.md](./view-logs.md)
- [configure-metrics.md](./configure-metrics.md)
- [observability.md](./observability.md)
