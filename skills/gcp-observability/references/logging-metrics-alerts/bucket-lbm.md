---
source: https://docs.cloud.google.com/logging/docs/logs-based-metrics/bucket-lbm
---

# Bucket-scoped log-based metrics

Bucket-scoped log-based metrics are user-defined metrics that evaluate the log entries routed to a specific log bucket. They cover logs routed from one project to a bucket in another project and logs routed into a bucket through an aggregated sink.

## Signature / Usage

### Create a bucket-scoped metric

The source has no code block. Snippet taken from https://docs.cloud.google.com/logging/docs/logs-based-metrics/counter-metrics:

```bash
gcloud logging metrics create error_count \
    --description "Errors in syslog." \
    --log-filter "resource.type=gce_instance AND log_id(\"syslog\") AND severity>=ERROR" \
    --bucket-name projects/my-project/locations/global/buckets/my-test-bucket
```

## Options / Props

### `logging_bucket` monitored-resource labels

| Label | Meaning |
|---|---|
| `project_id` | Your project ID, such as `my-test-project`. |
| `bucket_id` | Name of the log bucket associated with the metric, such as `my-test-bucket`. |
| `location` | Location of the log bucket. |
| `monitored_resource_type` | The `type` of the `MonitoredResource` in the entry's `resource` field. |
| `source_resource_container` | Project, folder or organization that sent the entry: `projects/PROJECT_ID`, `organizations/ORGANIZATION_ID` or `folders/FOLDER_ID`. |

### Differences from project-scoped metrics

| Aspect | Bucket-scoped behavior |
|---|---|
| Where defined | In the project that contains the destination (source) bucket; not at folder or organization level. |
| What is evaluated | All entries routed to the bucket, from the same or another project. |
| Visibility | Only the defining project by default; any project that includes the bucket's project in its metrics scope also sees it. |
| Routing projects | Don't need to be in any metrics scope. If a routing project isn't in any metrics scope, its other information isn't visible. |
| Monitored resource | `logging_bucket`. |

## Notes

- To track the folder or organization an entry came from, define labels in the metric that record it.
- Metric data is visible to any project that includes the bucket's project in its metrics scope; consider this before routing sensitive logs into a bucket whose project is in widely shared metrics scopes.
- Source: https://docs.cloud.google.com/logging/docs/logs-based-metrics/bucket-lbm (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [logs-based-metrics.md](./logs-based-metrics.md)
- [counter-metrics.md](./counter-metrics.md)
- [labels.md](./labels.md)
