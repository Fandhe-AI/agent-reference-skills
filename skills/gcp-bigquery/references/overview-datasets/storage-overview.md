---
source: https://docs.cloud.google.com/bigquery/docs/storage_overview
---

# Overview of BigQuery storage

BigQuery storage is optimized for analytic queries over large datasets, with high-throughput streaming ingestion and high-throughput reads. Storage and compute are separated and scale independently. Table data is stored in columnar format; metadata is stored free of charge.

## Signature / Usage

### Set the storage billing model on a dataset

Snippet taken from https://docs.cloud.google.com/bigquery/docs/datasets (the `CREATE SCHEMA` block; `storage_billing_model` is the dataset-level setting described below).

```sql
CREATE SCHEMA PROJECT_ID.DATASET_ID
  OPTIONS (
    default_kms_key_name = 'KMS_KEY_NAME',
    default_partition_expiration_days = PARTITION_EXPIRATION,
    default_table_expiration_days = TABLE_EXPIRATION,
    description = 'DESCRIPTION',
    labels = [('KEY_1','VALUE_1'),('KEY_2','VALUE_2')],
    location = 'LOCATION',
    max_time_travel_hours = HOURS,
    storage_billing_model = BILLING_MODEL);
```

## Options / Props

### Key features

| Feature | Description |
|---|---|
| Managed | No provisioning or reservation of storage; you pay for what you use. Compute and storage are priced separately. |
| Durable | Designed for 99.999999999% (11 9's) annual durability; data is replicated across multiple availability zones. |
| Encrypted | All data is encrypted before it is written to disk; Google-managed or your own key. |
| Efficient | Efficient encoding format (Capacitor) optimized for analytic workloads. |

### Table data types

| Type | Description | Billed storage |
|---|---|---|
| Standard tables | Structured data with a schema; columnar. | Yes |
| Table clones | Lightweight, writable copies; only the delta from the base table is stored. | Yes (delta) |
| Table snapshots | Read-only point-in-time copies; restorable; only the delta is stored. | Yes (delta) |
| Materialized views | Precomputed views that periodically cache results in BigQuery storage. | Yes |
| Cached query results | Stored as temporary tables. | No |
| External tables | Only metadata is kept in BigQuery; data stays in the external datastore (for example Cloud Storage). | No (the external store may charge) |

### Storage billing models

| Model | Billed on | Notes |
|---|---|---|
| Logical (default) | Uncompressed size | Time travel and fail-safe storage are included in the base rate. |
| Physical | Compressed size on disk | Time travel and fail-safe are charged separately at active storage rates. |

### Ways to read table data

| Method | Characteristics |
|---|---|
| BigQuery API (`tabledata.list`) | Synchronous paginated serial reads; fastest first row; least efficient, not for high volume. |
| BigQuery Storage API | Streaming, high throughput, server-side column projection and filtering, parallel disjoint streams. |
| Export | Asynchronous copy to Cloud Storage with extract jobs or the `EXPORT DATA` statement; first row can take minutes. |
| Copy | Asynchronous copy of datasets within BigQuery; logical when source and destination location match. |

## Notes

- The storage billing model is set at the dataset level (default logical). After a change, it takes 24 hours to take effect and you must wait 14 days before changing it again. Tables or partitions in long-term storage are not reset to active storage. Query performance and latency are not affected.
- You can modify the time travel window to balance physical storage cost with retention; you can't modify the fail-safe window.
- You can't enroll a dataset in physical storage billing if your organization has any existing legacy flat-rate slot commitments in the same region as the dataset. This doesn't apply to commitments purchased with a BigQuery edition.
- To view table storage metadata, query `INFORMATION_SCHEMA.TABLE_STORAGE` and `INFORMATION_SCHEMA.TABLE_STORAGE_BY_ORGANIZATION`.
- Loading patterns: batch load, streaming (near-real-time availability), and generated data (SQL inserts or query results written to a table).
- If you need to export more than 50 TB per day, use the `EXPORT DATA` statement or the BigQuery Storage API.
- Deleting a table keeps its data for at least the time travel window; afterwards data is cleaned up per the Google Cloud deletion timeline. Metadata-only deletions such as `DROP COLUMN` free storage the next time the affected rows are modified, with no guaranteed time if the table is not modified.
- Snippet taken from https://docs.cloud.google.com/bigquery/docs/datasets (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/bigquery/docs/storage_overview (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Data in Cloud Storage that backs external tables is covered by the `gcp-storage` skill.

## Related

- [time-travel.md](./time-travel.md)
- [table-snapshots-intro.md](./table-snapshots-intro.md)
- [table-clones-intro.md](./table-clones-intro.md)
- [datasets-intro.md](./datasets-intro.md)
