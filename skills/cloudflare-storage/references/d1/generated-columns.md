---
source: https://developers.cloudflare.com/d1/reference/generated-columns/
---

# Generated columns

Define columns computed from other columns, SQL functions or extracted JSON values, either `VIRTUAL` (computed on read, default) or `STORED` (computed on write).

## Signature / Usage

```sql
CREATE TABLE sensor_readings (
    event_id INTEGER PRIMARY KEY,
    timestamp INTEGER NOT NULL,
    raw_data TEXT,
    location as (json_extract(raw_data, '$.measurement.location')) STORED
);
```

Add to an existing table (always `VIRTUAL`):

```sql
ALTER TABLE sensor_readings
ADD COLUMN location as (json_extract(raw_data, '$.measurement.location'));
```

More examples:

```sql
ALTER TABLE your_table
-- date(timestamp, 'unixepoch') converts a Unix timestamp to a YYYY-MM-dd formatted date
ADD COLUMN formatted_date AS (date(timestamp, 'unixepoch'))
```

```sql
-- Filter out "expired" results based on your generated column:
-- SELECT * FROM your_table WHERE current_date() > expires_at
ALTER TABLE your_table
-- calculates a date (YYYY-MM-dd) 30 days from the timestamp.
ADD COLUMN expires_at AS (date(timestamp, '+30 days'));
```

## Options / Props

| Type | Description |
|------|-------------|
| `VIRTUAL` (default) | Generated when read. Uses no storage but can increase compute time. |
| `STORED` | Generated when the row is written. Takes storage like a regular column; faster reads. Recommended for compute-intensive expressions such as parsing large JSON. |

Syntax: `column_name AS <expr>` or `column_name GENERATED ALWAYS AS <function> [STORED|VIRTUAL]` (`GENERATED ALWAYS` is optional and does not change behavior).

## Notes

- Can be defined in `CREATE TABLE` or via `ALTER TABLE`; can have indexes defined on them.
- Definitions cannot be modified directly: use `ALTER TABLE table_name DROP COLUMN column_name` then `ADD COLUMN`, or `RENAME COLUMN current_name TO new_name` before adding a new definition.
- Tables must have at least one non-generated column.
- Expressions may only reference other columns in the same row and only deterministic functions (no `random()`, sub-queries or aggregates).
- Columns added via `ALTER TABLE ... ADD COLUMN` must be `VIRTUAL`; you cannot add a `STORED` column to an existing table.
- Corrected from the official docs: the source writes `ALTER TABLE table_name REMOVE COLUMN`, which is not valid SQLite syntax; the statement is `ALTER TABLE table_name DROP COLUMN column_name`.

## Related

- [Query JSON](./query-json.md)
- [Use indexes](./use-indexes.md)
- [SQL statements](./sql-statements.md)
