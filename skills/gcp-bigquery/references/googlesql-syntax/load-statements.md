---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/load-statements
---

# Load statements in GoogleSQL

## Signature / Usage

### `LOAD DATA` statement

Loads data from one or more files into a table. The statement can create a new
table, append data into an existing table or partition, or overwrite an existing
table or partition. If the `LOAD DATA` statement fails, the table into which you
are loading data remains unchanged.

#### Syntax

```text
LOAD DATA {OVERWRITE|INTO}  [{TEMP|TEMPORARY} TABLE]
[[project_name.]dataset_name.]table_name
[(
  column_list
)]
[[OVERWRITE] PARTITIONS (partition_column_name=partition_value)]
[PARTITION BY partition_expression]
[CLUSTER BY clustering_column_list]
[OPTIONS (table_option_list)]
FROM FILES(load_option_list)
[WITH PARTITION COLUMNS
  [(partition_column_list)]
]
[WITH CONNECTION connection_name]

column_list: column[, ...]

partition_column_list: partition_column_name, partition_column_type[, ...]
```

#### Arguments

- `INTO`: If a table with this name already exists, the statement appends data
  to the table. You must use `INTO` instead of `OVERWRITE` if your statement
  includes the `PARTITIONS` clause.

- `OVERWRITE`: If a table with this name already exists, the statement
  overwrites the table.

- `{TEMP|TEMPORARY} TABLE`: Use this clause to create or write to a temporary
  table.

- `project_name`: The name of the project for the table. The value
  defaults to the project that runs this DDL query.

- `dataset_name`: The name of the dataset for the table.

- `table_name`: The name of the table.

- `column_list`: Contains the table's schema information as a list of table
  columns. For more information about table schemas, see
  [Specifying a schema](https://docs.cloud.google.com/bigquery/docs/schemas). If you don't specify a schema,
  BigQuery uses
  [schema auto-detection](https://docs.cloud.google.com/bigquery/docs/schema-detect) to infer the schema.

  When you load hive-partitioned data into a new table or overwrite an existing
  table, then that table
  schema contains the hive-partitioned columns and the columns in the
  `column_list`.

  If you append hive-partitioned data to an existing table, then the
  hive-partitioned columns and `column_list` can be a subset of the existing
  columns. If the combined list of columns in not a subset of the existing
  columns, then the following rules apply:
  - If your data is self-describing, such as ORC, PARQUET, or AVRO, then
    columns in the source file that are omitted from the `column_list`
    are ignored. Columns in the `column_list` that don't exist in the source
    file are written with `NULL` values. If a column is in the `column_list`
    and the source file, then their types must match.

  - If your data is not self-describing, such as CSV or JSON, then columns
    in the source file that are omitted from the `column_list` are only
    ignored if you set `ignore_unknown_values` to `TRUE`. Otherwise this
    statement returns an error. You can't list
    columns in the `column_list` that don't exist in the source file.

- `[OVERWRITE] PARTITIONS`: Use this clause to write to or
  overwrite exactly one partition. When you use this clause, the statement
  must begin with `LOAD DATA INTO`.

- `partition_column_name`: The name of the partitioned column to write to.
  If you use both the `PARTITIONS` and the `PARTITION BY` clauses, then the
  column names must match.

- `partition_value`: The `partition_id` of the partition to append or
  overwrite.
  To find the `partition_id` values of a table, query the
  [`INFORMATION_SCHEMA.PARTITIONS` view](https://docs.cloud.google.com/bigquery/docs/information-schema-partitions).
  You can't set the `partition_value` to `__NULL__` or `__UNPARTITIONED__`.
  You can only append to or overwrite one partition. If your data contains
  values that belong to multiple partitions, then the statement
  fails with an error. This `partition_value` must be literal value.

- `partition_expression`: Specifies the table partitioning when creating a
  new table.

- `clustering_column_list`: Specifies table clustering when creating a new
  table. The value is a comma-separated list of column names, with up to four
  columns.

- [`table_option_list`](#table_option_list): Specifies options for creating
  the table. If you include this clause and the table already exists, then the
  options must match the existing table specification.

- `partition_column_list`: A list of external partitioning columns.

- `connection_name`: The connection name that is used to read the source
  files from an [external data source](https://docs.cloud.google.com/bigquery/external-data-sources).

- [`load_option_list`](#load_option_list): Specifies options for loading the
  data.

If no table exists with the specified name, then the statement creates a new
table. If a table already exists with the specified name, then the behavior
depends on the `INTO` or `OVERWRITE` keyword. The `INTO` keyword appends the
data to the table, and the `OVERWRITE` keyword overwrites the table.

If your external data uses a
[hive-partitioned layout](https://docs.cloud.google.com/bigquery/docs/hive-partitioned-queries-gcs#supported_data_layouts),
then include the `WITH PARTITION COLUMNS` clause. If you include the `WITH
PARTITION COLUMNS` clause without `partition_column_list`, then
BigQuery infers the partitioning from the data layout. If you
include both `column_list` and `WITH PARTITION COLUMNS`, then
`partition_column_list` is required.

You can't use the `LOAD DATA` statement to load data into a temporary table.

#### `column`

`(column_name column_schema[, ...])` contains the table's
schema information in a comma-separated list.

> [!NOTE]
> **Note:** Constraints cannot be specified on `ARRAY` or `STRUCT` elements.

```googlesql
column :=
  column_name column_schema

column_schema :=
   {
     simple_type
     | STRUCT<field_list>
     | ARRAY<array_element_schema>
   }
   [PRIMARY KEY NOT ENFORCED | REFERENCES table_name(column_name) NOT ENFORCED]
   [ DEFAULT default_expression |
     embedding_generation |
     identity_column ]
   [NOT NULL]
   [OPTIONS(column_option_list)]

simple_type :=
  { data_type | STRING COLLATE collate_specification }

field_list :=
  field_name column_schema [, ...]

array_element_schema :=
  { simple_type | STRUCT<field_list> }
  [NOT NULL]

embedding_generation :=
  GENERATED ALWAYS AS (generation_expression) STORED OPTIONS(generation_option_list)

identity_column :=
  [ GENERATED { ALWAYS | BY DEFAULT } ] AS IDENTITY (
    [ START WITH start_value ]
    [ INCREMENT BY increment_value ])
```

- [`column_name`](https://docs.cloud.google.com/bigquery/docs/schemas#column_names) is the name of the column.
  A column name:

  - Must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_)
  - Must start with a letter or underscore
  - Can be up to 300 characters
- `column_schema`: Similar to a
  [data type](https://docs.cloud.google.com/bigquery/docs/schemas#standard_sql_data_types), but supports an
  optional `NOT NULL` constraint for types other than `ARRAY`. `column_schema`
  also supports options on top-level columns and `STRUCT` fields.

  `column_schema` can be used only in the column definition list of
  `CREATE TABLE` statements. It cannot be used as a type in expressions.
- `simple_type`: Any
  [supported data type](data-types.md)
  aside from `STRUCT` and `ARRAY`.

  If `simple_type` is a `STRING`, it supports an additional clause for
  [collation](collation-concepts.md#collation-specification-details),
  which defines how a resulting `STRING` can be compared and sorted.
  The syntax looks like this:

  ```sql
  STRING COLLATE collate_specification
  ```

  If you have `DEFAULT COLLATE collate_specification` assigned to the table,
  the collation specification for a column overrides the specification for the
  table.
- `default_expression`: The [default value](https://docs.cloud.google.com/bigquery/docs/default-values)
  assigned to the column. You cannot specify `DEFAULT` if `GENERATED ALWAYS AS`
  is specified.

- `field_list`: Represents the fields in a struct.

- `field_name`: The name of the struct field. Struct field names have the
  same restrictions as column names.

- `NOT NULL`: When the `NOT NULL` constraint is present for a column or field,
  the column or field is created with `REQUIRED` mode. Conversely, when the
  `NOT NULL` constraint is absent, the column or field is created with
  `NULLABLE` mode.

  Columns and fields of `ARRAY` type do not support the `NOT NULL` modifier. For
  example, a `column_schema` of `ARRAY<INT64> NOT NULL` is invalid, since
  `ARRAY` columns have `REPEATED` mode and can be empty but cannot be `NULL`.
  An array element in a table can never be `NULL`, regardless of whether the
  `NOT NULL` constraint is specified. For example, `ARRAY<INT64>` is equivalent
  to `ARRAY<INT64 NOT NULL>`.

  The `NOT NULL` attribute of a table's `column_schema` does not propagate
  through queries over the table. If table `T` contains a column declared as
  `x INT64 NOT NULL`, for example,
  `CREATE TABLE dataset.newtable AS SELECT x FROM T` creates a table named
  `dataset.newtable` in which `x` is `NULLABLE`.
- `generation_expression`: ([Preview](https://cloud.google.com/products#product-launch-stages))
  An expression for an automatically generated embedding column.
  Setting this field enables
  [autonomous embedding generation](https://docs.cloud.google.com/bigquery/docs/autonomous-embedding-generation)
  on the table. The only
  supported `generation_expression` syntax is a call to the
  [`AI.EMBED` function](../bigqueryml-sql/ai-embed.md).

  - You can't specify `GENERATED ALWAYS AS` if `DEFAULT` is specified.
  - The `connection_id` argument to `AI.EMBED` is required when used in a generation expression.
  - The type of the column must be `STRUCT<result ARRAY<FLOAT64>, status STRING>`.
- `generation_option_list`: The options for a generated column.
  The only supported option is `asynchronous = TRUE`.

- `ALWAYS`: The [identity column](https://docs.cloud.google.com/bigquery/docs/identity-columns)
  can only have generated values. You
  can't manually insert values into the column. This mode is the default mode.

- `BY DEFAULT`: You can manually insert values into the
  [identity column](https://docs.cloud.google.com/bigquery/docs/identity-columns). If
  you add a row to the table and don't specify a value for the column, or
  specify a `NULL` value, then a generated value is used.

- `start_value`: An `INT64` literal that contains the first generated value to
  use for the identity column. The default value is 1.

- `increment_value`: An `INT64` value other than 0 that contains the minimum
  difference between successive values generated for the identity column.
  Some values might be skipped. The difference between successive generated
  values is always a multiple of the `increment_value`. For example,
  if your starting value is 1 and your increment is 2, then the
  generated values can only include odd numbers.
  The default value is 1.

#### `column_option_list`

Specify a column option list in the following format:

`NAME=VALUE, ...`

`NAME` and `VALUE` must be one of the following combinations:

| `NAME` | `VALUE` | Details |
|---|---|---|
| `description` | `STRING` | Example: `description="a unique id"` This property is equivalent to the [schema.fields\[\].description](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#TableFieldSchema.FIELDS.description) table resource property. |
| `rounding_mode` | `STRING` | Example: `rounding_mode = "ROUND_HALF_EVEN"` This specifies the [rounding mode](https://docs.cloud.google.com/bigquery/docs/schemas#rounding_mode) that's used for values written to a `NUMERIC` or `BIGNUMERIC` type column or `STRUCT` field. The following values are supported: - `"ROUND_HALF_AWAY_FROM_ZERO"`: Halfway cases are rounded away from zero. For example, 2.25 is rounded to 2.3, and -2.25 is rounded to -2.3. - `"ROUND_HALF_EVEN"`: Halfway cases are rounded towards the nearest even digit. For example, 2.25 is rounded to 2.2 and -2.25 is rounded to -2.2. This property is equivalent to the [`roundingMode`](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#TableFieldSchema.FIELDS.rounding_mode) table resource property. |
| `data_policies` | `ARRAY<STRING>` | Applies a [data policy](https://docs.cloud.google.com/bigquery/docs/column-data-masking#create_data_policies) to a column in a table. Example: `data_policies = ["{'name':'myproject.region-us.data_policy_name1'}", "{'name':'myproject.region-us.data_policy_name2'}"]` The [`ALTER TABLE ALTER COLUMN`](data-definition-language-3.md#alter-column-set-options-statement) statement supports the `=` and `+=` operators to add data policies to a specific column. Example: `data_policies +=["data_policy1", "data_policy2"]` |
| `data_governance_tags` | `ARRAY<STRUCT<STRING, STRING>>` | Applies [data governance tags](https://docs.cloud.google.com/bigquery/docs/tags#data-governance-tags) to a column in a table. Example: `data_governance_tags = [("myproject/tag_key", "tag_value")]` |

`VALUE` is a constant expression containing only literals, query parameters,
and scalar functions.

The constant expression **cannot** contain:

- A reference to a table
- Subqueries or SQL statements such as `SELECT`, `CREATE`, or `UPDATE`
- User-defined functions, aggregate functions, or analytic functions
- The following scalar functions:
  - `ARRAY_TO_STRING`
  - `REPLACE`
  - `REGEXP_REPLACE`
  - `RAND`
  - `FORMAT`
  - `LPAD`
  - `RPAD`
  - `REPEAT`
  - `SESSION_USER`
  - `GENERATE_ARRAY`
  - `GENERATE_DATE_ARRAY`

Setting the `VALUE` replaces the existing value of that option for the column, if
there was one. Setting the `VALUE` to `NULL` clears the column's value for that
option.

#### `partition_expression`

`PARTITION BY` is an optional clause that controls
[table](https://docs.cloud.google.com/bigquery/docs/partitioned-tables) and
[vector index](https://docs.cloud.google.com/bigquery/docs/vector-index#partitions) partitioning.
`partition_expression` is an expression that determines how to partition the
table or vector index. The partition expression can contain the following
values:

- `_PARTITIONDATE`. Partition by ingestion time with daily partitions. This syntax cannot be used with the `AS query_statement` clause.
- `DATE(_PARTITIONTIME)`. Equivalent to `_PARTITIONDATE`. This syntax cannot be used with the `AS query_statement` clause.
- `<date_column>`. Partition by a `DATE` column with daily partitions.
- `DATE({ <timestamp_column> | <datetime_column> })`. Partition by a `TIMESTAMP` or `DATETIME` column with daily partitions.
- `DATETIME_TRUNC(<datetime_column>, { DAY | HOUR | MONTH | YEAR })`. Partition by a `DATETIME` column with the specified partitioning type.
- `TIMESTAMP_TRUNC(<timestamp_column>, { DAY | HOUR | MONTH | YEAR })`. Partition by a `TIMESTAMP` column with the specified partitioning type.
- `TIMESTAMP_TRUNC(_PARTITIONTIME, { DAY | HOUR | MONTH | YEAR })`. Partition by ingestion time with the specified partitioning type. This syntax cannot be used with the `AS query_statement` clause.
- `DATE_TRUNC(<date_column>, { MONTH | YEAR })`. Partition by a `DATE` column with the specified partitioning type.
- `RANGE_BUCKET(<int64_column>, GENERATE_ARRAY(<start>, <end>[, <interval>]))`.
  Partition by an integer column with the specified range, where:

  - `start` is the start of range partitioning, inclusive.
  - `end` is the end of range partitioning, exclusive.
  - `interval` is the width of each range within the partition. Defaults to 1.

#### `table_option_list`

The option list lets you set table options such as a
[label](https://docs.cloud.google.com/bigquery/docs/labels) and an expiration time. You can include multiple
options using a comma-separated list.

Specify a table option list in the following format:

`NAME=VALUE, ...`

`NAME` and `VALUE` must be one of the following combinations:

| `NAME` | `VALUE` | Details |
|---|---|---|
| `expiration_timestamp` | `TIMESTAMP` | Example: `expiration_timestamp=TIMESTAMP "2025-01-01 00:00:00 UTC"` This property is equivalent to the [expirationTime](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#Table.FIELDS.expiration_time) table resource property. |
| `partition_expiration_days` | `FLOAT64` | Example: `partition_expiration_days=7` Sets the partition expiration in days. For more information, see [Set the partition expiration](https://docs.cloud.google.com/bigquery/docs/managing-partitioned-tables#partition-expiration). By default, partitions don't expire. This property is equivalent to the [timePartitioning.expirationMs](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#TimePartitioning.FIELDS.expiration_ms) table resource property but uses days instead of milliseconds. One day is equivalent to 86400000 milliseconds, or 24 hours. This property can only be set if the table is partitioned. |
| `require_partition_filter` | `BOOL` | Example: `require_partition_filter=true` Specifies whether queries on this table must include a predicate filter that filters on the partitioning column. For more information, see [Set partition filter requirements](https://docs.cloud.google.com/bigquery/docs/managing-partitioned-tables#require-filter). The default value is `false`. This property is equivalent to the [timePartitioning.requirePartitionFilter](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#TimePartitioning.FIELDS.require_partition_filter) table resource property. This property can only be set if the table is partitioned. |
| `friendly_name` | `STRING` | Example: `friendly_name="my_table"` This property is equivalent to the [friendlyName](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#Table.FIELDS.friendly_name) table resource property. |
| `description` | `STRING` | Example: `description="a table that expires in 2025"` This property is equivalent to the [description](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#Table.FIELDS.description) table resource property. |
| `labels` | `ARRAY<STRUCT<STRING, STRING>>` | Example: `labels=[("org_unit", "development")]` This property is equivalent to the [labels](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#Table.FIELDS.labels) table resource property. |
| `default_rounding_mode` | `STRING` | Example: `default_rounding_mode = "ROUND_HALF_EVEN"` This specifies the default [rounding mode](https://docs.cloud.google.com/bigquery/docs/schemas#rounding_mode) that's used for values written to any new `NUMERIC` or `BIGNUMERIC` type columns or `STRUCT` fields in the table. It does not impact existing fields in the table. The following values are supported: - `"ROUND_HALF_AWAY_FROM_ZERO"`: Halfway cases are rounded away from zero. For example, 2.5 is rounded to 3.0, and -2.5 is rounded to -3. - `"ROUND_HALF_EVEN"`: Halfway cases are rounded towards the nearest even digit. For example, 2.5 is rounded to 2.0 and -2.5 is rounded to -2.0. This property is equivalent to the [`defaultRoundingMode`](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#Table.FIELDS.default_rounding_mode) table resource property. |
| `enable_change_history` | `BOOL` | Example: `enable_change_history=TRUE` Set this property to `TRUE` in order to capture [change history](https://docs.cloud.google.com/bigquery/docs/change-history) on the table, which you can then view by using the [`CHANGES` function](../googlesql-functions/time-series-functions.md#changes). Enabling this table option has an impact on costs; for more information see [Pricing and costs](https://docs.cloud.google.com/bigquery/docs/change-history#pricing_and_costs). The default is `FALSE`. |
| `max_staleness` | `INTERVAL` | Example: `max_staleness=INTERVAL "4:0:0" HOUR TO SECOND` The maximum interval behind the current time where it's acceptable to read stale data. For example, with [change data capture](https://docs.cloud.google.com/bigquery/docs/change-data-capture), when this option is set, the table copy operation is denied if data is more stale than the `max_staleness` value. `max_staleness` is disabled by default. |
| `enable_fine_grained_mutations` | `BOOL` | In [preview](https://cloud.google.com/products/#product-launch-stages). Example: `enable_fine_grained_mutations=TRUE` Set this property to `TRUE` to enable [fine-grained DML optimization](https://docs.cloud.google.com/bigquery/docs/data-manipulation-language#fine-grained_dml) on the table. The default is `FALSE`. |
| `storage_uri` | `STRING` | In [preview](https://cloud.google.com/products/#product-launch-stages). Example: `storage_uri=gs://BUCKET_DIRECTORY/TABLE_DIRECTORY/` A fully qualified location prefix for the external folder where data is stored. Supports `gs:` buckets. Required for [managed tables](https://docs.cloud.google.com/bigquery/docs/managed-tables). |
| `file_format` | `STRING` | In [preview](https://cloud.google.com/products/#product-launch-stages). Example: `file_format=PARQUET` The open-source file format in which the table data is stored. Only `PARQUET` is supported. Required for [managed tables](https://docs.cloud.google.com/bigquery/docs/managed-tables). The default is `PARQUET`. |
| `table_format` | `STRING` | In [preview](https://cloud.google.com/products/#product-launch-stages). Example: `table_format=ICEBERG` The open table format in which metadata-only snapshots are stored. Only `ICEBERG` is supported. Required for [managed tables](https://docs.cloud.google.com/bigquery/docs/managed-tables). The default is `ICEBERG`. |
| `tags` | `<ARRAY<STRUCT<STRING, STRING>>>` | An array of IAM tags for the table, expressed as key-value pairs. The key should be the [namespaced key name](https://docs.cloud.google.com/iam/docs/tags-access-control#definitions), and the value should be the [short name](https://docs.cloud.google.com/iam/docs/tags-access-control#definitions). |

`VALUE` is a constant expression containing only literals, query parameters,
and scalar functions.

The constant expression **cannot** contain:

- A reference to a table
- Subqueries or SQL statements such as `SELECT`, `CREATE`, or `UPDATE`
- User-defined functions, aggregate functions, or analytic functions
- The following scalar functions:
  - `ARRAY_TO_STRING`
  - `REPLACE`
  - `REGEXP_REPLACE`
  - `RAND`
  - `FORMAT`
  - `LPAD`
  - `RPAD`
  - `REPEAT`
  - `SESSION_USER`
  - `GENERATE_ARRAY`
  - `GENERATE_DATE_ARRAY`

#### `load_option_list`

Specifies options for loading data from external files. The `format` and `uris`
options are required. Specify the option list in the following format:
`NAME=VALUE, ...`

| Options ||
|---|---|
| `allow_jagged_rows` | `BOOL` If `true`, allow rows that are missing trailing optional columns. Applies to CSV data. |
| `allow_quoted_newlines` | `BOOL` If `true`, allow quoted data sections that contain newline characters in the file. Applies to CSV data. |
| `bigtable_options` | `STRING` Only required when creating a Bigtable external table. Specifies the schema of the Bigtable external table in JSON format. For a list of Bigtable table definition options, see [`BigtableOptions`](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#bigtableoptions) in the REST API reference. |
| `column_name_character_map` | `STRING` Defines the scope of supported column name characters and the handling behavior of unsupported characters. The default setting is `STRICT`, which means unsupported characters cause BigQuery to throw errors. `V1` and `V2` replace any unsupported characters with underscores. Supported values include: - `STRICT`. Enables [flexible column names](https://docs.cloud.google.com/bigquery/docs/schemas#flexible-column-names). This is the default value. Load jobs with unsupported characters in column names fail with an error message. To configure the replacement of unsupported characters with underscores so that the load job succeeds, specify the [`default_column_name_character_map`](https://docs.cloud.google.com/bigquery/docs/default-configuration) configuration setting. - `V1`. Column names can only contain [standard column name characters](https://docs.cloud.google.com/bigquery/docs/schemas#column_names). Unsupported characters (except [periods in Parquet file column names](https://docs.cloud.google.com/bigquery/docs/loading-data-cloud-storage-parquet#limitations_2)) are replaced with underscores. This is the default behavior for tables created before the introduction of `column_name_character_map`. - `V2`. Besides [standard column name characters](https://docs.cloud.google.com/bigquery/docs/schemas#column_names), it also supports [flexible column names](https://docs.cloud.google.com/bigquery/docs/schemas#flexible-column-names). Unsupported characters (except [periods in Parquet file column names](https://docs.cloud.google.com/bigquery/docs/loading-data-cloud-storage-parquet#limitations_2)) are replaced with underscores. - Applies to CSV and Parquet data. |
| `compression` | `STRING` The compression type of the data source. Supported values include: `GZIP`. If not specified, the data source is uncompressed. Applies to CSV and JSON data. |
| `decimal_target_types` | `ARRAY<STRING>` Determines how to convert a `Decimal` type. Equivalent to [ExternalDataConfiguration.decimal_target_types](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#ExternalDataConfiguration.FIELDS.decimal_target_types) Example: `["NUMERIC", "BIGNUMERIC"]`. |
| `enable_list_inference` | `BOOL` If `true`, use schema inference specifically for Parquet LIST logical type. Applies to Parquet data. |
| `enable_logical_types` | `BOOL` If `true`, convert Avro logical types into their corresponding SQL types. For more information, see [Logical types](https://docs.cloud.google.com/bigquery/docs/loading-data-cloud-storage-avro#logical_types). Applies to Avro data. |
| `encoding` | `STRING` The character encoding of the data. Supported values include: `UTF8` (or `UTF-8`), `ISO_8859_1` (or `ISO-8859-1`), `UTF-16BE`, `UTF-16LE`, `UTF-32BE`, or `UTF-32LE`. The default value is `UTF-8`. Applies to CSV data. |
| `enum_as_string` | `BOOL` If `true`, infer Parquet ENUM logical type as STRING instead of BYTES by default. Applies to Parquet data. |
| `field_delimiter` | `STRING` The separator for fields in a CSV file. Applies to CSV data. |
| `format` | `STRING` The format of the external data. Supported values for [`CREATE EXTERNAL TABLE`](data-definition-language-2.md#create-external-table-statement) include: `AVRO`, `CLOUD_BIGTABLE`, `CSV`, `DATASTORE_BACKUP`, `DELTA_LAKE` ([preview](https://cloud.google.com/products/#product-launch-stages)), `GOOGLE_SHEETS`, `NEWLINE_DELIMITED_JSON` (or `JSON`), `ORC`, `PARQUET`. Supported values for [`LOAD DATA`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/load-statements) include: `AVRO`, `CSV`, `DELTA_LAKE` ([preview](https://cloud.google.com/products/#product-launch-stages)), `NEWLINE_DELIMITED_JSON` (or `JSON`), `ORC`, `PARQUET`. The value `JSON` is equivalent to `NEWLINE_DELIMITED_JSON`. |
| `hive_partition_uri_prefix` | `STRING` A common prefix for all source URIs before the partition key encoding begins. Applies only to hive-partitioned external tables. Applies to Avro, CSV, JSON, Parquet, and ORC data. Example: `"gs://bucket/path"`. |
| `file_set_spec_type` | `STRING` Specifies how to interpret source URIs for load jobs and external tables. Supported values include: - `FILE_SYSTEM_MATCH`. Expands source URIs by listing files from the object store. This is the default behavior if FileSetSpecType is not set. - `NEW_LINE_DELIMITED_MANIFEST`. Indicates that the provided URIs are newline-delimited manifest files, with one URI per line. Wildcard URIs are not supported in the manifest files, and all referenced data files must be in the same bucket as the manifest file. For example, if you have a source URI of `"gs://bucket/path/file"` and the `file_set_spec_type` is `FILE_SYSTEM_MATCH`, then the file is used directly as a data file. If the `file_set_spec_type` is `NEW_LINE_DELIMITED_MANIFEST`, then each line in the file is interpreted as a URI that points to a data file. |
| `ignore_unknown_values` | `BOOL` If `true`, ignore extra values that are not represented in the table schema, without returning an error. Applies to CSV and JSON data. |
| `json_extension` | `STRING` For JSON data, indicates a particular JSON interchange format. If not specified, BigQuery reads the data as generic JSON records. Supported values include: `GEOJSON`. Newline-delimited GeoJSON data. For more information, see [Creating an external table from a newline-delimited GeoJSON file](https://docs.cloud.google.com/bigquery/docs/geospatial-data#external-geojson). |
| `max_bad_records` | `INT64` The maximum number of bad records to ignore when reading the data. Applies to: CSV, JSON, and Google Sheets data. |
| `max_staleness` | `INTERVAL` Applicable for [BigLake tables](https://docs.cloud.google.com/bigquery/docs/biglake-intro#metadata_caching_for_performance) and [object tables](https://docs.cloud.google.com/bigquery/docs/object-table-introduction#metadata_caching_for_performance). Specifies whether cached metadata is used by operations against the table, and how fresh the cached metadata must be in order for the operation to use it. To disable metadata caching, specify 0. This is the default. To enable metadata caching, specify an [interval literal](lexical.md#interval-literals) value between 30 minutes and 7 days. For example, specify `INTERVAL 4 HOUR` for a 4 hour staleness interval. With this value, operations against the table use cached metadata if it has been refreshed within the past 4 hours. If the cached metadata is older than that, the operation falls back to retrieving metadata from Cloud Storage instead. |
| `null_marker` | `STRING` The string that represents `NULL` values in a CSV file. Applies to CSV data. |
| `null_markers` | `ARRAY<STRING>` The list of strings that represent `NULL` values in a CSV file. This option cannot be used with `null_marker` option. Applies to CSV data. |
| `object_metadata` | `STRING` Only required when creating an [object table](https://docs.cloud.google.com/bigquery/docs/object-table-introduction). Set the value of this option to `SIMPLE` when creating an object table. |
| `preserve_ascii_control_characters` | `BOOL` If `true`, then the embedded ASCII control characters which are the first 32 characters in the ASCII table, ranging from '\\x00' to '\\x1F', are preserved. Applies to CSV data. |
| `quote` | `STRING` The string used to quote data sections in a CSV file. If your data contains quoted newline characters, also set the `allow_quoted_newlines` property to `true`. Applies to CSV data. |
| `skip_leading_rows` | `INT64` The number of rows at the top of a file to skip when reading the data. Applies to CSV and Google Sheets data. |
| `source_column_match` | `STRING` This controls the strategy used to match loaded columns to the schema. If this value is unspecified, then the default is based on how the schema is provided. If autodetect is enabled, then the default behavior is to match columns by name. Otherwise, the default is to match columns by position. This is done to keep the behavior backward-compatible. Supported values include: - `POSITION`: matches by position. This option assumes that the columns are ordered the same way as the schema. - `NAME`: matches by name. This option reads the header row as column names and reorders columns to match the field names in the schema. Column names are read from the last skipped row based on the `skip_leading_rows` property. |
| `tags` | `<ARRAY<STRUCT<STRING, STRING>>>` An array of IAM tags for the table, expressed as key-value pairs. The key should be the [namespaced key name](https://docs.cloud.google.com/iam/docs/tags-access-control#definitions), and the value should be the [short name](https://docs.cloud.google.com/iam/docs/tags-access-control#definitions). |
| `time_zone` | `STRING` Default time zone that will apply when parsing timestamp values that have no specific time zone. Check [valid time zone names](data-types.md#time-zone-name). If this value is not present, the timestamp values without specific time zone is parsed using default time zone UTC. Applies to CSV and JSON data. |
| `date_format` | `STRING` [Format elements](format-elements.md#format-string-as-date-and-time) that define how the DATE values are formatted in the input files (for example, `MM/DD/YYYY`). If this value is present, this format is the only compatible DATE format. [Schema autodetection](https://docs.cloud.google.com/bigquery/docs/schema-detect#date_and_time_values) will also decide DATE column type based on this format instead of the existing format. If this value is not present, the DATE field is parsed with the [default formats](https://docs.cloud.google.com/bigquery/docs/loading-data-cloud-storage-csv#data_types). Applies to CSV and JSON data. |
| `datetime_format` | `STRING` [Format elements](format-elements.md#format-string-as-date-and-time) that define how the DATETIME values are formatted in the input files (for example, `MM/DD/YYYY HH24:MI:SS.FF3`). If this value is present, this format is the only compatible DATETIME format. [Schema autodetection](https://docs.cloud.google.com/bigquery/docs/schema-detect#date_and_time_values) will also decide DATETIME column type based on this format instead of the existing format. If this value is not present, the DATETIME field is parsed with the [default formats](https://docs.cloud.google.com/bigquery/docs/loading-data-cloud-storage-csv#data_types). Applies to CSV and JSON data. |
| `time_format` | `STRING` [Format elements](format-elements.md#format-string-as-date-and-time) that define how the TIME values are formatted in the input files (for example, `HH24:MI:SS.FF3`). If this value is present, this format is the only compatible TIME format. [Schema autodetection](https://docs.cloud.google.com/bigquery/docs/schema-detect#date_and_time_values) will also decide TIME column type based on this format instead of the existing format. If this value is not present, the TIME field is parsed with the [default formats](https://docs.cloud.google.com/bigquery/docs/loading-data-cloud-storage-csv#data_types). Applies to CSV and JSON data. |
| `timestamp_format` | `STRING` [Format elements](format-elements.md#format-string-as-date-and-time) that define how the TIMESTAMP values are formatted in the input files (for example, `MM/DD/YYYY HH24:MI:SS.FF3`). If this value is present, this format is the only compatible TIMESTAMP format. [Schema autodetection](https://docs.cloud.google.com/bigquery/docs/schema-detect#date_and_time_values) will also decide TIMESTAMP column type based on this format instead of the existing format. If this value is not present, the TIMESTAMP field is parsed with the [default formats](https://docs.cloud.google.com/bigquery/docs/loading-data-cloud-storage-csv#data_types). Applies to CSV and JSON data. |
| `uris` | For external tables, including object tables, that aren't Bigtable tables: `ARRAY<STRING>` An array of fully qualified URIs for the external data locations. Each URI can contain one asterisk (`*`) [wildcard character](https://docs.cloud.google.com/bigquery/docs/loading-data-cloud-storage#load-wildcards), which must come after the bucket name. When you specify `uris` values that target multiple files, all of those files must share a compatible schema. The following examples show valid `uris` values: - `['gs://bucket/path1/myfile.csv']` - `['gs://bucket/path1/*.csv']` - `['gs://bucket/path1/*', 'gs://bucket/path2/file00*']` <br /> For Bigtable tables: `STRING` The URI identifying the Bigtable table to use as a data source. You can only specify one Bigtable URI. Example: `https://googleapis.com/bigtable/projects/project_id/instances/instance_id[/appProfiles/app_profile]/tables/table_name` For more information on constructing a Bigtable URI, see [Retrieve the Bigtable URI](https://docs.cloud.google.com/bigquery/docs/create-bigtable-external-table#bigtable-uri). |

#### Examples

The following examples show common use cases for the `LOAD DATA` statement.

##### Load data into a table

The following example loads an Avro file into a table. Avro is a
self-describing format, so BigQuery infers the schema.

```sql
LOAD DATA INTO mydataset.table1
  FROM FILES(
    format='AVRO',
    uris = ['gs://bucket/path/file.avro']
  )
```

The following example loads two CSV files into a table, using schema
autodetection.

```sql
LOAD DATA INTO mydataset.table1
  FROM FILES(
    format='CSV',
    uris = ['gs://bucket/path/file1.csv', 'gs://bucket/path/file2.csv']
  )
```

##### Load data using a schema

The following example loads a CSV file into a table, using a specified table
schema.

```sql
LOAD DATA INTO mydataset.table1(x INT64, y STRING)
  FROM FILES(
    skip_leading_rows=1,
    format='CSV',
    uris = ['gs://bucket/path/file.csv']
  )
```

##### Set options when creating a new table

The following example creates a new table with a description and an expiration
time.

```sql
LOAD DATA INTO mydataset.table1
  OPTIONS(
    description="my table",
    expiration_timestamp="2025-01-01 00:00:00 UTC"
  )
  FROM FILES(
    format='AVRO',
    uris = ['gs://bucket/path/file.avro']
  )
```

##### Overwrite an existing table

The following example overwrites an existing table.

```sql
LOAD DATA OVERWRITE mydataset.table1
  FROM FILES(
    format='AVRO',
    uris = ['gs://bucket/path/file.avro']
  )
```

##### Load data into a temporary table

The following example loads an Avro file into a temporary table.

```sql
LOAD DATA INTO TEMP TABLE mydataset.table1
  FROM FILES(
    format='AVRO',
    uris = ['gs://bucket/path/file.avro']
  )
```

##### Specify table partitioning and clustering

The following example creates a table that is partitioned by the
`transaction_date` field and clustered by the `customer_id` field. It also
configures the partitions to expire after three days.

```sql
LOAD DATA INTO mydataset.table1
  PARTITION BY transaction_date
  CLUSTER BY customer_id
  OPTIONS(
    partition_expiration_days=3
  )
  FROM FILES(
    format='AVRO',
    uris = ['gs://bucket/path/file.avro']
  )
```

##### Load data into a partition

The following example loads data into a selected partition of an ingestion-time
partitioned table:

```sql
LOAD DATA INTO mydataset.table1
PARTITIONS(_PARTITIONTIME = TIMESTAMP '2016-01-01')
  PARTITION BY _PARTITIONTIME
  FROM FILES(
    format = 'AVRO',
    uris = ['gs://bucket/path/file.avro']
  )
```

##### Load a file that is externally partitioned

The following example loads a set of external files that use a
[hive partitioning](https://docs.cloud.google.com/bigquery/docs/hive-partitioned-queries-gcs#supported_data_layouts)
layout.

```sql
LOAD DATA INTO mydataset.table1
  FROM FILES(
    format='AVRO',
    uris = ['gs://bucket/path/*'],
    hive_partition_uri_prefix='gs://bucket/path'
  )
  WITH PARTITION COLUMNS(
    field_1 STRING, -- column order must match the external path
    field_2 INT64
  )
```

The following example infers the partitioning layout:

```sql
LOAD DATA INTO mydataset.table1
  FROM FILES(
    format='AVRO',
    uris = ['gs://bucket/path/*'],
    hive_partition_uri_prefix='gs://bucket/path'
  )
  WITH PARTITION COLUMNS
```

If you include both `column_list` and `WITH PARTITION COLUMNS`, then you must
explicitly list the partitioning columns. For example, the following query
returns an error:

```sql
-- This query returns an error.
LOAD DATA INTO mydataset.table1
  (
    x INT64, -- column_list is given but the partition column list is missing
    y STRING
  )
  FROM FILES(
    format='AVRO',
    uris = ['gs://bucket/path/*'],
    hive_partition_uri_prefix='gs://bucket/path'
  )
  WITH PARTITION COLUMNS
```

##### Load data with BigQuery Omni transfer

##### Example 1

The following example loads a parquet file named `sample.parquet` from an Amazon S3
bucket into the `testparquet` table with an auto-detect schema:

```googlesql
LOAD DATA INTO mydataset.testparquet
  FROM FILES (
    uris = ['s3://test-bucket/sample.parquet'],
    format = 'PARQUET'
  )
  WITH CONNECTION `aws-us-east-1.test-connection`
```

##### Example 2

The following example loads a CSV file with the prefix `sampled*` from your
Blob Storage into the `test_csv` table with predefined column
partitioning by time:

```googlesql
LOAD DATA INTO mydataset.test_csv (Number INT64, Name STRING, Time DATE)
  PARTITION BY Time
  FROM FILES (
    format = 'CSV', uris = ['azure://test.blob.core.windows.net/container/sampled*'],
    skip_leading_rows=1
  )
  WITH CONNECTION `azure-eastus2.test-connection`
```

##### Example 3

The following example overwrites the existing table `testparquet` with
data from a file named `sample.parquet` with an auto-detect schema:

```googlesql
LOAD DATA OVERWRITE mydataset.testparquet
  FROM FILES (
    uris = ['s3://test-bucket/sample.parquet'],
    format = 'PARQUET'
  )
  WITH CONNECTION `aws-us-east-1.test-connection`
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/load-statements (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders; and inline code that the twin replaces with its link URL ([`BigtableOptions`](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#bigtableoptions)) is restored from the link text of the rendered page. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Conflicting official statements: the page says "You can't use the `LOAD DATA` statement to load data into a temporary table", but the `{TEMP|TEMPORARY} TABLE` clause is documented as creating or writing to a temporary table, and an example uses `LOAD DATA INTO TEMP TABLE mydataset.table1`. The official docs do not say which is correct.
- Corrected from the official docs: Example 1 and Example 3 text names the table `test_parquet`, but the example statements load `mydataset.testparquet` (`LOAD DATA INTO` and `LOAD DATA OVERWRITE`). The text is changed to `testparquet` to match the code.
- Corrected from the official docs: the `data_policies` link target is `#alter-column-set-data-type-statement`. It is changed to `#alter-column-set-options-statement`, the `ALTER COLUMN SET OPTIONS` statement, whose column option table defines `data_policies`.
- Corrected from the official docs: the `LOAD DATA` list of supported `format` values has no comma after the `DELTA_LAKE` preview link. A comma is added, as in the `CREATE EXTERNAL TABLE` list on the same row.

## Related

- [Index of this directory](./README.md)
