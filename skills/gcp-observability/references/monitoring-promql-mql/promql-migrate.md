---
source: https://docs.cloud.google.com/monitoring/promql/promql-migrate
---

# Migrate alerting rules and receivers from Prometheus

`gcloud monitoring policies migrate` converts Prometheus alerting rules into PromQL-based alerting policies and Alertmanager receivers into Cloud Monitoring notification channels. Input files must be valid Prometheus rule files in YAML or JSON.

## Signature / Usage

### Alerting policy from Prometheus rule files

Several file paths create several policies.

```bash
gcloud monitoring policies migrate \
--policies-from-prometheus-alert-rules-yaml=PATH_TO_FILE_1,PATH_TO_FILE_2
```

### Notification channels from an Alertmanager file

```bash
gcloud monitoring policies migrate \
--channels-from-prometheus-alertmanager-yaml=PATH_TO_FILE
```

### Both at once

Every notification channel from the Alertmanager file is associated with each new alerting policy.

```bash
gcloud monitoring policies migrate \
--policies-from-prometheus-alert-rules-yaml=PATH_TO_FILE_1,PATH_TO_FILE_2 \
--channels-from-prometheus-alertmanager-yaml=PATH_TO_FILE
```

### Example: rule file

```yaml
groups:
- name: Utilization_Alerts
  interval: 30s
  rules:
  - alert: CPU_Utilization_Over_75
    expr: compute_googleapis_com:instance_cpu_utilization > 75
    for: 60s
    labels:
      severity: page
    annotations:
      subject: "Subject: ${metric.label.value}"
      description: "CPU utilization is over 75%"
```

### Example: Alertmanager file

```yaml
receivers:
- name: 'team-emails'
  email_configs:
  - to: EMAIL_ADDRESS
- name: 'team-pager'
  pagerduty_configs:
  - service_key: SERVICE_KEY
- name: 'team-webhook'
  webhook_configs:
  - url: WEBHOOK_ADDRESS
```

```bash
gcloud monitoring policies migrate \
--policies-from-prometheus-alert-rules-yaml=PATH_TO_CONFIG_FILE \
--channels-from-prometheus-alertmanager-yaml=PATH_TO_ALERTMANAGER_FILE
```

Adapted (not in the official docs): added the missing comma after the condition `displayName` so the output is valid JSON; the notification channel names use `projects/PROJECT_ID/...` instead of `projects/google.com:PROJECT_ID/...`.

```json
{
  "name": "projects/PROJECT_ID/alertPolicies/POLICY_ID",
  "displayName": "Utilization_Alerts/CPU_Utilization_Over_75",
  "documentation": {
    "content": "CPU utilization is over 75%",
    "mimeType": "text/markdown",
    "subject": "Subject: ${metric.label.value}"
  },
  "userLabels": {},
  "conditions": [
    {
      "name": "projects/PROJECT_ID/alertPolicies/POLICY_ID/conditions/CONDITION_ID",
      "displayName": "CPU_Utilization_Over_75",
      "conditionPrometheusQueryLanguage": {
        "alertRule": "CPU_Utilization_Over_75",
        "duration": "60s",
        "evaluationInterval": "30s",
        "labels": {
          "severity": "page"
        },
        "query": "compute_googleapis_com:instance_cpu_utilization > 75",
        "ruleGroup": "Utilization_Alerts"
      }
    }
  ],
  "alertStrategy": {},
  "combiner": "OR",
  "enabled": true,
  "notificationChannels": [
    "projects/PROJECT_ID/notificationChannels/CHANNEL_ID_1",
    "projects/PROJECT_ID/notificationChannels/CHANNEL_ID_2",
    "projects/PROJECT_ID/notificationChannels/CHANNEL_ID_3"
  ]
}
```

### Migrate Managed Service for Prometheus rules

Copy the `groups` section of a `Rules`, `ClusterRules` or `GlobalRules` custom resource into a new Prometheus rule file and migrate that file with the command above. Source resource:

```yaml
apiVersion: monitoring.googleapis.com/v1
kind: Rules
metadata:
  namespace: NAMESPACE_NAME
  name: example-rules
spec:
  groups:
  - name: example
    interval: 30s
    rules:
    - alert: FewerThanTenInstancesUp
      expr: sum(up) < 10
```

Resulting rule file:

```yaml
groups:
- name: example
  interval: 30s
  rules:
  - alert: FewerThanTenInstancesUp
    expr: sum(up) < 10
```

The managed rule evaluator adds filter labels automatically (`sum(up{project_id="test-project", cluster="test-cluster", namespace="NAMESPACE_NAME"}) < 10`); an alerting policy with `sum(up) < 10` runs unfiltered across every project, cluster and namespace in the metrics scope. Aggregate by labels in the rule file before migrating:

```text
sum (up) by (project_id, cluster, namespace) < 10
```

## Options / Props

### Field mapping (Prometheus rule to alerting policy)

| Prometheus alerting rule | Cloud Monitoring alerting policy |
|---|---|
| `alert` | `conditionPrometheusQueryLanguage.alertRule` |
| `expr` | `conditionPrometheusQueryLanguage.query` |
| `for` | `conditionPrometheusQueryLanguage.duration` |
| `labels` | `conditionPrometheusQueryLanguage.labels` |
| `annotations: "summary"` | `documentation.subject` |
| `annotations: "description"` | `documentation.content` |

### Alert field templates to documentation variables

| Prometheus alert field template | Cloud Monitoring documentation variable |
|---|---|
| `{{$value}}` | `${metric.label.value}` (an implementation of `${metric.label.KEY}`, where `value` holds the PromQL query value) |
| `{{humanize $value}}` | `${metric.label.value}` |
| `{{$labels}}` | `${metric_or_resource.labels}` |
| `{{humanize $labels}}` | `${metric_or_resource.labels}` |
| `{{$labels.key}}` | `${metric_or_resource.label.KEY}`; renders as `${metric.label.KEY}` if KEY is a valid label, `${resource.label.KEY}` if a valid resource label, otherwise an empty string |
| `{{humanize $labels.<key>}}` | same as `{{$labels.key}}` |

### Filter labels applied by managed rule resources (evaluation order)

| Rule resource type | Filter labels |
|---|---|
| Rule | 1. `project_id` 2. `cluster` 3. `namespace` |
| ClusterRule | 1. `project_id` 2. `cluster` |

## Notes

- Alertmanager receivers migrate only when Cloud Monitoring supports the same notification channel type; for example Jira receivers are ignored. For unsupported receivers create a notification channel that uses Webhook for public endpoints or Pub/Sub for private endpoints.
- Prometheus recording rules cannot be migrated; use a self-deployed rule evaluator.
- A rule that references a custom metric requires an equivalent metric descriptor in Cloud Monitoring before the policy can be created.
- Multiple Rules / ClusterRules / GlobalRules: construct and migrate a separate rules file for each resource.
- The Alertmanager example keeps receiver secrets (`service_key`, webhook URL, email) in a local file; use upper-case placeholders, restrict file permissions, and keep real values out of shell history and version control.
- Source inconsistency: the source rule-file example uses an annotation named `subject`, and its output sets `documentation.subject` from it, while the source's mapping table lists `annotations: "summary"` for `documentation.subject`.
- Adapted from the official docs: the source output JSON had no comma after `"displayName": "CPU_Utilization_Over_75"`; one was added.
- Corrected from the official docs: the output's `notificationChannels` entries read `"projects/google.com:PROJECT_ID/notificationChannels/CHANNEL_ID_1"` (and `_2`, `_3`), while the same policy's `name` is `projects/PROJECT_ID/alertPolicies/POLICY_ID`; the Monitoring API v3 Discovery document gives the channel name format `projects/[PROJECT_ID_OR_NUMBER]/notificationChannels/[CHANNEL_ID]`. The `google.com:` prefix was removed.
- Source: https://docs.cloud.google.com/monitoring/promql/promql-migrate (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [promql-in-alerting.md](./promql-in-alerting.md)
- [create-promql-alerts.md](./create-promql-alerts.md)
