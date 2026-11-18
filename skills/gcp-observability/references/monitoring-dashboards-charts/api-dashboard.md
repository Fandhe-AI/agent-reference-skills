---
source: https://docs.cloud.google.com/monitoring/dashboards/api-dashboard
---

# Create and manage dashboards by API (create, list, get, update, delete)

The `Dashboard` resource of the Cloud Monitoring API (v1) lets you create and manage custom dashboards at scale with gcloud, Terraform, or REST calls to `create`, `list`, `get`, `patch`, and `delete`. Predefined dashboards cannot be retrieved, edited, or deleted by the API. Layouts and widgets are in api-dashboard-layouts-widgets.md; filters and variables are in api-dashboard-filters-variables.md.

## Signature / Usage

The REST examples expect `ACCESS_TOKEN` (an OAuth access token) and `PROJECT_ID` (and `DASHBOARD_ID`) to be set as environment variables.

### Create

The optional `name` field has the form below. If omitted, the API generates `DASHBOARD_ID`.

```text
"name": "projects/PROJECT_ID_OR_NUMBER/dashboards/DASHBOARD_ID"
```

```bash
gcloud monitoring dashboards create --config-from-file=my-dashboard.json --project=PROJECT_ID
```

Adapted (not in the official docs): the URL is quoted so the shell does not expand it.

```bash
curl -d @my-dashboard.json -H "Authorization: Bearer $ACCESS_TOKEN" -H 'Content-Type: application/json' -X POST "https://monitoring.googleapis.com/v1/projects/${PROJECT_ID}/dashboards"
```

To duplicate a dashboard: get it, remove the `etag` and `name` fields from the returned JSON, change `displayName`, then run create.

### List and paginate

```bash
gcloud monitoring dashboards list --project=PROJECT_ID
```

```bash
gcloud monitoring dashboards list --page-size=1 --project=PROJECT_ID
```

Adapted (not in the official docs): the URL is quoted because it contains `?`, and the query parameter is `pageSize` as in the Discovery document (the source wrote `page_size`).

```bash
curl -H "Authorization: Bearer $ACCESS_TOKEN" "https://monitoring.googleapis.com/v1/projects/${PROJECT_ID}/dashboards?pageSize=1"
```

### Get

```bash
gcloud monitoring dashboards describe DASHBOARD_ID --format=json --project=PROJECT_ID
```

The command returns the requested dashboard:

```json
{
  "columnLayout": {
    "columns": [
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
  },
  "displayName": "Column-layout example",
  "etag": "cb3070baf15de7c79d78761baac3a386",
  "name": "projects/730041941835/dashboards/e4cd063e-5414-4e07-9e1e-450d6d3a531d"
}
```

Adapted (not in the official docs): the URL is quoted.

```bash
curl -H "Authorization: Bearer $ACCESS_TOKEN" "https://monitoring.googleapis.com/v1/projects/${PROJECT_ID}/dashboards/${DASHBOARD_ID}"
```

### Update

Get the current `etag` with `dashboards.get`, put it in the revised `Dashboard` object, then patch. The response includes a new `etag`.

```bash
gcloud monitoring dashboards update DASHBOARD_ID --config-from-file=my-updated-dashboard.json --project=PROJECT_ID
```

Adapted (not in the official docs): the URL is quoted.

```bash
curl -d @my-updated-dashboard.json -H "Authorization: Bearer $ACCESS_TOKEN" -H 'Content-Type: application/json' -X PATCH "https://monitoring.googleapis.com/v1/projects/${PROJECT_ID}/dashboards/${DASHBOARD_ID}"
```

### Delete

```bash
gcloud monitoring dashboards delete DASHBOARD_ID --project=PROJECT_ID
```

Adapted (not in the official docs): the URL is quoted.

```bash
curl -H "Authorization: Bearer $ACCESS_TOKEN" -X DELETE "https://monitoring.googleapis.com/v1/projects/${PROJECT_ID}/dashboards/${DASHBOARD_ID}"
```

## Options / Props

| Method | HTTP | gcloud |
|--------|------|--------|
| `dashboards.create` | `POST /v1/projects/PROJECT_ID/dashboards` | `gcloud monitoring dashboards create` |
| `dashboards.list` | `GET /v1/projects/PROJECT_ID/dashboards` | `gcloud monitoring dashboards list` |
| `dashboards.get` | `GET /v1/projects/PROJECT_ID/dashboards/DASHBOARD_ID` | `gcloud monitoring dashboards describe` |
| `dashboards.patch` | `PATCH /v1/projects/PROJECT_ID/dashboards/DASHBOARD_ID` | `gcloud monitoring dashboards update` |
| `dashboards.delete` | `DELETE /v1/projects/PROJECT_ID/dashboards/DASHBOARD_ID` | `gcloud monitoring dashboards delete` |

### List response (`ListDashboardsResponse`)

| Field | Description |
|-------|-------------|
| `dashboards` | The list of requested dashboards |
| `nextPageToken` | Set when more results exist; include it in the request for each remaining page |

## Notes

- `name` must be globally unique. If you set it in a file used for repeated creates, use a unique `DASHBOARD_ID` per run; creating a dashboard whose ID is already in use in the project returns an error. `displayName` need not be unique.
- Deleting removes the dashboard definition and its widgets; alerting policies shown on its charts are not deleted. Try it on a disposable project first.
- `${DASHBOARD_ID}` is described in the source both as "the ID of the dashboard" and as "the fully qualified name of the dashboard"; the gcloud commands take the dashboard ID.
- The source's REST samples reference `$ACCESS_TOKEN` without defining it; the token goes into the shell history and process list if typed inline, so keep it in an environment variable.
- Corrected from the official docs: the list-with-pagination curl used `?page_size=1`; the Discovery document names the parameter `pageSize`.
- Terraform: `google_monitoring_dashboard` with `dashboard_json` and `parent`; Terraform cannot list or get dashboards. Do not edit Terraform-created dashboards in the console (they are rescaled). The source also shows Console and Terraform forms, which are omitted here.
- For App Hub configurations, use the App Hub host project or management project as `PROJECT_ID`.
- Source: https://docs.cloud.google.com/monitoring/dashboards/api-dashboard (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [api-dashboard-layouts-widgets.md](./api-dashboard-layouts-widgets.md)
- [api-dashboard-filters-variables.md](./api-dashboard-filters-variables.md)
- [api-dashboard-variable-queries.md](./api-dashboard-variable-queries.md)
- [dashboards.md](./dashboards.md)
