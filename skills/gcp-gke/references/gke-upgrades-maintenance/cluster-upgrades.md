---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/cluster-upgrades
---

# Standard cluster upgrades

How automatic and manual upgrades work for GKE Standard clusters: control plane and node pool upgrade behavior, auto-upgrade version selection, failure handling, upgrade logs and component upgrades.

## Signature / Usage

### Query control plane upgrade events

```
resource.type="gke_cluster"
protoPayload.metadata.operationType=~"(UPDATE_CLUSTER|UPGRADE_MASTER)"
resource.labels.cluster_name="CLUSTER_NAME"
```

### Query node pool upgrade events

```
resource.type="gke_nodepool"
protoPayload.metadata.operationType="UPGRADE_NODES"
resource.labels.cluster_name="CLUSTER_NAME"
```

## Options / Props

### Control plane availability during upgrades

| Cluster type | Behavior |
| --- | --- |
| Zonal | Single control plane. Workloads keep running, but you can't deploy new workloads, modify existing ones, or change cluster configuration until the upgrade completes. |
| Regional | Multiple control plane replicas, upgraded one at a time in an undefined order. The cluster stays highly available. |

### Control plane upgrade methods

| Upgrade | Automatic | Manual |
| --- | --- | --- |
| Patch version | One-step | One-step |
| Minor version | Two-step (soak time, rollback possible) when upgrading to GKE minor version 1.33 or later; one-step for earlier versions | One-step or two-step |

### Node pool upgrade behavior

- By default GKE auto-upgrades one node pool at a time. Concurrent node pool upgrades are Preview.
- Nodes in a pool are upgraded one at a time in arbitrary order; multi-zone pools upgrade zone by zone.
- Strategies: surge (default), blue-green, autoscaled blue-green (Preview). Autopilot-managed node pools in Standard clusters always use surge upgrades and can't be reconfigured.
- Node upgrade steps: cordon, drain (surge upgrades respect PodDisruptionBudget and graceful termination for up to one hour), the control plane reschedules controller-managed Pods; unschedulable Pods stay Pending.
- A node pool upgrade can take up to a few hours.
- Duration is increased by: a high `terminationGracePeriodSeconds`, a conservative Pod Disruption Budget, node affinity interactions, attached PersistentVolumes.

### Auto-upgrade facts

| Topic | Detail |
| --- | --- |
| Default | On Standard cluster creation, auto-upgrade is enabled on the cluster and its node pools. |
| Control plane | Upgraded regularly; can't be disabled; maintenance windows and exclusions can temporarily suspend. |
| Node version lag | Node pools can be no more than two minor versions behind the control plane. |
| Alpha clusters | Node auto-upgrade is not available; alpha clusters can't be enrolled in release channels. |
| Manual upgrades | Bypass maintenance windows and exclusions. You can't upgrade more than one minor version at a time (for example 1.12.x to 1.13.x, not 1.11.x to 1.13.x). |
| Failure handling | GKE retries with increasing intervals, does not roll back already-upgraded nodes, and reduces concurrent surge nodes if the Compute Engine quota is exceeded. |

### Upgrade log fields

| Field | Description |
| --- | --- |
| `protoPayload.metadata.operationType` | `UPGRADE_MASTER` (control plane version upgrade) or `UPDATE_CLUSTER` (update that doesn't change the version). Both can cause loss of control plane availability for zonal clusters. |
| `protoPayload.methodName` | `google.container.v1.ClusterManager.UpdateCluster` (manual control plane upgrade), `google.container.internal.ClusterManagerInternal.UpdateClusterInternal` (automatic control plane upgrade), `google.container.v1.ClusterManager.PatchCluster` (cluster configuration change). |
| `protoPayload.metadata.previousMasterVersion` | Used only for the `MASTER_UPGRADE` operation type; previous control plane version. |
| `protoPayload.metadata.currentMasterVersion` | Used only for the `MASTER_UPGRADE` operation type; new control plane version. |

For node pool logs, `protoPayload.methodName` is `google.container.v1.ClusterManager.UpdateNodePool` (manual) or `google.container.internal.ClusterManagerInternal.UpdateClusterInternal` (automatic).

## Notes

- Pods not managed by a workload controller ignore PodDisruptionBudget, `terminationGracePeriodSeconds` and `preStop` hooks during a node drain; they terminate immediately and are not re-created. Manage Pods with a workload controller.
- Cluster Autoscaler scale-up can still occur during a node pool upgrade; in a multi-zone pool a node may be created on the older version.
- Accelerator (GPU/TPU) VMs don't support live migration, so Compute Engine shuts down and re-creates nodes during host maintenance; do host maintenance and GKE node upgrades together.
- With a maintenance window configured, an upgrade doesn't start until the current time is within a window; if the window expires before completion GKE tries to pause it and resumes in the next window.
- A version is not selected for auto-upgrade right away: it must accumulate enough usage to prove stability. GKE gradually rolls out across regions/zones and across Rapid, Regular, then Stable; it may pause auto-upgrades for clusters using APIs removed in the next minor version and may delay rollouts at peak times.
- If surge `maxSurge` is more than 0 and `maxUnavailable=0`, existing node capacity is maintained when a node upgrade fails.
- System components such as `gke-metadata-server` (Workload Identity Federation for GKE) are upgraded with the control plane or nodes; check the feature documentation and release notes for the version that carries a fix.
- Source inconsistency: this page says "alpha clusters can't be enrolled in release channels", while release-channels.md says "Enroll alpha clusters in the Rapid channel to access alpha patch versions". See release-channels.md for the release-channel page itself.
- Source inconsistency: the Manual upgrades row says "You can't upgrade more than one minor version at a time (for example 1.12.x to 1.13.x, not 1.11.x to 1.13.x)", while versioning.md says GKE does not allow skipping minor versions "for the cluster control plane" and that "Nodes can skip minor versions (for example 1.32 to 1.34)". The versioning page distinguishes control plane from nodes; follow it for node pools.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/cluster-upgrades (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [upgrades.md](./upgrades.md)
- [node-pool-upgrade-strategies.md](./node-pool-upgrade-strategies.md)
- [maintenance-windows-and-exclusions.md](./maintenance-windows-and-exclusions.md)
- [release-channels.md](./release-channels.md)
