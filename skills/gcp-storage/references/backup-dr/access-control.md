---
source: https://docs.cloud.google.com/backup-disaster-recovery/docs/access-control
---

# Access control with IAM (Backup and DR)

Predefined IAM roles for Backup and DR (each bundles `backupdr.*` permissions plus resource permissions), one service agent role, basic roles, and the permission descriptions for appliance-managed workloads.

## Signature / Usage

Grant a predefined role at project level (borrowed form, with the quoting fixed):

Adapted (not in the official docs): the source's `--member='serviceAccount:SERVICE_ACCOUNT \` is missing its closing quote; it is closed here.

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member='serviceAccount:SERVICE_ACCOUNT' \
  --role=ROLE
```

Snippet taken from https://docs.cloud.google.com/backup-disaster-recovery/docs/cloud-console/backup-vault-create (the access-control twin has no code). Use a user, group or service account member as appropriate.

## Options / Props

| Role | ID | Purpose |
|---|---|---|
| Backup and DR Admin | `roles/backupdr.admin` | Full access to all Backup and DR resources |
| Backupdr Editor | `roles/backupdr.editor` | Editor role for backupdr |
| Backup and DR Viewer | `roles/backupdr.viewer` | Read-only access to all resources |
| Backup and DR User V2 | `roles/backupdr.userv2` | Full access except deploying/managing backup infrastructure, expiring backups, changing data sensitivity and on-premises billing |
| Backup and DR Backup User | `roles/backupdr.backupUser` | Apply existing backup plans; cannot create plans or restore |
| Backup and DR Restore User | `roles/backupdr.restoreUser` | Restore or mount from a backup; cannot create plans |
| Backup and DR Mount User | `roles/backupdr.mountUser` | Mount from a backup; cannot create plans or restore |
| Backup and DR User | `roles/backupdr.user` | Access to the management console; granular rights from console ACLs |
| Backup and DR Backup Vault Admin | `roles/backupdr.backupvaultAdmin` | Full administrative control of backup vault resources |
| Backup and DR Backup Vault Accessor | `roles/backupdr.backupvaultAccessor` | Appliance permission to create and manage backups in a vault |
| Backup and DR Backup Vault Lister | `roles/backupdr.backupvaultLister` | List backup vaults in a project (`backupdr.backupVaults.list`) |
| Backup and DR Backup Vault Viewer | `roles/backupdr.backupvaultViewer` | Read-only access to vaults and backups |
| Backup and DR Backup Config Viewer | `roles/backupdr.backupConfigViewer` | Read resource backup config (`backupdr.resourceBackupConfigs.fetch/get/list`) |
| Backup and DR Compute Engine Operator | `roles/backupdr.computeEngineOperator` | Service account discovers, backs up and restores Compute Engine VMs |
| Backup and DR Disk Operator | `roles/backupdr.diskOperator` | Service account stores backups/metadata in Disk |
| Backup and DR Cloud SQL Operator | `roles/backupdr.cloudSqlOperator` | Discover and back up Cloud SQL (`cloudsql.instances.createBackupDrBackup`, `cloudsql.instances.get`) |
| Backup and DR AlloyDB Operator | `roles/backupdr.alloydbOperator` | Discover and back up AlloyDB clusters (`alloydb.operations.get`) |
| Backup and DR Filestore Operator (Beta) | `roles/backupdr.filestoreOperator` | Discover and back up Filestore (`file.backups.create`, `file.instances.createCrossProjectBackup`, `file.instances.get`) |
| Backup and DR Cloud Storage Operator | `roles/backupdr.cloudStorageOperator` | Store and manage backups or metadata in Cloud Storage (`storage.buckets.create/get`, `storage.objects.create/delete/get/list`) |
| Backup and DR Management Server Accessor | `roles/backupdr.managementServerAccessor` | Appliance access (`backupdr.managementServers.createConnection`) |
| Basic roles | `roles/editor`, `roles/owner` | Full access to all Backup and DR resources; prefer predefined roles |

Service agent role: Backup and DR Service Agent `roles/backupdr.serviceAgent`, protecting Compute Engine instances and disks (plus Cloud SQL, AlloyDB, Filestore and NetApp backup permissions).

## Notes

- Do not grant service agent roles to any principals except service agents (warning from the source).
- Permissions are grouped per resource: `backupdr.backupPlans.*`, `backupPlanAssociations.*ForComputeInstance|ComputeDisk|CloudSqlInstance|AlloydbCluster|FilestoreInstance|NetappVolumes`, `backupVaults.*`, `bvbackups.*`, `bvdataSources.*`, `dataSourceReferences.*`, `managementServers.*`, `operations.*`, `trial.*`, `compute.restoreFromBackupVault`. Roles may be granted at project or resource level; granting at one level does not affect the other. Not reproduced: the full permission list for each role (about 200 entries); see the source URL.
- Two permission-description rows in the fetched twin have no permission name (appliance console API execution, appliance console access); not guessed. `managementServers.*` permissions apply to appliance-managed workloads (legacy console deprecated September 30, 2026).
- Permissions for CMEK: https://docs.cloud.google.com/backup-disaster-recovery/docs/concepts/cmek#permissions_required_to_use_cmek.
- Corrected from the official docs: the borrowed `--member='serviceAccount:SERVICE_ACCOUNT \` (unclosed quote) was fixed.
- Source: https://docs.cloud.google.com/backup-disaster-recovery/docs/access-control (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/backup-disaster-recovery/docs/cloud-console/backup-vault-create (borrowed snippet)

## Related

- [backup-vault-create.md](./backup-vault-create.md)
- [backup-plan-create.md](./backup-plan-create.md)
