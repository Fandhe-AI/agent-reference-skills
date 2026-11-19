---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language
---

# Data definition language (DDL) statements in GoogleSQL (part 2 of 4)

## Signature / Usage

### `CREATE MATERIALIZED VIEW` statement

Creates a new materialized view.

#### Syntax

```googlesql
CREATE [ OR REPLACE ] MATERIALIZED VIEW [ IF NOT EXISTS ] materialized_view_name
[PARTITION BY partition_expression]
[CLUSTER BY clustering_column_list]
[OPTIONS(materialized_view_option_list)]
AS query_expression
```

#### Arguments

- `OR REPLACE`: Replaces a materialized view with the same name if it exists.
  Cannot appear with `IF NOT EXISTS`.

- `IF NOT EXISTS`: If a materialized view or other
  [table resource](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#Table.FIELDS.type)
  exists with the same name, the `CREATE` statement has no effect. Cannot appear
  with `OR REPLACE`.

- `materialized_view_name`: The name of the materialized view you're creating.
  See [Table path syntax](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#table_path).

  If the `project_name` is omitted from the materialized view name, or it is the
  same as the project that runs this DDL query, then the latter is also used as
  the default project for references to tables, functions, and other resources
  in `query_expression`. The default project of the references is fixed and does
  not depend on the future queries that invoke the new materialized view.
  Otherwise, all references in `query_expression` must be qualified with
  project names.

  The materialized view name must be unique per dataset.
- [`partition_expression`](data-definition-language-1.md#partition_expression): An expression that determines
  how to partition the table. A materialized view can only be partitioned in the
  same way as the table in `query expression` (the *base table*) is partitioned.

- [`clustering_column_list`](data-definition-language-1.md#clustering_column_list): A comma-separated list
  of column references that determine how to cluster the materialized view.

- [`materialized_view_option_list`](#materialized_view_option_list): Allows you
  to specify additional materialized view options such as a whether refresh is
  enabled, the refresh interval, a [label](https://docs.cloud.google.com/bigquery/docs/labels), and an
  expiration time.

- `query_expression`: The GoogleSQL query expression used to define the
  materialized view.

#### Details

`CREATE MATERIALIZED VIEW` statements must comply with the following rules:

- Only one `CREATE` statement is allowed.

##### Default project in materialized view body

If the materialized view is created in the same project used to run the `CREATE MATERIALIZED VIEW`
statement, the materialized view body `query_expression` can reference entities without
specifying the project; the default project is the project
which owns the materialized view. Consider the sample query below.

```googlesql
CREATE MATERIALIZED VIEW myProject.myDataset.myView AS SELECT * FROM anotherDataset.myTable;
```

After running the above `CREATE MATERIALIZED VIEW` query in the project `myProject`, you can
run the query `SELECT * FROM myProject.myDataset.myView`. Regardless of the project you
choose to run this `SELECT` query, the referenced table `anotherDataset.myTable`
is always resolved against project `myProject`.

If the materialized view is not created in the same project used to run the `CREATE VIEW`
statement, then all references in the materialized view body `query_expression` must be
qualified with project IDs. For instance, the preceding sample `CREATE MATERIALIZED VIEW` query
is invalid if it runs in a project different from `myProject`.

#### `materialized_view_option_list`

The option list allows you to set materialized view options such as a whether
refresh is enabled. the refresh interval, a [label](https://docs.cloud.google.com/bigquery/docs/labels) and
an expiration time. You can include multiple options using a comma-separated
list.

Specify a materialized view option list in the following format:

`NAME=VALUE, ...`

`NAME` and `VALUE` must be one of the following combinations:

| `NAME` | `VALUE` | Details |
|---|---|---|
| `enable_refresh` | `BOOLEAN` | Example: `enable_refresh=false` Default: `true` |
| `refresh_interval_minutes` | `FLOAT64` | Example: `refresh_interval_minutes=20` Default: `refresh_interval_minutes=30` |
| `expiration_timestamp` | `TIMESTAMP` | Example: `expiration_timestamp=TIMESTAMP "2025-01-01 00:00:00 UTC"` This property is equivalent to the [expirationTime](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#Table.FIELDS.expiration_time) table resource property. `expiration_timestamp` is optional and not used by default. |
| `max_staleness` | `INTERVAL` | Example: `max_staleness=INTERVAL "4:0:0" HOUR TO SECOND` The [`max_staleness` property](https://docs.cloud.google.com/bigquery/docs/materialized-views-create#max_staleness) provides consistently high performance with controlled costs when processing large, frequently changing datasets. `max_staleness` is disabled by default. |
| `allow_non_incremental_definition` | `BOOLEAN` | Example: `allow_non_incremental_definition=true` The [`allow_non_incremental_definition` property](https://docs.cloud.google.com/bigquery/docs/materialized-views-create#non-incremental) supports an expanded range of SQL queries to create materialized views. `allow_non_incremental_definition=true` is disabled by default. `CREATE MATERIALIZED VIEW` statement support only. The `allow_non_incremental_definition` property can't be changed after the materialized view is created. |
| `kms_key_name` | `STRING` | Example: `kms_key_name="projects/project_id/locations/location/keyRings/keyring/cryptoKeys/key"` This property is equivalent to the [encryptionConfiguration.kmsKeyName](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/EncryptionConfiguration#FIELDS.kms_key_name) table resource property. See more details about [Protecting data with Cloud KMS keys](https://docs.cloud.google.com/bigquery/docs/customer-managed-encryption). |
| `friendly_name` | `STRING` | Example: `friendly_name="my_mv"` This property is equivalent to the [friendlyName](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#Table.FIELDS.friendly_name) table resource property. |
| `description` | `STRING` | Example: `description="a materialized view that expires in 2025"` This property is equivalent to the [description](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#Table.FIELDS.description) table resource property. |
| `labels` | `ARRAY<STRUCT<STRING, STRING>>` | Example: `labels=[("org_unit", "development")]` This property is equivalent to the [labels](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#Table.FIELDS.labels) table resource property. |
| `tags` | `ARRAY<STRUCT<STRING, STRING>>` | An array of IAM tags for the materialized view, expressed as key-value pairs. The key should be the [namespaced key name](https://docs.cloud.google.com/iam/docs/tags-access-control#definitions), and the value should be the [short name](https://docs.cloud.google.com/iam/docs/tags-access-control#definitions). |

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.tables.create` | The dataset where you create the materialized view. |

In addition, the `OR REPLACE` clause requires `bigquery.tables.update`
permission.

If the `OPTIONS` clause includes any expiration options, then the
`bigquery.tables.delete` permission is also required.

#### Examples

##### Creating a new materialized view

The following example creates a materialized view named `new_mv` in `mydataset`:

```googlesql
CREATE MATERIALIZED VIEW `myproject.mydataset.new_mv`
OPTIONS(
  expiration_timestamp=TIMESTAMP_ADD(CURRENT_TIMESTAMP(), INTERVAL 48 HOUR),
  friendly_name="new_mv",
  description="a materialized view that expires in 2 days",
  labels=[("org_unit", "development")],
  enable_refresh=true,
  refresh_interval_minutes=20
)
AS SELECT column_1, SUM(column_2) AS sum_2, AVG(column_3) AS avg_3
FROM `myproject.mydataset.mytable`
GROUP BY column_1
```

If the materialized view name exists in the dataset, the following error is
returned:

`Already Exists: project_id:dataset.materialized_view`

When you use a DDL statement to create a materialized view, you must specify the
project, dataset, and materialized view in the following format:
`` `project_id.dataset.materialized_view` ``
(including the backticks if `project_id` contains special characters); for example,
`` `myproject.mydataset.new_mv` ``.

The materialized view is defined using the following GoogleSQL query:

`` SELECT column_1, SUM(column_2) AS sum_2, AVG(column_3) AS avg_3 FROM `myproject.mydataset.mytable` GROUP BY column_1 ``

The materialized view option list specifies the:

- **Expiration time:** 48 hours from the time the materialized view is created
- **Friendly name:** `new_mv`
- **Description:** `A materialized view that expires in 2 days`
- **Label:** `org_unit = development`
- **Refresh enabled:** true
- **Refresh interval:** 20 minutes

##### Creating a materialized view only if the materialized view doesn't exist

The following example creates a materialized view named `new_mv` in `mydataset`
only if no materialized view named `new_mv` exists in `mydataset`. If the
materialized view name exists in the dataset, no error is returned, and no
action is taken.

```googlesql
CREATE MATERIALIZED VIEW IF NOT EXISTS `myproject.mydataset.new_mv`
OPTIONS(
  expiration_timestamp=TIMESTAMP_ADD(CURRENT_TIMESTAMP(), INTERVAL 48 HOUR),
  friendly_name="new_mv",
  description="a view that expires in 2 days",
  labels=[("org_unit", "development")],
  enable_refresh=false
)
AS SELECT column_1, column_2, column_3 FROM `myproject.mydataset.mytable`
```

The materialized view is defined using the following GoogleSQL query:

`` SELECT column_1, column_2, column_3 FROM `myproject.mydataset.mytable` ``

The materialized view option list specifies the:

- **Expiration time:** 48 hours from the time the view is created
- **Friendly name:** `new_mv`
- **Description:** `A view that expires in 2 days`
- **Label:** `org_unit = development`
- **Refresh enabled:** false

##### Creating a materialized view with partitioning and clustering

The following example creates a materialized view named `new_mv` in `mydataset`,
partitioned by the `col_datetime` column and clustered
by the `col_int` column:

```googlesql
CREATE MATERIALIZED VIEW `myproject.mydataset.new_mv`
PARTITION BY DATE(col_datetime)
CLUSTER BY col_int
AS SELECT col_int, col_datetime, COUNT(1) as cnt
   FROM `myproject.mydataset.mv_base_table`
   GROUP BY col_int, col_datetime
```

The base table, `mv_base_table`, must also be partitioned by the
`col_datetime` column. For more information, see
[Working with partitioned and clustered tables](https://docs.cloud.google.com/bigquery/docs/materialized-views#partition_cluster).

### `CREATE MATERIALIZED VIEW AS REPLICA OF` statement

Creates a
[replica of a materialized view](https://docs.cloud.google.com/bigquery/docs/load-data-using-cross-cloud-transfer#materialized_view_replicas).
The source materialized view must
be over an Amazon Simple Storage Service (Amazon S3) BigLake table. You can use the materialized
view replica to make Amazon S3 data available locally for joins.

For more information, see
[Create materialized view replicas](https://docs.cloud.google.com/bigquery/docs/load-data-using-cross-cloud-transfer#create).

#### Syntax

```googlesql
CREATE MATERIALIZED VIEW replica_name
[OPTIONS(materialized_view_replica_option_list)]
AS REPLICA OF source_materialized_view_name
```

#### Arguments

- `replica_name`: The name of the materialized view replica you're creating, in
  [table path syntax](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#table_path). If the project name is omitted from the
  materialized view replica name, the current project is used as the default.

  The materialized view replica name must be unique for each dataset.
- [`materialized_view_replica_option_list`](#materialized_view_replica_option_list):
  Allows you to specify options such as the replication interval.

- `source_materialized_view_name`: The name of the materialized view you are
  replicating, in table path syntax. The source materialized view must be over
  an Amazon S3 BigLake table, and must be authorized on the
  dataset that contains that table.

#### `materialized_view_replica_option_list`

The option list lets you set materialized view replica options.

Specify a materialized view replica option list in the following format:

`NAME=VALUE, ...`

| `NAME` | `VALUE` | Details |
|---|---|---|
| `replication_interval_seconds` | `INT64` | Specifies how often to replicate the data from the source materialized view to the replica. Must be a value between `60` and `3,600`, inclusive. Defaults to `300` (5 minutes). Example: `replication_interval_seconds=900` |

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

- `bigquery.tables.create`
- `bigquery.tables.get`
- `bigquery.tables.getData`
- `bigquery.tables.replicateData`
- `bigquery.jobs.create`

#### Example

The following example creates a materialized view replica named `mv_replica`
in `bq_dataset`:

```googlesql
CREATE MATERIALIZED VIEW `myproject.bq_dataset.mv_replica`
OPTIONS(
  replication_interval_seconds=600
)
AS REPLICA OF `myproject.s3_dataset.my_s3_mv`
```

### `CREATE EXTERNAL SCHEMA` statement

Creates a new federated dataset.

A federated dataset is a connection between BigQuery and an
external data source at the dataset level. For more information about creating
federated datasets, see the following:

- [Create AWS Glue federated datasets](https://docs.cloud.google.com/bigquery/docs/glue-federated-datasets).
- [Create Spanner federated datasets](https://docs.cloud.google.com/bigquery/docs/spanner-external-datasets).

#### Syntax

```googlesql
CREATE EXTERNAL SCHEMA [ IF NOT EXISTS ] dataset_name
[WITH CONNECTION connection_name]
[OPTIONS(external_schema_option_list)]
```

#### Arguments

- `IF NOT EXISTS`: If any dataset exists with the same name, the `CREATE`
  statement has no effect.

- `dataset_name`: The name of the dataset to create.

- `connection_name`: Specifies a
  [connection resource](https://docs.cloud.google.com/bigquery/docs/connections-api-intro) that has
  credentials for accessing the external data. Specify the connection name
  in the form
  <var translate="no">PROJECT_ID</var>.<var translate="no">LOCATION</var>.<var translate="no">CONNECTION_ID</var>. If the
  project ID or location contains a dash, enclose the connection name in
  backticks (`` ` ``).

- [`external_schema_option_list`](#external_schema_option_list): A list of
  options for creating the federated dataset.

#### Details

The dataset is created in the location that you specify in the query settings.
For more information, see
[Specify locations](https://docs.cloud.google.com/bigquery/docs/locations#specify_locations).
The location must support the kind of federated dataset that you are creating,
for example, you can only create AWS Glue federated datasets in AWS
locations.

For more information about creating a dataset, see
[Create datasets](https://docs.cloud.google.com/bigquery/docs/datasets). For information about quotas, see
[dataset limits](https://docs.cloud.google.com/bigquery/quotas#dataset_limits).

#### `external_schema_option_list`

The option list specifies options for the federated dataset. Specify the options
in the following format: `NAME=VALUE, ...`

The following options are supported:

| `NAME` | `VALUE` | Details |
|---|---|---|
| `description` | `STRING` | The description of the dataset. |
| `friendly_name` | `STRING` | A descriptive name for the dataset. |
| `labels` | `<ARRAY<STRUCT<STRING, STRING>>>` | An array of labels for the dataset, expressed as key-value pairs. |
| `location` | `STRING` | The location in which to create the dataset. If you don't specify this option, the dataset is created in the location where the query runs. If you specify this option and also explicitly set the location for the query job, the two values must match; otherwise the query fails. The location must support the kind of federated dataset that you are creating, for example, you can only create AWS Glue federated datasets in AWS locations. |
| `external_source` | `STRING` | The source of the external dataset. For AWS Glue federated datasets this must be an [Amazon Resource Name (ARN)](https://docs.aws.amazon.com/glue/latest/dg/glue-specifying-resource-arns.html), with a prefix identifying the source, such as `aws-glue://`. For Spanner federated datasets, this must be a specific Spanner database with a `google-cloudspanner:/` prefix. For example: `google-cloudspanner:/projects/my_project/instances/my_instance/databases/my_database`. |
| `tags` | `<ARRAY<STRUCT<STRING, STRING>>>` | An array of IAM tags expressed as key-value pairs. The key should be the [namespaced key name](https://docs.cloud.google.com/iam/docs/tags-access-control#definitions), and the value should be the [short name](https://docs.cloud.google.com/iam/docs/tags-access-control#definitions). |

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.datasets.create` | The project where you create the federated dataset. |
| `bigquery.connections.use` | The project where you create the federated dataset. |
| `bigquery.connections.delegate` | The project where you create the federated dataset. |

#### Examples

The following example creates an AWS Glue federated dataset:

```googlesql
CREATE EXTERNAL SCHEMA mydataset
WITH CONNECTION myproject.`aws-us-east-1`.myconnection
  OPTIONS (
    external_source = 'aws-glue://arn:aws:glue:us-east-1:123456789:database/test_database',
    location = 'aws-us-east-1');
```

### `CREATE EXTERNAL TABLE` statement

Creates a new external table.

External tables let BigQuery query data that is stored outside of
BigQuery storage. For more information about external tables, see
[Introduction to external data sources](https://docs.cloud.google.com/bigquery/external-data-sources).

#### Syntax

```googlesql
CREATE [ OR REPLACE ] EXTERNAL TABLE [ IF NOT EXISTS ] table_name
[(
  column_name column_schema,
  ...
)]
[WITH CONNECTION {connection_name | DEFAULT}]
[WITH PARTITION COLUMNS
  [(
      partition_column_name partition_column_type,
      ...
  )]
]
OPTIONS (
  external_table_option_list,
  ...
);
```

#### Arguments

- `OR REPLACE`: Replaces any external table with the same name if it exists.
  Cannot appear with `IF NOT EXISTS`.

- `IF NOT EXISTS`: If an external table or other
  [table resource](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#Table.FIELDS.type)
  exists with the same name, the `CREATE` statement has no effect. Cannot appear
  with `OR REPLACE`.

- `table_name`: The name of the external table. See
  [Table path syntax](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#table_path).

- `column_name`: The name of a column in the table.

- `column_schema`: Specifies the schema of the column. It uses the same
  syntax as the [`column_schema`](data-definition-language-1.md#column) definition in
  the [`CREATE TABLE`](data-definition-language-1.md#create-table-statement) statement. If you don't include
  this clause, BigQuery detects the schema automatically.

- `connection_name`: Specifies a
  [connection resource](https://docs.cloud.google.com/bigquery/docs/connections-api-intro) that has
  credentials for accessing the external data. Specify the connection name
  in the form
  <var translate="no">PROJECT_ID</var>.<var translate="no">LOCATION</var>.<var translate="no">CONNECTION_ID</var>. If the
  project ID or location contains a dash, enclose the connection name in
  backticks (`` ` ``). To use a [default connection](https://docs.cloud.google.com/bigquery/docs/default-connections),
  specify `DEFAULT` instead of the connection string containing
  <var translate="no">PROJECT_ID</var>.<var translate="no">LOCATION</var>.<var translate="no">CONNECTION_ID</var>.

- `partition_column_name`: The name of a partition column. Include this
  field if your external data uses a hive-partitioned layout. For more
  information, see:
  [Supported data layouts](https://docs.cloud.google.com/bigquery/docs/hive-partitioned-queries-gcs#supported_data_layouts).

- `partition_column_type`: The partition column type.

- [`external_table_option_list`](#external_table_option_list): A list of options
  for creating the external table.

#### Details

The `CREATE EXTERNAL TABLE` statement does not support creating temporary
external tables.

To create an externally partitioned table, use the `WITH PARTITION COLUMNS`
clause to specify the partition schema details. BigQuery
validates the column definitions against the external data location. The schema
declaration must strictly follow the ordering of the fields in the external
path. For more information about external partitioning, see
[Querying externally partitioned data](https://docs.cloud.google.com/bigquery/docs/hive-partitioned-queries-gcs).

#### `external_table_option_list`

The option list specifies options for creating the external table. The `format`
and `uris` options are required. Specify the option list in the following
format: `NAME=VALUE, ...`

| Options ||
|---|---|
| `allow_jagged_rows` | `BOOL` If `true`, allow rows that are missing trailing optional columns. Applies to CSV data. |
| `allow_quoted_newlines` | `BOOL` If `true`, allow quoted data sections that contain newline characters in the file. Applies to CSV data. |
| `bigtable_options` | `STRING` Only required when creating a Bigtable external table. Specifies the schema of the Bigtable external table in JSON format. For a list of Bigtable table definition options, see `BigtableOptions` in the REST API reference. |
| `compression` | `STRING` The compression type of the data source. Supported values include: `GZIP`. If not specified, the data source is uncompressed. Applies to CSV and JSON data. |
| `decimal_target_types` | `ARRAY<STRING>` Determines how to convert a `Decimal` type. Equivalent to [ExternalDataConfiguration.decimal_target_types](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#ExternalDataConfiguration.FIELDS.decimal_target_types) Example: `["NUMERIC", "BIGNUMERIC"]`. |
| `description` | `STRING` A description of this table. |
| `enable_list_inference` | `BOOL` If `true`, use schema inference specifically for Parquet LIST logical type. Applies to Parquet data. |
| `enable_logical_types` | `BOOL` If `true`, convert Avro logical types into their corresponding SQL types. For more information, see [Logical types](https://docs.cloud.google.com/bigquery/docs/loading-data-cloud-storage-avro#logical_types). Applies to Avro data. |
| `encoding` | `STRING` The character encoding of the data. Supported values include: `UTF8` (or `UTF-8`), `ISO_8859_1` (or `ISO-8859-1`), `UTF-16BE`, `UTF-16LE`, `UTF-32BE`, or `UTF-32LE`. The default value is `UTF-8`. Applies to CSV data. |
| `enum_as_string` | `BOOL` If `true`, infer Parquet ENUM logical type as STRING instead of BYTES by default. Applies to Parquet data. |
| `expiration_timestamp` | `TIMESTAMP` The time when this table expires. If not specified, the table does not expire. Example: `"2025-01-01 00:00:00 UTC"`. |
| `field_delimiter` | `STRING` The separator for fields in a CSV file. Applies to CSV data. |
| `format` | `STRING` The format of the external data. Supported values for [`CREATE EXTERNAL TABLE`](#create-external-table-statement) include: `AVRO`, `CLOUD_BIGTABLE`, `CSV`, `DATASTORE_BACKUP`, `DELTA_LAKE` ([preview](https://cloud.google.com/products/#product-launch-stages)), `GOOGLE_SHEETS`, `NEWLINE_DELIMITED_JSON` (or `JSON`), `ORC`, `PARQUET`. Supported values for [`LOAD DATA`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/load-statements) include: `AVRO`, `CSV`, `DELTA_LAKE` ([preview](https://cloud.google.com/products/#product-launch-stages)), `NEWLINE_DELIMITED_JSON` (or `JSON`), `ORC`, `PARQUET`. The value `JSON` is equivalent to `NEWLINE_DELIMITED_JSON`. |
| `hive_partition_uri_prefix` | `STRING` A common prefix for all source URIs before the partition key encoding begins. Applies only to hive-partitioned external tables. Applies to Avro, CSV, JSON, Parquet, and ORC data. Example: `"gs://bucket/path"`. |
| `file_set_spec_type` | `STRING` Specifies how to interpret source URIs for load jobs and external tables. Supported values include: - `FILE_SYSTEM_MATCH`. Expands source URIs by listing files from the object store. This is the default behavior if FileSetSpecType is not set. - `NEW_LINE_DELIMITED_MANIFEST`. Indicates that the provided URIs are newline-delimited manifest files, with one URI per line. Wildcard URIs are not supported in the manifest files, and all referenced data files must be in the same bucket as the manifest file. For example, if you have a source URI of `"gs://bucket/path/file"` and the `file_set_spec_type` is `FILE_SYSTEM_MATCH`, then the file is used directly as a data file. If the `file_set_spec_type` is `NEW_LINE_DELIMITED_MANIFEST`, then each line in the file is interpreted as a URI that points to a data file. |
| `ignore_unknown_values` | `BOOL` If `true`, ignore extra values that are not represented in the table schema, without returning an error. Applies to CSV and JSON data. |
| `json_extension` | `STRING` For JSON data, indicates a particular JSON interchange format. If not specified, BigQuery reads the data as generic JSON records. Supported values include: `GEOJSON`. Newline-delimited GeoJSON data. For more information, see [Creating an external table from a newline-delimited GeoJSON file](https://docs.cloud.google.com/bigquery/docs/geospatial-data#external-geojson). |
| `max_bad_records` | `INT64` The maximum number of bad records to ignore when reading the data. Applies to: CSV, JSON, and Google Sheets data. |
| `max_staleness` | `INTERVAL` Applicable for [BigLake tables](https://docs.cloud.google.com/bigquery/docs/biglake-intro#metadata_caching_for_performance) and [object tables](https://docs.cloud.google.com/bigquery/docs/object-table-introduction#metadata_caching_for_performance). Specifies whether cached metadata is used by operations against the table, and how fresh the cached metadata must be in order for the operation to use it. To disable metadata caching, specify 0. This is the default. To enable metadata caching, specify an [interval literal](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/lexical#interval_literals) value between 30 minutes and 7 days. For example, specify `INTERVAL 4 HOUR` for a 4 hour staleness interval. With this value, operations against the table use cached metadata if it has been refreshed within the past 4 hours. If the cached metadata is older than that, the operation falls back to retrieving metadata from Cloud Storage instead. |
| `null_marker` | `STRING` The string that represents `NULL` values in a CSV file. Applies to CSV data. |
| `null_markers` | `ARRAY<STRING>` The list of strings that represent `NULL` values in a CSV file. This option cannot be used with `null_marker` option. Applies to CSV data. |
| `object_metadata` | `STRING` Only required when creating an [object table](https://docs.cloud.google.com/bigquery/docs/object-table-introduction). Set the value of this option to `SIMPLE` when creating an object table. |
| `preserve_ascii_control_characters` | `BOOL` If `true`, then the embedded ASCII control characters which are the first 32 characters in the ASCII table, ranging from '\\x00' to '\\x1F', are preserved. Applies to CSV data. |
| `projection_fields` | `STRING` A list of entity properties to load. Applies to Datastore data. |
| `quote` | `STRING` The string used to quote data sections in a CSV file. If your data contains quoted newline characters, also set the `allow_quoted_newlines` property to `true`. Applies to CSV data. |
| `reference_file_schema_uri` | `STRING` User provided reference file with the table schema. Applies to Parquet/ORC/AVRO data. Example: `"gs://bucket/path/reference_schema_file.parquet"`. |
| `require_hive_partition_filter` | `BOOL` If `true`, all queries over this table require a partition filter that can be used to eliminate partitions when reading data. Applies only to hive-partitioned external tables. Applies to Avro, CSV, JSON, Parquet, and ORC data. |
| `sheet_range` | `STRING` Range of a Google Sheets spreadsheet to query from. Applies to Google Sheets data. Example: `"sheet1!A1:B20"`, |
| `skip_leading_rows` | `INT64` The number of rows at the top of a file to skip when reading the data. Applies to CSV and Google Sheets data. |
| `source_column_match` | `STRING` This controls the strategy used to match loaded columns to the schema. If this value is unspecified, then the default is based on how the schema is provided. If autodetect is enabled, then the default behavior is to match columns by name. Otherwise, the default is to match columns by position. This is done to keep the behavior backward-compatible. Supported values include: - `POSITION`: matches by position. This option assumes that the columns are ordered the same way as the schema. - `NAME`: matches by name. This option reads the header row as column names and reorders columns to match the field names in the schema. Column names are read from the last skipped row based on the `skip_leading_rows` property. |
| `tags` | `<ARRAY<STRUCT<STRING, STRING>>>` An array of IAM tags for the table, expressed as key-value pairs. The key should be the [namespaced key name](https://docs.cloud.google.com/iam/docs/tags-access-control#definitions), and the value should be the [short name](https://docs.cloud.google.com/iam/docs/tags-access-control#definitions). |
| `time_zone` | `STRING` Default time zone that will apply when parsing timestamp values that have no specific time zone. Check [valid time zone names](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#time_zone_name). If this value is not present, the timestamp values without specific time zone is parsed using default time zone UTC. Applies to CSV and JSON data. |
| `date_format` | `STRING` [Format elements](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/format-elements#format_string_as_datetime) that define how the DATE values are formatted in the input files (for example, `MM/DD/YYYY`). If this value is present, this format is the only compatible DATE format. [Schema autodetection](https://docs.cloud.google.com/bigquery/docs/schema-detect#date_and_time_values) will also decide DATE column type based on this format instead of the existing format. If this value is not present, the DATE field is parsed with the [default formats](https://docs.cloud.google.com/bigquery/docs/loading-data-cloud-storage-csv#data_types). Applies to CSV and JSON data. |
| `datetime_format` | `STRING` [Format elements](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/format-elements#format_string_as_datetime) that define how the DATETIME values are formatted in the input files (for example, `MM/DD/YYYY HH24:MI:SS.FF3`). If this value is present, this format is the only compatible DATETIME format. [Schema autodetection](https://docs.cloud.google.com/bigquery/docs/schema-detect#date_and_time_values) will also decide DATETIME column type based on this format instead of the existing format. If this value is not present, the DATETIME field is parsed with the [default formats](https://docs.cloud.google.com/bigquery/docs/loading-data-cloud-storage-csv#data_types). Applies to CSV and JSON data. |
| `time_format` | `STRING` [Format elements](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/format-elements#format_string_as_datetime) that define how the TIME values are formatted in the input files (for example, `HH24:MI:SS.FF3`). If this value is present, this format is the only compatible TIME format. [Schema autodetection](https://docs.cloud.google.com/bigquery/docs/schema-detect#date_and_time_values) will also decide TIME column type based on this format instead of the existing format. If this value is not present, the TIME field is parsed with the [default formats](https://docs.cloud.google.com/bigquery/docs/loading-data-cloud-storage-csv#data_types). Applies to CSV and JSON data. |
| `timestamp_format` | `STRING` [Format elements](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/format-elements#format_string_as_datetime) that define how the TIMESTAMP values are formatted in the input files (for example, `MM/DD/YYYY HH24:MI:SS.FF3`). If this value is present, this format is the only compatible TIMESTAMP format. [Schema autodetection](https://docs.cloud.google.com/bigquery/docs/schema-detect#date_and_time_values) will also decide TIMESTAMP column type based on this format instead of the existing format. If this value is not present, the TIMESTAMP field is parsed with the [default formats](https://docs.cloud.google.com/bigquery/docs/loading-data-cloud-storage-csv#data_types). Applies to CSV and JSON data. |
| `uris` | For external tables, including object tables, that aren't Bigtable tables: `ARRAY<STRING>` An array of fully qualified URIs for the external data locations. Each URI can contain one asterisk (`*`) [wildcard character](https://docs.cloud.google.com/bigquery/docs/loading-data-cloud-storage#load-wildcards), which must come after the bucket name. When you specify `uris` values that target multiple files, all of those files must share a compatible schema. The following examples show valid `uris` values: - `['gs://bucket/path1/myfile.csv']` - `['gs://bucket/path1/*.csv']` - `['gs://bucket/path1/*', 'gs://bucket/path2/file00*']` <br /> For Bigtable tables: `STRING` The URI identifying the Bigtable table to use as a data source. You can only specify one Bigtable URI. Example: `https://googleapis.com/bigtable/projects/project_id/instances/instance_id[/appProfiles/app_profile]/tables/table_name` For more information on constructing a Bigtable URI, see [Retrieve the Bigtable URI](https://docs.cloud.google.com/bigquery/docs/create-bigtable-external-table#bigtable-uri). |

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.tables.create` | The dataset where you create the external table. |

In addition, the `OR REPLACE` clause requires `bigquery.tables.update`
permission.

If the `OPTIONS` clause includes an expiration time, then the
`bigquery.tables.delete` permission is also required.

#### Examples

The following example creates a BigLake table and explicitly
specifies the schema. It also specifies refreshing metadata cache automatically
at a system-defined interval.

```googlesql
CREATE OR REPLACE EXTERNAL TABLE mydataset.newtable (x INT64, y STRING, z BOOL)
  WITH CONNECTION myconnection
  OPTIONS(
    format ="PARQUET",
    max_staleness = STALENESS_INTERVAL,
    metadata_cache_mode = 'AUTOMATIC');
```

The following example creates an external table from multiple URIs. The data
format is CSV. This example uses schema auto-detection.

```googlesql
CREATE EXTERNAL TABLE dataset.CsvTable OPTIONS (
  format = 'CSV',
  uris = ['gs://bucket/path1.csv', 'gs://bucket/path2.csv']
);
```

The following example creates an external table from a CSV file and explicitly
specifies the schema. It also specifies the field delimiter (`'|'`) and sets the
maximum number of bad records allowed.

```googlesql
CREATE OR REPLACE EXTERNAL TABLE dataset.CsvTable
(
  x INT64,
  y STRING
)
OPTIONS (
  format = 'CSV',
  uris = ['gs://bucket/path1.csv'],
  field_delimiter = '|',
  max_bad_records = 5
);
```

The following example creates an externally partitioned table. It uses schema
auto-detection to detect both the file schema and the hive partitioning
layout. If the external path is
`gs://bucket/path/field_1=first/field_2=1/data.parquet`, the partition columns
are detected as `field_1` (`STRING`) and `field_2` (`INT64`).

<br />

```googlesql
CREATE EXTERNAL TABLE dataset.AutoHivePartitionedTable
WITH PARTITION COLUMNS
OPTIONS (
  uris = ['gs://bucket/path/*'],
  format = 'PARQUET',
  hive_partition_uri_prefix = 'gs://bucket/path',
  require_hive_partition_filter = false);
```

<br />

The following example creates an externally partitioned table by explicitly
specifying the partition columns. This example assumes that the external file
path has the pattern `gs://bucket/path/field_1=first/field_2=1/data.parquet`.

<br />

```googlesql
CREATE EXTERNAL TABLE dataset.CustomHivePartitionedTable
WITH PARTITION COLUMNS (
  field_1 STRING, -- column order must match the external path
  field_2 INT64)
OPTIONS (
  uris = ['gs://bucket/path/*'],
  format = 'PARQUET',
  hive_partition_uri_prefix = 'gs://bucket/path',
  require_hive_partition_filter = false);
```

<br />

### `CREATE FUNCTION` statement

Creates a new [user-defined function](https://docs.cloud.google.com/bigquery/docs/user-defined-functions)
(UDF). BigQuery supports UDFs written in SQL, JavaScript, or
Python.

#### Syntax

To create a SQL UDF, use the following syntax:

Adapted (not in the official docs): removed the duplicated parameter list line.

```googlesql
CREATE [ OR REPLACE ] [ TEMPORARY | TEMP ] FUNCTION [ IF NOT EXISTS ]
    [[project_name.]dataset_name.]function_name
    ([named_parameter[, ...]])
  [RETURNS data_type]
  AS (sql_expression)
  [OPTIONS (function_option_list)]

named_parameter:
  param_name param_type
```

To create a JavaScript UDF, use the following syntax:

```googlesql
CREATE [OR REPLACE] [TEMPORARY | TEMP] FUNCTION [IF NOT EXISTS]
    [[project_name.]dataset_name.]function_name
    ([named_parameter[, ...]])
  RETURNS data_type
  [determinism_specifier]
  LANGUAGE js
  [OPTIONS (function_option_list)]
  AS javascript_code

named_parameter:
  param_name param_type

determinism_specifier:
  { DETERMINISTIC | NOT DETERMINISTIC }
```

To create a Python UDF, use the following syntax:

> [!WARNING]
>
> **Preview**
>
>
> This feature is
>
> subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the
> [Service Specific
> Terms](https://docs.cloud.google.com/terms/service-terms#1).
>
> Pre-GA features are available "as is" and might have limited support.
>
> For more information, see the
> [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

> [!NOTE]
> **Note:** For support during the preview, email [bq-python-udf-feedback@google.com](mailto:bq-python-udf-feedback@google.com).

```sql
CREATE [OR REPLACE] FUNCTION [IF NOT EXISTS]
    [project_name.]dataset_name.function_name
    ([named_parameter[, ...]])
  RETURNS data_type
  LANGUAGE python
  [WITH CONNECTION connection_name]
  OPTIONS (function_option_list)
  AS python_code

named_parameter:
  param_name param_type
```

To create a remote function, use the following syntax:

```googlesql
CREATE [OR REPLACE] [TEMPORARY | TEMP] FUNCTION [IF NOT EXISTS]
    [[project_name.]dataset_name.]function_name
    ([named_parameter[, ...]])
  RETURNS data_type
  REMOTE WITH CONNECTION connection_name
  [OPTIONS (function_option_list)]

named_parameter:
  param_name param_type
```

Routine names must contain only letters, numbers, and underscores, and be at most 256 characters long.

#### Arguments

- `OR REPLACE`: Replaces any function with the same name if it exists. Cannot
  appear with `IF NOT EXISTS`.

- `IF NOT EXISTS`: If any function exists with the same name, the `CREATE`
  statement has no effect. Cannot appear with `OR REPLACE`.

- `TEMP` or `TEMPORARY`: Creates a temporary function. If the clause is not
  present, the statement creates a persistent UDF. You can reuse persistent
  UDFs across multiple queries, whereas you can only use temporary UDFs in a
  single query, script, session, or procedure.

- `project_name`: For persistent functions, the name of the project where
  you are creating the function. Defaults to the project that runs the DDL
  query. Do not include the project name for temporary functions.

- `dataset_name`: For persistent functions, the name of the dataset where
  you are creating the function. Defaults to the `defaultDataset` in the
  request. Do not include the dataset name for temporary functions.

- `function_name`: The name of the function.

- `named_parameter`: A comma-separated `param_name`
  and `param_type` pair. The value of `param_type` is a
  BigQuery [data type](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types). For a SQL UDF, the
  value of `param_type` can also be `ANY TYPE`.

- `determinism_specifier`: Applies only to JavaScript UDFs.
  Provides a hint to BigQuery as to whether the query result can
  be cached. Can be one of the following values:

  - `DETERMINISTIC`: The function always returns the same result when passed
    the same arguments. The query result is potentially cacheable. For
    example, if the function `add_one(i)` always returns `i + 1`, the
    function is deterministic.

  - `NOT DETERMINISTIC`: The function does not always return the same result
    when passed the same arguments, and therefore is not cacheable. For
    example, if the function `add_random(i)` returns `i + rand()`, the
    function is not deterministic and BigQuery does not use
    cached results.

    If all of the invoked functions are `DETERMINISTIC`,
    BigQuery tries to cache the result, unless the results
    can't be cached for other reasons. For more information, see
    [Using cached query results](https://docs.cloud.google.com/bigquery/docs/cached-results).
- `data_type`: The data type that the function returns.

  - If the function is defined in SQL, then the `RETURNS` clause is
    optional. If the `RETURNS` clause is omitted, then BigQuery
    infers the result type of the function from the SQL function body when a
    query calls the function.

  - If the function is defined in JavaScript, then the `RETURNS` clause is
    required. For more information about allowed values for `data_type`,
    see [Supported
    JavaScript UDF data types](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/user-defined-functions#supported-javascript-udf-data-types).

- `sql_expression`: The SQL expression that defines the function.

- [`function_option_list`](#function_option_list): A list of options for
  creating the function.

- `javascript_code`: The definition of a JavaScript function. The value is a
  [string literal](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/lexical#string_and_bytes_literals).
  If the code includes quotes and backslashes, it must be either escaped or
  represented as a raw string. For example, the code `return "\n";` can be
  represented as one of the following:

  - Quoted string`"return \"\\n\";"`. Both quotes and backslashes need to be escaped.
  - Triple quoted string: `"""return "\\n";"""`. Backslashes need to be escaped, quotes don't.
  - Raw string: `r"""return "\n";"""`. No escaping is needed.
- `python_code`: The definition of a Python function. The value is a
  [string literal](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/lexical#string_and_bytes_literals).
  If the code includes quotes and backslashes, it must be escaped or
  represented as a raw string. For example, the code `return "\n";` can be
  represented as one of the following:

  - Quoted string: `"return \"\\n\";"`. Both quotes and backslashes need to be escaped.
  - Triple quoted string: `"""return "\\n";"""`. Backslashes need to be escaped, quotes don't.
  - Raw string: `r"""return "\n";"""`. No escaping is needed.
- `connection_name`: Specifies a
  [connection resource](https://docs.cloud.google.com/bigquery/docs/connections-api-intro) that has
  credentials for accessing the remote endpoint or for running Python code.
  Specify the connection name in the form
  `project_name.location.connection_id`: If the
  project name or location contains a dash, enclose the connection name in
  backticks (`` ` ``).

#### `function_option_list`

The option list specifies options for creating a UDF. The following options are
supported:

| `NAME` | `VALUE` | Details |
|---|---|---|
| `description` | `STRING` | A description of the UDF. This option isn't supported when creating a temporary function. |
| `library` | `ARRAY <STRING>` | An array of JavaScript libraries to include in the function definition. Applies only to JavaScript and Python UDFs. For more information, see [Including JavaScript libraries](https://docs.cloud.google.com/bigquery/docs/user-defined-functions-python#use-imported-lib). Example: `["gs://my-bucket/lib1.js", "gs://my-bucket/lib2.js"]` |
| `endpoint` | `STRING` | An HTTP endpoint of Cloud Functions. Applies only to remote functions. Example: `"https://us-east1-your-project.cloudfunctions.net/foo"` For more information, see [Create a remote function](https://docs.cloud.google.com/bigquery/docs/remote-functions#create_a_remote_function). |
| `user_defined_context` | `ARRAY <STRUCT <STRING,STRING>>` | A list of key-value pairs that will be sent with every HTTP request when the function is invoked. Applies only to remote functions. Example: `[("key1","value1"),("key2", "value2")]` |
| `max_batching_rows` | `INT64` | The maximum number of rows in each HTTP request. If not specified, BigQuery decides how many rows are included in a HTTP request. Applies only to remote functions and Python UDFs. |
| `runtime_version` | `STRING` | The name of the runtime version to run provided Python code. Applies only to Python UDFs. Example: `python-3.11` |
| `entry_point` | `STRING` | The name of the function defined in Python code as the entry point when the Python UDF is invoked. Applies only to Python UDFs. |
| `packages` | `ARRAY<STRING>` | An array of Python packages to install in the function definition. Applies only to Python UDFs. For more information, see [Use third party packages](https://docs.cloud.google.com/bigquery/docs/user-defined-functions-python#third-party-packages). Example: `["pandas>=2.1", "google-cloud-translate==3.11"]` |
| `container_cpu` | `FLOAT64` | Amount of CPU provisioned for a Python UDF container instance. Applied only to Python UDFs. For more information, see [Configure container limits for Python UDF](https://docs.cloud.google.com/bigquery/docs/user-defined-functions-python#configure-container-limits). |
| `container_memory` | `STRING` | Amount of memory provisioned for a Python UDF container instance. Applies only to Python UDFs. For more information, see [Configure container limits for Python UDF](https://docs.cloud.google.com/bigquery/docs/user-defined-functions-python#configure-container-limits). |
| `container_request_concurrency` | `INT64` | The maximum number of concurrent requests per Python UDF container instance. Must be an integer from `1` to `1000`. Applies only to Python UDFs. For more information, see [Configure container limits for Python UDF](https://docs.cloud.google.com/bigquery/docs/user-defined-functions-python#configure-container-limits). |
| `volume_mounts` | `ARRAY<STRING>` | In [Preview](https://cloud.google.com/products#product-launch-stages). An array of JSON strings detailing the source path and mount path for the volume mount. Applies only to Python UDFs. For more information see [Create a Python UDF with volume mounts](https://docs.cloud.google.com/bigquery/docs/user-defined-functions-python#volume-mounts). Example: `['{"source_path": "gs://my-udf-deps-bucket", "mount_path": "/mnt"}']` |

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.routines.create` | The dataset where you create the function. |

In addition, the `OR REPLACE` clause requires `bigquery.routines.update`
permission.

To create a remote function, additional [IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions) are needed:

| Permission | Resource |
|---|---|
| `bigquery.connections.delegate` | The connection which you use to create the remote function. |

#### Examples

##### Create a SQL UDF

The following example creates a persistent SQL UDF named `multiplyInputs` in
a dataset named `mydataset`.

```googlesql
CREATE FUNCTION mydataset.multiplyInputs(x FLOAT64, y FLOAT64)
RETURNS FLOAT64
AS (x * y);
```

##### Create a JavaScript UDF

The following example creates a temporary JavaScript UDF named `multiplyInputs`
and calls it from inside a `SELECT` statement.

```googlesql
CREATE TEMP FUNCTION multiplyInputs(x FLOAT64, y FLOAT64)
RETURNS FLOAT64
LANGUAGE js
AS r"""
  return x*y;
""";


SELECT multiplyInputs(a, b) FROM (SELECT 3 as a, 2 as b);
```

##### Create a remote function

The following example creates a temporary remote function named
`tempRemoteMultiplyInputs` in `US` location, using a connection called
`myconnection` in the 'US' region.

```googlesql
CREATE TEMP FUNCTION tempRemoteMultiplyInputs(x FLOAT64, y FLOAT64)
RETURNS FLOAT64
REMOTE WITH CONNECTION us.myconnection
OPTIONS(endpoint="https://us-central1-myproject.cloudfunctions.net/multiply");
```

The following example creates a persistent remote function named
`remoteMultiplyInputs` in a dataset named `mydataset` using a connection called
`myconnection`. The location and project of the dataset and the connection must
match.

```googlesql
CREATE FUNCTION mydataset.remoteMultiplyInputs(x FLOAT64, y FLOAT64)
RETURNS FLOAT64
REMOTE WITH CONNECTION us.myconnection
OPTIONS(endpoint="https://us-central1-myproject.cloudfunctions.net/multiply");
```

##### Create a Python UDF

The following example creates a Python UDF named `multiplyInputs`.

Adapted (not in the official docs): added the missing comma between the `runtime_version` and `packages` options.

```sql
CREATE FUNCTION mydataset.multiplyInputs(x FLOAT64, y FLOAT64)
RETURNS FLOAT64
LANGUAGE python
OPTIONS(entry_point='multiply', runtime_version='python-3.11', packages=['pandas==2.2'])
AS r"""
import pandas as pd

def multiply(df: pd.DataFrame):
  return df['x'] * df['y']

""";
```

### `CREATE AGGREGATE FUNCTION` statement (SQL)

Creates a new SQL [user-defined aggregate function](https://docs.cloud.google.com/bigquery/docs/user-defined-aggregates)
(UDAF).

#### Syntax

To create a SQL UDAF, use the following syntax:

Adapted (not in the official docs): renamed `data_type` / `sql_function_body` in the SQL UDAF syntax to the argument names defined below it.

```googlesql
CREATE
  [ OR REPLACE ]
  [ { TEMPORARY | TEMP } ]
  AGGREGATE FUNCTION
  [ IF NOT EXISTS ]
  function_path ( [ function_parameter[, ...] ] )
  [ RETURNS return_data_type ]
  AS ( function_body )
  [ OPTIONS ( function_option_list ) ]

function_path:
  [[project_name.]dataset_name.]function_name

function_parameter:
  parameter_name parameter_data_type [ NOT AGGREGATE ]
```

#### Arguments

- `OR REPLACE`: Replaces any function with the same name if it exists. `OR REPLACE` can't appear with `IF NOT EXISTS`.
- `IF NOT EXISTS`: If any function exists with the same name, the `CREATE` statement has no effect. `IF NOT EXISTS` can't appear with `OR REPLACE`.
- `TEMP` or `TEMPORARY`: The function is temporary; that is, it exists for the lifetime of a single query, script, session, or procedure. A temporary function can't have the same name as a built-in function. If the names match, an error is produced. If `TEMP` or `TEMPORARY` is not included, a persistent function is created. You can reuse persistent functions across multiple queries.
- `function_path`: The path where the function must be created and the name of the function.
  - `project_name`: For persistent functions, the name of the project where you are creating the function. Defaults to the project that runs the DDL query. Don't include the project name for temporary functions.
  - `dataset_name`: For persistent functions, the name of the dataset where you are creating the function. Defaults to `defaultDataset` in the request. Don't include the dataset name for temporary functions.
  - `function_name`: The name of the function. Function names must contain only letters, numbers, and underscores, and be at most 256 characters long.
- `function_parameter`: A parameter for the function.
  - `parameter_name`: The name of the function parameter.
  - `parameter_data_type`: The GoogleSQL [data type](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types) for the function parameter.
  - `NOT AGGREGATE`: The function parameter is not an aggregate. A non-aggregate function parameter can appear anywhere in the function definition.
- `return_data_type`: The GoogleSQL data type that the function should return. GoogleSQL infers the result data type of the function from the function body when the `RETURN` clause is omitted.
- `function_body`: The SQL expression that defines the function body.
- `function_option_list`: A list of options for creating the function. For more information, see [`function_option_list`](#function_option_list-1).

#### `function_option_list`

The option list specifies options for creating a SQL UDAF. The following
options are supported:

| `NAME` | `VALUE` | Details |
|---|---|---|
| `description` | `STRING` | A description of the UDAF. |

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.routines.create` | The dataset where you create the function. |

In addition, the `OR REPLACE` clause requires the `bigquery.routines.update`
permission.

#### Examples

##### Create and call a SQL UDAF

The following example shows a persistent SQL UDAF that includes a
non-aggregate function parameter. Inside the function definition, the
aggregate `SUM` method takes the aggregate function parameter dividend,
while the non-aggregate division operator ( `/` ) takes the
non-aggregate function parameter divisor.

```googlesql
CREATE AGGREGATE FUNCTION myProject.myDataset.ScaledSum(
  dividend FLOAT64,
  divisor FLOAT64 NOT AGGREGATE)
RETURNS FLOAT64
AS (
  SUM(dividend) / divisor
);

-- Call the SQL UDAF.
SELECT ScaledSum(col1, 2) AS scaled_sum
FROM (
  SELECT 1 AS col1 UNION ALL
  SELECT 3 AS col1 UNION ALL
  SELECT 5 AS col1
);

/*------------*
 | scaled_sum |
 +------------+
 | 4.5        |
 *------------*/
```

### `CREATE AGGREGATE FUNCTION` statement (JavaScript)

Creates a new [JavaScript user-defined aggregate function](https://docs.cloud.google.com/bigquery/docs/user-defined-aggregates)
(UDAF).

#### Syntax

To create a JavaScript UDAF, use the following syntax:

```googlesql
CREATE
  [ OR REPLACE ]
  [ { TEMPORARY | TEMP } ]
  AGGREGATE FUNCTION
  [ IF NOT EXISTS ]
  function_path([ function_parameter[, ...] ])
  RETURNS return_data_type
  LANGUAGE js
  [ OPTIONS ( function_option_list ) ]
  AS function_body

function_path:
  [[project_name.]dataset_name.]function_name

function_parameter:
  parameter_name parameter_data_type [ NOT AGGREGATE ]
```

#### Arguments

- `OR REPLACE`: Replaces any function with the same name if it exists. `OR REPLACE` can't appear with `IF NOT EXISTS`.
- `IF NOT EXISTS`: If any function exists with the same name, the `CREATE` statement has no effect. `IF NOT EXISTS` can't appear with `OR REPLACE`.
- `TEMP` or `TEMPORARY`: The function is temporary; that is, it exists for the lifetime of a single query, script, session, or procedure. A temporary function can't have the same name as a built-in function. If the names match, an error is produced. If `TEMP` or `TEMPORARY` is not included, a persistent function is created. You can reuse persistent functions across multiple queries.
- `function_path`: The path where the function must be created and the name of the function.
  - `project_name`: For persistent functions, the name of the project where you are creating the function. Defaults to the project that runs the DDL query. Don't include the project name for temporary functions.
  - `dataset_name`: For persistent functions, the name of the dataset where you are creating the function. Defaults to `defaultDataset` in the request. Don't include the dataset name for temporary functions.
  - `function_name`: The name of the function. Function names must contain only letters, numbers, and underscores, and be at most 256 characters long.
- `function_parameter`: A parameter for the function.
  - `parameter_name`: The name of the function parameter.
  - `parameter_data_type`: The GoogleSQL [data type](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types) for the function parameter.
  - `NOT AGGREGATE`: The function parameter is not an aggregate. Only one non-aggregate function parameter is allowed per JavaScript UDAF, and it must be the last parameter in the list.
- `return_data_type`: The GoogleSQL data type that the function should return.
- `function_body`: The JavaScript expression that defines the function body. For more information, see [`function_body`](#function_body).
- `function_option_list`: A list of options for creating the function. For more information, see [`function_option_list`](#function_option_list-2).

#### `function_body`

The body of the JavaScript function must be a quoted string literal
that represents the JavaScript code. To learn more about the different types of
quoted string literals you can use, see [Formats for quoted literals](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/lexical#quoted_literals).

Only certain type encodings are allowed. To learn more,
see [SQL type encodings in a JavaScript UDAF](#sql-type-encodings-in-a-javascript-udaf).

The JavaScript function body must include four JavaScript functions
that initialize, aggregate, merge, and finalize the results for the
JavaScript UDAF. To learn more about the `initialState`, `aggregate`, `merge`,
and `finalize` JavaScript functions, see [Required aggregate functions in a JavaScript UDAF](#required-aggregation-functions-in-a-javascript-udaf).

Only serialized data can be passed into the JavaScript aggregate functions.
If you need to serialize data such as functions or symbols to pass them into
the aggregate functions, use the JavaScript serialization functions.
For more information, see [Serialization functions for a JavaScript UDAF](#serialization-functions-for-a-javascript-udaf).

#### `function_option_list`

The option list specifies options for creating a JavaScript UDAF. The following
options are supported:

| `NAME` | `VALUE` | Details |
|---|---|---|
| `description` | `STRING` | A description of the UDAF. |
| `library` | `ARRAY<STRING>` | An array of JavaScript libraries to include in the JavaScript UDAF function body. Example: `["gs://my-bucket/lib1.js", "gs://my-bucket/lib2.js"]` |

#### SQL type encodings in a JavaScript UDAF

In JavaScript UDAFs,
[GoogleSQL data types](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types)
represent [JavaScript data types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)
in the following manner:

| GoogleSQL data type | JavaScript data type | Notes |
|---|---|---|
| `ARRAY` | `Array` | An array of arrays is not supported. To get around this limitation, use the `Array<Object<Array>>` (JavaScript) and `ARRAY<STRUCT<ARRAY>>` (GoogleSQL) data types. |
| `BIGNUMERIC` | `Number` or `String` | Same as `NUMERIC`. |
| `BOOL` | `Boolean` |   |
| `BYTES` | `Uint8Array` |   |
| `DATE` | `Date` |   |
| `FLOAT64` | `Number` |   |
| `INT64` | `BigInt` |   |
| `JSON` | Various types | The GoogleSQL `JSON` data type can be converted into a JavaScript `Object`, `Array`, or other GoogleSQL-supported JavaScript data type. |
| `NUMERIC` | `Number` or `String` | If a `NUMERIC` value can be represented exactly as an [IEEE 754 floating-point](https://en.wikipedia.org/wiki/Floating-point_arithmetic#IEEE_754:_floating_point_in_modern_computers) value (range `[-2^53, 2^53]`), and has no fractional part, it is encoded as a `Number` data type, otherwise it is encoded as a `String` data type. |
| `STRING` | `String` |   |
| `STRUCT` | `Object` | Each `STRUCT` field is a named property in the `Object` data type. An unnamed `STRUCT` field is not supported. |
| `TIMESTAMP` | `Date` | `Date` contains a microsecond field with the microsecond fraction of `TIMESTAMP`. |

> [!NOTE]
> **Note:** The SQL encodings for JavaScript UDAFs are different from those for JavaScript UDFs.

#### Required aggregation functions in a JavaScript UDAF

The JavaScript function body must include the following exportable
JavaScript functions:

- `initialState` function: Sets up the initial aggregation state of the UDAF
  and then returns the initial aggregation state.

  **Syntax:**

  ```javascript
  export function initialState([nonAggregateParam]){...}
  ```

  **Parameters:**
  - `nonAggregateParam`: Replace this parameter with a `NOT AGGREGATE` function parameter name.

  **Examples:**

  ```javascript
  export function initialState(){...}
  ```

  ```javascript
  export function initialState(initialSum){...}
  ```
- `aggregate` function: Aggregates one row of data, updating state to store
  the result of the aggregation. Doesn't return a value.

  **Syntax:**

  ```javascript
  export function aggregate(state, aggregateParam[, ...][, nonAggregateParam]){...}
  ```

  **Parameters:**
  - `state`: The aggregate state, which is `initialState` on the
    first invocation, and then the return value of the previous call to
    `aggregate` thereafter.

  - `aggregateParam`: The name of an aggregation parameter in the
    JavaScript UDAF. The argument for this parameter will be aggregated.

  - `nonAggregateParam`: Replace with a `NOT AGGREGATE`
    function parameter name.

  **Example:**

  ```javascript
  export function aggregate(currentState, aggX, aggWeight, initialSum)
  ```
- `merge` function: Combines two aggregation states from a prior call
  to the `aggregate`, `merge`, or `initialState` function. This function does
  not return a value.

  **Syntax:**

  ```javascript
  export function merge(state, partialState[, nonAggregateParam]){...}
  ```

  **Parameters:**
  - `state`: The state into which `partialState` is merged.

  - `partialState`: The second aggregation state to merge.

  - `nonAggregateParam`: Replace with a `NOT AGGREGATE`
    function parameter name.

  **Details:**

  Depending on the size and organization of the underlying data being queried,
  the `merge` function might or might not be called. For example, if a
  particular set of data is small, or the data is partitioned in a way that
  results in small sets of data, the `merge` function won't be called.

  **Example:**

  ```javascript
  export function merge(currentState, partialState, initialSum)
  ```
- `finalize` function: Computes the final aggregation result and then returns
  this result for the UDAF.

  **Syntax:**

  ```javascript
  export function finalize(state[, nonAggregateParam]){...}
  ```

  **Parameters:**
  - `state`: The final aggregation state.

  - `nonAggregateParam`: Replace with a `NOT AGGREGATE`
    function parameter name.

  The final aggregation state is returned by the `merge` function
  (or `aggregate` function if
  `merge` is never invoked). If the input is empty after `NULL` filtering,
  the final aggregation state is `initialState`.

  **Example:**

  ```javascript
  export function finalize(finalState, initialSum)
  ```

#### Serialization functions for a JavaScript UDAF

If you want to work with non-serializable aggregation states, the
JavaScript UDAF must provide the `serialize` and `deserialize` functions:

- `serialize` function: Converts an aggregation state into a
  BigQuery-serializable object. An object in JavaScript
  is BigQuery-serializable if all fields
  are a JavaScript primitive data type (for example, `String`,
  `Number`, `null`, `undefined`), another
  BigQuery-serializable object, or a JavaScript
  `Array`, where all elements are either primitives or
  BigQuery-serializable objects.

  Syntax:

  ```javascript
  export function serialize(state[, nonAggregateParam]){...}
  ```

  Arguments:
  - `state`: The aggregation state to serialize.

  - `nonAggregateParam`: Replace with a `NOT AGGREGATE`
    function parameter name.

  Example:

  ```javascript
  export function serialize(stateToSerialize, initialSum)
  ```
- `deserialize` function: Converts a serialized state into an aggregation
  state. An aggregated state can be passed into the `serialize`, `aggregate`,
  `merge`, and `finalize` functions.

  Syntax:

  ```javascript
  export function deserialize(serializedState[, nonAggregateParam]){...}
  ```

  Arguments:
  - `serializedState`: The serialized state to convert into the aggregation
    state.

  - `nonAggregateParam`: Replace with a `NOT AGGREGATE`
    function parameter name.

  Example:

  ```javascript
  export function deserialize(stateToDeserialize, initialSum)
  ```

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.routines.create` | The dataset where you create the function. |

In addition, the `OR REPLACE` clause requires the `bigquery.routines.update`
permission.

#### Examples

##### Calculate the positive sum of all rows

A JavaScript UDAF is similar to a JavaScript UDF, but defines an
aggregate function instead of a scalar function. In the following example,
a temporary JavaScript UDAF calculates the sum of all rows that have a
positive value. The JavaScript UDAF body is quoted within a raw string:

```googlesql
CREATE TEMP AGGREGATE FUNCTION SumPositive(x FLOAT64)
RETURNS FLOAT64
LANGUAGE js
AS r'''
  export function initialState() {
    return {sum: 0}
  }
  export function aggregate(state, x) {
    if (x > 0) {
      state.sum += x;
    }
  }
  export function merge(state, partialState) {
    state.sum += partialState.sum;
  }
  export function finalize(state) {
    return state.sum;
  }
''';

-- Call the JavaScript UDAF.
WITH numbers AS (
  SELECT * FROM UNNEST([1.0, -1.0, 3.0, -3.0, 5.0, -5.0]) AS x)
SELECT SumPositive(x) AS sum
FROM numbers;

/*-----*
 | sum |
 +-----+
 | 9.0 |
 *-----*/
```

##### Get the weighted average of all rows

A JavaScript UDAF can have aggregate and non-aggregate parameters.
In the following example, the JavaScript UDAF calculates the weighted average
for `x` after starting with an initial sum (`initialSum`). `x` and `weight` are
aggregate parameters, and `initialSum` is a non-aggregate parameter:

```googlesql
CREATE OR REPLACE AGGREGATE FUNCTION my_project.my_dataset.WeightedAverage(
    x INT64,
    weight FLOAT64,
    initialSum FLOAT64 NOT AGGREGATE)
RETURNS INT64
LANGUAGE js
AS '''
   export function initialState(initialSum) {
     return {count: 0, sum: initialSum}
   }
   export function aggregate(state, x, weight) {
     state.count += 1;
     state.sum += Number(x) * weight;
   }
   export function merge(state, partialState) {
     state.sum += partialState.sum;
     state.count += partialState.count;
   }
   export function finalize(state) {
     return state.sum / state.count;
   }
''';

SELECT my_project.my_dataset.WeightedAverage(item, weight, 2) AS weighted_average
FROM (
  SELECT 1 AS item, 2.45 AS weight UNION ALL
  SELECT 3 AS item, 0.11 AS weight UNION ALL
  SELECT 5 AS item, 7.02 AS weight
);

/*------------------*
 | weighted_average |
 +------------------+
 | 13               |
 *------------------*/
```

### `CREATE TABLE FUNCTION` statement

Creates a new [table function](https://docs.cloud.google.com/bigquery/docs/table-functions),
also called a *table-valued function* (TVF).

#### Syntax

```googlesql
CREATE [ OR REPLACE ] TABLE FUNCTION [ IF NOT EXISTS ]
  [[project_name.]dataset_name.]function_name
  ( [ function_parameter [, ...] ] )
  [RETURNS TABLE < column_declaration [, ...] > ]
  [OPTIONS (table_function_options_list) ]
  AS sql_query

function_parameter:
  parameter_name { data_type | ANY TYPE | TABLE < column_declaration [, ...] > }

column_declaration:
  column_name data_type
```

#### Arguments

- `OR REPLACE`: Replaces any table function with the same name if it exists. Cannot appear with `IF NOT EXISTS`.
- `IF NOT EXISTS`: If any table function exists with the same name, the `CREATE` statement has no effect. Cannot appear with `OR REPLACE`.
- `project_name`: The name of the project where you are creating the function. Defaults to the project that runs this DDL statement.
- `dataset_name`: The name of the dataset where you are creating the function.
- `function_name`: The name of the function to create.
- `function_parameter`: A parameter for the function, specified as a parameter name and a data type. The value of `data_type` is a scalar BigQuery [data type](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types) or `ANY TYPE`, or a table schema. Using [table parameters](https://docs.cloud.google.com/bigquery/docs/table-functions#table_parameters) in a table function is in [Preview](https://cloud.google.com/products#product-launch-stages).
- `RETURNS TABLE`: The schema of the table that the function returns, specified as a comma-separated list of column name and data type pairs. If `RETURNS
  TABLE` is absent, BigQuery infers the output schema from the query statement in the function body. If `RETURNS TABLE` is included, the names in the returned table type must match column names from the SQL query.
- `sql_query`: Specifies the SQL query to run. The SQL query must include names for all columns.

#### `table_function_options_list`

The `table_function_options_list` lets you specify table function options. Table function
options have the same syntax and requirements as table options but with a
different list of `NAME`s and `VALUE`s:

| `NAME` | `VALUE` | Details |
|---|---|---|
| `description` | `STRING` | The description of the table function. |

#### Details

BigQuery coerces argument types when possible. For example, if
the parameter type is `FLOAT64` and you pass an `INT64` value, then
BigQuery coerces it to a `FLOAT64`.

If a parameter type is `ANY TYPE`, the function accepts an input of any type for
this argument. The type that you pass to the function must be compatible with
the function definition. If you pass an argument with an incompatible type, the
query returns an error. If more than one parameter has type `ANY TYPE`,
BigQuery does not enforce any type relationship between them.
If the parameter type is a table schema, the function accepts
an input table containing a superset of those columns in any order.

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.routines.create` | The dataset where you create the table function. |

In addition, the `OR REPLACE` clause requires `bigquery.routines.update`
permission.

#### Examples

The following table function takes an `INT64` parameter that is used to filter
the results of a query:

```googlesql
CREATE OR REPLACE TABLE FUNCTION mydataset.names_by_year(y INT64)
AS
  SELECT year, name, SUM(number) AS total
  FROM `bigquery-public-data.usa_names.usa_1910_current`
  WHERE year = y
  GROUP BY year, name
```

The following example specifies the return `TABLE` type in the `RETURNS` clause:

```googlesql
CREATE OR REPLACE TABLE FUNCTION mydataset.names_by_year(y INT64)
RETURNS TABLE<name STRING, year INT64, total INT64>
AS
  SELECT year, name, SUM(number) AS total
  FROM `bigquery-public-data.usa_names.usa_1910_current`
  WHERE year = y
  GROUP BY year, name
```

The following example computes total sales for items with the name
`item_name` from the `orders` table:

```googlesql
CREATE TABLE FUNCTION mydataset.compute_sales (
  orders TABLE<item STRING, sales INT64>, item_name STRING)
AS (
  SELECT SUM(sales) AS total_sales, item
  FROM orders
  WHERE item = item_name
  GROUP BY item
);
```

### `CREATE PROCEDURE` statement

Creates a new [procedure](https://docs.cloud.google.com/bigquery/docs/procedures),
which is a block of statements that can be called from other queries.
Procedures can call themselves recursively.

#### Syntax

To create a [GoogleSQL stored procedure](https://docs.cloud.google.com/bigquery/docs/procedures),
use the following syntax:

```googlesql
CREATE [OR REPLACE] PROCEDURE [IF NOT EXISTS]
[[project_name.]dataset_name.]procedure_name (procedure_argument[, ...] )
[OPTIONS(procedure_option_list)]
BEGIN
multi_statement_query
END;

procedure_argument: [procedure_argument_mode] argument_name argument_type

procedure_argument_mode: IN | OUT | INOUT
```

To create a [stored procedure for Apache Spark](https://docs.cloud.google.com/bigquery/docs/spark-procedures),
use the following syntax:

```googlesql
CREATE [OR REPLACE] PROCEDURE [IF NOT EXISTS]
[[project_name.]dataset_name.]procedure_name (procedure_argument[, ...] )
[EXTERNAL SECURITY external_security]
WITH CONNECTION connection_project_id.connection_region.connection_id
[OPTIONS(procedure_option_list)]
LANGUAGE language [AS pyspark_code]

procedure_argument: [procedure_argument_mode] argument_name argument_type

procedure_argument_mode: IN | OUT | INOUT

external_security: INVOKER
```

#### Arguments

- `OR REPLACE`: Replaces any procedure with the same name if it exists. Cannot
  appear with `IF NOT EXISTS`.

- `IF NOT EXISTS`: If any procedure exists with the same name, the `CREATE`
  statement has no effect. Cannot appear with `OR REPLACE`.

- `project_name`: The name of the project where you are creating the
  procedure. Defaults to the project that runs this DDL query. If the project
  name contains special characters such as colons, it should be quoted in backticks
  `` ` `` (example: `` `google.com:my_project` ``).

- `dataset_name`: The name of the dataset where you are creating the procedure.
  Defaults to the `defaultDataset` in the request.

- `procedure_name`: The name of the procedure to create.

- `external_security`: The procedure to be executed with the privileges of
  the user that calls it.

- `connection_project_id`: the project that
  contains the [connection](https://docs.cloud.google.com/bigquery/docs/connect-to-spark) to run
  Spark procedures---for example, `myproject`.

- `connection_region`: the region that
  contains the connection to run Spark
  procedures---for example, `us`.

- `connection_id`: the connection ID---for example, `myconnection`.

  When you [view the connection details](https://docs.cloud.google.com/bigquery/docs/working-with-connections#view-connections)
  in the Google Cloud console, the connection ID is the value in the last
  section of the fully qualified connection ID that is shown in
  **Connection ID** ---for example
  `projects/myproject/locations/connection_location/connections/*myconnection*`.

  For more information, see
  [Create a stored procedure for Apache Spark](https://docs.cloud.google.com/bigquery/docs/spark-procedures#create-spark-procedure).
- `multi_statement_query`: The [multi-statement query](https://docs.cloud.google.com/bigquery/docs/multi-statement-queries)
  to run.

- `language`: The language in which the stored procedure for Apache Spark is
  written. BigQuery supports stored procedures for Apache
  Spark that are written in Python, Java, or Scala.

- `pyspark_code`: The PySpark code for the stored procedure for Apache Spark if
  you want to pass the body of the procedure inline. Cannot appear with
  `main_file_uri` in [`procedure_option_list`](#procedure_option_list).

- `argument_type`: Any valid BigQuery
  [type](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types).

- `procedure_argument_mode`: Specifies whether an argument is an input, an
  output, or both.

#### `procedure_option_list`

The `procedure_option_list` lets you specify procedure options. Procedure
options have the same syntax and requirements as table options but with a
different list of `NAME`s and `VALUE`s:

| `NAME` | `VALUE` | Details |
|---|---|---|
| `strict_mode` | `BOOL` | It is useful for catching many common types of errors. The errors are not exhaustive, and successful creation of a procedure with `strict_mode` doesn't guarantee that the procedure will successfully execute at runtime. If `strict_mode` is `TRUE`, the procedure body undergoes additional checks for errors such as non-existent tables or columns. The `CREATE PROCEDURE` statement fails if the body fails any of these checks. If `strict_mode` is `FALSE`, the procedure body is checked only for syntax. Procedures which invoke themselves recursively should be created with `strict_mode=FALSE` to avoid errors caused by the procedure not yet existing while it is being validated. Default value is `TRUE`. Example: `strict_mode=FALSE` |
| `description` | `STRING` | A description of the procedure. Example: `description="A procedure that runs a query."` |
| `engine` | `STRING` | The engine type for processing stored procedures for Apache Spark. Must be specified for stored procedures for Spark. Valid value: `engine="SPARK"` |
| `runtime_version` | `STRING` | The runtime version of stored procedures for Spark. If not specified, the system default runtime version is used. Stored procedures for Spark support the same list of runtime versions as Managed Service for Apache Spark. However, we recommend to specify a runtime version. For more information, see [Managed Service for Apache Spark runtime releases](https://docs.cloud.google.com/dataproc-serverless/docs/concepts/versions/spark-runtime-versions). Example: `runtime_version="1.1"` |
| `container_image` | `STRING` | Custom container image for the runtime environment of the stored procedure for Spark. If not specified, the system default container image that includes the default Spark, Java, and Python packages associated with a runtime version is used. You can provide a custom container Docker image that includes your own built Java or Python dependencies. As Spark is mounted into your custom container at runtime, you must omit Spark in your custom container image. For optimized performance, we recommend you to host your image in Artifact Registry. For more information, see [Use custom containers with Managed Service for Apache Spark](https://docs.cloud.google.com/dataproc-serverless/docs/guides/custom-containers). Example: `container_image="us-docker.pkg.dev/my-project-id/my-images/my-image"` |
| `properties` | `ARRAY<STRUCT<STRING, STRING>>` | A key-value pair to include properties for stored procedures for Spark. Stored procedures for Spark support most of the [Spark properties](https://spark.apache.org/docs/latest/configuration.html#spark-properties) and a list of [Managed Service for Apache Spark properties](https://docs.cloud.google.com/dataproc-serverless/docs/concepts/properties#custom_spark_properties). If you specify unsupported Spark properties such as YARN-related Spark properties, BigQuery fails to create the stored procedure. You can add Spark properties using the following format: `[("key1","value1"),("key2", "value2")]` For example: ```bash bq query --nouse_legacy_sql --dry_run 'CREATE PROCEDURE my_bq_project.my_dataset.spark_proc() WITH CONNECTION `my-project-id.us.my-connection` OPTIONS( engine="SPARK", main_file_uri="gs://my-bucket/my-pyspark-main.py", properties=[ ("spark.executor.instances", "3"), ("spark.yarn.am.memory", "3g") ]) LANGUAGE PYTHON' # Error in query string: Invalid value: \ Invalid properties: \ Attempted to set unsupported properties: \ [spark:spark.yarn.am.memory] at [1:1] ``` > [!NOTE] > **Note:** You can use the [BigQuery dry run feature](https://docs.cloud.google.com/bigquery/docs/running-queries#dry-run) to validate your stored procedure without creating it. |
| `main_file_uri` | `STRING` | The Cloud Storage URI of the main Python, Scala, or Java JAR file of the Spark application. Applies only to stored procedures for Spark. Alternatively, if you want to add the body of the stored procedure that's written in Python in the `CREATE PROCEDURE` statement, add the code after `LANGUAGE PYTHON AS` as shown in the example in [Use inline code](https://docs.cloud.google.com/bigquery/docs/spark-procedures#use-inline-code). Example: `main_file_uri="gs://my-bucket/my-pyspark-main.py"` For Scala and Java languages, this field contains a path to only one JAR file. You can set only one value for `main_file_uri` and `main_class`. Example: `main_file_uri="gs://my-bucket/my-scala-main.jar"` |
| `main_class` | `STRING` | Applies only to stored procedures for Spark written in Java and Scala. Specify a fully-qualified class name in a JAR set with the `jar_uris` option. You can set only one value for `main_file_uri` and `main_class`. Example: `main_class="com.example.wordcount"` |
| `py_file_uris` | `ARRAY<STRING>` | Python files to be placed on the `PYTHONPATH` for a PySpark application. Applies only to stored procedures for Apache Spark written in Python. Optional. Cloud Storage URIs of Python files to pass to the PySpark framework. Supported file formats include the following: `.py`, `.egg`, and `.zip`. Example: `py_file_uris=[ "gs://my-bucket/my-pyspark-file1.py", "gs://my-bucket/my-pyspark-file2.py" ]` |
| `jar_uris` | `ARRAY<STRING>` | Path to the JAR files to include on the driver and executor classpaths. Applies only to stored procedures for Apache Spark. Optional. Cloud Storage URIs of JAR files to add to the classpath of the Spark driver and tasks. Example: `jar_uris=["gs://my-bucket/my-lib1.jar", "gs://my-bucket/my-lib2.jar"]` |
| `file_uris` | `ARRAY<STRING>` | Files to be placed in the working directory of each executor. Applies only to stored procedures for Apache Spark. Optional. Cloud Storage URIs of files to be placed in the working directory of each executor. Example: `file_uris=["gs://my-bucket/my-file1", "gs://my-bucket/my-file2"] ` |
| `archive_uris` | `ARRAY<STRING>` | Archive files to be extracted into the working directory of each executor. Applies only to stored procedures for Apache Spark. Optional. Cloud Storage URIs of archives to be extracted into the working directory of each executor. Supported file formats include the following: `.jar`, `.tar`, `.tar.gz`, `.tgz`, and `.zip`. Example: `archive_uris=["gs://my-bucket/my-archive1.zip", "gs://my-bucket/my-archive2.zip"]` |

##### Argument mode

`IN` indicates that the argument is only an input to the procedure. You can
specify either a variable or a value expression for `IN` arguments.

`OUT` indicates that the argument is an output of the procedure. An `OUT`
argument is initialized to `NULL` when the procedure starts. You
must specify a variable for `OUT` arguments.

`INOUT` indicates that the argument is both an input to and an output from
the procedure. You must specify a variable for `INOUT` arguments. An `INOUT`
argument can be referenced in the body of a procedure as a variable and assigned
new values.

If neither `IN`, `OUT`, nor `INOUT` is specified, the argument is treated as an
`IN` argument.

##### Variable scope

If a variable is declared outside a procedure, passed as an INOUT or OUT argument to a procedure, and the procedure assigns a new value to that variable, that new value is visible outside of the procedure.

Variables declared in a procedure are not visible outside of the procedure,
and vice versa.

An `OUT` or `INOUT` argument can be assigned a value using `SET`, in which case
the modified value is visible outside of the procedure. If the procedure exits
successfully, then the value of the `OUT` or `INOUT` argument is the final value
assigned to that `INOUT` variable.

[Temporary tables](data-definition-language-1.md#create-table-statement) exist for the duration of the
script, so if a procedure creates a temporary table, the caller of the procedure
will be able to reference the temporary table as well.

#### Default project in procedure body

Procedure bodies can reference entities without specifying the project; the
default project is the project which owns the procedure, not necessarily the
project used to run the `CREATE PROCEDURE` statement. Consider the sample query
below.

```googlesql
CREATE PROCEDURE myProject.myDataset.QueryTable()
BEGIN
  SELECT * FROM anotherDataset.myTable;
END;
```

After creating the above procedure, you can run the query
`CALL myProject.myDataset.QueryTable()`. Regardless of the project you
choose to run this `CALL` query, the referenced table `anotherDataset.myTable`
is always resolved against project `myProject`.

#### Required permissions

This statement requires the following
[IAM permission](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.routines.create` | The dataset where you create the procedure. |

To create a stored procedure for Apache Spark, additional [IAM permission](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions) are needed:

| Permission | Resource |
|---|---|
| `bigquery.connections.delegate` | The connection which you use to [create the stored procedure for Apache Spark](https://docs.cloud.google.com/bigquery/docs/spark-procedures#create-spark-procedure). |

In addition, the `OR REPLACE` clause requires `bigquery.routines.update`
permission.

#### SQL examples

You can also see [examples of stored procedures for
Apache Spark](https://docs.cloud.google.com/bigquery/docs/spark-procedures#example-spark-procedure).

The following example creates a SQL procedure that both takes `x` as an input
argument and returns `x` as output; because no argument mode is present for the
argument `delta`, it is an input argument. The procedure consists of a block
containing a single statement, which assigns the sum of the two input arguments
to `x`.

```googlesql
CREATE PROCEDURE mydataset.AddDelta(INOUT x INT64, delta INT64)
BEGIN
  SET x = x + delta;
END;
```

The following example calls the `AddDelta` procedure from the example above,
passing it the variable `accumulator` both times; because the changes to `x`
within `AddDelta` are visible outside of `AddDelta`, these procedure calls
increment `accumulator` by a total of 8.

```googlesql
DECLARE accumulator INT64 DEFAULT 0;
CALL mydataset.AddDelta(accumulator, 5);
CALL mydataset.AddDelta(accumulator, 3);
SELECT accumulator;
```

This returns the following:

```googlesql
+-------------+
| accumulator |
+-------------+
|           8 |
+-------------+
```

The following example creates the procedure `SelectFromTablesAndAppend`, which
takes `target_date` as an input argument and returns `rows_added` as an output.
The procedure creates a temporary table `DataForTargetDate` from a query; then,
it calculates the number of rows in `DataForTargetDate` and assigns the result
to `rows_added`. Next, it selects the rows of `DataForTargetDate` together with
`target_date`, which is a parameter. Finally, it drops the table
`DataForTargetDate` and returns `rows_added`.

```googlesql
CREATE PROCEDURE mydataset.SelectFromTablesAndAppend(
  target_date DATE, OUT rows_added INT64)
BEGIN
  CREATE TEMP TABLE DataForTargetDate AS
  SELECT t1.id, t1.x, t2.y
  FROM dataset.partitioned_table1 AS t1
  JOIN dataset.partitioned_table2 AS t2
  ON t1.id = t2.id
  WHERE t1.date = target_date
    AND t2.date = target_date;

  SET rows_added = (SELECT COUNT(*) FROM DataForTargetDate);

  SELECT id, x, y, target_date  -- note that target_date is a parameter
  FROM DataForTargetDate;

  DROP TABLE DataForTargetDate;
END;
```

The following example declares a variable `rows_added`, then passes it as an
argument to the `SelectFromTablesAndAppend` procedure from the previous example,
along with the value of `CURRENT_DATE`; then it returns a message stating how
many rows were added.

```googlesql
DECLARE rows_added INT64;
CALL mydataset.SelectFromTablesAndAppend(CURRENT_DATE(), rows_added);
SELECT FORMAT('Added %d rows', rows_added);
```

### `CREATE ROW ACCESS POLICY` statement

Creates or replaces a
[row-level access policy](https://docs.cloud.google.com/bigquery/docs/row-level-security-intro). Row-level
access policies on a table must have unique names.

#### Syntax

```googlesql
CREATE [ OR REPLACE ] ROW ACCESS POLICY [ IF NOT EXISTS ]
row_access_policy_name ON table_name
[GRANT TO (grantee_list)]
FILTER USING (filter_expression);
```

#### Arguments

- `IF NOT EXISTS`: If any row-level access policy exists with the same name, the
  `CREATE` statement has no effect. Cannot appear with `OR REPLACE`.

- `row_access_policy_name`: The name of the row-level access policy that you are
  creating. The row-level access policy name must be unique for each table. The
  row-level access policy name can contain the following:

  - Up to 256 characters.
  - Letters (upper or lowercase), numbers, and underscores. Must start with a letter.
- `table_name`: The name of the table that you want to create a row-level access
  policy for. The table must already exist.

- `GRANT TO grantee_list`: An optional clause that specifies the initial
  members that the row-level access policy should be created with.

  > [!CAUTION]
  > **Caution:** If no `grantee_list` is provided, then the row-level access policy for the specified filter is initialized with no principals. This configuration prevents all data reads by everyone.

  `grantee_list` is a list of `iam_member` users or groups. Strings must be
  valid [IAM principals](https://docs.cloud.google.com/iam/docs/overview#concepts_related_identity), or
  members, following the format of an
  [IAM Policy Binding member](https://docs.cloud.google.com/iam/docs/reference/rest/v1/Binding),
  and must be quoted. The following types are supported:

  Example: `user:alice@example.com`

  | `grantee_list` types ||
  |---|---|
  | `user:{emailid}` | An email address that represents a specific Google account. |
  | `serviceAccount:{emailid}` | An email address that represents a service account. Example: `serviceAccount:my-other-app@appspot.gserviceaccount.com` |
  | `group:{emailid}` | An email address that represents a Google group. Example: `group:admins@example.com` |
  | `domain:{domain}` | The Google Workspace domain (primary) that represents all the users of that domain. Example: `domain:example.com` |
  | `allAuthenticatedUsers` | A special identifier that represents all service accounts and all users on the internet who have authenticated with a Google Account. This identifier includes accounts that aren't connected to a Google Workspace or Cloud Identity domain, such as personal Gmail accounts. Users who aren't authenticated, such as anonymous visitors, aren't included. |
  | `allUsers` | A special identifier that represents anyone who is on the internet, including authenticated and unauthenticated users. Because BigQuery requires authentication before a user can access the service, `allUsers` includes only authenticated users. |

  You can combine a series of `iam_member` values, if they are comma-separated
  and quoted separately. For example:
  `"user:alice@example.com","group:admins@example.com","user:sales@example.com"`

  All identities in the `grantee_list` must exist. If any identity
  does not exist, the policy is not created and the statement fails.
- `filter_expression`: Defines the subset of table rows to show only to the
  members of the `grantee_list`. The `filter_expression` is similar to the
  `WHERE` clause in a `SELECT` query.

  The following are valid filter expressions:
  - GoogleSQL scalar functions.
  - `SESSION_USER()`, to restrict access only to rows that belong to the user running the query. If none of the row-level access policies are applicable to the querying user, then the user has no access to the data in the table.
  - `TRUE`. Grants the principals in the `grantee_list` field access to all rows of the table.

  The filter expression cannot contain the following:
  - SQL statements such as `SELECT`, `CREATE`, or `UPDATE`.
  - User-defined functions.

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.rowAccessPolicies.create` | The target table. |
| `bigquery.rowAccessPolicies.setIamPolicy` | The target table. |
| `bigquery.tables.getData` | The target table. |

### `CREATE CAPACITY` statement

Purchases [slots](https://docs.cloud.google.com/bigquery/docs/slots) by creating a new capacity commitment.

> [!CAUTION]
> **Caution:** Before you purchase slots, understand the details of the [commitment plans](https://docs.cloud.google.com/bigquery/docs/reservations-workload-management#slot_commitments) and [pricing](https://cloud.google.com/bigquery/pricing#on_demand_pricing).

#### Syntax

```googlesql
CREATE CAPACITY
`project_id.location_id.commitment_id`
OPTIONS (capacity_commitment_option_list);
```

#### Arguments

- `project_id`: The project ID of the administration project that will maintain ownership of this commitment.
- `location_id`: The [location](https://docs.cloud.google.com/bigquery/docs/locations#supported_locations) of the commitment.
- `commitment_id`: The ID of the commitment. The value must be unique to the project and location. It must start and end with a lowercase letter or a number and contain only lowercase letters, numbers and dashes.
- [`capacity_commitment_option_list`](#capacity_commitment_option_list): The options you can set to describe the capacity commitment.

#### `capacity_commitment_option_list`

The option list specifies options for the capacity commitment. Specify the options in the following format: `NAME=VALUE, ...`

The following options are supported:

| `NAME` | `TYPE` | Details |
|---|---|---|
| `plan` | String | The commitment plan to purchase. Supported values include: `ANNUAL`, `THREE_YEAR`, and `TRIAL`. For more information, see [Commitment plans](https://docs.cloud.google.com/bigquery/docs/reservations-workload-management#slot_commitments). |
| `renewal_plan` | String | The commitment renewal plan. Applies only when `plan` is `ANNUAL`, `THREE_YEAR`, or `TRIAL`. For more information, see [Renewing commitments](https://docs.cloud.google.com/bigquery/docs/reservations-workload-management#renew-commitments). |
| `slot_count` | Integer | The number of slots in the commitment. |
| `edition` | String | The edition associated with this reservation. For more information about editions, see [Introduction to BigQuery editions](https://docs.cloud.google.com/bigquery/docs/editions-intro). |

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.capacityCommitments.create` | The administration project that maintains ownership of the commitments. |

#### Example

The following example creates a capacity commitment of 100 annual slots that are
located in the `region-us` region and managed by a project `admin_project`:

```googlesql
CREATE CAPACITY `admin_project.region-us.my-commitment`
OPTIONS (
  slot_count = 100,
  plan = 'ANNUAL');
```

### `CREATE RESERVATION` statement

Creates a reservation. For more information, see
[Introduction to Reservations](https://docs.cloud.google.com/bigquery/docs/reservations-intro).

#### Syntax

```googlesql
CREATE RESERVATION
`project_id.location_id.reservation_id`
OPTIONS (reservation_option_list);
```

#### Arguments

- `project_id`: The project ID of the administration project where the capacity commitment was created.
- `location_id`: The [location](https://docs.cloud.google.com/bigquery/docs/locations#supported_locations) of the reservation.
- `reservation_id`: The reservation ID.
- [`reservation_option_list`](#reservation_option_list): The options you can set to describe the reservation.

##### `reservation_option_list`

The option list specifies options for the reservation. Specify the options in the following format: `NAME=VALUE, ...`

The following options are supported:

| `NAME` | `TYPE` | Details |
|---|---|---|
| `ignore_idle_slots` | `BOOLEAN` | If the value is `true`, then the reservation uses only the slots that are provisioned to it. The default value is `false`. For more information, see [Idle slots](https://docs.cloud.google.com/bigquery/docs/slots#idle_slots). |
| `slot_capacity` | `INTEGER` | The number of slots to allocate to the reservation. If this reservation was created with an [edition](https://docs.cloud.google.com/bigquery/docs/editions-intro), this is equivalent to the amount of [baseline slots](https://docs.cloud.google.com/bigquery/docs/slots-autoscaling-intro#using_reservations_with_baseline_and_autoscaling_slots). |
| `target_job_concurrency` | `INTEGER` | A soft upper bound on the number of jobs that can run concurrently in this reservation. |
| `edition` | `STRING` | The edition associated with this reservation. The supported values are `STANDARD`, `ENTERPRISE`, and `ENTERPRISE_PLUS`. For more information about editions, see [Introduction to BigQuery editions](https://docs.cloud.google.com/bigquery/docs/editions-intro). |
| `autoscale_max_slots` | `INTEGER` | The maximum number of slots that could be added to the reservation by autoscaling. Changes to the maximum slots value for a reservation can take up to a minute to propagate. |
| `secondary_location` | `STRING` | The secondary location to use in the case of disaster recovery. |
| `max_slots` | `INTEGER` | The maximum number of slots the reservation can consume. For more details about predictable reservations, see [Reservation predictability](https://docs.cloud.google.com/bigquery/docs/reservations-workload-management#predictable). |
| `scaling_mode` | `STRING` | The scaling mode of the reservation. This value must be configured together with `max_slots`. Also, this value must be aligned with `ignore_idle_slots`. For details, see [Reservation predictability](https://docs.cloud.google.com/bigquery/docs/reservations-workload-management#predictable). |
| `scheduling_policy_max_slots` | `INTEGER` | The default limit on the slot consumption of each project running queries in the reservation. For more information, see [Project scheduling policies](https://docs.cloud.google.com/bigquery/docs/reservations-workload-management#scheduling-policies). |
| `scheduling_policy_concurrency` | `INTEGER` | The default limit on the number of simultaneous queries admitted for each project assigned to the reservation. For more information, see [Project scheduling policies](https://docs.cloud.google.com/bigquery/docs/reservations-workload-management#scheduling-policies). |
| `labels` | `<ARRAY<STRUCT<STRING, STRING>>>` | An array of labels for the reservation, expressed as key-value pairs. |

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.reservations.create` | The administration project that maintains ownership of the commitments. |

#### Example

The following example creates a reservation of 100 slots in the project
`admin_project`:

```googlesql
CREATE RESERVATION `admin_project.region-us.prod`
OPTIONS (
  slot_capacity = 100);
```

### `CREATE ASSIGNMENT` statement

Assigns a project, folder, or organization to a reservation.

#### Syntax

```googlesql
CREATE ASSIGNMENT
`project_id.location_id.reservation_id.assignment_id`
OPTIONS (assignment_option_list)
```

#### Arguments

- `project_id`: The project ID of the administration project where the reservation was created.
- `location_id`: The [location](https://docs.cloud.google.com/bigquery/docs/locations#supported_locations) of the reservation.
- `reservation_id`: The reservation ID.
- `assignment_id`: The ID of the assignment. The value must be unique to the project and location. It must start and end with a lowercase letter or a number and contain only lowercase letters, numbers and dashes.
- [`assignment_option_list`](#assignment_option_list): The options you can set to describe assignment.

To remove a project from any reservations and use on-demand billing instead, set
`reservation_id` to `none`.

#### `assignment_option_list`

The option list specifies options for the assignment. Specify the options in the following format: `NAME=VALUE, ...`

The following options are supported:

| `NAME` | `TYPE` | Details |
|---|---|---|
| `assignee` | `STRING` | The ID of the project, folder, or organization to assign to the reservation. |
| `job_type` | `STRING` | The type of job to assign to this reservation. Supported values include `QUERY`, `PIPELINE`, `ML_EXTERNAL`, `CONTINUOUS`, and `BACKGROUND`. For more information, see [Reservation assignments](https://docs.cloud.google.com/bigquery/docs/reservations-workload-management#assignments). |
| `scheduling_policy_max_slots` | `INTEGER` | The limit on the slot consumption of queries running for the assignee project within the reservation. |
| `scheduling_policy_concurrency` | `INTEGER` | The limit on the number of simultaneous queries admitted for the assignee project within the reservation. |

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.reservationAssignments.create` | The administration project and the assignee. |

#### Example

The following example assigns the project `my_project` to the `prod` reservation
for query jobs:

```googlesql
CREATE ASSIGNMENT `admin_project.region-us.prod.my_assignment`
OPTIONS (
  assignee = 'projects/my_project',
  job_type = 'QUERY');
```

The following example assigns an organization to the `prod` reservation for
pipeline jobs, such as load and extract jobs:

```googlesql
CREATE ASSIGNMENT `admin_project.region-us.prod.my_assignment`
OPTIONS (
  assignee = 'organizations/1234',
  job_type = 'PIPELINE');
```

### `CREATE SEARCH INDEX` statement

Creates a new [search index](https://docs.cloud.google.com/bigquery/docs/search-index) on one or more
columns of a table.

A search index enables efficient queries using the
[`SEARCH`](../googlesql-functions/search_functions.md#search)
function.

#### Syntax

```googlesql
CREATE SEARCH INDEX [ IF NOT EXISTS ] index_name
ON table_name({ALL COLUMNS [WITH COLUMN OPTIONS(column [, ...])] | column [, ...]})
[OPTIONS(index_option_list)]

column:=
column_name [OPTIONS(index_column_option_list)]
```

#### Arguments

- `IF NOT EXISTS`: If there is already a search index by that name on the table,
  do nothing. If the table has a search index by a different name, then return
  an error.

- `index_name`: The name of the search index you're creating. Since the search
  index is always created in the same project and dataset as the base table,
  there is no need to specify these in the name.

- `table_name`: The name of the table. See [Table path syntax](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#table_path).

- `ALL COLUMNS`: If data types are not specified, creates a search index on
  every column in the table which contains a `STRING` field. If data types are
  specified, create a search index on every column in the table which matches
  any of the data types specified.

- `WITH COLUMN OPTIONS`: Can only be used with `ALL COLUMNS` to set
  options on specific indexed columns.

- `column_name`: The name of a top-level column in the table which is one of
  the [supported data types](#supported-data-types) or contains a field that is one
  of the supported data types.

- [`index_column_option_list`](#index_column_option_list): The list of options
  to set on indexed columns.

- [`index_option_list`](#index_option_list): The list of options to set on the
  search index.

##### Supported data types

Search indexes support the following data types:

| Supported data types | Notes |
|---|---|
| `STRING` | Primitive data type. |
| `INT64` | Primitive data type. |
| `TIMESTAMP` | Primitive data type. |
| `ARRAY<PRIMITIVE_DATA_TYPE>` | Must contain a primitive data type in this list. |
| `STRUCT` or `ARRAY<STRUCT>` | Must contain at least one nested field that is a primitive data type in this list or `ARRAY<PRIMITIVE_DATA_TYPE>`. |
| `JSON` | Must contain at least one nested field of a type that matches any data types in this list. |

#### Details

You can create only one search index per base table. You cannot create a search
index on a view or materialized view. To modify which columns are
indexed, use the [`ALTER SEARCH INDEX` statement](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#alter_search_index_statement)
or [drop](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_search_index) the current index and create a new one.

BigQuery returns an error if any `column_name` is not a `STRING`
or does not contain a `STRING` field, or if you call `CREATE SEARCH INDEX` on
`ALL COLUMNS` of a table which contains no `STRING` fields.

Creating a search index fails on a table which has column ACLs or row filters;
however, these may all be added to the table after creation of the index.

#### `index_option_list`

The option list specifies options for the search index. Specify the options in
the following format: `NAME=VALUE, ...`

The following options are supported:

| `NAME` | `VALUE` | Details |
|---|---|---|
| `analyzer` | `STRING` | Example: `analyzer='LOG_ANALYZER'` The [text analyzer](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/text-analysis) to use to generate tokens for the search index. The supported values are `'LOG_ANALYZER'`, `'NO_OP_ANALYZER'`, and `'PATTERN_ANALYZER'`. |
| `analyzer_options` | `JSON-formatted STRING` | The text analyzer configurations to set when creating a search index. Supported when `analyzer` is equal to `'LOG_ANALYZER'` or `'PATTERN_ANALYZER'`. For examples of JSON-formatted strings with different text analyzers, see [Work with text analyzers](https://docs.cloud.google.com/bigquery/docs/text-analysis-search). |
| `data_types` | `ARRAY<STRING>` | Example: `data_types=['STRING', 'INT64', 'TIMESTAMP']` An array of data types to set when creating a search index. Supported data types are `STRING`, `INT64` and `TIMESTAMP`. If `data_types` is not set, `STRING` fields are indexed by default. |
| `default_index_column_granularity` | `STRING` | Example: `default_index_column_granularity='GLOBAL'` The default granularity of information to store for each indexed column. The supported values are `'GLOBAL'` (default) and `'COLUMN'`. For more information, see [Index with column granularity](https://docs.cloud.google.com/bigquery/docs/search-index#column-granularity). |

#### `index_column_option_list`

| `NAME` | `VALUE` | Details |
|---|---|---|
| `index_granularity` | `STRING` | Example: `index_granularity='GLOBAL'` The granularity of information to store for the indexed column. This setting overrides the default granularity specified in the `default_index_column_granularity` field of the index options. The supported values are `'GLOBAL'` (default) and `'COLUMN'`. For more information, see [Index with column granularity](https://docs.cloud.google.com/bigquery/docs/search-index#column-granularity). |
| `data_types` | `ARRAY<STRING>` | Example: `data_types=['STRING', 'INT64', 'TIMESTAMP']` An array of data types to index on the column. Supported data types are `STRING`, `INT64` and `TIMESTAMP`. If `data_types` is not set, `STRING` fields are indexed by default. |

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.tables.createIndex` | The base table where you create the index. |

#### Examples

The following example creates a search index called `my_index` on all string
columns of `my_table`. In this case, the index is only created on column `a`.

```googlesql
CREATE TABLE dataset.my_table(a STRING, b INT64);

CREATE SEARCH INDEX my_index
ON dataset.my_table(ALL COLUMNS);
```

The following example creates a search index on columns `a`,
`my_struct.string_field`, and `b` that uses the `NO_OP_ANALYZER` text analyzer.
It sets the default index column granularity to `COLUMN` and overrides the
setting for column `a` to `GLOBAL`.

```googlesql
CREATE TABLE dataset.complex_table(
  a STRING,
  my_struct STRUCT <string_field STRING, int_field INT64>,
  b ARRAY <STRING>
);

CREATE SEARCH INDEX my_index
ON dataset.complex_table(
  a OPTIONS(index_granularity = 'GLOBAL'),
  my_struct,
  b)
OPTIONS (
  analyzer = 'NO_OP_ANALYZER',
  default_index_column_granularity = 'COLUMN');
```

### `CREATE VECTOR INDEX` statement

Creates a new [vector index](https://docs.cloud.google.com/bigquery/docs/vector-index) on a column of a
table.

A vector index lets you perform a [vector search](https://docs.cloud.google.com/bigquery/docs/vector-search-intro)
more quickly, with the trade-off of reducing
[recall](https://developers.google.com/machine-learning/crash-course/classification/precision-and-recall#recall)
and so returning more approximate results.

#### Syntax

```googlesql
CREATE [ OR REPLACE ] VECTOR INDEX [ IF NOT EXISTS ] index_name
ON table_name(column_name)
[STORING(stored_column_name [, ...])]
[PARTITION BY partition_expression]
OPTIONS(index_option_list);
```

#### Arguments

- `OR REPLACE`: Replaces any vector index with the same name if it exists.
  Can't appear with `IF NOT EXISTS`.

- `IF NOT EXISTS`: If there is already a vector index by that name on the table,
  do nothing. If the table has a vector index by a different name, then return
  an error.

- `index_name`: The name of the vector index you're creating. Since the index
  is always created in the same project and dataset as the base table, there is
  no need to specify these in the name.

- `table_name`: The name of the table. See [Table path syntax](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#table_path).

- `column_name`: The name of a column with a type of `ARRAY<FLOAT64>`,
  or if you're using
  [autonomous embedding generation (Preview)](https://docs.cloud.google.com/bigquery/docs/autonomous-embedding-generation),
  a `STRUCT<result ARRAY<FLOAT64>, status STRING>` column.
  If column type is `ARRAY<FLOAT64>`, then
  all elements in the array must be non-`NULL`, and all values in the column
  must have the same array dimensions. If your index type is `TREE_AH`, then the
  array dimension must be at least 2.

- `stored_column_name`: The name of
  a top-level column in the table to store in
  the vector index. The column type can't be `RANGE`.
  Stored columns are not used if the table has a row-level access policy or the
  column has a policy tag. To learn more, see
  [Store columns and pre-filter](https://docs.cloud.google.com/bigquery/docs/vector-index#stored-columns).

- [`partition_expression`](data-definition-language-1.md#partition_expression): An expression that determines
  how to partition the vector index. You can only partition TreeAH indexes.
  ([Preview](https://cloud.google.com/products#product-launch-stages))

- [`index_option_list`](#index_option_list-1): The list of options to set
  on the vector index.

#### Details

You can only create vector indexes on
[standard tables](https://docs.cloud.google.com/bigquery/docs/tables-intro#standard-tables).

You can create only one vector index per table. You can't create a vector index
on a table that already has a [search index](#create-search-index-statement)
with the same index name.

To modify which column is indexed, [`DROP`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_vector_index) the current
index and create a new one.

#### `index_option_list`

The option list specifies options for the vector index. Specify the options in
the following format: `NAME=VALUE, ...`

The following options are supported:

| `NAME` | `VALUE` | Details |
|---|---|---|
| `index_type` | `STRING` | Required. The algorithm to use to build the vector index. The supported values are `IVF` and `TREE_AH`. `IVF`: Specifying `IVF` builds the vector index as an inverted file index (IVF). An IVF uses a k-means algorithm to cluster the vector data, and then partitions the vector data based on those clusters. When you use the [`VECTOR_SEARCH` function](../googlesql-functions/search_functions.md#vector_search) to search the vector data, it can use these partitions to reduce the amount of data it needs to read in order to determine a result. `TREE_AH`: Uses Google's [ScaNN algorithm](https://github.com/google-research/google-research/blob/master/scann/docs/algorithms.md). `TREE_AH` is a tree-quantization based index, leveraging k-means clustering for partitioning and asymmetric hashing (product quantization) for fast approximate distance computation. For more information, see [TreeAH index](https://docs.cloud.google.com/bigquery/docs/vector-index#tree-ah-index). |
| `distance_type` | `STRING` | Specifies the default distance type to use when performing a vector search using this index. The supported values are [`EUCLIDEAN`](https://en.wikipedia.org/wiki/Euclidean_distance), [`COSINE`](https://en.wikipedia.org/wiki/Cosine_similarity#Cosine_Distance), and [`DOT_PRODUCT`](https://en.wikipedia.org/wiki/Dot_product). `EUCLIDEAN` is the default. The index creation itself always uses `EUCLIDEAN` distance for training but the distance used in the `VECTOR_SEARCH` function can be different. If you specify a value for the `distance_type` argument of the [`VECTOR_SEARCH` function](../googlesql-functions/search_functions.md#vector_search), that value is used instead of the vector index's `distance_type` value. |
| `ivf_options` | `JSON-formatted STRING` | The options to use with the `IVF` algorithm. Defaults to `'{}'` to denote that all underlying options use their corresponding default values. The only supported option is `num_lists`. Specify an `INT64` less than or equal to 5,000 that determines how many lists the IVF algorithm creates. For example, `ivf_options = '{"num_lists":1000}'`. During indexing, vectors are assigned to the list corresponding to their nearest cluster centroid. If you omit this argument, BigQuery determines a default value based on your data characteristics. The default value works well for most use cases. `num_lists` controls query tuning granularity. Higher values create more lists, so you can set the `fraction_lists_to_search` option of the `VECTOR_SEARCH` function to scan a smaller percentage of the index. For example, scanning 1% of 100 lists as opposed to scanning 10% of 10 lists. This enables finer control of the search speed and recall but slightly increases the indexing cost. Set this argument value based on how precisely you need to tune query scope. The statement fails if `ivf_options` is specified and `index_type` is not `IVF`. |
| `tree_ah_options` | `JSON-formatted STRING` | The options to use with the `TREE_AH` algorithm. Defaults to `'{}'` to denote that all underlying options use their corresponding default values. Two options are supported: `leaf_node_embedding_count` and `normalization_type`. `leaf_node_embedding_count` is an `INT64` value greater than or equal to 500 that specifies the approximate number of vectors in each leaf node of the tree that the TreeAH algorithm creates. The TreeAH algorithm divides the whole data space into a number of lists, with each list containing approximately `leaf_node_embedding_count` data points. A lower value creates more lists with fewer data points, while a larger value creates fewer lists with more data points. The default is 1,000, which is appropriate for most datasets. `normalization_type`: the type of normalization performed on each base table and query vector prior to any processing. The supported values are `NONE` and `L2`. `L2` is also referred to as the [Euclidean norm](https://en.wikipedia.org/wiki/Norm_(mathematics)#Euclidean_norm). Defaults to `NONE`. Normalization happens before any processing, for both the base table data and the query data, but doesn't modify the embedding column in the table. Depending on the dataset, the embedding model, and the distance type used during [`VECTOR_SEARCH`](../googlesql-functions/search_functions.md#vector_search), normalizing the embeddings might improve recall. For example `tree_ah_options = '{"leaf_node_embedding_count": 1000, "normalization_type": "L2"}'` The statement fails if `tree_ah_options` is specified and `index_type` is not `TREE_AH`. |
| `lexical_search_columns` | `ARRAY<STRING>` | An `ARRAY` that contains a list of unique column names. Each specified column name should refer to a column of type `STRING` in the `base_table`. These columns are used in the lexical search portion of a [hybrid search](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/search_functions#hybrid-search). A non-empty list indicates the search is hybrid. `lexical_search_columns` can be used only when `query_value` is specified with single search. Hybrid search doesn't support batch queries. |

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.tables.createIndex` | The table where you create the vector index. |

If you choose to use the `OR REPLACE` clause, you must also have the
`bigquery.tables.updateIndex` permission.

#### Examples

The following examples show how to create vector indexes with different
options. They assume that you have a base table named `my_table`, which contains
a column called `embedding` of type `ARRAY<FLOAT64>` and a
[sufficient number of rows](https://docs.cloud.google.com/bigquery/quotas#vector_index_limits).

This example creates a vector index of type `IVF` on the `embedding` column
of `my_table`:

```googlesql
CREATE VECTOR INDEX my_index ON my_dataset.my_table(embedding)
OPTIONS (index_type = 'IVF');
```

The following example creates a vector index on the `embedding` column
of `my_table`, and specifies the distance type to use and the IVF options:

```googlesql
CREATE VECTOR INDEX my_index ON my_dataset.my_table(embedding)
OPTIONS (
  index_type = 'IVF',
  distance_type = 'COSINE',
  ivf_options = '{"num_lists":2500}');
```

The following example creates a vector index on the `embedding` column
of `my_table`, and specifies the distance type to use and the `TREE_AH` options:

```googlesql
CREATE VECTOR INDEX my_index ON my_dataset.my_table(embedding)
OPTIONS (
  index_type = 'TREE_AH',
  distance_type = 'EUCLIDEAN',
  tree_ah_options = '{"normalization_type": "L2"}');
```

### `CREATE DATA_POLICY` statement

> [!WARNING]
>
> **Preview**
>
>
> This feature is
>
> subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the
> [Service Specific
> Terms](https://docs.cloud.google.com/terms/service-terms#1).
>
> Pre-GA features are available "as is" and might have limited support.
>
> For more information, see the
> [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

> [!NOTE]
> **Note:** To provide feedback or request support for this feature, send an email to [bigquery-security@google.com](mailto:bigquery-security@google.com).

Creates or replaces a [data policy](https://docs.cloud.google.com/bigquery/docs/column-data-masking#data-policies-on-column).
The name of the data policy must be unique within the project.

#### Syntax

```googlesql
CREATE [ OR REPLACE ] DATA_POLICY [ IF NOT EXISTS ] `project_id.region-location_id.data_policy_id`
OPTIONS(index_option_list);
```

#### Arguments

- `OR REPLACE`: Replaces any data policy with the same name if it exists.
  Can't appear with `IF NOT EXISTS`.

- `IF NOT EXISTS`: If there is already a data policy by that name in the
  project, the `CREATE` statement has no effect.

- `project_id`: The project ID of the project where the data policy will reside
  in.

- `location_id`: The location of the data policy.

- `data_policy_id`: The name of the data policy that is unique within the
  project that the data policy resides in.

- [`index_option_list`](#index_option_list-2): The list of options to set on
  the data policy.

#### `index_option_list`

The option list specifies options for the data policy. Specify the options in
the following format: `NAME=VALUE, ...`

The following options are supported:

| `NAME` | `VALUE` | Details |
|---|---|---|
| `data_policy_type` | `STRING` | The supported values are `DATA_MASKING_POLICY` and `RAW_DATA_ACCESS_POLICY`. If not specified, the default value is `RAW_DATA_ACCESS_POLICY`. You can't update this field once the data policy has been created. `DATA_MASKING_POLICY` type should come with `masking_expression` set. |
| `masking_expression` | `STRING` | Specifies the [predefined masking rule](https://docs.cloud.google.com/bigquery/docs/reference/bigquerydatapolicy/rest/v2/projects.locations.dataPolicies#PredefinedExpression) or a [custom masking routine](https://docs.cloud.google.com/bigquery/docs/column-data-masking-intro#custom_mask). |

#### Required permissions

The user or service account that creates a data policy must have the
`bigquery.dataPolicies.create` permission.

The `bigquery.dataPolicies.create` permission is included in the
BigQuery Data Policy Admin, BigQuery Admin and BigQuery Data Owner roles.

If you are creating a data policy that references a custom masking routine,
you also need [routine permissions](https://docs.cloud.google.com/bigquery/docs/routines#permissions).

### `CREATE CONNECTION` statement

Creates a connection. For more information, see
[Introduction to connections](https://docs.cloud.google.com/bigquery/docs/connections-api-intro).

#### Syntax

```googlesql
CREATE CONNECTION [IF NOT EXISTS] `[[project_id.]location.]connection_id`
OPTIONS (connection_option_list);
```

#### Arguments

- `project_id` (Optional): The ID of the project to create the connection in. If omitted, the project where you run this DDL statement is used.
- `location` (Optional): The [location](https://docs.cloud.google.com/bigquery/docs/locations) to create the connection in. If omitted, the location where you run this DDL statement is used.
- `connection_id`: A name for the connection.
- [`connection_option_list`](#connection_option_list): The options to set for the connection.

#### `connection_option_list`

Specify options in the `NAME=VALUE, ...` format. The following options are
supported:

| `NAME` | `TYPE` | Details |
|---|---|---|
| `connection_type` | `STRING` | Required. Not modifiable. The connection type. Only `"CLOUD_RESOURCE"` is supported for [Cloud resource connections](https://docs.cloud.google.com/bigquery/docs/create-cloud-resource-connection). |
| `friendly_name` | `STRING` | Optional. A descriptive name for the connection. |
| `description` | `STRING` | Optional. A description of the connection. |

#### Required permissions

This statement requires the following
[IAM permissions](https://docs.cloud.google.com/bigquery/docs/access-control#bq-permissions):

| Permission | Resource |
|---|---|
| `bigquery.connections.create` | The project that you're creating the connection in. |

#### Example

The following example creates a Cloud resource connection named
`my_cloud_resource_connection`:

```googlesql
CREATE CONNECTION IF NOT EXISTS `us.my_cloud_resource_connection`
OPTIONS (
  connection_type = "CLOUD_RESOURCE",
  friendly_name = "My Resource Connection",
  description = "Connection to access Cloud resources"
  );
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders; 2 code blocks whose twin text is damaged (links expanded into URLs, `<...>` dropped, table borders shortened) are matched to the rendered page by position and similarity, and the text is taken from the page; and a code value that the rendered page splits into two code elements with a line-break hint (`<wbr>`) is written as one code span (the twin leaves a doubled backtick in it). The prose is otherwise unchanged.
- The HTML of the rendered page leaves `<FLOAT64>` unescaped inside a code block, so a browser hides it; the text is kept here as written in the HTML source.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- The official page is split into 4 files at section boundaries; this is part 2.
- Corrected from the official docs (rendering): the page's HTML writes `ARRAY<STRING>` unescaped inside `<code>`, so the rendered page and its Markdown twin show `ARRAY`; the type is restored from the HTML source. (`lexical_search_columns`)
- Corrected from the official docs: the sentence after the `new_mv` example says the view is defined by `SELECT column_1, column_2, column_3 FROM ...`, but the example above it uses `SUM(column_2)` and `AVG(column_3)` with `GROUP BY column_1`; the stated query was changed to match the example.
- Corrected from the official docs: the SQL UDF syntax block lists `([named_parameter[, ...]])` twice; the duplicate line was removed, as the other SQL UDF syntax blocks show it once.
- Corrected from the official docs: `IF NOT EXISTS` in the function statements says "If any dataset exists with the same name"; changed to "function" in the three function statements (SQL UDF, SQL UDAF, JavaScript UDAF). `OR REPLACE` in the same lists says "any function", and the table function statement says "any table function".
- Corrected from the official docs: the `container_cpu` option type is `DOUBLE`, which is not a GoogleSQL data type; changed to `FLOAT64` (see data-types.md).
- Corrected from the official docs: the Python UDF example has no comma between `runtime_version='python-3.11'` and `packages=[...]`; added, since options are comma-separated.
- Corrected from the official docs: the SQL UDAF syntax uses `data_type` (return type and parameter) and `sql_function_body`, but the arguments define `return_data_type`, `parameter_data_type` and `function_body`; the syntax was changed to those names, as in the JavaScript UDAF syntax.
- Corrected from the official docs: the description says the procedure inserts a row into `TargetTable` with `target_date` as a column name, but the code has no `TargetTable` and runs `SELECT id, x, y, target_date -- note that target_date is a parameter FROM DataForTargetDate`; the description was changed to match the code.
- Corrected from the official docs: the reservation and assignment arguments are named `location`, but the syntax uses `location_id`; changed to `location_id`.
- Corrected from the official docs: the option lists of `CREATE RESERVATION`, `CREATE ASSIGNMENT`, `ALTER CAPACITY` and `ALTER RESERVATION` say "options for the dataset", copied from `CREATE SCHEMA`; changed to the reservation, assignment or capacity commitment the statement works on.
- Corrected from the official docs: the `tree_ah_options` text lists the option `leaf_node_embedding_node`, but the same cell describes `leaf_node_embedding_count` and the example uses it; changed to `leaf_node_embedding_count`.
- Corrected from the official docs: the `LOAD DATA` list of `format` values has no comma after the `DELTA_LAKE` preview link; added, as in the `CREATE EXTERNAL TABLE` list above it.
- Caution: The external table example uses `metadata_cache_mode = 'AUTOMATIC'`, which is not in the `external_table_option_list` of this statement; whether it is supported as an SQL option is not stated.
- Conflicting official statements: `CREATE SEARCH INDEX` says BigQuery returns an error if any `column_name` is not a `STRING` or does not contain a `STRING` field, but the supported column types listed above it include `INT64` and `TIMESTAMP`.
- The Markdown twin drops the superscript of `[-2<sup>53</sup>, 2<sup>53</sup>]` (rendered page) and shows `[-253, 253]`; it is written here as `[-2^53, 2^53]`.

## Related

- [Index of this directory](./README.md)
- [Data definition language (DDL) statements in GoogleSQL (part 1 of 4)](./data-definition-language-1.md)
