---
source: https://docs.cloud.google.com/service-health/docs/example-alerting-policies
---

# Example Service Health alerting policies

Example `ALERT_CONDITION` filters and two policy bodies that customize the content of Personalized Service Health log alert notifications.

## Signature / Usage

Conditions below are set as `ALERT_CONDITION` in the `filter` of `conditionMatchedLog`. Set the version of the Service Health logs in the condition; the current version is `type.googleapis.com/google.cloud.servicehealth.logging.v1.EventLog`.

### Alert on a new incident for a specific Google Cloud product

Adapted (not in the official docs): the inner quotes of `labels."servicehealth.googleapis.com/new_event"` are escaped as `\"` like the rest of the value, because the value is placed inside a JSON string.

```text
labels.\"servicehealth.googleapis.com/new_event\"=true AND jsonPayload.detailedCategory = \"CONFIRMED_INCIDENT\" AND jsonPayload.impactedProductIds =~ \"hV87iK5DcEXKgWU2kDri\" AND jsonPayload.@type = \"type.googleapis.com/google.cloud.servicehealth.logging.v1.EventLog\"
```

### Alert on a new incident for a specific region

Adapted (not in the official docs): inner quotes escaped as above.

```text
labels.\"servicehealth.googleapis.com/new_event\"=true AND jsonPayload.detailedCategory = \"CONFIRMED_INCIDENT\" AND jsonPayload.impactedLocations =~ \"us-central1\" AND jsonPayload.@type = \"type.googleapis.com/google.cloud.servicehealth.logging.v1.EventLog\"
```

### Alert on a new emerging incident for a specific product

Adapted (not in the official docs): inner quotes escaped as above.

```text
labels.\"servicehealth.googleapis.com/new_event\"=true AND jsonPayload.detailedCategory = \"EMERGING_INCIDENT\" AND jsonPayload.impactedProductIds =~ \"ix7u9beT8ivBdjApTif3\" AND jsonPayload.@type = \"type.googleapis.com/google.cloud.servicehealth.logging.v1.EventLog\"
```

### Alert on any update or change to an incident

```text
jsonPayload.detailedCategory = \"CONFIRMED_INCIDENT\" AND jsonPayload.@type = \"type.googleapis.com/google.cloud.servicehealth.logging.v1.EventLog\"
```

### Alert on any update on confirmed incidents

```text
jsonPayload.state =~ \"ACTIVE\" AND jsonPayload.detailedCategory = \"CONFIRMED_INCIDENT\" AND jsonPayload.detailedState != \"EMERGING\" AND jsonPayload.@type = \"type.googleapis.com/google.cloud.servicehealth.logging.v1.EventLog\"
```

### Alert on state or relevance updates

Adapted (not in the official docs): the source wraps the whole field name in one pair of quotes (`"labels.servicehealth.googleapis.com/updated_fields"`), which is not a valid label reference; changed to `labels.\"servicehealth.googleapis.com/updated_fields\"` like the OR branch, with escaped quotes.

```text
jsonPayload.detailedCategory = \"CONFIRMED_INCIDENT\" AND labels.\"servicehealth.googleapis.com/updated_fields\" =~ \"'state'\" OR labels.\"servicehealth.googleapis.com/updated_fields\" =~ \"'relevance'\" AND jsonPayload.@type = \"type.googleapis.com/google.cloud.servicehealth.logging.v1.EventLog\"
```

### Alert notification with full incident details

```json
{
  "displayName": "ALERT_NAME",
  "combiner": "OR",
  "conditions": [ {
    "displayName": "Log match condition",
    "conditionMatchedLog": {
      "filter": "ALERT_CONDITION",
      "labelExtractors": {
        "description": "EXTRACT(jsonPayload.description)",
        "impactedLocations": "EXTRACT(jsonPayload.impactedLocations)",
        "impactedProducts": "EXTRACT(jsonPayload.impactedProducts)",
        "startTime": "EXTRACT(jsonPayload.startTime)",
        "state": "EXTRACT(jsonPayload.state)",
        "detailedState": "EXTRACT(jsonPayload.detailedState)"
      } } } ],
  "documentation": {
  "content": "# View details at [Service Health dashboard](https://console.cloud.google.com/servicehealth/incidentDetails/projects%2F${resource.labels.resource_container}%2Flocations%2F${resource.labels.location}%2Fevents%2F${resource.labels.event_id}?project=${resource.labels.resource_container}) \n## Description \n${log.extracted_label.description} \n## Impacted locations \n${log.extracted_label.impactedLocations} \n## Impacted products \n${log.extracted_label.impactedProducts} \n## Incident start time \n${log.extracted_label.startTime} \n## Event state \n${log.extracted_label.state} \n## Event detailed state \n ${log.extracted_label.detailedState}",
    "mimeType": "text/markdown"
  },
  "notificationChannels": [ "NOTIFICATION_CHANNEL" ],
  "enabled": true,
  "alertStrategy": { "notificationRateLimit": { "period": "300s" }, "autoClose": "1800s" }
}
```

### Alert notification with a link to the Service Health dashboard

```json
{
  "displayName": "ALERT_NAME",
  "combiner": "OR",
  "conditions": [ {
    "displayName": "Log match condition",
    "conditionMatchedLog": {
      "filter": "ALERT_CONDITION",
      "labelExtractors": {
        "description": "EXTRACT(jsonPayload.description)",
        "impactedLocations": "EXTRACT(jsonPayload.impactedLocations)",
        "impactedProducts": "EXTRACT(jsonPayload.impactedProducts)",
        "startTime": "EXTRACT(jsonPayload.startTime)",
        "state": "EXTRACT(jsonPayload.state)",
        "detailedState": "EXTRACT(jsonPayload.detailedState)"
      } } } ],
  "documentation": {
  "content": "# View details at [Service Health dashboard](https://console.cloud.google.com/servicehealth/eventDetails/projects%2F${resource.labels.resource_container}%2Flocations%2F${resource.labels.location}%2Fevents%2F${resource.labels.event_id})",
    "mimeType": "text/markdown"
  },
  "notificationChannels": [ "NOTIFICATION_CHANNEL" ],
  "enabled": true,
  "alertStrategy": { "notificationRateLimit": { "period": "300s" }, "autoClose": "1800s" }
}
```

## Options / Props

### Log fields and values used in the conditions

| Field | Values / use in the source |
|---|---|
| `labels."servicehealth.googleapis.com/new_event"` | `true` for a new event |
| `labels."servicehealth.googleapis.com/updated_fields"` | contains `'state'` or `'relevance'` when those changed |
| `jsonPayload.detailedCategory` | `CONFIRMED_INCIDENT`, `EMERGING_INCIDENT` |
| `jsonPayload.state` | `ACTIVE` |
| `jsonPayload.detailedState` | `EMERGING` (excluded in the confirmed-update example) |
| `jsonPayload.impactedProductIds` | product ID, for example `hV87iK5DcEXKgWU2kDri` |
| `jsonPayload.impactedLocations` | location, for example `us-central1` |
| `jsonPayload.@type` | `type.googleapis.com/google.cloud.servicehealth.logging.v1.EventLog` |

### Notification policy fields in the examples

| Field | Value |
|---|---|
| `alertStrategy.notificationRateLimit.period` | `300s` |
| `alertStrategy.autoClose` | `1800s` |
| `documentation.mimeType` | `text/markdown` |

## Notes

- The conditions work for Cloud Logging or Terraform. The `\"` escapes keep each value valid inside the JSON `filter` string; in the Logs Explorer remove the backslashes. The source's conditions mix escaped and unescaped quotes; this page applies the escaped form throughout (see the Adapted lines).
- Adapted from the official docs: the first three conditions used unescaped quotes, for example `labels."servicehealth.googleapis.com/new_event"=true`, which breaks the JSON string when substituted into `"filter": "ALERT_CONDITION"`; they are escaped here.
- Corrected from the official docs: the source's last condition used `"labels.servicehealth.googleapis.com/updated_fields" =~ ...` (one quoted string); it is written as `labels."servicehealth.googleapis.com/updated_fields"` here. The source does not add parentheses around the `OR` in that condition.
- Product names and locations are in the common Google Cloud format (see https://status.cloud.google.com); use product IDs from https://docs.cloud.google.com/service-health/docs/supported-products-locations.
- The two notification examples keep the source's link paths as written: `incidentDetails/...?project=` in the first and `eventDetails/...` in the second. The `jsonPayload` fields are defined by the Service Health log schema (https://docs.cloud.google.com/service-health/docs/reference/event-logs/rpc/google.cloud.servicehealth.logging.v1).
- Replace `ALERT_CONDITION` with one of the filters above and `NOTIFICATION_CHANNEL` with a channel resource name. Create the policy with `gcloud monitoring policies create --policy-from-file` (see `configure-alerts-cloud-logging.md`).
- Source: https://docs.cloud.google.com/service-health/docs/example-alerting-policies (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [configure-alerts-cloud-logging.md](./configure-alerts-cloud-logging.md)
- [logs.md](./logs.md)
