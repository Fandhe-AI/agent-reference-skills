---
source: https://docs.cloud.google.com/spanner/docs/backup
---

# Backup and restore overview

Spanner creates full backups on demand and full or incremental backups through backup schedules. Backups are highly available, encrypted, retained for up to a year, and can be restored when operator or application errors cause logical data corruption. A backup resides in the same instance, region and project as its source database; it can be copied to another region or project.

## Signature / Usage

### Backup resource path

Backups are resources organized under the same instance as the source database:

```text
projects/PROJECT_ID/instances/INSTANCE_ID/backups/BACKUP_NAME
```

Replace `PROJECT_ID` with the project ID, `INSTANCE_ID` with the instance ID and `BACKUP_NAME` with the backup name.

### Key concepts

- `createTime`: when Spanner starts creating the backup. `versionTime`: when the database contents are captured; the backup is a consistent view at `versionTime`.
- On-demand: `createTime` and `versionTime` are the same by default; you can specify an older `versionTime` within the database's version retention period.
- Scheduled: `versionTime` is the time you choose in the schedule; creation starts within four hours of it. Example: frequency `0 7 * * * UTC` gives `versionTime` 7:00 AM UTC and `createTime` between 7:00 and 11:00 AM UTC.
- Incremental backups form chains; the first backup of an incremental schedule is a full backup, and each later one holds only data changed since the previous backup in the chain.

## Options / Props

| Item | Value |
|------|-------|
| Max retention | Up to a year from creation |
| Full backup schedule frequency | Every 12 hours or more |
| Incremental backup schedule frequency | Every 4 hours or more |
| Max backup schedules per database | 4 |
| Schedule start window | Backup creation begins within four hours of the scheduled time |
| New database schedule activation | Up to 24 hours to become active |
| Incremental backups per chain | Up to 13 in addition to the initial full backup |
| Default backup schedule | Full backup every 24 hours, 7-day retention, applies to new databases only; takes 24 hours to become active |
| Typical backup duration | 1-4 hours (scheduling delay can take up to 30 minutes) |
| Typical copy duration | 1-4 hours |
| Minimum billing | A completed backup is billed for at least 24 hours |

### Backup contents

| Included (at `versionTime`) | Not included |
|---|---|
| Data (all for full; changes only for incremental) | Data or schema changes after `versionTime` |
| Schema: tables, fields, data types, secondary indexes, change streams and their relationships | IAM policies |
| Database options set with `ALTER DATABASE SET OPTIONS` | Change stream data records (only the schema is stored) |

### Storage fields

| Field | Meaning |
|-------|---------|
| `exclusiveSizeBytes` | Bytes required by the backup; the billable size |
| `freeableSizeBytes` | Bytes released if you delete the backup (zero for older backups with a newer incremental in the chain) |
| `oldestVersionTime` | `versionTime` of the oldest full backup in the chain, even if expired |
| `sizeBytes` | For an incremental schedule, the sum of the sizes of all backups in the chain up to that backup |
| `incrementalBackupChainId` | Identifies the chain |

### Incremental chain details

- Incremental backups require the Spanner Enterprise or Enterprise Plus edition. An incremental backup can't be created on demand.
- Spanner might start a new chain early if the oldest full backup is 28 or more days old, the newest backup in the chain is deleted, or the schedule is modified.
- Retention of the oldest full backup is at most the lower of `retention_duration` + 28 days and `retention_duration` + (`creation_interval` * 14).
- Restoring an incremental backup might take longer than restoring a full backup with the same data.

## Notes

- Source: https://docs.cloud.google.com/spanner/docs/backup (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Backups are transactionally and externally consistent at `versionTime`. For regional instances the backup is stored in each of the three read-write zones; for dual-region and multi-region instances, in all zones with a read-write or read-only replica. A multi-region backup is restorable only after every zone has completed its replica.
- Expired backups are deleted asynchronously, so there can be a lag. A backup continues to exist after its source database is deleted but can't outlive its instance; an instance with backups can't be deleted. The source recommends restoring the backup and exporting the restored database before deleting the backup and instance. You can delete a new instance within 24 hours to avoid manually deleting its default-schedule backups.
- Deleting a backup in a chain frees no storage while newer backups depend on it. Deleting all data of a chain requires deleting every backup in the chain.
- Backup copy: you can't copy if the source or target region is down; periodically copy backups outside the affected region. Copying an incremental backup also copies the older backups it needs, avoiding redundant copies where possible. Cross-region copies incur outbound data transfer costs. Copy does not affect source performance.
- Encryption: Google-owned/managed keys or CMEK; by default a backup uses its database's encryption config, overridable at creation. A CMEK backup uses the primary key version at creation, which can't be changed later. A copy defaults to the source backup's encryption; for CMEK cross-region copies, specify the KMS key of the destination region.
- Backup jobs do not use the instance's CPU and are unaffected by its load. Backup storage is billed separately and doesn't count against database storage limits.
- Backup size can be smaller or larger than the source database; there is no formula for the ratio.
- Destructive: deleting a backup removes that restore point (in an incremental chain, Spanner might keep the deleted backup's data while newer backups in the chain depend on it; not from the source: the deleted backup itself is no longer listed or restorable); deleting an instance drops all of its databases and is not reversible, and is refused while the instance has backups. Try it on a disposable resource first. A restore does not overwrite anything: it creates a new database, and you can't restore to an existing database (see `pitr.md` and the `restore-backups` page on the official docs).
- The source has no gcloud commands for this overview; creation and management are in the official "Create backups", "Manage backups" and "Create and manage backup schedules" pages.

## Related

- [pitr.md](./pitr.md)
- [fgac-about.md](./fgac-about.md)
- Create backups: https://docs.cloud.google.com/spanner/docs/backup/create-backups
- Manage backups: https://docs.cloud.google.com/spanner/docs/backup/manage-backups
- Create and manage backup schedules: https://docs.cloud.google.com/spanner/docs/backup/create-manage-backup-schedules
