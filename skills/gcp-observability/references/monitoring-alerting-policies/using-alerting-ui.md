---
source: https://docs.cloud.google.com/monitoring/alerts/using-alerting-ui
---

# Create Metric-Threshold Alerting Policies (Console)

Create a metric-threshold alerting policy in the Google Cloud console that sends notifications when a metric crosses a threshold for a retest window, for example CPU utilization above 80% for at least five minutes. Not for log-based policies. Supported only for Google Cloud projects; for App Hub configurations select the App Hub host project or management project. Required role: Monitoring Editor (`roles/monitoring.editor`) on the project.

## Signature / Usage

Console flow: Alerting page, select the project, **Create policy**, then the steps below. Configure notification channels first (multiple types recommended for redundancy).

### Documentation template

The optional **Documentation** field takes plain text, Markdown and variables. Example template for a CPU utilization alert on a `gce_instance`; variables are replaced only in notifications, while the preview pane shows the Markdown formatting.

```text
## CPU utilization exceeded

### Summary

The ${metric.display_name} of the ${resource.type}
${resource.label.instance_id} in the project ${resource.project} has
exceeded 90% for over 15 minutes.

### Additional resource information

Condition resource name: ${condition.name}  
Alerting policy resource name: ${policy.name}  

### Troubleshooting and Debug References

Repository with debug scripts: example.com  
Internal troubleshooting guide: example.com  
${resource.type} dashboard: example.com
```

### Filter examples

A filter is a label, a comparator and a value, for example `zone=~"us-central1.*"`. When you filter by project ID or resource container you must use `=`; other labels accept any supported comparator. Multiple criteria are ANDed.

## Options / Props

### Select-time-series steps

| Step | Setting | Notes |
|---|---|---|
| Select a metric | Resource type and metric type; **Active** shows all metric types, even those without data | Any built-in or user-defined metric |
| Add filter | Label, comparator, value | e.g. `zone =~ ^us.*.a$` |
| Transform data | **Rolling window**, **Rolling window function** | Log-based metric: set rolling window to at least 10 minutes |
| Across time series | **Time series aggregation** (not `none`) and **Time series group by** | Default: not combined |

### Condition trigger

| Field | Values |
|---|---|
| Condition type | **Threshold** (default) |
| Alert trigger | **Any time series violates** (default); **Percent of time series violates**; **Number of time series violates**; **All time series violate** |
| Threshold position / value | e.g. **Above threshold** and `0.3` |
| Retest window (Advanced options) | Default **No retest**: a single measurement can notify |
| Evaluation missing data (Advanced options) | Disabled when retest window is **No retest** |

### Missing data evaluation

| Console value | Summary |
|---|---|
| Missing data empty | Open alerts stay open; new alerts not opened |
| Missing data points treated as values that violate the policy condition | Open alerts stay open; new alerts can be opened |
| Missing data points treated as values that don't violate the policy condition | Open alerts are closed; new alerts not opened |

### Notifications and name

| Field | Behavior |
|---|---|
| Notification channels | Select several types for redundancy |
| Notification subject line | Custom subject instead of default |
| Notify on alert closure | By default a console-created policy notifies only when an alert is created |
| Alert autoclose duration | Default seven days |
| Application labels | Associate with an App Hub application and a service or workload |
| Policy severity level | Shown in alerts and notifications |
| Policy user labels | Key starts with a lowercase letter; keys and values only lowercase letters, numerals, underscores, dashes |

### Filter comparison operators

| Operator | Meaning | Example |
|---|---|---|
| `=` | Equality | `resource.labels.zone = "us-central1-a"` |
| `!=` | Inequality | `resource.labels.zone != "us-central1-a"` |
| `=~` | RE2 regular expression equality | `monitoring.regex.full_match("^us.*")` |
| `!=~` | RE2 regular expression inequality | `monitoring.regex.full_match("^us.*")` |
| `starts_with` | Value starts with | `resource.labels.zone = starts_with("us")` |
| `ends_with` | Value ends with | `resource.labels.zone = ends_with("b")` |
| `has_substring` | Value contains | `resource.labels.zone = has_substring("east")` |
| `one_of` | One of | `resource.labels.zone = one_of("asia-east1-b", "europe-north1-a")` |
| `!starts_with` | Value doesn't start with | `resource.labels.zone != starts_with("us")` |
| `!ends_with` | Value doesn't end with | `resource.labels.zone != ends_with("b")` |
| `!has_substring` | Value doesn't contain | `resource.labels.zone != has_substring("east")` |
| `!one_of` | Value isn't one of | `resource.labels.zone != one_of("asia-east1-b", "europe-north1-a")` |

## Notes

- Select-time-series steps: `count` counts data points, not their values, and `mean` averages per-sample changes on `DELTA` metrics; to alert on total volume or rate of a `DELTA` metric use `sum`, `delta`, or `rate`. **percent change** monitors the rate of change.
- Metric not listed in the menu: click **Active**, or for a custom metric type that has no data yet use **Direct filter mode** (the **?** on the **Select metric** header) and enter a Monitoring filter or time series selector.
- Rate of change (**percent change**): a `DELTA` or `CUMULATIVE` series is first converted to `GAUGE`; Monitoring then compares the average of the most recent 10-minute sliding window to the average of the 10-minute window before the beginning of the alignment period. The 10-minute window cannot be changed; you set the alignment period.
- A policy with multiple conditions is built with **Add alert condition** and a combiner step; see the behavior page.
- The drop-down in the filter dialog lists only values seen over the last week, but any value can be typed.
- Source inconsistency: this page says "To create a policy that compares the value of a time series to a dynamic threshold, you must use MQL", while the alerting overview (alerts.md) says PromQL conditions can include complex expressions such as dynamic thresholds. MQL is not recommended since 2024-10-22 and new MQL charts and alerting policies cannot be created in the Console since 2025-07-22 (MQL deprecation notice: https://docs.cloud.google.com/stackdriver/docs/deprecations/mql); for new work, write the dynamic threshold as a PromQL condition (`conditionPrometheusQueryLanguage`).
- The source page also contains Console click-paths in detail, screenshots and Markdown-in-documentation notes, which are not reproduced; for API field names see the API page.
- Snippet: the documentation template above is verbatim from this page.
- Source: https://docs.cloud.google.com/monitoring/alerts/using-alerting-ui (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [concepts-indepth.md](./concepts-indepth.md)
- [policies-in-api.md](./policies-in-api.md)
- [doc-variables.md](./doc-variables.md)
