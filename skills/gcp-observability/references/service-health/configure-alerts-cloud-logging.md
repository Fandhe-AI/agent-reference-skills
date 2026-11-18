---
source: https://docs.cloud.google.com/service-health/docs/configure-alerts-cloud-logging
---

# Configure Service Health alerts with Cloud Logging

Personalized Service Health integrates with Cloud Monitoring log alerts: a log-matching alerting policy on the Service Health logs notifies you about new incidents, updates, and incidents for specific products or locations. This page sets up the policy with `gcloud`, customizes it and tests it with a sample log entry.

## Signature / Usage

### Find the notification channel ID

```bash
gcloud config set project PROJECT_ID
gcloud beta monitoring channels list
```

Entries named `projects/PROJECT_ID/notificationChannels/...` are the notification channel IDs.

### Create `policy.json`

`ALERT_NAME` appears on the notification; `ALERT_CONDITION` is a Logging filter (see `example-alerting-policies.md`); `NOTIFICATION_CHANNEL` is the channel ID from the previous step, for example `projects/PROJECT_ID/notificationChannels/885798905074`.

Adapted (not in the official docs): removed the two trailing commas so the file is valid JSON, and added `alertStrategy.notificationRateLimit` (required for a policy with a `conditionMatchedLog` condition) with the `300s` period of the source's example policies.

```json
{
  "displayName": "ALERT_NAME",
  "combiner": "OR",
  "conditions": [ {
    "displayName": "Log match condition",
    "conditionMatchedLog": {
      "filter": "ALERT_CONDITION"
     } } ],
  "notificationChannels": [ "NOTIFICATION_CHANNEL" ],
  "alertStrategy": { "notificationRateLimit": { "period": "300s" } }
}
```

### Create the policy

```bash
gcloud config set project PROJECT_ID
gcloud monitoring policies create --policy-from-file="policy.json"
```

### Test the alert with a log entry (API request body for `entries.write`)

```json
{
  "entries": [
    {
      "logName": "projects/PROJECT_ID/logs/servicehealth.googleapis.com%2Factivity",
      "resource": {
        "type": "servicehealth.googleapis.com/Event",
        "labels": {
          "resource_container": "PROJECT_ID",
          "location": "global",
          "event_id": "U4AqrjwFQYi5fFBmyAX-Gg"
        }
      },
      "labels": {
        "servicehealth.googleapis.com/new_event": "true",
        "servicehealth.googleapis.com/updated_fields": "[]"
      },
      "jsonPayload": {
        "@type": "type.googleapis.com/google.cloud.servicehealth.logging.v1.EventLog",
        "category": "INCIDENT",
        "title": "EXAMPLE... NOT REAL INCIDENT",
        "description": "EXAMPLE FOR TESTING, NOT REAL INCIDENT. We are experiencing an issue with Google Cloud infrastructure components at us-east1, australia-southeast2. Our engineering team continues to investigate the issue. We apologize to all who are affected by the disruption.",
        "updateTime": "2022-07-15T22:26:40Z",
        "endTime": "2022-07-16T22:13:20Z",
        "impactedLocations": "['us-east1', 'australia-southeast2']",
        "impactedProducts": "['CloudSQL']",
        "impactedProductIds": "['hV87iK5DcEXKgWU2kDri']",
        "startTime": "2022-07-13T12:26:40Z",
        "nextUpdateTime": "2022-07-13T16:26:40Z",
        "state": "ACTIVE",
        "detailedState": "CONFIRMED",
        "relevance": "RELATED"
      }
    }
  ]
}
```

### Test with gcloud

```bash
gcloud config list
```

Adapted (not in the official docs): the source writes `gcloud_name config set project`, which is not a command; the real command is `gcloud config set project`.

```bash
gcloud config set project PROJECT_ID
```

Adapted (not in the official docs): the source breaks the command across lines without `\` continuations; added them.

```bash
gcloud logging write --payload-type=json \
  LOG_NAME \
  '{ "category": "INCIDENT", "relevance": "IMPACTED", "@type": "type.googleapis.com/google.cloud.servicehealth.logging.v1.EventLog", "description": "This is a test log entry"}'
```

## Options / Props

### Alert condition examples

| Alert condition | `ALERT_CONDITION` value |
|---|---|
| Any Cloud SQL event | `jsonPayload.impactedProductIds =~ \"hV87iK5DcEXKgWU2kDri\"` |
| Any event in zone `us-central1-a` | `jsonPayload.impactedLocations =~ \"us-central1-a\"` |

### Fields that customize the notification

| Field | Description |
|---|---|
| `labelExtractors` | Properties included in the notification header (see the LabelExtractors guide: https://docs.cloud.google.com/logging/docs/reference/v2/rest/v2/projects.metrics#LogMetric.FIELDS.value_extractor). |
| `content` | Formatting of the email notification; supports markdown variable substitution so `labelExtractors` can be used as variables (see https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.alertPolicies#documentation). |

## Notes

- Notifications use log alerts, so each is associated with a Monitoring incident and includes links to the incident page and to the Service Health dashboard. Notifications are subject to Monitoring limits (https://cloud.google.com/monitoring/quotas#alerting_uptime_limits); an example in the source is 20 alerts per policy per day per project.
- Alerting policies need a Cloud Monitoring notification channel (email, SMS, Pub/Sub, webhooks, Slack, PagerDuty and others). To reach another destination, use a webhook (the source gives ServiceNow as an example). Email notifications come from `alerting-noreply@google.com`; Slack messages come from the Cloud Monitoring application.
- Conditions: use product and location values from https://docs.cloud.google.com/service-health/docs/supported-products-locations. The `\"` escapes in the table values are for embedding in the JSON `filter` string.
- Test: in the console route, open the `entries.write` reference page, replace `PROJECT_ID`, change `jsonPayload` fields to the condition you test (the `event_log.proto` schema is at https://github.com/googleapis/googleapis/blob/master/google/cloud/servicehealth/logging/v1/event_log.proto), execute, allow Google APIs Explorer access, then wait a few minutes and check Cloud Monitoring > Incidents and the notification channel. Wait at least 5 minutes before testing again. The test writes a real log entry into the project's logs, which can fire real notifications on the channel.
- `gcloud beta monitoring channels list` is on the beta track in the source and exists in the gcloud 593.0.0 help; `gcloud monitoring policies create --policy-from-file` is GA and exists. `gcloud logging write` takes `LOG_NAME` and `MESSAGE` and is documented there for simple testing.
- Corrected from the official docs: `policy.json` had trailing commas after `"filter": "ALERT_CONDITION",` (`}` line) and after the `notificationChannels` line; the test step wrote `gcloud_name config set project PROJECT_ID`; and `gcloud logging write --payload-type=json` followed by `LOG_NAME` and the JSON payload on separate lines without `\`.
- Corrected from the official docs: the source's `policy.json` has no `alertStrategy`. The Cloud Monitoring API Discovery document describes `AlertStrategy.notificationRateLimit` as "Required for log-based alerting policies, i.e. policies with a LogMatch condition", so the fence adds `"alertStrategy": { "notificationRateLimit": { "period": "300s" } }`, the value used by the policies in `example-alerting-policies.md` (which also set `autoClose`).
- The source also shows the in-dashboard setup (https://docs.cloud.google.com/service-health/docs/configure-alerts-dashboard) and screenshots.
- Source: https://docs.cloud.google.com/service-health/docs/configure-alerts-cloud-logging (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [example-alerting-policies.md](./example-alerting-policies.md)
- [logs.md](./logs.md)
- [manage-access.md](./manage-access.md)
- [overview.md](./overview.md)
