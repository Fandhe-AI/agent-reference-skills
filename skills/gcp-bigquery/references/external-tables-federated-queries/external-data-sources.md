---
source: https://docs.cloud.google.com/bigquery/docs/external-data-sources
---

# Introduction to external data sources

External data sources let you query data directly from BigQuery even though the data isn't stored in BigQuery storage, for example data in another Google Cloud database, files in Cloud Storage, or another cloud product. The ways to query external data are BigLake tables, object tables, external tables, and federated queries. External data source tables keep their metadata and schema in BigQuery storage while the data stays in the external source; they live in a dataset and are managed like standard tables (table properties, access controls, queries, and in most cases joins).

## Signature / Usage

### Create an external table over Cloud Storage

Snippet taken from the Cloud Storage external tables page (see Notes). The first line of the statement makes the table permanent in a dataset; the data stays in the bucket.

```sql
CREATE OR REPLACE EXTERNAL TABLE mydataset.sales
  OPTIONS (
  format = 'CSV',
  uris = ['gs://mybucket/sales.csv']);
```

### Use cases

- ELT workloads: load and clean data in one pass and write the cleaned result into BigQuery storage by using a `CREATE TABLE ... AS SELECT` query.
- Join BigQuery tables with frequently changing data from an external source, without reloading the data into BigQuery storage every time it changes.

### Kinds of external data source tables

- BigLake tables: query structured data in external datastores with access delegation. An external connection associated with a service account retrieves the data, so users need access only to the BigLake table. This allows table-level fine-grained security, including row-level and column-level security; for BigLake tables based on Cloud Storage, dynamic data masking is also available. For multi-cloud analytics on Amazon S3 or Blob Storage data, see BigQuery Omni.
- Object tables: analyze unstructured data in Cloud Storage with remote functions or BigQuery ML inference, and join the results with structured data. Object tables also use access delegation through a connection, support row-level security, and let you manage which objects users can access.
- External tables: query structured data in external datastores. You need permissions on both the external table and the external data source.
- Federated queries: send a query statement to an external database (AlloyDB, Spanner, Cloud SQL, Oracle, MySQL, or PostgreSQL) and get the result back as a temporary table. They use the BigQuery Connection API and the `EXTERNAL_QUERY` function; results are converted to GoogleSQL data types.

## Options / Props

### Permissions to query an external table whose data source is in Cloud Storage

| Permission |
|------------|
| `bigquery.tables.getData` |
| `bigquery.jobs.create` |
| `storage.buckets.get` |
| `storage.objects.get` |

### External data source feature comparison

| Feature | BigLake tables | Object tables | External tables | Federated queries |
|---------|----------------|---------------|-----------------|-------------------|
| Uses access delegation | Yes, through a service account | Yes, through a service account | No | Yes, through a database user account (Cloud SQL only) |
| Can be based on multiple source URIs | Yes | Yes | Yes (Cloud Storage only) | Not applicable |
| Row mapping | Rows represent file content | Rows represent file metadata | Rows represent file content | Not applicable |
| Accessible by other data processing tools by using connectors | Yes (Cloud Storage only) | No | Yes | Not applicable |
| Can be joined to other BigQuery tables | Yes (Cloud Storage only) | Yes | Yes | Yes |
| Can be accessed as a temporary table | Yes (Cloud Storage only) | No | Yes | Yes |
| Works with Amazon S3 | Yes (BigQuery Omni) | No | No | No |
| Works with Azure Storage | Yes (BigQuery Omni) | No | No | No |
| Works with Bigtable | No | No | Yes | No |
| Works with Spanner | No | No | No | Yes |
| Works with Cloud SQL | No | No | No | Yes |
| Works with Google Drive | No | No | Yes | No |
| Works with Cloud Storage | Yes | Yes | Yes | No |

## Notes

- BigLake is now called Lakehouse; the twin uses the name BigLake.
- The query-cost model (on-demand vs capacity) is covered on the BigQuery pricing page, not copied here.
- Snippet taken from https://docs.cloud.google.com/bigquery/docs/external-data-cloud-storage
- The other products (Cloud Storage, Bigtable, Spanner, Cloud SQL, AlloyDB) are covered by their own skills.
- Source: https://docs.cloud.google.com/bigquery/docs/external-data-sources (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [external-tables.md](./external-tables.md)
- [external-data-cloud-storage.md](./external-data-cloud-storage.md)
- [federated-queries-intro.md](./federated-queries-intro.md)
- [connections-api-intro.md](./connections-api-intro.md)
