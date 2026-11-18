---
source: https://docs.cloud.google.com/stackdriver/docs/solutions/slo-monitoring/ui/create-slo
---

# Create an SLO (Google Cloud Console)

Every SLO is based on a performance metric, the SLI. The SLO-creation pane walks through four steps: set the SLI, define SLI details, set the SLO, then review and save. At the end it shows the SLO as JSON you can copy into `serviceLevelObjectives.create`.

## Signature / Usage

### Example SLO JSON (as produced by the console preview)

The page has no code block. The block below is a verbatim SLO skeleton-compatible example from the SLO API page, in the same shape as the console's JSON preview.

```json
{
  "serviceLevelIndicator": {
    "basicSli": {
      "availability": {},
      "location": [
        "us-central1-c"
      ]
    }
  },
  "goal": 0.95,
  "calendarPeriod": "WEEK",
  "displayName": "95% Availability in Calendar Week"
}
```

## Options / Props

### Prerequisite and limit

| Item | Value |
|------|-------|
| Role to view and create SLOs | Monitoring Editor (`roles/monitoring.editor`) on the project (custom or other predefined roles may also grant the permissions) |
| SLOs per service | Up to 500 |

### SLI metric choices

| Choice | Applies to |
|--------|------------|
| Availability | Services on Cloud Service Mesh, Istio on GKE, App Engine (known metrics) |
| Latency | Same services; you also set a latency threshold (anything above is "bad") |
| Other | The only choice for GKE-based services and custom services (Prometheus metrics are not included in default availability and latency SLOs); also available for the services above |

### Evaluation method

| Method | Measures | Extra details on the SLI details pane |
|--------|----------|---------------------------------------|
| Request-based | Requests meeting the criterion vs total requests in a period | None for availability |
| Windows-based | Evaluation periods meeting a goodness criterion vs total periods | Goodness criterion (percentage of windows that must be good) and duration (window length) |

### Custom SLI (Other) indicator types

| Type | Configuration |
|------|---------------|
| Distribution-cut indicator | A range (above, below, or between) and a filter for the monitored resource and labels (API: `DistributionCut`) |
| Time-series ratio indicator | Numerator and denominator filters, typically by label values (API: `TimeSeriesRatio`) |

### Compliance period

| Type | Behavior |
|------|----------|
| Calendar period | Fixed period; error budget resets when the period ends |
| Rolling window | Last n days, recomputed when a new day starts |

## Notes

- Managed Service for Prometheus metrics used as custom SLIs have names starting with `prometheus.googleapis.com/`. GKE control plane metrics (API server, scheduler) can be custom SLIs but you must enable their collection first; they are collected by Google Cloud Managed Service for Prometheus.
- If a service was just created there may be no data yet; you can still create the SLI/SLO but the preview chart has no history.
- The Review and save pane has a display name field (default derived from your choices) and a JSON preview that updates as you change values.
- After creating an SLO you can create alerting policies (see `alerting-on-budget-burn-rate.md`, `create-alert.md`) or show SLOs on a custom dashboard.
- Snippet taken from https://docs.cloud.google.com/stackdriver/docs/solutions/slo-monitoring/api/using-api
- Source: https://docs.cloud.google.com/stackdriver/docs/solutions/slo-monitoring/ui/create-slo (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [define-svc.md](./define-svc.md)
- [create-alert.md](./create-alert.md)
- [slo-monitoring.md](./slo-monitoring.md)
- [using-api.md](./using-api.md)
