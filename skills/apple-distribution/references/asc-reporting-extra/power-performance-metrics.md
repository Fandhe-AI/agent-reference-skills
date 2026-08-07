# Power and Performance Metrics

Retrieve power and performance measurements (launch time, hangs, memory, battery, disk, animation, termination, storage) for an app's most recent version or for a specific build.

## Signature / Usage

```
GET /v1/apps/{id}/perfPowerMetrics
GET /v1/builds/{id}/perfPowerMetrics
```

## Options / Props

### Get power and performance metrics for an app

`GET /v1/apps/{id}/perfPowerMetrics`

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `id` | Yes | string | The app's resource ID (from `GET /v1/apps`) |
| `filter[deviceType]` | No | [string] | `all_iphones`, `all_ipads` |
| `filter[metricType]` | No | [string] | `DISK`, `HANG`, `BATTERY`, `LAUNCH`, `MEMORY`, `ANIMATION`, `TERMINATION`, `STORAGE` |
| `filter[platform]` | No | [string] | `IOS` |

### Get power and performance metrics for a build

`GET /v1/builds/{id}/perfPowerMetrics`

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `id` | Yes | string | The build's resource ID (from `GET /v1/builds`) |
| `filter[deviceType]` | No | [string] | `all_iphones`, `all_ipads` |
| `filter[metricType]` | No | [string] | `DISK`, `HANG`, `BATTERY`, `LAUNCH`, `MEMORY`, `ANIMATION`, `TERMINATION`, `STORAGE` |
| `filter[platform]` | No | [string] | `IOS` |

### `xcodeMetrics` Response

| Field | Type | Description |
|-------|------|-------------|
| `version` | string | Version of the response format |
| `insights` | object | `regressions` and `trendingUp` analysis across versions |
| `productData` | [object] | Per-platform `metricCategories`, each with `metrics` → `datasets` (filtered by percentile/device) → `points` (version, value, goal) |

## Notes

- Both endpoints return `200 OK` with MIME type `application/vnd.apple.xcode-metrics+json`.
- The app-level endpoint returns metrics for the **most recent app version only**; use the build-level endpoint to inspect a specific build.
- Allow a few days after releasing your app for Apple to collect and organize logs into reports — the API requires significant app usage before metrics become available, and each metric has a different usage threshold.

## Related

- [Diagnostic Signatures and Logs](./diagnostic-signatures-logs.md)
