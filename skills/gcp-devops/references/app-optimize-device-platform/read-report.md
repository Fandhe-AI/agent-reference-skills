---
source: https://docs.cloud.google.com/app-optimize/read-report
---

# Read App Optimize report data

After a report is created, reading it downloads its cost and utilization data as columns and rows structured by the dimensions and metrics requested. This differs from getting a report's metadata, which returns only its configuration. Status: Preview.

## Signature / Usage

### gcloud

Handles pagination automatically and returns all rows.

```bash
gcloud beta app-optimize reports read REPORT_ID \
  --project=PROJECT_ID \
  --location=global
```

### REST: first page

```bash
curl -X POST -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: application/json" \
  -d '{"pageSize": PAGE_SIZE}' \
  "https://appoptimize.googleapis.com/v1beta/projects/PROJECT_ID/locations/global/reports/REPORT_ID:read"
```

Example response:

```json
{
  "rows": [
    [
      "//apphub.googleapis.com/projects/123456789/locations/us-central1/applications/my-app-1",
      {
        "currency_code": "USD",
        "units": "106",
        "nanos": 321590000
      }
    ],
    [
      "//apphub.googleapis.com/projects/123456789/locations/us-central1/applications/my-app-2",
      {
        "currency_code": "USD",
        "units": "797",
        "nanos": 641691000
      }
    ]
  ],
  "columns": [
    {
      "name": "application",
      "type": "STRING"
    },
    {
      "name": "cost",
      "type": "RECORD",
      "columns": [
        {
          "name": "currency_code",
          "type": "STRING"
        },
        {
          "name": "units",
          "type": "INT64"
        },
        {
          "name": "nanos",
          "type": "INT64"
        }
      ]
    }
  ],
  "nextPageToken": "AABBCCddeeffGGHHiiJJkkLL"
}
```

### REST: next page

Repeat until the response has no `nextPageToken`.

```bash
curl -X POST -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: application/json" \
  -d '{"pageToken": "NEXT_PAGE_TOKEN", "pageSize": PAGE_SIZE}' \
  "https://appoptimize.googleapis.com/v1beta/projects/PROJECT_ID/locations/global/reports/REPORT_ID:read"
```

## Options / Props

### Required role

| Role | Role ID | Scope |
|---|---|---|
| App Optimize Viewer | `roles/appoptimize.viewer` | On the project that owns the report resource. |

### Placeholders and limits

| Name | Description |
|---|---|
| `PROJECT_ID` | ID of the project that owns the report resource. |
| `REPORT_ID` | ID given at creation; list reports to find it. |
| `PAGE_SIZE` | Maximum rows per page. The server returns at most 1,000 rows per page even if a larger value is requested. Responses are also limited to 10 MB, so fewer rows may be returned. If `pageSize` is omitted, a default size is used. It can change between page requests; the server-side limits still apply. |
| `NEXT_PAGE_TOKEN` | The `nextPageToken` from the previous response, sent as `pageToken`. |

## Notes

- Status: Preview. The REST call is an HTTP `POST` to the `:read` custom method on the report.
- Interpret the `cost` record (`currency_code`, `units`, `nanos`) as described on the About reports page; the source also points to the overview page for data limitations.
- Reports are deleted 24 hours after creation, so read them within that window.
- The source also shows a Python client-library sample (`AppOptimizeClient.read_report()`); it is omitted because its code was replaced by documentation hyperlinks in the retrieved text and cannot be copied verbatim. The source also shows Cloud Shell and Application Default Credentials setup.
- Source: https://docs.cloud.google.com/app-optimize/read-report (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-report.md](./create-report.md)
- [about-reports.md](./about-reports.md)
- [app-optimize-overview.md](./app-optimize-overview.md)
