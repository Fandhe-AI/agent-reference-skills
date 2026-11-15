---
source: https://docs.cloud.google.com/backup-disaster-recovery/docs/quickstarts/gce-instances-backup-vault
---

# Quickstart: Protect and recover a Compute Engine instance with a backup vault

Create a backup vault and a backup plan, back up a Compute Engine instance (scheduled and on-demand), restore it from the backup, and clean up.

## Signature / Usage

### Create the vault and plan

```bash
gcloud backup-dr backup-vaults create BACKUPVAULT_NAME \
    --project=PROJECT_ID \
    --location=LOCATION \
    --backup-min-enforced-retention=RETENTION_PERIOD_IN_DAYS \
    --backup-retention-inheritance=RETENTION_PERIOD_INHERITANCE
```

```bash
gcloud backup-dr backup-plans create BACKUP_PLAN_NAME \
    --location=REGION \
    --resource-type=compute.googleapis.com/Instance \
    --project=PROJECT_ID \
    --backup-vault=BACKUPVAULT_NAME \
    --backup-rule=rule-id=RULE_NAME,recurrence=RECURRENCE,hourly-frequency=HOURS,time-zone=TIME_ZONE,backup-window-start=START_TIME,backup-window-end=END_TIME,retention-days=BACKUP_RETENTION
```

### Schedule and trigger backups

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

### Restore

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

Adapted (not in the official docs): added `--project=TARGET_PROJECT_ID` to `gcloud compute instances delete` so cleanup deletes the restored VM in the restore target project, not a same-named VM in the gcloud default project.

```bash
gcloud compute instances delete RESTORED_VM_NAME --zone=TARGET_ZONE --project=TARGET_PROJECT_ID
gcloud backup-dr backup-plan-associations delete BACKUP_PLAN_ASSOCIATION_NAME \
    --project=PROJECT_ID \
    --location=REGION
gcloud backup-dr backup-plans delete BACKUP_PLAN_NAME \
    --project=PROJECT_ID \
    --location=REGION
gcloud backup-dr backup-vaults delete BACKUPVAULT_NAME \
    --project=PROJECT_ID \
    --location=REGION
```

## Options / Props

| Name | Description |
|------|-------------|
| `RETENTION_PERIOD_IN_DAYS` | Period each backup cannot be deleted; 0 days to 99 years. Relative duration with a unit, for example `1d` or `p30d`; a bare number is read as seconds |
| `RETENTION_PERIOD_INHERITANCE` | For example `match-backup-expire-time` to inherit retention from the backup rule |
| `RECURRENCE` / `HOURS` | For example `HOURLY` and `6` |
| `START_TIME` / `END_TIME` | Hours in 24-hour format; the window must be at least six hours long, for example `10` and `20` (an example in the gcloud help) |
| `BACKUP_RETENTION` | Days, for example `30` |

## Notes

- Enable the Backup and DR API (`backupdr.googleapis.com`). Create the VM in a region where the vault is supported (the quickstart uses `us-central1`). The restored VM and quickstart resources are billable until deleted.
- Source inconsistency: the prerequisite role list mixes IAM roles with permission names (for example `backupdr.backupPlanAssociations.createForComputeInstance`, `cloudasset.assets.searchAllResources`, `roles/logging.logEntries.list`); roles named include `roles/backupdr.admin`, `roles/compute.instanceAdmin.v1`, `roles/compute.viewer`, `roles/resourcemanager.projectIamAdmin`.
- Source inconsistency: the quickstart gives `0` and `4` as example `START_TIME` / `END_TIME`, shorter than the six hours the backup-plan page requires; the `gcloud backup-dr backup-plans create` help says the start and end time must have an interval of 6 hours, and its rule examples use windows such as `10` to `20`. The table above uses that help example instead of `0` and `4`.
- The vault service agent needs Backup and DR Compute Engine Operator (`roles/backupdr.computeEngineOperator`) in the restore project, plus Compute Network User (`roles/compute.networkUser`) on a Shared VPC.
- The first scheduled backup triggers when the current time is within the backup window; otherwise run an on-demand backup.
- Destructive: the cleanup deletes the VM, association, plan and vault. A vault cannot be deleted until all backups have expired under their enforced retention; removing the association leaves backups in the vault until they expire. Try it on disposable resources first. Empty plans incur no cost; a vault costs only while it stores data.
- The source also shows Console steps.
- `--backup-min-enforced-retention` takes a relative duration with a unit (gcloud 593.0.0 help: "relative time format (e.g. p1d, p1m, p1m1d)"), for example `1d`, `p30d` or `2w1d`; a bare number is read as seconds, so the source's example value `1` for `RETENTION_PERIOD_IN_DAYS` sets a 1-second minimum. Use `1d` for one day.
- Corrected from the official docs: `gcloud backup-dr backup-plan-associations create BACKUP_PLAN_ASSOCIATION_NAME --location=VM_REGION --resource=... --backup-plan=...` omits `--resource-type`, which gcloud 593.0.0 requires (`argument --resource-type: Must be specified`); `--resource-type=compute.googleapis.com/Instance` was added.
- Corrected from the official docs: the source runs `gcloud compute instances describe VM_NAME --zone=VM_ZONE ...`, `gcloud backup-dr backup-plan-associations create ...` and `gcloud compute instances delete RESTORED_VM_NAME --zone=TARGET_ZONE` without `--project`, so they act on the gcloud default project; `--project=VM_PROJECT_ID`, `--project=PROJECT_ID` (the backup plan project) and `--project=TARGET_PROJECT_ID` (the restore target) were added. Deleting by name in the wrong project can remove an unrelated VM.
- Source: https://docs.cloud.google.com/backup-disaster-recovery/docs/quickstarts/gce-instances-backup-vault (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/backup-dr/backup-plans/create (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [backup-vault-create.md](./backup-vault-create.md)
- [backup-plan-create.md](./backup-plan-create.md)
- [backup-dr-overview.md](./backup-dr-overview.md)
