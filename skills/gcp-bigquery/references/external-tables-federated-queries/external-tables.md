---
source: https://docs.cloud.google.com/bigquery/docs/external-tables
---

# Introduction to external tables

External tables let you query structured data in external datastores (Cloud Storage, Bigtable, Google Drive) without loading it into BigQuery storage. Unlike BigLake tables, external tables don't use access delegation, so users need permissions on both the external table and the external data source. For dataset-level access to external data, you can also use external datasets.

## Signature / Usage

### Create a permanent external table over Cloud Storage

Snippet taken from the Cloud Storage external tables page (see Notes).

```sql
CREATE OR REPLACE EXTERNAL TABLE mydataset.sales
  OPTIONS (
  format = 'CSV',
  uris = ['gs://mybucket/sales.csv']);
```

### Permanent and temporary tables

- A permanent table is created in a dataset and linked to the external data source. You can share it with others who also have access to the underlying source (using access controls) and query it at any time.
- A temporary table is created by submitting a command that includes a query; it is not stored in a dataset and cannot be shared. It suits one-time ad hoc queries and ETL processes.

### Multiple source files

A non-BigLake external table based on Cloud Storage can use multiple external data sources if they have the same schema. This isn't supported for non-BigLake external tables based on Bigtable or Google Drive.

### Move a dataset between locations

1. Export the data from the BigQuery tables to a Cloud Storage bucket (no charge for exporting; Cloud Storage storage is charged; exports are subject to the extract job limits).
2. Copy or move the data to a new bucket in the destination location (network egress charges apply between regions).
3. Create a new BigQuery dataset in the new location and load the data from the bucket (loading is free but subject to the load job limits; Cloud Storage storage is charged until you delete the data or bucket).

You can also use Managed Service for Apache Airflow to move and copy large datasets programmatically.

## Options / Props

### Supported datastores (non-BigLake external tables)

| Datastore |
|-----------|
| Cloud Storage |
| Bigtable |
| Google Drive |

### Limitations

| Limitation |
|------------|
| BigQuery does not guarantee data consistency for external data tables; changes to the underlying data while a query is running can result in unexpected behavior. |
| Query performance might be slow compared to a standard BigQuery table and depends on the external storage type (Cloud Storage is faster than Google Drive). If speed matters, load the data into BigQuery instead. |
| External tables are read-only: you cannot modify them using DML or other methods. |
| You cannot use the `TableDataList` JSON API method (`tabledata.list`) to retrieve data from external tables; save query results in a destination table first. |
| You cannot run an export job from an external table; save query results in a destination table, then run an extract job on it. |
| You cannot copy an external table. |
| You cannot reference an external table in a wildcard table query. |
| External tables don't support clustering. They support partitioning in limited ways (see "Querying externally partitioned data"). |
| For external data sources other than Cloud Storage, results are not cached (GoogleSQL queries on Cloud Storage are supported), and you are charged for each query even if repeated. Consider writing the results to a permanent table. |
| You are limited to 16 concurrent queries against a Bigtable external data source. |
| A dry run of a federated query that uses an external table might report a lower bound of 0 bytes even if rows are returned; running the query incurs a cost. |
| You can't use `_object_metadata` as a column name in external tables (reserved for internal use). |
| BigQuery doesn't support the display of table storage statistics for external tables. |
| External tables don't support flexible column names. |
| BI Engine doesn't support queries to external tables. |
| BigQuery doesn't support Data Boost for reading Bigtable data from BigQuery. |
| BigQuery doesn't support time travel or fail-safe data retention windows for external tables. For Apache Iceberg external tables, you can use the `FOR SYSTEM_TIME AS OF` clause to access snapshots retained in your Iceberg metadata. |
| All format-specific limitations apply (CSV, JSON, Parquet, ORC, Avro, Iceberg, Delta Lake). |

### Cloud Storage location requirements (bucket must be colocated with the dataset)

| Bucket location | Required BigQuery dataset location |
|-----------------|------------------------------------|
| Single region `us-central1` (Iowa) | `us-central1` or the `US` multi-region |
| Single region `europe-west4` (Netherlands) | `europe-west4` or the `EU` multi-region |
| Single region `europe-west1` (Belgium) | `europe-west1` or the `EU` multi-region |
| `NAM4` dual-region, or a configurable dual-region including `us-central1` | `us-central1` or the `US` multi-region |
| `EUR4` dual-region, or a configurable dual-region including `europe-west4` | `europe-west4` or the `EU` multi-region |
| `ASIA1` dual-region | `asia-northeast1` (Tokyo) or `asia-northeast2` (Osaka) |
| Configurable dual-region including `australia-southeast1` (Sydney) and `australia-southeast2` (Melbourne) | `australia-southeast1` or `australia-southeast2` (the source says "BigQuery bucket" here) |
| Dataset in the `US` multi-region | Bucket in `US` multi-region, `us-central1`, a dual-region including `us-central1` (such as `NAM4`), or a configurable dual-region including `us-central1` |
| Dataset in the `EU` multi-region | Bucket in `EU` multi-region, `europe-west1` or `europe-west4`, a dual-region including either (such as `EUR4`), or a configurable dual-region including either |

### Other location rules

| Datastore | Rule |
|-----------|------|
| Bigtable | The Bigtable instance must be in the same location as the BigQuery dataset (for example, a dataset in `europe-west1` needs an instance in Belgium). Multi-region dataset locations are not recommended. |
| Google Drive | Location considerations don't apply. |
| Multi-region dataset with multi-region bucket | Not recommended for external tables; performance depends on minimal latency and optimal network bandwidth. |

## Notes

- Optimize Cloud Storage external table queries: consider enabling Rapid Cache (an SSD-backed zonal read cache) for faster reads and lower data transfer fees on multi-region buckets. BigQuery compute can shift between zones, so enable Rapid Cache in all zones of the region where the workload runs; the Rapid Cache recommender helps decide.
- Pricing: you are charged for running the query and bytes read under on-demand (per TiB) pricing, or slot consumption under capacity (per slot-hour) pricing, plus storage and source-application resources (Cloud Storage storage, retrieval for Nearline / Coldline / Archive, cross-region network usage, data processing; no charge for API calls BigQuery makes on your behalf). For ORC or Parquet on Cloud Storage see "Data size calculation" in the cost best practices page. Prices are not copied here.
- The migration steps involve exporting data to Cloud Storage and loading it back; try them on a disposable dataset first.
- Other products (Cloud Storage, Bigtable, Google Drive) are covered by their own skills.
- Source: https://docs.cloud.google.com/bigquery/docs/external-tables (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/bigquery/docs/external-data-cloud-storage

## Related

- [external-data-sources.md](./external-data-sources.md)
- [external-data-cloud-storage.md](./external-data-cloud-storage.md)
- [federated-queries-intro.md](./federated-queries-intro.md)
