---
source: https://docs.cloud.google.com/monitoring/charts/metrics-explorer
---

# Metrics Explorer

Metrics Explorer builds temporary charts of metric data collected by the project, without a dashboard. You can chart a single metric type, compare multiple metrics, or open existing dashboard charts to test different query and display settings. The charts are not persistent: save the URL, add the chart to a custom dashboard, or download the data.

## Signature / Usage

### PromQL query: average CPU utilization

In the query-builder toolbar select **PromQL**, then enter a query.

```promql
avg(compute_googleapis_com:instance_cpu_utilization)
```

### PromQL query: ratio of metrics

```promql
sum without (instance)(rate(my_summary_latency_seconds_sum[5m])) /
sum without (instance)(rate(my_summary_latency_seconds_count[5m]))
```

### Menu-driven interface and Monitoring filter (Console)

- Menu-driven: pick a resource, metric category and metric in **Select a metric** (the filter bar does a case-insensitive "contains" match; **Active** shows metric types without data), optionally add filters, then set **Aggregation** (first menu: function; second menu: labels to group by; **Unaggregated** / **None** shows every time series). **Min Interval** and **Sort \& Limit** are optional.
- Monitoring filter: in **Metric**, click **Help** and select **Direct Filter Mode**, then enter a Monitoring filter in the **Filters** element.
- Multiple metric types: **Add query** (queries are labeled A, B, ...). Menu-driven interface only.
- Ratio: configure the numerator (A), **Add query** for the denominator (B), then **Create ratio** in the query toolbar. Menu-driven interface and PromQL only; the denominator must have the same metric kind as the numerator (for example `GAUGE` with `GAUGE`), with the same **Min Interval**; only labels common to both metric types can be selected.
- Save: **Link** (chart URL), **Save as** > **Dashboard chart**, **Download CSV**, or **Save as** > **Alert policy** (opens the alerting policy dialog with the metric fields populated and a threshold condition).

## Options / Props

### Visualization guidance

| Metric type | Setting |
|-------------|---------|
| Quota metric types | Set the time control to at least one week (quota metrics typically report one sample per day) and set **Widget type** to **Stacked bar chart** |
| Distribution value type | **Widget type** = **Heatmap chart** |
| Other (double values) | **Line chart**, **Stacked bar chart**, **Stacked area chart** are compatible; **Heatmap** is disabled because it only displays distribution-valued data |

### Query interface support

| Feature | Menu-driven | PromQL | Monitoring filter |
|---------|-------------|--------|-------------------|
| Chart multiple metric types | Yes | No | No |
| Ratio of metrics | Yes | Yes | No |

### Display pane options

| Group | Options |
|-------|---------|
| Chart | **Analysis mode** (line charts, x-ray, statics), **Compare to Past**, **Threshold Line**, **Legend Alias**, **Y-axis assignment** / labels / scale |
| Table | **Value option** (latest or aggregated), **Visible columns**, **Column formatting**, **Metric view**, **Legend Alias** |

## Notes

- Required role: Monitoring Viewer (`roles/monitoring.viewer`) on the project.
- Default display is a line chart in color mode; **Show breakdown** breaks a chart into tiles by label key.
- PromQL semantics follow upstream Prometheus; the query runs against Google Cloud Monitoring data, not a self-hosted Prometheus server.
- For App Hub configurations, select the App Hub host project or management project.
- Procedures are Console click-paths and are summarized.
- Source: https://docs.cloud.google.com/monitoring/charts/metrics-explorer (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [dashboards.md](./dashboards.md)
- [api-dashboard.md](./api-dashboard.md)
- [predefined-dashboards.md](./predefined-dashboards.md)
