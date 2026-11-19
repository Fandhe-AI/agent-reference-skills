---
source: https://docs.cloud.google.com/bigquery/docs/loading-data-cloud-storage-parquet
---

# Load Parquet data from Cloud Storage

BigQuery loads Parquet data from Cloud Storage into a new table or partition, or appends to or overwrites an existing table or partition. Parquet is converted into the Capacitor columnar storage format during loading. The schema is self-described by the Parquet files; when BigQuery retrieves it from the source data, the alphabetically last file is used.

## Signature / Usage

### Load into a new table

```sql
LOAD DATA OVERWRITE mydataset.mytable
FROM FILES (
  format = 'PARQUET',
  uris = ['gs://bucket/path/file.parquet']);
```

```bash
bq --location=LOCATION load \
--source_format=FORMAT \
DATASET.TABLE \
PATH_TO_SOURCE
```

`FORMAT` is `PARQUET`. `PATH_TO_SOURCE` is a fully qualified Cloud Storage URI or comma-separated list of URIs; wildcards are supported.

```bash
bq load \
--source_format=PARQUET \
mydataset.mytable \
gs://mybucket/mydata.parquet
```

```bash
bq load \
--source_format=PARQUET \
--time_partitioning_type=DAY \
mydataset.mytable \
gs://mybucket/mydata.parquet
```

```bash
bq load \
--source_format=PARQUET \
--time_partitioning_field mytimestamp \
mydataset.mytable \
gs://mybucket/mydata.parquet
```

```bash
bq load \
--source_format=PARQUET \
mydataset.mytable \
"gs://mybucket/00/*.parquet","gs://mybucket/01/*.parquet"
```

### Append to or overwrite a table

```sql
LOAD DATA INTO mydataset.mytable
FROM FILES (
  format = 'PARQUET',
  uris = ['gs://bucket/path/file.parquet']);
```

```bash
bq --location=LOCATION load \
--[no]replace \
--source_format=FORMAT \
DATASET.TABLE \
PATH_TO_SOURCE
```

```bash
bq load \
--replace \
--source_format=PARQUET \
mydataset.mytable \
gs://mybucket/mydata.parquet
```

```bash
bq load \
--noreplace \
--source_format=PARQUET \
mydataset.mytable \
gs://mybucket/mydata.parquet
```

### Python

Set `LoadJobConfig.write_disposition` to `WRITE_APPEND` or `WRITE_TRUNCATE` for existing tables.

```python
from google.cloud import bigquery

# Construct a BigQuery client object.
client = bigquery.Client()

# TODO(developer): Set table_id to the ID of the table to create.
# table_id = "your-project.your_dataset.your_table_name"

job_config = bigquery.LoadJobConfig(
    source_format=bigquery.SourceFormat.PARQUET,
)
uri = "gs://cloud-samples-data/bigquery/us-states/us-states.parquet"

load_job = client.load_table_from_uri(
    uri, table_id, job_config=job_config
)  # Make an API request.

load_job.result()  # Waits for the job to complete.

destination_table = client.get_table(table_id)
print("Loaded {} rows.".format(destination_table.num_rows))
```

### Node.js (overwrite)

```javascript
// Import the Google Cloud client libraries
const {BigQuery} = require('@google-cloud/bigquery');
const {Storage} = require('@google-cloud/storage');

// Instantiate clients
const bigquery = new BigQuery();
const storage = new Storage();

/**
 * This sample loads the CSV file at
 * https://storage.googleapis.com/cloud-samples-data/bigquery/us-states/us-states.csv
 *
 * TODO(developer): Replace the following lines with the path to your file.
 */
const bucketName = 'cloud-samples-data';
const filename = 'bigquery/us-states/us-states.parquet';

async function loadParquetFromGCSTruncate() {
  /**
   * Imports a GCS file into a table and overwrites
   * table data if table already exists.
   */

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const datasetId = "my_dataset";
  // const tableId = "my_table";

  // Configure the load job. For full list of options, see:
  // https://cloud.google.com/bigquery/docs/reference/rest/v2/Job#JobConfigurationLoad
  const metadata = {
    sourceFormat: 'PARQUET',
    // Set the write disposition to overwrite existing table data.
    writeDisposition: 'WRITE_TRUNCATE',
    location: 'US',
  };

  // Load data from a Google Cloud Storage file into the table
  const [job] = await bigquery
    .dataset(datasetId)
    .table(tableId)
    .load(storage.bucket(bucketName).file(filename), metadata);
  // load() waits for the job to finish
  console.log(`Job ${job.id} completed.`);

  // Check the job's status for errors
  const errors = job.status.errors;
  if (errors && errors.length > 0) {
    throw errors;
  }
}
```

### Parquet logical type declaration and LIST form

```text
optional int32 date_col (DATE);
```

```text
// standard form
<optional | required> group <name> (LIST) {
  repeated group list {
    <optional | required> <element-type> element;
  }
}
```

With list inference enabled the `LIST` node is treated as `repeated <element-type> <name>` (the `list` and `element` nodes are omitted).

### Flexible column names with the Storage Write API (gRPC)

```text
syntax = "proto2";
package mypackage;
// Source protos located in github.com/googleapis/googleapis
import "google/cloud/bigquery/storage/v1/annotations.proto";

message FlexibleSchema {
  optional string item_name_column = 1
  [(.google.cloud.bigquery.storage.v1.column_name) = "name-列"];
  optional string item_description_column = 2
  [(.google.cloud.bigquery.storage.v1.column_name) = "description-列"];
}
```

### Debug a Parquet file with PyArrow

Adapted (not in the official docs): the two `print` statements use Python 3 call syntax (the official sample uses Python 2 `print col[...]`, a syntax error in Python 3).

```python
from pyarrow import parquet as pq

# Read the entire file
pq.read_table('your_sample_file.parquet')
# Read specific columns
pq.read_table('your_sample_file.parquet',columns=['some_column', 'another_column'])
# Read the metadata of specific columns
file_metadata=pq.read_metadata('your_sample_file.parquet')
for col in file_metadata.row_group(0).to_dict()['columns']:
    print(col['column_path_in_schema'])
    print(col['num_values'])
```

## Options / Props

### `bq load` flags for Parquet

| Flag | Description |
|---|---|
| `--location` | Optional; your dataset location (for example `asia-northeast1`); default settable in `.bigqueryrc` |
| `--time_partitioning_type` | `HOUR`, `DAY`, `MONTH`, or `YEAR`; optional for a `DATE`, `DATETIME` or `TIMESTAMP` column; default `DAY`; the partitioning specification of an existing table cannot be changed |
| `--time_partitioning_expiration` | Integer seconds; expiration is the partition's UTC date plus the integer |
| `--time_partitioning_field` | The `DATE` or `TIMESTAMP` column; without it an ingestion-time partitioned table is created |
| `--clustering_fields` | Comma-separated list of up to four column names |
| `--destination_kms_key` | Cloud KMS key for table-data encryption |
| `--column_name_character_map` | Scope and handling of characters in column names; enables flexible column names (see `load_option_list`) |
| `--replace` / `--noreplace` | Overwrite or append; with neither flag the default is append |
| `--reference_file_schema_uri` | URL of a reference file used to provide the table schema (for example `gs://mybucket/schema.parquet`); API property `referenceFileSchemaUri` |
| `--decimal_target_types` | Target types for Parquet `DECIMAL` (load job; API `JobConfigurationLoad.decimalTargetTypes`) |
| `--parquet_enum_as_string` | Convert `Enum` to `STRING` instead of `BYTES` (also on `bq mk` for external tables; API `parquetOptions`) |
| `--parquet_enable_list_inference` | Enable schema inference for `LIST` logical types (also on `bq mk`; DDL option `enable_list_inference`; API `parquetOptions`) |

### Write preference

| Console option | bq tool flag | API property | Description |
|---|---|---|---|
| Write if empty | Not supported | `WRITE_EMPTY` | Writes the data only if the table is empty. |
| Append to table | `--noreplace` or `--replace=false`; default when `--[no]replace` is unspecified | `WRITE_APPEND` | (Default) Appends the data to the end of the table. |
| Overwrite table | `--replace` or `--replace=true` | `WRITE_TRUNCATE` | Erases all existing data in a table before writing the new data; also deletes the table schema and row level security, and removes any Cloud KMS key. |

### Input file requirements

| Guideline | Value |
|---|---|
| Row size | 50 MB or less (avoids `resourcesExceeded`) |
| Page size | With more than 100 columns, consider a page size smaller than the default (1 \* 1024 \* 1024 bytes) |
| Row group size | At least 16 MiB for best performance; smaller sizes increase I/O and slow loads and queries |

### Compression codecs

| Codec |
|---|
| `GZip` |
| `LZO_1C` |
| `LZO_1X` |
| `LZ4_RAW` |
| `Snappy` |
| `ZSTD` |

### Type conversions

| Parquet type | Parquet logical type(s) | BigQuery data type |
|---|---|---|
| `BOOLEAN` | None | BOOLEAN |
| INT32 | None, `INTEGER` (`UINT_8`, `UINT_16`, `UINT_32`, `INT_8`, `INT_16`, `INT_32`) | INT64 |
| INT32 | DECIMAL | NUMERIC, BIGNUMERIC, or STRING |
| `INT32` | `DATE` | DATE |
| `INT32` | `TIME`, `precision=MILLIS` (`TIME_MILLIS`) | TIME |
| `INT64` | None, `INTEGER` (`UINT_64`, `INT_64`) | INT64 |
| INT64 | DECIMAL | NUMERIC, BIGNUMERIC, or STRING |
| `INT64` | `TIME`, `precision=MICROS` (`TIME_MICROS`) | TIME |
| `INT64` | `TIMESTAMP`, `precision=MILLIS` (`TIMESTAMP_MILLIS`) | TIMESTAMP |
| `INT64` | `TIMESTAMP`, `precision=MICROS` (`TIMESTAMP_MICROS`) | TIMESTAMP |
| `INT96` | None | TIMESTAMP |
| `FLOAT` | None | FLOAT64 |
| `DOUBLE` | None | FLOAT64 |
| `BYTE_ARRAY` | None | BYTES |
| `BYTE_ARRAY` | `STRING` (`UTF8`) | STRING |
| FIXED_LEN_BYTE_ARRAY | DECIMAL | NUMERIC, BIGNUMERIC, or STRING |
| `FIXED_LEN_BYTE_ARRAY` | None | BYTES |

### Column naming rules

| Rule | Detail |
|---|---|
| Characters | Letters (a-z, A-Z), digits (0-9), underscores; must start with a letter or underscore (flexible column names allow a leading digit) |
| Maximum length | 300 characters |
| Forbidden prefixes | `_TABLE_`, `_FILE_`, `_PARTITION`, `_ROW_TIMESTAMP`, `__ROOT__`, `_COLIDENTIFIER`, `_CHANGE_SEQUENCE_NUMBER`, `_CHANGE_TYPE`, `_CHANGE_TIMESTAMP` |
| Duplicates | Not allowed even if the case differs (`Column1` equals `column1`); Parquet column names are case-insensitive when loaded |
| Flexible names allow | `\p{L}`, `\p{N}`, `\p{Pc}`, `\p{Pd}`, `\p{M}`, `&` `%` `=` `+` `:` `'` `<` `>` `#` `\|` and whitespace |
| Flexible names disallow | `!` `"` `$` `(` `)` `*` `,` `.` `/` `;` `?` `@` `[` `\` `]` `^` `` ` `` `{` `}` `~`; a Parquet column with a period (.) in its name cannot be loaded |

## Notes

- Limitations: no data-consistency guarantee for external data sources; Cloud Storage object versioning is unsupported (a generation number in the URI fails the load); a wildcard URI cannot be used if any file has a different schema (any difference in column position counts as a different schema). With multiple files of different schemas, identical columns must have the same mode.
- Console: the bucket must be in the same location as the dataset; multiple URIs are not accepted in the console but wildcards are. The console cannot add a label, description, table expiration or partition expiration when loading into an empty table, and does not support appending to or overwriting partitioned or clustered tables in a load job. Appending or overwriting cannot convert a table to partitioned or clustered; partitioned-table appends are covered on Appending to and overwriting partitioned table data.
- Required permissions are the same as for any Cloud Storage batch load (`bigquery.tables.create`, `bigquery.tables.updateData`, `bigquery.tables.update`, `bigquery.jobs.create`; `storage.buckets.get`, `storage.objects.get`, `storage.objects.list` for wildcards); see batch-loading-data.md.
- API: create a `load` job with fully qualified `gs://BUCKET/OBJECT` source URIs (one `*` per URI), `sourceFormat` `PARQUET`, and `configuration.load.writeDisposition` `WRITE_TRUNCATE` or `WRITE_APPEND`. `status.state = DONE` with no `status.errorResult` means success (nonfatal errors are in `status.errors`); load jobs are atomic. Pass a unique `jobReference.jobId` so retries are idempotent.
- Unsigned types (`UINT_8` ... `UINT_64`) load into signed `INTEGER` columns; `UINT_64` errors above 9,223,372,036,854,775,807. `DECIMAL` target type is chosen by precision and scale and the decimal target types setting; `Enum` converts to `STRING` or `BYTES`; nested groups become `STRUCT`; other Parquet and converted-type combinations are unsupported.
- Geospatial: `STRING` (WKT, hex-encoded WKB, GeoJSON) or `BYTE_ARRAY` (WKB) columns load as `GEOGRAPHY` when the schema says so; GeoParquet columns are read as `GEOGRAPHY` by default.
- Flexible column names: supported by default for Iceberg managed tables, Iceberg external tables and Lakehouse runtime catalog Iceberg tables; other external tables (Parquet, ORC, Avro, CSV, Delta Lake) need project-level enablement through Cloud Customer Care. Delta Lake also needs column mapping in `id` or `name` mode. Not supported in legacy SQL. The Storage Read API needs `enable_display_name_attribute` set in `AvroSerializationOptions`, and the Storage Write API (gRPC) needs the schema with `column_name` annotations unless `JsonStreamWriter` is used.
- If a table and a column share a name (`test`), `SELECT test` returns a `STRUCT`; use a table alias (`SELECT test FROM project1.dataset.test AS t;`) or `SELECT test.test FROM project1.dataset.test;`. Avoid the `_field_` prefix, which is renamed automatically in queries.
- Destructive: `LOAD DATA OVERWRITE`, `--replace` and `WRITE_TRUNCATE` erase existing table data (and, per the source, the schema, row level security and Cloud KMS key); try them on a disposable dataset first.
- Hive-partitioned Parquet data is loaded as described on Load externally partitioned data.
- The source's `--require_partition_filter` entry for `bq load` is omitted because the bq CLI reference does not list that flag for `bq load`.
- The source also shows Console, Go, Java and PHP forms. The Python sample is the load-new-table sample (the append/overwrite sample is the same with `write_disposition` set).
- Adapted from the official docs: `print col['column_path_in_schema']` and `print col['num_values']` (Python 2 syntax) became `print(...)` calls.
- Source: https://docs.cloud.google.com/bigquery/docs/loading-data-cloud-storage-parquet (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [batch-loading-data.md](./batch-loading-data.md)
- [loading-data.md](./loading-data.md)
