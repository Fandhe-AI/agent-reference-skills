---
source: https://docs.cloud.google.com/bigquery/docs/omni-introduction
---

# Introduction to BigQuery Omni

BigQuery Omni is a multi-cloud analytics solution that runs BigQuery analytics on data stored in Amazon S3 or Azure Blob Storage through BigLake tables, running the BigQuery query engine in the other cloud so that data isn't copied. To use it, you first connect to Amazon S3 or Blob Storage and then create a BigLake table that references the external storage.

## Signature / Usage

### Find metadata cache refresh jobs for S3-based BigLake tables

```sql
SELECT *
FROM `region-us.INFORMATION_SCHEMA.JOBS_BY_PROJECT`
WHERE job_id LIKE '%metadata_cache_refresh%'
AND creation_time > TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 6 HOUR)
ORDER BY start_time DESC
LIMIT 10;
```

## Options / Props

### Locations

BigQuery Omni processes queries in the same location as the dataset that contains the tables being queried; the dataset location can't be changed after creation. Data resides in your AWS or Azure account. Omni regions support Enterprise edition reservations and on-demand compute (analysis) pricing.

| Cloud | Region description | Region name | Colocated BigQuery region |
|-------|--------------------|-------------|---------------------------|
| AWS | AWS - US East (N. Virginia) | `aws-us-east-1` | `us-east4` |
| AWS | AWS - US West (Oregon) | `aws-us-west-2` | `us-west1` |
| AWS | AWS - Asia Pacific (Seoul) | `aws-ap-northeast-2` | `asia-northeast3` |
| AWS | AWS - Asia Pacific (Sydney) | `aws-ap-southeast-2` | `australia-southeast1` |
| AWS | AWS - Europe (Ireland) | `aws-eu-west-1` | `europe-west1` |
| AWS | AWS - Europe (Frankfurt) | `aws-eu-central-1` | `europe-west3` |
| Azure | Azure - East US 2 | `azure-eastus2` | `us-east4` |

### Omni tools compared

| | Omni joins | Omni materialized views | Transfer using `SELECT` | Transfer using `LOAD` |
|---|---|---|---|---|
| Suggested usage | One-time queries joining local tables or two Omni regions (for example AWS and Azure); data not large; caching not required. | Repeated or scheduled incremental transfer where caching matters, for example a dashboard. | One-time queries from an Omni region to a BigQuery region needing manual control (caching, optimization) or complex queries unsupported by joins and materialized views. | Migrate large datasets as-is without filtering, using scheduled queries. |
| Filtering before moving data | Yes; limits on some operators | Yes; limits on operators such as aggregate functions and `UNION` | Yes; no operator limits | No |
| Transfer size limit | 60 GB per transfer | No limit | 60 GB per transfer | No limit |
| Compression | Wire compression | Columnar | Wire compression | Wire compression |
| Caching | Not supported | Supported with cache-enabled tables with materialized views | Not supported | Not supported |
| Egress pricing | AWS egress and inter-continental cost | AWS egress and inter-continental cost | AWS egress and inter-continental cost | AWS egress and inter-continental cost |
| Compute for transfer | Slots in the source region (reservation or on-demand) | Not used | Slots in the source region (reservation or on-demand) | Not used |
| Compute for filtering | Slots in the source region | Slots in the source region (local materialized views and metadata) | Slots in the source region | Not used |
| Incremental transfer | Not supported | Supported for non-aggregate materialized views | Not supported | Not supported |

### Limitations (in addition to the BigLake table limitations)

| Area | Limitation |
|------|------------|
| Editions | Working with data in any Omni region isn't supported by the Standard and Enterprise Plus editions. |
| INFORMATION_SCHEMA | `OBJECT_PRIVILEGES`, `STREAMING_TIMELINE_BY_*`, `TABLE_SNAPSHOTS`, `TABLE_STORAGE`, `TABLE_CONSTRAINTS`, `KEY_COLUMN_USAGE`, `CONSTRAINT_COLUMN_USAGE` and `PARTITIONS` views aren't available for S3 and Blob Storage BigLake tables. |
| Features | No materialized views for Blob Storage; no JavaScript UDFs; no BigQuery ML statements; no DDL that requires BigQuery-managed data (`CREATE EXTERNAL TABLE`, `CREATE SCHEMA`, `CREATE RESERVATION` are supported, `CREATE TABLE` is not); no DML statements. |
| Temporary tables | Querying destination temporary tables with `SELECT` isn't supported. |
| Scheduled queries | Only through the API or CLI; the destination table option is disabled; only `EXPORT DATA` queries are allowed. |
| Storage API | The BigQuery Storage API isn't available in Omni regions. |
| `ORDER BY` | A query with `ORDER BY` and a result larger than 256 MB fails. |
| Encryption | CMEK with datasets and external tables isn't supported. |

### Quotas and metadata caching

| Item | Value |
|------|-------|
| Result size guidance | If a query result is larger than 20 GiB, consider exporting results to Amazon S3 or Blob Storage. |
| Maximum staleness | 30 minutes to 7 days. |
| Automatic refresh | System-defined interval, usually 30 to 60 minutes. |
| Manual refresh | `BQ.REFRESH_EXTERNAL_METADATA_CACHE` system procedure; only one of multiple concurrent manual refreshes succeeds. |
| Cache expiry | 7 days if not refreshed. |
| Refresh priority | `INTERACTIVE`. |

## Notes

- Some features may not be available in reservations created with certain BigQuery editions.
- Architecture: the BigQuery control plane sends query jobs to the data plane on AWS or Azure through a VPN connection; the data plane reads from your S3 bucket or Blob Storage and processes data in the specified region; results go back through the VPN and are stored by the control plane for up to 24 hours. Results can instead be written directly to S3 or Blob Storage with `EXPORT DATA`, with no cross-cloud movement.
- Access uses standard AWS IAM roles or Azure Active Directory principals that you delegate and can revoke at any time; write access is only needed to write query results back.
- Materialized view replicas make S3 data available in a supported BigQuery region for joins; they can only be created over authorized materialized views.
- For automatic refreshes, the source recommends a reservation with a `BACKGROUND` assignment for the project that runs refresh jobs. Prices are on the BigQuery Omni pricing page.
- Alternatives for moving data: Storage Transfer Service (see `gcp-storage`) and the BigQuery Data Transfer Service (no filtering).
- Source: https://docs.cloud.google.com/bigquery/docs/omni-introduction (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [biglake-intro.md](./biglake-intro.md)
- [biglake-iceberg-tables-in-bigquery.md](./biglake-iceberg-tables-in-bigquery.md)
