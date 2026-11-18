---
source: https://docs.cloud.google.com/stackdriver/docs/solutions/slo-monitoring/ui/create-alert
---

# Create an SLO Alerting Policy (Google Cloud Console)

Creates an alerting policy that warns when a service consumes the error budget of an SLO too quickly. Start from the service on the Services Overview page and click Create SLO alert next to the SLO; the condition editor is pre-populated with best-practice values.

## Signature / Usage

### Time-series selector used by console-created SLO policies

The page has no code block. Console-created SLO alert conditions use the `select_slo_burn_rate` selector; the block below is a verbatim example filter (`SLO_NAME`, `LOOKBACK_PERIOD`).

```text
select_slo_burn_rate("projects/PROJECT_ID/services/SERVICE_ID/serviceLevelObjectives/SLO_ID", "3600s")
```

## Options / Props

### Condition fields (Set SLO alert conditions pane)

| Field | Meaning |
|-------|---------|
| Target | The SLO the policy is for (pre-populated) |
| Display name | Condition name; pre-populated from the SLO configuration, editable |
| Lookback duration | How far back to retrieve burn-rate data; also the evaluation period for error-budget consumption. Has a default; editable |
| Burn rate threshold | Rate of error-budget consumption you want to be notified about. Has a default; set it so that staying below it does not exhaust the budget in the compliance period |

### Limit

| Item | Value |
|------|-------|
| Alerting policies | Up to 2,000 in a metrics scope |

## Notes

- Steps after the condition: Who should be notified? (notification channels, optional) and What are the steps to fix the issue? (documentation, optional but strongly recommended), then Save.
- SLOs often have two policies, a fast-burn and a slow-burn one (see `alerting-on-budget-burn-rate.md`).
- Snippet taken from https://docs.cloud.google.com/stackdriver/docs/solutions/slo-monitoring/api/timeseries-selectors
- The source describes Console steps only; for the API route see https://docs.cloud.google.com/stackdriver/docs/solutions/slo-monitoring/api/create-policy-api (not in this category).
- Source: https://docs.cloud.google.com/stackdriver/docs/solutions/slo-monitoring/ui/create-alert (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [alerting-on-budget-burn-rate.md](./alerting-on-budget-burn-rate.md)
- [timeseries-selectors.md](./timeseries-selectors.md)
- [create-slo.md](./create-slo.md)
