---
source: https://docs.cloud.google.com/monitoring/alerts/incidents-events
---

# Manage alerts: states, acknowledge, snooze, close

Alerts are Open, Acknowledged or Closed. You can acknowledge an alert, snooze its alerting policy, or close it; Monitoring also closes alerts automatically.

## Signature / Usage

### Alert states

- Open: the policy's conditions are being met, or there isn't data indicating the condition is no longer met. With multiple conditions, alerts open depending on how conditions are combined.
- Acknowledged: the alert is open and manually marked as acknowledged (typically under investigation).
- Closed: the system observed the condition stopped being met, you closed the alert, or 7 days passed without an observation that the condition continued to be met.

### Acknowledge, snooze, close (console)

On the **Alerts** page (**See all alerts**), use **More options** > **Acknowledge** / **Snooze** / **Close alert**, or the same buttons on the **Alert details** page (**Acknowledge alert**, **Snooze Policy** then pick the duration, **Close alert**).

### List open alerts (Monitoring API filter flag)

```text
--data-urlencode "filter=(open_time>=\"`date -u -d "1 DAY ago" +"%Y-%m-%dT%H:%M:%SZ"`\" AND state=open)"
```

The source notes that PromQL lets you specify a default value used when no measured value is available (no query is given).

## Options / Props

### Auto-close rules

| Condition type | Closed when |
|----------------|-------------|
| Metric-threshold | An observation shows the threshold isn't violated; or no observations arrive, the condition is configured to close alerts when observations stop, and the resource state is unknown or isn't disabled; or no observations arrive for the policy's auto-close duration and the condition isn't configured to close on missing data. |
| Metric-absence | An observation occurs; or no observations arrive for 24 hours after the policy's auto-close duration expires. |
| Forecast | A forecast predicts the series won't violate the threshold within the forecast window; or no observations arrive for 10 minutes with close-on-missing-data configured and resource state unknown or not disabled; or no observations arrive for the auto-close duration without that setting. |

### Auto-close duration

| Setting | Value |
|---------|-------|
| Default | 7 days |
| Minimum | 30 minutes |
| Configure with | Google Cloud console or Monitoring API |

### Close error messages

| Message | Meaning |
|---------|---------|
| `Unable to close alert with active conditions` | Data was received within the most recent alerting period. |
| `Unable to close alert. Please try again in a few minutes.` | Internal error. |

## Notes

- Snoozing an alerting policy prevents alerts and notifications during the period and closes all alerts related to the policy at snooze start. Use it during outages. It's a way to stop repeated notifications.
- Acknowledging doesn't stop repeated notifications; they continue at each interval while the alert is open. Create a snooze or disable the policy to stop them.
- If you close an alert and data later shows the condition is met, a new alert is created. Closing an alert doesn't close other alerts open for the same condition.
- The alert isn't closed on missing data when the resource state is known to be disabled; you can close it manually. Monitoring knows the state when the resource has the `metadata.system_labels.state` label and the policy isn't written with MQL.
- Ensure the steady state provides a signal when everything is OK; otherwise an alert stays open 7 days after the policy fires (for example, an error-count policy must produce 0 when there are no errors).
- Data retention and limits of alerts: see "Limits for alerting" (https://docs.cloud.google.com/monitoring/quotas#alerting_uptime_limits). Manage alerting policies by API: https://docs.cloud.google.com/monitoring/alerts/using-alerting-api.
- Snippet taken from the "List alerts" section of the same page (the sections on managing alerts have no code block).
- Source inconsistency: the curl filter writes `state=open` in lowercase, while the `Alert.state` enum in the monitoring v3 Discovery document is `STATE_UNSPECIFIED`, `OPEN`, `CLOSED` and the gcloud 593.0.0 help example for `gcloud alpha monitoring alerts list` uses `--filter="state=OPEN"`.
- Source: https://docs.cloud.google.com/monitoring/alerts/incidents-events (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [incidents-events.md](./incidents-events.md)
- [investigate-alerts.md](./investigate-alerts.md)
- [notification-options.md](./notification-options.md)
