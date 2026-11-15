---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/lustre
---

# Google Cloud Managed Lustre IAM roles and permissions

## Signature / Usage

Predefined roles of `lustre` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Google Cloud Managed Lustre Admin (`roles/lustre.admin`)

- Full access to Google Cloud Managed Lustre resources.
- Permissions (16): `lustre.instances.create`, `lustre.instances.delete`, `lustre.instances.exportData`, `lustre.instances.get`, `lustre.instances.importData`, `lustre.instances.list`, `lustre.instances.rescheduleMaintenance`, `lustre.instances.update`, `lustre.locations.get`, `lustre.locations.list`, `lustre.operations.cancel`, `lustre.operations.delete`, `lustre.operations.get`, `lustre.operations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Google Cloud Managed Lustre Viewer (`roles/lustre.viewer`)

- Readonly access to Google Cloud Managed Lustre resources.
- Permissions (8): `lustre.instances.get`, `lustre.instances.list`, `lustre.locations.get`, `lustre.locations.list`, `lustre.operations.get`, `lustre.operations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Project):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/lustre.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `lustre.instances.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/lustre.admin` (+2 service agent roles) |
| `lustre.instances.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/lustre.admin` (+2 service agent roles) |
| `lustre.instances.exportData` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/lustre.admin` |
| `lustre.instances.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/lustre.admin`, `roles/lustre.viewer`, `roles/iam.supportUser` (+2 service agent roles) |
| `lustre.instances.importData` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/lustre.admin` (+1 service agent role) |
| `lustre.instances.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/lustre.admin`, `roles/lustre.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` (+2 service agent roles) |
| `lustre.instances.rescheduleMaintenance` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/lustre.admin` |
| `lustre.instances.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/lustre.admin` (+2 service agent roles) |
| `lustre.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/lustre.admin`, `roles/lustre.viewer`, `roles/iam.supportUser` (+2 service agent roles) |
| `lustre.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/lustre.admin`, `roles/lustre.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` (+2 service agent roles) |
| `lustre.operations.cancel` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/lustre.admin` (+1 service agent role) |
| `lustre.operations.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/lustre.admin` (+1 service agent role) |
| `lustre.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/lustre.admin`, `roles/lustre.viewer`, `roles/iam.supportUser` (+2 service agent roles) |
| `lustre.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/lustre.admin`, `roles/lustre.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+2 service agent roles) |

## Notes

- Roles and permissions of the `lustre` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/lustre (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
