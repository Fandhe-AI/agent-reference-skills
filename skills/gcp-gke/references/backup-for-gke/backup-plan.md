---
source: https://docs.cloud.google.com/kubernetes-engine/docs/add-on/backup-for-gke/how-to/backup-plan
---

# Plan a set of backups

A backup plan holds the configuration, location and management functions for a sequence of backups: source cluster, which workloads to back up, the region for artifacts, optional schedule and retention. Create one or more plans per cluster (for example one per storage region, or to back up parts of the cluster at different frequencies); every cluster should have at least one. Smart scheduling is recommended.

## Signature / Usage

### Create a backup plan

Required role: Backup for GKE Backup Admin (`roles/gkebackup.backupAdmin`, a subset of `roles/gkebackup.admin`) on the project. Creating a plan automatically installs the Backup for GKE agent in the cluster (can take several minutes). Prerequisites: enable the API and the agent on the cluster.

Adapted (not in the official docs): removed the `--cron-schedule` line from the template because the source states `TARGET_RPO_MINUTES` and `CRON_SCHEDULE` cannot both be set in one backup plan; use `--cron-schedule` instead of `--target-rpo-minutes` for cron scheduling (see the cron example below).

```bash
gcloud beta container backup-restore backup-plans create BACKUP_PLAN_NAME \
    --project=PROJECT_ID \
    --location=BACKUP_LOCATION \
    --cluster=CLUSTER \
    --all-namespaces \
    --include-secrets \
    --include-volume-data \
    --encryption-key=ENCRYPTION_KEY \
    --target-rpo-minutes=TARGET_RPO_MINUTES \
    --exclusion-windows-file=EXCLUSION_WINDOWS_FILE \
    --backup-retain-days=RETAIN_DAYS \
    --backup-delete-lock-days=DELETE_LOCK_DAYS \
    --locked
```

### Smart schedule with an exclusion window (RPO 24 hours)

`window.yaml`:

```yaml
exclusionWindows:
- startTime:
    hours: 1
    minutes: 0
  duration: "3600s"
  singleOccurrenceDate:
    day: 1
    month: 3
    year: 2024
```

```bash
gcloud beta container backup-restore backup-plans create BACKUP_PLAN \
    --location=LOCATION \
    --cluster=CLUSTER \
    --all-namespaces \
    --include-secrets \
    --include-volume-data \
    --target-rpo-minutes=1440 \
    --exclusion-windows-file=window.yaml \
    --backup-retain-days=7 \
    --backup-delete-lock-days=3 \
    --locked
```

Weekly plus single-occurrence windows (RPO 2 hours; no backups 3 PM to 4:30 PM every Monday and Friday and 1 AM to 2 AM on March 1, 2024) use this `window.yaml` with `--target-rpo-minutes=120`:

```yaml
exclusionWindows:
- startTime:
    hours: 15
    minutes: 0
  duration: "5400s"
  daysOfWeek:
    daysOfWeek:
    - MONDAY
    - FRIDAY
- startTime:
    hours: 1
    minutes: 0
  duration: "3600s"
  singleOccurrenceDate:
    day: 1
    month: 3
    year: 2024
```

### Cron schedule, all namespaces (daily 5:20 AM UTC)

```bash
gcloud beta container backup-restore backup-plans create BACKUP_PLAN \
    --location=LOCATION \
    --cluster=CLUSTER \
    --all-namespaces \
    --include-secrets \
    --include-volume-data \
    --cron-schedule="20 5 * * *" \
    --backup-retain-days=7 \
    --backup-delete-lock-days=3 \
    --locked
```

### Selected namespace, hourly at minute 15

```bash
gcloud beta container backup-restore backup-plans create BACKUP_PLAN \
    --location=LOCATION \
    --cluster=CLUSTER \
    --selected-namespaces=my-ns \
    --include-secrets \
    --include-volume-data \
    --cron-schedule="15 * * * *" \
    --backup-retain-days=3
```

### Selected ProtectedApplications

```bash
gcloud beta container backup-restore backup-plans create BACKUP_PLAN \
    --location=LOCATION \
    --cluster=CLUSTER \
    --selected-applications=my-ns1/my-app1,my-ns2/my-app2 \
    --include-secrets \
    --include-volume-data
```

### View, update, pause, delete

```bash
gcloud beta container backup-restore backup-plans list \
    --project=PROJECT_ID \
    --location=LOCATION
```

```bash
gcloud beta container backup-restore backup-plans describe BACKUP_PLAN \
     --project=PROJECT_ID \
     --location=LOCATION
```

```bash
gcloud beta container backup-restore backup-plans update BACKUP_PLAN \
    --project=PROJECT_ID \
    --location=LOCATION \
    --description=DESCRIPTION
```

Pause the schedule (manual backups still work):

```bash
gcloud beta container backup-restore backup-plans update BACKUP_PLAN \
    --project=PROJECT_ID \
    --location=LOCATION \
    --paused
```

Delete (destructive; fails if the plan contains any backups):

```bash
gcloud beta container backup-restore backup-plans delete BACKUP_PLAN \
    --project=PROJECT_ID \
    --location=LOCATION
```

## Options / Props

| Placeholder / flag | Description |
| --- | --- |
| `BACKUP_PLAN_NAME` | Name of the backup plan |
| `PROJECT_ID` | ID of your Google Cloud project |
| `BACKUP_LOCATION` | Compute region of the resource, for example `us-central1` |
| `CLUSTER` | `projects/PROJECT_ID/locations/REGION/clusters/CLUSTER_NAME` (regional) or `projects/PROJECT_ID/locations/ZONE/clusters/CLUSTER_NAME` (zonal) |
| `--all-namespaces` | Back up all namespaces. Alternatives (one scope option is required): `--selected-applications` (`NAMESPACE1/APP1,...`), `--selected-namespaces` (`NAMESPACE1,...`), `--selected-namespace-labels` (`LABEL1=VALUE1,...`) |
| `--include-secrets` | Optional; include `Secret` resources in scope |
| `--include-volume-data` | Optional; include persistent volume data. Omit to create empty volumes during restore |
| `ENCRYPTION_KEY` | Optional; path to a customer-managed encryption key (CMEK; key region must equal the plan region) |
| `TARGET_RPO_MINUTES` | Smart scheduling RPO; required if `EXCLUSION_WINDOWS_FILE` is set; minimum 60 minutes, maximum 86400 minutes (60 days); cannot be combined with `CRON_SCHEDULE` |
| `EXCLUSION_WINDOWS_FILE` | Optional; windows when backups cannot run (UTC); only with `TARGET_RPO_MINUTES` |
| `CRON_SCHEDULE` | Optional; standard cron syntax, UTC, minimum interval 10 minutes, for example `"10 3 * * *"` is 3:10 AM daily; cannot be combined with `TARGET_RPO_MINUTES` |
| `RETAIN_DAYS` | Required if `TARGET_RPO_MINUTES` or `CRON_SCHEDULE` is set; backups are deleted after this many days |
| `DELETE_LOCK_DAYS` | Optional; backups cannot be deleted (automatically or manually) until this lifetime expires |
| `--locked` | Optional; locks the retention policy of the plan |

Automatic pause of a plan occurs on `StatusInvalidCluster`, `GKEMetadataNotEnabledOnNodepool` (Workload Identity Federation for GKE enabled but `GKE_METADATA` not configured on any node pool), `AgentNotInstalled`, a backup stuck in *Creating* for an hour, or a pattern of prolonged or frequent failed backups. Check **Current RPO risk** on the plan and **Status reason** on failed backups, then resume.

## Notes

- Delete lock caution (from the source): with a delete lock on a backup you cannot delete that backup, its plan, or the project containing the plan until the lock expires. `--locked` locks the retention policy; try both on a disposable plan first.
- Deleting a plan is destructive; try it on a disposable resource first.
- `--include-secrets` stores Kubernetes Secret resources in the backup; restrict access to the backup plan accordingly.
- Updates to a plan apply only to backups created afterwards.
- `list` accepts `-` as a wildcard for any parameter except `PROJECT_ID`.
- Corrected from the official docs: the template showed both `--target-rpo-minutes=TARGET_RPO_MINUTES` and `--cron-schedule=CRON_SCHEDULE`, which the same page says cannot be set together.
- Backup to a different project: see the official "Perform cross-project backups" page. Console, Terraform and resume-in-Console steps are omitted here; the source also shows them.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/add-on/backup-for-gke/how-to/backup-plan (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [backup-schedule.md](./backup-schedule.md)
- [backup.md](./backup.md)
- [restore-plan.md](./restore-plan.md)
- [enable-gke-cluster.md](./enable-gke-cluster.md)
- [roles.md](./roles.md)
