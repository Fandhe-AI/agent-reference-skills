---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/workflows
---

# Workflows IAM roles and permissions

## Signature / Usage

Predefined roles of `workflows` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Workflows Admin (`roles/workflows.admin`)

- Full access to workflows and related resources. Lowest-level resources where you can grant this role: - Project
- Permissions (30): `cloudkms.keyHandles.create`, `cloudkms.keyHandles.get`, `cloudkms.keyHandles.list`, `cloudkms.operations.get`, `cloudkms.projects.showEffectiveAutokeyConfig`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `workflows.callbacks.list`, `workflows.callbacks.send`, `workflows.executions.cancel`, `workflows.executions.create`, `workflows.executions.get`, `workflows.executions.list`, `workflows.locations.get`, `workflows.locations.list`, `workflows.operations.cancel`, `workflows.operations.get`, `workflows.operations.list`, `workflows.stepEntries.get`, `workflows.stepEntries.list`, `workflows.workflows.create`, `workflows.workflows.createTagBinding`, `workflows.workflows.delete`, `workflows.workflows.deleteTagBinding`, `workflows.workflows.get`, `workflows.workflows.list`, `workflows.workflows.listEffectiveTags`, `workflows.workflows.listRevision`, `workflows.workflows.listTagBindings`, `workflows.workflows.update`

#### Workflows Editor (`roles/workflows.editor`)

- Read and write access to workflows and related resources, including development and debugging of workflows. Lowest-level resources where you can grant this role: - Project
- Permissions (30): `cloudkms.keyHandles.create`, `cloudkms.keyHandles.get`, `cloudkms.keyHandles.list`, `cloudkms.operations.get`, `cloudkms.projects.showEffectiveAutokeyConfig`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `workflows.callbacks.list`, `workflows.callbacks.send`, `workflows.executions.cancel`, `workflows.executions.create`, `workflows.executions.get`, `workflows.executions.list`, `workflows.locations.get`, `workflows.locations.list`, `workflows.operations.cancel`, `workflows.operations.get`, `workflows.operations.list`, `workflows.stepEntries.get`, `workflows.stepEntries.list`, `workflows.workflows.create`, `workflows.workflows.createTagBinding`, `workflows.workflows.delete`, `workflows.workflows.deleteTagBinding`, `workflows.workflows.get`, `workflows.workflows.list`, `workflows.workflows.listEffectiveTags`, `workflows.workflows.listRevision`, `workflows.workflows.listTagBindings`, `workflows.workflows.update`

#### Workflows Viewer (`roles/workflows.viewer`)

- Read-only access to workflows and related resources. Lowest-level resources where you can grant this role: - Project
- Permissions (16): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `workflows.callbacks.list`, `workflows.executions.get`, `workflows.executions.list`, `workflows.locations.get`, `workflows.locations.list`, `workflows.operations.get`, `workflows.operations.list`, `workflows.stepEntries.get`, `workflows.stepEntries.list`, `workflows.workflows.get`, `workflows.workflows.list`, `workflows.workflows.listEffectiveTags`, `workflows.workflows.listRevision`, `workflows.workflows.listTagBindings`

#### Workflows Invoker (`roles/workflows.invoker`)

- Access to execute workflows and manage the executions using the API. Does not provide access to develop and debug workflows. Lowest-level resources where you can grant this role: - Project
- Permissions (10): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `workflows.callbacks.list`, `workflows.callbacks.send`, `workflows.executions.cancel`, `workflows.executions.create`, `workflows.executions.get`, `workflows.executions.list`, `workflows.stepEntries.get`, `workflows.stepEntries.list`

#### Cloud Workflows Service Agent (`roles/workflows.serviceAgent`)

- Gives Cloud Workflows service account access to managed resources. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (5): `container.clusters.connect`, `iam.serviceAccounts.get`, `iam.serviceAccounts.getAccessToken`, `iam.serviceAccounts.getOpenIdToken`, `serviceusage.services.use`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Project):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/workflows.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `workflows.callbacks.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/workflows.admin`, `roles/workflows.editor`, `roles/workflows.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/workflows.invoker` |
| `workflows.callbacks.send` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/workflows.admin`, `roles/workflows.editor`, `roles/workflows.invoker` |
| `workflows.executions.cancel` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/workflows.admin`, `roles/workflows.editor`, `roles/workflows.invoker` |
| `workflows.executions.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/workflows.admin`, `roles/workflows.editor`, `roles/workflows.invoker` |
| `workflows.executions.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/workflows.admin`, `roles/workflows.editor`, `roles/workflows.viewer`, `roles/iam.supportUser`, `roles/workflows.invoker` |
| `workflows.executions.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/workflows.admin`, `roles/workflows.editor`, `roles/workflows.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/workflows.invoker` |
| `workflows.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/workflows.admin`, `roles/workflows.editor`, `roles/workflows.viewer`, `roles/iam.supportUser` |
| `workflows.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/workflows.admin`, `roles/workflows.editor`, `roles/workflows.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` |
| `workflows.operations.cancel` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/workflows.admin`, `roles/workflows.editor` |
| `workflows.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/workflows.admin`, `roles/workflows.editor`, `roles/workflows.viewer`, `roles/iam.supportUser` (+1 service agent role) |
| `workflows.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/workflows.admin`, `roles/workflows.editor`, `roles/workflows.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `workflows.stepEntries.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/workflows.admin`, `roles/workflows.editor`, `roles/workflows.viewer`, `roles/iam.supportUser`, `roles/workflows.invoker` |
| `workflows.stepEntries.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/workflows.admin`, `roles/workflows.editor`, `roles/workflows.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/workflows.invoker` |
| `workflows.workflows.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/workflows.admin`, `roles/workflows.editor` (+1 service agent role) |
| `workflows.workflows.createTagBinding` | `roles/admin`, `roles/owner`, `roles/resourcemanager.tagUser`, `roles/workflows.admin`, `roles/workflows.editor`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver` |
| `workflows.workflows.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/workflows.admin`, `roles/workflows.editor` (+1 service agent role) |
| `workflows.workflows.deleteTagBinding` | `roles/admin`, `roles/owner`, `roles/resourcemanager.tagUser`, `roles/workflows.admin`, `roles/workflows.editor`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver` |
| `workflows.workflows.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/workflows.admin`, `roles/workflows.editor`, `roles/workflows.viewer`, `roles/iam.supportUser` (+2 service agent roles) |
| `workflows.workflows.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/workflows.admin`, `roles/workflows.editor`, `roles/workflows.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` |
| `workflows.workflows.listEffectiveTags` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/workflows.admin`, `roles/workflows.editor`, `roles/workflows.viewer`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `workflows.workflows.listRevision` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/workflows.admin`, `roles/workflows.editor`, `roles/workflows.viewer`, `roles/iam.supportUser` |
| `workflows.workflows.listTagBindings` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/workflows.admin`, `roles/workflows.editor`, `roles/workflows.viewer`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `workflows.workflows.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/workflows.admin`, `roles/workflows.editor` |

## Notes

- Roles and permissions of the `workflows` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/workflows (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
