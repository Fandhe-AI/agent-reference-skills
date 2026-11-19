---
source: https://docs.cloud.google.com/knowledge-catalog/docs/fully-qualified-names
---

# Fully qualified names

Fully qualified names are globally unique, case-sensitive resource identifiers used with Knowledge Catalog to refer to Google Cloud and non-Google Cloud resources. They are used for systems with automatic metadata ingestion, and you can provide one when you create a custom entry for a third-party resource.

## Signature / Usage

### Look up an entry

```bash
gcloud dataplex entries lookup entry1 --entry-group=entry-group1 \
    --location=us-central1 --project=test-project
```

### Format rules

- A fully qualified name is a prefix followed by segments delimited with dots; the maximum length is 4,000 characters.
- Surround segments that contain reserved characters, such as colons, dots and whitespace, with backticks. Use double backticks to specify a backtick within a segment.
- Custom formats use the `custom:` prefix. They are not validated and might not be compatible with Knowledge Catalog features; to ease future migration, make them similar to predefined formats.
- Resources referenced in OpenLineage messages with the namespace `custom` are interpreted as custom fully qualified names.

## Options / Props

### Google Cloud: BigQuery

| Resource | Format |
|---|---|
| Dataset | `bigquery:{projectId}.{datasetId}` |
| Table | `bigquery:{projectId}.{datasetId}.{tableId}` |
| View | `bigquery:{projectId}.{datasetId}.{viewId}` |
| Model | `bigquery:{projectId}.{datasetId}.{modelId}` |
| Sharded table | `bigquery:sharded:{projectId}.{datasetId}.{tablePrefix}` |
| Routine | `bigquery:routine:{projectId}.{datasetId}.{routineId}` |
| Connection | `bigquery:connection:{projectId}.{location}.{connectionId}` |

### Google Cloud: BigQuery sharing (formerly Analytics Hub)

| Resource | Format |
|---|---|
| Exchange | `analytics_hub:{projectId}.{location}.{exchangeId}` |
| Listing | `analytics_hub:{projectId}.{location}.{exchangeId}.{listingId}` |

### Google Cloud: Bigtable

| Resource | Format |
|---|---|
| Instance | `bigtable:{projectId}.{instanceId}` |
| Table | `bigtable:{projectId}.{instanceId}.{tableId}` |

### Google Cloud: Cloud SQL for MySQL

| Resource | Format |
|---|---|
| Instance | `cloudsql_mysql:{projectId}.{location}.{instanceId}` |
| Schema | `cloudsql_mysql:{projectId}.{location}.{instanceId}.{schemaId}` |
| Table | `cloudsql_mysql:{projectId}.{location}.{instanceId}.{schemaId}.{tableId}` |

### Google Cloud: Cloud SQL for PostgreSQL

| Resource | Format |
|---|---|
| Instance | `cloudsql_postgresql:{projectId}.{location}.{instanceId}` |
| Database | `cloudsql_postgresql:{projectId}.{location}.{instanceId}.{databaseId}` |
| Schema | `cloudsql_postgresql:{projectId}.{location}.{instanceId}.{databaseId}.{schemaId}` |
| Table | `cloudsql_postgresql:{projectId}.{location}.{instanceId}.{databaseId}.{schemaId}.{tableId}` |

### Google Cloud: Cloud Storage

| Resource | Format |
|---|---|
| Bucket | `gcs:{bucketName}` |
| Path | `gcs:{bucketName}.{virtualPath}` |

### Google Cloud: Knowledge Catalog

| Resource | Format |
|---|---|
| Lake | `dataplex:{projectId}.{location}.{lakeId}` |
| Zone | `dataplex:{projectId}.{location}.{lakeId}.{zoneId}` |
| Table | `dataplex:{projectId}.{location}.{lakeId}.{zoneId}.{tableId}` |
| Fileset | `dataplex:{projectId}.{location}.{lakeId}.{zoneId}.{filesetId}` |

### Google Cloud: Dataproc Metastore

| Resource | Format |
|---|---|
| Service | `dataproc_metastore:{projectId}.{location}.{instanceId}` |
| Database | `dataproc_metastore:{projectId}.{location}.{instanceId}.{databaseId}` |
| Table | `dataproc_metastore:{projectId}.{location}.{instanceId}.{databaseId}.{tableId}` |

### Google Cloud: Looker

| Resource | Format |
|---|---|
| Instance | `looker:{instanceId}` |
| Dashboard | `looker:dashboard:{instanceId}.{folderId}.{dashboardId}` |
| Explore | `looker:explore:{instanceId}.{folderId}.{exploreId}` |
| Look | `looker:look:{instanceId}.{folderId}.{lookId}` |

### Google Cloud: Pub/Sub

| Resource | Format |
|---|---|
| Topic | `pubsub:topic:{projectId}.{topicId}` |
| Subscription | `pubsub:subscription:{projectId}.{subscriptionId}` |

### Google Cloud: Spanner

| Resource | Format |
|---|---|
| Instance | `spanner:{projectId}.{instanceConfigId}.{instanceId}` |
| Database | `spanner:{projectId}.{instanceConfigId}.{instanceId}.{databaseId}` |
| Table | `spanner:{projectId}.{instanceConfigId}.{instanceId}.{databaseId}.{tableId}` |
| View | `spanner:{projectId}.{instanceConfigId}.{instanceId}.{databaseId}.{viewId}` |

### Google Cloud: Vertex AI

| Resource | Format |
|---|---|
| Model | `vertex_ai:model:{projectId}.{locationId}.{modelId}.{version}` |
| Dataset | `vertex_ai:dataset:{projectId}.{locationId}.{datasetId}` |
| FeatureGroup | `vertex_ai:featuregroup:{projectId}.{locationId}.{featureGroupId}` |
| FeatureOnlineStore | `vertex_ai:featureonlinestore:{projectId}.{locationId}.{featureOnlineStoreId}` |
| FeatureView | `vertex_ai:featureonlinestore:{projectId}.{locationId}.{featureOnlineStoreId}.{FeatureViewId}` |

### Non-Google Cloud: Apache Cassandra, Hive, Kafka

| Resource | Format |
|---|---|
| Cassandra cluster | `cassandra:{dns}` |
| Cassandra keyspace | `cassandra:{dns}.{keyspaceId}` |
| Cassandra table | `cassandra:{dns}.{keyspaceId}.{tableId}` |
| Hive instance | `hive_metastore:{dns}` |
| Hive database | `hive_metastore:{dns}.{database}` |
| Hive table | `hive_metastore:{dns}.{database}.{table}` |
| Kafka cluster | `kafka:{dns}` |
| Kafka topic | `kafka:{dns}.{topicId}` |

### Non-Google Cloud: AWS

| Resource | Format |
|---|---|
| Athena catalog | `athena:{catalogId}.{region}` |
| Athena database | `athena:{catalogId}.{region}.{databaseId}` |
| Athena table | `athena:{catalogId}.{region}.{databaseId}.{tableId}` |
| Redshift instance | `redshift:{clusterId}.{region}.{port}` |
| Redshift database | `redshift:{clusterId}.{region}.{port}.{databaseId}` |
| Redshift schema | `redshift:{clusterId}.{region}.{port}.{databaseId}.{schemaId}` |
| Redshift table | `redshift:{clusterId}.{region}.{port}.{databaseId}.{schemaId}.{tableId}` |
| S3 bucket | `s3:{bucket}` |
| S3 path | `s3:{bucket}.{virtualPath}` |
| Glue table | `aws_glue:table:{region}.{accountId}.{dbName}.{tableName}` |

### Non-Google Cloud: Azure

| Resource | Format |
|---|---|
| Blob Storage account | `abs:{account}` |
| Blob Storage container | `abs:{account}.{container}` |
| Blob Storage path | `abs:{account}.{container}.{virtualPath}` |
| Cosmos DB account | `cosmos-db:{accountName}` |
| Cosmos DB database | `cosmos-db:{accountName}.{databaseId}` |
| Cosmos DB container | `cosmos-db:{accountName}.{databaseId}.{containerId}` |
| Data Explorer cluster | `kusto:{clusterName}.{region}` |
| Data Explorer database | `kusto:{clusterName}.{region}.{databaseId}` |
| Data Explorer table | `kusto:{clusterName}.{region}.{databaseId}.{tableId}` |

### Non-Google Cloud: Databricks and file systems

| Resource | Format |
|---|---|
| Databricks metastore | `databricks:{metastoreId}` |
| Databricks catalog | `databricks:{metastoreId}.{catalogId}` |
| Databricks schema | `databricks:{metastoreId}.{catalogId}.{schemaId}` |
| Databricks table | `databricks:{metastoreId}.{catalogId}.{schemaId}.{tableId}` |
| Databricks view | `databricks:{metastoreId}.{catalogId}.{schemaId}.{viewId}` |
| Databricks routine | `databricks:routine:{metastoreId}.{catalogId}.{schemaId}.{routineId}` |
| Databricks volume | `databricks:volume:{metastoreId}.{catalogId}.{schemaId}.{volumeId}` |
| Databricks model | `databricks:model:{metastoreId}.{catalogId}.{schemaId}.{modelId}` |
| Databricks File System instance | `dbfs:{workspace}` |
| Databricks File System path | `dbfs:{workspace}.{path}` |
| Generic File System instance | `filesystem:{dns}` |
| Generic File System path | `filesystem:{dns}.{path}` |
| HDFS instance | `hdfs:{dns}` |
| HDFS path | `hdfs:{dns}.{path}` |

### Non-Google Cloud: relational databases

| Resource | Format |
|---|---|
| IBM DB2 instance / database / schema / table | `db2:{dns}`, `db2:{dns}.{databaseId}`, `db2:{dns}.{databaseId}.{schemaId}`, `db2:{dns}.{databaseId}.{schemaId}.{tableId}` |
| IBM Informix instance / database / schema / table | `informix:{dns}`, `informix:{dns}.{databaseId}`, `informix:{dns}.{databaseId}.{schemaId}`, `informix:{dns}.{databaseId}.{schemaId}.{tableId}` |
| Microsoft SQL Server instance / database / schema / table | `sqlserver:{dns}`, `sqlserver:{dns}.{databaseId}`, `sqlserver:{dns}.{databaseId}.{schemaId}`, `sqlserver:{dns}.{databaseId}.{schemaId}.{tableId}` |
| MySQL instance / schema / table | `mysql:{dns}`, `mysql:{dns}.{schemaId}`, `mysql:{dns}.{schemaId}.{tableId}` |
| Oracle Database instance / database / schema / table | `oracle:{dns}`, `oracle:{dns}.{databaseId}`, `oracle:{dns}.{databaseId}.{schemaId}`, `oracle:{dns}.{databaseId}.{schemaId}.{tableId}` |
| PostgreSQL instance / database / schema / table | `postgresql:{dns}`, `postgresql:{dns}.{databaseId}`, `postgresql:{dns}.{databaseId}.{schemaId}`, `postgresql:{dns}.{databaseId}.{schemaId}.{tableId}` |
| Trino instance / catalog / schema / table | `trino:{dns}`, `trino:{dns}.{catalogId}`, `trino:{dns}.{catalogId}.{schemaId}`, `trino:{dns}.{catalogId}.{schemaId}.{tableId}` |

### Non-Google Cloud: Salesforce, Snowflake, Tableau

| Resource | Format |
|---|---|
| Salesforce SObject | `salesforce:{environment}.{orgId}.{sobject}` |
| Snowflake account | `snowflake:{accountName}` |
| Snowflake database | `snowflake:{accountName}.{databaseId}` |
| Snowflake schema | `snowflake:{accountName}.{databaseId}.{schemaId}` |
| Snowflake table | `snowflake:{accountName}.{databaseId}.{schemaId}.{tableId}` |
| Snowflake view | `snowflake:{accountName}.{databaseId}.{schemaId}.{viewId}` |
| Tableau server | `tableau:{dns}` |
| Tableau site | `tableau:{dns}.{site}` |
| Tableau project | `tableau:project:{dns}.{site}.{projectId}` |
| Tableau data source | `tableau:datasource:{dns}.{site}.{projectId}.{datasourceId}` |
| Tableau workbook | `tableau:workbook:{dns}.{site}.{projectId}.{workbookId}` |
| Tableau sheet | `tableau:sheet:{dns}.{site}.{projectId}.{workbookId}.{sheetId}` |
| Tableau dashboard | `tableau:dashboard:{dns}.{site}.{projectId}.{workbookId}.{dashboardId}` |

## Notes

- Source: https://docs.cloud.google.com/knowledge-catalog/docs/fully-qualified-names (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/entries/lookup (gcloud 593.0.0 help); the page itself has no fenced code.
- Knowledge Catalog was formerly Dataplex Universal Catalog; the `dataplex:` prefix for lakes, zones, tables and filesets is kept.
- The BigQuery formats name BigQuery resources only; the resources themselves are covered by `gcp-bigquery`. Several relational-database rows were merged into one row per product (instance / database / schema / table) from the source's one-row-per-resource tables; the formats are unchanged.

## Related

- [metadata-overview.md](./metadata-overview.md)
