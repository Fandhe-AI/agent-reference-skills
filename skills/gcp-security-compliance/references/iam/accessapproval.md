---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/accessapproval
---

# Access Approval IAM roles and permissions

## Signature / Usage

Predefined roles of `accessapproval` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Access Approval Admin (`roles/accessapproval.admin`)

- Admin role for Access Approval
- Permissions (11): `accessapproval.requests.approve`, `accessapproval.requests.dismiss`, `accessapproval.requests.get`, `accessapproval.requests.invalidate`, `accessapproval.requests.list`, `accessapproval.serviceAccounts.get`, `accessapproval.settings.delete`, `accessapproval.settings.get`, `accessapproval.settings.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Access Approval Editor (`roles/accessapproval.editor`)

- Editor role for Access Approval
- Permissions (6): `accessapproval.requests.get`, `accessapproval.requests.list`, `accessapproval.serviceAccounts.get`, `accessapproval.settings.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Access Approval Viewer (`roles/accessapproval.viewer`)

- Ability to view access approval requests and configuration
- Permissions (6): `accessapproval.requests.get`, `accessapproval.requests.list`, `accessapproval.serviceAccounts.get`, `accessapproval.settings.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Access Approval Approver (`roles/accessapproval.approver`)

- Ability to view or act on access approval requests and view configuration.
- Permissions (9): `accessapproval.requests.approve`, `accessapproval.requests.dismiss`, `accessapproval.requests.get`, `accessapproval.requests.invalidate`, `accessapproval.requests.list`, `accessapproval.serviceAccounts.get`, `accessapproval.settings.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Access Approval Config Editor (`roles/accessapproval.configEditor`)

- Ability to update the Access Approval configuration
- Permissions (6): `accessapproval.serviceAccounts.get`, `accessapproval.settings.delete`, `accessapproval.settings.get`, `accessapproval.settings.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Access Approval Invalidator (`roles/accessapproval.invalidator`)

- Ability to invalidate existing approved approval requests
- Permissions (5): `accessapproval.requests.invalidate`, `accessapproval.serviceAccounts.get`, `accessapproval.settings.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/accessapproval.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `accessapproval.requests.approve` | `roles/admin`, `roles/owner`, `roles/accessapproval.admin`, `roles/accessapproval.approver` |
| `accessapproval.requests.dismiss` | `roles/admin`, `roles/owner`, `roles/accessapproval.admin`, `roles/accessapproval.approver` |
| `accessapproval.requests.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/accessapproval.admin`, `roles/accessapproval.editor`, `roles/accessapproval.viewer`, `roles/accessapproval.approver`, `roles/iam.supportUser` (+1 service agent role) |
| `accessapproval.requests.invalidate` | `roles/admin`, `roles/owner`, `roles/accessapproval.admin`, `roles/accessapproval.approver`, `roles/accessapproval.invalidator` |
| `accessapproval.requests.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/accessapproval.admin`, `roles/accessapproval.editor`, `roles/accessapproval.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/accessapproval.approver`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+1 service agent role) |
| `accessapproval.serviceAccounts.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/accessapproval.admin`, `roles/accessapproval.editor`, `roles/accessapproval.viewer`, `roles/accessapproval.approver`, `roles/accessapproval.configEditor`, `roles/accessapproval.invalidator`, `roles/iam.supportUser` |
| `accessapproval.settings.delete` | `roles/admin`, `roles/owner`, `roles/accessapproval.admin`, `roles/accessapproval.configEditor` |
| `accessapproval.settings.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/accessapproval.admin`, `roles/accessapproval.editor`, `roles/accessapproval.viewer`, `roles/accessapproval.approver`, `roles/accessapproval.configEditor`, `roles/accessapproval.invalidator`, `roles/iam.supportUser` (+2 service agent roles) |
| `accessapproval.settings.update` | `roles/admin`, `roles/owner`, `roles/accessapproval.admin`, `roles/accessapproval.configEditor` |

## Notes

- Roles and permissions of the `accessapproval` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/accessapproval (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
