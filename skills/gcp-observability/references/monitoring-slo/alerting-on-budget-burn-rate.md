---
source: https://docs.cloud.google.com/stackdriver/docs/solutions/slo-monitoring/alerting-on-budget-burn-rate
---

# Alerting on Your Error Budget Burn Rate

An alerting policy on an SLO monitors the burn rate, how quickly the error budget is consumed, and notifies you when it exceeds a threshold for longer than the allowed duration. The burn-rate metric is retrieved with the `select_slo_burn_rate` time-series selector.

## Signature / Usage

### Retrieve the burn rate for an SLO

The page has no code block. The block below is a verbatim example of the burn-rate selector (SLO name plus a lookback period).

```text
select_slo_burn_rate("projects/PROJECT_ID/services/SERVICE_ID/serviceLevelObjectives/SLO_ID", "3600s")
```

## Options / Props

### Types of error-budget alerts

| Alert | Lookback | Threshold starting point | Purpose |
|-------|----------|--------------------------|---------|
| Fast-burn | Short (1 or 2 hours) | 10x the baseline | Sudden, large change in consumption that would exhaust the budget very soon |
| Slow-burn | Longer (24 hours) | 2x the baseline | Rate that, if unchanged, exhausts the budget before the end of the compliance period; less urgent |

### Steps for an SLO alerting policy

| Step | What |
|------|------|
| 1 | Identify the SLO |
| 2 | Build a condition: a time-series selector, a threshold, a comparison and a duration |
| 3 | Identify or create a notification channel |
| 4 | Add documentation explaining what triggered the policy |

## Notes

- Error budget for a compliance period = (1 - SLO goal) x (eligible events in compliance period). The burn rate is normalized: above 1 means that, if the measured error rate is sustained over a future compliance period, the service will be out of SLO for it.
- The lookback period is also used as the compliance period for calculating SLO performance and error budget. It is not currently possible to base alerts on the error-budget consumption rate of an SLO using a compliance period greater than 24 hours; approximating a 28- or 30-day period with one under 24 hours is often sufficient.
- Shorter compliance periods detect problems faster but can be overly sensitive during low-traffic periods; consider a burn-rate threshold significantly larger than 1.
- You can create alerting policies with other time-series selectors, but only through the Cloud Monitoring API.
- Creation guides: console https://docs.cloud.google.com/stackdriver/docs/solutions/slo-monitoring/ui/create-alert and API https://docs.cloud.google.com/stackdriver/docs/solutions/slo-monitoring/api/create-policy-api (not in this category).
- Snippet taken from https://docs.cloud.google.com/stackdriver/docs/solutions/slo-monitoring/api/timeseries-selectors
- Source: https://docs.cloud.google.com/stackdriver/docs/solutions/slo-monitoring/alerting-on-budget-burn-rate (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [timeseries-selectors.md](./timeseries-selectors.md)
- [create-alert.md](./create-alert.md)
- [slo-monitoring.md](./slo-monitoring.md)
