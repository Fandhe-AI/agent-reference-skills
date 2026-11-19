---
source: https://docs.cloud.google.com/lakehouse/docs/key-concepts
---

# Lakehouse Key Concepts

Glossary of borderless Lakehouse terminology: fundamentals, resource hierarchy (catalog, namespace, table), catalog endpoints, table types, table options, ingestion and migration, cross-cloud data access, security and governance, engines, and reliability.

## Signature / Usage

### Warehouse paths and table naming

The warehouse path for a multiple-bucket catalog is `bl://projects/PROJECT_ID/catalogs/CATALOG_ID`; for a single-bucket catalog it is `gs://CLOUD_STORAGE_BUCKET_NAME`. Tables are queried from BigQuery with the P.C.N.T convention `Project.Catalog.Namespace.Table`.

### Create a catalog with vended credentials

```bash
gcloud biglake iceberg catalogs create my-catalog-bucket \
    --catalog-type=gcs-bucket --credential-mode=vended-credentials
```

## Options / Props

### Resource hierarchy and catalog types

| Concept | Definition |
|---------|------------|
| Lakehouse runtime catalog | Centralized, serverless metadata service; single source of truth for Spark, Flink, Trino, BigQuery. Engines connect through catalog endpoints. |
| Catalog | Top-level logical container; defines where table data can be stored and which region serves its metadata. |
| Multiple-bucket catalog (recommended) | Catalog named independently; `default_location` plus up to 128 additional Cloud Storage buckets or subpaths in `restricted_locations`. Warehouse path `bl://projects/PROJECT_ID/catalogs/CATALOG_ID`. |
| Single-bucket catalog | Legacy; locked to one Cloud Storage bucket and inherits the bucket's name. Warehouse path `gs://CLOUD_STORAGE_BUCKET_NAME`. |
| Namespace | Logical grouping of tables within a catalog, similar to a BigQuery dataset. Inherits the parent catalog's region; nesting isn't supported. |
| Table | Entity pointing to data in Cloud Storage; for Iceberg tables the metadata holds schema, partitioning and a pointer to the current state through `metadata.json`. |
| P.C.N.T | Project.Catalog.Namespace.Table, the four-part name used from BigQuery. |

### Catalog endpoints

| Endpoint | Description |
|----------|-------------|
| Apache Iceberg REST catalog endpoint | Implements the Iceberg REST Catalog API; recommended for new workloads; read and write interoperability between open source engines and BigQuery; supports multiple-bucket catalogs, credential vending and cross-region replication (Preview). |
| Apache Hive catalog endpoint | Hive metastore (HMS) interface compatibility; manages standard Hive and Spark tables rather than Iceberg tables; supports CMEK for data in Cloud Storage. |
| Custom Apache Iceberg catalog for BigQuery | Earlier integration using the `BigQueryMetastoreCatalog` plugin; namespaces map to BigQuery datasets. For new workloads use the Iceberg REST catalog endpoint. |

### Table types

| Type | Managed by | Access |
|------|------------|--------|
| Apache Iceberg tables in the Lakehouse runtime catalog | Lakehouse runtime catalog via Iceberg REST endpoint, data in Cloud Storage | Open source engines read and write; BigQuery reads, and writes (Preview) when BigQuery DML is enabled. Recommended for most open lakehouse workloads. |
| Apache Hive tables | Hive catalog endpoint (Parquet, ORC, Avro, Delta Lake) | Open source engines read and write; BigQuery read-only. Delta Lake tables are created with a Delta-compatible engine such as Spark and registered in the metastore. |
| Apache Iceberg managed tables | BigQuery, data in Cloud Storage | Multiple engines read; BigQuery is the only engine that writes. Distinct from Iceberg tables in the runtime catalog. |
| Native tables | BigQuery storage | Can be connected to the Lakehouse runtime catalog. |
| External tables | Self-managed in Cloud Storage, Amazon S3 or Azure Blob Storage, accessed through connections | BigQuery can only read. |

### Table features and options

| Feature | Detail |
|---------|--------|
| Iceberg versions | V2 tables and V3 tables (Preview). V3 supports binary deletion vectors. V1 tables aren't supported; upgrade to V2 first. |
| Table evolution | Change schema or partition spec without rewriting data; flexible column names by default. |
| Time travel | Open source engines: within the retention configured in table properties. BigQuery time travel is limited to seven days. |
| BigQuery DML (Preview) | Set table property `gcp.biglake.bigquery-dml.enabled`; BigQuery then uses DDL and DML (`INSERT`, `UPDATE`, `DELETE`, `MERGE`) while open source engines keep reading and writing. |
| Table management (Preview) | Set table property `gcp.biglake.table-management.enabled`; background compaction (coalesce), snapshot expiration, garbage collection. Requires the catalog to use credential vending. |
| Change history | GoogleSQL `APPENDS` table-valued function for rows appended to Iceberg managed tables in a time range. |
| Metadata caching | Stores a copy of external table metadata in BigQuery storage to avoid reading metadata files from Cloud Storage during queries. |

### Ingestion, migration and cross-cloud

| Concept | Detail |
|---------|--------|
| Batch table imports | Dataflow job builder templates import Apache Iceberg, Delta Lake tables and Parquet files without code. |
| Streaming ingestion | Open source engines (Spark, Kafka), Dataflow, or the BigQuery Storage Write API (gRPC) with transactional, exactly-once writes; BigQuery continuous query output can be written to Iceberg managed tables. |
| CDC | BigQuery CDC ingestion for Iceberg managed tables (Preview); Dataflow migrates CDC logs from Iceberg and Delta Lake tables (Preview). |
| Metastore migration | One-time migration or dry run from Dataproc Metastore to the Iceberg REST or Hive catalog endpoint; migration from external metastores such as Hive metastore (Preview). |
| Federated catalog | Connects to Databricks Unity Catalog, AWS Glue Data Catalog, Snowflake Horizon Catalog, Workday Data Lake or SAP Business Data Cloud (SAP BDC) and exposes tables through the Iceberg REST catalog endpoint. |
| Background metadata refresh | Periodic synchronization of namespace and table metadata based on a refresh interval; authenticates with OIDC token federation or credentials in Secret Manager. |
| Cross-cloud transport | Metadata refresh and query data transport can each go over the public internet or privately over Cross-Cloud Interconnect; federated catalog endpoints can be protected with VPC Service Controls. |
| Cross-cloud caching | Caches file blocks from remote object storage in the Google Cloud region where queries run; disabled by default; opt in on a federated catalog or a BigQuery cross-cloud connection. |
| Identity mode | Service identity (default): refresh and queries run as the catalog's service account. User identity federation: queries run as the end user (supported for Databricks Unity Catalog). |
| SAP BDC integration | Federation synchronizes SAP BDC shares through the Delta Sharing protocol; publishing shares Iceberg tables or Knowledge Catalog data products with SAP BDC. |
| Public datasets | Read-only datasets served through the Iceberg REST catalog endpoint; Google pays for storage, you pay for queries. |

### Security and reliability

| Concept | Detail |
|---------|--------|
| Resource-level access control | IAM policies on catalogs, namespaces and tables. |
| Credential vending | The Iceberg REST catalog endpoint vends short-lived, downscoped storage credentials limited to the table paths a query needs; also required for table management. |
| Connections | BigQuery resource storing credentials; delegates Cloud Storage access to the connection's service account. |
| VPC Service Controls | Perimeters restrict the Lakehouse API (`biglake.googleapis.com`) and the buckets that store table data. |
| Regional endpoints | Requests proceed only if the target catalog resource exists in the endpoint's location (data residency). |
| Audit logging | Cloud Audit Logs record administrative and data access activity. |
| Unified governance | Tables registered in the runtime catalog get entries automatically in Knowledge Catalog (search, lineage, profiling, AI-generated data insights (Preview)). |
| Cross-region replication (Preview) | Copies catalog metadata from a primary to a secondary region when the catalog uses a dual-region or multi-region Cloud Storage bucket; Cloud Storage replicates table data. |
| Failover (Preview) | Switches primary and secondary regions. Soft failover waits for all data to synchronize before the new primary accepts writes; hard failover prioritizes availability even if the previous primary is unreachable. |
| Managed Service for Apache Spark | Serverless batches and serverless interactive sessions; Standard tier (default) and Premium tier (interactive notebook sessions, Lightning Engine); session templates persist common settings. |
| Conversational analytics (Preview) | Natural-language queries over Lakehouse runtime catalog tables in BigQuery, including cross-cloud sources. |

## Notes

- Naming: the API, gcloud group and IAM names stay `biglake`; the product is now called Lakehouse.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/biglake/iceberg/catalogs/create (gcloud 593.0.0 help)
- Medallion architecture (bronze raw, silver cleansed, gold curated, with BigQuery often serving the gold layer) and open interoperability are described as design concepts in the source.
- Source: https://docs.cloud.google.com/lakehouse/docs/key-concepts (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [introduction.md](./introduction.md)
- [lakehouse-basics.md](./lakehouse-basics.md)
- [about-lakehouse-catalogs.md](./about-lakehouse-catalogs.md)
- [biglake-iceberg-tables-in-bigquery.md](./biglake-iceberg-tables-in-bigquery.md)
