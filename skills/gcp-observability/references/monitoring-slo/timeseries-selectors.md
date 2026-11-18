---
source: https://docs.cloud.google.com/stackdriver/docs/solutions/slo-monitoring/api/timeseries-selectors
---

# Retrieving SLO Data with Time-Series Selectors

SLO data is stored as time series but not under metric types, so you retrieve it with a time-series selector in the `filter` parameter of `timeSeries.list`, or in direct filter mode in Metrics Explorer. In alerting policies the selector goes in the filter of a threshold condition.

## Signature / Usage

### Selector forms

```text
SELECTOR_NAME(SLO_NAME)
SELECTOR_NAME(SLO_NAME, LOOKBACK_PERIOD)
```

### SLO resource name (first argument)

```text
projects/PROJECT_ID/services/SERVICE_ID/serviceLevelObjectives/SLO_ID
```

### Selector without a lookback

```text
select_slo_budget("projects/PROJECT_ID/services/SERVICE_ID/serviceLevelObjectives/SLO_ID")
```

### Selector that requires a lookback

```text
select_slo_burn_rate("projects/PROJECT_ID/services/SERVICE_ID/serviceLevelObjectives/SLO_ID", "3600s")
```

## Options / Props

### Time-series selectors

| Selector | Arguments | Answers | Use in alerting policies |
|----------|-----------|---------|--------------------------|
| `select_slo_burn_rate` | `SLO_NAME`, `LOOKBACK_PERIOD` (required) | Ratio of current failure rate in the lookback interval to the sustainable failure rate (0 to infinity; 1 = ideal, above 1 = SLO falls out of compliance sooner) | Yes; all console-created SLO policies use it |
| `select_slo_health` | `SLO_NAME` | During an alignment period, ratio of good requests to total requests (1 = every request good) | Not stated as excluded |
| `select_slo_compliance` | `SLO_NAME` | Ratio of good to total units since the start of the compliance period | Don't use |
| `select_slo_budget` | `SLO_NAME` | How much error budget remained (requests or minutes) | Don't use |
| `select_slo_budget_fraction` | `SLO_NAME` | Remaining error budget as a fraction from negative infinity to one | Don't use |
| `select_slo_budget_total` | `SLO_NAME` | Total error budget projected to be available, based on behavior since the start of the compliance period | Don't use |
| `select_slo_counts` | `SLO_NAME` | Number of good and bad requests in an alignment period; suited to long-term storage ingestion | Don't use |

### Identifier parts

| Part | Meaning |
|------|---------|
| `PROJECT_ID` | Name or number of a Google Cloud project |
| `SERVICE_ID` | Name of a service |
| `SLO_ID` | Identifier of an SLO defined for the service |

### Lookback units

| Valid time units |
|------------------|
| `ns`, `us`, `ms`, `s`, `m`, `h` |

## Notes

- Only a subset of the selectors can be used in alerting policies; SLO-based policies created with the Google Cloud console always use `select_slo_burn_rate`. Policies on other allowed selectors must be created with the Monitoring API.
- Example in APIs Explorer on `timeSeries.list`: set `name` to `projects/PROJECT_ID`, `filter` to a selector such as the `select_slo_budget(...)` expression above, and `interval.startTime` / `interval.endTime` (the source uses `2021-10-07T13:00:20-04:00` and `2021-10-08T13:00:20-04:00`).
- Burn-rate monitoring: use two policies, fast-burn and slow-burn (see `alerting-on-budget-burn-rate.md`).
- General time-series retrieval: https://docs.cloud.google.com/monitoring/custom-metrics/reading-metrics; filters: https://docs.cloud.google.com/monitoring/api/v3/filters (not in this category).
- Source: https://docs.cloud.google.com/stackdriver/docs/solutions/slo-monitoring/api/timeseries-selectors (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [alerting-on-budget-burn-rate.md](./alerting-on-budget-burn-rate.md)
- [using-api.md](./using-api.md)
- [api-structures.md](./api-structures.md)
