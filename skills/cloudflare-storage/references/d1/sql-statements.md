---
source: https://developers.cloudflare.com/d1/sql-api/sql-statements/
---

# SQL statements

D1 is compatible with most of SQLite's SQL convention since it leverages SQLite's query engine. It supports database-level statements to list tables and indexes and to inspect schemas, plus a subset of SQLite extensions and PRAGMAs.

## Signature / Usage

Run any of these via the D1 console, `wrangler d1 execute`, or the D1 Worker Binding API:

```sh
npx wrangler d1 execute [DATABASE_NAME] --command='PRAGMA table_list'
npx wrangler d1 execute [DATABASE_NAME] --command='PRAGMA table_info("Order")'
npx wrangler d1 execute [DATABASE_NAME] --command='PRAGMA index_list("Territory")'
```

Query `sqlite_master` for all tables, indexes and their original SQL:

```sql
SELECT name, sql FROM sqlite_master
```

Search with LIKE:

```js
const { results } = await env.DB.prepare(
	"SELECT * FROM Customers WHERE CompanyName LIKE ?",
)
	.bind("%eve%")
	.run();
console.log("results: ", results);
```

Defer foreign key enforcement within a transaction:

Adapted (not in the official docs): the explicit `PRAGMA defer_foreign_keys = off` before the end of the transaction was removed and statements are terminated with `;`; see Notes.

```sql
-- Defer foreign key enforcement in this transaction.
PRAGMA defer_foreign_keys = on;

-- Run your CREATE TABLE or ALTER TABLE / COLUMN statements
ALTER TABLE users ...;

-- Restore consistency before the transaction ends. The setting is reset
-- implicitly at the end of the transaction; unresolved violations fail there.
```

## Options / Props

Compatible PRAGMA statements:

| PRAGMA | Description |
|--------|-------------|
| `PRAGMA table_list` | Lists tables and views, including D1 system tables. Row columns: `schema`, `name`, `type` (`table`, `view`, `shadow`, `virtual`), `ncol` (including generated or hidden columns), `wr` (1 if WITHOUT ROWID), `strict` (1 if STRICT). |
| `PRAGMA table_info("TABLE_NAME")` | Schema for the table. Columns: `cid`, `name`, `type` (`''` if not provided), `notnull`, `dflt_value`, `pk`. |
| `PRAGMA table_xinfo("TABLE_NAME")` | Like `table_info` but also includes generated columns (adds `hidden`). |
| `PRAGMA index_list("TABLE_NAME")` | Indexes for the table. Columns: `seq`, `name`, `unique`, `origin` (`c` = CREATE INDEX, `u` = UNIQUE constraint, `pk` = PRIMARY KEY constraint), `partial`. |
| `PRAGMA index_info(INDEX_NAME)` | Indexed key columns: `seqno`, `cid`, `name`. |
| `PRAGMA index_xinfo("INDEX_NAME")` | Like `index_info` but also includes hidden columns (`desc`, `coll`, `key`). |
| `PRAGMA quick_check` | Checks formatting and consistency (incorrectly formatted records, missing pages, sections used multiple times or not at all). Returns `OK` (shown as `ok`) or a string describing issues. |
| `PRAGMA foreign_key_check` | Checks for invalid foreign key references in the selected table. |
| `PRAGMA foreign_key_list("TABLE_NAME")` | Lists foreign key constraints in the selected table. |
| `PRAGMA case_sensitive_like = (on\|off)` | ON: 'a' LIKE 'A' is false. OFF (default): true. |
| `PRAGMA ignore_check_constraints = (on\|off)` | ON: CHECK constraints ignored. OFF (default): enforced. |
| `PRAGMA legacy_alter_table = (on\|off)` | ON: ALTER TABLE RENAME only rewrites the initial occurrence of the table name in its CREATE TABLE statement and associated CREATE INDEX / CREATE TRIGGER statements. OFF (default): rewrites all references in the schema. |
| `PRAGMA recursive_triggers = (on\|off)` | ON: triggers which fire can activate other triggers. OFF: they cannot. |
| `PRAGMA reverse_unordered_selects = (on\|off)` | ON: reverses result order of SELECT without ORDER BY. OFF: usual order. |
| `PRAGMA foreign_keys = (on\|off)` | ON: stops operations which violate foreign key constraints. OFF: allows them. |
| `PRAGMA defer_foreign_keys = (on\|off)` | Defers enforcement of foreign key constraints until the end of the current transaction. Does not disable enforcement outside it; unresolved violations at the end fail with `FOREIGN KEY constraint failed`. Does not prevent `ON DELETE CASCADE` from executing. |
| `PRAGMA optimize` | Runs `ANALYZE` per table when necessary (with a time limit) to update query-planner statistics. Recommended after schema changes (for example after creating an index). |

## Notes

- Supported SQLite extensions: FTS5 module for full-text search (including `fts5vocab`), JSON extension (JSON functions and operators), Math functions. Refer to the workerd `sqlite.c++` source for the full list of supported functions.
- D1 PRAGMA statements only apply to the current transaction.
- Adapted from the official docs: the official deferral example ends with an explicit `PRAGMA defer_foreign_keys = off` while violations may still be unresolved; it was removed so the example relies on the implicit reset.
- PRAGMA statements cannot query the contents of a table.
- D1 does not support `PRAGMA optimize(-1)`.
- D1 is SQLite-based; for SQL Server see the mssql skill, for Postgres-based Supabase see the supabase skill.

## Related

- [Define foreign keys](./foreign-keys.md)
- [Query JSON](./query-json.md)
- [Generated columns](./generated-columns.md)
- [Use indexes](./use-indexes.md)
- [Migrations](./migrations.md)
