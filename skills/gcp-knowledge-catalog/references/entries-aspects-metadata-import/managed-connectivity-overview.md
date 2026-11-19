---
source: https://docs.cloud.google.com/knowledge-catalog/docs/managed-connectivity-overview
---

# Managed connectivity pipelines

Managed connectivity pipelines extract and import metadata at scale from third-party data sources into Knowledge Catalog (formerly Dataplex Universal Catalog) using custom connectors and Workflows. Run them on demand or on a recurring schedule to keep the catalog synchronized.

## Signature / Usage

How it works:

1. Build a custom connector that extracts metadata from a data source (for example MySQL, SQL Server, Oracle, Snowflake, Databricks), or use a community-contributed connector. The connector must be an Artifact Registry image that can run on Managed Service for Apache Spark.
2. Run the managed connectivity pipeline in Workflows.
3. The pipeline creates the target entry group if it doesn't exist, runs the connector (which generates a metadata import file), monitors the extraction, runs a metadata import job, and monitors that job.

The pipeline uses Managed Service for Apache Spark to run the connector and the metadata import API methods to run the import job. The imported metadata consists of entries and their aspects.

The final step is a metadata import job. A request that creates one (Snippet taken from the metadata import API page):

```bash
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://dataplex.googleapis.com/v1/projects/TARGET_PROJECT_NUMBER/locations/LOCATION_ID/metadataJobs?metadataJobId=METADATA_JOB_ID"
```

## Options / Props

### Community-contributed custom connectors

Repository base: `https://github.com/GoogleCloudPlatform/cloud-dataplex/tree/main/managed-connectivity/community-contributed-connectors/`

| Data source | Repository directory |
|---|---|
| AWS Glue Data Catalog | `aws-glue-connector` |
| Databricks Unity Catalog | `databricks-connector` |
| MySQL | `mysql-connector` |
| Oracle | `oracle-connector` |
| PostgreSQL | `postgresql-connector` |
| Snowflake | `snowflake-connector` |
| Snowflake Horizon Catalog | `snowflake-horizon-connector` |
| SQL Server | `sql-server-connector` |

## Notes

- Snippet taken from https://docs.cloud.google.com/knowledge-catalog/docs/import-metadata (the `metadataJobs.create` curl request; it needs a `request.json` body, see import-metadata.md). The source twin for this page has no code block.
- Community-contributed connectors are not officially supported by Google; see each connector's README for setup.
- Related pages named by the source: import metadata from a custom source using Workflows, develop a custom connector for metadata import.
- Source: https://docs.cloud.google.com/knowledge-catalog/docs/managed-connectivity-overview (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [import-metadata.md](./import-metadata.md)
- [connectors.md](./connectors.md)
