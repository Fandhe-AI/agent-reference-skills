---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/redis
---

# Memorystore for Redis IAM roles and permissions

## Signature / Usage

Predefined roles of `redis` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Cloud Memorystore Redis Admin (`roles/redis.admin`)

- Full access to Redis instances and related resources.
- Permissions (58): `cloudkms.keyHandles.create`, `cloudkms.keyHandles.get`, `cloudkms.keyHandles.list`, `cloudkms.operations.get`, `cloudkms.projects.showEffectiveAutokeyConfig`, `compute.networks.list`, `networkconnectivity.serviceConnectionPolicies.list`, `redis.aclPolicies.create`, `redis.aclPolicies.delete`, `redis.aclPolicies.get`, `redis.aclPolicies.list`, `redis.aclPolicies.update`, `redis.backupCollections.create`, `redis.backupCollections.delete`, `redis.backupCollections.get`, `redis.backupCollections.list`, `redis.backups.create`, `redis.backups.delete`, `redis.backups.export`, `redis.backups.get`, `redis.backups.list`, `redis.clusters.backup`, `redis.clusters.connect`, `redis.clusters.create`, `redis.clusters.createTagBinding`, `redis.clusters.delete`, `redis.clusters.deleteTagBinding`, `redis.clusters.get`, `redis.clusters.list`, `redis.clusters.listEffectiveTags`, `redis.clusters.listTagBindings`, `redis.clusters.rescheduleMaintenance`, `redis.clusters.update`, `redis.instances.create`, `redis.instances.createTagBinding`, `redis.instances.delete`, `redis.instances.deleteTagBinding`, `redis.instances.export`, `redis.instances.failover`, `redis.instances.get`, `redis.instances.getAuthString`, `redis.instances.import`, `redis.instances.list`, `redis.instances.listEffectiveTags`, `redis.instances.listTagBindings`, `redis.instances.rescheduleMaintenance`, `redis.instances.update`, `redis.instances.updateAuth`, `redis.instances.upgrade`, `redis.locations.get`, `redis.locations.list`, `redis.operations.cancel`, `redis.operations.delete`, `redis.operations.get`, `redis.operations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `serviceusage.services.use`

#### Cloud Memorystore Redis Editor (`roles/redis.editor`)

- Read-Write access to Redis instances and related resources.
- Permissions (45): `compute.networks.list`, `redis.aclPolicies.create`, `redis.aclPolicies.delete`, `redis.aclPolicies.get`, `redis.aclPolicies.list`, `redis.aclPolicies.update`, `redis.backupCollections.create`, `redis.backupCollections.delete`, `redis.backupCollections.get`, `redis.backupCollections.list`, `redis.backups.create`, `redis.backups.delete`, `redis.backups.export`, `redis.backups.get`, `redis.backups.list`, `redis.clusters.backup`, `redis.clusters.connect`, `redis.clusters.create`, `redis.clusters.delete`, `redis.clusters.get`, `redis.clusters.list`, `redis.clusters.rescheduleMaintenance`, `redis.clusters.update`, `redis.instances.create`, `redis.instances.delete`, `redis.instances.export`, `redis.instances.failover`, `redis.instances.get`, `redis.instances.import`, `redis.instances.list`, `redis.instances.listEffectiveTags`, `redis.instances.listTagBindings`, `redis.instances.rescheduleMaintenance`, `redis.instances.update`, `redis.instances.updateAuth`, `redis.instances.upgrade`, `redis.locations.get`, `redis.locations.list`, `redis.operations.cancel`, `redis.operations.delete`, `redis.operations.get`, `redis.operations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `serviceusage.services.use`

#### Cloud Memorystore Redis Viewer (`roles/redis.viewer`)

- Read-only access to Redis instances and related resources.
- Permissions (21): `redis.aclPolicies.get`, `redis.aclPolicies.list`, `redis.backupCollections.get`, `redis.backupCollections.list`, `redis.backups.get`, `redis.backups.list`, `redis.clusters.get`, `redis.clusters.list`, `redis.clusters.listEffectiveTags`, `redis.clusters.listTagBindings`, `redis.instances.get`, `redis.instances.list`, `redis.instances.listEffectiveTags`, `redis.instances.listTagBindings`, `redis.locations.get`, `redis.locations.list`, `redis.operations.get`, `redis.operations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `serviceusage.services.use`

#### Cloud Memorystore Redis Db Connection User (`roles/redis.dbConnectionUser`)

- Launch stage: Beta
- Access to connecting to Redis Server db.
- Permissions (1): `redis.clusters.connect`

#### Cloud Memorystore Redis Service Agent (`roles/redis.serviceAgent`)

- Gives Cloud Memorystore Redis service account access to managed resource > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (18): `compute.globalOperations.get`, `compute.networks.addPeering`, `compute.networks.get`, `compute.networks.removePeering`, `compute.networks.update`, `compute.projects.get`, `compute.routes.get`, `compute.routes.list`, `compute.subnetworks.get`, `compute.subnetworks.list`, `monitoring.metricDescriptors.create`, `monitoring.metricDescriptors.get`, `monitoring.metricDescriptors.list`, `monitoring.monitoredResourceDescriptors.get`, `monitoring.monitoredResourceDescriptors.list`, `monitoring.timeSeries.create`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/redis.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `redis.aclPolicies.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/redis.admin`, `roles/redis.editor`, `roles/iam.databasesAdmin` |
| `redis.aclPolicies.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/redis.admin`, `roles/redis.editor`, `roles/iam.databasesAdmin` |
| `redis.aclPolicies.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/redis.admin`, `roles/redis.editor`, `roles/redis.viewer`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.supportUser` |
| `redis.aclPolicies.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/redis.admin`, `roles/redis.editor`, `roles/redis.viewer`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `redis.aclPolicies.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/redis.admin`, `roles/redis.editor`, `roles/iam.databasesAdmin` |
| `redis.backupCollections.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/redis.admin`, `roles/redis.editor`, `roles/iam.databasesAdmin` |
| `redis.backupCollections.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/redis.admin`, `roles/redis.editor`, `roles/iam.databasesAdmin` |
| `redis.backupCollections.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/redis.admin`, `roles/redis.editor`, `roles/redis.viewer`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.supportUser` |
| `redis.backupCollections.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/redis.admin`, `roles/redis.editor`, `roles/redis.viewer`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` |
| `redis.backups.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/redis.admin`, `roles/redis.editor`, `roles/iam.databasesAdmin` |
| `redis.backups.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/redis.admin`, `roles/redis.editor`, `roles/iam.databasesAdmin` |
| `redis.backups.export` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/redis.admin`, `roles/redis.editor`, `roles/iam.databasesAdmin`, `roles/iam.supportUser` |
| `redis.backups.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/redis.admin`, `roles/redis.editor`, `roles/redis.viewer`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.supportUser` |
| `redis.backups.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/redis.admin`, `roles/redis.editor`, `roles/redis.viewer`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` |
| `redis.clusters.backup` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/redis.admin`, `roles/redis.editor`, `roles/iam.databasesAdmin` |
| `redis.clusters.connect` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/redis.admin`, `roles/redis.editor`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/redis.dbConnectionUser` |
| `redis.clusters.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/redis.admin`, `roles/redis.editor`, `roles/iam.databasesAdmin` |
| `redis.clusters.createTagBinding` | `roles/admin`, `roles/owner`, `roles/redis.admin`, `roles/resourcemanager.tagUser`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.databasesAdmin` |
| `redis.clusters.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/redis.admin`, `roles/redis.editor`, `roles/iam.databasesAdmin` |
| `redis.clusters.deleteTagBinding` | `roles/admin`, `roles/owner`, `roles/redis.admin`, `roles/resourcemanager.tagUser`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.databasesAdmin` |
| `redis.clusters.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/redis.admin`, `roles/redis.editor`, `roles/redis.viewer`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.supportUser` |
| `redis.clusters.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/redis.admin`, `roles/redis.editor`, `roles/redis.viewer`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` |
| `redis.clusters.listEffectiveTags` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/redis.admin`, `roles/redis.viewer`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `redis.clusters.listTagBindings` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/redis.admin`, `roles/redis.viewer`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `redis.clusters.rescheduleMaintenance` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/redis.admin`, `roles/redis.editor`, `roles/iam.databasesAdmin` |
| `redis.clusters.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/redis.admin`, `roles/redis.editor`, `roles/iam.databasesAdmin` |
| `redis.instances.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/redis.admin`, `roles/redis.editor`, `roles/iam.databasesAdmin` (+1 service agent role) |
| `redis.instances.createTagBinding` | `roles/admin`, `roles/owner`, `roles/redis.admin`, `roles/resourcemanager.tagUser`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.databasesAdmin` |
| `redis.instances.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/redis.admin`, `roles/redis.editor`, `roles/iam.databasesAdmin` (+1 service agent role) |
| `redis.instances.deleteTagBinding` | `roles/admin`, `roles/owner`, `roles/redis.admin`, `roles/resourcemanager.tagUser`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.databasesAdmin` |
| `redis.instances.export` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/redis.admin`, `roles/redis.editor`, `roles/iam.databasesAdmin` |
| `redis.instances.failover` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/redis.admin`, `roles/redis.editor`, `roles/iam.databasesAdmin` |
| `redis.instances.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/redis.admin`, `roles/redis.editor`, `roles/redis.viewer`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.supportUser` (+2 service agent roles) |
| `redis.instances.getAuthString` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/redis.admin`, `roles/iam.databasesAdmin` |
| `redis.instances.import` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/redis.admin`, `roles/redis.editor`, `roles/iam.databasesAdmin` |
| `redis.instances.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/redis.admin`, `roles/redis.editor`, `roles/redis.viewer`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` (+1 service agent role) |
| `redis.instances.listEffectiveTags` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/redis.admin`, `roles/redis.editor`, `roles/redis.viewer`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `redis.instances.listTagBindings` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/redis.admin`, `roles/redis.editor`, `roles/redis.viewer`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `redis.instances.rescheduleMaintenance` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/redis.admin`, `roles/redis.editor`, `roles/iam.databasesAdmin` |
| `redis.instances.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/redis.admin`, `roles/redis.editor`, `roles/iam.databasesAdmin` (+1 service agent role) |
| `redis.instances.updateAuth` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/redis.admin`, `roles/redis.editor`, `roles/iam.databasesAdmin` (+1 service agent role) |
| `redis.instances.upgrade` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/redis.admin`, `roles/redis.editor`, `roles/iam.databasesAdmin` |
| `redis.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/redis.admin`, `roles/redis.editor`, `roles/redis.viewer`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.supportUser` |
| `redis.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/redis.admin`, `roles/redis.editor`, `roles/redis.viewer`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` |
| `redis.operations.cancel` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/redis.admin`, `roles/redis.editor`, `roles/iam.databasesAdmin` |
| `redis.operations.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/redis.admin`, `roles/redis.editor`, `roles/iam.databasesAdmin` |
| `redis.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/redis.admin`, `roles/redis.editor`, `roles/redis.viewer`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.supportUser` (+1 service agent role) |
| `redis.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/redis.admin`, `roles/redis.editor`, `roles/redis.viewer`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |

## Notes

- Roles and permissions of the `redis` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/redis (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
