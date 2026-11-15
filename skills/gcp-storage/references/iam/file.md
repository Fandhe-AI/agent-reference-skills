---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/file
---

# Filestore IAM roles and permissions

## Signature / Usage

Predefined roles of `file` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Cloud Filestore Admin (`roles/file.admin`)

- Launch stage: Beta
- Admin role for Cloud Filestore
- Permissions (56): `backupdr.backupPlanAssociations.createForFilestoreInstance`, `backupdr.backupPlanAssociations.deleteForFilestoreInstance`, `backupdr.backupPlanAssociations.fetchForFilestoreInstance`, `backupdr.backupPlanAssociations.getForFilestoreInstance`, `backupdr.backupPlanAssociations.triggerBackupForFilestoreInstance`, `backupdr.backupPlanAssociations.updateForFilestoreInstance`, `backupdr.backupPlans.get`, `backupdr.backupPlans.list`, `backupdr.backupPlans.useForFilestoreInstance`, `backupdr.backupVaults.get`, `backupdr.backupVaults.list`, `backupdr.bvbackups.useReadOnlyForFilestoreInstance`, `backupdr.dataSourceReferences.fetchForFilestoreInstance`, `backupdr.dataSourceReferences.getForFilestoreInstance`, `backupdr.locations.list`, `backupdr.operations.get`, `backupdr.serviceConfig.initialize`, `cloudkms.keyHandles.create`, `cloudkms.keyHandles.get`, `cloudkms.keyHandles.list`, `cloudkms.operations.get`, `cloudkms.projects.showEffectiveAutokeyConfig`, `file.backups.create`, `file.backups.createTagBinding`, `file.backups.delete`, `file.backups.deleteTagBinding`, `file.backups.get`, `file.backups.list`, `file.backups.listEffectiveTags`, `file.backups.listTagBindings`, `file.backups.update`, `file.backups.useReadOnly`, `file.instances.create`, `file.instances.createCrossProjectBackup`, `file.instances.createTagBinding`, `file.instances.delete`, `file.instances.deleteTagBinding`, `file.instances.get`, `file.instances.list`, `file.instances.listEffectiveTags`, `file.instances.listTagBindings`, `file.instances.restore`, `file.instances.revert`, `file.instances.update`, `file.locations.get`, `file.locations.list`, `file.operations.cancel`, `file.operations.delete`, `file.operations.get`, `file.operations.list`, `file.snapshots.createTagBinding`, `file.snapshots.deleteTagBinding`, `file.snapshots.listEffectiveTags`, `file.snapshots.listTagBindings`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud Filestore Editor (`roles/file.editor`)

- Launch stage: Beta
- Read-write access to Filestore instances and related resources.
- Permissions (54): `backupdr.backupPlanAssociations.createForFilestoreInstance`, `backupdr.backupPlanAssociations.deleteForFilestoreInstance`, `backupdr.backupPlanAssociations.fetchForFilestoreInstance`, `backupdr.backupPlanAssociations.getForFilestoreInstance`, `backupdr.backupPlanAssociations.triggerBackupForFilestoreInstance`, `backupdr.backupPlanAssociations.updateForFilestoreInstance`, `backupdr.backupPlans.get`, `backupdr.backupPlans.list`, `backupdr.backupPlans.useForFilestoreInstance`, `backupdr.backupVaults.get`, `backupdr.backupVaults.list`, `backupdr.bvbackups.useReadOnlyForFilestoreInstance`, `backupdr.dataSourceReferences.fetchForFilestoreInstance`, `backupdr.dataSourceReferences.getForFilestoreInstance`, `backupdr.locations.list`, `backupdr.operations.get`, `backupdr.serviceConfig.initialize`, `cloudkms.keyHandles.create`, `cloudkms.keyHandles.get`, `cloudkms.keyHandles.list`, `cloudkms.operations.get`, `cloudkms.projects.showEffectiveAutokeyConfig`, `file.backups.create`, `file.backups.createTagBinding`, `file.backups.delete`, `file.backups.deleteTagBinding`, `file.backups.get`, `file.backups.list`, `file.backups.listEffectiveTags`, `file.backups.listTagBindings`, `file.backups.update`, `file.backups.useReadOnly`, `file.instances.create`, `file.instances.createCrossProjectBackup`, `file.instances.createTagBinding`, `file.instances.delete`, `file.instances.deleteTagBinding`, `file.instances.get`, `file.instances.list`, `file.instances.listEffectiveTags`, `file.instances.listTagBindings`, `file.instances.restore`, `file.instances.revert`, `file.instances.update`, `file.locations.get`, `file.locations.list`, `file.operations.cancel`, `file.operations.delete`, `file.operations.get`, `file.operations.list`, `file.snapshots.createTagBinding`, `file.snapshots.deleteTagBinding`, `file.snapshots.listEffectiveTags`, `file.snapshots.listTagBindings`

#### Cloud Filestore Viewer (`roles/file.viewer`)

- Launch stage: Beta
- Read-only access to Filestore instances and related resources.
- Permissions (19): `backupdr.backupPlanAssociations.fetchForFilestoreInstance`, `backupdr.backupPlanAssociations.getForFilestoreInstance`, `backupdr.dataSourceReferences.fetchForFilestoreInstance`, `backupdr.dataSourceReferences.getForFilestoreInstance`, `file.backups.get`, `file.backups.list`, `file.backups.listEffectiveTags`, `file.backups.listTagBindings`, `file.backups.useReadOnly`, `file.instances.get`, `file.instances.list`, `file.instances.listEffectiveTags`, `file.instances.listTagBindings`, `file.locations.get`, `file.locations.list`, `file.operations.get`, `file.operations.list`, `file.snapshots.listEffectiveTags`, `file.snapshots.listTagBindings`

#### Cloud Filestore Service Agent (`roles/file.serviceAgent`)

- Gives Cloud Filestore service account access to managed resources. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (15): `compute.globalOperations.get`, `compute.networks.addPeering`, `compute.networks.get`, `compute.networks.removePeering`, `compute.networks.update`, `compute.networks.updatePeering`, `compute.routes.list`, `monitoring.metricDescriptors.create`, `monitoring.metricDescriptors.get`, `monitoring.metricDescriptors.list`, `monitoring.monitoredResourceDescriptors.get`, `monitoring.monitoredResourceDescriptors.list`, `monitoring.timeSeries.create`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Project):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/file.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `file.backups.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/file.admin`, `roles/file.editor`, `roles/backupdr.filestoreOperator` (+2 service agent roles) |
| `file.backups.createTagBinding` | `roles/admin`, `roles/owner`, `roles/file.admin`, `roles/file.editor`, `roles/resourcemanager.tagUser`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver` (+1 service agent role) |
| `file.backups.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/file.admin`, `roles/file.editor` (+1 service agent role) |
| `file.backups.deleteTagBinding` | `roles/admin`, `roles/owner`, `roles/file.admin`, `roles/file.editor`, `roles/resourcemanager.tagUser`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver` (+1 service agent role) |
| `file.backups.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/file.admin`, `roles/file.editor`, `roles/file.viewer`, `roles/iam.supportUser` (+1 service agent role) |
| `file.backups.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/file.admin`, `roles/file.editor`, `roles/file.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` (+1 service agent role) |
| `file.backups.listEffectiveTags` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/file.admin`, `roles/file.editor`, `roles/file.viewer`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+1 service agent role) |
| `file.backups.listTagBindings` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/file.admin`, `roles/file.editor`, `roles/file.viewer`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+1 service agent role) |
| `file.backups.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/file.admin`, `roles/file.editor` (+1 service agent role) |
| `file.backups.useReadOnly` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/file.admin`, `roles/file.editor`, `roles/file.viewer`, `roles/iam.supportUser` (+1 service agent role) |
| `file.instances.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/file.admin`, `roles/file.editor` (+3 service agent roles) |
| `file.instances.createCrossProjectBackup` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/file.admin`, `roles/file.editor`, `roles/backupdr.filestoreOperator` (+2 service agent roles) |
| `file.instances.createTagBinding` | `roles/admin`, `roles/owner`, `roles/file.admin`, `roles/file.editor`, `roles/resourcemanager.tagUser`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver` (+1 service agent role) |
| `file.instances.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/file.admin`, `roles/file.editor` (+3 service agent roles) |
| `file.instances.deleteTagBinding` | `roles/admin`, `roles/owner`, `roles/file.admin`, `roles/file.editor`, `roles/resourcemanager.tagUser`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver` (+1 service agent role) |
| `file.instances.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/file.admin`, `roles/file.editor`, `roles/file.viewer`, `roles/backupdr.filestoreOperator`, `roles/iam.supportUser` (+5 service agent roles) |
| `file.instances.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/file.admin`, `roles/file.editor`, `roles/file.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` (+3 service agent roles) |
| `file.instances.listEffectiveTags` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/file.admin`, `roles/file.editor`, `roles/file.viewer`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+1 service agent role) |
| `file.instances.listTagBindings` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/file.admin`, `roles/file.editor`, `roles/file.viewer`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+1 service agent role) |
| `file.instances.restore` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/file.admin`, `roles/file.editor` (+1 service agent role) |
| `file.instances.revert` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/file.admin`, `roles/file.editor` (+1 service agent role) |
| `file.instances.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/file.admin`, `roles/file.editor` (+3 service agent roles) |
| `file.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/file.admin`, `roles/file.editor`, `roles/file.viewer`, `roles/iam.supportUser` (+2 service agent roles) |
| `file.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/file.admin`, `roles/file.editor`, `roles/file.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` (+2 service agent roles) |
| `file.operations.cancel` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/file.admin`, `roles/file.editor` (+1 service agent role) |
| `file.operations.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/file.admin`, `roles/file.editor` (+1 service agent role) |
| `file.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/file.admin`, `roles/file.editor`, `roles/file.viewer`, `roles/iam.supportUser` (+4 service agent roles) |
| `file.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/file.admin`, `roles/file.editor`, `roles/file.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+2 service agent roles) |
| `file.snapshots.createTagBinding` | `roles/admin`, `roles/owner`, `roles/file.admin`, `roles/file.editor`, `roles/resourcemanager.tagUser`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver` (+1 service agent role) |
| `file.snapshots.deleteTagBinding` | `roles/admin`, `roles/owner`, `roles/file.admin`, `roles/file.editor`, `roles/resourcemanager.tagUser`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver` (+1 service agent role) |
| `file.snapshots.listEffectiveTags` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/file.admin`, `roles/file.editor`, `roles/file.viewer`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+1 service agent role) |
| `file.snapshots.listTagBindings` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/file.admin`, `roles/file.editor`, `roles/file.viewer`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+1 service agent role) |

## Notes

- Roles and permissions of the `file` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/file (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
