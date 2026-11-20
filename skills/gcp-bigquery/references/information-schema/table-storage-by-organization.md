---
source: https://docs.cloud.google.com/bigquery/docs/information-schema-table-storage-by-organization
---

# TABLE_STORAGE_BY_ORGANIZATION view

## Signature / Usage

The `INFORMATION_SCHEMA.TABLE_STORAGE_BY_ORGANIZATION` view contains one row for
each table or materialized view for the whole organization associated with the
current project.

The data in this table is not kept in real time, and might be
delayed by a few seconds to a few minutes. Storage changes that are caused by
partition or table expiration alone, or that are caused by modifications to the
dataset time travel window, might take up to a day to be reflected in the
`INFORMATION_SCHEMA.TABLE_STORAGE` view. In cases of dataset deletion where
the dataset contains more than 1,000 tables, this view won't reflect the
change until the
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

### Required permissions

To query the `INFORMATION_SCHEMA.TABLE_STORAGE_BY_ORGANIZATION` view, you need the following
Identity and Access Management (IAM) permissions for your organization:

- `bigquery.tables.get`
- `bigquery.tables.list`

Each of the following predefined IAM roles includes the preceding
permissions:

- `roles/bigquery.admin`
- `roles/bigquery.dataViewer`
- `roles/bigquery.dataEditor`
- `roles/bigquery.metadataViewer`

This schema view is only available to users with defined [Google Cloud
organizations](https://docs.cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy#organizations).

For more information about BigQuery permissions, see
[Access control with IAM](https://docs.cloud.google.com/bigquery/docs/access-control).

### Schema

The `INFORMATION_SCHEMA.TABLE_STORAGE_BY_ORGANIZATION` view has the following schema:

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
| ``[`PROJECT_ID`.]`region-REGION`.INFORMATION_SCHEMA.TABLE_STORAGE_BY_ORGANIZATION`` | Organization that contains the specified project | `REGION` |

Replace the following:

- Optional: `PROJECT_ID`: the ID of your Google Cloud project. If not specified, the default project is used.
- `REGION`: any [dataset region name](https://docs.cloud.google.com/bigquery/docs/locations). For example, `us`.

  <br />

  <br />

  > [!NOTE]
  > **Note:** You must use [a region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#region_qualifier) to query `INFORMATION_SCHEMA` views. The location of the query execution must match the region of the `INFORMATION_SCHEMA` view.

<br />

The following example shows how to return storage information for tables in a
specified project in an organization:

```text
SELECT * FROM `myProject`.`region-REGION`.INFORMATION_SCHEMA.TABLE_STORAGE_BY_ORGANIZATION;
```

The following example shows how to return storage information by project for
tables in an organization:

```text
SELECT * FROM `region-REGION`.INFORMATION_SCHEMA.TABLE_STORAGE_BY_ORGANIZATION;
```

### Example

The following example shows you which projects in an organization
are currently using the most storage.

```googlesql
SELECT
  project_id,
  SUM(total_logical_bytes) AS total_logical_bytes
FROM
  `region-REGION`.INFORMATION_SCHEMA.TABLE_STORAGE_BY_ORGANIZATION
GROUP BY
  project_id
ORDER BY
  total_logical_bytes DESC;
```

The result is similar to the following:

```text
+---------------------+---------------------+
|     project_id      | total_logical_bytes |
+---------------------+---------------------+
| projecta            |     971329178274633 |
+---------------------+---------------------+
| projectb            |     834638211024843 |
+---------------------+---------------------+
| projectc            |     562910385625126 |
+---------------------+---------------------+
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/information-schema-table-storage-by-organization (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the example value for `REGION` is `` `region-us` ``, but the view name on this page already has the prefix (`region-REGION`), so that value would produce `region-region-us`. The example value is changed to `us`.

## Related

- [Index of this directory](./README.md)
