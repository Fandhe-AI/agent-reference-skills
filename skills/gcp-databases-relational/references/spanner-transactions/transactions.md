---
source: https://docs.cloud.google.com/spanner/docs/transactions
---

# Transactions

A Spanner transaction is a set of reads and writes that are atomic: all operations succeed or all fail. Spanner offers read-write, read-only and partitioned DML transactions, run inside a session. Examples target GoogleSQL-dialect databases; the concepts apply to PostgreSQL-dialect databases too.

## Signature / Usage

### Read-write transaction (Python)

The client library runs the function repeatedly until the transaction commits or hits a non-retryable error. The function can run more than once, so keep external side effects out of it.

```python
def read_write_transaction(instance_id, database_id):
    """Performs a read-write transaction to update two sample records in the
    database.

    This will transfer 200,000 from the `MarketingBudget` field for the second
    Album to the first Album. If the `MarketingBudget` is too low, it will
    raise an exception.

    Before running this sample, you will need to run the `update_data` sample
    to populate the fields.
    """
    spanner_client = spanner.Client()
    instance = spanner_client.instance(instance_id)
    database = instance.database(database_id)

    def update_albums(transaction):
        # Read the second album budget.
        second_album_keyset = spanner.KeySet(keys=[(2, 2)])
        second_album_result = transaction.read(
            table="Albums",
            columns=("MarketingBudget",),
            keyset=second_album_keyset,
            limit=1,
        )
        second_album_row = list(second_album_result)[0]
        second_album_budget = second_album_row[0]

        transfer_amount = 200000

        if second_album_budget < transfer_amount:
            # Raising an exception will automatically roll back the
            # transaction.
            raise ValueError("The second album doesn't have enough funds to transfer")

        # Read the first album's budget.
        first_album_keyset = spanner.KeySet(keys=[(1, 1)])
        first_album_result = transaction.read(
            table="Albums",
            columns=("MarketingBudget",),
            keyset=first_album_keyset,
            limit=1,
        )
        first_album_row = list(first_album_result)[0]
        first_album_budget = first_album_row[0]

        # Update the budgets.
        second_album_budget -= transfer_amount
        first_album_budget += transfer_amount
        print(
            "Setting first album's budget to {} and the second album's "
            "budget to {}.".format(first_album_budget, second_album_budget)
        )

        # Update the rows.
        transaction.update(
            table="Albums",
            columns=("SingerId", "AlbumId", "MarketingBudget"),
            values=[(1, 1, first_album_budget), (2, 2, second_album_budget)],
        )

    database.run_in_transaction(update_albums)

    print("Transaction complete.")
```

### Schema used by the examples

```googlesql
CREATE TABLE Albums (
  SingerId        INT64 NOT NULL,
  AlbumId         INT64 NOT NULL,
  AlbumTitle      STRING(MAX),
  MarketingBudget INT64
) PRIMARY KEY (SingerId, AlbumId);
```

## Options / Props

### Transaction types

| Type | Behavior |
|------|----------|
| Read-write | Reads and writes followed by a commit. Might acquire locks; if it fails it requires retries. Confined to one database but can modify multiple tables. |
| Read-only | Consistent reads across multiple reads, no writes. Runs at a system-determined or user-configured past timestamp. No commit or locks, but might pause for ongoing writes. Can run on any replica. |
| Partitioned DML | Executes DML as partitioned DML, optimized at scale. The statement must be fully partitionable and idempotent: Spanner might execute it more than once against some partitions (the partitioned DML page's non-idempotent example is `UPDATE Singers SET MarketingBudget = 1.5 * MarketingBudget WHERE true`). No commit or rollback (see Notes). For many writes that need no atomic transaction, consider batch writes. |

### Isolation and concurrency

| Isolation | Concurrency | Behavior |
|-----------|-------------|----------|
| Serializable (default) | Pessimistic (default) | Externally consistent. Shared read locks on reads; upgraded to exclusive locks at commit (blocks new shared lock requests, waits for existing shared locks, then takes exclusive lock). |
| Serializable | Optimistic (configurable) | Reads proceed without locks; validated at commit that no concurrently committed transaction modified the data read. Exclusive locks for written data at commit. |
| Repeatable read (snapshot isolation) | Optimistic (default) | Reads see the database as of the transaction start; writes take no locks until commit. Might still abort on conflict or transient events (for example a server restart). Reads take no locks, so a read-only operation behaves the same in a read-only or read-write transaction. |
| Repeatable read | Pessimistic | Exclusive locks for data read with `FOR UPDATE` or the `lock_scanned_ranges=exclusive` hint, and for data written by DML. Reads served at the snapshot, so transactions might abort if concurrent transactions update the read data. |

### Lock and abort behavior

| Topic | Detail |
|-------|--------|
| Lock granularity | Row-and-column: T1 holding a lock on column `A` of a row does not block T2 writing column `B` of the same row. |
| Writes without reads | Might use a writer shared lock instead of an exclusive lock. An exclusive lock is needed only if the transaction first reads the data it writes. In repeatable read, exclusive locks for written cells are commonly acquired at commit. |
| Deadlock detection | Wound-wait: older transactions (earliest read, query or commit sooner) abort younger ones. Each retry after `ABORTED` increases the transaction's lock priority. |
| Idle transaction | No outstanding reads or SQL queries and none started in the last 10 seconds. Spanner can abort it; the commit then fails with `ABORTED`. Running a small query such as `SELECT 1` periodically keeps it from becoming idle. |
| Old read timestamps | Reads older than `VERSION_RETENTION_PERIOD` (default 1 hour, configurable up to 1 week) fail with `FAILED_PRECONDITION`. |
| Change stream queries | Must run via `sessions.executeStreamingSql` in a single-use read-only transaction with a strong timestamp bound; other `TransactionOptions` are invalid. With `return_read_timestamp` true, the returned timestamp is the special value `2^63 - 2`; discard it. |

## Notes

- Retries and side effects: Spanner might execute a transaction's operations multiple times internally. If Spanner retries your transaction, any side effects from its operations (changes to external systems or state outside a Spanner database) might occur multiple times.
- Spanner's locks only guarantee data consistency inside Spanner. Do not use them for exclusive access to outside resources; on retry, locks are only guaranteed to have been held during the successful commit attempt.
- Keep read-write transactions short: long-held locks can lead to deadlocks and aborts, and an inactive client can have its locks released and the transaction aborted.
- Use a read-write transaction when a write depends on a read, even if the write might not execute. For read-only work, use a single read method or a read-only transaction (single reads take no locks). Use locking read-write transactions only when required.
- Repeatable read allows write skew when a write depends on a read; perform the reads in the critical section with `FOR UPDATE` or `lock_scanned_ranges=exclusive`, or use check constraints.
- Repeatable read suits read-heavy workloads with low write conflicts, workloads suffering wound-wait aborts, and applications that do not need serializable guarantees.
- With DML, changes are immediately visible to later reads in the same transaction; with mutations they are buffered locally and visible only after commit.
- Without a client library, retry an aborted transaction within the same session. Client libraries retry automatically.
- A read-write transaction that only reads gives consistency guarantees similar to a read-only transaction, but if it commits without writing there is no guarantee the data read stayed unchanged until the commit. To confirm the data is still current, read it again in another read-write transaction or with a strong read (not from the source: a stale read-only transaction does not confirm freshness).
- Partitioned DML: only one statement at a time; no commit or rollback. If it is cancelled or fails, running partitions are cancelled and remaining ones are not started, but partitions that already executed are not rolled back. Read locks are taken only on rows matching the `WHERE` clause.
- Read-only transaction: the source's Python sample opens `database.snapshot(multi_use=True)` and runs `snapshot.execute_sql(...)` and `snapshot.read(...)` in it; both reads see the same data even if it is updated in between. The Node.js read-only transaction (`getSnapshot()`) from the same source page is on [timestamp-bounds.md](./timestamp-bounds.md); Python client patterns: https://docs.cloud.google.com/spanner/docs/getting-started/python and `gcp-client-libraries`.
- Partitioned DML: the source's Python samples call `database.execute_partitioned_dml("UPDATE Albums SET MarketingBudget = 100000 WHERE SingerId > 1")` and `database.execute_partitioned_dml("DELETE FROM Singers WHERE SingerId > 10")`; the same blocks are on the partitioned DML page (https://docs.cloud.google.com/spanner/docs/dml-partitioned). Partitioned `UPDATE` / `DELETE` change data permanently and cannot be rolled back; try them on a disposable database first.
- The sample's `print` inside `update_albums` is log-only and repeats on each retry; put real side effects (external calls, messages) after `run_in_transaction` returns.
- Spanner is Google Cloud's distributed relational database, not a PostgreSQL server even with the PostgreSQL interface; distinct from `supabase` and `drizzle`. Client library setup (ADC, retries, emulator) is covered by `gcp-client-libraries`.
- The source also shows C++, C#, Go, Java, Node.js, PHP and Ruby samples for the same transactions. Its Node.js read-write sample comments that Spanner interprets Node.js numbers as FLOAT64, so values must be converted to strings before being inserted as INT64; `runTransaction()` is non-blocking and `runTransactionAsync()` returns a promise.
- Source inconsistency: the transactions page says partitioned DML has "restrictions to ensure the statement is idempotent", which reads as if Spanner enforces idempotency. The partitioned DML page says Spanner might execute a statement multiple times against some partitions and that "the statement must therefore be idempotent": making it idempotent is the caller's job (https://docs.cloud.google.com/spanner/docs/dml-partitioned#partitionable-idempotent).
- Source: https://docs.cloud.google.com/spanner/docs/transactions (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [timestamp-bounds.md](./timestamp-bounds.md)
- [dml-versus-mutations.md](./dml-versus-mutations.md)
- [error-codes.md](./error-codes.md)
- Isolation levels: https://docs.cloud.google.com/spanner/docs/isolation-levels
