---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/modelarmor
---

# Model Armor IAM roles and permissions

## Signature / Usage

Predefined roles of `modelarmor` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Model Armor Admin (`roles/modelarmor.admin`)

- Grants full access to all modelarmor resources. Intended for administrators \& owners.
- Permissions (16): `modelarmor.callouts.invoke`, `modelarmor.locations.get`, `modelarmor.locations.list`, `modelarmor.templates.create`, `modelarmor.templates.delete`, `modelarmor.templates.get`, `modelarmor.templates.list`, `modelarmor.templates.update`, `modelarmor.templates.useToSanitizeInput`, `modelarmor.templates.useToSanitizeModelResponse`, `modelarmor.templates.useToSanitizeOutput`, `modelarmor.templates.useToSanitizeUserPrompt`, `modelarmor.templates.useToStreamSanitizeModelResponse`, `modelarmor.templates.useToStreamSanitizeUserPrompt`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Model Armor Editor (`roles/modelarmor.editor`)

- Grants access to create and update all model armor resources. Intended for editors.
- Permissions (18): `modelarmor.callouts.invoke`, `modelarmor.floorSettings.computeEffectiveFloorSetting`, `modelarmor.floorSettings.get`, `modelarmor.locations.get`, `modelarmor.locations.list`, `modelarmor.templates.create`, `modelarmor.templates.delete`, `modelarmor.templates.get`, `modelarmor.templates.list`, `modelarmor.templates.update`, `modelarmor.templates.useToSanitizeInput`, `modelarmor.templates.useToSanitizeModelResponse`, `modelarmor.templates.useToSanitizeOutput`, `modelarmor.templates.useToSanitizeUserPrompt`, `modelarmor.templates.useToStreamSanitizeModelResponse`, `modelarmor.templates.useToStreamSanitizeUserPrompt`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Model Armor Viewer (`roles/modelarmor.viewer`)

- Grants read access to all model armor resources. Intended for viewers.
- Permissions (6): `modelarmor.locations.get`, `modelarmor.locations.list`, `modelarmor.templates.get`, `modelarmor.templates.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Model Armor Callout User (`roles/modelarmor.calloutUser`)

- Launch stage: Beta
- Grants access to use Model Armor Callout service. Intended for users \& applications which plan to use Model Armor Callout service.
- Permissions (5): `modelarmor.callouts.invoke`, `modelarmor.locations.get`, `modelarmor.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Model Armor Floor Setting Admin (`roles/modelarmor.floorSettingsAdmin`)

- Grants full access to all Model Armor Floor Setting resources. Intended for administrators \& owners.
- Permissions (10): `modelarmor.floorSettings.computeEffectiveFloorSetting`, `modelarmor.floorSettings.get`, `modelarmor.floorSettings.update`, `modelarmor.locations.get`, `modelarmor.locations.list`, `resourcemanager.folders.get`, `resourcemanager.folders.list`, `resourcemanager.organizations.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Model Armor Floor Setting Viewer (`roles/modelarmor.floorSettingsViewer`)

- Grants read access to all Model Armor Floor Setting resources. Intended for viewers.
- Permissions (8): `modelarmor.floorSettings.get`, `modelarmor.locations.get`, `modelarmor.locations.list`, `resourcemanager.folders.get`, `resourcemanager.folders.list`, `resourcemanager.organizations.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Model Armor User (`roles/modelarmor.user`)

- Grants access to sanitize APIs for templates, to use and test topics, and to use Model Armor Callout service. Intended for users \& applications which plan to use a template, topic, or callout service for sanitization.
- Permissions (11): `modelarmor.callouts.invoke`, `modelarmor.locations.get`, `modelarmor.locations.list`, `modelarmor.templates.useToSanitizeInput`, `modelarmor.templates.useToSanitizeModelResponse`, `modelarmor.templates.useToSanitizeOutput`, `modelarmor.templates.useToSanitizeUserPrompt`, `modelarmor.templates.useToStreamSanitizeModelResponse`, `modelarmor.templates.useToStreamSanitizeUserPrompt`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Model Armor Service Agent (`roles/modelarmor.serviceAgent`)

- Gives Model Armor Service Account permission to make DLP calls. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (17): `dlp.analyzeRiskTemplates.get`, `dlp.analyzeRiskTemplates.list`, `dlp.deidentifyTemplates.get`, `dlp.deidentifyTemplates.list`, `dlp.inspectFindings.list`, `dlp.inspectTemplates.get`, `dlp.inspectTemplates.list`, `dlp.jobTriggers.get`, `dlp.jobTriggers.list`, `dlp.jobs.get`, `dlp.jobs.list`, `dlp.kms.encrypt`, `dlp.locations.get`, `dlp.locations.list`, `dlp.storedInfoTypes.get`, `dlp.storedInfoTypes.list`, `serviceusage.services.use`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/modelarmor.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `modelarmor.callouts.invoke` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/modelarmor.admin`, `roles/modelarmor.editor`, `roles/securitycenter.admin`, `roles/modelarmor.calloutUser`, `roles/modelarmor.user` (+1 service agent role) |
| `modelarmor.floorSettings.computeEffectiveFloorSetting` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/modelarmor.editor`, `roles/securitycenter.admin`, `roles/iam.supportUser`, `roles/modelarmor.floorSettingsAdmin` |
| `modelarmor.floorSettings.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/modelarmor.editor`, `roles/securitycenter.admin`, `roles/iam.supportUser`, `roles/modelarmor.floorSettingsAdmin`, `roles/modelarmor.floorSettingsViewer` |
| `modelarmor.floorSettings.update` | `roles/admin`, `roles/owner`, `roles/securitycenter.admin`, `roles/modelarmor.floorSettingsAdmin` |
| `modelarmor.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/modelarmor.admin`, `roles/modelarmor.editor`, `roles/modelarmor.viewer`, `roles/securitycenter.admin`, `roles/iam.supportUser`, `roles/modelarmor.calloutUser`, `roles/modelarmor.floorSettingsAdmin`, `roles/modelarmor.floorSettingsViewer`, `roles/modelarmor.user` (+1 service agent role) |
| `modelarmor.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/modelarmor.admin`, `roles/modelarmor.editor`, `roles/modelarmor.viewer`, `roles/securitycenter.admin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/modelarmor.calloutUser`, `roles/modelarmor.floorSettingsAdmin`, `roles/modelarmor.floorSettingsViewer`, `roles/modelarmor.user` (+1 service agent role) |
| `modelarmor.templates.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/modelarmor.admin`, `roles/modelarmor.editor`, `roles/securitycenter.admin` (+1 service agent role) |
| `modelarmor.templates.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/modelarmor.admin`, `roles/modelarmor.editor`, `roles/securitycenter.admin` (+1 service agent role) |
| `modelarmor.templates.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/modelarmor.admin`, `roles/modelarmor.editor`, `roles/modelarmor.viewer`, `roles/securitycenter.admin`, `roles/iam.supportUser` (+1 service agent role) |
| `modelarmor.templates.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/modelarmor.admin`, `roles/modelarmor.editor`, `roles/modelarmor.viewer`, `roles/securitycenter.admin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+1 service agent role) |
| `modelarmor.templates.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/modelarmor.admin`, `roles/modelarmor.editor`, `roles/securitycenter.admin` (+1 service agent role) |
| `modelarmor.templates.useToSanitizeInput` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/modelarmor.admin`, `roles/modelarmor.editor`, `roles/securitycenter.admin`, `roles/modelarmor.user` (+1 service agent role) |
| `modelarmor.templates.useToSanitizeModelResponse` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/modelarmor.admin`, `roles/modelarmor.editor`, `roles/securitycenter.admin`, `roles/modelarmor.user` (+2 service agent roles) |
| `modelarmor.templates.useToSanitizeOutput` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/modelarmor.admin`, `roles/modelarmor.editor`, `roles/securitycenter.admin`, `roles/modelarmor.user` (+1 service agent role) |
| `modelarmor.templates.useToSanitizeUserPrompt` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/modelarmor.admin`, `roles/modelarmor.editor`, `roles/securitycenter.admin`, `roles/modelarmor.user` (+2 service agent roles) |
| `modelarmor.templates.useToStreamSanitizeModelResponse` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/modelarmor.admin`, `roles/modelarmor.editor`, `roles/securitycenter.admin`, `roles/modelarmor.user` |
| `modelarmor.templates.useToStreamSanitizeUserPrompt` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/modelarmor.admin`, `roles/modelarmor.editor`, `roles/securitycenter.admin`, `roles/modelarmor.user` |

## Notes

- Roles and permissions of the `modelarmor` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/modelarmor (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
