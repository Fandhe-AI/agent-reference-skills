---
source: https://docs.cloud.google.com/monitoring/alerts/policies-in-api
---

# Create Alerting Policies by Using the API

An alerting policy is an `AlertPolicy` object in the Cloud Monitoring API. This page describes its structure, the condition types, and how to create a policy with the Google Cloud CLI or client libraries. The API needs an end-user credential (OAuth2 token for a user or service account), not an API key. Supported only for Google Cloud projects; for App Hub configurations use the host or management project. Required role: Monitoring AlertPolicy Editor (`roles/monitoring.alertPolicyEditor`) on the project.

## Signature / Usage

### Resource name

```text
projects/PROJECT_ID/alertPolicies/POLICY_ID
```

### Create from a JSON or YAML file (gcloud)

The examples assume the current project is set (`gcloud config set project [PROJECT_ID]`); the example project is `a-gcp-project`.

```sh
gcloud monitoring policies create --policy-from-file="rising-cpu-usage.json"
```

```text
Created alert policy [projects/a-gcp-project/alertPolicies/12669073143329903307].
```

`rising-cpu-usage.json` holds a policy named "High CPU rate of change". The REST method is `alertPolicies.create`.

### Associate a policy with an App Hub application

Attach user labels with keys `apphub_application_location`, `apphub_application_id`, and `apphub_service_id` or `apphub_workload_id`:

```text
  "userLabels": {
    "apphub_service_id": "my-service-id",
    "apphub_application_location": "my-app-location",
    "apphub_application_id": "my-app"
  },
```

### Repeated notifications (`alertStrategy`)

Repeated notifications are sent for alerts with a status of Open or Acknowledged. This example resends every 1800 seconds (30 minutes) to one channel:

```text
  "alertStrategy": {
    "notificationChannelStrategy": [
      {
        "notificationChannelNames": [
          "projects/PROJECT_ID/notificationChannels/CHANNEL_ID"
        ],
        "renotifyInterval": "1800s"
      }
    ]
  }
```

## Options / Props

### `AlertPolicy` fields (monitoring v3)

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Policy name; limited to 512 Unicode characters; avoid reusing within a project. Prometheus convention `{rule group name}/{alert name}` |
| `documentation` | `Documentation` | Included in notifications and incidents (see doc-variables page) |
| `userLabels` | map | Up to 64 entries; key and value each at most 63 Unicode characters or 128 bytes; lowercase letters, numerals, underscores, dashes; keys begin with a letter |
| `conditions[]` | `Condition` | One to six conditions |
| `combiner` | enum | `COMBINE_UNSPECIFIED`, `AND`, `OR`, `AND_WITH_MATCHING_RESOURCE` |
| `notificationChannels[]` | string | `projects/[PROJECT_ID_OR_NUMBER]/notificationChannels/[CHANNEL_ID]` |
| `alertStrategy` | `AlertStrategy` | Auto-close, notification prompts, repeated notifications, rate limit |
| `severity` | enum | `SEVERITY_UNSPECIFIED` (default, shown as No Severity), `CRITICAL`, `ERROR`, `WARNING` |
| `enabled` | boolean | Unset on write means enabled |
| `name` | string | Output on create; do not include on `alertPolicies.create` |
| `creationRecord`, `mutationRecord`, `validity` | read-only | Ignored on create or update; an invalid policy does not generate incidents |

### `Condition` fields

| Field | Type | Description |
|---|---|---|
| `conditionThreshold` | `MetricThreshold` | Compare a time series against a threshold; with `forecastOptions`, compare forecast values |
| `conditionAbsent` | `MetricAbsence` | Time series stops receiving data |
| `conditionPrometheusQueryLanguage` | `PrometheusQueryLanguageCondition` | PromQL; must be the only condition |
| `conditionMatchedLog` | `LogMatch` | Log-based; must be the only condition; do not combine with log-based metrics |
| `conditionMonitoringQueryLanguage` | `MonitoringQueryLanguageCondition` | MQL; must be the only condition |
| `conditionSql` | `SqlCondition` | Periodically evaluates a SQL query result |
| `displayName` | string | Avoid reusing within a policy |
| `name` | string | Do not set on create; on update, a named condition is updated, unnamed ones are added, unlisted ones deleted |

### `MetricThreshold` (`conditionThreshold`)

| Field | Type | Description |
|---|---|---|
| `filter` | string | Required; metric type and resource type; at most 2048 Unicode characters |
| `aggregations[]` | `Aggregation` | Alignment (`alignmentPeriod`, `perSeriesAligner`) and reduction; applied in order |
| `denominatorFilter`, `denominatorAggregations[]` | string, `Aggregation` | Ratio; same alignment period and labels as numerator; numerator and denominator must have the same `MetricKind` |
| `comparison` | enum | `COMPARISON_GT`, `COMPARISON_GE`, `COMPARISON_LT`, `COMPARISON_LE`, `COMPARISON_EQ`, `COMPARISON_NE`; Discovery says only `COMPARISON_LT` and `COMPARISON_GT` are supported currently |
| `thresholdValue` | number | Value to compare |
| `duration` | duration | Required; multiple of a minute (0, 60, 120, 300 seconds) |
| `trigger` | `Trigger` | Count or percent of time series; default any |
| `evaluationMissingData` | enum | `EVALUATION_MISSING_DATA_UNSPECIFIED`, `EVALUATION_MISSING_DATA_INACTIVE`, `EVALUATION_MISSING_DATA_ACTIVE`, `EVALUATION_MISSING_DATA_NO_OP`; requires `duration` of at least 60 seconds |
| `forecastOptions` | `ForecastOptions` | `forecastHorizon` required; range per Discovery 1 hour to 60 hours |

### `MetricAbsence` (`conditionAbsent`)

| Field | Type | Description |
|---|---|---|
| `filter` | string | Required; at most 2048 Unicode characters |
| `duration` | duration | Required; minimum 120 seconds, multiples of a minute |
| `aggregations[]` | `Aggregation` | Can aggregate multiple series into one so the condition is met only when all are absent |
| `trigger` | `Trigger` | Count or percent of time series |

### `AlertStrategy` and related

| Field | Type | Description |
|---|---|---|
| `autoClose` | duration | Open incidents close after this long with no data |
| `notificationPrompts[]` | enum | `OPENED`, `CLOSED` (`NOTIFICATION_PROMPT_UNSPECIFIED` is an error); log-based policies are always `OPENED` |
| `notificationRateLimit.period` | duration | Required for log-based policies (`LogMatch`); not more than one notification per period |
| `notificationChannelStrategy[].renotifyInterval` | duration | At least 30 minutes and at most 24 hours |
| `notificationChannelStrategy[].notificationChannelNames[]` | string | `projects/PROJECT_ID/notificationChannels/CHANNEL_ID` with a numeric channel ID |

## Notes

- Each alerting policy belongs to the scoping project of a metrics scope; each project can contain up to 2,000 policies. Use the scoping project's ID as the project ID in API calls.
- Single-thread API calls that create, update, or delete alerting policies in a project.
- Forecasting: create via the console, gcloud, or `alertPolicies.create`; client libraries might not support it. Forecasts use `MetricThreshold` with `forecastOptions`.
- A `PrometheusQueryLanguageCondition` / `LogMatch` condition must be the only condition. For ratios the source recommends PromQL; ratios over two different metric types can give anomalies (such as 1/0) because of different sampling periods and alignment windows, so prefer one metric type with a label (including an "OK" status value).
- A Prometheus alerting-rule file can be migrated by the gcloud CLI into a policy with a PromQL condition.
- The source shows policy-restore samples in C#, Go, Java, Node.js, PHP and Python (client-library alerting support exists only for C#, Go, Java, Node.js, and Python). They are omitted here; the Node.js sample in the retrieved twin is also corrupted (link text replaced `require` and class names). The policy JSON in the examples is not shown in the source; see its Sample policies page.
- Policies created by the API include `name`, `creationRecord`, `mutationRecord` and condition `name`; do not set them on create. To stop repeated notifications temporarily use a snooze; to remove them delete the `NotificationChannelStrategy` object.
- A `gcloud monitoring policies create` policy file is untrusted input if it comes from elsewhere; it can notify arbitrary channels you list in it.
- Snippet: `gcloud monitoring policies create` is verified against gcloud 593.0.0 help (`--policy-from-file` exists on the GA track).
- Source: https://docs.cloud.google.com/monitoring/alerts/policies-in-api (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [alerts.md](./alerts.md)
- [concepts-indepth.md](./concepts-indepth.md)
- [doc-variables.md](./doc-variables.md)
