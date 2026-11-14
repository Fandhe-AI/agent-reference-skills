---
source: https://docs.cloud.google.com/billing/docs/how-to/grant-access-to-billing
---

# Manage Access and Custom Roles for Cloud Billing

How to add, edit, and revoke Cloud Billing account permissions, how Google payments users relate, and how to build custom billing roles from fine-grained permissions.

## Signature / Usage

Required permissions to manage user permissions on a Cloud Billing account (on the billing account):

- `billing.accounts.getIamPolicy`: view roles on the account, including associated usernames.
- `billing.accounts.setIamPolicy`: grant roles to principals. Predefined role that includes both: Billing Account Administrator.

Console procedure:

1. Open Billing > Manage billing accounts, or Account management for the account.
2. Select the account row and open the info panel (Show info panel) to see Principals and Permissions.
3. Add: Add principal, enter email addresses (individuals, service accounts, Google Groups), Select a role, optionally Add another role, Save.
4. Edit: Filter, locate the principal, Edit, change roles, Save.
5. Revoke: locate the principal, Delete, confirm. This revokes a single role only.

Custom role example: a "Cost Management Administrator" role with only these three permissions, combined with Billing Account Viewer (snippet below is the permission list from the official page):

```text
billing.budgets.create
billing.budgets.update
billing.accounts.updateUsageExportSpec
```

## Options / Props

### Billing permissions by activity

| Activity | Permission | Resource |
|----------|------------|----------|
| Get basic account info | `billing.accounts.get` | Billing account |
| Upgrade from free trial / rename / change purchase order number | `billing.accounts.update` | Billing account |
| Close / reopen account | `billing.accounts.close` / `billing.accounts.reopen` | Billing account |
| List / create accounts in organization | `billing.accounts.list` / `billing.accounts.create` | Organization |
| Move account into organization | `billing.accounts.create` (organization), `billing.accounts.move` (billing account) | Organization, billing account |
| Move account between organizations | `billing.accounts.removeFromOrganization` (old org), `billing.accounts.create` (new org), `billing.accounts.move` (account) | Orgs, account |
| View costs for a billing account (all projects) | `billing.accounts.getSpendingInformation` | Billing account |
| View costs for a project | `billing.resourceCosts.get` + `resourcemanager.projects.get` | Project |
| View / update payment profile | `billing.accounts.getPaymentInfo` / `billing.accounts.updatePaymentInfo` | Billing account |
| View prices for SKUs with usage, custom contract prices | `billing.accounts.getPricing` | Billing account |
| View project associations | `billing.resourceAssociations.list` (account) + `resourcemanager.projects.get` (project) | Both |
| Associate project with billing account | `billing.resourceAssociations.create` (account); `serviceusage.services.list`, `serviceusage.effectivepolicy.get`, `resourcemanager.projects.createBillingAssignment` (project) | Both |
| Remove project from billing account | `billing.resourceAssociations.delete` (account) + `resourcemanager.projects.deleteBillingAssignment` (project) | Both |
| Budgets on an account: get/list/update/create/delete | `billing.budgets.get`, `.list`, `.update`, `.create`, `.delete` | Billing account |
| Configure, edit, lift a spend cap budget on a project in an account | `billing.budgets.configureSpendCap` | Billing account |
| Project-scoped budget: view | `resourcemanager.projects.get`, `billing.resourceCosts.get`, `billing.resourcebudgets.read` | Project |
| Project-scoped budget: create/update | the three above plus `billing.resourcebudgets.write` | Project |
| Project-scoped spend cap budget | the four above plus `billing.resourcebudgets.configureSpendCap` | Project |
| View credits | `billing.credits.list` | Billing account |
| Redeem a promotional code | `billing.accounts.redeemPromotion` + `billing.accounts.update` | Billing account |
| View / give roles on account | `billing.accounts.getIamPolicy` / `billing.accounts.setIamPolicy` | Billing account |
| View / modify export specification | `billing.accounts.getUsageExportSpec` / `billing.accounts.updateUsageExportSpec` | Billing account |

## Notes

- Changing Cloud Billing access permissions is a sensitive action; you may need to reauthenticate.
- Each billing account needs at least one Billing Account Administrator (the creator by default); configure more than one for redundancy.
- Principals can be individuals, service accounts, or Google Groups; multiple roles can be granted to one principal.
- Custom roles are created on the organization and then applied to any billing account in the organization. When creating the role you are prompted for Project or Organization: you must select Organization, because project roles cannot be applied to billing accounts.
- Most billing permissions belong on the billing account; some belong on a project. Associating a project with a billing account needs `billing.resourceAssociations.create` on the account AND `resourcemanager.projects.createBillingAssignment` on the project. Moving a project between billing accounts needs the same permissions as removing it and re-associating it.
- Billing permissions inherit from higher levels (for example `billing.accounts.close` on an organization closes any account in it). Some permissions only apply at higher levels: `billing.accounts.list` does nothing on a single account but lists all accounts when granted on the organization.
- Most billing actions require `billing.accounts.get`; consider including it for everyone with billing access.
- A user with `billing.accounts.getSpendingInformation` or billing-account budget permissions sees/manages all projects of the account. To restrict to specific projects, grant the project-level permissions instead of account-level ones.
- Google payments permissions are separate: each Google payments account needs at least one Admin with all permissions and one Primary Contact (both default to the creator). Users with `billing.accounts.updatePaymentInfo` (Billing Account Administrator or a custom role) can edit the payments profile from the Cloud Billing console without separate payments permissions.
- Source: https://docs.cloud.google.com/billing/docs/how-to/grant-access-to-billing
- Source: https://docs.cloud.google.com/billing/docs/how-to/custom-roles
- Fetched 2026-11-14. Content is CC BY 4.0; code samples are Apache 2.0.

## Related

- [iam-roles.md](./iam-roles.md)
- [audit-logging.md](./audit-logging.md)
- [../accounts/billing-concepts.md](../accounts/billing-concepts.md)
