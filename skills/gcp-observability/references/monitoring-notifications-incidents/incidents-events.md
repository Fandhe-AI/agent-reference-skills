---
source: https://docs.cloud.google.com/monitoring/alerts/incidents-events
---

# Alerts for metric-based alerting policies: view and list

Cloud Monitoring alerts track issues when time-series data meets the conditions of a metric-based alerting policy. For each alert Monitoring sends a notification and creates an **Alert details** page. Monitoring doesn't create an alert if the policy is snoozed or disabled, or if the number of alerting policies or alerts exceeds the limits for alerting. Supported only for Google Cloud projects (for App Hub configurations use the host or management project).

## Signature / Usage

### Get an alert (gcloud, alpha track)

```bash
gcloud alpha monitoring alerts describe ALERT_NAME
```

`ALERT_NAME` is the resource name, for example `projects/my-project/alerts/my-alert-id`. Response:

```text
{
  "name": "projects/my-project/alerts/my-alert-id1",
  "state": "OPEN",
  "open_time": "2025-06-11T09:53:46Z",
  "close_time": "2025-06-13T10:11:36Z",
  "resource": {
    "type": "gce_instance",
    "labels": {
      "zone": "us-west1",
      "instance_id": "123456789",
      "project_id": "my-project"
    }
  },
  "metric": {
    "labels": {
      "instance_name": "my-instance1"
    },
    "type": "compute.googleapis.com/instance/cpu/usage_time"
  },
  "policy": {
    "name": "projects/my-project/alertPolicies/POLICY_1",
    "displayName": "my-policy"
  },
  "summaryText": "[ALERT] VM Instance - CPU usage on my-project my-instance1"
}
```

### List alerts (gcloud, alpha track)

```bash
gcloud alpha monitoring alerts list
```

### Get an alert (Monitoring API `alerts.get`)

```bash
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "x-goog-user-project: PROJECT_ID" \
     "https://monitoring.googleapis.com/v3/projects/PROJECT_ID/alerts/ALERT_ID"
```

### List alerts (Monitoring API `alerts.list`)

Adapted (not in the official docs): `-G` added so the `--data-urlencode` filters below are sent as the query string of the GET request.

```bash
curl -G -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "x-goog-user-project: PROJECT_ID" \
     "https://monitoring.googleapis.com/v3/projects/PROJECT_ID/alerts"
```

Add one of these `curl` flags to filter (opened in the last hour; open alerts of the last day; between two periods; by user label `app` = `my-gke-app`):

```text
--data-urlencode "filter=(open_time>=\"`date -u -d "1 hour ago" +"%Y-%m-%dT%H:%M:%SZ"`\")"
--data-urlencode "filter=(open_time>=\"`date -u -d "1 DAY ago" +"%Y-%m-%dT%H:%M:%SZ"`\" AND state=open)"
--data-urlencode "filter=(open_time>=\"`date -u -d "2 DAY ago" +"%Y-%m-%dT%H:%M:%SZ"`\" AND open_time<=\"`date -u -d "1 DAY ago" +"%Y-%m-%dT%H:%M:%SZ"`\")"
--data-urlencode "filter=(policy.user_labels.app=\"my-gke-app\")"
```

## Options / Props

### `gcloud alpha monitoring alerts list` flags

| Flag | Description |
|------|-------------|
| `--filter` | Filter expression, by time or label, for example `--filter='close_time>="2025-09-10T00:00:00Z"'` or `--filter='resource.labels.key="value"'`. |
| `--sort-by` | Comma-separated fields to sort by, for example `--sort-by=open_time`. |
| `--uri` | Print a list of resource URIs instead of the default output. |
| `--limit` | Set to `2` or greater to limit the number of alerts returned. Don't use together with `--filter`. |

### Alerts table filter properties (console)

| Property |
|----------|
| State of the alert |
| Name of the alerting policy |
| When the alert was opened or closed |
| Metric type |
| Resource type |

### Roles

| Task | Roles (on the project) |
|------|------------------------|
| View alerts by gcloud or API | `roles/monitoring.alertViewer` |
| View alerts in the console | `roles/monitoring.cloudConsoleIncidentViewer` and `roles/stackdriver.accounts.viewer` |
| Manage alerts in the console | `roles/monitoring.cloudConsoleIncidentEditor` and `roles/stackdriver.accounts.viewer` |

## Notes

- The `gcloud alpha monitoring alerts` commands exist only in the alpha track (verified in gcloud 593.0.0 help); the GA `gcloud monitoring` group has no `alerts` commands. Alpha commands can change.
- The curl time filters use GNU `date -u -d`; on macOS use another way to produce the timestamp. In PowerShell build the filter with `[System.Uri]::EscapeDataString` (the source shows this form).
- The **Alerting** page lists the most recent open alerts; click **Show closed alerts** to include closed ones, and **See all alerts** to page and filter older alerts. Multiple filters combine with AND.
- Alerts aren't always created when a condition is met; see "Alert isn't created when condition is met" in the alerting troubleshooting page.
- The source also shows Console and PowerShell/cmd.exe forms. Retention period and limits of alerts are in "Limits for alerting" (https://docs.cloud.google.com/monitoring/quotas#alerting_uptime_limits).
- Source inconsistency: the curl filter writes `state=open` in lowercase, while the `Alert.state` enum in the monitoring v3 Discovery document is `STATE_UNSPECIFIED`, `OPEN`, `CLOSED` and the gcloud 593.0.0 help example for `gcloud alpha monitoring alerts list` uses `--filter="state=OPEN"`.
- Source inconsistency: the sample `describe` response shows `"state": "OPEN"` together with a `close_time`, a `gce_instance` `zone` label of `us-west1` (a region; other samples on these pages use zones such as `us-central1-c`), and a `summaryText` field that is not a property of `Alert` in the monitoring v3 Discovery document (`closeTime`, `log`, `metadata`, `metric`, `name`, `openTime`, `policy`, `resource`, `state`). It is kept as written as illustrative output.
- Source: https://docs.cloud.google.com/monitoring/alerts/incidents-events (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Adapted from the official docs: the list example is `curl -X GET` and the page says to add `--data-urlencode "filter=..."`. Without `-G` (`--get`), curl puts that data in the request body and the filter is not applied; the example adds `-G`.

## Related

- [investigate-alerts.md](./investigate-alerts.md)
- [manage-alerts.md](./manage-alerts.md)
- [notification-options.md](./notification-options.md)
