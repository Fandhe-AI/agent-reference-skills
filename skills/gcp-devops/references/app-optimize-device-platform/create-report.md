---
source: https://docs.cloud.google.com/app-optimize/create-report
---

# Create an App Optimize report

Creating a report sends a request that defines scope, dimensions, metrics and filter; it starts a long-running operation (LRO) that generates the data, after which the report can be read. The example report breaks down the last week of cost and average CPU usage by resource, resource type, product and location. Status: Preview (the `gcloud beta` track and the `v1beta` API).

## Signature / Usage

### gcloud

The command waits for the operation to complete.

Adapted (not in the official docs): `location` and `product_display_name` are removed from `--dimensions`, because the gcloud 593.0.0 help does not list them as supported values.

```bash
gcloud beta app-optimize reports create REPORT_ID \
  --project=PROJECT_ID \
  --location=global \
  --dimensions=project,resource,resource_type \
  --metrics=cost,cpu_mean_utilization \
  --report-filter='hour >= now - duration("168h")' \
  --scopes=project=projects/PROJECT_ID
```

`REPORT_ID` is a unique ID such as `my-resource-cost-report-1`.

### REST: create

```bash
curl -X POST -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: application/json" \
  -d '{
    "scopes": [
      {
        "project": "projects/PROJECT_ID"
      }
    ],
    "dimensions": [
      "location",
      "product_display_name",
      "project",
      "resource",
      "resource_type"
    ],
    "metrics": [
      "cost",
      "cpu_mean_utilization"
    ],
    "filter": "hour >= now - duration(\"168h\")"
  }' \
  "https://appoptimize.googleapis.com/v1beta/projects/PROJECT_ID/locations/global/reports?report_id=REPORT_ID"
```

The response is an LRO; note its `name`:

```json
{
  "name": "projects/PROJECT_ID/locations/global/operations/OPERATION_ID",
  "metadata": {
    "@type": "type.googleapis.com/google.cloud.appoptimize.v1beta.OperationMetadata"
  },
  "done": false
}
```

### REST: poll the operation

Replace `PROJECT_ID` and `OPERATION_ID` with the values from the LRO response. If `done` is `false`, wait a short period (such as 5 to 15 seconds) and poll again.

```bash
curl -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://appoptimize.googleapis.com/v1beta/projects/PROJECT_ID/locations/global/operations/OPERATION_ID"
```

When finished (`"done": true`) the response carries the report resource:

```json
{
  "name": "projects/PROJECT_ID/locations/global/operations/OPERATION_ID",
  "metadata": {
    "@type": "type.googleapis.com/google.cloud.appoptimize.v1beta.OperationMetadata"
  },
  "done": true,
  "response": {
    "@type": "type.googleapis.com/google.cloud.appoptimize.v1beta.Report",
    "name": "projects/PROJECT_ID/locations/global/reports/REPORT_ID",
    "dimensions": [
      "location",
      "product_display_name",
      "project",
      "resource",
      "resource_type"
    ],
    "scopes": [
      {
        "project": "projects/PROJECT_ID"
      }
    ],
    "filter": "hour >= now - duration(\"168h\")",
    "expireTime": "2026-02-05T18:50:25.273833857Z",
    "metrics": [
      "cost",
      "cpu_mean_utilization"
    ]
  }
}
```

If the LRO fails, the response contains an `error` field instead of `response`, with details about the failure; treat that as a failed report, not a success.

## Options / Props

### Required roles

| Role | Role ID | Notes |
|---|---|---|
| App Optimize Admin | `roles/appoptimize.admin` | On the project with active resources. |
| Monitoring Viewer | `roles/monitoring.viewer` | On the project with active resources. |
| Cloud Hub Operator | `roles/cloudhub.operator` | Or another role granting `billing.resourceCosts.get`. |

### Concurrency limit

| Quota | Value |
|---|---|
| Concurrent CreateReport operations | Maximum 10 concurrent requests for report data per target project. |

## Notes

- Status: Preview. The examples need a project with active resources; reports run against new or empty projects are empty. The project that hosts the report can differ from the data source. A report on an App Hub application (single-project or folder-level boundaries) needs the monitoring and billing permissions on all of the application's associated projects. The App Optimize API must be enabled for the project that hosts the report.
- Corrected from the official docs: the source writes the role as `roles//cloudhub.operator` (double slash); the table above uses `roles/cloudhub.operator`.
- Source inconsistency: this page and the API responses shown in the App Optimize pages write the filter as `hour >= now - duration("168h")`, while the About reports page writes `now()` (`hour >= now() - duration('168h')`). The samples keep the form of this page; if the API rejects it, use the `now()` form from About reports. The source REST response block ended with a stray code fence, which is dropped.
- The `gcloud beta app-optimize reports create` help (gcloud 593.0.0) lists `--dimensions` values `application, day, hour, month, product, project, resource, resource_type, sku` (no `location` or `product_display_name`); the source sample and the About reports page use `location` and `product_display_name`. Corrected from the official docs: the gcloud example drops those two values (the REST examples keep them as the source writes them). The help also supports `--async`.
- Concurrency: the API reads cost data from Cloud Billing and utilization data from Cloud Monitoring for each target project. A project-scoped report has one target project; an App Hub application report has one per project that contains a service or workload of the application. Creating a report locks the required number of quota units until the LRO finishes. Reports that finish in under a few minutes might not count against the limit because of measurement timing. Manage limits on the Quotas and System Limits page for `appoptimize.googleapis.com`.
- Concurrency example in the source: a shared project used by 12 applications receives 12 requests when all reports run at once, which exceeds 10, so 2 data requests fail. Stagger report creation across teams, or run the standard applications first and then the premium ones.
- The source also shows a Python client-library sample (`AppOptimizeClient.create_report()`); it is omitted because its code was replaced by documentation hyperlinks in the retrieved text and cannot be copied verbatim. See the Python client library page for App Optimize API. The source also shows Cloud Shell and Application Default Credentials setup (`gcloud auth application-default login`) and an application-membership table.
- Source: https://docs.cloud.google.com/app-optimize/create-report (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-reports.md](./about-reports.md)
- [read-report.md](./read-report.md)
- [app-optimize-overview.md](./app-optimize-overview.md)
