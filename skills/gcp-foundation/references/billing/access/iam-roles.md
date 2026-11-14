---
source: https://docs.cloud.google.com/billing/docs/how-to/billing-access
---

# Cloud Billing IAM Roles and Access Control

Predefined IAM roles for Cloud Billing accounts, how billing permissions inherit, the split between Cloud Billing IAM and Google payments center permissions, and example role assignments.

## Signature / Usage

Access to Cloud Billing and Google payments is configured in two systems:

- Cloud Billing IAM roles: control administrative and cost-viewing permissions by setting IAM policies on the organization, the Cloud Billing account, or the project.
- Google payments center: add users to a Google payments Organization profile and set their payments permissions. Certain Cloud Billing permissions (for example `billing.accounts.updatePaymentInfo`) grant equivalent payments access from the Cloud Billing console.

To fully manage the payments profile from the Cloud Billing console, a user needs Cloud Billing permissions and Google payments permissions.

Cost-view scope:

- `billing.accounts.getSpendingInformation` on the billing account: view costs of all projects under the account.
- `billing.resourceCosts.get` (plus `resourcemanager.projects.get`) on a project: view costs for that project only.

Snippet taken from https://docs.cloud.google.com/billing/docs/how-to/custom-roles : permissions needed to edit budgets and billing export, which the predefined roles bundle in Billing Account Administrator and, with the narrower Billing Account Costs Manager (`roles/billing.costsManager`), also cover (see the role table below):

```text
billing.budgets.create
billing.budgets.update
billing.accounts.updateUsageExportSpec
```

## Options / Props

### Predefined roles

| Role | ID | Level | Purpose |
|------|----|-------|---------|
| Billing Account Creator | `roles/billing.creator` | Organization | Create new self-serve (online) billing accounts. Needed to sign up with a credit card using a corporate identity. Keep the number of holders small. |
| Billing Account Administrator | `roles/billing.admin` | Organization or billing account | Owner role for a billing account (cannot create accounts): payment methods, payments profile, exports, cost info, manual payments, link/unlink projects, manage billing IAM. The account creator gets it by default. |
| Billing Account Costs Manager | `roles/billing.costsManager` | Organization or billing account | Create/edit/delete budgets, view cost info and transactions, manage BigQuery export. No pricing export / custom pricing, no linking projects. |
| Billing Account Viewer | `roles/billing.viewer` | Organization or billing account | Read access to cost and payment information (typical for finance teams). No linking/unlinking or property changes. |
| Project Billing Costs Manager | `roles/billing.projectCostsManager` | Organization or billing account | With project-level cost view permissions, scoped access to Reports, FinOps hub, Budgets and alerts, Anomalies for those projects. |
| Billing Account User | `roles/billing.user` | Organization or billing account | Link projects to billing accounts. Very restricted, can be granted broadly. With Project Creator: create new projects linked to the account. With Project Billing Manager: link/unlink projects. |
| Project Billing Manager | `roles/billing.projectManager` | Organization, folder, or project | With Billing Account User, attach a project to a billing account or disable its billing, without resource rights. |
| Carbon Footprint Viewer | `roles/billing.carbonViewer` | Billing account | `billing.accounts.get`, `billing.accounts.getCarbonInformation`, `billing.accounts.list`. |
| Account Hierarchy Manager | `roles/billing.linkAdmin` | Organization or billing account | Manage billing account hierarchy (`billing.accounts.create`, `move`, `removeFromOrganization` plus read permissions). |

### Key billing permissions per role (billing.* subset)

| Role | Notable permissions |
|------|---------------------|
| `roles/billing.admin` | `billing.accounts.close`, `reopen`, `move`, `removeFromOrganization`, `update`, `updatePaymentInfo`, `updateUsageExportSpec`, `setIamPolicy`, `getIamPolicy`, `redeemPromotion`; `billing.budgets.*` (incl. `configureSpendCap`); `billing.resourceAssociations.create/delete/list`; `billing.subscriptions.*`; `billing.anomalies.*`; `resourcemanager.projects.createBillingAssignment/deleteBillingAssignment/get/list`; plus recommender, logging, support, procurement permissions |
| `roles/billing.viewer` | `billing.accounts.get/getPaymentInfo/getPricing/getSpendingInformation/getUsageExportSpec/getCarbonInformation/getIamPolicy/list`, `billing.budgets.get/list`, `billing.credits.list`, `billing.resourceAssociations.list`, `billing.anomalies.get/list`, recommender read permissions |
| `roles/billing.costsManager` | `billing.accounts.get/getIamPolicy/getSpendingInformation/getUsageExportSpec/list/updateUsageExportSpec`, `billing.budgets.create/delete/get/list/update`, `billing.anomaliesConfigs.get/update`, `recommender.costInsights.*` |
| `roles/billing.projectCostsManager` | `billing.accounts.get`, `billing.accounts.getIamPolicy`, `billing.accounts.getSpendingInformationScoped`, `billing.costRecommendations.listScoped` |
| `roles/billing.user` | `billing.accounts.get/getIamPolicy/list/redeemPromotion`, `billing.credits.list`, `billing.resourceAssociations.create` |
| `roles/billing.projectManager` | `resourcemanager.projects.createBillingAssignment`, `resourcemanager.projects.deleteBillingAssignment` |
| `roles/billing.creator` | `billing.accounts.create`, `resourcemanager.organizations.get` |

### Example role assignments

| Scenario | Principal | Roles | Activities |
|----------|-----------|-------|------------|
| Centralized control | CEO | Billing Account Administrator | Manage payment instrument, view and approve invoices |
| Centralized control | CTO | Billing Account Administrator, Project Creator | Budget alerts, view spend, create billable projects |
| Delegated authority | CFO | Billing Account Administrator | Budget alerts, view spend |
| Delegated authority | Accounts payable | Billing Account Viewer | View and approve invoices |
| Delegated authority | Development teams | Billing Account User, Project Creator | Create new billable projects |
| Procurement / finance split | Financial planning | Billing Account Viewer | View reports, process exports |
| Development agency | Client | Project Billing Manager | Take payment ownership of a finished project |

## Notes

- Grant roles to principals, not raw permissions; one or more roles may be granted on the same resource.
- Set IAM policy at the organization level to apply it to all billing accounts, projects, and resources in the organization; resources inherit from their parent.
- Ownership vs payment linkage: ownership is IAM inheritance (organization is the IAM parent of its projects); payment linkage defines which billing account pays for a project. A billing account can pay for projects in other organizations, but inherits IAM only from its own parent organization.
- A billing account is not an IAM parent of its linked projects, so projects do not inherit permissions from the billing account.
- Legacy roles Project Owner / Editor / Viewer also confer some billing permissions (cost view on a project). Project Owner is a superset of Project Billing Manager.
- Roles `billing.admin`, `billing.costsManager`, `billing.viewer`, and `billing.projectManager` also include permissions for other Google Cloud services (the permission lists above are the billing-relevant subset).
- Each billing account needs at least one Billing Account Administrator; configure more than one for redundancy.
- Caution: `roles/billing.admin` is broad (close account, unlink projects, manage IAM); prefer narrower roles or a custom role where possible.
- Source: https://docs.cloud.google.com/billing/docs/how-to/billing-access
- Source: https://docs.cloud.google.com/billing/docs/access-control
- Fetched 2026-11-14. Content is CC BY 4.0; code samples are Apache 2.0.

## Related

- [managing-access.md](./managing-access.md)
- [audit-logging.md](./audit-logging.md)
- [../accounts/billing-concepts.md](../accounts/billing-concepts.md)
