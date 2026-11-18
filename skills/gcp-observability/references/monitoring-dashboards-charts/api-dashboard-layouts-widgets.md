---
source: https://docs.cloud.google.com/monitoring/dashboards/api-dashboard
---

# Dashboard API layouts, widgets, and labels

A `Dashboard` defines the widgets to display and the layout that orders them; it can also carry labels and filters. This page covers the layouts, widget types and labels of the Cloud Monitoring API v1 `Dashboard` object.

## Signature / Usage

### Row layout with three Text widgets

```json
{
  "displayName": "Row-layout example",
  "rowLayout": {
    "rows": [
      {
        "widgets": [
          {
            "text": {
              "content": "Text Widget 1",
              "format": "RAW"
            }
          },
          {
            "text": {
              "content": "**Text Widget 2**",
              "format": "MARKDOWN"
            }
          },
          {
            "text": {
              "content": "_Text Widget 3_",
              "format": "MARKDOWN"
            }
          }
        ]
      }
    ]
  }
}
```

### XyChart widget with a right Y-axis

Adapted (not in the official docs): added `"alignmentPeriod": "60s"` to `aggregation`, which the API requires when `perSeriesAligner` is not `ALIGN_NONE`.

```json
{
  "displayName": "Demo dashboard",
  "gridLayout": {
    "widgets": [
      {
        "title": "Sample line chart",
        "xyChart": {
          "dataSets": [
            {
              "timeSeriesQuery": {
                "timeSeriesFilter": {
                  "filter": "metric.type=\"compute.googleapis.com/instance/cpu/utilization\" resource.type=\"gce_instance\"",
                  "aggregation": {
                    "alignmentPeriod": "60s",
                    "perSeriesAligner": "ALIGN_MEAN",
                    "crossSeriesReducer": "REDUCE_MAX",
                    "groupByFields": [
                      "resource.label.zone"
                    ]
                  }
                },
                "unitOverride": "1"
              },
              "plotType": "LINE"
            }
          ],
          "timeshiftDuration": "0s",
          "yAxis": {
            "label": "y1Axis",
            "scale": "LINEAR"
          },
          "chartOptions": {
            "mode": "COLOR"
          }
        }
      }
    ]
  }
}
```

### Labels

Adding labels is optional. `labels` is a map of strings; set the key to the label name and the value to an empty string. The source's sample elides the tiles, so it is shown as a fragment:

```text
{
  "displayName": "Example",
  "mosaicLayout": {
    "columns": 12,
    "tiles": [
      ...
    ]
  },
  "dashboardFilters": [],
  "labels": {
    "playbook": ""
  }
}
```

## Options / Props

### Layouts

| Layout | Behavior |
|--------|----------|
| `GridLayout` (`gridLayout`) | Divides the space into vertical columns of equal width and arranges widgets row-first |
| `MosaicLayout` (`mosaicLayout`) | Divides the space into a grid; each widget can occupy one or more grid blocks. Required for text and organization widgets |
| `RowLayout` (`rowLayout`) | Divides the space into rows; widgets are arranged horizontally in each row |
| `ColumnLayout` (`columnLayout`) | Divides the space into vertical columns; widgets are arranged vertically in each column |

### Widgets

| Widget | Description |
|--------|-------------|
| `XyChart` | Data over X and Y axes (time series or SQL query results); left or right Y-axis per data set; line, bar, stacked area, heatmap; per-chart time range override of the dashboard setting; also used for trace data |
| `PieChart` | Latest values of a collection of time series, one slice per series |
| `Scorecard` | Latest value of one time series versus one or more thresholds |
| `TimeSeriesTable` | Latest or aggregated value per time series; customizable (color-coded cells, column names, alignment); also used for trace data |
| `AlertChart` | Summary of a single-condition alerting policy: line chart, threshold, number of open alerts |
| `IncidentList` | List of alerts, for specific alerting policies or resource types |
| `ErrorReportingPanel` | Error groups stored in the selected project |
| `LogsPanel` | Project-scoped log entries of the current project, or of projects accessible through the current metrics scope |
| `CollapsibleGroup` | Collection of widgets that can be collapsed |
| `SingleViewGroup` | Shows one widget of a collection; you select which |
| `SectionHeader` | Horizontal divider and an entry in the dashboard table of contents |
| `Text` | Raw text or Markdown (`format`: `RAW`, `MARKDOWN`) |
| blank | Placeholder widget |

## Notes

- Text and organization widgets (`CollapsibleGroup`, `SingleViewGroup`, `SectionHeader`, `Text`) require the dashboard to use a `MosaicLayout`.
- Corrected from the official docs: the XyChart sample's `aggregation` was `{"perSeriesAligner": "ALIGN_MEAN", "crossSeriesReducer": "REDUCE_MAX", "groupByFields": [...]}` without `alignmentPeriod`. The v1 `Aggregation.alignmentPeriod` description in the Discovery document says "The value must be at least 60 seconds. If a per-series aligner other than ALIGN_NONE is specified, this field is required or an error is returned"; `"alignmentPeriod": "60s"` is the value the same source page uses in its other chart samples.
- Source inconsistency: the source says text and organization widgets require a `MosaicLayout`, but its row-layout and column-layout samples place `text` widgets in a `rowLayout` / `columnLayout`. Both statements are kept as written.
- In `Dashboard.labels` only the keys are processed; the values are ignored.
- The labels sample contains the `...` elision of the source, so it is a `text` fence; the other samples are valid JSON shown unchanged.
- You cannot retrieve, edit, or delete predefined dashboards with the API.
- Source: https://docs.cloud.google.com/monitoring/dashboards/api-dashboard (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [api-dashboard.md](./api-dashboard.md)
- [api-dashboard-filters-variables.md](./api-dashboard-filters-variables.md)
- [dashboards.md](./dashboards.md)
