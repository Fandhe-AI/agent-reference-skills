# Analytics Report Requests

Request ongoing or one-time-snapshot App Analytics reports for an app, then read, list, or delete the requests.

## Signature / Usage

```
POST /v1/analyticsReportRequests
GET /v1/apps/{id}/analyticsReportRequests
GET /v1/analyticsReportRequests/{id}
DELETE /v1/analyticsReportRequests/{id}
```

## Options / Props

### Request Reports

`POST /v1/analyticsReportRequests`

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `data.attributes.accessType` | Yes | string | `ONGOING` (generates daily/weekly/monthly reports going forward) or `ONE_TIME_SNAPSHOT` (retrieves historical data) |
| `data.relationships.app` | Yes | object | `{ "data": { "type": "apps", "id": "<app id>" } }` |

```json
POST /v1/analyticsReportRequests
{
  "data": {
    "type": "analyticsReportRequests",
    "attributes": { "accessType": "ONGOING" },
    "relationships": {
      "app": { "data": { "type": "apps", "id": "1476097583" } }
    }
  }
}
```

### Read Report Requests for an App

`GET /v1/apps/{id}/analyticsReportRequests`

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `id` | Yes | string | The app's resource ID |
| `fields[analyticsReportRequests]` | No | [string] | `accessType`, `stoppedDueToInactivity`, `reports` |
| `fields[analyticsReports]` | No | [string] | `name`, `category`, `instances` |
| `filter[accessType]` | No | [string] | `ONE_TIME_SNAPSHOT`, `ONGOING` |
| `include` | No | [string] | `reports` |
| `limit` | No | integer | Max results (max 200) |
| `limit[reports]` | No | integer | Max related reports to return (max 50) |

### Read Report Request Information

`GET /v1/analyticsReportRequests/{id}`

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `id` | Yes | string | The analytics report request's resource ID |

### Delete a Report Request

`DELETE /v1/analyticsReportRequests/{id}`

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `id` | Yes | string | The analytics report request's resource ID |

### `AnalyticsReportRequest` Attributes

| Field | Type | Description |
|-------|------|-------------|
| `accessType` | string | Echo of the requested `accessType` |
| `stoppedDueToInactivity` | boolean | Whether Apple stopped generating reports because the app had no recent activity |

## Notes

- `POST` returns `201 Created`; other possible responses are `400`, `401`, `403`, `409`, `422`, `429` (see [Error Handling](../asc-api-core/error-handling.md)).
- `ONGOING` provides current data, generating reports daily, weekly, and monthly; `ONE_TIME_SNAPSHOT` provides up-to-the-moment historical data and generates no new data after the request day.
- The first report request generates in 1–2 days; subsequent `ONGOING` reports are available daily.
- If you don't retrieve data for a long time, a request's `stoppedDueToInactivity` becomes `true` — make a new request to resume getting reports.
- Role requirements: **Admin** can call the `POST`/`DELETE` request-management endpoints and the `GET` reports endpoints; **Sales and Reports** and **Finance** roles can only call the `GET` reports endpoints.

## Related

- [Analytics Reports, Instances and Segments](./analytics-reports-instances-segments.md)
- [Error Handling](../asc-api-core/error-handling.md)
