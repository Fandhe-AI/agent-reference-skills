---
source: https://docs.cloud.google.com/bigquery/docs/information-schema-routines
---

# ROUTINES view

## Signature / Usage

The `INFORMATION_SCHEMA.ROUTINES` view contains one row for each routine in a
dataset.

### Required permissions

To query the `INFORMATION_SCHEMA.ROUTINES` view, you need the following
Identity and Access Management (IAM) permissions:

- `bigquery.routines.get`
- `bigquery.routines.list`

Each of the following predefined IAM roles includes the
permissions that you need in order to get routine metadata:

- `roles/bigquery.admin`
- `roles/bigquery.metadataViewer`
- `roles/bigquery.dataViewer`

For more information about BigQuery permissions, see
[Access control with IAM](https://docs.cloud.google.com/bigquery/docs/access-control).

### Schema

When you query the `INFORMATION_SCHEMA.ROUTINES` view, the query results contain
one row for each routine in a dataset.

The `INFORMATION_SCHEMA.ROUTINES` view has the following schema:

| Column name | Data type | Value |
|---|---|---|
| `specific_catalog` | `STRING` | The name of the project that contains the dataset where the routine is defined |
| `specific_schema` | `STRING` | The name of the dataset that contains the routine |
| `specific_name` | `STRING` | The name of the routine |
| `routine_catalog` | `STRING` | The name of the project that contains the dataset where the routine is defined |
| `routine_schema` | `STRING` | The name of the dataset that contains the routine |
| `routine_name` | `STRING` | The name of the routine |
| `routine_type` | `STRING` | The routine type: - `FUNCTION`: A BigQuery persistent user-defined function - `AGGREGATE FUNCTION`: A BigQuery persistent user-defined aggregate function - `PROCEDURE`: A BigQuery stored procedure - `TABLE FUNCTION`: A BigQuery table function |
| `data_type` | `STRING` | The data type that the routine returns. `NULL` if the routine is a stored procedure |
| `routine_body` | `STRING` | How the body of the routine is defined, either `SQL` or `EXTERNAL` if the routine is a JavaScript user-defined function |
| `routine_definition` | `STRING` | The definition of the routine |
| `external_language` | `STRING` | `JAVASCRIPT` if the routine is a JavaScript user-defined function or `NULL` if the routine was defined with SQL |
| `is_deterministic` | `STRING` | `YES` if the routine is known to be deterministic, `NO` if it is not, or `NULL` if unknown |
| `security_type` | `STRING` | Security type of the routine, always `NULL` |
| `created` | `TIMESTAMP` | The routine's creation time |
| `last_altered` | `TIMESTAMP` | The routine's last modification time |
| `ddl` | `STRING` | The [DDL statement](../googlesql-syntax/data-definition-language-1.md) that can be used to create the routine, such as [`CREATE FUNCTION`](../googlesql-syntax/data-definition-language-2.md#create-function-statement) or [`CREATE PROCEDURE`](../googlesql-syntax/data-definition-language-2.md#create-procedure-statement) |
| `connection` | `STRING` | The connection name, if the routine has one. Otherwise `NULL` |

For stability, we recommend that you explicitly list columns in your information schema queries instead of
using a wildcard (`SELECT *`). Explicitly listing columns prevents queries from
breaking if the underlying schema changes.

### Scope and syntax

Queries against this view must include a dataset or a region qualifier. For more
information see [Syntax](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#syntax).
The following table explains the region and resource scopes for this view:

| View name | Resource scope | Region scope |
|---|---|---|
| ``[PROJECT_ID.]`region-REGION`.INFORMATION_SCHEMA.ROUTINES`` | Project level | `REGION` |
| `[PROJECT_ID.]DATASET_ID.INFORMATION_SCHEMA.ROUTINES` | Dataset level | Dataset location |

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
-- Returns metadata for routines in a single dataset.
SELECT * FROM myDataset.INFORMATION_SCHEMA.ROUTINES;

-- Returns metadata for routines in a region.
SELECT * FROM region-us.INFORMATION_SCHEMA.ROUTINES;
```

### Example

##### Example

To run the query against a project other than your default project, add the
project ID to the dataset in the following format:

```bash
`PROJECT_ID`.INFORMATION_SCHEMA.ROUTINES
```
. For example, `` `myproject`.INFORMATION_SCHEMA.ROUTINES ``.

<br />

The following example retrieves all columns from the
`INFORMATION_SCHEMA.ROUTINES` view. The metadata returned is for all routines in
`mydataset` in your default project --- `myproject`. The dataset `mydataset`
contains a routine named `myroutine1`.

```googlesql
SELECT
  *
FROM
  mydataset.INFORMATION_SCHEMA.ROUTINES;
```

> [!NOTE]
> **Note:** `INFORMATION_SCHEMA` view names are case-sensitive.

The result is similar to the following:

```text
+------------------+-----------------+---------------+-----------------+----------------+--------------+--------------+-----------+--------------+--------------------+-------------------+------------------+---------------+-----------------------------+-----------------------------+-----------------------------------------------------------+
| specific_catalog | specific_schema | specific_name | routine_catalog | routine_schema | routine_name | routine_type | data_type | routine_body | routine_definition | external_language | is_deterministic | security_type |           created           |         last_altered        |                            ddl                             |
+------------------+-----------------+---------------+-----------------+----------------+--------------+--------------+-----------+--------------+--------------------+-------------------+------------------+---------------+-----------------------------+-----------------------------+-----------------------------------------------------------+
| myproject        | mydataset       | myroutine1    | myproject       | mydataset      | myroutine1   | FUNCTION     | NULL      | SQL          | x + 3              | NULL              | NULL             | NULL          | 2019-10-03 17:29:00.235 UTC | 2019-10-03 17:29:00.235 UTC | CREATE FUNCTION myproject.mydataset.myroutine1(x FLOAT64) |
|                  |                 |               |                 |                |              |              |           |              |                    |                   |                  |               |                             |                             | AS (                                                      |
|                  |                 |               |                 |                |              |              |           |              |                    |                   |                  |               |                             |                             | x + 3                                                     |
|                  |                 |               |                 |                |              |              |           |              |                    |                   |                  |               |                             |                             | );                                                        |
+------------------+-----------------+---------------+-----------------+----------------+--------------+--------------+-----------+--------------+--------------------+-------------------+------------------+---------------+-----------------------------+-----------------------------+-----------------------------------------------------------+
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/information-schema-routines (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the example value for `REGION` is `` `region-us` ``, but the view name on this page already has the prefix (`region-REGION`), so that value would produce `region-region-us`. The example value is changed to `us`.

## Related

- [Index of this directory](./README.md)
