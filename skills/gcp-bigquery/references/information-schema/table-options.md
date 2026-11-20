---
source: https://docs.cloud.google.com/bigquery/docs/information-schema-table-options
---

# TABLE_OPTIONS view

## Signature / Usage

The `INFORMATION_SCHEMA.TABLE_OPTIONS` view contains one row for each option,
for each table or view in a dataset. The `TABLES`
and `TABLE_OPTIONS` views also contain high-level information about views.
For detailed information, query the
[`INFORMATION_SCHEMA.VIEWS`](https://docs.cloud.google.com/bigquery/docs/information-schema-views) view.

### Required permissions

To query the `INFORMATION_SCHEMA.TABLE_OPTIONS` view, you need the following
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

When you query the `INFORMATION_SCHEMA.TABLE_OPTIONS` view, the query results
contain one row for each option, for each table or view in a dataset. For
detailed information about
views, query the
[`INFORMATION_SCHEMA.VIEWS` view](https://docs.cloud.google.com/bigquery/docs/information-schema-views)
instead.

The `INFORMATION_SCHEMA.TABLE_OPTIONS` view has the following schema:

| Column name | Data type | Value |
|---|---|---|
| `table_catalog` | `STRING` | The project ID of the project that contains the dataset |
| `table_schema` | `STRING` | The name of the dataset that contains the table or view also referred to as the `datasetId` |
| `table_name` | `STRING` | The name of the table or view also referred to as the `tableId` |
| `option_name` | `STRING` | One of the name values in the [options table](#options-table) |
| `option_type` | `STRING` | One of the data type values in the [options table](#options-table) |
| `option_value` | `STRING` | One of the value options in the [options table](#options-table) |

###### Options table

| `OPTION_NAME` | `OPTION_TYPE` | `OPTION_VALUE` |
|---|---|---|
| `description` | `STRING` | A description of the table |
| `enable_refresh` | `BOOL` | Whether automatic refresh is enabled for a materialized view |
| `expiration_timestamp` | `TIMESTAMP` | The time when this table expires |
| `friendly_name` | `STRING` | The table's descriptive name |
| `kms_key_name` | `STRING` | The name of the Cloud KMS key used to encrypt the table |
| `labels` | `ARRAY<STRUCT<STRING, STRING>>` | An array of `STRUCT`'s that represent the labels on the table |
| `max_staleness` | `INTERVAL` | The configured table's maximum staleness for [BigQuery change data capture (CDC) upserts](https://docs.cloud.google.com/bigquery/docs/change-data-capture#manage_table_staleness) |
| `partition_expiration_days` | `FLOAT64` | The default lifetime, in days, of all partitions in a partitioned table |
| `refresh_interval_minutes` | `FLOAT64` | How frequently a materialized view is refreshed |
| `require_partition_filter` | `BOOL` | Whether queries over the table require a partition filter |
| `tags` | `ARRAY<STRUCT<STRING, STRING>>` | Tags attached to a table in a namespaced \<key, value\> syntax. For more information, see [Tags and conditional access](https://docs.cloud.google.com/iam/docs/tags-access-control). |

For external tables, the following options are possible:

| Options ||
|---|---|
| `allow_jagged_rows` | `BOOL` If `true`, allow rows that are missing trailing optional columns. Applies to CSV data. |
| `allow_quoted_newlines` | `BOOL` If `true`, allow quoted data sections that contain newline characters in the file. Applies to CSV data. |
| `bigtable_options` | `STRING` Only required when creating a Bigtable external table. Specifies the schema of the Bigtable external table in JSON format. For a list of Bigtable table definition options, see [`BigtableOptions`](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#bigtableoptions) in the REST API reference. |
| `column_name_character_map` | `STRING` Defines the scope of supported column name characters and the handling behavior of unsupported characters. The default setting is `STRICT`, which means unsupported characters cause BigQuery to throw errors. `V1` and `V2` replace any unsupported characters with underscores. Supported values include: - `STRICT`. Enables [flexible column names](https://docs.cloud.google.com/bigquery/docs/schemas#flexible-column-names). This is the default value. Load jobs with unsupported characters in column names fail with an error message. To configure the replacement of unsupported characters with underscores so that the load job succeeds, specify the [`default_column_name_character_map`](https://docs.cloud.google.com/bigquery/docs/default-configuration) configuration setting. - `V1`. Column names can only contain [standard column name characters](https://docs.cloud.google.com/bigquery/docs/schemas#column_names). Unsupported characters (except [periods in Parquet file column names](https://docs.cloud.google.com/bigquery/docs/loading-data-cloud-storage-parquet#limitations_2)) are replaced with underscores. This is the default behavior for tables created before the introduction of `column_name_character_map`. - `V2`. Besides [standard column name characters](https://docs.cloud.google.com/bigquery/docs/schemas#column_names), it also supports [flexible column names](https://docs.cloud.google.com/bigquery/docs/schemas#flexible-column-names). Unsupported characters (except [periods in Parquet file column names](https://docs.cloud.google.com/bigquery/docs/loading-data-cloud-storage-parquet#limitations_2)) are replaced with underscores. - Applies to CSV and Parquet data. |
| `compression` | `STRING` The compression type of the data source. Supported values include: `GZIP`. If not specified, the data source is uncompressed. Applies to CSV and JSON data. |
| `decimal_target_types` | `ARRAY<STRING>` Determines how to convert a `Decimal` type. Equivalent to [ExternalDataConfiguration.decimal_target_types](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#ExternalDataConfiguration.FIELDS.decimal_target_types) Example: `["NUMERIC", "BIGNUMERIC"]`. |
| `description` | `STRING` A description of this table. |
| `enable_list_inference` | `BOOL` If `true`, use schema inference specifically for Parquet LIST logical type. Applies to Parquet data. |
| `enable_logical_types` | `BOOL` If `true`, convert Avro logical types into their corresponding SQL types. For more information, see [Logical types](https://docs.cloud.google.com/bigquery/docs/loading-data-cloud-storage-avro#logical_types). Applies to Avro data. |
| `encoding` | `STRING` The character encoding of the data. Supported values include: `UTF8` (or `UTF-8`), `ISO_8859_1` (or `ISO-8859-1`), `UTF-16BE`, `UTF-16LE`, `UTF-32BE`, or `UTF-32LE`. The default value is `UTF-8`. Applies to CSV data. |
| `enum_as_string` | `BOOL` If `true`, infer Parquet ENUM logical type as STRING instead of BYTES by default. Applies to Parquet data. |
| `expiration_timestamp` | `TIMESTAMP` The time when this table expires. If not specified, the table does not expire. Example: `"2025-01-01 00:00:00 UTC"`. |
| `field_delimiter` | `STRING` The separator for fields in a CSV file. Applies to CSV data. |
| `format` | `STRING` The format of the external data. Supported values for [`CREATE EXTERNAL TABLE`](../googlesql-syntax/data-definition-language-2.md#create-external-table-statement) include: `AVRO`, `CLOUD_BIGTABLE`, `CSV`, `DATASTORE_BACKUP`, `DELTA_LAKE` ([preview](https://cloud.google.com/products/#product-launch-stages)), `GOOGLE_SHEETS`, `NEWLINE_DELIMITED_JSON` (or `JSON`), `ORC`, `PARQUET`. Supported values for [`LOAD DATA`](../googlesql-syntax/load-statements.md) include: `AVRO`, `CSV`, `DELTA_LAKE` ([preview](https://cloud.google.com/products/#product-launch-stages)) `NEWLINE_DELIMITED_JSON` (or `JSON`), `ORC`, `PARQUET`. The value `JSON` is equivalent to `NEWLINE_DELIMITED_JSON`. |
| `hive_partition_uri_prefix` | `STRING` A common prefix for all source URIs before the partition key encoding begins. Applies only to hive-partitioned external tables. Applies to Avro, CSV, JSON, Parquet, and ORC data. Example: `"gs://bucket/path"`. |
| `file_set_spec_type` | `STRING` Specifies how to interpret source URIs for load jobs and external tables. Supported values include: - `FILE_SYSTEM_MATCH`. Expands source URIs by listing files from the object store. This is the default behavior if FileSetSpecType is not set. - `NEW_LINE_DELIMITED_MANIFEST`. Indicates that the provided URIs are newline-delimited manifest files, with one URI per line. Wildcard URIs are not supported in the manifest files, and all referenced data files must be in the same bucket as the manifest file. For example, if you have a source URI of `"gs://bucket/path/file"` and the `file_set_spec_type` is `FILE_SYSTEM_MATCH`, then the file is used directly as a data file. If the `file_set_spec_type` is `NEW_LINE_DELIMITED_MANIFEST`, then each line in the file is interpreted as a URI that points to a data file. |
| `ignore_unknown_values` | `BOOL` If `true`, ignore extra values that are not represented in the table schema, without returning an error. Applies to CSV and JSON data. |
| `json_extension` | `STRING` For JSON data, indicates a particular JSON interchange format. If not specified, BigQuery reads the data as generic JSON records. Supported values include: `GEOJSON`. Newline-delimited GeoJSON data. For more information, see [Creating an external table from a newline-delimited GeoJSON file](https://docs.cloud.google.com/bigquery/docs/geospatial-data#external-geojson). |
| `max_bad_records` | `INT64` The maximum number of bad records to ignore when reading the data. Applies to: CSV, JSON, and Google Sheets data. |
| `max_staleness` | `INTERVAL` Applicable for [BigLake tables](https://docs.cloud.google.com/bigquery/docs/biglake-intro#metadata_caching_for_performance) and [object tables](https://docs.cloud.google.com/bigquery/docs/object-table-introduction#metadata_caching_for_performance). Specifies whether cached metadata is used by operations against the table, and how fresh the cached metadata must be in order for the operation to use it. To disable metadata caching, specify 0. This is the default. To enable metadata caching, specify an [interval literal](../googlesql-syntax/lexical.md#interval-literals) value between 30 minutes and 7 days. For example, specify `INTERVAL 4 HOUR` for a 4 hour staleness interval. With this value, operations against the table use cached metadata if it has been refreshed within the past 4 hours. If the cached metadata is older than that, the operation falls back to retrieving metadata from Cloud Storage instead. |
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
| `time_zone` | `STRING` Default time zone that will apply when parsing timestamp values that have no specific time zone. Check [valid time zone names](../googlesql-syntax/data-types.md#time-zone-name). If this value is not present, the timestamp values without specific time zone is parsed using default time zone UTC. Applies to CSV and JSON data. |
| `date_format` | `STRING` [Format elements](../googlesql-syntax/format-elements.md#format-string-as-date-and-time) that define how the DATE values are formatted in the input files (for example, `MM/DD/YYYY`). If this value is present, this format is the only compatible DATE format. [Schema autodetection](https://docs.cloud.google.com/bigquery/docs/schema-detect#date_and_time_values) will also decide DATE column type based on this format instead of the existing format. If this value is not present, the DATE field is parsed with the [default formats](https://docs.cloud.google.com/bigquery/docs/loading-data-cloud-storage-csv#data_types). Applies to CSV and JSON data. |
| `datetime_format` | `STRING` [Format elements](../googlesql-syntax/format-elements.md#format-string-as-date-and-time) that define how the DATETIME values are formatted in the input files (for example, `MM/DD/YYYY HH24:MI:SS.FF3`). If this value is present, this format is the only compatible DATETIME format. [Schema autodetection](https://docs.cloud.google.com/bigquery/docs/schema-detect#date_and_time_values) will also decide DATETIME column type based on this format instead of the existing format. If this value is not present, the DATETIME field is parsed with the [default formats](https://docs.cloud.google.com/bigquery/docs/loading-data-cloud-storage-csv#data_types). Applies to CSV and JSON data. |
| `time_format` | `STRING` [Format elements](../googlesql-syntax/format-elements.md#format-string-as-date-and-time) that define how the TIME values are formatted in the input files (for example, `HH24:MI:SS.FF3`). If this value is present, this format is the only compatible TIME format. [Schema autodetection](https://docs.cloud.google.com/bigquery/docs/schema-detect#date_and_time_values) will also decide TIME column type based on this format instead of the existing format. If this value is not present, the TIME field is parsed with the [default formats](https://docs.cloud.google.com/bigquery/docs/loading-data-cloud-storage-csv#data_types). Applies to CSV and JSON data. |
| `timestamp_format` | `STRING` [Format elements](../googlesql-syntax/format-elements.md#format-string-as-date-and-time) that define how the TIMESTAMP values are formatted in the input files (for example, `MM/DD/YYYY HH24:MI:SS.FF3`). If this value is present, this format is the only compatible TIMESTAMP format. [Schema autodetection](https://docs.cloud.google.com/bigquery/docs/schema-detect#date_and_time_values) will also decide TIMESTAMP column type based on this format instead of the existing format. If this value is not present, the TIMESTAMP field is parsed with the [default formats](https://docs.cloud.google.com/bigquery/docs/loading-data-cloud-storage-csv#data_types). Applies to CSV and JSON data. |
| `uris` | For external tables, including object tables, that aren't Bigtable tables: `ARRAY<STRING>` An array of fully qualified URIs for the external data locations. Each URI can contain one asterisk (`*`) [wildcard character](https://docs.cloud.google.com/bigquery/docs/loading-data-cloud-storage#load-wildcards), which must come after the bucket name. When you specify `uris` values that target multiple files, all of those files must share a compatible schema. The following examples show valid `uris` values: - `['gs://bucket/path1/myfile.csv']` - `['gs://bucket/path1/*.csv']` - `['gs://bucket/path1/*', 'gs://bucket/path2/file00*']` <br /> For Bigtable tables: `STRING` The URI identifying the Bigtable table to use as a data source. You can only specify one Bigtable URI. Example: `https://googleapis.com/bigtable/projects/project_id/instances/instance_id[/appProfiles/app_profile]/tables/table_name` For more information on constructing a Bigtable URI, see [Retrieve the Bigtable URI](https://docs.cloud.google.com/bigquery/docs/create-bigtable-external-table#bigtable-uri). |

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
| ``[PROJECT_ID.]`region-REGION`.INFORMATION_SCHEMA.TABLE_OPTIONS`` | Project level | `REGION` |
| `[PROJECT_ID.]DATASET_ID.INFORMATION_SCHEMA.TABLE_OPTIONS` | Dataset level | Dataset location |

Replace the following:

- Optional: `PROJECT_ID`: the ID of your Google Cloud project. If not specified, the default project is used.
- `REGION`: any [dataset region name](https://docs.cloud.google.com/bigquery/docs/locations). For example, `us`.
- `DATASET_ID`: the ID of your dataset. For more information, see [Dataset qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#dataset_qualifier).

  <br />

  <br />

  > [!NOTE]
  > **Note:** You must use [a region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#region_qualifier) to query `INFORMATION_SCHEMA` views. The location of the query execution must match the region of the `INFORMATION_SCHEMA` view.

<br />

### Example

###### Example 1:

The following example retrieves the default table expiration times for all
tables in `mydataset` in your default project (`myproject`) by querying the
`INFORMATION_SCHEMA.TABLE_OPTIONS` view.

To run the query against a project other than your default project, add the
project ID to the dataset in the following format:
`` `project_id`.dataset.INFORMATION_SCHEMA.view ``;
for example, `` `myproject`.mydataset.INFORMATION_SCHEMA.TABLE_OPTIONS ``.

> [!NOTE]
> **Note:** `INFORMATION_SCHEMA` view names are case-sensitive.

```googlesql
  SELECT
    *
  FROM
    mydataset.INFORMATION_SCHEMA.TABLE_OPTIONS
  WHERE
    option_name = 'expiration_timestamp';
```

The result is similar to the following:

<br />

```text
  +----------------+---------------+------------+----------------------+-------------+--------------------------------------+
  | table_catalog  | table_schema  | table_name |     option_name      | option_type |             option_value             |
  +----------------+---------------+------------+----------------------+-------------+--------------------------------------+
  | myproject      | mydataset     | mytable1   | expiration_timestamp | TIMESTAMP   | TIMESTAMP "2020-01-16T21:12:28.000Z" |
  | myproject      | mydataset     | mytable2   | expiration_timestamp | TIMESTAMP   | TIMESTAMP "2021-01-01T21:12:28.000Z" |
  +----------------+---------------+------------+----------------------+-------------+--------------------------------------+

```

<br />

> [!NOTE]
> **Note:** Tables without an expiration time are excluded from the query results.

###### Example 2:

The following example retrieves metadata about all tables in `mydataset` that
contain test data. The query uses the values in the `description` option to find
tables that contain "test" anywhere in the description. `mydataset` is in your
default project --- `myproject`.

To run the query against a project other than your default project, add the
project ID to the dataset in the following format:
`` `project_id`.dataset.INFORMATION_SCHEMA.view ``;
for example,
`` `myproject`.mydataset.INFORMATION_SCHEMA.TABLE_OPTIONS ``.

```googlesql
  SELECT
    *
  FROM
    mydataset.INFORMATION_SCHEMA.TABLE_OPTIONS
  WHERE
    option_name = 'description'
    AND option_value LIKE '%test%';
```

The result is similar to the following:

<br />

```text
  +----------------+---------------+------------+-------------+-------------+--------------+
  | table_catalog  | table_schema  | table_name | option_name | option_type | option_value |
  +----------------+---------------+------------+-------------+-------------+--------------+
  | myproject      | mydataset     | mytable1   | description | STRING      | "test data"  |
  | myproject      | mydataset     | mytable2   | description | STRING      | "test data"  |
  +----------------+---------------+------------+-------------+-------------+--------------+

```

<br />

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/information-schema-table-options (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders; and inline code that the twin replaces with its link URL ([`BigtableOptions`](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#bigtableoptions)) is restored from the link text of the rendered page. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the example value for `REGION` is `` `region-us` ``, but the view name on this page already has the prefix (`region-REGION`), so that value would produce `region-region-us`. The example value is changed to `us`.

## Related

- [Index of this directory](./README.md)
