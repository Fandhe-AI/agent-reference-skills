---
source: https://docs.cloud.google.com/knowledge-catalog/docs/faq
---

# Knowledge Catalog FAQ

Frequently asked questions about Knowledge Catalog (formerly Dataplex Universal Catalog): general concepts, why system entry groups cannot be deleted, data insights token billing and quotas, and monitoring of DCU costs.

## Signature / Usage

### Enable the API required for data insights billing

Adapted (not in the official docs): the gcloud help placeholder `my-consumed-service` is replaced by the service this page names.

```bash
gcloud services enable geminidataanalytics.googleapis.com --project=PROJECT_ID
```

For data insights, enable the Gemini Data Analytics API (`geminidataanalytics.googleapis.com`) on the project; if it is not enabled, data insights fail to execute. Billing and quota are processed through it.

### Data insights quota behavior

1. Knowledge Catalog checks both input and output token quotas before starting a scan and deducts consumed tokens after the scan completes.
2. Quota is checked only at scan start. A scan that starts with quota available completes normally and publishes its insights even if it pushes the project over the daily limit; afterwards the daily quota bucket is marked exhausted (100%) for the rest of the day.
3. After the input or output daily token quota is exhausted, new on-demand or scheduled insights scans are blocked before execution; rejected scans don't incur token charges.
4. In the console, a failed regeneration shows the banner `Knowledge Catalog Insights token quota limit exceeded for this project.`; previously generated descriptions and suggested SQL queries remain visible and usable. On a new table or dataset with no prior insights the same banner appears in the empty state and the Generate insights button stays available to retry.
5. To resume: wait for the daily reset (counters reset to 0 at midnight Pacific Time, 00:00 PT), or have a project administrator raise the daily limit (or reset it to unlimited) on the Quotas and System Limits page.

## Options / Props

### Metadata types

| Type | Content |
|---|---|
| Technical metadata | Automatically harvested schemas, table names and system properties. |
| Business metadata | User-defined business descriptions, glossary terms and ownership. |
| Runtime metadata | Data lineage, data quality scores and data profiling statistics. |

### Data insights billing

| Topic | Answer |
|---|---|
| Billing start | Active billing for data insights starts on October 27, 2026. The billing rollout begins on November 2, 2026 and takes up to a week to be enabled in all regions. |
| Unit | Data tokens: input tokens (context, instructions and history sent to the model) and output tokens (generated descriptions, relationships and queries). Pricing: https://cloud.google.com/products/data-agents/pricing. |
| Service accounts | No free per-user quota allowance; usage is metered the same way as for standard users. |
| Avoid charges | Verify ongoing scans and stop triggering new scans; administrators can turn off the capability by disabling the Dataplex API in the project. |
| Monitoring | Token metering; see https://docs.cloud.google.com/knowledge-catalog/docs/monitor-insights-token-usage. |
| Limits | https://docs.cloud.google.com/knowledge-catalog/docs/quotas#data-insights-quotas. |

### Billing labels for DCU cost attribution

| Workload | Label |
|---|---|
| Data quality and data profiling scans | `goog-dataplex-datascan-*` (for example `goog-dataplex-datascan-id`, `goog-dataplex-datascan-data-source-project`, `goog-dataplex-datascan-data-source-bigquery-table`). |
| Data Lineage processing | `goog-dataplex-workload-type` with value `LINEAGE`. |

## Notes

- Adapted from the official docs: the page shows the gcloud help example `gcloud services enable my-consumed-service`; the Gemini Data Analytics API this page names is used instead, with `--project`.
- Source: https://docs.cloud.google.com/knowledge-catalog/docs/faq (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/services/enable (gcloud 593.0.0 help); the page itself has no fenced code. The source names `geminidataanalytics.googleapis.com` as the service to enable.
- System entry groups (names starting with `@`, such as `@bigquery`, `@vertexai`, `@dataform`, `@pubsub`) and their `entrygroup` entries (such as `@vertexai_entry`) cannot be deleted through the Knowledge Catalog APIs or console; they are created independently of whether the Dataplex API is enabled. Delete the source resource in its originating service (for example a Vertex AI dataset or a Dataform repository) and the entry is removed during continuous metadata synchronization. Empty system entry groups are placeholders with no customer data.
- DataScan compute (auto data quality, data profiling) and data lineage DCUs run on serverless compute in Google-managed infrastructure and do not publish time-series metrics under `dataplex.googleapis.com/*` to Cloud Monitoring. Export Cloud Billing data to BigQuery and query the system labels above (details: https://docs.cloud.google.com/knowledge-catalog/docs/monitoring#monitor-dcu-costs-billing-export). Cloud Monitoring itself is covered by `gcp-observability`; the BigQuery tables by `gcp-bigquery`.
- Disabling the Dataplex API turns off data insights; do it on a disposable project first if unsure.

## Related

- [enable-api.md](./enable-api.md)
- [introduction.md](./introduction.md)
