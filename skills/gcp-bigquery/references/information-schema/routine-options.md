---
source: https://docs.cloud.google.com/bigquery/docs/information-schema-routine-options
---

# ROUTINE_OPTIONS view

## Signature / Usage

The `INFORMATION_SCHEMA.ROUTINE_OPTIONS` view contains one row for each option
of each routine in a dataset.

### Required permissions

To query the `INFORMATION_SCHEMA.ROUTINE_OPTIONS` view, you need the following
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

When you query the `INFORMATION_SCHEMA.ROUTINE_OPTIONS` view, the query results
contain one row for each option of each routine in a dataset.

The `INFORMATION_SCHEMA.ROUTINE_OPTIONS` view has the following schema:

| Column name | Data type | Value |
|---|---|---|
| `specific_catalog` | `STRING` | The name of the project that contains the routine where the option is defined |
| `specific_schema` | `STRING` | The name of the dataset that contains the routine where the option is defined |
| `specific_name` | `STRING` | The name of the routine |
| `option_name` | `STRING` | One of the name values in the [options table](#options-table) |
| `option_type` | `STRING` | One of the data type values in the [options table](#options-table) |
| `option_value` | `STRING` | One of the value options in the [options table](#options-table) |

###### Options table

| `OPTION_NAME` | `OPTION_TYPE` | `OPTION_VALUE` |
|---|---|---|
| `description` | `STRING` | The description of the routine, if defined |
| `library` | `ARRAY<STRING>` | The names of the libraries referenced in the routine. Only applicable to JavaScript UDFs |
| `data_governance_type` | `DataGovernanceType<STRING>` | The name of supported data governance type. For example, `DATA_MASKING`. |

For stability, we recommend that you explicitly list columns in your information schema queries instead of
using a wildcard (`SELECT *`). Explicitly listing columns prevents queries from
breaking if the underlying schema changes.

### Scope and syntax

Queries against this view must include a dataset or a region qualifier. For more
information see [Syntax](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#syntax).
The following table explains the region and resource scopes for this view:

| View name | Resource scope | Region scope |
|---|---|---|
| ``[PROJECT_ID.]`region-REGION`.INFORMATION_SCHEMA.ROUTINE_OPTIONS`` | Project level | `REGION` |
| `[PROJECT_ID.]DATASET_ID.INFORMATION_SCHEMA.ROUTINE_OPTIONS` | Dataset level | Dataset location |

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
SELECT * FROM myDataset.INFORMATION_SCHEMA.ROUTINE_OPTIONS;

-- Returns metadata for routines in a region.
SELECT * FROM region-us.INFORMATION_SCHEMA.ROUTINE_OPTIONS;
```

### Example

###### Example 1:

The following example retrieves the routine options for all
routines in `mydataset` in your default project (`myproject`) by querying the
`INFORMATION_SCHEMA.ROUTINE_OPTIONS` view:

```googlesql
SELECT
  *
FROM
  mydataset.INFORMATION_SCHEMA.ROUTINE_OPTIONS;
```

> [!NOTE]
> **Note:** `INFORMATION_SCHEMA` view names are case-sensitive.

The result is similar to the following:

```text
+-------------------+------------------+---------------+----------------------+---------------+------------------+
| specific_catalog  | specific_schema  | specific_name |     option_name      | option_type   | option_value     |
+-------------------+------------------+---------------+----------------------+---------------+------------------+
| myproject         | mydataset        | myroutine1    | description          | STRING        | "a description"  |
| myproject         | mydataset        | myroutine2    | library              | ARRAY<STRING> | ["a.js", "b.js"] |
+-------------------+------------------+---------------+----------------------+---------------+------------------+
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/information-schema-routine-options (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs (rendering): the page's HTML writes `ARRAY<STRING>` unescaped inside `<code>`, so the rendered page and its Markdown twin show `ARRAY`; the type is restored from the HTML source. (`library`)
- Corrected from the official docs (rendering): the page's HTML writes `DataGovernanceType<STRING>` unescaped inside `<code>`, so the rendered page and its Markdown twin show `DataGovernanceType`; the type is restored from the HTML source. (`data_governance_type`; the type name is as the source writes it)
- Corrected from the official docs: the example value for `REGION` is `` `region-us` ``, but the view name on this page already has the prefix (`region-REGION`), so that value would produce `region-region-us`. The example value is changed to `us`.

## Related

- [Index of this directory](./README.md)
