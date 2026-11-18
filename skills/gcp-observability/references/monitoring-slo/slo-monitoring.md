---
source: https://docs.cloud.google.com/stackdriver/docs/solutions/slo-monitoring
---

# Concepts in Service Monitoring (SLIs, SLOs, Error Budgets)

Service monitoring and the SLO API let you manage services the way Google manages its own: select metrics as service-level indicators (SLIs), set service-level objectives (SLOs) on the SLI values, and use the error budget implied by the SLO to mitigate risk. This page defines the terms, compliance periods, request-based vs windows-based SLOs, and how error budgets behave.

## Signature / Usage

### Example SLO (basic availability SLI, calendar week)

This page has no code block. The block below is a verbatim example of an SLO object (98% availability over a calendar week), showing how an SLI, goal and compliance period combine.

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

### Core terms

| Term | Definition |
|------|------------|
| Service-level indicator (SLI) | A measurement of performance. |
| Service-level objective (SLO) | A statement of desired performance: an SLI, a performance goal, and a compliance period. |
| Error budget | Starts at 1 - SLO and declines as actual performance misses the SLO. Budget for a period = (1 - SLO goal) x (eligible events in compliance period). |
| Burn rate | How fast the error budget is consumed (see `alerting-on-budget-burn-rate.md`). |

### Limits and ranges

| Item | Value |
|------|-------|
| SLOs per service | Up to 500 in Cloud Monitoring |
| Highest SLO goal | 99.9%; any lower value is allowed. A 100% SLO leaves no error budget. |
| Rolling compliance period | From 1 to 30 days |
| Calendar compliance period | Values of `CalendarPeriod` (for example `DAY`, `WEEK`, `MONTH`) |
| Services with automatically identified performance metrics | Cloud Service Mesh, Istio on Google Kubernetes Engine, App Engine (you can also define a custom service type) |

### SLI categories

| Type | Good service is measured by | Notes |
|------|-----------------------------|-------|
| Request-based | Counting atomic units of service (for example successful HTTP requests); met when good / total meets or exceeds the goal | Shows what percentage of work was done properly regardless of load distribution |
| Windows-based | Counting time windows in which performance meets a goodness criterion; met when good windows / total windows meets or exceeds the goal | Can hide "bursty" behavior; low-traffic windows count as much as busy ones. If the raw metric is a latency percentile, you must use a windows-based SLO. |

### Standard derived SLIs

| SLI | Ratio |
|-----|-------|
| Availability | Successful responses / all responses |
| Latency | Calls below a latency threshold / all calls |

## Notes

- Calendar-based periods reset the error budget on calendar boundaries and give one compliance rating per period. Rolling periods (from n days ago to now) recompute daily as old data drops out; error budget >= 0 means a compliant rolling window, < 0 non-compliant.
- With a request-based SLO over a calendar period, remaining error budget can rise when traffic increases, because the system extrapolates expected traffic (calls so far / elapsed time x period length).
- Worked example from the source: an SLO of 85% good requests in a 7-day rolling period with 60,480 requests allows 15%, or 9,072 bad requests. A windows-based example: rolling 30 days, 1-minute windows, 99% goal needs 42,768 good intervals out of 43,200.
- SLOs should be no higher than necessary and tighter than public or contractual commitments.
- Source inconsistency: this page states a highest SLO goal of 99.9% ("The highest value you can set is 99.9%"; the same source later says "The max value is 100%."), while the monitoring v3 Discovery document describes `ServiceLevelObjective.goal` as "0 < goal <= 0.9999"; check the value the console or API accepts before relying on one. Discovery also says that for `calendarPeriod` "only DAY, WEEK, FORTNIGHT, and MONTH are supported".
- Source: https://docs.cloud.google.com/stackdriver/docs/solutions/slo-monitoring (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/stackdriver/docs/solutions/slo-monitoring/api/api-structures

## Related

- [sli-metrics-overview.md](./sli-metrics-overview.md)
- [alerting-on-budget-burn-rate.md](./alerting-on-budget-burn-rate.md)
- [api-structures.md](./api-structures.md)
- [using-api.md](./using-api.md)
