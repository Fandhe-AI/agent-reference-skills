---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/netapp
---

# Google Cloud NetApp Volumes IAM roles and permissions

## Signature / Usage

Predefined roles of `netapp` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Google Cloud NetApp Volumes Admin (`roles/netapp.admin`)

- Launch stage: Beta
- Full access to Google Cloud NetApp Volumes resources.
- Permissions (103): `backupdr.backupPlanAssociations.createForNetappVolumes`, `backupdr.backupPlanAssociations.deleteForNetappVolumes`, `backupdr.backupPlanAssociations.fetchForNetappVolumes`, `backupdr.backupPlanAssociations.getForNetappVolumes`, `backupdr.backupPlanAssociations.triggerBackupForNetappVolumes`, `backupdr.backupPlanAssociations.updateForNetappVolumes`, `backupdr.backupPlans.get`, `backupdr.backupPlans.list`, `backupdr.backupPlans.useForNetappVolumes`, `backupdr.backupVaults.get`, `backupdr.backupVaults.list`, `backupdr.bvbackups.fetchForNetappVolumes`, `backupdr.bvbackups.useReadOnlyForNetappVolumes`, `backupdr.dataSourceReferences.fetchForNetappVolumes`, `backupdr.dataSourceReferences.getForNetappVolumes`, `backupdr.locations.list`, `backupdr.operations.get`, `backupdr.serviceConfig.initialize`, `netapp.activeDirectories.create`, `netapp.activeDirectories.delete`, `netapp.activeDirectories.get`, `netapp.activeDirectories.list`, `netapp.activeDirectories.update`, `netapp.backupPolicies.create`, `netapp.backupPolicies.delete`, `netapp.backupPolicies.get`, `netapp.backupPolicies.list`, `netapp.backupPolicies.update`, `netapp.backupVaults.create`, `netapp.backupVaults.delete`, `netapp.backupVaults.get`, `netapp.backupVaults.list`, `netapp.backupVaults.update`, `netapp.backups.create`, `netapp.backups.delete`, `netapp.backups.get`, `netapp.backups.list`, `netapp.backups.update`, `netapp.backups.useReadOnly`, `netapp.hostGroups.create`, `netapp.hostGroups.delete`, `netapp.hostGroups.get`, `netapp.hostGroups.list`, `netapp.hostGroups.update`, `netapp.kmsConfigs.create`, `netapp.kmsConfigs.delete`, `netapp.kmsConfigs.encrypt`, `netapp.kmsConfigs.get`, `netapp.kmsConfigs.list`, `netapp.kmsConfigs.update`, `netapp.kmsConfigs.verify`, `netapp.locations.get`, `netapp.locations.list`, `netapp.ontap.delete`, `netapp.ontap.get`, `netapp.ontap.patch`, `netapp.ontap.post`, `netapp.operations.cancel`, `netapp.operations.delete`, `netapp.operations.get`, `netapp.operations.list`, `netapp.quotaRules.create`, `netapp.quotaRules.delete`, `netapp.quotaRules.get`, `netapp.quotaRules.list`, `netapp.quotaRules.update`, `netapp.replications.create`, `netapp.replications.delete`, `netapp.replications.establishPeering`, `netapp.replications.get`, `netapp.replications.list`, `netapp.replications.resume`, `netapp.replications.reverse`, `netapp.replications.stop`, `netapp.replications.sync`, `netapp.replications.update`, `netapp.snapshots.create`, `netapp.snapshots.delete`, `netapp.snapshots.get`, `netapp.snapshots.list`, `netapp.snapshots.update`, `netapp.storagePools.create`, `netapp.storagePools.delete`, `netapp.storagePools.get`, `netapp.storagePools.list`, `netapp.storagePools.listBackupConfigs`, `netapp.storagePools.restoreVolume`, `netapp.storagePools.switch`, `netapp.storagePools.update`, `netapp.storagePools.updateBackupConfig`, `netapp.storagePools.validateDirectoryService`, `netapp.volumes.create`, `netapp.volumes.createCrossProjectBackup`, `netapp.volumes.delete`, `netapp.volumes.export`, `netapp.volumes.findValidCRRRegions`, `netapp.volumes.get`, `netapp.volumes.list`, `netapp.volumes.restore`, `netapp.volumes.revert`, `netapp.volumes.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Google Cloud NetApp Volumes Viewer (`roles/netapp.viewer`)

- Launch stage: Beta
- Readonly access to Google Cloud NetApp Volumes resources.
- Permissions (35): `backupdr.backupPlanAssociations.fetchForNetappVolumes`, `backupdr.backupPlanAssociations.getForNetappVolumes`, `backupdr.bvbackups.fetchForNetappVolumes`, `backupdr.dataSourceReferences.fetchForNetappVolumes`, `backupdr.dataSourceReferences.getForNetappVolumes`, `netapp.activeDirectories.get`, `netapp.activeDirectories.list`, `netapp.backupPolicies.get`, `netapp.backupPolicies.list`, `netapp.backupVaults.get`, `netapp.backupVaults.list`, `netapp.backups.get`, `netapp.backups.list`, `netapp.hostGroups.get`, `netapp.hostGroups.list`, `netapp.kmsConfigs.get`, `netapp.kmsConfigs.list`, `netapp.locations.get`, `netapp.locations.list`, `netapp.ontap.get`, `netapp.operations.get`, `netapp.operations.list`, `netapp.quotaRules.get`, `netapp.quotaRules.list`, `netapp.replications.get`, `netapp.replications.list`, `netapp.snapshots.get`, `netapp.snapshots.list`, `netapp.storagePools.get`, `netapp.storagePools.list`, `netapp.storagePools.listBackupConfigs`, `netapp.volumes.get`, `netapp.volumes.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Google Cloud NetApp Volumes Data Exporter (`roles/netapp.dataExporter`)

- Launch stage: Beta
- Access to export data from Google Cloud NetApp Volumes.
- Permissions (2): `netapp.operations.get`, `netapp.volumes.export`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Project):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/netapp.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `netapp.activeDirectories.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.activeDirectories.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.activeDirectories.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/netapp.admin`, `roles/netapp.viewer`, `roles/iam.supportUser` |
| `netapp.activeDirectories.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/netapp.admin`, `roles/netapp.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` |
| `netapp.activeDirectories.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.backupPolicies.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.backupPolicies.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.backupPolicies.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/netapp.admin`, `roles/netapp.viewer`, `roles/iam.supportUser` |
| `netapp.backupPolicies.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/netapp.admin`, `roles/netapp.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` |
| `netapp.backupPolicies.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.backupVaults.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.backupVaults.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.backupVaults.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/netapp.admin`, `roles/netapp.viewer`, `roles/iam.supportUser` |
| `netapp.backupVaults.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/netapp.admin`, `roles/netapp.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` |
| `netapp.backupVaults.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.backups.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.backups.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.backups.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/netapp.admin`, `roles/netapp.viewer`, `roles/iam.supportUser` |
| `netapp.backups.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/netapp.admin`, `roles/netapp.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` |
| `netapp.backups.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.backups.useReadOnly` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/netapp.admin`, `roles/iam.supportUser` |
| `netapp.hostGroups.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.hostGroups.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.hostGroups.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/netapp.admin`, `roles/netapp.viewer`, `roles/iam.supportUser` |
| `netapp.hostGroups.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/netapp.admin`, `roles/netapp.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` |
| `netapp.hostGroups.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.kmsConfigs.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.kmsConfigs.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.kmsConfigs.encrypt` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.kmsConfigs.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/netapp.admin`, `roles/netapp.viewer`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` |
| `netapp.kmsConfigs.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/netapp.admin`, `roles/netapp.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` |
| `netapp.kmsConfigs.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.kmsConfigs.verify` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/netapp.admin`, `roles/netapp.viewer`, `roles/iam.supportUser` |
| `netapp.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/netapp.admin`, `roles/netapp.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` |
| `netapp.ontap.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.ontap.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/netapp.admin`, `roles/netapp.viewer`, `roles/iam.supportUser` (+1 service agent role) |
| `netapp.ontap.patch` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.ontap.post` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.operations.cancel` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.operations.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/netapp.admin`, `roles/netapp.viewer`, `roles/iam.supportUser`, `roles/netapp.dataExporter` (+1 service agent role) |
| `netapp.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/netapp.admin`, `roles/netapp.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `netapp.quotaRules.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.quotaRules.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.quotaRules.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/netapp.admin`, `roles/netapp.viewer`, `roles/iam.supportUser` |
| `netapp.quotaRules.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/netapp.admin`, `roles/netapp.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `netapp.quotaRules.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.replications.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.replications.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.replications.establishPeering` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.replications.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/netapp.admin`, `roles/netapp.viewer`, `roles/iam.supportUser` |
| `netapp.replications.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/netapp.admin`, `roles/netapp.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` |
| `netapp.replications.resume` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.replications.reverse` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.replications.stop` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.replications.sync` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.replications.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.snapshots.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.snapshots.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.snapshots.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/netapp.admin`, `roles/netapp.viewer`, `roles/iam.supportUser` |
| `netapp.snapshots.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/netapp.admin`, `roles/netapp.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` |
| `netapp.snapshots.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.storagePools.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.storagePools.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.storagePools.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/netapp.admin`, `roles/netapp.viewer`, `roles/iam.supportUser` (+1 service agent role) |
| `netapp.storagePools.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/netapp.admin`, `roles/netapp.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` |
| `netapp.storagePools.listBackupConfigs` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/netapp.admin`, `roles/netapp.viewer`, `roles/iam.supportUser` |
| `netapp.storagePools.restoreVolume` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.storagePools.switch` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.storagePools.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.storagePools.updateBackupConfig` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.storagePools.validateDirectoryService` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.volumes.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.volumes.createCrossProjectBackup` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` (+1 service agent role) |
| `netapp.volumes.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.volumes.export` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin`, `roles/netapp.dataExporter` |
| `netapp.volumes.findValidCRRRegions` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/netapp.admin`, `roles/iam.supportUser` |
| `netapp.volumes.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/netapp.admin`, `roles/netapp.viewer`, `roles/iam.supportUser` (+2 service agent roles) |
| `netapp.volumes.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/netapp.admin`, `roles/netapp.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` (+1 service agent role) |
| `netapp.volumes.restore` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.volumes.revert` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |
| `netapp.volumes.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netapp.admin` |

## Notes

- Roles and permissions of the `netapp` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/netapp (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
