---
source: https://docs.cloud.google.com/bigquery/docs/external-data-cloud-storage
---

# Create Cloud Storage external tables

Cloud Storage external tables let you query CSV, JSON, Avro, ORC, Parquet, Datastore export and Firestore export data directly from BigQuery without loading it into BigQuery storage. This page covers creating external tables on unpartitioned and Hive-partitioned data, and upgrading them to BigLake tables. To query an external table you need permissions on both the table and the Cloud Storage files; where possible use a BigLake table, because access delegation means users need permissions only on the table.

## Signature / Usage

### Create an external table on unpartitioned data (SQL)

```sql
CREATE EXTERNAL TABLE `PROJECT_ID.DATASET.EXTERNAL_TABLE_NAME`
  OPTIONS (
    format ="TABLE_FORMAT",
    uris = ['BUCKET_PATH'[,...]]
    );
```

Auto-detected schema:

```sql
CREATE OR REPLACE EXTERNAL TABLE mydataset.sales
  OPTIONS (
  format = 'CSV',
  uris = ['gs://mybucket/sales.csv']);
```

Explicit schema, skipping the first CSV row:

```sql
CREATE OR REPLACE EXTERNAL TABLE mydataset.sales (
  Region STRING,
  Quarter STRING,
  Total_Sales INT64
) OPTIONS (
    format = 'CSV',
    uris = ['gs://mybucket/sales.csv'],
    skip_leading_rows = 1);
```

### Create an external table on unpartitioned data (bq)

Option 1, table definition file:

```bash
bq mkdef --source_format=SOURCE_FORMAT \
  BUCKET_PATH > DEFINITION_FILE

bq mk --table \
  --external_table_definition=DEFINITION_FILE \
  DATASET_NAME.TABLE_NAME \
  SCHEMA
```

```bash
bq mkdef --source_format=CSV gs://mybucket/sales.csv > mytable_def

bq mk --table --external_table_definition=mytable_def \
  mydataset.mytable \
  Region:STRING,Quarter:STRING,Total_sales:INTEGER
```

Schema auto-detection (set `--autodetect=true` in `mkdef` and omit the schema):

```bash
bq mkdef --source_format=CSV --autodetect=true \
  gs://mybucket/sales.csv > mytable_def

bq mk --table --external_table_definition=mytable_def \
  mydataset.mytable
```

Option 2, inline table definition:

```bash
bq mk --table \
  --external_table_definition=@SOURCE_FORMAT=BUCKET_PATH \
  DATASET_NAME.TABLE_NAME \
  SCHEMA
```

### Create an external table on unpartitioned data (API)

Call `tables.insert` and create an `ExternalDataConfiguration` in the `Table` resource you pass in. Specify the `schema` property or set `autodetect` to `true` for supported data sources.

### Create an external table on Hive-partitioned data (SQL)

Automatic detection of Hive partition keys:

```sql
CREATE EXTERNAL TABLE `PROJECT_ID.DATASET.EXTERNAL_TABLE_NAME`
WITH PARTITION COLUMNS
OPTIONS (
format = 'SOURCE_FORMAT',
uris = ['GCS_URIS'],
hive_partition_uri_prefix = 'GCS_URI_SHARED_PREFIX',
require_hive_partition_filter = BOOLEAN);
```

Custom partition keys and types:

```sql
CREATE EXTERNAL TABLE `PROJECT_ID.DATASET.EXTERNAL_TABLE_NAME`
WITH PARTITION COLUMNS (PARTITION_COLUMN_LIST)
OPTIONS (
format = 'SOURCE_FORMAT',
uris = ['GCS_URIS'],
hive_partition_uri_prefix = 'GCS_URI_SHARED_PREFIX',
require_hive_partition_filter = BOOLEAN);
```

For the path `gs://bucket/path/field_1=first/field_2=1/data.parquet`, both examples below produce `field_1` (`STRING`) and `field_2` (`INT64`):

```sql
CREATE EXTERNAL TABLE dataset.AutoHivePartitionedTable
WITH PARTITION COLUMNS
OPTIONS (
uris = ['gs://bucket/path/*'],
format = 'PARQUET',
hive_partition_uri_prefix = 'gs://bucket/path',
require_hive_partition_filter = false);
```

```sql
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

### Create an external table on Hive-partitioned data (bq)

```bash
bq mkdef \
--source_format=SOURCE_FORMAT \
--hive_partitioning_mode=PARTITIONING_MODE \
--hive_partitioning_source_uri_prefix=GCS_URI_SHARED_PREFIX \
--require_hive_partition_filter=BOOLEAN \
 GCS_URIS > DEFINITION_FILE
```

With `PARTITIONING_MODE` set to `CUSTOM`, include the partition key schema in the prefix:

```text
--hive_partitioning_source_uri_prefix=GCS_URI_SHARED_PREFIX/{KEY1:TYPE1}/{KEY2:TYPE2}/...
```

```bash
bq mk --external_table_definition=DEFINITION_FILE \
DATASET_NAME.TABLE_NAME \
SCHEMA
```

```bash
bq mkdef --source_format=CSV \
  --hive_partitioning_mode=CUSTOM \
  --hive_partitioning_source_uri_prefix=gs://myBucket/myTable/{dt:DATE}/{val:STRING} \
  gs://myBucket/myTable/* > mytable_def

bq mk --external_table_definition=mytable_def \
  mydataset.mytable \
  Region:STRING,Quarter:STRING,Total_sales:INTEGER
```

### Create an external table on Hive-partitioned data (API)

Include a `hivePartitioningOptions` object in the `ExternalDataConfiguration`. If `hivePartitioningOptions.mode` is `CUSTOM`, encode the key schema in `hivePartitioningOptions.sourceUriPrefix` as `gs://BUCKET/PATH_TO_TABLE/{KEY1:TYPE1}/{KEY2:TYPE2}/...`. Set `hivePartitioningOptions.requirePartitionFilter` to `true` to enforce a predicate filter.

### Upgrade an external table to a BigLake table (SQL)

```sql
CREATE OR REPLACE EXTERNAL TABLE
  `PROJECT_ID.DATASET.EXTERNAL_TABLE_NAME`
  WITH CONNECTION {`REGION.CONNECTION_ID` | DEFAULT}
  OPTIONS(
    format ="TABLE_FORMAT",
    uris = ['BUCKET_PATH'],
    max_staleness = STALENESS_INTERVAL,
    metadata_cache_mode = 'CACHE_MODE'
    );
```

### Upgrade an external table to a BigLake table (bq)

```bash
bq mkdef --connection_id=PROJECT_ID.REGION.CONNECTION_ID \
--source_format=TABLE_FORMAT \
--metadata_cache_mode=CACHE_MODE \
"BUCKET_PATH" > /tmp/DEFINITION_FILE
```

```bash
bq update --max_staleness=STALENESS_INTERVAL \
--external_table_definition=/tmp/DEFINITION_FILE \
PROJECT_ID:DATASET.EXTERNAL_TABLE_NAME
```

### Create an external table on Avro files with a reference file schema (Python)

```python
from google.cloud import bigquery

# Construct a BigQuery client object.
client = bigquery.Client()

# TODO(developer): Set table_id to the ID of the table to create.
table_id = "your-project.your_dataset.your_table_name"

# TODO(developer): Set the external source format of your table.
# Note that the set of allowed values for external data sources is
# different than the set used for loading data (see :class:`~google.cloud.bigquery.job.SourceFormat`).
external_source_format = "AVRO"

# TODO(developer): Set the source_uris to point to your data in Google Cloud
source_uris = [
    "gs://cloud-samples-data/bigquery/federated-formats-reference-file-schema/a-twitter.avro",
    "gs://cloud-samples-data/bigquery/federated-formats-reference-file-schema/b-twitter.avro",
    "gs://cloud-samples-data/bigquery/federated-formats-reference-file-schema/c-twitter.avro",
]

# Create ExternalConfig object with external source format
external_config = bigquery.ExternalConfig(external_source_format)
# Set source_uris that point to your data in Google Cloud
external_config.source_uris = source_uris

# TODO(developer) You have the option to set a reference_file_schema_uri, which points to
# a reference file for the table schema
reference_file_schema_uri = "gs://cloud-samples-data/bigquery/federated-formats-reference-file-schema/b-twitter.avro"

external_config.reference_file_schema_uri = reference_file_schema_uri

table = bigquery.Table(table_id)
# Set the external data configuration of the table
table.external_data_configuration = external_config
table = client.create_table(table)  # Make an API request.

print(
    f"Created table with external source format {table.external_data_configuration.source_format}"
)
```

## Options / Props

### Supported formats and storage classes

| Kind | Values |
|------|--------|
| Formats | CSV, JSON (newline-delimited), Avro, ORC, Parquet, Datastore exports, Firestore exports |
| Storage classes | Standard, Nearline, Coldline, Archive |

### Required roles and permissions

| Item | Value |
|------|-------|
| Create the table | `bigquery.tables.create`, included in `roles/bigquery.dataEditor`, `roles/bigquery.dataOwner`, `roles/bigquery.admin` |
| Bucket access | `storage.buckets.get`, `storage.objects.get`, `storage.objects.list` (required if you use a URI wildcard); all included in `roles/storage.admin` |
| Compute Engine instance querying the table | At least the Cloud Storage read-only access scope `https://www.googleapis.com/auth/devstorage.read_only`. The default Compute Engine service account has it by default; a custom service account must be granted it explicitly. |

### Placeholders for `CREATE EXTERNAL TABLE` and the upgrade statements

| Placeholder | Meaning |
|-------------|---------|
| `TABLE_FORMAT` / `SOURCE_FORMAT` | Format of the data, for example `PARQUET` or `CSV`. Can't be changed when updating the table. |
| `BUCKET_PATH` | `['gs://bucket_name/[folder_name/]file_name']`; one `*` wildcard allowed; several paths allowed in `uris`; all files must share a compatible schema. |
| `REGION.CONNECTION_ID` or `DEFAULT` | Connection to use; `DEFAULT` uses the default connection. |
| `STALENESS_INTERVAL` | Whether cached metadata is used and how fresh it must be. `0` disables metadata caching (default). To enable, use an interval literal between 30 minutes and 7 days (for example `INTERVAL 4 HOUR`; in `bq update`, the `Y-M D H:M:S` form such as `0-0 0 4:0:0`). |
| `CACHE_MODE` | `AUTOMATIC` (refreshed at a system-defined interval, usually between 30 and 60 minutes) or `MANUAL` (refresh with the `BQ.REFRESH_EXTERNAL_METADATA_CACHE` system procedure). Required if `STALENESS_INTERVAL` is greater than 0. |
| `SCHEMA` | Path to a JSON schema file, or `field:data_type,field:data_type,...`; omit for auto-detection. |
| `GCS_URI_SHARED_PREFIX` | Source URI prefix without the wildcard. |
| `BOOLEAN` | Whether to require a predicate filter at query time (`require_hive_partition_filter`); optional, default `false`. |
| `PARTITIONING_MODE` | `AUTO` (detect key names and types), `STRINGS` (key names detected, all types strings), `CUSTOM` (key schema encoded in the source URI prefix). |
| `PARTITION_COLUMN_LIST` | Columns in the same order as the Cloud Storage path, as `KEY1 TYPE1, KEY2 TYPE2`. |

### Wildcard rules for Cloud Storage URIs

| Rule |
|------|
| The asterisk can appear inside the object name or at the end of it. |
| Multiple asterisks are unsupported (`gs://mybucket/fed-*/temp/*.csv` is invalid). |
| An asterisk with the bucket name is unsupported. |
| You can't use an asterisk when you create external tables linked to Datastore or Firestore exports. |
| `gs://mybucket/fed-samples/fed-sample*` selects files in all folders with that prefix; `gs://mybucket/fed-samples/*.csv` selects `.csv` files in `fed-samples` and its subfolders; `gs://mybucket/fed-samples/fed-sample*.csv` does not select files in subfolders. |

## Notes

- The source also shows Console steps and Java and Node.js client-library samples. The Node.js sample is omitted because it uses an undefined `schema` variable.
- The source's `STRING` partitioning-mode example uses `--hive_partitioning_mode=STRING`; `bq help mkdef` (bq bundled with gcloud 593.0.0) lists `AUTO` and `STRINGS` as the modes, so that example is not reproduced here. `--[no]require_hive_partition_filter` is listed in `bq help mkdef`.
- After you create an externally partitioned table you can't change the partition key; recreate the table.
- Datasets and buckets must be colocated; the Cloud Storage bucket must be in the same location as the dataset (see the external tables page for the full location table).
- Upgrading to a BigLake table uses `CREATE OR REPLACE EXTERNAL TABLE`, which replaces the table definition; try it on a disposable table first. `bq update` with `--external_table_definition` changes the definition in place.
- Cloud Storage resource path: `gs://bucket_name/object`; paths with multiple consecutive slashes after `gs://` (for example `gs://bucket/my//object//name`) do not work in BigQuery because consecutive slashes are converted to one.
- Pricing: Nearline, Coldline and Archive retrieval fees and inter-region network transfer fees (when a job in one location reads a bucket in another) apply. Prices are not copied here.
- Limitations are on the external tables page; "Query Cloud Storage data in external tables" is the page about querying.
- BigLake is now called Lakehouse; the twin uses the name BigLake.
- Cloud Storage itself (buckets, IAM, storage classes) is covered by `gcp-storage`.
- Source: https://docs.cloud.google.com/bigquery/docs/external-data-cloud-storage (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [external-tables.md](./external-tables.md)
- [external-data-sources.md](./external-data-sources.md)
- [connections-api-intro.md](./connections-api-intro.md)
