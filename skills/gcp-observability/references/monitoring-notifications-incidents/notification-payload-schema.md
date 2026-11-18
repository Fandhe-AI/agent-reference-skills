---
source: https://docs.cloud.google.com/monitoring/support/notification-options
---

# Notification payload schema (version 1.2)

JSON packet that Cloud Monitoring sends to PagerDuty, webhook and Pub/Sub notification channels for metric-based alerting policies. By default the alerting backend attempts to generate version 1.2 formatting. Fields can occur in any order, and some fields might not appear or might be empty depending on the alerting policy configuration, the incident state, or the monitored resource.

## Signature / Usage

### Example packet

```json
{
  "incident": {
    "incident_id": "0.opqiw61fsv7p",
    "renotify": true,
    "scoping_project_id": "internal-project",
    "scoping_project_number": 12345,
    "url": "https://console.cloud.google.com/monitoring/alerting/incidents/0.lxfiw61fsv7p?project=internal-project",
    "severity": "no severity",
    "started_at": 1577840461,
    "ended_at": 1577877071,
    "state": "closed",
    "resource_id": "11223344",
    "resource_name": "internal-project gke-cluster-1-default-pool-e2df4cbd-dgp3",
    "resource_display_name": "gke-cluster-1-default-pool-e2df4cbd-dgp3",
    "resource_type_display_name": "VM Instance",
    "resource": {
      "type": "gce_instance",
      "labels": {
        "instance_id": "11223344",
        "project_id": "internal-project",
        "zone": "us-central1-c"
      }
    },
    "metric": {
      "type": "compute.googleapis.com/instance/cpu/utilization",
      "displayName": "CPU utilization",
      "labels": {
        "instance_name": "the name of the VM instance"
      }
    },
    "metadata": {
      "system_labels": { "labelkey": "labelvalue" },
      "user_labels": { "labelkey": "labelvalue" }
    },
    "policy_name": "Monitor-Project-Cluster",
    "policy_user_labels" : {
        "user-label-1" : "important label",
        "user-label-2" : "another label"
    },
    "condition_name": "VM Instance - CPU utilization [MAX]",
    "threshold_value": "0.9",
    "observed_value": "0.835",
    "condition": {
      "name": "projects/internal-project/alertPolicies/1234567890123456789/conditions/1234567890123456789",
      "displayName": "VM Instance - CPU utilization [MAX]",
      "conditionThreshold": {
        "filter": "metric.type=\"compute.googleapis.com/instance/cpu/utilization\" resource.type=\"gce_instance\" metadata.system_labels.\"state\"=\"ACTIVE\"",
        "aggregations": [
          {
            "alignmentPeriod": "120s",
            "perSeriesAligner": "ALIGN_MEAN"
          }
        ],
        "comparison": "COMPARISON_GT",
        "thresholdValue": 0.9,
        "duration": "0s",
        "trigger": {
          "count": 1
        }
      }
    },
    "documentation": {
      "content": "TEST ALERT\n\npolicy.name=projects/internal-project/alertPolicies/1234567890123456789\n\npolicy.display_name=Monitored-Project-NO-GROUPBY\n\ncondition.name=projects/nternal-project/alertPolicies/1234567890123456789/conditions/1234567890123456789\n\ncondition.display_name=VM Instance - CPU utilization [MAX]\n\nproject=internal-project\n\nresrouce.project=internal-project \n\nDONE\n",
      "mime_type": "text/markdown",
      "subject": "ALERT - No severity",
      "links": [
        {
          "displayName": "Playbook",
          "url": "https://myownpersonaldomain.com/playbook?name=${resource.name}"
        }
      ]
    },
    "summary": "CPU utilization for internal-project gke-cluster-1-16-default-pool-e2df4cbd-dgp3 with metric labels {instance_name=gke-cluster-1-default-pool-e2df4cbd-dgp3} and system labels {state=ACTIVE} returned to normal with a value of 0.835."
  },
  "version": "1.2"
}
```

## Options / Props

### Fields under `incident`

| Field | Type | Description |
|-------|------|-------------|
| `incident_id` | string | Generated ID for this incident. |
| `renotify` | bool, optional | Set to `true` when the message is a repeated notification. |
| `scoping_project_id` | string | The project ID that hosts the metrics scope. |
| `scoping_project_number` | number | The project number of the scoping project. |
| `url` | string | Google Cloud console URL for this incident. |
| `started_at` | number | Time (Unix epoch seconds) when the incident was opened. |
| `ended_at` | number | Time (Unix epoch seconds) when the incident was closed. Populated only when `state` is `closed`. |
| `state` | string | State of the incident: `open` or `closed`. If `open`, then `ended_at` is null. |
| `summary` | string | Generated textual summary of the incident. |
| `apigee_url` | string | Apigee URL for this incident, only for Apigee resource types `Environment` and `Proxy*`. |
| `observed_value` | string | Observed value that triggered/resolved the alert; may be empty if the condition is expired. |
| `resource.type` | string | Monitored resource type being alerted on, for example `gce_instance`. |
| `resource.labels` | object | Key-value pairs for labels of the monitored resource. |
| `resource_type_display_name` | string | Display name of the monitored resource type. |
| `resource_id` | string | Instance ID of the monitored resource, same value as `resource.labels.instance_id`. |
| `resource_display_name` | string | Display name of the monitored resource. |
| `resource_name` | string | Generated name of the monitored resource; consists of values from other fields. |
| `metric.type` | string | Metric type being alerted on, for example `compute.googleapis.com/instance/cpu/utilization`. |
| `metric.displayName` | string | Display name of the metric type. |
| `metric.labels` | object | Key-value pairs for labels of the metric. |
| `metadata.system_labels` | object | System metadata labels. |
| `metadata.user_labels` | object | User metadata labels. |
| `policy_name` | string | Display name for the alerting policy. |
| `policy_user_labels` | object | User labels attached to the policy. |
| `documentation` | object | Embedded `Documentation` structure of the `AlertPolicy` object. |
| `condition` | object | Embedded `Condition` structure of the `AlertPolicy` object. |
| `condition_name` | string | Display name of the condition, same value as `condition.displayName`. |
| `severity` | string | Severity level of incidents. If not defined at policy creation, Cloud Monitoring sets it to `no severity`. |
| `threshold_value` | string | Threshold value of this condition; may be empty if the condition isn't a threshold condition. |

## Notes

- The top-level `version` field is `"1.2"`.
- Deprecation policy: the payload schema is subject to the Google Cloud deprecation policy in Section 1.4(d) of the Google Cloud Platform Terms of Service. The schema does not control the formats of generated field values, which can change without notice. `incident.summary`, `incident.documentation.content` and `incident.url` carry data for their fields but have no constraints for accurate parsing; consume them as a whole and don't rely on parsing them.
- Notifications sent by Error Reporting follow the 1.0 schema, whereas notifications sent by Monitoring follow the 1.2 schema.
- Notifications can contain sensitive data (labels, summaries, documentation text); review your regulatory practices before sending them to a channel.
- Source inconsistency: the example packet is not self-consistent: `incident_id` is `0.opqiw61fsv7p` while `url` points to `incidents/0.lxfiw61fsv7p`; `documentation.content` contains `condition.name=projects/nternal-project/...` (project `internal-project` elsewhere) and `resrouce.project`; `summary` names `gke-cluster-1-16-default-pool-e2df4cbd-dgp3` while `resource_name` is `internal-project gke-cluster-1-default-pool-e2df4cbd-dgp3`. The packet is kept as written; real notifications carry the values of the incident.
- Source: https://docs.cloud.google.com/monitoring/support/notification-options (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [notification-channel-webhooks.md](./notification-channel-webhooks.md)
- [notification-channel-pubsub.md](./notification-channel-pubsub.md)
- [notification-channel-pagerduty.md](./notification-channel-pagerduty.md)
