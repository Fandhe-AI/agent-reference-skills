---
source: https://docs.cloud.google.com/billing/docs/audit-logging
---

# Cloud Billing Audit Logging

Cloud Audit Logs for Cloud Billing record administrative and data-access operations on billing resources; query them in Logs Explorer by service name or method.

## Signature / Usage

In the Google Cloud console open Logs Explorer, paste the following into the Query field, and click Run query:

```text
protoPayload.serviceName="cloudbilling.googleapis.com"
```

Filter for a single method (pattern used for every method on the official page):

```text
protoPayload.methodName="SetIamPolicy"
```

## Options / Props

### Methods by permission type

| Permission type | Log category | Methods |
|-----------------|--------------|---------|
| `ADMIN_READ` | Data Access | `ListBillingAccountResources`, `GetIamPolicy` |
| `ADMIN_WRITE` | Admin Activity | `ActivateInstrumentlessBillingAccount`, `AssignResourceToBillingAccount`, `CloseBillingAccount`, `CreateSignupAssociationRecord`, `DisableResourceBilling`, `MigrateAccountSettings`, `MigrateBillableServices`, `ReopenBillingAccount`, `UpdateBillingAccountAnacomCvpNumber`, `UpdateBillingAccountCurrency`, `UpdateBillingAccountDisplayName`, `UpdateBillingAccountPurchaseOrderNumber`, `UpdateParentOrganization`, `UpdateResourceBillingProtection`, `UpgradeFreeTrial`, `CreateBillingAccount`, `SetIamPolicy` |
| `DATA_READ` | Data Access | `CheckReopenability`, `ListStateHistory`, `GetBillingAccount`, `ListBillingAccounts`, and the `Get*` / `List*` methods of `google.cloud.billing.billingaccountprices` (v1beta, v2beta), `billingaccountservices`, `billingaccountskugroups`, `billingaccountskugroupskus`, `billingaccountskus` (v1beta) |
| `OTHER` | n/a | `GetResourceBillingInfo`, `GetResourceBillingInfoBatch`, `GetProjectBillingInfo` (to enable these logs, enable `ADMIN_READ` under `cloudresourcemanager.googleapis.com`) |

### Selected methods

| Method | Log type | Permission |
|--------|----------|------------|
| `CreateBillingAccount` | Admin activity | `billing.accounts.create` ADMIN_WRITE |
| `GetBillingAccount` | Data access | `billing.accounts.get` DATA_READ |
| `GetIamPolicy` | Data access | `billing.accounts.getIamPolicy` ADMIN_READ |
| `GetProjectBillingInfo` | Data access | `resourcemanager.projects.get` ADMIN_READ |
| `ListBillingAccounts` | Data access | `billing.accounts.get`, `billing.accounts.list` DATA_READ |
| `SetIamPolicy` | Admin activity | `billing.accounts.setIamPolicy` ADMIN_WRITE |
| `google.cloud.billing.billingaccountprices.v1beta.BillingAccountPrices.GetBillingAccountPrice` | Data access | `billing.billingAccountPrice.get` DATA_READ |

## Notes

- Each IAM permission has a `type` (`ADMIN_READ`, `ADMIN_WRITE`, `DATA_READ`, `DATA_WRITE`); the audit log category depends on the type of permission the method needs.
- `DATA_READ`, `DATA_WRITE`, and `ADMIN_READ` produce Data Access logs; `ADMIN_WRITE` produces Admin Activity logs. Data Access logs generally must be enabled explicitly (see the Cloud Logging audit-log configuration docs).
- Long-running operations (LRO) usually produce two entries (start and end). None of the listed billing methods is an LRO or streaming operation in the per-method tables.
- The official page also documents the remaining `other` methods (for example `CloseBillingAccount`, `ReopenBillingAccount`) in the same format: method name, audit log type, permissions, LRO flag, and filter.
- Source: https://docs.cloud.google.com/billing/docs/audit-logging
- Fetched 2026-11-14. Content is CC BY 4.0; code samples are Apache 2.0.

## Related

- [iam-roles.md](./iam-roles.md)
- [managing-access.md](./managing-access.md)
