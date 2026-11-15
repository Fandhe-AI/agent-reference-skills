---
source: https://docs.cloud.google.com/backup-disaster-recovery/docs/quickstarts/gce-instances-backup-vault
---

# Backup and DR

Copy-paste gcloud commands for Backup and DR backup vaults, backup plans, plan associations, on-demand backups and restores. All commands come from the Backup and DR guides, not from gcloud help examples.

## Signature / Usage

### Create and inspect a backup vault

```bash
gcloud backup-dr backup-vaults create BACKUPVAULT_NAME \
  --project=PROJECT_ID \
  --location=LOCATION \
  --backup-retention-inheritance=RETENTION_PERIOD_INHERITANCE \
  --backup-min-enforced-retention=RETENTION_PERIOD_IN_DAYS \
  --kms-key=KMS_KEY \
  --access-restriction=ACCESS_RESTRICTION
```

Give `RETENTION_PERIOD_IN_DAYS` in the relative time format that gcloud requires, for example `p1d`, `p1m` or `p1m1d` (the gcloud help examples also use `"1d"`). A bare number is read as seconds, not days (`30` is 30 seconds); write `30d` or `p30d` for 30 days.

```bash
gcloud backup-dr operations describe FULL_OPERATION_ID
```

```bash
gcloud backup-dr backup-vaults list \
  --project=PROJECT_ID \
  --location=LOCATION
```

```bash
gcloud backup-dr backup-vaults describe BACKUPVAULT_NAME \
  --location=LOCATION \
  --project=PROJECT_ID
```

### Raise the minimum enforced retention

> **Warning**: once the lock effective date is reached, the minimum enforced retention can only be increased and the lock cannot be removed. Try it on a disposable vault first.

Adapted (not in the official docs): a missing space after `BACKUPVAULT_NAME` before the line continuation was added and the block de-indented.

```bash
gcloud backup-dr backup-vaults update BACKUPVAULT_NAME \
  --project=PROJECT_ID \
  --location=LOCATION \
  --backup-min-enforced-retention=RETENTION_PERIOD_IN_DAYS
```

Use the same relative time format here, for example `p1m1d`; a bare number is read as seconds, not days.

### Create a backup plan

Adapted (not in the official docs): restored the `\` line continuations that the source's rendered block loses.

```bash
gcloud backup-dr backup-plans create BACKUP_PLAN_NAME \
  --location=REGION \
  --resource-type=RESOURCE_TYPE \
  --project=PROJECT_ID \
  --backup-vault=BACKUPVAULT_NAME \
  --backup-rule=rule-id=RULE_NAME,recurrence=RECURRENCE,hourly-frequency=HOURS,time-zone=TIME_ZONE,backup-window-start=START_TIME,backup-window-end=END_TIME,retention-days=BACKUP_RETENTION
```

Compute Engine instance, every six hours, kept 11 days:

Adapted (not in the official docs): restored the `\` line continuations that the source's rendered block loses.

```bash
gcloud backup-dr backup-plans create bp-hourly \
  --project=test-project --location=us-central1 \
  --resource-type=compute.googleapis.com/Instance \
  --backup-vault=test-bv \
  --backup-rule=rule-id=rule-hourly,recurrence=HOURLY,hourly-frequency=6,backup-window-start=5,backup-window-end=12,retention-days=11
```

Disks, daily, kept 12 days:

Adapted (not in the official docs): restored the `\` line continuations that the source's rendered block loses.

```bash
gcloud backup-dr backup-plans create bp-daily \
  --project=test-project --location=us-central1 \
  --resource-type=compute.googleapis.com/Disk \
  --backup-vault=test-bv \
  --backup-rule=rule-id=rule-daily,recurrence=DAILY,backup-window-start=5,backup-window-end=12,retention-days=12
```

### List, describe and delete backup plans

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

> **Warning**: deleting a backup plan deletes the plan and its contents. Try it on a disposable plan first.

```bash
gcloud backup-dr backup-plans delete BACKUP_PLAN_NAME \
  --location=LOCATION \
  --project=PROJECT_ID
```

### Protect a Compute Engine VM and trigger a backup

Adapted (not in the official docs): added `--project=VM_PROJECT_ID` so the lookup targets the project that owns the VM, not the gcloud default project.

```bash
gcloud compute instances describe VM_NAME \
    --project=VM_PROJECT_ID \
    --zone=VM_ZONE \
    --format="value(id)"
```

Adapted (not in the official docs): added the required `--resource-type` flag (gcloud 593.0.0); added `--project=PROJECT_ID` so the association is created in the backup plan project, not the gcloud default project.

```bash
gcloud backup-dr backup-plan-associations create BACKUP_PLAN_ASSOCIATION_NAME \
    --project=PROJECT_ID \
    --location=VM_REGION \
    --resource=projects/VM_PROJECT_ID/zones/VM_ZONE/instances/VM_ID \
    --resource-type=compute.googleapis.com/Instance \
    --backup-plan=projects/PROJECT_ID/locations/LOCATION/backupPlans/BACKUP_PLAN
```

```bash
gcloud backup-dr backup-plan-associations trigger-backup BACKUP_PLAN_ASSOCIATION_NAME \
    --project=PROJECT_ID \
    --location=REGION \
    --backup-rule-id=RULE_ID
```

### Find backups and restore a VM

```bash
gcloud backup-dr data-sources list \
    --project=PROJECT_ID \
    --location=REGION \
    --backup-vault=BACKUPVAULT_NAME \
    "--filter=dataSourceGcpResource.computeInstanceDatasourceProperties.name:(VM_NAME)" \
    "--format=get(name)"
```

```bash
gcloud backup-dr backups list \
    --project=PROJECT_ID \
    --location=REGION \
    --backup-vault=BACKUPVAULT_NAME \
    --data-source=DATA_SOURCE
```

```bash
gcloud backup-dr backups restore compute BACKUP_ID \
    --project=PROJECT_ID \
    --location=REGION \
    --backup-vault=BACKUPVAULT_NAME \
    --data-source=DATA_SOURCE \
    --name=RESTORED_VM_NAME \
    --target-project=TARGET_PROJECT_ID \
    --target-zone=TARGET_ZONE
```

### Clean up

> **Warning**: these commands delete the restored VM, the association, the plan and the vault. A vault cannot be deleted until every backup has passed its enforced retention. Try them on disposable resources only.

Adapted (not in the official docs): added `--project=TARGET_PROJECT_ID` to `gcloud compute instances delete` so cleanup deletes the restored VM in the restore target project, not a same-named VM in the gcloud default project.

```bash
gcloud compute instances delete RESTORED_VM_NAME --zone=TARGET_ZONE --project=TARGET_PROJECT_ID
gcloud backup-dr backup-plan-associations delete BACKUP_PLAN_ASSOCIATION_NAME \
    --project=PROJECT_ID \
    --location=REGION
gcloud backup-dr backup-plans delete BACKUP_PLAN_NAME \
    --project=PROJECT_ID \
    --location=REGION
```

```bash
gcloud backup-dr backup-vaults delete BACKUPVAULT_NAME \
  --project=PROJECT_ID \
  --location=LOCATION
```

## Options / Props

| Name | Description |
| --- | --- |
| `RETENTION_PERIOD_INHERITANCE` | `inherit-vault-retention` (default) or `match-backup-expire-time`; cannot be changed once set |
| `ACCESS_RESTRICTION` | `within-project`, `within-org`, `unrestricted`, `within-org-but-unrestricted-for-ba` |
| `RESOURCE_TYPE` | `compute.googleapis.com/Instance`, `compute.googleapis.com/Disk`, `alloydb.googleapis.com/Cluster`, `file.googleapis.com/Instance` and others listed in the source |
| `retention-days` | Must be equal to or greater than the vault's enforced minimum retention |
| `--kms-key` | CMEK key; only at vault creation |

## Notes

- Destructive and irreversible: the vault minimum enforced retention lock cannot be removed once effective, backup vaults cannot be deleted before their backups expire, and plan, association and vault deletes are destructive. Try everything on disposable resources first.
- Roles: Backup and DR Backup Vault Admin (`roles/backupdr.backupvaultAdmin`) for vaults and Backup and DR User V2 (`roles/backupdr.userv2`) for plans. Grants and the vault service agent are covered by the `gcp-foundation` skill.
- Source inconsistency: the source says the hourly minimum is six hours; gcloud 593.0.0 help states `hourly-frequency` must be between 4 and 23.
- The vault must be in the same project as the backup plan. The 30-day trial bills backups retained past the trial.
- Backup and DR vaults are distinct from the NetApp Volumes backup vault (see lustre-netapp.md).
- Corrected from the official docs: the vault update line `update BACKUPVAULT_NAME\` lacked a space before the continuation; the rendered plan blocks lost their `\` continuations; the association example lacked the required `--resource-type` flag.
- Corrected from the official docs: the source runs `gcloud compute instances describe VM_NAME --zone=VM_ZONE ...`, `gcloud backup-dr backup-plan-associations create ...` and `gcloud compute instances delete RESTORED_VM_NAME --zone=TARGET_ZONE` without `--project`, so they act on the gcloud default project; `--project=VM_PROJECT_ID`, `--project=PROJECT_ID` (the backup plan project) and `--project=TARGET_PROJECT_ID` (the restore target) were added. Deleting by name in the wrong project can remove an unrelated VM.
- Source: https://docs.cloud.google.com/backup-disaster-recovery/docs/cloud-console/backup-vault-create (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/backup-disaster-recovery/docs/cloud-console/backup-plan-create (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/backup-disaster-recovery/docs/quickstarts/gce-instances-backup-vault (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/backup-dr/backup-vaults/create (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [filestore.md](./filestore.md)
- [lustre-netapp.md](./lustre-netapp.md)
- Create and manage a backup vault: https://docs.cloud.google.com/backup-disaster-recovery/docs/cloud-console/backup-vault-create
