---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/ids
---

# Cloud Intrusion Detection System IAM roles and permissions

## Signature / Usage

Predefined roles of `ids` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Cloud IDS Admin (`roles/ids.admin`)

- Launch stage: Beta
- Full access to Cloud IDS all resources.
- Permissions (15): `ids.endpoints.create`, `ids.endpoints.delete`, `ids.endpoints.get`, `ids.endpoints.getIamPolicy`, `ids.endpoints.list`, `ids.endpoints.setIamPolicy`, `ids.endpoints.update`, `ids.locations.get`, `ids.locations.list`, `ids.operations.cancel`, `ids.operations.delete`, `ids.operations.get`, `ids.operations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud IDS Editor (`roles/ids.editor`)

- Launch stage: Beta
- Editor role for Cloud IDS
- Permissions (14): `ids.endpoints.create`, `ids.endpoints.delete`, `ids.endpoints.get`, `ids.endpoints.getIamPolicy`, `ids.endpoints.list`, `ids.endpoints.update`, `ids.locations.get`, `ids.locations.list`, `ids.operations.cancel`, `ids.operations.delete`, `ids.operations.get`, `ids.operations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud IDS Viewer (`roles/ids.viewer`)

- Launch stage: Beta
- Read-only access to Cloud IDS all resources.
- Permissions (9): `ids.endpoints.get`, `ids.endpoints.getIamPolicy`, `ids.endpoints.list`, `ids.locations.get`, `ids.locations.list`, `ids.operations.get`, `ids.operations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/ids.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `ids.endpoints.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/ids.admin`, `roles/ids.editor` |
| `ids.endpoints.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/ids.admin`, `roles/ids.editor` |
| `ids.endpoints.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/ids.admin`, `roles/ids.editor`, `roles/ids.viewer`, `roles/iam.supportUser` |
| `ids.endpoints.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/ids.admin`, `roles/ids.editor`, `roles/ids.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `ids.endpoints.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/ids.admin`, `roles/ids.editor`, `roles/ids.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` |
| `ids.endpoints.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/iam.securityAdmin`, `roles/ids.admin` |
| `ids.endpoints.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/ids.admin`, `roles/ids.editor` |
| `ids.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/ids.admin`, `roles/ids.editor`, `roles/ids.viewer`, `roles/iam.supportUser` |
| `ids.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/ids.admin`, `roles/ids.editor`, `roles/ids.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `ids.operations.cancel` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/ids.admin`, `roles/ids.editor` |
| `ids.operations.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/ids.admin`, `roles/ids.editor` |
| `ids.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/ids.admin`, `roles/ids.editor`, `roles/ids.viewer`, `roles/iam.supportUser` |
| `ids.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/ids.admin`, `roles/ids.editor`, `roles/ids.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |

## Notes

- Roles and permissions of the `ids` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/ids (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
