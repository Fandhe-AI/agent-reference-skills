---
source: https://docs.cloud.google.com/logging/docs/logs-based-metrics
---

# Log-based metrics overview

Log-based metrics are Cloud Monitoring metrics derived from the content of log entries. They can count matching entries or extract values such as latency, can be charted in Cloud Monitoring, and can be monitored by alerting policies. They apply at the project level or at the log bucket level.

## Signature / Usage

### Time series with gaps and zero values

For a counter metric, Logging keeps in-memory counters per stream (one stream per unique combination of metric and resource label values) and, every minute, updates the time series managed by Cloud Monitoring. The source's example series, where `(T1, -)` means no value was written and `(T3, 0)` means a written zero:

```text
Example time series: (T1, -), (T2, -), (T3, 0), (T4, 1), (T5, 0), (T6, -)
```

### Specify a single resource type in the filter

```text
severity>="ERROR"
resource.type="gce_instance"
```

## Options / Props

### Metric names in Cloud Monitoring

| Kind | Pattern |
|---|---|
| System | `logging.googleapis.com/SYSTEM_METRIC_NAME` |
| User-defined | `logging.googleapis.com/user/USER_METRIC_NAME` |

### Value-writing rules per stream

| Aggregated count for an interval | What is written |
|---|---|
| Non-zero | That value. |
| Zero, and an adjacent interval is non-zero | A zero. |
| Otherwise | Nothing; there is a data gap. |

### System-defined vs user-defined metrics

| Aspect | System-defined | User-defined |
|---|---|---|
| Scope | Project level only. | Project or log bucket. |
| Types | Mostly counters; some are boolean. | Counter or distribution. |
| Calculated from | Included logs only. | Included and excluded logs; by default all logs received by the Logging API for the project, regardless of inclusion or exclusion filters. |
| Labels | Predefined, can't be changed. | Labels you define. |
| Counted when | The entry passes through the sinks of the project where the metric is defined, and is stored in a log bucket (in any project). | Billing is enabled on the project; for bucket-scoped metrics the entry is stored in that bucket; for project-scoped metrics the entry passes through that project's sinks. |

### Data types

| Type | Meaning |
|---|---|
| Counter | Counts log entries matching a filter in a period. |
| Distribution | Collects values into histogram buckets (count, mean, sum of squared deviations, bucket counts; default or custom bucket layout). Use for latencies. |
| Boolean | Whether a log entry matches a filter. |

## Notes

- Value-writing rules per stream: Late-arriving entries (timestamp in an already processed interval) generate historical data that updates the previously written counts. Entries with a future timestamp are accumulated and counted when their timestamp corresponds to the current interval.
- Log-based metrics can't be created for other resources such as Cloud Billing accounts or organizations; they apply to a single project or a log bucket within a project.
- A user-defined metric only receives entries received after the metric is created; it is not backfilled from entries already in Logging.
- A counter time series can include zeros and gaps. When an alerting policy monitors a log-based metric, configure how the policy handles missing data.
- Specify a single resource type in the filter so the series matches the Cloud Monitoring data model and appears for that resource type in chart menus. Without a resource type, the metric is offered for multiple resource types although no entries from them are counted.
- Most log-based metrics have a default `log` label holding the `LOG_ID` part of `logName` (for example `cloudresourcemanager.googleapis.com%2Factivity`).
- Visibility: by default each project hosts a metrics scope containing only itself, so metrics are visible only to that project. Projects in a multi-project metrics scope see each other's metrics only as determined by the metrics scope each hosts; a project can appear in multiple metrics scopes.
- Limitation: you can't create log-based metrics that count entries containing an error group, or extract an error group ID into a label.
- All user-defined log-based metrics are Cloud Monitoring custom metrics and are chargeable; see https://cloud.google.com/products/observability/pricing. Quotas and limits: https://docs.cloud.google.com/logging/quotas#metric-limits.
- Snippets are the source's indented examples (it has no fenced code); the source also links to the Console flows on the pages listed under Related.
- Source: https://docs.cloud.google.com/logging/docs/logs-based-metrics (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [counter-metrics.md](./counter-metrics.md)
- [labels.md](./labels.md)
- [bucket-lbm.md](./bucket-lbm.md)
- [charts-and-alerts.md](./charts-and-alerts.md)
- [troubleshooting.md](./troubleshooting.md)
