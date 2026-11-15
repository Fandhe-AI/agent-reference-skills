---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/orgpolicy
---

# Organization Policy Service IAM roles and permissions

## Signature / Usage

Predefined roles of `orgpolicy` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

### Organization Policy Administrator (`roles/orgpolicy.policyAdmin`)

- Provides access to define what restrictions an organization wants to place on the configuration of cloud resources by setting Organization Policies. Lowest-level resources where you can grant this role: - Organization
- Permissions (26): `cloudasset.assets.analyzeOrgPolicy`, `cloudasset.assets.exportResource`, `cloudasset.assets.listResource`, `cloudasset.assets.searchAllResources`, `orgpolicy.constraints.list`, `orgpolicy.customConstraints.create`, `orgpolicy.customConstraints.delete`, `orgpolicy.customConstraints.get`, `orgpolicy.customConstraints.list`, `orgpolicy.customConstraints.update`, `orgpolicy.policies.create`, `orgpolicy.policies.delete`, `orgpolicy.policies.list`, `orgpolicy.policies.update`, `orgpolicy.policy.get`, `orgpolicy.policy.set`, `policysimulator.orgPolicyViolations.list`, `policysimulator.orgPolicyViolationsPreviews.create`, `policysimulator.orgPolicyViolationsPreviews.get`, `policysimulator.orgPolicyViolationsPreviews.list`, `recommender.orgPolicyInsights.get`, `recommender.orgPolicyInsights.list`, `recommender.orgPolicyInsights.update`, `recommender.orgPolicyRecommendations.get`, `recommender.orgPolicyRecommendations.list`, `recommender.orgPolicyRecommendations.update`

### Organization Policy Viewer (`roles/orgpolicy.policyViewer`)

- Provides access to view Organization Policies on resources. Lowest-level resources where you can grant this role: - Project
- Permissions (5): `orgpolicy.constraints.list`, `orgpolicy.customConstraints.get`, `orgpolicy.customConstraints.list`, `orgpolicy.policies.list`, `orgpolicy.policy.get`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Organization):

```bash
gcloud organizations add-iam-policy-binding ORGANIZATION_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/orgpolicy.policyAdmin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `orgpolicy.constraints.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/orgpolicy.policyAdmin`, `roles/orgpolicy.policyViewer`, `roles/resourcemanager.folderAdmin`, `roles/resourcemanager.organizationAdmin`, `roles/securityposture.admin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/resourcemanager.folderCreator`, `roles/resourcemanager.folderEditor`, `roles/resourcemanager.folderViewer`, `roles/securityposture.postureDeployer` (+2 service agent roles) |
| `orgpolicy.customConstraints.create` | `roles/orgpolicy.policyAdmin`, `roles/securityposture.admin`, `roles/securityposture.postureDeployer` |
| `orgpolicy.customConstraints.delete` | `roles/orgpolicy.policyAdmin`, `roles/securityposture.admin`, `roles/securityposture.postureDeployer` |
| `orgpolicy.customConstraints.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/orgpolicy.policyAdmin`, `roles/orgpolicy.policyViewer`, `roles/policysimulator.orgPolicyAdmin`, `roles/securityposture.admin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/securityposture.postureDeployer` |
| `orgpolicy.customConstraints.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/orgpolicy.policyAdmin`, `roles/orgpolicy.policyViewer`, `roles/policysimulator.orgPolicyAdmin`, `roles/securityposture.admin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/securityposture.postureDeployer` |
| `orgpolicy.customConstraints.update` | `roles/orgpolicy.policyAdmin`, `roles/securityposture.admin`, `roles/securityposture.postureDeployer` |
| `orgpolicy.policies.create` | `roles/assuredworkloads.admin`, `roles/assuredworkloads.editor`, `roles/orgpolicy.policyAdmin`, `roles/securityposture.admin`, `roles/securityposture.postureDeployer` |
| `orgpolicy.policies.delete` | `roles/assuredworkloads.admin`, `roles/assuredworkloads.editor`, `roles/orgpolicy.policyAdmin`, `roles/securityposture.admin`, `roles/securityposture.postureDeployer` |
| `orgpolicy.policies.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/assuredworkloads.admin`, `roles/assuredworkloads.editor`, `roles/assuredworkloads.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/orgpolicy.policyAdmin`, `roles/orgpolicy.policyViewer`, `roles/policysimulator.orgPolicyAdmin`, `roles/resourcemanager.folderAdmin`, `roles/resourcemanager.organizationAdmin`, `roles/securityposture.admin`, `roles/assuredworkloads.reader`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/resourcemanager.folderCreator`, `roles/resourcemanager.folderEditor`, `roles/resourcemanager.folderViewer`, `roles/securityposture.postureDeployer`, `roles/wiz.cloudInventoryViewer` (+3 service agent roles) |
| `orgpolicy.policies.update` | `roles/assuredworkloads.admin`, `roles/assuredworkloads.editor`, `roles/orgpolicy.policyAdmin`, `roles/securityposture.admin`, `roles/securityposture.postureDeployer` |
| `orgpolicy.policy.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/assuredworkloads.admin`, `roles/assuredworkloads.editor`, `roles/assuredworkloads.viewer`, `roles/designcenter.admin`, `roles/firebase.admin`, `roles/geminicloudassist.admin`, `roles/geminicloudassist.editor`, `roles/geminicloudassist.user`, `roles/orgpolicy.policyAdmin`, `roles/orgpolicy.policyViewer`, `roles/policysimulator.orgPolicyAdmin`, `roles/resourcemanager.folderAdmin`, `roles/resourcemanager.organizationAdmin`, `roles/securityposture.admin`, `roles/serviceusage.apiKeysAdmin`, `roles/storage.admin`, `roles/storage.folderAdmin`, `roles/storage.objectAdmin`, `roles/storage.objectCreator`, `roles/storage.objectUser`, `roles/workloadmanager.admin`, `roles/workloadmanager.viewer`, `roles/assuredworkloads.reader`, `roles/composer.environmentAndStorageObjectAdmin`, `roles/composer.worker`, `roles/consumerprocurement.entitlementManager`, `roles/consumerprocurement.entitlementViewer`, `roles/consumerprocurement.procurementAdmin`, `roles/consumerprocurement.procurementViewer`, `roles/designcenter.user`, `roles/firebase.developAdmin`, `roles/firebaseapphosting.computeRunner`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.devOps`, `roles/iam.infrastructureAdmin`, `roles/iam.mlEngineer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/resourcemanager.folderCreator`, `roles/resourcemanager.folderEditor`, `roles/resourcemanager.folderViewer`, `roles/run.sourceDeveloper`, `roles/securityposture.postureDeployer`, `roles/storage.expressModeUserAccess`, `roles/storage.hmacKeyAdmin`, `roles/wiz.cloudInventoryViewer`, `roles/workloadmanager.evaluationAdmin`, `roles/workloadmanager.evaluationViewer`, `roles/workloadmanager.worker` (+19 service agent roles) |
| `orgpolicy.policy.set` | `roles/assuredworkloads.admin`, `roles/assuredworkloads.editor`, `roles/orgpolicy.policyAdmin`, `roles/securityposture.admin`, `roles/securityposture.postureDeployer` |

## Notes

- Roles and permissions of the `orgpolicy` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/orgpolicy (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
