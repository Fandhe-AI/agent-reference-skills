---
source: https://docs.cloud.google.com/bigquery/docs/information-schema-snapshots
---

# TABLE_SNAPSHOTS view

## Signature / Usage

The `INFORMATION_SCHEMA.TABLE_SNAPSHOTS` view contains metadata about your
table snapshots. For more information, see [Introduction to table
snapshots](https://docs.cloud.google.com/bigquery/docs/table-snapshots-intro).

### Required permissions

To query the `INFORMATION_SCHEMA.TABLE_SNAPSHOTS` view, you need the
`bigquery.tables.list` Identity and Access Management (IAM) permission for the dataset.
The `roles/bigquery.metadataViewer` predefined role includes the required
permission.

For more information about BigQuery permissions, see
[Access control with IAM](https://docs.cloud.google.com/bigquery/docs/access-control).

### Schema

When you query the `INFORMATION_SCHEMA.TABLE_SNAPSHOTS` table, the results
contain one row for each table snapshot in the specified dataset or region.

The `INFORMATION_SCHEMA.TABLE_SNAPSHOTS` table has the following schema.
The standard table that the
table snapshot was taken from is called the *base table*.

| Column name | Data type | Value |
|---|---|---|
| `table_catalog` | `STRING` | The name of the project that contains the table snapshot |
| `table_schema` | `STRING` | The name of the dataset that contains the table snapshot |
| `table_name` | `STRING` | The name of the table snapshot |
| `base_table_catalog` | `STRING` | The name of the project that contains the base table |
| `base_table_schema` | `STRING` | The name of the dataset that contains the base table |
| `base_table_name` | `STRING` | The name of the base table |
| `snapshot_time` | `TIMESTAMP` | The time that the table snapshot was created |

For stability, we recommend that you explicitly list columns in your information schema queries instead of
using a wildcard (`SELECT *`). Explicitly listing columns prevents queries from
breaking if the underlying schema changes.

### Scope and syntax

Queries against this view must include a dataset or a region qualifier. For
queries with a dataset qualifier, you must have permissions for the dataset.
For queries with a region qualifier, you must have permissions for the project.
For more
information see [Syntax](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#syntax).
The following table explains the region and resource scopes for this view:

| View name | Resource scope | Region scope |
|---|---|---|
| ``[`PROJECT_ID`.]`region-REGION`.INFORMATION_SCHEMA.TABLE_SNAPSHOTS`` | Project level | `REGION` |
| ``[`PROJECT_ID`.]DATASET_ID.INFORMATION_SCHEMA.TABLE_SNAPSHOTS`` | Dataset level | Dataset location |

Replace the following:

- Optional: `PROJECT_ID`: the ID of your Google Cloud project. If not specified, the default project is used.
- `REGION`: any [dataset region name](https://docs.cloud.google.com/bigquery/docs/locations). For example, `us`.
- `DATASET_ID`: the ID of your dataset. For more information, see [Dataset qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#dataset_qualifier).

  <br />

  <br />

  > [!NOTE]
  > **Note:** You must use [a region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#region_qualifier) to query `INFORMATION_SCHEMA` views. The location of the query execution must match the region of the `INFORMATION_SCHEMA` view.

<br />

**Example**

```sql
-- Returns metadata for the table snapshots in the specified dataset.
SELECT * FROM myDataset.INFORMATION_SCHEMA.TABLE_SNAPSHOTS;

-- Returns metadata for the table snapshots in the specified region.
SELECT * FROM `region-us`.INFORMATION_SCHEMA.TABLE_SNAPSHOTS;
```

### Example

The following query retrieves metadata for the table snapshots in the `mydataset`
dataset. In this example, it displays the table snapshot
`myproject.mydataset.mytablesnapshot`,
which was taken from the base table `myproject.mydataset.mytable` on May 14,
2021, at 12 PM UTC.

```googlesql
SELECT *
FROM
  `myproject`.mydataset.INFORMATION_SCHEMA.TABLE_SNAPSHOTS;
```

The result is similar to the following:

```text
+----------------+---------------+-----------------+--------------------+-------------------+-----------------+-----------------------------+
| table_catalog  | table_schema  | table_name      | base_table_catalog | base_table_schema | base_table_name | snapshot_time               |
+----------------+---------------+-----------------+----------------------------------------------------------------------------------------+
| myproject      | mydataset     | mytablesnapshot | myProject          | mydataset         | mytable         | 2021-05-14 12:00:00.000 UTC |
+----------------+---------------+-----------------+--------------------+-------------------+-----------------+-----------------------------+
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/information-schema-snapshots (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the example value for `REGION` is `` `region-us` ``, but the view name on this page already has the prefix (`region-REGION`), so that value would produce `region-region-us`. The example value is changed to `us`.

## Related

- [Index of this directory](./README.md)
