---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/servicedirectory
---

# Service Directory IAM roles and permissions

## Signature / Usage

Predefined roles of `servicedirectory` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Service Directory Admin (`roles/servicedirectory.admin`)

- Full control of all Service Directory resources and permissions.
- Permissions (29): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `servicedirectory.endpoints.create`, `servicedirectory.endpoints.delete`, `servicedirectory.endpoints.get`, `servicedirectory.endpoints.getIamPolicy`, `servicedirectory.endpoints.list`, `servicedirectory.endpoints.setIamPolicy`, `servicedirectory.endpoints.update`, `servicedirectory.locations.get`, `servicedirectory.locations.list`, `servicedirectory.namespaces.associatePrivateZone`, `servicedirectory.namespaces.create`, `servicedirectory.namespaces.delete`, `servicedirectory.namespaces.get`, `servicedirectory.namespaces.getIamPolicy`, `servicedirectory.namespaces.list`, `servicedirectory.namespaces.setIamPolicy`, `servicedirectory.namespaces.update`, `servicedirectory.networks.attach`, `servicedirectory.services.bind`, `servicedirectory.services.create`, `servicedirectory.services.delete`, `servicedirectory.services.get`, `servicedirectory.services.getIamPolicy`, `servicedirectory.services.list`, `servicedirectory.services.resolve`, `servicedirectory.services.setIamPolicy`, `servicedirectory.services.update`

#### Service Directory Editor (`roles/servicedirectory.editor`)

- Edit Service Directory resources.
- Permissions (26): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `servicedirectory.endpoints.create`, `servicedirectory.endpoints.delete`, `servicedirectory.endpoints.get`, `servicedirectory.endpoints.getIamPolicy`, `servicedirectory.endpoints.list`, `servicedirectory.endpoints.update`, `servicedirectory.locations.get`, `servicedirectory.locations.list`, `servicedirectory.namespaces.associatePrivateZone`, `servicedirectory.namespaces.create`, `servicedirectory.namespaces.delete`, `servicedirectory.namespaces.get`, `servicedirectory.namespaces.getIamPolicy`, `servicedirectory.namespaces.list`, `servicedirectory.namespaces.update`, `servicedirectory.networks.attach`, `servicedirectory.services.bind`, `servicedirectory.services.create`, `servicedirectory.services.delete`, `servicedirectory.services.get`, `servicedirectory.services.getIamPolicy`, `servicedirectory.services.list`, `servicedirectory.services.resolve`, `servicedirectory.services.update`

#### Service Directory Viewer (`roles/servicedirectory.viewer`)

- View Service Directory resources.
- Permissions (14): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `servicedirectory.endpoints.get`, `servicedirectory.endpoints.getIamPolicy`, `servicedirectory.endpoints.list`, `servicedirectory.locations.get`, `servicedirectory.locations.list`, `servicedirectory.namespaces.get`, `servicedirectory.namespaces.getIamPolicy`, `servicedirectory.namespaces.list`, `servicedirectory.services.get`, `servicedirectory.services.getIamPolicy`, `servicedirectory.services.list`, `servicedirectory.services.resolve`

#### Service Directory Network Attacher (`roles/servicedirectory.networkAttacher`)

- Gives access to attach VPC Networks to Service Directory Endpoints
- Permissions (3): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `servicedirectory.networks.attach`

#### Private Service Connect Authorized Service (`roles/servicedirectory.pscAuthorizedService`)

- Gives access to VPC Networks via Service Directory
- Permissions (3): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `servicedirectory.networks.access`

#### Service Directory Service Agent (`roles/servicedirectory.serviceAgent`)

- Give the Service Directory service agent access to Cloud Platform resources. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (38): `container.clusters.get`, `gkehub.features.get`, `gkehub.gateway.delete`, `gkehub.gateway.generateCredentials`, `gkehub.gateway.get`, `gkehub.gateway.patch`, `gkehub.gateway.post`, `gkehub.gateway.put`, `gkehub.locations.get`, `gkehub.locations.list`, `gkehub.memberships.get`, `gkehub.memberships.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `servicedirectory.endpoints.create`, `servicedirectory.endpoints.delete`, `servicedirectory.endpoints.get`, `servicedirectory.endpoints.getIamPolicy`, `servicedirectory.endpoints.list`, `servicedirectory.endpoints.update`, `servicedirectory.locations.get`, `servicedirectory.locations.list`, `servicedirectory.namespaces.associatePrivateZone`, `servicedirectory.namespaces.create`, `servicedirectory.namespaces.delete`, `servicedirectory.namespaces.get`, `servicedirectory.namespaces.getIamPolicy`, `servicedirectory.namespaces.list`, `servicedirectory.namespaces.update`, `servicedirectory.networks.attach`, `servicedirectory.services.bind`, `servicedirectory.services.create`, `servicedirectory.services.delete`, `servicedirectory.services.get`, `servicedirectory.services.getIamPolicy`, `servicedirectory.services.list`, `servicedirectory.services.resolve`, `servicedirectory.services.update`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/servicedirectory.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `servicedirectory.endpoints.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/servicedirectory.admin`, `roles/servicedirectory.editor` (+1 service agent role) |
| `servicedirectory.endpoints.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/servicedirectory.admin`, `roles/servicedirectory.editor` (+1 service agent role) |
| `servicedirectory.endpoints.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/servicedirectory.admin`, `roles/servicedirectory.editor`, `roles/servicedirectory.viewer`, `roles/iam.supportUser` (+2 service agent roles) |
| `servicedirectory.endpoints.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/servicedirectory.admin`, `roles/servicedirectory.editor`, `roles/servicedirectory.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+2 service agent roles) |
| `servicedirectory.endpoints.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/servicedirectory.admin`, `roles/servicedirectory.editor`, `roles/servicedirectory.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` (+2 service agent roles) |
| `servicedirectory.endpoints.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/iam.securityAdmin`, `roles/servicedirectory.admin` |
| `servicedirectory.endpoints.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/servicedirectory.admin`, `roles/servicedirectory.editor` (+1 service agent role) |
| `servicedirectory.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/servicedirectory.admin`, `roles/servicedirectory.editor`, `roles/servicedirectory.viewer`, `roles/iam.supportUser` (+2 service agent roles) |
| `servicedirectory.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/servicedirectory.admin`, `roles/servicedirectory.editor`, `roles/servicedirectory.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` (+2 service agent roles) |
| `servicedirectory.namespaces.associatePrivateZone` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/servicedirectory.admin`, `roles/servicedirectory.editor` (+3 service agent roles) |
| `servicedirectory.namespaces.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/compute.networkAdmin`, `roles/servicedirectory.admin`, `roles/servicedirectory.editor`, `roles/compute.peerSubnetMigrationAdmin`, `roles/iam.infrastructureAdmin`, `roles/iam.networkAdmin`, `roles/workstations.networkAdmin` (+10 service agent roles) |
| `servicedirectory.namespaces.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/compute.networkAdmin`, `roles/servicedirectory.admin`, `roles/servicedirectory.editor`, `roles/iam.infrastructureAdmin`, `roles/iam.networkAdmin`, `roles/workstations.networkAdmin` (+9 service agent roles) |
| `servicedirectory.namespaces.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/servicedirectory.admin`, `roles/servicedirectory.editor`, `roles/servicedirectory.viewer`, `roles/iam.supportUser` (+2 service agent roles) |
| `servicedirectory.namespaces.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/servicedirectory.admin`, `roles/servicedirectory.editor`, `roles/servicedirectory.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` (+2 service agent roles) |
| `servicedirectory.namespaces.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/servicedirectory.admin`, `roles/servicedirectory.editor`, `roles/servicedirectory.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` (+2 service agent roles) |
| `servicedirectory.namespaces.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/iam.securityAdmin`, `roles/servicedirectory.admin` |
| `servicedirectory.namespaces.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/servicedirectory.admin`, `roles/servicedirectory.editor` (+1 service agent role) |
| `servicedirectory.networks.access` | `roles/servicedirectory.pscAuthorizedService` (+2 service agent roles) |
| `servicedirectory.networks.attach` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/servicedirectory.admin`, `roles/servicedirectory.editor`, `roles/servicedirectory.networkAttacher` (+1 service agent role) |
| `servicedirectory.services.bind` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/servicedirectory.admin`, `roles/servicedirectory.editor` (+1 service agent role) |
| `servicedirectory.services.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/compute.networkAdmin`, `roles/servicedirectory.admin`, `roles/servicedirectory.editor`, `roles/compute.peerSubnetMigrationAdmin`, `roles/iam.infrastructureAdmin`, `roles/iam.networkAdmin`, `roles/workstations.networkAdmin` (+10 service agent roles) |
| `servicedirectory.services.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/compute.networkAdmin`, `roles/servicedirectory.admin`, `roles/servicedirectory.editor`, `roles/compute.peerSubnetMigrationAdmin`, `roles/iam.infrastructureAdmin`, `roles/iam.networkAdmin`, `roles/workstations.networkAdmin` (+9 service agent roles) |
| `servicedirectory.services.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/servicedirectory.admin`, `roles/servicedirectory.editor`, `roles/servicedirectory.viewer`, `roles/iam.supportUser` (+2 service agent roles) |
| `servicedirectory.services.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/servicedirectory.admin`, `roles/servicedirectory.editor`, `roles/servicedirectory.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` (+2 service agent roles) |
| `servicedirectory.services.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/servicedirectory.admin`, `roles/servicedirectory.editor`, `roles/servicedirectory.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` (+2 service agent roles) |
| `servicedirectory.services.resolve` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/servicedirectory.admin`, `roles/servicedirectory.editor`, `roles/servicedirectory.viewer`, `roles/iam.supportUser` (+3 service agent roles) |
| `servicedirectory.services.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/iam.securityAdmin`, `roles/servicedirectory.admin` |
| `servicedirectory.services.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/servicedirectory.admin`, `roles/servicedirectory.editor` (+1 service agent role) |

## Notes

- Roles and permissions of the `servicedirectory` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/servicedirectory (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
