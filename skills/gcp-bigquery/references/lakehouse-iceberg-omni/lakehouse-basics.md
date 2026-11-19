---
source: https://docs.cloud.google.com/lakehouse/docs/lakehouse-basics
---

# How Borderless Lakehouse Works

Architecture, resource hierarchy, supported endpoints, table types and query processing sequence of Lakehouse, where BigQuery and open source engines share the same open tables by centralizing metadata in the Lakehouse runtime catalog.

## Signature / Usage

### Create a namespace in a catalog

```bash
gcloud biglake iceberg namespaces create my-namespace \
    --catalog=my-catalog
```

### Query processing sequence for Iceberg tables

1. Submission: you submit a SQL query to Apache Spark, Trino or BigQuery.
2. Metadata request: the engine requests table metadata (and metadata location) from the Lakehouse runtime catalog.
3. Authorization: if the endpoint supports it, the catalog validates the request against IAM and fine-grained security policies.
4. Metadata response: the catalog returns metadata, plus a short-lived token if credential vending is enabled.
5. Data retrieval: the engine reads data files directly from Cloud Storage.
6. Execution: the engine processes the data and returns results.

## Options / Props

### Architecture components

| Component | Description |
|-----------|-------------|
| Storage | Cloud Storage and BigQuery storage; Apache Iceberg is the recommended open table format. Data can stay in other clouds (such as Amazon S3) through cross-cloud connections to supported remote catalogs. |
| Catalog | Lakehouse runtime catalog: single source of truth for metadata; Apache Iceberg REST catalog endpoint and Apache Hive catalog endpoint. Registered tables are automatically registered in Knowledge Catalog. |
| Query engine | BigQuery and open source engines (Apache Spark, Apache Flink, Trino); Managed Service for Apache Spark uses open source Spark with execution optimizations. |
| Governance | Knowledge Catalog: security, lineage and governance policies. |

### Resource hierarchy

| Level | Description |
|-------|-------------|
| Lakehouse runtime catalog | Top-level regional service resource that hosts metadata; implements the open source Apache Iceberg REST Catalog API plus extensions for catalog management. |
| Catalog | Logical container backed by Cloud Storage warehouse locations; the "C" in Project.Catalog.Namespace.Table (P.C.N.T). Its region comes from the `default_location` bucket (multiple-bucket catalog) or the bucket's region (single-bucket catalog). |
| Namespace | Grouping of tables, like a database, schema or BigQuery dataset; same region as its parent catalog; nested namespaces aren't supported; IAM roles can be granted at namespace level. |
| Table | Entity pointing to data in Cloud Storage; metadata holds schema, partitioning and a pointer to the current state through an Apache Iceberg `metadata.json` file. |

### Supported endpoints

| Endpoint | Description |
|----------|-------------|
| Apache Iceberg REST catalog endpoint | Recommended for new workloads; full read and write interoperability. |
| Custom Apache Iceberg catalog for BigQuery endpoint | Earlier integration (`BigQueryMetastoreCatalog` plugin) storing Iceberg definitions in BigQuery datasets. |
| Apache Hive catalog endpoint | Hive metastore (HMS) interface; manages standard Hive and Spark tables rather than Iceberg tables. |

### Table types

| Supported by | Type | Behavior |
|--------------|------|----------|
| Lakehouse runtime catalog (recommended) | Apache Iceberg tables | Created from open source engines, stored in Cloud Storage, managed through the Iceberg REST catalog endpoint. Open source engines read and write; BigQuery can write (Preview) when BigQuery DML is enabled. Custom table paths must be nested under the parent namespace path, and table locations automatically get a random string suffix. V2 tables (GA) and V3 tables (Preview) are supported; V1 tables aren't supported (upgrade to V2 first). |
| Lakehouse runtime catalog | Apache Hive tables | Parquet, ORC, Avro, Delta Lake through the Hive catalog endpoint; open source engines read and write, BigQuery reads. |
| BigQuery | Apache Iceberg tables | Created and managed by BigQuery; metadata in the BigQuery catalog, data and physical metadata in Cloud Storage. |
| BigQuery | Native tables | Fully managed by BigQuery; can be connected to the Lakehouse runtime catalog. |
| BigQuery | External tables | Data and metadata self-managed; delegated access through connections for Cloud Storage, Amazon S3 or Azure Blob Storage. |

## Notes

- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/biglake/iceberg/namespaces/create (gcloud 593.0.0 help)
- Best practices in the source: adopt a medallion architecture (bronze raw, silver cleansed and conformed, gold curated; use BigQuery for the gold consumption layer); use session templates for interactive workloads; assign custom batch identifiers to serverless Spark batch workloads; enable diagnostic bundles and keep driver and executor logs for complex pipelines.
- Naming: the API, gcloud group and IAM names stay `biglake`; the product is now called Lakehouse.
- Source: https://docs.cloud.google.com/lakehouse/docs/lakehouse-basics (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [introduction.md](./introduction.md)
- [key-concepts.md](./key-concepts.md)
- [about-lakehouse-catalogs.md](./about-lakehouse-catalogs.md)
