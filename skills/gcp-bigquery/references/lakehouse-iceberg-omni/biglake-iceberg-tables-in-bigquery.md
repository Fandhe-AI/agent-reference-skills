---
source: https://docs.cloud.google.com/bigquery/docs/biglake-iceberg-tables-in-bigquery
---

# Apache Iceberg Managed Tables in BigQuery

Apache Iceberg managed tables (Apache Iceberg in BigQuery) give the fully managed experience of standard BigQuery tables while storing data (Parquet files plus Iceberg metadata) in Cloud Storage buckets that you own, so open source and third-party engines can work with a single copy of the data. BigQuery is the only engine that writes to them.

## Signature / Usage

### Create a bucket that follows the best practices

```bash
gcloud storage buckets create gs://BUCKET_NAME \
    --project=PROJECT_ID \
    --location=LOCATION \
    --enable-autoclass \
    --public-access-prevention \
    --uniform-bucket-level-access
```

### Create an Iceberg managed table (SQL)

```sql
CREATE TABLE [PROJECT_ID.]DATASET_ID.TABLE_NAME (
COLUMN DATA_TYPE[, ...]
)
CLUSTER BY CLUSTER_COLUMN_LIST
WITH CONNECTION {CONNECTION_NAME | DEFAULT}
OPTIONS (
file_format = 'PARQUET',
table_format = 'ICEBERG',
storage_uri = 'STORAGE_URI');
```

`CLUSTER_COLUMN_LIST` is optional: up to four top-level, non-repeated columns. `CONNECTION_NAME` is for example `myproject.us.myconnection`; `DEFAULT` uses the default connection. `STORAGE_URI` is a fully qualified Cloud Storage URI such as `gs://mybucket/table`.

### Create an Iceberg managed table (REST)

Call `tables.insert` with a table resource like the following.

Adapted (not in the official docs): removed the `[, ...]` repetition placeholder line so the JSON is valid.

```json
{
"tableReference": {
  "tableId": "TABLE_NAME"
},
"biglakeConfiguration": {
  "connectionId": "CONNECTION_NAME",
  "fileFormat": "PARQUET",
  "tableFormat": "ICEBERG",
  "storageUri": "STORAGE_URI"
},
"schema": {
  "fields": [
    {
      "name": "COLUMN_NAME",
      "type": "DATA_TYPE"
    }
  ]
}
}
```

### Load files into an existing managed table

```sql
LOAD DATA INTO MANAGED_TABLE_NAME
FROM FILES (
uris=['STORAGE_URI'],
format='FILE_FORMAT');
```

```bash
bq load \
  --source_format=FILE_FORMAT \
  MANAGED_TABLE \
  STORAGE_URI
```

### Find the table's storage URI

```sql
SELECT
  table_name,
  REGEXP_EXTRACT(ddl, r"storage_uri\s*=\s*\"([^\"]+)\"") AS storage_uri
FROM
  `mydataset`.INFORMATION_SCHEMA.TABLES;
```

## Options / Props

### Required roles

| Role or permission | Granted to | Purpose |
|--------------------|-----------|---------|
| `roles/bigquery.dataOwner`, `roles/bigquery.connectionAdmin` (on the project) | User | Create Iceberg managed tables |
| `roles/bigquery.dataViewer`, `roles/bigquery.user` (on the project) | User | Query Iceberg managed tables |
| `roles/storage.objectUser`, `roles/storage.legacyBucketReader` (on the bucket) | Connection service account | Read and write data in Cloud Storage |

Required permissions: `bigquery.connections.delegate`, `bigquery.jobs.create`, `bigquery.readsessions.create`, `bigquery.tables.create`, `bigquery.tables.get`, `bigquery.tables.getData` on the project; `storage.buckets.get`, `storage.objects.create`, `storage.objects.delete`, `storage.objects.get`, `storage.objects.list` on the bucket.

### Operations outside BigQuery (all cause data loss or unreadable tables)

| Operation | Consequence | Prevention |
|-----------|-------------|------------|
| Add files to the bucket outside BigQuery | Untracked files are deleted by background garbage collection. | Add data only through BigQuery; restrict external write permissions on the bucket. |
| Create a table in a non-empty prefix | Existing files are untracked and deleted. | Create tables only in empty prefixes. |
| Modify or replace data files | Table fails a consistency check and becomes unreadable; no self-serve recovery (contact support). | Modify data only through BigQuery. |
| Two tables on the same or overlapping URIs | Each table's garbage collection deletes the other's files. | Use a unique URI per table. |

### Partitioning

| Item | Detail |
|------|--------|
| Supported partition column types | `DATE`, `DATETIME`, `TIMESTAMP` (time-unit column partitioning; hourly, daily, monthly or yearly). |
| Create | `PARTITION BY` clause, `--time_partitioning_field` and `--time_partitioning_type` flags, or the `timePartitioning` property. |
| Not supported | Other partitioning column types; Iceberg partition evolution. |

### Limitations

| Area | Limitation |
|------|------------|
| Table operations | No rename (`ALTER TABLE RENAME TO`), copy, clone, snapshot, materialized views, authorized views, managed disaster recovery, fail-safe windows or extract jobs. Column-level access control and row-level security are supported. |
| Schema | No empty schema; no `BIGNUMERIC`, `INTERVAL`, `JSON`, `RANGE`, `GEOGRAPHY`, field collations or default value expressions. No `NUMERIC` to `FLOAT` or `INT` to `FLOAT` coercions; no adding nested fields to existing `RECORD` columns with SQL DDL. |
| Loading | Batch loading and `LOAD DATA` only append and don't support schema updates. |
| Overwrite | `TRUNCATE TABLE` unsupported (use `CREATE OR REPLACE TABLE` with the same options, or `DELETE FROM` table `WHERE` true). `CREATE OR REPLACE` can't swap standard and Iceberg managed tables. |
| Query | Not supported as query result destinations (use `CREATE TABLE ... AS query_statement`); `tabledata.list` unsupported; `CHANGES` TVF unsupported (the `APPENDS` TVF is supported). |
| Metadata | Storage size shows 0 bytes; `INFORMATION_SCHEMA.TABLE_STORAGE` excludes them; Iceberg metadata may miss data streamed through the Storage Write API in the last 90 minutes. |
| DML | Only one concurrent mutating DML statement (`UPDATE`, `DELETE`, `MERGE`) per table; others are queued. |

## Notes

- Warning from the source: modifying data files outside BigQuery can cause query failure or data loss; deleting the bucket or making it inaccessible to the connection service account can also cause data loss. If the table is deleted, its data files are not garbage collected.
- Bucket best practices: single-region bucket colocated with the dataset; optional Autoclass; uniform bucket-level access and public access prevention; restrict write and delete permissions; keep the default 7-day soft delete policy. Unsupported Cloud Storage features: object ACLs, customer-supplied encryption keys, object versioning, object lock, bucket lock, restoring soft-deleted objects with the BigQuery API or bq CLI.
- Creating a table needs `WITH CONNECTION`, `file_format = PARQUET` and `table_format = ICEBERG`. Without an existing managed table, a load creates a standard BigQuery table instead.
- Metadata snapshots: export Iceberg V2 metadata with the `EXPORT TABLE METADATA` SQL statement, optionally refreshed by a scheduled query; per-mutation auto-refresh is enabled by contacting bigquery-tables-for-apache-iceberg-help@google.com. The `/data` folder holds Parquet shards and `/metadata` the snapshot.
- Pricing: storage is Cloud Storage billing; storage optimization is billed in Data Compute Units (DCUs) per second; load and export operations use Enterprise edition pay-as-you-go slots (or `PIPELINE` reservations with Enterprise or Enterprise Plus slots if available). See the BigQuery and Iceberg managed table pricing pages.
- The source also shows a `bq mk --table` command with `--file_format`, `--table_format`, `--connection_id` and `--storage_uri`, a `bq query --display_name --schedule` example and a `spark-sql` read example. They are omitted: the first two use flags that the bq CLI reference does not list for `bq mk --table` / `bq query`, and the Spark command is not valid shell as published (a trailing backslash continuation followed by a SQL statement).
- Try the DML and load statements on a disposable dataset first; `LOAD DATA` here only appends.
- Corrected from the official docs: the REST body contained the line `[, ...]` after the field object; removed. The `bq load` block keeps the source's `MANAGED_TABLE` placeholder (the source's variable list names `MANAGED_TABLE_NAME`).
- Source: https://docs.cloud.google.com/bigquery/docs/biglake-iceberg-tables-in-bigquery (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [biglake-intro.md](./biglake-intro.md)
- [key-concepts.md](./key-concepts.md)
