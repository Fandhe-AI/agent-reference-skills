---
source: https://docs.cloud.google.com/monitoring/dashboards/api-dashboard
---

# Dashboard API pinned filters and variables

Pinned filters and variables are defined in the `dashboardFilters` array of the `Dashboard` object (`DashboardFilter` data structure). Pinned filters apply to every widget that supports the filter's label, unless the widget already has a filter with the same label key. Variables are like pinned filters but apply only to widgets whose query references them. Both appear in the dashboard toolbar: a pinned filter under its filter name, a variable as `$` followed by its name.

## Signature / Usage

### Default values

Single default value, user can select exactly one option:

```text
"valueType": "STRING",
"stringValue": "my-default-value",
```

At least one default value, user can select multiple options:

```text
"valueType": "STRING_ARRAY",
"stringArrayValue": {
  "values": [ "a", "b", "c" ]
},
```

### One pinned filter and two variables

Adapted (not in the official docs): the source's JSON was invalid (missing comma after `"labelKey": "zone"`, unquoted `timeSeriesQuery`, a multi-line SQL string, a trailing `...`). The version below is valid JSON that uses only `DashboardFilter` / `OpsAnalyticsQuery` fields from the Discovery document.

```json
{
  "displayName": "Illustrate Variables",
  "dashboardFilters": [
    {
      "labelKey": "zone",
      "stringValue": "us-central1-c",
      "valueType": "STRING",
      "filterType": "RESOURCE_LABEL"
    },
    {
      "labelKey": "instance_id",
      "stringValue": "3133577226154888113",
      "valueType": "STRING",
      "filterType": "RESOURCE_LABEL",
      "templateVariable": "my_label_based_variable"
    },
    {
      "filterType": "VALUE_ONLY",
      "templateVariable": "my_value_only_variable",
      "timeSeriesQuery": {
        "opsAnalyticsQuery": {
          "sql": "SELECT log_name FROM `MY_TABLE` GROUP BY log_name"
        }
      }
    }
  ]
}
```

### Dereference a variable in a widget query

For all widgets except those defined by SQL, use the variable syntax table below; widgets defined by SQL use `@variable_name` (see api-dashboard-variable-queries.md).

## Options / Props

### `DashboardFilter` fields

| Field | Description |
|-------|-------------|
| `templateVariable` | Name of the variable. Omit (or empty string) to create a pinned filter |
| `labelKey` | Required for a pinned filter or a label-based variable; omit for a value-only variable (`filterType` `VALUE_ONLY`) |
| `filterType` | `RESOURCE_LABEL`, `METRIC_LABEL`, `USER_METADATA_LABEL`, `SYSTEM_METADATA_LABEL`, `GROUP`, `VALUE_ONLY` (`FILTER_TYPE_UNSPECIFIED` is not valid) |
| `valueType` | `STRING` (single selection, with `stringValue`) or `STRING_ARRAY` (multiple selection, with `stringArrayValue`) |
| `stringValue` / `stringArrayValue` | Default value(s). If no default is set, the wildcard operator `(*)` is selected |
| `stringArray` / `timeSeriesQuery` | Optional list of all possible values of a value-only variable; a query must be an analytics (`opsAnalyticsQuery`) query. Do not set for a pinned filter or label-based variable |

### Variable syntax

| Syntax | Meaning |
|--------|---------|
| `${my_label_based_variable}` | Label key and value resolved into a valid filter expression for the query language |
| `${my_label_based_variable.value}` | Only the value of a label-based variable; the comparison must use a regular expression |
| `${my_value_only_variable}` | Value of a value-only variable (no `.value`); the comparison must use a regular expression |

## Notes

- The `dashboardFilters` object does not list the widgets a variable applies to; you change a widget's query to depend on the variable. A variable can also control widget visibility (a **Visible** icon appears in the toolbar).
- A chart whose own filter has the same label key (for example `zone = us-central1-a`) ignores a pinned filter on `zone`; charts without that label ignore it too.
- For label-based variables the set of possible values is determined dynamically, so do not set `stringArray` or `timeSeriesQuery` for them.
- If you use a variable with the wildcard default in a logs panel, use a regular expression as comparator; for SQL use an `IF` statement. See api-dashboard-variable-queries.md.
- Corrected from the official docs: the source JSON `"labelKey": "zone"` was followed by no comma, `timeSeriesQuery:` was unquoted, the SQL string spanned several lines and the object ended with `...`. The source's `opsAnalyticsQuery` samples elsewhere carry `queryHandle`, `savedQueryId` and `queryExecutionRules`, which are not fields of `OpsAnalyticsQuery` in the monitoring v1 Discovery document, so they are not reproduced.
- Console procedures (**Create and pin a filter**, **Create a variable**) are not reproduced; see the dashboard filters page of the source.
- Source: https://docs.cloud.google.com/monitoring/dashboards/api-dashboard (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [api-dashboard-variable-queries.md](./api-dashboard-variable-queries.md)
- [api-dashboard.md](./api-dashboard.md)
- [api-dashboard-layouts-widgets.md](./api-dashboard-layouts-widgets.md)
