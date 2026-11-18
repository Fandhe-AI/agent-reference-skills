---
source: https://docs.cloud.google.com/logging/docs/logs-based-metrics/charts-and-alerts
---

# Alert on log-based metrics

Create an alerting policy that notifies you when a log-based counter metric crosses a threshold, using the Google Cloud console. Alerting policies on log-based metrics can't extract data from log entries; for that, create a log-based alert.

## Signature / Usage

### Select the metric and resource

In **Log-based Metrics**, open **More** on the metric and choose **Create alert from metric**. Verify that **Select a metric** lists a `metric.type` and a `resource.type`, adding a `resource.type` clause if needed. The source's example:

```text
metric.type="logging.googleapis.com/byte_count"
AND resource.type="gce_instance"
```

### Create the policy

1. Choose a **Rolling window** large enough to count multiple matching entries and cover the ingestion delay (up to 10 minutes). For a "heartbeat" entry expected every 7 minutes, use at least 24 minutes.
2. **Next**, **Threshold**, enter a **Threshold value** (optionally **Alert trigger** and **Threshold position**).
3. Optional: **Retest window** and **Advanced Options** for missing data (the default is typically appropriate).
4. **Next**, select **Notification channels**; optionally add **Documentation**; name the policy; **Create policy**.

## Options / Props

| Item | Detail |
|---|---|
| Prerequisites | IAM role with permissions to create and view log-based metrics and to create alerting policies; configured notification channels. |
| Rolling window | Large enough for multiple matching entries plus ingestion delay (up to 10 minutes). |
| Documentation | Must not use label extraction from log entries. |
| Other ways to create | Cloud Monitoring API and `gcloud monitoring policies`. |

## Notes

- Log-based metric data can have gaps that cause false notifications; a larger rolling window reduces the risk (see troubleshooting).
- Policies on a log-based metric can't extract data from log entries; for notifications that carry extracted log fields, use a log-based alert.
- Snippet is the source's filter example (the page has no fenced code); the source describes the Console flow only.
- Source: https://docs.cloud.google.com/logging/docs/logs-based-metrics/charts-and-alerts (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [logs-based-metrics.md](./logs-based-metrics.md)
- [troubleshooting.md](./troubleshooting.md)
- [log-based-alerts.md](./log-based-alerts.md)
