---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/remotebuildexecution
---

# Remote Build Execution IAM roles and permissions

## Signature / Usage

Predefined roles of `remotebuildexecution` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Remotebuildexecution Admin (`roles/remotebuildexecution.admin`)

- Launch stage: Beta
- Admin role for remotebuildexecution
- Permissions (23): `remotebuildexecution.actions.create`, `remotebuildexecution.actions.delete`, `remotebuildexecution.actions.get`, `remotebuildexecution.actions.update`, `remotebuildexecution.blobs.create`, `remotebuildexecution.blobs.get`, `remotebuildexecution.botsessions.create`, `remotebuildexecution.botsessions.update`, `remotebuildexecution.instances.create`, `remotebuildexecution.instances.delete`, `remotebuildexecution.instances.get`, `remotebuildexecution.instances.list`, `remotebuildexecution.instances.update`, `remotebuildexecution.logstreams.create`, `remotebuildexecution.logstreams.get`, `remotebuildexecution.logstreams.update`, `remotebuildexecution.workerpools.create`, `remotebuildexecution.workerpools.delete`, `remotebuildexecution.workerpools.get`, `remotebuildexecution.workerpools.list`, `remotebuildexecution.workerpools.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Remotebuildexecution Editor (`roles/remotebuildexecution.editor`)

- Launch stage: Beta
- Editor role for remotebuildexecution
- Permissions (21): `remotebuildexecution.actions.create`, `remotebuildexecution.actions.delete`, `remotebuildexecution.actions.get`, `remotebuildexecution.actions.update`, `remotebuildexecution.blobs.create`, `remotebuildexecution.blobs.get`, `remotebuildexecution.botsessions.create`, `remotebuildexecution.botsessions.update`, `remotebuildexecution.instances.create`, `remotebuildexecution.instances.get`, `remotebuildexecution.instances.list`, `remotebuildexecution.instances.update`, `remotebuildexecution.logstreams.create`, `remotebuildexecution.logstreams.get`, `remotebuildexecution.logstreams.update`, `remotebuildexecution.workerpools.create`, `remotebuildexecution.workerpools.get`, `remotebuildexecution.workerpools.list`, `remotebuildexecution.workerpools.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Remotebuildexecution Viewer (`roles/remotebuildexecution.viewer`)

- Launch stage: Beta
- Viewer role for remotebuildexecution
- Permissions (9): `remotebuildexecution.actions.get`, `remotebuildexecution.blobs.get`, `remotebuildexecution.instances.get`, `remotebuildexecution.instances.list`, `remotebuildexecution.logstreams.get`, `remotebuildexecution.workerpools.get`, `remotebuildexecution.workerpools.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Remote Build Execution Action Cache Writer (`roles/remotebuildexecution.actionCacheWriter`)

- Launch stage: Beta
- Remote Build Execution Action Cache Writer
- Permissions (2): `remotebuildexecution.actions.set`, `remotebuildexecution.blobs.create`

#### Remote Build Execution Artifact Admin (`roles/remotebuildexecution.artifactAdmin`)

- Launch stage: Beta
- Remote Build Execution Artifact Admin
- Permissions (8): `remotebuildexecution.actions.create`, `remotebuildexecution.actions.delete`, `remotebuildexecution.actions.get`, `remotebuildexecution.blobs.create`, `remotebuildexecution.blobs.get`, `remotebuildexecution.logstreams.create`, `remotebuildexecution.logstreams.get`, `remotebuildexecution.logstreams.update`

#### Remote Build Execution Artifact Creator (`roles/remotebuildexecution.artifactCreator`)

- Launch stage: Beta
- Remote Build Execution Artifact Creator
- Permissions (7): `remotebuildexecution.actions.create`, `remotebuildexecution.actions.get`, `remotebuildexecution.blobs.create`, `remotebuildexecution.blobs.get`, `remotebuildexecution.logstreams.create`, `remotebuildexecution.logstreams.get`, `remotebuildexecution.logstreams.update`

#### Remote Build Execution Artifact Viewer (`roles/remotebuildexecution.artifactViewer`)

- Launch stage: Beta
- Remote Build Execution Artifact Viewer
- Permissions (3): `remotebuildexecution.actions.get`, `remotebuildexecution.blobs.get`, `remotebuildexecution.logstreams.get`

#### Remote Build Execution Configuration Admin (`roles/remotebuildexecution.configurationAdmin`)

- Launch stage: Beta
- Remote Build Execution Configuration Admin
- Permissions (10): `remotebuildexecution.instances.create`, `remotebuildexecution.instances.delete`, `remotebuildexecution.instances.get`, `remotebuildexecution.instances.list`, `remotebuildexecution.instances.update`, `remotebuildexecution.workerpools.create`, `remotebuildexecution.workerpools.delete`, `remotebuildexecution.workerpools.get`, `remotebuildexecution.workerpools.list`, `remotebuildexecution.workerpools.update`

#### Remote Build Execution Configuration Viewer (`roles/remotebuildexecution.configurationViewer`)

- Launch stage: Beta
- Remote Build Execution Configuration Viewer
- Permissions (4): `remotebuildexecution.instances.get`, `remotebuildexecution.instances.list`, `remotebuildexecution.workerpools.get`, `remotebuildexecution.workerpools.list`

#### Remote Build Execution Logstream Writer (`roles/remotebuildexecution.logstreamWriter`)

- Launch stage: Beta
- Remote Build Execution Logstream Writer
- Permissions (2): `remotebuildexecution.logstreams.create`, `remotebuildexecution.logstreams.update`

#### Remote Build Execution Reservation Admin (`roles/remotebuildexecution.reservationAdmin`)

- Launch stage: Beta
- Remote Build Execution Reservation Admin
- Permissions (3): `remotebuildexecution.actions.create`, `remotebuildexecution.actions.delete`, `remotebuildexecution.actions.get`

#### Remote Build Execution Worker (`roles/remotebuildexecution.worker`)

- Launch stage: Beta
- Remote Build Execution Worker
- Permissions (7): `remotebuildexecution.actions.update`, `remotebuildexecution.blobs.create`, `remotebuildexecution.blobs.get`, `remotebuildexecution.botsessions.create`, `remotebuildexecution.botsessions.update`, `remotebuildexecution.logstreams.create`, `remotebuildexecution.logstreams.update`

#### Remote Build Execution Service Agent (`roles/remotebuildexecution.serviceAgent`)

- Gives Remote Build Execution service account access to managed resources. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (7): `remotebuildexecution.actions.update`, `remotebuildexecution.blobs.create`, `remotebuildexecution.blobs.get`, `remotebuildexecution.botsessions.create`, `remotebuildexecution.botsessions.update`, `remotebuildexecution.logstreams.create`, `remotebuildexecution.logstreams.update`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/remotebuildexecution.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `remotebuildexecution.actions.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/remotebuildexecution.admin`, `roles/remotebuildexecution.editor`, `roles/remotebuildexecution.artifactAdmin`, `roles/remotebuildexecution.artifactCreator`, `roles/remotebuildexecution.reservationAdmin` |
| `remotebuildexecution.actions.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/remotebuildexecution.admin`, `roles/remotebuildexecution.editor`, `roles/remotebuildexecution.artifactAdmin`, `roles/remotebuildexecution.reservationAdmin` |
| `remotebuildexecution.actions.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/remotebuildexecution.admin`, `roles/remotebuildexecution.editor`, `roles/remotebuildexecution.viewer`, `roles/iam.supportUser`, `roles/remotebuildexecution.artifactAdmin`, `roles/remotebuildexecution.artifactCreator`, `roles/remotebuildexecution.artifactViewer`, `roles/remotebuildexecution.reservationAdmin` |
| `remotebuildexecution.actions.set` | `roles/remotebuildexecution.actionCacheWriter` |
| `remotebuildexecution.actions.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/remotebuildexecution.admin`, `roles/remotebuildexecution.editor`, `roles/remotebuildexecution.worker` (+1 service agent role) |
| `remotebuildexecution.blobs.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/remotebuildexecution.admin`, `roles/remotebuildexecution.editor`, `roles/remotebuildexecution.actionCacheWriter`, `roles/remotebuildexecution.artifactAdmin`, `roles/remotebuildexecution.artifactCreator`, `roles/remotebuildexecution.worker` (+1 service agent role) |
| `remotebuildexecution.blobs.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudbuild.builds.builder`, `roles/cloudfunctions.admin`, `roles/cloudfunctions.editor`, `roles/cloudfunctions.viewer`, `roles/dataflow.admin`, `roles/firebase.admin`, `roles/firebase.editor`, `roles/firebase.viewer`, `roles/remotebuildexecution.admin`, `roles/remotebuildexecution.editor`, `roles/remotebuildexecution.viewer`, `roles/cloudbuild.builds.approver`, `roles/cloudbuild.builds.editor`, `roles/cloudbuild.builds.viewer`, `roles/cloudfunctions.developer`, `roles/composer.worker`, `roles/dataflow.developer`, `roles/firebase.developAdmin`, `roles/firebase.developViewer`, `roles/iam.dataScientist`, `roles/iam.devOps`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser`, `roles/remotebuildexecution.artifactAdmin`, `roles/remotebuildexecution.artifactCreator`, `roles/remotebuildexecution.artifactViewer`, `roles/remotebuildexecution.worker`, `roles/run.sourceDeveloper`, `roles/run.sourceViewer` (+7 service agent roles) |
| `remotebuildexecution.botsessions.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/remotebuildexecution.admin`, `roles/remotebuildexecution.editor`, `roles/remotebuildexecution.worker` (+1 service agent role) |
| `remotebuildexecution.botsessions.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/remotebuildexecution.admin`, `roles/remotebuildexecution.editor`, `roles/remotebuildexecution.worker` (+1 service agent role) |
| `remotebuildexecution.instances.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/remotebuildexecution.admin`, `roles/remotebuildexecution.editor`, `roles/remotebuildexecution.configurationAdmin` |
| `remotebuildexecution.instances.delete` | `roles/admin`, `roles/owner`, `roles/remotebuildexecution.admin`, `roles/remotebuildexecution.configurationAdmin` |
| `remotebuildexecution.instances.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/remotebuildexecution.admin`, `roles/remotebuildexecution.editor`, `roles/remotebuildexecution.viewer`, `roles/iam.supportUser`, `roles/remotebuildexecution.configurationAdmin`, `roles/remotebuildexecution.configurationViewer` |
| `remotebuildexecution.instances.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/remotebuildexecution.admin`, `roles/remotebuildexecution.editor`, `roles/remotebuildexecution.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/remotebuildexecution.configurationAdmin`, `roles/remotebuildexecution.configurationViewer` |
| `remotebuildexecution.instances.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/remotebuildexecution.admin`, `roles/remotebuildexecution.editor`, `roles/remotebuildexecution.configurationAdmin` |
| `remotebuildexecution.logstreams.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/remotebuildexecution.admin`, `roles/remotebuildexecution.editor`, `roles/remotebuildexecution.artifactAdmin`, `roles/remotebuildexecution.artifactCreator`, `roles/remotebuildexecution.logstreamWriter`, `roles/remotebuildexecution.worker` (+1 service agent role) |
| `remotebuildexecution.logstreams.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/remotebuildexecution.admin`, `roles/remotebuildexecution.editor`, `roles/remotebuildexecution.viewer`, `roles/iam.supportUser`, `roles/remotebuildexecution.artifactAdmin`, `roles/remotebuildexecution.artifactCreator`, `roles/remotebuildexecution.artifactViewer` |
| `remotebuildexecution.logstreams.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/remotebuildexecution.admin`, `roles/remotebuildexecution.editor`, `roles/remotebuildexecution.artifactAdmin`, `roles/remotebuildexecution.artifactCreator`, `roles/remotebuildexecution.logstreamWriter`, `roles/remotebuildexecution.worker` (+1 service agent role) |
| `remotebuildexecution.workerpools.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/remotebuildexecution.admin`, `roles/remotebuildexecution.editor`, `roles/remotebuildexecution.configurationAdmin` |
| `remotebuildexecution.workerpools.delete` | `roles/admin`, `roles/owner`, `roles/remotebuildexecution.admin`, `roles/remotebuildexecution.configurationAdmin` |
| `remotebuildexecution.workerpools.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/remotebuildexecution.admin`, `roles/remotebuildexecution.editor`, `roles/remotebuildexecution.viewer`, `roles/iam.supportUser`, `roles/remotebuildexecution.configurationAdmin`, `roles/remotebuildexecution.configurationViewer` |
| `remotebuildexecution.workerpools.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/remotebuildexecution.admin`, `roles/remotebuildexecution.editor`, `roles/remotebuildexecution.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/remotebuildexecution.configurationAdmin`, `roles/remotebuildexecution.configurationViewer` |
| `remotebuildexecution.workerpools.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/remotebuildexecution.admin`, `roles/remotebuildexecution.editor`, `roles/remotebuildexecution.configurationAdmin` |

## Notes

- Roles and permissions of the `remotebuildexecution` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/remotebuildexecution (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
