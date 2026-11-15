---
source: https://docs.cloud.google.com/billing/docs/how-to/budgets-programmatic-notifications
---

# Programmatic Budget and Anomaly Notifications (Pub/Sub)

Send budget and cost anomaly notifications to Pub/Sub, understand the message format and delivery semantics, and subscribe with a Cloud Run function.

## Signature / Usage

1. Create a Pub/Sub topic (Pub/Sub > Create topic; keep default subscription and encryption). Recommended: use a FinOps administration project for billing topics. You need permission to grant the Pub/Sub Publisher role so Cloud Billing can publish.
2. Connect the topic: Budgets & alerts > budget > Actions > Manage notifications > Connect a Pub/Sub topic to this budget > select project and topic > Save. For anomalies: Anomalies > Manage anomalies > set Anomaly threshold (Cost impact) > Connect a Pub/Sub topic.
3. Subscribe: without a subscriber Pub/Sub drops published messages. Create a Cloud Run function with an Eventarc trigger (Trigger type Google sources, Event provider Cloud Pub/Sub, select the topic), set the function entry point, deploy.

Test by publishing this message body to the topic (from the official page):

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

### Budget notification attributes

| Attribute | Example | Description |
|-----------|---------|-------------|
| `billingAccountId` | `01D4EE-079462-DFD6EC` | Billing account owning the budget |
| `budgetId` | `de72f49d-779b-4945-a127-4d6ce8def0bb` | Budget identifier |
| `schemaVersion` | `1.0` | Notification schema version |

### Budget notification data (base64-encoded UTF-8 JSON)

| Field | Example | Description |
|-------|---------|-------------|
| `budgetDisplayName` | "My Personal Budget" | Budget name |
| `costAmount` | 140.321 | Cost accrued, per budget filters and settings |
| `costIntervalStart` | "2021-02-01T08:00:00Z" | Start of the budget period |
| `budgetAmount` | 152.557 | Budget amount |
| `budgetAmountType` | "SPECIFIED_AMOUNT" | `SPECIFIED_AMOUNT`, `LAST_MONTH_COST`, or `LAST_PERIODS_COST` |
| `alertThresholdExceeded` | 0.9 | Highest actual-cost threshold exceeded (decimal percent); absent if none exceeded |
| `forecastThresholdExceeded` | 0.2 | Highest forecasted-cost threshold exceeded; absent if none |
| `currencyCode` | "USD" | Currency of all amounts |

### Anomaly notifications (Preview)

| Kind | Fields |
|------|--------|
| Attributes | `scope`, `billingAccountName`, `resourceDisplayName`, `resourceName`, `SchemaVersion` |
| Data | `anomalyName`, `billingAccountName`, `resourceName`, `resourceDisplayName`, `detectionDate`, `Scope`, `expectedSpendAmount`, `actualSpendAmount`, `deviationAmount`, `deviationPercentage`, root cause (`root_causes` with `sub_causes` for service, location, SKU) |

### Permissions

| Task | Permissions |
|------|-------------|
| Budget notifications (billing account) | `billing.budgets.create/get/list/update` on billing account, `pubsub.topics.setIamPolicy`, `pubsub.topics.list` on the topic project (roles: Billing Account Costs Manager or Administrator + Pub/Sub Admin). Connecting an existing budget to an existing topic: `billing.budgets.get/list/update` + `pubsub.topics.list`. |
| Budget notifications (project-only, Preview) | `resourcemanager.projects.get`, `billing.resourcebudgets.read/write`, optional `billing.resourceCosts.get`, plus the Pub/Sub permissions (roles: Project Owner or Editor + Pub/Sub Admin) |
| Anomaly notifications | `billing.accounts.get`, `billing.accounts.getIamPolicy`, `billing.anomalies.get/list`, `pubsub.topics.setIamPolicy`, `pubsub.topics.list`, `pubsub.subscriptions.consume` |

## Notes

- Budgets use estimated Cloud Billing data, subject to change until the invoice is finalized.
- Budget messages are published multiple times per day with current budget status (not only on threshold crossing, unlike emails), even with no usage; the first one can take several hours. Anomaly messages are sent only when the threshold is reached.
- Pub/Sub provides at-least-once delivery: messages may repeat or arrive out of order, so make handlers idempotent. Delivery failures from misconfiguration are not reported to you.
- Failure causes: topic deleted, Cloud Billing lost publish permission, notification quota exceeded, or the `iam.allowedPolicyMemberDomains` organization policy blocking the topic (override the policy for the project containing the topic, then connect the topic).
- Source: https://docs.cloud.google.com/billing/docs/how-to/budgets-programmatic-notifications
- Source: https://docs.cloud.google.com/billing/docs/how-to/listen-to-notifications
- Fetched 2026-11-14. Content is CC BY 4.0; code samples are Apache 2.0.

## Related

- [automated-cost-control.md](./automated-cost-control.md)
- [budgets.md](./budgets.md)
- [../cost-management/cost-anomalies.md](../cost-management/cost-anomalies.md)
