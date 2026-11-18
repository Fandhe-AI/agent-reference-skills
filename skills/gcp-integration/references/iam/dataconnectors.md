---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/dataconnectors
---

# Data Connectors IAM roles and permissions

## Signature / Usage

Predefined roles of `dataconnectors` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Data Connectors Admin (`roles/dataconnectors.admin`)

- Launch stage: Beta
- Admin role for Data Connectors
- Permissions (16): `dataconnectors.connectors.create`, `dataconnectors.connectors.delete`, `dataconnectors.connectors.get`, `dataconnectors.connectors.getIamPolicy`, `dataconnectors.connectors.list`, `dataconnectors.connectors.setIamPolicy`, `dataconnectors.connectors.update`, `dataconnectors.connectors.use`, `dataconnectors.locations.get`, `dataconnectors.locations.list`, `dataconnectors.operations.cancel`, `dataconnectors.operations.delete`, `dataconnectors.operations.get`, `dataconnectors.operations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Data Connectors Editor (`roles/dataconnectors.editor`)

- Launch stage: Beta
- Editor role for Data Connectors
- Permissions (15): `dataconnectors.connectors.create`, `dataconnectors.connectors.delete`, `dataconnectors.connectors.get`, `dataconnectors.connectors.getIamPolicy`, `dataconnectors.connectors.list`, `dataconnectors.connectors.update`, `dataconnectors.connectors.use`, `dataconnectors.locations.get`, `dataconnectors.locations.list`, `dataconnectors.operations.cancel`, `dataconnectors.operations.delete`, `dataconnectors.operations.get`, `dataconnectors.operations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Data Connectors Viewer (`roles/dataconnectors.viewer`)

- Launch stage: Beta
- Viewer role for Data Connectors
- Permissions (9): `dataconnectors.connectors.get`, `dataconnectors.connectors.getIamPolicy`, `dataconnectors.connectors.list`, `dataconnectors.locations.get`, `dataconnectors.locations.list`, `dataconnectors.operations.get`, `dataconnectors.operations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Connector Admin (`roles/dataconnectors.connectorAdmin`)

- Launch stage: Beta
- Full access to Data Connectors.
- Permissions (16): `dataconnectors.connectors.create`, `dataconnectors.connectors.delete`, `dataconnectors.connectors.get`, `dataconnectors.connectors.getIamPolicy`, `dataconnectors.connectors.list`, `dataconnectors.connectors.setIamPolicy`, `dataconnectors.connectors.update`, `dataconnectors.connectors.use`, `dataconnectors.locations.get`, `dataconnectors.locations.list`, `dataconnectors.operations.cancel`, `dataconnectors.operations.delete`, `dataconnectors.operations.get`, `dataconnectors.operations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Data Connector User (`roles/dataconnectors.connectorUser`)

- Launch stage: Beta
- Access to use Data Connectors.
- Permissions (4): `dataconnectors.connectors.get`, `dataconnectors.connectors.getIamPolicy`, `dataconnectors.connectors.list`, `dataconnectors.connectors.use`

#### Data Connectors Service Agent (`roles/dataconnectors.serviceAgent`)

- Gives Data Connectors service agent permission to access the virtual private cloud > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (3): `compute.globalOperations.get`, `compute.networks.access`, `vpcaccess.connectors.get`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/dataconnectors.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `dataconnectors.connectors.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/dataconnectors.admin`, `roles/dataconnectors.editor`, `roles/dataconnectors.connectorAdmin` |
| `dataconnectors.connectors.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/dataconnectors.admin`, `roles/dataconnectors.editor`, `roles/dataconnectors.connectorAdmin` |
| `dataconnectors.connectors.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/dataconnectors.admin`, `roles/dataconnectors.editor`, `roles/dataconnectors.viewer`, `roles/dataconnectors.connectorAdmin`, `roles/dataconnectors.connectorUser`, `roles/iam.supportUser` |
| `dataconnectors.connectors.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/dataconnectors.admin`, `roles/dataconnectors.editor`, `roles/dataconnectors.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/dataconnectors.connectorAdmin`, `roles/dataconnectors.connectorUser`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `dataconnectors.connectors.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/dataconnectors.admin`, `roles/dataconnectors.editor`, `roles/dataconnectors.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/dataconnectors.connectorAdmin`, `roles/dataconnectors.connectorUser`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `dataconnectors.connectors.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/dataconnectors.admin`, `roles/iam.securityAdmin`, `roles/dataconnectors.connectorAdmin` |
| `dataconnectors.connectors.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/dataconnectors.admin`, `roles/dataconnectors.editor`, `roles/dataconnectors.connectorAdmin` |
| `dataconnectors.connectors.use` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/dataconnectors.admin`, `roles/dataconnectors.editor`, `roles/dataconnectors.connectorAdmin`, `roles/dataconnectors.connectorUser` |
| `dataconnectors.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/dataconnectors.admin`, `roles/dataconnectors.editor`, `roles/dataconnectors.viewer`, `roles/dataconnectors.connectorAdmin`, `roles/iam.supportUser` |
| `dataconnectors.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/dataconnectors.admin`, `roles/dataconnectors.editor`, `roles/dataconnectors.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/dataconnectors.connectorAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `dataconnectors.operations.cancel` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/dataconnectors.admin`, `roles/dataconnectors.editor`, `roles/dataconnectors.connectorAdmin` |
| `dataconnectors.operations.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/dataconnectors.admin`, `roles/dataconnectors.editor`, `roles/dataconnectors.connectorAdmin` |
| `dataconnectors.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/dataconnectors.admin`, `roles/dataconnectors.editor`, `roles/dataconnectors.viewer`, `roles/dataconnectors.connectorAdmin`, `roles/iam.supportUser` |
| `dataconnectors.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/dataconnectors.admin`, `roles/dataconnectors.editor`, `roles/dataconnectors.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/dataconnectors.connectorAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |

## Notes

- Roles and permissions of the `dataconnectors` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/dataconnectors (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
