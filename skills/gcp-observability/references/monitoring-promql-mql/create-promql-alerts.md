---
source: https://docs.cloud.google.com/monitoring/promql/create-promql-alerts
---

# Create PromQL-based alerting policies (API)

Create a PromQL-based alerting policy with the Cloud Monitoring API `alertPolicies.create` method. The only difference from other alerting policies is that the `Condition` type must be `PrometheusQueryLanguageCondition` (JSON field `conditionPrometheusQueryLanguage`).

## Signature / Usage

### Condition structure

```text
{
  "query": string,
  "duration": string,
  "evaluationInterval": string,
  "labels": {string: string},
  "ruleGroup": string,
  "alertRule": string
}
```

Example condition (finds containers restarted in the last 30 minutes):

```text
"conditionPrometheusQueryLanguage": {
  "query": "rate(kube_pod_container_status_restarts[30m]) * 1800 > 1",
  "duration": "600s",
  "evaluationInterval": "60s",
  "alertRule": "ContainerRestartCount",
  "labels": {
    "action_required":"true",
    "severity":"critical/warning/info"}
}
```

### Complete policy (JSON)

The `documentation` field uses document variables.

Adapted (not in the official docs): `> 1` added to the query so the policy fires only when a container restarted more than once in 30 minutes.

```json
{
  "displayName": "Container Restarts",
  "documentation": {
    "content": "Pod ${resource.label.namespace_name}/${resource.label.pod_name} has restarted more than once during the last 30 minutes.",
    "mimeType": "text/markdown",
    "subject": "Container ${resource.label.container_name} in Pod ${resource.label.namespace_name}/${resource.label.pod_name} has restarted more than once during the last 30 minutes."
  },
  "userLabels": {},
  "conditions": [
    {
      "displayName": "Container has restarted",
      "conditionPrometheusQueryLanguage": {
        "query": "rate(kubernetes_io:container_restart_count[30m]) * 1800 > 1",
        "duration": "600s",
        "evaluationInterval": "60s",
        "alertRule": "ContainerRestart",
        "labels": {
          "action_required":"true",
          "severity":"critical/warning/info"}
      }
    }
  ],
  "combiner": "OR",
  "enabled": true
}
```

### Create the policy with curl

Save the policy JSON as `POLICY_NAME.json`, set `PROJECT_ID` (the scoping project of a metrics scope) and `TOKEN` (`gcloud auth print-access-token`), then POST it.

Adapted (not in the official docs): the source command lacks `\` line continuations, uses an undefined `${PROJECT}` instead of `${PROJECT_ID}`, and does not quote the header.

```bash
curl -d @POLICY_NAME.json -H "Authorization: Bearer ${TOKEN}" \
  -H 'Content-Type: application/json' \
  -X POST "https://monitoring.googleapis.com/v3/projects/${PROJECT_ID}/alertPolicies"
```

Environment setup used by the curl examples (source steps): set `PROJECT_ID` to the ID of the scoping project (for example `PROJECT_ID=a-sample-project`), run `gcloud auth login`, optionally `gcloud config set project ${PROJECT_ID}`, and capture the token with ``TOKEN=`gcloud auth print-access-token` ``. The access token must be refreshed periodically; reissue the command if requests report you are unauthenticated.

### Disable the check for metric existence

By default, creation fails until the metrics referenced in the condition exist. Add `"disableMetricValidation": true` to the condition to create the policy before the metrics exist (for example in automation that creates projects with standard predefined policies).

```text
{
  "query": string,
  "duration": string,
  "evaluationInterval": string,
  "labels": {string: string},
  "ruleGroup": string,
  "disableMetricValidation": true,
  "alertRule": string
}
```

## Options / Props

### `PrometheusQueryLanguageCondition` fields

| Field | Description |
|---|---|
| `query` | The PromQL expression to evaluate; equivalent to `expr` of a Prometheus alerting rule. |
| `duration` | How long each evaluation must return `true` before the condition is met. Expressed in seconds, for example `600s` for 10 minutes. |
| `evaluationInterval` | Interval in seconds between evaluations. Default 30 seconds; for a migrated rule it comes from the Prometheus rule group. Discovery: "Must be a positive multiple of 30 seconds or missing". |
| `labels` | Optional; add or overwrite labels in the PromQL result. |
| `ruleGroup` | For migrated policies, the `name` of the Prometheus rule group; not required when creating through the API. |
| `alertRule` | For migrated policies, the `alert` value of the Prometheus alerting rule; not required when creating through the API. Discovery: if not empty, "it must be a valid Prometheus label name"; at most 2048 Unicode characters (`ruleGroup` too). |
| `disableMetricValidation` | `true` skips the check that referenced metrics exist. |

## Notes

- A PromQL alerting policy must have only one condition; multiple conditions are not supported if a condition uses PromQL. You can reference several metrics in one condition and combine them with the `+` operator.
- Alerts from a PromQL policy do not follow the autoclose duration; an alert closes at the larger of 270 seconds and twice the condition's evaluation interval after the condition was last met.
- If a condition references a metric that does not exist, it still runs on its evaluation interval but the result is always empty until the metric exists. Users who can view alerting policies can see the name of the non-existent metric.
- Corrected from the official docs: the source curl command was `curl -d @POLICY_NAME.json -H "Authorization: Bearer $TOKEN"` followed by lines without `\` and the URL `.../projects/${PROJECT}/alertPolicies`; the fence uses `${TOKEN}`, `\` continuations and `${PROJECT_ID}`.
- The source also shows a step that echoes `TOKEN` to verify it; avoid printing access tokens in shared terminals or logs. Terraform (`condition_prometheus_query_language` in `google_monitoring_alert_policy`) is also shown in the source and omitted here.
- Source inconsistency: the source says the `duration` value "must be a number of minutes, expressed in seconds", while the Monitoring API v3 Discovery document (`PrometheusQueryLanguageCondition.duration`) says it "Must be a non-negative duration or missing" with a default of zero. The `evaluationInterval` and `alertRule` constraints in the table come from the same Discovery document.
- Source: https://docs.cloud.google.com/monitoring/promql/create-promql-alerts (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Corrected from the official docs: the complete policy's query is `rate(kubernetes_io:container_restart_count[30m]) * 1800` without a comparison. A PromQL condition fires whenever the expression returns a series, so it would also fire with zero restarts; the example adds `> 1`, matching the condition fragment above and the documentation text "restarted more than once during the last 30 minutes".

## Related

- [promql-in-alerting.md](./promql-in-alerting.md)
- [promql-migrate.md](./promql-migrate.md)
