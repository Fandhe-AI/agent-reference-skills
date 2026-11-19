---
source: https://docs.cloud.google.com/bigquery/docs/managing-partitioned-tables
---

# Manage partitioned tables

Get partition metadata, set and update partition expiration, require partition filters on an existing table, copy partitioned tables and individual partitions, and delete a partition.

## Signature / Usage

### List partitions (`INFORMATION_SCHEMA.PARTITIONS`, Preview)

One row per partition:

```sql
#standardSQL
SELECT
  partition_id
FROM
  `DATASET_ID.INFORMATION_SCHEMA.PARTITIONS`
WHERE
  table_name = 'TABLE_NAME'
  AND partition_id IS NOT NULL --filter out non-partitioned tables
```

Legacy SQL only: the read-only `__PARTITIONS_SUMMARY__` meta-table.

```sql
#legacySQL
SELECT
  partition_id
FROM
  [DATASET_ID.TABLE_NAME$__PARTITIONS_SUMMARY__]
```

### Update partition expiration

SQL (set `partition_expiration_days` to `NULL` to remove it):

```sql
ALTER TABLE mydataset.mytable
  SET OPTIONS (
    -- Sets partition expiration to 5 days
    partition_expiration_days = 5);
```

bq:

```bash
bq update \
--time_partitioning_expiration integer_in_seconds \
--time_partitioning_type unit_time \
project_id:dataset.table
```

```text
bq update --time_partitioning_expiration 432000 mydataset.mytable
```

```text
bq update \
--time_partitioning_expiration 432000 \
myotherproject:mydataset.mytable
```

API: call `tables.patch` with `timePartitioning.expirationMs` (milliseconds); `tables.patch` is preferred over `tables.update`, which replaces the whole table resource.

### Update the partition filter requirement

SQL:

```sql
ALTER TABLE mydataset.mypartitionedtable
  SET OPTIONS (
    require_partition_filter = true);
```

bq:

```bash
bq update --require_partition_filter mydataset.mytable
```

```bash
bq update --require_partition_filter myotherproject:mydataset.mytable
```

API: call `tables.patch` and set `requirePartitionFilter` to `true`.

### Copy individual partitions

Use `bq cp` with a partition decorator (`$date`, e.g. `$20160201`):

Adapted (not in the official docs): the table identifiers with a `$` partition decorator are single-quoted so the shell does not expand `$source_partition` / `$destination_partition` (or `$2016...` as a positional parameter).

```bash
bq --location=location cp \
-a -f -n \
'project_id:dataset.source_table$source_partition' \
'project_id:dataset.destination_table$destination_partition'
```

Copy a partition to a new table:

```text
bq cp -a 'mydataset.mytable$20180130' mydataset.mytable2
```

Copy a partition to a non-partitioned table (append, then overwrite):

```text
bq cp -a 'mydataset.mytable$20180130' mydataset2.mytable2
```

```text
bq --location=US cp -f 'mydataset.mytable$20180130' mydataset2.mytable2
```

Copy a partition to another partitioned table (source partition key preserved when no destination decorator is given):

```text
bq --location=US cp \
-a \
'mydataset.mytable$20180130' \
myotherproject:mydataset2.mytable2
```

Overwrite one destination partition:

```text
bq cp \
-f \
'mydataset.mytable$20180130' \
'myotherproject:mydataset2.mytable2$20180130'
```

Without `-a` / `-f` / `-n`, the command prompts before overwriting:

```text
bq cp \
'mydataset.mytable$20180130' \
myotherproject:mydataset2.mytable2
```

Copy multiple partitions with a comma-separated list:

```bash
bq cp \
'mydataset.mytable$20180130,mydataset.mytable$20180131' \
myotherproject:mydataset.mytable2
```

API: call `jobs.insert` with a `copy` job; set `sourceTables` (dataset, table, partition), `destinationTable` and `writeDisposition`; optional `location` in `jobReference`.

### Delete a partition

SQL: a qualifying `DELETE` that covers all rows of a partition removes the entire partition without scanning bytes or consuming slots.

```sql
DELETE mydataset.mytable
WHERE _PARTITIONDATE IN ('2076-10-07', '2076-03-06');
```

bq:

Adapted (not in the official docs): the identifier is single-quoted so the shell does not expand `$partition`; unquoted, an unset variable leaves `project_id:dataset.table` and the whole table would be deleted.

```bash
bq rm --table 'project_id:dataset.table$partition'
```

```text
bq rm --table 'mydataset.mytable$20160301'
```

```text
bq rm --table 'mydataset.mytable$201603'
```

```text
bq rm --table 'mydataset.mytable$20'
```

API: call `tables.delete` with the table and partition decorator in `tableId`.

## Options / Props

### bq flags used above

| Name | Type | Description |
|------|------|-------------|
| `--time_partitioning_expiration` | integer (seconds) | Partition lifetime. No minimum; evaluates to partition date plus the value. `0` removes the expiration (partitions then never expire and must be deleted manually). |
| `--time_partitioning_type` | `DAY` / `HOUR` / `MONTH` / `YEAR` | Must match the granularity set at table creation. |
| `--require_partition_filter` | boolean | Require a partition-eliminating filter in queries. |
| `-a`, `--append_table` | flag | `bq cp`: append the source partition to an existing table or partition. |
| `-f`, `--force` | flag | `bq cp` / `bq rm`: overwrite or delete without a confirmation prompt. |
| `-n`, `--no_clobber` | flag | `bq cp`: error (`Table '... or table$date' already exists, skipping.`) if the destination exists. Default without it: prompt. |
| `--destination_kms_key` | string | `bq cp`: customer-managed Cloud KMS key for the destination. |
| `--location` | string | Optional location, e.g. `asia-northeast1`; can be set in `.bigqueryrc`. |

### Partition decorator formats

| Granularity | Format | Example |
|-------------|--------|---------|
| Hourly | `yyyymmddhh` | `$2016030100` |
| Daily | `yyyymmdd` | `$20160301` |
| Monthly | `yyyymm` | `$201603` |
| Yearly | `yyyy` | `$2016` |
| Integer range | start of the partition range | `$20` |

### `__PARTITIONS_SUMMARY__` columns

| Name | Description |
|------|-------------|
| `project_id` | Name of the project. |
| `dataset_id` | Name of the dataset. |
| `table_id` | Name of the time-partitioned table. |
| `partition_id` | Name (date) of the partition. |
| `creation_time` | Partition creation time, in milliseconds since January 1, 1970 UTC. |
| `last_modified_time` | Partition last-modified time, in milliseconds since January 1, 1970 UTC. |

## Notes

- Permissions: querying `__PARTITIONS_SUMMARY__` needs at least `bigquery.jobs.create` and `bigquery.tables.getData`. Copying partitions needs the same permissions as copying a table; deleting a partition needs the same as deleting a table. Access control for partitioned tables is the same as for standard tables.
- Partition expiration applies to ingestion-time and time-unit column-partitioned tables, is computed independently per partition from the UTC partition boundary (daily boundary 00:00:00 UTC; with a 6-hour expiration each partition expires at 06:00:00 UTC the next day), and overrides the dataset default partition expiration. No expiration at either level means partitions never expire. Integer-range partitioned tables do not support partition expiration.
- A table expiration takes precedence: with table expiration 5 days and partition expiration 7 days, the table and all partitions are deleted after 5 days.
- Updating expiration applies to all existing partitions; older ones expire immediately. Data copied or inserted into a time-unit column-partitioned table older than the expiration also expires immediately.
- Expired partitions are only marked for deletion; a background process deletes them asynchronously (can take several days) and they count toward table quotas until then. Deleted data follows time travel and fail-safe retention and can incur charges. Automatic deletion is not recorded in audit logs. Delete manually to remove immediately.
- The console cannot update partition expiration or the filter requirement, copy partitions, or delete partitions.
- Require partition filter: every query (including via views and materialized views) must include at least one predicate referencing only the partitioning column, else error `Cannot query over table 'project_id.dataset.table' without a filter that can be used for partition elimination`.
- Copying a partitioned table:
  - To a new table: all partitioning information is copied; identical partitions.
  - A non-partitioned table into an existing partitioned table: only supported for ingestion-time partitioning (data goes to the partition for the current date); not supported for time-unit column or integer-range partitioned tables.
  - A partitioned table into another partitioned table: partition specifications must match.
  - A partitioned table into a non-partitioned table: destination remains unpartitioned.
  - Multiple source tables in one job: sources cannot mix partitioned and non-partitioned tables.
  - If all of the source tables are partitioned tables, the partition specifications for all source tables must match the destination table's partition specification.
  - A table with a clustering specification: copying into a new table copies the clustering information.
  - If you copy into an existing table, then the cluster specifications for the source and destination tables must match.
  - Copying to an existing table lets you choose append or overwrite.
- `bq cp` with `--time_partitioning_field` / `--time_partitioning_type` is not supported; a copy job cannot convert an ingestion-time partitioned table into a column-partitioned table.
- `bq cp` with a decorator works on column-based partitions when source and destination partitions are identical, and on ingestion-time partitions when the destination is the same or a coarser unit (source `$20180130` allows `$20180130`, `$201801`, `$2018`). For any other target use `INSERT SELECT`.
- The `$` decorator separator is special in the unix shell; escape it (`mydataset.table\$20160519` or `'mydataset.table$20160519'`).
- The special `__NULL__` and `__UNPARTITIONED__` partitions cannot be deleted; only one partition can be deleted at a time.
- The twin for this page contains no dedicated section on restoring or time travel of deleted partitions; see the linked time-travel and querying pages.
- Java client-library sample (`UpdateTableRequirePartitionFilter`) omitted; no Python or Node.js sample is given on the page.
- Corrected from the official docs: the `bq cp` and `bq rm` partition examples leave `table$partition` unquoted; in a shell `$partition` (and `$20160301`) is expanded, so the identifiers are single-quoted as in the source's other `bq` examples.
- The 6-hour example ("each partition expires at 06:00:00 UTC the next day") is as the source writes it (https://docs.cloud.google.com/bigquery/docs/managing-partitioned-tables, "Set the partition expiration").
- Source: https://docs.cloud.google.com/bigquery/docs/managing-partitioned-tables (retrieved 2026-11-19)

## Related

- [partitioned-tables.md](./partitioned-tables.md)
- [creating-partitioned-tables.md](./creating-partitioned-tables.md)
- [querying-partitioned-tables.md](./querying-partitioned-tables.md)
- [clustered-tables.md](./clustered-tables.md)
- [time-travel.md](../overview-datasets/time-travel.md)
- [restore-deleted-tables.md](../overview-datasets/restore-deleted-tables.md)
