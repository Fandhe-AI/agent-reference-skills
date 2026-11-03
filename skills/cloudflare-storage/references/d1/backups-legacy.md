---
source: https://developers.cloudflare.com/d1/reference/backups/
---

# Backups (Legacy)

Snapshot-based backups for legacy D1 alpha databases using wrangler v3. Time Travel replaces this for databases on the production storage subsystem.

## Signature / Usage

```sh
wrangler d1 backup list existing-db
wrangler d1 backup create example-db
wrangler d1 backup download example-db 123a81a2-ab91-4c2e-8ebc-64d69633faf1
wrangler d1 backup restore existing-db  6cceaf8c-ceab-4351-ac85-7f9e606973e3
```

## Notes

- Access to snapshot based backups for D1 alpha databases is removed on 2025-07-01 (see Release notes).
- Check the storage subsystem with `wrangler d1 info YOUR_DATABASE` (`version` field). `version: alpha` supports only this backup API.
- Automatic backups: hourly, retained 24 hours. Backups block access to the DB while running (usually a second or two); requests that arrive during the backup are queued.
- Manual backup: do it before large schema changes or manual data edits; larger databases may take a few seconds (the `state` column shows `done`). Consider migrations.
- Download: saves a native SQLite3 file to the current directory (`/Users/you/projects/example-db.123a81a2.sqlite3`); see Import and export data to import.
- Restore overwrites the existing database in place: tables absent from the backup disappear and dependent queries fail. Make a manual backup first. Queries immediately use the restored version once done.

## Related

- [Time Travel and backups](./time-travel.md)
- [Alpha database migration guide](./alpha-migration.md)
- [Migrations](./migrations.md)
- [Import and export data](./import-export-data.md)
