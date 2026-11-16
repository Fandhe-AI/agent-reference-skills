---
source: https://docs.cloud.google.com/spanner/docs/primary-keys-overview
---

# Primary keys overview

How Spanner distributes rows by primary key and which key strategy to use when migrating UUID or sequential-key databases. Sequential keys such as auto-increment cause hotspots in a distributed system.

## Signature / Usage

This twin contains no code. The block below is the UUID primary key pattern from the schema design page.

```googlesql
  CREATE TABLE UserAccessLogs (
    LogEntryId UUID DEFAULT (NEW_UUID()),
    LastAccess TIMESTAMP NOT NULL,
    UserId STRING(1024)
  ) PRIMARY KEY (LogEntryId);
```

## Options / Props

| Source database situation | Spanner strategy |
|---------------------------|------------------|
| UUID primary keys | Keep existing UUIDs as strings in the source and import as-is. For new keys use `GENERATE_UUID()` (GoogleSQL) or `spanner.generate_uuid()` (PostgreSQL); both return a UUID v4 string. |
| Single-instance database with sequential keys (MySQL `AUTO_INCREMENT`, PostgreSQL `SERIAL`, SQL Server / Oracle `IDENTITY`) | Configure a Spanner `SEQUENCE` that skips the range of existing keys and generates new bit-reversed keys. Always greater than zero, uniformly distributed over the positive 64-bit integer space. |
| Sequential keys with live cutover / replication | `SEQUENCE` skips the entire existing key range of the source and generates bit-reversed keys on Spanner. Greater than zero, but not ordered. |
| Application logic depends on key order (recency / sequencing) | Composite key: uniformly distributed first component (shard ID or hash) plus sequential number second. Preserves order without a hotspot at scale. |

## Notes

- Default recommendation: UUIDv4 (128-bit, 122 bits random). Integer keys take less space and reduce application change; use a positive bit-reversed sequence.
- Each strategy changes only how new data is generated; existing data is unaffected.
- Range sharding: Spanner distributes groups of rows (splits) across compute nodes by primary key; adjacent monotonic keys land in one split and can cause latency, timeouts and aborted transactions.
- Source inconsistency: the source names one function, `GENERATE_UUID()`, for both dialects. It is the GoogleSQL name and returns a `STRING` (https://docs.cloud.google.com/spanner/docs/reference/standard-sql/utility-functions#generate_uuid). In PostgreSQL-dialect databases the string-returning function is `spanner.generate_uuid()`; `gen_random_uuid()` returns the `uuid` type (https://docs.cloud.google.com/spanner/docs/reference/postgresql/functions#utility). For a GoogleSQL `UUID` column the default-value examples use `NEW_UUID()` (https://docs.cloud.google.com/spanner/docs/primary-key-default-value).
- Detailed workflows are on the Migrate primary keys page: https://docs.cloud.google.com/spanner/docs/migrating-primary-keys
- Spanner is Google Cloud's distributed relational database; it is not a PostgreSQL server even with the PostgreSQL interface, and is distinct from `supabase` and `drizzle`.
- Snippet taken from https://docs.cloud.google.com/spanner/docs/schema-design
- Source: https://docs.cloud.google.com/spanner/docs/primary-keys-overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/spanner/docs/schema-design (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [schema-design.md](./schema-design.md)
- [schema-and-data-model.md](./schema-and-data-model.md)
