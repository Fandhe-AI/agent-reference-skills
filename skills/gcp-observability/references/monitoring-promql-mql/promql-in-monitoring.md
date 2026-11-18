---
source: https://docs.cloud.google.com/monitoring/promql/promql-in-monitoring
---

# Using the PromQL code editor

The PromQL code editor in the Google Cloud console offers suggestions and other tools for building valid PromQL queries. It is available in Metrics Explorer and in **Add widget** when creating dashboards. The page does not cover the PromQL language itself (see the open source Prometheus documentation).

## Signature / Usage

Open Metrics Explorer, select **PromQL** in the toolbar of the query-builder pane, type the query and click **Run Query**. Example query (taken from https://docs.cloud.google.com/monitoring/promql, the legacy-name form of a Cloud Monitoring metric):

```text
logging_googleapis_com:byte_count{monitored_resource="k8s_container"}
```

### Editor features

- Autocompletion: a list of syntactically valid completions appears as you type. `Control+Space` opens the menu, `Escape` dismisses it, arrow keys navigate, `Enter` inserts the selection, `Tab` inserts the prefix common to all choices.
- Find and replace: `Control+F` (`Command+F` on Mac).
- **Auto-run** toggle (disabled by default): when enabled, the **Run Query** button is hidden, error messages appear continuously, and an incomplete query without errors shows a yellow triangle (and **Incomplete query** if there is room). Incomplete queries are not evaluated.
- A grab-bar between the editor and the chart region resizes the two regions.

### Save charts

- From Metrics Explorer: run the query (unless Auto-run is on), then **Save as** > **Dashboard chart** and complete the dialog.
- On a custom dashboard: give the chart a title, run the query, then **Save** if dashboard autosave is not enabled.
- Custom dashboards periodically save changes; if you do not run the query first, the editor saves the last query you ran.
- Page-level filters for custom dashboards are supported for PromQL charts.

## Notes

- Leaving the code editor by selecting another selector tab discards the query text (you are offered to save it to the clipboard).
- Source: https://docs.cloud.google.com/monitoring/promql/promql-in-monitoring (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/monitoring/promql
- The source has no code samples; it describes Console steps only.
- PromQL semantics follow upstream Prometheus; this is Google Cloud Monitoring, not a self-hosted Prometheus server.

## Related

- [promql.md](./promql.md)
- [promql-in-alerting.md](./promql-in-alerting.md)
