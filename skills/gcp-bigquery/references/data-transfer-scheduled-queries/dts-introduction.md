---
source: https://docs.cloud.google.com/bigquery/docs/dts-introduction
---

# Introduction to the BigQuery Data Transfer Service

The BigQuery Data Transfer Service automates scheduled, managed data transfers into BigQuery. It also supports backfills to recover from outages or gaps, dataset copies, and scheduled queries. It can't be used to transfer data out of BigQuery. Transfers are configured with the Google Cloud console, the `bq` command-line tool, or the BigQuery Data Transfer Service API; the **Pipelines & Connections** page offers a streamlined workflow in Preview.

## Signature / Usage

### List transfer configurations (bq)

```bash
bq ls \
--transfer_config \
--transfer_location=us
```

## Options / Props

### Supported data sources

| Category | Data source |
|---|---|
| Cloud storage | Amazon Simple Storage Service (Amazon S3), Azure Blob Storage, Cloud Storage |
| Databases and data warehouses | Amazon Redshift, Apache Hive Metastore, Microsoft SQL Server (Preview), MySQL, Oracle, PostgreSQL, Snowflake, Teradata |
| Google services | Campaign Manager, Comparison Shopping Service (CSS) Center (Preview), Display & Video 360, Google Ad Manager, Google Ads, Google Analytics 4, Google Merchant Center (Preview), Google Play, Search Ads 360, YouTube Channel, YouTube Content Owner |
| Marketing platforms | Facebook Ads, HubSpot (Preview), Klaviyo (Preview), Mailchimp (Preview) |
| Payment platforms | PayPal (Preview), Shopify (Preview), Stripe (Preview) |
| SaaS platforms | Salesforce, Salesforce Marketing Cloud, ServiceNow |

### Reservation slots used by transfer jobs

| Job type | Uses reservation slots |
|---|---|
| Query jobs using `QUERY` | Only if the project, folder, or organization is assigned to a reservation with this job type |
| Load jobs using `PIPELINE` | Only if the project, folder, or organization is assigned to a reservation with this job type |
| Jobs that copy datasets | No |

## Notes

- Data Delivery SLO: it applies to automatically scheduled transfers from sources within Google Cloud. It does not apply to transfers from non-Google Cloud sources (third-party outages can affect performance).
- Locations: the Data Transfer Service is a multi-regional resource with many additional single regions. The transfer configuration is set to the same location as the destination dataset, and the service processes and stages data in that location. It supports transfers from any region where your data is stored to any destination dataset location. See "Dataset locations and transfers" (`https://docs.cloud.google.com/bigquery/docs/dts-locations`).
- Pricing: see the BigQuery pricing page. After transfer, standard BigQuery storage and query pricing applies. Quotas are listed on the BigQuery quotas and limits page.
- Snippet taken from https://docs.cloud.google.com/bigquery/docs/scheduling-queries (the `bq ls` example).
- The source also shows links to each data source guide (not reproduced) and a Console workflow.
- Source: https://docs.cloud.google.com/bigquery/docs/dts-introduction (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [enable-transfer-service.md](./enable-transfer-service.md)
- [scheduling-queries.md](./scheduling-queries.md)
- [cloud-storage-transfer-overview.md](./cloud-storage-transfer-overview.md)
