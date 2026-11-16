---
source: https://docs.cloud.google.com/spanner/docs/dml-partitioned
---

# Partitioned DML

Partitioned Data Manipulation Language (partitioned DML) is designed for large bulk updates and deletes: periodic cleanup and garbage collection (for example deleting old rows or setting columns to `NULL`) and backfilling new columns with default values (for example setting a new column to `False` where it is currently `NULL`). It is not suitable for small-scale transaction processing; for a few rows, use transactional DML with identifiable primary keys. For committing many blind writes without an atomic transaction, the source points to batch write.

## Signature / Usage

### Fully partitionable statements

Each statement can be applied to a single row in the table:

```sql
UPDATE Singers SET LastName = NULL WHERE LastName = '';

DELETE FROM Albums WHERE MarketingBudget > 10000;
```

The following statement is not fully partitionable because it accesses multiple tables (Spanner returns the error `BadUsage` for a statement that is not partitionable):

```googlesql
# Not fully partitionable
DELETE FROM Singers WHERE
SingerId NOT IN (SELECT SingerId FROM Concerts);
```

### Idempotent versus non-idempotent

This statement is idempotent:

```sql
UPDATE Singers SET MarketingBudget = 1000 WHERE true;
```

This statement is not idempotent, so it must not be run as partitioned DML (partitions can be retried, so a row might be updated more than once):

```sql
UPDATE Singers SET MarketingBudget = 1.5 * MarketingBudget WHERE true;
```

### Execute a partitioned update (Node.js)

Use `runPartitionedUpdate()`:

Adapted (not in the official docs): wrapped in `async function main()` so `await` is valid in a CommonJS script, the catch block rethrows and `main()` sets a non-zero exit code on failure, and `database.close()` is awaited.

```javascript
// Imports the Google Cloud client library
const {Spanner} = require('@google-cloud/spanner');

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// const projectId = 'my-project-id';
// const instanceId = 'my-instance';
// const databaseId = 'my-database';

// Creates a client
const spanner = new Spanner({
  projectId: projectId,
});

// Gets a reference to a Cloud Spanner instance and database
const instance = spanner.instance(instanceId);
const database = instance.database(databaseId);

async function main() {
  try {
    const [rowCount] = await database.runPartitionedUpdate({
      sql: 'UPDATE Albums SET MarketingBudget = 100000 WHERE SingerId > 1',
    });
    console.log(`Successfully updated ${rowCount} records.`);
  } catch (err) {
    console.error('ERROR:', err);
    throw err;
  } finally {
    // Close the database when finished.
    await database.close();
  }
}

main().catch(() => {
  process.exitCode = 1;
});
```

### Execute a partitioned update and delete (Python)

Use `execute_partitioned_dml()`:

```python
# instance_id = "your-spanner-instance"
# database_id = "your-spanner-db-id"

spanner_client = spanner.Client()
instance = spanner_client.instance(instance_id)
database = instance.database(database_id)

row_ct = database.execute_partitioned_dml(
    "UPDATE Albums SET MarketingBudget = 100000 WHERE SingerId > 1"
)

print("{} records updated.".format(row_ct))
```

```python
# instance_id = "your-spanner-instance"
# database_id = "your-spanner-db-id"
spanner_client = spanner.Client()
instance = spanner_client.instance(instance_id)
database = instance.database(database_id)

row_ct = database.execute_partitioned_dml("DELETE FROM Singers WHERE SingerId > 10")

print("{} record(s) deleted.".format(row_ct))
```

## Options / Props

### DML versus partitioned DML

| DML | Partitioned DML |
|---|---|
| Rows that don't match the `WHERE` clause might be locked. | Only rows that match the `WHERE` clause are locked. |
| Transaction size limits apply. | Spanner handles the transaction limits and per-transaction concurrency limits. |
| Statements don't need to be idempotent. | A DML statement must be idempotent to ensure consistent results. |
| A transaction can include multiple DML and SQL statements. | A partitioned transaction can include only one DML statement. |
| There are no restrictions on complexity of statements. | Statements must be fully partitionable. |
| You create read-write transactions in your client code. | Spanner creates the transactions. |

### Limits and unsupported features

| Item | Source statement |
|---|---|
| Concurrent partitioned DML statements | A maximum of 20,000 per database. |
| Statements per client library call | Only one partitioned DML statement per call. |
| Row count | A lower bound on the number of modified rows, not necessarily exact. |
| `INSERT` | Not supported. |
| Google Cloud console | Partitioned DML statements can't be executed in the console. |
| Query plans and profiling | Not supported by the Google Cloud CLI and the client libraries. |
| Subqueries | Subqueries that read from another table, or a different row of the same table, are not supported. |

### Best practices (from the source)

| Practice | Detail |
|---|---|
| Avoid high concurrency | Running many partitioned DML statements concurrently (for example, more than 100) might lead to lock contention on internal system tables; use a single statement instead. |
| `PDML_MAX_PARALLELISM` | Statement hint to raise the throughput of a single statement on tables with many splits; more parallelism means more compute usage. |
| Let Spanner handle partitioning | Don't shard manually by primary key ranges and run separate statements per shard. |
| Partitioning scope | Work is parallelized across all splits in the entire database, so overhead can occur even for a small table. |
| Frequent small deletions | DML within transactions or the BatchWrite API might perform better. |

## Notes

- Spanner might run a partitioned DML statement more than once against some partitions because of network-level retries; this is why the statement must be idempotent.
- Spanner does not apply the statement atomically across the whole table, only atomically per partition. Partitioned DML does not support commit or rollback; the statement is applied immediately. If you cancel, executing partitions are cancelled and remaining partitions don't start, but partitions that already ran are not rolled back. If an error occurs (for example a data type constraint, `UNIQUE INDEX` or `ON DELETE NO ACTION` violation), execution stops across all partitions and the error is returned; the statement might have run on some partitions and never on others. On success, the statement ran at least once against each partition of the key range.
- Row locking: Spanner acquires a lock only if a row is a candidate for update or deletion, unlike regular DML which might read-lock rows that don't match the `WHERE` clause.
- Deleting from a parent table with interleaved child tables that have a global index can fail with `The transaction contains too many mutations`. Mutations to child rows aren't counted against the mutation limit, but the corresponding index entry mutations are. Delete in two partitioned DML statements (first the child tables, then the parent table), or drop the global index on the child table before deleting the parent rows.
- For complex scenarios, such as moving a table or transformations that need joins across tables, the source suggests the Dataflow connector.
- Destructive: partitioned `DELETE` / `UPDATE` cannot be rolled back and partial application is possible. Try it on a disposable database first. The samples carry a `WHERE` clause as in the source, but `WHERE true` in the idempotent / non-idempotent examples matches every row of the table.
- Whether a statement is partitioned depends on the client library method you call (for example Node.js `runPartitionedUpdate()` versus a regular transaction). The source also shows C++, C#, Go, Java, PHP and Ruby samples, and the mutation limit itself is documented in the Spanner quotas page (https://docs.cloud.google.com/spanner/quotas#limits-for).
- Corrected from the official docs: the Node.js sample is an excerpt from inside an async function in the sample repository; as shown (`const [rowCount] = await database.runPartitionedUpdate({` at top level of a `require` script, `console.error('ERROR:', err);` only, `database.close();` without `await`) it is a `SyntaxError` in CommonJS and exits 0 on failure.
- The `# Not fully partitionable` comment is GoogleSQL syntax (PostgreSQL uses `--` comments), so that fence is tagged `googlesql`.
- Source: https://docs.cloud.google.com/spanner/docs/dml-partitioned (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [dml-best-practices.md](./dml-best-practices.md)
- [isolation-levels.md](./isolation-levels.md)
- Active partitioned DMLs statistics: https://docs.cloud.google.com/spanner/docs/introspection/active-partitioned-dmls
- Batch writes: https://docs.cloud.google.com/spanner/docs/batch-write
- Compare DML and mutations: https://docs.cloud.google.com/spanner/docs/dml-versus-mutations
- `gcp-client-libraries` skill (Node.js / Python client patterns)
