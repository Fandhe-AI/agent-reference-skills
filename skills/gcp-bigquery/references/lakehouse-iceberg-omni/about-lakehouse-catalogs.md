---
source: https://docs.cloud.google.com/lakehouse/docs/about-lakehouse-catalogs
---

# About the Lakehouse Runtime Catalog

The Lakehouse runtime catalog is a fully managed, serverless metastore that centralizes table metadata for borderless Lakehouse so engines such as Apache Spark, Apache Flink, Apache Hive and BigQuery share tables without duplicating files. Client endpoints such as the Apache Iceberg REST catalog endpoint connect engines to it, and Cloud Storage stores metadata and data files.

## Signature / Usage

### List tables in a namespace

```bash
gcloud biglake iceberg tables list --namespace=my-namespace \
    --catalog=my-catalog
```

## Options / Props

### Architecture layers

| Layer | Core Iceberg concept | Lakehouse implementation |
|-------|----------------------|--------------------------|
| Catalog | Holds a pointer to the latest metadata file; provides ACID compliance and transaction isolation. | Top-level regional metastore service in which you create catalogs; manages transaction commits, credential vending and pointer management. |
| Metadata | Metadata files (schema, partition spec, snapshot pointers), manifest lists (one snapshot), manifest files (file paths, partition info, column statistics). | Namespaces and tables per catalog; generates and manages the Iceberg metadata hierarchy starting at a root `metadata.json`, persisted in your warehouse storage location. |
| Data | Raw data in columnar or row-based open formats (Parquet, ORC, Avro). | Data files in Cloud Storage (`gs://`) warehouse locations; short-lived tokens through credential vending avoid broad IAM permissions on buckets. |

### Supported engines

| Engine | Documentation |
|--------|---------------|
| Apache Spark | Use with Apache Spark |
| Apache Hive | Use with Spark and the Hive catalog |
| Apache Flink | Use with Apache Flink |
| Trino | Use with Trino |

### Choosing an endpoint

| Use case | Recommendation |
|----------|----------------|
| New users whose open source engine accesses Cloud Storage data and needs interoperability with BigQuery and AlloyDB for PostgreSQL | Apache Iceberg REST catalog endpoint |
| Apache Hive or Spark workloads that depend on the Hive Metastore interface and want a fully managed metastore | Apache Hive catalog endpoint |
| Existing users with tables created through the custom Apache Iceberg catalog for BigQuery endpoint | Continue with that endpoint; use the Iceberg REST catalog endpoint for new workflows |

### Limitations when querying through BigQuery

| Area | Limitation |
|------|------------|
| Table management | Iceberg V2 (GA) and V3 (Preview) supported; V1 tables aren't supported and must be upgraded to V2 first. |
| Table management | No renaming operations or `ALTER TABLE ... RENAME TO` Spark SQL statement. |
| Table management | No BigQuery clustering. |
| Table management | No extract jobs (applies to `EXPORT DATA` and `bq extract`). |
| Table management | BigQuery can't query or manage Apache Iceberg views; they are usable only from Iceberg-compatible open source engines (Preview). |
| Querying | Performance from the BigQuery engine might be slower than standard BigQuery tables; generally equivalent to reading from Cloud Storage. |
| Querying | A BigQuery dry run might report a lower bound of 0 bytes even if rows are returned; running the query incurs a cost for processing the data. |
| Querying | A table can't be referenced in a wildcard table query. |
| API and metadata | `tabledata.list` can't retrieve data; save query results to a BigQuery table first. |
| API and metadata | Table storage statistics aren't displayed. |
| Quotas | Same quotas and limits as standard tables. |

## Notes

- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/biglake/iceberg/tables/list (gcloud 593.0.0 help)
- Individual catalog endpoints (Iceberg REST or Hive) might have additional endpoint-specific limitations.
- BigLake metastore (classic) is a legacy feature and no longer recommended; the Lakehouse runtime catalog is the recommended metastore. Differences: direct integration with open source engines such as Spark, and support for the Apache Iceberg REST catalog endpoint (which classic doesn't have).
- Naming: the API, gcloud group and IAM names stay `biglake`; the product is now called Lakehouse.
- Source: https://docs.cloud.google.com/lakehouse/docs/about-lakehouse-catalogs (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [introduction.md](./introduction.md)
- [lakehouse-basics.md](./lakehouse-basics.md)
- [key-concepts.md](./key-concepts.md)
