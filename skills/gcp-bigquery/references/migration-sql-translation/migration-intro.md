---
source: https://docs.cloud.google.com/bigquery/docs/migration-intro
---

# Introduction to BigQuery migration

The BigQuery Migration Service is a solution for migrating a data warehouse to BigQuery. It provides tools for assessment and planning, SQL translation for a variety of SQL dialects, and data transfer. In the Google Cloud console, open the **BigQuery** page and select **Migration > Services**.

## Signature / Usage

### Translate a batch of SQL files (one of the Migration Service tools)

```bash
gcloud alpha bq migration translate-batch \
    --source-dialect=SOURCE_DIALECT \
    --target-dialect=TARGET_DIALECT \
    --location=LOCATION \
    --source-gcs-uris=SOURCE_URI \
    --target-gcs-path=TARGET_URI
```

## Options / Props

### Migration Service capabilities

| Capability | Description |
|------------|-------------|
| Assess | Plan the migration by running a BigQuery migration assessment. |
| Translate SQL | Convert SQL queries into GoogleSQL, including Gemini-enhanced SQL customization. Use the batch SQL translator, the interactive SQL translator, the SQL translation API, or the BigQuery Migration Service MCP server. |
| Transfer data | Set up a data transfer that loads data from the source into BigQuery (BigQuery Data Transfer Service). |
| Register or migrate open lakehouse | Migrate metadata from external catalogs, such as Apache Hive Metastore and Apache Iceberg REST Catalogs, to Lakehouse REST catalog tables for Apache Iceberg. |

### Supported migration sources

| Source |
|--------|
| Amazon Redshift |
| Hadoop, Hive, and Apache Spark |
| IBM Netezza |
| Oracle and Oracle Exadata |
| Snowflake |
| Teradata |

### Open-source tools named in the source

| Tool | Purpose |
|------|---------|
| Data migration tool | Automates warehouse migration using BigQuery Data Transfer Service, the translation services, and the data validation tool (transfer, translate and validate DDL, DML, and SQL queries). |
| Data validation tool | Validates that source and destination tables match after migration. |
| BigQuery permission mapper | Automates creation and maintenance of permission maps; outputs JSON and Terraform scripts for BigQuery group, user, and binding creation. |
| Managed Service for Apache Airflow templates | Simplify creating Airflow DAGs or migrating orchestrated jobs to the cloud. |
| Cloud Foundation Fabric | Terraform examples and modules for Google Cloud. |

## Notes

- Quotas and limits apply to the number of jobs and the size of files; see the BigQuery quotas page, section "migration-api-limits".
- Pricing: there is no charge to use the BigQuery Migration API. Storage used for input and output files incurs the normal fees (see the BigQuery pricing page). The cost estimation functionality in Google Cloud Migration Center can estimate the cost of running the migrated data warehouse.
- Snippet taken from https://docs.cloud.google.com/bigquery/docs/batch-sql-translator (the `gcloud alpha` command is a Preview command; the source shows it with the Pre-GA Offerings Terms notice).
- Source: https://docs.cloud.google.com/bigquery/docs/migration-intro (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [enable-sql-translations.md](./enable-sql-translations.md)
- [batch-sql-translator.md](./batch-sql-translator.md)
- [interactive-sql-translator.md](./interactive-sql-translator.md)
- [schema-data-overview.md](./schema-data-overview.md)
