---
source: https://docs.cloud.google.com/service-health/docs/logs
---

# Service Health logs

Personalized Service Health logs service health events in Cloud Logging and records every update to an event's description, relevance or state as a distinct log entry. This page covers viewing, querying, exporting (including folder-level aggregation) and retaining those logs.

## Signature / Usage

### Sample log entry (Logs Explorer, log name Service Health)

```text
"insertId":"1pw1msgf6a3zc6",
"timestamp":"2022-06-14T17:17:55.722035096Z",
"receiveTimestamp":"2022-06-14T17:17:55.722035096Z",
"logName":"projects/PROJECT_ID/logs/servicehealth.googleapis.com%2Factivity",
"resource":{
    "type":"servicehealth.googleapis.com/Event",
    "labels":{
        "resource_container":"797731824162",
        "location":"global",
        "event_id":"U4AqrjwFQYi5fFBmyAX-Gg"
    }
}
"labels":{
    "new_event":"true"
    "updated_fields": "[]"
},
"jsonPayload":{
    "@type":"type.googleapis.com/google.cloud.servicehealth.logging.v1.EventLog",
    "category":"INCIDENT",
    "title":"We are experiencing a connectivity issue affecting Cloud SQL in us-east1, australia-southeast2.",
    "description":"We are experiencing an issue with Google Cloud infrastructure components at us-east1, australia-southeast2. Our engineering team continues to investigate the issue. We apologize to all who are affected by the disruption.",
    "updateTime":"2023-11-14T22:26:40Z",
    "endTime":"2023-11-14T22:13:20Z",
    "impactedLocations":"['us-east1','australia-southeast2']",
    "impactedProducts":"['Google Cloud SQL']",
    "impactedProductIds":"['hV87iK5DcEXKgWU2kDri']",
    "nextUpdateTime":"2023-11-14T22:40:00Z",
    "startTime":"2020-09-13T12:26:40Z",
    "state":"ACTIVE",
    "detailedState":"CONFIRMED",
    "relevance":"RELATED",
}
```

### Query Service Health logs (Logs Explorer)

Logs with a specific incident relevance:

```text
jsonPayload.relevance = ("IMPACTED" OR "RELATED")
```

Combine multiple filters:

```text
jsonPayload.impactedLocations : "us-central1" AND jsonPayload.impactedProducts : "Google Compute Engine" AND jsonPayload.state = "ACTIVE"
```

### Aggregate Service Health logs at a folder level

1. Create a project under the folder for the Service Health logs (link a billing account to it):

```bash
gcloud projects create PROJECT_ID --folder FOLDER_ID
```

2. Create an aggregated sink at the folder level:

```bash
gcloud logging sinks create SINK_NAME \
SINK_DESTINATION  --include-children \
--folder=FOLDER_ID --log-filter="LOG_FILTER"
```

`LOG_FILTER` for all relevant incidents:

```text
resource.type=servicehealth.googleapis.com/Event AND jsonPayload.category=INCIDENT AND jsonPayload.relevance!=NOT_IMPACTED AND jsonPayload.@type=type.googleapis.com/google.cloud.servicehealth.logging.v1.EventLog
```

3. Set permissions for the sink service account (`SERVICE_ACCT_EMAIL` is the email of the sink's writer identity):

Adapted (not in the official docs): `--member=SERVICE_ACCT_NAME` replaced by `--member=serviceAccount:SERVICE_ACCT_EMAIL`, the type-prefixed principal that `--member` requires.

```bash
gcloud projects add-iam-policy-binding PROJECT_ID --member=serviceAccount:SERVICE_ACCT_EMAIL --role=roles/logging.bucketWriter
```

Adapted (not in the official docs): same `serviceAccount:` prefix.

```bash
gcloud projects add-iam-policy-binding PROJECT_ID --member=serviceAccount:SERVICE_ACCT_EMAIL --role=roles/logging.logWriter
```

4. (Optional) To avoid the `_Default` sink, create a log bucket and a sink into it:

```bash
gcloud logging buckets create BUCKET_ID --location=LOCATION --enable-analytics --async
```

```bash
gcloud logging sinks create SINK_NAME_BUCKET \
logging.googleapis.com/projects/PROJECT_ID/locations/LOCATION/buckets/BUCKET_ID \
--project=PROJECT_ID --log-filter="LOG_FILTER"
```

### Query Service Health logs with BigQuery

Create a log bucket in the Service Health project, enable Observability Analytics on it, link a BigQuery dataset, and enable the BigQuery API:

```bash
gcloud logging buckets create BUCKET_ID  --location=LOCATION  --enable-analytics --async
```

```bash
gcloud logging buckets update BUCKET_ID --location=LOCATION --enable-analytics --async
```

```bash
gcloud logging links create LINK_ID --bucket=BUCKET_ID --location=LOCATION
```

```bash
gcloud services enable bigquery.googleapis.com
```

Adapted (not in the official docs): the source's table cell writes `gcloud query --use_legacy_sql=false ...`, which is not a gcloud command; the BigQuery CLI command is `bq query`.

```bash
bq query --use_legacy_sql=false 'SELECT * FROM `PROJECT_ID.LINK_ID._AllLogs` WHERE JSON_VALUE(json_payload["relevance"]) = "IMPACTED"'
```

Adapted (not in the official docs): same `bq query` correction for the parent-event query.

```bash
bq query --use_legacy_sql=false 'SELECT * FROM `PROJECT_ID.LINK_ID._AllLogs` WHERE JSON_VALUE(json_payload["parentEvent"]) = "projects/PROJECT_ID/locations/global/events/EVENT_ID"'
```

## Notes

- Prerequisites: billing enabled, Service Health API enabled for the project whose logs you view, export or store, and access to Service Health logs (see `manage-access.md`). The log schema is `google.cloud.servicehealth.logging.v1` (https://docs.cloud.google.com/service-health/docs/reference/event-logs/rpc/google.cloud.servicehealth.logging.v1). Set product and location values from https://docs.cloud.google.com/service-health/docs/supported-products-locations.
- View: Logs Explorer, select the project, in **Log name** pick **Service Health**; entries have `@type` `type.googleapis.com/google.cloud.servicehealth.logging.v1.EventLog`. The sample entry above is shown in the source as indented text (not valid JSON) and is kept as written. The log name is `servicehealth.googleapis.com%2Factivity`.
- Export: any Cloud Logging sink destination, via console, API or gcloud (see https://docs.cloud.google.com/logging/docs/export/configure_export_v2). Include and exclude Service Health logs with the sink's inclusion and exclusion filters. A sink filter or exclusion filter decides which entries reach the destination; entries excluded from a sink are not stored there, so try filters on a disposable project first.
- The folder-level aggregated sink (`--include-children`) routes the logs of all projects in the folder to the new project; the sink filter above sends logs for incidents whose relevance is not `NOT_IMPACTED`.
- The grants in step 3 are written project-wide on the destination project (`roles/logging.bucketWriter` and `roles/logging.logWriter`), not on the bucket only. The `writerIdentity` value that Cloud Logging reports already starts with `serviceAccount:` (for example `serviceAccount:service-123456789012@gcp-sa-logging.iam.gserviceaccount.com` in https://docs.cloud.google.com/logging/docs/export/configure_export_v2); do not repeat the prefix when you paste it.
- Linking a BigQuery dataset follows enabling Observability Analytics on the bucket. gcloud 593.0.0 help: `--async` means "Return immediately, without waiting for the operation in progress to complete", and `--enable-analytics` opts the bucket into Log Analytics and "cannot be opted out" afterwards.
- Label keys differ in the source: the sample entry above shows `new_event` / `updated_fields`, while the alert filters and the test entry (`example-alerting-policies.md`, `configure-alerts-cloud-logging.md`) use `servicehealth.googleapis.com/new_event` and `servicehealth.googleapis.com/updated_fields`. Both are kept as written.
- Retention: Personalized Service Health provides limited retention of events. To keep past events beyond a few months, store Service Health logs in a log bucket (https://docs.cloud.google.com/logging/docs/buckets).
- Corrected from the official docs: the BigQuery examples were written as ``gcloud query --use_legacy_sql=false 'SELECT ...'``; gcloud 593.0.0 has no top-level `query` command (only group-specific ones such as `asset query`), so `bq query` is used.
- Corrected from the official docs: both step 3 grants read `--member=SERVICE_ACCT_NAME` with no principal type; gcloud 593.0.0 help for `projects add-iam-policy-binding` takes `--member=PRINCIPAL` in the `serviceAccount:EMAIL` form ("--member='serviceAccount:test-proj1@example.domain.com'").
- Snippets in this page come from the twin; the source also shows console screenshots.
- Source: https://docs.cloud.google.com/service-health/docs/logs (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [configure-alerts-cloud-logging.md](./configure-alerts-cloud-logging.md)
- [example-alerting-policies.md](./example-alerting-policies.md)
- [manage-access.md](./manage-access.md)
