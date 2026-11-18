---
source: https://docs.cloud.google.com/logging/docs/buckets
---

# Read logs from a bucket, monitor volume, and troubleshoot

You don't write logs directly to a bucket: you write to a project, folder, or organization, and sinks in the parent resource route matching logs to destinations such as log buckets. To read logs from a bucket you need access to a log view on it.

## Signature / Usage

### Read logs from a bucket

```bash
gcloud logging read LOG_FILTER --bucket=BUCKET_ID --location=LOCATION --view=LOG_VIEW_ID
```

REST: call `entries.list`, set `resourceNames` to the bucket and log view, and set `filter` (Logging query language) to select data.

## Options / Props

### Logs Storage statistics

| Statistic | Description |
|-----------|-------------|
| Current month ingestion | Log data stored in log buckets since the first day of the current calendar month. |
| Previous month ingestion | Log data stored in log buckets in the last calendar month. |
| Projected ingestion by EOM | Estimated log data to be stored by the end of the current calendar month, based on current usage. |
| Current month billable storage | Log data retained for over 30 days that is billed. |

### Usage alert (`logging.googleapis.com/billing/bytes_ingested`)

| Field | Value |
|-------|-------|
| Resource and Metric | Resources: Global; Metric categories: Logs-based metric; Metrics: Monthly log bytes ingested |
| Filter | None |
| Across time series, time series aggregation | `sum` |
| Rolling window | `60 m` |
| Rolling window function | `max` |
| Condition type | `Threshold` |
| Alert trigger | `Any time series violates` |
| Threshold position | `Above threshold` |
| Threshold value | You determine the acceptable value |
| Retest window | Minimum acceptable value is 30 minutes |

## Notes

- A sink routes logs to a bucket when they match the sink's filter and the sink has permission to write to the bucket. Excluding entries or disabling storage at the Log Router stops them from being stored in the bucket; this is the way to reduce storage charges, so apply exclusions with care.
- The statistics don't include logs in the `_Required` bucket; its logs can't be excluded or disabled.
- To create the usage alert, open Logs Storage in the console and click Create usage alert; the metric type field is prepopulated with `logging.googleapis.com/billing/bytes_ingested`.
- Troubleshooting: to find service accounts that can route logs to your bucket, filter the IAM page by the Logs Bucket Writer role (service account IDs contain `gserviceaccount.com`); you can remove a service account there to stop it routing logs.
- Troubleshooting: if you still see logs excluded from your `_Default` sink, you might be viewing a bucket in a centralized project, or have the Logs Explorer scope set to the project level; choose Log view in the Refine scope menu and select the log view of the `_Default` bucket.
- Logs in a bucket can contain personal data or secrets; grant read access through log views, and never log credentials.
- The source also shows the Google Cloud console steps.
- Source: https://docs.cloud.google.com/logging/docs/buckets (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-log-view.md](./create-log-view.md)
- [grant-log-view-access.md](./grant-log-view-access.md)
- [create-log-bucket.md](./create-log-bucket.md)
