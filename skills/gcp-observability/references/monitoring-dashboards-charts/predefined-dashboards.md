---
source: https://docs.cloud.google.com/monitoring/charts/predefined-dashboards
---

# View and copy Google Cloud service dashboards

Preconfigured dashboards let you monitor Google Cloud resources such as Compute Engine VM instances or Google Kubernetes Engine clusters without manual setup. Cloud Monitoring installs these service-specific dashboards automatically when you add resources to the project. You cannot edit or delete them directly, but you can copy supported dashboards or individual charts into a custom dashboard.

## Signature / Usage

Predefined dashboards are not returned by the dashboards API; the commands below list custom dashboards only.

```bash
gcloud monitoring dashboards list --project=PROJECT_ID
```

### View (Console)

1. Open the **Dashboards** page, select the project (for App Hub configurations, the App Hub host project or management project).
2. In **My Dashboards**, set **Type** to **Google Services**, then select a service. Use the filter bar, for example **Name: GKE**; multiple filters are joined with an implicit **AND** unless you add **OR**.
3. Examples: dashboards whose names begin with **GKE** show GKE performance data (**GKE** shows clusters, namespaces, nodes, workloads and services in tables; **GKE Compute Resources** shows memory and CPU charts); **VM Instances** shows metrics and logs for an individual VM; **GCE VM Instance Monitoring** shows metrics for all VMs.

### Copy a dashboard or a chart (Console)

- Copy a dashboard: **Type** = **Google Services**, **Copy dashboard**, enter a name, **Copy**. If the copy icon is not shown, the dashboard cannot be copied. The copy is listed in the **Custom** category.
- Copy a chart: chart toolbar > **More chart options**. If **Clone widget** is offered, select it, choose the destination dashboard and click **Clone**. Otherwise select **View in Metrics Explorer**, **Save as**, **Dashboard chart**, and complete the dialog.

## Options / Props

| Item | Value |
|------|-------|
| Required role to view | Monitoring Viewer (`roles/monitoring.viewer`) on the project |
| Edit or delete a predefined dashboard | Not allowed |
| Copy | Only some dashboards and some widgets support copy |
| Auto refresh | Disabled when a dashboard opens; can be enabled per session only (**Enable auto refresh**) |

## Notes

- The API cannot retrieve, edit, or delete predefined dashboards (stated on the dashboards API page).
- The source's procedures are Console click-paths and are summarized here; the source shows no code.
- Snippet taken from https://docs.cloud.google.com/monitoring/dashboards/api-dashboard
- Source: https://docs.cloud.google.com/monitoring/charts/predefined-dashboards (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [dashboards.md](./dashboards.md)
- [api-dashboard.md](./api-dashboard.md)
- [metrics-explorer.md](./metrics-explorer.md)
