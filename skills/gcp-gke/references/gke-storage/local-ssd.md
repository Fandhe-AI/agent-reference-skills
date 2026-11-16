---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/local-ssd
---

# About Local SSD storage for GKE

Local SSD gives GKE nodes high-performance ephemeral storage attached to a single Compute Engine VM. Covers ephemeral and raw block modes, machine and version requirements, the gcloud parameters, access methods (emptyDir, local PersistentVolume), host maintenance and restrictions.

## Signature / Usage

### Provision Local SSD with gcloud

The source page has no code block; it lists the flags `--ephemeral-storage-local-ssd` (ephemeral storage, GKE 1.25.3-gke.1800 and later) and `--local-nvme-ssd-block` (raw block NVMe, GKE 1.25.3-gke.1800 and later) in its "Local SSD parameters on GKE" table. Verbatim examples from the gcloud help of `clusters create`:

Adapted (not in the official docs): the cluster name `example_cluster` is changed to `example-cluster`, because GKE cluster names cannot contain underscores (lowercase letters, numbers, and hyphens only).

```bash
gcloud container clusters create example-cluster \
    --ephemeral-storage-local-ssd count=2
```

```bash
gcloud container clusters create example-cluster \
    --local-nvme-ssd-block count=2
```

### Schedule onto Local SSD nodes

Node labels from the source. For ephemeral storage:

```yaml
cloud.google.com/gke-ephemeral-storage-local-ssd: "true"
```

On nodes running 1.37.0-gke.3570000 or later with mixed ephemeral and raw block storage, also:

```yaml
cloud.google.com/gke-local-nvme-ssd-partition: "true"
```

## Options / Props

### Local SSD parameters

| Type | Flag | Version | Profile |
| --- | --- | --- | --- |
| Ephemeral Storage Local SSD | `--ephemeral-storage-local-ssd` | v1.25.3-gke.1800 or later | NVMe; not shared across Pods; Pod data lifecycle; up to 9 TiB, RAID configured by GKE; file system (emptyDir); fully integrated with the Kubernetes scheduler. |
| Local NVMe SSD Block | `--local-nvme-ssd-block` | v1.25.3-gke.1800 or later | NVMe; shared via local PVs; Node data lifecycle; up to 9 TiB, manual RAID for larger sizes; raw block; not scheduler-integrated by default (integrated if you opt in to local PV). |

### Existing (older) parameters and recommended replacements

| Existing parameter | Replacement |
| --- | --- |
| `--local-ssd-count` (SCSI, 375 GiB, ext4) | `--ephemeral-storage-local-ssd` |
| `gcloud beta container clusters create --ephemeral-storage` (beta) | `--ephemeral-storage-local-ssd` |
| `gcloud alpha container clusters create --local-ssd-volumes` (alpha) | `--local-nvme-ssd-block` |

Existing parameters continue to work as-is; migrate to benefit from NVMe instead of SCSI.

### Machine and version requirements

| Series | Requirement |
| --- | --- |
| First / second generation (N1, N2, ...) | GKE 1.25.3-gke.1800 or later; you specify the number of Local SSD volumes. Machine type `n1-standard-1` or larger; default `e2-medium` is not supported. |
| Third generation | 1.25.13-gke.200 to 1.26, 1.26.8-gke.200 to 1.27, 1.27.5-gke.200 to 1.28, 1.28.1-gke.200 to 1.29 or later; capacity is fixed by the machine type. |
| Fourth generation | 1.32.1-gke.1357000 or later; capacity fixed by the machine type. |
| C4N | Not supported by GKE with Local SSD (Preview in Compute Engine). |

## Notes

- GKE automatically mounts `/var/lib/kubelet`, `/var/log/pods` and `/var/lib/containerd` onto the Local SSD volume. Using Local SSD for node ephemeral storage makes boot-disk Local SSD unavailable for other uses; do not modify `/dev/nvme*` directly with a privileged DaemonSet, HostPath or similar, or the node may fail. Use the raw block approach for fine-grained control.
- Local SSD is attached to one node and ephemeral: data does not persist when the Pod or node is deleted, repaired, upgraded or hits an unrecoverable error. Use Persistent Disk, Filestore or Cloud Storage for durable data.
- Local SSD settings cannot be changed after node pool creation; delete and re-create the node pool. All emptyDir volumes in the pool use Local SSD; you cannot mix with boot-disk-backed emptyDir in the same node pool.
- Autopilot: ephemeral Local SSD is not supported by most ComputeClasses; Autopilot and node auto-provisioning support Local SSD only through custom ComputeClasses. Use generic ephemeral volumes backed by Persistent Disk instead. Some GPU Pods have ephemeral Local SSD enabled by default.
- Local persistent volumes are recommended for StatefulSets with `volumeClaimTemplates`, shared node pools, and data gravity to the same Local SSD.
- Host maintenance: Z3 with more than 18 TiB Titanium SSD, Z4D with more than 42 TiB, and Z4M with more than 48 TiB (or any Z4M using Cloud RDMA) are terminated during maintenance, so data may be unavailable and recovery is not assured. The GKE maintenance-handler taints such nodes and evicts Pods, respecting PodDisruptionBudgets.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/container/clusters/create (gcloud 593.0.0 help examples for `--ephemeral-storage-local-ssd` and `--local-nvme-ssd-block`); the concept page itself has no code.
- Source inconsistency: this page says "Autopilot and node auto-provisioning support Local SSD only through custom ComputeClasses", while storage-overview.md says "Autopilot support is in preview on A2 Ultra A100 machines, on clusters and node pools running GKE 1.27 and later". The source does not reconcile the two.
- Corrected from the official docs: the `gcloud container clusters create --help` examples use the name `example_cluster`, but GKE cluster names allow only lowercase letters, numbers, and hyphens; the examples use `example-cluster`.
- Source (gcloud help): `gcloud container clusters create --help` (gcloud 593.0.0, retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/local-ssd (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [storage-overview.md](./storage-overview.md)
- [persistent-volumes.md](./persistent-volumes.md)
- [gce-pd-csi-driver.md](./gce-pd-csi-driver.md)
