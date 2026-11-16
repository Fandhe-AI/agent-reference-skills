---
source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/persistent-volumes/volume-snapshots
---

# About Kubernetes volume snapshots in GKE

Kubernetes volume snapshots create a point-in-time copy of a PersistentVolume to restore a prior state or provision a new volume; equivalent to a backup in other storage systems (for example a Filestore backup). GKE supports the CSI volume snapshot API (manual) and Backup for GKE (managed).

## Signature / Usage

The source page has no code. The supported API version, quoted from the source:

```text
snapshot.storage.k8s.io/v1
```

From GKE 1.17 you provision and attach snapshots with `VolumeSnapshotClass`, `VolumeSnapshot` and `VolumeSnapshotContent`. Task guides: back up and restore Persistent Disk storage, and Filestore storage, using volume snapshots.

## Options / Props

| Approach | Description |
| --- | --- |
| CSI volume snapshot API | Manual; create and manage snapshots through the Compute Engine Persistent Disk CSI driver or the Filestore CSI driver using standard Kubernetes conventions. |
| Backup for GKE | Fully managed; automates snapshot creation. Supports configuration and volume backup for stateful workloads with persistent disks; for Filestore workloads only configuration backup. For Filestore basic tier data, keep using the volume snapshot API through the Filestore CSI driver. |

## Notes

- In Kubernetes 1.20 the VolumeSnapshot API was promoted to GA. In GKE 1.23, `snapshot.storage.k8s.io/v1beta1` is deprecated; on GKE 1.21 and later migrate to `snapshot.storage.k8s.io/v1`.
- Snapshots protect workloads for disaster recovery objectives and periodic compliance copies.
- The Cloud Storage FUSE CSI driver does not support snapshots; Hyperdisk Balanced HA does not support snapshots in `ReadWriteMany` mode.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/persistent-volumes/volume-snapshots (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [gce-pd-csi-driver.md](./gce-pd-csi-driver.md)
- [filestore-for-gke.md](./filestore-for-gke.md)
- [persistent-volumes.md](./persistent-volumes.md)
