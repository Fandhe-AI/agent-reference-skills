---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/parametermanager
---

# Parameter Manager IAM roles and permissions

## Signature / Usage

Predefined roles of `parametermanager` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Parameter Manager Admin (`roles/parametermanager.admin`)

- Grants full access to all Parameter Manager resources. Intended for project admins \& owners who need to perform all administrative tasks.
- Permissions (30): `parametermanager.locations.get`, `parametermanager.locations.list`, `parametermanager.parameterVersions.create`, `parametermanager.parameterVersions.delete`, `parametermanager.parameterVersions.get`, `parametermanager.parameterVersions.list`, `parametermanager.parameterVersions.render`, `parametermanager.parameterVersions.update`, `parametermanager.parameters.create`, `parametermanager.parameters.createTagBinding`, `parametermanager.parameters.delete`, `parametermanager.parameters.deleteTagBinding`, `parametermanager.parameters.get`, `parametermanager.parameters.list`, `parametermanager.parameters.listEffectiveTags`, `parametermanager.parameters.listTagBindings`, `parametermanager.parameters.update`, `parametermanager.templateVersions.create`, `parametermanager.templateVersions.delete`, `parametermanager.templateVersions.get`, `parametermanager.templateVersions.list`, `parametermanager.templateVersions.render`, `parametermanager.templateVersions.update`, `parametermanager.templates.create`, `parametermanager.templates.delete`, `parametermanager.templates.get`, `parametermanager.templates.list`, `parametermanager.templates.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Parameter Manager Editor (`roles/parametermanager.editor`)

- Editor role for Parameter Manager
- Permissions (26): `parametermanager.locations.get`, `parametermanager.locations.list`, `parametermanager.parameterVersions.create`, `parametermanager.parameterVersions.delete`, `parametermanager.parameterVersions.get`, `parametermanager.parameterVersions.list`, `parametermanager.parameterVersions.update`, `parametermanager.parameters.create`, `parametermanager.parameters.delete`, `parametermanager.parameters.get`, `parametermanager.parameters.list`, `parametermanager.parameters.listEffectiveTags`, `parametermanager.parameters.listTagBindings`, `parametermanager.parameters.update`, `parametermanager.templateVersions.create`, `parametermanager.templateVersions.delete`, `parametermanager.templateVersions.get`, `parametermanager.templateVersions.list`, `parametermanager.templateVersions.update`, `parametermanager.templates.create`, `parametermanager.templates.delete`, `parametermanager.templates.get`, `parametermanager.templates.list`, `parametermanager.templates.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Parameter Manager Viewer (`roles/parametermanager.viewer`)

- Viewer role for Parameter Manager
- Permissions (14): `parametermanager.locations.get`, `parametermanager.locations.list`, `parametermanager.parameterVersions.get`, `parametermanager.parameterVersions.list`, `parametermanager.parameters.get`, `parametermanager.parameters.list`, `parametermanager.parameters.listEffectiveTags`, `parametermanager.parameters.listTagBindings`, `parametermanager.templateVersions.get`, `parametermanager.templateVersions.list`, `parametermanager.templates.get`, `parametermanager.templates.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Parameter Manager Parameter Accessor (`roles/parametermanager.parameterAccessor`)

- Grants read access to ParameterManager ParameterVersion resources. Intended for users \& applications that need to perform read operations on ParameterVersions only.
- Permissions (5): `parametermanager.locations.get`, `parametermanager.locations.list`, `parametermanager.parameterVersions.render`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Parameter Manager Parameter Version Adder (`roles/parametermanager.parameterVersionAdder`)

- Grants create access to Parameter Manager ParameterVersion resources. Intended for users \& applications that need to perform create operations on ParameterVersions only.
- Permissions (7): `parametermanager.locations.get`, `parametermanager.locations.list`, `parametermanager.parameterVersions.create`, `parametermanager.parameters.get`, `parametermanager.parameters.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Parameter Manager Parameter Version Manager (`roles/parametermanager.parameterVersionManager`)

- Grants read \& write access to all Parameter Manager ParameterVersion resources. Intended for users \& applications that need to view Parameters and perform create/read/update/delete/list operations on ParameterVersions only.
- Permissions (13): `parametermanager.locations.get`, `parametermanager.locations.list`, `parametermanager.parameterVersions.create`, `parametermanager.parameterVersions.delete`, `parametermanager.parameterVersions.get`, `parametermanager.parameterVersions.list`, `parametermanager.parameterVersions.update`, `parametermanager.parameters.get`, `parametermanager.parameters.list`, `parametermanager.parameters.listEffectiveTags`, `parametermanager.parameters.listTagBindings`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Parameter Manager Parameter Viewer (`roles/parametermanager.parameterViewer`)

- Grants read access to Parameter Manager Parameter \& ParameterVersion resources. Intended for users \& applications that need to perform read/list operations on Parameters and ParameterVersions only.
- Permissions (10): `parametermanager.locations.get`, `parametermanager.locations.list`, `parametermanager.parameterVersions.get`, `parametermanager.parameterVersions.list`, `parametermanager.parameters.get`, `parametermanager.parameters.list`, `parametermanager.parameters.listEffectiveTags`, `parametermanager.parameters.listTagBindings`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Parameter Manager Template Accessor (`roles/parametermanager.templateAccessor`)

- Launch stage: Beta
- Grants read access to ParameterManager TemplateVersion resources. Intended for users \& applications that need to perform read operations on TemplateVersions only.
- Permissions (1): `parametermanager.templateVersions.render`

#### Parameter Manager Template Version Manager (`roles/parametermanager.templateVersionManager`)

- Launch stage: Beta
- Grants read \& write access to all Parameter Manager TemplateVersion resources. Intended for users \& applications that need to view Templates and perform create/read/update/delete/list operations on TemplateVersions only.
- Permissions (11): `parametermanager.locations.get`, `parametermanager.locations.list`, `parametermanager.templateVersions.create`, `parametermanager.templateVersions.delete`, `parametermanager.templateVersions.get`, `parametermanager.templateVersions.list`, `parametermanager.templateVersions.update`, `parametermanager.templates.get`, `parametermanager.templates.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Parameter Manager Template Viewer (`roles/parametermanager.templateViewer`)

- Launch stage: Beta
- Grants read access to Parameter Manager Template \& TemplateVersion resources. Intended for users \& applications that need to perform read/list operations on Templates and TemplateVersions only.
- Permissions (8): `parametermanager.locations.get`, `parametermanager.locations.list`, `parametermanager.templateVersions.get`, `parametermanager.templateVersions.list`, `parametermanager.templates.get`, `parametermanager.templates.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/parametermanager.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `parametermanager.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/parametermanager.admin`, `roles/parametermanager.editor`, `roles/parametermanager.viewer`, `roles/iam.supportUser`, `roles/parametermanager.parameterAccessor`, `roles/parametermanager.parameterVersionAdder`, `roles/parametermanager.parameterVersionManager`, `roles/parametermanager.parameterViewer`, `roles/parametermanager.templateVersionManager`, `roles/parametermanager.templateViewer` |
| `parametermanager.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/parametermanager.admin`, `roles/parametermanager.editor`, `roles/parametermanager.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/parametermanager.parameterAccessor`, `roles/parametermanager.parameterVersionAdder`, `roles/parametermanager.parameterVersionManager`, `roles/parametermanager.parameterViewer`, `roles/parametermanager.templateVersionManager`, `roles/parametermanager.templateViewer`, `roles/wiz.cloudInventoryViewer` |
| `parametermanager.parameterVersions.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/parametermanager.admin`, `roles/parametermanager.editor`, `roles/parametermanager.parameterVersionAdder`, `roles/parametermanager.parameterVersionManager` |
| `parametermanager.parameterVersions.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/parametermanager.admin`, `roles/parametermanager.editor`, `roles/parametermanager.parameterVersionManager` |
| `parametermanager.parameterVersions.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/parametermanager.admin`, `roles/parametermanager.editor`, `roles/parametermanager.viewer`, `roles/iam.supportUser`, `roles/parametermanager.parameterVersionManager`, `roles/parametermanager.parameterViewer` |
| `parametermanager.parameterVersions.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/parametermanager.admin`, `roles/parametermanager.editor`, `roles/parametermanager.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/parametermanager.parameterVersionManager`, `roles/parametermanager.parameterViewer` |
| `parametermanager.parameterVersions.render` | `roles/admin`, `roles/owner`, `roles/parametermanager.admin`, `roles/parametermanager.parameterAccessor` |
| `parametermanager.parameterVersions.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/parametermanager.admin`, `roles/parametermanager.editor`, `roles/parametermanager.parameterVersionManager` |
| `parametermanager.parameters.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/parametermanager.admin`, `roles/parametermanager.editor` |
| `parametermanager.parameters.createTagBinding` | `roles/admin`, `roles/owner`, `roles/parametermanager.admin`, `roles/resourcemanager.tagUser`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver` |
| `parametermanager.parameters.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/parametermanager.admin`, `roles/parametermanager.editor` |
| `parametermanager.parameters.deleteTagBinding` | `roles/admin`, `roles/owner`, `roles/parametermanager.admin`, `roles/resourcemanager.tagUser`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver` |
| `parametermanager.parameters.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/parametermanager.admin`, `roles/parametermanager.editor`, `roles/parametermanager.viewer`, `roles/iam.supportUser`, `roles/parametermanager.parameterVersionAdder`, `roles/parametermanager.parameterVersionManager`, `roles/parametermanager.parameterViewer` |
| `parametermanager.parameters.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/parametermanager.admin`, `roles/parametermanager.editor`, `roles/parametermanager.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/parametermanager.parameterVersionAdder`, `roles/parametermanager.parameterVersionManager`, `roles/parametermanager.parameterViewer`, `roles/wiz.cloudInventoryViewer` |
| `parametermanager.parameters.listEffectiveTags` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/parametermanager.admin`, `roles/parametermanager.editor`, `roles/parametermanager.viewer`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/parametermanager.parameterVersionManager`, `roles/parametermanager.parameterViewer` |
| `parametermanager.parameters.listTagBindings` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/parametermanager.admin`, `roles/parametermanager.editor`, `roles/parametermanager.viewer`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/parametermanager.parameterVersionManager`, `roles/parametermanager.parameterViewer` |
| `parametermanager.parameters.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/parametermanager.admin`, `roles/parametermanager.editor` |
| `parametermanager.templateVersions.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/parametermanager.admin`, `roles/parametermanager.editor`, `roles/parametermanager.templateVersionManager` |
| `parametermanager.templateVersions.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/parametermanager.admin`, `roles/parametermanager.editor`, `roles/parametermanager.templateVersionManager` |
| `parametermanager.templateVersions.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/parametermanager.admin`, `roles/parametermanager.editor`, `roles/parametermanager.viewer`, `roles/iam.supportUser`, `roles/parametermanager.templateVersionManager`, `roles/parametermanager.templateViewer` |
| `parametermanager.templateVersions.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/parametermanager.admin`, `roles/parametermanager.editor`, `roles/parametermanager.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/parametermanager.templateVersionManager`, `roles/parametermanager.templateViewer` |
| `parametermanager.templateVersions.render` | `roles/admin`, `roles/owner`, `roles/parametermanager.admin`, `roles/parametermanager.templateAccessor` |
| `parametermanager.templateVersions.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/parametermanager.admin`, `roles/parametermanager.editor`, `roles/parametermanager.templateVersionManager` |
| `parametermanager.templates.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/parametermanager.admin`, `roles/parametermanager.editor` |
| `parametermanager.templates.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/parametermanager.admin`, `roles/parametermanager.editor` |
| `parametermanager.templates.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/parametermanager.admin`, `roles/parametermanager.editor`, `roles/parametermanager.viewer`, `roles/iam.supportUser`, `roles/parametermanager.templateVersionManager`, `roles/parametermanager.templateViewer` |
| `parametermanager.templates.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/parametermanager.admin`, `roles/parametermanager.editor`, `roles/parametermanager.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/parametermanager.templateVersionManager`, `roles/parametermanager.templateViewer` |
| `parametermanager.templates.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/parametermanager.admin`, `roles/parametermanager.editor` |

## Notes

- Roles and permissions of the `parametermanager` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/parametermanager (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
