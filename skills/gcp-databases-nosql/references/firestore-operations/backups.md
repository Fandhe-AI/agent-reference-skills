---
source: https://docs.cloud.google.com/firestore/native/docs/backups
---

# Back up and restore data

Firestore scheduled backups protect against application-level data corruption or accidental deletion. A backup is a consistent point-in-time copy of a database (data and index configuration); backups are restored into a new database.

## Signature / Usage

### Create a backup schedule

Daily:

```sh
gcloud firestore backups schedules create \
--database='DATABASE_ID' \
--recurrence=daily \
--retention=RETENTION_PERIOD
```

Weekly:

```sh
gcloud firestore backups schedules create \
--database='DATABASE_ID' \
--recurrence=weekly \
--retention=RETENTION_PERIOD \
--day-of-week=DAY
```

`DATABASE_ID` is the database ID (`'(default)'` for the default database). `RETENTION_PERIOD` is up to 14 weeks (`14w`). `DAY` is one of `SUN`, `MON`, `TUE`, `WED`, `THU`, `FRI`, `SAT`.

### List, describe, update, delete schedules

```sh
gcloud firestore backups schedules list \
--database='DATABASE_ID'
```

```sh
gcloud firestore backups schedules describe \
--database='DATABASE_ID' \
--backup-schedule=BACKUP_SCHEDULE_ID
```

```sh
gcloud firestore backups schedules update \
--database='DATABASE_ID' \
--backup-schedule=BACKUP_SCHEDULE_ID \
--retention=RETENTION_PERIOD
```

```sh
gcloud firestore backups schedules delete \
--database='DATABASE_ID' \
--backup-schedule=BACKUP_SCHEDULE_ID
```

Only the retention period can be updated, not the recurrence. To change recurrence, delete the schedule and create a new one. Deleting a schedule does not delete backups it already created.

### List, describe, delete backups

```sh
gcloud firestore backups list \
--format="table(name, database, state)"
```

```sh
gcloud firestore backups list \
--location=LOCATION \
--format="table(name, database, state)"
```

```sh
gcloud firestore backups describe \
--location=LOCATION \
--backup=BACKUP_ID
```

Warning (source): you cannot recover a deleted backup.

```sh
gcloud firestore backups delete \
--location=LOCATION \
--backup=BACKUP_ID
```

### Restore a backup to a new database

Adapted (not in the official docs): the source's quoting wraps `--tags` inside the `--destination-database` quote; the quotes are fixed, the square brackets around `KEY=VALUE` are removed, and `--tags` is shown as a separate (optional) flag.

```sh
gcloud firestore databases restore \
--source-backup=projects/PROJECT_ID/locations/LOCATION/backups/BACKUP_ID \
--destination-database='DATABASE_ID' \
--tags=KEY=VALUE
```

The output includes `metadata`, `name` and `response`; the database mode matches the backup. Check progress again with:

```sh
gcloud firestore operations list --database=DATABASE_ID
```

```sh
gcloud firestore operations describe OPERATION_NAME
```

## Options / Props

| Item | Value |
|------|-------|
| Schedules per database | Up to one daily and up to one weekly |
| Time of day | Not configurable; backups are taken at different times each day |
| Max retention | 14 weeks (`14w`; `8467200s` in Terraform) |
| `roles/datastore.owner` | Full access to the Firestore database |
| `roles/datastore.backupsAdmin` | Read and write access to backups |
| `roles/datastore.backupsViewer` | Read access to backups |
| `roles/datastore.backupSchedulesAdmin` | Read and write access to backup schedules |
| `roles/datastore.backupSchedulesViewer` | Read access to backup schedules |
| `roles/datastore.restoreAdmin` | Initiate restore operations |

## Notes

- A backup does not contain TTL policies or Firebase Security Rules, and resides in the same location as the source database. Deleting the source database does not delete its backups. Backups do not affect read/write performance.
- Billing: storage used by each backup; restore is charged by backup size. Billing must be enabled.
- `--tags` takes comma-separated pairs, e.g. `--tags=123/environment=production,123/costCenter=marketing` or `--tags=tagKeys/333=tagValues/444`. `DATABASE_ID` must not already be in use.
- Restore does not restore App Engine search data or blob entities from a `(default)` database.
- After a restore: configure Firebase Security Rules (new databases deny all web/mobile client reads and writes by default), verify IAM controls, and reapply TTL policies (not in backups).
- Backup/database deletion and restore are destructive or billable; try them on a disposable database first.
- Corrected from the official docs: the restore example had `--destination-database='DATABASE_ID \` / `--tags=[KEY=VALUE]'` (quote closing after `--tags`).
- Firestore's managed document database (Native / Datastore mode, MongoDB compatibility) — distinct from Supabase Postgres (`supabase`) and Cloudflare KV / D1 (`cloudflare-storage`). The source also shows Console and Terraform forms (omitted).
- Source: https://docs.cloud.google.com/firestore/native/docs/backups (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [restore-in-place.md](./restore-in-place.md)
- [pitr.md](./pitr.md)
- [disaster-recovery.md](./disaster-recovery.md)
- [ttl.md](./ttl.md)
