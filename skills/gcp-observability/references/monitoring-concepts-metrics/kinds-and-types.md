---
source: https://docs.cloud.google.com/monitoring/api/v3/kinds-and-types
---

# Value types and metric kinds

Every Cloud Monitoring metric has a value type (`ValueType`) and a metric kind (`MetricKind`) that define the data format of each point and how consecutive points relate over time.

## Signature / Usage

The source page has no code. The following block is the time-series example from https://docs.cloud.google.com/monitoring/api/v3/metric-model; it shows where `metricKind` and `valueType` appear in a time series.

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

### Value types

| Value type | Meaning |
|---|---|
| `BOOL` | Boolean. |
| `INT64` | 64-bit integer. |
| `DOUBLE` | Double-precision float. |
| `STRING` | String. |
| `DISTRIBUTION` | A group of values: statistics such as mean, count, max, and optionally a histogram across ranges. Latency metrics typically use distributions. |

### Metric kinds

| Kind | Meaning |
|---|---|
| `GAUGE` | Value measures a specific instant (CPU utilization, current temperature). |
| `DELTA` | Value measures the change in a time interval; on reads the interval is half-open, `(startTime, endTime]`. Request counts are delta metrics. |
| `CUMULATIVE` | Value constantly increases over time (for example total bytes sent). |

### Supported combinations

| Value type | GAUGE | DELTA | CUMULATIVE |
|---|---|---|---|
| BOOL | yes | no | no |
| INT64 | yes | yes (1) | yes (4) |
| DOUBLE | yes | yes (1) | yes (4) |
| STRING | yes (1) | no | no |
| DISTRIBUTION | yes (2) | yes (1, 3) | yes (4) |

| Footnote | Text |
|---|---|
| 1 | Not permitted in custom metrics (`custom.googleapis.com`). |
| 2 | Not permitted for log-based metrics. |
| 3 | The only combination permitted for log-based metrics (`logging.googleapis.com/user`) with value type `DISTRIBUTION`. |
| 4 | Cumulative metrics can't be used directly for charting or alerting in Monitoring, but can be aggregated into non-cumulative metrics that can. |

## Notes

- All metrics that count discrete items over a time interval are delta metrics; for historical implementation reasons they are reported as floating-point numbers.
- When creating your own metrics, use only valid combinations of value type and metric kind.
- String-valued custom metrics are not supported. Emulate them with a GAUGE metric whose INT64 value is an enum mapped to a string externally, or with a GAUGE metric with a BOOL value plus a label holding the string (for example label `status_value` with OK, OFFLINE, PENDING; each update writes one series per value, 1 for true and 0 for false).
- Source: https://docs.cloud.google.com/monitoring/api/v3/kinds-and-types (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/monitoring/api/v3/metric-model

## Related

- [metric-model.md](./metric-model.md)
- [aggregation.md](./aggregation.md)
- [custom-metrics.md](./custom-metrics.md)
