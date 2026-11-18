---
source: https://docs.cloud.google.com/monitoring/dashboards/api-dashboard
---

# Dashboard variables in logs panel, PromQL, SQL, and Monitoring filter queries

How a widget query references a pinned filter or variable, per query language, and how each reference resolves. Label-based variables resolve to a filter expression; with `.value` (and for value-only variables) only the value is substituted, and the comparison must then be a regular expression.

## Signature / Usage

### Logs panel

Console query pane, label-based variable value in a regular expression:

```text
jsonPayload.message=~"Connected to instance: ${my_label_based_variable.value}"
```

Value-only variable `value_only_severity_variable` with `ERROR`, `INFO` and `NOTICE` selected:

```text
severity =~ "${value_only_severity_variable}"
```

Executed form:

```text
severity =~ "^(ERROR|INFO|NOTICE)$"
```

Adapted (not in the official docs): the source fragment `"logsPanel": {...},` was wrapped in an object so it is valid JSON.

```json
{
  "logsPanel": {
    "filter": "${my_label_based_variable}",
    "resourceNames": [
      "projects/1234512345"
    ]
  }
}
```

### PromQL

```text
compute_googleapis_com:instance_cpu_utilization{
    monitored_resource="gce_instance", ${my_label_based_variable} }
```

```text
compute_googleapis_com:instance_cpu_utilization{
    instance_id=~"${my_label_based_variable.value}"
}
```

```text
zone=~"${my_value_only_variable}"
```

Adapted (not in the official docs): the source's `prometheusQuery` string spanned several lines (invalid JSON); it is joined on one line and wrapped in an object.

```json
{
  "timeSeriesQuery": {
    "prometheusQuery": "avg_over_time(compute_googleapis_com:instance_cpu_utilization{monitored_resource=\"gce_instance\", ${my_label_based_variable}}[${__interval}])",
    "unitOverride": "",
    "outputFullDuration": false
  }
}
```

### SQL

`FROM` can use the system-defined variable `@__project_id` (for dashboard templates; resolves to the selected project on install):

```sql
FROM `@__project_id.global._Default._Default`
```

`WHERE` can use user-defined variables, prefixed with `@` (label-based: `@my_label_based_variable.value`). Always use an `IF` statement, because SQL does not treat the wildcard `*` as "any value"; without it, selecting `*` returns an empty table:

```sql
WHERE IF(@my_value_only_variable = "*", TRUE, log_name = @my_value_only_variable)
```

Adapted (not in the official docs): the source's chart fragment was wrapped in an object with the SQL joined on one line, and `queryExecutionRules` and `queryHandle` were removed (not `OpsAnalyticsQuery` fields in the Discovery document).

```json
{
  "plotType": "STACKED_BAR",
  "targetAxis": "Y1",
  "timeSeriesQuery": {
    "opsAnalyticsQuery": {
      "sql": "SELECT timestamp, severity, resource.type, log_name, text_payload, proto_payload, json_payload FROM `my-project.global._Default._Default` WHERE IF (@LogName = \"*\", TRUE, log_name=@LogName) LIMIT 10000"
    }
  }
}
```

Adapted (not in the official docs): the variable that lists the log names; `queryHandle` and `savedQueryId` were removed (not `OpsAnalyticsQuery` fields in the Discovery document) and the fragment wrapped in an object.

```json
{
  "dashboardFilters": [
    {
      "filterType": "VALUE_ONLY",
      "templateVariable": "LogName",
      "valueType": "STRING",
      "timeSeriesQuery": {
        "opsAnalyticsQuery": {
          "sql": "SELECT log_name FROM `my-project.global._Default._Default` GROUP BY log_name LIMIT 1000"
        },
        "unitOverride": "",
        "outputFullDuration": false
      }
    }
  ]
}
```

### Monitoring filter

Value-only variable on `zone` (a regular expression comparison via `monitoring.regex.full_match`):

```text
metric.type="compute.googleapis.com/instance/cpu/utilization"
resource.type="gce_instance"
resource.label."zone"=monitoring.regex.full_match(${my_value_only_variable})
```

Adapted (not in the official docs): the source's label-based example ended with a stray `"` after the variable, and its REST string spanned several lines; it is one line and wrapped in an object.

```json
{
  "timeSeriesQuery": {
    "timeSeriesFilter": {
      "filter": "metric.type=\"compute.googleapis.com/instance/cpu/utilization\" resource.type=\"gce_instance\" ${my_label_based_variable}",
      "aggregation": {
        "alignmentPeriod": "60s",
        "perSeriesAligner": "ALIGN_MEAN",
        "groupByFields": []
      }
    },
    "unitOverride": "",
    "outputFullDuration": false
  }
}
```

## Options / Props

### Resolution in a logs panel

| Syntax | Selected value | Resolved expression |
|--------|----------------|---------------------|
| `${my_label_based_variable}` | `12345` | `resource.labels."instance_id"="12345"` (the example variable is based on the resource label `instance_id`) |
| `${my_label_based_variable}` | `*` | `""` |
| `${my_label_based_variable.value}`, `${my_value_based_variable}` | `12345` | `12345` |
| `${my_label_based_variable.value}`, `${my_value_based_variable}` | `*` | `.*` |

### Resolution in PromQL

| Syntax | Selected value | Resolved expression |
|--------|----------------|---------------------|
| `${my_label_based_variable}` | `12345` | `instance_id="12345"` |
| `${my_label_based_variable}` | `*` | `noop_filter=~".*"` |
| `${my_label_based_variable.value}`, `${my_value_based_variable}` | `12345` | `12345` |
| `${my_label_based_variable.value}`, `${my_value_based_variable}` | `*` | `.+` |

### Resolution in a Monitoring filter

| Syntax | Selected value | Resolved expression |
|--------|----------------|---------------------|
| `${my_label_based_variable}` | `12345` | `resource.labels."instance_id"="12345"` |
| `${my_label_based_variable}` | `*` | Omitted |
| `${my_label_based_variable.value}` | `12345` or `*` | Not supported |
| `${my_value_based_variable}` | `12345` | `"12345"` |
| `${my_value_based_variable}` | `*` | `".*"` |

## Notes

- SQL variable substitution relies on BigQuery parameterized queries and is SQL-injection safe. `FROM` cannot depend on user-defined variables.
- Monitoring-filter widgets cannot filter by the value of a label-based variable (`.value`); they can filter by value-only variables.
- When a variable allows multiple values in SQL, the source casts the variable to a GoogleSQL data type before `UNNEST`. The source's sample was `CAST(@my_value_only_variable)` with no target type, which is not valid SQL, so it is not reproduced; the source also mentions that **Insert variable filter** generates a `WHERE IF(@LogName = '*', TRUE, LogName = @LogName)` clause that you edit to use the column name (`log_name`) so the table join can occur.
- Corrected from the official docs: `CAST(@my_value_only_variable)` (no `AS` type) was omitted; multi-line JSON strings in the logs panel, PromQL, SQL and filter samples were joined onto one line; `queryHandle`, `savedQueryId` and `queryExecutionRules` were removed from `opsAnalyticsQuery`.
- The source's logs-panel variable sample using `resource.labels.project_id=~"${my_label_based_variable.value}"` is not reproduced; it follows the same `.value` regular-expression rule.
- PromQL semantics follow upstream Prometheus; metric names use the `compute_googleapis_com:instance_cpu_utilization` form.
- When you open the Logs Explorer from a configured logs panel, variables are resolved first.
- The source also shows Console procedures (**Apply to charts**, **Insert variable filter**) as click-paths.
- Corrected from the official docs: the Monitoring-filter resolution table gave `resource.instance_id == "12345"` for `${my_label_based_variable}`. Monitoring filters address resource labels as `resource.labels.KEY` (or `resource.label.KEY`) and compare with `=` (the same page's logs-panel table resolves the same variable to `resource.labels."instance_id"="12345"`, its filter sample uses `resource.labels.\"zone\"=monitoring.regex.full_match(...)`, and the alerting-policy console page lists `=` as the equality operator with `resource.labels.zone = "us-central1-a"`); `==` is not a Monitoring filter operator.
- Source: https://docs.cloud.google.com/monitoring/dashboards/api-dashboard (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Corrected from the official docs: the PromQL resolution table gives `instance_id == '12345'` for a label-based variable. The variable is inserted inside the `{...}` of a selector (the `noop_filter=~".*"` row is the matcher form), where `==` is not a valid matcher; the table shows `instance_id="12345"`.

## Related

- [api-dashboard-filters-variables.md](./api-dashboard-filters-variables.md)
- [api-dashboard.md](./api-dashboard.md)
- [metrics-explorer.md](./metrics-explorer.md)
