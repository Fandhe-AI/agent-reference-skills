---
source: https://docs.cloud.google.com/bigquery/docs/transactions
---

# Multi-Statement Transactions

Multi-statement transactions let you run mutating operations (such as inserting or deleting rows) across multiple tables and commit or roll back atomically, with snapshot isolation. Tables can span multiple datasets or projects, and a single table can be mutated in several stages based on intermediate computations.

## Signature / Usage

### Transaction scope and exception handling

A transaction must be contained in a single SQL query, except in session mode. A query can contain multiple transactions, but they cannot be nested. Start with `BEGIN TRANSACTION`; end with `COMMIT TRANSACTION` or `ROLLBACK TRANSACTION`. If the query ends before either, BigQuery automatically rolls back.

```sql
BEGIN

  BEGIN TRANSACTION;
  INSERT INTO mydataset.NewArrivals
    VALUES ('top load washer', 100, 'warehouse #1');
  -- Trigger an error.
  SELECT 1/0;
  COMMIT TRANSACTION;

EXCEPTION WHEN ERROR THEN
  -- Roll back the transaction inside the exception handler.
  SELECT @@error.message;
  ROLLBACK TRANSACTION;
END;
```

### Example transaction

Assumes tables `mydataset.Inventory (product STRING, quantity INT64, supply_constrained BOOL)` and `mydataset.NewArrivals (product STRING, quantity INT64, warehouse STRING)` exist.

```sql
BEGIN TRANSACTION;

-- Create a temporary table that holds new arrivals from 'warehouse #1'.
CREATE TEMP TABLE tmp
  AS SELECT * FROM mydataset.NewArrivals WHERE warehouse = 'warehouse #1';

-- Delete the matching records from the NewArrivals table.
DELETE mydataset.NewArrivals WHERE warehouse = 'warehouse #1';

-- Merge the records from the temporary table into the Inventory table.
MERGE mydataset.Inventory AS I
USING tmp AS T
ON I.product = T.product
WHEN NOT MATCHED THEN
 INSERT(product, quantity, supply_constrained)
 VALUES(product, quantity, false)
WHEN MATCHED THEN
 UPDATE SET quantity = I.quantity + T.quantity;

-- Drop the temporary table and commit the transaction.
DROP TABLE tmp;

COMMIT TRANSACTION;
```

### Find committed or rolled back transactions

```sql
SELECT transaction_id, parent_job_id, query
FROM `region-us`.INFORMATION_SCHEMA.JOBS_BY_PROJECT
WHERE statement_type = "COMMIT_TRANSACTION" AND error_result IS NULL;
```

```sql
SELECT
  transaction_id, parent_job_id, query
FROM `region-us`.INFORMATION_SCHEMA.JOBS_BY_PROJECT
WHERE statement_type = "ROLLBACK_TRANSACTION" AND error_result IS NULL;
```

### Find start and end time of a transaction

```sql
SELECT transaction_id, start_time, end_time, statement_type
FROM `region-us`.INFORMATION_SCHEMA.JOBS_BY_USER
WHERE transaction_id = "TRANSACTION_ID"
AND statement_type IN
  ("BEGIN_TRANSACTION", "COMMIT_TRANSACTION", "ROLLBACK_TRANSACTION")
ORDER BY start_time;
```

### Find the transaction of a job

Returns `NULL` if the job is not running within a multi-statement transaction.

```sql
SELECT transaction_id
FROM `region-us`.INFORMATION_SCHEMA.JOBS_BY_PROJECT
WHERE job_id = 'JOB_ID';
```

### Find the current job within a transaction

Adapted (not in the official docs): the source compares `state = RUNNING` with an unquoted identifier, which is not a valid state literal; the value is quoted.

```sql
SELECT job_id, query, start_time, total_slot_ms
FROM `region-us`.INFORMATION_SCHEMA.JOBS_BY_PROJECT
WHERE transaction_id = 'TRANSACTION_ID' AND state = 'RUNNING';
```

### Find active transactions that affect a table

For each active transaction, also returns the parent job ID (multi-statement queries, such as a stored procedure) and the session info (sessions).

```sql
WITH running_transactions AS (
  SELECT DISTINCT transaction_id
  FROM
    `region-us`.INFORMATION_SCHEMA.JOBS_BY_PROJECT
  EXCEPT DISTINCT
  SELECT transaction_id
  FROM
    `region-us`.INFORMATION_SCHEMA.JOBS_BY_PROJECT
  WHERE
    statement_type = 'COMMIT_TRANSACTION'
    OR statement_type = 'ROLLBACK_TRANSACTION'
)
SELECT
  jobs.transaction_id, parent_job_id, session_info, query
FROM
  `region-us`.INFORMATION_SCHEMA.JOBS_BY_PROJECT AS jobs, running_transactions
WHERE
  destination_table = ("PROJECT_NAME", "DATASET_NAME", "TABLE_NAME")
  AND jobs.transaction_id = running_transactions.transaction_id;
```

## Options / Props

### Statements supported in transactions

| Category | Supported |
|---|---|
| Query | `SELECT` |
| DML | `INSERT`, `UPDATE`, `DELETE`, `MERGE`, `TRUNCATE TABLE` |
| DDL on temporary entities | `CREATE TEMP TABLE`, `CREATE TEMP FUNCTION`, `DROP TABLE` on a temporary table, `DROP FUNCTION` on a temporary function |

DDL that creates or drops permanent entities (datasets, tables, functions) is not supported inside transactions.

### Limitations

| Limitation | Detail |
|---|---|
| Size | At most 100 tables mutated and at most 100,000 partition modifications per transaction |
| External data | Reads from external data sources aren't guaranteed consistent if the source changes during the transaction; external metadata can't be refreshed with `BQ.REFRESH_EXTERNAL_METADATA_CACHE` |
| Materialized views | Interpreted as logical views (no performance or cost benefit) |
| BI Engine | Does not accelerate queries inside a transaction |
| Failure | A failed multi-statement transaction rolls back all pending changes and precludes retries |

### Concurrency

| Item | Behavior |
|---|---|
| Lock scope | Updating or deleting rows takes a table-level lock, not per partition |
| Mutating transactions per table | 1; BigQuery doesn't queue them. A conflicting one fails immediately with `Transaction is aborted due to concurrent update against table` |
| Standalone mutating DML | BigQuery queues up to 20 per table |
| Allowed concurrently with a mutating transaction | `SELECT`, Storage Read API reads, BI Engine queries, `INSERT`, `WRITE_APPEND` load jobs, streaming writes |

## Notes

- Without session mode, an error with no exception handler fails the query and rolls the transaction back. In session mode with no exception handler, the transaction stays active until the session ends or is rolled back explicitly. Add exception handlers so locks are released promptly.
- `CURRENT_TIMESTAMP`, `CURRENT_DATE` and `CURRENT_TIME` return the time the transaction started; `FOR SYSTEM_TIME AS OF` cannot read beyond the transaction start (error).
- The write lock is held until commit / rollback, or until the parent multi-statement query or session (for example an ODBC or JDBC connection) ends; a long-running open transaction keeps the table locked and makes concurrent mutating transactions fail.
- To serialize insert-only transactions, start each with a `DELETE` that modifies no rows (`DELETE FROM TABLE_NAME WHERE FALSE;`), which takes the table-level lock.
- Avoid conflicts: do not wrap a single mutating DML (such as `MERGE`) in `BEGIN TRANSACTION` / `COMMIT TRANSACTION` (a single DML is already atomic and gets DML queuing); retry failed transactions with exponential backoff, waiting at least 60 seconds before the first retry.
- Each statement runs as a child job; all children share the `transaction_id` shown in `INFORMATION_SCHEMA.JOBS*`.
- Corrected from the official docs: `AND state = RUNNING` in "Find the current job within a transaction" (unquoted `RUNNING`), now `'RUNNING'`. The `destination_table = (...)` predicate in the active-transactions query is kept as written.
- The source also has queries for active transactions of a multi-statement job and for overlapping jobs of a failed transaction (including an `INFORMATION_SCHEMA.JOBS_BY_ORGANIZATION` variant), plus the `CREATE OR REPLACE TABLE` / `INSERT` setup for the example tables; these blocks are omitted. Run setup like the source's on a disposable dataset first.
- Source: https://docs.cloud.google.com/bigquery/docs/transactions (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [sessions-intro.md](./sessions-intro.md)
- [sessions.md](./sessions.md)
- [multi-statement-queries.md](./multi-statement-queries.md)
- [procedures.md](./procedures.md)
