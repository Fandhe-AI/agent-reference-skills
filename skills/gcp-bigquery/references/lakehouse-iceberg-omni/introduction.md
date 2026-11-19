---
source: https://docs.cloud.google.com/lakehouse/docs/introduction
---

# Borderless Lakehouse Introduction

Borderless Lakehouse (Google Cloud's Lakehouse, formerly BigLake) lets you build open data lakehouses by combining the Apache Iceberg open table format with managed storage, decoupling storage from compute for analytics and AI workloads. The Lakehouse runtime catalog is a serverless metadata service that lets multiple engines (Managed Service for Apache Spark, Apache Flink, Apache Hive, Trino, BigQuery) use a single source of truth without data duplication.

## Signature / Usage

### Create a Lakehouse catalog

```bash
gcloud biglake iceberg catalogs create my-lakehouse-catalog \
    --catalog-type=lakehouse --default-location=gs://my-bucket
```

## Options / Props

### Key benefits

| Benefit | Detail |
|---------|--------|
| Serverless architecture | No server or cluster management; scales automatically. Serverless batch and interactive sessions remove resource contention between jobs. |
| Read and write interoperability | Open source engines and BigQuery read and write the same Apache Iceberg tables (BigQuery writes are Preview). Optional table management (Preview) automates compaction, snapshot expiration and garbage collection. |
| Unified governance | Integration with Knowledge Catalog: central governance policies, semantic search, data lineage, quality checks. |
| Storage extensions | Cloud Storage features such as Autoclass tiering and customer-managed encryption keys (CMEK). |
| Fully managed experience | Fully managed analytics and AI experience when integrated with BigQuery. |
| High availability and disaster recovery | Cross-region replication and disaster recovery (Preview). |

### Use cases

| Use case | Detail |
|----------|--------|
| Open lakehouse | Cloud Storage as the storage layer; Lakehouse provides management and governance for Apache Iceberg data. |
| Analytical and transactional integration | Access analytical Apache Iceberg tables directly in AlloyDB for PostgreSQL (Preview). |
| Unified access | Apache Spark, Apache Flink and BigQuery use the same Apache Iceberg tables with consistent metadata. |
| Cross-cloud analytics and AI | Federated catalogs synchronize metadata from Databricks Unity Catalog, AWS Glue Data Catalog, Snowflake Horizon Catalog, Workday Data Lake and SAP Business Data Cloud (SAP BDC) so you can query without migrating data. |
| Public dataset exploration | Query public datasets through the Apache Iceberg REST catalog endpoint. |
| Hive metastore | Connect Apache Spark and Apache Hive through the Apache Hive catalog endpoint instead of a self-hosted Hive metastore (HMS). |
| Metastore modernization | Migrate metadata from Dataproc Metastore or other external metastores without copying data files. |

### Interfaces and tools

| Interface | Detail |
|-----------|--------|
| Google Cloud console | Create catalogs, view properties and audit logs, configure permissions. |
| BigQuery SQL | GoogleSQL queries on Apache Iceberg tables in the Lakehouse runtime catalog and on external tables; DDL and DML (Preview) to create and modify Iceberg tables in the catalog. |
| Google Cloud CLI, REST API, Terraform | Programmatic management of catalogs, namespaces, tables and access policies. |
| Open source engines | Apache Spark, Apache Flink, Trino, Apache Hive read and write data. |
| IDEs and notebooks | Interactive Apache Spark notebooks and IDE extensions such as the Data Agent Kit (DAK) extension for VS Code. |
| Orchestration and MLOps | Managed Service for Apache Airflow (formerly Cloud Composer) and Kubeflow Pipelines in Vertex AI. |
| Apache Iceberg REST Catalog API | Any tool compatible with the open Apache Iceberg REST specification. |
| Table versions | Apache Iceberg V2 tables (General Availability) and V3 tables (Preview) are supported; Iceberg V1 tables aren't supported. |

## Notes

- Naming: the API, gcloud group and IAM names stay `biglake` (`biglake.googleapis.com`, `gcloud biglake`); the product is now called Lakehouse.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/biglake/iceberg/catalogs/create (gcloud 593.0.0 help)
- The tables themselves are queried and managed in BigQuery; Knowledge Catalog (see `gcp-knowledge-catalog`) catalogs them. Cloud Storage, AlloyDB and the other products mentioned are covered by their own skills.
- Source: https://docs.cloud.google.com/lakehouse/docs/introduction (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [lakehouse-basics.md](./lakehouse-basics.md)
- [key-concepts.md](./key-concepts.md)
- [about-lakehouse-catalogs.md](./about-lakehouse-catalogs.md)
