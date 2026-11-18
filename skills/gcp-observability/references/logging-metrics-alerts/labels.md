---
source: https://docs.cloud.google.com/logging/docs/logs-based-metrics/labels
---

# Log-based metric labels

Labels let a log-based metric hold one time series per combination of label values. User-defined labels on counter and distribution metrics are defined with extractor expressions that pull a value from a `LogEntry` field (the whole field or a regular-expression capture group).

## Signature / Usage

### Create a metric with custom labels (gcloud)

Put the `LogMetric` definition (including labels) in a JSON or YAML file:

```text
gcloud logging metrics create METRIC_NAME --config-from-file FILENAME
```

### Label syntax in the `LogMetric`

For each label add an entry to both `metricDescriptor.labels` and `labelExtractors`:

```text
{
  ...
  metricDescriptor: {
      labels: [
        { key: LABEL_NAME, valueType: LABEL_TYPE,
          description: LABEL_DESCRIPTION },
        ...
      ]
  },
  labelExtractors: {
    LABEL_NAME: EXTRACTOR_EXPRESSION,
    ...
  },
}
```

Extractor expression forms:

```text
EXTRACT(FIELD)
```

```text
REGEXP_EXTRACT(FIELD, REGEXP)
```

Example with two labels:

```text
{
  ...
  metricDescriptor: {
      labels: [
        { key: "label_name_a", valueType: STRING },
        { key: "label_name_b", valueType: INT64 },
      ]
  },
  labelExtractors: {
    "label_name_a":
      "REGEXP_EXTRACT(jsonPayload.field_a, \"before ([a-zA-Z ]+) after\")",
    "label_name_b": "EXTRACT(jsonPayload.field_b)",
  },
}
```

### Field name and regular expression examples (Console form)

Field name with special characters:

```text
labels."compute.googleapis.com/resource_id"
```

Text the field might contain, and a regexp whose capture group extracts the instance number:

```text
The instance number is 0123456789; the ID is my-test-instance22
```

```text
The instance number is ([0-9]+); .*
```

Repeated field (`authorizationInfo` is a list): field name and expression that keeps `get` / `coordination` from `io.k8s.xyz`:

```text
protoPayload.authorizationInfo.permission
```

```text
io.k8s.([a-z]+).*
```

Text payload `unfinished_task_instance_count.py:61 Unfinished task instance count metric value 0 for state: deferred`: field name `textPayload`, expression:

```text
^unfinished.*state: ([a-z]+)
```

## Options / Props

### Limits of user-defined labels

| Limit | Value |
|---|---|
| Labels per metric | Up to 10 user-defined labels. |
| Deletion | A label can't be deleted once created. |
| Editable after creation | Extractor expression and description. |
| Not changeable | Name and value type. |
| Label value length | Values are limited to 1,024 bytes (only the first 1,024 bytes are kept; multibyte values hold fewer characters). |
| Active time series | About 30,000 per log-based metric (depends on label values, including default labels). |
| Label name (Console) | At most 100 characters; matches `[a-zA-Z][a-zA-Z0-9_]*`; more than just the string "log". |

### Label types and syntax elements

| Element | Values |
|---|---|
| Console label type | `STRING`, `BOOLEAN`, `INTEGER` |
| API `valueType` | `STRING`, `BOOL`, `INT64` |
| Extractor | `EXTRACT(FIELD)` or `REGEXP_EXTRACT(FIELD, REGEXP)` (RE2 syntax) |

### Default labels

| Label | Meaning |
|---|---|
| Resource labels | From the monitored resource of the series; each combination creates additional time series. |
| `log` | `LOG_ID` part of `logName`. |
| `severity` | `severity` field; provided by default only in system-defined log-based metrics. |

## Notes

- You can extract labels from `LogEntry` built-in fields such as `httpRequest.status` or from `textPayload`, `jsonPayload`, `protoPayload`; you can't extract the ID of an error group from `errorGroups`.
- Don't put sensitive information in the extractor expression and don't extract sensitive data into labels; both are treated as service data.
- Create labels only to categorize or summarize metric data, not to name data fields. You can't add labels to system log-based metrics, and labels are created together with the metric.
- Never extract a value unique to each entry (full `insertId`, `timestamp`, user IDs, IP addresses, unparameterized URLs): you get as many time series as entries. Keep the value set small and constrained; 8-bit RGB values for a color label could yield over 16 million series. Too many series raises cost and can throttle activity.
- Example: 100 resources and a label with 20 possible values give up to 2,000 time series.
- Always use a capture group in an extractor expression; without an expression the entire field value is extracted. Always specify an extractor for text payload fields.
- Field names with special characters are wrapped in double quotes, for example `labels."k8s-pod/k8s-app"` with an empty expression. For audit logs, `protoPayload.status.code` can be used directly; `(\d)\d\d` keeps the first digit.
- For repeated fields the extractor iterates until the first match and returns only that first match.
- The API fences are the source's pseudo-JSON (unquoted keys, trailing commas, `...`), so they are tagged `text`; send valid JSON or YAML to the API. Use `--config-from-file` for gcloud.
- To verify labels, use Metrics Explorer: **View in Metrics Explorer**, set Aggregation to **Unaggregated**, and show the table to see label columns. For `gce_instance` the resource labels are `project_id`, `instance_id`, `zone`; `logging/log_entry_count` has metric labels `log` and `severity`.
- The source also shows Console steps.
- Source: https://docs.cloud.google.com/logging/docs/logs-based-metrics/labels (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Source inconsistency: the labels page says "Only the first 1,024 characters of a label value are" kept, while the troubleshooting page says values "must not exceed 1,024 bytes" (https://docs.cloud.google.com/logging/docs/logs-based-metrics/troubleshooting). The table states the byte limit.

## Related

- [logs-based-metrics.md](./logs-based-metrics.md)
- [counter-metrics.md](./counter-metrics.md)
- [troubleshooting.md](./troubleshooting.md)
