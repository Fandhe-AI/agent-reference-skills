---
source: https://developers.cloudflare.com/d1/best-practices/import-export-data/
---

# Import and export data

Import existing SQLite tables into D1 from `.sql` files, or export a D1 database to a `.sql` file for local development or testing.

## Signature / Usage

Import (execute) a SQL file:

```sh
npx wrangler d1 execute example-db --remote --file=users_export.sql
```

Convert a raw SQLite database (`.sqlite3`) to SQL first:

```sh
sqlite3 db_dump.sqlite3 .dump > db.sql
```

Export:

```sh
npx wrangler d1 export <database_name> --remote --output=./database.sql
npx wrangler d1 export <database_name> --remote --table=<table_name> --output=./table.sql
npx wrangler d1 export <database_name> --remote --output=./schema.sql --no-data
npx wrangler d1 export <database_name> --remote --table=<table_name> --output=./schema.sql --no-data
npx wrangler d1 export <database_name> --remote --output=./data.sql --no-schema
npx wrangler d1 export <database_name> --remote --table=<table_name> --output=./data.sql --no-schema
```

Split a large `INSERT` to avoid `Statement too long`:

```sql
INSERT INTO users (id, full_name, created_on)
VALUES
  ('1', 'Jacquelin Elara', '2022-08-20 05:39:52'),
  ...
  ('100', 'Eddy Orelo', '2022-12-15 22:16:15');
...
INSERT INTO users (id, full_name, created_on)
VALUES
  ('901', 'Roran Eroi', '2022-08-20 05:39:52'),
  ...
  ('1000', 'Boris Pewter', '2022-12-15 22:16:15');
```

## Notes

- You cannot import a raw SQLite database (`.sqlite3` files) directly. After `.dump`, edit the output: remove `BEGIN TRANSACTION` and `COMMIT;`, and remove the `CREATE TABLE _cf_KV (key TEXT PRIMARY KEY, value BLOB) WITHOUT ROWID;` statement if present.
- Requirements: Wrangler CLI, a target database, an existing SQLite (3.0+) file converted to SQL.
- `_cf_KV` is a reserved table used by D1's underlying storage system. It cannot be queried and does not incur read/write charges.
- Import limit: `wrangler d1 execute --file` is limited to 5GiB files (same as the R2 upload limit). Split larger imports into multiple files.
- Export limitations: not supported for virtual tables (including FTS5; workaround: delete virtual tables, export, recreate); a running export blocks other database requests; numeric values are affected by JavaScript's 52-bit precision (large `int64` values may lose precision).
- Troubleshooting: import SQL format only; the schema must be SQLite3 compatible (no MySQL / PostgreSQL imports); import tables in foreign-key order; `"cannot start a transaction within a transaction"` means `BEGIN TRANSACTION` / `COMMIT` remain in the dump.
- To defer foreign key checks during import, put `PRAGMA defer_foreign_keys = on;` before changes that would violate them (the official page writes `= true`). It does not disable foreign keys: checking is deferred to the end of the transaction, unresolved violations still fail with `FOREIGN KEY constraint failed`, and `ON DELETE CASCADE` actions still run. Otherwise import tables in foreign-key order.
- Corrected from the official docs: the official import page says to "temporarily disable foreign key constraints" with `PRAGMA defer_foreign_keys = true`; the D1 SQL statements and foreign keys pages state it only defers enforcement to the end of the transaction, so the wording was changed to match.

## Related

- [Wrangler commands](./wrangler-commands.md)
- [Define foreign keys](./foreign-keys.md)
- [Local development](./local-development.md)
- [Migrations](./migrations.md)
