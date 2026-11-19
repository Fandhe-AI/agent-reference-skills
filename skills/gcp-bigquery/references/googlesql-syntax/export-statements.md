---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/export-statements
---

# Export statements in GoogleSQL

## Signature / Usage

### `EXPORT DATA` statement

The `EXPORT DATA` statement exports the results of a query to an external
storage location. You can export to the following services:

- Cloud Storage
- Amazon Simple Storage Service (Amazon S3)
- Azure Blob Storage
- Spanner
- Bigtable
- Pub/Sub
- AlloyDB

#### Syntax

```text
EXPORT DATA
[WITH CONNECTION connection_name]
OPTIONS (export_option_list) AS
query_statement
```

#### Arguments

- `connection_name`: Specifies a
  [connection](https://docs.cloud.google.com/bigquery/docs/connections-api-intro) that has
  credentials for accessing the Amazon S3 data. Specify the connection name in
  the form `PROJECT_ID.LOCATION.CONNECTION_ID`.
  If the project ID or location contains a dash, enclose the connection name in
  backticks (`` ` ``). Connections aren't required to export to
  Google Cloud services.

- `export_option_list`: Specifies a list of options
  for the export operation, including the URI of the destination. For more
  information, see the following sections:

  - [Cloud Storage, Amazon Simple Storage Service (Amazon S3), and Blob Storage export option list](#cloud-storage-amazon-s3-and-blob-storage-export-option-list)
  - [Bigtable export option list](#bigtable-export-option-list)
  - [Pub/Sub export option list](#pubsub-export-option-list)
  - [Spanner export option list](#spanner-export-option-list)
  - [AlloyDB export option list](#alloydb-export-option-list)
- `query_statement`: A SQL query. The query result is exported to the external
  destination. The query can't reference metatables, including
  `INFORMATION_SCHEMA` views, system tables, or wildcard tables.

### Export to Cloud Storage, Amazon S3, or Blob Storage

You can
export BigQuery data to Cloud Storage, Amazon S3, or Blob Storage
in Avro, CSV, JSON, and Parquet formats. For more information about exporting to
Cloud Storage, see
[Export table data to Cloud Storage](https://docs.cloud.google.com/bigquery/docs/exporting-data).

Use the `format` option to specify the format of the exported data. The
following limitations apply:

- You cannot export nested and repeated data in CSV format.
- If you export data in JSON format, `INT64` data types are encoded as JSON strings to preserve 64-bit precision.
- If your `query_statement` includes an `ORDER BY` clause and you export to multiple files using a wildcard, the globally sorted result set is distributed sequentially across the generated files.
- You can only export data to Amazon S3 or Blob Storage from queries that run against [BigLake tables](https://docs.cloud.google.com/bigquery/docs/biglake-intro) in a supported [BigQuery Omni location](https://docs.cloud.google.com/bigquery/docs/omni-introduction#locations). For more information, see [Export query results to Amazon S3](https://docs.cloud.google.com/bigquery/docs/omni-aws-export-results-to-s3) and [Export query results to Blob Storage](https://docs.cloud.google.com/bigquery/docs/omni-azure-export-results-to-azure-storage).

You are not billed for the export operation, but you are billed for running the
query and for storing data in Cloud Storage, Amazon S3, or
Blob Storage. For more information, see [Cloud Storage
pricing](https://cloud.google.com/storage/pricing), [Amazon S3
pricing](https://aws.amazon.com/s3/pricing), or [Blob Storage
pricing](https://azure.microsoft.com/en-us/pricing/details/storage/blobs/).

#### Cloud Storage, Amazon S3, and Blob Storage export option list

The option list specifies options for exporting to Cloud Storage,
Amazon S3, or Blob Storage.

| Options ||
|---|---|
| `compression` | `STRING` Specifies a compression format. If not specified, the exported files are uncompressed. Supported values include: `GZIP`, `DEFLATE`, `SNAPPY`. |
| `field_delimiter` | `STRING` The delimiter used to separate fields. Default: `','` (comma). Applies to: CSV. |
| `format` | `STRING` Required. The format of the exported data. Supported values include: `AVRO`, `CSV`, `JSON`, `PARQUET`. |
| `header` | `BOOL` If `true`, generates column headers for the first row of each data file. Default: `false`. Applies to: CSV. |
| `overwrite` | `BOOL` If `true`, overwrites any existing files with the same URI. Otherwise, if the destination storage bucket is not empty, the statement returns an error. Default: `false`. Note: When `overwrite` is `true`, files are only overwritten, no files are ever deleted, even if they match the wildcard specified in the URI. |
| `uri` | `STRING` Required. The destination URI for the export. The `uri` option must be a single-wildcard URI as described in [Exporting data into one or more files](https://docs.cloud.google.com/bigquery/docs/exporting-data#exporting_data_into_one_or_more_files). If your query includes an \`ORDER BY\` clause, the globally sorted rows are distributed sequentially across the generated files. Examples: `"gs://bucket/path/file_*.csv"` or `"s3://bucket/path/file_*.csv"` |
| `use_avro_logical_types` | `BOOL` Whether to use appropriate AVRO logical types when exporting `TIMESTAMP`, `DATETIME`, `TIME` and `DATE` types. Applies to: AVRO. For more information, see [Avro export details](https://docs.cloud.google.com/bigquery/docs/exporting-data#avro_export_details). |

#### Examples

The following examples show common use cases for exporting to
Cloud Storage, Amazon S3, or Blob Storage.

##### Export data to Cloud Storage in CSV format

The following example exports data to a CSV file. It includes options to
overwrite the destination location, write header rows, and use `';'` as a
delimiter.

```sql
EXPORT DATA OPTIONS(
  uri='gs://bucket/folder/*.csv',
  format='CSV',
  overwrite=true,
  header=true,
  field_delimiter=';') AS
SELECT field1, field2 FROM mydataset.table1 ORDER BY field1 LIMIT 10
```

##### Export data to Cloud Storage in Avro format

The following example exports data to Avro format using Snappy compression.

```sql
EXPORT DATA OPTIONS(
  uri='gs://bucket/folder/*',
  format='AVRO',
  compression='SNAPPY') AS
SELECT field1, field2 FROM mydataset.table1 ORDER BY field1 LIMIT 10
```

##### Export data to Cloud Storage in Parquet format

The following example exports data to Parquet format. It includes the option to
overwrite the destination location.

```sql
EXPORT DATA OPTIONS(
  uri='gs://bucket/folder/*',
  format='PARQUET',
  overwrite=true) AS
SELECT field1, field2 FROM mydataset.table1 ORDER BY field1 LIMIT 10
```

##### Export data to Amazon S3 in JSON format

You can only export data to Amazon S3 from queries that run against
BigLake tables based on Amazon S3. The connection and the
dataset for the BigLake table must be in the same supported
[BigQuery Omni location](https://docs.cloud.google.com/bigquery/docs/omni-introduction#locations)
as the target Amazon S3 bucket. For more information about export
requirements and limitations, see [Export query results to Amazon S3](https://docs.cloud.google.com/bigquery/docs/omni-aws-export-results-to-s3).

The following example exports query results from the BigLake
table `mydataset.table1` to an Amazon S3 bucket using a connection in
the `aws-us-east-1` location:

```sql
EXPORT DATA
  WITH CONNECTION `myproject.aws-us-east-1.myconnection`
  OPTIONS(
  uri='s3://bucket/folder/*',
  format='JSON',
  overwrite=true) AS
SELECT field1, field2 FROM mydataset.table1 ORDER BY field1 LIMIT 10
```

### Export to Bigtable

You can export BigQuery data to a Bigtable table
by using the `EXPORT DATA` statement. For Bigtable export
examples and configuration options, see
[Export data to Bigtable](https://docs.cloud.google.com/bigquery/docs/export-to-bigtable).

You are not billed for the export operation, but you are billed for
running the query and for storing data in Bigtable. For more
information, see [Bigtable pricing](https://cloud.google.com/bigtable/pricing).

#### Bigtable export option list

The option list specifies options for exporting to Bigtable.

| Options ||
|---|---|
| `format` | `STRING` Required. When exporting to Bigtable, the value must always be `CLOUD_BIGTABLE`. |
| `bigtable_options` | `STRING` JSON string containing configurations related to mapping exported fields to Bigtable columns families and columns. For more information, see [Configure exports with `bigtable_options`.](https://docs.cloud.google.com/bigquery/docs/export-to-bigtable#bigtable_options) |
| `overwrite` | `BOOL` If `true`, allows export to overwrite existing data in the destination Bigtable table. When set to `false`, and if the destination table is not empty, the statement returns an error. Default: `false`. |
| `truncate` | `BOOL` If `true`, all existing data in the destination table will be deleted before any new data is written. Otherwise the export will proceed with a non-empty destination table. Default: `false`. > [!WARNING] > **Warning:** Only use `truncate` when the destination table doesn't contain data that needs to be retained. |
| `uri` | `STRING` Required. The destination URI for the export. We recommend specifying an app profile for traffic routing and visibility at monitoring dashboards provided by Bigtable. The `uri` option for a Bigtable export must be provided in the following format: ` https://bigtable.googleapis.com/projects/PROJECT_ID/instances/INSTANCE_ID/appProfiles/APP_PROFILE/tables/TABLE_NAME ` |
| `auto_create_column_families` | `BOOL` If `true`, allows export to create missing column families in the target table. If `false` and if the destination table is missing a column family, the statement returns an error. Default: `false`. |

#### Example

The following example exports data to a Bigtable table. Data in
`field1` becomes a row key in Bigtable destination table. The
fields `field2`, `field3` and `field4` are written as columns `cbtField2`,
`cbtField3` and `cbtField4` into column family `column_family`.

Adapted (not in the official docs): removed the trailing comma after the last array element so the `bigtable_options` JSON is valid.

```sql
EXPORT DATA OPTIONS (
uri="https://bigtable.googleapis.com/projects/my-project/instances/my-instance/tables/my-table",
format="CLOUD_BIGTABLE",
bigtable_options="""{
   "columnFamilies" : [
      {
        "familyId": "column_family",
        "columns": [
           {"qualifierString": "cbtField2", "fieldName": "field2"},
           {"qualifierString": "cbtField3", "fieldName": "field3"},
           {"qualifierString": "cbtField4", "fieldName": "field4"}
        ]
      }
   ]
}"""
) AS
SELECT
CAST(field1 as STRING) as rowkey,
STRUCT(field2, field3, field4) as column_family
FROM `bigquery_table`
```

### Export to Pub/Sub

You can export BigQuery data to a Pub/Sub topic
by using the `EXPORT DATA` statement in a
[continuous query](https://docs.cloud.google.com/bigquery/docs/continuous-queries-introduction). For
more information about Pub/Sub configuration options, see
[Export data to Pub/Sub](https://docs.cloud.google.com/bigquery/docs/export-to-pubsub).

For information about the costs involved with exporting to Pub/Sub
by using a continuous query, see
[Costs](https://docs.cloud.google.com/bigquery/docs/continuous-queries-introduction#pricing).

#### Pub/Sub export option list

The option list specifies options for exporting to Pub/Sub.

| Options ||
|---|---|
| `format` | `STRING` Required. When exporting to Pub/Sub, the value must always be `CLOUD_PUBSUB`. |
| `uri` | `STRING` Required. The destination URI for the export. The `uri` option for a Pub/Sub export must be provided in the following format: ` https://pubsub.googleapis.com/projects/PROJECT_ID/topics/TOPIC_ID ` |

#### Example

The following example shows a continuous query that filters data from a
BigQuery table that is receiving streaming taxi ride information,
and publishes the data to a Pub/Sub topic in real time:

```sql
EXPORT DATA
  OPTIONS (
    format = 'CLOUD_PUBSUB',
    uri = 'https://pubsub.googleapis.com/projects/myproject/topics/taxi-real-time-rides')
AS (
  SELECT
    TO_JSON_STRING(
      STRUCT(
        ride_id,
        timestamp,
        latitude,
        longitude)) AS message
  FROM `myproject.real_time_taxi_streaming.taxi_rides`
  WHERE ride_status = 'enroute'
);
```

### Export to Spanner

You can export data from a BigQuery table to a
[Spanner](https://docs.cloud.google.com/spanner/docs/overview) table by using the `EXPORT DATA`
statement.

#### Spanner export option list

The option list specifies options for the export operation.

| Options ||
|---|---|
| `format` | `STRING` Required. To export data from BigQuery to Spanner, the value must always be `CLOUD_SPANNER`. |
| `uri` | `STRING` Required. The destination URI for the export. For Spanner, the URI must be provided in the following format: ` https://spanner.googleapis.com/projects/PROJECT_ID/instances/INSTANCE_ID/databases/DATABASE_ID ` |
| `spanner_options` | `STRING` Required. A JSON string containing configurations related to mapping exported fields to Spanner column families and columns. For more information, see [Configure exports with `spanner_options` option.](https://docs.cloud.google.com/bigquery/docs/export-to-spanner#spanner_options) |

#### Examples

##### Export data to Spanner

The following example exports data to a Spanner table:

```sql
EXPORT DATA OPTIONS (
  uri="https://spanner.googleapis.com/projects/my-project/instances/my-instance/databases/my-database",
  format="CLOUD_SPANNER",
  spanner_options="""{ "table": "my_table" }"""
)
AS SELECT * FROM `bigquery_table`
```

For more Spanner export examples and configuration options, see
[Export data to Spanner](https://docs.cloud.google.com/bigquery/docs/export-to-spanner).

### Export to AlloyDB

You can export BigQuery data to an AlloyDB table
by using the `EXPORT DATA` statement. For AlloyDB export
examples and configuration options, see
[Export data to AlloyDB](https://docs.cloud.google.com/bigquery/docs/export-to-alloydb).

You aren't billed for the export operation, but you are billed for
running the query and for storing data in AlloyDB. For more
information, see [AlloyDB for PostgreSQL pricing](https://cloud.google.com/alloydb/pricing).

#### AlloyDB export option list

The option list specifies options for exporting to AlloyDB.

| Options ||
|---|---|
| `format` | `STRING` Required. When exporting to AlloyDB, the value must always be `ALLOYDB`. |
| `uri` | `STRING` Required. The destination URI for the export. For AlloyDB, the URI must be provided in the following format: ` https://alloydb.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/clusters/CLUSTER_ID/instances/INSTANCE_ID ` |
| `alloydb_options` | `STRING` Required. A JSON string containing configurations related to mapping exported fields to AlloyDB columns, schema, write mode (`APPEND` or `UPSERT`), and connection limits. For more information, see [Configure exports with `alloydb_options`.](https://docs.cloud.google.com/bigquery/docs/export-to-alloydb#configure_exports_with_alloydb_options) |

#### Example

##### Export data to AlloyDB

The following example exports data to an AlloyDB table using `UPSERT` mode:

```sql
EXPORT DATA
  WITH CONNECTION `myproject.us-central1.my-alloydb-conn`
  OPTIONS (
    format='ALLOYDB',
    uri="https://alloydb.googleapis.com/v1/projects/myproject/locations/us-central1/clusters/my-cluster/instances/my-instance",
    alloydb_options="""{
      "schema": "public",
      "table": "my_target_table",
      "write_mode": "UPSERT"
    }"""
  )
AS SELECT
  col1 AS id,
  col2 AS name,
  col3 AS value
FROM
  `mydataset.table1`;
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/export-statements (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the official text names the column `cbtFeld2`; changed to `cbtField2`, the `qualifierString` used for `field2` in the example below it on the same page.
- Corrected from the official docs: the `bigtable_options` JSON array ends with a trailing comma before `]`, which is not valid JSON; the comma after the `cbtField4` element was removed.
- Conflicting official statements: the `connection_name` argument says that connections aren't required to export to Google Cloud services and describes the connection only as holding Amazon S3 credentials, but the AlloyDB example on this page uses `WITH CONNECTION`. The BigQuery guide to exporting data to AlloyDB (https://docs.cloud.google.com/bigquery/docs/export-to-alloydb, retrieved 2026-11-20) lists creating a BigQuery connection to the AlloyDB instance as a prerequisite and says that only username and password authentication through a BigQuery connection is supported, so an export to AlloyDB needs `WITH CONNECTION`. The Amazon S3 export example on this page also uses `WITH CONNECTION`.

## Related

- [Index of this directory](./README.md)
