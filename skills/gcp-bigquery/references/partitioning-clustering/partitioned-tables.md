---
source: https://docs.cloud.google.com/bigquery/docs/partitioned-tables
---

# Introduction to partitioned tables

A partitioned table is divided into segments, called partitions, so that queries read fewer bytes and cost less. You partition a table on one column; a query with a qualifying filter on that column scans only the matching partitions (pruning). BigQuery supports integer range, time-unit column and ingestion-time partitioning, and a partition decorator `table_name$partition_id` addresses a single partition.

## Signature / Usage

### Browse and export a single partition

Use a partition decorator with `bq head` to list the first 10 rows of the `2018-02-24` partition:

```bash
bq head --max_rows=10 'my_dataset.my_table$20180224'
```

To export one partition, run `bq extract` with the decorator appended to the table name (for example `my_table$20160201`, `my_table$__NULL__` or `my_table$__UNPARTITIONED__`). Exporting a whole partitioned table is the same as exporting a non-partitioned table.

### Quota error for partition modifications

The error returned when a column-partitioned table exceeds the daily number of partition modifications (load, copy and query jobs that append to or overwrite a destination partition):

```text
Quota exceeded: Your table exceeded quota for
Number of partition modifications to a column partitioned table
```

Resolution (this quota cannot be increased):

- Put more data in each partition, for example change from daily to monthly partitioning.
- Use clustering instead of partitioning.
- Combine many small Cloud Storage load jobs into one job, using a comma-separated URI list (`gs://my_path/file_1,gs://my_path/file_2`) or a wildcard (`gs://my_path/*`).
- Batch single-row appends; for a high append rate use the BigQuery Storage Write API (gRPC), which has exactly-once delivery semantics.
- Monitor modified partitions with the `INFORMATION_SCHEMA` jobs view (`partitions-modified-by`).

## Options / Props

### Partitioning types

| Type | Column / source | Granularity | Special partitions |
|------|-----------------|-------------|--------------------|
| Integer range | `INTEGER` column; you give start (inclusive), end (exclusive), interval | Range of `interval` values | `__UNPARTITIONED__` (values outside the range), `__NULL__` (NULL column) |
| Time-unit column | `DATE`, `TIMESTAMP` or `DATETIME` column | `DATE`: daily, monthly, yearly. `TIMESTAMP` / `DATETIME`: hourly, daily, monthly, yearly. Boundaries are UTC | `__NULL__` (NULL), `__UNPARTITIONED__` (value earlier than 1960-01-01 or later than 2159-12-31) |
| Ingestion time | Time BigQuery ingests the row | Hourly, daily, monthly, yearly. Boundaries are UTC | Pseudocolumn `_PARTITIONTIME` (truncated to the partition boundary); `_PARTITIONDATE` is the UTC date of `_PARTITIONTIME` |

Integer range example: column `customer_id`, start 0, end 100, interval 10 puts 0 to 9 in one partition, 10 to 19 in the next, up to 99.

### Choosing a time granularity

| Granularity | Use when |
|-------------|----------|
| Daily (default) | Data spread over a wide range of dates, or added continuously |
| Hourly | High data volume over a short date range, typically less than six months of timestamp values; keep the partition count within the partition limits |
| Monthly or yearly | Little data per day over a wide date range, or frequent updates/additions spanning a wide date range (for example, more than 500 dates); combine with clustering on the partitioning column |

### Partition decorator format (`table_name$partition_id`)

| Partitioning type | Format | Example |
|---|---|---|
| Hourly | `yyyymmddhh` | `my_table$2021071205` |
| Daily | `yyyymmdd` | `my_table$20210712` |
| Monthly | `yyyymm` | `my_table$202107` |
| Yearly | `yyyy` | `my_table$2021` |
| Integer range | `range_start` | `my_table$40` |

### When to partition versus cluster

| Prefer partitioning when | Prefer clustering when |
|---|---|
| You want to scan only part of a table | You need more granularity than partitioning allows |
| An operation exceeds a standard table quota and can be scoped to partition values (higher partitioned table quotas) | Queries commonly filter or aggregate on multiple columns |
| You want cost estimates before the query runs (prune, then dry run) | Column cardinality is large |
| You want partition expiration, writes to a specific partition by load job, or deleting specific partitions without scanning the table | You don't need strict cost estimates before execution |
| | Partitions would hold less than about 10 GB, or the partition count would exceed the partitioned table limits |
| | DML frequently modifies most partitions (for example, every few minutes) |

### Limitations

| Scope | Limitation |
|---|---|
| All partitioned tables | Legacy SQL cannot query partitioned tables or write results to them |
| All partitioned tables | Only one column can partition a table (no multi-column partitioning) |
| All partitioned tables | An existing non-partitioned table cannot be converted in place; create a new one with `CREATE TABLE ... AS SELECT` |
| Time-unit column | Column must be a scalar `DATE`, `TIMESTAMP` or `DATETIME`; mode `REQUIRED` or `NULLABLE`, not `REPEATED`; must be a top-level field (no `RECORD` / `STRUCT` leaf) |
| Integer range | Column must be `INTEGER`; mode `REQUIRED` or `NULLABLE`, not `REPEATED`; must be a top-level field |
| Ingestion time | A specific partition can be any date from 0001-01-01 to 9999-12-31, but DML statements cannot reference dates before 1970-01-01 or after 2159-12-31 |

## Notes

- Partitioning is recommended over date-sharded tables (`[PREFIX]_YYYYMMDD`): each shard needs its own schema and metadata copy and permission check. Convert shards with `bq partition` (see `creating-partitioned-tables.md`).
- Combining partitioning and clustering: data is first segmented into partitions, then clustered within each partition.
- Many partitioned table operations are free (loading into partitions, copying partitions, exporting partitions) but are subject to quotas and limits. Access control is the same as for standard tables. Pricing is not copied; see the BigQuery pricing page.
- The source also shows a diagram and links to partition expiration, partition filter requirements and quota pages (`https://docs.cloud.google.com/bigquery/quotas#partitioned_tables`).
- Source: https://docs.cloud.google.com/bigquery/docs/partitioned-tables (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [creating-partitioned-tables.md](./creating-partitioned-tables.md)
- [querying-partitioned-tables.md](./querying-partitioned-tables.md)
- [managing-partitioned-tables.md](./managing-partitioned-tables.md)
- [clustered-tables.md](./clustered-tables.md)
