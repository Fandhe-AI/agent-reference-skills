---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/billing
---

# Cloud Billing IAM roles and permissions

## Signature / Usage

Predefined roles of `billing` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

### Billing Account Administrator (`roles/billing.admin`)

- Provides access to see and manage all aspects of billing accounts. Lowest-level resources where you can grant this role: - Billing Account
- Permissions (145): `billing.accounts.close`, `billing.accounts.get`, `billing.accounts.getCarbonInformation`, `billing.accounts.getIamPolicy`, `billing.accounts.getPaymentInfo`, `billing.accounts.getPricing`, `billing.accounts.getSpendingInformation`, `billing.accounts.getUsageExportSpec`, `billing.accounts.list`, `billing.accounts.move`, `billing.accounts.redeemPromotion`, `billing.accounts.removeFromOrganization`, `billing.accounts.reopen`, `billing.accounts.setIamPolicy`, `billing.accounts.update`, `billing.accounts.updatePaymentInfo`, `billing.accounts.updateUsageExportSpec`, `billing.anomalies.get`, `billing.anomalies.list`, `billing.anomalies.submitFeedback`, `billing.anomaliesConfigs.get`, `billing.anomaliesConfigs.update`, `billing.billingAccountPrice.get`, `billing.billingAccountPrices.list`, `billing.billingAccountServices.get`, `billing.billingAccountServices.list`, `billing.billingAccountSkuGroupSkus.get`, `billing.billingAccountSkuGroupSkus.list`, `billing.billingAccountSkuGroups.get`, `billing.billingAccountSkuGroups.list`, `billing.billingAccountSkus.get`, `billing.billingAccountSkus.list`, `billing.budgets.configureSpendCap`, `billing.budgets.create`, `billing.budgets.delete`, `billing.budgets.get`, `billing.budgets.list`, `billing.budgets.update`, `billing.credits.list`, `billing.finOpsBenchmarkInformation.get`, `billing.finOpsHealthInformation.get`, `billing.resourceAssociations.create`, `billing.resourceAssociations.delete`, `billing.resourceAssociations.list`, `billing.subscriptions.create`, `billing.subscriptions.get`, `billing.subscriptions.list`, `billing.subscriptions.update`, `chroniclesm.contracts.get`, `chroniclesm.contracts.update`, `cloudasset.assets.searchAllResources`, `cloudnotifications.activities.list`, `cloudsupport.properties.get`, `cloudsupport.techCases.create`, `cloudsupport.techCases.escalate`, `cloudsupport.techCases.get`, `cloudsupport.techCases.list`, `cloudsupport.techCases.update`, `commerceoffercatalog.agreements.get`, `commerceoffercatalog.agreements.list`, `commerceoffercatalog.documents.get`, `commerceoffercatalog.documents.list`, `commerceoffercatalog.offers.get`, `compute.commitments.create`, `compute.commitments.get`, `compute.commitments.list`, `compute.commitments.update`, `compute.commitments.updateReservations`, `consumerprocurement.accounts.create`, `consumerprocurement.accounts.delete`, `consumerprocurement.accounts.get`, `consumerprocurement.accounts.list`, `consumerprocurement.consents.check`, `consumerprocurement.consents.grant`, `consumerprocurement.consents.list`, `consumerprocurement.consents.revoke`, `consumerprocurement.events.get`, `consumerprocurement.events.list`, `consumerprocurement.licensePools.assign`, `consumerprocurement.licensePools.enumerateLicensedUsers`, `consumerprocurement.licensePools.get`, `consumerprocurement.licensePools.unassign`, `consumerprocurement.licensePools.update`, `consumerprocurement.orderAttributions.get`, `consumerprocurement.orderAttributions.list`, `consumerprocurement.orderAttributions.update`, `consumerprocurement.orders.cancel`, `consumerprocurement.orders.get`, `consumerprocurement.orders.list`, `consumerprocurement.orders.modify`, `consumerprocurement.orders.place`, `dataprocessing.datasources.get`, `dataprocessing.datasources.list`, `dataprocessing.groupcontrols.get`, `dataprocessing.groupcontrols.list`, `discoveryengine.billingAccountLicenseConfigs.distribute`, `discoveryengine.billingAccountLicenseConfigs.get`, `discoveryengine.billingAccountLicenseConfigs.list`, `discoveryengine.billingAccountLicenseConfigs.retract`, `logging.logEntries.list`, `logging.logServiceIndexes.list`, `logging.logServices.list`, `logging.logs.list`, `logging.privateLogEntries.list`, `recommender.cloudsqlIdleInstanceRecommendations.get`, `recommender.cloudsqlIdleInstanceRecommendations.list`, `recommender.cloudsqlOverprovisionedInstanceRecommendations.get`, `recommender.cloudsqlOverprovisionedInstanceRecommendations.list`, `recommender.commitmentUtilizationInsights.get`, `recommender.commitmentUtilizationInsights.list`, `recommender.commitmentUtilizationInsights.update`, `recommender.computeAddressIdleResourceRecommendations.get`, `recommender.computeAddressIdleResourceRecommendations.list`, `recommender.computeDiskIdleResourceRecommendations.get`, `recommender.computeDiskIdleResourceRecommendations.list`, `recommender.computeImageIdleResourceRecommendations.get`, `recommender.computeImageIdleResourceRecommendations.list`, `recommender.computeInstanceGroupManagerMachineTypeRecommendations.get`, `recommender.computeInstanceGroupManagerMachineTypeRecommendations.list`, `recommender.computeInstanceIdleResourceRecommendations.get`, `recommender.computeInstanceIdleResourceRecommendations.list`, `recommender.computeInstanceMachineTypeRecommendations.get`, `recommender.computeInstanceMachineTypeRecommendations.list`, `recommender.costInsights.get`, `recommender.costInsights.list`, `recommender.costInsights.update`, `recommender.costRecommendations.listAll`, `recommender.costRecommendations.summarizeAll`, `recommender.resourcemanagerProjectUtilizationRecommendations.get`, `recommender.resourcemanagerProjectUtilizationRecommendations.list`, `recommender.spendBasedCommitmentInsights.get`, `recommender.spendBasedCommitmentInsights.list`, `recommender.spendBasedCommitmentInsights.update`, `recommender.spendBasedCommitmentRecommendations.get`, `recommender.spendBasedCommitmentRecommendations.list`, `recommender.spendBasedCommitmentRecommendations.update`, `recommender.spendBasedCommitmentRecommenderConfig.get`, `recommender.spendBasedCommitmentRecommenderConfig.update`, `recommender.usageCommitmentRecommendations.get`, `recommender.usageCommitmentRecommendations.list`, `recommender.usageCommitmentRecommendations.update`, `resourcemanager.projects.createBillingAssignment`, `resourcemanager.projects.deleteBillingAssignment`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Project Billing Manager (`roles/billing.projectManager`)

- When granted in conjunction with the Billing Account User role, provides access to assign a project's billing account or disable its billing. Lowest-level resources where you can grant this role: - Project
- Permissions (2): `resourcemanager.projects.createBillingAssignment`, `resourcemanager.projects.deleteBillingAssignment`

### Billing Account Viewer (`roles/billing.viewer`)

- View billing account cost and pricing information, transactions, and billing and commitment recommendations. Lowest-level resources where you can grant this role: - Billing Account
- Permissions (62): `billing.accounts.get`, `billing.accounts.getCarbonInformation`, `billing.accounts.getIamPolicy`, `billing.accounts.getPaymentInfo`, `billing.accounts.getPricing`, `billing.accounts.getSpendingInformation`, `billing.accounts.getUsageExportSpec`, `billing.accounts.list`, `billing.anomalies.get`, `billing.anomalies.list`, `billing.anomaliesConfigs.get`, `billing.billingAccountPrice.get`, `billing.billingAccountPrices.list`, `billing.billingAccountServices.get`, `billing.billingAccountServices.list`, `billing.billingAccountSkuGroupSkus.get`, `billing.billingAccountSkuGroupSkus.list`, `billing.billingAccountSkuGroups.get`, `billing.billingAccountSkuGroups.list`, `billing.billingAccountSkus.get`, `billing.billingAccountSkus.list`, `billing.budgets.get`, `billing.budgets.list`, `billing.credits.list`, `billing.finOpsBenchmarkInformation.get`, `billing.finOpsHealthInformation.get`, `billing.resourceAssociations.list`, `billing.subscriptions.get`, `billing.subscriptions.list`, `chroniclesm.contracts.get`, `commerceoffercatalog.agreements.get`, `commerceoffercatalog.agreements.list`, `commerceoffercatalog.documents.get`, `commerceoffercatalog.documents.list`, `commerceoffercatalog.offers.get`, `consumerprocurement.accounts.get`, `consumerprocurement.accounts.list`, `consumerprocurement.consents.check`, `consumerprocurement.consents.list`, `consumerprocurement.orderAttributions.get`, `consumerprocurement.orderAttributions.list`, `consumerprocurement.orders.get`, `consumerprocurement.orders.list`, `dataprocessing.datasources.get`, `dataprocessing.datasources.list`, `dataprocessing.groupcontrols.get`, `dataprocessing.groupcontrols.list`, `discoveryengine.billingAccountLicenseConfigs.get`, `discoveryengine.billingAccountLicenseConfigs.list`, `recommender.commitmentUtilizationInsights.get`, `recommender.commitmentUtilizationInsights.list`, `recommender.costInsights.get`, `recommender.costInsights.list`, `recommender.costRecommendations.listAll`, `recommender.costRecommendations.summarizeAll`, `recommender.spendBasedCommitmentInsights.get`, `recommender.spendBasedCommitmentInsights.list`, `recommender.spendBasedCommitmentRecommendations.get`, `recommender.spendBasedCommitmentRecommendations.list`, `recommender.spendBasedCommitmentRecommenderConfig.get`, `recommender.usageCommitmentRecommendations.get`, `recommender.usageCommitmentRecommendations.list`

### Carbon Footprint Viewer (`roles/billing.carbonViewer`)

- —
- Permissions (3): `billing.accounts.get`, `billing.accounts.getCarbonInformation`, `billing.accounts.list`

### Billing Account Costs Manager (`roles/billing.costsManager`)

- Manage budgets for a billing account, and view, analyze, and export cost information of a billing account. Lowest-level resources where you can grant this role: - Billing Account
- Permissions (19): `billing.accounts.get`, `billing.accounts.getIamPolicy`, `billing.accounts.getSpendingInformation`, `billing.accounts.getUsageExportSpec`, `billing.accounts.list`, `billing.accounts.updateUsageExportSpec`, `billing.anomalies.get`, `billing.anomalies.list`, `billing.anomaliesConfigs.get`, `billing.anomaliesConfigs.update`, `billing.budgets.create`, `billing.budgets.delete`, `billing.budgets.get`, `billing.budgets.list`, `billing.budgets.update`, `billing.resourceAssociations.list`, `recommender.costInsights.get`, `recommender.costInsights.list`, `recommender.costInsights.update`

### Billing Account Creator (`roles/billing.creator`)

- Provides access to create billing accounts. Lowest-level resources where you can grant this role: - Organization
- Permissions (2): `billing.accounts.create`, `resourcemanager.organizations.get`

### Account Hierarchy Manager (`roles/billing.linkAdmin`)

- Authorized to manage billing account hierarchy
- Permissions (62): `billing.accounts.create`, `billing.accounts.get`, `billing.accounts.getCarbonInformation`, `billing.accounts.getIamPolicy`, `billing.accounts.getPaymentInfo`, `billing.accounts.getPricing`, `billing.accounts.getSpendingInformation`, `billing.accounts.getUsageExportSpec`, `billing.accounts.list`, `billing.accounts.move`, `billing.accounts.removeFromOrganization`, `billing.anomalies.get`, `billing.anomalies.list`, `billing.anomaliesConfigs.get`, `billing.billingAccountPrice.get`, `billing.billingAccountPrices.list`, `billing.billingAccountServices.get`, `billing.billingAccountServices.list`, `billing.billingAccountSkuGroupSkus.get`, `billing.billingAccountSkuGroupSkus.list`, `billing.billingAccountSkuGroups.get`, `billing.billingAccountSkuGroups.list`, `billing.billingAccountSkus.get`, `billing.billingAccountSkus.list`, `billing.budgets.get`, `billing.budgets.list`, `billing.credits.list`, `billing.finOpsBenchmarkInformation.get`, `billing.finOpsHealthInformation.get`, `billing.resourceAssociations.list`, `billing.subscriptions.get`, `billing.subscriptions.list`, `commerceoffercatalog.agreements.get`, `commerceoffercatalog.agreements.list`, `commerceoffercatalog.documents.get`, `commerceoffercatalog.documents.list`, `commerceoffercatalog.offers.get`, `consumerprocurement.accounts.get`, `consumerprocurement.accounts.list`, `consumerprocurement.consents.check`, `consumerprocurement.consents.list`, `consumerprocurement.orderAttributions.get`, `consumerprocurement.orderAttributions.list`, `consumerprocurement.orders.get`, `consumerprocurement.orders.list`, `dataprocessing.datasources.get`, `dataprocessing.datasources.list`, `dataprocessing.groupcontrols.get`, `dataprocessing.groupcontrols.list`, `recommender.commitmentUtilizationInsights.get`, `recommender.commitmentUtilizationInsights.list`, `recommender.costInsights.get`, `recommender.costInsights.list`, `recommender.costRecommendations.listAll`, `recommender.costRecommendations.summarizeAll`, `recommender.spendBasedCommitmentInsights.get`, `recommender.spendBasedCommitmentInsights.list`, `recommender.spendBasedCommitmentRecommendations.get`, `recommender.spendBasedCommitmentRecommendations.list`, `recommender.spendBasedCommitmentRecommenderConfig.get`, `recommender.usageCommitmentRecommendations.get`, `recommender.usageCommitmentRecommendations.list`

### Project Billing Costs Manager (`roles/billing.projectCostsManager`)

- When granted in conjunction with cost view permissions on projects (https://docs.cloud.google.com/billing/docs/how-to/custom-roles#cost_information), provides access to billing information scoped to the projects to which the user has cost access. Lowest-level resources where you can grant this role: - Billing Account
- Permissions (4): `billing.accounts.get`, `billing.accounts.getIamPolicy`, `billing.accounts.getSpendingInformationScoped`, `billing.costRecommendations.listScoped`

### Billing Account User (`roles/billing.user`)

- When granted in conjunction with the Project Owner role or Project Billing Manager role, provides access to associate projects with billing accounts. Lowest-level resources where you can grant this role: - Billing Account
- Permissions (6): `billing.accounts.get`, `billing.accounts.getIamPolicy`, `billing.accounts.list`, `billing.accounts.redeemPromotion`, `billing.credits.list`, `billing.resourceAssociations.create`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Billing Account):

```bash
gcloud billing accounts add-iam-policy-binding BILLING_ACCOUNT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/billing.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `billing.accounts.close` | `roles/billing.admin` |
| `billing.accounts.create` | `roles/billing.creator`, `roles/billing.linkAdmin` |
| `billing.accounts.get` | `roles/billing.admin`, `roles/billing.viewer`, `roles/dataprocessing.admin`, `roles/billing.carbonViewer`, `roles/billing.costsManager`, `roles/billing.linkAdmin`, `roles/billing.projectCostsManager`, `roles/billing.user`, `roles/consumerprocurement.orderAdmin`, `roles/consumerprocurement.orderViewer`, `roles/consumerprocurement.procurementAdmin`, `roles/consumerprocurement.procurementViewer`, `roles/recommender.bigQueryCapacityCommitmentsBillingAccountAdmin`, `roles/recommender.bigQueryCapacityCommitmentsBillingAccountViewer`, `roles/recommender.billingAccountCudAdmin`, `roles/recommender.billingAccountCudViewer`, `roles/recommender.ucsAdmin`, `roles/recommender.ucsViewer` (+2 service agent roles) |
| `billing.accounts.getCarbonInformation` | `roles/billing.admin`, `roles/billing.viewer`, `roles/billing.carbonViewer`, `roles/billing.linkAdmin` |
| `billing.accounts.getIamPolicy` | `roles/billing.admin`, `roles/billing.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/billing.costsManager`, `roles/billing.linkAdmin`, `roles/billing.projectCostsManager`, `roles/billing.user`, `roles/consumerprocurement.orderAdmin`, `roles/consumerprocurement.orderViewer`, `roles/consumerprocurement.procurementAdmin`, `roles/consumerprocurement.procurementViewer`, `roles/iam.securityAuditor` |
| `billing.accounts.getPaymentInfo` | `roles/billing.admin`, `roles/billing.viewer`, `roles/billing.linkAdmin` |
| `billing.accounts.getPricing` | `roles/billing.admin`, `roles/billing.viewer`, `roles/billing.linkAdmin` |
| `billing.accounts.getSpendingInformation` | `roles/billing.admin`, `roles/billing.viewer`, `roles/billing.costsManager`, `roles/billing.linkAdmin` |
| `billing.accounts.getSpendingInformationScoped` | `roles/billing.projectCostsManager` |
| `billing.accounts.getUsageExportSpec` | `roles/billing.admin`, `roles/billing.viewer`, `roles/billing.costsManager`, `roles/billing.linkAdmin` |
| `billing.accounts.list` | `roles/billing.admin`, `roles/billing.viewer`, `roles/dataprocessing.admin`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/billing.carbonViewer`, `roles/billing.costsManager`, `roles/billing.linkAdmin`, `roles/billing.user`, `roles/consumerprocurement.orderAdmin`, `roles/consumerprocurement.orderViewer`, `roles/consumerprocurement.procurementAdmin`, `roles/consumerprocurement.procurementViewer`, `roles/iam.securityAuditor`, `roles/recommender.bigQueryCapacityCommitmentsBillingAccountAdmin`, `roles/recommender.bigQueryCapacityCommitmentsBillingAccountViewer`, `roles/recommender.billingAccountCudAdmin`, `roles/recommender.billingAccountCudViewer`, `roles/recommender.ucsAdmin`, `roles/recommender.ucsViewer` |
| `billing.accounts.move` | `roles/billing.admin`, `roles/billing.linkAdmin` |
| `billing.accounts.redeemPromotion` | `roles/billing.admin`, `roles/billing.user`, `roles/consumerprocurement.orderAdmin`, `roles/consumerprocurement.procurementAdmin` |
| `billing.accounts.removeFromOrganization` | `roles/billing.admin`, `roles/billing.linkAdmin` |
| `billing.accounts.reopen` | `roles/billing.admin` |
| `billing.accounts.setIamPolicy` | `roles/billing.admin`, `roles/iam.securityAdmin` |
| `billing.accounts.update` | `roles/billing.admin` |
| `billing.accounts.updatePaymentInfo` | `roles/billing.admin` |
| `billing.accounts.updateUsageExportSpec` | `roles/billing.admin`, `roles/billing.costsManager` |
| `billing.anomalies.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/billing.admin`, `roles/billing.viewer`, `roles/billing.costsManager`, `roles/billing.linkAdmin`, `roles/iam.supportUser` |
| `billing.anomalies.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/billing.admin`, `roles/billing.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/billing.costsManager`, `roles/billing.linkAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `billing.anomalies.submitFeedback` | `roles/admin`, `roles/owner`, `roles/billing.admin` |
| `billing.anomaliesConfigs.get` | `roles/billing.admin`, `roles/billing.viewer`, `roles/billing.costsManager`, `roles/billing.linkAdmin` |
| `billing.anomaliesConfigs.update` | `roles/billing.admin`, `roles/billing.costsManager` |
| `billing.billingAccountPrice.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/billing.admin`, `roles/billing.viewer`, `roles/billing.linkAdmin`, `roles/iam.supportUser` |
| `billing.billingAccountPrices.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/billing.admin`, `roles/billing.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/billing.linkAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `billing.billingAccountServices.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/billing.admin`, `roles/billing.viewer`, `roles/billing.linkAdmin`, `roles/iam.supportUser` |
| `billing.billingAccountServices.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/billing.admin`, `roles/billing.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/billing.linkAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `billing.billingAccountSkuGroupSkus.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/billing.admin`, `roles/billing.viewer`, `roles/billing.linkAdmin`, `roles/iam.supportUser` |
| `billing.billingAccountSkuGroupSkus.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/billing.admin`, `roles/billing.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/billing.linkAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `billing.billingAccountSkuGroups.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/billing.admin`, `roles/billing.viewer`, `roles/billing.linkAdmin`, `roles/iam.supportUser` |
| `billing.billingAccountSkuGroups.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/billing.admin`, `roles/billing.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/billing.linkAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `billing.billingAccountSkus.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/billing.admin`, `roles/billing.viewer`, `roles/billing.linkAdmin`, `roles/iam.supportUser` |
| `billing.billingAccountSkus.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/billing.admin`, `roles/billing.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/billing.linkAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `billing.budgets.configureSpendCap` | `roles/billing.admin` |
| `billing.budgets.create` | `roles/billing.admin`, `roles/billing.costsManager` |
| `billing.budgets.delete` | `roles/billing.admin`, `roles/billing.costsManager` |
| `billing.budgets.get` | `roles/billing.admin`, `roles/billing.viewer`, `roles/billing.costsManager`, `roles/billing.linkAdmin` |
| `billing.budgets.list` | `roles/billing.admin`, `roles/billing.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/billing.costsManager`, `roles/billing.linkAdmin`, `roles/iam.securityAuditor` |
| `billing.budgets.update` | `roles/billing.admin`, `roles/billing.costsManager` |
| `billing.costRecommendations.listScoped` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/billing.projectCostsManager`, `roles/iam.supportUser` |
| `billing.credits.list` | `roles/billing.admin`, `roles/billing.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/billing.linkAdmin`, `roles/billing.user`, `roles/consumerprocurement.orderAdmin`, `roles/consumerprocurement.orderViewer`, `roles/consumerprocurement.procurementAdmin`, `roles/consumerprocurement.procurementViewer`, `roles/iam.securityAuditor` |
| `billing.finOpsBenchmarkInformation.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/billing.admin`, `roles/billing.viewer`, `roles/billing.linkAdmin`, `roles/iam.supportUser` |
| `billing.finOpsHealthInformation.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/billing.admin`, `roles/billing.viewer`, `roles/billing.linkAdmin`, `roles/iam.supportUser` |
| `billing.resourceAssociations.create` | `roles/billing.admin`, `roles/billing.user`, `roles/consumerprocurement.orderAdmin`, `roles/consumerprocurement.procurementAdmin` (+1 service agent role) |
| `billing.resourceAssociations.delete` | `roles/billing.admin` |
| `billing.resourceAssociations.list` | `roles/billing.admin`, `roles/billing.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/billing.costsManager`, `roles/billing.linkAdmin`, `roles/cloudsupport.techSupportEditor`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `billing.resourceCosts.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudhub.operator`, `roles/iam.supportUser` |
| `billing.resourcebudgets.configureSpendCap` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor` |
| `billing.resourcebudgets.read` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.supportUser` |
| `billing.resourcebudgets.write` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor` (+1 service agent role) |
| `billing.subscriptions.create` | `roles/billing.admin` |
| `billing.subscriptions.get` | `roles/billing.admin`, `roles/billing.viewer`, `roles/billing.linkAdmin` |
| `billing.subscriptions.list` | `roles/billing.admin`, `roles/billing.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/billing.linkAdmin`, `roles/iam.securityAuditor` |
| `billing.subscriptions.update` | `roles/billing.admin` |

## Notes

- Roles and permissions of the `billing` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/billing (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
