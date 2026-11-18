---
source: https://docs.cloud.google.com/monitoring/alerts/incidents-events
---

# Investigate an alert and explore related alerts

The **Alert details** page shows the alert timeline, charts of the monitored metric data, and links to related alerts and log entries, to help identify the cause of an alert.

## Signature / Usage

### Metric types offered by the Alerts filter

Selecting **Metric type** and entering `usage_time` offers only matching types, for example:

```text
agent.googleapis.com/cpu/usage_time
compute.googleapis.com/guest/container/cpu/usage_time
container.googleapis.com/container/cpu/usage_time
```

### Explore metric data

Use the **Alert Metrics** chart (timeline plus the time series that caused the condition to be met). **Show all timeseries** toggles between the offending series and all series the condition evaluates; change the range with the toolbar selector or by highlighting on the chart. **Explore Data** opens the Metrics Explorer, aggregated and filtered to align with the timeline.

### Explore log entries

The **Logs** pane shows log entries matching the resource type and labels of the time series that triggered the alert. If the policy monitors a log-based metric defined in the same project, it shows entries matching that metric's filter query, without condition filters or aggregation labels such as `groupByFields`. **View in Logs Explorer** (select a scoping project) provides more tools.

## Options / Props

### Alert details sections

| Section | Content |
|---------|---------|
| Associated with application | For policies tied to an App Hub application: the application ID with a dashboard link, and a workload or service with a dashboard link. |
| Labels | Labels and values of the monitored resource and metric of the time series that caused the alert, plus user labels defined in the policy. |
| Documentation | The notification documentation template from the policy; shows "No documentation is configured." if none. |
| Related alerts | Alerts created when another condition of the same policy was met, or alerts sharing a label with this alert. |

## Notes

- Caution: if you work with Google Cloud support to investigate an alert, don't modify the associated alerting policy. Modifying a policy makes Cloud Monitoring discard the precomputed data used to decide when to create an alert, which loses the historical record of the alert.
- `resource.type` appears as `timeseries_query` for MQL-based alerts and `prometheus_target` for PromQL-based alerts when the resource type can't be inferred; the **Logs** pane might then show no logs. Click **View in Logs Explorer** or **Explore Data** and remove the `resource.type` clause. MQL (Monitoring Query Language) is not covered as a current feature here.
- Logs shown can contain personal data or secrets from your workloads; don't log credentials.
- Labels and documentation: see "Annotate alerts with labels" and "Annotate notifications with user-defined documentation" in the Monitoring docs.
- Source: https://docs.cloud.google.com/monitoring/alerts/incidents-events (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [incidents-events.md](./incidents-events.md)
- [manage-alerts.md](./manage-alerts.md)
