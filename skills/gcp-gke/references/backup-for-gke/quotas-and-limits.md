---
source: https://docs.cloud.google.com/kubernetes-engine/docs/add-on/backup-for-gke/concepts/quotas-and-limits
---

# Backup for GKE quotas and limits

Backup for GKE is subject to GKE scalability limitations and cluster limits. The limits below apply to the GA version of the Backup for GKE agent on GKE clusters running version 1.24 or higher.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/kubernetes-engine/docs/add-on/backup-for-gke/concepts/about-locations (the source page has no code); list supported regions before sizing quotas.

```bash
gcloud beta container backup-restore locations list \
    --project=PROJECT_ID
```

## Options / Props

| Limit / quota | Value | Applies to |
| --- | --- | --- |
| Resources per GroupKind, per namespace (namespaced resources) | 20,000 | Per backup or restore operation |
| Resources per GroupKind (non-namespaced resources) | 20,000 | Per backup or restore operation |
| PVCs backed by Compute Engine persistent disk | 1,000 | Per backup or restore operation; applies to `Backup` with `include_volume` set and `Restore` with the `restore_volume_data_from_backup` policy |
| Fine-grained restore filter conditions (inclusion + exclusion combined) | 50 | Per restore operation |
| `VolumeBackup` resources (BackupPlans created after January 9th, 2023) | 180,000 | Per region per project; sum of all active (non-deleted) `VolumeBackup` resources, regardless of plan or backup |
| `VolumeBackup` resources (BackupPlans created before January 9th, 2023) | 180,000 | Per project |
| Backup for GKE API requests | 1,200 | Per minute per project |

## Notes

- `VolumeBackup` quotas apply to Compute Engine persistent disk volumes only. If exceeded, the backup fails with a `Quota 'SNAPSHOTS' exceeded` message; contact Cloud Customer Care to request higher limits.
- To raise the API request quota, contact the Google Cloud support team.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/add-on/backup-for-gke/concepts/quotas-and-limits (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/add-on/backup-for-gke/concepts/about-locations (snippet only; retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [backup-for-gke.md](./backup-for-gke.md)
- [about-locations.md](./about-locations.md)
- [backup.md](./backup.md)
