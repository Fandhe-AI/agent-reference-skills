---
source: https://docs.cloud.google.com/trace/docs/trace-export-overview
---

# Trace export overview (deprecated)

Deprecated. As of February 18, 2026, export of span data to BigQuery by using Cloud Trace sinks is deprecated; sinks used to export spans to BigQuery will be removed on or after February 18, 2027. You cannot create or modify trace sinks. Use Observability Analytics instead (see analytics-migrate.md). The page is Beta (Pre-GA Offerings Terms apply).

## Signature / Usage

### Sink properties

```text
"projects/PROJECT_NUMBER/traceSinks/my-sink"
```

```text
"projects/PROJECT_ID"
```

```text
bigquery.googleapis.com/projects/DESTINATION_PROJECT_NUMBER/datasets/DATASET_ID
```

```text
export-PROJECT_NUMBER-GENERATED_VALUE@gcp-sa-cloud-trace.iam.gserviceaccount.com
```

## Options / Props

| Property | Description |
|---|---|
| Name | Sink name, `projects/PROJECT_NUMBER/traceSinks/SINK_ID` |
| Parent | A Google Cloud project, identifier or number |
| Destination | A BigQuery dataset in the sink's project or another project in the same organization |
| Writer Identity | Service account the destination owner must permit to write; new sinks get a unique one (PROJECT_NUMBER in Hex) |

## Notes

- Deprecated: "As of February 18, 2026, the export of span data to BigQuery by using Cloud Trace sinks is deprecated. Sinks used to export spans to BigQuery will be removed on or after February 18, 2027. You can't create or modify trace sinks." Migrate to Observability Analytics.
- Reasons to export were retention beyond the default 30 days and BigQuery analysis. Only spans ingested through the Cloud Trace API were eligible; spans from Google Cloud services or the Telemetry API were unsupported.
- A sink exported a copy of each span arriving after its creation; earlier traces could not be exported. Creating or modifying a sink required Trace Admin, Trace User, Project Owner or Project Editor.
- The writer identity service account is created by Trace and appears in the project's list only after it has an IAM binding.
- Cloud Trace used the BigQuery streaming API, batched calls and had no retry or throttling; spans might not be exported if destination quotas were exceeded. Each span is a row of at least 1024 bytes (200 spans need at least 20,400 bytes). Export itself incurred no Cloud Trace charge; BigQuery charges applied.
- The source also describes creating an alerting policy on BigQuery dataset metrics (`Stored bytes`, `Uploaded bytes`, `Uploaded bytes billed`; `sum`, rolling window `1 m`, mean, threshold above, retest `1 minute`); omitted.
- Source: https://docs.cloud.google.com/trace/docs/trace-export-overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [analytics-migrate.md](./analytics-migrate.md)
