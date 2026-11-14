---
source: https://docs.cloud.google.com/iam/docs/roles-permissions
---

# Products owned by gcp-bigquery

## Signature / Usage

Owner skill: `gcp-bigquery` (status: 未収録（予定）). gcloud groups: `biglake`, `bq`, `data-catalog`, `datalineage`, `dataplex`.

| Product | REST service (Discovery) | Overview | gcloud group | IAM role prefix | Roles | Former name | Lifecycle | Docs | Status |
|---|---|---|---|---|---|---|---|---|---|
| Google Cloud Lakehouse | `biglake.googleapis.com` (v1) | The Lakehouse API (formerly BigLake API) provides access to a serverless, fully managed, and highly available metastore that provides a single source of truth for your data lakehouse. It lets multiple engines—including Apache Spark, Google Managed Spark, Apache Flink, Trino and BigQuery—share tables and metadata for key open formats (Apache Iceberg, Apache Hive), and query the same copy of data. Plus, through the Lakehouse runtime catalog federation seamlessly unite your lakehouse ecosystem, letting Iceberg compatible engines on Google Cloud (BigQuery, Google Managed Spark) discover and analyze enterprise data across Snowflake, Databricks, and AWS Glue. | `biglake` | `biglake.` | 4 | BigLake | — | https://cloud.google.com/products/lakehouse | 未収録（予定） |
| BigQuery | `bigquery.googleapis.com` (v2) | A data platform for customers to create, manage, share and query data. | — | `bigquery.` | 24 | — | — | https://cloud.google.com/bigquery/ | 未収録（予定） |
| BigQuery Connection API | `bigqueryconnection.googleapis.com` (v1, v1beta1) | Allows users to manage BigQuery connections to external data sources. | — | `bigqueryconnection.` | 1 | — | — | https://cloud.google.com/bigquery/docs/connections-api-intro | 未収録（予定） |
| BigQuery Continuous Query | — | — | — | `bigquerycontinuousquery.` | 1 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/bigquerycontinuousquery | 未収録（予定） |
| BigQuery Data Policy | `bigquerydatapolicy.googleapis.com` (v1, v2) | Allows users to manage BigQuery data policies. | — | `bigquerydatapolicy.` | 5 | — | — | https://cloud.google.com/bigquery/docs/column-data-masking | 未収録（予定） |
| BigQuery Data Transfer Service | `bigquerydatatransfer.googleapis.com` (v1) | Schedule queries or transfer external data from SaaS applications to Google BigQuery on a regular basis. | — | `bigquerydatatransfer.` | 1 | — | — | https://cloud.google.com/bigquery-transfer/ | 未収録（予定） |
| BigQuery Migration API | — | — | — | `bigquerymigration.` | 9 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/bigquerymigration | 未収録（予定） |
| BigQuery Omni | — | — | — | `bigqueryomni.` | 1 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/bigqueryomni | 未収録（予定） |
| BigQuery sharing | `analyticshub.googleapis.com` (v1, v1beta1) | Exchange data and analytics assets securely and efficiently. | — | `analyticshub.` | 8 | — | — | https://cloud.google.com/bigquery/docs/analytics-hub-introduction | 未収録（予定） |
| Data Catalog | `datacatalog.googleapis.com` (v1, v1beta1) | A fully managed and highly scalable data discovery and metadata management service. | `data-catalog` | `datacatalog.` | 19 | — | Shut down | https://cloud.google.com/data-catalog/docs/ | 未収録（予定） |
| Data Lineage API | `datalineage.googleapis.com` (v1) | — | `datalineage` | `datalineage.` | 4 | — | — | https://cloud.google.com/data-catalog | 未収録（予定） |
| Dataform | `dataform.googleapis.com` (v1, v1beta1) | Service to develop, version control, and operationalize SQL pipelines in BigQuery. | — | `dataform.` | 15 | — | — | https://cloud.google.com/dataform/docs | 未収録（予定） |
| Dataprep by Trifacta | — | — | — | `dataprep.` | 3 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/dataprep | 未収録（予定） |
| Gemini Data Analytics | — | — | — | `geminidataanalytics.` | 9 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/geminidataanalytics | 未収録（予定） |
| Knowledge Catalog | `dataplex.googleapis.com` (v1) | A unified, intelligent governance solution for data and AI assets. | `dataplex` | `dataplex.` | 59 | Dataplex Universal Catalog | — | https://cloud.google.com/dataplex/docs | 未収録（予定） |
| Spark connector for BigQuery | — | — | — | `bigqueryspark.` | 1 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/bigqueryspark | 未収録（予定） |

```bash
gcloud help
gcloud <group> --help
```

The first command lists all groups; the second lists the commands of one group.

## Notes

- Product list: IAM roles-permissions service pages (329 services) as of 2026-11-14.
- REST service, version list, Overview and Docs come from Discovery documents (googleapis/google-api-python-client@ff2498706a01); products without a Discovery document show "—".
- gcloud groups from `gcloud meta list-commands` (593.0.0); the column is filled only where the group name equals the IAM service name. The full group assignment is in `references/gcloud-groups/assignment.md`.
- Lifecycle (Data Catalog): Shut down. Dates: deprecated February 3, 2025; shutdown June 1, 2026. Successor: Knowledge Catalog (Dataplex). Source: https://docs.cloud.google.com/dataplex/docs/deprecations.md.txt (retrieved 2026-11-14).
- Lifecycle information covers only products confirmed against official pages as of 2026-11-14 (see `../lifecycle/shutdown-and-deprecated.md`); a product without a Lifecycle entry is not confirmed to be available. Check the official product page before use.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions (retrieved 2026-11-14; content licensed under CC BY 4.0, code samples under Apache 2.0, https://developers.google.com/site-policies).

## Related

- [assignment.md](../gcloud-groups/assignment.md)
- [renamed-products.md](../renames/renamed-products.md)
