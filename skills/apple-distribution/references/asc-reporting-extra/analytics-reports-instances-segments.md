# Analytics Reports, Instances, and Segments

Drill down from a report request into its reports (by category/name), each report's time-bounded instances (by granularity), and each instance's downloadable CSV segments.

## Signature / Usage

```
GET /v1/analyticsReportRequests/{id}/reports
GET /v1/analyticsReports/{id}
GET /v1/analyticsReports/{id}/instances
GET /v1/analyticsReportInstances/{id}
GET /v1/analyticsReportInstances/{id}/segments
GET /v1/analyticsReportSegments/{id}
```

## Options / Props

### Read Reports for a Specific Request

`GET /v1/analyticsReportRequests/{id}/reports`

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `id` | Yes | string | The analytics report request's resource ID |
| `filter[category]` | No | [string] | `APP_USAGE`, `APP_STORE_ENGAGEMENT`, `COMMERCE`, `FRAMEWORK_USAGE`, `PERFORMANCE` |
| `filter[name]` | No | [string] | Report name(s), e.g. `"Streaming Playback Performance"` |
| `fields[analyticsReports]` | No | [string] | `name`, `category`, `instances` |
| `limit` | No | integer | Max results (max 200) |

### Read a List of Instances of a Report

`GET /v1/analyticsReports/{id}/instances`

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `id` | Yes | string | The analytics report's resource ID |
| `filter[granularity]` | No | [string] | `DAILY`, `WEEKLY`, `MONTHLY` |
| `filter[processingDate]` | No | string | ISO 8601 `YYYY-MM-DD` |
| `fields[analyticsReportInstances]` | No | [string] | `granularity`, `processingDate`, `segments` |
| `limit` | No | integer | Max results (max 200) |

### Read the Segments for a Report Instance

`GET /v1/analyticsReportInstances/{id}/segments`

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `id` | Yes | string | The analytics report instance's resource ID |
| `fields[analyticsReportSegments]` | No | [string] | `checksum`, `sizeInBytes`, `url` |
| `limit` | No | integer | Max results (max 200) |

### `AnalyticsReport` Attributes

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Report name (e.g. `"Streaming Playback Performance"`) |
| `category` | string | `APP_USAGE`, `APP_STORE_ENGAGEMENT`, `COMMERCE`, `FRAMEWORK_USAGE`, `PERFORMANCE` |

### `AnalyticsReportInstance` Attributes

| Field | Type | Description |
|-------|------|-------------|
| `granularity` | string | `DAILY`, `WEEKLY`, `MONTHLY` |
| `processingDate` | string | ISO 8601 `YYYY-MM-DD` |

### `AnalyticsReportSegment` Attributes

| Field | Type | Description |
|-------|------|-------------|
| `checksum` | string | Checksum of the segment, used with `sizeInBytes` to verify a successful download |
| `sizeInBytes` | integer | Segment file size in bytes |
| `url` | string | Download URL for the segment's CSV data |

### Report Categories

| Category | Description |
|----------|-------------|
| `APP_STORE_ENGAGEMENT` | How people find, discover, and share your app on the App Store |
| `COMMERCE` | Downloads, pre-orders, and purchases, for analyzing revenue and sales |
| `APP_USAGE` | How people interact with your apps, including app sessions, installations, and crashes |
| `FRAMEWORK_USAGE` | How people interact with your app and how your app uses APIs |
| `PERFORMANCE` | How your app performs and how users interact with specific features |

## Notes

- Download URLs are valid for **5 minutes** after generating — download reports immediately after calling the segments endpoint.
- Some reports have Standard or Detailed content levels, reflected as a suffix on the report `name`; Detailed reports include all fields plus additional privacy measures.
- Drill-down order is: request → reports (filter by `category`/`name`) → instances (filter by `granularity`/`processingDate`) → segments (download `url`).

## Related

- [Analytics Report Requests](./analytics-report-requests.md)
