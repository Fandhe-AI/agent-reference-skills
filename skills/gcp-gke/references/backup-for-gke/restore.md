---
source: https://docs.cloud.google.com/kubernetes-engine/docs/add-on/backup-for-gke/how-to/restore
---

# Restore a backup

Create a restore from a backup using a restore plan. Kubernetes resources are re-created in the target cluster (which can differ from the source cluster); actual workload recovery then follows normal cluster reconciliation (for example Pods are scheduled and started).

## Signature / Usage

Required role: Backup for GKE Restore Admin (`roles/gkebackup.restoreAdmin`) on the project. A restore plan must exist.

### Create a restore

```bash
gcloud beta container backup-restore restores create RESTORE \
    --project=PROJECT_ID \
    --location=LOCATION \
    --restore-plan=RESTORE_PLAN \
    --backup=BACKUP
```

### View restores and volume restores

```bash
gcloud beta container backup-restore restores list \
    --project=PROJECT_ID \
    --location=LOCATION \
    --restore-plan=RESTORE_PLAN
```

```bash
gcloud beta container backup-restore restores describe RESTORE \
    --project=PROJECT_ID \
    --location=LOCATION \
    --restore-plan=RESTORE_PLAN
```

```bash
gcloud beta container backup-restore volume-restores list \
    --project=PROJECT_ID \
    --location=LOCATION \
    --restore-plan=RESTORE_PLAN \
    --restore=RESTORE
```

```bash
gcloud beta container backup-restore volume-restores describe VOLUME_RESTORE \
    --project=PROJECT_ID \
    --location=LOCATION \
    --restore-plan=RESTORE_PLAN \
    --restore=RESTORE
```

### Update and delete

```bash
gcloud beta container backup-restore restores update RESTORE\
    --project=PROJECT_ID \
    --location=LOCATION \
    --restore-plan=RESTORE_PLAN \
    --description=DESCRIPTION
```

```bash
gcloud beta container backup-restore restores delete RESTORE \
    --project=PROJECT_ID \
    --location=LOCATION \
    --restore-plan=RESTORE_PLAN
```

## Options / Props

| Placeholder | Description |
| --- | --- |
| `RESTORE` | Name of the restore |
| `PROJECT_ID` | ID of your Google Cloud project |
| `LOCATION` | Compute region of the parent restore plan |
| `RESTORE_PLAN` | Name of the parent restore plan |
| `BACKUP` | Backup to restore; must be in the backup plan the restore plan refers to: `projects/PROJECT_ID/locations/LOCATION/backupPlans/BACKUP_PLAN/backups/BACKUP` |

## Notes

- A restore completes after all Kubernetes resources are restored; you must validate that all applications are running afterwards.
- The restore's effect depends on the restore plan modes (for example `delete-and-restore`, `merge-replace-*`); these can delete or replace existing resources. Try restores on a disposable cluster first.
- Deleting a restore removes only the restore record; it doesn't affect the target cluster or the source backup.
- Volume restores are created and managed automatically by the agent.
- GKE 1.32.3-gke.1748000 and later: if a PVC uses a StorageClass with `WaitForFirstConsumer` volume binding mode and no Pod references the PVC during a restore, the PV is still restored and bound to the PVC.
- The source also shows Console steps. Fine-grained restore and `ProtectedApplication` are covered by separate official pages.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/add-on/backup-for-gke/how-to/restore (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [restore-plan.md](./restore-plan.md)
- [backup.md](./backup.md)
- [backup-for-gke.md](./backup-for-gke.md)
