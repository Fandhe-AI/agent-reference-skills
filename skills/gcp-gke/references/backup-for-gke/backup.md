---
source: https://docs.cloud.google.com/kubernetes-engine/docs/add-on/backup-for-gke/how-to/backup
---

# Back up your workloads

Create, view, update and delete backups of a backup plan. A backup captures a config backup (Kubernetes resource descriptions from the API server) and a volume backup (volumes for `PersistentVolumeClaim` resources found in the config backup). Plans with a schedule create backups automatically; manual backups are useful before application upgrades.

## Signature / Usage

Required role: Backup for GKE Backup Admin (`roles/gkebackup.backupAdmin`) on the project. A backup plan must exist first.

### Create a manual backup

```bash
gcloud beta container backup-restore backups create BACKUP \
    --project=PROJECT_ID \
    --location=LOCATION \
    --backup-plan=BACKUP_PLAN \
    WAIT_OPTION
```

### View backups, index and volume backups

```bash
gcloud beta container backup-restore backups list \
    --project=PROJECT_ID \
    --location=LOCATION \
    --backup-plan=BACKUP_PLAN
```

```bash
gcloud beta container backup-restore backups describe BACKUP \
    --project=PROJECT_ID \
    --location=LOCATION \
    --backup-plan=BACKUP_PLAN
```

View group, version, kind and name of each resource in a backup (the URL expires after 10 minutes):

```bash
gcloud beta container backup-restore backups get-backup-index-download-url BACKUP \
    --project=PROJECT_ID \
    --location=LOCATION \
    --backup-plan=BACKUP_PLAN
```

```bash
gcloud beta container backup-restore volume-backups list \
    --project=PROJECT_ID \
    --location=LOCATION \
    --backup-plan=BACKUP_PLAN \
    --backup=BACKUP
```

```bash
gcloud beta container backup-restore volume-backups describe VOLUME_BACKUP \
    --project=PROJECT_ID \
    --location=LOCATION \
    --backup-plan=BACKUP_PLAN \
    --backup=BACKUP
```

### Update and delete

```bash
gcloud beta container backup-restore backups update BACKUP\
    --project=PROJECT_ID \
    --location=LOCATION \
    --backup-plan=BACKUP_PLAN \
    --description=DESCRIPTION
```

Delete (destructive):

```bash
gcloud beta container backup-restore backups delete BACKUP \
    --project=PROJECT_ID \
    --location=LOCATION \
    --backup-plan=BACKUP_PLAN
```

## Options / Props

| Placeholder | Description |
| --- | --- |
| `BACKUP` | Name of the backup |
| `PROJECT_ID` | ID of your Google Cloud project |
| `LOCATION` | Compute region of the parent backup plan |
| `BACKUP_PLAN` | Name of the parent backup plan |
| `WAIT_OPTION` | `--async`: returns as soon as the service acknowledges receipt. (default): returns once the service has instructed the in-cluster agent to start, usually within seconds. `--wait-for-completion`: waits until the agent completes the backup, may take several minutes |

## Notes

- Volume backups are created automatically by the agent for each PVC in scope; each corresponds to a persistent disk snapshot.
- When updating a backup, description / labels do not change handling; retention parameters can only be increased.
- Deleting a backup permanently deletes its stored artifacts and snapshots; try it on a disposable backup first. A backup cannot be deleted (automatically or manually) until the plan's `--backup-delete-lock-days` lifetime expires.
- `list` accepts `-` as a wildcard for any parameter except `PROJECT_ID`.
- The source also shows Console steps.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/add-on/backup-for-gke/how-to/backup (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [backup-plan.md](./backup-plan.md)
- [backup-schedule.md](./backup-schedule.md)
- [restore-plan.md](./restore-plan.md)
- [restore.md](./restore.md)
