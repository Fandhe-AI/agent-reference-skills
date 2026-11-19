---
source: https://docs.cloud.google.com/bigquery/docs/biglake-intro
---

# Introduction to BigLake Tables

BigLake tables let you query structured data in Cloud Storage, Amazon S3 and Azure Blob Storage with access delegation: a connection associated with a service account reads the data, so users are granted access only to the BigLake table and not to the underlying datastore. This enables row-level and column-level security (and dynamic data masking for Cloud Storage-based tables), metadata caching, and BigQuery Omni joins.

## Signature / Usage

### BigQuery Omni join

```sql
SELECT
  l_shipmode,
  o_orderpriority,
  count(l_linenumber) AS num_lineitems
FROM bigquery_dataset.orders
JOIN aws_dataset.lineitem
  ON orders.o_orderkey = lineitem.l_orderkey
WHERE
  l_shipmode IN ('AIR', 'REG AIR')
  AND l_commitdate < l_receiptdate
  AND l_shipdate < l_commitdate
  AND l_receiptdate >= DATE '1997-01-01'
  AND l_receiptdate < DATE '1997-02-01'
GROUP BY l_shipmode, o_orderpriority
ORDER BY l_shipmode, o_orderpriority;
```

BigQuery splits the query into a local part and a remote part. The remote part runs in the BigQuery Omni region as a `CREATE TABLE AS SELECT` (CTAS) child job that creates a temporary table in the BigQuery region, deleted automatically after eight hours:

```sql
CREATE OR REPLACE TABLE temp_table
AS (
  SELECT
    l_shipmode,
    l_linenumber,
    l_orderkey
  FROM aws_dataset.lineitem
  WHERE
    l_shipmode IN ('AIR', 'REG AIR')
    AND l_commitdate < l_receiptdate
    AND l_shipdate < l_commitdate
    AND l_receiptdate >= DATE '1997-01-01'
    AND l_receiptdate < DATE '1997-02-01'
);
```

The `LIMIT` clause is not pushed down to the Omni region in the following query; all `FURNITURE` customers are transferred first, then the limit of 10 is applied:

```sql
SELECT c_mktsegment, c_name
FROM bigquery_dataset.customer
WHERE c_mktsegment = 'BUILDING'
UNION ALL
SELECT c_mktsegment, c_name
FROM aws_dataset.customer
WHERE c_mktsegment = 'FURNITURE'
LIMIT 10;
```

### Find metadata cache refresh jobs

```sql
SELECT *
FROM `region-us.INFORMATION_SCHEMA.JOBS_BY_PROJECT`
WHERE job_id LIKE '%metadata_cache_refresh%'
AND creation_time > TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 6 HOUR)
ORDER BY start_time DESC
LIMIT 10;
```

### Personal Cluster Authentication workaround

```bash
gcloud dataproc clusters enable-personal-auth-session \
    --region=us \
    --project=myproject \
    --access-boundary=<(echo -n "{}") \
    mycluster
```

## Options / Props

### BigQuery Omni join roles (on the project where the join runs)

| Role | Permissions |
|------|-------------|
| BigQuery Data Viewer (`roles/bigquery.dataViewer`) | `bigquery.tables.getData` |
| BigQuery Job User (`roles/bigquery.jobUser`) | `bigquery.jobs.create` |

### BigQuery Omni join limitations

| Limitation | Detail |
|------------|--------|
| Tiers | Not supported in the BigQuery free tier or the BigQuery sandbox. |
| Pushdown | Aggregations might not be pushed down to Omni regions when the query contains `JOIN`; no pushdowns if the query references `STRUCT` columns (consider a view in the Omni region that unpacks fields). |
| Temporary tables | Each is used for a single Omni query and not reused. |
| Transfer size | 60 GB per transfer (a filtered BigLake table result loaded must be under 60 GB); contact Support to raise it. No limit on scanned bytes. |
| Query rate | Internal quota on query rate; exceeding it can return `All our servers are busy processing data transferred between regions`; retry usually works. |
| Locations | Only colocated BigQuery regions with their Omni regions, and the `US` and `EU` multi-regions (which can access only US or EU Omni regions respectively). |
| 10 or more Omni datasets | Might fail with `Not found: Dataset <BigQuery dataset> was not found in location <BigQuery Omni region>`; specify a location explicitly. An explicit BigQuery region with only BigLake tables runs as an Omni query and incurs transfer costs. |
| Unsupported | `_FILE_NAME` pseudo-column; `INTERVAL` or `RANGE` literals in `WHERE` on BigLake columns; collation; joining Omni views with `ORDER BY`. |
| Reporting | Join jobs don't report bytes processed and transferred; see the child CTAS jobs. |
| Authorized views and routines | Referencing Omni tables or views only supported in Omni regions. |

### Metadata caching

| Property | Value |
|----------|-------|
| Supported tables | Amazon S3 and Cloud Storage BigLake tables; formats Avro, ORC, Parquet, JSON, CSV only. |
| Maximum staleness | 30 minutes to 7 days. |
| Metadata cache mode | `AUTOMATIC` (system-defined interval, usually 30 to 60 minutes) or manual (`BQ.REFRESH_EXTERNAL_METADATA_CACHE`; only one of concurrent manual refreshes succeeds). |
| Expiry | Cache expires after 7 days if not refreshed. |
| Priority | Refreshes run with `INTERACTIVE` query priority. |
| Not usable with | Apache Iceberg external tables; CMEK with cached metadata for Amazon S3 or Blob Storage BigLake tables. |

### Costs by pricing model

| | On-demand pricing | Standard, Enterprise, Enterprise Plus editions |
|---|---|---|
| Queries | Billed for bytes processed. | Slots in reservation assignments with a `QUERY` job type. |
| Manual cache refresh | Billed for bytes processed. | Slots in `QUERY` assignments. |
| Automatic cache refresh | Billed for bytes processed. | Slots in `BACKGROUND` assignments; with none available, Enterprise and Enterprise Plus use `QUERY` reservation slots. |

## Notes

- Supported datastores: Amazon S3 and Azure Blob Storage (through BigQuery Omni) and Cloud Storage. Cloud Storage BigLake tables can be temporary or permanent; Amazon S3 and Blob Storage ones must be permanent. A table can use multiple source files with the same schema.
- Supported formats: Avro, CSV, Delta Lake, Iceberg, JSON, ORC, Parquet. BigLake tables are read-only (no DML). The BigQuery Storage API isn't available in other clouds (AWS, Azure). All external table limitations and BigQuery table quotas apply.
- Omni join costs: you incur data transfer costs for referenced BigLake data; only referenced columns and rows are transferred (use a narrow filter). Successful transfers incur costs even if the main query fails.
- Security model: data lake administrators manage connections and bucket IAM; data warehouse administrators create tables and set access controls; analysts read data. Analysts should not have Storage Object Viewer on the bucket, the ability to bind tables to connections (BigQuery Connection Admin), or `bigquery.objectRefs.read` on the connection (BigQuery ObjectRef Reader / Admin), because these circumvent table-level and row-level controls.
- Caution from the source for the Personal Cluster Authentication workaround: an empty credential access boundary removes one layer of protection against stolen credentials from Managed Service for Apache Spark clusters (larger blast radius); the alternative is to disable Personal Cluster Authentication and use the cluster VM service account as a proxy. BigLake doesn't support downscoped credentials from Personal Cluster Authentication.
- Recommendation: use a `BACKGROUND` reservation assignment for the project that runs automatic metadata cache refreshes. Materialized views over metadata cache-enabled BigLake tables work like materialized views over BigQuery storage tables. BigLake tables can be published in BigQuery sharing (formerly Analytics Hub) listings, used with BigQuery ML and scanned by Sensitive Data Protection.
- Costs also include Cloud Storage, Amazon S3 and Azure Blob Storage charges; retrieval from Nearline, Coldline and Archive classes can be significant. API calls BigQuery makes on your behalf aren't charged. See the BigQuery pricing page for prices.
- Naming: BigLake is now called Lakehouse; the API, gcloud group and IAM names stay `biglake`. This page uses the BigLake tables name as the source does.
- Source: https://docs.cloud.google.com/bigquery/docs/biglake-intro (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [omni-introduction.md](./omni-introduction.md)
- [biglake-iceberg-tables-in-bigquery.md](./biglake-iceberg-tables-in-bigquery.md)
