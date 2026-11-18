---
source: https://docs.cloud.google.com/logging/docs/export/configure_export_v2
---

# Route logs to supported destinations (create and manage sinks)

Create, authorize, update, disable and delete log sinks in a project (the same steps work for a billing account, folder or organization). A sink writing to a log bucket in the same project is authorized automatically; every other destination needs the sink's writer identity (a service account Cloud Logging creates) to be granted write permission.

## Signature / Usage

### Create a sink

```text
gcloud logging sinks create SINK_NAME SINK_DESTINATION
```

```text
pubsub.googleapis.com/projects/PROJECT_ID/topics/TOPIC_ID
```

```bash
gcloud logging sinks create my-sink logging.googleapis.com/projects/myproject123/locations/global/buckets/my-bucket \
 --log-filter='logName="projects/myproject123/logs/matched"' --description="My first sink"
```

If the response contains a `writerIdentity` key, grant that service account write permission on the destination. If it doesn't, no destination permission is needed.

### Destination path formats

```text
logging.googleapis.com/projects/DESTINATION_PROJECT_ID/locations/LOCATION/buckets/BUCKET_NAME
```

```text
logging.googleapis.com/projects/DESTINATION_PROJECT_ID
```

```text
bigquery.googleapis.com/projects/DESTINATION_PROJECT_ID/datasets/DATASET_ID
```

```text
storage.googleapis.com/BUCKET_NAME
```

```text
pubsub.googleapis.com/projects/DESTINATION_PROJECT_ID/topics/TOPIC_ID
```

### Inclusion filter example (Data Access audit logs)

```bash
log_id("cloudaudit.googleapis.com/data_access") OR log_id("externalaudit.googleapis.com/data_access")
```

### Grant the writer identity

```text
gcloud logging sinks describe SINK_NAME
```

```text
serviceAccount:service-123456789012@gcp-sa-logging.iam.gserviceaccount.com
```

```bash
gcloud projects add-iam-policy-binding PROJECT_ID --member=PRINCIPAL --role=ROLE
```

`PROJECT_ID` is the project that stores the destination (the destination project when the destination is a project); `PRINCIPAL` is the writer identity, for example `serviceAccount:...`.

### Manage sinks

```text
gcloud logging sinks list
```

```text
gcloud logging sinks describe SINK_NAME
```

```text
gcloud logging sinks update SINK_NAME NEW_DESTINATION --log-filter=NEW_FILTER
```

```text
gcloud logging sinks update my-project-sink storage.googleapis.com/my-second-gcs-bucket
```

```text
gcloud logging sinks update SINK_NAME --disabled
```

```text
gcloud logging sinks update SINK_NAME --no-disabled
```

```text
gcloud logging sinks delete SINK_NAME
```

Use `--organization=ORGANIZATION_ID` (or the matching folder / billing account option) with `list` to see aggregated sinks.

### Stop storing logs in the `_Default` bucket

```text
gcloud logging sinks update _Default --disabled
```

```text
gcloud logging sinks update _Default --no-disabled
```

### Restore the `_Default` sink filter

When created, the `_Default` sink has this inclusion filter and an empty exclusion filter:

```text
      NOT log_id("cloudaudit.googleapis.com/activity") AND NOT \
      log_id("externalaudit.googleapis.com/activity") AND NOT \
      log_id("cloudaudit.googleapis.com/system_event") AND NOT \
      log_id("externalaudit.googleapis.com/system_event") AND NOT \
      log_id("cloudaudit.googleapis.com/access_transparency") AND NOT \
      log_id("externalaudit.googleapis.com/access_transparency")
```

### Exclusion filter examples

GKE system container and pod logs:

```text
resource.type = ("k8s_container" OR "k8s_pod")
resource.labels.namespace_name = (
"cnrm-system" OR
"config-management-system" OR
"gatekeeper-system" OR
"gke-connect" OR
"gke-system" OR
"istio-system" OR
"knative-serving" OR
"monitoring-system" OR
"kube-system")
```

GKE system node logs:

```text
resource.type = "k8s_node"
(log_id("container-runtime") OR
 log_id("docker") OR
 log_id("kube-container-runtime-monitor") OR
 log_id("kube-logrotate") OR
 log_id("kube-node-configuration") OR
 log_id("kube-node-installation") OR
 log_id("kubelet") OR
 log_id("kubelet-monitor") OR
 log_id("node-journal") OR
 log_id("node-problem-detector"))
```

Dataflow logs not required for supportability:

```text
resource.type="dataflow_step"
labels."dataflow.googleapis.com/log_type"!="system" AND labels."dataflow.googleapis.com/log_type"!="supportability"
```

Storage Transfer Service successful actions:

```text
resource.type="storage_transfer_job" AND
jsonPayload.status.statusCode="OK"
```

## Options / Props

### `gcloud logging sinks create` options

| Option | Description |
|---|---|
| `SINK_NAME` | Name of the sink; can't be changed after creation |
| `SINK_DESTINATION` | Destination path (see formats above) |
| `--log-filter` | Inclusion filter; if omitted, matches all log entries |
| `--exclusion` | Exclusion filter; repeatable, up to 50 per sink; can use the `sample` function |
| `--description` | Purpose of the sink |

### REST `LogSink` fields (`projects.sinks.create`)

| Field | Description |
|---|---|
| `name` | Sink identifier; can't be renamed after creation (required) |
| `destination` | Destination path (required) |
| `filter` | Inclusion filter, max 20,000 characters |
| `exclusions` | Exclusion filters, up to 50 per sink |
| `description` | Purpose of the sink |
| `disabled` | `true` disables, `false` re-enables (via `projects.sinks.update`) |

### Limits

| Limit | Value |
|---|---|
| Sinks per project | 200 |
| Exclusion filters per sink | 50 |
| Filter length | 20,000 characters |
| Sink changes | Can take a few minutes to apply |

### Roles for the writer identity

| Destination | Role |
|---|---|
| All destinations | Logs Writer `roles/logging.logWriter` (needs `logging.logEntries.route`) |
| Log bucket | Logs Bucket Writer `roles/logging.bucketWriter` |
| Cloud Storage bucket | Storage Object Creator `roles/storage.objectCreator` |
| BigQuery dataset | BigQuery Data Editor `roles/bigquery.dataEditor` |
| Pub/Sub topic (including Splunk) | Pub/Sub Publisher `roles/pubsub.publisher` |

## Notes

- Roles to manage sinks: to create, modify or delete a sink you need Logs Configuration Writer `roles/logging.configWriter` on the project; enabling the API needs `serviceusage.services.enable` (for example Service Usage Admin `roles/serviceusage.serviceUsageAdmin`).
- Disabling, deleting or filtering a sink stops routing or storing data. Disabling the `_Default` sink stops entries going to the `_Default` bucket, which empties only as old entries reach the end of retention. Disabling stops only new entries; re-enabling does not backfill. Try these changes on a disposable project first.
- `_Required` can't be disabled or deleted; `_Default` can be disabled but not deleted. Folder / organization defaults for new resources are set with default resource settings for Cloud Logging.
- Deleting a sink that has a dedicated service account (sinks created before May 22, 2023) also deletes that service account; sinks created on or after May 22, 2023 use a shared service account, which isn't deleted.
- The writer identity is shared per resource. It shows as `None` in the console and is absent from API / gcloud output for sinks writing to a log bucket in the same project. Grant the roles on the destination project (or destination resource), not more widely; securing routed entries (including Access Transparency and Data Access audit logs, and Error Reporting data) is done with the destination's access control.
- Don't put sensitive information in sink filters; they are treated as service data. Log entries don't carry error group information, so sinks can't filter by error group.
- Destination limits: BigQuery destinations must be write-enabled (not linked datasets); Cloud Storage buckets with Rapid storage aren't supported; Pub/Sub topics with in-transit restrictions aren't supported; use global endpoints only; for project destinations there is a one-hop limit. See overview.md.
- Excluding GKE or Dataflow system logs can hamper troubleshooting; the source recommends at least keeping Dataflow `system` and `supportability` logs (otherwise the Dataflow Job details page can't show job logs).
- Assured Workloads environments may restrict this feature.
- Deprecated: none flagged in gcloud 593.0.0 help for these commands.
- The source also shows Console and REST steps, Metrics Explorer links for GKE / Dataflow volume, and client-library samples (see the Code samples page).
- Source: https://docs.cloud.google.com/logging/docs/export/configure_export_v2 (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [aggregated-sinks-overview.md](./aggregated-sinks-overview.md)
- [central-log-storage.md](./central-log-storage.md)
- [using-exported-logs.md](./using-exported-logs.md)
