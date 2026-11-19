---
source: https://docs.cloud.google.com/knowledge-catalog/docs/monitoring
---

# Monitoring Knowledge Catalog

Cloud Monitoring tracks the health of Knowledge Catalog (formerly Dataplex Universal Catalog) lakes, zones and assets, with custom dashboards and alerts. DataScan compute and data lineage Data Compute Units (DCUs) emit no time-series metrics, so attribute their costs by querying Cloud Billing export tables in BigQuery with Knowledge Catalog system labels.

## Signature / Usage

Metric type strings are prefixed with `dataplex.googleapis.com/`; query labels with the `metric.labels.` prefix, for example `metric.labels.LABEL="VALUE"`. In Metrics Explorer select a `Cloud Dataplex` resource; through the API use the Monitoring `timeSeries.list` method with a `filter` expression.

### Query 1: attribute DCU costs and usage by DataScan and target table (last 30 days)

```sql
SELECT
  project.id AS project_id,
  (SELECT value FROM UNNEST(labels) WHERE key = 'goog-dataplex-datascan-id') AS datascan_id,
  (SELECT value FROM UNNEST(labels) WHERE key = 'goog-dataplex-datascan-data-source-project') AS data_source_project,
  (SELECT value FROM UNNEST(labels) WHERE key = 'goog-dataplex-datascan-data-source-bigquery-dataset') AS data_source_dataset,
  (SELECT value FROM UNNEST(labels) WHERE key = 'goog-dataplex-datascan-data-source-bigquery-table') AS data_source_table,
  sku.description AS sku_description,
  SUM(usage.amount) AS total_usage,
  usage.unit AS usage_unit,
  SUM(cost) AS total_cost,
  currency
FROM
  `PROJECT_ID.DATASET_NAME.gcp_billing_export_v1_BILLING_ACCOUNT_ID`
WHERE
  service.description = 'Dataplex'
  AND EXISTS (SELECT 1 FROM UNNEST(labels) WHERE key = 'goog-dataplex-datascan-id')
  AND _PARTITIONDATE >= DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY)
GROUP BY
  project_id,
  datascan_id,
  data_source_project,
  data_source_dataset,
  data_source_table,
  sku_description,
  usage_unit,
  currency
ORDER BY
  total_cost DESC;
```

### Query 2: costs by workload type (Lineage versus DataScan)

```sql
SELECT
  project.id AS project_id,
  sku.description AS sku_description,
  COALESCE(
    (SELECT value FROM UNNEST(labels) WHERE key = 'goog-dataplex-workload-type'),
    IF(EXISTS(SELECT 1 FROM UNNEST(labels) WHERE key = 'goog-dataplex-datascan-id'), 'DATASCAN', 'OTHER')
  ) AS workload_type,
  SUM(usage.amount) AS total_usage,
  usage.unit AS usage_unit,
  SUM(cost) AS total_cost,
  currency
FROM
  `PROJECT_ID.DATASET_NAME.gcp_billing_export_v1_BILLING_ACCOUNT_ID`
WHERE
  service.description = 'Dataplex'
  AND _PARTITIONDATE >= DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY)
GROUP BY
  project_id,
  sku_description,
  workload_type,
  usage_unit,
  currency
ORDER BY
  total_cost DESC;
```

### Query 3: daily DCU usage and cost per DataScan job execution (last 7 days)

```sql
SELECT
  DATE(usage_start_time) AS usage_date,
  project.id AS project_id,
  (SELECT value FROM UNNEST(labels) WHERE key = 'goog-dataplex-datascan-id') AS datascan_id,
  (SELECT value FROM UNNEST(labels) WHERE key = 'goog-dataplex-datascan-job-id') AS job_id,
  SUM(usage.amount) AS total_usage,
  usage.unit AS usage_unit,
  SUM(cost) AS total_cost,
  currency
FROM
  `PROJECT_ID.DATASET_NAME.gcp_billing_export_v1_BILLING_ACCOUNT_ID`
WHERE
  service.description = 'Dataplex'
  AND EXISTS (SELECT 1 FROM UNNEST(labels) WHERE key = 'goog-dataplex-datascan-id')
  AND _PARTITIONDATE >= DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY)
GROUP BY
  usage_date,
  project_id,
  datascan_id,
  job_id,
  usage_unit,
  currency
ORDER BY
  usage_date DESC,
  total_cost DESC;
```

## Options / Props

### Metrics (prefix `dataplex.googleapis.com/`; launch stage BETA, resource hierarchy level project)

| Metric type | Display name | Kind, type, unit | Monitored resource | Description | Labels |
|---|---|---|---|---|---|
| `asset/active` | Active | `GAUGE`, `INT64`, `1` | `dataplex.googleapis.com/Asset` | Whether the asset is active | `resource_type`, `zone_type` |
| `asset/data_items` | Data items | `GAUGE`, `INT64`, `1` | `dataplex.googleapis.com/Asset` | Count of items within the referenced resource | `resource_type`, `zone_type` |
| `asset/data_size` | Data size | `GAUGE`, `INT64`, `By` | `dataplex.googleapis.com/Asset` | Number of stored bytes within the referenced resource | `resource_type`, `zone_type` |
| `asset/entities_pending_bigquery_iampolicy_updates` | Entities with BigQuery IAM policy updates pending | `GAUGE`, `INT64`, `1` | `dataplex.googleapis.com/Asset` | Number of Entities associated with the Asset with BigQuery IAM policy updates pending | `resource_type`, `zone_type` |
| `asset/entities_pending_bigquery_metadata_updates` | Entities with BigQuery metadata updates pending | `GAUGE`, `INT64`, `1` | `dataplex.googleapis.com/Asset` | Number of Entities associated with the Asset with BigQuery metadata updates pending | `resource_type`, `zone_type` |
| `asset/filesets` | Filesets | `GAUGE`, `INT64`, `1` | `dataplex.googleapis.com/Asset` | Count of fileset entities within the referenced resource | `resource_type`, `zone_type` |
| `asset/requires_action` | Requires action | `GAUGE`, `INT64`, `1` | `dataplex.googleapis.com/Asset` | Whether the asset has unresolved admin actions | `resource_type`, `zone_type` |
| `asset/tables` | Tables | `GAUGE`, `INT64`, `1` | `dataplex.googleapis.com/Asset` | Count of table entities within the referenced resource | `resource_type`, `zone_type` |
| `lake/requires_action` | Requires action | `GAUGE`, `INT64`, `1` | `dataplex.googleapis.com/Lake` | Whether the lake has unresolved admin actions | none |
| `zone/requires_action` | Requires action | `GAUGE`, `INT64`, `1` | `dataplex.googleapis.com/Zone` | Whether the zone has unresolved admin actions | `type` |

Label meanings: `resource_type` is the type of the referenced resource, `zone_type` is the type of the parent zone, and `type` is the type of the zone. The metrics table was generated at 2026-11-12 16:53:46 UTC.

### Billing labels (in the `labels` array of the Cloud Billing export table)

| Label key | Workload | Description |
|---|---|---|
| `goog-dataplex-datascan-id` | Data Quality, Data Profiling | ID or name of the data scan |
| `goog-dataplex-datascan-job-id` | Data Quality, Data Profiling | Execution ID for the data scan job |
| `goog-dataplex-datascan-data-source-project` | Data Quality, Data Profiling | Project containing the scanned data source |
| `goog-dataplex-datascan-data-source-region` | Data Quality, Data Profiling | Region of the scanned data source |
| `goog-dataplex-datascan-data-source-bigquery-dataset` | Data Quality, Data Profiling | BigQuery dataset ID of the scanned table |
| `goog-dataplex-datascan-data-source-bigquery-table` | Data Quality, Data Profiling | BigQuery table ID scanned |
| `goog-dataplex-datascan-data-source-dataplex-lake` | Data Quality, Data Profiling | Knowledge Catalog lake ID (if applicable) |
| `goog-dataplex-datascan-data-source-dataplex-zone` | Data Quality, Data Profiling | Knowledge Catalog data zone ID (if applicable) |
| `goog-dataplex-datascan-data-source-dataplex-entity` | Data Quality, Data Profiling | Knowledge Catalog entity ID (if applicable) |
| `goog-dataplex-datascan-data-source-biglake-catalog` | Data Quality, Data Profiling | BigLake catalog ID (if applicable) |
| `goog-dataplex-datascan-data-source-biglake-namespace` | Data Quality, Data Profiling | BigLake namespace (if applicable) |
| `goog-dataplex-datascan-data-source-biglake-table` | Data Quality, Data Profiling | BigLake table ID (if applicable) |
| `goog-dataplex-workload-type` | Data lineage | Set to `LINEAGE` for data lineage premium processing and metadata storage charges |

### Query placeholders

| Placeholder | Description |
|---|---|
| `PROJECT_ID` | Project ID that hosts your BigQuery billing export dataset |
| `DATASET_NAME` | Dataset containing your billing export table |
| `BILLING_ACCOUNT_ID` | Cloud Billing account ID formatted with underscores, for example `012345_567890_ABCDEF` |

## Notes

- Only lakes, zones and assets emit time-series metrics. DataScan compute (auto data quality, data profiling) and data lineage DCUs run on serverless compute in Google-managed infrastructure and don't emit metrics under `dataplex.googleapis.com/*`.
- Enable Cloud Billing export to BigQuery before running the queries. They are billed by bytes processed in BigQuery. Metric data retention follows Monitoring quotas and limits; pricing is on the Google Cloud Observability pricing page.
- Use cases: pipeline reliability (success and failure rates, alerts on failures or unusual durations), performance, cost management, and data governance.
- Service resource metrics are enabled automatically. You might need additional Monitoring permissions to view graphs or create alerts. An alert that fires creates an incident and an event (view them on the Alerting page).
- The source also shows Console steps and REST (`timeSeries.list`). Cloud Monitoring itself is in `gcp-observability`; the BigQuery billing export tables are in `gcp-bigquery`.
- Source: https://docs.cloud.google.com/knowledge-catalog/docs/monitoring (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [audit-logging.md](./audit-logging.md)
