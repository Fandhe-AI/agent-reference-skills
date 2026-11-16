---
source: https://docs.cloud.google.com/spanner/docs/isolation-levels
---

# Isolation levels

Isolation level defines which data is visible to concurrent transactions. Spanner supports two of the ANSI/ISO SQL isolation levels, serializable (the default) and repeatable read; you choose one when you create a transaction, trading off latency, abort rate and exposure to data anomalies.

## Signature / Usage

The source has no code for setting the isolation level on a transaction; it points to the repeatable read guide. The SQL below (GoogleSQL) is the source's scenario, shown for repeatable read.

### Read-write conflict scenario

`Transaction 1` establishes a snapshot when its `SELECT` runs:

```googlesql
-- Transaction 1
BEGIN;

-- Snapshot established at T1
SELECT AlbumId, MarketingBudget
FROM Albums
WHERE SingerId = 1;

/*---+---*
| AlbumId    | MarketingBudget  |
+---+---+
| 1          | 50000            |
| 2          | 100000           |
| 3          | 70000            |
| 4          | 80000            |
*---+---*/
```

`Transaction 2` begins after `Transaction 1` and commits before it:

```googlesql
-- Transaction 2
BEGIN;

-- Snapshot established at T2 > T1
SELECT AlbumId, MarketingBudget
FROM Albums
WHERE SingerId = 1;

INSERT INTO Albums (SingerId, AlbumId, MarketingBudget) VALUES (1, 5, 50000);

COMMIT;
```

`Transaction 1` continues and still reads its T1 snapshot (it does not include the `AlbumId = 5` budget):

```googlesql
-- Transaction 1 continues
SELECT SUM(MarketingBudget) as UsedBudget
FROM Albums
WHERE SingerId = 1;

/*---*
| UsedBudget |
+---+
| 300000     |
*---*/
```

Allocating the apparently remaining 100,000 commits successfully even though `Transaction 2` already allocated 50,000 of it:

```googlesql
-- Transaction 1 continues..
UPDATE Albums
SET MarketingBudget = MarketingBudget + 100000
WHERE SingerId = 1 AND AlbumId = 4;

COMMIT;
```

Using `SELECT...FOR UPDATE` instead makes `Transaction 1` abort at commit, because the data it read changed:

```googlesql
-- Transaction 1 continues..
SELECT SUM(MarketingBudget) AS TotalBudget
FROM Albums
WHERE SingerId = 1
FOR UPDATE;

/*---*
| TotalBudget |
+---+
| 300000     |
*---*/

COMMIT;
```

### Write-write conflict scenario

`Transaction 1` takes its snapshot, `Transaction 2` reads the same data and inserts `AlbumId = 5` and commits without waiting or aborting; then `Transaction 1` inserts the same row and aborts:

```googlesql
-- Transaction 1
BEGIN;

-- Snapshot established at T1
SELECT AlbumId, MarketingBudget
FROM Albums
WHERE SingerId = 1;
```

```googlesql
-- Transaction 1 continues
INSERT INTO Albums (SingerId, AlbumId, MarketingBudget) VALUES (1, 5, 30000);
-- Transaction aborts
COMMIT;
```

## Options / Props

| Property | Serializable (default) | Repeatable read |
|---|---|---|
| Guarantee | Strictest: external consistency; behaves as if transactions ran sequentially, and results are seen in order if one completes before another starts to commit. | Consistent (strong) snapshot as of the transaction start; concurrent writes on the same data succeed only if there are no conflicts. Implemented as snapshot isolation. |
| Cost | Might abort transactions under high read-write contention; retries can add latency. | Fewer aborts due to serialization conflicts. |
| Locking | — | Default optimistic concurrency: reads take no locks and don't block writes. With pessimistic concurrency: exclusive locks on data read by `FOR UPDATE` queries or `lock_scanned_ranges=exclusive` hints, and on data written by DML. |
| Anomalies | Strongest protection against data anomalies. | Can allow anomalies such as write skew when the application relies on constraints the schema doesn't enforce. |

## Notes

- Write skew example from the source: a hospital needs at least one doctor on call; if both Dr. Richards and Dr. Smith, scheduled for the same shift, concurrently request to go off call, under repeatable read both requests succeed because each transaction saw another on-call doctor at its start. Serializable isolation detects the anomaly and aborts, accepting a higher abort rate.
- `SELECT ... FOR UPDATE` verifies at commit time that data read at the snapshot is unchanged. DML statements and mutations that read data internally also verify this at commit time. With pessimistic concurrency, `FOR UPDATE` reads and DML writes take exclusive locks, which blocks a conflicting transaction until the first one commits.
- Migrating from other databases: the source recommends repeatable read in Spanner, and repeatable read with pessimistic concurrency for workloads that use `FOR UPDATE` queries. Source inconsistency: the source says repeatable read "matches the default isolation levels in most other databases (for example, MySQL and PostgreSQL)". Only the read-locking behavior matches (plain reads take no locks). The default levels differ: MySQL InnoDB defaults to `REPEATABLE READ`, but PostgreSQL defaults to `READ COMMITTED`, where each statement sees a new snapshot. An application coming from PostgreSQL therefore gains a transaction-wide snapshot in Spanner repeatable read and can see different results or conflicts; review it before migrating (Not from the source: PostgreSQL and MySQL defaults are from their own manuals).
- The PostgreSQL-dialect form of each scenario uses lowercase identifiers (`albumid`, `marketingbudget`, `singerid`); the source shows PostgreSQL tabs that are omitted here.
- Spanner is Google Cloud's distributed relational database, not a PostgreSQL server even with the PostgreSQL interface; it is distinct from `supabase` and `drizzle`.
- Source: https://docs.cloud.google.com/spanner/docs/isolation-levels (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [dml-best-practices.md](./dml-best-practices.md)
- Use repeatable read isolation: https://docs.cloud.google.com/spanner/docs/use-repeatable-read-isolation
- Concurrency control: https://docs.cloud.google.com/spanner/docs/concurrency-control
- Use SELECT FOR UPDATE in repeatable read isolation: https://docs.cloud.google.com/spanner/docs/use-select-for-update-repeatable-read
- Use SELECT FOR UPDATE in serializable isolation: https://docs.cloud.google.com/spanner/docs/use-select-for-update-serializable
- TrueTime and external consistency: https://docs.cloud.google.com/spanner/docs/true-time-external-consistency
