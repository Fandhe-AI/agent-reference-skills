---
source: https://docs.cloud.google.com/backup-disaster-recovery/docs/concepts/backup-plan
---

# Backup plans overview

Backup plans (also called backup policies) define when and how resources are protected; one or more backup rules in a plan set recurrence, backup window and retention, and a plan is associated with a workload.

## Signature / Usage

Create a backup plan with one hourly rule:

```bash
gcloud backup-dr backup-plans create BACKUP_PLAN_NAME \
    --location=REGION \
    --resource-type=compute.googleapis.com/Instance \
    --project=PROJECT_ID \
    --backup-vault=BACKUPVAULT_NAME \
    --backup-rule=rule-id=RULE_NAME,recurrence=RECURRENCE,hourly-frequency=HOURS,time-zone=TIME_ZONE,backup-window-start=START_TIME,backup-window-end=END_TIME,retention-days=BACKUP_RETENTION
```

Snippet taken from https://docs.cloud.google.com/backup-disaster-recovery/docs/quickstarts/gce-instances-backup-vault (the concept twin has no code).

## Options / Props

| Attribute | Rule |
|---|---|
| Supported resources | Compute Engine instances and disks, Cloud SQL, AlloyDB for PostgreSQL clusters, Filestore instances |
| Recurrence | Hourly (frequency in hours), daily, weekly (specific days), monthly (day of month), yearly (date) |
| Constraint | No two rules in a plan can share the same backup frequency period |
| Backup window | 24-hour format; at least six hours long; start time is the earliest the backup can begin |
| Retention | Days each backup is kept; enforced retention can be set at the rule level |
| Maximum custom on-demand retention | Caps retention of manual backups; must be at least the vault's minimum enforced retention |
| Database log backups | Enable for Cloud SQL and AlloyDB to allow point-in-time recovery |

Retry schedule for a failed scheduled job: retry after 4 minutes, then 16 minutes, then 64 minutes; after 4 total attempts the status is "Failed" and no more jobs run for that schedule period. All four jobs share the job number with a suffix (`Job_12345`, `Job_12345a`, `Job_12345b`).

## Notes

- A plan's retention cannot be shorter than the destination vault's minimum retention. Backups are immutable for the vault's enforced retention period; after both periods lapse the service deletes the backup automatically.
- CMEK alignment: a CMEK-protected source workload needs a CMEK-enabled vault; Google-managed-key resources must go to a standard vault.
- Regions without zone separation (backups may not be stored in a different zone): Osaka (asia-northeast2), Warsaw (europe-central2), Doha (me-central1), Johannesburg (africa-south1), Montreal (northamerica-northeast1), Querétaro (northamerica-south1), Santiago (southamerica-west1).
- Deprecation: backup and restore of workloads managed through the legacy appliance management console is deprecated (Management Console deprecated September 30, 2026; see deprecations page).
- The source's "What's next" links are empty in the fetched twin.
- Source: https://docs.cloud.google.com/backup-disaster-recovery/docs/concepts/backup-plan (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/backup-disaster-recovery/docs/quickstarts/gce-instances-backup-vault (borrowed snippet)

## Related

- [backup-plan-create.md](./backup-plan-create.md)
- [backup-vault.md](./backup-vault.md)
- [deprecations.md](./deprecations.md)
