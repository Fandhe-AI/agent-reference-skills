---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/cloudbuild
---

# Cloud Build IAM roles and permissions

## Signature / Usage

Predefined roles of `cloudbuild` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Cloud Build Admin (`roles/cloudbuild.admin`)

- Admin role for Cloud Build
- Permissions (37): `cloudbuild.builds.approve`, `cloudbuild.builds.create`, `cloudbuild.builds.get`, `cloudbuild.builds.list`, `cloudbuild.builds.update`, `cloudbuild.connections.create`, `cloudbuild.connections.delete`, `cloudbuild.connections.fetchLinkableRepositories`, `cloudbuild.connections.get`, `cloudbuild.connections.getIamPolicy`, `cloudbuild.connections.list`, `cloudbuild.connections.setIamPolicy`, `cloudbuild.connections.update`, `cloudbuild.integrations.create`, `cloudbuild.integrations.delete`, `cloudbuild.integrations.get`, `cloudbuild.integrations.list`, `cloudbuild.integrations.update`, `cloudbuild.locations.get`, `cloudbuild.locations.list`, `cloudbuild.operations.get`, `cloudbuild.operations.list`, `cloudbuild.repositories.accessReadToken`, `cloudbuild.repositories.accessReadWriteToken`, `cloudbuild.repositories.create`, `cloudbuild.repositories.delete`, `cloudbuild.repositories.fetchGitRefs`, `cloudbuild.repositories.get`, `cloudbuild.repositories.list`, `cloudbuild.workerpools.create`, `cloudbuild.workerpools.delete`, `cloudbuild.workerpools.get`, `cloudbuild.workerpools.list`, `cloudbuild.workerpools.update`, `cloudbuild.workerpools.use`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud Build Service Account (`roles/cloudbuild.builds.builder`)

- Provides access to perform builds.
- Permissions (78): `artifactregistry.aptartifacts.create`, `artifactregistry.attachments.create`, `artifactregistry.attachments.delete`, `artifactregistry.attachments.get`, `artifactregistry.attachments.list`, `artifactregistry.dockerimages.get`, `artifactregistry.dockerimages.list`, `artifactregistry.files.download`, `artifactregistry.files.get`, `artifactregistry.files.list`, `artifactregistry.files.update`, `artifactregistry.files.upload`, `artifactregistry.kfpartifacts.create`, `artifactregistry.locations.get`, `artifactregistry.locations.list`, `artifactregistry.mavenartifacts.get`, `artifactregistry.mavenartifacts.list`, `artifactregistry.npmpackages.get`, `artifactregistry.npmpackages.list`, `artifactregistry.packages.get`, `artifactregistry.packages.list`, `artifactregistry.packages.update`, `artifactregistry.projectconfigs.get`, `artifactregistry.projectsettings.get`, `artifactregistry.pythonpackages.get`, `artifactregistry.pythonpackages.list`, `artifactregistry.repositories.createOnPush`, `artifactregistry.repositories.deleteArtifacts`, `artifactregistry.repositories.downloadArtifacts`, `artifactregistry.repositories.exportArtifacts`, `artifactregistry.repositories.get`, `artifactregistry.repositories.list`, `artifactregistry.repositories.listEffectiveTags`, `artifactregistry.repositories.listTagBindings`, `artifactregistry.repositories.readViaVirtualRepository`, `artifactregistry.repositories.uploadArtifacts`, `artifactregistry.rules.get`, `artifactregistry.rules.list`, `artifactregistry.tags.create`, `artifactregistry.tags.get`, `artifactregistry.tags.list`, `artifactregistry.tags.update`, `artifactregistry.versions.get`, `artifactregistry.versions.list`, `artifactregistry.yumartifacts.create`, `cloudbuild.builds.create`, `cloudbuild.builds.get`, `cloudbuild.builds.list`, `cloudbuild.builds.update`, `cloudbuild.locations.get`, `cloudbuild.locations.list`, `cloudbuild.operations.get`, `cloudbuild.operations.list`, `cloudbuild.workerpools.use`, `compute.images.create`, `containeranalysis.occurrences.create`, `containeranalysis.occurrences.delete`, `containeranalysis.occurrences.get`, `containeranalysis.occurrences.list`, `containeranalysis.occurrences.update`, `logging.logEntries.create`, `logging.logEntries.list`, `logging.views.access`, `pubsub.topics.create`, `pubsub.topics.publish`, `remotebuildexecution.blobs.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `source.repos.get`, `source.repos.list`, `storage.buckets.create`, `storage.buckets.get`, `storage.buckets.list`, `storage.objects.create`, `storage.objects.delete`, `storage.objects.get`, `storage.objects.list`, `storage.objects.update`

#### Cloud Build Editor (`roles/cloudbuild.editor`)

- Editor role for Cloud Build
- Permissions (34): `cloudbuild.builds.approve`, `cloudbuild.builds.create`, `cloudbuild.builds.get`, `cloudbuild.builds.list`, `cloudbuild.builds.update`, `cloudbuild.connections.create`, `cloudbuild.connections.delete`, `cloudbuild.connections.fetchLinkableRepositories`, `cloudbuild.connections.get`, `cloudbuild.connections.getIamPolicy`, `cloudbuild.connections.list`, `cloudbuild.connections.update`, `cloudbuild.integrations.create`, `cloudbuild.integrations.delete`, `cloudbuild.integrations.get`, `cloudbuild.integrations.list`, `cloudbuild.integrations.update`, `cloudbuild.locations.get`, `cloudbuild.locations.list`, `cloudbuild.operations.get`, `cloudbuild.operations.list`, `cloudbuild.repositories.create`, `cloudbuild.repositories.delete`, `cloudbuild.repositories.fetchGitRefs`, `cloudbuild.repositories.get`, `cloudbuild.repositories.list`, `cloudbuild.workerpools.create`, `cloudbuild.workerpools.delete`, `cloudbuild.workerpools.get`, `cloudbuild.workerpools.list`, `cloudbuild.workerpools.update`, `cloudbuild.workerpools.use`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud Build Viewer (`roles/cloudbuild.viewer`)

- Viewer role for Cloud Build
- Permissions (19): `cloudbuild.builds.get`, `cloudbuild.builds.list`, `cloudbuild.connections.fetchLinkableRepositories`, `cloudbuild.connections.get`, `cloudbuild.connections.getIamPolicy`, `cloudbuild.connections.list`, `cloudbuild.integrations.get`, `cloudbuild.integrations.list`, `cloudbuild.locations.get`, `cloudbuild.locations.list`, `cloudbuild.operations.get`, `cloudbuild.operations.list`, `cloudbuild.repositories.fetchGitRefs`, `cloudbuild.repositories.get`, `cloudbuild.repositories.list`, `cloudbuild.workerpools.get`, `cloudbuild.workerpools.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud Build Approver (`roles/cloudbuild.builds.approver`)

- Can approve or reject pending builds.
- Permissions (10): `cloudbuild.builds.approve`, `cloudbuild.builds.get`, `cloudbuild.builds.list`, `cloudbuild.locations.get`, `cloudbuild.locations.list`, `cloudbuild.operations.get`, `cloudbuild.operations.list`, `remotebuildexecution.blobs.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud Build Editor (`roles/cloudbuild.builds.editor`)

- Provides access to create and cancel builds. Lowest-level resources where you can grant this role: - Project
- Permissions (11): `cloudbuild.builds.create`, `cloudbuild.builds.get`, `cloudbuild.builds.list`, `cloudbuild.builds.update`, `cloudbuild.locations.get`, `cloudbuild.locations.list`, `cloudbuild.operations.get`, `cloudbuild.operations.list`, `remotebuildexecution.blobs.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud Build Viewer (`roles/cloudbuild.builds.viewer`)

- Provides access to view builds. Lowest-level resources where you can grant this role: - Project
- Permissions (9): `cloudbuild.builds.get`, `cloudbuild.builds.list`, `cloudbuild.locations.get`, `cloudbuild.locations.list`, `cloudbuild.operations.get`, `cloudbuild.operations.list`, `remotebuildexecution.blobs.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud Build Connection Admin (`roles/cloudbuild.connectionAdmin`)

- Can manage connections and repositories.
- Permissions (17): `cloudbuild.connections.create`, `cloudbuild.connections.delete`, `cloudbuild.connections.fetchLinkableRepositories`, `cloudbuild.connections.get`, `cloudbuild.connections.getIamPolicy`, `cloudbuild.connections.list`, `cloudbuild.connections.setIamPolicy`, `cloudbuild.connections.update`, `cloudbuild.operations.get`, `cloudbuild.operations.list`, `cloudbuild.repositories.create`, `cloudbuild.repositories.delete`, `cloudbuild.repositories.fetchGitRefs`, `cloudbuild.repositories.get`, `cloudbuild.repositories.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud Build Connection Viewer (`roles/cloudbuild.connectionViewer`)

- Can view and list connections and repositories.
- Permissions (9): `cloudbuild.connections.fetchLinkableRepositories`, `cloudbuild.connections.get`, `cloudbuild.connections.getIamPolicy`, `cloudbuild.connections.list`, `cloudbuild.repositories.fetchGitRefs`, `cloudbuild.repositories.get`, `cloudbuild.repositories.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud Build Integrations Editor (`roles/cloudbuild.integrationsEditor`)

- Can update Integrations
- Permissions (5): `cloudbuild.integrations.get`, `cloudbuild.integrations.list`, `cloudbuild.integrations.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud Build Integrations Owner (`roles/cloudbuild.integrationsOwner`)

- Can create/delete Integrations
- Permissions (15): `cloudbuild.integrations.create`, `cloudbuild.integrations.delete`, `cloudbuild.integrations.get`, `cloudbuild.integrations.list`, `cloudbuild.integrations.update`, `compute.firewalls.create`, `compute.firewalls.get`, `compute.firewalls.list`, `compute.networks.get`, `compute.networks.updatePolicy`, `compute.regions.get`, `compute.subnetworks.get`, `compute.subnetworks.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud Build Integrations Viewer (`roles/cloudbuild.integrationsViewer`)

- Can view Integrations
- Permissions (4): `cloudbuild.integrations.get`, `cloudbuild.integrations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud Build Read Only Token Accessor (`roles/cloudbuild.readTokenAccessor`)

- Can view the connection and access its read-only token.
- Permissions (3): `cloudbuild.connections.get`, `cloudbuild.repositories.accessReadToken`, `cloudbuild.repositories.get`

#### Cloud Build Token Accessor (`roles/cloudbuild.tokenAccessor`)

- Can view the connection and access its read/write and read-only tokens.
- Permissions (5): `cloudbuild.connections.get`, `cloudbuild.repositories.accessReadToken`, `cloudbuild.repositories.accessReadWriteToken`, `cloudbuild.repositories.get`, `cloudbuild.repositories.list`

#### Cloud Build WorkerPool Editor (`roles/cloudbuild.workerPoolEditor`)

- Can update and view WorkerPools
- Permissions (5): `cloudbuild.workerpools.get`, `cloudbuild.workerpools.list`, `cloudbuild.workerpools.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud Build WorkerPool Owner (`roles/cloudbuild.workerPoolOwner`)

- Can create, delete, update, and view WorkerPools
- Permissions (7): `cloudbuild.workerpools.create`, `cloudbuild.workerpools.delete`, `cloudbuild.workerpools.get`, `cloudbuild.workerpools.list`, `cloudbuild.workerpools.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud Build WorkerPool User (`roles/cloudbuild.workerPoolUser`)

- Can run builds in the WorkerPool
- Permissions (1): `cloudbuild.workerpools.use`

#### Cloud Build WorkerPool Viewer (`roles/cloudbuild.workerPoolViewer`)

- Can view WorkerPools
- Permissions (4): `cloudbuild.workerpools.get`, `cloudbuild.workerpools.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud Build Logging Service Agent (`roles/cloudbuild.loggingServiceAgent`)

- Gives the Cloud Build logging-specific service account access to write logs. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (1): `logging.buckets.write`

#### Cloud Build Service Agent (`roles/cloudbuild.serviceAgent`)

- Gives Cloud Build service account access to managed resources. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (132): `artifactregistry.aptartifacts.create`, `artifactregistry.attachments.create`, `artifactregistry.attachments.delete`, `artifactregistry.attachments.get`, `artifactregistry.attachments.list`, `artifactregistry.dockerimages.get`, `artifactregistry.dockerimages.list`, `artifactregistry.files.download`, `artifactregistry.files.get`, `artifactregistry.files.list`, `artifactregistry.files.update`, `artifactregistry.files.upload`, `artifactregistry.kfpartifacts.create`, `artifactregistry.locations.get`, `artifactregistry.locations.list`, `artifactregistry.mavenartifacts.get`, `artifactregistry.mavenartifacts.list`, `artifactregistry.npmpackages.get`, `artifactregistry.npmpackages.list`, `artifactregistry.packages.get`, `artifactregistry.packages.list`, `artifactregistry.packages.update`, `artifactregistry.projectconfigs.get`, `artifactregistry.projectsettings.get`, `artifactregistry.pythonpackages.get`, `artifactregistry.pythonpackages.list`, `artifactregistry.repositories.createOnPush`, `artifactregistry.repositories.deleteArtifacts`, `artifactregistry.repositories.downloadArtifacts`, `artifactregistry.repositories.exportArtifacts`, `artifactregistry.repositories.get`, `artifactregistry.repositories.list`, `artifactregistry.repositories.listEffectiveTags`, `artifactregistry.repositories.listTagBindings`, `artifactregistry.repositories.readViaVirtualRepository`, `artifactregistry.repositories.uploadArtifacts`, `artifactregistry.rules.get`, `artifactregistry.rules.list`, `artifactregistry.tags.create`, `artifactregistry.tags.get`, `artifactregistry.tags.list`, `artifactregistry.tags.update`, `artifactregistry.versions.get`, `artifactregistry.versions.list`, `artifactregistry.yumartifacts.create`, `binaryauthorization.attestors.create`, `binaryauthorization.attestors.delete`, `binaryauthorization.attestors.get`, `binaryauthorization.attestors.list`, `binaryauthorization.attestors.update`, `binaryauthorization.attestors.verifyImageAttested`, `cloudbuild.builds.create`, `cloudbuild.builds.get`, `cloudbuild.builds.list`, `cloudbuild.builds.update`, `cloudbuild.connections.get`, `cloudbuild.locations.get`, `cloudbuild.locations.list`, `cloudbuild.operations.get`, `cloudbuild.operations.list`, `cloudbuild.repositories.accessReadToken`, `cloudbuild.repositories.accessReadWriteToken`, `cloudbuild.repositories.get`, `cloudbuild.repositories.list`, `cloudbuild.workerpools.use`, `compute.firewalls.get`, `compute.firewalls.list`, `compute.images.create`, `compute.networkAttachments.get`, `compute.networkAttachments.update`, `compute.networks.get`, `compute.regionOperations.get`, `compute.subnetworks.get`, `containeranalysis.notes.attachOccurrence`, `containeranalysis.notes.create`, `containeranalysis.notes.delete`, `containeranalysis.notes.get`, `containeranalysis.notes.list`, `containeranalysis.notes.update`, `containeranalysis.occurrences.create`, `containeranalysis.occurrences.delete`, `containeranalysis.occurrences.get`, `containeranalysis.occurrences.list`, `containeranalysis.occurrences.update`, `developerconnect.connections.get`, `developerconnect.gitRepositoryLinks.fetchReadToken`, `developerconnect.gitRepositoryLinks.fetchReadWriteToken`, `developerconnect.gitRepositoryLinks.get`, `iam.serviceAccounts.get`, `iam.serviceAccounts.getAccessToken`, `iam.serviceAccounts.getOpenIdToken`, `logging.buckets.create`, `logging.buckets.get`, `logging.buckets.list`, `logging.logEntries.create`, `logging.logEntries.list`, `logging.views.access`, `pubsub.subscriptions.create`, `pubsub.subscriptions.delete`, `pubsub.subscriptions.get`, `pubsub.subscriptions.update`, `pubsub.topics.attachSubscription`, `pubsub.topics.create`, `pubsub.topics.get`, `pubsub.topics.publish`, `remotebuildexecution.blobs.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `servicedirectory.endpoints.get`, `servicedirectory.endpoints.getIamPolicy`, `servicedirectory.endpoints.list`, `servicedirectory.locations.get`, `servicedirectory.locations.list`, `servicedirectory.namespaces.get`, `servicedirectory.namespaces.getIamPolicy`, `servicedirectory.namespaces.list`, `servicedirectory.networks.access`, `servicedirectory.services.get`, `servicedirectory.services.getIamPolicy`, `servicedirectory.services.list`, `servicedirectory.services.resolve`, `serviceusage.services.use`, `source.repos.get`, `source.repos.list`, `storage.buckets.create`, `storage.buckets.get`, `storage.buckets.list`, `storage.objects.create`, `storage.objects.delete`, `storage.objects.get`, `storage.objects.list`, `storage.objects.update`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/cloudbuild.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `cloudbuild.builds.approve` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudbuild.admin`, `roles/cloudbuild.editor`, `roles/cloudbuild.builds.approver` |
| `cloudbuild.builds.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudbuild.admin`, `roles/cloudbuild.builds.builder`, `roles/cloudbuild.editor`, `roles/dataflow.admin`, `roles/cloudbuild.builds.editor`, `roles/composer.worker`, `roles/dataflow.developer`, `roles/iam.devOps`, `roles/run.sourceDeveloper` (+14 service agent roles) |
| `cloudbuild.builds.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudbuild.admin`, `roles/cloudbuild.builds.builder`, `roles/cloudbuild.editor`, `roles/cloudbuild.viewer`, `roles/cloudfunctions.admin`, `roles/cloudfunctions.editor`, `roles/cloudfunctions.viewer`, `roles/dataflow.admin`, `roles/designcenter.admin`, `roles/firebase.admin`, `roles/firebase.editor`, `roles/firebase.viewer`, `roles/geminicloudassist.admin`, `roles/geminicloudassist.editor`, `roles/geminicloudassist.user`, `roles/cloudbuild.builds.approver`, `roles/cloudbuild.builds.editor`, `roles/cloudbuild.builds.viewer`, `roles/cloudfunctions.developer`, `roles/composer.worker`, `roles/dataflow.developer`, `roles/designcenter.applicationAdmin`, `roles/designcenter.applicationEditor`, `roles/firebase.developAdmin`, `roles/firebase.developViewer`, `roles/iam.dataScientist`, `roles/iam.devOps`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser`, `roles/run.sourceDeveloper`, `roles/run.sourceViewer` (+14 service agent roles) |
| `cloudbuild.builds.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudbuild.admin`, `roles/cloudbuild.builds.builder`, `roles/cloudbuild.editor`, `roles/cloudbuild.viewer`, `roles/cloudfunctions.admin`, `roles/cloudfunctions.editor`, `roles/cloudfunctions.viewer`, `roles/dataflow.admin`, `roles/designcenter.admin`, `roles/firebase.admin`, `roles/firebase.editor`, `roles/firebase.viewer`, `roles/geminicloudassist.admin`, `roles/geminicloudassist.editor`, `roles/geminicloudassist.user`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/cloudbuild.builds.approver`, `roles/cloudbuild.builds.editor`, `roles/cloudbuild.builds.viewer`, `roles/cloudfunctions.developer`, `roles/composer.worker`, `roles/dataflow.developer`, `roles/designcenter.applicationAdmin`, `roles/designcenter.applicationEditor`, `roles/firebase.developAdmin`, `roles/firebase.developViewer`, `roles/iam.dataScientist`, `roles/iam.devOps`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser`, `roles/run.sourceDeveloper`, `roles/run.sourceViewer`, `roles/wiz.cloudInventoryViewer` (+9 service agent roles) |
| `cloudbuild.builds.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudbuild.admin`, `roles/cloudbuild.builds.builder`, `roles/cloudbuild.editor`, `roles/dataflow.admin`, `roles/cloudbuild.builds.editor`, `roles/composer.worker`, `roles/dataflow.developer`, `roles/iam.devOps`, `roles/run.sourceDeveloper` (+9 service agent roles) |
| `cloudbuild.connections.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudbuild.admin`, `roles/cloudbuild.editor`, `roles/cloudbuild.connectionAdmin`, `roles/iam.devOps` |
| `cloudbuild.connections.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudbuild.admin`, `roles/cloudbuild.editor`, `roles/cloudbuild.connectionAdmin`, `roles/iam.devOps` |
| `cloudbuild.connections.fetchLinkableRepositories` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudbuild.admin`, `roles/cloudbuild.editor`, `roles/cloudbuild.viewer`, `roles/cloudbuild.connectionAdmin`, `roles/cloudbuild.connectionViewer`, `roles/iam.devOps`, `roles/iam.supportUser` |
| `cloudbuild.connections.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudbuild.admin`, `roles/cloudbuild.editor`, `roles/cloudbuild.viewer`, `roles/cloudbuild.connectionAdmin`, `roles/cloudbuild.connectionViewer`, `roles/cloudbuild.readTokenAccessor`, `roles/cloudbuild.tokenAccessor`, `roles/iam.devOps`, `roles/iam.supportUser` (+3 service agent roles) |
| `cloudbuild.connections.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudbuild.admin`, `roles/cloudbuild.editor`, `roles/cloudbuild.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/cloudbuild.connectionAdmin`, `roles/cloudbuild.connectionViewer`, `roles/iam.devOps`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `cloudbuild.connections.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudbuild.admin`, `roles/cloudbuild.editor`, `roles/cloudbuild.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/cloudbuild.connectionAdmin`, `roles/cloudbuild.connectionViewer`, `roles/config.agent`, `roles/iam.devOps`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` (+1 service agent role) |
| `cloudbuild.connections.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/cloudbuild.admin`, `roles/iam.securityAdmin`, `roles/cloudbuild.connectionAdmin`, `roles/iam.devOps` |
| `cloudbuild.connections.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudbuild.admin`, `roles/cloudbuild.editor`, `roles/cloudbuild.connectionAdmin`, `roles/iam.devOps` |
| `cloudbuild.integrations.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudbuild.admin`, `roles/cloudbuild.editor`, `roles/cloudbuild.integrationsOwner`, `roles/iam.devOps` |
| `cloudbuild.integrations.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudbuild.admin`, `roles/cloudbuild.editor`, `roles/cloudbuild.integrationsOwner`, `roles/iam.devOps` |
| `cloudbuild.integrations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudbuild.admin`, `roles/cloudbuild.editor`, `roles/cloudbuild.viewer`, `roles/cloudbuild.integrationsEditor`, `roles/cloudbuild.integrationsOwner`, `roles/cloudbuild.integrationsViewer`, `roles/iam.devOps`, `roles/iam.supportUser` |
| `cloudbuild.integrations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudbuild.admin`, `roles/cloudbuild.editor`, `roles/cloudbuild.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/cloudbuild.integrationsEditor`, `roles/cloudbuild.integrationsOwner`, `roles/cloudbuild.integrationsViewer`, `roles/iam.devOps`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `cloudbuild.integrations.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudbuild.admin`, `roles/cloudbuild.editor`, `roles/cloudbuild.integrationsEditor`, `roles/cloudbuild.integrationsOwner`, `roles/iam.devOps` |
| `cloudbuild.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudbuild.admin`, `roles/cloudbuild.builds.builder`, `roles/cloudbuild.editor`, `roles/cloudbuild.viewer`, `roles/cloudfunctions.admin`, `roles/cloudfunctions.editor`, `roles/cloudfunctions.viewer`, `roles/dataflow.admin`, `roles/firebase.admin`, `roles/firebase.editor`, `roles/firebase.viewer`, `roles/cloudbuild.builds.approver`, `roles/cloudbuild.builds.editor`, `roles/cloudbuild.builds.viewer`, `roles/cloudfunctions.developer`, `roles/composer.worker`, `roles/dataflow.developer`, `roles/firebase.developAdmin`, `roles/firebase.developViewer`, `roles/iam.dataScientist`, `roles/iam.devOps`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser`, `roles/run.sourceDeveloper`, `roles/run.sourceViewer` (+5 service agent roles) |
| `cloudbuild.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudbuild.admin`, `roles/cloudbuild.builds.builder`, `roles/cloudbuild.editor`, `roles/cloudbuild.viewer`, `roles/cloudfunctions.admin`, `roles/cloudfunctions.editor`, `roles/cloudfunctions.viewer`, `roles/dataflow.admin`, `roles/firebase.admin`, `roles/firebase.editor`, `roles/firebase.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/cloudbuild.builds.approver`, `roles/cloudbuild.builds.editor`, `roles/cloudbuild.builds.viewer`, `roles/cloudfunctions.developer`, `roles/composer.worker`, `roles/dataflow.developer`, `roles/firebase.developAdmin`, `roles/firebase.developViewer`, `roles/iam.dataScientist`, `roles/iam.devOps`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser`, `roles/run.sourceDeveloper`, `roles/run.sourceViewer` (+5 service agent roles) |
| `cloudbuild.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudbuild.admin`, `roles/cloudbuild.builds.builder`, `roles/cloudbuild.editor`, `roles/cloudbuild.viewer`, `roles/cloudfunctions.admin`, `roles/cloudfunctions.editor`, `roles/cloudfunctions.viewer`, `roles/dataflow.admin`, `roles/firebase.admin`, `roles/firebase.editor`, `roles/firebase.viewer`, `roles/cloudbuild.builds.approver`, `roles/cloudbuild.builds.editor`, `roles/cloudbuild.builds.viewer`, `roles/cloudbuild.connectionAdmin`, `roles/cloudfunctions.developer`, `roles/composer.worker`, `roles/dataflow.developer`, `roles/firebase.developAdmin`, `roles/firebase.developViewer`, `roles/iam.dataScientist`, `roles/iam.devOps`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser`, `roles/run.sourceDeveloper`, `roles/run.sourceViewer` (+6 service agent roles) |
| `cloudbuild.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudbuild.admin`, `roles/cloudbuild.builds.builder`, `roles/cloudbuild.editor`, `roles/cloudbuild.viewer`, `roles/cloudfunctions.admin`, `roles/cloudfunctions.editor`, `roles/cloudfunctions.viewer`, `roles/dataflow.admin`, `roles/firebase.admin`, `roles/firebase.editor`, `roles/firebase.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/cloudbuild.builds.approver`, `roles/cloudbuild.builds.editor`, `roles/cloudbuild.builds.viewer`, `roles/cloudbuild.connectionAdmin`, `roles/cloudfunctions.developer`, `roles/composer.worker`, `roles/dataflow.developer`, `roles/firebase.developAdmin`, `roles/firebase.developViewer`, `roles/iam.dataScientist`, `roles/iam.devOps`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser`, `roles/run.sourceDeveloper`, `roles/run.sourceViewer` (+5 service agent roles) |
| `cloudbuild.repositories.accessReadToken` | `roles/admin`, `roles/owner`, `roles/cloudbuild.admin`, `roles/cloudbuild.readTokenAccessor`, `roles/cloudbuild.tokenAccessor`, `roles/config.agent` (+4 service agent roles) |
| `cloudbuild.repositories.accessReadWriteToken` | `roles/admin`, `roles/owner`, `roles/cloudbuild.admin`, `roles/cloudbuild.tokenAccessor` (+2 service agent roles) |
| `cloudbuild.repositories.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudbuild.admin`, `roles/cloudbuild.editor`, `roles/cloudbuild.connectionAdmin`, `roles/iam.devOps` |
| `cloudbuild.repositories.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudbuild.admin`, `roles/cloudbuild.editor`, `roles/cloudbuild.connectionAdmin`, `roles/iam.devOps` |
| `cloudbuild.repositories.fetchGitRefs` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudbuild.admin`, `roles/cloudbuild.editor`, `roles/cloudbuild.viewer`, `roles/cloudbuild.connectionAdmin`, `roles/cloudbuild.connectionViewer`, `roles/iam.devOps`, `roles/iam.supportUser` (+1 service agent role) |
| `cloudbuild.repositories.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudbuild.admin`, `roles/cloudbuild.editor`, `roles/cloudbuild.viewer`, `roles/cloudbuild.connectionAdmin`, `roles/cloudbuild.connectionViewer`, `roles/cloudbuild.readTokenAccessor`, `roles/cloudbuild.tokenAccessor`, `roles/iam.devOps`, `roles/iam.supportUser` (+4 service agent roles) |
| `cloudbuild.repositories.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudbuild.admin`, `roles/cloudbuild.editor`, `roles/cloudbuild.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/cloudbuild.connectionAdmin`, `roles/cloudbuild.connectionViewer`, `roles/cloudbuild.tokenAccessor`, `roles/config.agent`, `roles/iam.devOps`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+3 service agent roles) |
| `cloudbuild.workerpools.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudbuild.admin`, `roles/cloudbuild.editor`, `roles/cloudbuild.workerPoolOwner`, `roles/iam.devOps` |
| `cloudbuild.workerpools.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudbuild.admin`, `roles/cloudbuild.editor`, `roles/cloudbuild.workerPoolOwner`, `roles/iam.devOps` |
| `cloudbuild.workerpools.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudbuild.admin`, `roles/cloudbuild.editor`, `roles/cloudbuild.viewer`, `roles/cloudbuild.workerPoolEditor`, `roles/cloudbuild.workerPoolOwner`, `roles/cloudbuild.workerPoolViewer`, `roles/iam.devOps`, `roles/iam.supportUser` |
| `cloudbuild.workerpools.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudbuild.admin`, `roles/cloudbuild.editor`, `roles/cloudbuild.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/cloudbuild.workerPoolEditor`, `roles/cloudbuild.workerPoolOwner`, `roles/cloudbuild.workerPoolViewer`, `roles/iam.devOps`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` |
| `cloudbuild.workerpools.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudbuild.admin`, `roles/cloudbuild.editor`, `roles/cloudbuild.workerPoolEditor`, `roles/cloudbuild.workerPoolOwner`, `roles/iam.devOps` |
| `cloudbuild.workerpools.use` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudbuild.admin`, `roles/cloudbuild.builds.builder`, `roles/cloudbuild.editor`, `roles/cloudbuild.workerPoolUser`, `roles/composer.worker` (+6 service agent roles) |

## Notes

- Roles and permissions of the `cloudbuild` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/cloudbuild (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
