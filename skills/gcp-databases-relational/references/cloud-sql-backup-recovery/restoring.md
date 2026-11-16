---
source: https://docs.cloud.google.com/sql/docs/postgres/backup-recovery/restoring
---

# Restore an instance from a backup

To restore from a backup you find the backup, then use it to restore a live or a deleted instance to the same instance, to a different new or existing instance, or to an instance in another project or region. The backup location depends on the instance's backup option (standard or enhanced).

## Signature / Usage

### Restore to the same instance (overwrites it)

> **Warning:** The restore process overwrites all of the current data on the instance, including previous point-in-time recovery (PITR) logs. Previous on-demand and automatic backups on the instance are retained.

1. All replicas must be deleted from the instance before restoring. Check for read replicas, then delete any:

```bash
gcloud sql instances describe INSTANCE_NAME
```

```bash
gcloud sql instances delete REPLICA_NAME
```

2. Standard backups: find the backup and record its `ID`. For enhanced backups, list the backup vault (see Related).

```bash
gcloud sql backups list --instance=INSTANCE_NAME
```

3. Restore (`BACKUP_ID` is the backup's ID):

```bash
gcloud sql backups restore BACKUP_ID \
--restore-instance=INSTANCE_NAME
```

4. After the restore completes, recreate the replicas you deleted. The source also notes the console path: Cloud SQL Backups page, choose Standard tier or Enhanced tier, click **Restore**, select **Overwrite the source instance**, and type the instance ID to confirm.

REST v1 request (`POST https://sqladmin.googleapis.com/v1/projects/PROJECT_ID/instances/INSTANCE_ID/restoreBackup`):

Adapted (not in the official docs): removed the trailing comma after `"backupRunId"` so the body is valid JSON.

```json
{
  "restoreBackupContext":
  {
    "backupRunId": "BACKUP_ID"
  }
}
```

### Restore to a new or existing instance in the same project

The target is updated to the state of the source instance when the backup was taken. For an existing target, delete all its replicas first (same `describe` / `delete` commands with `TARGET_INSTANCE_NAME`), and recreate them after the restore.

```bash
gcloud sql backups restore BACKUP_ID \
--restore-instance=TARGET_INSTANCE_NAME \
--backup-instance=SOURCE_INSTANCE_NAME
```

If the instance overview page cannot list backups during an outage, use the `backupRuns.list` API with the `-` wildcard to list all backups across all instances in the project.

### Restore to an instance in another project or region

```bash
gcloud sql backups restore BACKUP_ID \
--restore-instance=TARGET_INSTANCE_NAME \
--backup-instance=SOURCE_INSTANCE_NAME \
--backup-project=SOURCE_INSTANCE_PROJECT
```

REST v1 uses the `project` parameter in the request (`POST .../projects/target-project-id/instances/target-instance-id/restoreBackup`):

Adapted (not in the official docs): quoted the unquoted `backup-id` value so the body is valid JSON.

```json
{
  "restoreBackupContext":
  {
    "backupRunId": "backup-id",
    "project": "source-project-id",
    "instanceId": "source-instance-id"
  }
}
```

### Restore a deleted instance (final or retained backup)

Restore to an existing instance (overwrites it; same warning as above; delete its replicas first):

```bash
gcloud sql backups restore BACKUP_ID \
--restore-instance=TARGET_INSTANCE_NAME
```

Restore to a new instance uses the same command, and Cloud SQL creates the instance with the settings of the instance the backup was taken from:

```bash
gcloud sql backups restore BACKUP_ID \
--restore-instance=TARGET_INSTANCE_NAME
```

For a different project, use the three-flag form above with `--backup-project`.

## Options / Props

| Flag | Meaning |
|------|---------|
| `BACKUP_ID` | ID of the backup to restore. For a different project or a backup vault backup, include the full path of the backup |
| `--restore-instance` | Target instance (new or existing) |
| `--backup-instance` | Instance the backup was taken from (source instance) |
| `--backup-project` | Project that contains the source instance |

### Permissions

| Scenario | Required |
|----------|----------|
| Different project (live instance) | `cloudsql.instances.restoreBackup` for the target project; `cloudsql.backupRuns.get` for the source project; both included in `Cloud SQL Admin` |
| Deleted instance, new instance, or different project | `cloudsql.instances.create` and `cloudsql.instances.restoreBackup` for the target project; `cloudsql.backupRuns.get` for the source backup; included in `Cloud SQL Admin` |

## Notes

- Warnings kept verbatim from the source: "The restore process overwrites all of the current data on the instance, including previous point-in-time recovery (PITR) logs. Previous on-demand and automatic backups on the instance are retained." and "All replicas for your target instance must be deleted prior to restoring." In the console, the instance selected under **Instance to be overwritten** and all its data will be overwritten, and you confirm by typing the destination instance ID.
- Restores onto an existing instance and `gcloud sql instances delete` for replicas are destructive. Try them on a disposable instance first.
- A new instance created from a final backup has a different IP address from the instance the backup was taken from. For a new instance in the console, the Instance ID is permanent and cannot be changed.
- Requirements and behavior (target resources at least those of the source, database version, rate limit of three restores per 30 minutes) are on restore.md.
- Corrected from the official docs: the source REST bodies have `"backupRunId": "BACKUP_ID",` (trailing comma, invalid JSON) and `"backupRunId": backup-id,` (unquoted value). One deleted-instance REST example uses `backup: projects/PROJECT_ID/backups/BACKUP_ID` with `restore_instance_settings: {}` (not reproduced). REST v1beta4, PowerShell, curl wrappers and Console steps are omitted; the same bodies exist under `/sql/v1beta4/`.
- The source gcloud blocks are indented code in the twin and are fenced here without other changes. The cross-project deleted-instance gcloud step also contains a stray fence marker in the source.
- Cloud SQL pages describe managed PostgreSQL / MySQL / SQL Server on Google Cloud, distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the Node.js client `mssql` / ORM `drizzle` (those skills cover client code, not the managed service).
- Source: https://docs.cloud.google.com/sql/docs/postgres/backup-recovery/restoring (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [restore.md](./restore.md)
- [pitr.md](./pitr.md)
- [backups.md](./backups.md)
- [backup-options.md](./backup-options.md)
