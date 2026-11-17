---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/edgenetwork
---

# Distributed Cloud Edge Network IAM roles and permissions

## Signature / Usage

Predefined roles of `edgenetwork` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Edge Network Admin (`roles/edgenetwork.admin`)

- Full access to Edge Network all resources.
- Permissions (52): `edgenetwork.interconnectAttachments.create`, `edgenetwork.interconnectAttachments.delete`, `edgenetwork.interconnectAttachments.get`, `edgenetwork.interconnectAttachments.getIamPolicy`, `edgenetwork.interconnectAttachments.list`, `edgenetwork.interconnectAttachments.setIamPolicy`, `edgenetwork.interconnectAttachments.update`, `edgenetwork.interconnects.get`, `edgenetwork.interconnects.getDiagnostics`, `edgenetwork.interconnects.getIamPolicy`, `edgenetwork.interconnects.list`, `edgenetwork.interconnects.setIamPolicy`, `edgenetwork.locations.get`, `edgenetwork.locations.list`, `edgenetwork.networks.create`, `edgenetwork.networks.delete`, `edgenetwork.networks.get`, `edgenetwork.networks.getIamPolicy`, `edgenetwork.networks.getStatus`, `edgenetwork.networks.list`, `edgenetwork.networks.setIamPolicy`, `edgenetwork.networks.update`, `edgenetwork.operations.cancel`, `edgenetwork.operations.delete`, `edgenetwork.operations.get`, `edgenetwork.operations.list`, `edgenetwork.routers.create`, `edgenetwork.routers.delete`, `edgenetwork.routers.get`, `edgenetwork.routers.getIamPolicy`, `edgenetwork.routers.getRouterStatus`, `edgenetwork.routers.list`, `edgenetwork.routers.patch`, `edgenetwork.routers.setIamPolicy`, `edgenetwork.routers.update`, `edgenetwork.routes.create`, `edgenetwork.routes.delete`, `edgenetwork.routes.get`, `edgenetwork.routes.list`, `edgenetwork.subnetworks.create`, `edgenetwork.subnetworks.delete`, `edgenetwork.subnetworks.get`, `edgenetwork.subnetworks.getIamPolicy`, `edgenetwork.subnetworks.getStatus`, `edgenetwork.subnetworks.list`, `edgenetwork.subnetworks.setIamPolicy`, `edgenetwork.subnetworks.update`, `edgenetwork.zones.get`, `edgenetwork.zones.initialize`, `edgenetwork.zones.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Edge Network Editor (`roles/edgenetwork.editor`)

- Editor role for Edge Network
- Permissions (47): `edgenetwork.interconnectAttachments.create`, `edgenetwork.interconnectAttachments.delete`, `edgenetwork.interconnectAttachments.get`, `edgenetwork.interconnectAttachments.getIamPolicy`, `edgenetwork.interconnectAttachments.list`, `edgenetwork.interconnectAttachments.update`, `edgenetwork.interconnects.get`, `edgenetwork.interconnects.getDiagnostics`, `edgenetwork.interconnects.getIamPolicy`, `edgenetwork.interconnects.list`, `edgenetwork.locations.get`, `edgenetwork.locations.list`, `edgenetwork.networks.create`, `edgenetwork.networks.delete`, `edgenetwork.networks.get`, `edgenetwork.networks.getIamPolicy`, `edgenetwork.networks.getStatus`, `edgenetwork.networks.list`, `edgenetwork.networks.update`, `edgenetwork.operations.cancel`, `edgenetwork.operations.delete`, `edgenetwork.operations.get`, `edgenetwork.operations.list`, `edgenetwork.routers.create`, `edgenetwork.routers.delete`, `edgenetwork.routers.get`, `edgenetwork.routers.getIamPolicy`, `edgenetwork.routers.getRouterStatus`, `edgenetwork.routers.list`, `edgenetwork.routers.patch`, `edgenetwork.routers.update`, `edgenetwork.routes.create`, `edgenetwork.routes.delete`, `edgenetwork.routes.get`, `edgenetwork.routes.list`, `edgenetwork.subnetworks.create`, `edgenetwork.subnetworks.delete`, `edgenetwork.subnetworks.get`, `edgenetwork.subnetworks.getIamPolicy`, `edgenetwork.subnetworks.getStatus`, `edgenetwork.subnetworks.list`, `edgenetwork.subnetworks.update`, `edgenetwork.zones.get`, `edgenetwork.zones.initialize`, `edgenetwork.zones.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Edge Network Viewer (`roles/edgenetwork.viewer`)

- Read-only access to Edge Network all resources.
- Permissions (29): `edgenetwork.interconnectAttachments.get`, `edgenetwork.interconnectAttachments.getIamPolicy`, `edgenetwork.interconnectAttachments.list`, `edgenetwork.interconnects.get`, `edgenetwork.interconnects.getDiagnostics`, `edgenetwork.interconnects.getIamPolicy`, `edgenetwork.interconnects.list`, `edgenetwork.locations.get`, `edgenetwork.locations.list`, `edgenetwork.networks.get`, `edgenetwork.networks.getIamPolicy`, `edgenetwork.networks.getStatus`, `edgenetwork.networks.list`, `edgenetwork.operations.get`, `edgenetwork.operations.list`, `edgenetwork.routers.get`, `edgenetwork.routers.getIamPolicy`, `edgenetwork.routers.getRouterStatus`, `edgenetwork.routers.list`, `edgenetwork.routes.get`, `edgenetwork.routes.list`, `edgenetwork.subnetworks.get`, `edgenetwork.subnetworks.getIamPolicy`, `edgenetwork.subnetworks.getStatus`, `edgenetwork.subnetworks.list`, `edgenetwork.zones.get`, `edgenetwork.zones.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/edgenetwork.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `edgenetwork.interconnectAttachments.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/edgenetwork.admin`, `roles/edgenetwork.editor` |
| `edgenetwork.interconnectAttachments.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/edgenetwork.admin`, `roles/edgenetwork.editor` |
| `edgenetwork.interconnectAttachments.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgenetwork.admin`, `roles/edgenetwork.editor`, `roles/edgenetwork.viewer`, `roles/iam.supportUser` |
| `edgenetwork.interconnectAttachments.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgenetwork.admin`, `roles/edgenetwork.editor`, `roles/edgenetwork.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `edgenetwork.interconnectAttachments.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgenetwork.admin`, `roles/edgenetwork.editor`, `roles/edgenetwork.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `edgenetwork.interconnectAttachments.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/edgenetwork.admin`, `roles/iam.securityAdmin` |
| `edgenetwork.interconnectAttachments.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/edgenetwork.admin`, `roles/edgenetwork.editor` |
| `edgenetwork.interconnects.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgenetwork.admin`, `roles/edgenetwork.editor`, `roles/edgenetwork.viewer`, `roles/iam.supportUser` |
| `edgenetwork.interconnects.getDiagnostics` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgenetwork.admin`, `roles/edgenetwork.editor`, `roles/edgenetwork.viewer`, `roles/iam.supportUser` |
| `edgenetwork.interconnects.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgenetwork.admin`, `roles/edgenetwork.editor`, `roles/edgenetwork.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `edgenetwork.interconnects.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgenetwork.admin`, `roles/edgenetwork.editor`, `roles/edgenetwork.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `edgenetwork.interconnects.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/edgenetwork.admin`, `roles/iam.securityAdmin` |
| `edgenetwork.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgenetwork.admin`, `roles/edgenetwork.editor`, `roles/edgenetwork.viewer`, `roles/iam.supportUser` |
| `edgenetwork.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgenetwork.admin`, `roles/edgenetwork.editor`, `roles/edgenetwork.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `edgenetwork.networks.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/edgenetwork.admin`, `roles/edgenetwork.editor` |
| `edgenetwork.networks.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/edgenetwork.admin`, `roles/edgenetwork.editor` |
| `edgenetwork.networks.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgenetwork.admin`, `roles/edgenetwork.editor`, `roles/edgenetwork.viewer`, `roles/iam.supportUser` |
| `edgenetwork.networks.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgenetwork.admin`, `roles/edgenetwork.editor`, `roles/edgenetwork.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `edgenetwork.networks.getStatus` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgenetwork.admin`, `roles/edgenetwork.editor`, `roles/edgenetwork.viewer`, `roles/iam.supportUser` |
| `edgenetwork.networks.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgenetwork.admin`, `roles/edgenetwork.editor`, `roles/edgenetwork.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `edgenetwork.networks.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/edgenetwork.admin`, `roles/iam.securityAdmin` |
| `edgenetwork.networks.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/edgenetwork.admin`, `roles/edgenetwork.editor` |
| `edgenetwork.operations.cancel` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/edgenetwork.admin`, `roles/edgenetwork.editor` |
| `edgenetwork.operations.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/edgenetwork.admin`, `roles/edgenetwork.editor` |
| `edgenetwork.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgenetwork.admin`, `roles/edgenetwork.editor`, `roles/edgenetwork.viewer`, `roles/iam.supportUser` |
| `edgenetwork.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgenetwork.admin`, `roles/edgenetwork.editor`, `roles/edgenetwork.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `edgenetwork.routers.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/edgenetwork.admin`, `roles/edgenetwork.editor` |
| `edgenetwork.routers.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/edgenetwork.admin`, `roles/edgenetwork.editor` |
| `edgenetwork.routers.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgenetwork.admin`, `roles/edgenetwork.editor`, `roles/edgenetwork.viewer`, `roles/iam.supportUser` |
| `edgenetwork.routers.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgenetwork.admin`, `roles/edgenetwork.editor`, `roles/edgenetwork.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `edgenetwork.routers.getRouterStatus` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgenetwork.admin`, `roles/edgenetwork.editor`, `roles/edgenetwork.viewer`, `roles/iam.supportUser` |
| `edgenetwork.routers.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgenetwork.admin`, `roles/edgenetwork.editor`, `roles/edgenetwork.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `edgenetwork.routers.patch` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/edgenetwork.admin`, `roles/edgenetwork.editor` |
| `edgenetwork.routers.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/edgenetwork.admin`, `roles/iam.securityAdmin` |
| `edgenetwork.routers.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/edgenetwork.admin`, `roles/edgenetwork.editor` |
| `edgenetwork.routes.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/edgenetwork.admin`, `roles/edgenetwork.editor` |
| `edgenetwork.routes.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/edgenetwork.admin`, `roles/edgenetwork.editor` |
| `edgenetwork.routes.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgenetwork.admin`, `roles/edgenetwork.editor`, `roles/edgenetwork.viewer`, `roles/iam.supportUser` |
| `edgenetwork.routes.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgenetwork.admin`, `roles/edgenetwork.editor`, `roles/edgenetwork.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `edgenetwork.subnetworks.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/edgenetwork.admin`, `roles/edgenetwork.editor` |
| `edgenetwork.subnetworks.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/edgenetwork.admin`, `roles/edgenetwork.editor` |
| `edgenetwork.subnetworks.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgenetwork.admin`, `roles/edgenetwork.editor`, `roles/edgenetwork.viewer`, `roles/iam.supportUser` |
| `edgenetwork.subnetworks.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgenetwork.admin`, `roles/edgenetwork.editor`, `roles/edgenetwork.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `edgenetwork.subnetworks.getStatus` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgenetwork.admin`, `roles/edgenetwork.editor`, `roles/edgenetwork.viewer`, `roles/iam.supportUser` |
| `edgenetwork.subnetworks.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgenetwork.admin`, `roles/edgenetwork.editor`, `roles/edgenetwork.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `edgenetwork.subnetworks.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/edgenetwork.admin`, `roles/iam.securityAdmin` |
| `edgenetwork.subnetworks.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/edgenetwork.admin`, `roles/edgenetwork.editor` |
| `edgenetwork.zones.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgenetwork.admin`, `roles/edgenetwork.editor`, `roles/edgenetwork.viewer`, `roles/iam.supportUser` |
| `edgenetwork.zones.initialize` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/edgenetwork.admin`, `roles/edgenetwork.editor` |
| `edgenetwork.zones.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgenetwork.admin`, `roles/edgenetwork.editor`, `roles/edgenetwork.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |

## Notes

- Roles and permissions of the `edgenetwork` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/edgenetwork (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
