---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/commercebusinessenablement
---

# Commerce Business Enablement IAM roles and permissions

## Signature / Usage

Predefined roles of `commercebusinessenablement` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

### Commerce Business Enablement Configuration Admin (`roles/commercebusinessenablement.admin`)

- Launch stage: Beta
- Admin of Various Provider Configuration resources
- Permissions (18): `bigquery.datasets.create`, `bigquery.datasets.get`, `bigquery.datasets.update`, `commercebusinessenablement.leadgenConfig.get`, `commercebusinessenablement.leadgenConfig.update`, `commercebusinessenablement.partnerAccounts.get`, `commercebusinessenablement.partnerAccounts.list`, `commercebusinessenablement.partnerInfo.get`, `commercebusinessenablement.resellerConfig.get`, `commercebusinessenablement.resellerConfig.update`, `commercebusinessenablement.resellerRestrictions.list`, `commercebusinessenablement.resellerRestrictions.update`, `resourcemanager.organizations.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `serviceusage.operations.get`, `serviceusage.services.enable`, `serviceusage.services.get`

### Commerce Business Enablement Configuration Viewer (`roles/commercebusinessenablement.viewer`)

- Launch stage: Beta
- Viewer of Various Provider Configuration resource
- Permissions (9): `commercebusinessenablement.leadgenConfig.get`, `commercebusinessenablement.partnerAccounts.get`, `commercebusinessenablement.partnerAccounts.list`, `commercebusinessenablement.partnerInfo.get`, `commercebusinessenablement.resellerConfig.get`, `commercebusinessenablement.resellerRestrictions.list`, `resourcemanager.organizations.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Commerce Business Enablement PaymentConfig Admin (`roles/commercebusinessenablement.paymentConfigAdmin`)

- Launch stage: Beta
- Administration of Payment Configuration resource
- Permissions (5): `commercebusinessenablement.partnerInfo.get`, `commercebusinessenablement.paymentConfig.get`, `commercebusinessenablement.paymentConfig.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Commerce Business Enablement PaymentConfig Viewer (`roles/commercebusinessenablement.paymentConfigViewer`)

- Launch stage: Beta
- Viewer of Payment Configuration resource
- Permissions (4): `commercebusinessenablement.partnerInfo.get`, `commercebusinessenablement.paymentConfig.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Commerce Business Enablement Rebates Admin (`roles/commercebusinessenablement.rebatesAdmin`)

- Launch stage: Beta
- Provides admin access to rebates
- Permissions (12): `commercebusinessenablement.operations.cancel`, `commercebusinessenablement.operations.delete`, `commercebusinessenablement.operations.get`, `commercebusinessenablement.operations.list`, `commercebusinessenablement.partnerInfo.get`, `commercebusinessenablement.refunds.cancel`, `commercebusinessenablement.refunds.create`, `commercebusinessenablement.refunds.delete`, `commercebusinessenablement.refunds.get`, `commercebusinessenablement.refunds.list`, `commercebusinessenablement.refunds.start`, `commercebusinessenablement.refunds.update`

### Commerce Business Enablement Rebates Viewer (`roles/commercebusinessenablement.rebatesViewer`)

- Launch stage: Beta
- Provides read-only access to rebates
- Permissions (5): `commercebusinessenablement.operations.get`, `commercebusinessenablement.operations.list`, `commercebusinessenablement.partnerInfo.get`, `commercebusinessenablement.refunds.get`, `commercebusinessenablement.refunds.list`

### Commerce Business Enablement Reseller Discount Admin (`roles/commercebusinessenablement.resellerDiscountAdmin`)

- Launch stage: Beta
- Provides admin access to reseller discount offers
- Permissions (18): `commercebusinessenablement.partnerAccounts.get`, `commercebusinessenablement.partnerAccounts.list`, `commercebusinessenablement.partnerInfo.get`, `commercebusinessenablement.resellerConfig.get`, `commercebusinessenablement.resellerDiscountConfig.get`, `commercebusinessenablement.resellerDiscountOffers.cancel`, `commercebusinessenablement.resellerDiscountOffers.create`, `commercebusinessenablement.resellerDiscountOffers.list`, `commercebusinessenablement.resellerPrivateOfferPlans.cancel`, `commercebusinessenablement.resellerPrivateOfferPlans.create`, `commercebusinessenablement.resellerPrivateOfferPlans.delete`, `commercebusinessenablement.resellerPrivateOfferPlans.get`, `commercebusinessenablement.resellerPrivateOfferPlans.list`, `commercebusinessenablement.resellerPrivateOfferPlans.publish`, `commercebusinessenablement.resellerPrivateOfferPlans.update`, `resourcemanager.organizations.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Commerce Business Enablement Reseller Discount Viewer (`roles/commercebusinessenablement.resellerDiscountViewer`)

- Launch stage: Beta
- Provides read-only access to reseller discount offers
- Permissions (11): `commercebusinessenablement.partnerAccounts.get`, `commercebusinessenablement.partnerAccounts.list`, `commercebusinessenablement.partnerInfo.get`, `commercebusinessenablement.resellerConfig.get`, `commercebusinessenablement.resellerDiscountConfig.get`, `commercebusinessenablement.resellerDiscountOffers.list`, `commercebusinessenablement.resellerPrivateOfferPlans.get`, `commercebusinessenablement.resellerPrivateOfferPlans.list`, `resourcemanager.organizations.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Project):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/commercebusinessenablement.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `commercebusinessenablement.leadgenConfig.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/commercebusinessenablement.admin`, `roles/commercebusinessenablement.viewer`, `roles/iam.supportUser` |
| `commercebusinessenablement.leadgenConfig.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commercebusinessenablement.admin` |
| `commercebusinessenablement.operations.cancel` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commercebusinessenablement.rebatesAdmin` |
| `commercebusinessenablement.operations.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commercebusinessenablement.rebatesAdmin` |
| `commercebusinessenablement.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/commercebusinessenablement.rebatesAdmin`, `roles/commercebusinessenablement.rebatesViewer`, `roles/iam.supportUser` |
| `commercebusinessenablement.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/commercebusinessenablement.rebatesAdmin`, `roles/commercebusinessenablement.rebatesViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `commercebusinessenablement.partnerAccounts.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/commercebusinessenablement.admin`, `roles/commercebusinessenablement.viewer`, `roles/commercebusinessenablement.resellerDiscountAdmin`, `roles/commercebusinessenablement.resellerDiscountViewer`, `roles/iam.supportUser` |
| `commercebusinessenablement.partnerAccounts.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/commercebusinessenablement.admin`, `roles/commercebusinessenablement.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/commercebusinessenablement.resellerDiscountAdmin`, `roles/commercebusinessenablement.resellerDiscountViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `commercebusinessenablement.partnerInfo.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/commercebusinessenablement.admin`, `roles/commercebusinessenablement.viewer`, `roles/commerceproducer.admin`, `roles/commerceproducer.viewer`, `roles/commercebusinessenablement.paymentConfigAdmin`, `roles/commercebusinessenablement.paymentConfigViewer`, `roles/commercebusinessenablement.rebatesAdmin`, `roles/commercebusinessenablement.rebatesViewer`, `roles/commercebusinessenablement.resellerDiscountAdmin`, `roles/commercebusinessenablement.resellerDiscountViewer`, `roles/iam.supportUser` |
| `commercebusinessenablement.paymentConfig.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/commercebusinessenablement.paymentConfigAdmin`, `roles/commercebusinessenablement.paymentConfigViewer`, `roles/iam.supportUser` |
| `commercebusinessenablement.paymentConfig.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commercebusinessenablement.paymentConfigAdmin` |
| `commercebusinessenablement.refunds.cancel` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commercebusinessenablement.rebatesAdmin` |
| `commercebusinessenablement.refunds.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commercebusinessenablement.rebatesAdmin` |
| `commercebusinessenablement.refunds.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commercebusinessenablement.rebatesAdmin` |
| `commercebusinessenablement.refunds.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/commercebusinessenablement.rebatesAdmin`, `roles/commercebusinessenablement.rebatesViewer`, `roles/iam.supportUser` |
| `commercebusinessenablement.refunds.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/commercebusinessenablement.rebatesAdmin`, `roles/commercebusinessenablement.rebatesViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `commercebusinessenablement.refunds.start` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commercebusinessenablement.rebatesAdmin` |
| `commercebusinessenablement.refunds.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commercebusinessenablement.rebatesAdmin` |
| `commercebusinessenablement.resellerConfig.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/commercebusinessenablement.admin`, `roles/commercebusinessenablement.viewer`, `roles/commercebusinessenablement.resellerDiscountAdmin`, `roles/commercebusinessenablement.resellerDiscountViewer`, `roles/iam.supportUser` |
| `commercebusinessenablement.resellerConfig.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commercebusinessenablement.admin` |
| `commercebusinessenablement.resellerDiscountConfig.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/commercebusinessenablement.resellerDiscountAdmin`, `roles/commercebusinessenablement.resellerDiscountViewer`, `roles/iam.supportUser` |
| `commercebusinessenablement.resellerDiscountOffers.cancel` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commercebusinessenablement.resellerDiscountAdmin` |
| `commercebusinessenablement.resellerDiscountOffers.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commercebusinessenablement.resellerDiscountAdmin` |
| `commercebusinessenablement.resellerDiscountOffers.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/commercebusinessenablement.resellerDiscountAdmin`, `roles/commercebusinessenablement.resellerDiscountViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `commercebusinessenablement.resellerPrivateOfferPlans.cancel` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commercebusinessenablement.resellerDiscountAdmin` |
| `commercebusinessenablement.resellerPrivateOfferPlans.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commercebusinessenablement.resellerDiscountAdmin` |
| `commercebusinessenablement.resellerPrivateOfferPlans.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commercebusinessenablement.resellerDiscountAdmin` |
| `commercebusinessenablement.resellerPrivateOfferPlans.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/commercebusinessenablement.resellerDiscountAdmin`, `roles/commercebusinessenablement.resellerDiscountViewer`, `roles/iam.supportUser` |
| `commercebusinessenablement.resellerPrivateOfferPlans.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/commercebusinessenablement.resellerDiscountAdmin`, `roles/commercebusinessenablement.resellerDiscountViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `commercebusinessenablement.resellerPrivateOfferPlans.publish` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commercebusinessenablement.resellerDiscountAdmin` |
| `commercebusinessenablement.resellerPrivateOfferPlans.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commercebusinessenablement.resellerDiscountAdmin` |
| `commercebusinessenablement.resellerRestrictions.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/commercebusinessenablement.admin`, `roles/commercebusinessenablement.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `commercebusinessenablement.resellerRestrictions.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/commercebusinessenablement.admin` |

## Notes

- Roles and permissions of the `commercebusinessenablement` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/commercebusinessenablement (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
