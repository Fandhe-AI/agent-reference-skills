---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/runtimeconfig
---

# Cloud Runtime Configuration API IAM roles and permissions

## Signature / Usage

Predefined roles of `runtimeconfig` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Cloud RuntimeConfig Admin (`roles/runtimeconfig.admin`)

- Full access to RuntimeConfig resources.
- Permissions (24): `runtimeconfig.configs.create`, `runtimeconfig.configs.delete`, `runtimeconfig.configs.get`, `runtimeconfig.configs.getIamPolicy`, `runtimeconfig.configs.list`, `runtimeconfig.configs.setIamPolicy`, `runtimeconfig.configs.update`, `runtimeconfig.operations.get`, `runtimeconfig.operations.list`, `runtimeconfig.variables.create`, `runtimeconfig.variables.delete`, `runtimeconfig.variables.get`, `runtimeconfig.variables.getIamPolicy`, `runtimeconfig.variables.list`, `runtimeconfig.variables.setIamPolicy`, `runtimeconfig.variables.update`, `runtimeconfig.variables.watch`, `runtimeconfig.waiters.create`, `runtimeconfig.waiters.delete`, `runtimeconfig.waiters.get`, `runtimeconfig.waiters.getIamPolicy`, `runtimeconfig.waiters.list`, `runtimeconfig.waiters.setIamPolicy`, `runtimeconfig.waiters.update`

#### Runtimeconfig Editor (`roles/runtimeconfig.editor`)

- Editor role for runtimeconfig
- Permissions (20): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `runtimeconfig.configs.create`, `runtimeconfig.configs.delete`, `runtimeconfig.configs.get`, `runtimeconfig.configs.list`, `runtimeconfig.configs.update`, `runtimeconfig.operations.get`, `runtimeconfig.operations.list`, `runtimeconfig.variables.create`, `runtimeconfig.variables.delete`, `runtimeconfig.variables.get`, `runtimeconfig.variables.list`, `runtimeconfig.variables.update`, `runtimeconfig.variables.watch`, `runtimeconfig.waiters.create`, `runtimeconfig.waiters.delete`, `runtimeconfig.waiters.get`, `runtimeconfig.waiters.list`, `runtimeconfig.waiters.update`

#### Runtimeconfig Viewer (`roles/runtimeconfig.viewer`)

- Viewer role for runtimeconfig
- Permissions (11): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `runtimeconfig.configs.get`, `runtimeconfig.configs.list`, `runtimeconfig.operations.get`, `runtimeconfig.operations.list`, `runtimeconfig.variables.get`, `runtimeconfig.variables.list`, `runtimeconfig.variables.watch`, `runtimeconfig.waiters.get`, `runtimeconfig.waiters.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/runtimeconfig.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `runtimeconfig.configs.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/firebase.admin`, `roles/runtimeconfig.admin`, `roles/runtimeconfig.editor`, `roles/firebase.developAdmin` (+1 service agent role) |
| `runtimeconfig.configs.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/firebase.admin`, `roles/runtimeconfig.admin`, `roles/runtimeconfig.editor`, `roles/firebase.developAdmin` (+1 service agent role) |
| `runtimeconfig.configs.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/firebase.admin`, `roles/runtimeconfig.admin`, `roles/runtimeconfig.editor`, `roles/runtimeconfig.viewer`, `roles/firebase.developAdmin`, `roles/iam.supportUser` (+1 service agent role) |
| `runtimeconfig.configs.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/runtimeconfig.admin`, `roles/iam.securityAuditor` |
| `runtimeconfig.configs.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/firebase.admin`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/runtimeconfig.admin`, `roles/runtimeconfig.editor`, `roles/runtimeconfig.viewer`, `roles/firebase.developAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+1 service agent role) |
| `runtimeconfig.configs.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/iam.securityAdmin`, `roles/runtimeconfig.admin` |
| `runtimeconfig.configs.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/firebase.admin`, `roles/runtimeconfig.admin`, `roles/runtimeconfig.editor`, `roles/firebase.developAdmin` (+1 service agent role) |
| `runtimeconfig.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/firebase.admin`, `roles/runtimeconfig.admin`, `roles/runtimeconfig.editor`, `roles/runtimeconfig.viewer`, `roles/firebase.developAdmin`, `roles/iam.supportUser` |
| `runtimeconfig.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/firebase.admin`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/runtimeconfig.admin`, `roles/runtimeconfig.editor`, `roles/runtimeconfig.viewer`, `roles/firebase.developAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `runtimeconfig.variables.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/firebase.admin`, `roles/runtimeconfig.admin`, `roles/runtimeconfig.editor`, `roles/firebase.developAdmin` (+1 service agent role) |
| `runtimeconfig.variables.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/firebase.admin`, `roles/runtimeconfig.admin`, `roles/runtimeconfig.editor`, `roles/firebase.developAdmin` (+1 service agent role) |
| `runtimeconfig.variables.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/firebase.admin`, `roles/runtimeconfig.admin`, `roles/runtimeconfig.editor`, `roles/runtimeconfig.viewer`, `roles/firebase.developAdmin`, `roles/iam.supportUser` (+1 service agent role) |
| `runtimeconfig.variables.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/runtimeconfig.admin`, `roles/iam.securityAuditor` |
| `runtimeconfig.variables.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/firebase.admin`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/runtimeconfig.admin`, `roles/runtimeconfig.editor`, `roles/runtimeconfig.viewer`, `roles/firebase.developAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+1 service agent role) |
| `runtimeconfig.variables.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/iam.securityAdmin`, `roles/runtimeconfig.admin` |
| `runtimeconfig.variables.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/firebase.admin`, `roles/runtimeconfig.admin`, `roles/runtimeconfig.editor`, `roles/firebase.developAdmin` (+1 service agent role) |
| `runtimeconfig.variables.watch` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/firebase.admin`, `roles/runtimeconfig.admin`, `roles/runtimeconfig.editor`, `roles/runtimeconfig.viewer`, `roles/firebase.developAdmin`, `roles/iam.supportUser` |
| `runtimeconfig.waiters.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/firebase.admin`, `roles/runtimeconfig.admin`, `roles/runtimeconfig.editor`, `roles/firebase.developAdmin` (+1 service agent role) |
| `runtimeconfig.waiters.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/firebase.admin`, `roles/runtimeconfig.admin`, `roles/runtimeconfig.editor`, `roles/firebase.developAdmin` (+1 service agent role) |
| `runtimeconfig.waiters.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/firebase.admin`, `roles/runtimeconfig.admin`, `roles/runtimeconfig.editor`, `roles/runtimeconfig.viewer`, `roles/firebase.developAdmin`, `roles/iam.supportUser` (+1 service agent role) |
| `runtimeconfig.waiters.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/runtimeconfig.admin`, `roles/iam.securityAuditor` |
| `runtimeconfig.waiters.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/firebase.admin`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/runtimeconfig.admin`, `roles/runtimeconfig.editor`, `roles/runtimeconfig.viewer`, `roles/firebase.developAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+1 service agent role) |
| `runtimeconfig.waiters.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/iam.securityAdmin`, `roles/runtimeconfig.admin` |
| `runtimeconfig.waiters.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/firebase.admin`, `roles/runtimeconfig.admin`, `roles/runtimeconfig.editor`, `roles/firebase.developAdmin` |

## Notes

- Roles and permissions of the `runtimeconfig` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/runtimeconfig (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
