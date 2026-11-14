---
source: https://docs.cloud.google.com/billing/docs/how-to/manage-anomalies
---

# Cost Anomalies

Detect, investigate, and get notified about spikes in usage cost with the Anomalies dashboard (standard and early anomalies).

## Signature / Usage

Console: Billing > Cost management > Anomalies. Billing Account Administrators click Manage anomalies to set thresholds and notifications.

1. Open Anomalies for the billing account (or, with project-only permissions, select the project before opening Billing).
2. Click an anomaly date to open the Root cause analysis panel (top services, regions, SKUs; links open a Billing Report filtered accordingly).
3. Manage anomalies: set Cost impact and Deviation % thresholds; choose email recipients (Billing admins, Essential contacts, Project owners) and frequency (Individual anomaly or Daily summary); optionally connect a Pub/Sub topic.
4. Submit feedback in the panel ("Is this an anomaly?") to tune detection.

Pub/Sub anomaly payload includes a `root_causes` field. Snippet taken from https://docs.cloud.google.com/billing/docs/how-to/budgets-programmatic-notifications (format of the Root cause value, abridged to the first two nesting levels; the official value also nests SKU-level `sub_causes`):

```text
root_causes { resource: "services/XXX-XXXX-XXX" display_name: "BigQuery" cause_type: CAUSE_TYPE_SERVICE deviation { expected_spend { currency_code: "USD" units: "5000" } actual_spend { currency_code: "USD" units: "5000" } deviation_amount { currency_code: "USD" units: "5000" } deviation_percentage: "Infinity" } sub_causes { resource: "locations/us-west1", display_name: "us-west1", cause_type: CAUSE_TYPE_LOCATION, deviation { expected_spend { currency_code: "USD", } actual_spend { currency_code: "USD", units:"5000" } deviation_amount { currency_code: "USD", units: "5000" } deviation_percentage: "Infinity" } } }
```

## Options / Props

| Item | Detail |
|------|--------|
| Standard anomalies | Next-day, project-level; gross usage cost at on-demand rates (includes spend-based CUD discounts, excludes legacy spend-based CUD credits, resource-based CUD credits, promotional credits, sustained use discounts) |
| Early anomalies (Preview) | Gemini API and Vertex AI; near-real-time estimates, alerts with 20 to 40 minute latency; "By service (Early signals)" tab; not on cost reports; thresholds system-defined; no feedback |
| Thresholds | Cost impact (positive number, two decimals, billing account currency) and Deviation %; auto-set from usage, applies to standard anomalies and to all notifications (email and Pub/Sub); unset Cost impact means all anomalies notify |
| Email recipients | Billing admins, Essential contacts (Billing category; project for individual, organization for daily summary), Project owners (individual anomalies on own projects) |
| Permissions (account) | `billing.accounts.get`, `billing.accounts.getIamPolicy`, `billing.anomalies.get`, `billing.anomalies.list` (Costs Manager, Administrator, or Viewer for view only) |
| Permissions (project) | `resourcemanager.projects.get`, `billing.anomalies.get`, `billing.anomalies.list`; multi-project also needs Project Billing Costs Manager on the account |
| Pub/Sub | `pubsub.topics.setIamPolicy`, `pubsub.topics.list`, `pubsub.subscriptions.consume` (Pub/Sub Admin) |
| Feedback | Billing Account Administrator (`roles/billing.admin`) only; options: unexpected increase, expected increase, insignificant |

## Notes

- Only Billing Account Administrators can change notification thresholds; project-level users see the anomalies set by the administrator for their project. Notification settings apply to all projects on the account (no per-project subsets).
- Pub/Sub notifications need the topic project to permit external-domain sharing; exempt it from `iam.allowedPolicyMemberDomains` if enforced.
- Resellers and subaccounts need project-based cost visibility enabled (contact Cloud Billing Support) and see only their projects.
- Anomaly Pub/Sub notifications are sent only when the threshold is reached, and delivery is at-least-once.
- Source: https://docs.cloud.google.com/billing/docs/how-to/manage-anomalies
- Source: https://docs.cloud.google.com/billing/docs/how-to/budgets-programmatic-notifications
- Fetched 2026-11-14. Content is CC BY 4.0; code samples are Apache 2.0.

## Related

- [../budgets-alerts/programmatic-notifications.md](../budgets-alerts/programmatic-notifications.md)
- [billing-reports.md](./billing-reports.md)
