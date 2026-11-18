---
source: https://docs.cloud.google.com/monitoring/api/v3/aggregation
---

# Filtering and aggregation

Filtering removes time-series data you don't want to analyze; aggregation combines points across time (alignment) and across series (reduction) into a smaller summary.

## Signature / Usage

The source page has no code. The block below is the time-series example from https://docs.cloud.google.com/monitoring/api/v3/metric-model; the `interval` of each point is what alignment buckets into alignment periods.

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

### Aggregation stages

| Stage | Also called | What it does |
|---|---|---|
| Filtering | | Hides data by time or by value of one or more labels. |
| Alignment | within-series aggregation | Buckets one series into regular alignment periods and computes one value per period with an aligner; the value is placed at the end of the period. |
| Reduction | cross-series aggregation | Combines aligned series into one with a reducer; series must be aligned first. By default reduces across all series into one; with grouping by labels, one series per group. |
| Secondary aggregation | | Applies a second reducer to the grouped series from primary aggregation. |

### Aligners and reducers (worked example, hourly periods)

| Function | Effect |
|---|---|
| max / mean / min | Largest / average / smallest value in the period (values 400, 350, 300, 200 give 400 / 312.5 / 200). |
| count | Number of values in the period (4). |
| sum | Sum of values (1250). |
| next older | Most recent value in the period (200). |

### Kind and type conversions

| Function | Behavior |
|---|---|
| `ALIGN_DELTA` | Converts cumulative or delta to a per-period change; interpolates when the alignment period does not match each sample's (start, end] interval (example: 3-minute period gives aligned values 10, 4, 9 MiB). |
| `ALIGN_RATE` | Same as `ALIGN_DELTA`, divided by the alignment period (0.056, 0.022, 0.050 MiB/second in the example). |
| `ALIGN_COUNT` | Changes the value type as a side effect. |
| `REDUCE_COUNT` | Applies to numeric, boolean, string and distribution data; yields a 64-bit integer count; only for gauge and delta metrics; leaves kind unchanged. |

## Notes

- Aligners and reducers (worked example, hourly periods): Full lists: `Aligner` and `Reducer` in the alertPolicies REST reference; the reducer list parallels the aligner list. Their reference entries list the metric kinds each conversion applies to.
- Cumulative metrics can't be charted directly; convert to a delta or rate (the delta is the difference of adjacent terms). Both cumulative and delta metrics can be converted to gauge.
- Choose an alignment period longer than the sampling period but short enough to show trends. If equal to the sampling period, `max`, `mean` and `min` give the same series. The data retention period is the longest meaningful alignment period.
- Do not use a secondary aligner of `ALIGN_SUM` when the primary aligner is `ALIGN_RATE`; the units are not intuitive or clear.
- Distribution-valued series follow the same concepts with additional constraints (see the distribution metrics charting page).
- Source: https://docs.cloud.google.com/monitoring/api/v3/aggregation (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/monitoring/api/v3/metric-model

## Related

- [kinds-and-types.md](./kinds-and-types.md)
- [metric-model.md](./metric-model.md)
- [latency-n-retention.md](./latency-n-retention.md)
