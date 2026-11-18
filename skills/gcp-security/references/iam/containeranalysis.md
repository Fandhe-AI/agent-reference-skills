---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/containeranalysis
---

# Artifact Analysis IAM roles and permissions

## Signature / Usage

Predefined roles of `containeranalysis` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Container Analysis Admin (`roles/containeranalysis.admin`)

- Access to all Container Analysis resources.
- Permissions (17): `containeranalysis.notes.attachOccurrence`, `containeranalysis.notes.create`, `containeranalysis.notes.delete`, `containeranalysis.notes.get`, `containeranalysis.notes.getIamPolicy`, `containeranalysis.notes.list`, `containeranalysis.notes.setIamPolicy`, `containeranalysis.notes.update`, `containeranalysis.occurrences.create`, `containeranalysis.occurrences.delete`, `containeranalysis.occurrences.get`, `containeranalysis.occurrences.getIamPolicy`, `containeranalysis.occurrences.list`, `containeranalysis.occurrences.setIamPolicy`, `containeranalysis.occurrences.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Container Analysis Editor (`roles/containeranalysis.editor`)

- Editor role for Container Analysis
- Permissions (16): `containeranalysis.notes.attachOccurrence`, `containeranalysis.notes.create`, `containeranalysis.notes.delete`, `containeranalysis.notes.get`, `containeranalysis.notes.getIamPolicy`, `containeranalysis.notes.list`, `containeranalysis.notes.listOccurrences`, `containeranalysis.notes.update`, `containeranalysis.occurrences.create`, `containeranalysis.occurrences.delete`, `containeranalysis.occurrences.get`, `containeranalysis.occurrences.getIamPolicy`, `containeranalysis.occurrences.list`, `containeranalysis.occurrences.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Container Analysis Viewer (`roles/containeranalysis.viewer`)

- Viewer role for Container Analysis
- Permissions (8): `containeranalysis.notes.get`, `containeranalysis.notes.getIamPolicy`, `containeranalysis.notes.list`, `containeranalysis.occurrences.get`, `containeranalysis.occurrences.getIamPolicy`, `containeranalysis.occurrences.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Container Analysis Notes Attacher (`roles/containeranalysis.notes.attacher`)

- Can attach Container Analysis Occurrences to Notes.
- Permissions (2): `containeranalysis.notes.attachOccurrence`, `containeranalysis.notes.get`

#### Container Analysis Notes Editor (`roles/containeranalysis.notes.editor`)

- Can edit Container Analysis Notes.
- Permissions (8): `containeranalysis.notes.attachOccurrence`, `containeranalysis.notes.create`, `containeranalysis.notes.delete`, `containeranalysis.notes.get`, `containeranalysis.notes.list`, `containeranalysis.notes.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Container Analysis Occurrences for Notes Viewer (`roles/containeranalysis.notes.occurrences.viewer`)

- Can view all Container Analysis Occurrences attached to a Note.
- Permissions (2): `containeranalysis.notes.get`, `containeranalysis.notes.listOccurrences`

#### Container Analysis Notes Viewer (`roles/containeranalysis.notes.viewer`)

- Can view Container Analysis Notes.
- Permissions (4): `containeranalysis.notes.get`, `containeranalysis.notes.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Container Analysis Occurrences Editor (`roles/containeranalysis.occurrences.editor`)

- Can edit Container Analysis Occurrences.
- Permissions (7): `containeranalysis.occurrences.create`, `containeranalysis.occurrences.delete`, `containeranalysis.occurrences.get`, `containeranalysis.occurrences.list`, `containeranalysis.occurrences.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Container Analysis Occurrences Viewer (`roles/containeranalysis.occurrences.viewer`)

- Can view Container Analysis Occurrences.
- Permissions (4): `containeranalysis.occurrences.get`, `containeranalysis.occurrences.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Container Analysis Service Agent (`roles/containeranalysis.ServiceAgent`)

- Gives Container Analysis API the access it needs to function > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (93): `artifactregistry.attachments.get`, `artifactregistry.attachments.list`, `artifactregistry.dockerimages.get`, `artifactregistry.dockerimages.list`, `artifactregistry.files.download`, `artifactregistry.files.get`, `artifactregistry.files.list`, `artifactregistry.locations.get`, `artifactregistry.locations.list`, `artifactregistry.mavenartifacts.get`, `artifactregistry.mavenartifacts.list`, `artifactregistry.npmpackages.get`, `artifactregistry.npmpackages.list`, `artifactregistry.packages.get`, `artifactregistry.packages.list`, `artifactregistry.projectconfigs.get`, `artifactregistry.projectsettings.get`, `artifactregistry.pythonpackages.get`, `artifactregistry.pythonpackages.list`, `artifactregistry.repositories.downloadArtifacts`, `artifactregistry.repositories.exportArtifacts`, `artifactregistry.repositories.get`, `artifactregistry.repositories.list`, `artifactregistry.repositories.listEffectiveTags`, `artifactregistry.repositories.listTagBindings`, `artifactregistry.repositories.readViaVirtualRepository`, `artifactregistry.rules.get`, `artifactregistry.rules.list`, `artifactregistry.tags.get`, `artifactregistry.tags.list`, `artifactregistry.versions.get`, `artifactregistry.versions.list`, `containeranalysis.notes.list`, `containeranalysis.occurrences.create`, `containeranalysis.occurrences.delete`, `containeranalysis.occurrences.get`, `containeranalysis.occurrences.list`, `containeranalysis.occurrences.update`, `pubsub.messageTransforms.validate`, `pubsub.schemas.attach`, `pubsub.schemas.commit`, `pubsub.schemas.create`, `pubsub.schemas.delete`, `pubsub.schemas.get`, `pubsub.schemas.getIamPolicy`, `pubsub.schemas.list`, `pubsub.schemas.listRevisions`, `pubsub.schemas.rollback`, `pubsub.schemas.validate`, `pubsub.snapshots.create`, `pubsub.snapshots.delete`, `pubsub.snapshots.get`, `pubsub.snapshots.list`, `pubsub.snapshots.listEffectiveTags`, `pubsub.snapshots.listTagBindings`, `pubsub.snapshots.seek`, `pubsub.snapshots.update`, `pubsub.subscriptions.consume`, `pubsub.subscriptions.create`, `pubsub.subscriptions.delete`, `pubsub.subscriptions.get`, `pubsub.subscriptions.list`, `pubsub.subscriptions.listEffectiveTags`, `pubsub.subscriptions.listTagBindings`, `pubsub.subscriptions.update`, `pubsub.topics.attachSubscription`, `pubsub.topics.create`, `pubsub.topics.delete`, `pubsub.topics.detachSubscription`, `pubsub.topics.get`, `pubsub.topics.list`, `pubsub.topics.listEffectiveTags`, `pubsub.topics.listTagBindings`, `pubsub.topics.publish`, `pubsub.topics.update`, `pubsub.topics.updateTag`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `serviceusage.catalogs.listMembers`, `serviceusage.consumerpolicy.analyze`, `serviceusage.consumerpolicy.get`, `serviceusage.effectivepolicy.get`, `serviceusage.groups.list`, `serviceusage.groups.listExpandedMembers`, `serviceusage.groups.listMembers`, `serviceusage.quotas.get`, `serviceusage.services.get`, `serviceusage.services.list`, `serviceusage.services.listApis`, `serviceusage.services.listDependentServices`, `serviceusage.values.test`, `storage.objects.get`, `storage.objects.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/containeranalysis.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `containeranalysis.notes.attachOccurrence` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/containeranalysis.admin`, `roles/containeranalysis.editor`, `roles/containeranalysis.notes.attacher`, `roles/containeranalysis.notes.editor` (+3 service agent roles) |
| `containeranalysis.notes.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/containeranalysis.admin`, `roles/containeranalysis.editor`, `roles/containeranalysis.notes.editor` (+3 service agent roles) |
| `containeranalysis.notes.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/containeranalysis.admin`, `roles/containeranalysis.editor`, `roles/containeranalysis.notes.editor` (+3 service agent roles) |
| `containeranalysis.notes.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/containeranalysis.admin`, `roles/containeranalysis.editor`, `roles/containeranalysis.viewer`, `roles/containeranalysis.notes.attacher`, `roles/containeranalysis.notes.editor`, `roles/containeranalysis.notes.occurrences.viewer`, `roles/containeranalysis.notes.viewer`, `roles/iam.supportUser` (+4 service agent roles) |
| `containeranalysis.notes.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/containeranalysis.admin`, `roles/containeranalysis.editor`, `roles/containeranalysis.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `containeranalysis.notes.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/containeranalysis.admin`, `roles/containeranalysis.editor`, `roles/containeranalysis.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/containeranalysis.notes.editor`, `roles/containeranalysis.notes.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+6 service agent roles) |
| `containeranalysis.notes.listOccurrences` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/containeranalysis.editor`, `roles/containeranalysis.notes.occurrences.viewer` (+1 service agent role) |
| `containeranalysis.notes.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/containeranalysis.admin`, `roles/iam.securityAdmin` |
| `containeranalysis.notes.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/containeranalysis.admin`, `roles/containeranalysis.editor`, `roles/containeranalysis.notes.editor` (+3 service agent roles) |
| `containeranalysis.occurrences.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudbuild.builds.builder`, `roles/containeranalysis.admin`, `roles/containeranalysis.editor`, `roles/composer.worker`, `roles/containeranalysis.occurrences.editor` (+5 service agent roles) |
| `containeranalysis.occurrences.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudbuild.builds.builder`, `roles/containeranalysis.admin`, `roles/containeranalysis.editor`, `roles/composer.worker`, `roles/containeranalysis.occurrences.editor` (+5 service agent roles) |
| `containeranalysis.occurrences.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudbuild.builds.builder`, `roles/containeranalysis.admin`, `roles/containeranalysis.editor`, `roles/containeranalysis.viewer`, `roles/composer.worker`, `roles/containeranalysis.occurrences.editor`, `roles/containeranalysis.occurrences.viewer`, `roles/developerconnect.insightsAgent`, `roles/iam.supportUser` (+6 service agent roles) |
| `containeranalysis.occurrences.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/containeranalysis.admin`, `roles/containeranalysis.editor`, `roles/containeranalysis.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `containeranalysis.occurrences.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudbuild.builds.builder`, `roles/containeranalysis.admin`, `roles/containeranalysis.editor`, `roles/containeranalysis.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/composer.worker`, `roles/containeranalysis.occurrences.editor`, `roles/containeranalysis.occurrences.viewer`, `roles/developerconnect.insightsAgent`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+6 service agent roles) |
| `containeranalysis.occurrences.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/containeranalysis.admin`, `roles/iam.securityAdmin` |
| `containeranalysis.occurrences.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudbuild.builds.builder`, `roles/containeranalysis.admin`, `roles/containeranalysis.editor`, `roles/composer.worker`, `roles/containeranalysis.occurrences.editor` (+5 service agent roles) |

## Notes

- Roles and permissions of the `containeranalysis` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/containeranalysis (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
