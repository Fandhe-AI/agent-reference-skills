---
source: https://docs.cloud.google.com/bigquery/docs/information-schema-vector-indexes
---

# VECTOR_INDEXES view

## Signature / Usage

The `INFORMATION_SCHEMA.VECTOR_INDEXES` view contains one row for each vector
index in a dataset.

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

When you query the `INFORMATION_SCHEMA.VECTOR_INDEXES` view, the query results contain one row for each vector index in a dataset.

<br />

The `INFORMATION_SCHEMA.VECTOR_INDEXES` view has the following schema:

| Column name | Data type | Value |
|---|---|---|
| `index_catalog` | `STRING` | The name of the project that contains the dataset. |
| `index_schema` | `STRING` | The name of the dataset that contains the index. |
| `table_name` | `STRING` | The name of the table that the index is created on. |
| `index_name` | `STRING` | The name of the vector index. |
| `index_status` | `STRING` | The status of the index: `ACTIVE`, `PENDING DISABLEMENT`, `TEMPORARILY DISABLED`, or `PERMANENTLY DISABLED`. - `ACTIVE` means that the index is usable or being created. Refer to the `coverage_percentage ` to see the progress of index creation. - `PENDING DISABLEMENT` means that the total size of indexed tables exceeds your organization's [limit](https://docs.cloud.google.com/bigquery/quotas#index_limits); the index is queued for deletion. While in this state, the index is usable in vector search queries and you are charged for the vector index storage. - `TEMPORARILY DISABLED` means that either the total size of indexed tables exceeds your organization's [limit](https://docs.cloud.google.com/bigquery/quotas#index_limits), or the indexed table is smaller than 10 MB. While in this state, the index isn't used in vector search queries and you aren't charged for the vector index storage. - `PERMANENTLY DISABLED` means that there is an incompatible schema change on the indexed table. |
| `creation_time` | `TIMESTAMP` | The time the index was created. |
| `last_modification_time` | `TIMESTAMP` | The last time the index configuration was modified. For example, deleting an indexed column. |
| `last_refresh_time` | `TIMESTAMP` | The last time the table data was indexed. A `NULL` value means the index is not yet available. |
| `disable_time` | `TIMESTAMP` | The time the status of the index was set to `DISABLED`. The value is `NULL` if the index status is not `DISABLED`. |
| `disable_reason` | `STRING` | The reason the index was disabled. `NULL` if the index status is not `DISABLED`. |
| `DDL` | `STRING` | The data definition language (DDL) statement used to create the index. |
| `coverage_percentage` | `INTEGER` | The approximate percentage of table data that has been indexed. 0% means the index is not usable in a `VECTOR_SEARCH` query, even if some data has already been indexed. |
| `unindexed_row_count` | `INTEGER` | The number of rows in the table that have not been indexed. |
| `total_logical_bytes` | `INTEGER` | The number of billable logical bytes for the index. |
| `total_storage_bytes` | `INTEGER` | The number of billable storage bytes for the index. |
| `last_index_alteration_info` | `RECORD` | The details of the latest user-triggered index alteration, containing following fields: - `status`: a `STRING` value that indicates the alteration status. Possible values are `NULL` (complete), `IN_PROGRESS`, and `FAILED`. - `message`: a `STRUCT` field that contains the details of the `FAILED` status as an [ErrorProto](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/ErrorProto). The value is `NULL` for other statuses. - `new_coverage_percentage`: an `INT64` value that contains the approximate percentage of table data that has been indexed for the alteration. - `start_time`: the timestamp when the alteration was initiated. - `end_time`: the timestamp when the alteration enters the `FAILED` status. - `ddl`: the data definition language (DDL) statement used to alter the index. |
| `last_model_build_time` | `TIMESTAMP` | The start time of the last index model build. |

For stability, we recommend that you explicitly list columns in your information schema queries instead of
using a wildcard (`SELECT *`). Explicitly listing columns prevents queries from
breaking if the underlying schema changes.

### Scope and syntax

Queries against this view must have a [dataset qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#syntax). The
following table explains the region scope for this view:

| View Name | Resource scope | Region scope |
|---|---|---|
| `[PROJECT_ID.]DATASET_ID.INFORMATION_SCHEMA.VECTOR_INDEXES` | Dataset level | Dataset location |

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
SELECT * FROM myDataset.INFORMATION_SCHEMA.VECTOR_INDEXES;
```

### Example

The following example shows all active vector indexes on tables in the dataset
`my_dataset`, located in the project `my_project`. It includes their names, the
DDL statements used to create them, and their coverage percentage. If an
indexed base table is less than 10 MB, then its index is not populated, in
which case the `coverage_percentage` value is 0.

```googlesql
SELECT table_name, index_name, ddl, coverage_percentage
FROM my_project.my_dataset.INFORMATION_SCHEMA.VECTOR_INDEXES
WHERE index_status = 'ACTIVE';
```

The result is similar to the following:

```text
+------------+------------+-------------------------------------------------------------------------------------------------+---------------------+
| table_name | index_name | ddl                                                                                             | coverage_percentage |
+------------+------------+-------------------------------------------------------------------------------------------------+---------------------+
| table1     | indexa     | CREATE VECTOR INDEX `indexa` ON `my_project.my_dataset.table1`(embeddings)                      | 100                 |
|            |            | OPTIONS (distance_type = 'EUCLIDEAN', index_type = 'IVF', ivf_options = '{"num_lists": 100}')   |                     |
+------------+------------+-------------------------------------------------------------------------------------------------+---------------------+
| table2     | indexb     | CREATE VECTOR INDEX `indexb` ON `my_project.my_dataset.table2`(vectors)                         | 42                  |
|            |            | OPTIONS (distance_type = 'COSINE', index_type = 'IVF', ivf_options = '{"num_lists": 500}')      |                     |
+------------+------------+-------------------------------------------------------------------------------------------------+---------------------+
| table3     | indexc     | CREATE VECTOR INDEX `indexc` ON `my_project.my_dataset.table3`(vectors)                         | 98                  |
|            |            | OPTIONS (distance_type = 'DOT_PRODUCT', index_type = 'TREE_AH',                                 |                     |
|            |            |          tree_ah_options = '{"leaf_node_embedding_count": 1000, "normalization_type": "NONE"}') |                     |
+------------+------------+-------------------------------------------------------------------------------------------------+---------------------+
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/information-schema-vector-indexes (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
