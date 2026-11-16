---
source: https://docs.cloud.google.com/sql/docs/postgres/backup-recovery/backups
---

# About Cloud SQL backups

Cloud SQL backs up instances on demand or on a backup schedule. Available configuration depends on the instance's backup option (standard or enhanced). Backups are incremental and encrypted by default (Google-managed keys or CMEK). They let you restore an instance, build disaster-recovery instances in another region or zone, and create instances for development, testing and migration.

## Signature / Usage

### List operations to follow a backup

The source says the console reports only success or failure and points to `gcloud sql operations list` to list all operations for an instance. The source has no code block for this page.

### Clone from a point in time (borrowed snippet)

Snippet taken from https://docs.cloud.google.com/sql/docs/postgres/backup-recovery/pitr (PITR always creates a new instance).

```bash
gcloud sql instances clone SOURCE_INSTANCE_NAME \
NEW_INSTANCE_NAME \
--point-in-time 'TIMESTAMP'
```

## Options / Props

### Backup request types

| Type | Behavior |
|------|----------|
| On-demand | Created at any time, with or without automated backups enabled. Standard: stored indefinitely until manually deleted. Enhanced: user-defined custom retention up to 10 years, set in the backup plan. |
| Automated | Scheduled (hourly, daily, weekly or monthly, depending on backup option) while the instance runs; starts in the backup window. Do not delete them manually: they support point-in-time recovery. |
| Final | Taken before instance deletion. Primary instances only, not replicas. Default retention 30 days; 1 day to 365 days (standard) or 1 day to 10 years (enhanced). Billed like other backups for the days retained. For enhanced backups, managed by the backup plan. |

### Retention facts

| Item | Value |
|------|-------|
| Automated backup retention | 1 day to 10 years, depending on backup option |
| Backups of deleted instances | Cloud SQL retains them for four days for recovery via Google Cloud Customer Care |
| Retained backups, standard on-demand | Kept until manually deleted or the project is deleted |
| Retained backups, enhanced on-demand | Kept per the selected retention rule |
| Retained automated backups | Deleted on a rolling basis, one backup per day, after instance deletion; e.g. retention 7 means the latest automated backup is deleted 7 days after deletion |
| Automated backups to retain (troubleshooting row) | 1 to 365 |
| Labels | More than 50 user-defined labels can fail a backup (64-label snapshot limit including system labels) |

### Troubleshooting (from the source table)

| Issue | Resolution |
|-------|------------|
| Cannot see operation status | Run `gcloud sql operations list` for the instance |
| Who issued an on-demand backup | Check logs, `cloudsql.googleapis.com/postgres.log` and `cloudaudit.googleapis.com/activity` |
| Automated backup stuck for hours | Ask customer support to `force restart` the instance |
| Restore of SQL dump fails | Create the database users that own objects before restoring the dump |
| Missing data after restore | Unlogged tables (`CREATE UNLOGGED TABLE ...`) are wiped on restore; use `SET LOGGED` |
| Cannot delete instance with final backup | The final-backup selection at delete time must match the instance's `final-backup` setting, or be left empty |
| Cannot create replica after enabling final backup | Update the final backup organization policy to apply to the primary only |

## Notes

- Backups for replicas are not available; promoted replicas cannot access the primary's backups and need their own configuration.
- Backup and restore cannot upgrade to a later database version; restore only to the same database version. Use an in-place major version upgrade, Database Migration Service, or export/import to upgrade.
- Restoring from a backup does not retain the deleted instance's IP address.
- All backups except the first are incremental; the oldest backup is about the instance size. Backup size is the billable size.
- Integrity checks run offline by restoring a sample of customer-initiated or recovery backups. Cloud SQL tries to keep at least one last daily backup of every active instance (recovery backup, via Customer Care).
- Deleting an instance is destructive: data survives only through a final backup, retained backups (on-demand backups, and automated backups kept after deletion per the retention rows above), point-in-time recovery of a deleted instance while its logs are still retained (see pitr.md), or the four-day retention of a deleted instance's backups for recovery via Customer Care. If none of these apply, the data cannot be recovered. Try deletion only on a disposable instance first.
- The source also shows many console links and the enhanced vs standard comparison, covered in backup-options.md.
- Cloud SQL pages describe managed PostgreSQL / MySQL / SQL Server on Google Cloud, distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the Node.js client `mssql` / ORM `drizzle` (those skills cover client code, not the managed service).
- Source: https://docs.cloud.google.com/sql/docs/postgres/backup-recovery/backups (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [backup-options.md](./backup-options.md)
- [pitr.md](./pitr.md)
- [restore.md](./restore.md)
- [restoring.md](./restoring.md)
