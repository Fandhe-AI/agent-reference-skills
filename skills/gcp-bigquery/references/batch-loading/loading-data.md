---
source: https://docs.cloud.google.com/bigquery/docs/loading-data
---

# Introduction to loading data

BigQuery can load data from many sources into BigQuery storage, following either an extract-load-transform (ELT) or an extract-transform-load (ETL) approach. This page maps each loading method (batch, streaming, change data capture, federation) to the Google Cloud service that implements it, and lists programmatic alternatives and ways to query data without loading it.

## Signature / Usage

### Batch load with a `LOAD DATA` statement

A batch load job can be created with the `LOAD DATA` SQL statement (shown here with a Parquet source).

```sql
LOAD DATA OVERWRITE mydataset.mytable
FROM FILES (
  format = 'PARQUET',
  uris = ['gs://bucket/path/file.parquet']);
```

## Options / Props

### Methods shown in the Add data dialog

| Loading method | Description |
|---|---|
| Batch load | Batch loading of large volumes from many sources. For batch or incremental loading from Cloud Storage and other supported sources, use the BigQuery Data Transfer Service, which schedules load jobs (one-time or regular intervals such as daily or monthly) and lets you monitor and log transfers. |
| Streaming load | Near-real-time loading from messaging systems through a BigQuery subscription in Pub/Sub. |
| Change Data Capture (CDC) | Near-real-time replication of row-level changes from databases with Datastream. |
| Federation to external data sources | Access external data without loading it, through Cloud Storage external tables and federated queries; transform with `SELECT` statements over the external data. |

### Programmatic methods

| Loading method | Description |
|---|---|
| Batch load | Load from Cloud Storage or a local file by creating a load job (Avro, CSV, JSON, ORC, or Parquet), or with the `LOAD DATA` statement. Load jobs can be less expensive and less resource-intensive than continuous loading when data changes infrequently. Spark and ETL partners also support batch loading. See Optimize load jobs to avoid the daily load limit. |
| Streaming load | Dataflow for custom streaming sources or preprocessing before high-throughput streaming, or the BigQuery Storage Write API (gRPC) directly. See Optimize load jobs to avoid the daily load limit. |

### Other ways to acquire data

| Option | Description |
|---|---|
| Public data | Query BigQuery public datasets. |
| Shared data | Query datasets shared with you through BigQuery sharing (formerly Analytics Hub). |
| Log data | Cloud Logging can route logs to a BigQuery destination; Observability Analytics runs queries over log data. |

## Notes

- Cloud Data Fusion and third-party ETL partners can also transform and load data into BigQuery. External connections to Cloud Storage, Spanner, AWS or Azure use the BigQuery Connection API.
- Pub/Sub, Datastream, Dataflow and Cloud Storage are separate products; Pub/Sub is covered by the `gcp-messaging-workflows` skill and Cloud Storage by `gcp-storage`.
- Snippet taken from https://docs.cloud.google.com/bigquery/docs/loading-data-cloud-storage-parquet
- Destructive: `LOAD DATA OVERWRITE` replaces the destination table's contents; try it on a disposable dataset first.
- The source also links to data preparation with Gemini in BigQuery, Dataform, the jobs explorer and BigQuery metrics.
- Source: https://docs.cloud.google.com/bigquery/docs/loading-data (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [batch-loading-data.md](./batch-loading-data.md)
- [loading-data-cloud-storage-parquet.md](./loading-data-cloud-storage-parquet.md)
