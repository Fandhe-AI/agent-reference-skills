---
source: https://docs.cloud.google.com/backup-disaster-recovery/docs/quickstarts/gce-instances-backup-vault
---

# Back Up and Restore a Compute Engine VM with a Backup Vault

Create a backup vault and backup plan, associate a VM, trigger a backup, restore it, and clean up.

## Signature / Usage

### Create the vault and plan

Enable the Backup and DR API (`backupdr.googleapis.com`) first. The commands come from separate source steps that name the same values differently. In this flow use one region (for example `us-central1`) for `LOCATION`, `REGION` and `VM_REGION`, because the backup plan must be in the same region as the VM. `BACKUP_PLAN` in the association is the `BACKUP_PLAN_NAME` you created, `RULE_ID` is the `RULE_NAME` of its backup rule, and `PROJECT_ID` is the project that holds the vault and plan.

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

### Associate the VM and trigger a backup

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

Find the data source ID (`VM_NAME` is the backed-up VM):

```bash
gcloud backup-dr data-sources list \
    --project=PROJECT_ID \
    --location=REGION \
    --backup-vault=BACKUPVAULT_NAME \
    "--filter=dataSourceGcpResource.computeInstanceDatasourceProperties.name:(VM_NAME)" \
    "--format=get(name)"
```

List backups for the data source to find the `BACKUP_ID` (replace `DATA_SOURCE` with the name from the previous step):

```bash
gcloud backup-dr backups list \
    --project=PROJECT_ID \
    --location=REGION \
    --backup-vault=BACKUPVAULT_NAME \
    --data-source=DATA_SOURCE
```

Restore the VM:

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

### Clean up (destructive)

This deletes the restored VM, association, plan and vault. Run it only on disposable resources.

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
|---|---|
| `RETENTION_PERIOD_IN_DAYS` | Relative duration with a unit, for example `1d` or `p30d`; a bare number is read as seconds. 0 days to 99 years |
| `RETENTION_PERIOD_INHERITANCE` | For example `match-backup-expire-time` |
| `RECURRENCE` / `HOURS` | For example `HOURLY` and `6` |
| `START_TIME` / `END_TIME` | 24-hour format hours, at least 6 hours apart, for example `2` and `14` (gcloud help) |

## Notes

- Source inconsistency: the quickstart gives `0` and `4` as example `START_TIME` / `END_TIME`, shorter than the six hours the backup-plan page requires; the `gcloud backup-dr backup-plans create` help says the start and end time must have an interval of 6 hours and uses `2` and `14`.
- The vault service agent needs `roles/backupdr.computeEngineOperator` in the restore project.
- A vault cannot be deleted until all backups expire under enforced retention; removing the association leaves backups in the vault.
- Corrected from the official docs: the association command omitted `--resource-type`, which gcloud 593.0.0 requires; a bare `1` for retention sets a 1-second minimum, so use `1d`.
- The source also shows Console steps.
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`). IAM is in `gcp-foundation`.
- Corrected from the official docs: the source runs `gcloud compute instances describe VM_NAME --zone=VM_ZONE ...`, `gcloud backup-dr backup-plan-associations create ...` and `gcloud compute instances delete RESTORED_VM_NAME --zone=TARGET_ZONE` without `--project`, so they act on the gcloud default project; `--project=VM_PROJECT_ID`, `--project=PROJECT_ID` (the backup plan project) and `--project=TARGET_PROJECT_ID` (the restore target) were added. Deleting by name in the wrong project can remove an unrelated VM.
- Source: https://docs.cloud.google.com/backup-disaster-recovery/docs/quickstarts/gce-instances-backup-vault (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/backup-disaster-recovery/docs/concepts/backup-plan (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/backup-dr/backup-plans/create (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [filestore-create-and-mount.md](./filestore-create-and-mount.md)
- https://docs.cloud.google.com/backup-disaster-recovery/docs/cloud-console/backup-vault-create
