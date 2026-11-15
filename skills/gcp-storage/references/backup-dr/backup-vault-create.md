---
source: https://docs.cloud.google.com/backup-disaster-recovery/docs/cloud-console/backup-vault-create
---

# Create and manage a backup vault

Create, list, describe, update and delete a Backup and DR backup vault from the console or gcloud, set enforced retention and CMEK, and grant the vault service agent the roles it needs.

## Signature / Usage

### Create

```bash
gcloud backup-dr backup-vaults create BACKUPVAULT_NAME \
  --project=PROJECT_ID \
  --location=LOCATION \
  --backup-retention-inheritance=RETENTION_PERIOD_INHERITANCE \
  --backup-min-enforced-retention=RETENTION_PERIOD_IN_DAYS \
  --kms-key=KMS_KEY \
  --access-restriction=ACCESS_RESTRICTION
```

```bash
gcloud backup-dr operations describe FULL_OPERATION_ID
```

### List and describe

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

### Update minimum enforced retention

Adapted (not in the official docs): a missing space after `BACKUPVAULT_NAME` before the line continuation was added and the block de-indented.

```bash
gcloud backup-dr backup-vaults update BACKUPVAULT_NAME \
  --project=PROJECT_ID \
  --location=LOCATION \
  --backup-min-enforced-retention=RETENTION_PERIOD_IN_DAYS
```

### Delete

```bash
gcloud backup-dr backup-vaults delete BACKUPVAULT_NAME \
  --project=PROJECT_ID \
  --location=LOCATION
```

### Grant a role to the vault service agent

Adapted (not in the official docs): the source's `--member='serviceAccount:SERVICE_ACCOUNT \` is missing its closing quote; it is closed here.

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member='serviceAccount:SERVICE_ACCOUNT' \
  --role=ROLE
```

## Options / Props

| Name | Description |
|------|-------------|
| `RETENTION_PERIOD_INHERITANCE` | `inherit-vault-retention` (default) or `match-backup-expire-time`; cannot be changed once set |
| `RETENTION_PERIOD_IN_DAYS` | Minimum 0 days, maximum 99 years; for example `2w1d` is two weeks and one day |
| `KMS_KEY` | `projects/KMS_PROJECT_ID/locations/KMS_LOCATION/keyRings/KEY_RING_NAME/cryptoKeys/KEY_NAME`; enables CMEK, only at creation |
| `ACCESS_RESTRICTION` | `within-project`, `within-org`, `unrestricted`, `within-org-but-unrestricted-for-ba`; default `within-org` |

| Resource type | Min. enforced retention (backups) | Logs | Prevent manual deletion |
|---|---|---|---|
| AlloyDB for PostgreSQL | 0-365 days | 1-35 days | Required |
| Cloud SQL | 0 days to 10 years | Not applicable | Optional |
| Compute Engine instance / disk | 0 days to 99 years | Not applicable | Optional |
| Filestore | 0 days to 99 years | Not applicable | Optional |

Required role: Backup and DR Backup Vault Admin (`roles/backupdr.backupvaultAdmin`), with permissions `backupdr.backupVaults.create/list/get/update/delete` and `backupdr.bvbackups.restore`.

## Notes

- Irreversible: once the lock effective date is reached the minimum enforced retention can only be increased and the lock cannot be removed; before that you can remove the lock. CMEK can only be configured at creation. Retention changes apply only to backups created after the update. In console-based plans, an increase beyond the backup plan's retention is prevented.
- Apply a project lien to protect the vault's project from deletion (https://docs.cloud.google.com/backup-disaster-recovery/docs/configuration/project-liens); use Privileged Access Manager for multi-party approval. Beginning November 1, 2026, Backup and DR automatically applies a project-level lien to projects containing a vault with enforced-retention backups.
- A vault cannot be deleted until every backup has passed its enforced retention and expired or been deleted. The delete command is destructive; try it on a disposable vault first.
- Back up a Compute Engine VM from another project: grant the vault service agent Backup and DR Compute Engine Operator (`roles/backupdr.computeEngineOperator`) in the VM project; same-project backups need no grant. The same role in the restore project is needed to restore. The service agent is a Google-managed service account; grant it only the role described.
- Appliance-managed workloads (Google Cloud VMware Engine, Oracle, SQL Server) need the appliance service account to hold `roles/backupdr.backupvaultAccessor` and a vault with `UNRESTRICTED` or `WITHIN_ORG_BUT_UNRESTRICTED_FOR_BA` access; these workloads are covered by the legacy console deprecation (see deprecations page). An IAM condition (CEL) can limit it to one vault (not reproduced).
- CMEK for Backup and DR covers Compute Engine instance and Persistent Disk backups in vaults. Source inconsistency: this page says CMEK covers Compute Engine instance and Persistent Disk backups; the Backup and DR overview (`backup-dr-overview.md`) also lists Cloud SQL. Participants in the 30-day trial are billed for backups retained past the trial.
- The source also shows Console steps and a Terraform `google_backup_dr_backup_vault` example.
- Distinct from the NetApp Volumes backup vault (https://docs.cloud.google.com/netapp/volumes/docs/protect-data/about-backups).
- Corrected from the official docs: `update BACKUPVAULT_NAME\` (no space before the continuation) and `--member='serviceAccount:SERVICE_ACCOUNT \` (unclosed quote) were fixed.
- Source: https://docs.cloud.google.com/backup-disaster-recovery/docs/cloud-console/backup-vault-create (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [backup-vault.md](./backup-vault.md)
- [backup-plan-create.md](./backup-plan-create.md)
- [access-control.md](./access-control.md)
