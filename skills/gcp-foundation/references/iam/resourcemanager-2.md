---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/resourcemanager
---

# Resource Manager IAM roles and permissions (part 2/4)

## Signature / Usage

Predefined roles of `resourcemanager` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

### Folder Editor (`roles/resourcemanager.folderEditor`)

- Provides permission to modify folders as well as to view a folder's allow policy. Lowest-level resources where you can grant this role: - Folder
- Permissions (16): `essentialcontacts.contacts.get`, `essentialcontacts.contacts.list`, `orgpolicy.constraints.list`, `orgpolicy.policies.list`, `orgpolicy.policy.get`, `resourcemanager.capabilities.get`, `resourcemanager.capabilities.update`, `resourcemanager.folders.delete`, `resourcemanager.folders.get`, `resourcemanager.folders.getIamPolicy`, `resourcemanager.folders.list`, `resourcemanager.folders.searchPolicyBindings`, `resourcemanager.folders.undelete`, `resourcemanager.folders.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Folder IAM Admin (`roles/resourcemanager.folderIamAdmin`)

- Provides permissions to administer allow policies on folders. Lowest-level resources where you can grant this role: - Folder
- Permissions (9): `iam.policybindings.get`, `iam.policybindings.list`, `resourcemanager.folders.createPolicyBinding`, `resourcemanager.folders.deletePolicyBinding`, `resourcemanager.folders.get`, `resourcemanager.folders.getIamPolicy`, `resourcemanager.folders.searchPolicyBindings`, `resourcemanager.folders.setIamPolicy`, `resourcemanager.folders.updatePolicyBinding`

### Folder Mover (`roles/resourcemanager.folderMover`)

- Provides permission to move projects and folders into and out of a parent organization or folder. Lowest-level resources where you can grant this role: - Folder
- Permissions (2): `resourcemanager.folders.move`, `resourcemanager.projects.move`

### Folder Viewer (`roles/resourcemanager.folderViewer`)

- Provides permission to get a folder and list the folders and projects below a resource. Lowest-level resources where you can grant this role: - Folder
- Permissions (10): `essentialcontacts.contacts.get`, `essentialcontacts.contacts.list`, `orgpolicy.constraints.list`, `orgpolicy.policies.list`, `orgpolicy.policy.get`, `resourcemanager.capabilities.get`, `resourcemanager.folders.get`, `resourcemanager.folders.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Project Lien Modifier (`roles/resourcemanager.lienModifier`)

- Provides access to modify Liens on projects. Lowest-level resources where you can grant this role: - Project
- Permissions (1): `resourcemanager.projects.updateLiens`

### Organization Viewer (`roles/resourcemanager.organizationViewer`)

- Provides access to view an organization. Lowest-level resources where you can grant this role: - Organization
- Permissions (1): `resourcemanager.organizations.get`

### Project Creator (`roles/resourcemanager.projectCreator`)

- Provides access to create new projects. Once a user creates a project, they're automatically granted the owner role for that project. Lowest-level resources where you can grant this role: - Folder
- Permissions (2): `resourcemanager.organizations.get`, `resourcemanager.projects.create`

### Project Deleter (`roles/resourcemanager.projectDeleter`)

- Provides access to delete Google Cloud projects. Lowest-level resources where you can grant this role: - Project
- Permissions (1): `resourcemanager.projects.delete`

### Tag Hold Administrator (`roles/resourcemanager.tagHoldAdmin`)

- Access to create, delete and list TagHolds under a TagValue
- Permissions (3): `resourcemanager.tagHolds.create`, `resourcemanager.tagHolds.delete`, `resourcemanager.tagHolds.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Folder):

```bash
gcloud resource-manager folders add-iam-policy-binding FOLDER_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/resourcemanager.folderEditor"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `resourcemanager.boundaries.associateToCapabilityConfig` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/resourcemanager.editor` |
| `resourcemanager.boundaries.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/resourcemanager.editor` |
| `resourcemanager.boundaries.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/resourcemanager.editor` |
| `resourcemanager.boundaries.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/resourcemanager.editor`, `roles/resourcemanager.viewer`, `roles/iam.supportUser` |
| `resourcemanager.boundaries.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/resourcemanager.editor`, `roles/resourcemanager.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `resourcemanager.boundaries.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/resourcemanager.editor` |
| `resourcemanager.boundaryConfigs.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/resourcemanager.editor`, `roles/resourcemanager.viewer`, `roles/iam.supportUser` |
| `resourcemanager.boundaryConfigs.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/resourcemanager.editor` |
| `resourcemanager.capabilities.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/resourcemanager.editor`, `roles/resourcemanager.folderAdmin`, `roles/resourcemanager.organizationAdmin`, `roles/resourcemanager.viewer`, `roles/iam.supportUser`, `roles/resourcemanager.folderCreator`, `roles/resourcemanager.folderEditor`, `roles/resourcemanager.folderViewer` |
| `resourcemanager.capabilities.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/resourcemanager.editor`, `roles/resourcemanager.folderAdmin`, `roles/resourcemanager.organizationAdmin`, `roles/resourcemanager.folderEditor` |
| `resourcemanager.capabilityConfigs.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/resourcemanager.editor` |
| `resourcemanager.capabilityConfigs.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/resourcemanager.editor` |
| `resourcemanager.capabilityConfigs.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/resourcemanager.editor`, `roles/resourcemanager.viewer`, `roles/iam.supportUser` |
| `resourcemanager.capabilityConfigs.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/resourcemanager.editor`, `roles/resourcemanager.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `resourcemanager.capabilityConfigs.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/resourcemanager.editor` |
| `resourcemanager.folders.create` | `roles/admin`, `roles/writer`, `roles/assuredworkloads.admin`, `roles/assuredworkloads.editor`, `roles/resourcemanager.editor`, `roles/resourcemanager.folderAdmin`, `roles/resourcemanager.folderCreator` (+1 service agent role) |
| `resourcemanager.folders.createPolicyBinding` | `roles/admin`, `roles/owner`, `roles/resourcemanager.folderAdmin`, `roles/resourcemanager.organizationAdmin`, `roles/resourcemanager.folderIamAdmin` |
| `resourcemanager.folders.delete` | `roles/admin`, `roles/writer`, `roles/resourcemanager.editor`, `roles/resourcemanager.folderAdmin`, `roles/resourcemanager.folderEditor` (+1 service agent role) |
| `resourcemanager.folders.deletePolicyBinding` | `roles/admin`, `roles/owner`, `roles/resourcemanager.folderAdmin`, `roles/resourcemanager.organizationAdmin`, `roles/resourcemanager.folderIamAdmin` |
| `resourcemanager.folders.get` | `roles/admin`, `roles/writer`, `roles/reader`, `roles/assuredworkloads.admin`, `roles/assuredworkloads.editor`, `roles/assuredworkloads.viewer`, `roles/auditmanager.admin`, `roles/capacityplanner.admin`, `roles/capacityplanner.viewer`, `roles/cloudprivatecatalogproducer.admin`, `roles/resourcemanager.editor`, `roles/resourcemanager.folderAdmin`, `roles/resourcemanager.organizationAdmin`, `roles/resourcemanager.viewer`, `roles/securitycenter.admin`, `roles/servicemanagement.admin`, `roles/apphub.appManagementViewer`, `roles/assuredworkloads.reader`, `roles/auditmanager.auditor`, `roles/browser`, `roles/capacityplanner.planner`, `roles/cloudhub.operator`, `roles/cloudprivatecatalogproducer.manager`, `roles/cloudprivatecatalogproducer.orgAdmin`, `roles/compute.folderVmExtensionPolicyAdmin`, `roles/compute.folderVmExtensionPolicyViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/modelarmor.floorSettingsAdmin`, `roles/modelarmor.floorSettingsViewer`, `roles/resourcemanager.folderCreator`, `roles/resourcemanager.folderEditor`, `roles/resourcemanager.folderIamAdmin`, `roles/resourcemanager.folderViewer`, `roles/securitycenter.adminEditor`, `roles/securitycenter.adminViewer`, `roles/securitycenter.assetsViewer`, `roles/securitycenter.bigQueryExportsEditor`, `roles/securitycenter.bigQueryExportsViewer`, `roles/securitycenter.findingsEditor`, `roles/securitycenter.findingsViewer`, `roles/securitycenter.settingsAdmin`, `roles/securitycenter.settingsEditor`, `roles/securitycenter.settingsViewer`, `roles/wiz.cloudInventoryViewer` (+9 service agent roles) |
| `resourcemanager.folders.getIamPolicy` | `roles/admin`, `roles/writer`, `roles/reader`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/resourcemanager.folderAdmin`, `roles/resourcemanager.organizationAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/resourcemanager.folderEditor`, `roles/resourcemanager.folderIamAdmin`, `roles/wiz.cloudInventoryViewer` (+6 service agent roles) |
| `resourcemanager.folders.list` | `roles/admin`, `roles/writer`, `roles/reader`, `roles/assuredworkloads.admin`, `roles/assuredworkloads.editor`, `roles/assuredworkloads.viewer`, `roles/auditmanager.admin`, `roles/cloudprivatecatalogproducer.admin`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/resourcemanager.editor`, `roles/resourcemanager.folderAdmin`, `roles/resourcemanager.organizationAdmin`, `roles/resourcemanager.viewer`, `roles/securitycenter.admin`, `roles/servicemanagement.admin`, `roles/apphub.appManagementViewer`, `roles/assuredworkloads.reader`, `roles/auditmanager.auditor`, `roles/browser`, `roles/cloudhub.operator`, `roles/cloudprivatecatalogproducer.manager`, `roles/cloudprivatecatalogproducer.orgAdmin`, `roles/compute.folderVmExtensionPolicyAdmin`, `roles/compute.folderVmExtensionPolicyViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/modelarmor.floorSettingsAdmin`, `roles/modelarmor.floorSettingsViewer`, `roles/resourcemanager.folderCreator`, `roles/resourcemanager.folderEditor`, `roles/resourcemanager.folderViewer`, `roles/securitycenter.adminEditor`, `roles/securitycenter.adminViewer`, `roles/securitycenter.bigQueryExportsEditor`, `roles/securitycenter.bigQueryExportsViewer`, `roles/securitycenter.settingsAdmin`, `roles/securitycenter.settingsEditor`, `roles/securitycenter.settingsViewer`, `roles/wiz.cloudInventoryViewer` (+7 service agent roles) |
| `resourcemanager.folders.move` | `roles/admin`, `roles/resourcemanager.folderAdmin`, `roles/resourcemanager.folderMover` |
| `resourcemanager.folders.searchPolicyBindings` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/resourcemanager.folderAdmin`, `roles/resourcemanager.organizationAdmin`, `roles/iam.supportUser`, `roles/resourcemanager.folderEditor`, `roles/resourcemanager.folderIamAdmin` |
| `resourcemanager.folders.setIamPolicy` | `roles/admin`, `roles/iam.securityAdmin`, `roles/resourcemanager.folderAdmin`, `roles/resourcemanager.organizationAdmin`, `roles/resourcemanager.folderIamAdmin` (+2 service agent roles) |
| `resourcemanager.folders.undelete` | `roles/admin`, `roles/writer`, `roles/resourcemanager.editor`, `roles/resourcemanager.folderAdmin`, `roles/resourcemanager.folderEditor` |
| `resourcemanager.folders.update` | `roles/admin`, `roles/writer`, `roles/resourcemanager.editor`, `roles/resourcemanager.folderAdmin`, `roles/resourcemanager.folderEditor` (+1 service agent role) |
| `resourcemanager.folders.updatePolicyBinding` | `roles/admin`, `roles/owner`, `roles/resourcemanager.folderAdmin`, `roles/resourcemanager.organizationAdmin`, `roles/resourcemanager.folderIamAdmin` |
| `resourcemanager.hierarchyNodes.createTagBinding` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/resourcemanager.folderAdmin`, `roles/resourcemanager.tagUser`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver` (+1 service agent role) |
| `resourcemanager.hierarchyNodes.deleteTagBinding` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/resourcemanager.folderAdmin`, `roles/resourcemanager.tagUser`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver` (+1 service agent role) |
| `resourcemanager.hierarchyNodes.listEffectiveTags` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/firebase.admin`, `roles/resourcemanager.folderAdmin`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/storage.admin`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/firebase.developAdmin`, `roles/iam.databasesAdmin`, `roles/iam.infrastructureAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` (+12 service agent roles) |
| `resourcemanager.hierarchyNodes.listTagBindings` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/resourcemanager.folderAdmin`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+3 service agent roles) |
| `resourcemanager.organizations.createPolicyBinding` | `roles/admin`, `roles/owner`, `roles/resourcemanager.organizationAdmin` |
| `resourcemanager.organizations.deletePolicyBinding` | `roles/admin`, `roles/owner`, `roles/resourcemanager.organizationAdmin` |
| `resourcemanager.organizations.get` | `roles/admin`, `roles/writer`, `roles/reader`, `roles/accesscontextmanager.admin`, `roles/accesscontextmanager.editor`, `roles/accesscontextmanager.policyAdmin`, `roles/accesscontextmanager.viewer`, `roles/advisorynotifications.admin`, `roles/advisorynotifications.viewer`, `roles/assuredoss.admin`, `roles/assuredworkloads.admin`, `roles/assuredworkloads.editor`, `roles/assuredworkloads.viewer`, `roles/auditmanager.admin`, `roles/axt.admin`, `roles/beyondcorp.editor`, `roles/beyondcorp.viewer`, `roles/capacityplanner.admin`, `roles/capacityplanner.viewer`, `roles/chronicle.admin`, `roles/cloudprivatecatalogproducer.admin`, `roles/cloudsupport.admin`, `roles/commercebusinessenablement.admin`, `roles/commercebusinessenablement.viewer`, `roles/dspm.admin`, `roles/dspm.viewer`, `roles/networkmanagement.admin`, `roles/networkmanagement.editor`, `roles/networkmanagement.viewer`, `roles/policysimulator.orgPolicyAdmin`, `roles/resourcemanager.editor`, `roles/resourcemanager.organizationAdmin`, `roles/resourcemanager.viewer`, `roles/securitycenter.admin`, `roles/securitycentermanagement.admin`, `roles/securitycentermanagement.editor`, `roles/securitycentermanagement.viewer`, `roles/securityposture.admin`, `roles/securityposture.viewer`, `roles/servicemanagement.admin`, `roles/accesscontextmanager.policyEditor`, `roles/accesscontextmanager.policyReader`, `roles/accesscontextmanager.vpcScTroubleshooterViewer`, `roles/assuredoss.projectAdmin`, `roles/assuredoss.reader`, `roles/assuredoss.user`, `roles/assuredworkloads.reader`, `roles/auditmanager.auditor`, `roles/auditmanager.ccfAdmin`, `roles/auditmanager.ccfViewer`, `roles/beyondcorp.subscriptionAdmin`, `roles/beyondcorp.subscriptionViewer`, `roles/billing.creator`, `roles/browser`, `roles/capacityplanner.planner`, `roles/chronicle.soarAdmin`, `roles/chronicle.soarThreatManager`, `roles/chronicle.soarVulnerabilityManager`, `roles/cloudhub.operator`, `roles/cloudprivatecatalogproducer.manager`, `roles/cloudprivatecatalogproducer.orgAdmin`, `roles/cloudsupport.supportSubscriptionEditor`, `roles/cloudsupport.supportSubscriptionViewer`, `roles/commercebusinessenablement.resellerDiscountAdmin`, `roles/commercebusinessenablement.resellerDiscountViewer`, `roles/compute.orgVmExtensionPolicyAdmin`, `roles/compute.orgVmExtensionPolicyViewer`, `roles/compute.xpnAdmin`, `roles/datacatalog.migrationConfigAdmin`, `roles/datacatalog.searchAdmin`, `roles/iam.networkAdmin`, `roles/iam.organizationRoleAdmin`, `roles/iam.organizationRoleViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/modelarmor.floorSettingsAdmin`, `roles/modelarmor.floorSettingsViewer`, `roles/networkmanagement.CloudNetworkInsightsAdmin`, `roles/networkmanagement.CloudNetworkInsightsEditor`, `roles/networkmanagement.CloudNetworkInsightsViewer`, `roles/resourcemanager.organizationViewer`, `roles/resourcemanager.projectCreator`, `roles/securitycenter.adminEditor`, `roles/securitycenter.adminViewer`, `roles/securitycenter.assetsViewer`, `roles/securitycenter.bigQueryExportsEditor`, `roles/securitycenter.bigQueryExportsViewer`, `roles/securitycenter.findingsEditor`, `roles/securitycenter.findingsViewer`, `roles/securitycenter.settingsAdmin`, `roles/securitycenter.settingsEditor`, `roles/securitycenter.settingsViewer`, `roles/securitycenter.sourcesAdmin`, `roles/securitycenter.sourcesEditor`, `roles/securitycenter.sourcesViewer`, `roles/securitycentermanagement.customModulesEditor`, `roles/securitycentermanagement.customModulesViewer`, `roles/securitycentermanagement.etdCustomModulesEditor`, `roles/securitycentermanagement.etdCustomModulesViewer`, `roles/securitycentermanagement.settingsEditor`, `roles/securitycentermanagement.settingsViewer`, `roles/securitycentermanagement.shaCustomModulesEditor`, `roles/securitycentermanagement.shaCustomModulesViewer`, `roles/securityposture.postureDeployer`, `roles/securityposture.postureDeploymentsViewer`, `roles/securityposture.postureViewer`, `roles/servicemanagement.quotaAdmin`, `roles/wiz.cloudInventoryViewer` (+11 service agent roles) |
| `resourcemanager.organizations.getIamPolicy` | `roles/admin`, `roles/writer`, `roles/reader`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/resourcemanager.organizationAdmin`, `roles/iam.organizationRoleAdmin`, `roles/iam.organizationRoleViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` (+7 service agent roles) |
| `resourcemanager.organizations.searchPolicyBindings` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/resourcemanager.organizationAdmin`, `roles/iam.supportUser` |
| `resourcemanager.organizations.setIamPolicy` | `roles/admin`, `roles/iam.securityAdmin`, `roles/resourcemanager.organizationAdmin` (+2 service agent roles) |
| `resourcemanager.organizations.updatePolicyBinding` | `roles/admin`, `roles/owner`, `roles/resourcemanager.organizationAdmin` |
| `resourcemanager.projects.associateToCapabilityConfig` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/resourcemanager.editor` |
| `resourcemanager.projects.create` | `roles/assuredworkloads.admin`, `roles/assuredworkloads.editor`, `roles/resourcemanager.editor`, `roles/resourcemanager.projectCreator` (+1 service agent role) |
| `resourcemanager.projects.createBillingAssignment` | `roles/admin`, `roles/owner`, `roles/billing.admin`, `roles/billing.projectManager` (+1 service agent role) |
| `resourcemanager.projects.createPolicyBinding` | `roles/admin`, `roles/owner`, `roles/resourcemanager.folderAdmin`, `roles/resourcemanager.organizationAdmin`, `roles/resourcemanager.projectIamAdmin` |
| `resourcemanager.projects.delete` | `roles/admin`, `roles/owner`, `roles/resourcemanager.projectDeleter` (+1 service agent role) |
| `resourcemanager.projects.deleteBillingAssignment` | `roles/admin`, `roles/owner`, `roles/billing.admin`, `roles/billing.projectManager` (+1 service agent role) |
| `resourcemanager.projects.deletePolicyBinding` | `roles/admin`, `roles/owner`, `roles/resourcemanager.folderAdmin`, `roles/resourcemanager.organizationAdmin`, `roles/resourcemanager.projectIamAdmin` |

## Notes

- Roles and permissions of the `resourcemanager` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/resourcemanager (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
