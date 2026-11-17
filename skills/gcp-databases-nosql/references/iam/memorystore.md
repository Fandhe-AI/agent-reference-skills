---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/memorystore
---

# Memorystore IAM roles and permissions

## Signature / Usage

Predefined roles of `memorystore` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Memorystore Admin (`roles/memorystore.admin`)

- Full access to Memorystore resources.
- Permissions (51): `cloudkms.keyHandles.create`, `cloudkms.keyHandles.get`, `cloudkms.keyHandles.list`, `cloudkms.operations.get`, `cloudkms.projects.showEffectiveAutokeyConfig`, `memorystore.aclPolicies.create`, `memorystore.aclPolicies.delete`, `memorystore.aclPolicies.get`, `memorystore.aclPolicies.list`, `memorystore.aclPolicies.update`, `memorystore.aclPolicyRevisions.get`, `memorystore.aclPolicyRevisions.list`, `memorystore.authTokens.create`, `memorystore.authTokens.delete`, `memorystore.authTokens.get`, `memorystore.authTokens.list`, `memorystore.backupCollections.createTagBinding`, `memorystore.backupCollections.deleteTagBinding`, `memorystore.backupCollections.get`, `memorystore.backupCollections.list`, `memorystore.backupCollections.listEffectiveTags`, `memorystore.backupCollections.listTagBindings`, `memorystore.backups.delete`, `memorystore.backups.export`, `memorystore.backups.get`, `memorystore.backups.list`, `memorystore.instances.backup`, `memorystore.instances.connect`, `memorystore.instances.create`, `memorystore.instances.createTagBinding`, `memorystore.instances.delete`, `memorystore.instances.deleteTagBinding`, `memorystore.instances.finishMigration`, `memorystore.instances.get`, `memorystore.instances.list`, `memorystore.instances.listEffectiveTags`, `memorystore.instances.listTagBindings`, `memorystore.instances.startMigration`, `memorystore.instances.update`, `memorystore.locations.get`, `memorystore.locations.list`, `memorystore.operations.cancel`, `memorystore.operations.delete`, `memorystore.operations.get`, `memorystore.operations.list`, `memorystore.tokenAuthUsers.create`, `memorystore.tokenAuthUsers.delete`, `memorystore.tokenAuthUsers.get`, `memorystore.tokenAuthUsers.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Memorystore Viewer (`roles/memorystore.viewer`)

- Readonly access to Memorystore resources.
- Permissions (20): `memorystore.aclPolicies.get`, `memorystore.aclPolicies.list`, `memorystore.aclPolicyRevisions.get`, `memorystore.aclPolicyRevisions.list`, `memorystore.backupCollections.get`, `memorystore.backupCollections.list`, `memorystore.backupCollections.listEffectiveTags`, `memorystore.backupCollections.listTagBindings`, `memorystore.backups.get`, `memorystore.backups.list`, `memorystore.instances.get`, `memorystore.instances.list`, `memorystore.instances.listEffectiveTags`, `memorystore.instances.listTagBindings`, `memorystore.locations.get`, `memorystore.locations.list`, `memorystore.operations.get`, `memorystore.operations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Memorystore DB Connector User (`roles/memorystore.dbConnectionUser`)

- Access to connecting to Memorystore Server db.
- Permissions (1): `memorystore.instances.connect`

#### Cloud Memorystore Service Agent (`roles/memorystore.serviceAgent`)

- Gives Cloud Memorystore service account access to managed resource > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (20): `compute.globalOperations.get`, `compute.networkAttachments.get`, `compute.networkAttachments.update`, `compute.networks.addPeering`, `compute.networks.get`, `compute.networks.removePeering`, `compute.projects.get`, `compute.routes.get`, `compute.routes.list`, `compute.subnetworks.get`, `compute.subnetworks.list`, `compute.subnetworks.use`, `monitoring.metricDescriptors.create`, `monitoring.metricDescriptors.get`, `monitoring.metricDescriptors.list`, `monitoring.monitoredResourceDescriptors.get`, `monitoring.monitoredResourceDescriptors.list`, `monitoring.timeSeries.create`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/memorystore.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `memorystore.aclPolicies.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/memorystore.admin`, `roles/iam.databasesAdmin` |
| `memorystore.aclPolicies.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/memorystore.admin`, `roles/iam.databasesAdmin` |
| `memorystore.aclPolicies.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/memorystore.admin`, `roles/memorystore.viewer`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.supportUser` |
| `memorystore.aclPolicies.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/memorystore.admin`, `roles/memorystore.viewer`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `memorystore.aclPolicies.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/memorystore.admin`, `roles/iam.databasesAdmin` |
| `memorystore.aclPolicyRevisions.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/memorystore.admin`, `roles/memorystore.viewer`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.supportUser` |
| `memorystore.aclPolicyRevisions.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/memorystore.admin`, `roles/memorystore.viewer`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `memorystore.authTokens.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/memorystore.admin`, `roles/iam.databasesAdmin` |
| `memorystore.authTokens.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/memorystore.admin`, `roles/iam.databasesAdmin` |
| `memorystore.authTokens.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/memorystore.admin`, `roles/iam.databasesAdmin`, `roles/iam.supportUser` |
| `memorystore.authTokens.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/memorystore.admin`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `memorystore.backupCollections.createTagBinding` | `roles/admin`, `roles/owner`, `roles/memorystore.admin`, `roles/resourcemanager.tagUser`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.databasesAdmin` |
| `memorystore.backupCollections.deleteTagBinding` | `roles/admin`, `roles/owner`, `roles/memorystore.admin`, `roles/resourcemanager.tagUser`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.databasesAdmin` |
| `memorystore.backupCollections.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/memorystore.admin`, `roles/memorystore.viewer`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.supportUser` |
| `memorystore.backupCollections.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/memorystore.admin`, `roles/memorystore.viewer`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `memorystore.backupCollections.listEffectiveTags` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/memorystore.admin`, `roles/memorystore.viewer`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `memorystore.backupCollections.listTagBindings` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/memorystore.admin`, `roles/memorystore.viewer`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `memorystore.backups.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/memorystore.admin`, `roles/iam.databasesAdmin` |
| `memorystore.backups.export` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/memorystore.admin`, `roles/iam.databasesAdmin` |
| `memorystore.backups.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/memorystore.admin`, `roles/memorystore.viewer`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.supportUser` |
| `memorystore.backups.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/memorystore.admin`, `roles/memorystore.viewer`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `memorystore.instances.backup` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/memorystore.admin`, `roles/iam.databasesAdmin` |
| `memorystore.instances.connect` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/memorystore.admin`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/memorystore.dbConnectionUser` |
| `memorystore.instances.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/memorystore.admin`, `roles/iam.databasesAdmin` |
| `memorystore.instances.createTagBinding` | `roles/admin`, `roles/owner`, `roles/memorystore.admin`, `roles/resourcemanager.tagUser`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.databasesAdmin` |
| `memorystore.instances.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/memorystore.admin`, `roles/iam.databasesAdmin` |
| `memorystore.instances.deleteTagBinding` | `roles/admin`, `roles/owner`, `roles/memorystore.admin`, `roles/resourcemanager.tagUser`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.databasesAdmin` |
| `memorystore.instances.finishMigration` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/memorystore.admin`, `roles/iam.databasesAdmin` |
| `memorystore.instances.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/memorystore.admin`, `roles/memorystore.viewer`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.supportUser` |
| `memorystore.instances.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/memorystore.admin`, `roles/memorystore.viewer`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` |
| `memorystore.instances.listEffectiveTags` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/memorystore.admin`, `roles/memorystore.viewer`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `memorystore.instances.listTagBindings` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/memorystore.admin`, `roles/memorystore.viewer`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `memorystore.instances.startMigration` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/memorystore.admin`, `roles/iam.databasesAdmin` |
| `memorystore.instances.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/memorystore.admin`, `roles/iam.databasesAdmin` |
| `memorystore.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/memorystore.admin`, `roles/memorystore.viewer`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` |
| `memorystore.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/memorystore.admin`, `roles/memorystore.viewer`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` |
| `memorystore.operations.cancel` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/memorystore.admin`, `roles/iam.databasesAdmin` |
| `memorystore.operations.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/memorystore.admin`, `roles/iam.databasesAdmin` |
| `memorystore.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/memorystore.admin`, `roles/memorystore.viewer`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.supportUser` |
| `memorystore.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/memorystore.admin`, `roles/memorystore.viewer`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `memorystore.tokenAuthUsers.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/memorystore.admin`, `roles/iam.databasesAdmin` |
| `memorystore.tokenAuthUsers.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/memorystore.admin`, `roles/iam.databasesAdmin` |
| `memorystore.tokenAuthUsers.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/memorystore.admin`, `roles/iam.databasesAdmin`, `roles/iam.supportUser` |
| `memorystore.tokenAuthUsers.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/memorystore.admin`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |

## Notes

- Roles and permissions of the `memorystore` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/memorystore (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
