---
source: https://docs.cloud.google.com/bigquery/docs/information-schema-index-options
---

# SEARCH_INDEX_OPTIONS view

## Signature / Usage

The `INFORMATION_SCHEMA.SEARCH_INDEX_OPTIONS` view contains one row for each
search index option in a dataset.

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

When you query the `INFORMATION_SCHEMA.SEARCH_INDEX_OPTIONS` view, the query results contain one row for each search index option in a dataset.

<br />

The `INFORMATION_SCHEMA.SEARCH_INDEX_OPTIONS` view has the following schema:

| Column name | Data type | Value |
|---|---|---|
| `index_catalog` | `STRING` | The name of the project that contains the dataset. |
| `index_schema` | `STRING` | The name of the dataset that contains the index. |
| `table_name` | `STRING` | The name of the base table that the index is created on. |
| `index_name` | `STRING` | The name of the index. |
| `option_name` | `STRING` | The name of the option, which can be one of the following: `analyzer`, `analyzer_options`, `data_types`, or `default_index_column_granularity`. |
| `option_type` | `STRING` | The type of the option. |
| `option_value` | `STRING` | The value of the option. |

> [!NOTE]
> **Note:** If a search index option is not specified, a row containing the default search index option is produced by a query. The `analyzer` and `data_types` options are always populated in the `SEARCH_INDEX_OPTIONS` view regardless of whether they are specified in the DDL or not. If not specified, the default `LOG_ANALYZER` and `["STRING"]` values are respectively produced. Other options are populated in the `SEARCH_INDEX_OPTIONS` view only when they're specified in `CREATE SEARCH INDEX DDL`.

For stability, we recommend that you explicitly list columns in your information schema queries instead of
using a wildcard (`SELECT *`). Explicitly listing columns prevents queries from
breaking if the underlying schema changes.

### Scope and syntax

Queries against this view must have a [dataset qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#syntax). The
following table explains the region scope for this view:

| View Name | Resource scope | Region scope |
|---|---|---|
| `[PROJECT_ID.]DATASET_ID.INFORMATION_SCHEMA.SEARCH_INDEX_OPTIONS` | Dataset level | Dataset location |

Replace the following:

- Optional: `PROJECT_ID`: the ID of your Google Cloud project. If not specified, the default project is used.
- `DATASET_ID`: the ID of your dataset. For more information, see [Dataset qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#dataset_qualifier).

<br />

**Example**

```sql
-- Returns metadata for search index options in a single dataset.
SELECT * FROM myDataset.INFORMATION_SCHEMA.SEARCH_INDEX_OPTIONS;
```

### Example

The following example creates three search index options for columns of
`table1` and then extracts those options from fields that are indexed:

```googlesql
CREATE SEARCH INDEX myIndex ON `mydataset.table1` (ALL COLUMNS) OPTIONS (
  analyzer = 'LOG_ANALYZER',
  analyzer_options = '{ "delimiters" : [".", "-"] }',
  data_types = ['STRING', 'INT64', 'TIMESTAMP']
);

SELECT index_name, option_name, option_type, option_value
FROM mydataset.INFORMATION_SCHEMA.SEARCH_INDEX_OPTIONS
WHERE table_name='table1';
```

The result is similar to the following:

```text
+------------+------------------+---------------+----------------------------------+
| index_name |  option_name     | option_type   | option_value                     |
+------------+------------------+---------------+----------------------------------+
| myIndex    | analyzer         | STRING        | LOG_ANALYZER                     |
| myIndex    | analyzer_options | STRING        | { "delimiters": [".", "-"] }     |
| myIndex    | data_types       | ARRAY<STRING> | ["STRING", "INT64", "TIMESTAMP"] |
+------------+------------------+---------------+----------------------------------+
```

The following example creates one search index option for columns of `table1`
and then extracts those options from fields that are indexed. If an option
doesn't exist, the default option is produced:

```googlesql
CREATE SEARCH INDEX myIndex ON `mydataset.table1` (ALL COLUMNS) OPTIONS (
  analyzer = 'NO_OP_ANALYZER'
);

SELECT index_name, option_name, option_type, option_value
FROM mydataset.INFORMATION_SCHEMA.SEARCH_INDEX_OPTIONS
WHERE table_name='table1';
```

The result is similar to the following:

```text
+------------+------------------+---------------+----------------+
| index_name |  option_name     | option_type   | option_value   |
+------------+------------------+---------------+----------------+
| myIndex    | analyzer         | STRING        | NO_OP_ANALYZER |
| myIndex    | data_types       | ARRAY<STRING> | ["STRING"]     |
+------------+------------------+---------------+----------------+
```

The following example creates no search index options for columns of `table1`
and then extracts the default options from fields that are indexed:

```googlesql
CREATE SEARCH INDEX myIndex ON `mydataset.table1` (ALL COLUMNS);

SELECT index_name, option_name, option_type, option_value
FROM mydataset.INFORMATION_SCHEMA.SEARCH_INDEX_OPTIONS
WHERE table_name='table1';
```

The result is similar to the following:

```text
+------------+------------------+---------------+----------------+
| index_name |  option_name     | option_type   | option_value   |
+------------+------------------+---------------+----------------+
| myIndex    | analyzer         | STRING        | LOG_ANALYZER   |
| myIndex    | data_types       | ARRAY<STRING> | ["STRING"]     |
+------------+------------------+---------------+----------------+
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/information-schema-index-options (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
