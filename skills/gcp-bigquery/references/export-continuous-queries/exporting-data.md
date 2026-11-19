---
source: https://docs.cloud.google.com/bigquery/docs/exporting-data
---

# Export table data to Cloud Storage

You can export BigQuery table data to Cloud Storage in CSV, JSON, Avro, or Parquet format for backup, archival, or processing in other tools. Use the Google Cloud console, the `bq extract` command, an `extract` job through the API or client libraries, or the `EXPORT DATA` statement.

## Signature / Usage

### Export with EXPORT DATA

```sql
EXPORT DATA
  OPTIONS (
    uri = 'gs://bucket/folder/*.csv',
    format = 'CSV',
    overwrite = true,
    header = true,
    field_delimiter = ';')
AS (
  SELECT field1, field2
  FROM mydataset.table1
  ORDER BY field1
);
```

### Export with bq extract

```bash
bq extract \
--compression GZIP \
'mydataset.mytable' \
gs://example-bucket/myfile.csv
```

```bash
bq extract \
--destination_format NEWLINE_DELIMITED_JSON \
'mydataset.mytable' \
gs://example-bucket/myfile.json
```

```bash
bq extract \
--destination_format AVRO \
--compression SNAPPY \
'mydataset.mytable' \
gs://example-bucket/myfile.avro
```

Export a single partition (quote the path because of the `$` decorator):

```bash
bq extract \
--destination_format CSV \
'mydataset.my_partitioned_table$0' \
gs://example-bucket/single_partition.csv
```

### Export with a client library (Python)

```python
# from google.cloud import bigquery
# client = bigquery.Client()
# bucket_name = 'my-bucket'
project = "bigquery-public-data"
dataset_id = "samples"
table_id = "shakespeare"

destination_uri = "gs://{}/{}".format(bucket_name, "shakespeare.csv")
dataset_ref = bigquery.DatasetReference(project, dataset_id)
table_ref = dataset_ref.table(table_id)

extract_job = client.extract_table(
    table_ref,
    destination_uri,
    # Location must match that of the source table.
    location="US",
)  # API request
extract_job.result()  # Waits for job to complete.

print(
    "Exported {}:{}.{} to {}".format(project, dataset_id, table_id, destination_uri)
)
```

### Export with a client library (Node.js)

```javascript
// Import the Google Cloud client libraries
const {BigQuery} = require('@google-cloud/bigquery');
const {Storage} = require('@google-cloud/storage');

const bigquery = new BigQuery();
const storage = new Storage();

async function extractTableToGCS() {
  // Exports my_dataset:my_table to gcs://my-bucket/my-file as raw CSV.

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const datasetId = "my_dataset";
  // const tableId = "my_table";
  // const bucketName = "my-bucket";
  // const filename = "file.csv";

  // Location must match that of the source table.
  const options = {
    location: 'US',
  };

  // Export data from the table into a Google Cloud Storage file
  const [job] = await bigquery
    .dataset(datasetId)
    .table(tableId)
    .extract(storage.bucket(bucketName).file(filename), options);

  console.log(`Job ${job.id} created.`);

  // Check the job's status for errors
  const errors = job.status.errors;
  if (errors && errors.length > 0) {
    throw errors;
  }
}
```

### Export Iceberg table metadata

```sql
EXPORT TABLE METADATA FROM `[[PROJECT_NAME.]DATASET_NAME.]TABLE_NAME`;
```

The metadata is written to the `STORAGE_URI/metadata` folder, where `STORAGE_URI` is the table's storage location set in the options.

### Export JSON columns to Parquet

`JSON` columns can't be exported to Parquet (including `JSON` fields nested in `STRUCT` / `ARRAY`); convert them with `TO_JSON_STRING`.

```sql
EXPORT DATA
  OPTIONS (
    uri = 'gs://BUCKET/FOLDER/*.parquet',
    format = 'PARQUET')
AS (
  SELECT
    * REPLACE (
      TO_JSON_STRING(json_col) AS json_col,
      ARRAY(
        SELECT AS STRUCT
          rec.* REPLACE (TO_JSON_STRING(rec.nested_json_col) AS nested_json_col)
        FROM UNNEST(repeated_record_col) AS rec WITH OFFSET AS pos
        ORDER BY pos
      ) AS repeated_record_col)
  FROM mydataset.mytable
);
```

### Limit the exported file size

Partition and cluster a copy by a random `export_id` (n partitions = total size / target file size, for example 8,000 MB at about 20 MB per file needs 400), then run `EXPORT DATA` once per `i` from 0 to `n-1`.

```sql
CREATE TABLE my_dataset.processed_table
PARTITION BY RANGE_BUCKET(export_id, GENERATE_ARRAY(0, n, 1))
CLUSTER BY export_id
AS (
  SELECT *, CAST(FLOOR(n*RAND()) AS INT64) AS export_id
  FROM my_dataset.source_table
);
```

```sql
SELECT * EXCEPT(export_id)
FROM my_dataset.processed_table
WHERE export_id = i;
```

### Flatten nested data for CSV

```sql
SELECT
    id,
    user_details.name AS user_name,
    user_details.email AS user_email,
    created_at
FROM
    my_dataset.my_table;
```

### Monitor extract jobs

Daily extract bytes over the last seven days:

```sql
SELECT
TIMESTAMP_TRUNC(creation_time, DAY) AS day,
SUM ( total_bytes_processed ) / POW(1024, 3) AS total_gibibytes_processed
FROM
`region-REGION_NAME`.INFORMATION_SCHEMA.JOBS_BY_PROJECT
WHERE
creation_time BETWEEN TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 7 DAY) AND CURRENT_TIMESTAMP()
AND job_type = "EXTRACT"
GROUP BY 1
ORDER BY 2 DESC
```

PromQL alert condition (Cloud Monitoring, code editor mode):

```text
(
  sum by (project_id, quota_metric, location) (increase({"serviceruntime.googleapis.com/quota/rate/net_usage", monitored_resource="consumer_quota", service="bigquery.googleapis.com"}[1m]))
  /
  max by (project_id, quota_metric, location) ({"serviceruntime.googleapis.com/quota/limit", monitored_resource="consumer_quota", service="bigquery.googleapis.com", limit_name="ExtractBytesPerDay"})
) > 0.01
```

## Options / Props

### Formats and compression

| Data format | Compression | Details |
|---|---|---|
| CSV | GZIP | Delimiter via `--field_delimiter` (bq) or `configuration.extract.fieldDelimiter`. Nested and repeated data not supported. |
| JSON | GZIP | Nested and repeated data supported. |
| Avro | DEFLATE, SNAPPY | GZIP not supported. Nested and repeated data supported. |
| Parquet | SNAPPY, GZIP, ZSTD | Nested and repeated data supported. |

### bq extract flags and arguments

| Flag / argument | Description |
|---|---|
| `--location` | Optional; location of the data (for example `asia-northeast1`); a default can be set in `.bigqueryrc`. |
| `--destination_format` | `CSV` (default), `NEWLINE_DELIMITED_JSON`, `AVRO`, `PARQUET`. |
| `--compression` | Compression type supported for the format. |
| `--field_delimiter` | CSV column delimiter; `\t` and `tab` both accepted. |
| `--print_header` | `true` or `false`; default `true`; prints header rows when the format supports headers. |
| `project_id:dataset.table` | Source table. With a partition decorator, single-quote the path or escape `$`. |
| `gs://bucket/filename.ext` | Destination; bucket and dataset must be in the same location. May contain one `*` wildcard. |

### Required permissions

| Task | Permission | Predefined roles |
|---|---|---|
| Export from a table | `bigquery.tables.export` | `roles/bigquery.dataViewer`, `roles/bigquery.dataOwner`, `roles/bigquery.dataEditor`, `roles/bigquery.admin` |
| Run an extract job | `bigquery.jobs.create` | `roles/bigquery.user`, `roles/bigquery.jobUser`, `roles/bigquery.admin` |
| Write to an existing bucket | `storage.objects.create`, `storage.objects.delete` | `roles/storage.objectAdmin`, `roles/storage.admin` |

### Limits and behaviors

| Item | Value |
|---|---|
| Single file | Up to 1 GB of logical table data; above that use a wildcard (file sizes vary) |
| Extract bytes per day | Default 50 TiB per project (`ExtractBytesPerDay`) |
| Wildcard | One `*` per URI, in the filename component; replaced by a number from 0, left-padded to 12 digits (`000000000000`) |
| Single URI with `EXPORT DATA` | Not supported; a single wildcard URI is required |
| Tables per extract job | One table only |
| Console compression | Only `GZIP` selectable |
| JSON | `INT64` encoded as JSON strings; `<`, `>`, `&` converted to `\uNNNN` (for example `profit&loss`) |
| Order | Not guaranteed unless `EXPORT DATA` has `ORDER BY` in the query; with multiple files the order is preserved globally |
| Paths | Multiple consecutive slashes after `gs://` are collapsed to one (`gs://bucket/my//object//name` doesn't work) |
| Concurrent loads | Data loaded while an extract job runs is not included |
| Destinations | Only Cloud Storage; not local file, Sheets, or Drive |

### Avro export details

| BigQuery type | Avro representation |
|---|---|
| Row | Avro record (container files); nested data as nested records |
| `REQUIRED` | Corresponding Avro type (`INTEGER` to `LONG`) |
| `NULLABLE` | Union of the type and `null` |
| `REPEATED` | Avro array |
| `TIMESTAMP` | `timestamp-micros` logical type by default in both extract jobs and `EXPORT DATA` |
| `DATE`, `TIME`, `DATETIME` | Logical type by default in `EXPORT DATA`; `string` by default in extract jobs |
| `NUMERIC(P[, S])`, `BIGNUMERIC(P[, S])` | Precision and scale carried to the Avro decimal logical type |
| `RANGE` | Not supported |

### Parquet type mapping

| BigQuery data type | Parquet primitive type | Parquet logical type |
|---|---|---|
| Integer | `INT64` | `NONE` |
| Numeric | `FIXED_LEN_BYTE_ARRAY` | `DECIMAL (precision = 38, scale = 9)` |
| Numeric(P\[, S\]) | `FIXED_LEN_BYTE_ARRAY` | `DECIMAL (precision = P, scale = S)` |
| BigNumeric | `FIXED_LEN_BYTE_ARRAY` | `DECIMAL (precision = 76, scale = 38)` |
| BigNumeric(P\[, S\]) | `FIXED_LEN_BYTE_ARRAY` | `DECIMAL (precision = P, scale = S)` |
| Floating point | `FLOAT` | `NONE` |
| Boolean | `BOOLEAN` | `NONE` |
| String | `BYTE_ARRAY` | `STRING` `(UTF8)` |
| Bytes | `BYTE_ARRAY` | `NONE` |
| Date | `INT32` | `DATE` |
| Datetime | `INT64` | `TIMESTAMP (isAdjustedToUTC = false, unit = MICROS)` |
| Time | `INT64` | `TIME (isAdjustedToUTC = true, unit = MICROS)` |
| Timestamp | `INT64` | `TIMESTAMP (isAdjustedToUTC = false, unit = MICROS)` |
| Geography | `BYTE_ARRAY` | `GEOGRAPHY (edges = spherical)` |

### Troubleshooting

| Error | Cause and resolution |
|---|---|
| `Your usage exceeded quota for ExtractBytesPerDay` | Export over the 50 TiB daily limit. Export specific partitions with a partition decorator, or create a slot reservation and assign the project to it with the `PIPELINE` job type (uses dedicated slots instead of the shared pool and bypasses the limit check; the reservation can be deleted later). |
| `Failed to export: Operation cannot be performed on a nested schema. Field: [COLUMN_NAME]` | Nested or repeated fields (`STRUCT`, `ARRAY`) exported to CSV. Flatten with dot notation, `UNNEST`, or `ARRAY_TO_STRING()`, or export to newline-delimited JSON, Avro or Parquet, which keep nested and repeated data. |

## Notes

- Corrected from the official docs: the troubleshooting section lists newline-delimited JSON with CSV as a flat format that fails on nested schemas; the export formats table supports nested and repeated data for JSON, Avro and Parquet, and only CSV rejects it (the flattening example is therefore titled for CSV only).
- Source: https://docs.cloud.google.com/bigquery/docs/exporting-data (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Caution from the source: for a Cloud Storage destination, disable the Bucket Lock and Soft Delete retention policies. BigQuery attempts to rewrite files, which can fail if the retention policy prevents overwriting, and extra charges are incurred. Re-enable the policies after the export.
- `overwrite = true` overwrites existing files with the same URI; try exports against a disposable bucket or prefix first. The generated file size with `EXPORT DATA` is not guaranteed and the number of files from an extract job can vary.
- `LIMIT` in `EXPORT DATA` often makes the export slow; the source doesn't recommend it. Export views with `EXPORT DATA`, not the console export.
- Exporting a `DATETIME` to Avro or Parquet produces a value that can't be loaded back into the same table schema; load into a staging table and cast, or (Parquet) pass a schema in the load job with the `--schema` flag using `col:DATETIME`.
- `use_avro_logical_types=False` in `EXPORT DATA` options (or the extract-job flag `--use_avro_logical_types=True`) applies to all logical types at once. `bq extract` accepts `--[no]use_avro_logical_types` (`bq help extract`, bq bundled with gcloud 593.0.0), although the bq CLI reference page lists the flag only under `bq load`, `bq mk` and `bq mkdef`.
- Parquet `GEOGRAPHY` carries GeoParquet metadata. For Parquet exports the source suggests the Dataflow "BigQuery export to Parquet (via BigQuery Storage API)" template may be faster.
- API notes: pass a unique `jobReference.jobId` to `jobs.insert`; retrying the same job ID is idempotent (at most one succeeds). Job is done when `status.state = DONE`; `status.errorResult` means failure; nonfatal errors are in `status.errors`. Extract jobs are asynchronous, so check the job status.
- Quota usage: an extract job's `total_bytes_processed` in `INFORMATION_SCHEMA.JOBS_BY_*` is what counts against the 50 TiB daily limit.
- The source also shows Console steps and C#, Go, Java, PHP, Ruby samples, a compressed-table extract in Go, Java, Node.js, Python, a job-count `INFORMATION_SCHEMA.JOBS_BY_PROJECT` query, a Logs Explorer filter for extract jobs, an "Example use case" (daily snapshot, small-table read with `tabledata.list` and 5xx exponential backoff), and Dataflow as an alternative; those are omitted.
- Cloud Storage, Dataflow and Cloud Monitoring are separate products (see `gcp-storage`, `gcp-observability`).

## Related

- [export-intro.md](./export-intro.md)
- [export-file.md](./export-file.md)
- [export-to-pubsub.md](./export-to-pubsub.md)
