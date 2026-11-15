---
source: https://docs.cloud.google.com/backup-disaster-recovery/docs/cloud-console/backup-plan-create
---

# Create and manage a backup plan for vaulted backups

Create, list, describe and delete backup plans for vaulted resources with gcloud, including rules for every recurrence type and plans with no rule.

## Signature / Usage

### Create

Adapted (not in the official docs): restored the `\` line continuations that the source's rendered block loses.

```bash
gcloud backup-dr backup-plans create BACKUP_PLAN_NAME \
  --location=REGION \
  --resource-type=RESOURCE_TYPE \
  --project=PROJECT_ID \
  --backup-vault=BACKUPVAULT_NAME \
  --backup-rule=rule-id=RULE_NAME,recurrence=RECURRENCE,hourly-frequency=HOURS,time-zone=TIME_ZONE,backup-window-start=START_TIME,backup-window-end=END_TIME,retention-days=BACKUP_RETENTION
```

### Examples

Instance every six hours, kept 11 days:

Adapted (not in the official docs): restored the `\` line continuations that the source's rendered block loses.

```bash
gcloud backup-dr backup-plans create bp-hourly \
  --project=test-project --location=us-central1 \
  --resource-type=compute.googleapis.com/Instance \
  --backup-vault=test-bv \
  --backup-rule=rule-id=rule-hourly,recurrence=HOURLY,hourly-frequency=6,backup-window-start=5,backup-window-end=12,retention-days=11
```

Disks daily, kept 12 days:

Adapted (not in the official docs): restored the `\` line continuations that the source's rendered block loses.

```bash
gcloud backup-dr backup-plans create bp-daily \
  --project=test-project --location=us-central1 \
  --resource-type=compute.googleapis.com/Disk \
  --backup-vault=test-bv \
  --backup-rule=rule-id=rule-daily,recurrence=DAILY,backup-window-start=5,backup-window-end=12,retention-days=12
```

Instance Monday and Wednesday, kept 13 days:

Adapted (not in the official docs): restored the `\` line continuations that the source's rendered block loses.

```bash
gcloud backup-dr backup-plans create bp-weekly \
  --project=test-project --location=us-central1 \
  --resource-type=compute.googleapis.com/Instance \
  --backup-vault=test-bv \
  --backup-rule=rule-id=rule-weekly,recurrence=WEEKLY,days-of-week='MON WED',backup-window-start=5,backup-window-end=12,retention-days=13
```

Disks on the 1st and 15th, kept 14 days:

Adapted (not in the official docs): restored the `\` line continuations that the source's rendered block loses.

```bash
gcloud backup-dr backup-plans create bp-monthly \
  --project=test-project --location=us-central1 \
  --resource-type=compute.googleapis.com/Disk \
  --backup-vault=test-bv \
  --backup-rule=rule-id=rule-monthly,recurrence=MONTHLY,days-of-month='1 15',backup-window-start=5,backup-window-end=12,retention-days=14
```

Instance yearly (10th, 20th, 30th of Mar, Jun, Sep, Dec), kept 16 days:

Adapted (not in the official docs): restored the `\` line continuations that the source's rendered block loses.

```bash
gcloud backup-dr backup-plans create bp-yearly \
  --project=test-project --location=us-central1 \
  --resource-type=compute.googleapis.com/Instance \
  --backup-vault=test-bv \
  --backup-rule=rule-id=rule-yearly,recurrence=YEARLY,months='MAR JUN SEP DEC',days-of-month='10 20 30',backup-window-start=5,backup-window-end=12,retention-days=16
```

AlloyDB cluster daily with 30-day backups and 13 days of logs (PITR):

Adapted (not in the official docs): restored the `\` line continuations that the source's rendered block loses.

```bash
gcloud backup-dr backup-plans create bp-alloydb-daily \
  --project=test-project --location=us-central1 \
  --resource-type=alloydb.googleapis.com/Cluster \
  --backup-vault=test-bv \
  --log-retention-days=13 \
  --backup-rule=rule-id=rule-alloydb,recurrence=DAILY,backup-window-start=2,backup-window-end=8,retention-days=30
```

Plan with no backup rule (needs on-demand retention):

```bash
gcloud backup-dr backup-plans create BACKUP_PLAN_NAME \
  --location=REGION \
  --resource-type=RESOURCE_TYPE \
  --project=PROJECT_ID \
  --backup-vault=BACKUPVAULT_NAME \
  --max-custom-on-demand-retention-days=MAX_ONDEMAND_RETENTION
```

### List, describe, delete

Adapted (not in the official docs): restored the `\` line continuations that the source's rendered block loses.

```bash
gcloud backup-dr backup-plans list \
  --location=LOCATION \
  --project=PROJECT_ID
```

```bash
gcloud backup-dr backup-plans describe BACKUP_PLAN_NAME \
  --location=LOCATION \
  --project=PROJECT_ID
```

```bash
gcloud backup-dr backup-plans delete BACKUP_PLAN_NAME \
  --location=LOCATION \
  --project=PROJECT_ID
```

## Options / Props

| Name | Description |
|------|-------------|
| `RESOURCE_TYPE` | `compute.googleapis.com/Instance`, `compute.googleapis.com/Disk`, `sql.googleapis.com/Instance`, `alloydb.googleapis.com/Cluster`, `file.googleapis.com/Instance` |
| `RECURRENCE` | hourly, daily, weekly, monthly, yearly |
| `hourly-frequency` | Only for hourly; minimum is always six hours |
| `TIME_ZONE` | IANA time zone, such as UTC |
| `backup-window-start` / `-end` | Hour of day, 24-hour; start before end, start inclusive, end exclusive |
| `retention-days` | Must be equal to or greater than the vault's enforced minimum retention |
| `--max-custom-on-demand-retention-days` | Optional cap on on-demand backups; default is vault minimum enforced retention plus 30 days; console maximum 3,653 days |
| `--log-retention-days` | AlloyDB and Cloud SQL only; must be at least the vault's minimum enforced retention |

Required role: Backup and DR User V2 (`roles/backupdr.userv2`) on the backup vault project (permissions `backupdr.backupPlans.create/list/get/delete`, `backupdr.backupVaults.associate`).

## Notes

- A plan and its linked vault must be in the same project. Plans with no rule are supported for Compute Engine instances, disks and Cloud SQL only.
- Retention caps: most resource types 36,135 days (99 years), Cloud SQL 3,653 days (10 years), AlloyDB 365 days. Source inconsistency: the on-demand cap is stated as 3,653 days here and "capped at 36,135 days" elsewhere.
- Source inconsistency: the Cloud SQL resource type is `sql.googleapis.com/Instance` in the source's resource type list but `sqladmin.googleapis.com/Instance` in the source's note on which type to use for a Cloud SQL instance. gcloud 593.0.0 Backup and DR examples also use `sqladmin.googleapis.com/Instance`; use that value.
- Source inconsistency: the source says the hourly minimum is always six hours; gcloud 593.0.0 `gcloud backup-dr backup-plans create` help states `hourly-frequency` must be between 4 and 23.
- A plan in use cannot be deleted; remove it from the resource first. Deleting does not affect existing backups (they expire per retention). Destructive: try on a disposable plan first.
- The source also shows Console steps and a Terraform `google_backup_dr_backup_plan` example. Trial participants are charged for backups retained past the trial.
- Corrected from the official docs: the rendered gcloud blocks (the create template, the six recurrence/AlloyDB examples and list) have blank lines and no trailing `\` between flags; the line continuations were restored in each of those blocks (the no-rule create, describe and delete blocks are intact in the source).
- Source: https://docs.cloud.google.com/backup-disaster-recovery/docs/cloud-console/backup-plan-create (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [backup-plan.md](./backup-plan.md)
- [backup-vault-create.md](./backup-vault-create.md)
- [quickstart-compute-engine-backup-vault.md](./quickstart-compute-engine-backup-vault.md)
