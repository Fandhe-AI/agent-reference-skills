---
source: https://docs.cloud.google.com/bigquery/docs/information-schema-parameters
---

# PARAMETERS view

## Signature / Usage

The `INFORMATION_SCHEMA.PARAMETERS` view contains one row for each parameter of
each routine in a dataset.

### Required permissions

To query the `INFORMATION_SCHEMA.PARAMETERS` view, you need the following
Identity and Access Management (IAM) permissions:

- `bigquery.routines.get`
- `bigquery.routines.list`

Each of the following predefined IAM roles includes the
permissions that you need to get routine metadata:

- `roles/bigquery.admin`
- `roles/bigquery.metadataViewer`
- `roles/bigquery.dataViewer`

For more information about BigQuery permissions, see
[Access control with IAM](https://docs.cloud.google.com/bigquery/docs/access-control).

### Schema

When you query the `INFORMATION_SCHEMA.PARAMETERS` view, the query results
contain one row for each parameter of each routine in a dataset.

The `INFORMATION_SCHEMA.PARAMETERS` view has the following schema:

| Column name | Data type | Value |
|---|---|---|
| `specific_catalog` | `STRING` | The name of the project that contains the dataset in which the routine containing the parameter is defined |
| `specific_schema` | `STRING` | The name of the dataset that contains the routine in which the parameter is defined |
| `specific_name` | `STRING` | The name of the routine in which the parameter is defined |
| `ordinal_position` | `INT64` | The 1-based position of the parameter, or 0 for the return value |
| `parameter_mode` | `STRING` | The mode of the parameter, either `IN`, `OUT`, `INOUT`, or `NULL` |
| `is_result` | `STRING` | Whether the parameter is the result of the function, either `YES` or `NO` |
| `parameter_name` | `STRING` | The name of the parameter |
| `data_type` | `STRING` | The type of the parameter, will be `ANY TYPE` if defined as an any type |
| `parameter_default` | `STRING` | The default value of the parameter as a SQL literal value, always `NULL` |
| `is_aggregate` | `STRING` | Whether this is an aggregate parameter, always `NULL` |

For stability, we recommend that you explicitly list columns in your information schema queries instead of
using a wildcard (`SELECT *`). Explicitly listing columns prevents queries from
breaking if the underlying schema changes.

### Scope and syntax

Queries against this view must include a dataset or a region qualifier. For more
information see [Syntax](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#syntax).
The following table explains the region and resource scopes for this view:

| View name | Resource scope | Region scope |
|---|---|---|
| ``[PROJECT_ID.]`region-REGION`.INFORMATION_SCHEMA.PARAMETERS`` | Project level | `REGION` |
| `[PROJECT_ID.]DATASET_ID.INFORMATION_SCHEMA.PARAMETERS` | Dataset level | Dataset location |

Replace the following:

- Optional: `PROJECT_ID`: the ID of your Google Cloud project. If not specified, the default project is used.
- `REGION`: any [dataset region name](https://docs.cloud.google.com/bigquery/docs/locations). For example, `` `region-us` ``.
- `DATASET_ID`: the ID of your dataset. For more information, see [Dataset qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#dataset_qualifier).

  <br />

  <br />

  > [!NOTE]
  > **Note:** You must use [a region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#region_qualifier) to query `INFORMATION_SCHEMA` views. The location of the query execution must match the region of the `INFORMATION_SCHEMA` view.

<br />

**Example**

```sql
-- Returns metadata for parameters of a routine in a single dataset.
SELECT * FROM myDataset.INFORMATION_SCHEMA.PARAMETERS;

-- Returns metadata for parameters of a routine in a region.
SELECT * FROM region-us.INFORMATION_SCHEMA.PARAMETERS;
```

### Example

##### Example

To run the query against a dataset in a project other than your default project,
add the project ID in the following format:

```bash
`PROJECT_ID`.`DATASET_ID`.INFORMATION_SCHEMA.PARAMETERS
```
Replace the following:

<br />

- `PROJECT_ID`: the ID of the project.
- `DATASET_ID`: the ID of the dataset.

For example, `example-project.mydataset.INFORMATION_SCHEMA.PARAMETERS`.

The following example retrieves all parameters from the
`INFORMATION_SCHEMA.PARAMETERS` view. The metadata returned is for routines in
`mydataset` in your default project --- `myproject`.

Adapted (not in the official docs): The `EXCEPT(is_typed)` and `WHERE table_type = 'BASE TABLE'` parts are removed because the PARAMETERS view has no such columns.

```googlesql
SELECT
  *
FROM
  mydataset.INFORMATION_SCHEMA.PARAMETERS;
```

> [!NOTE]
> **Note:** `INFORMATION_SCHEMA` view names are case-sensitive.

The result is similar to the following:

```text
+-------------------+------------------+---------------+------------------+----------------+-----------+----------------+-----------+-------------------+--------------+
| specific_catalog  | specific_schema  | specific_name | ordinal_position | parameter_mode | is_result | parameter_name | data_type | parameter_default | is_aggregate |
+-------------------+------------------+---------------+------------------+----------------+-----------+----------------+-----------+-------------------+--------------+
| myproject         | mydataset        | myroutine1    | 0                | NULL           | YES       | NULL           | INT64     | NULL              | NULL         |
| myproject         | mydataset        | myroutine1    | 1                | NULL           | NO        | x              | INT64     | NULL              | NULL         |
+-------------------+------------------+---------------+------------------+----------------+-----------+----------------+-----------+-------------------+--------------+
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/information-schema-parameters (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: The example used `* EXCEPT(is_typed)` and `table_type = 'BASE TABLE'`, but the PARAMETERS schema on this page has no `is_typed` or `table_type` column, and the shown result has all ten columns. The query now selects all columns without a filter.
- Corrected from the official docs: the example of a fully qualified name for querying another project names `example-project.mydataset.INFORMATION_SCHEMA.JOBS_BY_PROJECT`. This page is about the `PARAMETERS` view, and the format given just above it is `PROJECT_ID`.`DATASET_ID`.INFORMATION_SCHEMA.PARAMETERS, so the example is changed to `example-project.mydataset.INFORMATION_SCHEMA.PARAMETERS`.

## Related

- [Index of this directory](./README.md)
