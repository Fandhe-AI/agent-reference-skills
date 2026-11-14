---
source: https://docs.cloud.google.com/billing/docs/how-to/budget-api
---

# Cloud Billing Budget API

Manage alerts-only and spend cap budgets programmatically (REST at `billingbudgets.googleapis.com`): setup, list, get, create, update, delete.

## Signature / Usage

Base URI: `https://billingbudgets.googleapis.com/v1/billingAccounts/billing-account-id/budgets`. Authenticate with a gcloud access token and send `x-goog-user-project` with the project where the API is enabled.

Setup commands (from the setup guide):

```bash
gcloud init
gcloud auth print-access-token
```

List budgets:

```bash
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "x-goog-user-project: project-id" \
     "https://billingbudgets.googleapis.com/v1/billingAccounts/billing-account-id/budgets"
```

Create a budget (`POST .../budgets`, request body saved to `request.json`, quarterly budget scoped to a project):

Adapted (not in the official docs): `thresholdRules` is a repeated field, so the rule is wrapped in an array (the official example shows a bare object).

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

Update a budget (`PATCH .../budgets/budget-id`, body is the Budget resource itself):

Adapted (not in the official docs): the official example wraps the body in a `budget` object; the PATCH body is the Budget itself, so the wrapper is removed.

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

Get (`GET .../budgets/budget-id`) uses the same headers as list. Delete:

```bash
curl -X DELETE \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "x-goog-user-project: project-id" \
     "https://billingbudgets.googleapis.com/v1/billingAccounts/billing-account-id/budgets/budget-id"
```

A list response has this shape (budget ID is the last segment of `name`):

```json
{
  "budgets": [
   {
      "name": "billingAccounts/000000-111111-222222/budgets/33333333-4444-5555-6666-777777777777",
      "displayName": "Forecasted spend budget with Service Filter",
      "budgetFilter": {
        "projects": [
          "projects/123456789"
        ],
        "services": [
          "services/A1E8-BE35-7EBC"
        ],
        "creditTypesTreatment": "EXCLUDE_ALL_CREDITS",
        "calendarPeriod": "MONTH"
      },
      "amount": {
        "lastPeriodAmount": {}
      },
      "thresholdRules": [
        {
          "thresholdPercent": 0.9,
          "spendBasis": "FORECASTED_SPEND"
        }
      ],
      "allUpdatesRule": {},
      "etag": "c9d6c011f6fa6b5c"
    }
  ]
}
```

## Options / Props

### Budget fields seen in the samples

| Field | Description |
|-------|-------------|
| `displayName` | Budget name |
| `budgetFilter.projects` / `services` | Scope; entries like `projects/123456789`, `services/A1E8-BE35-7EBC` |
| `budgetFilter.calendarPeriod` (`calendar_period` in samples) / `budgetFilter.customPeriod` | Period oneof: `CalendarPeriod` (MONTH default, QUARTER, YEAR) or a custom period |
| `budgetFilter.creditTypesTreatment` | For example `INCLUDE_ALL_CREDITS`, `EXCLUDE_ALL_CREDITS` |
| `amount.specifiedAmount` / `amount.lastPeriodAmount` | Fixed amount (`units`) or previous-period spend |
| `thresholdRules[]` | `thresholdPercent` (0.8 = 80%) and `spendBasis` (`CURRENT_SPEND`, `FORECASTED_SPEND`) |
| `allUpdatesRule` | Email recipients and Pub/Sub topic for programmatic notifications |
| `ownershipScope` | Lets billing-account users make single-project budgets that project users cannot modify |
| `etag` | Concurrency token |

### API permissions

| Method | Billing account permission | Roles |
|--------|----------------------------|-------|
| `GetBudget` / `ListBudgets` | `billing.budgets.get` / `billing.budgets.list` | Billing Account Administrator, Costs Manager, or Viewer |
| `CreateBudget` | `billing.budgets.create` | Billing Account Administrator or Costs Manager |
| `UpdateBudget` | `billing.budgets.update` | Billing Account Administrator or Costs Manager |
| `DeleteBudget` | `billing.budgets.delete` | Billing Account Administrator or Costs Manager |

For single-project budgets the caller may instead have `resourcemanager.projects.get` and `billing.resourcebudgets.read` (plus `billing.resourcebudgets.write` for create, update, delete) on the project (Project Owner/Editor for write; Project Viewer for read).

## Notes

- Adapted from the official docs: `budgetFilter.projects` entries must be `projects/<PROJECT_NUMBER>` (the numeric project number, not the project ID); the placeholder is renamed `budget-scope-project-number`.
- Adapted from the official docs: `thresholdRules` is a repeated field; the create and update request examples above wrap the rule in an array (the official examples show a bare object). The update example also drops the official `budget` wrapper because the PATCH body is the Budget resource itself.
- Two budget types: alerts-only (all services; actual spend, calculated typically within 24 hours) and spend-cap (limited eligible services; pauses new usage of the service in the project when gross estimated spend exceeds the budget, so it triggers faster).
- Use up to 50,000 budgets per billing account; a budget belongs to one billing account; a project is linked to one billing account at a time.
- Setup: use a separate FinOps/billing administration project, ensure billing is enabled on it, enable `billingbudgets.googleapis.com` (needs `serviceusage.services.enable`, for example Service Usage Admin), authenticate as a principal with Billing Account Administrator (`roles/billing.admin`) or a narrower role covering the permissions above. The API is free; programmatic notifications incur standard Pub/Sub prices. Client libraries are recommended; REST and gRPC are also available.
- Delete is destructive and returns `{}`.
- The official samples show `calendar_period` in request bodies and `calendarPeriod` in responses; JSON field names are case-sensitive in the reference, so verify against the REST reference before relying on either.
- Source: https://docs.cloud.google.com/billing/docs/how-to/budget-api
- Source: https://docs.cloud.google.com/billing/docs/how-to/budget-api-overview
- Source: https://docs.cloud.google.com/billing/docs/how-to/budget-api-prereqs
- Source: https://docs.cloud.google.com/billing/docs/how-to/budget-api-setup
- Source: https://docs.cloud.google.com/billing/docs/access-control
- Fetched 2026-11-14. Content is CC BY 4.0; code samples are Apache 2.0.

## Related

- [budgets.md](./budgets.md)
- [programmatic-notifications.md](./programmatic-notifications.md)
- [../api/billing-apis.md](../api/billing-apis.md)
