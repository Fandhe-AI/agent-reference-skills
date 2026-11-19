---
source: https://docs.cloud.google.com/bigquery/docs/information-schema-partitions
---

# PARTITIONS view

## Signature / Usage

> [!WARNING]
>
> **Preview**
>
>
> This product or feature is
>
> subject to the "Pre-GA Offerings Terms" in the General Service Terms section
> of the [Service Specific
> Terms](https://docs.cloud.google.com/terms/service-terms#1).
>
> Pre-GA products and features are available "as is" and might have limited support.
>
> For more information, see the
> [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

The `INFORMATION_SCHEMA.PARTITIONS` view contains one row for each partition.

Querying the `INFORMATION_SCHEMA.PARTITIONS` view is limited to 1000
tables. To get the data about partitions at the project level, you can split the
query into multiple queries and then join the results. If you exceed the limit,
you might encounter an error similar to the following. To narrow down your
results, you can use filters with the `WHERE` statement, for example,
`table_name = 'mytable'` and `total_logical_bytes IS NOT NULL`.

```text
INFORMATION_SCHEMA.PARTITIONS query attempted to read too many tables. Please add more restrictive filters.
```

### Required permissions

To query the `INFORMATION_SCHEMA.PARTITIONS` view, you need the following
Identity and Access Management (IAM) permissions:

- `bigquery.tables.get`
- `bigquery.tables.list`

Each of the following predefined IAM roles includes the preceding
permissions:

- `roles/bigquery.admin`
- `roles/bigquery.dataEditor`
- `roles/bigquery.dataViewer`

For more information about BigQuery permissions, see
[Access control with IAM](https://docs.cloud.google.com/bigquery/docs/access-control).

### Schema

When you query the `INFORMATION_SCHEMA.PARTITIONS` view, the query results
typically contain one row for each partition. The exception is when there is
a combination of long-term and active storage tier data in the
[`__UNPARTITIONED__` partition](https://docs.cloud.google.com/bigquery/docs/querying-partitioned-tables#query_data_in_the_streaming_buffer). In that case,
the view returns two rows for the `__UNPARTITIONED__` partition, one for each
storage tier.

The `INFORMATION_SCHEMA.PARTITIONS` view has the following schema:

| Column name | Data type | Value |
|---|---|---|
| `table_catalog` | `STRING` | The project ID of the project that contains the table. |
| `table_schema` | `STRING` | The name of the dataset that contains the table, also referred to as the `datasetId`. |
| `table_name` | `STRING` | The name of the table, also referred to as the `tableId`. |
| `partition_id` | `STRING` | A single partition's ID. For unpartitioned tables, the value is `NULL`. For partitioned tables that contain rows with `NULL` values in the partitioning column, the value is `__NULL__`. |
| `total_rows` | `INTEGER` | The total number of rows in the partition. |
| `total_logical_bytes` | `INTEGER` | The total number of logical bytes in the partition. |
| `total_billable_bytes` | `INTEGER` | The total number of billable bytes in the partition. If billing for your storage is based on physical (compressed) bytes, this value will not match the `TOTAL_LOGICAL_BYTES` number. |
| `last_modified_time` | `TIMESTAMP` | The most recent time that data was written to the partition. It is used to calculate a partition's eligibility for long-term storage. After 90 days, the partition automatically transitions from active storage to long-term storage. For more information, see [BigQuery storage pricing](https://cloud.google.com/bigquery/pricing#storage). This field is updated when data is inserted, loaded, streamed, or modified within the partition. Modifications that involve record deletions might not be reflected. |
| `storage_tier` | `STRING` | The partition's storage tier: - `ACTIVE`: the partition is billed as [active storage](https://cloud.google.com/bigquery/pricing#storage) - `LONG_TERM`: the partition is billed as [long-term storage](https://cloud.google.com/bigquery/pricing#storage) |

For stability, we recommend that you explicitly list columns in your information schema queries instead of
using a wildcard (`SELECT *`). Explicitly listing columns prevents queries from
breaking if the underlying schema changes.

### Scope and syntax

Queries against this view must include a dataset qualifier. For
queries with a dataset qualifier, you must have permissions for the dataset.
For more information
see [Syntax](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#syntax).
The following table explains the region and resource scopes for this view:

| View name | Resource scope | Region scope |
|---|---|---|
| `[PROJECT_ID.]DATASET_ID.INFORMATION_SCHEMA.PARTITIONS` | Dataset level | Dataset location |

Replace the following:

- Optional: `PROJECT_ID`: the ID of your Google Cloud project. If not specified, the default project is used.
- `DATASET_ID`: the ID of your dataset. For more information, see [Dataset qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#dataset_qualifier).

<br />

### Examples

**Example 1**

The following example calculates the number of logical bytes used by each
storage tier in all of the tables in a dataset named `mydataset`:

```googlesql
SELECT
  storage_tier,
  SUM(total_logical_bytes) AS logical_bytes
FROM
  `mydataset.INFORMATION_SCHEMA.PARTITIONS`
GROUP BY
  storage_tier;
```

> [!NOTE]
> **Note:** `INFORMATION_SCHEMA` view names are case-sensitive.

The results look similar to the following:

```text
+--------------+----------------+
| storage_tier | logical_bytes  |
+--------------+----------------+
| LONG_TERM    |  1311495144879 |
| ACTIVE       |    66757629240 |
+--------------+----------------+
```

**Example 2**

The following example creates a column that extracts the partition type from the
`partition_id` field and aggregates partition information at the table level
for the public `bigquery-public-data.covid19_usafacts` dataset:

```googlesql
SELECT
  table_name,
  CASE
    WHEN regexp_contains(partition_id, '^[0-9]{4}$') THEN 'YEAR'
    WHEN regexp_contains(partition_id, '^[0-9]{6}$') THEN 'MONTH'
    WHEN regexp_contains(partition_id, '^[0-9]{8}$') THEN 'DAY'
    WHEN regexp_contains(partition_id, '^[0-9]{10}$') THEN 'HOUR'
    END AS partition_type,
  min(partition_id) AS earliest_partition,
  max(partition_id) AS latest_partition_id,
  COUNT(partition_id) AS partition_count,
  sum(total_logical_bytes) AS sum_total_logical_bytes,
  max(last_modified_time) AS max_last_updated_time
FROM `bigquery-public-data.covid19_usafacts.INFORMATION_SCHEMA.PARTITIONS`
GROUP BY 1, 2;
```

The results look similar to the following:

```text
+-----------------+----------------+--------------------+---------------------+-----------------+-------------------------+--------------------------------+
| table_name      | partition_type | earliest_partition | latest_partition_id | partition_count | sum_total_logical_bytes | max_last_updated_time          |
+--------------+-------------------+--------------------+---------------------+-----------------+-------------------------+--------------------------------+
| confirmed_cases | DAY            | 20221204           | 20221213            | 10              | 26847302                | 2022-12-13 00:09:25.604000 UTC |
| deaths          | DAY            | 20221204           | 20221213            | 10              | 26847302                | 2022-12-13 00:09:24.709000 UTC |
| summary         | DAY            | 20221204           | 20221213            | 10              | 241285338               | 2022-12-13 00:09:27.496000 UTC |
+-----------------+----------------+--------------------+---------------------+-----------------+-------------------------+--------------------------------+
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/information-schema-partitions (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
