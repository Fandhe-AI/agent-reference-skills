---
source: https://docs.cloud.google.com/monitoring/api/v3/metric-model
---

# Metric model: resources, metrics, labels and time series

How monitored-resource types, metric types, labels and time series work together in Cloud Monitoring. Use it to query data, build charts and alerts, and design custom metrics.

## Signature / Usage

### Retrieve time series with `timeSeries.list`

In the `timeSeries.list` reference page (APIs Explorer) the source enters these values: `name` = `projects/PROJECT_ID`; `filter` = `metric.type="logging.googleapis.com/log_entry_count" resource.type="gce_instance"`; `interval.start_time` 20 minutes earlier than `interval.end_time`. Example response from the source (elisions are in the source):

```text
{
  "timeSeries": [
    {
      "metric": {
        "labels": {
          "severity": "INFO",
          "log": "compute.googleapis.com/activity_log"
        },
        "type": "logging.googleapis.com/log_entry_count"
      },
      "resource": {
        "type": "gce_instance",
        "labels": {
          "instance_id": "0",
          "zone": "us-central1",
          "project_id": "your-project-id"
        }
      },
      "metricKind": "DELTA",
      "valueType": "INT64",
      "points": [
        {
        "interval": {
            "startTime": "2024-03-29T13:53:00Z",
            "endTime": "2024-03-29T13:54:00Z"
          },
          "value": {
            "int64Value": "0"
          }
        },
        ...
      ]
    },
    ...
  ]
}
```

## Options / Props

### Concepts

| Concept | Detail |
|---|---|
| Monitored-resource type | Described by a monitored-resource descriptor; about 270 types (generic nodes and tasks, GKE components, Bigtable tables, AWS resources, ...). Entry shows Type (for example `gcs_bucket`), Display name, Description, Labels. |
| Metric type | Described by a metric descriptor; about 6,500 types, and you can define new ones. Entry shows Metric type, Launch stage (Alpha, Beta, GA), Display name, Kind / Type / Unit, Monitored resources, Description, Labels. |
| Namespace prefix | For example `storage.googleapis.com`; all metric types of one monitored-resource type share it; omitted in the list tables. |
| Unit `1` | Used when no unit is needed (counts). |
| Delta metric | Records the change over a period (each point is the number of API calls since the previous point). |
| Built-in metric types | Defined by Google Cloud services including Cloud Monitoring; external metrics (prefix typically `external.googleapis.com`) are a subset defined with open-source projects or third-party providers. |
| Custom metrics | Prefix `custom.googleapis.com` or `prometheus.googleapis.com` (the latter usually from Managed Service for Prometheus). |
| Resource metadata labels | System metadata labels (read-only) plus user labels (for example on VMs); usable in time-series filters; appear in query results only when explicitly aggregated by. |

### Labels and cardinality

| Item | Detail |
|---|---|
| Label | Key-value pair. Example: `storage.googleapis.com/api/request_count` has labels `response_code` and `method`; `gcs_bucket` has `project_id`, `bucket_name`, `location`. |
| Metric cardinality | Number of unique label-value combinations of the metric type (example: 3 colors × 2 zones = 6). A maximum; the effective value may be lower. |
| Resource cardinality | Same calculation for the monitored-resource type. |
| Total cardinality | Metric cardinality × resource cardinality (1,000 × 100 = 100,000 time series). |
| Label design | Keep the set of values for any label constrained; do not use timestamps, unique identifiers, user IDs, IP addresses or unparameterized URLs as metric labels. |

## Notes

- A time series holds the metric type name plus one combination of metric label values, (timestamp, value) pairs, and the monitored resource with one combination of resource label values. Cloud Monitoring does not record "empty" time series: a metric type with no data in the project never appears.
- Some metric types pair with more than one monitored-resource type.
- Via the API you retrieve only data visible to the Google Cloud project in the call (for example only that project's Cloud Storage buckets).
- Do not rely on system- or user-defined resource metadata label values for sensitive alerting policies or responsive operations such as autoscaling: metadata labels are added asynchronously and are not subject to the same latency expectations as labels defined by metric or monitored-resource types.
- Query performance depends mostly on the volume of data requested and on the number of time series. For Prometheus metrics, relabeling can modify labels and drop unwanted series. The Metrics Management page (default window: previous 1 day) identifies metrics with cardinality problems. Limits on user-defined metrics are in Quotas and limits (https://docs.cloud.google.com/monitoring/quotas#custom_metrics_quotas).
- The source response example contains `...` elisions, so it is tagged `text`, not `json`. The source also shows console steps and a diagram, omitted here.
- Source inconsistency: this page says "If a metric has a prefix of `custom.googleapis.com` or `prometheus.googleapis.com`, then it is a custom metric", while the user-defined metrics page (https://docs.cloud.google.com/monitoring/custom-metrics) lists the allowable prefixes for user-defined metric types as `custom.googleapis.com/`, `workload.googleapis.com/`, `external.googleapis.com/user` and `external.googleapis.com/prometheus`. `prometheus.googleapis.com` metrics "usually come from Google Cloud Managed Service for Prometheus" (this page).
- Source: https://docs.cloud.google.com/monitoring/api/v3/metric-model (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [kinds-and-types.md](./kinds-and-types.md)
- [naming-conventions.md](./naming-conventions.md)
- [aggregation.md](./aggregation.md)
- [latency-n-retention.md](./latency-n-retention.md)
