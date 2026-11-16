---
source: https://docs.cloud.google.com/compute/docs/disks/data-protection
---

# Choose a data protection option for Compute Engine resources

Compares the Compute Engine options for protecting instances, Persistent Disk and Google Cloud Hyperdisk by recovery time objective (RTO), recovery point objective (RPO), use case and cost. Compute Engine does not back up anything automatically.

## Signature / Usage

### Pick a solution by goal

| Goal | Recommended solution |
|---|---|
| Test, debug, or manage deployments | Disks: instant snapshots, disk clones, or custom OS images. Instances: machine images. |
| Back up for disaster recovery | Disks: standard or archive snapshots. Instances: machine images or Backup and DR Service. |
| High availability for disaster recovery | Disks: synchronous or Asynchronous Replication. |

### Inspect a machine image's stored size

Snippet taken from https://docs.cloud.google.com/compute/docs/machine-images (machine images are one of the instance options above):

```bash
gcloud compute machine-images describe MACHINE_IMAGE_NAME
```

## Options / Props

### Options for instances

| Option | Goal | RPO | RTO | Use cases |
|---|---|---|---|---|
| Machine images | Testing or disaster recovery | Minutes to hours | Minutes to hours | Stores an instance's configuration, metadata, permissions and data from all attached disks; long-term instance backup and restore; cloning and replication. |
| Backup and DR Service | Disaster recovery | Policy-defined | Minutes to hours | Immutable and indelible backups in backup vaults; multi-project management; incremental backups; instant mount and in-place access; monitoring, auditing, reporting. |

### Options for disks

| Option | Goal | RPO | RTO | Use cases |
|---|---|---|---|---|
| Disk clones | Testing | Zero | Seconds to minutes | Staging environments from production; copy for backup verification or export offloading; malware scans without affecting the source disk. |
| Instant snapshots | Testing | Seconds to minutes | Seconds to minutes | In-place backup stored in the same location as the source disk; fast rollback; stored as differential copies. |
| OS images | Testing | N/A | N/A | Identical boot disks for many instances; standardized dev/test environments. |
| Standard and archive snapshots | Disaster recovery | Minutes to hours | Minutes to hours | Geo-redundant disk backups; differential copies. |
| Synchronous replication | Disaster recovery | Zero | Seconds to minutes | Two zones in the same region, protects against a zonal outage; not designed for data backup. |
| Asynchronous Replication | Disaster recovery | Seconds to minutes | Minutes | Two regions, protects against a regional outage; not designed for data backup. |

### Default backup setting for instances created in the Google Cloud console

| Selection | When it is the default |
|---|---|
| Backup plan | Predefined default if the Backup and DR API is enabled for the project; recommended for most projects (centralized, policy-based). |
| Snapshot schedules | Selected if Backup and DR Service isn't enabled; backs up attached disks only, not the full instance configuration. |
| No backups | No method preselected; choose only if data is protected another way or is transient. |

The setting does not affect existing instances. See https://docs.cloud.google.com/compute/docs/disks/default-backup to view or change it.

## Notes

- Warning (from the source): Compute Engine doesn't automatically back up instances or disks unless you configure a backup or replication option; you can't recover a deleted instance, disk, or image, even if the deletion was accidental. Deleting resources is destructive; try deletes on a disposable resource first.
- Machine images capture a crash-consistent copy of data from all attached Persistent Disk and Hyperdisk volumes plus the full instance configuration. To back up only disks, use standard or archive snapshots.
- Instant snapshots are for fast operational recovery, not disaster recovery: they live in the same location as the source disk and are automatically deleted when the source disk is deleted.
- Disk clone: an independent, instantly usable new disk with all data at creation time (unlike a snapshot, which must be restored to a new disk).
- To create disks at scale, use OS images rather than many disks from a snapshot; OS images are faster because Compute Engine uses local caching in the target zones.
- Recommendation: schedule hourly standard snapshots; if you require daily snapshots, consider scheduling every 6 hours.
- Replication protects against infrastructure failure, not against data corruption, user error or malicious attacks. Use Regional Persistent Disk or Hyperdisk Balanced High Availability for RPO zero within a region; use Asynchronous Replication with consistency groups for cross-region DR testing and failover/failback.
- Backup and DR Service as a product is covered by `gcp-storage`; the instance backup-plan integration is described in https://docs.cloud.google.com/compute/docs/instances/backup-plans-for-instances.
- The source also shows no Console, REST or Terraform procedures; this page is an overview.
- Source inconsistency: this page says "When you create a new instance from a machine image, the new instance is a clone of the source instance, including the full instance configuration and a crash-consistent copy of the data from all attached Persistent Disk and Hyperdisk volumes.", while hyperdisks.md says "You can't create a machine image from a Hyperdisk volume."
- Source (Hyperdisk limitations): https://docs.cloud.google.com/compute/docs/disks/hyperdisks (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/docs/disks/data-protection (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [snapshots.md](./snapshots.md)
- [instant-snapshots.md](./instant-snapshots.md)
- [about-snapshot-schedules.md](./about-snapshot-schedules.md)
- [about-regional-persistent-disk.md](./about-regional-persistent-disk.md)
- [machine-images.md](./machine-images.md)
- [images.md](./images.md)
