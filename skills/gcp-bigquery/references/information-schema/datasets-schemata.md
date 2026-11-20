---
source: https://docs.cloud.google.com/bigquery/docs/information-schema-datasets-schemata
---

# SCHEMATA view

## Signature / Usage

The `INFORMATION_SCHEMA.SCHEMATA` view provides information about the datasets
in a project or region. The view returns one row for each dataset.

### Before you begin

To query the `SCHEMATA` view for dataset metadata, you need the `bigquery.datasets.get`
Identity and Access Management (IAM) permission at the project level.

Each of the following predefined IAM roles includes the
permissions that you need in order to get the `SCHEMATA`
view:

- `roles/bigquery.admin`
- `roles/bigquery.dataEditor`
- `roles/bigquery.dataOwner`
- `roles/bigquery.dataViewer`

For more information about BigQuery permissions, see
[Access control with IAM](https://docs.cloud.google.com/bigquery/docs/access-control).

### Schema

When you query the `INFORMATION_SCHEMA.SCHEMATA` view, the query results contain one row for each dataset in the specified project.

<br />

The `INFORMATION_SCHEMA.SCHEMATA` view has the following schema:

| Column name | Data type | Value |
|---|---|---|
| `catalog_name` | `STRING` | The name of the project that contains the dataset |
| `schema_name` | `STRING` | The dataset's name also referred to as the `datasetId` |
| `schema_owner` | `STRING` | The value is always `NULL` |
| `creation_time` | `TIMESTAMP` | The dataset's creation time |
| `last_modified_time` | `TIMESTAMP` | The dataset's last modified time |
| `location` | `STRING` | The dataset's geographic location |
| `ddl` | `STRING` | The [`CREATE SCHEMA`](../googlesql-syntax/data-definition-language-1.md#create-schema-statement) DDL statement that can be used to create the dataset |
| `default_collation_name` | `STRING` | The name of the default [collation specification](../googlesql-syntax/collation-concepts.md) if it exists; otherwise, `NULL`. |
| `sync_status` | `JSON` | The status of the sync between the primary and secondary replicas for [cross-region replication](https://docs.cloud.google.com/bigquery/docs/data-replication) and [disaster recovery](https://docs.cloud.google.com/bigquery/docs/managed-disaster-recovery) datasets. Returns `NULL` if the replica is a primary replica or the dataset doesn't use replication. |

For stability, we recommend that you explicitly list columns in your information schema queries instead of
using a wildcard (`SELECT *`). Explicitly listing columns prevents queries from
breaking if the underlying schema changes.

### Scope and syntax

Queries against this view must include a [region
qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#syntax). If you do not
specify a regional qualifier, metadata is retrieved from the US region.
The following table explains the region scope for this view:

| View Name | Resource scope | Region scope |
|---|---|---|
| `[PROJECT_ID.]INFORMATION_SCHEMA.SCHEMATA` | Project level | US region |
| ``[PROJECT_ID.]`region-REGION`.INFORMATION_SCHEMA.SCHEMATA`` | Project level | `REGION` |

Replace the following:

- Optional: `PROJECT_ID`: the ID of your Google Cloud project. If not specified, the default project is used.
- `REGION`: any [dataset region name](https://docs.cloud.google.com/bigquery/docs/locations). For example, `us`.

  <br />

  <br />

  > [!NOTE]
  > **Note:** You must use [a region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#region_qualifier) to query `INFORMATION_SCHEMA` views. The location of the query execution must match the region of the `INFORMATION_SCHEMA` view.

<br />

**Example**

```sql
-- Returns metadata for datasets in a region.
SELECT * FROM region-us.INFORMATION_SCHEMA.SCHEMATA;
```

### Example

To run the query against a project other than your default project, add the
project ID to the dataset in the following format:

```bash
`PROJECT_ID`.INFORMATION_SCHEMA.SCHEMATA
```
for example, `` `myproject`.INFORMATION_SCHEMA.SCHEMATA ``.

<br />

```googlesql
SELECT
  * EXCEPT (schema_owner)
FROM
  INFORMATION_SCHEMA.SCHEMATA;
```

> [!NOTE]
> **Note:** `INFORMATION_SCHEMA` view names are case-sensitive.

The result is similar to the following. For readability, some columns
are excluded from the result.

```text
+----------------+---------------+---------------------+---------------------+------------+------------------------------------------+
|  catalog_name  |  schema_name  |    creation_time    | last_modified_time  |  location  |                   ddl                    |
+----------------+---------------+---------------------+---------------------+------------+------------------------------------------+
| myproject      | mydataset1    | 2018-11-07 19:50:24 | 2018-11-07 19:50:24 | US         | CREATE SCHEMA `myproject.mydataset1`     |
|                |               |                     |                     |            | OPTIONS(                                 |
|                |               |                     |                     |            |   location="us"                          |
|                |               |                     |                     |            | );                                       |
+----------------+---------------+---------------------+---------------------+------------+------------------------------------------+
| myproject      | mydataset2    | 2018-07-16 04:24:22 | 2018-07-16 04:24:22 | US         | CREATE SCHEMA `myproject.mydataset2`     |
|                |               |                     |                     |            | OPTIONS(                                 |
|                |               |                     |                     |            |   default_partition_expiration_days=3.0, |
|                |               |                     |                     |            |   location="us"                          |
|                |               |                     |                     |            | );                                       |
+----------------+---------------+---------------------+---------------------+------------+------------------------------------------+
| myproject      | mydataset3    | 2018-02-07 21:08:45 | 2018-05-01 23:32:53 | US         | CREATE SCHEMA `myproject.mydataset3`     |
|                |               |                     |                     |            | OPTIONS(                                 |
|                |               |                     |                     |            |   description="My dataset",              |
|                |               |                     |                     |            |   location="us"                          |
|                |               |                     |                     |            | );                                       |
+----------------+---------------+---------------------+---------------------+------------+------------------------------------------+
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/information-schema-datasets-schemata (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the example value for `REGION` is `` `region-us` ``, but the view name on this page already has the prefix (`region-REGION`), so that value would produce `region-region-us`. The example value is changed to `us`.

## Related

- [Index of this directory](./README.md)
