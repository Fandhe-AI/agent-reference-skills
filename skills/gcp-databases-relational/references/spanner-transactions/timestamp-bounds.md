---
source: https://docs.cloud.google.com/spanner/docs/timestamp-bounds
---

# Timestamp bounds

A timestamp bound tells Spanner how to choose the timestamp at which to read data, in a read-only transaction or a single read call. On multi-region instances, tolerating staleness can give latency benefits over a strong read.

## Signature / Usage

The twin contains no code. Snippet taken from https://docs.cloud.google.com/spanner/docs/transactions (Node.js read-only transaction; `getSnapshot()` with no options uses the default strong bound):

Adapted (not in the official docs): `process.exitCode = 1;` is set where the error is logged (the `if (err)` branch and the `catch` block) so a failed read does not exit 0, and the `if (err)` branch also awaits `database.close()` so the process can exit when the snapshot can't be created.

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

// Gets a transaction object that captures the database state
// at a specific point in time
database.getSnapshot(async (err, transaction) => {
  if (err) {
    console.error(err);
    process.exitCode = 1;
    await database.close();
    return;
  }
  const queryOne = 'SELECT SingerId, AlbumId, AlbumTitle FROM Albums';

  try {
    // Read #1, using SQL
    const [qOneRows] = await transaction.run(queryOne);

    qOneRows.forEach(row => {
      const json = row.toJSON();
      console.log(
        `SingerId: ${json.SingerId}, AlbumId: ${json.AlbumId}, AlbumTitle: ${json.AlbumTitle}`,
      );
    });

    const queryTwo = {
      columns: ['SingerId', 'AlbumId', 'AlbumTitle'],
    };

    // Read #2, using the `read` method. Even if changes occur
    // in-between the reads, the transaction ensures that both
    // return the same data.
    const [qTwoRows] = await transaction.read('Albums', queryTwo);

    qTwoRows.forEach(row => {
      const json = row.toJSON();
      console.log(
        `SingerId: ${json.SingerId}, AlbumId: ${json.AlbumId}, AlbumTitle: ${json.AlbumTitle}`,
      );
    });

    console.log('Successfully executed read-only transaction.');
  } catch (err) {
    console.error('ERROR:', err);
    process.exitCode = 1;
  } finally {
    transaction.end();
    // Close the database when finished.
    await database.close();
  }
});
```

## Options / Props

| Bound | Behavior | Repeatable |
|-------|----------|------------|
| Strong (default) | Reflects all transactions committed before the read started; all rows of one read are consistent. Queries on change streams must use this bound. | No: two consecutive strong read-only transactions might return inconsistent results under concurrent writes. Read again at the returned timestamp, or use one transaction or an exact timestamp. |
| Bounded staleness | Spanner picks the newest timestamp within the user-given staleness bound that lets the read run at the closest replica without blocking. Two phases (timestamp negotiation, then read); usually slightly slower than exact staleness but fresher. REST fields `max_staleness` / `min_read_timestamp`. | No: even with the same bound, reads can run at different timestamps. |
| Exact staleness | Reads at a user-specified timestamp, either an absolute commit timestamp or a staleness relative to now. Sees all transactions with commit timestamp less than or equal to the read timestamp and none with a larger one; blocks until conflicting transactions that may get an earlier timestamp finish. No negotiation phase, so slightly faster than bounded. REST fields `read_timestamp` / `exact_staleness`. | Only with the same absolute `read_timestamp` (within the version retention period), or for reads inside one read-only transaction. A relative `exact_staleness` is computed from the current time at each read, so separate reads with the same staleness use different timestamps and can see different data. |

| Limit / default | Value |
|-----------------|-------|
| Minimum staleness for a benefit | Use at least 10 seconds; benefit is greatest at longer staleness intervals (general minimum; reads served by read-only replicas or outside the default leader region need at least 15 s, see https://docs.cloud.google.com/spanner/docs/replication). |
| `version_retention_period` | Default 1 hour, configurable up to 1 week. Reads or queries with too-old timestamps (including ones that become too old while running) fail with `FAILED_PRECONDITION`. |
| Earliest readable time | The database's `earliest_version_time`; you cannot read before it. |

## Notes

- Bounded staleness with a read-only transaction works only with single-use read-only transactions, not general-purpose ones.
- A timestamp in the future is allowed for exact staleness; Spanner waits for that timestamp before serving the read.
- Stale and strong reads are not part of a read-write transaction but can block waiting for concurrent read-write transactions to commit; bounded staleness tries to avoid blocking but may still block.
- Exception to garbage collection: Partition Read/Query with partition tokens prevents garbage collection of expired data while the session remains active.
- Caution: Java timestamp APIs such as `java.sql.Timestamp` and `java.util.Date` are subject to DST handling and can give staleness values off by an hour during DST shifts. Use `java.time.Instant`.
- The source has no code for any bound type; the sample above only illustrates the default strong snapshot.
- Adapted from the official docs: the `getSnapshot` callback only logged errors (`if (err) { console.error(err); return; }` and `} catch (err) { console.error('ERROR:', err); }`), so a failed read exited 0; the `if (err)` branch also returned without closing the database, which can keep the process from exiting.
- Spanner is Google Cloud's distributed relational database, not a PostgreSQL server even with the PostgreSQL interface; distinct from `supabase` and `drizzle`.
- Source: https://docs.cloud.google.com/spanner/docs/timestamp-bounds (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/spanner/docs/transactions (snippet; retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [transactions.md](./transactions.md)
- [error-codes.md](./error-codes.md)
- Reads: https://docs.cloud.google.com/spanner/docs/reads
