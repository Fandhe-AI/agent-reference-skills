---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/firestore
---

# Firestore IAM roles and permissions

## Signature / Usage

Predefined roles of `firestore` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Cloud Datastore Admin (`roles/datastore.admin`)

- Admin role for Cloud Datastore
- Permissions (58): `appengine.applications.get`, `databasesconsole.locations.get`, `databasesconsole.locations.list`, `databasesconsole.studioQueries.search`, `datastore.backupSchedules.create`, `datastore.backupSchedules.delete`, `datastore.backupSchedules.get`, `datastore.backupSchedules.list`, `datastore.backupSchedules.update`, `datastore.backups.delete`, `datastore.backups.get`, `datastore.backups.list`, `datastore.backups.restoreDatabase`, `datastore.databases.bulkDelete`, `datastore.databases.clone`, `datastore.databases.create`, `datastore.databases.createTagBinding`, `datastore.databases.delete`, `datastore.databases.deleteTagBinding`, `datastore.databases.export`, `datastore.databases.get`, `datastore.databases.getMetadata`, `datastore.databases.import`, `datastore.databases.list`, `datastore.databases.listEffectiveTags`, `datastore.databases.listTagBindings`, `datastore.databases.update`, `datastore.entities.allocateIds`, `datastore.entities.create`, `datastore.entities.delete`, `datastore.entities.get`, `datastore.entities.list`, `datastore.entities.update`, `datastore.insights.get`, `datastore.keyVisualizerScans.get`, `datastore.keyVisualizerScans.list`, `datastore.locations.get`, `datastore.locations.list`, `datastore.namespaces.get`, `datastore.namespaces.list`, `datastore.operations.cancel`, `datastore.operations.delete`, `datastore.operations.get`, `datastore.operations.list`, `datastore.schemas.create`, `datastore.schemas.delete`, `datastore.schemas.get`, `datastore.schemas.list`, `datastore.schemas.update`, `datastore.statistics.get`, `datastore.statistics.list`, `datastore.userCreds.create`, `datastore.userCreds.delete`, `datastore.userCreds.get`, `datastore.userCreds.list`, `datastore.userCreds.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud Datastore Editor (`roles/datastore.editor`)

- Editor role for Cloud Datastore
- Permissions (45): `appengine.applications.get`, `databasesconsole.locations.get`, `databasesconsole.locations.list`, `databasesconsole.studioQueries.search`, `datastore.backupSchedules.create`, `datastore.backupSchedules.delete`, `datastore.backupSchedules.get`, `datastore.backupSchedules.list`, `datastore.backupSchedules.update`, `datastore.backups.delete`, `datastore.backups.get`, `datastore.backups.list`, `datastore.databases.get`, `datastore.databases.getMetadata`, `datastore.databases.list`, `datastore.databases.listEffectiveTags`, `datastore.databases.listTagBindings`, `datastore.databases.update`, `datastore.entities.allocateIds`, `datastore.entities.create`, `datastore.entities.delete`, `datastore.entities.get`, `datastore.entities.list`, `datastore.entities.update`, `datastore.insights.get`, `datastore.keyVisualizerScans.get`, `datastore.keyVisualizerScans.list`, `datastore.namespaces.get`, `datastore.namespaces.list`, `datastore.operations.get`, `datastore.operations.list`, `datastore.schemas.create`, `datastore.schemas.delete`, `datastore.schemas.get`, `datastore.schemas.list`, `datastore.schemas.update`, `datastore.statistics.get`, `datastore.statistics.list`, `datastore.userCreds.create`, `datastore.userCreds.delete`, `datastore.userCreds.get`, `datastore.userCreds.list`, `datastore.userCreds.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud Datastore Owner (`roles/datastore.owner`)

- Provides full access to Datastore resources. Lowest-level resources where you can grant this role: - Project
- Permissions (63): `appengine.applications.get`, `databasesconsole.locations.get`, `databasesconsole.locations.list`, `databasesconsole.studioQueries.create`, `databasesconsole.studioQueries.delete`, `databasesconsole.studioQueries.get`, `databasesconsole.studioQueries.list`, `databasesconsole.studioQueries.search`, `databasesconsole.studioQueries.update`, `datastore.backupSchedules.create`, `datastore.backupSchedules.delete`, `datastore.backupSchedules.get`, `datastore.backupSchedules.list`, `datastore.backupSchedules.update`, `datastore.backups.delete`, `datastore.backups.get`, `datastore.backups.list`, `datastore.backups.restoreDatabase`, `datastore.databases.bulkDelete`, `datastore.databases.clone`, `datastore.databases.create`, `datastore.databases.createTagBinding`, `datastore.databases.delete`, `datastore.databases.deleteTagBinding`, `datastore.databases.export`, `datastore.databases.get`, `datastore.databases.getMetadata`, `datastore.databases.import`, `datastore.databases.list`, `datastore.databases.listEffectiveTags`, `datastore.databases.listTagBindings`, `datastore.databases.update`, `datastore.entities.allocateIds`, `datastore.entities.create`, `datastore.entities.delete`, `datastore.entities.get`, `datastore.entities.list`, `datastore.entities.update`, `datastore.insights.get`, `datastore.keyVisualizerScans.get`, `datastore.keyVisualizerScans.list`, `datastore.locations.get`, `datastore.locations.list`, `datastore.namespaces.get`, `datastore.namespaces.list`, `datastore.operations.cancel`, `datastore.operations.delete`, `datastore.operations.get`, `datastore.operations.list`, `datastore.schemas.create`, `datastore.schemas.delete`, `datastore.schemas.get`, `datastore.schemas.list`, `datastore.schemas.update`, `datastore.statistics.get`, `datastore.statistics.list`, `datastore.userCreds.create`, `datastore.userCreds.delete`, `datastore.userCreds.get`, `datastore.userCreds.list`, `datastore.userCreds.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud Datastore User (`roles/datastore.user`)

- Provides read/write access to data in a Datastore database. Lowest-level resources where you can grant this role: - Project
- Permissions (23): `appengine.applications.get`, `databasesconsole.locations.get`, `databasesconsole.locations.list`, `databasesconsole.studioQueries.create`, `databasesconsole.studioQueries.delete`, `databasesconsole.studioQueries.search`, `databasesconsole.studioQueries.update`, `datastore.databases.get`, `datastore.databases.getMetadata`, `datastore.databases.list`, `datastore.entities.allocateIds`, `datastore.entities.create`, `datastore.entities.delete`, `datastore.entities.get`, `datastore.entities.list`, `datastore.entities.update`, `datastore.namespaces.get`, `datastore.namespaces.list`, `datastore.schemas.list`, `datastore.statistics.get`, `datastore.statistics.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud Datastore Viewer (`roles/datastore.viewer`)

- Provides read access to Datastore resources. Lowest-level resources where you can grant this role: - Project
- Permissions (30): `appengine.applications.get`, `databasesconsole.locations.get`, `databasesconsole.locations.list`, `databasesconsole.studioQueries.search`, `datastore.backupSchedules.get`, `datastore.backupSchedules.list`, `datastore.backups.get`, `datastore.backups.list`, `datastore.databases.get`, `datastore.databases.getMetadata`, `datastore.databases.list`, `datastore.databases.listEffectiveTags`, `datastore.databases.listTagBindings`, `datastore.entities.get`, `datastore.entities.list`, `datastore.insights.get`, `datastore.keyVisualizerScans.get`, `datastore.keyVisualizerScans.list`, `datastore.namespaces.get`, `datastore.namespaces.list`, `datastore.operations.get`, `datastore.operations.list`, `datastore.schemas.get`, `datastore.schemas.list`, `datastore.statistics.get`, `datastore.statistics.list`, `datastore.userCreds.get`, `datastore.userCreds.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud Datastore Backup Schedules Admin (`roles/datastore.backupSchedulesAdmin`)

- Manage backup schedules in Cloud Datastore.
- Permissions (7): `datastore.backupSchedules.create`, `datastore.backupSchedules.delete`, `datastore.backupSchedules.get`, `datastore.backupSchedules.list`, `datastore.backupSchedules.update`, `datastore.databases.getMetadata`, `datastore.databases.list`

#### Cloud Datastore Backup Schedules Viewer (`roles/datastore.backupSchedulesViewer`)

- Read access to backup schedules in Cloud Datastore.
- Permissions (2): `datastore.backupSchedules.get`, `datastore.backupSchedules.list`

#### Cloud Datastore Backups Admin (`roles/datastore.backupsAdmin`)

- Read/Write access to metadata about backups in Cloud Datastore but restore is not allowed.
- Permissions (3): `datastore.backups.delete`, `datastore.backups.get`, `datastore.backups.list`

#### Cloud Datastore Backups Viewer (`roles/datastore.backupsViewer`)

- Read access to metadata about backups in Cloud Datastore.
- Permissions (2): `datastore.backups.get`, `datastore.backups.list`

#### Cloud Datastore Bulk Admin (`roles/datastore.bulkAdmin`)

- Full access to manage bulk operations.
- Permissions (7): `datastore.databases.bulkDelete`, `datastore.databases.getMetadata`, `datastore.operations.cancel`, `datastore.operations.get`, `datastore.operations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud Datastore Clone Admin (`roles/datastore.cloneAdmin`)

- Clone Cloud Datastore Databases.
- Permissions (6): `datastore.databases.clone`, `datastore.databases.create`, `datastore.databases.getMetadata`, `datastore.databases.list`, `datastore.operations.get`, `datastore.operations.list`

#### Cloud Datastore Import Export Admin (`roles/datastore.importExportAdmin`)

- Provides full access to manage imports and exports. Lowest-level resources where you can grant this role: - Project
- Permissions (9): `appengine.applications.get`, `datastore.databases.export`, `datastore.databases.getMetadata`, `datastore.databases.import`, `datastore.operations.cancel`, `datastore.operations.get`, `datastore.operations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud Datastore Index Admin (`roles/datastore.indexAdmin`)

- Provides full access to manage index definitions. Lowest-level resources where you can grant this role: - Project
- Permissions (11): `appengine.applications.get`, `datastore.databases.getMetadata`, `datastore.operations.get`, `datastore.operations.list`, `datastore.schemas.create`, `datastore.schemas.delete`, `datastore.schemas.get`, `datastore.schemas.list`, `datastore.schemas.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud Datastore Key Visualizer Viewer (`roles/datastore.keyVisualizerViewer`)

- Full access to Key Visualizer scans.
- Permissions (5): `datastore.databases.getMetadata`, `datastore.keyVisualizerScans.get`, `datastore.keyVisualizerScans.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud Datastore Restore Admin (`roles/datastore.restoreAdmin`)

- Restore into Cloud Datastore Databases from Cloud Datastore Backups.
- Permissions (8): `datastore.backups.get`, `datastore.backups.list`, `datastore.backups.restoreDatabase`, `datastore.databases.create`, `datastore.databases.getMetadata`, `datastore.databases.list`, `datastore.operations.get`, `datastore.operations.list`

#### Cloud Datastore User Creds Admin (`roles/datastore.userCredsAdmin`)

- Manage user creds in Cloud Datastore.
- Permissions (7): `datastore.databases.getMetadata`, `datastore.databases.list`, `datastore.userCreds.create`, `datastore.userCreds.delete`, `datastore.userCreds.get`, `datastore.userCreds.list`, `datastore.userCreds.update`

#### Cloud Datastore User Creds Viewer (`roles/datastore.userCredsViewer`)

- Read access to user creds in Cloud Datastore.
- Permissions (2): `datastore.userCreds.get`, `datastore.userCreds.list`

#### Firestore Service Agent (`roles/firestore.serviceAgent`)

- Gives Firestore service account access to managed resources. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (5): `storage.buckets.get`, `storage.objects.create`, `storage.objects.delete`, `storage.objects.get`, `storage.objects.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/datastore.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `datastore.backupSchedules.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/datastore.admin`, `roles/datastore.editor`, `roles/datastore.owner`, `roles/firebase.admin`, `roles/datastore.backupSchedulesAdmin`, `roles/firebase.developAdmin`, `roles/iam.databasesAdmin` |
| `datastore.backupSchedules.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/datastore.admin`, `roles/datastore.editor`, `roles/datastore.owner`, `roles/firebase.admin`, `roles/datastore.backupSchedulesAdmin`, `roles/firebase.developAdmin`, `roles/iam.databasesAdmin` |
| `datastore.backupSchedules.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/datastore.admin`, `roles/datastore.editor`, `roles/datastore.owner`, `roles/datastore.viewer`, `roles/firebase.admin`, `roles/datastore.backupSchedulesAdmin`, `roles/datastore.backupSchedulesViewer`, `roles/firebase.developAdmin`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.supportUser` (+1 service agent role) |
| `datastore.backupSchedules.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/datastore.admin`, `roles/datastore.editor`, `roles/datastore.owner`, `roles/datastore.viewer`, `roles/firebase.admin`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/datastore.backupSchedulesAdmin`, `roles/datastore.backupSchedulesViewer`, `roles/firebase.developAdmin`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+2 service agent roles) |
| `datastore.backupSchedules.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/datastore.admin`, `roles/datastore.editor`, `roles/datastore.owner`, `roles/firebase.admin`, `roles/datastore.backupSchedulesAdmin`, `roles/firebase.developAdmin`, `roles/iam.databasesAdmin` |
| `datastore.backups.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/datastore.admin`, `roles/datastore.editor`, `roles/datastore.owner`, `roles/firebase.admin`, `roles/datastore.backupsAdmin`, `roles/firebase.developAdmin`, `roles/iam.databasesAdmin` |
| `datastore.backups.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/datastore.admin`, `roles/datastore.editor`, `roles/datastore.owner`, `roles/datastore.viewer`, `roles/firebase.admin`, `roles/firebase.editor`, `roles/firebase.viewer`, `roles/datastore.backupsAdmin`, `roles/datastore.backupsViewer`, `roles/datastore.restoreAdmin`, `roles/firebase.developAdmin`, `roles/firebase.developViewer`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.supportUser` (+1 service agent role) |
| `datastore.backups.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/datastore.admin`, `roles/datastore.editor`, `roles/datastore.owner`, `roles/datastore.viewer`, `roles/firebase.admin`, `roles/firebase.editor`, `roles/firebase.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/datastore.backupsAdmin`, `roles/datastore.backupsViewer`, `roles/datastore.restoreAdmin`, `roles/firebase.developAdmin`, `roles/firebase.developViewer`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` (+1 service agent role) |
| `datastore.backups.restoreDatabase` | `roles/admin`, `roles/owner`, `roles/datastore.admin`, `roles/datastore.owner`, `roles/firebase.admin`, `roles/datastore.restoreAdmin`, `roles/firebase.developAdmin`, `roles/iam.databasesAdmin` |
| `datastore.databases.bulkDelete` | `roles/admin`, `roles/owner`, `roles/datastore.admin`, `roles/datastore.owner`, `roles/firebase.admin`, `roles/datastore.bulkAdmin`, `roles/firebase.developAdmin`, `roles/iam.databasesAdmin` |
| `datastore.databases.clone` | `roles/admin`, `roles/owner`, `roles/datastore.admin`, `roles/datastore.owner`, `roles/firebase.admin`, `roles/datastore.cloneAdmin`, `roles/firebase.developAdmin` |
| `datastore.databases.create` | `roles/admin`, `roles/owner`, `roles/datastore.admin`, `roles/datastore.owner`, `roles/firebase.admin`, `roles/datastore.cloneAdmin`, `roles/datastore.restoreAdmin`, `roles/firebase.developAdmin`, `roles/iam.databasesAdmin` (+1 service agent role) |
| `datastore.databases.createTagBinding` | `roles/admin`, `roles/owner`, `roles/datastore.admin`, `roles/datastore.owner`, `roles/firebase.admin`, `roles/resourcemanager.tagUser`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/firebase.developAdmin` |
| `datastore.databases.delete` | `roles/admin`, `roles/owner`, `roles/datastore.admin`, `roles/datastore.owner`, `roles/firebase.admin`, `roles/firebase.developAdmin` |
| `datastore.databases.deleteTagBinding` | `roles/admin`, `roles/owner`, `roles/datastore.admin`, `roles/datastore.owner`, `roles/firebase.admin`, `roles/resourcemanager.tagUser`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/firebase.developAdmin` |
| `datastore.databases.export` | `roles/admin`, `roles/owner`, `roles/datastore.admin`, `roles/datastore.owner`, `roles/firebase.admin`, `roles/datastore.importExportAdmin`, `roles/firebase.developAdmin`, `roles/iam.databasesAdmin` (+1 service agent role) |
| `datastore.databases.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/datastore.admin`, `roles/datastore.editor`, `roles/datastore.owner`, `roles/datastore.user`, `roles/datastore.viewer`, `roles/firebase.admin`, `roles/firebase.editor`, `roles/firebase.viewer`, `roles/firebaserules.system`, `roles/firebase.developAdmin`, `roles/firebase.developViewer`, `roles/iam.dataScientist`, `roles/iam.supportUser` (+5 service agent roles) |
| `datastore.databases.getMetadata` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/datastore.admin`, `roles/datastore.editor`, `roles/datastore.owner`, `roles/datastore.user`, `roles/datastore.viewer`, `roles/firebase.admin`, `roles/firebase.editor`, `roles/firebase.viewer`, `roles/datastore.backupSchedulesAdmin`, `roles/datastore.bulkAdmin`, `roles/datastore.cloneAdmin`, `roles/datastore.importExportAdmin`, `roles/datastore.indexAdmin`, `roles/datastore.keyVisualizerViewer`, `roles/datastore.restoreAdmin`, `roles/datastore.userCredsAdmin`, `roles/firebase.developAdmin`, `roles/firebase.developViewer`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.supportUser` (+5 service agent roles) |
| `datastore.databases.import` | `roles/admin`, `roles/owner`, `roles/datastore.admin`, `roles/datastore.owner`, `roles/firebase.admin`, `roles/datastore.importExportAdmin`, `roles/firebase.developAdmin`, `roles/iam.databasesAdmin` |
| `datastore.databases.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/datastore.admin`, `roles/datastore.editor`, `roles/datastore.owner`, `roles/datastore.user`, `roles/datastore.viewer`, `roles/firebase.admin`, `roles/firebase.editor`, `roles/firebase.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/datastore.backupSchedulesAdmin`, `roles/datastore.cloneAdmin`, `roles/datastore.restoreAdmin`, `roles/datastore.userCredsAdmin`, `roles/firebase.developAdmin`, `roles/firebase.developViewer`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` (+4 service agent roles) |
| `datastore.databases.listEffectiveTags` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/datastore.admin`, `roles/datastore.editor`, `roles/datastore.owner`, `roles/datastore.viewer`, `roles/firebase.admin`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/firebase.developAdmin`, `roles/iam.dataScientist`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+1 service agent role) |
| `datastore.databases.listTagBindings` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/datastore.admin`, `roles/datastore.editor`, `roles/datastore.owner`, `roles/datastore.viewer`, `roles/firebase.admin`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/firebase.developAdmin`, `roles/iam.dataScientist`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+1 service agent role) |
| `datastore.databases.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/datastore.admin`, `roles/datastore.editor`, `roles/datastore.owner`, `roles/firebase.admin`, `roles/firebase.developAdmin` (+1 service agent role) |
| `datastore.entities.allocateIds` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/datastore.admin`, `roles/datastore.editor`, `roles/datastore.owner`, `roles/datastore.user`, `roles/firebase.admin`, `roles/firebaserules.system`, `roles/firebase.developAdmin` (+2 service agent roles) |
| `datastore.entities.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/datastore.admin`, `roles/datastore.editor`, `roles/datastore.owner`, `roles/datastore.user`, `roles/firebase.admin`, `roles/firebaserules.system`, `roles/firebase.developAdmin` (+3 service agent roles) |
| `datastore.entities.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/datastore.admin`, `roles/datastore.editor`, `roles/datastore.owner`, `roles/datastore.user`, `roles/firebase.admin`, `roles/firebaserules.system`, `roles/firebase.developAdmin` (+3 service agent roles) |
| `datastore.entities.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/datastore.admin`, `roles/datastore.editor`, `roles/datastore.owner`, `roles/datastore.user`, `roles/datastore.viewer`, `roles/firebase.admin`, `roles/firebase.editor`, `roles/firebase.viewer`, `roles/firebaserules.system`, `roles/firebase.developAdmin`, `roles/firebase.developViewer`, `roles/iam.dataScientist`, `roles/iam.supportUser` (+4 service agent roles) |
| `datastore.entities.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/datastore.admin`, `roles/datastore.editor`, `roles/datastore.owner`, `roles/datastore.user`, `roles/datastore.viewer`, `roles/firebase.admin`, `roles/firebase.editor`, `roles/firebase.viewer`, `roles/firebaserules.system`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/firebase.developAdmin`, `roles/firebase.developViewer`, `roles/iam.dataScientist`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+3 service agent roles) |
| `datastore.entities.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/datastore.admin`, `roles/datastore.editor`, `roles/datastore.owner`, `roles/datastore.user`, `roles/firebase.admin`, `roles/firebaserules.system`, `roles/firebase.developAdmin` (+3 service agent roles) |
| `datastore.insights.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/datastore.admin`, `roles/datastore.editor`, `roles/datastore.owner`, `roles/datastore.viewer`, `roles/firebase.admin`, `roles/firebase.developAdmin`, `roles/iam.dataScientist`, `roles/iam.supportUser` (+1 service agent role) |
| `datastore.keyVisualizerScans.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/datastore.admin`, `roles/datastore.editor`, `roles/datastore.owner`, `roles/datastore.viewer`, `roles/firebase.admin`, `roles/datastore.keyVisualizerViewer`, `roles/firebase.developAdmin`, `roles/iam.dataScientist`, `roles/iam.supportUser` (+1 service agent role) |
| `datastore.keyVisualizerScans.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/datastore.admin`, `roles/datastore.editor`, `roles/datastore.owner`, `roles/datastore.viewer`, `roles/firebase.admin`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/datastore.keyVisualizerViewer`, `roles/firebase.developAdmin`, `roles/iam.dataScientist`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+1 service agent role) |
| `datastore.locations.get` | `roles/admin`, `roles/owner`, `roles/datastore.admin`, `roles/datastore.owner`, `roles/firebase.admin`, `roles/firebase.developAdmin` (+1 service agent role) |
| `datastore.locations.list` | `roles/admin`, `roles/owner`, `roles/datastore.admin`, `roles/datastore.owner`, `roles/firebase.admin`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/firebase.developAdmin`, `roles/iam.securityAuditor` (+2 service agent roles) |
| `datastore.namespaces.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/datastore.admin`, `roles/datastore.editor`, `roles/datastore.owner`, `roles/datastore.user`, `roles/datastore.viewer`, `roles/firebase.admin`, `roles/firebase.editor`, `roles/firebase.viewer`, `roles/firebase.developAdmin`, `roles/firebase.developViewer`, `roles/iam.dataScientist`, `roles/iam.supportUser` (+3 service agent roles) |
| `datastore.namespaces.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/datastore.admin`, `roles/datastore.editor`, `roles/datastore.owner`, `roles/datastore.user`, `roles/datastore.viewer`, `roles/firebase.admin`, `roles/firebase.editor`, `roles/firebase.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/firebase.developAdmin`, `roles/firebase.developViewer`, `roles/iam.dataScientist`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+3 service agent roles) |
| `datastore.operations.cancel` | `roles/admin`, `roles/owner`, `roles/datastore.admin`, `roles/datastore.owner`, `roles/firebase.admin`, `roles/datastore.bulkAdmin`, `roles/datastore.importExportAdmin`, `roles/firebase.developAdmin`, `roles/iam.databasesAdmin` |
| `datastore.operations.delete` | `roles/admin`, `roles/owner`, `roles/datastore.admin`, `roles/datastore.owner`, `roles/firebase.admin`, `roles/firebase.developAdmin` |
| `datastore.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/datastore.admin`, `roles/datastore.editor`, `roles/datastore.owner`, `roles/datastore.viewer`, `roles/firebase.admin`, `roles/datastore.bulkAdmin`, `roles/datastore.cloneAdmin`, `roles/datastore.importExportAdmin`, `roles/datastore.indexAdmin`, `roles/datastore.restoreAdmin`, `roles/firebase.developAdmin`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.supportUser` (+4 service agent roles) |
| `datastore.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/datastore.admin`, `roles/datastore.editor`, `roles/datastore.owner`, `roles/datastore.viewer`, `roles/firebase.admin`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/datastore.bulkAdmin`, `roles/datastore.cloneAdmin`, `roles/datastore.importExportAdmin`, `roles/datastore.indexAdmin`, `roles/datastore.restoreAdmin`, `roles/firebase.developAdmin`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+3 service agent roles) |
| `datastore.schemas.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/datastore.admin`, `roles/datastore.editor`, `roles/datastore.owner`, `roles/firebase.admin`, `roles/datastore.indexAdmin`, `roles/firebase.developAdmin`, `roles/iam.databasesAdmin` |
| `datastore.schemas.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/datastore.admin`, `roles/datastore.editor`, `roles/datastore.owner`, `roles/firebase.admin`, `roles/datastore.indexAdmin`, `roles/firebase.developAdmin`, `roles/iam.databasesAdmin` |
| `datastore.schemas.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/datastore.admin`, `roles/datastore.editor`, `roles/datastore.owner`, `roles/datastore.viewer`, `roles/firebase.admin`, `roles/firebase.editor`, `roles/firebase.viewer`, `roles/datastore.indexAdmin`, `roles/firebase.developAdmin`, `roles/firebase.developViewer`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.supportUser` (+1 service agent role) |
| `datastore.schemas.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/datastore.admin`, `roles/datastore.editor`, `roles/datastore.owner`, `roles/datastore.user`, `roles/datastore.viewer`, `roles/firebase.admin`, `roles/firebase.editor`, `roles/firebase.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/datastore.indexAdmin`, `roles/firebase.developAdmin`, `roles/firebase.developViewer`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+3 service agent roles) |
| `datastore.schemas.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/datastore.admin`, `roles/datastore.editor`, `roles/datastore.owner`, `roles/firebase.admin`, `roles/datastore.indexAdmin`, `roles/firebase.developAdmin`, `roles/iam.databasesAdmin` |
| `datastore.statistics.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/datastore.admin`, `roles/datastore.editor`, `roles/datastore.owner`, `roles/datastore.user`, `roles/datastore.viewer`, `roles/firebase.admin`, `roles/firebase.editor`, `roles/firebase.viewer`, `roles/firebase.developAdmin`, `roles/firebase.developViewer`, `roles/iam.dataScientist`, `roles/iam.supportUser` (+3 service agent roles) |
| `datastore.statistics.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/datastore.admin`, `roles/datastore.editor`, `roles/datastore.owner`, `roles/datastore.user`, `roles/datastore.viewer`, `roles/firebase.admin`, `roles/firebase.editor`, `roles/firebase.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/firebase.developAdmin`, `roles/firebase.developViewer`, `roles/iam.dataScientist`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+3 service agent roles) |
| `datastore.userCreds.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/datastore.admin`, `roles/datastore.editor`, `roles/datastore.owner`, `roles/firebase.admin`, `roles/datastore.userCredsAdmin`, `roles/firebase.developAdmin`, `roles/iam.databasesAdmin` |
| `datastore.userCreds.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/datastore.admin`, `roles/datastore.editor`, `roles/datastore.owner`, `roles/firebase.admin`, `roles/datastore.userCredsAdmin`, `roles/firebase.developAdmin`, `roles/iam.databasesAdmin` |
| `datastore.userCreds.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/datastore.admin`, `roles/datastore.editor`, `roles/datastore.owner`, `roles/datastore.viewer`, `roles/firebase.admin`, `roles/firebase.editor`, `roles/firebase.viewer`, `roles/datastore.userCredsAdmin`, `roles/datastore.userCredsViewer`, `roles/firebase.developAdmin`, `roles/firebase.developViewer`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.supportUser` (+1 service agent role) |
| `datastore.userCreds.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/datastore.admin`, `roles/datastore.editor`, `roles/datastore.owner`, `roles/datastore.viewer`, `roles/firebase.admin`, `roles/firebase.editor`, `roles/firebase.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/datastore.userCredsAdmin`, `roles/datastore.userCredsViewer`, `roles/firebase.developAdmin`, `roles/firebase.developViewer`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+1 service agent role) |
| `datastore.userCreds.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/datastore.admin`, `roles/datastore.editor`, `roles/datastore.owner`, `roles/firebase.admin`, `roles/datastore.userCredsAdmin`, `roles/firebase.developAdmin`, `roles/iam.databasesAdmin` |

## Notes

- Roles and permissions of the `firestore` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/firestore (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
