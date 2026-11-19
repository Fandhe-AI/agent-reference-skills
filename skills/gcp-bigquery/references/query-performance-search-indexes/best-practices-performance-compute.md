---
source: https://docs.cloud.google.com/bigquery/docs/best-practices-performance-compute
---

# Optimize query computation

Best practices for optimizing BigQuery query performance. Review the query plan first (Google Cloud console, `INFORMATION_SCHEMA.JOBS*` views, or the `jobs.get` REST API method), then reduce data processed, optimize query operations, reduce query output, and avoid anti-SQL patterns.

## Signature / Usage

### Avoid `SELECT *`

Query only the columns you need. A `LIMIT` clause on a `SELECT *` query does not reduce the bytes read; you are billed for reading all bytes in the table. Use `SELECT * EXCEPT` to exclude columns.

```sql
SELECT * EXCEPT (col1, col2, col5)
FROM mydataset.newtable
```

### Wildcard tables and sharded tables

- Use the most granular prefix: `` FROM `bigquery-public-data.noaa_gsod.gsod194*` `` performs better than `` FROM `bigquery-public-data.noaa_gsod.*` `` because fewer tables match.
- Prefer time-partitioned tables to date-named (sharded) tables. Each shard needs its own schema, metadata and permission checks, so oversharding hurts query performance.

### Prune partitioned queries

- Ingestion-time partitioned tables: filter on the `_PARTITIONTIME` pseudocolumn.
- Time-unit column and integer-range partitioned tables: filter on the partitioning column.

```text
WHERE _PARTITIONTIME
BETWEEN TIMESTAMP("20160101")
AND TIMESTAMP("20160131")
```

### Reduce data before a `JOIN`

Join without pre-aggregation:

```sql
WITH
  users_posts AS (
  SELECT *
  FROM
    `bigquery-public-data`.stackoverflow.comments AS c
  JOIN
    `bigquery-public-data`.stackoverflow.users AS u
  ON
    c.user_id = u.id
  )
SELECT
  user_id,
  ANY_VALUE(display_name) AS display_name,
  ANY_VALUE(reputation) AS reputation,
  COUNT(text) AS comments_count
FROM users_posts
GROUP BY user_id
ORDER BY comments_count DESC
LIMIT 20;
```

Pre-aggregate the comment counts, which reduces the data read for the `JOIN`:

```sql
WITH
  comments AS (
  SELECT
    user_id,
    COUNT(text) AS comments_count
  FROM
    `bigquery-public-data`.stackoverflow.comments
  WHERE
    user_id IS NOT NULL
  GROUP BY user_id
  ORDER BY comments_count DESC
  LIMIT 20
  )
SELECT
  user_id,
  display_name,
  reputation,
  comments_count
FROM comments
JOIN
  `bigquery-public-data`.stackoverflow.users AS u
ON
  user_id = u.id
ORDER BY comments_count DESC;
```

### Other data-reduction practices

- `WHERE`: when possible use `BOOL`, `INT64`, `FLOAT64` or `DATE` columns; they are typically faster than `STRING` or `BYTE`.
- Materialized views precompute query results; BigQuery reads only base-table changes when possible.
- BI Engine: add a BI Engine reservation to the project where queries are computed (vectorized engine accelerates `SELECT` queries).
- Search indexes: efficient row lookups in large tables with the `SEARCH` function, and `=`, `IN`, `LIKE` and certain string and JSON functions.

### Optimize query operations

- Avoid repeatedly transforming the same data (for example regular expressions or string trimming): materialize the transformed results in a destination table.
- CTEs (`WITH`) can be evaluated each time they are referenced. Persist the result in a scalar variable or temporary table using procedural language, temporary tables and automatically expiring tables.
- Avoid repeated joins and identical subqueries: use nested repeated data, or materialize the subquery results in a table.
- Join order: place the table with the largest number of rows first, then the table with the fewest rows, then the rest by decreasing size. A large left side with a small right side creates a broadcast join.
- Specify primary key and foreign key constraints when the data satisfies them; the query engine can use them for query plans. BigQuery does not check integrity automatically, and violated constraints can make results inaccurate.
- Split complex queries into multiple smaller statements with multi-statement queries and stored procedures; materialize intermediate results in variables or temporary tables.
- Use `INT64` instead of `STRING` in joins: BigQuery doesn't index primary keys, so wider join columns take longer to compare.

### Optimize the `ORDER BY` clause

Use `ORDER BY` in the outermost query or within window clauses, and push complex operations (regular expressions, math functions) to the end. This query sorts millions of values and throws a `Resources exceeded` error:

```sql
SELECT
title
FROM
`my-project.mydataset.mytable`
ORDER BY
title;
```

Add a `LIMIT` clause:

```sql
SELECT
title
FROM
`my-project.mydataset.mytable`
ORDER BY
title DESC
LIMIT
1000;
```

With a window function, limit the data before calling it. This version takes approximately 15 seconds because `LIMIT` is applied only at the end, so all data is sorted on a single worker node:

```sql
SELECT
id,
reputation,
creation_date,
DENSE_RANK() OVER (ORDER BY creation_date) AS user_rank
FROM bigquery-public-data.stackoverflow.users
ORDER BY user_rank ASC
LIMIT 10;
```

Limiting first takes approximately 2 seconds with the same results:

```sql
WITH users AS (
SELECT
id,
reputation,
creation_date,
FROM bigquery-public-data.stackoverflow.users
ORDER BY creation_date ASC
LIMIT 10)
SELECT
id,
reputation,
creation_date,
DENSE_RANK() OVER (ORDER BY creation_date) AS user_rank
FROM users
ORDER BY user_rank;
```

### Reduce query output

Materialize large result sets to a destination table. Cached results are limited to approximately 10 GB compressed; larger results often fail with `Response too large`. Alternatives: filters, a `LIMIT` clause (especially with `ORDER BY`), or paging through results with the BigQuery API. A destination table can be deleted automatically with the dataset's default table expiration.

### Avoid anti-SQL patterns

- Self joins: use a window (analytic) function or the `PIVOT` operator. A self join can square the number of output rows.
- Cross joins: avoid joins that generate more outputs than inputs; when a `CROSS JOIN` is required, pre-aggregate (`GROUP BY`) or use a window function. Check the query plan and the "high cardinality join" performance insight.
- Single-row DML: BigQuery is OLAP, not OLTP. Batch `UPDATE` and `INSERT`; `INSERT` DML is subject to DML quotas (consider streaming for frequent single-row inserts); the query length limit is 1 MB. Stage replacement rows in another table and update by join:

```sql
UPDATE
  dataset.t t
SET
  my_column = u.my_column
FROM
  dataset.u u
WHERE
  t.my_key = u.my_key
```

- Use column and table aliases for similarly named columns.

## Options / Props

### Transaction lock behavior

| Item | Value |
|------|-------|
| Mutating DML inside a multi-statement transaction | Acquires a table-level lock; concurrency limit of 1 per table |
| Standalone mutating DML statements | Queued automatically, up to 20 per table |
| Concurrent multi-statement transaction on a locked table | Not queued; fails immediately with `Transaction is aborted due to concurrent update against table` |
| Retry after a failed transaction | Exponential backoff; wait at least 60 seconds before the first retry |

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/best-practices-performance-compute (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Transactions: don't wrap a single DML statement (for example a `MERGE` in a stored procedure) in `BEGIN TRANSACTION` / `COMMIT TRANSACTION`, so DML queuing applies. Keep transactions short; run long staging queries before the transaction starts. The lock is held until commit, rollback, or the parent script or session ends.
- `WITH` clauses are for readability, not performance; the optimizer may evaluate them multiple times.
- The `DENSE_RANK()` rewrite does not give identical results when ranking data that spans multiple years (the source's caveat).
- The Stack Overflow queries read public datasets and are billed by bytes processed.
- Try the `UPDATE` pattern on a disposable dataset first.
- Cloud SQL (OLTP alternative named in the source) is in the `gcp-databases-relational` skill.

## Related

- [query-plan-explanation.md](./query-plan-explanation.md)
- [bi-engine-intro.md](./bi-engine-intro.md)
- [search-intro.md](./search-intro.md)
