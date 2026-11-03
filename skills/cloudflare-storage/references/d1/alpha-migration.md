---
source: https://developers.cloudflare.com/d1/platform/alpha-migration/
---

# Alpha database migration guide

Recreate D1 alpha databases (created before July 27th, 2023) on the production-ready storage backend. D1 alpha databases stopped accepting live SQL queries on August 22, 2024.

## Signature / Usage

```sh
# 1. Verify the database is alpha (output includes `version` set to `alpha`)
npx wrangler d1 info <database_name>

# 2. Create a manual backup
npx wrangler d1 backup create <alpha_database_name>

# 3. Download it as a .sqlite3 file (list backups with: wrangler d1 backup list <database_name>)
npx wrangler d1 backup download <alpha_database_name> <backup_id>

# 4. Convert to SQL statements
sqlite3 db_dump.sqlite3 .dump > db.sql

# 5. Create a new database (new databases use the updated architecture)
npx wrangler d1 create <new_database_name>

# 6. Import
npx wrangler d1 execute <new_database_name> --remote --file=./db.sql

# 7. Delete the alpha database
npx wrangler d1 delete <alpha_database_name>
```

## Notes

- Prerequisites: Wrangler `3.33.0` or later (the `--remote` flag), and an alpha database.
- After step 4, edit `db.sql`: remove `BEGIN TRANSACTION` and `COMMIT;`, and remove the `CREATE TABLE _cf_KV (key TEXT PRIMARY KEY, value BLOB) WITHOUT ROWID;` statement.
- The release notes state alpha backup access (`wrangler d1 backup`) was removed on 2025-07-01, so this procedure is only possible if a backup was kept; this page itself still lists the `backup` commands.
- D1's open beta launched October 2023; new databases use a more reliable architecture with larger sizes and higher throughput.

## Related

- [Backups (Legacy)](./backups-legacy.md)
- [Import and export data](./import-export-data.md)
- [Release notes](./release-notes.md)
