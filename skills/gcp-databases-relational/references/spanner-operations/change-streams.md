---
source: https://docs.cloud.google.com/spanner/docs/change-streams
---

# About change streams

A change stream watches and streams out a Spanner database's data changes (inserts, updates, deletes) in near real-time. Common uses: replicating changes to BigQuery for analytics, triggering application logic through Pub/Sub, and storing changes in Cloud Storage for compliance or archival. Change streams are schema objects created, modified and dropped with DDL; creating one starts a long-running operation.

## Signature / Usage

### Create a change stream with a retention period (GoogleSQL)

```googlesql
CREATE CHANGE STREAM LongerDataRetention
FOR ALL
OPTIONS ( retention_period = '36h' );
```

### Create a change stream with a retention period (PostgreSQL)

```postgresql
CREATE CHANGE STREAM LongerDataRetention
FOR ALL
WITH ( retention_period = '36h' );
```

## Options / Props

### Configuration options

| Option | Default | Values / notes |
|---|---|---|
| Data retention period | 7 days | Between one and thirty days; set or change with DDL |
| Value capture type | `OLD_AND_NEW_VALUES` | `OLD_AND_NEW_VALUES`, `NEW_VALUES`, `NEW_ROW`, `NEW_ROW_AND_OLD_VALUES` |
| `exclude_ttl_deletes` | `false` | `true` excludes TTL-based deletes (future ones only) |
| `exclude_insert` / `exclude_update` / `exclude_delete` | `false` | `true` excludes that modification type; any combination |
| `allow_txn_exclusion` | `false` | `true` lets the stream ignore transactions marked `exclude_txn_from_change_streams` |

### Value capture types

| Type | Captures |
|---|---|
| `OLD_AND_NEW_VALUES` | Old and new values of a row's modified columns |
| `NEW_VALUES` | Only new values of non-key columns; no old values |
| `NEW_ROW` | All new values of watched columns (modified and unmodified) whenever any change; no old values |
| `NEW_ROW_AND_OLD_VALUES` | All new values (modified and unmodified) and old values of modified columns |

### Transaction exclusion

`exclude_txn_from_change_streams` (default `false`) is a parameter of `TransactionOptions` and `BatchWriteRequest`. It can't be `true` for read-only transactions (invalid argument error). A write is excluded only when the parameter is `true` AND the stream has `allow_txn_exclusion` set to `true`; otherwise the update is recorded.

### Data change record contents

Table name; primary key names, values and types; names and types of captured columns; old values and new values (depending on capture type); modification type (insert, update, delete); commit timestamp; transaction ID; record sequence number; value capture type.

### Ways to read a change stream

| Method | Notes |
|---|---|
| Spanner API | Lowest latency and most flexibility; you track partition tokens and states, divide time windows, read partitions continuously and manage checkpoints |
| Dataflow (Apache Beam SpannerIO connector) | Outputs an unbounded `PCollection`; Google templates exist for BigQuery and Cloud Storage |
| Debezium-based Kafka connector | Streams change records directly into Kafka topics |
| Datastream | Streams to BigQuery, BigLake Iceberg tables or Cloud Storage |

Directed reads can route change stream reads to a specific replica type or region to reduce impact on transactional workloads.

### Permissions

| Action | Permission |
|---|---|
| Create, update or drop change streams | `spanner.databases.updateDdl` |
| Read change stream data | `spanner.databases.select` |

The Dataflow job owner using SpannerIO needs extra IAM permissions on the application database or a separate metadata database.

## Notes

- Source: https://docs.cloud.google.com/spanner/docs/change-streams (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Reducing a stream's retention makes historical change data older than the new limit immediately and permanently unavailable to readers. Longer retention increases storage on the database.
- Source inconsistency: the manage page introduces `LongerDataRetention` (`retention_period = '36h'`) and `MaximumDataRetention` (`'7d'`) as "longer than the default of seven days" with a maximum of thirty days, yet 36 hours is shorter than the seven-day default and 7 days equals it. Use a value above `7d` (up to `30d`) for a longer retention. Applying a shorter value to an existing stream (with `ALTER CHANGE STREAM`) permanently discards older change records, per the overview's data retention section (https://docs.cloud.google.com/spanner/docs/change-streams#data-retention).
- Dropping a change stream (`DROP CHANGE STREAM`) immediately stops it, removes it from the schema and deletes its data change records; readers lose that history (https://docs.cloud.google.com/spanner/docs/change-streams/manage, "Delete a change stream").
- Fine-grained access control users who read through a database role are checked against fine-grained privileges only, not the IAM permission above: they need the `SELECT` privilege on the change stream and `EXECUTE` on its read function (see fgac-about.md and configure-fgac.md).
- A stream watching an entire table or database implicitly watches added columns/tables and stops watching dropped ones. A stream that explicitly watches columns does not pick up newly added columns; before dropping an explicitly watched column or table, remove it from the stream's configuration.
- Watched changes come from DML, mutations, cascading deletes on interleaved child tables, and TTL deletes. Not watched: indexes, views, other change streams, system tables, generated columns (unless part of the primary key; primary key columns are always tracked), and schema changes (except backfills for default values). Dropping a table is not recorded as a data change.
- Data change records are written in the same transaction as the data change, so they incur storage and replication costs.
- Source: https://docs.cloud.google.com/spanner/docs/change-streams/manage (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/spanner/docs/change-streams/manage (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0). That page also shows the full `CREATE CHANGE STREAM` syntax, `FOR ALL`, per-table and per-column streams, value capture and filter options, and `ALTER` / `DROP`.
- Limits (streams per database, streams per column) are in the Spanner quotas page.

## Related

- [fgac-about.md](./fgac-about.md)
- [backup.md](./backup.md)
- Manage change streams (DDL): https://docs.cloud.google.com/spanner/docs/change-streams/manage
- Partitions, records and queries: https://docs.cloud.google.com/spanner/docs/change-streams/details
- Quotas: https://docs.cloud.google.com/spanner/quotas#change-streams
