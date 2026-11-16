---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/cloud-storage-fuse-csi-driver
---

# About the Cloud Storage FUSE CSI driver for GKE

The Cloud Storage FUSE CSI driver mounts Cloud Storage buckets as local file systems in Pods, with CSI ephemeral volumes or statically provisioned PersistentVolumes. It targets AI/ML training, inference and data analytics workloads.

## Signature / Usage

The source page has no code. Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/container/clusters/update (the add-on value of `--update-addons` that turns the driver on or off):

```text
GcsFuseCsiDriver=ENABLED|DISABLED
```

Supported access modes: `ReadWriteMany`, `ReadOnlyMany` and `ReadWriteOnce`.

Two volume styles: CSI ephemeral volumes (bucket named inline in the Pod spec, no PV/PVC) and PersistentVolumes (static provisioning, Pod references a bound PVC).

## Options / Props

### Requirements

| Requirement | Detail |
| --- | --- |
| Cluster | Linux clusters on GKE 1.24 or later. |
| Identity | Workload Identity Federation for GKE and the GKE metadata server enabled. |
| CLI | Latest Google Cloud CLI. |

### Performance features

| Feature | Detail |
| --- | --- |
| Native sidecar | Sidecar container injected into the Pod; CPU/memory and cache/buffer settings are configurable; coexists with Istio. |
| Parallel download | GKE 1.30.3-gke.1571000 and later with Cloud Storage FUSE v2.4.0 and file cache enabled; speeds reads of large files (over 1 GB). |
| Metadata (stat) cache | Enabled by default; size and TTL configurable. |
| File cache | Client-side read cache on Local SSD, Persistent Disk or RAM disk. |
| Node restart support | GKE 1.33.1-gke.1959000 and later: Pods recover after a node restart. With Graceful Node Shutdown the Pod must be managed by a controller (Job, Deployment); standalone Pods restart automatically on nodes without it. Earlier versions require redeploy. |
| Profiles | Pre-defined Cloud Storage FUSE profiles for training, serving and checkpointing. |

### Limitations

| Limitation | Detail |
| --- | --- |
| POSIX differences | Differences in performance, availability, authorization and semantics from a POSIX file system. |
| GKE Sandbox | Not supported. |
| Volume features | No volume snapshots, cloning or expansion. |
| Bucket access | Uniform bucket-level access required for read-write workloads with Workload Identity Federation for GKE. |
| Host network | Before 1.33.3-gke.1226000, `hostNetwork: true` Pods are not supported; on Standard clusters 1.33.3-gke.1226000 or later they can authenticate with their own Kubernetes Service Account. |
| mountOption size | Before 1.32.3-gke.1099000 the encrypted JSON `mountOption` string (bucket name + user mount options + driver options) must be under 500 characters; limit raised to 5,000 bytes in 1.32.3-gke.1099000 or later. |

## Notes

- Does not need privileged access; use Workload Identity Federation for GKE for authentication. This is distinct from Workload Identity Federation for external workloads (AWS / Azure / OIDC), which is in `gcp-foundation`.
- Supported on all GKE accelerators (GPUs and TPUs); volumes can be consumed in init containers; metrics insights are available.
- The Cloud Storage bucket itself and Cloud Storage FUSE (gcsfuse) as a product are covered by `gcp-storage`.
- The code block quotes one `--update-addons` value from https://docs.cloud.google.com/sdk/gcloud/reference/container/clusters/update; the concept page itself has no code.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/cloud-storage-fuse-csi-driver (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [storage-overview.md](./storage-overview.md)
- [persistent-volumes.md](./persistent-volumes.md)
