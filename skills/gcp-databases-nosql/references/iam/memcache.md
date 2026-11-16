---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/memcache
---

# Memorystore for Memcached IAM roles and permissions

## Signature / Usage

Predefined roles of `memcache` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Cloud Memorystore Memcached Admin (`roles/memcache.admin`)

- Full access to Memcached instances and related resources.
- Permissions (23): `compute.networks.list`, `memcache.instances.applyParameters`, `memcache.instances.applySoftwareUpdate`, `memcache.instances.create`, `memcache.instances.createTagBinding`, `memcache.instances.delete`, `memcache.instances.deleteTagBinding`, `memcache.instances.get`, `memcache.instances.list`, `memcache.instances.listEffectiveTags`, `memcache.instances.listTagBindings`, `memcache.instances.rescheduleMaintenance`, `memcache.instances.update`, `memcache.instances.updateParameters`, `memcache.instances.upgrade`, `memcache.locations.get`, `memcache.locations.list`, `memcache.operations.cancel`, `memcache.operations.delete`, `memcache.operations.get`, `memcache.operations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud Memorystore Memcached Editor (`roles/memcache.editor`)

- Read-Write access to Memcached instances and related resources.
- Permissions (17): `memcache.instances.applyParameters`, `memcache.instances.createTagBinding`, `memcache.instances.deleteTagBinding`, `memcache.instances.get`, `memcache.instances.list`, `memcache.instances.listEffectiveTags`, `memcache.instances.listTagBindings`, `memcache.instances.update`, `memcache.instances.updateParameters`, `memcache.locations.get`, `memcache.locations.list`, `memcache.operations.cancel`, `memcache.operations.delete`, `memcache.operations.get`, `memcache.operations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud Memorystore Memcached Viewer (`roles/memcache.viewer`)

- Read-only access to Memcached instances and related resources.
- Permissions (8): `memcache.instances.get`, `memcache.instances.list`, `memcache.locations.get`, `memcache.locations.list`, `memcache.operations.get`, `memcache.operations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud Memorystore Memcached Service Agent (`roles/memcache.serviceAgent`)

- Gives Cloud Memorystore Memcached service account access to managed resource > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (17): `compute.globalOperations.get`, `compute.networks.addPeering`, `compute.networks.get`, `compute.networks.removePeering`, `compute.networks.update`, `compute.routes.get`, `compute.routes.list`, `compute.subnetworks.get`, `compute.subnetworks.list`, `monitoring.metricDescriptors.create`, `monitoring.metricDescriptors.get`, `monitoring.metricDescriptors.list`, `monitoring.monitoredResourceDescriptors.get`, `monitoring.monitoredResourceDescriptors.list`, `monitoring.timeSeries.create`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Project):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/memcache.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `memcache.instances.applyParameters` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/memcache.admin`, `roles/memcache.editor`, `roles/iam.databasesAdmin` |
| `memcache.instances.applySoftwareUpdate` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/memcache.admin`, `roles/iam.databasesAdmin` |
| `memcache.instances.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/memcache.admin`, `roles/iam.databasesAdmin` |
| `memcache.instances.createTagBinding` | `roles/admin`, `roles/owner`, `roles/memcache.admin`, `roles/memcache.editor`, `roles/resourcemanager.tagUser`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.databasesAdmin` |
| `memcache.instances.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/memcache.admin`, `roles/iam.databasesAdmin` |
| `memcache.instances.deleteTagBinding` | `roles/admin`, `roles/owner`, `roles/memcache.admin`, `roles/memcache.editor`, `roles/resourcemanager.tagUser`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.databasesAdmin` |
| `memcache.instances.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/memcache.admin`, `roles/memcache.editor`, `roles/memcache.viewer`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.supportUser` |
| `memcache.instances.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/memcache.admin`, `roles/memcache.editor`, `roles/memcache.viewer`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` |
| `memcache.instances.listEffectiveTags` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/memcache.admin`, `roles/memcache.editor`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `memcache.instances.listTagBindings` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/memcache.admin`, `roles/memcache.editor`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `memcache.instances.rescheduleMaintenance` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/memcache.admin`, `roles/iam.databasesAdmin` |
| `memcache.instances.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/memcache.admin`, `roles/memcache.editor`, `roles/iam.databasesAdmin` |
| `memcache.instances.updateParameters` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/memcache.admin`, `roles/memcache.editor`, `roles/iam.databasesAdmin` |
| `memcache.instances.upgrade` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/memcache.admin`, `roles/iam.databasesAdmin` |
| `memcache.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/memcache.admin`, `roles/memcache.editor`, `roles/memcache.viewer`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.supportUser` |
| `memcache.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/memcache.admin`, `roles/memcache.editor`, `roles/memcache.viewer`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` |
| `memcache.operations.cancel` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/memcache.admin`, `roles/memcache.editor`, `roles/iam.databasesAdmin` |
| `memcache.operations.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/memcache.admin`, `roles/memcache.editor`, `roles/iam.databasesAdmin` |
| `memcache.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/memcache.admin`, `roles/memcache.editor`, `roles/memcache.viewer`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.supportUser` |
| `memcache.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/memcache.admin`, `roles/memcache.editor`, `roles/memcache.viewer`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |

## Notes

- Roles and permissions of the `memcache` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/memcache (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
