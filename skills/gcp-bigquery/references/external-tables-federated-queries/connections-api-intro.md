---
source: https://docs.cloud.google.com/bigquery/docs/connections-api-intro
---

# Introduction to connections

BigQuery external connections, built on the BigQuery Connection API, let you query data stored outside BigQuery in Google Cloud services such as Cloud Storage or Spanner, or in third-party sources such as Amazon Web Services (AWS) or Microsoft Azure. A connection is encrypted and securely stored in the BigQuery connection service, so database credentials are never sent as cleartext. You give users access to a connection by granting BigQuery connection IAM roles.

## Signature / Usage

### Use a connection when you upgrade an external table to a BigLake table

Snippet taken from the Cloud Storage external tables page (see Notes). `WITH CONNECTION` attaches a connection (`REGION.CONNECTION_ID`, or `DEFAULT` for the default connection) to the table.

```sql
CREATE OR REPLACE EXTERNAL TABLE
  `PROJECT_ID.DATASET.EXTERNAL_TABLE_NAME`
  WITH CONNECTION {`REGION.CONNECTION_ID` | DEFAULT}
  OPTIONS(
    format ="TABLE_FORMAT",
    uris = ['BUCKET_PATH'],
    max_staleness = STALENESS_INTERVAL,
    metadata_cache_mode = 'CACHE_MODE'
    );
```

## Options / Props

### Connection types and what you can do with them

| Connection type | Creating it | What it enables |
|-----------------|-------------|-----------------|
| Amazon S3 (BigQuery Omni) | Connect to Amazon S3 | Create external tables on Amazon S3; query Amazon S3 data; export results to Amazon S3; create datasets based on AWS Glue databases |
| Apache Spark | Connect to Spark (Managed Service for Apache Spark) | Run stored procedures for Spark (Python) in BigQuery |
| Azure Blob Storage (BigQuery Omni) | Connect to Blob Storage | Create external tables on Blob Storage; query Blob Storage data; export results to Blob Storage |
| Google Cloud resource | Create and set up a Cloud resource connection | Remote models (over LLMs, Cloud AI services, or Agent Platform-hosted models), remote functions (Cloud Run functions or Cloud Run), BigLake tables, object tables |
| Spanner | Connect to Spanner | Federated queries |
| Cloud SQL | Connect to Cloud SQL | Federated queries |
| AlloyDB for PostgreSQL | Connect to AlloyDB for PostgreSQL | Federated queries |
| SAP Datasphere (Preview) | Connect to SAP Datasphere | Federated queries |

### Google Cloud resource connection objects

| Object | Description |
|--------|-------------|
| Remote models | `CREATE MODEL` for remote models over LLMs, over Cloud AI services, and over Agent Platform-hosted models |
| Remote functions | Implement functions in any supported language in Cloud Run functions or Cloud Run; a remote function connection connects BigQuery with them |
| BigLake tables | Connect BigLake tables to external data sources while retaining fine-grained BigQuery access control and security for structured and unstructured data in Cloud Storage |
| Object tables | Analyze unstructured data in Cloud Storage |

## Notes

- You don't need a connection to query data in Bigtable and Google Drive.
- SAP Datasphere connections are Preview ("subject to the 'Pre-GA Offerings Terms' ... Pre-GA products and features are available 'as is' and might have limited support").
- BigQuery logs usage and management requests about connections in audit logs (see the BigQuery audit logs overview); Cloud Audit Logs itself is covered by `gcp-observability`.
- BigLake is now called Lakehouse; the twin uses the name BigLake. The "Agent Platform" remote models call Vertex AI models from BigQuery; the Gemini Developer API and the `google-genai` SDK are in `google-gemini-api`.
- Snippet taken from https://docs.cloud.google.com/bigquery/docs/external-data-cloud-storage
- Source: https://docs.cloud.google.com/bigquery/docs/connections-api-intro (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [federated-queries-intro.md](./federated-queries-intro.md)
- [cloud-sql-federated-queries.md](./cloud-sql-federated-queries.md)
- [external-data-sources.md](./external-data-sources.md)
- [external-data-cloud-storage.md](./external-data-cloud-storage.md)
