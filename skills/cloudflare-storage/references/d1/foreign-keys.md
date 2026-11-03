---
source: https://developers.cloudflare.com/d1/sql-api/foreign-keys/
---

# Define foreign keys

D1 supports defining and enforcing foreign key constraints across tables. By default, D1 enforces foreign key constraints in all queries and migrations, identical to `PRAGMA foreign_keys = on` in SQLite for every transaction.

## Signature / Usage

```sql
CREATE TABLE users (
    user_id INTEGER PRIMARY KEY,
    email_address TEXT,
    name TEXT,
    metadata TEXT
)

CREATE TABLE orders (
    order_id INTEGER PRIMARY KEY,
    status INTEGER,
    item_desc TEXT,
    shipped_date INTEGER,
    user_who_ordered INTEGER,
    FOREIGN KEY(user_who_ordered) REFERENCES users(user_id)
)
```

Defer enforcement during schema changes:

```sql
-- Defer foreign key enforcement in this transaction.
PRAGMA defer_foreign_keys = on

-- Run your CREATE TABLE or ALTER TABLE / COLUMN statements
ALTER TABLE users ...

-- This is implicit if not set by the end of the transaction.
PRAGMA defer_foreign_keys = off
```

Cascading action:

```sql
CREATE TABLE users (
    user_id INTEGER PRIMARY KEY,
    email_address TEXT,
)

CREATE TABLE scores (
    score_id INTEGER PRIMARY KEY,
    game TEXT,
    score INTEGER,
    player_id INTEGER,
    FOREIGN KEY(player_id) REFERENCES users(user_id) ON DELETE CASCADE
)
```

## Options / Props

Actions for `ON UPDATE` and/or `ON DELETE` (may differ per clause):

| Action | Description |
|--------|-------------|
| `CASCADE` | Updating or deleting a parent key deletes all child keys (rows) associated to it. |
| `RESTRICT` | A parent key cannot be updated or deleted when any child key refers to it. Unlike default enforcement, errors are returned immediately, not at the end of the transaction. |
| `SET DEFAULT` | Set the child column(s) to the schema `DEFAULT`. Cannot be used if no `DEFAULT` is set on the child columns. |
| `SET NULL` | Set the child column(s) to SQL `NULL`. |
| `NO ACTION` | Take no action. |

## Notes

- Because D1 runs every query inside an implicit transaction, user queries cannot change `PRAGMA foreign_keys` during a query or migration; use `PRAGMA defer_foreign_keys = on|off` instead.
- `PRAGMA defer_foreign_keys = off` does not disable enforcement outside the current transaction; unresolved violations at the end fail with `FOREIGN KEY constraint failed`.
- A foreign key can be defined in `CREATE TABLE` or when adding a column via `ALTER TABLE`. Multiple foreign keys per table and references to multiple tables are allowed.
- `CASCADE` can delete child rows across tables with unintended side effects.
- The official `CREATE TABLE users` snippet in the CASCADE example has a trailing comma after `email_address TEXT,` as written in the source.

## Related

- [SQL statements](./sql-statements.md)
- [Migrations](./migrations.md)
- [Import and export data](./import-export-data.md)
