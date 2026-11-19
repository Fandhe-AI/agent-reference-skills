---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/biglake
---

# BigLake IAM roles and permissions

## Signature / Usage

Predefined roles of `biglake` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### BigLake Admin (`roles/biglake.admin`)

- Provides full access to all BigLake resources.
- Permissions (40): `biglake.catalogs.create`, `biglake.catalogs.delete`, `biglake.catalogs.get`, `biglake.catalogs.getIamPolicy`, `biglake.catalogs.list`, `biglake.catalogs.setIamPolicy`, `biglake.catalogs.update`, `biglake.databases.create`, `biglake.databases.delete`, `biglake.databases.get`, `biglake.databases.list`, `biglake.databases.update`, `biglake.locks.check`, `biglake.locks.create`, `biglake.locks.delete`, `biglake.locks.list`, `biglake.namespaces.create`, `biglake.namespaces.delete`, `biglake.namespaces.get`, `biglake.namespaces.getIamPolicy`, `biglake.namespaces.list`, `biglake.namespaces.setIamPolicy`, `biglake.namespaces.update`, `biglake.tables.create`, `biglake.tables.createPartitions`, `biglake.tables.delete`, `biglake.tables.deletePartitions`, `biglake.tables.get`, `biglake.tables.getData`, `biglake.tables.getIamPolicy`, `biglake.tables.list`, `biglake.tables.listPartitions`, `biglake.tables.lock`, `biglake.tables.register`, `biglake.tables.setIamPolicy`, `biglake.tables.update`, `biglake.tables.updateData`, `biglake.tables.updatePartitions`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### BigLake Editor (`roles/biglake.editor`)

- Launch stage: Beta
- Provides read and write access to all BigLake resources.
- Permissions (36): `biglake.catalogs.create`, `biglake.catalogs.delete`, `biglake.catalogs.get`, `biglake.catalogs.getIamPolicy`, `biglake.catalogs.list`, `biglake.catalogs.update`, `biglake.databases.create`, `biglake.databases.delete`, `biglake.databases.get`, `biglake.databases.list`, `biglake.databases.update`, `biglake.locks.check`, `biglake.locks.create`, `biglake.locks.delete`, `biglake.locks.list`, `biglake.namespaces.create`, `biglake.namespaces.delete`, `biglake.namespaces.get`, `biglake.namespaces.getIamPolicy`, `biglake.namespaces.list`, `biglake.namespaces.update`, `biglake.tables.create`, `biglake.tables.createPartitions`, `biglake.tables.delete`, `biglake.tables.deletePartitions`, `biglake.tables.get`, `biglake.tables.getData`, `biglake.tables.getIamPolicy`, `biglake.tables.list`, `biglake.tables.listPartitions`, `biglake.tables.lock`, `biglake.tables.update`, `biglake.tables.updateData`, `biglake.tables.updatePartitions`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### BigLake Viewer (`roles/biglake.viewer`)

- Provides read-only access to all BigLake resources.
- Permissions (16): `biglake.catalogs.get`, `biglake.catalogs.getIamPolicy`, `biglake.catalogs.list`, `biglake.databases.get`, `biglake.databases.list`, `biglake.locks.list`, `biglake.namespaces.get`, `biglake.namespaces.getIamPolicy`, `biglake.namespaces.list`, `biglake.tables.get`, `biglake.tables.getData`, `biglake.tables.getIamPolicy`, `biglake.tables.list`, `biglake.tables.listPartitions`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### BigLake Metadata Viewer (`roles/biglake.metadataViewer`)

- Launch stage: Beta
- Provides read-only metadata access to all BigLake resources.
- Permissions (12): `biglake.catalogs.get`, `biglake.catalogs.getIamPolicy`, `biglake.catalogs.list`, `biglake.namespaces.get`, `biglake.namespaces.getIamPolicy`, `biglake.namespaces.list`, `biglake.tables.get`, `biglake.tables.getIamPolicy`, `biglake.tables.list`, `biglake.tables.listPartitions`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/biglake.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `biglake.catalogs.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/biglake.admin`, `roles/biglake.editor`, `roles/iam.databasesAdmin` (+2 service agent roles) |
| `biglake.catalogs.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/biglake.admin`, `roles/biglake.editor`, `roles/iam.databasesAdmin` (+1 service agent role) |
| `biglake.catalogs.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/biglake.admin`, `roles/biglake.editor`, `roles/biglake.viewer`, `roles/biglake.metadataViewer`, `roles/iam.databasesAdmin`, `roles/iam.supportUser` (+3 service agent roles) |
| `biglake.catalogs.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/biglake.admin`, `roles/biglake.editor`, `roles/biglake.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/biglake.metadataViewer`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `biglake.catalogs.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/biglake.admin`, `roles/biglake.editor`, `roles/biglake.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/biglake.metadataViewer`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `biglake.catalogs.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/biglake.admin`, `roles/iam.securityAdmin`, `roles/iam.databasesAdmin` |
| `biglake.catalogs.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/biglake.admin`, `roles/biglake.editor`, `roles/iam.databasesAdmin` |
| `biglake.databases.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/biglake.admin`, `roles/biglake.editor`, `roles/iam.databasesAdmin` |
| `biglake.databases.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/biglake.admin`, `roles/biglake.editor`, `roles/iam.databasesAdmin` |
| `biglake.databases.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/biglake.admin`, `roles/biglake.editor`, `roles/biglake.viewer`, `roles/iam.databasesAdmin`, `roles/iam.supportUser` |
| `biglake.databases.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/biglake.admin`, `roles/biglake.editor`, `roles/biglake.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `biglake.databases.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/biglake.admin`, `roles/biglake.editor`, `roles/iam.databasesAdmin` |
| `biglake.locks.check` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/biglake.admin`, `roles/biglake.editor`, `roles/iam.databasesAdmin` |
| `biglake.locks.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/biglake.admin`, `roles/biglake.editor`, `roles/iam.databasesAdmin` |
| `biglake.locks.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/biglake.admin`, `roles/biglake.editor`, `roles/iam.databasesAdmin` |
| `biglake.locks.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/biglake.admin`, `roles/biglake.editor`, `roles/biglake.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `biglake.namespaces.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/biglake.admin`, `roles/biglake.editor`, `roles/iam.databasesAdmin` (+1 service agent role) |
| `biglake.namespaces.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/biglake.admin`, `roles/biglake.editor`, `roles/iam.databasesAdmin` (+1 service agent role) |
| `biglake.namespaces.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/biglake.admin`, `roles/biglake.editor`, `roles/biglake.viewer`, `roles/biglake.metadataViewer`, `roles/iam.databasesAdmin`, `roles/iam.supportUser` (+2 service agent roles) |
| `biglake.namespaces.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/biglake.admin`, `roles/biglake.editor`, `roles/biglake.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/biglake.metadataViewer`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `biglake.namespaces.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/biglake.admin`, `roles/biglake.editor`, `roles/biglake.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/biglake.metadataViewer`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+1 service agent role) |
| `biglake.namespaces.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/biglake.admin`, `roles/iam.securityAdmin`, `roles/iam.databasesAdmin` |
| `biglake.namespaces.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/biglake.admin`, `roles/biglake.editor`, `roles/iam.databasesAdmin` |
| `biglake.tables.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/biglake.admin`, `roles/biglake.editor`, `roles/iam.databasesAdmin` (+1 service agent role) |
| `biglake.tables.createPartitions` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/biglake.admin`, `roles/biglake.editor`, `roles/iam.databasesAdmin` |
| `biglake.tables.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/biglake.admin`, `roles/biglake.editor`, `roles/iam.databasesAdmin` (+1 service agent role) |
| `biglake.tables.deletePartitions` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/biglake.admin`, `roles/biglake.editor`, `roles/iam.databasesAdmin` |
| `biglake.tables.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/biglake.admin`, `roles/biglake.editor`, `roles/biglake.viewer`, `roles/biglake.metadataViewer`, `roles/iam.databasesAdmin`, `roles/iam.supportUser` (+2 service agent roles) |
| `biglake.tables.getData` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/biglake.admin`, `roles/biglake.editor`, `roles/biglake.viewer`, `roles/iam.databasesAdmin`, `roles/iam.supportUser` (+1 service agent role) |
| `biglake.tables.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/biglake.admin`, `roles/biglake.editor`, `roles/biglake.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/biglake.metadataViewer`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `biglake.tables.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/biglake.admin`, `roles/biglake.editor`, `roles/biglake.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/biglake.metadataViewer`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+2 service agent roles) |
| `biglake.tables.listPartitions` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/biglake.admin`, `roles/biglake.editor`, `roles/biglake.viewer`, `roles/biglake.metadataViewer`, `roles/iam.databasesAdmin`, `roles/iam.supportUser` |
| `biglake.tables.lock` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/biglake.admin`, `roles/biglake.editor`, `roles/iam.databasesAdmin` |
| `biglake.tables.register` | `roles/admin`, `roles/owner`, `roles/biglake.admin`, `roles/iam.databasesAdmin` (+1 service agent role) |
| `biglake.tables.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/biglake.admin`, `roles/iam.securityAdmin`, `roles/iam.databasesAdmin` |
| `biglake.tables.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/biglake.admin`, `roles/biglake.editor`, `roles/iam.databasesAdmin` (+1 service agent role) |
| `biglake.tables.updateData` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/biglake.admin`, `roles/biglake.editor`, `roles/iam.databasesAdmin` (+1 service agent role) |
| `biglake.tables.updatePartitions` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/biglake.admin`, `roles/biglake.editor`, `roles/iam.databasesAdmin` |

## Notes

- Roles and permissions of the `biglake` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/biglake (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
