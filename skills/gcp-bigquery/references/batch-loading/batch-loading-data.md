---
source: https://docs.cloud.google.com/bigquery/docs/batch-loading-data
---

# Batch load data

A batch load job ingests data from Cloud Storage or a local file into a new or existing table. Supported inputs are Avro, CSV, newline-delimited JSON, ORC and Parquet files, plus Datastore and Firestore exports stored in Cloud Storage. To automate recurring loads from Cloud Storage, use the BigQuery Data Transfer Service (Cloud Storage transfers).

## Signature / Usage

### Load a local file with `bq load`

Supply `--location` optionally; add `PROJECT_ID:` to the dataset when loading into a non-default project. `FORMAT` is `CSV`, `AVRO`, `PARQUET`, `ORC`, or `NEWLINE_DELIMITED_JSON`. `SCHEMA` can be a local JSON file or inline; `--autodetect` can replace it.

```bash
bq --location=LOCATION load \
--source_format=FORMAT \
PROJECT_ID:DATASET.TABLE \
PATH_TO_SOURCE \
SCHEMA
```

```bash
bq load \
--source_format=NEWLINE_DELIMITED_JSON \
mydataset.mytable \
./mydata.json \
./myschema.json
```

```bash
bq load \
--source_format=CSV \
myotherproject:mydataset.mytable \
./mydata.csv \
qtr:STRING,sales:FLOAT,year:STRING
```

```bash
bq load \
--autodetect \
--source_format=CSV \
mydataset.mytable \
./mydata.csv
```

### Load a local CSV file with Python

```python
from google.cloud import bigquery

# Construct a BigQuery client object.
client = bigquery.Client()

# TODO(developer): Set table_id to the ID of the table to create.
# table_id = "your-project.your_dataset.your_table_name"

job_config = bigquery.LoadJobConfig(
    source_format=bigquery.SourceFormat.CSV, skip_leading_rows=1, autodetect=True,
)

with open(file_path, "rb") as source_file:
    job = client.load_table_from_file(source_file, table_id, job_config=job_config)

job.result()  # Waits for the job to complete.

table = client.get_table(table_id)  # Make an API request.
print(
    "Loaded {} rows and {} columns to {}".format(
        table.num_rows, len(table.schema), table_id
    )
)
```

### Load a local file with Node.js

```javascript
// Imports the Google Cloud client library
const {BigQuery} = require('@google-cloud/bigquery');
const bigquery = new BigQuery();

async function loadLocalFile() {
  // Imports a local file into a table.

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const filename = '/path/to/file.csv';
  // const datasetId = 'my_dataset';
  // const tableId = 'my_table';

  // Load data from a local file into the table
  const [job] = await bigquery
    .dataset(datasetId)
    .table(tableId)
    .load(filename);

  console.log(`Job ${job.id} completed.`);

  // Check the job's status for errors
  const errors = job.status.errors;
  if (errors && errors.length > 0) {
    throw errors;
  }
}
```

### View current load-job usage against quota

```sql
SELECT
  sum(case  when job_type="QUERY" then 1 else 0 end) as QRY_CNT,
  sum(case  when job_type="LOAD" then 1 else 0 end) as LOAD_CNT,
  sum(case  when job_type="EXTRACT" then 1 else 0 end) as EXT_CNT,
  sum(case  when job_type="COPY" then 1 else 0 end) as CPY_CNT
FROM `region-REGION_NAME`.INFORMATION_SCHEMA.JOBS_BY_PROJECT
WHERE date(creation_time)= CURRENT_DATE()
```

## Options / Props

### Permissions to load data into BigQuery (new or existing table / partition)

| Permission |
|---|
| `bigquery.tables.create` |
| `bigquery.tables.updateData` |
| `bigquery.tables.update` |
| `bigquery.jobs.create` |

Predefined roles listed by the source (copied as written): `roles/bigquery.dataEditor`, `roles/bigquery.dataOwner`, `roles/bigquery.admin` (includes `bigquery.jobs.create`), `bigquery.user` (includes `bigquery.jobs.create`), `bigquery.jobUser` (includes `bigquery.jobs.create`). With `bigquery.datasets.create` you can create and update tables with a load job in datasets you create.

### Permissions to load from Cloud Storage

| Permission | Note |
|---|---|
| `storage.buckets.get` | Granted by `roles/storage.admin` on the bucket |
| `storage.objects.get` | Granted by `roles/storage.admin` on the bucket |
| `storage.objects.list` | Required if you are using a URI wildcard |

### Cloud Storage URI rules

| Rule | Detail |
|---|---|
| Storage classes | Standard, Nearline, Coldline, Archive |
| Path form | `gs://mybucket/myfile.csv`; consecutive slashes after `gs://` are collapsed to one, so `gs://bucket/my//object//name` does not work |
| Asterisk wildcard | One `*` inside or at the end of the object name; multiple asterisks (`gs://mybucket/fed-*/temp/*.csv`) and an asterisk in the bucket name are unsupported |
| Datastore exports | Only one URI, ending in `.backup_info` or `.export_metadata`; no wildcard for Datastore or Firestore exports |
| Dataset location | Cannot be changed after creation (copy or move the dataset instead) |

### Write disposition

| Console option | bq tool flag | API property | Description |
|---|---|---|---|
| Write if empty | None | `WRITE_EMPTY` | Writes the data only if the table is empty. |
| Append to table | `--noreplace` or `--replace=false`; the default when `--replace` is unspecified | `WRITE_APPEND` | (Default) Appends the data to the end of the table. |
| Overwrite table | `--replace` or `--replace=true` | `WRITE_TRUNCATE` | Erases all existing data in a table before writing the new data. |

### Limitations

| Scope | Limitation |
|---|---|
| Cloud Storage loads | No data-consistency guarantee for external data sources; Cloud Storage object versioning is unsupported (a generation number in the URI fails the load job) |
| Local files | No wildcards or comma-separated lists, files are loaded individually; Google Cloud console uploads cannot exceed 100 MB (load from Cloud Storage for larger files) |
| Schema on bq command line | No `RECORD` (`STRUCT`) type, no field description, no field mode (all `NULLABLE`); use a JSON schema file for those |
| Schema update on append | Add new fields, or relax `REQUIRED` to `NULLABLE`; overwrite always replaces the schema |

### Compression

| Format | Guidance |
|---|---|
| Avro | Preferred format; loads in parallel even when blocks are compressed |
| Parquet | Efficient per-column encoding; loads in parallel |
| ORC | Fast load via parallel stripes; use a stripe size of about 256 MB or less |
| CSV / JSON | `gzip` is the only supported compression; uncompressed files load significantly faster. Files that are themselves compressed (for example by `gzip`) are not supported for Avro, Parquet and ORC |

## Notes

- Load job capacity: by default load jobs use a shared slot pool (reservation `default-pipeline` in job details) with no guaranteed capacity or throughput. Create a slot reservation and assign dedicated `PIPELINE` slots for predictable capacity.
- Pricing: no charge for batch loading with the shared slot pool; data transfer charges apply when the Cloud Storage bucket is in a different location than the dataset.
- Quota: see Load jobs on the Quotas and limits page. The default is 1,500 loads per table per day; a load job every 5 minutes leaves quota for at least 1 retry per job on average.
- Load jobs are atomic: either all records are inserted or none. For retries of a single-job load, the source recommends creating a new table with `WRITE_TRUNCATE`, and retrying with exponential backoff.
- Line ordering is not guaranteed for compressed or uncompressed files.
- Source permissions are broad: `roles/storage.admin` grants full control of the bucket and its objects, and `roles/bigquery.admin` grants full BigQuery administration; the permissions actually needed are the ones listed in the tables above. The source writes `bigquery.user` and `bigquery.jobUser` without the `roles/` prefix.
- Destructive: `--replace` / `WRITE_TRUNCATE` erases existing table data; try it on a disposable dataset first.
- The wildcard `*` may need escaping in the bq tool on some platforms.
- The source also shows Console, C#, Go, Java, PHP and Ruby forms. Format-specific pages (CSV, JSON, Avro, Parquet, ORC, Datastore, Firestore) carry the per-format options.
- Source: https://docs.cloud.google.com/bigquery/docs/batch-loading-data (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [loading-data.md](./loading-data.md)
- [loading-data-cloud-storage-parquet.md](./loading-data-cloud-storage-parquet.md)
