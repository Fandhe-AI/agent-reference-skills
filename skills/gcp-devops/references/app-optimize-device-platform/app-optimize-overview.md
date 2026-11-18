---
source: https://docs.cloud.google.com/app-optimize/overview
---

# App Optimize API overview

App Optimize API lets developers and administrators fetch Google Cloud cost and utilization data programmatically, in a structured tabular format similar to the results of a SQL query. Reports can cover a project or an App Hub application, and are used for dashboards, alerting, scheduled exports to analysis tools, and cost checks in deployment pipelines. The product is in Preview.

## Signature / Usage

### How it works

1. Request a report: specify the time range, the resources or applications to cover, how to group the data, and the cost and usage details wanted. After a report is created, its definition cannot be modified; create a new report to change parameters.
2. Wait for the data to be prepared: this step runs asynchronously and the API provides a way to check when the report is ready.
3. Retrieve the report data: rows and columns based on the request.

Generated reports are automatically deleted from the API after 24 hours.

### Read a finished report

```bash
gcloud beta app-optimize reports read REPORT_ID \
  --project=PROJECT_ID \
  --location=global
```

## Options / Props

### Key features

| Feature | Description |
|---|---|
| Detailed reporting | Aggregate data by project, individual resource, SKU, timeframe, and App Hub application, service, and workload. |
| Cost and utilization data | Monetary cost, CPU utilization (mean and 95th percentile), CPU core usage and allocation, memory utilization (mean and 95th percentile), memory usage and allocation. |
| Flexible filtering | Common Expression Language (CEL) filters on time ranges, resource types, specific App Hub applications, and other attributes. |
| MCP server | AI applications can get cost and utilization data through the App Optimize API remote MCP server. |

### Integration patterns named in the source

| Pattern | Description |
|---|---|
| Analysis tool export | A scheduled job using Cloud Run and Cloud Scheduler calls the API daily to fetch the latest data. |
| Custom dashboards | Web applications lazy-load specific cost and utilization metrics on demand by calling the API with JavaScript. |
| Cost-aware decisions | Find services with a recent cost spike, find underutilized resources, compute the cost of an application in a timeframe, or monitor spending by product and region. |

## Notes

- Status: Preview. During Preview there is no additional cost for using App Optimize API, including creating reports, reading reports, and reading report metadata. Costs of the services that provide the data are separate: see [Cloud Billing pricing](https://cloud.google.com/billing/v1/pricing), [App Hub pricing](https://cloud.google.com/app-hub/pricing) and [costs for application management](https://docs.cloud.google.com/app-hub/docs/enabled-apis#costs), and [Cloud Monitoring pricing](https://cloud.google.com/stackdriver/pricing#monitoring-costs). Prices are not copied here.
- The overview links the data limitations to [About cost and utilization data](https://docs.cloud.google.com/app-optimize/optimization-data) and to the enable-API, create-and-read quickstart, access-control and remote MCP server pages; those pages are not part of this category.
- Snippet taken from https://docs.cloud.google.com/app-optimize/read-report (the overview page itself has no code).
- Source: https://docs.cloud.google.com/app-optimize/overview (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-reports.md](./about-reports.md)
- [create-report.md](./create-report.md)
- [read-report.md](./read-report.md)
