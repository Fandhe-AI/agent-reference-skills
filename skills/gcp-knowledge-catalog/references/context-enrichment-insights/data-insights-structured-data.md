---
source: https://docs.cloud.google.com/knowledge-catalog/docs/data-insights-structured-data
---

# Data Insights for Structured Data

Knowledge Catalog (formerly Dataplex Universal Catalog) data insights use Gemini to generate descriptions, sample queries (GoogleSQL and Spark SQL) and relationship graphs from table and dataset metadata. Follow-up questions can be asked in BigQuery data canvas. Custom instructions are in Preview.

## Signature / Usage

### Sample SQL insight for a `telco_churn` table

```sql
SELECT
  InternetService,
  COUNT(DISTINCT CustomerID) AS total_customers
FROM
  agentville_datasets.telco_churn
WHERE
  Churn = TRUE
GROUP BY
  InternetService
ORDER BY
  total_customers DESC
LIMIT 1;
```

### Sample Spark SQL insight for an Iceberg `catalog_metrics` table

```sql
SELECT
  details.field1,
  details.field2,
  MAX(price) AS max_price
FROM
  PROJECT_ID.DATASET_ID.catalog_metrics
WHERE
  creation_date >= DATE_SUB(CURRENT_DATE(), 30)
GROUP BY
  details.field1,
  details.field2;
```

## Options / Props

### Generated outputs

| Output | Description |
|---|---|
| Descriptions | AI-generated summaries of a dataset or namespace purpose, table structure, and specific columns. |
| Sample queries | GoogleSQL and Spark SQL queries tailored to the schema and content. Spark SQL is only supported for BigLake Iceberg REST Catalog tables. |
| Relationship graphs | Visualizations of connections and dependencies between tables in a dataset or namespace. |
| Custom instructions (Preview) | Let data stewards steer generation with business objectives, domain knowledge and organizational vocabulary. |

### Supported resources

| Resource |
|---|
| BigQuery datasets, tables, and views |
| Borderless Lakehouse tables (including Apache Iceberg, Apache Hive, and SAP BDC) |
| External tables |
| Apache Iceberg REST Catalog tables |
| Apache Iceberg namespaces (represented as datasets in BigQuery) |
| Apache Hive catalog tables |
| SAP Business Data Cloud (BDC) tables |

### Modes

| Mode | Behavior | Use |
|---|---|---|
| Generate and publish | Persists insights as metadata aspects in Knowledge Catalog (requires publish permissions): stores table and column descriptions, captures suggested queries and questions as reusable aspects, makes them accessible to all users with Knowledge Catalog access, and lets you edit and save descriptions in the catalog. | Enterprise-wide data documentation or catalog-driven governance workflows. |
| Generate without publishing | Creates descriptions, natural language questions and SQL on demand without publishing. | Quick ad hoc exploration without cluttering the catalog. |

### Locations and limitations

| Item | Value |
|---|---|
| Locations | All BigQuery locations |
| Multi-cloud | Data from other clouds isn't available |
| Column types | `Geo` and `JSON` columns aren't supported |
| Query presentation | Runs don't guarantee queries every time; regenerate insights in BigQuery Studio to increase the likelihood of more engaging queries |

## Notes

- Pricing: see Data Cloud Agent pricing (https://cloud.google.com/products/data-agents/pricing). Token consumption of data insights scan jobs can be tracked with Cloud Monitoring (Monitor data insights token usage). Quotas are in the data insights section of Quotas and limits.
- Gemini in BigQuery processing locations are described in "Where Gemini in BigQuery processes your data". Data insights use Gemini through Google Cloud's Gemini in BigQuery; the Gemini Developer API and `google-genai` SDK are in `google-gemini-api`.
- The twin also shows more sample queries (customers with all premium services; churn rates by segment; cumulative sum and average `metadata.value` for the Iceberg table) and the example schemas as tables; only two representative queries are kept here. The BigQuery tables themselves are covered by `gcp-bigquery`; Knowledge Catalog catalogs them.
- Feedback address given in the source: dataplex-data-insights-help@google.com. Lakehouse is the former BigLake (`biglake` API / IAM names stay).
- Source: https://docs.cloud.google.com/knowledge-catalog/docs/data-insights-structured-data (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [use-data-insights-structured-data.md](./use-data-insights-structured-data.md)
- [data-relationships.md](./data-relationships.md)
