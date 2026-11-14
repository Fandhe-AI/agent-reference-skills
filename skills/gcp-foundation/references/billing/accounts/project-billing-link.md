---
source: https://docs.cloud.google.com/billing/docs/how-to/modify-project
---

# Project Billing Link: Check, Enable, Change, Disable, Lock

Verify billing status of a project, link or change its billing account, disable billing, and lock the link.

## Signature / Usage

Check whether billing is enabled (commands from https://docs.cloud.google.com/billing/docs/how-to/verify-billing-enabled):

```text
gcloud beta billing projects describe PROJECT_ID
```

Billing is enabled if both `billingAccountName` is set and `billingEnabled: true`:

```text
  billingAccountName: billingAccounts/0X0X0X-0X0X0X-0X0X0X
  billingEnabled: true
  name: projects/my-project/billingInfo
  projectId: my-project
```

A name with `billingEnabled: false` means the account is inactive; a blank name means no billing account is linked:

```text
  billingAccountName: ''
  billingEnabled: false
  name: projects/my-project/billingInfo
  projectId: my-project
```

Check the billing account itself (`open: true` means active; `masterBillingAccount` set means it is a subaccount):

```text
gcloud beta billing accounts describe ACCOUNT_ID
```

Console flows (Billing > My projects, or Account management for an account): project row Actions menu > Change billing (choose account, Set account) / Disable billing / Lock billing / Unlock billing.

## Options / Props

### Permissions (project AND billing account)

| Task | On the project | On the billing account |
|------|----------------|------------------------|
| Change account (unlink + link) | Project Billing Manager + Project Browser + Service Usage Viewer, or Project Owner | Billing Account User + Billing Account Viewer, or Billing Account Administrator (current and target) |
| Enable billing | same as above | target account: same as above |
| Disable billing | Project Billing Manager + Project Browser, or Project Owner | Billing Account Viewer or Billing Account Administrator |
| Lock link | Project Billing Manager + Project Browser, or Project Owner | Billing Account User + Billing Account Viewer, or Billing Account Administrator |
| Unlock link | Project Billing Manager + Project Browser, or Project Owner | or Billing Account Administrator |

Permission mapping: view associations = `billing.resourceAssociations.list` (account) + `resourcemanager.projects.get` (project); unlink = `billing.resourceAssociations.delete` (account) OR `resourcemanager.projects.deleteBillingAssignment` (project); link = `billing.resourceAssociations.create` (account) AND `serviceusage.services.list`, `serviceusage.effectivepolicy.get`, `resourcemanager.projects.createBillingAssignment` (project). With an Organization, Billing Account Administrator at organization level suffices.

### Project creation platform vs billing

| Platform | Billing account linked on creation? |
|----------|-------------------------------------|
| Google Cloud console | Yes (prompted; auto-linked when only one account) |
| Firebase console | No (Spark plan) |
| Google AI Studio | No (Free tier) |

## Notes

- Billing is enabled only if the project is linked to an active billing account in good standing (not closed or suspended). Billing becomes disabled when unlinked, when the account is closed or suspended, or when a deleted project is restored within the 30-day window.
- Changing accounts should not interrupt service. Charges incurred before the move bill to the former account (up to two days to appear in transaction history); for example moving on May 15 bills May 1-15 to the old account and May 16-31 to the new one.
- Effects of moving a project: resource-based CUDs apply only to the destination account from midnight US/Canadian Pacific Standard Time (UTC-8), and only within that project unless the destination has CUD sharing enabled; prioritized attribution may need updating. Costs owned by the account rather than a project (for example Support) appear under "[Charges not specific to a project]" in the Cost table / Reports. Marketplace purchases must be transferred before migrating. Cloud Armor Enterprise Annual reverts to Standard if the new account is not subscribed. AI Studio may require configuring a Prepay account.
- Do not move a project to another customer's billing account (or share yours) to reduce fees; it may violate Google Cloud terms.
- Disabling billing: cannot disable if the project has active or pending CUDs; all Google Cloud and Maps services stop and some resources may be removed and unrecoverable (back up data); disabling billing on a Shared VPC host project shuts down dependent services in all service projects; Firebase downgrades from Blaze to Spark; AI Studio drops to the Free tier. You remain responsible for outstanding charges. If your account permissions are limited you may be unable to re-enable billing later.
- Re-enabling billing: resources may take up to 24 hours to start, some services need manual restart. For a recently restored project, linking can fail with `resourcemanager.projects.createBillingAssignment` missing; retry after about 10 minutes, rarely up to 36 hours.
- Locking prevents accidental relink or unlink (two-step process; a padlock icon shows in the project list) but does not guarantee billing stays enabled if the account is closed or suspended. Lock and unlock are sensitive actions and may require reauthentication.
- Source: https://docs.cloud.google.com/billing/docs/how-to/modify-project
- Source: https://docs.cloud.google.com/billing/docs/how-to/verify-billing-enabled
- Source: https://docs.cloud.google.com/billing/docs/how-to/secure-project-billing-account-link
- Fetched 2026-11-14. Content is CC BY 4.0; code samples are Apache 2.0.

## Related

- [account-lifecycle.md](./account-lifecycle.md)
- [billing-concepts.md](./billing-concepts.md)
- [../access/managing-access.md](../access/managing-access.md)
