---
source: https://docs.cloud.google.com/bigquery/docs/information-schema-index-column-options
---

# SEARCH_INDEX_COLUMN_OPTIONS view

## Signature / Usage

The `INFORMATION_SCHEMA.SEARCH_INDEX_COLUMN_OPTIONS` view contains one row for
each option set on a search-indexed column in the tables in a dataset.

### Required permissions

To see [search index](https://docs.cloud.google.com/bigquery/docs/search-index) metadata, you need the
`bigquery.tables.get` or `bigquery.tables.list` Identity and Access Management (IAM)
permission on the table with the index. Each of the following predefined
IAM roles includes at least one of these permissions:

- `roles/bigquery.admin`
- `roles/bigquery.dataEditor`
- `roles/bigquery.dataOwner`
- `roles/bigquery.dataViewer`
- `roles/bigquery.metadataViewer`
- `roles/bigquery.user`

For more information about BigQuery permissions, see
[Access control with IAM](https://docs.cloud.google.com/bigquery/docs/access-control).

### Schema

When you query the `INFORMATION_SCHEMA.SEARCH_INDEX_COLUMN_OPTIONS` view, the query results contain one row for each option set on a search-indexed column in the tables in a dataset.

<br />

The `INFORMATION_SCHEMA.SEARCH_INDEX_COLUMN_OPTIONS` view has the following
schema:

| Column name | Data type | Value |
|---|---|---|
| `index_catalog` | `STRING` | The name of the project that contains the dataset. |
| `index_schema` | `STRING` | The name of the dataset that contains the index. |
| `table_name` | `STRING` | The name of the base table that the index is created on. |
| `index_name` | `STRING` | The name of the index. |
| `index_column_name` | `STRING` | The name of the indexed column that the option is set on. |
| `option_name` | `STRING` | The name of the option specified on the column. |
| `option_type` | `STRING` | The type of the option. |
| `option_value` | `STRING` | The value of the option. |

For stability, we recommend that you explicitly list columns in your information schema queries instead of
using a wildcard (`SELECT *`). Explicitly listing columns prevents queries from
breaking if the underlying schema changes.

### Scope and syntax

Queries against this view must have a [dataset qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#syntax). The
following table explains the region scope for this view:

| View Name | Resource scope | Region scope |
|---|---|---|
| `[PROJECT_ID.]DATASET_ID.INFORMATION_SCHEMA.SEARCH_INDEX_COLUMN_OPTIONS` | Dataset level | Dataset location |

Replace the following:

- Optional: `PROJECT_ID`: the ID of your Google Cloud project. If not specified, the default project is used.
- `DATASET_ID`: the ID of your dataset. For more information, see [Dataset qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#dataset_qualifier).

<br />

**Example**

```sql
-- Returns metadata for search index column options in a single dataset.
SELECT * FROM myDataset.INFORMATION_SCHEMA.SEARCH_INDEX_COLUMN_OPTIONS;
```

### Example

The following example sets the default index column granularity to `COLUMN`, and
individually sets the granularity for `col2` and `col3` to `GLOBAL` and `COLUMN`
respectively. In this example, columns `col2` and `col3` appear in the results
because their granularity is set explicitly. The granularity for column
`col1` is not shown because it uses the default granularity.

```sql
CREATE SEARCH INDEX index1 ON `mydataset.table1` (
  ALL COLUMNS WITH COLUMN OPTIONS (
    col2 OPTIONS(index_granularity = 'GLOBAL'),
    col3 OPTIONS(index_granularity = 'COLUMN')
  )
)
OPTIONS(
  default_index_column_granularity = 'COLUMN'
);

SELECT
  index_column_name, option_name, option_type, option_value
FROM
  mydataset.INFORMATION_SCHEMA.SEARCH_INDEX_COLUMN_OPTIONS
WHERE
  index_schema = 'mydataset' AND index_name = 'index1' AND table_name = 'table1';
```

The result is similar to the following:

```text
+-------------------+-------------------+---------------+--------------+
| index_column_name |  option_name      | option_type   | option_value |
+-------------------+-------------------+---------------+--------------+
| col2              | index_granularity | STRING        | GLOBAL       |
| col3              | index_granularity | STRING        | COLUMN       |
+-------------------+-------------------+---------------+--------------+
```

The following equivalent example, which doesn't use `ALL COLUMNS`, sets the
default index column granularity to
`COLUMN` and individually sets the granularity for two columns to `GLOBAL` and
`COLUMN` respectively:

```sql
CREATE SEARCH INDEX index1 ON `mydataset.table1` (
  col1,
  col2 OPTIONS(index_granularity = 'GLOBAL'),
  col3 OPTIONS(index_granularity = 'COLUMN')
)
OPTIONS(
  default_index_column_granularity = 'COLUMN'
);

SELECT
  index_column_name, option_name, option_type, option_value
FROM
  mydataset.INFORMATION_SCHEMA.SEARCH_INDEX_COLUMN_OPTIONS
WHERE
  index_schema = 'mydataset' AND index_name = 'index1' AND table_name = 'table1';
```

The result is similar to the following:

```text
+-------------------+-------------------+---------------+--------------+
| index_column_name |  option_name      | option_type   | option_value |
+-------------------+-------------------+---------------+--------------+
| col2              | index_granularity | STRING        | GLOBAL       |
| col3              | index_granularity | STRING        | COLUMN       |
+-------------------+-------------------+---------------+--------------+
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/information-schema-index-column-options (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
