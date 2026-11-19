---
source: https://docs.cloud.google.com/bigquery/docs/enable-sql-translations
---

# Enable SQL translations for BigQuery migrations

Prerequisites shared by all BigQuery SQL translators (interactive translator, Translation API, batch SQL translator, BigQuery Migration Service MCP server): enable the BigQuery Migration API, grant IAM roles on the `parent` resource, then pick a supported dialect and processing location.

## Signature / Usage

### Use a dialect and location with a translation job

```bash
gcloud alpha bq migration translate-batch \
    --source-dialect=SOURCE_DIALECT \
    --target-dialect=TARGET_DIALECT \
    --location=LOCATION \
    --source-gcs-uris=SOURCE_URI \
    --target-gcs-path=TARGET_URI
```

## Options / Props

### Required IAM roles (on the `parent` resource)

| Role | Purpose |
|------|---------|
| `roles/bigquerymigration.viewer` (MigrationWorkflow Viewer) | Viewing and monitoring migration jobs |
| `roles/bigquerymigration.editor` (MigrationWorkflow Editor) | Submitting migration jobs |
| `roles/storage.objectAdmin` (Storage Object Admin) | Access the input and output files; on the source and destination Cloud Storage bucket |

### Required permissions

| Permission |
|------------|
| `bigquerymigration.workflows.create` |
| `bigquerymigration.workflows.get` |
| `bigquerymigration.workflows.list` |
| `bigquerymigration.workflows.delete` |
| `bigquerymigration.subtasks.get` |
| `bigquerymigration.subtasks.list` |
| `storage.objects.get` |
| `storage.objects.list` |
| `storage.objects.create` |

### Supported dialects (generally available)

| Dialect | Value |
|---------|-------|
| Amazon Redshift SQL | `Redshift2BigQuery_Translation` |
| Apache HiveQL and Beeline CLI | `HiveQL2BigQuery_Translation` |
| IBM Netezza SQL and NZPLSQL | `Netezza2BigQuery_Translation` |
| Snowflake SQL | `Snowflake2BigQuery_Translation` |
| Teradata and Teradata Vantage (SQL, BTEQ, TPT) | `Teradata2BigQuery_Translation` |

### Supported dialects (Preview)

| Dialect | Value |
|---------|-------|
| Apache Impala SQL | `Impala2BigQuery_Translation` |
| Apache Spark SQL | `SparkSQL2BigQuery_Translation` |
| Azure Synapse T-SQL | `AzureSynapse2BigQuery_Translation` |
| GoogleSQL, BigQuery | `Bigquery2Bigquery_Translation` |
| Greenplum SQL | `Greenplum2BigQuery_Translation` |
| IBM DB2 SQL | `Db22BigQuery_Translation` |
| MySQL SQL | `MySQL2BigQuery_Translation` |
| Oracle SQL, PL/SQL, Exadata | `Oracle2BigQuery_Translation` |
| PostgreSQL SQL | `Postgresql2BigQuery_Translation` |
| Trino or PrestoSQL | `Presto2BigQuery_Translation` |
| SQL Server T-SQL | `SQLServer2BigQuery_Translation` |
| SQLite | `SQLite2BigQuery_Translation` |
| Vertica SQL | `Vertica2BigQuery_Translation` |

### Processing locations

| Area | Region names |
|------|--------------|
| Asia Pacific | `asia-southeast3` (Bangkok), `asia-south2` (Delhi), `asia-east2` (Hong Kong), `asia-southeast2` (Jakarta), `australia-southeast2` (Melbourne), `asia-south1` (Mumbai), `asia-northeast2` (Osaka), `asia-northeast3` (Seoul), `asia-southeast1` (Singapore), `australia-southeast1` (Sydney), `asia-east1` (Taiwan), `asia-northeast1` (Tokyo) |
| Europe | `europe-west1` (Belgium), `europe-west10` (Berlin), `eu` (EU multi-region), `europe-north1` (Finland), `europe-west3` (Frankfurt), `europe-west2` (London), `europe-southwest1` (Madrid), `europe-west8` (Milan), `europe-west4` (Netherlands), `europe-west9` (Paris), `europe-north2` (Stockholm), `europe-west12` (Turin), `europe-central2` (Warsaw), `europe-west6` (Zürich) |
| Americas | `us-east5` (Columbus, Ohio), `us-south1` (Dallas), `us-central1` (Iowa), `us-west4` (Las Vegas), `us-west2` (Los Angeles), `northamerica-south1` (Mexico), `us-east4` (Northern Virginia), `us-west1` (Oregon), `us-west8` (Phoenix), `northamerica-northeast1` (Québec), `southamerica-east1` (São Paulo), `us-west3` (Salt Lake City), `southamerica-west1` (Santiago), `us-east1` (South Carolina), `northamerica-northeast2` (Toronto), `us` (US multi-region) |
| Africa | `africa-south1` (Johannesburg) |
| Middle East | `me-central2` (Dammam), `me-central1` (Doha), `me-west1` (Israel) |

## Notes

- Enable the BigQuery Migration API manually (console page `bigquerymigration.googleapis.com`) only if the project was created before February 15, 2022; projects created after that date have it enabled automatically.
- Before translating, the source recommends using the `dwh-migration-dumper` tool to extract DDL schema metadata from the source warehouses; the metadata improves translation accuracy.
- To restrict translation configurations in an organization (for example disallowing Gemini AI suggestions or restricting output types), configure Custom Org Policies for BigQuery Migration Service.
- The source marks some regions with a "Low CO2" label; the label is omitted here.
- Snippet taken from https://docs.cloud.google.com/bigquery/docs/batch-sql-translator (Preview `gcloud alpha` command; the dialect values for `--source-dialect` are lower-case names such as `teradata` in that page's examples).
- Source: https://docs.cloud.google.com/bigquery/docs/enable-sql-translations (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [batch-sql-translator.md](./batch-sql-translator.md)
- [interactive-sql-translator.md](./interactive-sql-translator.md)
- [migration-intro.md](./migration-intro.md)
