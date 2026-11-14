---
source: https://docs.cloud.google.com/billing/docs/how-to/budgets
---

# Cloud Billing Budgets and Alerts

Create alerts-only budgets with scope, amount, threshold rules, and email notification settings; permissions, quota, and Cloud Monitoring email recipients.

## Signature / Usage

Alerts-only budgets track actual (or forecasted) cost against a target and send email when threshold rules trigger. They do not cap spend. Console path: Billing > Budgets & alerts > Create budget > Define: Alerts only.

Steps: 1) name the budget, 2) set scope, 3) set amount, 4) set threshold rules and actions (notifications), 5) Finish.

Budget amount types:

- Specified amount: fixed Target amount; available for all time ranges.
- Last period's spend: dynamic amount from the previous calendar period; only for recurring calendar ranges (monthly, quarterly, yearly).

Single-project budgets can be set Read-only for project users. Customize email recipients by linking up to five Cloud Monitoring email notification channels (Budgets & alerts > budget > Actions > Manage notifications > Link Monitoring email notifications to this budget; pick the project with the channels).

Programmatic notifications: connect a Pub/Sub topic (see programmatic-notifications.md). Example test message body (from the "Listen to your notifications" page):

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

### Scope

| Option | Detail |
|--------|--------|
| Time range | Monthly (default), Quarterly, Yearly, or Custom range (From after January 1, 2017; optional To; "No end date" for open-ended). All times begin at 12 AM US and Canadian Pacific Time (UTC-8). |
| Subaccounts | Billing-account-level budgets only (resellers); "Charges not specific to a subaccount" for the parent. |
| Folders & organizations | Applies to all projects in the selected folders/orgs, including future ones, only for projects paid by this billing account. Use default for single-project budgets. |
| Projects | Select projects linked to the account. "Charges not specific to a project" (subscriptions, Support) is only included when all projects are selected. |
| Services | Any service, even with no usage yet. |
| Labels | Billing-account-level budgets only; only one label key/value per budget; project labels not selectable; labels without usage not available. |
| Savings | All types selected by default (spend-based CUDs, legacy spend-based CUD credits, resource-based CUD credits, free tier credits, promotional credits, sustained use discounts, reseller margin, spending-based discounts, subscription credits, others). Deselect all to track spend before discounts. With savings, calculated spend can be negative. |

### Threshold rules

| Setting | Detail |
|---------|--------|
| Defaults | 50%, 90%, 100% of budget amount on Actual spend |
| Percent of budget / Amount | Enter either; the other is computed |
| Trigger on | Actual (cumulative cost exceeds threshold) or Forecasted (end-of-period forecast exceeds threshold). Custom time range budgets cannot use Forecasted. |
| Email options | Email alerts to billing admins and users (default; `roles/billing.admin` and `roles/billing.user`), Email alerts to project owners (single-project budgets only), Link Monitoring email notification channels |

### Permissions

| Level | Permissions |
|-------|-------------|
| Billing account: create | `billing.accounts.get`, `billing.accounts.getIamPolicy`, `billing.accounts.getSpendingInformation`, `billing.budgets.create`, `billing.budgets.get`, `billing.budgets.list` (roles: Billing Account Costs Manager or Administrator) |
| Billing account: view | same minus create (roles: Viewer, Costs Manager, Administrator) |
| Single project | `resourcemanager.projects.get`, `billing.resourcebudgets.read`, `billing.resourcebudgets.write` (write for create/edit), optional `billing.resourceCosts.get` to see costs and the cost trend chart |
| Multi-project scoped access (Preview) | Project permissions above plus Project Billing Costs Manager on the billing account |
| Pub/Sub (optional) | Pub/Sub Admin on the project with the topics |
| Cloud Monitoring channels | Monitoring Editor to create channels, Monitoring Viewer to link existing |

## Notes

- Caution: an alerts-only budget does not cap usage or spend. For eligible services consider spend cap budgets (`billing.budgets.configureSpendCap`).
- Budgets use estimated cost data that can change until the invoice is finalized. Monthly budgets keep tracking for the first two days of the next month for late-reported usage and taxes (for example August tracks until September 2). Costs are after Savings; taxes such as VAT are included in threshold calculation.
- First email or Pub/Sub notification can take several hours. Set the budget below available funds because of usage reporting delay.
- Removing all threshold rules disables email notifications (Pub/Sub only). Editing email settings requires at least one threshold rule. Pub/Sub JSON includes `alertThresholdExceeded` / `forecastThresholdExceeded` only if at least one threshold rule exists.
- Email recipients from Monitoring channels may lack permission to open the budget; give them Billing Account Viewer (account budgets) or Project Viewer (single-project budgets). Only Email-type notification channels are supported; failures to deliver are not reported, and deleted channels cause delivery to fail.
- Quota: each billing account can have up to 50,000 budgets (check "Budget limit per billing account" in Quotas; needs Quota Administrator-level permissions).
- Recurring budgets reset actual cost to $0 on the first day of each period.
- Source: https://docs.cloud.google.com/billing/docs/how-to/budgets
- Source: https://docs.cloud.google.com/billing/docs/how-to/budgets-notification-recipients
- Source: https://docs.cloud.google.com/billing/docs/how-to/listen-to-notifications
- Fetched 2026-11-14. Content is CC BY 4.0; code samples are Apache 2.0.

## Related

- [programmatic-notifications.md](./programmatic-notifications.md)
- [automated-cost-control.md](./automated-cost-control.md)
- [budget-api.md](./budget-api.md)
- [../access/managing-access.md](../access/managing-access.md)
