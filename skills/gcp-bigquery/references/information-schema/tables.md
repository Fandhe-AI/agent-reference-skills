---
source: https://docs.cloud.google.com/bigquery/docs/information-schema-tables
---

# TABLES view

## Signature / Usage

The `INFORMATION_SCHEMA.TABLES` view contains one row for each table or view in
a dataset. The `TABLES` and
`TABLE_OPTIONS` views also contain high-level information about views.
For detailed information, query the
[`INFORMATION_SCHEMA.VIEWS`](views.md) view.

### Required permissions

To query the `INFORMATION_SCHEMA.TABLES` view, you need the following
Identity and Access Management (IAM) permissions:

- `bigquery.tables.get`
- `bigquery.tables.list`
- `bigquery.routines.get`
- `bigquery.routines.list`

Each of the following predefined IAM roles includes the preceding
permissions:

- `roles/bigquery.admin`
- `roles/bigquery.dataViewer`
- `roles/bigquery.metadataViewer`

For more information about BigQuery permissions, see
[Access control with IAM](https://docs.cloud.google.com/bigquery/docs/access-control).

### Schema

When you query the `INFORMATION_SCHEMA.TABLES` view, the query results contain
one row for each table or view in a dataset. For detailed information about
views, query the [`INFORMATION_SCHEMA.VIEWS`
view](views.md) instead.

The `INFORMATION_SCHEMA.TABLES` view has the following schema:

| Column name | Data type | Value |
|---|---|---|
| `table_catalog` | `STRING` | The project ID of the project that contains the dataset. |
| `table_schema` | `STRING` | The name of the dataset that contains the table or view. Also referred to as the `datasetId`. |
| `table_name` | `STRING` | The name of the table or view. Also referred to as the `tableId`. |
| `table_type` | `STRING` | The table type; one of the following: - `BASE TABLE`: A standard [table](https://docs.cloud.google.com/bigquery/docs/tables-intro) - `CLONE`: A [table clone](https://docs.cloud.google.com/bigquery/docs/table-clones-intro) - `SNAPSHOT`: A [table snapshot](https://docs.cloud.google.com/bigquery/docs/table-snapshots-intro) - `VIEW`: A [view](https://docs.cloud.google.com/bigquery/docs/views-intro) - `MATERIALIZED VIEW`: A [materialized view](https://docs.cloud.google.com/bigquery/docs/materialized-views-intro) or [materialized view replica](https://docs.cloud.google.com/bigquery/docs/load-data-using-cross-cloud-transfer#materialized_view_replicas) - `EXTERNAL`: A table that references an [external data source](https://docs.cloud.google.com/bigquery/external-data-sources) |
| `managed_table_type` | `STRING` | This column is in Preview. The managed table type; one of the following: - `NATIVE`: A standard [table](https://docs.cloud.google.com/bigquery/docs/tables-intro) - `BIGLAKE`: A [Apache Iceberg managed table](https://docs.cloud.google.com/bigquery/docs/iceberg-tables) |
| `is_insertable_into` | `STRING` | `YES` or `NO` depending on whether the table supports [DML INSERT](../googlesql-syntax/dml-syntax.md#insert-statement) statements |
| `is_fine_grained_mutations_enabled` | `STRING ` | `YES` or `NO` depending on whether [fine-grained DML mutations](https://docs.cloud.google.com/bigquery/docs/data-manipulation-language#enable_fine-grained_dml) are enabled on the table |
| `is_typed` | `STRING` | The value is always `NO` |
| `is_change_history_enabled` | `STRING` | `YES` or `NO` depending on whether [change history](https://docs.cloud.google.com/bigquery/docs/change-history) is enabled |
| `creation_time` | `TIMESTAMP` | The table's creation time |
| `base_table_catalog` | `STRING` | For [table clones](https://docs.cloud.google.com/bigquery/docs/table-clones-intro) and [table snapshots](https://docs.cloud.google.com/bigquery/docs/table-snapshots-intro), the base table's project. Applicable only to tables with `table_type` set to `CLONE` or `SNAPSHOT`. |
| `base_table_schema` | `STRING` | For [table clones](https://docs.cloud.google.com/bigquery/docs/table-clones-intro) and [table snapshots](https://docs.cloud.google.com/bigquery/docs/table-snapshots-intro), the base table's dataset. Applicable only to tables with `table_type` set to `CLONE` or `SNAPSHOT`. |
| `base_table_name` | `STRING` | For [table clones](https://docs.cloud.google.com/bigquery/docs/table-clones-intro) and [table snapshots](https://docs.cloud.google.com/bigquery/docs/table-snapshots-intro), the base table's name. Applicable only to tables with `table_type` set to `CLONE` or `SNAPSHOT`. |
| `snapshot_time_ms` | `TIMESTAMP` | For [table clones](https://docs.cloud.google.com/bigquery/docs/table-clones-intro) and [table snapshots](https://docs.cloud.google.com/bigquery/docs/table-snapshots-intro), the time when the [clone](https://docs.cloud.google.com/bigquery/docs/table-clones-create) or [snapshot](https://docs.cloud.google.com/bigquery/docs/table-snapshots-create) operation was run on the base table to create this table. If [time travel](https://docs.cloud.google.com/bigquery/docs/time-travel) was used, then this field contains the time travel timestamp. Otherwise, the `snapshot_time_ms` field is the same as the `creation_time` field. Applicable only to tables with `table_type` set to `CLONE` or `SNAPSHOT`. |
| `replica_source_catalog` | `STRING` | For [materialized view replicas](https://docs.cloud.google.com/bigquery/docs/load-data-using-cross-cloud-transfer#materialized_view_replicas), the base materialized view's project. |
| `replica_source_schema` | `STRING` | For [materialized view replicas](https://docs.cloud.google.com/bigquery/docs/load-data-using-cross-cloud-transfer#materialized_view_replicas), the base materialized view's dataset. |
| `replica_source_name` | `STRING` | For [materialized view replicas](https://docs.cloud.google.com/bigquery/docs/load-data-using-cross-cloud-transfer#materialized_view_replicas), the base materialized view's name. |
| `replication_status` | `STRING` | For [materialized view replicas](https://docs.cloud.google.com/bigquery/docs/load-data-using-cross-cloud-transfer#materialized_view_replicas), the status of the replication from the base materialized view to the materialized view replica; one of the following: - `REPLICATION_STATUS_UNSPECIFIED` - `ACTIVE`: Replication is active with no errors - `SOURCE_DELETED`: The source materialized view has been deleted - `PERMISSION_DENIED`: The source materialized view hasn't been [authorized](https://docs.cloud.google.com/bigquery/docs/authorized-views) on the dataset that contains the source Amazon S3 BigLake tables used in the query that created the materialized view. - `UNSUPPORTED_CONFIGURATION`: There is an issue with the replica's [prerequisites](https://docs.cloud.google.com/bigquery/docs/load-data-using-cross-cloud-transfer#create) other than source materialized view authorization. |
| `replication_error` | `STRING` | If `replication_status` indicates a replication issue for a [materialized view replica](https://docs.cloud.google.com/bigquery/docs/load-data-using-cross-cloud-transfer#materialized_view_replicas), `replication_error` provides further details about the issue. |
| `ddl` | `STRING` | The [DDL statement](../googlesql-syntax/data-definition-language-1.md) that can be used to recreate the table, such as [`CREATE TABLE`](../googlesql-syntax/data-definition-language-1.md#create-table-statement) or [`CREATE VIEW`](../googlesql-syntax/data-definition-language-1.md#create-view-statement) |
| `default_collation_name` | `STRING` | The name of the default [collation specification](../googlesql-syntax/collation-concepts.md) if it exists; otherwise, `NULL`. |
| `sync_status` | `JSON` | The status of the sync between the primary and secondary replicas for [cross-region replication](https://docs.cloud.google.com/bigquery/docs/data-replication) and [disaster recovery](https://docs.cloud.google.com/bigquery/docs/managed-disaster-recovery) datasets. Returns `NULL` if the replica is a primary replica or the dataset doesn't use replication. |
| `upsert_stream_apply_watermark` | `TIMESTAMP` | For tables that use change data capture (CDC), the time when row modifications were last applied. For more information, see [Monitor table upsert operation progress](https://docs.cloud.google.com/bigquery/docs/change-data-capture#monitor_table_upsert_operation_progress). |

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
| ``[PROJECT_ID.]`region-REGION`.INFORMATION_SCHEMA.TABLES`` | Project level | `REGION` |
| `[PROJECT_ID.]DATASET_ID.INFORMATION_SCHEMA.TABLES` | Dataset level | Dataset location |

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
-- Returns metadata for tables in a single dataset.
SELECT * FROM myDataset.INFORMATION_SCHEMA.TABLES;
```

### Examples

###### Example 1:

The following example retrieves table metadata for all of the tables in the
dataset named `mydataset`. The metadata that's
returned is for all types of tables in `mydataset` in your default project.

`mydataset` contains the following tables:

- `mytable1`: a standard BigQuery table
- `myview1`: a BigQuery view

To run the query against a project other than your default project, add the
project ID to the dataset in the following format:
`` `project_id`.dataset.INFORMATION_SCHEMA.view ``;
for example, `` `myproject`.mydataset.INFORMATION_SCHEMA.TABLES ``.

> [!NOTE]
> **Note:** `INFORMATION_SCHEMA` view names are case-sensitive.

```googlesql
SELECT
  table_catalog, table_schema, table_name, table_type,
  is_insertable_into, creation_time, ddl
FROM
  mydataset.INFORMATION_SCHEMA.TABLES;
```

The result is similar to the following. For readability, some columns
are excluded from the result.

```text
+----------------+---------------+----------------+------------+--------------------+---------------------+---------------------------------------------+
| table_catalog  | table_schema  |   table_name   | table_type | is_insertable_into |    creation_time    |                     ddl                     |
+----------------+---------------+----------------+------------+--------------------+---------------------+---------------------------------------------+
| myproject      | mydataset     | mytable1       | BASE TABLE | YES                | 2018-10-29 20:34:44 | CREATE TABLE `myproject.mydataset.mytable1` |
|                |               |                |            |                    |                     | (                                           |
|                |               |                |            |                    |                     |   id INT64                                  |
|                |               |                |            |                    |                     | );                                          |
| myproject      | mydataset     | myview1        | VIEW       | NO                 | 2018-12-29 00:19:20 | CREATE VIEW `myproject.mydataset.myview1`   |
|                |               |                |            |                    |                     | AS SELECT 100 as id;                        |
+----------------+---------------+----------------+------------+--------------------+---------------------+---------------------------------------------+
```

###### Example 2:

The following example retrieves table metadata for all tables of type `CLONE`
or `SNAPSHOT` from the `INFORMATION_SCHEMA.TABLES` view. The metadata returned
is for tables in `mydataset` in your default project.

To run the query against a project other than your default project, add the
project ID to the dataset in the following format:
`` `project_id`.dataset.INFORMATION_SCHEMA.view ``;
for example, `` `myproject`.mydataset.INFORMATION_SCHEMA.TABLES ``.

```googlesql
  SELECT
    table_name, table_type, base_table_catalog,
    base_table_schema, base_table_name, snapshot_time_ms
  FROM
    mydataset.INFORMATION_SCHEMA.TABLES
  WHERE
    table_type = 'CLONE'
  OR
    table_type = 'SNAPSHOT';
```

The result is similar to the following. For readability, some columns
are excluded from the result.

<br />

```text
  +--------------+------------+--------------------+-------------------+-----------------+---------------------+
  | table_name   | table_type | base_table_catalog | base_table_schema | base_table_name | snapshot_time_ms    |
  +--------------+------------+--------------------+-------------------+-----------------+---------------------+
  | items_clone  | CLONE      | myproject          | mydataset         | items           | 2018-10-31 22:40:05 |
  | orders_bk    | SNAPSHOT   | myproject          | mydataset         | orders          | 2018-11-01 08:22:39 |
  +--------------+------------+--------------------+-------------------+-----------------+---------------------+
```

<br />

###### Example 3:

The following example retrieves `table_name` and `ddl` columns from the `INFORMATION_SCHEMA.TABLES`
view for the `population_by_zip_2010` table in the
[`census_bureau_usa`](https://console.cloud.google.com/bigquery?p=bigquery-public-data&d=census_bureau_usa&page=dataset)
dataset. This dataset is part of the BigQuery
[public dataset program](https://docs.cloud.google.com/bigquery/public-data).

Because the table you're querying is in another project, you add the project ID to the dataset in
the following format:
`` `project_id`.dataset.INFORMATION_SCHEMA.view ``.
In this example, the value is
`` `bigquery-public-data`.census_bureau_usa.INFORMATION_SCHEMA.TABLES ``.

```googlesql
SELECT
  table_name, ddl
FROM
  `bigquery-public-data`.census_bureau_usa.INFORMATION_SCHEMA.TABLES
WHERE
  table_name = 'population_by_zip_2010';
```

The result is similar to the following:

<br />

```text
+------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|       table_name       |                                                                                                            ddl                                                                                                             |
+------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| population_by_zip_2010 | CREATE TABLE `bigquery-public-data.census_bureau_usa.population_by_zip_2010`                                                                                                                                               |
|                        | (                                                                                                                                                                                                                          |
|                        |   geo_id STRING OPTIONS(description="Geo code"),                                                                                                                                                                           |
|                        |   zipcode STRING NOT NULL OPTIONS(description="Five digit ZIP Code Tabulation Area Census Code"),                                                                                                                          |
|                        |   population INT64 OPTIONS(description="The total count of the population for this segment."),                                                                                                                             |
|                        |   minimum_age INT64 OPTIONS(description="The minimum age in the age range. If null, this indicates the row as a total for male, female, or overall population."),                                                          |
|                        |   maximum_age INT64 OPTIONS(description="The maximum age in the age range. If null, this indicates the row as having no maximum (such as 85 and over) or the row is a total of the male, female, or overall population."), |
|                        |   gender STRING OPTIONS(description="male or female. If empty, the row is a total population summary.")                                                                                                                    |
|                        | )                                                                                                                                                                                                                          |
|                        | OPTIONS(                                                                                                                                                                                                                   |
|                        |   labels=[("freebqcovid", "")]                                                                                                                                                                                             |
|                        | );                                                                                                                                                                                                                         |
+------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

```

<br />

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/information-schema-tables (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the example value for `REGION` is `` `region-us` ``, but the view name on this page already has the prefix (`region-REGION`), so that value would produce `region-region-us`. The example value is changed to `us`.

## Related

- [Index of this directory](./README.md)
