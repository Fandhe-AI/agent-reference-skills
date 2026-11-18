---
source: https://docs.cloud.google.com/stackdriver/docs/solutions/slo-monitoring/api/api-structures
---

# SLO API Structures (Service, SLI, SLO)

Service Monitoring adds two resources to the Cloud Monitoring API: `services` and `services.serviceLevelObjectives`. A `Service` has a name, a display name, a service-type structure and a system-provided `telemetry` object; a `ServiceLevelObjective` combines a `serviceLevelIndicator`, a `goal` and a compliance period. This page shows the JSON shapes (field names follow the monitoring v3 API).

## Signature / Usage

### Basic service skeleton

```text
{
   "serviceType": string,
   "serviceLabels": {
      string: string,
      ...
   }
}
```

### Basic service examples (App Engine, Cloud Run, GKE workload, custom)

App Engine:

Adapted (not in the official docs): removed the trailing commas after `serviceLabels` and `basicService` so the JSON is valid.

```json
{
  "displayName": "DISPLAY_NAME",
  "basicService": {
    "serviceType": "APP_ENGINE",
    "serviceLabels": {
      "module_id": "MODULE_ID"
    }
  }
}
```

Cloud Run:

Adapted (not in the official docs): removed the trailing commas after `serviceLabels` and `basicService` so the JSON is valid.

```json
{
  "displayName": "DISPLAY_NAME",
  "basicService": {
    "serviceType": "CLOUD_RUN",
    "serviceLabels": {
      "service_name": "SERVICE_NAME",
      "location": "LOCATION"
    }
  }
}
```

GKE workload (no `BasicSli`; you must define SLIs):

Adapted (not in the official docs): removed the trailing commas after the last label and after `basicService` so the JSON is valid.

```json
{
  "displayName": "DISPLAY_NAME",
  "basicService": {
    "serviceType": "GKE_WORKLOAD",
    "serviceLabels": {
      "project_id": "PROJECT_ID",
      "location": "LOCATION",
      "cluster_name": "CLUSTER_NAME",
      "namespace_name": "NAMESPACE_NAME",
      "top_level_controller_type": "TOPLEVEL_CONTROLLER_TYPE",
      "top_level_controller_name": "TOPLEVEL_CONTROLLER_NAME"
    }
  }
}
```

Custom service (you must define SLIs):

```json
{
  "displayName": "DISPLAY_NAME",
  "custom": {}
}
```

### Basic availability SLI

```json
{
  "basicSli": {
    "availability": {},
    "location": [
      "us-central1-c"
    ]
  }
}
```

### Request-based SLI: time-series ratio

Adapted (not in the official docs): escaped the inner double quotes in the filter strings and removed the trailing comma so the JSON is valid.

```json
{
  "requestBased": {
    "goodTotalRatio": {
      "totalServiceFilter": "resource.type=https_lb_rule metric.type=\"loadbalancing.googleapis.com/https/request_count\"",
      "goodServiceFilter": "resource.type=https_lb_rule metric.type=\"loadbalancing.googleapis.com/https/request_count\" metric.label.response_code_class=200"
    }
  }
}
```

### Request-based SLI: distribution cut

Adapted (not in the official docs): used the API field names `distributionCut` / `distributionFilter` (the source wrote `distribution_cut` / `distribution_filter`) and escaped the inner double quotes so the JSON is valid.

```json
{
  "requestBased": {
    "distributionCut": {
      "distributionFilter": "resource.type=https_lb_rule  metric.type=\"loadbalancing.googleapis.com/https/backend_latencies\" metric.label.response_code_class=200",
      "range": {
        "min": "-Infinity",
        "max": 500.0
      }
    }
  }
}
```

### Windows-based SLI: performance threshold on a basic SLI

```json
{
  "windowsBased": {
     "goodTotalRatioThreshold": {
       "threshold": 0.9,
       "basicSliPerformance": {
         "availability": {},
         "location": [
           "us-central1-c"
         ]
       }
     },
     "windowPeriod": "300s"
   }
}
```

### SLO with a basic availability SLI

```json
{
   "name": "projects/PROJECT_NUMBER/services/PROJECT_ID-zone-us-central1-c-csm-main-default-currencyservice/serviceLevelObjectives/3kavNVTtTMuzL7KcXAxqCQ",
   "serviceLevelIndicator": {
     "basicSli": {
       "availability": {},
       "location": [
         "us-central1-c"
       ]
     }
   },
   "goal": 0.98,
   "calendarPeriod": "WEEK",
   "displayName": "98% Availability in Calendar Week"
}
```

## Options / Props

### Basic service types and `serviceLabels`

| `serviceType` | `serviceLabels` keys | SLI |
|---------------|----------------------|-----|
| `APP_ENGINE` | `module_id` | `BasicSli` |
| `CLOUD_ENDPOINTS` | `service` | `BasicSli` |
| `CLUSTER_ISTIO` | `location`, `cluster_name`, `service_namespace`, `service_name` | `BasicSli` |
| `ISTIO_CANONICAL_SERVICE` | `mesh_uid`, `canonical_service_namespace`, `canonical_service` | `BasicSli` |
| `CLOUD_RUN` | `service_name`, `location` | `BasicSli` |
| `GKE_NAMESPACE` | `project_id`, `location`, `cluster_name`, `namespace_name` | You must define SLIs |
| `GKE_WORKLOAD` | `project_id`, `location`, `cluster_name`, `namespace_name`, `top_level_controller_type`, `top_level_controller_name` | You must define SLIs |
| `GKE_SERVICE` | `project_id`, `location`, `cluster_name`, `namespace_name`, `service_name` | You must define SLIs |
| custom (`"custom": {}`) | none | You must define SLIs |

### `ServiceLevelIndicator` kinds

| Field | Object | Use |
|-------|--------|-----|
| `basicSli` | `BasicSli` | Created automatically for `BasicService` types; measures availability or latency |
| `requestBased` | `RequestBasedSli` | Counts events representing acceptable service |
| `windowsBased` | `WindowsBasedSli` | Counts time windows meeting a goodness criterion |

### Request-based SLI forms

| Field | Object | Requirement |
|-------|--------|-------------|
| `goodTotalRatio` | `TimeSeriesRatio` | Ratio computed from two time series with metric kind `DELTA` or `CUMULATIVE` |
| `distributionCut` | `DistributionCut` | Time series with value type `DISTRIBUTION` and metric kind `DELTA` or `CUMULATIVE`; good = count in the `range` buckets, total = count of all values |

### Windows-based SLI good-service criteria

| Field | Meaning |
|-------|---------|
| `goodBadMetricFilter` | Monitoring filter returning a boolean time series; window is good if the value is `true` |
| `goodTotalRatioThreshold` | `PerformanceThreshold`: a `threshold` plus the performance SLI as `basicSliPerformance` (`BasicSli`) or `performance` (`RequestBasedSli`); window is good if performance meets or exceeds the threshold |
| `windowPeriod` | Window length, 60 to 86,400 seconds (1 day); the monitoring v3 Discovery document adds that it "Must be an integer fraction of a day and at least 60s" |

### `ServiceLevelObjective` fields

| Field | Meaning |
|-------|---------|
| `name` | Resource name |
| `displayName` | Name for UI elements |
| `serviceLevelIndicator` | The target SLI |
| `goal` | Performance goal (for example `0.98`) |
| `rollingPeriod` or `calendarPeriod` | Compliance period (union field) |

## Notes

- Corrected from the official docs: the source wrote `basicPerformanceSli` in prose for the `PerformanceThreshold` field; the field is `basicSliPerformance` (as the source's own JSON example and the monitoring v3 Discovery document show). The source also showed trailing commas, unescaped inner quotes in filter strings and `distribution_cut` / `distribution_filter`; fixed as marked above.
- Windows-based SLIs with an embedded request-based SLI (`performance`) require metric kind `DELTA` or `CUMULATIVE`; `GAUGE` metrics can't be used in request-based SLIs.
- The distribution-cut example computes the ratio of latencies of 200-class responses below 500 to all 200-class responses (resource `https_lb_rule`, metric `loadbalancing.googleapis.com/https/backend_latencies`, label `response_code_class` = `200`). The ratio example uses `loadbalancing.googleapis.com/https/request_count`.
- The source shows the same structure for Cloud Endpoints, Cluster Istio, Istio Canonical Service, GKE namespace and GKE service; they are summarized in the table instead.
- Source: https://docs.cloud.google.com/stackdriver/docs/solutions/slo-monitoring/api/api-structures (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [using-api.md](./using-api.md)
- [define-svc.md](./define-svc.md)
- [slo-monitoring.md](./slo-monitoring.md)
- [timeseries-selectors.md](./timeseries-selectors.md)
