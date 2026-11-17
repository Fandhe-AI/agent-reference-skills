---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/parallelstore
---

# Parallelstore IAM roles and permissions

## Signature / Usage

Predefined roles of `parallelstore` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Parallelstore Admin (`roles/parallelstore.admin`)

- Full access to Parallelstore resources.
- Permissions (15): `parallelstore.instances.create`, `parallelstore.instances.delete`, `parallelstore.instances.exportData`, `parallelstore.instances.get`, `parallelstore.instances.importData`, `parallelstore.instances.list`, `parallelstore.instances.update`, `parallelstore.locations.get`, `parallelstore.locations.list`, `parallelstore.operations.cancel`, `parallelstore.operations.delete`, `parallelstore.operations.get`, `parallelstore.operations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Parallelstore Viewer (`roles/parallelstore.viewer`)

- Readonly access to Parallelstore resources.
- Permissions (8): `parallelstore.instances.get`, `parallelstore.instances.list`, `parallelstore.locations.get`, `parallelstore.locations.list`, `parallelstore.operations.get`, `parallelstore.operations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Parallelstore Service Agent (`roles/parallelstore.serviceAgent`)

- Gives the Parallelstore service agent ability to access customer resources. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (2): `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/parallelstore.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `parallelstore.instances.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/parallelstore.admin` (+1 service agent role) |
| `parallelstore.instances.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/parallelstore.admin` (+1 service agent role) |
| `parallelstore.instances.exportData` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/parallelstore.admin` |
| `parallelstore.instances.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/parallelstore.admin`, `roles/parallelstore.viewer`, `roles/iam.supportUser` (+1 service agent role) |
| `parallelstore.instances.importData` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/parallelstore.admin` (+1 service agent role) |
| `parallelstore.instances.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/parallelstore.admin`, `roles/parallelstore.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+1 service agent role) |
| `parallelstore.instances.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/parallelstore.admin` (+1 service agent role) |
| `parallelstore.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/parallelstore.admin`, `roles/parallelstore.viewer`, `roles/iam.supportUser` (+1 service agent role) |
| `parallelstore.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/parallelstore.admin`, `roles/parallelstore.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+1 service agent role) |
| `parallelstore.operations.cancel` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/parallelstore.admin` (+1 service agent role) |
| `parallelstore.operations.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/parallelstore.admin` (+1 service agent role) |
| `parallelstore.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/parallelstore.admin`, `roles/parallelstore.viewer`, `roles/iam.supportUser` (+1 service agent role) |
| `parallelstore.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/parallelstore.admin`, `roles/parallelstore.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+1 service agent role) |

## Notes

- Roles and permissions of the `parallelstore` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/parallelstore (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
