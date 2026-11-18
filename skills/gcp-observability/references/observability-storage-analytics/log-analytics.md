---
source: https://docs.cloud.google.com/logging/docs/log-analytics
---

# Query and analyze logs overview (Logs Explorer and Observability Analytics)

Logs can be queried in the console through two interfaces: Logs Explorer (troubleshooting and exploration, Logging query language) and Observability Analytics (SQL, aggregation, joins of log and trace data, charts). Logging API and gcloud also query logs. This page lists the restrictions, join conditions and pricing notes for Observability Analytics.

## Signature / Usage

### Query log views and analytics views

Path formats used in the `FROM` clause (see query-and-view.md).

```sql
FROM `PROJECT_ID.LOCATION.BUCKET_ID.LOG_VIEW_ID`
```

Snippet taken from https://docs.cloud.google.com/logging/docs/analyze/query-and-view.

## Options / Props

### Logs Explorer vs Observability Analytics

| | Logs Explorer | Observability Analytics |
|---|---|---|
| Use | Troubleshooting and exploration | Joining log and trace data; insights and trends |
| Query language | Logging query language (same as Logging API and gcloud) | SQL, including pipe syntax |
| Aggregation | Not supported | Group and aggregate; results as table or chart |
| Needs upgraded bucket | No (log data only needs to be in a log bucket) | Yes |

### Restrictions

| Restriction |
|---|
| Upgrading an existing log bucket requires: bucket created at project level; bucket is unlocked unless it is the `_Required` bucket; no pending updates to the bucket. |
| Entries written before the upgrade aren't available immediately; the backfill can take several days. |
| The Observability Analytics page can't query log views when the log bucket has field-level access controls; use Logs Explorer or a linked BigQuery dataset. BigQuery doesn't honor field-level access controls, so a linked dataset exposes all fields. |
| Duplicate log entries aren't removed before a query runs (Logs Explorer removes them by log name, timestamp and insert ID). |

### Restrictions on joins

| Condition | Requirement |
|---|---|
| Location | All views in the same location, or all in `global` or `us`. |
| CMEK | Storage resources using CMEK use the same Cloud KMS key, or share a common ancestor whose default Cloud KMS key is in the same location as the resources. Temporary join data is encrypted with the common or ancestor default key. |

## Notes

- Observability Analytics queries log views and analytics views, supports pipe syntax SQL, and can join log and trace data. Log views have a system-defined schema; you define the schema of analytics views.
- A linked BigQuery dataset (after upgrading the log bucket) lets you query log data from BigQuery without exporting it. Creating one doesn't ingest data into BigQuery, and there are no BigQuery ingestion or storage costs for it; BigQuery analysis charges apply to SQL run on the linked dataset (BigQuery Studio, API, bq). BigQuery itself belongs to `gcp-bigquery` (planned).
- Pricing: see the Google Cloud Observability pricing page (https://cloud.google.com/products/observability/pricing); routed data also incurs Cloud Storage, BigQuery and Pub/Sub pricing.
- Upgrading a bucket doesn't affect Logs Explorer usage.
- Logs can contain personal data or secrets; limit who gets Logs Viewer / Logs View Accessor roles.
- Source: https://docs.cloud.google.com/logging/docs/log-analytics (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [query-and-view.md](./query-and-view.md)
- [examples.md](./examples.md)
- [about-analytics-views.md](./about-analytics-views.md)
- [storage-overview.md](./storage-overview.md)
