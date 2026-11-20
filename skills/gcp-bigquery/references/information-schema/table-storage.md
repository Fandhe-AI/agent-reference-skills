---
source: https://docs.cloud.google.com/bigquery/docs/information-schema-table-storage
---

# TABLE_STORAGE view

## Signature / Usage

The `INFORMATION_SCHEMA.TABLE_STORAGE` view provides a current snapshot of storage
usage for tables and materialized views. When you query the
`INFORMATION_SCHEMA.TABLE_STORAGE` view, the query results contain one row for
each table or materialized view for the current project.

The data in the `INFORMATION_SCHEMA.TABLE_STORAGE` view is
not kept in real time, and updates are typically delayed by a few seconds to a few
minutes. Storage changes that are caused by partition or table expiration alone,
or that are caused by modifications to the dataset time travel window, might take
up to a day to be reflected in the `INFORMATION_SCHEMA.TABLE_STORAGE` view.
In cases of dataset deletion where the dataset contains more than 1,000 tables,
this view won't reflect the change until the
[time travel window](https://docs.cloud.google.com/bigquery/docs/time-travel#time_travel) for the deleted
dataset has passed.

The table storage views give you a convenient way to observe your current
storage consumption, and in addition provide details on whether your
storage uses logical uncompressed bytes, physical compressed bytes, or
time travel bytes. This information can help you with tasks like planning for
future growth and understanding the update patterns for tables.

### Data included in the `*_BYTES` columns

The `*_BYTES` columns in the table storage views include information about your
use of storage bytes. This information is determined by looking at your storage
usage for materialized views and the following types of tables:

- Permanent tables created through any of the methods described in [Create and use tables](https://docs.cloud.google.com/bigquery/docs/tables).
- Temporary tables created in [sessions](https://docs.cloud.google.com/bigquery/docs/sessions-write-queries#use_temporary_tables_in_sessions). These tables are placed into datasets with generated names like "_c018003e063d09570001ef33ae401fad6ab92a6a".
- Temporary tables created in [multi-statement queries](https://docs.cloud.google.com/bigquery/docs/multi-statement-queries#temporary_tables) ("scripts"). These tables are placed into datasets with generated names like "_script72280c173c88442c3a7200183a50eeeaa4073719".

Data stored in the
[query results cache](https://docs.cloud.google.com/bigquery/docs/writing-results#temporary-table)
is not billed to you and so is not included in the `*_BYTES` column values.

Clones and snapshots show `*_BYTES` column values as if they were complete
tables, rather than showing the delta from the storage used by the base table,
so they are an over-estimation. Your bill does account correctly for this delta
in storage usage. For more information on the delta bytes stored and billed by clones and
snapshots, see the [`TABLE_STORAGE_USAGE_TIMELINE`
view](table-storage-usage.md).

### Forecast storage billing

In order to forecast the monthly storage billing for a dataset, you can use
either the `logical` or `physical *_BYTES` columns in this view, depending
on the
[dataset storage billing model](https://docs.cloud.google.com/bigquery/docs/datasets-intro#dataset_storage_billing_models)
used by the dataset. Please note that this is only a rough forecast, and
the precise billing amounts are calculated based on the usage by
BigQuery storage billing infrastructure and visible in
Cloud Billing.

For datasets that use a logical billing model, you can forecast your monthly
storage costs as follows:

((`ACTIVE_LOGICAL_BYTES` value / `POW`(1024, 3)) \* active logical bytes pricing) +
((`LONG_TERM_LOGICAL_BYTES` value / `POW`(1024, 3)) \* long-term logical bytes pricing)

The `ACTIVE_LOGICAL_BYTES` value for a table reflects the active bytes
currently used by that table.

For datasets that use a physical billing model, you can forecast your storage
costs as follows:

((`ACTIVE_PHYSICAL_BYTES + FAIL_SAFE_PHYSICAL_BYTES` value / `POW`(1024, 3)) \* active physical bytes pricing) +
((`LONG_TERM_PHYSICAL_BYTES` value / `POW`(1024, 3)) \* long-term physical bytes pricing)

The `ACTIVE_PHYSICAL_BYTES` value for a table reflects the active bytes
currently used by that table plus the bytes used for time travel for that table.

To see the active bytes of the table alone, subtract the
`TIME_TRAVEL_PHYSICAL_BYTES` value from the
`ACTIVE_PHYSICAL_BYTES` value.

For more information, see [Storage pricing](https://cloud.google.com/bigquery/pricing#storage).

> [!NOTE]
> **Note:** The view names `INFORMATION_SCHEMA.TABLE_STORAGE` and `INFORMATION_SCHEMA.TABLE_STORAGE_BY_PROJECT` are synonymous and can be used interchangeably.

### Understanding byte values versus billing units

The `*_BYTES` columns in the `INFORMATION_SCHEMA.TABLE_STORAGE` views provide a
snapshot of your current storage consumption in bytes. This tells you how much
data you are storing at that moment.

However, BigQuery storage billing, as shown in your Cloud Billing
reports, is not based on this instantaneous size alone. Instead, billing is
calculated based on the amount of data stored over time. The standard
billing units are GiB-month or TiB-month.

For example, storing 1 GiB for any full calendar month results in 1 GiB-month of
usage, regardless of whether the month has 28 to 31 days. Similarly, storing
data for just part of the month is prorated. Storing 31 GiB for a single day in
a 31-day month is approximately 1 GiB-month, just as storing 28 GiB for a single
day in a 28-day month is also approximately 1 GiB-month.

While the byte values in `INFORMATION_SCHEMA.TABLE_STORAGE` are essential
inputs for estimating potential costs, your actual bill reflects the
continuous calculation of `(bytes stored * duration stored)`. The values
from this view are not expected to directly match the line items in your
billing report, which are aggregated over the billing period.

For comprehensive details about how storage costs are calculated, see
[Storage pricing](https://docs.cloud.google.com/bigquery/pricing#storage-pricing) page.

### Required roles

To get the permissions that
you need to query the `INFORMATION_SCHEMA.TABLE_STORAGE` view,

ask your administrator to grant you the
[BigQuery Metadata Viewer](https://docs.cloud.google.com/iam/docs/roles-permissions/bigquery#bigquery.metadataViewer) (`roles/bigquery.metadataViewer`) IAM role on the project.

For more information about granting roles, see [Manage access to projects, folders, and organizations](https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access).

This predefined role contains

the permissions required to query the `INFORMATION_SCHEMA.TABLE_STORAGE` view. To see the exact permissions that are
required, expand the **Required permissions** section:

##### Required permissions

The following permissions are required to query the `INFORMATION_SCHEMA.TABLE_STORAGE` view:

- `bigquery.tables.get`
- `bigquery.tables.list`

You might also be able to get
these permissions
with [custom roles](https://docs.cloud.google.com/iam/docs/creating-custom-roles) or
other [predefined roles](https://docs.cloud.google.com/iam/docs/roles-overview#predefined).

### Schema

The `INFORMATION_SCHEMA.TABLE_STORAGE` view has the following schema:

| Column name | Data type | Value |
|---|---|---|
| `project_id` | `STRING` | The project ID of the project that contains the dataset. |
| `project_number` | `INT64` | The project number of the project that contains the dataset. |
| `table_catalog` | `STRING` | The project ID of the project that contains the dataset. |
| `table_schema` | `STRING` | The name of the dataset that contains the table or materialized view, also referred to as the `datasetId`. |
| `table_name` | `STRING` | The name of the table or materialized view, also referred to as the `tableId`. |
| `creation_time` | `TIMESTAMP` | The creation time of the table. |
| `total_rows` | `INT64` | The total number of rows in the table or materialized view. |
| `total_partitions` | `INT64` | The number of partitions present in the table or materialized view. Unpartitioned tables return 0. |
| `total_logical_bytes` | `INT64` | Total number of logical (uncompressed) bytes in the table or materialized view. |
| `active_logical_bytes` | `INT64` | Number of logical (uncompressed) bytes that are younger than 90 days. |
| `long_term_logical_bytes` | `INT64` | Number of logical (uncompressed) bytes that are older than 90 days. |
| `current_physical_bytes` | `INT64` | Total number of physical bytes for the current storage of the table across all partitions. |
| `total_physical_bytes` | `INT64` | Total number of physical (compressed) bytes used for storage, including active, long-term, and time-travel (deleted or changed data) bytes. Fail-safe (deleted or changed data retained after the time-travel window) bytes aren't included. |
| `active_physical_bytes` | `INT64` | Number of physical (compressed) bytes younger than 90 days, including time-travel (deleted or changed data) bytes. |
| `long_term_physical_bytes` | `INT64` | Number of physical (compressed) bytes older than 90 days. |
| `time_travel_physical_bytes` | `INT64` | Number of physical (compressed) bytes used by time-travel storage (deleted or changed data). |
| `storage_last_modified_time` | `TIMESTAMP` | The most recent time that data was written to the table. Returns `NULL` if no data exists. |
| `deleted` | `BOOLEAN` | Indicates whether or not the table is deleted. |
| `table_type` | `STRING` | The type of table. For example, `BASE TABLE`. |
| `managed_table_type` | `STRING` | This column is in Preview. The managed type of the table. For example, `NATIVE` or `BIGLAKE`. |
| `fail_safe_physical_bytes` | `INT64` | Number of physical (compressed) bytes used by the fail-safe storage (deleted or changed data). |
| `last_metadata_index_refresh_time` | `TIMESTAMP` | The last metadata index refresh time of the table. |
| `table_deletion_reason` | `STRING` | Table deletion reason if the `deleted` field is true. The possible values are as follows: - `TABLE_EXPIRATION:` table deleted after set expiration time - `DATASET_DELETION:` dataset deleted by user - `USER_DELETED:` table was deleted by user |
| `table_deletion_time` | `TIMESTAMP` | The deletion time of the table. |

For stability, we recommend that you explicitly list columns in your information schema queries instead of
using a wildcard (`SELECT *`). Explicitly listing columns prevents queries from
breaking if the underlying schema changes.

### Scope and syntax

Queries against this view must include a [region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#syntax).
The following table explains the region scope for this view:

| View name | Resource scope | Region scope |
|---|---|---|
| ``[`PROJECT_ID`.]`region-REGION`.INFORMATION_SCHEMA.TABLE_STORAGE[_BY_PROJECT]`` | Project level | `REGION` |

Replace the following:

- Optional: `PROJECT_ID`: the ID of your Google Cloud project. If not specified, the default project is used.
- `REGION`: any [dataset region name](https://docs.cloud.google.com/bigquery/docs/locations). For example, `us`.

  <br />

  <br />

  > [!NOTE]
  > **Note:** You must use [a region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#region_qualifier) to query `INFORMATION_SCHEMA` views. The location of the query execution must match the region of the `INFORMATION_SCHEMA` view.

<br />

The following example shows how to return storage information for tables in
a specified project and region:

```text
SELECT * FROM `myProject`.`region-REGION`.INFORMATION_SCHEMA.TABLE_STORAGE;
```

The following example shows how to return storage information for tables in the
current project in a specified region:

```text
SELECT * FROM `region-REGION`.INFORMATION_SCHEMA.TABLE_STORAGE_BY_PROJECT;
```

### Examples

###### Example 1:

The following example shows you the total logical bytes billed for the
current project.

```googlesql
SELECT
  SUM(total_logical_bytes) AS total_logical_bytes
FROM
  `region-REGION`.INFORMATION_SCHEMA.TABLE_STORAGE;
```

The result is similar to the following:

```text
+---------------------+
| total_logical_bytes |
+---------------------+
| 971329178274633     |
+---------------------+
```

###### Example 2:

The following example shows different storage bytes in GiB at the dataset(s)
level for the current project.

```googlesql
SELECT
  table_schema AS dataset_name,
  -- Logical
  SUM(total_logical_bytes) / power(1024, 3) AS total_logical_gib,
  SUM(active_logical_bytes) / power(1024, 3) AS active_logical_gib,
  SUM(long_term_logical_bytes) / power(1024, 3) AS long_term_logical_gib,
  -- Physical
  SUM(total_physical_bytes) / power(1024, 3) AS total_physical_gib,
  SUM(active_physical_bytes) / power(1024, 3) AS active_physical_gib,
  SUM(active_physical_bytes - time_travel_physical_bytes) / power(1024, 3) AS active_no_tt_physical_gib,
  SUM(long_term_physical_bytes) / power(1024, 3) AS long_term_physical_gib,
  SUM(time_travel_physical_bytes) / power(1024, 3) AS time_travel_physical_gib,
  SUM(fail_safe_physical_bytes) / power(1024, 3) AS fail_safe_physical_gib
FROM
  `region-REGION`.INFORMATION_SCHEMA.TABLE_STORAGE
WHERE
  table_type ='BASE TABLE'
GROUP BY
  table_schema
ORDER BY
  dataset_name
```

###### Example 3:

The following example shows you how to forecast the price difference per
dataset between logical and physical billing models for the next 30 days.
This example assumes that future storage usage is constant over the next
30 days from the moment the query was run. Note that the forecast is limited to
base tables, it excludes all other types of tables within a dataset.

The prices used in the pricing variables for this query are for
the `us-central1` region. If you want to run this query for a different region,
update the pricing variables appropriately. See
[Storage pricing](https://cloud.google.com/bigquery/pricing#storage) for pricing information.

1. Open the BigQuery page in the Google Cloud console.

   [Go to the BigQuery page](https://console.cloud.google.com/bigquery)
2. Enter the following GoogleSQL query in the **Query editor** box.
   `INFORMATION_SCHEMA` requires GoogleSQL syntax. GoogleSQL
   is the default syntax in the Google Cloud console.

   ```googlesql
   DECLARE active_logical_gib_price FLOAT64 DEFAULT 0.02;
   DECLARE long_term_logical_gib_price FLOAT64 DEFAULT 0.01;
   DECLARE active_physical_gib_price FLOAT64 DEFAULT 0.04;
   DECLARE long_term_physical_gib_price FLOAT64 DEFAULT 0.02;

   WITH
    storage_sizes AS (
      SELECT
        table_schema AS dataset_name,
        -- Logical
        SUM(IF(deleted=false, active_logical_bytes, 0)) / power(1024, 3) AS active_logical_gib,
        SUM(IF(deleted=false, long_term_logical_bytes, 0)) / power(1024, 3) AS long_term_logical_gib,
        -- Physical
        SUM(active_physical_bytes) / power(1024, 3) AS active_physical_gib,
        -- Retained to calculate active_compression_ratio below:
        SUM(active_physical_bytes - time_travel_physical_bytes) / power(1024, 3) AS active_no_tt_physical_gib,
        SUM(long_term_physical_bytes) / power(1024, 3) AS long_term_physical_gib,
        -- Restorable previously deleted physical
        SUM(time_travel_physical_bytes) / power(1024, 3) AS time_travel_physical_gib,
        SUM(fail_safe_physical_bytes) / power(1024, 3) AS fail_safe_physical_gib,
      FROM
        `region-REGION`.INFORMATION_SCHEMA.TABLE_STORAGE_BY_PROJECT
      WHERE total_physical_bytes + fail_safe_physical_bytes > 0
        -- Base the forecast on base tables only for highest precision results
        AND table_type  = 'BASE TABLE'
        GROUP BY 1
    )
   SELECT
     dataset_name,
     -- Logical
     ROUND(active_logical_gib, 2) AS active_logical_gib,
     ROUND(long_term_logical_gib, 2) AS long_term_logical_gib,
     -- Physical
     ROUND(active_physical_gib, 2) AS active_physical_gib,
     ROUND(long_term_physical_gib, 2) AS long_term_physical_gib,
     ROUND(time_travel_physical_gib, 2) AS time_travel_physical_gib,
     ROUND(fail_safe_physical_gib, 2) AS fail_safe_physical_gib,
     -- Compression ratio
     ROUND(SAFE_DIVIDE(active_logical_gib, active_no_tt_physical_gib), 2) AS active_compression_ratio,
     ROUND(SAFE_DIVIDE(long_term_logical_gib, long_term_physical_gib), 2) AS long_term_compression_ratio,
     -- Forecast costs logical
     ROUND(active_logical_gib * active_logical_gib_price, 2) AS forecast_active_logical_cost,
     ROUND(long_term_logical_gib * long_term_logical_gib_price, 2) AS forecast_long_term_logical_cost,
     -- Forecast costs physical
     ROUND((active_physical_gib + fail_safe_physical_gib) * active_physical_gib_price, 2) AS forecast_active_physical_cost,
     ROUND(long_term_physical_gib * long_term_physical_gib_price, 2) AS forecast_long_term_physical_cost,
     -- Forecast costs total
     ROUND(((active_logical_gib * active_logical_gib_price) + (long_term_logical_gib * long_term_logical_gib_price)) -
        (((active_physical_gib + fail_safe_physical_gib) * active_physical_gib_price) + (long_term_physical_gib * long_term_physical_gib_price)), 2) AS forecast_total_cost_difference
   FROM
     storage_sizes
   ORDER BY
     (forecast_active_logical_cost + forecast_active_physical_cost) DESC;
   ```

   > [!NOTE]
   > **Note:** `INFORMATION_SCHEMA` view names are case-sensitive.

3. Click **Run**.

The result is similar to the following:

```text
+--------------+--------------------+-----------------------+---------------------+------------------------+--------------------------+-----------------------------+------------------------------+----------------------------------+-------------------------------+----------------------------------+--------------------------------+
| dataset_name | active_logical_gib | long_term_logical_gib | active_physical_gib | long_term_physical_gib | active_compression_ratio | long_term_compression_ratio | forecast_active_logical_cost | forecast_long_term_logical_cost | forecast_active_physical_cost | forecast_long_term_physical_cost | forecast_total_cost_difference |
+--------------+--------------------+-----------------------+---------------------+------------------------+--------------------------+-----------------------------+------------------------------+----------------------------------+-------------------------------+----------------------------------+--------------------------------+
| dataset1     |               10.0 |                  10.0 |                 1.0 |                    1.0 |                     10.0 |                        10.0 |                          0.2 |                              0.1 |                          0.04 |                             0.02 |                           0.24 |
```

### Troubleshooting

To enable this view, you can set the value of
`enable_info_schema_storage` to `TRUE` on your project or organization. For more information on managing your
configuration, see [Manage configuration
settings](https://docs.cloud.google.com/bigquery/docs/default-configuration).

If you haven't configured this setting, you will see the following error:

```text
INFORMATION_SCHEMA.TABLE_STORAGE hasn't been enabled for project <myproject>.
Consider using one of the following SQL statements to enable data collection:
ALTER PROJECT `<myproject>`
SET OPTIONS (`region-<region>.enable_info_schema_storage` = TRUE)

Or to enable for the entire organization:
ALTER ORGANIZATION
SET OPTIONS (`region-<region>.enable_info_schema_storage` = TRUE)

After enabling, please allow around 1 day for the complete historical data to
become available.
```

Run the SQL statements described in the error message to enable the view.

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/information-schema-table-storage (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the example value for `REGION` is `` `region-us` ``, but the view name on this page already has the prefix (`region-REGION`), so that value would produce `region-region-us`. The example value is changed to `us`.

## Related

- [Index of this directory](./README.md)
