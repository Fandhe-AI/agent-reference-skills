---
source: https://developers.cloudflare.com/d1/best-practices/use-indexes/
---

# Use indexes

Indexes improve query performance (and reduce rows read, hence cost) over frequently queried columns by reducing the rows D1 has to scan.

## Signature / Usage

```sql
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id)
```

Adapted (not in the official docs): each statement is terminated with `;`; see Notes.

```sql
-- Uses the index: the indexed column is referenced by the query.
SELECT * FROM orders WHERE customer_id = ?;

-- Does not use the index: customer_id is not in the query.
SELECT * FROM orders WHERE order_date = '2023-05-01';
```

List indexes:

```sql
SELECT name, type, sql FROM sqlite_schema WHERE type IN ('index');
```

Test an index:

```sql
EXPLAIN QUERY PLAN SELECT * FROM users WHERE email_address = 'foo@example.com';
QUERY PLAN
`--SEARCH users USING INDEX idx_email_address (email_address=?)
```

Multi-column and partial indexes:

Adapted (not in the official docs): each statement is terminated with `;`; see Notes.

```sql
CREATE INDEX idx_customer_id_transaction_date ON transactions(customer_id, transaction_date);
CREATE INDEX idx_order_status_not_complete ON orders(order_status) WHERE order_status != 6;
```

Remove with `DROP INDEX` (dropped indexes cannot be restored).

## Options / Props

Multi-column index usage (index on `(customer_id, transaction_date)`):

| Query | Index Used? |
| --- | --- |
| `SELECT * FROM transactions WHERE customer_id = '1234' AND transaction_date = '2023-03-25'` | Yes: specifies both columns in the index. |
| `SELECT * FROM transactions WHERE transaction_date = '2023-03-28'` | No: only specifies `transaction_date`, and does not include other leftmost columns from the index. |
| `SELECT * FROM transactions WHERE customer_id = '56789'` | Yes: specifies `customer_id`, which is the leftmost column in the index. |

Patterns that read or write too many rows:

| Pattern | Why | Fix |
| --- | --- | --- |
| `WHERE column = ?` on an unindexed column | D1 scans the whole table on every call. | Create an index on the filtered column. |
| `WHERE a = ? AND b = ?` with no index on either column | Whole-table scan. An index on one column avoids it but D1 still reads every row matching that column. | Create a multi-column index on `(a, b)`. |
| `JOIN other ON other.x = main.y` where `other.x` is unindexed | May scan the joined table repeatedly or create a temporary index. | Index the `ON` column, verify with `EXPLAIN QUERY PLAN`. |
| Correlated subquery | Inner query may be evaluated per candidate row. | Index the columns the subquery filters and joins on. |
| `ORDER BY RANDOM() LIMIT 1` | Must read and sort the entire result set; an index cannot help. | Avoid on large tables; pick a sampling strategy fitting the key type and distribution. |
| `WHERE column LIKE '%term%'` (leading wildcard) | Leading `%` prevents B-tree optimization, usually a full scan. | Remove the leading wildcard where possible; `LIKE 'term%'` can use an index. For substring search consider FTS5 with the trigram tokenizer (patterns with at least three consecutive non-wildcard Unicode characters); it increases storage and write costs. |
| Re-running `CREATE INDEX` or schema changes on every request | Building an index writes a row per indexed row; writes cost more than reads. | Run schema changes once through D1 migrations. |

## Notes

- Adapted from the official docs: the official examples omit `;` between statements in multi-statement blocks; terminators were added so the blocks run as written.
- Useful for: columns in predicates (emails, usernames, user IDs, dates), uniqueness (`CREATE UNIQUE INDEX`), multi-column queries, and JOIN columns.
- Indexes update automatically on insert/update/delete. Tables using the default `ROWID` or their own `INTEGER PRIMARY KEY` need no index on that column.
- Common naming format: `idx_TABLE_NAME_COLUMN_NAMES`.
- After creating an index, run `PRAGMA optimize`.
- You cannot modify `sqlite_schema` or an existing index; delete and re-create to change one. Indexes cannot reference other tables or use non-deterministic functions, and they add to storage (an index is effectively a table).
- Multi-column indexes are used only when the query includes all columns, or a subset with all columns to the left present (index on `(customer_id, transaction_date, shipping_status)`: `customer_id` + `transaction_date` uses it; `transaction_date` + `shipping_status` does not).
- Partial indexes (defined with `WHERE`) cover a subset of rows, can be faster for reads and writes, and can be combined with multi-column indexes.
- D1 bills by rows read and rows written, not rows returned. Focus on frequently run read-heavy queries with a large `Rows read / rows returned`; check the dashboard or `meta.rows_read` / `meta.rows_written`.

## Related

- [SQL statements](./sql-statements.md)
- [Pricing](./pricing.md)
- [Find slow and expensive queries](./find-expensive-queries.md)
- [Migrations](./migrations.md)
