---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/hyperdisk
---

# About Hyperdisk for GKE

Google Cloud Hyperdisk is network block storage on GKE with per-volume tunable IOPS and throughput (unlike Persistent Disk, where performance is shared across volumes on a node). Covers the Hyperdisk options, limitations, supported node scheduling, automated disk type selection and performance planning.

## Signature / Usage

### StorageClass with supported node scheduling

Requires cluster and node pools on GKE 1.34.1-gke.2541000 or later; volumes from this StorageClass do not schedule on node pools at lower versions.

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: hyperdisk-balanced-compatible-scheduling
provisioner: pd.csi.storage.gke.io
volumeBindingMode: WaitForFirstConsumer
allowVolumeExpansion: true
parameters:
  type: hyperdisk-balanced
  use-allowed-disk-topology: "true"
```

### Automated disk type selection

Requires GKE 1.35.3-gke.1290000 or later. Hyperdisk on Hyperdisk-capable machine series (C4, C3, N4), falling back to Persistent Disk (N2D, C2).

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: dynamic-volume
provisioner: pd.csi.storage.gke.io
volumeBindingMode: WaitForFirstConsumer
allowVolumeExpansion: true
parameters:
  type: dynamic
  pd-type: pd-balanced
  hyperdisk-type: hyperdisk-balanced
  use-allowed-disk-topology: "true"
  # The parameters below only apply to the hyperdisk-type and are ignored if
  # the pd-type is selected.
  provisioned-throughput-on-create: "250Mi"
  provisioned-iops-on-create: "3000"
```

### Autopilot Performance compute class with Hyperdisk Balanced

Node selector labels to control Pod scheduling (the machine type must be supported by both Hyperdisk and the compute class):

```yaml
cloud.google.com/compute-class: "Performance"
cloud.google.com/machine-family: "c3"
```

## Options / Props

### Hyperdisk options (all on Autopilot and Standard)

| Option | Description |
| --- | --- |
| Hyperdisk Balanced | Best fit for most workloads: enterprise and line-of-business apps, databases, web servers. |
| Hyperdisk Throughput | Cost-efficient high throughput: scale-out analytics (Hadoop, Kafka), throughput-oriented cost-sensitive workloads. |
| Hyperdisk Extreme | Optimized for IOPS: database management systems. |
| Hyperdisk ML | AI/ML training and inference loading model weights; high peak read throughput. |
| Hyperdisk Balanced High Availability | Balanced-level performance with synchronous replication across two zones; for HA or multi-node concurrent writes. |

### Dynamic disk type parameters (`parameters.type: dynamic`)

| Parameter | Description |
| --- | --- |
| `hyperdisk-type` | Hyperdisk type on nodes that support Hyperdisk. Default `hyperdisk-balanced`. |
| `pd-type` | Persistent Disk type on nodes that support Persistent Disk. Default `pd-balanced`. |
| `disk-type-preference` | Type on nodes that support both: `hyperdisk-type` (default) or `pd-type`. |

GKE applies only the parameters that correspond to the disk type it creates. Best practice: also set `use-allowed-disk-topology: true`.

### Performance rules

| Type | Rule |
| --- | --- |
| Hyperdisk Balanced | Capacity provisioned separately from throughput and IOPS; read and write both count; limited by per-VM limits. |
| Hyperdisk Throughput | At least 10 MiB/s per TiB and no more than 90 MiB/s per TiB of capacity, depending on machine type; at most 600 MiB/s per volume, depending on machine type. |
| Hyperdisk Extreme | No more than 350,000 IOPS, depending on machine type. |
| Hyperdisk ML | Throughput minimum: greater of (0.12 MBps \* disk size in GiB) or 400 MBps. Maximum: (1,600 MBps \* disk size in GiB), not more than 1.2 TBps. If attached to more than 20 instances in `READ-ONLY-MANY` mode, at least 100 MBps \* number of instances. |
| Hyperdisk Balanced HA | Same model as Balanced (separate capacity, throughput and IOPS); limited by per-VM limits. |

## Notes

- Support depends on the disks and machine type of the node; see the Compute Engine Hyperdisk documentation for current limits.
- Billing: provisioned capacity per GiB per month; Balanced additionally charges provisioned IOPS and throughput above the baseline of 3,000 IOPS and 140 MiB/s; Extreme charges provisioned IOPS; Throughput charges provisioned throughput.
- Limitations: after creation, only throughput (Throughput and Balanced) and IOPS (Extreme and Balanced) can be modified, through the Compute Engine API; Hyperdisk attaches only to specific instance types and read-only attachments are not supported. Hyperdisk ML cannot be a boot disk, cannot be used in multi-writer mode and does not support Storage Pools. Hyperdisk Balanced HA cannot use `ReadOnlyMany`, supports `ReadWriteMany` only with `volumeMode: Block` (application must manage consistency) and does not support snapshots in `ReadWriteMany` mode.
- Newer machine series (C4, C4D, N4) support only Hyperdisk, older ones (N2, N2D) Persistent Disk; automated selection avoids stateful Pods failing to fail over across generations during a zonal shortage.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/hyperdisk (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [storage-overview.md](./storage-overview.md)
- [gce-pd-csi-driver.md](./gce-pd-csi-driver.md)
- [persistent-volume-attach-limits.md](./persistent-volume-attach-limits.md)
