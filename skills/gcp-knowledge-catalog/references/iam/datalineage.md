---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/datalineage
---

# Data Lineage API IAM roles and permissions

## Signature / Usage

Predefined roles of `datalineage` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Data Lineage Administrator (`roles/datalineage.admin`)

- Grants full access to all resources in Data Lineage API
- Permissions (28): `datalineage.configs.get`, `datalineage.configs.update`, `datalineage.events.create`, `datalineage.events.delete`, `datalineage.events.get`, `datalineage.events.getFields`, `datalineage.events.list`, `datalineage.locations.importLineage`, `datalineage.locations.processOpenLineageMessage`, `datalineage.locations.searchLinks`, `datalineage.operations.get`, `datalineage.processRevisions.delete`, `datalineage.processRevisions.get`, `datalineage.processRevisions.insert`, `datalineage.processRevisions.list`, `datalineage.processes.create`, `datalineage.processes.delete`, `datalineage.processes.get`, `datalineage.processes.list`, `datalineage.processes.markAsDeleted`, `datalineage.processes.update`, `datalineage.runs.create`, `datalineage.runs.delete`, `datalineage.runs.get`, `datalineage.runs.list`, `datalineage.runs.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Data Lineage Editor (`roles/datalineage.editor`)

- Grants edit access to all resources in Data Lineage API
- Permissions (25): `datalineage.events.create`, `datalineage.events.delete`, `datalineage.events.get`, `datalineage.events.getFields`, `datalineage.events.list`, `datalineage.locations.processOpenLineageMessage`, `datalineage.locations.searchLinks`, `datalineage.operations.get`, `datalineage.processRevisions.delete`, `datalineage.processRevisions.get`, `datalineage.processRevisions.insert`, `datalineage.processRevisions.list`, `datalineage.processes.create`, `datalineage.processes.delete`, `datalineage.processes.get`, `datalineage.processes.list`, `datalineage.processes.markAsDeleted`, `datalineage.processes.update`, `datalineage.runs.create`, `datalineage.runs.delete`, `datalineage.runs.get`, `datalineage.runs.list`, `datalineage.runs.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Data Lineage Viewer (`roles/datalineage.viewer`)

- Grants read access to all resources in Data Lineage API
- Permissions (12): `datalineage.events.get`, `datalineage.events.getFields`, `datalineage.events.list`, `datalineage.locations.searchLinks`, `datalineage.processRevisions.get`, `datalineage.processRevisions.list`, `datalineage.processes.get`, `datalineage.processes.list`, `datalineage.runs.get`, `datalineage.runs.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Data Lineage Events Producer (`roles/datalineage.producer`)

- Grants access to creating all resources in Data Lineage API
- Permissions (12): `datalineage.events.create`, `datalineage.locations.processOpenLineageMessage`, `datalineage.processRevisions.insert`, `datalineage.processes.create`, `datalineage.processes.get`, `datalineage.processes.markAsDeleted`, `datalineage.processes.update`, `datalineage.runs.create`, `datalineage.runs.get`, `datalineage.runs.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/datalineage.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `datalineage.configs.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/datalineage.admin`, `roles/iam.supportUser` |
| `datalineage.configs.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/datalineage.admin` |
| `datalineage.events.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/datalineage.admin`, `roles/datalineage.editor`, `roles/composer.worker`, `roles/datalineage.producer` |
| `datalineage.events.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/datalineage.admin`, `roles/datalineage.editor` |
| `datalineage.events.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/datalineage.admin`, `roles/datalineage.editor`, `roles/datalineage.viewer`, `roles/iam.supportUser` |
| `datalineage.events.getFields` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/datalineage.admin`, `roles/datalineage.editor`, `roles/datalineage.viewer`, `roles/iam.supportUser` |
| `datalineage.events.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/datalineage.admin`, `roles/datalineage.editor`, `roles/datalineage.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `datalineage.locations.importLineage` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/datalineage.admin` (+1 service agent role) |
| `datalineage.locations.processOpenLineageMessage` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/datalineage.admin`, `roles/datalineage.editor`, `roles/composer.worker`, `roles/datalineage.producer`, `roles/dataproc.worker` |
| `datalineage.locations.searchLinks` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/datalineage.admin`, `roles/datalineage.editor`, `roles/datalineage.viewer`, `roles/iam.supportUser` |
| `datalineage.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/datalineage.admin`, `roles/datalineage.editor`, `roles/iam.supportUser` (+1 service agent role) |
| `datalineage.processRevisions.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/datalineage.admin`, `roles/datalineage.editor` |
| `datalineage.processRevisions.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/datalineage.admin`, `roles/datalineage.editor`, `roles/datalineage.viewer`, `roles/iam.supportUser` |
| `datalineage.processRevisions.insert` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/datalineage.admin`, `roles/datalineage.editor`, `roles/composer.worker`, `roles/datalineage.producer` |
| `datalineage.processRevisions.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/datalineage.admin`, `roles/datalineage.editor`, `roles/datalineage.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `datalineage.processes.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/datalineage.admin`, `roles/datalineage.editor`, `roles/composer.worker`, `roles/datalineage.producer` |
| `datalineage.processes.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/datalineage.admin`, `roles/datalineage.editor` |
| `datalineage.processes.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/datalineage.admin`, `roles/datalineage.editor`, `roles/datalineage.viewer`, `roles/composer.worker`, `roles/datalineage.producer`, `roles/iam.supportUser` |
| `datalineage.processes.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/datalineage.admin`, `roles/datalineage.editor`, `roles/datalineage.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `datalineage.processes.markAsDeleted` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/datalineage.admin`, `roles/datalineage.editor`, `roles/composer.worker`, `roles/datalineage.producer` |
| `datalineage.processes.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/datalineage.admin`, `roles/datalineage.editor`, `roles/composer.worker`, `roles/datalineage.producer` |
| `datalineage.runs.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/datalineage.admin`, `roles/datalineage.editor`, `roles/composer.worker`, `roles/datalineage.producer` |
| `datalineage.runs.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/datalineage.admin`, `roles/datalineage.editor` |
| `datalineage.runs.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/datalineage.admin`, `roles/datalineage.editor`, `roles/datalineage.viewer`, `roles/composer.worker`, `roles/datalineage.producer`, `roles/iam.supportUser` |
| `datalineage.runs.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/datalineage.admin`, `roles/datalineage.editor`, `roles/datalineage.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `datalineage.runs.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/datalineage.admin`, `roles/datalineage.editor`, `roles/composer.worker`, `roles/datalineage.producer` |

## Notes

- Roles and permissions of the `datalineage` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/datalineage (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
