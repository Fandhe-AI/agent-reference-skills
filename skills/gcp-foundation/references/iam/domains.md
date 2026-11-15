---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/domains
---

# Cloud Domains IAM roles and permissions

## Signature / Usage

Predefined roles of `domains` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

### Cloud Domains Admin (`roles/domains.admin`)

- Full access to Cloud Domains Registrations and related resources.
- Permissions (21): `domains.locations.get`, `domains.locations.list`, `domains.operations.cancel`, `domains.operations.get`, `domains.operations.list`, `domains.registrations.configureContact`, `domains.registrations.configureDns`, `domains.registrations.configureManagement`, `domains.registrations.create`, `domains.registrations.createTagBinding`, `domains.registrations.delete`, `domains.registrations.deleteTagBinding`, `domains.registrations.get`, `domains.registrations.getIamPolicy`, `domains.registrations.list`, `domains.registrations.listEffectiveTags`, `domains.registrations.listTagBindings`, `domains.registrations.setIamPolicy`, `domains.registrations.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Cloud Domains Editor (`roles/domains.editor`)

- Editor role for Cloud Domains
- Permissions (18): `domains.locations.get`, `domains.locations.list`, `domains.operations.cancel`, `domains.operations.get`, `domains.operations.list`, `domains.registrations.configureContact`, `domains.registrations.configureDns`, `domains.registrations.configureManagement`, `domains.registrations.create`, `domains.registrations.delete`, `domains.registrations.get`, `domains.registrations.getIamPolicy`, `domains.registrations.list`, `domains.registrations.listEffectiveTags`, `domains.registrations.listTagBindings`, `domains.registrations.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Cloud Domains Viewer (`roles/domains.viewer`)

- Read-only access to Cloud Domains Registrations and related resources.
- Permissions (11): `domains.locations.get`, `domains.locations.list`, `domains.operations.get`, `domains.operations.list`, `domains.registrations.get`, `domains.registrations.getIamPolicy`, `domains.registrations.list`, `domains.registrations.listEffectiveTags`, `domains.registrations.listTagBindings`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Project):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/domains.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `domains.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/domains.admin`, `roles/domains.editor`, `roles/domains.viewer`, `roles/iam.supportUser` |
| `domains.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/domains.admin`, `roles/domains.editor`, `roles/domains.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `domains.operations.cancel` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/domains.admin`, `roles/domains.editor` |
| `domains.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/domains.admin`, `roles/domains.editor`, `roles/domains.viewer`, `roles/iam.supportUser` |
| `domains.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/domains.admin`, `roles/domains.editor`, `roles/domains.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `domains.registrations.configureContact` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/domains.admin`, `roles/domains.editor` |
| `domains.registrations.configureDns` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/domains.admin`, `roles/domains.editor` |
| `domains.registrations.configureManagement` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/domains.admin`, `roles/domains.editor` |
| `domains.registrations.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/domains.admin`, `roles/domains.editor` |
| `domains.registrations.createTagBinding` | `roles/admin`, `roles/owner`, `roles/domains.admin`, `roles/resourcemanager.tagUser`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver` |
| `domains.registrations.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/domains.admin`, `roles/domains.editor` |
| `domains.registrations.deleteTagBinding` | `roles/admin`, `roles/owner`, `roles/domains.admin`, `roles/resourcemanager.tagUser`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver` |
| `domains.registrations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/domains.admin`, `roles/domains.editor`, `roles/domains.viewer`, `roles/iam.supportUser` |
| `domains.registrations.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/domains.admin`, `roles/domains.editor`, `roles/domains.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `domains.registrations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/domains.admin`, `roles/domains.editor`, `roles/domains.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `domains.registrations.listEffectiveTags` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/domains.admin`, `roles/domains.editor`, `roles/domains.viewer`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `domains.registrations.listTagBindings` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/domains.admin`, `roles/domains.editor`, `roles/domains.viewer`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `domains.registrations.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/domains.admin`, `roles/iam.securityAdmin` |
| `domains.registrations.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/domains.admin`, `roles/domains.editor` |

## Notes

- Roles and permissions of the `domains` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/domains (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
