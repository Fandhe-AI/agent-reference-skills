---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/consumerprocurement
---

# Cloud Commerce Consumer Procurement IAM roles and permissions

## Signature / Usage

Predefined roles of `consumerprocurement` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

### Consumer Procurement Entitlement Manager (`roles/consumerprocurement.entitlementManager`)

- Allows managing entitlements and enabling, disabling, and inspecting service states for a consumer project.
- Permissions (29): `commerceoffercatalog.offers.get`, `consumerprocurement.consents.check`, `consumerprocurement.consents.grant`, `consumerprocurement.consents.list`, `consumerprocurement.consents.revoke`, `consumerprocurement.entitlements.get`, `consumerprocurement.entitlements.list`, `consumerprocurement.freeTrials.create`, `consumerprocurement.freeTrials.get`, `consumerprocurement.freeTrials.list`, `orgpolicy.policy.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `serviceusage.catalogs.listMembers`, `serviceusage.consumerpolicy.analyze`, `serviceusage.consumerpolicy.get`, `serviceusage.consumerpolicy.update`, `serviceusage.effectivepolicy.get`, `serviceusage.groups.list`, `serviceusage.groups.listExpandedMembers`, `serviceusage.groups.listMembers`, `serviceusage.operations.get`, `serviceusage.services.disable`, `serviceusage.services.enable`, `serviceusage.services.get`, `serviceusage.services.list`, `serviceusage.services.listApis`, `serviceusage.services.listDependentServices`, `serviceusage.values.test`

### Consumer Procurement Entitlement Viewer (`roles/consumerprocurement.entitlementViewer`)

- Allows inspecting entitlements and service states for a consumer project.
- Permissions (22): `commerceoffercatalog.offers.get`, `consumerprocurement.consents.check`, `consumerprocurement.consents.list`, `consumerprocurement.entitlements.get`, `consumerprocurement.entitlements.list`, `consumerprocurement.freeTrials.get`, `consumerprocurement.freeTrials.list`, `orgpolicy.policy.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `serviceusage.catalogs.listMembers`, `serviceusage.consumerpolicy.analyze`, `serviceusage.consumerpolicy.get`, `serviceusage.effectivepolicy.get`, `serviceusage.groups.list`, `serviceusage.groups.listExpandedMembers`, `serviceusage.groups.listMembers`, `serviceusage.services.get`, `serviceusage.services.list`, `serviceusage.services.listApis`, `serviceusage.services.listDependentServices`, `serviceusage.values.test`

### Consumer Procurement Events Viewer (`roles/consumerprocurement.eventsViewer`)

- Allows viewing key events for an offer
- Permissions (2): `consumerprocurement.events.get`, `consumerprocurement.events.list`

### Consumer Procurement License Pool Editor (`roles/consumerprocurement.licensePoolEditor`)

- Allows managing license pools and license assignments.
- Permissions (5): `consumerprocurement.licensePools.assign`, `consumerprocurement.licensePools.enumerateLicensedUsers`, `consumerprocurement.licensePools.get`, `consumerprocurement.licensePools.unassign`, `consumerprocurement.licensePools.update`

### Consumer Procurement License Pool Viewer (`roles/consumerprocurement.licensePoolViewer`)

- Allows viewing license pools and license assignments.
- Permissions (2): `consumerprocurement.licensePools.enumerateLicensedUsers`, `consumerprocurement.licensePools.get`

### Consumer Procurement Order Administrator (`roles/consumerprocurement.orderAdmin`)

- Allows managing purchases.
- Permissions (38): `billing.accounts.get`, `billing.accounts.getIamPolicy`, `billing.accounts.list`, `billing.accounts.redeemPromotion`, `billing.credits.list`, `billing.resourceAssociations.create`, `commerceoffercatalog.agreements.get`, `commerceoffercatalog.agreements.list`, `commerceoffercatalog.documents.get`, `commerceoffercatalog.documents.list`, `commerceoffercatalog.offers.get`, `consumerprocurement.accounts.create`, `consumerprocurement.accounts.delete`, `consumerprocurement.accounts.get`, `consumerprocurement.accounts.list`, `consumerprocurement.consents.check`, `consumerprocurement.consents.grant`, `consumerprocurement.consents.list`, `consumerprocurement.consents.revoke`, `consumerprocurement.events.get`, `consumerprocurement.events.list`, `consumerprocurement.licensePools.assign`, `consumerprocurement.licensePools.enumerateLicensedUsers`, `consumerprocurement.licensePools.get`, `consumerprocurement.licensePools.unassign`, `consumerprocurement.licensePools.update`, `consumerprocurement.orderAttributions.get`, `consumerprocurement.orderAttributions.list`, `consumerprocurement.orderAttributions.update`, `consumerprocurement.orders.cancel`, `consumerprocurement.orders.get`, `consumerprocurement.orders.list`, `consumerprocurement.orders.modify`, `consumerprocurement.orders.place`, `discoveryengine.billingAccountLicenseConfigs.distribute`, `discoveryengine.billingAccountLicenseConfigs.get`, `discoveryengine.billingAccountLicenseConfigs.list`, `discoveryengine.billingAccountLicenseConfigs.retract`

### Consumer Procurement Order Viewer (`roles/consumerprocurement.orderViewer`)

- Allows inspecting purchases.
- Permissions (21): `billing.accounts.get`, `billing.accounts.getIamPolicy`, `billing.accounts.list`, `billing.credits.list`, `commerceoffercatalog.agreements.get`, `commerceoffercatalog.agreements.list`, `commerceoffercatalog.documents.get`, `commerceoffercatalog.documents.list`, `commerceoffercatalog.offers.get`, `consumerprocurement.accounts.get`, `consumerprocurement.accounts.list`, `consumerprocurement.consents.check`, `consumerprocurement.consents.list`, `consumerprocurement.licensePools.enumerateLicensedUsers`, `consumerprocurement.licensePools.get`, `consumerprocurement.orderAttributions.get`, `consumerprocurement.orderAttributions.list`, `consumerprocurement.orders.get`, `consumerprocurement.orders.list`, `discoveryengine.billingAccountLicenseConfigs.get`, `discoveryengine.billingAccountLicenseConfigs.list`

### Consumer Procurement Administrator (`roles/consumerprocurement.procurementAdmin`)

- Allows managing purchases, consents at both billing account and project level.
- Permissions (63): `billing.accounts.get`, `billing.accounts.getIamPolicy`, `billing.accounts.list`, `billing.accounts.redeemPromotion`, `billing.credits.list`, `billing.resourceAssociations.create`, `commerceoffercatalog.agreements.get`, `commerceoffercatalog.agreements.list`, `commerceoffercatalog.documents.get`, `commerceoffercatalog.documents.list`, `commerceoffercatalog.offers.get`, `consumerprocurement.accounts.create`, `consumerprocurement.accounts.delete`, `consumerprocurement.accounts.get`, `consumerprocurement.accounts.list`, `consumerprocurement.consents.allowProjectGrant`, `consumerprocurement.consents.check`, `consumerprocurement.consents.grant`, `consumerprocurement.consents.list`, `consumerprocurement.consents.revoke`, `consumerprocurement.entitlements.get`, `consumerprocurement.entitlements.list`, `consumerprocurement.events.get`, `consumerprocurement.events.list`, `consumerprocurement.freeTrials.create`, `consumerprocurement.freeTrials.get`, `consumerprocurement.freeTrials.list`, `consumerprocurement.licensePools.assign`, `consumerprocurement.licensePools.enumerateLicensedUsers`, `consumerprocurement.licensePools.get`, `consumerprocurement.licensePools.unassign`, `consumerprocurement.licensePools.update`, `consumerprocurement.orderAttributions.get`, `consumerprocurement.orderAttributions.list`, `consumerprocurement.orderAttributions.update`, `consumerprocurement.orders.cancel`, `consumerprocurement.orders.get`, `consumerprocurement.orders.list`, `consumerprocurement.orders.modify`, `consumerprocurement.orders.place`, `discoveryengine.billingAccountLicenseConfigs.distribute`, `discoveryengine.billingAccountLicenseConfigs.get`, `discoveryengine.billingAccountLicenseConfigs.list`, `discoveryengine.billingAccountLicenseConfigs.retract`, `orgpolicy.policy.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `serviceusage.catalogs.listMembers`, `serviceusage.consumerpolicy.analyze`, `serviceusage.consumerpolicy.get`, `serviceusage.consumerpolicy.update`, `serviceusage.effectivepolicy.get`, `serviceusage.groups.list`, `serviceusage.groups.listExpandedMembers`, `serviceusage.groups.listMembers`, `serviceusage.operations.get`, `serviceusage.services.disable`, `serviceusage.services.enable`, `serviceusage.services.get`, `serviceusage.services.list`, `serviceusage.services.listApis`, `serviceusage.services.listDependentServices`, `serviceusage.values.test`

### Consumer Procurement Viewer (`roles/consumerprocurement.procurementViewer`)

- Allows inspecting purchases, consents and entitlements and service states for a consumer project.
- Permissions (40): `billing.accounts.get`, `billing.accounts.getIamPolicy`, `billing.accounts.list`, `billing.credits.list`, `commerceoffercatalog.agreements.get`, `commerceoffercatalog.agreements.list`, `commerceoffercatalog.documents.get`, `commerceoffercatalog.documents.list`, `commerceoffercatalog.offers.get`, `consumerprocurement.accounts.get`, `consumerprocurement.accounts.list`, `consumerprocurement.consents.check`, `consumerprocurement.consents.list`, `consumerprocurement.entitlements.get`, `consumerprocurement.entitlements.list`, `consumerprocurement.freeTrials.get`, `consumerprocurement.freeTrials.list`, `consumerprocurement.licensePools.enumerateLicensedUsers`, `consumerprocurement.licensePools.get`, `consumerprocurement.orderAttributions.get`, `consumerprocurement.orderAttributions.list`, `consumerprocurement.orders.get`, `consumerprocurement.orders.list`, `discoveryengine.billingAccountLicenseConfigs.get`, `discoveryengine.billingAccountLicenseConfigs.list`, `orgpolicy.policy.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `serviceusage.catalogs.listMembers`, `serviceusage.consumerpolicy.analyze`, `serviceusage.consumerpolicy.get`, `serviceusage.effectivepolicy.get`, `serviceusage.groups.list`, `serviceusage.groups.listExpandedMembers`, `serviceusage.groups.listMembers`, `serviceusage.services.get`, `serviceusage.services.list`, `serviceusage.services.listApis`, `serviceusage.services.listDependentServices`, `serviceusage.values.test`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Project):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/consumerprocurement.entitlementManager"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `consumerprocurement.accounts.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/billing.admin`, `roles/consumerprocurement.orderAdmin`, `roles/consumerprocurement.procurementAdmin` |
| `consumerprocurement.accounts.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/billing.admin`, `roles/consumerprocurement.orderAdmin`, `roles/consumerprocurement.procurementAdmin` |
| `consumerprocurement.accounts.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/billing.admin`, `roles/billing.viewer`, `roles/billing.linkAdmin`, `roles/consumerprocurement.orderAdmin`, `roles/consumerprocurement.orderViewer`, `roles/consumerprocurement.procurementAdmin`, `roles/consumerprocurement.procurementViewer`, `roles/iam.supportUser` |
| `consumerprocurement.accounts.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/billing.admin`, `roles/billing.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/billing.linkAdmin`, `roles/consumerprocurement.orderAdmin`, `roles/consumerprocurement.orderViewer`, `roles/consumerprocurement.procurementAdmin`, `roles/consumerprocurement.procurementViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `consumerprocurement.consents.allowProjectGrant` | `roles/admin`, `roles/owner`, `roles/consumerprocurement.procurementAdmin` |
| `consumerprocurement.consents.check` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/billing.admin`, `roles/billing.viewer`, `roles/billing.linkAdmin`, `roles/consumerprocurement.entitlementManager`, `roles/consumerprocurement.entitlementViewer`, `roles/consumerprocurement.orderAdmin`, `roles/consumerprocurement.orderViewer`, `roles/consumerprocurement.procurementAdmin`, `roles/consumerprocurement.procurementViewer`, `roles/iam.supportUser` |
| `consumerprocurement.consents.grant` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/billing.admin`, `roles/consumerprocurement.entitlementManager`, `roles/consumerprocurement.orderAdmin`, `roles/consumerprocurement.procurementAdmin` |
| `consumerprocurement.consents.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/billing.admin`, `roles/billing.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/billing.linkAdmin`, `roles/consumerprocurement.entitlementManager`, `roles/consumerprocurement.entitlementViewer`, `roles/consumerprocurement.orderAdmin`, `roles/consumerprocurement.orderViewer`, `roles/consumerprocurement.procurementAdmin`, `roles/consumerprocurement.procurementViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `consumerprocurement.consents.revoke` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/billing.admin`, `roles/consumerprocurement.entitlementManager`, `roles/consumerprocurement.orderAdmin`, `roles/consumerprocurement.procurementAdmin` |
| `consumerprocurement.entitlements.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/commerceorggovernance.admin`, `roles/commerceorggovernance.viewer`, `roles/discoveryengine.admin`, `roles/commerceorggovernance.user`, `roles/consumerprocurement.entitlementManager`, `roles/consumerprocurement.entitlementViewer`, `roles/consumerprocurement.procurementAdmin`, `roles/consumerprocurement.procurementViewer`, `roles/discoveryengine.agentspaceAdmin`, `roles/iam.supportUser` |
| `consumerprocurement.entitlements.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/commerceorggovernance.admin`, `roles/commerceorggovernance.viewer`, `roles/discoveryengine.admin`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/commerceorggovernance.user`, `roles/consumerprocurement.entitlementManager`, `roles/consumerprocurement.entitlementViewer`, `roles/consumerprocurement.procurementAdmin`, `roles/consumerprocurement.procurementViewer`, `roles/discoveryengine.agentspaceAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+1 service agent role) |
| `consumerprocurement.events.get` | `roles/admin`, `roles/owner`, `roles/billing.admin`, `roles/consumerprocurement.eventsViewer`, `roles/consumerprocurement.orderAdmin`, `roles/consumerprocurement.procurementAdmin` |
| `consumerprocurement.events.list` | `roles/admin`, `roles/owner`, `roles/billing.admin`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/consumerprocurement.eventsViewer`, `roles/consumerprocurement.orderAdmin`, `roles/consumerprocurement.procurementAdmin`, `roles/iam.securityAuditor` |
| `consumerprocurement.freeTrials.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/consumerprocurement.entitlementManager`, `roles/consumerprocurement.procurementAdmin` |
| `consumerprocurement.freeTrials.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/consumerprocurement.entitlementManager`, `roles/consumerprocurement.entitlementViewer`, `roles/consumerprocurement.procurementAdmin`, `roles/consumerprocurement.procurementViewer`, `roles/iam.supportUser` |
| `consumerprocurement.freeTrials.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/consumerprocurement.entitlementManager`, `roles/consumerprocurement.entitlementViewer`, `roles/consumerprocurement.procurementAdmin`, `roles/consumerprocurement.procurementViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `consumerprocurement.licensePools.assign` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/billing.admin`, `roles/consumerprocurement.licensePoolEditor`, `roles/consumerprocurement.orderAdmin`, `roles/consumerprocurement.procurementAdmin` |
| `consumerprocurement.licensePools.enumerateLicensedUsers` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/billing.admin`, `roles/consumerprocurement.licensePoolEditor`, `roles/consumerprocurement.licensePoolViewer`, `roles/consumerprocurement.orderAdmin`, `roles/consumerprocurement.orderViewer`, `roles/consumerprocurement.procurementAdmin`, `roles/consumerprocurement.procurementViewer`, `roles/iam.supportUser` |
| `consumerprocurement.licensePools.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/billing.admin`, `roles/consumerprocurement.licensePoolEditor`, `roles/consumerprocurement.licensePoolViewer`, `roles/consumerprocurement.orderAdmin`, `roles/consumerprocurement.orderViewer`, `roles/consumerprocurement.procurementAdmin`, `roles/consumerprocurement.procurementViewer`, `roles/iam.supportUser` |
| `consumerprocurement.licensePools.unassign` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/billing.admin`, `roles/consumerprocurement.licensePoolEditor`, `roles/consumerprocurement.orderAdmin`, `roles/consumerprocurement.procurementAdmin` |
| `consumerprocurement.licensePools.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/billing.admin`, `roles/consumerprocurement.licensePoolEditor`, `roles/consumerprocurement.orderAdmin`, `roles/consumerprocurement.procurementAdmin` |
| `consumerprocurement.orderAttributions.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/billing.admin`, `roles/billing.viewer`, `roles/billing.linkAdmin`, `roles/consumerprocurement.orderAdmin`, `roles/consumerprocurement.orderViewer`, `roles/consumerprocurement.procurementAdmin`, `roles/consumerprocurement.procurementViewer`, `roles/iam.supportUser` |
| `consumerprocurement.orderAttributions.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/billing.admin`, `roles/billing.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/billing.linkAdmin`, `roles/consumerprocurement.orderAdmin`, `roles/consumerprocurement.orderViewer`, `roles/consumerprocurement.procurementAdmin`, `roles/consumerprocurement.procurementViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `consumerprocurement.orderAttributions.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/billing.admin`, `roles/consumerprocurement.orderAdmin`, `roles/consumerprocurement.procurementAdmin` |
| `consumerprocurement.orders.cancel` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/billing.admin`, `roles/consumerprocurement.orderAdmin`, `roles/consumerprocurement.procurementAdmin` |
| `consumerprocurement.orders.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/billing.admin`, `roles/billing.viewer`, `roles/billing.linkAdmin`, `roles/consumerprocurement.orderAdmin`, `roles/consumerprocurement.orderViewer`, `roles/consumerprocurement.procurementAdmin`, `roles/consumerprocurement.procurementViewer`, `roles/iam.supportUser` |
| `consumerprocurement.orders.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/billing.admin`, `roles/billing.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/billing.linkAdmin`, `roles/consumerprocurement.orderAdmin`, `roles/consumerprocurement.orderViewer`, `roles/consumerprocurement.procurementAdmin`, `roles/consumerprocurement.procurementViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `consumerprocurement.orders.modify` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/billing.admin`, `roles/consumerprocurement.orderAdmin`, `roles/consumerprocurement.procurementAdmin` |
| `consumerprocurement.orders.place` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/billing.admin`, `roles/consumerprocurement.orderAdmin`, `roles/consumerprocurement.procurementAdmin` |

## Notes

- Roles and permissions of the `consumerprocurement` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/consumerprocurement (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
