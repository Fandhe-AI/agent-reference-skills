---
source: https://docs.cloud.google.com/bigquery/docs/cloud-storage-transfer-overview
---

# Introduction to Cloud Storage data transfers

The BigQuery Data Transfer Service for Cloud Storage schedules recurring loads from Cloud Storage buckets into BigQuery. The source path and the destination table can both be parameterized, so you can load from buckets organized by date. The service uses load jobs, so BigQuery load job quotas apply.

## Signature / Usage

### Look up a Cloud Storage resource path

Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/storage/ls (gcloud 593.0.0 help).

```bash
gcloud storage ls gs://my-bucket
```

## Options / Props

### Supported file formats

| Format |
|---|
| Comma-separated values (CSV) |
| JSON (newline-delimited) |
| Avro |
| Parquet |
| ORC |

### Write preference

| Write preference | Kind | Behavior |
|---|---|---|
| `APPEND` or `WRITE_APPEND` | Incremental transfer | Appends files modified since the previous successful transfer (compares the file "last modified time", the Cloud Storage `updated` timestamp) |
| `MIRROR` or `WRITE_TRUNCATE` | Truncated transfer | Overwrites the destination table each run with data from all files matching the source URI; with a partition decorator (for example `my_table$20230809`) only that partition is overwritten |

### Quotas and limits (in addition to load job quotas)

| Value | Limit |
|---|---|
| Maximum size per load job transfer run | 15 TB |
| Maximum number of files per transfer run | 10,000 files |

### Wildcard rules

| Pattern | Matches |
|---|---|
| `gs://mybucket/fed-sample*` | `fed-sample000001.csv` and `fed-sample000002.csv`; multiple wildcards allowed, anywhere in the object name |
| `gs://bucket/dir/*` | Files in `dir`, not in the subdirectory `gs://bucket/dir/subdir/` |
| `gs://bucket/dir` | Neither `gs://bucket/dir/file.csv` nor `gs://bucket/file.csv` (no prefix matching without wildcards) |
| `gs://bucket/dir/*/*.csv` | `gs://bucket/dir/subdir/file.csv` |

## Notes

- Resource path: it contains the bucket name and object name, for example `gs://mybucket/myfile.csv`. BigQuery does not support paths with multiple consecutive slashes after the initial double slash: `gs://bucket/my//object//name` is valid in Cloud Storage but does not work in BigQuery (consecutive slashes are converted into a single slash).
- Compression: the supported compression types are the same as for BigQuery load jobs ("Loading compressed and uncompressed data" in the batch loading guide).
- Incremental example: after a failed run, no files are transferred; changes are picked up at the next successful run, with no duplicate data. You can also manually trigger a transfer outside its schedule.
- Warning: the service relies on each source file's "last modified time" to decide what to transfer. Modifying it can skip files or load the same file multiple times.
- Repeating the same incremental or truncated transfer in a day does not duplicate data, but running different transfer configurations that affect the same destination table can duplicate data.
- Pricing: standard BigQuery storage and query pricing applies after transfer. Cross-location transfers are priced by the Cloud Storage bucket location and destination dataset location ("Data transfer within Google Cloud" on the Cloud Storage pricing page).
- The source also shows Console steps to copy the gsutil URI. Cloud Storage itself is in `gcp-storage`.
- Source: https://docs.cloud.google.com/bigquery/docs/cloud-storage-transfer-overview (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [dts-introduction.md](./dts-introduction.md)
- [enable-transfer-service.md](./enable-transfer-service.md)
