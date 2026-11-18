---
source: https://docs.cloud.google.com/monitoring/charts/dashboards
---

# Create and manage custom dashboards (Google Cloud console)

Custom dashboards in Cloud Monitoring organize metrics, logs, traces, alerts, and service-level objectives (SLOs) in one place. You can build dashboards from scratch, import Grafana dashboards, or copy, modify, and share existing dashboards across projects. By default a dashboard displays all metric data available to the project; with a configured metrics scope it can display data for multiple projects. To manage dashboards with the API or gcloud, see api-dashboard.md.

## Signature / Usage

### Save a dashboard as a JSON template

Dashboard JSON can be downloaded or copied from **Settings** > **JSON** > **JSON Editor** in the console. The same JSON can be read with gcloud. The file is only a template; it does not store time-series data.

```bash
gcloud monitoring dashboards describe DASHBOARD_ID --format=json --project=PROJECT_ID
```

### Copy a dashboard into another project

1. In the source dashboard, open **Settings** > **JSON** > **JSON Editor** and click **Copy**.
2. Select the destination project, click **Create dashboard**, open the JSON Editor, paste, click **Apply changes**, then **Save**.

### Other operations (Console)

- Create: **Dashboards** page > **Create custom dashboard** > **Add widget** > **Apply** > **Save**.
- Copy: **Copy dashboard** on the **Dashboards Overview** page.
- Install a template from a shared location (Cloud Monitoring publishes curated templates on GitHub), or import a Grafana JSON dashboard with the Grafana importer.
- Labels: **Add labels to dashboard**; **Manage labels** lists, edits and deletes labels.
- Filters: temporary filters live in the dashboard filter bar; permanent filters and variables are under **Settings** > **Manage Filters**.
- Version history: **Settings** > **View Version History**, then **Revert**.
- Widget edits: **Edit widget**, **Settings** > **JSON** > **JSON Editor** (click **Apply changes**), **View code** in the widget toolbar, drag to reposition, drag the right-hand corner to resize.

## Options / Props

### Roles and permissions

| Task | Role |
|------|------|
| Create and modify custom dashboards in the console | Monitoring Editor (`roles/monitoring.editor`) on the project |
| Copy a dashboard to another project | Monitoring editor permission in the destination project |

### Widget types a custom dashboard can display

| Content | Notes |
|---------|-------|
| Charts and indicators | Created via **Add widget** |
| Log entries | From multiple Google Cloud projects or log views |
| Alerts and charts for alerting policies | |
| SLOs | |
| Text | Text and grouping widgets (sections, collapsible containers) improve load time and usability |
| Trace data | |

### Limits and defaults

| Item | Value |
|------|-------|
| Revision retention | Revisions of an existing dashboard are retained for 90 days; the latest revision is retained indefinitely |
| Auto save | On by default, per user per project; toggle **Autosave** in the toolbar |
| Auto refresh | Can be enabled for the current session only; a dashboard cannot be configured to open with auto refresh enabled |
| Grid mode | Widgets cannot be repositioned or resized when the dashboard is in grid mode |

## Notes

- Dashboard-wide filters apply to all widgets; variables apply to selected widgets (change a widget query or control widget visibility); user-defined labels such as `prod` / `staging` help locate dashboards. Events (for example a GKE Pod crash) can be shown to correlate data.
- Deleting a dashboard that contains a chart for an alerting policy does not delete the alerting policy, so you can still receive notifications from the policy. Manage policies on the **Alerting** page. Deletion removes the dashboard definition; try it on a disposable project first.
- If you create a dashboard with Terraform, do not edit it in the console; editing causes the dashboard to be rescaled.
- The twin states both that dashboards "automatically refresh their display when new data is available" (introduction note) and that auto refresh is disabled when a dashboard opens (Configure data refresh); both are kept as written in the source.
- App Hub configurations: select the App Hub host project or management project.
- The source's procedures are Console click-paths and are summarized; the source also shows Terraform for dashboards on the API page.
- Snippet taken from https://docs.cloud.google.com/monitoring/dashboards/api-dashboard
- Source: https://docs.cloud.google.com/monitoring/charts/dashboards (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [api-dashboard.md](./api-dashboard.md)
- [predefined-dashboards.md](./predefined-dashboards.md)
- [metrics-explorer.md](./metrics-explorer.md)
