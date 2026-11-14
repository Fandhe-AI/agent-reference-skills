---
source: https://docs.cloud.google.com/billing/docs/how-to/budget-api
---

# Create and Manage Budget Alerts with the Budget API

Create, list, update, and delete an alerts-only budget through `billingbudgets.googleapis.com`.

## Signature / Usage

Base URI: `https://billingbudgets.googleapis.com/v1/billingAccounts/billing-account-id/budgets`. Enable `billingbudgets.googleapis.com` in a billing administration project and send `x-goog-user-project` with it.

### List

```bash
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "x-goog-user-project: project-id" \
     "https://billingbudgets.googleapis.com/v1/billingAccounts/billing-account-id/budgets"
```

### Create (`request.json`)

Adapted (not in the official docs): `thresholdRules` is an array of rule objects.

```json
{
  "displayName": "Keep my spending down",
  "budgetFilter": {
    "projects": [
      "projects/budget-scope-project-number"
    ],
    "calendar_period": "QUARTER"
  },
  "amount": {
    "lastPeriodAmount": {}
  },
  "thresholdRules": [
    {
      "thresholdPercent": 0.8,
      "spendBasis": "CURRENT_SPEND"
    }
  ]
}
```

```bash
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "x-goog-user-project: api-user-project-id" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://billingbudgets.googleapis.com/v1/billingAccounts/billing-account-id/budgets"
```

### Update (`PATCH .../budgets/budget-id`)

Adapted (not in the official docs): the PATCH body is the Budget resource itself, so the `budget` wrapper object is removed, `thresholdRules` is an array, and `currencyCode` is added to `specifiedAmount` (set it to the billing account's currency, for example `USD`; the official sample omits it).

```json
{
  "displayName": "My fancy budget",
  "budgetFilter": {
    "projects": [
      "projects/budget-scope-project-number"
    ],
    "calendar_period": "QUARTER"
  },
  "amount": {
    "specifiedAmount": {
      "currencyCode": "CURRENCY_CODE",
      "units": 500
    }
  },
  "thresholdRules": [
    {
      "thresholdPercent": 0.8,
      "spendBasis": "CURRENT_SPEND"
    }
  ]
}
```

```bash
curl -X PATCH \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "x-goog-user-project: api-user-project-id" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://billingbudgets.googleapis.com/v1/billingAccounts/billing-account-id/budgets/budget-id"
```

### Delete

```bash
curl -X DELETE \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "x-goog-user-project: project-id" \
     "https://billingbudgets.googleapis.com/v1/billingAccounts/billing-account-id/budgets/budget-id"
```

### Pub/Sub notification message (test body)

```json
{
    "budgetDisplayName": "name-of-budget",
    "alertThresholdExceeded": 1.0,
    "costAmount": 100.01,
    "costIntervalStart": "2019-01-01T00:00:00Z",
    "budgetAmount": 100.00,
    "budgetAmountType": "SPECIFIED_AMOUNT",
    "currencyCode": "USD"
}
```

## Options / Props

| Field | Description |
|-------|-------------|
| `budgetFilter.projects` / `services` | Scope, e.g. `projects/123456789` |
| `budgetFilter.calendarPeriod` | MONTH (default), QUARTER, YEAR |
| `amount.specifiedAmount` / `lastPeriodAmount` | Fixed `units` or previous-period spend |
| `thresholdRules[]` | `thresholdPercent` (0.8 = 80%) and `spendBasis` (`CURRENT_SPEND`, `FORECASTED_SPEND`) |

## Notes

- Adapted from the official docs: `budgetFilter.projects` takes `projects/<PROJECT_NUMBER>` (project number, not ID).
- Adapted from the official docs: `thresholdRules` is a repeated field, so the rule is wrapped in an array; the PATCH body is the Budget itself (no `budget` wrapper). The update example adds `currencyCode` to the fixed amount (match the billing account's currency); whether the API requires it when omitted is not confirmed in the official page (公式未確認).
- An alerts-only budget does not cap spend; it only notifies. Defaults in the console are 50%, 90%, 100% of actual spend.
- The official samples use `calendar_period` in request bodies and `calendarPeriod` in responses; verify against the REST reference before relying on either.
- Delete is destructive; run it only against a test budget.
- Budgets use estimated cost data, and the first notification can take several hours. Limit: 50,000 budgets per billing account.
- Source: https://docs.cloud.google.com/billing/docs/how-to/budget-api (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/billing/docs/how-to/listen-to-notifications (retrieved 2026-11-14)

## Related

- [budget-api.md](../references/billing/budgets-alerts/budget-api.md)
- [budgets.md](../references/billing/budgets-alerts/budgets.md)
- [programmatic-notifications.md](../references/billing/budgets-alerts/programmatic-notifications.md)
