---
source: https://docs.cloud.google.com/monitoring/api/v3/latency-n-retention
---

# Latency and retention of metric data

How long Cloud Monitoring retains metric data and how quickly sampled points become visible. Both vary by metric type and source.

## Signature / Usage

The source page has no code. The block below is the `timeSeries.list` response example from https://docs.cloud.google.com/monitoring/api/v3/metric-model. When you read data with the API, the query `interval` is where an offset for latency is applied.

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

### Latency by metric source

| Metric source | Latency |
|---|---|
| Google Cloud metrics | Per metric, stated in the metrics list, for example "Sampled every 60 seconds. After sampling, data is not visible for up to 240 seconds." (up to 4 minutes; the timestamp can be that old). Does not apply to user-defined metrics. |
| User-defined metrics (custom metrics, OpenTelemetry-collected metrics, Ops Agent application metrics, Prometheus metrics) | Typically visible and queryable within 3 to 7 seconds, excluding network latency. |

### Where latency matters

| Use | Effect |
|---|---|
| Client-library reads | May need an offset in the query interval. |
| Autoscaling | Metric latency affects responsiveness; some Pub/Sub metrics have latencies of 2 to 4 minutes. |
| Alerting policies | Alert creation can be delayed by up to the metric latency (for example 180 seconds). Cloud Monitoring automatically accounts for the underlying metric's latency when evaluating alerting policies. |

## Notes

- Retention depends on the metric type (see Data retention in Quotas and limits, https://docs.cloud.google.com/monitoring/quotas#data_retention_policy). Expired data points are deleted; when all points in a time series expire, the time series is deleted and no longer appears in charts or API results. The page itself gives no numeric retention periods.
- To keep metric data beyond the retention period, copy it manually to another location such as Cloud Storage or BigQuery (stated on the user-defined metrics page).
- Do not rely on system- or user-defined resource metadata label values for sensitive alerting policies or autoscaling; they are added asynchronously and have no latency guarantee.
- Source: https://docs.cloud.google.com/monitoring/api/v3/latency-n-retention (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/monitoring/api/v3/metric-model

## Related

- [metric-model.md](./metric-model.md)
- [custom-metrics.md](./custom-metrics.md)
