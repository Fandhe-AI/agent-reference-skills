---
source: https://docs.cloud.google.com/bigquery/docs/information-schema-views
---

# VIEWS view

## Signature / Usage

The `INFORMATION_SCHEMA.VIEWS` view contains metadata about views.

### Required permissions

To get view metadata, you need the following Identity and Access Management (IAM)
permissions:

- `bigquery.tables.get`
- `bigquery.tables.list`

Each of the following predefined IAM roles includes the
permissions that you need in order to get view metadata:

- `roles/bigquery.admin`
- `roles/bigquery.dataEditor`
- `roles/bigquery.metadataViewer`
- `roles/bigquery.dataViewer`

For more information about BigQuery permissions, see
[Access control with IAM](https://docs.cloud.google.com/bigquery/docs/access-control).

### Schema

When you query the `INFORMATION_SCHEMA.VIEWS` view, the query results contain
one row for each view in a dataset.

The `INFORMATION_SCHEMA.VIEWS` view has the following schema:

| Column name | Data type | Value |
|---|---|---|
| `table_catalog` | `STRING` | The name of the project that contains the dataset |
| `table_schema` | `STRING` | The name of the dataset that contains the view also referred to as the dataset `id` |
| `table_name` | `STRING` | The name of the view also referred to as the table `id` |
| `view_definition` | `STRING` | The SQL query that defines the view |
| `check_option` | `STRING` | The value returned is always `NULL` |
| `use_standard_sql` | `STRING` | `YES` if the view was created by using a GoogleSQL query; `NO` if `useLegacySql` is set to `true` |

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
| ``[PROJECT_ID.]`region-REGION`.INFORMATION_SCHEMA.VIEWS`` | Project level | `REGION` |
| `[PROJECT_ID.]DATASET_ID.INFORMATION_SCHEMA.VIEWS` | Dataset level | Dataset location |

Replace the following:

- Optional: `PROJECT_ID`: the ID of your Google Cloud project. If not specified, the default project is used.
- `REGION`: any [dataset region name](https://docs.cloud.google.com/bigquery/docs/locations). For example, `us`.
- `DATASET_ID`: the ID of your dataset. For more information, see [Dataset qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#dataset_qualifier).

  <br />

  <br />

  > [!NOTE]
  > **Note:** You must use [a region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#region_qualifier) to query `INFORMATION_SCHEMA` views. The location of the query execution must match the region of the `INFORMATION_SCHEMA` view.

<br />

For example:

```sql
-- Returns metadata for views in a single dataset.
SELECT * FROM myDataset.INFORMATION_SCHEMA.VIEWS;

-- Returns metadata for all views in a region.
SELECT * FROM region-us.INFORMATION_SCHEMA.VIEWS;
```

### Examples

###### Example 1:

The following example retrieves all columns from the `INFORMATION_SCHEMA.VIEWS`
view except for `check_option` which is reserved for future use. The metadata
returned is for all views in `mydataset` in your default project ---
`myproject`.

To run the query against a project other than your default project, add the
project ID to the dataset in the following format:
`` `project_id`.dataset.INFORMATION_SCHEMA.view ``;
for example, `` `myproject`.mydataset.INFORMATION_SCHEMA.VIEWS ``.

```googlesql
SELECT
  * EXCEPT (check_option)
FROM
  mydataset.INFORMATION_SCHEMA.VIEWS;
```

> [!NOTE]
> **Note:** `INFORMATION_SCHEMA` view names are case-sensitive.

The result is similar to the following:

<br />

```text
  +----------------+---------------+---------------+---------------------------------------------------------------------+------------------+
  | table_catalog  | table_schema  |  table_name   |                        view_definition                              | use_standard_sql |
  +----------------+---------------+---------------+---------------------------------------------------------------------+------------------+
  | myproject      | mydataset     | myview        | SELECT column1, column2 FROM [myproject:mydataset.mytable] LIMIT 10 | NO               |
  +----------------+---------------+---------------+---------------------------------------------------------------------+------------------+

```

<br />

Note that the results show that this view was created by using a legacy SQL
query.

###### Example 2:

The following example retrieves the SQL query and query syntax used to define
`myview` in `mydataset` in your default project --- `myproject`.

To run the query against a project other than your default project, add the
project ID to the dataset in the following format:
`` `project_id`.dataset.INFORMATION_SCHEMA.view ``;
for example, `` `myproject`.mydataset.INFORMATION_SCHEMA.VIEWS ``.

```googlesql
SELECT
  table_name, view_definition, use_standard_sql
FROM
  mydataset.INFORMATION_SCHEMA.VIEWS
WHERE
  table_name = 'myview';
```

> [!NOTE]
> **Note:** `INFORMATION_SCHEMA` view names are case-sensitive.

The result is similar to the following:

<br />

```text
  +---------------+---------------------------------------------------------------+------------------+
  |  table_name   |                        view_definition                        | use_standard_sql |
  +---------------+---------------------------------------------------------------+------------------+
  | myview        | SELECT column1, column2, column3 FROM mydataset.mytable       | YES              |
  +---------------+---------------------------------------------------------------+------------------+

```
      
<br />

Note that the results show that this view was created by using a
GoogleSQL query.

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/information-schema-views (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the example value for `REGION` is `` `region-us` ``, but the view name on this page already has the prefix (`region-REGION`), so that value would produce `region-region-us`. The example value is changed to `us`.

## Related

- [Index of this directory](./README.md)
