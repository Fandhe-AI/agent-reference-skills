---
source: https://docs.cloud.google.com/firestore/native/docs/restore-in-place
---

# Perform an in-place restore operation

Restore a backup to a database with the same name as the backup's source database. A restore must target a database that does not exist, so an in-place restore is simulated by deleting the source database and restoring into a new database with the same ID.

> Warning (source): once you start the in-place restore process, the original database is permanently lost, and you can't undo this operation.

## Signature / Usage

### Before you begin

Save the index configuration so you can re-create indexes afterwards:

```sh
gcloud firestore indexes composite list --database=DATABASE_ID
```

```sh
gcloud firestore indexes fields list --database=DATABASE_ID
```

### Steps

1. Identify the backup (resource name format `projects/PROJECT_ID/locations/LOCATION/backups/BACKUP_ID`) with `gcloud firestore backups list`.
2. Delete the existing database (destructive):

```sh
gcloud firestore databases delete --database='DATABASE_ID'
```

3. Wait at least 5 minutes for the database ID to become available, then restore:

```bash
gcloud firestore databases restore \
--source-backup=projects/PROJECT_ID/locations/LOCATION/backups/BACKUP_ID \
--destination-database='DATABASE_ID'
```

## Notes

- Downtime exists between deleting the database and the restore completing. Once a restore begins it cannot be cancelled, and it immediately occupies the database ID.
- This is destructive: try the procedure on a disposable database first.
- Backups do not include TTL policies or Security Rules; see [backups.md](./backups.md) for post-restore steps.
- Firestore's managed document database (Native / Datastore mode, MongoDB compatibility) — distinct from Supabase Postgres (`supabase`) and Cloudflare KV / D1 (`cloudflare-storage`).
- Source: https://docs.cloud.google.com/firestore/native/docs/restore-in-place (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [backups.md](./backups.md)
- [pitr.md](./pitr.md)
