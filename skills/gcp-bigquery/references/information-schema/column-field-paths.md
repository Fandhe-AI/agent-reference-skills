---
source: https://docs.cloud.google.com/bigquery/docs/information-schema-column-field-paths
---

# COLUMN_FIELD_PATHS view

## Signature / Usage

The `INFORMATION_SCHEMA.COLUMN_FIELD_PATHS` view contains one row for each
top-level column or column
[nested](https://docs.cloud.google.com/bigquery/docs/nested-repeated) within a `RECORD` (or `STRUCT`) column.

### Required permissions

To query the `INFORMATION_SCHEMA.COLUMN_FIELD_PATHS` view, you need the following
Identity and Access Management (IAM) permissions:

- `bigquery.tables.get`
- `bigquery.tables.list`

Each of the following predefined IAM roles includes the preceding
permissions:

- `roles/bigquery.admin`
- `roles/bigquery.dataViewer`
- `roles/bigquery.dataEditor`
- `roles/bigquery.metadataViewer`

For more information about BigQuery permissions, see
[Access control with IAM](https://docs.cloud.google.com/bigquery/docs/access-control).

### Schema

Query results contain one row for each top-level column or column
[nested](https://docs.cloud.google.com/bigquery/docs/nested-repeated) within a `RECORD` (or
`STRUCT`) column.

When you query the `INFORMATION_SCHEMA.COLUMN_FIELD_PATHS` view, the query
results contain one row for each column
[nested](https://docs.cloud.google.com/bigquery/docs/nested-repeated) within a `RECORD`
(or `STRUCT`) column.

The `INFORMATION_SCHEMA.COLUMN_FIELD_PATHS` view has the following schema:

| Column name | Data type | Value |
|---|---|---|
| `table_catalog` | `STRING` | The project ID of the project that contains the dataset. |
| `table_schema` | `STRING` | The name of the dataset that contains the table also referred to as the `datasetId`. |
| `table_name` | `STRING` | The name of the table or view also referred to as the `tableId`. |
| `column_name` | `STRING` | The name of the top-level column. |
| `field_path` | `STRING` | The name of the top-level column or the path to the column [nested](https://docs.cloud.google.com/bigquery/docs/nested-repeated) within a `RECORD` or `STRUCT` column. |
| `data_type` | `STRING` | The column's GoogleSQL [data type](../googlesql-syntax/data-types.md). |
| `description` | `STRING` | The column's description. |
| `collation_name` | `STRING` | The name of the [collation specification](../googlesql-syntax/collation-concepts.md) if it exists; otherwise, `NULL`. If a `STRING`, `ARRAY<STRING>`, or `STRING` field in a `STRUCT` is passed in, the collation specification is returned if it exists; otherwise, `NULL` is returned. |
| `rounding_mode` | `STRING` | The mode of rounding that's used when applying precision and scale to parameterized `NUMERIC` or `BIGNUMERIC` values; otherwise, the value is `NULL`. |
| `data_policies.name` | `STRING` | The list of data policies that are attached to the column to control access and masking. This field is in ([Preview](https://cloud.google.com/products#product-launch-stages)). |
| `data_governance_tags` | `ARRAY<STRUCT>` | The list of [data governance tags](https://docs.cloud.google.com/bigquery/docs/tags#data-governance-tags) that are attached to the column or nested field to control access and masking. Each `STRUCT` contains the following `STRING` fields: - `key`: the namespaced tag key, in the format `PROJECT_ID/TAG_KEY` or `ORGANIZATION_ID/TAG_KEY`. - `value`: the short name of the tag value. |
| `policy_tags` | `ARRAY<STRING>` | The list of policy tags that are attached to the column. |

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
| ``[PROJECT_ID.]`region-REGION`.INFORMATION_SCHEMA.COLUMN_FIELD_PATHS`` | Project level | `REGION` |
| `[PROJECT_ID.]DATASET_ID.INFORMATION_SCHEMA.COLUMN_FIELD_PATHS` | Dataset level | Dataset location |

Replace the following:

- Optional: `PROJECT_ID`: the ID of your Google Cloud project. If not specified, the default project is used.
- `REGION`: any [dataset region name](https://docs.cloud.google.com/bigquery/docs/locations). For example, `us`.
- `DATASET_ID`: the ID of your dataset. For more information, see [Dataset qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#dataset_qualifier).

  <br />

  <br />

  > [!NOTE]
  > **Note:** You must use [a region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#region_qualifier) to query `INFORMATION_SCHEMA` views. The location of the query execution must match the region of the `INFORMATION_SCHEMA` view.

<br />

### Example

The following example retrieves metadata from the
`INFORMATION_SCHEMA.COLUMN_FIELD_PATHS` view for the `commits` table in the
[`github_repos` dataset](https://console.cloud.google.com/bigquery?p=bigquery-public-data&d=github_repos&page=dataset).
This dataset is part of the BigQuery
[public dataset program](https://cloud.google.com/public-datasets/).

Because the table you're querying is in another project, the
`bigquery-public-data` project, you add the project ID to the dataset in the
following format:
`` `project_id`.dataset.INFORMATION_SCHEMA.view ``;
for example,
`` `bigquery-public-data`.github_repos.INFORMATION_SCHEMA.COLUMN_FIELD_PATHS ``.

The `commits` table contains the following nested and repeated
columns:

- `author`: nested `RECORD` column
- `committer`: nested `RECORD` column
- `trailer`: nested and repeated `RECORD` column
- `difference`: nested and repeated `RECORD` column

To view metadata about the `author` and `difference` columns, run the following query.

> [!NOTE]
> **Note:** `INFORMATION_SCHEMA` view names are case-sensitive.

```googlesql
SELECT
  *
FROM
  `bigquery-public-data`.github_repos.INFORMATION_SCHEMA.COLUMN_FIELD_PATHS
WHERE
  table_name = 'commits'
  AND (column_name = 'author' OR column_name = 'difference');
```

The result is similar to the following. For readability, some columns
are excluded from the result.

<br />

```text
  +------------+-------------+---------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------+-------------+-------------+
  | table_name | column_name |     field_path      |                                                                      data_type                                                                      | description | policy_tags |
  +------------+-------------+---------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------+-------------+-------------+
  | commits    | author      | author              | STRUCT<name STRING, email STRING, time_sec INT64, tz_offset INT64, date TIMESTAMP>                                                                  | NULL        | 0 rows      |
  | commits    | author      | author.name         | STRING                                                                                                                                              | NULL        | 0 rows      |
  | commits    | author      | author.email        | STRING                                                                                                                                              | NULL        | 0 rows      |
  | commits    | author      | author.time_sec     | INT64                                                                                                                                               | NULL        | 0 rows      |
  | commits    | author      | author.tz_offset    | INT64                                                                                                                                               | NULL        | 0 rows      |
  | commits    | author      | author.date         | TIMESTAMP                                                                                                                                           | NULL        | 0 rows      |
  | commits    | difference  | difference          | ARRAY<STRUCT<old_mode INT64, new_mode INT64, old_path STRING, new_path STRING, old_sha1 STRING, new_sha1 STRING, old_repo STRING, new_repo STRING>> | NULL        | 0 rows      |
  | commits    | difference  | difference.old_mode | INT64                                                                                                                                               | NULL        | 0 rows      |
  | commits    | difference  | difference.new_mode | INT64                                                                                                                                               | NULL        | 0 rows      |
  | commits    | difference  | difference.old_path | STRING                                                                                                                                              | NULL        | 0 rows      |
  | commits    | difference  | difference.new_path | STRING                                                                                                                                              | NULL        | 0 rows      |
  | commits    | difference  | difference.old_sha1 | STRING                                                                                                                                              | NULL        | 0 rows      |
  | commits    | difference  | difference.new_sha1 | STRING                                                                                                                                              | NULL        | 0 rows      |
  | commits    | difference  | difference.old_repo | STRING                                                                                                                                              | NULL        | 0 rows      |
  | commits    | difference  | difference.new_repo | STRING                                                                                                                                              | NULL        | 0 rows      |
  +------------+-------------+---------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------+-------------+-------------+

```

<br />

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/information-schema-column-field-paths (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the example value for `REGION` is `` `region-us` ``, but the view name on this page already has the prefix (`region-REGION`), so that value would produce `region-region-us`. The example value is changed to `us`.

## Related

- [Index of this directory](./README.md)
