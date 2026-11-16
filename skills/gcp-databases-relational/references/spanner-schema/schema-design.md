---
source: https://docs.cloud.google.com/spanner/docs/schema-design
---

# Schema design best practices

Best practices for designing Spanner schemas to avoid hotspots, where too many requests hit one server. Covers primary key choice (UUID, bit-reversed sequence, key order swap, hash/logical shards), descending timestamp keys, and when to use interleaved indexes.

## Signature / Usage

### Use a UUID primary key

```googlesql
  CREATE TABLE UserAccessLogs (
    LogEntryId UUID DEFAULT (NEW_UUID()),
    LastAccess TIMESTAMP NOT NULL,
    UserId STRING(1024)
  ) PRIMARY KEY (LogEntryId);
```

PostgreSQL dialect:

```postgresql
  CREATE TABLE useraccesslogs (
    logentryid uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    lastaccess timestamptz NOT NULL,
    userid text);
```

Insert relying on the default:

```googlesql
INSERT INTO UserAccessLogs (LastAccess, UserId)
VALUES ('2016-01-25 10:10:10.555555-05:00', 'TomSmith');
```

Generate explicitly (`NEW_UUID()` in GoogleSQL, `gen_random_uuid()` in PostgreSQL):

```googlesql
INSERT INTO
  UserAccessLogs (LogEntryId, LastAccess, UserId)
VALUES
  (NEW_UUID(), '2016-01-25 10:10:10.555555-05:00', 'TomSmith');
```

UUIDs generated elsewhere (for example in the backend application) can also be inserted:

```googlesql
INSERT INTO
  UserAccessLogs (LogEntryId, LastAccess, UserId)
VALUES
  ('4192bff0-e1e0-43ce-a4db-912808c32493', '2016-01-25 10:10:10.555555-05:00', 'TomSmith');
```

### Hash the key into logical shards (generated column)

```googlesql
CREATE TABLE UserAccessLogs (
ShardId INT64 NOT NULL
AS (MOD(FARM_FINGERPRINT(CAST(LastAccess AS STRING)), 2048)) STORED,
LastAccess TIMESTAMP NOT NULL,
UserId    INT64 NOT NULL,
) PRIMARY KEY (ShardId, LastAccess, UserId);
```

### Descending timestamp key

```googlesql
CREATE TABLE UserAccessLogs (
UserId     INT64 NOT NULL,
LastAccess TIMESTAMP NOT NULL,
...
) PRIMARY KEY (UserId, LastAccess DESC);
```

(`...` is in the source and stands for further columns.)

### Interleaved index instead of a monotonic global index

```googlesql
CREATE NULL_FILTERED INDEX UsersByLastAccess
ON Users(UserId, LastAccess),
INTERLEAVE IN Users;
```

## Options / Props

| Practice | Guidance |
|----------|----------|
| Best practice #1 | Do not choose a column whose value monotonically increases or decreases as the first key part for a high write rate table (timestamps; changing to ascending / descending order does not help). |
| Best practice #2 | Descending or ascending timestamp order depends on user queries (newest first or oldest first). |
| Best practice #3 | Do not create a non-interleaved index on a high write rate column whose value monotonically increases or decreases. Use an interleaved index, or key-design techniques such as adding `shardId`. |
| UUID | RFC 9562. Version 4 recommended; Version 1 not recommended (timestamp in high-order bits). Stored in a `UUID` column. No locality between related records, which is why it avoids hotspots. |
| Bit-reversed sequence | For `INT64` / `bigint` keys; use a bit-reversed sequence as the first (or only) key component. |
| Swap key order | Put the monotonic column after a well-distributed one, for example `PRIMARY KEY (UserId, LastAccess)`. |
| Logical shards N | Correlate N with the expected number of nodes (for example N=10 for 10 nodes). N is static: changing it needs a schema update and possibly backfill. Avoid excessively large N. |
| Hash function factors | Hotspot avoidance (more hash values reduce hotspots), read efficiency (fewer hash values to scan across), node count. A cryptographic hash is not required. |
| `DESC` timestamp keys | Use when reading most recent history from an interleaved history table together with the parent row, or reading sequential entries in reverse chronological order with unknown depth (for example `LIMIT` N). |

## Notes

- Spanner can detect schema best-practice opportunities and show recommendations on the Spanner Studio page of the database in the Google Cloud console.
- Spanner implements indexes as tables, so an index on a monotonic column has the same hotspot problem as a monotonic primary key.
- Spanner is Google Cloud's distributed relational database; it is not a PostgreSQL server even with the PostgreSQL interface, and is distinct from `supabase` and `drizzle`.
- The source also shows PostgreSQL variants, a swap-order and sharding diagrams, and the anti-pattern `PRIMARY KEY (LastAccess, UserId)` table; not reproduced here.
- Source: https://docs.cloud.google.com/spanner/docs/schema-design (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [schema-and-data-model.md](./schema-and-data-model.md)
- [primary-keys-overview.md](./primary-keys-overview.md)
- Bit-reversed sequence: https://docs.cloud.google.com/spanner/docs/primary-key-default-value#bit-reversed-sequence
- Bulk loading: https://docs.cloud.google.com/spanner/docs/bulk-loading
