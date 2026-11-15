---
source: https://docs.cloud.google.com/billing/docs/how-to/analyze-cuds
---

# CUD Analysis, FinOps Hub, and Cost Estimation

Analyze committed use discount effectiveness, use the FinOps hub for recommendations, and estimate planned costs.

## Signature / Usage

CUD analysis: Billing > Committed use discounts > CUD analysis (also from a commitment row on the CUDs page). Two tabs: CUD Coverage (how much eligible spend is covered, on-demand vs saved) and CUD Utilization (percentage over time per spend-based commitment or per resource-based CUD application scope).

FinOps hub: Billing > FinOps hub; one dashboard of savings, optimization recommendations (from Cloud Billing and Recommender), FinOps score, CUD optimization metrics, and utilization insights.

Custom role permissions for the FinOps hub (list from the official page):

```text
billing.accounts.get
billing.accounts.getSpendingInformation
billing.finOpsBenchmarkInformation.get
billing.finOpsHealthInformation.get
recommender.costRecommendations.listAll
```

CUD fee query for exported billing data (snippet taken from https://docs.cloud.google.com/billing/docs/how-to/bq-examples):

```sql
SELECT
    invoice.month AS invoice_month,
    SUM(cost) as commitment_fees
FROM `project-ID.dataset.gcp_billing_export_v1_XXXXXX-XXXXXX-XXXXXX`
WHERE LOWER(sku.description) LIKE "commitment%"
GROUP BY 1
```

## Options / Props

| Topic | Detail |
|-------|--------|
| CUD types | Resource-based (Compute Engine vCPU, memory, GPUs, Local SSD, sole-tenant nodes, OS licenses, Hyperdrive Exapools; analysis not supported for block storage) and spend-based (discount for a minimum spend on eligible services) |
| CUD analysis permissions | `billing.accounts.get` and `billing.accounts.getSpendingInformation` on the billing account (Billing Account Administrator or Viewer); project Owner/Editor/Viewer roles are not enough |
| FinOps hub access (account) | Billing Account Viewer or Administrator; to view details or apply a recommendation also Recommender Viewer on the account and Project Viewer on relevant projects |
| FinOps hub access (project) | `billing.resourceCosts.get`, `resourcemanager.projects.get` per project plus Project Billing Costs Manager (Preview) on the account; CUD recommendations and FinOps score are unavailable with project-only access |
| Cost estimator agent (Preview) | Estimates Gemini Enterprise Agent Platform agents from four reference architectures (Conversational Chatbot, Workflow Operator, Autonomous Researcher, Multi-agent Orchestrator); uses account contract prices, English only, results in USD; needs Billing Account Viewer or Administrator |
| Pricing calculator | Estimate costs for other Google Cloud services and planned workloads |

## Notes

- CUD analysis uses cost data only (no utilization data) and does not distinguish used resources from unused reservations, so it measures subscription effectiveness, not reservation effectiveness.
- Spend-based CUDs are migrating to a multiprice model with discount rates instead of credits; CUDs bought before migration display the legacy credit model until the term ends.
- All estimates are non-binding planning projections; actual metered usage determines billing. The cost estimator cannot apply manual discounts, query historical spend, or create budgets or CUDs; excluded costs include human labor, licenses, and third-party tools.
- You cannot disable billing on a project that has active or pending CUDs. Moving a project between billing accounts changes where resource-based CUDs apply (see project-billing-link.md).
- Source: https://docs.cloud.google.com/billing/docs/how-to/analyze-cuds
- Source: https://docs.cloud.google.com/billing/docs/how-to/finops-hub
- Source: https://docs.cloud.google.com/billing/docs/how-to/estimate-costs
- Fetched 2026-11-14. Content is CC BY 4.0; code samples are Apache 2.0.

## Related

- [billing-reports.md](./billing-reports.md)
- [cost-anomalies.md](./cost-anomalies.md)
- [../accounts/project-billing-link.md](../accounts/project-billing-link.md)
- [../export-bigquery/export-queries.md](../export-bigquery/export-queries.md)
