---
source: https://docs.cloud.google.com/logging/docs/logs-based-metrics/troubleshooting
---

# Troubleshoot log-based metrics

Diagnosis guidance for missing data, delayed counts, false-positive alerts, high cardinality, invalid names, incorrect values, truncated labels and metrics that can't be deleted. It applies only to metric data derived from logs, not to metrics written directly by Google Cloud services or applications.

## Signature / Usage

### Inspect and delete a metric from the CLI

The source has no code block. Snippet taken from https://docs.cloud.google.com/logging/docs/logs-based-metrics/counter-metrics. Delete any alerting policy that monitors the metric first (see the table below).

```bash
gcloud logging metrics list
gcloud logging metrics delete METRIC_NAME
```

### Alignment period for heartbeat metrics

For a "heartbeat" entry expected every 7 minutes, set the alignment period to at least 24 minutes (ingestion delay up to 10 minutes plus two samples). In the API this is `aggregations.alignmentPeriod` of the condition; in the Console it is the **Rolling window** menu.

### Audit-log metrics and unresolved variables

For a log-based metric over all audit logs, don't use `resource.type="audited_resource"`; use the filter `logName:"cloudaudit.googleapis.com"`. An alerting policy that monitors a log-based metric can't resolve `${log.extracted_label.KEY}` in its documentation field; use a log-based alert instead.

## Options / Props

### Symptoms and causes

| Symptom | Cause / fix |
|---|---|
| Cannot view or create metrics | Metrics apply only to one project or one bucket in a project (not billing accounts or organizations) and only for logs received there; check IAM permissions. Assured Workloads environments may restrict the feature. |
| Metric is missing data | Entries don't match the filter; metric isn't backfilled; wrong field or regexp; counts delayed up to 10 minutes; entry timestamped more than 24 hours in the past or 10 minutes in the future isn't counted (recorded in `logging.googleapis.com/logs_based_metrics_error_count`); metric created after the entries arrived; rare, short data gaps. |
| Resource type "undefined" | Some Logging-only resource types map to `global` or another Monitoring type; see the Logging resource mappings page. |
| Alerts not created or false-positive | Alignment period too short, especially with *less than* logic, percentile conditions on distribution metrics, or data gaps; entries can arrive late (`timestamp` vs `receiveTimestamp` can differ by minutes). |
| Too many time series | Cardinality above the limits (see below). |
| Values aren't correct | Duplicate entries (same `timestamp` and `insertId`) are suppressed in Logs Explorer but each counted by log-based metrics; entries outside the timestamp bounds aren't counted; internal retries can create duplicates. |
| Label values truncated | Values for user-defined labels must not exceed 1,024 bytes. |
| Cannot delete a custom metric | Console error `There is an unknown error while executing this operation`: refresh the page; delete any alerting policies that monitor the metric first. |

### Limits

| Limit | Value |
|---|---|
| Time series per metric | Maximum 30,000. |
| Active time series per monitored resource | 1,000,000; throttling can occur below 30,000. For project-level metrics the resource is the one in the log entry; for bucket-scoped metrics it is `logging_bucket`. |
| Metric name | At most 100 characters; `A-Z a-z 0-9` and `_ - . , + ! * ' ( ) % \ /`; `/` denotes hierarchy and can't be first. |
| Ingestion delay | Up to 10 minutes. |
| Accepted timestamp window | Not more than 24 hours in the past or 10 minutes in the future. |

### System metrics for cardinality

| Metric type |
|---|
| `logging.googleapis.com/metric_throttled` |
| `logging.googleapis.com/time_series_count` |
| `logging.googleapis.com/metric_label_throttled` |
| `logging.googleapis.com/metric_label_cardinality` |

## Notes

- To avoid high cardinality: don't store sizes, counts, durations, URLs, IP addresses or unique IDs in labels; avoid unbounded text or numeric values; extract only values of known cardinality such as status codes. High cardinality can throttle the metric, slow charts and add Monitoring API query cost.
- A single missing point can make a "sum below one" heartbeat policy fire, because the policy injects a synthetic value that duplicates the most recent sample (most likely zero); count multiple heartbeats to reduce false notifications.
- You can't eliminate duplicate log entries; metric values can therefore be slightly too large.
- Snippet taken from https://docs.cloud.google.com/logging/docs/logs-based-metrics/counter-metrics (the page has no fenced code). Deleting a metric removes its definition; try it on a disposable project first. The source also mentions Console steps.
- Source: https://docs.cloud.google.com/logging/docs/logs-based-metrics/troubleshooting (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [logs-based-metrics.md](./logs-based-metrics.md)
- [labels.md](./labels.md)
- [charts-and-alerts.md](./charts-and-alerts.md)
- [log-based-alerts.md](./log-based-alerts.md)
