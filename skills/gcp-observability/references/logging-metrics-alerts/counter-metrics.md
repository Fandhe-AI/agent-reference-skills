---
source: https://docs.cloud.google.com/logging/docs/logs-based-metrics/counter-metrics
---

# Configure counter metrics

Create, list, inspect, update and delete counter-type log-based metrics with the gcloud CLI or the Logging API. A counter metric counts log entries that match a filter, in a project or in a log bucket.

## Signature / Usage

### Create a metric

The filter can use regular expressions, should include a resource type, and can't exceed 20,000 characters.

```text
gcloud logging metrics create METRIC_NAME \
  --description="METRIC_DESCRIPTION" \
  --log-filter="FILTER" \
  [--bucket-name="BUCKET_NAME"]
```

A project-scoped metric:

```bash
gcloud logging metrics create error_count \
     --description "Errors in syslog." \
     --log-filter "resource.type=gce_instance AND log_id(\"syslog\") AND severity>=ERROR"
```

A bucket-scoped metric (the source's prose spells the flag `--bucket_name`; the help and the example use `--bucket-name`):

```bash
gcloud logging metrics create error_count \
    --description "Errors in syslog." \
    --log-filter "resource.type=gce_instance AND log_id(\"syslog\") AND severity>=ERROR" \
    --bucket-name projects/my-project/locations/global/buckets/my-test-bucket
```

### Create with the API

Call `projects.metrics.create`. The `parent` is the project; for a bucket-scoped metric, also set `bucketName` in the `LogMetric` body to `projects/PROJECT_ID/locations/LOCATION/buckets/BUCKET_ID`.

Adapted (not in the official docs): the source's second `parent` form, `projects/PROJECT_ID/locations/LOCATION/bucket/BUCKET_ID`, is dropped because the method accepts only a project as `parent`.

```text
projects/PROJECT_ID
```

Adapted (not in the official docs): the source's sample is not valid JSON (unquoted keys, missing commas, `...` elision); rewritten as valid JSON with the same fields.

```json
{
  "name": "my-metric",
  "description": "This is my metric.",
  "filter": "resource.type=gce_instance AND log_id(\"syslog\")",
  "metricDescriptor": {
    "labels": [
      {
        "key": "my-label",
        "valueType": "STRING",
        "description": "This is my label."
      }
    ]
  },
  "labelExtractors": {
    "my-label": "REGEXP_EXTRACT(jsonPayload.someField, \"before ([0-9]+) after\")"
  }
}
```

### Inspect

```bash
gcloud logging metrics list
gcloud logging metrics describe METRIC_NAME
```

Read the time series with the Cloud Monitoring `projects.timeseries.list` method, using the metric type:

```text
logging.googleapis.com/user/METRIC_ID
```

Resource name used by `projects.metrics.get` / `update`:

```text
projects/PROJECT_ID/metrics/METRIC_ID
```

### Update

Adapted (not in the official docs): the source writes `gcloud logging update`, which isn't a gcloud command; the command is `gcloud logging metrics update` (gcloud 593.0.0 help).

```bash
gcloud logging metrics update METRIC_NAME \
  --description="METRIC_DESCRIPTION" \
  --log-filter="FILTER" \
  --bucket-name=BUCKET_NAME
```

For distribution metrics or other fields, update from a JSON or YAML `LogMetric` file:

```bash
gcloud logging metrics update METRIC_NAME --config-from-file FILENAME
```

### Delete

```bash
gcloud logging metrics delete METRIC_NAME
```

## Options / Props

| Item | Detail |
|---|---|
| Filter length | At most 20,000 characters. |
| Units (Console) | Leave blank or `1`. |
| `LogMetric` fields for counters | `valueExtractor` and `bucketOptions` have no purpose and are omitted. |
| Labels | If the metric has no labels, omit `metricDescriptor` and `labelExtractors`. |
| New metric latency | Appears in the Logs Explorer and Monitoring menus right away; data is usually available in less than a minute. |
| Editable on update | Description, filter, referenced field names, regular expressions for the metric and its labels, new labels, and (bucket-scoped) the bucket. |
| Not changeable | Names or types of metrics or labels; existing labels can't be deleted. |

## Notes

- Requires a project with billing enabled and IAM permissions to create and view log-based metrics and to create alerting policies (https://docs.cloud.google.com/logging/docs/access-control#metrics-permissions).
- Don't put sensitive information in the filter; filters are treated as service data.
- Corrected from the official docs: the update section shows `gcloud logging update METRIC_NAME ...`; the command that exists is `gcloud logging metrics update`. With `--config-from-file`, top-level `LogMetric` fields not in the file aren't updated (gcloud help).
- `METRIC_NAME` must match an existing metric, or (per the source) the update command creates a new metric; the gcloud help says it updates an existing metric, so verify on a disposable project.
- Changing the bucket of a bucket-scoped metric: data collected before the change no longer reflects the current configuration; data collected for the previous bucket is not removed.
- Deleting a metric removes the metric definition. A metric that is monitored by an alerting policy can't be deleted (see troubleshooting); try deletions on a disposable project first.
- Corrected from the official docs: the source gives `projects/PROJECT_ID/locations/LOCATION/bucket/BUCKET_ID` as the `parent` for a bucket-scoped metric. In the Logging API Discovery document, `projects.metrics.create` takes `parent` "projects/[PROJECT_ID]" (pattern `^projects/[^/]+$`), and the bucket is the `LogMetric.bucketName` field ("The resource name of the Log Bucket that owns the Log Metric. ... For example:projects/my-project/locations/global/buckets/my-bucket"), which uses `buckets` (plural) like the gcloud `--bucket-name` example.
- You can't read a metric's time series from the gcloud CLI.
- The source also shows Console steps.
- Source: https://docs.cloud.google.com/logging/docs/logs-based-metrics/counter-metrics (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [logs-based-metrics.md](./logs-based-metrics.md)
- [labels.md](./labels.md)
- [bucket-lbm.md](./bucket-lbm.md)
- [troubleshooting.md](./troubleshooting.md)
