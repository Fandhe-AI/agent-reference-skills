---
source: https://docs.cloud.google.com/bigquery/docs/information-schema-vector-index-options
---

# VECTOR_INDEX_OPTIONS view

## Signature / Usage

The `INFORMATION_SCHEMA.VECTOR_INDEX_OPTIONS` view contains one row for each vector index option in a dataset.

### Required permissions

To see [vector index](https://docs.cloud.google.com/bigquery/docs/vector-index) metadata, you need the
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

When you query the `INFORMATION_SCHEMA.VECTOR_INDEX_OPTIONS` view, the query results contain one row for each vector index option in a dataset

<br />

The `INFORMATION_SCHEMA.VECTOR_INDEX_OPTIONS` view has the following schema:

| Column name | Data type | Value |
|---|---|---|
| `index_catalog` | `STRING` | The name of the project that contains the dataset. |
| `index_schema` | `STRING` | The name of the dataset that contains the vector index. |
| `table_name` | `STRING` | The name of the table that the vector index is created on. |
| `index_name` | `STRING` | The name of the vector index. |
| `option_name` | `STRING` | The name of the option used in the data definition language statement (DDL) to create the vector index. |
| `option_type` | `STRING` | The option data type. |
| `option_value` | `STRING` | The option value. |

For stability, we recommend that you explicitly list columns in your information schema queries instead of
using a wildcard (`SELECT *`). Explicitly listing columns prevents queries from
breaking if the underlying schema changes.

### Scope and syntax

Queries against this view must have a [dataset qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#syntax). The
following table explains the region scope for this view:

| View Name | Resource scope | Region scope |
|---|---|---|
| `[PROJECT_ID.]DATASET_ID.INFORMATION_SCHEMA.VECTOR_INDEX_OPTIONS` | Dataset level | Dataset location |

<br />

Replace the following:

- Optional: `PROJECT_ID`: the ID of your Google Cloud project. If not specified, the default project is used.
- `DATASET_ID`: the ID of your dataset. For more information, see [Dataset qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#dataset_qualifier).

  <br />

  <br />

  > [!NOTE]
  > **Note:** You must use [a region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#region_qualifier) to query `INFORMATION_SCHEMA` views. The location of the query execution must match the region of the `INFORMATION_SCHEMA` view.

<br />

**Example**

```sql
-- Returns metadata for vector indexes in a single dataset.
SELECT * FROM myDataset.INFORMATION_SCHEMA.VECTOR_INDEX_OPTIONS;
```

### Examples

The following query extracts information on vector index options:

```googlesql
SELECT table_name, index_name, option_name, option_type, option_value
FROM my_project.dataset.INFORMATION_SCHEMA.VECTOR_INDEX_OPTIONS;
```

The result is similar to the following:

```text
+------------+------------+------------------+------------------+-------------------------------------------------------------------+
| table_name | index_name | option_name      | option_type      | option_value                                                      |
+------------+------------+------------------+------------------+-------------------------------------------------------------------+
| table1     | indexa     | index_type       | STRING           | IVF                                                               |
| table1     | indexa     | distance_type    | STRING           | EUCLIDEAN                                                         |
| table1     | indexa     | ivf_options      | STRING           | {"num_lists": 100}                                                |
| table2     | indexb     | index_type       | STRING           | IVF                                                               |
| table2     | indexb     | distance_type    | STRING           | COSINE                                                            |
| table2     | indexb     | ivf_options      | STRING           | {"num_lists": 500}                                                |
| table3     | indexc     | index_type       | STRING           | TREE_AH                                                           |
| table3     | indexc     | distance_type    | STRING           | DOT_PRODUCT                                                       |
| table3     | indexc     | tree_ah_options  | STRING           | {"leaf_node_embedding_count": 1000, "normalization_type": "NONE"} |
+------------+------------+------------------+------------------+-------------------------------------------------------------------+
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/information-schema-vector-index-options (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Conflicting official statements: the note on this page says that you must use a region qualifier to query `INFORMATION_SCHEMA` views. The Scope and syntax table on this page also lists the dataset-level form `[PROJECT_ID.]DATASET_ID.INFORMATION_SCHEMA.VECTOR_INDEX_OPTIONS`, whose region scope is the dataset location. The table lists no region-level form for this view, so a region qualifier can't be used here. Query the dataset-level form with a dataset qualifier, and run the query in the location of the dataset.

## Related

- [Index of this directory](./README.md)
