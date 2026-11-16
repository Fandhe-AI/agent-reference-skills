---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/storage-overview
---

# About storage for GKE clusters

Overview of the storage types and integrations GKE supports (Persistent Disk, Hyperdisk, Hyperdisk Storage Pools, Local SSD, Managed Lustre, Filestore, Run:ai Model Streamer, Cloud Storage FUSE, managed databases, Artifact Registry) and when to choose each. To pick a machine family, see the Compute Engine "Machine series comparison".

## Signature / Usage

### Dynamic provisioning with the recommended StorageClass setting

Snippet taken from https://docs.cloud.google.com/kubernetes-engine/docs/concepts/persistent-volumes (the source overview page has no code). A zonal Persistent Disk StorageClass with `WaitForFirstConsumer`:

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: slow
provisioner: pd.csi.storage.gke.io
parameters:
  type: pd-balanced
  csi.storage.k8s.io/fstype: ext4
volumeBindingMode: WaitForFirstConsumer
```

## Options / Props

| Storage option | Cluster modes | Access mode / availability | Use when |
| --- | --- | --- | --- |
| Persistent Disk | Autopilot, Standard | `ReadWriteOnce`; also read-only on many nodes. Zonal by default; regional (two zones) available. Persistent. | High-performance, highly available durable block storage. Types: Balanced (default for dynamic provisioning on GKE 1.24 and later), Performance (SSD), Standard (HDD), Extreme (SAP HANA / Oracle class). |
| Hyperdisk | Autopilot, Standard | Mostly `ReadWriteOnce`; zonal; persistent. Hyperdisk ML supports `ReadOnlyMany`. | Need to resize and tune IOPS / throughput independently. Balanced, Throughput, Extreme, ML. |
| Hyperdisk Storage Pool | Standard (boot and attached disks), Autopilot (attached Hyperdisks only) | Pre-provisioned pool of capacity, throughput and IOPS shared by disks in the pool. | Pooled performance and cost optimization. |
| Local SSD | Standard; Autopilot support is in preview on A2 Ultra A100 machines, on clusters and node pools running GKE 1.27 and later | Attached to one node; ephemeral (tied to the Pod lifecycle for emptyDir). | Hot caching, real-time analytics, lowest-latency ephemeral storage. |
| Managed Lustre | Autopilot, Standard with Container-Optimized OS nodes | Parallel file system; persistent. | AI/ML and HPC needing high-throughput multi-Pod file access; volumes can be expanded without downtime. |
| Filestore | Autopilot, Standard | NFS, `ReadWriteMany`. Enterprise tier defaults to regional availability, other tiers zonal. Persistent. | Shared multi-reader/writer file access (CMS, migrations, analytics, rendering, media). Multishares: one enterprise-tier instance of 10 GiB or larger shared with up to 80 PersistentVolumes. |
| Cloud Storage FUSE | Autopilot, Standard | `ReadWriteMany`, `ReadOnlyMany`, `ReadWriteOnce`; regional object availability. Persistent. | File semantics over Cloud Storage buckets; ML training and model data. |
| Run:ai Model Streamer | GKE | Streams model weights (for example `safetensors`) from Cloud Storage to GPU memory; integrates with vLLM and SGLang. | Faster inference model loading. |
| Managed databases | n/a | AlloyDB for PostgreSQL, Cloud SQL, Spanner, Memorystore for Redis. | Lower operational overhead than running a database in Kubernetes. |
| Artifact Registry | n/a | Repository for container images, Helm charts, other artifacts. | Private images and build artifacts. |

## Notes

- Hyperdisk and Persistent Disk comparison, driver setup and per-type how-to guides are on separate pages; see Related.
- The managed databases themselves are covered by the `gcp-databases-relational` / `gcp-databases-nosql` skills; Cloud Storage, Filestore and Managed Lustre as products are in `gcp-storage`. This skill covers only the GKE (CSI driver / Kubernetes object) side.
- Source inconsistency: the Local SSD row says "Autopilot support is in preview on A2 Ultra A100 machines, on clusters and node pools running GKE 1.27 and later", while local-ssd.md says "Autopilot and node auto-provisioning support Local SSD only through custom ComputeClasses". The source does not reconcile the two.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/storage-overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Snippet source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/persistent-volumes

## Related

- [persistent-volumes.md](./persistent-volumes.md)
- [gce-pd-csi-driver.md](./gce-pd-csi-driver.md)
- [hyperdisk.md](./hyperdisk.md)
- [local-ssd.md](./local-ssd.md)
- [filestore-for-gke.md](./filestore-for-gke.md)
- [cloud-storage-fuse-csi-driver.md](./cloud-storage-fuse-csi-driver.md)
