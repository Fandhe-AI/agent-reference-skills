---
source: https://docs.cloud.google.com/monitoring/promql/promql-in-alerting
---

# PromQL-based alerting policies

PromQL queries in alerting policies allow complex conditions such as metric ratios, dynamic thresholds based on another metric, and combined metrics. These policies can evaluate up to 2 years of metric data. Conditions can reference any Cloud Monitoring metric (system, custom, log-based, Prometheus); non-Prometheus metric names must be translated to PromQL syntax.

## Signature / Usage

Example query for a condition (taken from https://docs.cloud.google.com/monitoring/promql/create-promql-alerts):

```text
rate(kube_pod_container_status_restarts[30m]) * 1800 > 1
```

Make any `rate` duration at least as long as the evaluation interval so no data is missed; for a 1 hour evaluation interval use `rate(metric[1h])`.

### Ways to create the policy

- Console with the PromQL code editor: Create PromQL-based alerting policies (Console).
- gcloud CLI or the Monitoring API `AlertPolicy`: see create-promql-alerts.md.
- Migrate Prometheus alerting rules and notification channels: see promql-migrate.md.

## Options / Props

### Evaluation interval by query look back range (Preview: query over up to 2 years)

| Query look back range | Minimum (default) evaluation interval |
|---|---|
| Up to 25 hours^1^ | 30 seconds |
| 25 hours to 8 days | 5 minutes |
| 8 days to 16 days | 1 hour |
| 16 days to 32 days | 2 hours |
| 32 days to 93 days | 6 hours |
| 93 days to 2 years | 12 hours |

### Restrictions and limits

| Item | Limit |
|---|---|
| Filters on system metadata labels | Don't add them to PromQL-based alerting policies. |
| Retest window | At most 24 hours. Retest window + alignment period + `offset` time shift must be at most 25 hours. |
| Retest windows for data older than 25 hours | Disabled. |
| Query deadline for conditions over more than 25 hours of data | 2 minutes (same as Metrics Explorer). |
| Custom metrics (`custom.googleapis.com`) and user-defined log-based metrics (`logging.googleapis.com/user/`) | Only the most recent 25 hours of data can be alerted on. |
| Metric descriptor | A referenced metric must already have an equivalent metric descriptor, unless validation is disabled through the API (`disableMetricValidation`). |
| Ratio of metrics | Set the duration to at least twice the evaluation interval; shorter durations can produce false alerts. |
| Autoclose | Alerts do not follow the alerting policy autoclose duration; an alert closes at the larger of 270 seconds and twice the condition's evaluation interval after the condition was last met. |

## Notes

- Evaluation interval by query look back range (Preview: query over up to 2 years): Unlike other alerting policy types, which only support querying over 25 hours of metric data, PromQL can alert on up to 2 years. Policies that operate over the most recent 25 hours (alignment period plus any `offset` shift) can evaluate as frequently as every 30 seconds.
- Evaluation interval by query look back range (Preview: query over up to 2 years): ^1^ Some metrics from Google Cloud services only support 30-second evaluation intervals for up to 23 hours and 30 minutes.
- The 2-year query feature is Preview ("Pre-GA Offerings Terms"; pre-GA features are available "as is" and might have limited support).
- For maximum reliability keep retest window + alignment period + `offset` shift at most 25 hours; PromQL alerting is significantly more reliable over the most recent 25 hours.
- Use cases listed for long look back: compare the last 5 minutes to the same period 1 week ago; a 7-day slow burn policy; alert when the last hour is more than 3 standard deviations from the last month's average; `predict_linear` over the last week to predict a threshold breach in the next day.
- Pricing: see the Google Cloud Observability pricing page (https://cloud.google.com/products/observability/pricing).
- The source has no code samples; the snippet above is borrowed. Console, Terraform forms are not shown in the source.
- Source: https://docs.cloud.google.com/monitoring/promql/promql-in-alerting (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/monitoring/promql/create-promql-alerts

## Related

- [create-promql-alerts.md](./create-promql-alerts.md)
- [promql-migrate.md](./promql-migrate.md)
- [promql.md](./promql.md)
