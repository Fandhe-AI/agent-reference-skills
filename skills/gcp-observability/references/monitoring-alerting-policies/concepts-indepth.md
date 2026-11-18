---
source: https://docs.cloud.google.com/monitoring/alerts/concepts-indepth
---

# Behavior of Metric-Based Alerting Policies

How metric-based alerting policies align data, apply retest windows, combine multiple conditions, handle missing data, and decide when to open alerts and send notifications. This content does not apply to log-based alerting policies.

## Signature / Usage

### Alignment period and retest window

Data is regularized before evaluation: it is bucketed into regular intervals (the alignment period) and one value is computed per interval by the aligner. API fields: `aggregations.alignmentPeriod` and `aggregations.perSeriesAligner` in `MetricThreshold` / `MetricAbsence`. The retest window is the `duration` field of the same structures. The condition resets its retest window each time a measurement (or forecast) does not satisfy the condition.

- Metric-threshold: met when, for a single time series, every aligned measurement in the retest window violates the threshold.
- Metric-absence: met when no data arrives for a time series in the retest window.
- Forecast: met when every forecast produced during the window predicts a violation within the forecast window.

### Repeated-notification and auto-close fields (API)

Missing-data evaluation uses `evaluationMissingData` (in `MetricThreshold`; ignored when `duration` is zero) and auto-close uses `autoClose` in `AlertStrategy`. Fragment of the `AlertPolicy` JSON for repeated notifications, taken from the API page:

```text
  "alertStrategy": {
    "notificationChannelStrategy": [
      {
        "notificationChannelNames": [
          "projects/PROJECT_ID/notificationChannels/CHANNEL_ID"
        ],
        "renotifyInterval": "1800s"
      }
    ]
  }
```

## Options / Props

### Alignment and retest limits

| Setting | Rule |
|---|---|
| Minimum alignment period | At least 60 seconds and an integer multiple of 60 seconds; set at least the metric's sampling interval rounded up to a 60-second multiple |
| Maximum alignment period (metric-threshold) | At most 25 hours |
| Maximum (metric-absence) | Alignment period plus retest window must not exceed 25 hours |
| Lookback longer than 25 hours (up to 2 years) | Use PromQL; retest window (`duration`) must be zero; custom and log-based metrics not supported |
| Retest window `0` | Shown as "No retest" in the console; opens an alert on a single violating aligned measurement |
| Recommended retest window | At least 180 seconds (3 minutes) to avoid false alerts |
| Evaluation frequency | Fixed, except for PromQL where it varies with the query's lookback duration |

#### PromQL minimum evaluation intervals by lookback

| Lookback duration | Minimum evaluation interval |
|---|---|
| 25 hours 10 minutes to 8 days | 5 minutes |
| 8 days to 16 days | 1 hour |
| 16 days to 32 days | 2 hours |
| 32 days to 93 days | 6 hours |
| 93 days to 2 years | 12 hours |

### Multiple conditions (`combiner`)

| Console "Policy triggers" value | API `combiner` | Meaning |
|---|---|---|
| Any condition is met | `OR` | Alert if any resource causes any condition to be met |
| All conditions are met even for different resources for each condition (default) | `AND` | Alert for each met condition when all are met, even if different resources cause them |
| All conditions are met | `AND_WITH_MATCHING_RESOURCE` | Alert for each met condition when all are met, only if the same resource causes each; most stringent |

### Missing data (`evaluationMissingData`, metric-threshold)

| API value (console label) | Open alerts | New alerts | Details |
|---|---|---|---|
| `EVALUATION_MISSING_DATA_UNSPECIFIED` (Missing data empty) | Stay open | Not opened | Auto-close timer starts after a delay of at least 15 minutes with no data |
| `EVALUATION_MISSING_DATA_ACTIVE` (treated as violating) | Stay open | Can be opened | Closed when no data arrives for the auto-close duration plus 24 hours; behaves like a metric-absence condition when the condition is not met |
| `EVALUATION_MISSING_DATA_INACTIVE` (treated as not violating) | Closed | Not opened | Condition stops being met when data stops arriving |

### Missing data by workload type

| Workload type | Missing data setting | Auto-close |
|---|---|---|
| Continuous daemons and infrastructure (Compute Engine VMs, Cloud SQL, GKE nodes) | `EVALUATION_MISSING_DATA_NO_OP` or `EVALUATION_MISSING_DATA_ACTIVE` | Default (7 days) or 24 hours |
| Ephemeral and autoscaling (GKE pods, Cloud Run jobs and revisions, Cloud Tasks, Batch workers) | `EVALUATION_MISSING_DATA_INACTIVE` | 30 minutes to 2 hours |
| Periodic and scheduled (daily batch, hourly cron) | `EVALUATION_MISSING_DATA_INACTIVE` | 30 minutes to 2 hours (at least 30 minutes) |

### Limits

| Limit | Value |
|---|---|
| Open alerts per policy at one time | 1,000 (a single notification channel can receive up to 1,000 notifications at one time; applies to each channel independently) |
| Open alerts per time series | One; a repeat crossing while the alert is open does not open another |
| Conditions per policy | 6 |

### Latency contributors

| Source | Value |
|---|---|
| Google Cloud metric visibility | Most metrics not visible for 60 seconds after collection; alerting computations take up to an additional 5 minutes 30 seconds |
| AWS CloudWatch metrics | Visibility delay can be several minutes |
| Uptime checks | Average of two minutes (from the end of the retest window) |
| Third-party cloud data delay | Up to 30 minutes, 5-15 minutes most common |
| Notification channels | Email / SMS network latency sometimes approaching minutes; SMS and Slack delivery is not guaranteed |

## Notes

- Multiple conditions (`combiner`): A policy can contain up to 6 conditions. With the API or with multiple conditions you must specify the combiner.
- Multiple conditions (`combiner`): `AND_WITH_MATCHING_RESOURCE` requires that every condition monitors the same resource type (for example `gce_instance`) and that the resource labels remaining after aggregation are the same for all conditions (for `gce_instance`: `project_id`, `instance_id`, `zone`; if one condition groups by `zone`, all must).
- Missing data (`evaluationMissingData`, metric-threshold): The default auto-close duration is seven days. The source also uses `EVALUATION_MISSING_DATA_NO_OP` as an equivalent of the unspecified default. PromQL conditions do not support these settings; Monitoring closes an open PromQL alert after data is missing for two evaluation intervals plus a grace period. Setting requires a non-zero retest window.
- A notification goes to all channels of the policy; you cannot restrict it to a subset. With multiple conditions, one notification and alert per time series that causes a condition to be met is created; you cannot create only one alert for a multi-condition policy.
- Policies created with the API notify on both open and close; policies created in the console notify on close only if that behavior is enabled.
- No alert or notification is created when the policy is disabled (conditions are still evaluated; on re-enable the most recent retest window, which may include data from before and after, is evaluated, and the open alerts remain until the auto-close duration expires), when it is snoozed (all open alerts of the policy are closed), or when the 1,000 open-alert limit is reached.
- Minimizing missing-data problems: use longer retest windows (less responsive), choose metrics with lower collection delay (agent metrics, custom metrics written directly, log-based metrics when log collection is not delayed), or contact the third-party cloud provider.
- Repeated notifications: see the API page for the `renotifyInterval` range (at least 30 minutes, at most 24 hours).
- Snippet taken from https://docs.cloud.google.com/monitoring/alerts/policies-in-api
- Source: https://docs.cloud.google.com/monitoring/alerts/concepts-indepth (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [alerts.md](./alerts.md)
- [using-alerting-ui.md](./using-alerting-ui.md)
- [policies-in-api.md](./policies-in-api.md)
