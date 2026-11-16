---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/filestore-for-gke
---

# About Filestore support for GKE

Filestore instances are fully managed file servers usable as durable `ReadWriteMany` storage for GKE. The GKE Filestore CSI driver provisions PersistentVolumes dynamically and supports multishares.

## Signature / Usage

The source page has no code. The StorageClass name below is quoted from the source text:

```text
regional-rwx
```

In GKE version 1.37.1 and later, a shared multi-writer (`ReadWriteMany`) PersistentVolumeClaim with no StorageClass automatically uses the `regional-rwx` StorageClass.

## Options / Props

| Capability | Detail |
| --- | --- |
| Access mode | `ReadWriteMany`; instances are accessible from many GKE nodes at once (unlike the single read-write access of Persistent Disk). |
| Persistence | Durable (non-ephemeral); data persists beyond Pod lifecycle. |
| Dynamic provisioning | Via the GKE Filestore CSI driver. |
| Performance scaling | Capacity decoupled from performance; scale dynamically with `VolumeAttributesClass` (see the Filestore CSI driver guide). |
| Snapshots | CSI volume snapshots create Filestore backups. |
| Multishares | Requires the GKE Filestore CSI driver version 1.27 or later. One pool view of PVs; dynamic provisioning scales share and instance capacity up or down; multiple smaller shares per instance improve utilization and cost. |

## Notes

- Filestore itself (tiers, backups, multishares as a product) belongs to the `gcp-storage` skill; this page is the GKE-side view.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/filestore-for-gke (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [persistent-volumes.md](./persistent-volumes.md)
- [storage-overview.md](./storage-overview.md)
- [volume-snapshots.md](./volume-snapshots.md)
