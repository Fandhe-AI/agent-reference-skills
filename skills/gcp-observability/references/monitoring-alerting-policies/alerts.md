---
source: https://docs.cloud.google.com/monitoring/alerts
---

# Alerting Overview (Cloud Monitoring)

Alerting policies in Cloud Monitoring detect application and infrastructure issues by evaluating metric, log, or SQL query results. When the monitored data meets the conditions that you specify, Monitoring creates an alert and sends notifications. An alerting policy describes when to alert and how to notify; each alert records the data and when the conditions were met; a notification channel defines how you receive notifications (a policy can contain one or more channels).

## Signature / Usage

### Ways to create a policy

Pre-configured recommended alerting policies come from integrations (for example Google Kubernetes Engine, Compute Engine, Cloud SQL, MongoDB, Kafka, Elasticsearch); installing a package lets you enable its recommended policies and set the notification channel. New policies can be created in the Google Cloud console, the Cloud Monitoring API, the Google Cloud CLI, and Terraform.

```sh
gcloud monitoring policies create --policy-from-file="rising-cpu-usage.json"
```

### Alerting policy components

- Condition: when a resource or group of resources needs a response. It includes the data source, a static or dynamic threshold, and aggregation methods such as filters and group-by. It can monitor a single metric, multiple metrics, or a ratio of metrics, or use PromQL for complex expressions.
- Notification channels: who to notify.
- Documentation: text in notifications and alert pages (subject line and body).

## Options / Props

### Data types that a policy evaluates

| Policy type | Data | Notes |
|---|---|---|
| Metric-based | Time-series (metric) data stored by Monitoring | Includes log-based metrics |
| Log-based | Individual log entries stored by Cloud Logging | Notifies when a particular message appears in logs |
| SQL-based | Result of a SQL query run in Observability Analytics against log entries | Public Preview |

### Condition types (metric data)

| Condition type | Met when | API field (`Condition`) |
|---|---|---|
| Metric-threshold | Metric values are more than, or less than, a threshold for a retest window | `conditionThreshold` |
| Metric-absence | A monitored time series has no data for a retest window; maximum retest window is 24 hours | `conditionAbsent` |
| PromQL | A PromQL expression evaluates to true; any valid expression (metric combinations, ratios, dynamic thresholds); suited to alerting over more than 25 hours of data | `conditionPrometheusQueryLanguage` |
| Forecasted metric-value | The policy predicts that the threshold will be violated within the forecast window; the source overview states the window can range from 1 hour to 7 days | `conditionThreshold` with `forecastOptions` |

## Notes

- Condition types (metric data): Other `Condition` fields in the monitoring v3 Discovery document: `conditionMatchedLog` (log-based, `LogMatch`; must be the only condition), `conditionSql` (SQL-based), `conditionMonitoringQueryLanguage` (MQL).
- Filter on labels defined on monitored-resource types rather than on metric types when possible, particularly for high-cardinality metrics. If a resource label and a metric label capture similar information (for example resource `cluster` vs metric `kubernetes_cluster_name`), use the resource label.
- Do not rely on system- or user-defined resource metadata labels when selecting time series for sensitive alerting policies: they are added asynchronously and are not subject to the same latency expectations, so a policy that depends on them can behave erratically.
- Once enabled, a policy is evaluated continuously; you cannot restrict it to certain time periods. To pause it for a period, create a snooze.
- If an alert is open and a metric-based policy's conditions are no longer met, Monitoring closes the alert automatically and sends a notification about the closure.
- Discrepancy: this page says the forecast window can range from 1 hour to 7 days, while the monitoring v3 Discovery document describes `ForecastOptions.forecastHorizon` as 1 hour to 60 hours. Check the forecast page and the API reference before relying on a value.
- Pricing is not copied here; see the Google Cloud Observability pricing page (https://cloud.google.com/products/observability/pricing). Alerting on monthly log ingestion and trace span ingestion is described at https://docs.cloud.google.com/stackdriver/docs/observability/pricing-optimize-and-monitor.
- Snippet taken from https://docs.cloud.google.com/monitoring/alerts/policies-in-api
- Source: https://docs.cloud.google.com/monitoring/alerts (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [concepts-indepth.md](./concepts-indepth.md)
- [using-alerting-ui.md](./using-alerting-ui.md)
- [policies-in-api.md](./policies-in-api.md)
- [doc-variables.md](./doc-variables.md)
