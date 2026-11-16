---
source: https://docs.cloud.google.com/spanner/quotas
---

# Quotas & limits

Production quotas and limits for Spanner. Values are subject to change.

## Signature / Usage

### Permissions and requesting increases

- View quotas: IAM permission `serviceusage.quotas.get`.
- Change quotas: `serviceusage.quotas.update`, included in the Owner, Editor and Quota Administrator roles.
- Check quotas in the Google Cloud console Quotas page. For a custom instance configuration, check the node limit of its base configuration.
- Request increases (including node limit) a few days ahead of expected growth. A custom configuration needing a node limit above 85 uses the source's Spanner nodes quota request form (give the custom configuration ID).

Snippet taken from https://docs.cloud.google.com/spanner/docs/getting-started/gcloud, an example of a schema change subject to the DDL and table limits below (set the default instance first, because the commands name no instance):

```bash
gcloud config set spanner/instance test-instance
```

```bash
gcloud spanner databases ddl update example-db \
--ddl='CREATE TABLE Singers ( SingerId INT64 NOT NULL, FirstName STRING(1024), LastName STRING(1024), SingerInfo BYTES(MAX) ) PRIMARY KEY (SingerId)'

gcloud spanner databases ddl update example-db \
--ddl='CREATE TABLE Albums ( SingerId INT64 NOT NULL, AlbumId INT64 NOT NULL, AlbumTitle STRING(MAX)) PRIMARY KEY (SingerId, AlbumId), INTERLEAVE IN PARENT Singers ON DELETE CASCADE'
```

## Options / Props

### Instances, configurations, databases

| Value | Limit |
|-------|-------|
| Nodes per instance configuration | Varies by project and configuration |
| Instance ID length | 2 to 64 characters |
| Custom instance configurations per project | 100 |
| Custom instance configuration ID length | 8 to 64 characters, must start with `custom-` |
| Databases per instance | 1 node (1000 PUs) and larger: 100; smaller than 1 node: 10 per 100 PUs |
| Roles per database | 100 |
| Database ID length | 2 to 30 characters |
| Storage size | 1 node and larger: 10 TiB per node; smaller: 1024.0 GiB per 100 PUs. With tiered storage, combined SSD + HDD up to 10 TiB per node. Backups are stored separately and do not count |
| Schema objects per instance (all databases) | Default 1 million for 1 node or larger; proportionally less below 1 node (100,000 at 100 PUs) |
| DDL statement size (single schema change / whole schema from `GetDatabaseDdl`) | 10 MiB each |

Free trial instance: 10 GiB storage, up to five databases, no backup and restore, no SLA, 90-day trial.

Preview features: geo-partitioning (20 partitions per instance, 50 placements per database, 100 million placement rows per node); saved queries (10,000 per project, 1 MiB per query).

### Tables, indexes, views, locality groups

| Value | Limit |
|-------|-------|
| Tables per database | 5,000 |
| Table / column / index / view name length | 1 to 128 characters |
| Columns per table | 1,024 |
| Data per cell | 10 MiB |
| `STRING` cell | 2,621,440 Unicode characters |
| Columns in a table key | 16 (includes parent key columns) |
| Table interleaving depth | 7 |
| Primary key or index key size per row | 8 KiB |
| Non-key columns per row | 1600 MiB |
| Indexes per database / per table | 10,000 / 128 |
| Columns in an index key | 16 (indexed columns except STORING, plus base table primary key columns) |
| Views per database | 5,000 |
| View nesting depth | 10 |
| Locality groups per database | 16 (1 default + 15 additional) |
| `ssd_to_hdd_spill_timespan` | Minimum 1 hour, maximum 365 days |
| Property graphs per database | 250 (name length 1 to 128 characters) |

### Queries

| Value | Limit |
|-------|-------|
| Columns in `GROUP BY` | 1,000 |
| Values in an `IN` operator | 10,000 |
| Function calls | 1,000 |
| Joins | 20 |
| Nested function calls | 75 |
| Nested `GROUP BY` clauses | 35 |
| Nested subquery expressions | 25 |
| Nested subselect statements | 60 |
| Parameters | 950 |
| Query statement length | 1 million characters |
| `STRUCT` fields | 1,000 |
| Subquery expression children | 50 |
| Unions in a query | 200 |
| Graph query: joins produced / quantified path depth | 100 / 100 |

### Writes, requests, administration

| Value | Limit |
|-------|-------|
| Commit size (including indexes and change streams) | 100 MiB |
| Concurrent reads per session | 100 |
| Mutations per commit (Mutation API), per DML statement, per batch write mutation group (including indexes) | 80,000 each |
| Concurrent partitioned DML statements per database | 20,000 |
| Administrative request size | 1 MiB (excludes commits, Data Boost requests and schema changes) |
| Administrative action rate | 5 per second per project per user (averaged over 100 seconds); includes polling long-running operations |
| Request size other than commits | 10 MiB (includes create/update database, reads, streaming reads, SQL and streaming SQL) |

### Backups, change streams, Data Boost, queues, pre-splitting

| Value | Limit |
|-------|-------|
| Ongoing on-demand create backup operations per database | 1 (backup schedules are not subject to this) |
| Ongoing restore operations per instance (for the restored database) | 10 |
| Maximum backup retention | 1 year, including the extra day in a leap year |
| Change streams per database | 10 |
| Change streams watching any non-key column | 3 (a stream watching a whole table or database counts) |
| Concurrent readers per change stream partition | 20 (Dataflow or direct API) |
| Concurrent Data Boost requests per project | 1000 in `us-central1`; 400 per region elsewhere |
| Concurrent Data Boost requests in milli-operations per project per region | 1000000 |
| Queues per instance | 10 per 100 PUs, up to 100 |
| Concurrent queue receiver TVFs per project per region | 2,000 |
| Pre-splitting: split points per request / request size | 100 / 1 MiB |
| Pre-splitting: per node for all databases in the instance | 50 |
| Pre-splitting: added or updated per minute / per day per node | 10 / 200 |

## Notes

- Storage example: a 1500 GiB database needs 200 PUs (limit 2048.0 GiB); add 100 PUs before the limit or writes may be rejected. Add capacity before reaching the limit.
- Schema object limit reached: Spanner blocks schema changes (such as adding an index), creating a new database in the instance, and restoring a backup into the same instance (restore into another instance of the same configuration instead). Monitor `spanner.googleapis.com/instance/schema_objects` and `spanner.googleapis.com/instance/schema_object_count_limit`.
- Mutation counting: inserts and updates count per affected column, and primary key columns always count (insert into five columns = five mutations; updating three columns of a row with two key columns = five). Delete and delete range count as one mutation, including `ON DELETE CASCADE` of interleaved children, but secondary index changes (including foreign key backing indexes) count individually (a table with 2 secondary indexes: range delete = 1 plus 2 per deleted row). Change streams add none. For generated or default-value columns: total = columns explicitly written + generated/default-value columns + primary key columns (2 key columns and 1 generated column, inserting a row = 5).
- Find a transaction's mutation count with commit statistics.
- The borrowed commands assume the default instance was set with `gcloud config set spanner/instance test-instance` (see gcloud.md); otherwise pass `--instance=INSTANCE`.
- Geo-partitioning and saved queries are Preview (Pre-GA terms, "as is").
- Source: https://docs.cloud.google.com/spanner/quotas (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/spanner/docs/getting-started/gcloud (borrowed command)

## Related

- [compute-capacity.md](./compute-capacity.md)
- [databases.md](./databases.md)
- [instances.md](./instances.md)
