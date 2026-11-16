---
source: https://docs.cloud.google.com/spanner/docs/dml-versus-mutations
---

# DML versus mutations

DML and mutations are two Spanner APIs for modifying data with similar features. DML (`INSERT`, `UPDATE`, `DELETE`) runs through client libraries, the Google Cloud console and `gcloud spanner`. A mutation is a sequence of inserts, updates and deletes applied atomically to rows and tables, in the order added, and must be applied (committed) to take effect.

## Signature / Usage

Mixing both in one transaction gives surprising results: DML runs before mutations in the commit request, and buffered mutations are invisible to later statements in the same transaction.

Adapted (not in the official docs): the original printed `FirstName` / `LastName`, which the query does not select (`getString` on an unselected column throws); it now prints the selected `SingerId` / `AlbumTitle`.

```java
static void updateMarketingBudget(DatabaseClient dbClient) {
  dbClient
      .readWriteTransaction()
      .run(
          new TransactionCallable<Void>() {
            @Override
            public Void run(TransactionContext transaction) throws Exception {
               transaction.buffer(
                    Mutation.newInsertBuilder("Albums")
                        .set("SingerId")
                        .to(1)
                        .set("AlbumId")
                        .to(1)
                        .set("AlbumTitle")
                        .to("Total Junk")
                        .set("MarketingBudget")
                        .to(800)
                        .build());
               transaction.buffer(
                    Mutation.newInsertBuilder("Albums")
                        .set("SingerId")
                        .to(1)
                        .set("AlbumId")
                        .to(2)
                        .set("AlbumTitle")
                        .to("Go Go Go")
                        .set("MarketingBudget")
                        .to(200)
                        .build());

                // This UPDATE will not include the Albums inserted above.
                String sql =
                  "UPDATE Albums SET MarketingBudget = MarketingBudget * 2"
                      + " WHERE SingerId = 1";
                long rowCount = transaction.executeUpdate(Statement.of(sql));
                System.out.printf("%d records updated.\n", rowCount);

                // Read a newly updated record.
                sql =
                  "SELECT SingerId, AlbumId, AlbumTitle FROM Albums"
                      + " WHERE SingerId = 1 AND MarketingBudget < 1000";
                ResultSet resultSet =
                                 transaction.executeQuery(Statement.of(sql));
                while (resultSet.next()) {
                   System.out.printf(
                        "%d %s\n",
                        resultSet.getLong("SingerId"),
                        resultSet.getString("AlbumTitle"));
                }
                return null;
              }
            });
}
```

Running the original code prints "0 records updated" because the mutations are not visible until commit; buffer writes only at the very end of the transaction.

## Options / Props

| Operation | DML | Mutations |
|-----------|-----|-----------|
| Insert data | Supported | Supported |
| Delete data | Supported | Supported |
| Update data | Supported | Supported |
| Insert or ignore data | Supported | Unsupported |
| Read your writes (RYW) | Supported | Unsupported |
| Insert or update (upsert) | Supported | Supported |
| SQL syntax | Supported | Unsupported |
| Constraint checking | After every statement | At commit time |
| Mutation limit enforcement (including indexes) | Per statement (resets after execution) | Per commit (cumulative) |

| Limit | Value |
|-------|-------|
| Mutations per DML statement (including indexes) | 80,000, applied per statement; a transaction may run several DML statements that together exceed 80,000 as long as none does alone |
| Mutations per commit via the Mutation API (including indexes) | 80,000, cumulative across all mutations in the commit |
| Transaction size, both methods | 100 MiB |

| DML implementation | Use |
|--------------------|-----|
| Standard DML | Standard OLTP workloads |
| Partitioned DML | Bulk updates and deletes: periodic cleanup (delete old rows, set columns to NULL), backfilling new columns with defaults (for example `UPDATE` setting a new column to False where it is NULL) |

## Notes

- Best practice: use either DML or mutations in a single transaction, not both. If a commit request contains both, DML statements execute before mutations.
- Read your writes: DML changes are visible to later statements in the same transaction. Mutations are buffered client-side and sent with the commit, so they are not visible to SQL or DML in the same transaction.
- Constraint checking after every DML statement guarantees later queries in the same transaction return data consistent with the schema; mutations are checked at commit.
- For many writes without reads that do not need an atomic transaction, use batch writes.
- Partitioned DML for bulk updates and deletes changes rows permanently: it has no commit or rollback, partitions that already ran are not rolled back if the statement fails or is cancelled, and the statement must be idempotent because Spanner might run it more than once against some partitions (https://docs.cloud.google.com/spanner/docs/transactions, https://docs.cloud.google.com/spanner/docs/dml-partitioned). Not from the source: check the `WHERE` clause with a `SELECT COUNT(*)` and run it on a disposable database first; recovering overwritten or deleted rows afterwards needs PITR within the version retention period or a backup (see `pitr.md` in `spanner-operations`).
- Read-write transactions are retried by the client library; the code in the transaction body can run more than once, so keep external side effects out of it.
- The sample's `System.out.printf` inside `run(...)` is log-only and repeats on each retry; put real side effects (external calls, messages) after `run()` returns.
- Spanner is Google Cloud's distributed relational database, not a PostgreSQL server even with the PostgreSQL interface; distinct from `supabase` and `drizzle`.
- Corrected from the official docs: the Java example printed `resultSet.getString("FirstName")` and `resultSet.getString("LastName")` although the query selects `SingerId, AlbumId, AlbumTitle` (editor's fix based on Java client behaviour; not from a Google source).
- The source shows only a Java example; no Node.js or Python code is given.
- Source: https://docs.cloud.google.com/spanner/docs/dml-versus-mutations (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [transactions.md](./transactions.md)
- [error-codes.md](./error-codes.md)
- Using DML: https://docs.cloud.google.com/spanner/docs/dml-tasks
- Mutations: https://docs.cloud.google.com/spanner/docs/modify-mutation-api
- Commit statistics: https://docs.cloud.google.com/spanner/docs/commit-statistics
- DML best practices: https://docs.cloud.google.com/spanner/docs/dml-best-practices
