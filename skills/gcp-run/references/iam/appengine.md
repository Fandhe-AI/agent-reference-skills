---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/appengine
---

# App Engine IAM roles and permissions

## Signature / Usage

Predefined roles of `appengine` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### App Engine Service Admin (`roles/appengine.admin`)

- Full access to App Engine resources.
- Permissions (30): `appengine.applications.create`, `appengine.applications.get`, `appengine.applications.listRuntimes`, `appengine.applications.update`, `appengine.instances.delete`, `appengine.instances.enableDebug`, `appengine.instances.get`, `appengine.instances.list`, `appengine.memcache.addKey`, `appengine.memcache.flush`, `appengine.memcache.get`, `appengine.memcache.getKey`, `appengine.memcache.list`, `appengine.memcache.update`, `appengine.operations.get`, `appengine.operations.list`, `appengine.runtimes.actAsAdmin`, `appengine.services.delete`, `appengine.services.get`, `appengine.services.list`, `appengine.services.update`, `appengine.versions.create`, `appengine.versions.delete`, `appengine.versions.exportAppImage`, `appengine.versions.get`, `appengine.versions.getFileContents`, `appengine.versions.list`, `appengine.versions.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### App Engine Admin (`roles/appengine.appAdmin`)

- Read/Write/Modify access to all application configuration and settings. To deploy new versions, a principal must have the Service Account User (https://docs.cloud.google.com/iam/docs/service-account-permissions#user-role) (`roles/iam.serviceAccountUser`) role on the assigned App Engine service account (https://docs.cloud.google.com/appengine/docs/standard/configure-service-accounts), and the Cloud Build Editor (`roles/cloudbuild.builds.editor`), and Cloud Storage Object Admin (`roles/storage.objectAdmin`) roles on the project. Lowest-level resources where you can grant this role: - Project
- Permissions (39): `appengine.applications.get`, `appengine.applications.listRuntimes`, `appengine.applications.update`, `appengine.instances.delete`, `appengine.instances.enableDebug`, `appengine.instances.get`, `appengine.instances.list`, `appengine.memcache.addKey`, `appengine.memcache.flush`, `appengine.memcache.get`, `appengine.memcache.update`, `appengine.operations.get`, `appengine.operations.list`, `appengine.runtimes.actAsAdmin`, `appengine.services.delete`, `appengine.services.get`, `appengine.services.list`, `appengine.services.update`, `appengine.versions.create`, `appengine.versions.delete`, `appengine.versions.exportAppImage`, `appengine.versions.get`, `appengine.versions.list`, `appengine.versions.update`, `artifactregistry.projectsettings.get`, `artifactregistry.repositories.deleteArtifacts`, `artifactregistry.repositories.downloadArtifacts`, `artifactregistry.repositories.uploadArtifacts`, `artifactregistry.tags.get`, `recommender.appengineVersionCostInsights.get`, `recommender.appengineVersionCostInsights.list`, `recommender.appengineVersionCostInsights.update`, `recommender.appengineVersionCostRecommendations.get`, `recommender.appengineVersionCostRecommendations.list`, `recommender.appengineVersionCostRecommendations.update`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### App Engine Service Editor (`roles/appengine.editor`)

- Provides read and write access to App Engine resources.
- Permissions (28): `appengine.applications.get`, `appengine.applications.listRuntimes`, `appengine.applications.update`, `appengine.instances.delete`, `appengine.instances.enableDebug`, `appengine.instances.get`, `appengine.instances.list`, `appengine.memcache.addKey`, `appengine.memcache.flush`, `appengine.memcache.get`, `appengine.memcache.getKey`, `appengine.memcache.list`, `appengine.memcache.update`, `appengine.operations.get`, `appengine.operations.list`, `appengine.runtimes.actAsAdmin`, `appengine.services.delete`, `appengine.services.get`, `appengine.services.list`, `appengine.services.update`, `appengine.versions.create`, `appengine.versions.delete`, `appengine.versions.exportAppImage`, `appengine.versions.get`, `appengine.versions.list`, `appengine.versions.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### App Engine Service Viewer (`roles/appengine.viewer`)

- Read-only access to App Engine resources.
- Permissions (16): `appengine.applications.get`, `appengine.applications.listRuntimes`, `appengine.instances.get`, `appengine.instances.list`, `appengine.memcache.get`, `appengine.memcache.getKey`, `appengine.memcache.list`, `appengine.operations.get`, `appengine.operations.list`, `appengine.runtimes.actAsAdmin`, `appengine.services.get`, `appengine.services.list`, `appengine.versions.get`, `appengine.versions.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### App Engine Creator (`roles/appengine.appCreator`)

- Ability to create the App Engine resource for the project. Lowest-level resources where you can grant this role: - Project
- Permissions (3): `appengine.applications.create`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### App Engine Viewer (`roles/appengine.appViewer`)

- Read-only access to all application configuration and settings. Lowest-level resources where you can grant this role: - Project
- Permissions (19): `appengine.applications.get`, `appengine.applications.listRuntimes`, `appengine.instances.get`, `appengine.instances.list`, `appengine.operations.get`, `appengine.operations.list`, `appengine.services.get`, `appengine.services.list`, `appengine.versions.get`, `appengine.versions.list`, `artifactregistry.projectsettings.get`, `recommender.appengineVersionCostInsights.get`, `recommender.appengineVersionCostInsights.list`, `recommender.appengineVersionCostRecommendations.get`, `recommender.appengineVersionCostRecommendations.list`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### App Engine Code Viewer (`roles/appengine.codeViewer`)

- Read-only access to all application configuration, settings, and deployed source code. Lowest-level resources where you can grant this role: - Project
- Permissions (14): `appengine.applications.get`, `appengine.applications.listRuntimes`, `appengine.instances.get`, `appengine.instances.list`, `appengine.operations.get`, `appengine.operations.list`, `appengine.services.get`, `appengine.services.list`, `appengine.versions.get`, `appengine.versions.getFileContents`, `appengine.versions.list`, `artifactregistry.projectsettings.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### App Engine Managed VM Debug Access (`roles/appengine.debugger`)

- Ability to read or manage v2 instances.
- Permissions (14): `appengine.applications.get`, `appengine.applications.listRuntimes`, `appengine.instances.delete`, `appengine.instances.enableDebug`, `appengine.instances.get`, `appengine.instances.list`, `appengine.operations.get`, `appengine.operations.list`, `appengine.services.get`, `appengine.services.list`, `appengine.versions.get`, `appengine.versions.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### App Engine Deployer (`roles/appengine.deployer`)

- Read-only access to all application configuration and settings. To deploy new versions, you must also have the Service Account User (https://docs.cloud.google.com/iam/docs/service-account-permissions#user-role) (`roles/iam.serviceAccountUser`) role on the assigned App Engine service account (https://docs.cloud.google.com/appengine/docs/standard/configure-service-accounts), and the Cloud Build Editor (`roles/cloudbuild.builds.editor`), and Cloud Storage Object Admin (`roles/storage.objectAdmin`) roles on the project. Cannot modify existing versions other than deleting versions that are not receiving traffic. Lowest-level resources where you can grant this role: - Project
- Permissions (28): `appengine.applications.get`, `appengine.applications.listRuntimes`, `appengine.instances.get`, `appengine.instances.list`, `appengine.operations.get`, `appengine.operations.list`, `appengine.services.get`, `appengine.services.list`, `appengine.versions.create`, `appengine.versions.delete`, `appengine.versions.exportAppImage`, `appengine.versions.get`, `appengine.versions.list`, `artifactregistry.projectsettings.get`, `artifactregistry.repositories.deleteArtifacts`, `artifactregistry.repositories.downloadArtifacts`, `artifactregistry.repositories.uploadArtifacts`, `artifactregistry.tags.get`, `recommender.appengineVersionCostInsights.get`, `recommender.appengineVersionCostInsights.list`, `recommender.appengineVersionCostInsights.update`, `recommender.appengineVersionCostRecommendations.get`, `recommender.appengineVersionCostRecommendations.list`, `recommender.appengineVersionCostRecommendations.update`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### App Engine Memcache Data Admin (`roles/appengine.memcacheDataAdmin`)

- Can get, set, delete, and flush App Engine Memcache items.
- Permissions (7): `appengine.applications.get`, `appengine.memcache.addKey`, `appengine.memcache.flush`, `appengine.memcache.get`, `appengine.memcache.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### App Engine Service Admin (`roles/appengine.serviceAdmin`)

- Read-only access to all application configuration and settings. Write access to module-level and version-level settings. Cannot deploy a new version. Lowest-level resources where you can grant this role: - Project
- Permissions (26): `appengine.applications.get`, `appengine.applications.listRuntimes`, `appengine.instances.delete`, `appengine.instances.get`, `appengine.instances.list`, `appengine.operations.get`, `appengine.operations.list`, `appengine.services.delete`, `appengine.services.get`, `appengine.services.list`, `appengine.services.update`, `appengine.versions.delete`, `appengine.versions.get`, `appengine.versions.list`, `appengine.versions.update`, `artifactregistry.projectsettings.get`, `recommender.appengineVersionCostInsights.get`, `recommender.appengineVersionCostInsights.list`, `recommender.appengineVersionCostInsights.update`, `recommender.appengineVersionCostRecommendations.get`, `recommender.appengineVersionCostRecommendations.list`, `recommender.appengineVersionCostRecommendations.update`, `recommender.locations.get`, `recommender.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### App Engine Standard Environment Service Agent (`roles/appengine.serviceAgent`)

- Give App Engine Standard Envirnoment service account access to managed resources. Includes access to service accounts. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (78): `appengine.versions.delete`, `appengine.versions.get`, `appengine.versions.list`, `appengine.versions.update`, `artifactregistry.aptartifacts.create`, `artifactregistry.dockerimages.get`, `artifactregistry.dockerimages.list`, `artifactregistry.files.download`, `artifactregistry.files.get`, `artifactregistry.files.list`, `artifactregistry.kfpartifacts.create`, `artifactregistry.locations.get`, `artifactregistry.locations.list`, `artifactregistry.mavenartifacts.get`, `artifactregistry.mavenartifacts.list`, `artifactregistry.npmpackages.get`, `artifactregistry.npmpackages.list`, `artifactregistry.packages.get`, `artifactregistry.packages.list`, `artifactregistry.projectsettings.get`, `artifactregistry.pythonpackages.get`, `artifactregistry.pythonpackages.list`, `artifactregistry.repositories.create`, `artifactregistry.repositories.downloadArtifacts`, `artifactregistry.repositories.get`, `artifactregistry.repositories.list`, `artifactregistry.repositories.listEffectiveTags`, `artifactregistry.repositories.listTagBindings`, `artifactregistry.repositories.readViaVirtualRepository`, `artifactregistry.repositories.uploadArtifacts`, `artifactregistry.tags.create`, `artifactregistry.tags.get`, `artifactregistry.tags.list`, `artifactregistry.tags.update`, `artifactregistry.versions.get`, `artifactregistry.versions.list`, `artifactregistry.yumartifacts.create`, `compute.addresses.create`, `compute.addresses.createInternal`, `compute.addresses.delete`, `compute.addresses.deleteInternal`, `compute.addresses.get`, `compute.addresses.list`, `compute.globalOperations.get`, `compute.networks.get`, `compute.regionOperations.get`, `compute.subnetworks.get`, `compute.subnetworks.use`, `compute.zoneOperations.get`, `datastore.databases.get`, `datastore.entities.create`, `datastore.entities.delete`, `datastore.entities.get`, `datastore.entities.list`, `datastore.entities.update`, `datastore.namespaces.get`, `datastore.namespaces.list`, `datastore.schemas.list`, `datastore.statistics.get`, `datastore.statistics.list`, `iam.serviceAccounts.getAccessToken`, `iam.serviceAccounts.getOpenIdToken`, `iam.serviceAccounts.signBlob`, `serviceusage.catalogs.listMembers`, `serviceusage.consumerpolicy.analyze`, `serviceusage.consumerpolicy.get`, `serviceusage.consumerpolicy.update`, `serviceusage.effectivepolicy.get`, `serviceusage.groups.list`, `serviceusage.groups.listExpandedMembers`, `serviceusage.groups.listMembers`, `serviceusage.services.enable`, `serviceusage.services.get`, `serviceusage.services.listApis`, `serviceusage.services.listDependentServices`, `serviceusage.values.test`, `storage.buckets.create`, `storage.buckets.get`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Project):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/appengine.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `appengine.applications.create` | `roles/admin`, `roles/owner`, `roles/appengine.admin`, `roles/appengine.appCreator` (+1 service agent role) |
| `appengine.applications.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/appengine.admin`, `roles/appengine.appAdmin`, `roles/appengine.editor`, `roles/appengine.viewer`, `roles/cloudscheduler.admin`, `roles/cloudscheduler.viewer`, `roles/cloudsecurityscanner.admin`, `roles/cloudsecurityscanner.editor`, `roles/datastore.admin`, `roles/datastore.editor`, `roles/datastore.owner`, `roles/datastore.user`, `roles/datastore.viewer`, `roles/firebase.admin`, `roles/securitycenter.admin`, `roles/appengine.appViewer`, `roles/appengine.codeViewer`, `roles/appengine.debugger`, `roles/appengine.deployer`, `roles/appengine.memcacheDataAdmin`, `roles/appengine.serviceAdmin`, `roles/cloudscheduler.jobRunner`, `roles/datastore.importExportAdmin`, `roles/datastore.indexAdmin`, `roles/firebase.developAdmin`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.supportUser`, `roles/securitycenter.adminEditor`, `roles/wiz.cloudInventoryViewer` (+8 service agent roles) |
| `appengine.applications.listRuntimes` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/appengine.admin`, `roles/appengine.appAdmin`, `roles/appengine.editor`, `roles/appengine.viewer`, `roles/appengine.appViewer`, `roles/appengine.codeViewer`, `roles/appengine.debugger`, `roles/appengine.deployer`, `roles/appengine.serviceAdmin`, `roles/iam.supportUser` (+1 service agent role) |
| `appengine.applications.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/appengine.admin`, `roles/appengine.appAdmin`, `roles/appengine.editor` (+2 service agent roles) |
| `appengine.instances.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/appengine.admin`, `roles/appengine.appAdmin`, `roles/appengine.editor`, `roles/appengine.debugger`, `roles/appengine.serviceAdmin` (+1 service agent role) |
| `appengine.instances.enableDebug` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/appengine.admin`, `roles/appengine.appAdmin`, `roles/appengine.editor`, `roles/appengine.debugger` (+1 service agent role) |
| `appengine.instances.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/appengine.admin`, `roles/appengine.appAdmin`, `roles/appengine.editor`, `roles/appengine.viewer`, `roles/appengine.appViewer`, `roles/appengine.codeViewer`, `roles/appengine.debugger`, `roles/appengine.deployer`, `roles/appengine.serviceAdmin`, `roles/iam.supportUser` (+1 service agent role) |
| `appengine.instances.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/appengine.admin`, `roles/appengine.appAdmin`, `roles/appengine.editor`, `roles/appengine.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/appengine.appViewer`, `roles/appengine.codeViewer`, `roles/appengine.debugger`, `roles/appengine.deployer`, `roles/appengine.serviceAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+1 service agent role) |
| `appengine.memcache.addKey` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/appengine.admin`, `roles/appengine.appAdmin`, `roles/appengine.editor`, `roles/appengine.memcacheDataAdmin` (+1 service agent role) |
| `appengine.memcache.flush` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/appengine.admin`, `roles/appengine.appAdmin`, `roles/appengine.editor`, `roles/appengine.memcacheDataAdmin` (+1 service agent role) |
| `appengine.memcache.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/appengine.admin`, `roles/appengine.appAdmin`, `roles/appengine.editor`, `roles/appengine.viewer`, `roles/appengine.memcacheDataAdmin`, `roles/iam.supportUser` (+1 service agent role) |
| `appengine.memcache.getKey` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/appengine.admin`, `roles/appengine.editor`, `roles/appengine.viewer`, `roles/iam.supportUser` |
| `appengine.memcache.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/appengine.admin`, `roles/appengine.editor`, `roles/appengine.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `appengine.memcache.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/appengine.admin`, `roles/appengine.appAdmin`, `roles/appengine.editor`, `roles/appengine.memcacheDataAdmin` (+1 service agent role) |
| `appengine.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/appengine.admin`, `roles/appengine.appAdmin`, `roles/appengine.editor`, `roles/appengine.viewer`, `roles/appengine.appViewer`, `roles/appengine.codeViewer`, `roles/appengine.debugger`, `roles/appengine.deployer`, `roles/appengine.serviceAdmin`, `roles/iam.supportUser` (+3 service agent roles) |
| `appengine.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/appengine.admin`, `roles/appengine.appAdmin`, `roles/appengine.editor`, `roles/appengine.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/appengine.appViewer`, `roles/appengine.codeViewer`, `roles/appengine.debugger`, `roles/appengine.deployer`, `roles/appengine.serviceAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+1 service agent role) |
| `appengine.runtimes.actAsAdmin` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/appengine.admin`, `roles/appengine.appAdmin`, `roles/appengine.editor`, `roles/appengine.viewer`, `roles/iam.supportUser` (+1 service agent role) |
| `appengine.services.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/appengine.admin`, `roles/appengine.appAdmin`, `roles/appengine.editor`, `roles/appengine.serviceAdmin` (+1 service agent role) |
| `appengine.services.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/appengine.admin`, `roles/appengine.appAdmin`, `roles/appengine.editor`, `roles/appengine.viewer`, `roles/appengine.appViewer`, `roles/appengine.codeViewer`, `roles/appengine.debugger`, `roles/appengine.deployer`, `roles/appengine.serviceAdmin`, `roles/iam.supportUser` (+1 service agent role) |
| `appengine.services.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/appengine.admin`, `roles/appengine.appAdmin`, `roles/appengine.editor`, `roles/appengine.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/appengine.appViewer`, `roles/appengine.codeViewer`, `roles/appengine.debugger`, `roles/appengine.deployer`, `roles/appengine.serviceAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` (+2 service agent roles) |
| `appengine.services.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/appengine.admin`, `roles/appengine.appAdmin`, `roles/appengine.editor`, `roles/appengine.serviceAdmin` (+2 service agent roles) |
| `appengine.versions.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/appengine.admin`, `roles/appengine.appAdmin`, `roles/appengine.editor`, `roles/appengine.deployer` (+2 service agent roles) |
| `appengine.versions.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/appengine.admin`, `roles/appengine.appAdmin`, `roles/appengine.editor`, `roles/appengine.deployer`, `roles/appengine.serviceAdmin` (+3 service agent roles) |
| `appengine.versions.exportAppImage` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/appengine.admin`, `roles/appengine.appAdmin`, `roles/appengine.editor`, `roles/appengine.deployer` (+1 service agent role) |
| `appengine.versions.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/appengine.admin`, `roles/appengine.appAdmin`, `roles/appengine.editor`, `roles/appengine.viewer`, `roles/appengine.appViewer`, `roles/appengine.codeViewer`, `roles/appengine.debugger`, `roles/appengine.deployer`, `roles/appengine.serviceAdmin`, `roles/iam.supportUser` (+3 service agent roles) |
| `appengine.versions.getFileContents` | `roles/admin`, `roles/owner`, `roles/appengine.admin`, `roles/appengine.codeViewer` |
| `appengine.versions.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/appengine.admin`, `roles/appengine.appAdmin`, `roles/appengine.editor`, `roles/appengine.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/appengine.appViewer`, `roles/appengine.codeViewer`, `roles/appengine.debugger`, `roles/appengine.deployer`, `roles/appengine.serviceAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` (+3 service agent roles) |
| `appengine.versions.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/appengine.admin`, `roles/appengine.appAdmin`, `roles/appengine.editor`, `roles/appengine.serviceAdmin` (+2 service agent roles) |

## Notes

- Roles and permissions of the `appengine` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/appengine (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
