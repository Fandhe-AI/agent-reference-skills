---
source: https://docs.cloud.google.com/billing/docs/how-to/reports
---

# Cloud Billing Reports

Analyze cost trends in the Reports page: preset views, time range, group by, forecast, and project-scoped access.

## Signature / Usage

Console: Billing > Reports (default "Services - this month": current month, grouped by service, includes usage-specific savings, excludes invoice-level charges such as tax). Reports can be saved, shared by URL, downloaded as CSV, or converted to SQL with "Generate query" (billing-account-level permissions only).

Equivalent SQL for a per-project cost view over the standard export (snippet taken from https://docs.cloud.google.com/billing/docs/how-to/bq-examples):

```sql
SELECT
  project.name,
  TO_JSON_STRING(project.labels) as project_labels,
  sum(cost) as total_cost,
  SUM(IFNULL((SELECT SUM(c.amount) FROM UNNEST(credits) c), 0)) as total_credits
FROM `project-ID.dataset.gcp_billing_export_v1_XXXXXX-XXXXXX-XXXXXX`
WHERE invoice.month = "202006"
GROUP BY 1, 2
ORDER BY 1;
```

## Options / Props

### Preset reports

| Preset | Time range | Group by |
|--------|------------|----------|
| Services - this month (default) | Current month | Service |
| Live costs by SKU | Last 15 days | SKU (gross estimated, near-real-time, limited SKUs, no credits) |
| Projects / SKUs - this month | Current month | Project / SKU |
| Services / Projects / SKUs - daily costs this month | Current month | Date > Service / Project / SKU |
| Services - daily costs L7D | Last 7 days | Date > Service |
| Gemini Enterprise costs by SKU | Current month | SKU, filtered to Gemini Enterprise originating products |
| Last invoice by service / project / SKU | Most recent invoice month (Billing period) | Service / Project / SKU, includes invoice-level charges |

### Time range

| Type | Behavior |
|------|----------|
| Charge period (formerly Usage date) | Usage and cost incurred in the range (back to January 2017); forecast shown if range ends in the future; no taxes or adjustments; negotiated savings included in Cost |
| Billing period (formerly Invoice month) | Complete invoice months (back to May 2019; usage and cost data since January 2019 per note); includes invoice-level charges (taxes, contractual credits, adjustments, surcharges) when all filters show all options; negotiated savings shown separately from List cost (from May 2021 invoice) |

### Group by

| Option | Notes |
|--------|-------|
| Subaccount | Billing-account-level permissions only |
| Project | Project, ID, number; non-project costs shown as "[Charges not specific to a project]" |
| Project hierarchy | Organization > Folder > Project; time range must start on or after January 1, 2022 |
| Product / Originating product | Logical product families (for example Gemini Enterprise) |
| Service / Originating service > Service | For example GKE causing Compute Engine usage |
| SKU, Application (App Hub), Location, Spend-based CUDs, No grouping | |
| Label keys | Billing-account-level only; shows labels on services, not project labels; untagged cost under "[Charges for other usage]" |
| Date or Month > dimension | Multi-dimension; chart shows daily (62 days or less) or monthly (more than 62 days) for single-dimension groups |

### Permissions

| Scope | Permissions |
|-------|-------------|
| Billing account | `billing.accounts.get`, `billing.accounts.getIamPolicy`, `billing.accounts.getSpendingInformation` (Viewer, Costs Manager, Administrator) |
| Project | `billing.resourceCosts.get`, `resourcemanager.projects.get`; multi-project also needs Project Billing Costs Manager on the account |

## Notes

- Report days start at midnight US and Canadian Pacific Time (UTC-8) and observe US daylight saving.
- Billing Reports aggregates by invoice month, not by individual invoice; use the Cost table report for per-invoice detail.
- Project-only users cannot use Generate query, saved custom reports, subaccount or label grouping, and see no invoice-level charges.
- Gemini Cloud Assist can create reports from prompts but cannot configure Products, Originating products, Spend-based CUDs, Originating services, or Applications filters/group-bys (defaults are used); not available for subaccounts.
- A report opened from a budget uses the budget scope and shows a red dashed budget-amount line; changing time range or scope filters removes the line.
- Source: https://docs.cloud.google.com/billing/docs/how-to/reports
- Fetched 2026-11-14. Content is CC BY 4.0; code samples are Apache 2.0.

## Related

- [cost-anomalies.md](./cost-anomalies.md)
- [cud-and-finops.md](./cud-and-finops.md)
- [../budgets-alerts/budgets.md](../budgets-alerts/budgets.md)
