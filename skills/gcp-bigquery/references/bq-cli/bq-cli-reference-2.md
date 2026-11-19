---
source: https://docs.cloud.google.com/bigquery/docs/reference/bq-cli-reference
---

# bq command-line tool reference (part 2 of 3)

## Signature / Usage

### Commands

The following sections describe the bq command-line tool commands, along with their
command-specific flags and arguments.

#### `bq add-iam-policy-binding`

Use the `bq add-iam-policy-binding` command to retrieve the
[Identity and Access Management (IAM) policy](https://docs.cloud.google.com/iam/docs/reference/rest/v1/Policy#binding)
for a table or view and add a binding to the
policy, in one step.

This command is an alternative to the following three-step process:

1. Using the [`bq get-iam-policy`](#bq-get-iam-policy) command to retrieve the policy file (in JSON format).
2. Editing the policy file.
3. Using the [`bq set-iam-policy`](bq-cli-reference-3.md#bq-set-iam-policy) command to update the policy with a new binding.

> [!NOTE]
> **Note:** `bq add-iam-policy-binding` does not support datasets. To modify access to a dataset, see [Grant access to a dataset](https://docs.cloud.google.com/bigquery/docs/control-access-to-resources-iam#grant_access_to_a_dataset).

##### Synopsis

```text
bq add-iam-policy-binding [FLAGS] --member=MEMBER_TYPE:MEMBER --role=ROLE
  [--table] RESOURCE
```

##### Example

```text
bq add-iam-policy-binding --member=user:myAccount@gmail.com \
  --role=roles/bigquery.dataViewer myDataset.myTable
```

##### Flags and arguments

The `bq add-iam-policy-binding` command uses the following flags and
arguments:

**`--member=MEMBER_TYPE:MEMBER`**

:   Required. Use the `--member` flag to specify the member part of the
IAM policy binding. The `--member` flag is required
along with the `--role` flag. One combination of `--member` and `--role`
flags equals one binding.

The `MEMBER_TYPE` value
specifies the type of member in the
IAM policy binding. Use one of the following values:

- `user`
- `serviceAccount`
- `group`
- `domain`

The `MEMBER` value specifies
the email address or domain of the member in the
IAM policy binding.

**`--role=ROLE`**

:   Required. Specifies the role part of the IAM policy
binding. The `--role` flag is required along with
the `--member` flag. One combination of `--member` and `--role` flags equals
one binding.

**`--table={true|false}`**

:   To return an error if the `RESOURCE` argument is not a
table or view identifier, set the `--table` flag to `true`. The default value is
`false`. This flag is supported for consistency with other commands.

**`RESOURCE`**

:   The table or view whose policy you want to add to.

For more information, see the
[IAM policy reference](https://docs.cloud.google.com/iam/docs/reference/rest/v1/Policy#binding).

#### `bq cancel`

Use the `bq cancel` command to cancel BigQuery jobs.

##### Synopsis

```text
bq [--synchronous_mode=false] cancel JOB_ID
```

##### Examples

```text
bq cancel bqjob_12345
```

```text
bq --synchronous_mode=false cancel bqjob_12345
```

##### Flags and arguments

The `bq cancel` command uses the following flags and arguments:

**`--synchronous_mode=false`**
:   If you don't want to wait for the `bq cancel` command to complete ,set the
global [`--synchronous_mode`](https://docs.cloud.google.com/bigquery/docs/reference/bq-cli-reference#sync_flag) flag to `false`. The default is
`true`.

**`JOB_ID`**
:   The job you want to cancel.

For more information about using the `bq cancel` command, see
[Managing jobs](https://docs.cloud.google.com/bigquery/docs/managing-jobs).

#### `bq cp`

Use the `bq cp` command for the following tasks:

- Create a copy of a [table](https://docs.cloud.google.com/bigquery/docs/tables-intro), [table clone](https://docs.cloud.google.com/bigquery/docs/table-clones-intro), or [table snapshot](https://docs.cloud.google.com/bigquery/docs/table-snapshots-intro).
- Create a table clone.
- Create a table snapshot.

##### Synopsis

```text
bq cp [FLAGS] SOURCE_TABLE DESTINATION_TABLE
```

##### Example

```text
bq cp myDataset.myTable myDataset.myTableCopy
```

##### Flags and arguments

The `bq cp` command uses the following flags and arguments:

**`--append_table={true|false}` or `-a={true|false}`**

:   To append a table to an existing table, set to `true`.
The default value is `false`.

You can't use the flag settings
`--append_table=true` and `--clone=true` at the same time.

**`--clone={true|false}`**

:   To create a [table clone](https://docs.cloud.google.com/bigquery/docs/table-clones-intro), set to
`true`. The base table can be a standard table, a table clone, or a table
snapshot. The destination table is a table clone. The default is `false`; if
neither `--clone=true` nor `--snapshot=true` is specified, then the
destination table is the same type of table as the base table. Requires the `--no_clobber` flag.

You can't use the flag settings
`--append_table=true` and `--clone=true` at the same time.

**`--destination_kms_key=KEY`**

:   Specifies a Cloud KMS
[key resource ID](https://docs.cloud.google.com/bigquery/docs/customer-managed-encryption#key_resource_id)
for encrypting the destination table data.

For example:

```text
--destination_kms_key=projects/myProject/locations/global/keyRings/myKeyRing/cryptoKeys/myKey
```

<br />

**`--expiration=SECONDS`**

:   The number of seconds until a table snapshot expires. If not included, the
table snapshot expiration is set to the default expiration of the dataset
containing the new table snapshot. Use with
the `--snapshot` flag.

**`--force={true|false}` or `-f={true|false}`**

:   To overwrite the destination table, if it exists, without prompting, set
to `true`. The default value is `false`; if the destination table exists, then
the command prompts for confirmation before overwriting.

**`--no_clobber={true|false}` or `-n={true|false}`**

:   To disallow overwriting the destination table, if it exists,
set to `true`. The default value is `false`; if the destination table exists,
then it is overwritten.

**`--restore={true|false}`**

:   This flag is being deprecated. To create a writable table from a table
snapshot, use the `bq cp` command or the `bq cp --clone` command.

**`--snapshot={true|false}`**

:   To create a [table snapshot](https://docs.cloud.google.com/bigquery/docs/table-snapshots-intro) of the
table that's specified in the `SOURCE_TABLE`
argument, set to `true`. The base table can be a standard table, a table
clone, or another table snapshot. The default is `false`; if
neither `--clone=true` nor `--snapshot=true` is specified, then the
destination table is the same type of table as the base table.
Requires the `--no_clobber` flag.

**`SOURCE_TABLE`**

:   The table that you want to copy.

**`DESTINATION_TABLE`**

:   The table that you want to copy to.

For more information about using the `cp` command, see the following:

- [Copy a table](https://docs.cloud.google.com/bigquery/docs/managing-tables#copy-table)
- [Create table clones](https://docs.cloud.google.com/bigquery/docs/table-clones-create)
- [Create table snapshots](https://docs.cloud.google.com/bigquery/docs/table-snapshots-create)
- [Restore table snapshots](https://docs.cloud.google.com/bigquery/docs/table-snapshots-restore)

#### `bq extract`

Use the `bq extract` command to export table data to Cloud Storage.

##### Synopsis

```text
bq extract [FLAGS] RESOURCE DESTINATION
```

##### Examples

```bash
bq extract --compression=GZIP --destination_format=CSV --field_delimiter=tab \
    --print_header=false myDataset.myTable gs://my-bucket/myFile.csv.gzip
```

```bash
bq extract --destination_format=CSV --field_delimiter='|' myDataset.myTable \
  gs://myBucket/myFile.csv
```

##### Flags and arguments

The `bq extract` command uses the following flags and arguments:

**`--compression=COMPRESSION_TYPE`**

:   Specifies the type of compression to use for exported files. Possible values
are the following:

- `GZIP`
- `DEFLATE`
- `SNAPPY`
- `NONE`

The default value is `NONE`.

For information about which formats are supported for each compression type,
see
[Export formats and compression types](https://docs.cloud.google.com/bigquery/docs/exporting-data#export_formats_and_compression_types).

**`--destination_format=FORMAT`**

:   Specifies the format for the exported data. Possible values
are the following:

- `CSV`
- `NEWLINE_DELIMITED_JSON`
- `AVRO`
- `PARQUET`

The default value is `CSV`.

**`--field_delimiter=DELIMITER`**

:   For CSV exports, specifies the character that marks the boundary
between columns in the output file. The delimiter can be
any ISO-8859-1 single-byte character. You can use `\t` or `tab` to specify
tab delimiters.

**`--print_header={true|false}`**

:   To suppress printing header rows for formats that have headers, set to
`false`. The default is `true`; header rows are included.

**`RESOURCE`**

:   The table that you are exporting from.

**`DESTINATION`**

:   The storage location that receives the exported data.

For more information about using the `bq extract` command, see
[Exporting table data](https://docs.cloud.google.com/bigquery/docs/exporting-data).

#### `bq get-iam-policy`

Use the `bq get-iam-policy` command to retrieve the
[IAM policy](https://docs.cloud.google.com/iam/docs/reference/rest/v1/Policy#binding)
for a resource and
print it to `stdout`. The resource can be a table, a view, or a
[slot reservation](https://docs.cloud.google.com/bigquery/docs/reservations-workload-management#slot_reservations).
The policy is in JSON format.

> [!NOTE]
> **Note:** `bq get-iam-policy` does not support datasets. To get the IAM policy of a dataset, see [View the access policy of a dataset](https://docs.cloud.google.com/bigquery/docs/control-access-to-resources-iam#view_the_access_policy_of_a_dataset).

##### Synopsis

```text
bq get-iam-policy [FLAGS] RESOURCE
```

##### Examples

```text
bq get-iam-policy myDataset.myTable
```

```text
bq get-iam-policy --reservation myReservation
```

##### Flags and arguments

The `bq get-iam-policy` command uses the following flags and arguments:

**`--table={true|false}` or `-t={true|false}`**
:   To return an error if `RESOURCE` is not a
table or view identifier, set the `--table` flag to `true`. The default value is
`false`. This flag is supported for consistency with other commands.

**`--reservation={true|false}`**
:   To get the IAM policy of a reservation, set to `true`
([Preview](https://cloud.google.com/products/#product-launch-stages)). The
default value is `false`. When this flag is used, `RESOURCE`
is treated as a reservation identifier. The reservation can have optional
project and location prefixes: `myProject:myLocation.myReservation`.

**`RESOURCE`**
:   The table or view whose policy you want to get.

For more information about the `bq get-iam-policy` command, see
[Control access to resources with IAM](https://docs.cloud.google.com/bigquery/docs/control-access-to-resources-iam#bq).

#### `bq head`

Use the `bq head` command to display the specified rows and columns of a table.
By default, it displays all columns of the first 100 rows.

##### Synopsis

```text
bq head [FLAGS] [TABLE]
```

##### Example

```text
bq head --max_rows=10 --start_row=50 --selected_fields=field1,field3 \
  myDataset.myTable
```

##### Flags and arguments

The `bq head` command uses the following flags and arguments:

**`--job=JOB or -j=JOB`**
:   To read the results of a query job, specify this flag with a valid job ID.

**`--max_rows=MAX or -n=MAX`**
:   An integer that indicates the maximum number of rows to print when
showing table data. The default value is `100`.

**`--selected_fields=COLUMN_NAMES or -c=COLUMN_NAMES`**
:   A comma-separated list that specifies a subset of
fields (including nested and repeated fields) to return when showing table
data. If this flag is not specified, then all columns are returned.

**`--start_row=START_ROW or -s=START_ROW`**
:   An integer that specifies the number of rows to skip
before showing table data. The default value is `0`; the table data starts at
the first row.

**`--table={true|false}` or `-t={true|false}`**
:   To return an error if the command argument is not a
table or view, set to `true`. The default value is
`false`. This flag is supported for consistency with other commands.

**`TABLE`**
:   The table whose data you want to retrieve.

For more information about using the `bq head` command, see
[Managing table data](https://docs.cloud.google.com/bigquery/docs/managing-table-data).

#### `bq help`

Use the `bq help` command to display bq command-line tool documentation within the tool.

##### Synopsis

`bq help [COMMAND]`

##### Flags and arguments

The `bq help` command uses the following flags and arguments:

**`COMMAND`**
:   Specifies a particular bq command-line tool command that you want to get online help
for.

#### `bq insert`

Use the `bq insert` command to insert rows of newline-delimited,
JSON-formatted data into a table from a file using the streaming insert. Data
types are converted to match
the column types of the destination table. This command is intended for testing
purposes only. To stream data into BigQuery, use the
[BigQuery Storage Write API (gRPC)](https://docs.cloud.google.com/bigquery/docs/write-api).

##### Synopsis

```text
bq insert [FLAGS] TABLE FILE
```

##### Examples

```bash
bq insert --ignore_unknown_values --template_suffix=_insert myDataset.myTable /tmp/myData.json
```

```bash
echo '{"a":1, "b":2}' | bq insert myDataset.myTable
```

##### Flags and arguments

The `bq insert` command uses the following flags and arguments:

**`--ignore_unknown_values={true|false}` or `-i={true|false}`**
:   When set to `true`, BigQuery ignores any key-value pairs that
don't match the table's schema, and inserts the row with the data that does
match the schema. When set to `false`, rows with data that doesn't match the
table's schema are not inserted. The default is `false`.

**`--skip_invalid_rows={true|false}` or `-s={true|false}`**
:   When set to `true`, BigQuery attempts to insert any
valid rows, even if invalid rows are present. When set to `false`,
the command fails if any invalid rows are present. The default is `false`.

**`--template_suffix=SUFFIX or -x=SUFFIX`**
:   When specified, treat the destination table <var translate="no">TABLE</var> as a
base template, and insert the rows into an instance table named
`{destination}{templateSuffix}`. BigQuery creates the
instance table using the schema of the base template.

**`TABLE`**
:   The table that you want to insert data into.

**`FILE`**
:   The file containing the data that you want to insert.

For more information about using the `bq insert` command, see
[Streaming data into BigQuery](https://docs.cloud.google.com/bigquery/docs/streaming-data-into-bigquery).

#### `bq load`

Use the `bq load` command to load data into a table.

##### Synopsis

```text
bq load [FLAGS] DESTINATION_TABLE SOURCE_DATA [SCHEMA]
```

##### Example

```text
bq load myDataset.newTable gs://mybucket/info.csv ./info_schema.json
```

##### Flags and arguments

The `bq load` command uses the following flags and arguments:

**`--allow_jagged_rows={true|false}`**
:   To allow missing trailing optional columns in CSV data, set to `true`.

**`--preserve_ascii_control_characters={true|false}`**
:   To allow embedded ASCII control characters in CSV data, set to `true`.

**`--allow_quoted_newlines={true|false}`**
:   To allow quoted newlines in CSV data, set to `true`.

**`--autodetect={true|false}`**
:   To enable schema auto-detection for CSV and JSON data, set to `true`. The
default is `false`. If `--autodetect` is `false`, and no schema is specified
by using the `--schema` flag, and the destination table exists, then the
schema of the destination table is used.

**`--clustering_fields=COLUMNS`**
:   A comma-separated list of up to four column names that specifies the fields to
use for [table clustering](https://docs.cloud.google.com/bigquery/docs/clustered-tables).

**`--column_name_character_map=SCOPE`**
:   Defines the scope and handling of
characters in column names, with the option of enabling
[flexible column names](https://docs.cloud.google.com/bigquery/docs/loading-data-cloud-storage-parquet#flexible-column-names).
Requires the `--autodetect` option for CSV files.
For a list of possible values, see
[`load_option_list`](../googlesql-syntax/load-statements.md#load_option_list).

**`--destination_kms_key=KEY`**
:   Specifies a Cloud KMS
[key resource ID](https://docs.cloud.google.com/bigquery/docs/customer-managed-encryption#key_resource_id)
for encrypting the destination table data.

**`--encoding=ENCODING_TYPE or -E=ENCODING_TYPE`**
:   The character encoding used in the data. Use one of the following values:

- `ISO-8859-1` (also known as Latin-1)
- `UTF-8`

**`--field_delimiter=DELIMITER or -F=DELIMITER`**
:   Specifies the character that marks the boundary between columns in the data.
The delimiter can be any ISO-8859-1 single-byte character. You can use either
`\t` or `tab` to specify tab delimiters.

**`--ignore_unknown_values={true|false}`**
:   When set to `true` for CSV and JSON files, rows with extra column values that
don't match the table schema are loaded, but the extra columns are ignored.
When set to `true` for Avro, Parquet and ORC files, fields in the file schema
that don't exist in the table schema are ignored and aren't loaded.

**`--json_extension=JSON_TYPE`**

:   Specifies the type of JSON file to load. Applies only to JSON files. Possible
values are the following:

- `GEOJSON` - newline-delimited GeoJSON file

To use this flag, the `--source_format` flag must be set to
`NEWLINE_DELIMITED_JSON`.

For more information, see
[Loading newline-delimited GeoJSON files](https://docs.cloud.google.com/bigquery/docs/gis-data#geojson-files).

**`--max_bad_records=MAX`**

:   An integer that specifies the maximum number of bad records allowed before the
entire job fails. The default value is `0`. At most, five errors of any type
are returned regardless of the `--max_bad_records` value. This flag applies
for loading CSV, JSON, and Google Sheets data only.

**`--null_marker=STRING`**

:   An optional custom string that represents a `NULL` value in
CSV data.

**`--projection_fields=PROPERTY_NAMES`**

:   If you set `--source_format` to `DATASTORE_BACKUP`, then this flag
indicates which entity properties to load from a Datastore export.
Specify the property names in a comma-separated list.
Property names are case sensitive and must refer to
top-level properties. You can also use this flag
with Firestore exports.

**`--quote=CHARACTER`**

:   Specifies a quote character to surround fields in CSV data. The
`CHARACTER` argument can be any one-byte character.
The default value is double quote (`"`).
To specify that there is no quote character, use an empty string `""`.

**`--replace={true|false}`**

:   To erase any existing data and schema when new data is
loaded, set to `true`. Any Cloud KMS key is also removed, unless you
specify the
`--destination_kms_key` flag. The default value is `false`.

Equivalent to the `WRITE_TRUNCATE` value for [`JobConfigurationLoad.writeDisposition`](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/Job#JobConfigurationLoad.FIELDS.write_disposition).

> [!NOTE]
> **Note:** You can use the [`TRUNCATE TABLE`](../googlesql-syntax/dml-syntax.md#truncate-table-statement) statement to remove all rows from a table without deleting the schema.

**`--schema={SCHEMA_FILE|SCHEMA`}**

:   Specifies either the path to a local JSON schema file or a comma-separated
list of column definitions in the form
`FIELD:DATA_TYPE,
FIELD:DATA_TYPE`.
If you use a schema file, don't add an extension to the filename.

For example:

```text
--schema=/tmp/tabledef
```

```text
--schema=Region:STRING,Quarter:STRING,Total_sales:INTEGER
```

<br />

If no schema is specified, and `--autodetect` is `false`, and the destination
table exists, then the schema of the destination table is used.

**`--schema_update_option=OPTION`**

:   When appending data to a table (in a load job or a
query job), or when overwriting a table partition, specifies how to update the
schema of the destination table. Use one of the following values:

- `ALLOW_FIELD_ADDITION`: Allow new fields to be added
- `ALLOW_FIELD_RELAXATION`: Allow relaxing `REQUIRED` fields to `NULLABLE`

Repeat this flag to specify multiple schema update options.

**`--skip_leading_rows=NUMBER_OF_ROWS`**

:   An integer that specifies the number of rows to skip at
the beginning of the source file. The default is `0`.

**`--file_set_spec_type=FILE_SET_SPEC_TYPE`**

:   Specifies how to interpret source URIs.

- `FILE_SYSTEM_MATCH`: Expands source URIs by listing files from the object store. This is the default behavior if FileSetSpecType is not set.
- `NEW_LINE_DELIMITED_MANIFEST`: Indicates that the provided URIs are newline-delimited manifest files, with one URI per line. Wildcard URIs are not supported in the manifest files, and all referenced data files must be in the same bucket as the manifest.

For example, if you have a source URI of `"gs://bucket/path/file"`
and the `file_set_spec_type` is `FILE_SYSTEM_MATCH`, then the
file is used directly as a data file. If the `file_set_spec_type`
is `NEW_LINE_DELIMITED_MANIFEST`, then each line in the file is interpreted
as a URI that points to a data file.

**`--source_format=FORMAT`**

:   The format of the source data. Use one of the following values:

- `CSV`
- `NEWLINE_DELIMITED_JSON`
- `AVRO`
- `DATASTORE_BACKUP` (use this value for Firestore)
- `PARQUET`
- `ORC`

**`--time_partitioning_expiration=SECONDS`**

:   An integer that specifies (in seconds) when
a time-based partition should be deleted. The expiration time evaluates to the
partition's UTC date plus the integer value. A negative number indicates no
expiration.

**`--time_partitioning_field=COLUMN_NAME`**

:   Specifies the field that determines how to create a
time-based partition. If time-based partitioning is enabled without this
value, then the table is partitioned based on the load time.

**`--time_partitioning_type=INTERVAL`**

:   Enables time-based partitioning on a table and sets the partition type.
Use one of the following values:

- `DAY`
- `HOUR`
- `MONTH`
- `YEAR`

The default partition type for time-based partitioning is `DAY`.

**`--use_avro_logical_types={true|false}`**

:   If the `--source_format` flag is set to `AVRO`, then set this flag to `true` to
convert logical types into their corresponding types (such as `TIMESTAMP`)
instead of only using their raw types (such as `INTEGER`).

**`--decimal_target_types=DECIMAL_TYPE`**

:   Determines how to convert a `Decimal` logical type. Equivalent to
[`JobConfigurationLoad.decimalTargetTypes`](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/Job#JobConfigurationLoad.FIELDS.decimal_target_types).
Repeat this flag to specify multiple target types.

**`--parquet_enum_as_string={true|false}`**

:   If the `--source_format` flag is set to `PARQUET`, and you want BigQuery
to infer Parquet `ENUM` logical types as `STRING` values, then set this flag
to `true`. The default is `false`.

**`--parquet_enable_list_inference={true|false}`**

:   If the `--source_format` flag is set to `PARQUET`, then this flag indicates whether to use
[schema inference](https://docs.cloud.google.com/bigquery/docs/loading-data-cloud-storage-parquet#list_logical_type)
for Parquet `LIST` logical types.

**`--reference_file_schema_uri=URI`**

:   Specifies the path to a reference file with the expected table schema for
creating external tables. Equivalent to
[`ExternalDataConfiguration.referenceFileSchemaUri`](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#ExternalDataConfiguration.FIELDS.reference_file_schema_uri).
This flag is enabled for Avro, ORC, and PARQUET formats.

**`DESTINATION_TABLE`**

:   The table that you want to load data into.

**`SOURCE_DATA`**

:   The [Cloud Storage URI](https://docs.cloud.google.com/bigquery/docs/batch-loading-data#gcs-uri)
of the file that contains the data that you want to load.

**`SCHEMA`**

:   The schema for the destination table.

For more information about loading data from Cloud Storage using the
`bq load`
command, see the following:

- [Load Avro data](https://docs.cloud.google.com/bigquery/docs/loading-data-cloud-storage-avro)
- [Load CSV data](https://docs.cloud.google.com/bigquery/docs/loading-data-cloud-storage-csv)
- [Load JSON data](https://docs.cloud.google.com/bigquery/docs/loading-data-cloud-storage-json)
- [Load ORC data](https://docs.cloud.google.com/bigquery/docs/loading-data-cloud-storage-orc)
- [Load Parquet data](https://docs.cloud.google.com/bigquery/docs/loading-data-cloud-storage-parquet)
- [Load data from Datastore exports](https://docs.cloud.google.com/bigquery/docs/loading-data-cloud-datastore)
- [Load data from Firestore exports](https://docs.cloud.google.com/bigquery/docs/loading-data-cloud-firestore)

For more information about loading data from a local source using the `bq load`
command, see the following:

- [Load data from local files](https://docs.cloud.google.com/bigquery/docs/batch-loading-data#loading_data_from_local_files).

#### `bq ls`

Use the `bq ls` command to list objects in a collection.

##### Synopsis

```text
bq ls [FLAGS] [RESOURCE]
```

##### Example

```text
bq ls myDataset
```

##### Flags and arguments

The `bq ls` command uses the following flags and arguments:

**`--all={true|false}` or `-a={true|false}`**
:   To show all results, set to `true`. Shows jobs from all users or
all datasets, including hidden ones. This flag is not needed when listing
transfer configurations or transfer runs. The default value is `false`.

**`--capacity_commitment={true|false}`**

:   To list capacity commitments, set to `true` and use the `--location` flag to
specify the location. For more information, see
[View purchased commitments](https://docs.cloud.google.com/bigquery/docs/reservations-commitments#view-commitments).

For example: `bq ls --capacity_commitment=true --location='us'`

**`--datasets={true|false}` or `-d={true|false}`**

:   To list datasets, set to `true`. The default value is `false`.

**`--filter="FILTER"`**

:   Filters the listed resources to match the
`FILTER` argument.

For datasets, `FILTER` consists of one or more
space-separated triples in the format
`labels.KEY:VALUE`. If more than one triple
is provided, then the command only returns datasets matching *all* of the
triples (i.e., the command uses the `AND` logical operator, not `OR`). If
you want to specify more than one triple, then surround the
`FILTER` value with quotation marks.

To filter based on dataset labels, use the keys and values that you applied
to your datasets.

For example:

```text
 --filter "labels.department:marketing labels.team:sales"

```

<br />

For transfer configurations, use `dataSourceIds` as the key,
and one of the following data sources as the value:

- `amazon_s3` - [Amazon S3 data transfer](https://docs.cloud.google.com/bigquery/docs/s3-transfer#bq)
- `azure_blob_storage` - [Azure Blob Storage data transfer](https://docs.cloud.google.com/bigquery/docs/blob-storage-transfer#bq)
- `dcm_dt` - [Campaign Manager data transfer](https://docs.cloud.google.com/bigquery/docs/doubleclick-campaign-transfer#set_up_a_campaign_manager_transfer)
- `google_cloud_storage` - [Cloud Storage data transfer](https://docs.cloud.google.com/bigquery/docs/cloud-storage-transfer#set_up_a_cloud_storage_transfer)
- `cross_region_copy` - [Dataset Copy](https://docs.cloud.google.com/bigquery/docs/copying-datasets)
- `dfp_dt`- [Google Ad Manager data transfer](https://docs.cloud.google.com/bigquery/docs/doubleclick-publisher-transfer#set_up_a_google_ad_manager_transfer)
- `displayvideo`- [Display \& Video 360 data transfer](https://docs.cloud.google.com/bigquery/docs/display-video-transfer)
- `google_ads` - [Google Ads data transfer](https://docs.cloud.google.com/bigquery/docs/google-ads-transfer)
- `merchant_center` - [Google Merchant Center data transfer](https://docs.cloud.google.com/bigquery/docs/merchant-center-transfer-schedule-transfers)
- `mysql` - [MySQL data transfer](https://docs.cloud.google.com/bigquery/docs/mysql-transfer#set-up-a-mysql-data-transfer)
- `play` - [Google Play data transfer](https://docs.cloud.google.com/bigquery/docs/play-transfer#setup-transfer)
- `scheduled_query` - [Scheduled queries data transfer](https://docs.cloud.google.com/bigquery/docs/scheduling-queries)
- `search_ads`- [Search Ads 360 data transfer](https://docs.cloud.google.com/bigquery/docs/search-ads-transfer)
- `youtube_channel` - [YouTube Channel data transfer](https://docs.cloud.google.com/bigquery/docs/youtube-channel-transfer#set_up_a_youtube_channel_transfer)
- `youtube_content_owner` - [YouTube Content Owner data transfer](https://docs.cloud.google.com/bigquery/docs/youtube-content-owner-transfer#set_up_a_youtube_content_owner_transfer)
- `redshift` - [Amazon Redshift migration](https://docs.cloud.google.com/bigquery/docs/migration/redshift#set-up-transfer)
- `on_premises` - [Teradata migration](https://docs.cloud.google.com/bigquery/docs/migration/teradata)
- `snowflake_migration` - [Snowflake migration](https://docs.cloud.google.com/bigquery/docs/migration/snowflake-transfer#bq)

For example:

Adapted (not in the official docs): the filter key in the transfer configuration example is changed from `labels.dataSourceIds` to `dataSourceIds`.

```text
   --filter dataSourceIds:dcm_dt

```

<br />

For transfer runs, use `states` as the key and one or more of the following
transfer states as the value:

- `SUCCEEDED`
- `FAILED`
- `PENDING`
- `RUNNING`
- `CANCELLED`

For example:

```text
--filter="states:FAILED"
```

For jobs, use `states` as the key and one or more of the following job states as
the value:

- `RUNNING`
- `PENDING`
- `DONE`

For example:

```text
bq ls --jobs --filter="states:RUNNING"

bq ls --jobs --filter="states:RUNNING,PENDING"
```

**`--jobs={true|false}` or `-j={true|false}`**
:   To list jobs, set to `true`. The default value is `false`. By default, you are
limited to 100,000 results.

**`--max_creation_time=MAX_CREATION_TIME_MS`**
:   An integer that represents a
[Unix epoch](https://wikipedia.org/wiki/Unix_time) timestamp in milliseconds.
When specified with the `--jobs` flag, this flag lists only the jobs created
before the timestamp.

**`--max_results=MAX_RESULTS or -n=MAX_RESULTS`**
:   An integer indicating the maximum number of results. The default value is 50
and the maximum value is 1000. If you have more than 1000 jobs, then you can
use the `page_token` flag to list all jobs using pagination.

**--`min_creation_time=MIN_CREATION_TIME_MS`**
:   An integer that represents a
[Unix epoch](https://wikipedia.org/wiki/Unix_time) timestamp
in milliseconds. When specified with the `--jobs` flag, this flag lists only
the jobs created after the timestamp.

**`--message_type=messageTypes:MESSAGE_TYPE`**

:   To list only transfer run log messages of a particular type,
specify `messageTypes:MESSAGE_TYPE`. Possible values
are the following:

- `INFO`
- `WARNING`
- `ERROR`

**`--models={true|false}` or `-m={true|false}`**

:   To list BigQuery ML models, set to `true`. The default value is
`false`.

**`--page_token=TOKEN` or `-k=TOKEN`**

:   Lists items starting from the specified page token.

**`--projects={true|false}` or `-p={true|false}`**

:   To show all projects, set to `true`. The default value is `false`.

**`--reservation={true|false}`**

:   To list all reservations for a given project and location, set to `true`. The
default value is `false`. Use with the `--project_id` and `--location`
flags.

For example:

```text
bq ls --reservation=true --project_id=myProject --location=us
```

<br />

**`--reservation_assignment={true|false}`**

:   To list all reservation assignments for a given project and
location, set to `true`. The default value is `false`. Use with the
`--project_id` and `--location` flags.

**`--routines={true|false}`**

:   To list all routines in the specified dataset, set to `true`. The default
value is `false`. Routines include
[persistent user-defined functions](https://docs.cloud.google.com/bigquery/docs/user-defined-functions),
[table functions](https://docs.cloud.google.com/bigquery/docs/table-functions)
([Preview](https://cloud.google.com/products/#product-launch-stages)), and
[stored procedures](https://docs.cloud.google.com/bigquery/docs/procedures).

**`--row_access_policies`**

:   When specified, lists all the row-level access policies on a table. Row-level
access policies are used for row-level security. You must supply the table
name in the format `dataset.table`.

**`--run_attempt=RUN_ATTEMPT`**

:   Use with the `--transfer_run` flag. To list all run attempts for the
specified transfer run, set to `RUN_ATTEMPT_UNSPECIFIED`.
To list only the latest run attempt, set to `LATEST`. The default is `LATEST`.

**`--transfer_config={true|false}`**

:   To list transfer configurations in the specified project and location, set to
`true`. Use with the `--transfer_location` and `--project_id` flag.
The default value is `false`.

**`--transfer_location=LOCATION`**

:   List transfer configurations in the specified
location. You set the transfer location when the transfer is created.

**`--transfer_log={true|false}`**

:   Use with the `--transfer_run` flag. To list transfer log messages for the
specified transfer run, set to `true`. The default value is `false`.

**`--transfer_run={true|false}`**

:   Lists the transfer runs for the specified transfer configuration.

For example:

```text
bq ls --transfer_run=true projects/myProject/locations/us/transferConfigs/12345
```

<br />

**`RESOURCE`**

:   The collection whose objects that you want to list. The resource can be a
dataset, project, reservation, or transfer configuration.

For more information about using the `bq ls` command, see the following:

- [Managing jobs](https://docs.cloud.google.com/bigquery/docs/managing-jobs)
- [List datasets in a project](https://docs.cloud.google.com/bigquery/docs/listing-datasets)
- [Creating and using tables](https://docs.cloud.google.com/bigquery/docs/tables)
- [Listing views in a dataset](https://docs.cloud.google.com/bigquery/docs/view-metadata#list_views)
- [Working with transfers](https://docs.cloud.google.com/bigquery/docs/working-with-transfers)
- [Listing table snapshots in a dataset](https://docs.cloud.google.com/bigquery/docs/table-snapshots-list)

#### `bq mk`

Use the `bq mk` command to create a BigQuery resource.

##### Synopsis

```text
bq mk TYPE_FLAG [OTHER FLAGS] [ARGS]
```

##### Flags and arguments

The `bq mk` command takes a *type* flag that specifies the type of resource to
create, and additional flags that depend on the resource type.

**`TYPE_FLAG`:** Set one of the following flags to `true`.
Your selection specifies the type of resource to create.

- [`--capacity_commitment`](#bq-mk---capacity_commitment): Purchase a capacity
  commitment.

- [`--connection`](#bq-mk---connection): Create a connection.

- [`--dataset`](#bq-mk---dataset) or `-d`: Create a dataset.

- [`--materialized_view`](#bq-mk---materialized_view): Create a materialized view.

- [`--reservation`](#bq-mk---reservation): Create a reservation.

- [`--reservation_assignment`](#bq-mk---reservation_assignment). Assign a folder,
  project, or organization to a reservation.

- [`--reservation-group`](#bq-mk---reservation-group): Create a reservation group.

- [`--table`](#bq-mk---table) or `-t`: Create a table.

- [`--transfer_config`](#bq-mk---transfer_config): Create a transfer configuration.

- [`--transfer_run`](#bq-mk---transfer_run): Create a transfer run for a time range.

- [`--view`](#bq-mk---view): Create a view.

The `bq mk` command supports the following flag for all types of resources:

**`--force={true|false}` or `-f={true|false}`**
:   To ignore errors if a resource with the same name already exists, set to
`true`. If the resource already exists, then the exit code is 0, but setting this
flag to `true` does not cause
the `bq mk` command to overwrite the resource. The default value is `false`.

The `bq mk` command supports additional flags, depending on the type of resource
you are creating, as described in the following sections.

##### `bq mk --capacity_commitment`

To purchase a capacity commitment, set `--capacity_commitment` to `true` and use
the following flags:

**`--location=LOCATION`**
:   Specifies the location of the commitment.

**`--plan=PLAN_TYPE`**

:   Specifies the
[commitment plan type](https://docs.cloud.google.com/bigquery/docs/reservations-workload-management#slot_commitments).
Must be one of the following values:

- `ANNUAL`
- `THREE_YEAR`

Customers using legacy flat-rate pricing also may use one of the following values:

- `FLEX`
- `MONTHLY`
- `ANNUAL`

**`--renewal_plan=RENEWAL_TYPE`**

:   Specifies the
[renewal plan type](https://docs.cloud.google.com/bigquery/docs/reservations-workload-management#renew-commitments).
Required for `ANNUAL` or `THREE_YEAR` commitment plans.
Must be one of the following:

- `ANNUAL`
- `THREE_YEAR`
- `NONE`

Customers using legacy flat-rate pricing also may use one of the following
values:

- `FLEX`
- `MONTHLY`
- `ANNUAL`

**`--project_id=PROJECT_ID`**

:   Specifies the project that administers the slots.

**`--slots=NUMBER_OF_BASELINE_SLOTS`**

:   Specifies the number of baseline slots to purchase.

**`--edition=EDITION`**

:   The [edition](https://docs.cloud.google.com/bigquery/docs/editions-intro) associated with the capacity
commitment. Must be one of the following:

- `ENTERPRISE`
- `ENTERPRISE_PLUS`

For more information, see
[Purchase commitments](https://docs.cloud.google.com/bigquery/docs/reservations-commitments#purchase-commitment).

##### `bq mk --connection`

Creates a connection. The following flags are supported:

**`--connection_type=CONNECTION_TYPE`**
:   The type of the connection, for example `CLOUD_SQL` for Cloud SQL connections.

**`--properties=PROPERTIES`**

:   Connection specific parameters in JSON format. `instanceId`, `database` and `type` must be specified.

:   If you create a Spanner connection and want to use
[Data Boost](https://docs.cloud.google.com/spanner/docs/databoost/databoost-overview), include the
`"useParallelism":true` and `"useDataBoost":true` pairs.

**`--connection_credential=CONNECTION_CREDENTIAL`**

:   The credentials of the connection in JSON format. `username` and `password` must be specified.

**`--project_id=PROJECT_ID`**

:   Specifies the ID of the project that the connection belongs to.

**`--location=LOCATION`**

:   Specifies the location that the connection will be stored.

**`--display_name=DISPLAY_NAME`**

:   Specifies an optional friendly name for the connection.

**`--description=DESCRIPTION`**

:   Specifies an optional description of the connection.

**`--iam_role_id=ROLE_ID`**

:   For BigQuery Omni on AWS, specifies an IAM role that
allows access to the resource.

Use the following format:
`"arn:aws:iam::AWS_ACCOUNT_ID:role/POLICY_NAME"`,
where:

- <var translate="no">AWS_ACCOUNT_ID</var> is the ID number of the connection's AWS IAM user.
- <var translate="no">POLICY_NAME</var> is the policy name.

Example: `"arn:aws:iam::0123456789AB:role/s3-read-role"`

**`--tenant_id=TENANT_ID`**

:   For BigQuery Omni on Microsoft Azure, specifies the tenant ID of
the Microsoft Azure directory that contains the Microsoft Azure Storage account.

**`CONNECTION_ID`**

:   Specifies an optional connection ID for the connection. If a connection ID is
not provided a unique ID is automatically generated. The connection ID can
contain letters, numbers and underscores.

For more information, see
[Introduction to connections](https://docs.cloud.google.com/bigquery/docs/connections-api-intro).

##### `bq mk --dataset`

Creates a dataset. The following flags are supported:

**`--add_tags=TAGS`**
:   Specifies the [tags](https://docs.cloud.google.com/bigquery/docs/tags) that you are attaching to the new
dataset, separated by commas. For example,
`556741164180/env:prod,myProject/department:sales`. Each tag must have the
[namespaced key name and value short name](https://docs.cloud.google.com/iam/docs/tags-access-control#definitions).

**`--default_kms_key=KEY`**
:   Specifies the default Cloud KMS
[key resource ID](https://docs.cloud.google.com/bigquery/docs/customer-managed-encryption#key_resource_id)
for encrypting the table data in a dataset if
no explicit key is provided during table creation or query.

**`--default_partition_expiration=SECONDS`**
:   An integer that specifies the default expiration time, in seconds, for all
partitions in newly-created partitioned tables in the dataset. A partition's
expiration time is set to the partition's UTC date plus the integer value.
If this property is set, then its value overrides the dataset-level default
table
expiration if it exists. If you supply the `--time_partitioning_expiration`
flag when you create or update a partitioned table, then the table-level
partition
expiration takes precedence over the dataset-level default partition
expiration.

**`--default_table_expiration=SECONDS`**
:   An integer that specifies the default lifetime,
in seconds, for newly created tables in a dataset. The expiration time is set
to the current UTC time plus this value.

**`--description=DESCRIPTION`**
:   Specifies the description of the dataset.

**`--external_source=EXTERNAL_SOURCE`**
:   Specifies the external data source when you create a
[federated dataset](https://docs.cloud.google.com/bigquery/docs/glue-federated-datasets).

**`--label=KEY:VALUE`**
:   Specifies a label for the dataset. Repeat this flag to specify multiple
labels.

**`--location=LOCATION` or `--data_location=LOCATION`**
:   Specifies the location of the dataset. Prefer the `--location`
flag; the `--data_location` flag is a legacy flag.

**`--max_time_travel_hours=HOURS`**
:   Specifies the duration in
hours of the
[time travel window](https://docs.cloud.google.com/bigquery/docs/time-travel)
for the dataset. The `--max_time_travel_hours` value must
be an integer expressed in multiples of 24 (48, 72, 96, 120, 144, 168)
between 48 (2 days) and 168 (7 days). 168 hours is the default if this
flag isn't specified.

**`--storage_billing_model=BILLING_MODEL`**

:   Specifies the
[storage billing model](https://docs.cloud.google.com/bigquery/docs/datasets-intro#dataset_storage_billing_models)
for a dataset. Set the `--storage_billing_model` value to `PHYSICAL` to use
physical bytes when calculating storage charges, or to `LOGICAL` to use
logical bytes. `LOGICAL` is the default.

When you change a dataset's billing model, it takes 24 hours for the
change to take effect.

Once you change a dataset's storage billing model, you must wait 14 days
before you can change the storage billing model again.

For more information, see
[Creating datasets](https://docs.cloud.google.com/bigquery/docs/datasets).

##### `bq mk --materialized_view`

Creates a materialized view. The following flags are supported:

**`--enable_refresh={true|false}`**
:   To disable automatic refresh for a materialized view, set to `false`.
The default when creating a materialized view is `true`.

**`--refresh_interval_ms=MILLISECONDS`**
:   Specifies the number of milliseconds for the refresh interval of a
materialized view. If this flag is not specified, then the default refresh
interval for a materialized view that has refresh enabled is 1,800,000
milliseconds, which is 30 minutes.

For more information, see
[Creating and using materialized views](https://docs.cloud.google.com/bigquery/docs/materialized-views).

##### `bq mk --reservation`

Creates a reservation with dedicated slots.
The following flags are supported:

**`--target_job_concurrency=CONCURRENCY`**
:   Specifies the target number of
queries that execute simultaneously. The default value is 0, which means
that the concurrency is automatically computed based on the reservation size.
For more information, see [Use query queues](https://docs.cloud.google.com/bigquery/docs/query-queues).

**`--ignore_idle_slots={true|false}`**
:   To restrict jobs running in this reservation to only use slots allocated to
the reservation, set to `true`. The default value is `false`; jobs in this
reservation can use idle slots from other reservations, or slots that are not
allocated to any reservation. For more information, see
[Idle slots](https://docs.cloud.google.com/bigquery/docs/slots#idle_slots).

**`--location=LOCATION`**
:   Specifies the location of the reservation.

**`--project_id=PROJECT_ID`**
:   Specifies the project that owns the reservation.

**`--slots=NUMBER_OF_BASELINE_SLOTS`**
:   Specifies the number of baseline slots to allocate to this reservation.

**`--edition=EDITION`**
:   The [edition](https://docs.cloud.google.com/bigquery/docs/editions-intro) associated with the capacity
commitment. Must be one of the following:

- `STANDARD`
- `ENTERPRISE`
- `ENTERPRISE_PLUS`

**`--autoscale_max_slots=NUMBER_OF_AUTOSCALING_SLOTS`**
:   The number of autoscaling slots assigned to the reservation. This is equal to
the value of the max reservation size minus the number of baseline slots.

**`--max_slots=MAXIMUM_NUMBER_OF_SLOTS`**
:   The maximum number of slots the reservation will consume. Must be configured
with the `--scaling_mode` flag
([Preview](https://cloud.google.com/products/#product-launch-stages)).

**`--scaling_mode=SCALING_MODE`**

:   The scaling mode of the reservation. Must be one of the following:

- `IDLE_SLOTS_ONLY`
- `ALL_SLOTS`
- `AUTOSCALE_ONLY`
- `SCALING_MODE_UNSPECIFIED`

Must be configured with the `--max_slots` flag
([Preview](https://cloud.google.com/products/#product-launch-stages)).

For more information, see
[Create a reservation with dedicated slots](https://docs.cloud.google.com/bigquery/docs/reservations-tasks#create_a_reservation_with_dedicated_slots).

##### `bq mk --reservation_assignment`

Assigns a project, folder, or organization to a reservation.
The following flags are supported:

**`--assignee_id=ASSIGNEE_ID`**
:   Specifies the ID of the folder, organization, or project.

**`--assignee_type=ASSIGNEE_TYPE`**
:   Specifies the type of entity to assign to the reservation. One of
the following:

- `FOLDER`
- `ORGANIZATION`
- `PROJECT`

**`--job_type=JOB_TYPE`**
:   Specifies the type of job to assign to the reservation. One of the following:

- `QUERY`
- `PIPELINE`
- `ML_EXTERNAL`
- `BACKGROUND`

**`--location=LOCATION`**
:   Specifies the location of the reservation.

**`--project_id=PROJECT_ID`**
:   Specifies the project that owns the reservation.

**`--reservation_id=RESERVATION_ID`**
:   Specifies the ID of the reservation.

For more
information, see
[Work with reservation assignments](https://docs.cloud.google.com/bigquery/docs/reservations-assignments).

##### `bq mk --reservation-group`

Create a reservation group.
The following flags are supported:

**`--location=LOCATION`**
:   Specifies the location of the reservation.

**`--project_id=PROJECT_ID`**
:   Specifies the project that owns the reservation.

For more
information, see
[Work with reservation groups](https://docs.cloud.google.com/bigquery/docs/reservations-tasks#prioritize_idle_slots_with_reservation_groups).

##### `bq mk --table`

Creates a table. The following flags are supported:

**`--add_tags=TAGS`**
:   Specifies the [tags](https://docs.cloud.google.com/bigquery/docs/tags) that you are attaching to the new
table, separated by commas. For example,
`556741164180/env:prod,myProject/department:sales`. Each tag must have the
[namespaced key name and value short name](https://docs.cloud.google.com/iam/docs/tags-access-control#definitions).

**`--clustering_fields=COLUMNS`**
:   A comma-separated list of up to four column names that specifies the fields to
use for [table clustering](https://docs.cloud.google.com/bigquery/docs/clustered-tables).
If specified with partitioning, then the table is first
partitioned, and then each partition is clustered using the supplied columns.

**`--description=DESCRIPTION`**
:   Specifies the description of the table.

**`--destination_kms_key=KEY`**
:   Specifies a Cloud KMS
[key resource ID](https://docs.cloud.google.com/bigquery/docs/customer-managed-encryption#key_resource_id)
for encrypting the destination table data.

**`--expiration=SECONDS`**
:   Specifies the lifetime for the table. If you don't specify the `--expiration`
flag, then
BigQuery creates the table with the dataset's default table
lifetime, or the table doesn't expire.

**`--external_table_definition=STRING`**

:   Specifies a table definition for creating an
[external table](https://docs.cloud.google.com/bigquery/docs/external-tables).

**For [Cloud Storage](https://docs.cloud.google.com/bigquery/docs/external-data-cloud-storage)
and [Google Drive](https://docs.cloud.google.com/bigquery/docs/external-data-drive) external tables:**

`--external_table_definition={PATH_TO_FILE|DEFINITION}`
:   The value can be either a path to a file containing a
    [table definition](https://docs.cloud.google.com/bigquery/external-table-definition)
    (`PATH_TO_FILE`) or an inline
    table definition (`DEFINITION`).

- The format for the `DEFINITION` field is `SCHEMA@FORMAT=URI`.
- The format for the `SCHEMA` value is a
  comma-separated list of column definitions in the form
  `FIELD:DATA_TYPE,
  FIELD:DATA_TYPE`. You can omit the
  `SCHEMA` value if the data format is self-describing
  (such as Avro) or if you are using
  [schema auto-detection](https://docs.cloud.google.com/bigquery/docs/schema-detect).

- The `FORMAT` value specifies the data format; one of
  the following:

  - `AVRO`
  - `CSV`
  - `DATASTORE_BACKUP` (use this value for Firestore)
  - `ICEBERG`
  - `NEWLINE_DELIMITED_JSON`
  - `ORC`
  - `PARQUET`

If you specify a table definition file, don't add an extension to the
filename.

For example:

```text
--external_table_definition=/tmp/tabledef
```

```text
--external_table_definition=Region:STRING,Quarter:STRING,Total_sales:INTEGER@CSV=gs://mybucket/sales.csv
```

<br />

**For [Bigtable external tables](https://docs.cloud.google.com/bigquery/docs/external-data-bigtable),
and BigLake tables based on [AWS](https://docs.cloud.google.com/bigquery/docs/omni-aws-create-external-table)
and [Azure](https://docs.cloud.google.com/bigquery/docs/omni-azure-create-external-table):**

`--external_table_definition=PATH_TO_FILE`
:   The value must be a path to a file containing a
    [table definition](https://docs.cloud.google.com/bigquery/docs/external-table-definition#tabledef-bigtable).

**For [BigLake tables based on Cloud Storage](https://docs.cloud.google.com/bigquery/docs/biglake-quickstart):**

`--external_table_definition=FORMAT=BUCKET_PATH@REGION.CONNECTION_NAME`
:

- The `FORMAT` value specifies the data format; one of
  the following:

  - `AVRO`
  - `CSV`
  - `NEWLINE_DELIMITED_JSON`
  - `ICEBERG`
  - `ORC`
  - `PARQUET`
- `BUCKET_PATH` is the path to one or more
  files in Cloud Storage that contain the
  BigLake table data. You can specify
  `BUCKET_PATH` in the following formats:

  - For a single file: `gs://bucket_name/[folder_name/]file_name`.
  - For multiple files in a single bucket: `gs://bucket_name/[folder_name/]*`.
  - For multiple files in multiple buckets:
    `gs://mybucket1/*,gs://mybucket2/folder5/*`.

    > [!IMPORTANT]
    > **Important:** If you specify more than one file, all of the files must have compatible schemas.

    You can use wildcards to limit the files included in the
    BigLake table.
    For example, if the bucket contains several types of data,
    you could have the table only use PARQUET files by specifying
    `gs://bucket_name/*.parquet`. For more information about
    using wildcards, see [URI wildcards](https://docs.cloud.google.com/storage/docs/wildcards).
- The `REGION` value specifies the
  [region or multi-region](https://docs.cloud.google.com/bigquery/docs/locations#supported_locations)
  that contains the connection.

- The `CONNECTION_NAME` value specifies the name of the
  cloud resource connection to use with this external table. The connection
  determines which service account is used to read data from
  Cloud Storage.

**For [object tables](https://docs.cloud.google.com/bigquery/docs/object-tables):**

`--external_table_definition=BUCKET_PATH@REGION.CONNECTION_NAME`
:

- `BUCKET_PATH` is the path to the
  Cloud Storage bucket that contains the objects represented by
  the object table, in the format
  `gs://bucket_name/[folder_name/]*`.You can specify
  multiple buckets by providing multiple paths, for example
  `gs://mybucket1/*,gs://mybucket2/folder5/*`.

  You can use wildcards to
  limit the objects included in the object table. For example, if the
  bucket contains several types of unstructured data, you could create
  the object table over only PDF objects by specifying
  `gs://bucket_name/*.pdf`. For more information about
  using wildcards, see [URI wildcards](https://docs.cloud.google.com/storage/docs/wildcards).
- The `REGION` value specifies the
  [region or multi-region](https://docs.cloud.google.com/bigquery/docs/locations#supported_locations)
  that contains the connection.

- The `CONNECTION_NAME` value specifies the name of the
  cloud resource connection to use with this external table. The connection
  determines which service account is used to read data from
  Cloud Storage.

**`--file_set_spec_type=FILE_SET_SPEC_TYPE`**

:   Specifies how to interpret source URIs.

- `FILE_SYSTEM_MATCH`: Expands source URIs by listing files from the object store. This is the default behavior if FileSetSpecType is not set.
- `NEW_LINE_DELIMITED_MANIFEST`: Indicates that the provided URIs are newline-delimited manifest files, with one URI per line. Wildcard URIs are not supported in the manifest files, and all referenced data files must be in the same bucket as the manifest.

For example, if you have a source URI of `"gs://bucket/path/file"`
and the `file_set_spec_type` is `FILE_SYSTEM_MATCH`, then the
file is used directly as a data file. If the `file_set_spec_type`
is `NEW_LINE_DELIMITED_MANIFEST`, then each line in the file is interpreted
as a URI that points to a data file.

**`--reference_file_schema_uri=URI`**

:   Specifies the path to a reference file with the expected table schema for
creating external tables. Equivalent to
[`ExternalDataConfiguration.referenceFileSchemaUri`](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/tables#ExternalDataConfiguration.FIELDS.reference_file_schema_uri).
This flag is enabled for Avro, ORC, and PARQUET formats.

**`--label=KEY:VALUE`**

:   Specifies a label for the table. Repeat this flag to specify multiple
labels.

**`--max_staleness=INTERVAL`**

:   Specifies whether cached metadata is used by operations against the
table, and how fresh the cached metadata must be in order for the operation to
use it.

Applicable for [BigLake tables](https://docs.cloud.google.com/bigquery/docs/biglake-intro#metadata_caching_for_performance)
and [object tables](https://docs.cloud.google.com/bigquery/docs/object-table-introduction).

To disable metadata caching, specify 0. This is the default.

To enable metadata caching, specify an interval value between 30
minutes and 7 days, using the `Y-M D H:M:S` format described in the
[`INTERVAL` data type](../googlesql-syntax/data-types.md#interval-type)
documentation. For example, specify `0-0 0 4:0:0` for a 4 hour staleness
interval. With this value, operations against the table use cached metadata if
it has been refreshed within the past 4 hours. If the cached metadata
is older than that, the operation falls back to retrieving metadata from
Cloud Storage instead.

**`--object_metadata=STRING`**

:   Set the value of this flag to `SIMPLE` when creating an
[object table](https://docs.cloud.google.com/bigquery/docs/object-table-introduction).

Only required when creating an
[object table](https://docs.cloud.google.com/bigquery/docs/object-table-introduction).

**`--range_partitioning=COLUMN_NAME,START,END,INTERVAL`**

:   Specifies options for an integer-range partition, as follows:

- `column_name` is the column used to create the integer range partitions.
- `start` is the start of range partitioning, inclusive.
- `end` is the end of range partitioning, exclusive.
- `interval` is the width of each range within the partition.

For example:

```text
--range_partitioning=customer_id,0,10000,100
```

<br />

**`--require_partition_filter={true|false}`**

:   To require a partition filter for queries over the supplied table, set to
`true`. This flag only applies to partitioned tables.
The default value is `false`.

**`--schema={SCHEMA_FILE|SCHEMA`}**

:   Specifies either the path to a local JSON schema file or a comma-separated
list of column definitions in the form
`FIELD:DATA_TYPE,
FIELD:DATA_TYPE`.
If you use a schema file, don't add an extension to the filename.

Examples:

```text
--schema=/tmp/tabledef
```

```text
--schema=Region:STRING,Quarter:STRING,Total_sales:INTEGER
```

<br />

**`--time_partitioning_expiration=SECONDS`**

:   An integer that specifies (in seconds) when
a time-based partition should be deleted. The expiration time evaluates to the
partition's UTC date plus the integer value. A negative number indicates no
expiration.

**`--time_partitioning_field=COLUMN_NAME`**

:   Specifies the field used to determine how to create a
time-based partition. If time-based partitioning is enabled without this
value, then
the table is partitioned based on the load time.

**`--time_partitioning_type=INTERVAL`**

:   Enables time-based partitioning on a table and sets the partition type.
Use one of the following values:

- `DAY`
- `HOUR`
- `MONTH`
- `YEAR`

**`--use_avro_logical_types={true|false}`**

:   If the `FORMAT` part of the
[`--external_table_definition` flag](https://docs.cloud.google.com/bigquery/docs/reference/bq-cli-reference#external_table_definition_flag)
is set to `AVRO`, then this flag specifies
whether to convert
logical types into their corresponding types (such as `TIMESTAMP`) instead of
only using their raw types (such as `INTEGER`).

**`--parquet_enable_list_inference={true|false}`**

:   If the `FORMAT` part of the
[`--external_table_definition` flag](https://docs.cloud.google.com/bigquery/docs/reference/bq-cli-reference#external_table_definition_flag)
is set to `PARQUET`, then this flag
specifies whether to use
[schema inference](https://docs.cloud.google.com/bigquery/docs/loading-data-cloud-storage-parquet#list_logical_type)
for Parquet `LIST` logical types.

**`--parquet_enum_as_string={true|false}`**

:   If the `FORMAT` part of the
[`--external_table_definition` flag](https://docs.cloud.google.com/bigquery/docs/reference/bq-cli-reference#external_table_definition_flag)
is set to `PARQUET`, then this flag
specifies whether to infer Parquet `ENUM` logical types as `STRING` values.

For more information, see
[Creating and using tables](https://docs.cloud.google.com/bigquery/docs/tables).

##### `bq mk --transfer_config`

Creates a transfer configuration. The following flags are supported:

**`--data_source=DATA_SOURCE`**
:   Specifies the data source. Required when creating a transfer configuration.
Use one of the following values:

- `amazon_s3` - [Amazon S3 data transfer](https://docs.cloud.google.com/bigquery/docs/s3-transfer#bq)
- `azure_blob_storage` - [Azure Blob Storage data transfer](https://docs.cloud.google.com/bigquery/docs/blob-storage-transfer#bq)
- `dcm_dt` - [Campaign Manager data transfer](https://docs.cloud.google.com/bigquery/docs/doubleclick-campaign-transfer#set_up_a_campaign_manager_transfer)
- `google_cloud_storage` - [Cloud Storage data transfer](https://docs.cloud.google.com/bigquery/docs/cloud-storage-transfer#set_up_a_cloud_storage_transfer)
- `cross_region_copy` - [Dataset Copy](https://docs.cloud.google.com/bigquery/docs/copying-datasets)
- `dfp_dt`- [Google Ad Manager data transfer](https://docs.cloud.google.com/bigquery/docs/doubleclick-publisher-transfer#set_up_a_google_ad_manager_transfer)
- `displayvideo`- [Display \& Video 360 data transfer](https://docs.cloud.google.com/bigquery/docs/display-video-transfer)
- `google_ads` - [Google Ads data transfer](https://docs.cloud.google.com/bigquery/docs/google-ads-transfer)
- `merchant_center` - [Google Merchant Center data transfer](https://docs.cloud.google.com/bigquery/docs/merchant-center-transfer-schedule-transfers)
- `mysql` - [MySQL data transfer](https://docs.cloud.google.com/bigquery/docs/mysql-transfer#set-up-a-mysql-data-transfer)
- `play` - [Google Play data transfer](https://docs.cloud.google.com/bigquery/docs/play-transfer#setup-transfer)
- `scheduled_query` - [Scheduled queries data transfer](https://docs.cloud.google.com/bigquery/docs/scheduling-queries)
- `search_ads`- [Search Ads 360 data transfer](https://docs.cloud.google.com/bigquery/docs/search-ads-transfer)
- `youtube_channel` - [YouTube Channel data transfer](https://docs.cloud.google.com/bigquery/docs/youtube-channel-transfer#set_up_a_youtube_channel_transfer)
- `youtube_content_owner` - [YouTube Content Owner data transfer](https://docs.cloud.google.com/bigquery/docs/youtube-content-owner-transfer#set_up_a_youtube_content_owner_transfer)
- `redshift` - [Amazon Redshift migration](https://docs.cloud.google.com/bigquery/docs/migration/redshift#set-up-transfer)
- `on_premises` - [Teradata migration](https://docs.cloud.google.com/bigquery/docs/migration/teradata)
- `snowflake_migration` - [Snowflake migration](https://docs.cloud.google.com/bigquery/docs/migration/snowflake-transfer#bq)

> [!NOTE]
> **Note:** The `redshift` and `on_premises` values are for data migrations; before you use the `bq mk --transfer_config` command with these values, consult the linked documentation from the preceding list.

**`--display_name=DISPLAY_NAME`**
:   Specifies the display name for the transfer configuration.

**`--no_auto_scheduling={true|false}`**
:   Disables automatic scheduling of data transfer runs for this configuration.
The default value is `false`.

**`--params={"PARAMETER":"VALUE"}` or `-p={"PARAMETER":"VALUE"}`**
:   Specifies the parameters for the transfer configuration in
JSON format. The parameters vary depending on the data source.

**`--refresh_window_days=DAYS`**
:   An integer that specifies the refresh window for the transfer configuration in
days. The default value is `0`.

**`--service_account_name=SERVICE_ACCOUNT`**
:   Specifies a service account to be used as the credential for the transfer
configuration.

**`--target_dataset=DATASET`**
:   Specifies the target dataset for the transfer configuration.

**`--table_filter=TABLES`**
:   Only used with the `google_ads` data source. The `TABLES` parameter is a
comma-separated list of tables to include in the transfer. To exclude a table,
prefix it with a hyphen (`-`). The default value includes all tables in the
transfer.

**`--destination_kms_key=KEY`**
:   Specifies a Cloud KMS
[key resource ID](https://docs.cloud.google.com/bigquery/docs/customer-managed-encryption#key_resource_id)
for encrypting the destination table data.

For information about using the `bq mk` command with the BigQuery
Data Transfer Service, see the following:

- [Set up an Amazon S3 transfer](https://docs.cloud.google.com/bigquery/docs/s3-transfer-intro)
- [Set up a Campaign Manager transfer](https://docs.cloud.google.com/bigquery/docs/doubleclick-campaign-transfer#set_up_a_campaign_manager_transfer)
- [Set up a Cloud Storage transfer](https://docs.cloud.google.com/bigquery/docs/cloud-storage-transfer#set_up_a_cloud_storage_transfer)
- [Set up a Google Ad Manager transfer](https://docs.cloud.google.com/bigquery/docs/doubleclick-publisher-transfer#set_up_a_google_ad_manager_transfer)
- [Set up a Google Ads transfer](https://docs.cloud.google.com/bigquery/docs/google-ads-transfer#setup-data-transfer)
- [Set up a Google Merchant Center transfer](https://docs.cloud.google.com/bigquery/docs/merchant-center-transfer-schedule-transfers#bq) (beta)
- [Set up a Google Play transfer](https://docs.cloud.google.com/bigquery/docs/play-transfer#setup-transfer)
- [Set up a Search Ads 360 transfer](https://docs.cloud.google.com/bigquery/docs/sa360-transfer#set_up_a_search_ads_360_data_transfer) (beta)
- [Set up a YouTube Channel transfer](https://docs.cloud.google.com/bigquery/docs/youtube-channel-transfer#set_up_a_youtube_channel_transfer)
- [Set up a YouTube Content Owner transfer](https://docs.cloud.google.com/bigquery/docs/youtube-content-owner-transfer#set_up_a_youtube_content_owner_transfer)
- [Migrate data from Amazon Redshift](https://docs.cloud.google.com/bigquery/docs/migration/redshift)
- [Migrate data from Teradata](https://docs.cloud.google.com/bigquery/docs/migration/teradata)
- [Migrate data from Snowflake](https://docs.cloud.google.com/bigquery/docs/migration/snowflake-transfer)

##### `bq mk --transfer_run`

Creates a data transfer run at the specified time or time range using the
specified data transfer configuration.

###### Synopsis

```text
bq mk --transfer_run [--run_time=RUN_TIME | --start_time=START_TIME --end_time=END_TIME] CONFIG
```

The following flags are supported:

**`--run_time=RUN_TIME`**
:   A [timestamp](https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#timestamp)
that specifies the time to schedule the data transfer run.

**`--start_time=START_TIME`**
:   A [timestamp](https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#timestamp)
that specifies the start time for a range of data transfer runs.

**`--end_time=END_TIME`**
:   A [timestamp](https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#timestamp)
that specifies the end time for a range of data transfer runs.

The format for the timestamps is
[RFC3339](https://datatracker.ietf.org/doc/html/rfc3339) UTC "Zulu".

The `CONFIG` argument specifies a pre-existing data
transfer configuration.

###### Examples

```bash
bq mk --transfer_run \
      --run_time=2021-01-20T17:00:00.00Z \
      projects/p/locations/l/transferConfigs/c
```

```bash
bq mk --transfer_run \
      --start_time=2020-12-19T16:39:57-08:00 \
      --end_time=2020-12-19T20:39:57-08:00 \
      projects/p/locations/l/transferConfigs/c
```

##### `bq mk --view`

Creates a view. The following flags are supported:

**`--add_tags=TAGS`**
:   Specifies the [tags](https://docs.cloud.google.com/bigquery/docs/tags) that you are attaching to the new
view, separated by commas. For example,
`556741164180/env:prod,myProject/department:sales`. Each tag must have the
[namespaced key name and value short name](https://docs.cloud.google.com/iam/docs/tags-access-control#definitions).

**`--description=DESCRIPTION`**
:   Specifies the description of the view.

**`--expiration=SECONDS`**
:   Specifies the lifetime for the view. If `SECONDS` is
`0`, then the view doesn't expire. If you don't specify the `--expiration`
flag, then
BigQuery creates the view with the dataset's default table
lifetime.

**`--label=KEY:VALUE`**
:   Specifies a label for the view. Repeat this flag to specify multiple
labels.

**`--use_legacy_sql={true|false}`**
:   Set to `false` to use a GoogleSQL query to
create a view. The default value is determined by your [configuration settings](https://docs.cloud.google.com/bigquery/docs/default-configuration). If the configuration setting is not specified, the default value is `true`; uses legacy SQL.

**`--view_udf_resource=FILE`**
:   Specifies the Cloud Storage URI or the path to a local code file
that is loaded and evaluated immediately as a user-defined function resource
used by a view's SQL query. Repeat this flag to specify multiple files.

For more information, see
[Creating views](https://docs.cloud.google.com/bigquery/docs/views).

#### `bq mkdef`

Use the `bq mkdef` command to create a table definition in JSON format for data
stored in Cloud Storage or Google Drive.

##### Synopsis

```text
bq mkdef [FLAGS] URI [ > FILE ]
```

##### Flags and arguments

The `bq mkdef` command uses the following flags and arguments:

**`--autodetect={true|false}`**
:   Specifies whether to use schema auto-detection for CSV and JSON
data. The default is `false`.

**`--connection_id=CONNECTION_ID`**
:   The ID of a connection resource to use for authentication.

**`--hive_partitioning_mode`**

:   Specifies how to determine the partitioning
schema when BigQuery reads data. The following modes are
supported:

- `AUTO`: Automatically infer partition key names and types.
- `STRINGS`: Automatically infer partition key names. All types are treated as strings.
- `CUSTOM`: Specify the partitioning schema in the source URI prefix.

The default value is `AUTO`.

**`--hive_partitioning_source_uri_prefix`**

:   Specifies the common prefix for the
source URIs. The common prefix value is the portion of the URI that
immediately precedes the partition key encoding. If you specified `CUSTOM` for
the mode, then you must also identify the partitioning schema.

For example, consider files with the following structure:

- `gs://bucket/path_to_table/dt=2019-06-01/country=USA/id=7/file.avro`
- `gs://bucket/path_to_table/dt=2019-05-31/country=CA/id=3/file.avro`

If you use `AUTO` or `STRINGS` modes, then the following values are
acceptable:

- `gs://bucket/path_to_table`
- `gs://bucket/path_to_table/`

If you use `CUSTOM` mode, then the following values are acceptable:

- `gs://bucket/path_to_table/{dt:DATE}/{country:STRING}/{id:INTEGER}`
- `gs://bucket/path_to_table/{dt:STRING}/{country:STRING}/{id:INTEGER}`
- `gs://bucket/path_to_table/{dt:DATE}/{country:STRING}/{id:STRING}`

For more information about using the `bq mkdef` command, see
[Creating a table definition file for an external data source](https://docs.cloud.google.com/bigquery/external-table-definition).

**`--ignore_unknown_values={true|false}` or `-i={true|false}`**
:   Specifies whether to ignore any values in a row that are not present in the
schema. The default is `false`.

**`--metadata_cache_mode=STRING`**

:   Specifies whether the metadata cache for the table is refreshed
automatically or manually.

Set to `AUTOMATIC` for the metadata cache to be
refreshed at a system-defined interval, usually somewhere between 30 and
60 minutes.

Set to `MANUAL` if you want to refresh
the metadata cache on a schedule you determine. In this case, you can call
the [`BQ.REFRESH_EXTERNAL_METADATA_CACHE` system procedure](../googlesql-syntax/system-procedures.md#bqrefresh_external_metadata_cache) to refresh the cache.

You must set the `--metadata_cache_mode` flag if you set the `--max_staleness`
flag with the
[`bq mk` command](#bq-mk---table).

**`--parquet_enable_list_inference={true|false}`**

:   If `source_format` is set to `PARQUET`, then this flag specifies whether to use
[schema inference](https://docs.cloud.google.com/bigquery/docs/loading-data-cloud-storage-parquet#list_logical_type)
for Parquet `LIST` logical types. The default is `false`.

**`--parquet_enum_as_string={true|false}`**

:   If `source_format` is set to `PARQUET`, then this flag specifies whether to
infer Parquet
`ENUM` logical types as `STRING` values. The default is `false`.

**`--file_set_spec_type=FILE_SET_SPEC_TYPE`**

:   Specifies how to interpret source URIs.

- `FILE_SYSTEM_MATCH`: Expands source URIs by listing files from the object store. This is the default behavior if FileSetSpecType is not set.
- `NEW_LINE_DELIMITED_MANIFEST`: Indicates that the provided URIs are newline-delimited manifest files, with one URI per line. Wildcard URIs are not supported in the manifest files, and all referenced data files must be in the same bucket as the manifest.

For example, if you have a source URI of `"gs://bucket/path/file"`
and the `file_set_spec_type` is `FILE_SYSTEM_MATCH`, then the
file is used directly as a data file. If the `file_set_spec_type`
is `NEW_LINE_DELIMITED_MANIFEST`, then each line in the file is interpreted
as a URI that points to a data file.

**`--source_format=FORMAT`**

:   Specifies the format of the source data. Use one of the following values:

- `AVRO`
- `CSV`
- `DATASTORE_BACKUP` (use this value for Firestore)
- `GOOGLE_SHEETS`
- `NEWLINE_DELIMITED_JSON`
- `ORC`
- `PARQUET`

The default value is `CSV`.

**`--use_avro_logical_types={true|false}`**

:   If the `--source_format` flag is set to `AVRO`, then this flag specifies
whether to convert logical
types into their corresponding types (such as `TIMESTAMP`) instead of
only using their raw types (such as `INTEGER`). The default is `false`.

#### `bq partition`

Use the `bq partition` command to convert a group of tables with time-unit
suffixes, such as tables ending in `YYYYMMDD` for date
partitioning, into partitioned tables.

##### Synopsis

```text
bq partition [FLAGS] SOURCE_TABLE_BASE_NAME PARTITION_TABLE
```

##### Flags and arguments

The `bq partition` command uses the following flags and arguments:

**`--no_clobber={true|false}` or `-n={true|false}`**
:   To disallow overwriting an existing partition,
set to `true`. The default value is `false`; if the partition exists,
then it is overwritten.

**`--time_partitioning_expiration=SECONDS`**
:   An integer that specifies (in seconds) when
a time-based partition should be deleted. The expiration time evaluates to the
partition's UTC date plus the integer value. A negative number indicates no
expiration.

**`--time_partitioning_type=INTERVAL`**

:   Specifies the partition type. The following table provides the possible values
for the `INTERVAL` flag and the expected
time-unit-suffix format for each:

| `INTERVAL` | Suffix |
|---|---|
| `HOUR` | `YYYYMMDDHH` |
| `DAY` | `YYYYMMDD` |
| `MONTH` | `YYYYMM` |
| `YEAR` | `YYYY` |

**`SOURCE_TABLE_BASE_NAME`**

:   The base name of the group of tables with time-unit suffixes.

**`PARTITION_TABLE`**

:   The name of the destination partitioned table.

For more information about using the `bq partition` command, see
[Converting date-sharded tables into ingestion-time partitioned tables](https://docs.cloud.google.com/bigquery/docs/creating-partitioned-tables#convert-date-sharded-tables).

#### `bq query`

Use the `bq query` command to create a query job that runs the specified SQL
query.

##### Synopsis

```text
bq query [FLAGS] 'QUERY'
```

##### Flags and arguments

The `bq query` command uses the following flags and arguments:

**`--allow_large_results={true|false}`**
:   To enable large destination table
sizes for legacy SQL queries, set to `true`. The default value is `false`.

**`--append_table={true|false}`**
:   To append data to a destination table, set to `true`. The
default value is `false`.

**`--batch={true|false}`**
:   To run the query in batch mode, set to `true`. The default value
is `false`.

**`--clustering_fields=COLUMNS`**
:   A comma-separated list of up to four column names that specifies fields to
use to [cluster](https://docs.cloud.google.com/bigquery/docs/clustered-tables) the destination table in a query.
If specified with
partitioning, then the table is first partitioned, and then each partition is
clustered using the supplied columns.

**`--connection_property=KEY=VALUE`**

:   A key-value pair that lets you specify connection-level properties to
customize query behavior. Repeat this flag to specify additional properties.

Supported connection properties are as follows:

- **`dataset_project_id`** : represents the default project for datasets that are used in the query, similar to the `@@dataset_project_id` [system variable](../googlesql-syntax/system-variables.md).
- **`query_label`** : associates the query with a given job label. If set, all subsequent queries in a script or session have this label. For details on query label formatting requirements, see the `labels` field in the [`JobConfiguration` resource](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/Job#jobconfiguration).
- **`service_account`** : specifies a service account to use to run the query. For example, `--connection_property=service_account=myserviceaccount@project.iam.gserviceaccount.com`.
- **`session_id`**: associates the query with a given session.
- **`time_zone`**: represents the default timezone to use to run the query.

**`--continuous={true|false}`**

:   To run a [continuous query](https://docs.cloud.google.com/bigquery/docs/continuous-queries-introduction),
set to `true`. The default value is `false`.

**`--destination_kms_key=KEY`**

:   Specifies a Cloud KMS
[key resource ID](https://docs.cloud.google.com/bigquery/docs/customer-managed-encryption#key_resource_id)
for encrypting the destination table data.

**`--destination_schema={PATH_TO_FILE|SCHEMA}`**

:   The path to a local JSON schema file or a
comma-separated list of column definitions in the form
`FIELD:DATA_TYPE,
FIELD:DATA_TYPE`.

Schema changes happen in a separate operation from query execution.
If you write query results to a table by specifying the
`--destination_table` flag, and the query subsequently raises an exception,
it is possible that any schema changes will be skipped. If this occurs,
check the destination table schema and
[manually update it](https://docs.cloud.google.com/bigquery/docs/managing-table-schemas) if necessary.

**`--destination_table=TABLE`**

:   When specified, the query results are saved to `TABLE`.
Specify `TABLE` in the following
format: `PROJECT`:`DATASET`.`TABLE`.
If `PROJECT` is not specified, then the current project
is assumed. If the `--destination_table` flag is not specified, then the
query results are saved to a temporary table.

Examples:

```text
--destination_table myProject:myDataset.myTable
```

```text
--destination_table myDataset.myTable
```

<br />

**`--dry_run={true|false}`**

:   When specified, the query is validated but not run.

**`--external_table_definition={TABLE::PATH_TO_FILE|TABLE::DEFINITION}`**

:   Specifies the table name and
[table definition](https://docs.cloud.google.com/bigquery/external-table-definition)
for an external table query.
The table definition can be a path to a local JSON schema
file or an inline table definition.
The format for supplying the inline table definition is
`SCHEMA@SOURCE_FORMAT=CLOUD_STORAGE_URI`.
The format for the `SCHEMA` value is
a comma-separated list of column definitions in the form
`FIELD:DATA_TYPE,
FIELD:DATA_TYPE`.
If you use a table definition file, don't add an extension to the filename.

For example:

```text
--external_table_definition=myTable::/tmp/tabledef
```

```text
--external_table_definition=myTable::Region:STRING,Quarter:STRING,Total_sales:INTEGER@CSV=gs://mybucket/sales.csv
```

<br />

Repeat this flag to query multiple tables.

**`--flatten_results={true|false}`**

:   To disallow flattening nested and repeated fields in
the results for legacy SQL queries, set to `false`. The default value is
`true`.

**`--label=KEY:VALUE`**

:   Specifies a label for the query job. Repeat this flag to specify multiple
labels.

**`--max_rows=MAX_ROWS` or `-n=MAX_ROWS`**

:   An integer specifying the number of rows to return in
the query results. The default value is `100`.

**`--maximum_bytes_billed=MAX_BYTES`**

:   An integer that limits the bytes billed for the
query. If the query goes beyond the limit, then the query fails (without
incurring a
charge). If this flag is not specified, then the bytes billed is set to the
project default.

**`--max_statement_results=VALUE`**

:   An integer specifying the maximum number of script statements displayed for the query results.
The default value is `100`.

**`--min_completion_ratio=RATIO`**

:   (Experimental) A number from 0 through 1.0 that
specifies the minimum fraction of data that must be scanned before a query
returns. If the flag is not specified, then the default server value `1.0` is
used.

**`--parameter={PATH_TO_FILE|PARAMETER}`**

:   Either a JSON file containing a list of query parameters, or a
query parameter in the form
`NAME:TYPE:VALUE`.
An empty name creates a positional parameter. If `TYPE`
is omitted, then the `STRING` type is assumed.
`NULL` specifies a null value.
Repeat this flag to specify multiple parameters.

For example:

```text
--parameter=/tmp/queryParams
```

```text
--parameter=Name::Oscar
```

```text
--parameter=Count:INTEGER:42
```

<br />

**`--range_partitioning=COLUMN_NAME,START,END,INTERVAL`**

:   Use with the `--destination_table` flag. Specifies options for integer-range
partitioning in the destination table. The value is a comma-separated list of
the form `column_name,start,end,interval`, where

- `column_name` is the column used to create the integer range partitions.
- `start` is the start of range partitioning, inclusive.
- `end` is the end of range partitioning, exclusive.
- `interval` is the width of each range within the partition.

For example:

```text
--range_partitioning=customer_id,0,10000,100
```

<br />

**`--replace={true|false}`**

:   To overwrite the destination table with the query results, set to `true`. Any
existing data and schema are erased. Any Cloud KMS key is also
removed, unless you specify the `--destination_kms_key` flag. The default
value is `false`.

> [!NOTE]
> **Note:** To remove all rows from a table without deleting the schema, use the [`TRUNCATE TABLE`](../googlesql-syntax/dml-syntax.md#truncate-table-statement) statement.

**`--require_cache={true|false}`**

:   If specified, then run the query only if results can be
retrieved from the cache.

**`--require_partition_filter={true|false}`**

:   If specified, then a partition filter is required for queries over the supplied
table. This flag can only be used with a partitioned table.

**`--reservation_id=RESERVATION`**

:   If specified, the reservation the query runs in. To force the query to use
on-demand billing, set this value to `none`. This requires the project or
organization to have the
[`reservation_override_mode` configuration setting](https://docs.cloud.google.com/bigquery/docs/default-configuration#cost_and_resource_settings)
set to `ALLOW_ANY_OVERRIDE`.

**`--rpc={true|false}`**

:   To use the RPC-style query API instead of the REST API `jobs.insert` method,
set to `true`. The default value is `false`.

**`--schedule="SCHEDULE"`**

:   Makes a query a recurring scheduled query. A schedule for how often the
query should run is required.

Examples:

```text
--schedule="every 24 hours"
```

```text
--schedule="every 3 hours"
```

<br />

For a description of the schedule syntax, see
[Formatting the schedule](https://docs.cloud.google.com/appengine/docs/flexible/python/scheduling-jobs-with-cron-yaml#formatting_the_schedule).

**`--schema_update_option=OPTION`**

:   When appending data to a table in a load job or a
query job, or when overwriting a table partition, specifies how to update the
schema of the destination table. Use one of the following values:

- `ALLOW_FIELD_ADDITION`: Allow new fields to be added.
- `ALLOW_FIELD_RELAXATION`: Allow relaxing `REQUIRED` fields to `NULLABLE`.

Repeat this flag to specify multiple schema update options.

**`--start_row=ROW_NUMBER` or `-s=ROW_NUMBER`**

:   An integer that specifies the first row to return in
the query result. The default value is `0`.

**`--target_dataset=DATASET`**

:   When specified with `--schedule`, updates the target dataset for a scheduled
query. The query must be DDL or DML.

**`--time_partitioning_expiration=SECONDS`**

:   Use with the `--destination_table` flag. An integer that specifies (in
seconds) when a time-based partition should be deleted. The expiration time
evaluates to the partition's UTC date plus the integer value. A negative
number indicates no expiration.

**`--time_partitioning_field=COLUMN_NAME`**

:   Use with the `--destination_table` flag. Specifies the partitioning column for
time-based partitioning. If time-based partitioning is enabled without this
value, then the table is partitioned based on the ingestion time.

**`--time_partitioning_type=INTERVAL`**

:   Use with the `--destination_table` flag. Specifies the partition type for
the destination table. Use one of the following values:

- `DAY`
- `HOUR`
- `MONTH`
- `YEAR`

**`--udf_resource=FILE`**

:   This flag applies only to legacy SQL queries. Specifies the
Cloud Storage URI or the path to a local file
containing a user-defined function resource to be
used by a legacy SQL query. Repeat this flag to specify multiple files.

**`--use_cache={true|false}`**

:   To disallow caching query results, set to `false`. The default value
is `true`.

**`--use_legacy_sql={true|false}`**

:   To run a GoogleSQL query, set to `false`.
The default value is determined by your [configuration settings](https://docs.cloud.google.com/bigquery/docs/default-configuration). If the configuration setting is not specified, the default value is `true`; the command uses legacy SQL.

**`--job_timeout_ms={string (Int64Value)}`**

:   Specifies the maximum time to run a query in milliseconds. If this time
limit is exceeded, BigQuery attempts to stop the job.

**`QUERY`**

:   The query that you want to run. You can specify the query by using one of the
following methods:

- Specify a string that contains the query.

  If you need to use additional string literals within the query, you
  must follow the quoting rules for the shell that you are using, such as
  [Bash](https://www.gnu.org/software/bash/manual/bash.html#Quoting) or
  [PowerShell](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_quoting_rules?view=current).

  The following example shows a typical approach in Bash, which is to use
  double quotes to denote the string literals in the query, and then
  enclose the query itself in single quotes:

  ```text
  'SELECT * FROM mydataset.mytable WHERE column1 = "value";'
  ```

  If you are copying the query from another location, you must also remove
  any comments in the query.
- Pass in a SQL script that contains the query. The following example
  shows how to pass in a SQL script in the Bash shell:

  ```text
  bq query --use_legacy_sql=false < query.sql
  ```

For more information about using the `bq query` command, see
[Run a query](https://docs.cloud.google.com/bigquery/docs/running-queries).

#### `bq remove-iam-policy-binding`

Use the `bq remove-iam-policy-binding` command to retrieve the
[IAM policy](https://docs.cloud.google.com/iam/docs/reference/rest/v1/Policy#binding)
for a resource and remove a binding from the policy, in one step.
The resource can be a table or a view.

This command is an alternative to the following three-step process:

1. Using the [`bq get-iam-policy`](#bq-get-iam-policy) command to retrieve the policy file (in JSON format).
2. Editing the policy file.
3. Using the [`bq set-iam-policy`](bq-cli-reference-3.md#bq-set-iam-policy) command to update the policy without the binding.

> [!NOTE]
> **Note:** `bq remove-iam-policy-binding` does not support datasets. To remove access to a dataset, see [Revoke access to a dataset](https://docs.cloud.google.com/bigquery/docs/control-access-to-resources-iam#revoke_access_to_a_dataset).

##### Synopsis

```text
bq remove-iam-policy-binding FLAGS --member=MEMBER_TYPE:MEMBER --role=ROLE RESOURCE
```

##### Flags and arguments

The `bq remove-iam-policy-binding` command uses the following
flags and arguments:

**`--member=MEMBER_TYPE:MEMBER`**

:   Required. Use the `--member` flag to specify the member part of the
IAM policy binding.
The `--member` flag is required
along with the `--role` flag. One combination of `--member` and `--role`
flags equals one binding.

The `MEMBER_TYPE` value
specifies the type of member in the
IAM policy binding. Use one of the following values:

- `user`
- `serviceAccount`
- `group`
- `domain`

The `MEMBER` value specifies
the email address or domain of the member in the
IAM policy binding.

**`--role=ROLE`**

:   Required. Specifies the role part of the IAM policy
binding. The `--role` flag is required along with
the `--member` flag. One combination of `--member` and `--role` flags equals
one binding.

**`--table={true|false}` or `-t={true|false}`**

:   Optional. To remove a binding from the IAM policy
of a table or view, set to `true`.
The default value is `false`.

**`RESOURCE`** is the table or view whose policy binding
you want to remove.

For more information, see the
[IAM policy reference](https://docs.cloud.google.com/iam/docs/reference/rest/v1/Policy#binding).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/bq-cli-reference (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; definition-list bodies are un-indented by four spaces so that they are not read as code; the `:` markers of the twin are kept (GitHub Markdown has no definition lists); indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- The official page is split into 3 files at section boundaries; this is part 2.
- Source inconsistency (the text above is verbatim): this page says "don't add an extension to the filename" for schema and table definition files, but the `bq load` example on this page uses `./info_schema.json`, and the Specifying a schema page (https://docs.cloud.google.com/bigquery/docs/schemas) uses `./myschema.json`.
- Corrected from the official docs: three `DATASTORE_BACKUP` bullets say `(use this value for Filestore)`. Firestore is the product whose exports use this value, as the same page says for the `--source_format` flag ("Load data from Firestore exports"), so `Filestore` is changed to `Firestore`.
- Corrected from the official docs: the transfer configuration example uses `--filter labels.dataSourceIds:dcm_dt`, but the text just above says to use `dataSourceIds` as the key for transfer configurations (the `labels.` prefix is for datasets). The example is changed to `--filter dataSourceIds:dcm_dt`.
- Corrected from the official docs: the AWS role ARN format on this page is `arn:aws:iam::AWS_ACCOUNT_ID:role/POLICY_NAME`, but its example uses `policy/`. The example is changed to `role/s3-read-role` to match the format.
- Corrected from the official docs: the short form of `--table` is written `--t`. The same flag is `-t` in the `bq head`, `bq set-iam-policy` and `bq rm` sections of this reference, so it is changed to `-t`.
- Caution: the `--start_time` and `--end_time` text says timestamps use RFC3339 UTC "Zulu", but the example passes `2020-12-19T16:39:57-08:00`, which has a UTC offset rather than `Z`. The official text is kept as published.
- Caution: the `CUSTOM` hive partitioning prefixes are shown as `gs://bucket/path_to_table/{dt:DATE}/{country:STRING}/{id:INTEGER}`, while the sample path above them is `gs://bucket/path_to_table/dt=2019-06-01/country=USA/id=7/file.avro` (with the `dt=`, `country=` and `id=` keys). The official text is kept as published.

## Related

- [Index of this directory](./README.md)
- [bq command-line tool reference (part 1 of 3)](./bq-cli-reference-1.md)
- [bq command-line tool reference (part 3 of 3)](./bq-cli-reference-3.md)
