---
source: https://docs.cloud.google.com/stackdriver/docs/observability/storage-overview
---

# Google Cloud Observability storage overview

Google Cloud Observability stores telemetry from Cloud Logging, Cloud Monitoring and Cloud Trace in separate storage containers: log buckets for logs, the originating project for metrics, and the `_Trace` observability bucket (dataset `Spans`, view `_AllSpans`) for traces. The page covers data residency, encryption defaults and the observability storage model (buckets, datasets, views, links).

## Signature / Usage

### List the system-created `_Trace` bucket

The source page has no code block. The system-created `_Trace` bucket (dataset `Spans`, view `_AllSpans`) appears in the output of `gcloud observability buckets list`:

```text
---
createTime: '2026-01-21T21:39:22.381083860Z'
description: Bucket for storing spans from Cloud Trace.
name: projects/my-project/locations/us/buckets/_Trace
```

## Options / Props

### Where each signal is stored

| Signal | Container | Notes |
|---|---|---|
| Logs | Log buckets (`_Required`, `_Default`, user-defined) | Created per project, billing account, folder, or organization. Location and encryption of `_Required` / `_Default` can't be changed after creation. |
| Metrics | The Google Cloud project where the data originates | Storage policies: Data residency for Monitoring. |
| Traces | Dataset `Spans` managed by the observability bucket `_Trace` | The `_Trace` bucket must exist to hold the dataset. |

### Observability storage model

| Resource | Description |
|---|---|
| Observability bucket | Management entity for datasets; has a location and a data retention policy. Created by the system per service (Cloud Trace: `_Trace`). |
| Dataset | Stores data. One dataset is created automatically with the bucket (Cloud Trace: `Spans`). |
| View | Read access to a subset of entries in a dataset. One view covering all data is created with the dataset (Cloud Trace: `_AllSpans`). |
| Link | Each dataset can contain at most one link; creating a link creates a linked BigQuery dataset. The system doesn't create links automatically. |

### Limitations

| You can't |
|---|
| Modify or delete observability buckets. |
| Create, delete, or modify datasets. |
| Create, delete, or modify views. |
| Use the Google Cloud console to list buckets, datasets, views, or links. |

## Notes

- Log buckets: Cloud Logging selects the location of `_Required` and `_Default` unless default resource settings for Cloud Logging specify one; they use Google-owned and Google-managed keys unless default resource settings specify a customer-managed encryption key (CMEK). Neither can be changed after creation.
- By default log data stays in the resource where it originates; routing to another project or a centralized log bucket is configured separately (store log entries / route log entries).
- Organization policies can restrict locations of new log buckets and require CMEK for them. For organizations and folders, default resource settings for Cloud Logging configure the location of new `_Required` and `_Default` buckets, the Cloud KMS key, and the default sink; descendants inherit them unless they set their own. These settings apply only to new resources, not existing ones.
- `_Trace` automatic creation: the system creates it when it receives trace data, using the applicable default settings for observability buckets for location and key; with no defaults it selects a supported location and Google-default encryption. Trace data from Cloud Run functions, Cloud Run and App Engine does not cause the bucket to be created; their spans are stored only when the bucket already exists.
- `_Trace` manual creation: use the Observability API; you must provide the location and may provide a Cloud KMS key. Without a key, the default settings of the parent resource decide; if they specify no key, Google-default encryption is used.
- Note (source): as of June 1, 2026, the create-observability-bucket flow enforces organization policies that restrict locations, require CMEKs, and restrict which Cloud KMS keys can be used.
- Default settings for observability buckets (organization, folder, project): a default storage location and, per location, a default Cloud KMS key. The parent of an observability bucket is always a project, so the system looks for project-level defaults first, then ancestors. When you create a bucket by API request you provide the location; the default Cloud KMS key is used unless the request specifies a key.
- If organization policies require CMEKs, you must configure default settings for observability buckets; otherwise provisioning of system-created observability buckets fails.
- This is Google Cloud Observability's own storage; the `gcp-bigquery` skill (planned) covers BigQuery datasets themselves.
- Snippet taken from https://docs.cloud.google.com/stackdriver/docs/observability/create-observability-buckets.
- Source: https://docs.cloud.google.com/stackdriver/docs/observability/storage-overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Source inconsistency: the Limitations list on this page says you can't "Modify or delete observability buckets", while the CMEK page says that after a bucket exists you can modify its display name, description or CMEK (https://docs.cloud.google.com/stackdriver/docs/observability/update-observability-buckets) and retroactively apply a Cloud KMS key or change its location (https://docs.cloud.google.com/stackdriver/docs/observability/reprovision-observability-bucket). Read the limitation as applying to other settings and to deletion; see cmek.md.

## Related

- [create-observability-buckets.md](./create-observability-buckets.md)
- [cmek.md](./cmek.md)
- [log-analytics.md](./log-analytics.md)
