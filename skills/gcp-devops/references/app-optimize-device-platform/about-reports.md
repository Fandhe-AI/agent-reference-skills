---
source: https://docs.cloud.google.com/app-optimize/about-reports
---

# About App Optimize reports

A report is a persistent `Report` resource that defines the scope, dimensions, metrics and filter of the cost and utilization data to analyze. The project that stores the report does not need to be the data source: a report can analyze another project or an App Hub application. The API generates the data asynchronously; the report is then read by its resource name. Status: Preview.

## Signature / Usage

### Scope by project or application

Exactly one scope element is allowed.

```text
"scopes": [
  {
    "project": "projects/my-project-1"
  }
]
```

```text
"scopes": [
  {
    "application": "projects/my-host-proj/locations/us-central1/applications/my-app"
  }
]
```

Application resource name pattern: `projects/PROJECT_ID/locations/LOCATION/applications/APPLICATION_ID` (`PROJECT_ID` is the App Hub host project, `LOCATION` the application region such as `us-central1`).

### Example CEL filters

```text
resource_type == 'compute.googleapis.com/Instance'
```

```text
location == 'us-east1' || location == 'us-west1'
```

```text
hour >= timestamp('2024-01-01T00:00:00Z') && hour < timestamp('2024-02-01T00:00:00Z')
```

```text
day >= timestamp('2024-03-15T00:00:00-07:00') && day < timestamp('2024-03-17T00:00:00-07:00')
```

```text
hour >= now() - duration('168h')
```

```text
resource_type == 'compute.googleapis.com/Instance' && project == 'projects/my-project' && day >= timestamp('2025-01-01T00:00:00-08:00') && day < timestamp('2025-02-01T00:00:00-08:00')
```

### Response structure for `dimensions: ["application", "product_display_name"]` and `metrics: ["cost", "cpu_mean_utilization"]`

```text
"columns": [
  {
    "name": "application",
    "type": "STRING",
    "mode": "NULLABLE"
  },
  {
    "name": "product_display_name",
    "type": "STRING",
    "mode": "NULLABLE"
  },
  {
    "name": "cost",
    "type": "RECORD",
    "mode": "NULLABLE",
    "columns": [
      {
        "name": "currency_code",
        "type": "STRING",
        "mode": "NULLABLE"
      },
      {
        "name": "units",
        "type": "INT64",
        "mode": "NULLABLE"
      },
      {
        "name": "nanos",
        "type": "INT64",
        "mode": "NULLABLE"
      }
    ]
  },
  {
    "name": "cpu_mean_utilization",
    "type": "FLOAT64",
    "mode": "NULLABLE"
  }
]
```

```text
"rows": [
  [
    "//apphub.googleapis.com/projects/my-proj/locations/us-central1/applications/my-app",
    "Compute Engine",
    {
      "currency_code": "USD",
      "units": "12",
      "nanos": 750000000
    },
    0.65
  ],
  [
    "//apphub.googleapis.com/projects/my-proj/locations/us-east1/applications/another-app",
    "Cloud Storage",
    {
      "currency_code": "USD",
      "units": "5",
      "nanos": 200000000
    },
    0.15
  ]
]
```

## Options / Props

### `Report` parameters

| Parameter | Type | Description |
|---|---|---|
| `scopes` | Array | The project or App Hub application to analyze. Exactly one scope element. |
| `dimensions` | Array | Attributes to retrieve and group by, including time-based groupings. |
| `metrics` | Array | The measurements to return. |
| `filter` | String | A CEL expression to narrow the data, including time ranges. |

### Dimensions

| Dimension | Type | Description | Example value |
|---|---|---|---|
| `project` | STRING | The Google Cloud project ID. | `projects/my-project` |
| `application` | STRING | The App Hub application. | `projects/my-project/locations/us-central1/applications/my-app` |
| `service_or_workload` | STRING | The App Hub service or workload. | `projects/my-project/locations/us-central1/applications/my-app/services/my-service` |
| `resource` | STRING | The full resource name. | `//compute.googleapis.com/projects/my-project/zones/us-central1-a/instances/vm-1` |
| `resource_type` | STRING | The API resource type. | `compute.googleapis.com/Instance` |
| `location` | STRING | The Google Cloud region or multi-region. | `us-east1` |
| `sku` | STRING | The billing SKU ID. | `4496-8C0D-228F` |
| `product_display_name` | STRING | The Google Cloud product name. | `Compute Engine` |
| `month` | STRING | The year and month. | `2024-01` |
| `day` | STRING | The year, month, and day. | `2024-01-10` |
| `hour` | STRING | The year, month, day, and hour. | `2024-01-10T00` |

### Cost metrics

| Cost metric | Type | Description |
|---|---|---|
| `cost` | RECORD | The monetary cost in the requested currency. |
| `network_cost` | RECORD | Total networking cost, including data transfer and data processing. |
| `network_cost_standard_internet` | RECORD | Total cost for Standard Tier data transfer. |
| `network_cost_premium_internet` | RECORD | Total cost for Premium Tier data transfer. |
| `network_cost_inter_region` | RECORD | Total cost for inter-region data transfer. |
| `network_cost_inter_zone` | RECORD | Total cost for inter-zone data transfer. |
| `network_cost_load_balancing_inbound` | RECORD | Total cost for inbound data processing by Cloud Load Balancing. |
| `network_cost_load_balancing_outbound` | RECORD | Total cost of outbound data processing by Cloud Load Balancing. |
| `network_cost_interconnect_inbound` | RECORD | Total cost of inbound data transfer through Cloud Interconnect. |
| `network_cost_interconnect_outbound` | RECORD | Total cost of outbound data transfer through Cloud Interconnect. |
| `resource_cost` | RECORD | Total resource cost. |

### Utilization metrics

| Utilization metric | Type | Description |
|---|---|---|
| `cpu_mean_utilization` | FLOAT64 | Average CPU utilization (0.0 to 1.0). |
| `cpu_p95_utilization` | FLOAT64 | 95th percentile CPU utilization (0.0 to 1.0). |
| `cpu_usage_core_seconds` | INT64 | Total CPU work performed. |
| `cpu_allocation_core_seconds` | INT64 | Total CPU capacity provisioned. |
| `memory_mean_utilization` | FLOAT64 | Average memory utilization (0.0 to 1.0). |
| `memory_p95_utilization` | FLOAT64 | 95th percentile memory utilization (0.0 to 1.0). |
| `memory_usage_byte_seconds` | INT64 | Total memory used over time. |
| `memory_allocation_byte_seconds` | INT64 | Total memory provisioned over time. |

### Valid dimension and metric combinations (examples)

The API returns an error for an invalid combination; refer to that error for valid combinations.

| Dimensions | Supports `cost` | Supports `cpu_mean_utilization` |
|---|---|---|
| `application`, `product_display_name` | Yes | Yes |
| `application` | Yes | Yes |
| `location`, `product_display_name`, `project`, `resource`, `resource_type`, `sku` | Yes |   |
| `location`, `product_display_name`, `project`, `resource`, `resource_type` | Yes | Yes |
| `location`, `product_display_name`, `project`, `service_or_workload` | Yes | Yes |
| `location`, `product_display_name`, `project`, `sku` | Yes |   |
| `product_display_name`, `project` | Yes | Yes |
| `product_display_name`, `resource_type` | Yes | Yes |
| `product_display_name`, `resource` | Yes | Yes |
| `product_display_name` | Yes | Yes |
| `project` | Yes | Yes |

### Filter constraints

| Rule | Description |
|---|---|
| String predicates | Exact string matches only, such as `location == 'us-east1'`. |
| Same string field | Multiple predicates on the same string field are joined with `\|\|`. |
| Other predicates | Joined with `&&`. |
| Time start | A predicate on a time dimension (`day` etc.) giving the start time uses `>=`. |
| Time end | A predicate on a time dimension giving the end time uses `<`. |

### Time range and expiry limits

| Item | Value |
|---|---|
| Default range (no `month` / `day` / `hour` in `filter`) | Seven days ending at the previous Pacific Time midnight, respecting DST. |
| Maximum date range | 90 days before the current date; the start time must be within the 90-day window. |
| Cloud Run metrics | Available only for six weeks before the current date. |
| Report expiry | A report is deleted 24 hours after creation; `expireTime` in the report metadata shows the scheduled time. |

### Cost `RECORD` fields (`google.type.Money`)

| Field | Type | Description |
|---|---|---|
| `currency_code` | STRING | Three-letter ISO 4217 currency code, such as "USD". |
| `units` | INT64 | The whole units of the amount. |
| `nanos` | INT64 | The nano (10^-9^) units of the amount; between -999,999,999 and +999,999,999 inclusive. |

## Notes

- Status: Preview. In the combinations table the source leaves the `cpu_mean_utilization` cell empty for the two `sku` rows (shown empty above).
- Time dimensions: all use Pacific Time, respect DST, and follow ISO 8601. If the filter time range does not align with the selected time dimension granularity, the range expands to full periods (for example, a partial day with `dimension: ["month"]` includes the whole month). Include at least one time dimension to aggregate by time.
- `location` attribution: resources in a zone (for example `us-central1-a`) are attributed to the parent region; regional resources show that region; multi-region resources show the multi-region (such as `us`).
- Day and month boundaries in filters are interpreted in Pacific Time, so specifying the offset is best practice. Filtering for the previous calendar month requires computing the start and end timestamps (for example `2025-12-01T00:00:00-08:00` and `2026-01-01T00:00:00-08:00`) in application code, accounting for DST.
- Reading `cost`: combine `units` and `nanos`; for example USD `units` 106 and `nanos` 321590000 is 106.32159 USD. Use a currency formatting library to display it. The `rows` arrays follow the order of the `columns` array.
- The source also shows further filter examples (single location, last 72 hours with `duration('72h')`, calendar-month ranges, combined location and time filters) and an index-to-column mapping table for a row.
- Related pages not in this category: create, list, get metadata, read and delete report pages on docs.cloud.google.com/app-optimize/.
- Source: https://docs.cloud.google.com/app-optimize/about-reports (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [app-optimize-overview.md](./app-optimize-overview.md)
- [create-report.md](./create-report.md)
- [read-report.md](./read-report.md)
