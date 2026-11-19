---
source: https://docs.cloud.google.com/bigquery/docs/migration/schema-data-overview
---

# Schema and data transfer overview

Guidance for moving a data warehouse schema and data to BigQuery in staged iterations: transfer tables as-is first, redirect downstream and upstream processes, then evolve the schema (partitioning, clustering, facade views, nested and repeated fields).

## Signature / Usage

### Copy translated output from Cloud Storage to a local directory

```bash
gcloud storage cp --recursive TARGET_URI LOCAL_DIRECTORY
```

## Options / Props

### Migration iteration flows

| Flow | Meaning |
|------|---------|
| Existing | Data and processes unchanged, centered on the existing data warehouse. |
| Offloaded | Upstream processes feed the existing warehouse, data is offloaded to BigQuery, and it feeds downstream processes. |
| Fully migrated | Upstream and downstream processes no longer write or read the existing warehouse. |

### Schema evolution steps (per use case)

| Step | Action |
|------|--------|
| 1 | Transfer the use case as is; upstream and downstream processes write to and read from BigQuery (an intermediate state with only downstream reading is possible). |
| 2 | Light optimizations: re-create tables with partitioning and clustering (create a table from a query result), then redirect processes to the new tables. |
| 3 | Create facade views that hide table changes from downstream processes. |
| 4 | Transform downstream processes to read from the facade views. |
| 5 | Transform upstream processes to write the new schema (views are read-only, so create tables on the new schema and modify the facade view definitions; views can `UNION` old and new tables). Nested and repeated fields can be used here. |
| 6 | Fully evolve: change facade view definitions to stop reading the source schema, retire source tables. If the views do not aggregate or filter, downstream can read the evolved tables and the views can be retired. |

### Initial transfer methods

| Source | Methods |
|--------|---------|
| Amazon Redshift or Teradata | BigQuery Data Transfer Service loads schema and data directly; Cloud Storage is still used for staging. |
| Any warehouse | Extract files, upload them to Cloud Storage, then load with BigQuery Data Transfer Service, the BigQuery Storage Write API (gRPC), or batch load. |

### Upload options to Cloud Storage

| Situation | Option |
|-----------|--------|
| Data in another cloud provider | Storage Transfer Service |
| On-premises or colocation with good bandwidth | Google Cloud CLI (multi-threaded parallel uploads, resumes after errors, encrypts traffic in transit) |
| gcloud CLI unusable | Third-party tool from a Google partner |
| Limited bandwidth | Compression, or increase the connection bandwidth |
| Insufficient bandwidth | Offline transfer with Transfer Appliance |

### ETL options for transformation during load

| Tool | Notes |
|------|-------|
| Cloud Data Fusion | Graphical, fully managed ETL/ELT pipelines. |
| Dataflow | Apache Beam model; serverless and fully managed. |
| Managed Service for Apache Spark | Runs Apache Spark and Apache Hadoop clusters. |
| Third-party tools | Partner tools. |

## Notes

- Recommended extract formats: Avro, ORC or Parquet (schema embedded). With CSV or similar delimited formats the schema must be specified separately (for batch upload, specify it at load time or use auto-detection).
- Choose the Cloud Storage bucket location closest to your data center, and if possible the same location as the BigQuery dataset.
- Validate the transferred data with the open-source Data Validation Tool (DVT, Python CLI), which compares aggregations such as count, sum, and average between sources and the BigQuery target.
- For near-instant data freshness use a streaming approach (streaming Dataflow templates or a partner solution); otherwise use scheduled transfers (BigQuery Data Transfer Service with a table name pattern and a recurrent schedule).
- Partitioning works on a `TIMESTAMP` or `DATE` column, or BigQuery can add pseudocolumns to partition at ingestion; it does not change the structure of the tables. BigQuery uses no indexes; clustering sorts data by chosen columns.
- BigQuery supports star and snowflake schemas, but its native representation uses nested and repeated fields, which reduce joins.
- Snippet taken from https://docs.cloud.google.com/bigquery/docs/batch-sql-translator
- The source says partitioning works on a `TIMESTAMP` or `DATE` column; the DDL reference also partitions on a `DATETIME` column (`DATETIME_TRUNC`) and on `INT64` ranges (`RANGE_BUCKET`).
- Source: https://docs.cloud.google.com/bigquery/docs/migration/schema-data-overview (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [migration-intro.md](./migration-intro.md)
- [batch-sql-translator.md](./batch-sql-translator.md)
- [interactive-sql-translator.md](./interactive-sql-translator.md)
