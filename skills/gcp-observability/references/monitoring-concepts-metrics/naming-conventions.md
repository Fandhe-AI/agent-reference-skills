---
source: https://docs.cloud.google.com/monitoring/api/v3/naming-conventions
---

# Metric naming conventions

Standardized resource names, domain prefixes and label keys in Cloud Monitoring. Apply these rules to create valid custom metric types and `LabelDescriptor` keys.

## Signature / Usage

### Metric resource name

A metric type's resource name has three parts: a project identifier, the marker `metricDescriptors`, and the metric type.

```text
projects/PROJECT_ID/metricDescriptors/METRIC_TYPE
```

Examples of `METRIC_TYPE` from the source:

```text
agent.googleapis.com/agent/api_request_count
compute.googleapis.com/firewall/dropped_bytes_count
istio.io/service/client/received_bytes_count
kubernetes.io/anthos/APIServiceOpenAPIAggregationControllerQueue1_adds
```

In the metric descriptor, `name` stores the resource name and `type` stores the `METRIC_TYPE` substring.

## Options / Props

### `METRIC_TYPE` structures

| Structure | Metrics from |
|---|---|
| `SERVICE_NAME.googleapis.com/PATH` | Google Cloud products and services. |
| `agent.googleapis.com/SERVICE_NAME/PATH` | The Monitoring and Logging agents on VMs in Google Cloud or AWS. |
| `kubernetes.io/anthos/PATH` | GKE Enterprise. |
| `aws.googleapis.com/SERVICE_NAME/PATH` | Amazon Web Services. |
| `istio.io/PATH` | Istio for Google Cloud. |
| `kubernetes.io/PATH` | Google Kubernetes Engine. |
| `knative.dev/PATH` | Knative. |
| `external.googleapis.com/EXT_SERVICE/PATH`, `external.googleapis.com/prometheus/PATH` | Third-party custom metrics such as Prometheus. Usable only in the projects that define them. |
| `custom.googleapis.com/PATH`, `external.googleapis.com/user/PATH` | User-defined metrics. Usable only in the projects where you define them. |
| `logging.googleapis.com/PATH` | Log-based metrics from Cloud Logging; predefined metrics, or custom ones usable only in the project where defined. |

### Rules for custom metric types and labels

| Item | Rule |
|---|---|
| Metric type characters | `A-Z`, `a-z`, `0-9`, period `.`, underscore `_`, colon `:`, hyphen `-`; forward slash `/` separates path elements. |
| Path elements | Each must start with a letter or digit. |
| Metric type length | Maximum 200 characters. |
| Label key characters | Lowercase `a-z`, `0-9`, underscore `_`, dot `.`. |
| Label key start | Must start with a letter. |
| Label key length | Maximum 100 characters. |
| Label key uniqueness | Unique within the metric type. |
| Labels per metric type | No more than 30. |

## Notes

- `METRIC_TYPE` structures: `SERVICE_NAME` identifies a Google Cloud product (for example `compute`); `PATH` identifies the metric within it (for example `instance/cpu/utilization`).
- Labels are `LabelDescriptor` key-value pairs; the key is the label name.
- The `agent.googleapis.com` prefix belongs to the Monitoring and Logging agents (legacy agents); the source does not state their support status here, see the agent pages.
- Source inconsistency: the Discovery document for Monitoring API v3 (`LabelDescriptor.key`) says the key "Matches the following regular expression: `[a-zA-Z][a-zA-Z0-9_]*`" (upper-case letters allowed, dots not allowed), while this page allows lowercase `a-z`, `0-9`, `_` and `.`. A key that starts with a lowercase letter and uses only lowercase letters, digits and underscores satisfies both.
- Source: https://docs.cloud.google.com/monitoring/api/v3/naming-conventions (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [custom-metrics.md](./custom-metrics.md)
- [metric-model.md](./metric-model.md)
