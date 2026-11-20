---
source: https://docs.cloud.google.com/bigquery/docs/information-schema-table-storage-usage
---

# TABLE_STORAGE_USAGE_TIMELINE view

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

The `INFORMATION_SCHEMA.TABLE_STORAGE_USAGE_TIMELINE` view provides daily
totals of storage usage for the past 90 days for the following types of tables:

- Standard tables
- Materialized views
- Table clones that have a delta in bytes from the base table
- Table snapshots that have a delta in bytes from the base table

Tables that don't have billable bytes aren't included in the
`INFORMATION_SCHEMA.TABLE_STORAGE_USAGE_TIMELINE` view. This includes the
following types of tables:

- External tables
- Anonymous tables
- Empty tables
- Table clones that have no delta in bytes from the base table
- Table snapshots that have no delta in bytes from the base table

When you query the `INFORMATION_SCHEMA.TABLE_STORAGE_USAGE_TIMELINE`
view, the query results contain one row per day for each table or
materialized view for the current project.

The data in this table is not kept in real time. It takes approximately 72
hours for table data to be reflected in this view.

Storage usage is returned in MiB-second. For example, if a project uses
1,000,000 physical bytes for 86,400 seconds (24 hours), the total physical
usage is 86,400,000,000 byte-seconds, which is converted to 82,397 MiB-seconds,
as shown in the following example:

```text
86,400,000,000 / 1,024 / 1,024 = 82,397
```

This is the value that would be returned by the `BILLABLE_TOTAL_PHYSICAL_USAGE`
column.

For more information, see
[Storage pricing details](https://cloud.google.com/bigquery/pricing#storage-pricing-details).

> [!NOTE]
> **Note:** Data returned by this view is complete for October 1, 2023 and after. You can query the view for dates prior to that, but the data returned is incomplete.

### Required permissions

To query the `INFORMATION_SCHEMA.TABLE_STORAGE_USAGE_TIMELINE` view, you need the
following Identity and Access Management (IAM) permissions:

- `bigquery.tables.get`
- `bigquery.tables.list`

Each of the following predefined IAM roles includes the preceding
permissions:

- `roles/bigquery.dataViewer`
- `roles/bigquery.dataEditor`
- `roles/bigquery.metadataViewer`
- `roles/bigquery.admin`

For queries with a region qualifier, you must have permissions for the project.

For more information about BigQuery permissions, see
[Access control with IAM](https://docs.cloud.google.com/bigquery/docs/access-control).

### Schema

The `INFORMATION_SCHEMA.TABLE_STORAGE_USAGE_TIMELINE` view has the following schema:

| Column name | Data type | Value |
|---|---|---|
| `usage_date` | `DATE` | The billing date for the bytes shown, using the `America/Los_Angeles` time zone |
| `project_id` | `STRING` | The project ID of the project that contains the dataset |
| `table_catalog` | `STRING` | The project ID of the project that contains the dataset |
| `project_number` | `INT64` | The project number of the project that contains the dataset |
| `table_schema` | `STRING` | The name of the dataset that contains the table or materialized view, also referred to as the `datasetId` |
| `table_name` | `STRING` | The name of the table or materialized view, also referred to as the `tableId` |
| `billable_total_logical_usage` | `INT64` | The total logical usage, in MiB second. Returns 0 if the dataset uses the physical storage [billing model](https://docs.cloud.google.com/bigquery/docs/datasets-intro#dataset_storage_billing_models). |
| `billable_active_logical_usage` | `INT64` | The logical usage that is less than 90 days old, in MiB second. Returns 0 if the dataset uses the physical storage [billing model](https://docs.cloud.google.com/bigquery/docs/datasets-intro#dataset_storage_billing_models). |
| `billable_long_term_logical_usage` | `INT64` | The logical usage that is more than 90 days old, in MiB second. Returns 0 if the dataset uses the physical storage [billing model](https://docs.cloud.google.com/bigquery/docs/datasets-intro#dataset_storage_billing_models). |
| `billable_total_physical_usage` | `INT64` | The total usage in MiB second. This includes physical bytes used for fail-safe and [time travel](https://docs.cloud.google.com/bigquery/docs/time-travel) storage. Returns 0 if the dataset uses the logical storage [billing model](https://docs.cloud.google.com/bigquery/docs/datasets-intro#dataset_storage_billing_models). |
| `billable_active_physical_usage` | `INT64` | The physical usage that is less than 90 days old, in MiB second. This includes physical bytes used for fail-safe and [time travel](https://docs.cloud.google.com/bigquery/docs/time-travel) storage. Returns 0 if the dataset uses the logical storage [billing model](https://docs.cloud.google.com/bigquery/docs/datasets-intro#dataset_storage_billing_models). |
| `billable_long_term_physical_usage` | `INT64` | The physical usage that is more than 90 days old, in MiB second. Returns 0 if the dataset uses the logical storage [billing model](https://docs.cloud.google.com/bigquery/docs/datasets-intro#dataset_storage_billing_models). |

For stability, we recommend that you explicitly list columns in your information schema queries instead of
using a wildcard (`SELECT *`). Explicitly listing columns prevents queries from
breaking if the underlying schema changes.

### Scope and syntax

Queries against this view must include a [region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#syntax).
The following table explains the region scope for this view:

| View name | Resource scope | Region scope |
|---|---|---|
| ``[PROJECT_ID.]`region-REGION`.INFORMATION_SCHEMA.TABLE_STORAGE_USAGE_TIMELINE[_BY_PROJECT]`` | Project level | `REGION` |

Replace the following:

- Optional: `PROJECT_ID`: the ID of your Google Cloud project. If not specified, the default project is used.
- `REGION`: any [dataset region name](https://docs.cloud.google.com/bigquery/docs/locations). For example, `us`.

  <br />

  <br />

  > [!NOTE]
  > **Note:** You must use [a region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#region_qualifier) to query `INFORMATION_SCHEMA` views. The location of the query execution must match the region of the `INFORMATION_SCHEMA` view.

<br />

The following example shows how to return storage information for tables in
a specified project:

```sql
SELECT * FROM myProject.`region-REGION`.INFORMATION_SCHEMA.TABLE_STORAGE_USAGE_TIMELINE;
```

The following example shows how to return storage information for tables in a
specified region:

```sql
SELECT * FROM `region-REGION`.INFORMATION_SCHEMA.TABLE_STORAGE_USAGE_TIMELINE;
```

### Examples

> [!NOTE]
> **Note:** `INFORMATION_SCHEMA` view names are case-sensitive.

**Example 1**

The following example sums the storage usage by day for projects in a
specified region.

```googlesql
SELECT
  usage_date,
  project_id,
  SUM(billable_total_logical_usage) AS billable_total_logical_usage,
  SUM(billable_active_logical_usage) AS billable_active_logical_usage,
  SUM(billable_long_term_logical_usage) AS billable_long_term_logical_usage,
  SUM(billable_total_physical_usage) AS billable_total_physical_usage,
  SUM(billable_active_physical_usage) AS billable_active_physical_usage,
  SUM(billable_long_term_physical_usage) AS billable_long_term_physical_usage
FROM
  `region-REGION`.INFORMATION_SCHEMA.TABLE_STORAGE_USAGE_TIMELINE
GROUP BY
  1,
  2
ORDER BY
  usage_date;
```

The result is similar to the following:

```text
+-------------------------+------------------------------+-------------------------------+-----------------------------------+-------------------------------+--------------------------------+-------------------------------------+
| usage_date | project_id | billable_total_logical_usage | billable_active_logical_usage | billable_long_term_logical_usage  | billable_total_physical_usage | billable_active_physical_usage | billable_long_term_physical_usage   |
+-------------------------+------------------------------+-------------------------------+-----------------------------------+-------------------------------+--------------------------------+-------------------------------------+
| 2023-04-03 | project_A  | 305085738096                 | 7667321458                    | 297418416638                      | 74823954823                   | 124235724                      | 74699719099                         |
+-------------------------+------------------------------+-------------------------------+-----------------------------------+-------------------------------+--------------------------------+-------------------------------------+
| 2023-04-04 | project_A  | 287033241105                 | 7592334614                    | 279440906491                      | 75071991788                   | 200134561                      | 74871857227                         |
+-------------------------+------------------------------+-------------------------------+-----------------------------------+-------------------------------+--------------------------------+-------------------------------------+
| 2023-04-03 | project_B  | 478173930912                 | 8137372626                    | 470036558286                      | 0                             | 0                              | 0                                   |
+-------------------------+------------------------------+-------------------------------+-----------------------------------+-------------------------------+--------------------------------+-------------------------------------+
| 2023-04-04 | project_B  | 496648915405                 | 7710451723                    | 488938463682                      | 0                             | 0                              | 0                                   |
+-------------------------+------------------------------+-------------------------------+-----------------------------------+-------------------------------+--------------------------------+-------------------------------------+
```

**Example 2**

The following example shows the storage usage for a specified day for tables in
a dataset that uses logical storage.

```googlesql
SELECT
  usage_date,
  table_schema,
  table_name,
  billable_total_logical_usage
FROM
  `region-REGION`.INFORMATION_SCHEMA.TABLE_STORAGE_USAGE_TIMELINE
WHERE
  project_id = 'PROJECT_ID'
  AND table_schema = 'DATASET_NAME'
  AND usage_date = 'USAGE_DATE'
ORDER BY
  billable_total_logical_usage DESC;
```

The result is similar to the following:

```text
+--------------+--------------+------------+------------------------------+
| usage_date   | table_schema | table_name | billable_total_logical_usage |
+--------------+--------------+------------+------------------------------+
|  2023-04-03  | dataset_A    | table_4    | 734893409201                 |
+--------------+--------------+------------+------------------------------+
|  2023-04-03  | dataset_A    | table_1    | 690070445455                 |
+--------------+--------------+------------+------------------------------+
|  2023-04-03  | dataset_A    | table_3    |  52513713981                 |
+--------------+--------------+------------+------------------------------+
|  2023-04-03  | dataset_A    | table_2    |   8894535355                 |
+--------------+--------------+------------+------------------------------+
```

**Example 3**

The following example shows the storage usage for the most recent usage date
for tables in a dataset that uses physical storage.

```googlesql
SELECT
  usage_date,
  table_schema,
  table_name,
  billable_total_physical_usage
FROM
  (
    SELECT
      *,
      ROW_NUMBER()
        OVER (PARTITION BY project_id, table_schema, table_name ORDER BY usage_date DESC) AS rank
    FROM
      `region-REGION`.INFORMATION_SCHEMA.TABLE_STORAGE_USAGE_TIMELINE
  )
WHERE
  rank = 1
  AND project_id = 'PROJECT_ID'
  AND table_schema ='DATASET_NAME'
ORDER BY
  usage_date;
```

The result is similar to the following:

```text
+--------------+--------------+------------+-------------------------------+
| usage_date   | table_schema | table_name | billable_total_physical_usage |
+--------------+--------------+------------+-------------------------------+
|  2023-04-12  | dataset_A    | table_4    |  345788341123                 |
+--------------+--------------+------------+-------------------------------+
|  2023-04-12  | dataset_A    | table_1    |             0                 |
+--------------+--------------+------------+-------------------------------+
|  2023-04-12  | dataset_A    | table_3    | 9123481400212                 |
+--------------+--------------+------------+-------------------------------+
|  2023-04-12  | dataset_A    | table_2    |    1451334553                 |
+--------------+--------------+------------+-------------------------------+
```

**Example 4**

The following example joins the `TABLE_OPTIONS` and
`TABLE_STORAGE_USAGE_TIMELINE` views to get storage usage details based on tags.

```googlesql
SELECT * FROM region-REGION.INFORMATION_SCHEMA.TABLE_OPTIONS
    INNER JOIN region-REGION.INFORMATION_SCHEMA.TABLE_STORAGE_USAGE_TIMELINE
    USING (TABLE_CATALOG, TABLE_SCHEMA, TABLE_NAME)
    WHERE option_name='tags'
    AND CONTAINS_SUBSTR(option_value, '(\"TAG_NAMESPACED_KEY\", \"TAG_NAMESPACED_VALUE\")')
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/information-schema-table-storage-usage (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the example value for `REGION` is `` `region-us` ``, but the view name on this page already has the prefix (`region-REGION`), so that value would produce `region-region-us`. The example value is changed to `us`.

## Related

- [Index of this directory](./README.md)
