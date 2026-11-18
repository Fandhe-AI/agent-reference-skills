---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/secretmanager
---

# Secret Manager IAM roles and permissions

## Signature / Usage

Predefined roles of `secretmanager` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Secret Manager Admin (`roles/secretmanager.admin`)

- Full access to administer Secret Manager resources. Lowest-level resources where you can grant this role: - Secret
- Permissions (40): `cloudkms.keyHandles.create`, `cloudkms.keyHandles.get`, `cloudkms.keyHandles.list`, `cloudkms.operations.get`, `cloudkms.projects.showEffectiveAutokeyConfig`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `secretmanager.backups.create`, `secretmanager.backups.delete`, `secretmanager.backups.get`, `secretmanager.backups.list`, `secretmanager.backups.restore`, `secretmanager.backups.update`, `secretmanager.locations.get`, `secretmanager.locations.list`, `secretmanager.operations.cancel`, `secretmanager.operations.get`, `secretmanager.operations.list`, `secretmanager.secrets.backup`, `secretmanager.secrets.create`, `secretmanager.secrets.createTagBinding`, `secretmanager.secrets.delete`, `secretmanager.secrets.deleteTagBinding`, `secretmanager.secrets.enableManagedRotation`, `secretmanager.secrets.get`, `secretmanager.secrets.getIamPolicy`, `secretmanager.secrets.list`, `secretmanager.secrets.listEffectiveTags`, `secretmanager.secrets.listTagBindings`, `secretmanager.secrets.restore`, `secretmanager.secrets.rotate`, `secretmanager.secrets.setIamPolicy`, `secretmanager.secrets.update`, `secretmanager.versions.access`, `secretmanager.versions.add`, `secretmanager.versions.destroy`, `secretmanager.versions.disable`, `secretmanager.versions.enable`, `secretmanager.versions.get`, `secretmanager.versions.list`

#### Secret Manager Editor (`roles/secretmanager.editor`)

- Editor role for Secret Manager
- Permissions (28): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `secretmanager.backups.create`, `secretmanager.backups.delete`, `secretmanager.backups.get`, `secretmanager.backups.list`, `secretmanager.backups.update`, `secretmanager.locations.get`, `secretmanager.locations.list`, `secretmanager.operations.cancel`, `secretmanager.operations.get`, `secretmanager.operations.list`, `secretmanager.secrets.create`, `secretmanager.secrets.delete`, `secretmanager.secrets.enableManagedRotation`, `secretmanager.secrets.get`, `secretmanager.secrets.getIamPolicy`, `secretmanager.secrets.list`, `secretmanager.secrets.listEffectiveTags`, `secretmanager.secrets.listTagBindings`, `secretmanager.secrets.rotate`, `secretmanager.secrets.update`, `secretmanager.versions.add`, `secretmanager.versions.destroy`, `secretmanager.versions.disable`, `secretmanager.versions.enable`, `secretmanager.versions.get`, `secretmanager.versions.list`

#### Secret Manager Secret Accessor (`roles/secretmanager.secretAccessor`)

- Allows accessing the payload of secrets. Lowest-level resources where you can grant this role: - Secret
- Permissions (3): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `secretmanager.versions.access`

#### Secret Manager Viewer (`roles/secretmanager.viewer`)

- Allows viewing metadata of all Secret Manager resources Lowest-level resources where you can grant this role: - Secret
- Permissions (15): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `secretmanager.backups.get`, `secretmanager.backups.list`, `secretmanager.locations.get`, `secretmanager.locations.list`, `secretmanager.operations.get`, `secretmanager.operations.list`, `secretmanager.secrets.get`, `secretmanager.secrets.getIamPolicy`, `secretmanager.secrets.list`, `secretmanager.secrets.listEffectiveTags`, `secretmanager.secrets.listTagBindings`, `secretmanager.versions.get`, `secretmanager.versions.list`

#### Secret Manager Secret Version Adder (`roles/secretmanager.secretVersionAdder`)

- Allows adding versions to existing secrets. Lowest-level resources where you can grant this role: - Secret
- Permissions (4): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `secretmanager.secrets.rotate`, `secretmanager.versions.add`

#### Secret Manager Secret Version Manager (`roles/secretmanager.secretVersionManager`)

- Allows creating and managing versions of existing secrets. Lowest-level resources where you can grant this role: - Secret
- Permissions (9): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `secretmanager.secrets.rotate`, `secretmanager.versions.add`, `secretmanager.versions.destroy`, `secretmanager.versions.disable`, `secretmanager.versions.enable`, `secretmanager.versions.get`, `secretmanager.versions.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role's lowest-level resource is Secret; granting it there instead limits the scope, but this example does not show that command):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/secretmanager.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `secretmanager.backups.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/secretmanager.admin`, `roles/secretmanager.editor` |
| `secretmanager.backups.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/secretmanager.admin`, `roles/secretmanager.editor` |
| `secretmanager.backups.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/secretmanager.admin`, `roles/secretmanager.editor`, `roles/secretmanager.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `secretmanager.backups.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/secretmanager.admin`, `roles/secretmanager.editor`, `roles/secretmanager.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `secretmanager.backups.restore` | `roles/admin`, `roles/owner`, `roles/secretmanager.admin` |
| `secretmanager.backups.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/secretmanager.admin`, `roles/secretmanager.editor` |
| `secretmanager.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/secretmanager.admin`, `roles/secretmanager.editor`, `roles/secretmanager.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `secretmanager.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/secretmanager.admin`, `roles/secretmanager.editor`, `roles/secretmanager.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `secretmanager.operations.cancel` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/secretmanager.admin`, `roles/secretmanager.editor` |
| `secretmanager.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/secretmanager.admin`, `roles/secretmanager.editor`, `roles/secretmanager.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `secretmanager.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/secretmanager.admin`, `roles/secretmanager.editor`, `roles/secretmanager.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `secretmanager.secrets.backup` | `roles/admin`, `roles/owner`, `roles/secretmanager.admin` |
| `secretmanager.secrets.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/secretmanager.admin`, `roles/secretmanager.editor` |
| `secretmanager.secrets.createTagBinding` | `roles/admin`, `roles/owner`, `roles/resourcemanager.tagUser`, `roles/secretmanager.admin`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver` |
| `secretmanager.secrets.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/secretmanager.admin`, `roles/secretmanager.editor` |
| `secretmanager.secrets.deleteTagBinding` | `roles/admin`, `roles/owner`, `roles/resourcemanager.tagUser`, `roles/secretmanager.admin`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver` |
| `secretmanager.secrets.enableManagedRotation` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/secretmanager.admin`, `roles/secretmanager.editor` |
| `secretmanager.secrets.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/secretmanager.admin`, `roles/secretmanager.editor`, `roles/secretmanager.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `secretmanager.secrets.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/connectors.admin`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/secretmanager.admin`, `roles/secretmanager.editor`, `roles/secretmanager.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` |
| `secretmanager.secrets.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/secretmanager.admin`, `roles/secretmanager.editor`, `roles/secretmanager.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` (+1 service agent role) |
| `secretmanager.secrets.listEffectiveTags` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/secretmanager.admin`, `roles/secretmanager.editor`, `roles/secretmanager.viewer`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `secretmanager.secrets.listTagBindings` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/secretmanager.admin`, `roles/secretmanager.editor`, `roles/secretmanager.viewer`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `secretmanager.secrets.restore` | `roles/admin`, `roles/owner`, `roles/secretmanager.admin` |
| `secretmanager.secrets.rotate` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/secretmanager.admin`, `roles/secretmanager.editor`, `roles/secretmanager.secretVersionAdder`, `roles/secretmanager.secretVersionManager` |
| `secretmanager.secrets.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/iam.securityAdmin`, `roles/secretmanager.admin` |
| `secretmanager.secrets.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/secretmanager.admin`, `roles/secretmanager.editor` |
| `secretmanager.versions.access` | `roles/admin`, `roles/owner`, `roles/secretmanager.admin`, `roles/secretmanager.secretAccessor` |
| `secretmanager.versions.add` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/secretmanager.admin`, `roles/secretmanager.editor`, `roles/secretmanager.secretVersionAdder`, `roles/secretmanager.secretVersionManager` |
| `secretmanager.versions.destroy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/secretmanager.admin`, `roles/secretmanager.editor`, `roles/secretmanager.secretVersionManager` |
| `secretmanager.versions.disable` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/secretmanager.admin`, `roles/secretmanager.editor`, `roles/secretmanager.secretVersionManager` |
| `secretmanager.versions.enable` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/secretmanager.admin`, `roles/secretmanager.editor`, `roles/secretmanager.secretVersionManager` |
| `secretmanager.versions.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/secretmanager.admin`, `roles/secretmanager.editor`, `roles/secretmanager.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/secretmanager.secretVersionManager` |
| `secretmanager.versions.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/secretmanager.admin`, `roles/secretmanager.editor`, `roles/secretmanager.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/secretmanager.secretVersionManager`, `roles/wiz.cloudInventoryViewer` |

## Notes

- Roles and permissions of the `secretmanager` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/secretmanager (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
