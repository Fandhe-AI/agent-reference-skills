---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/privilegedaccessmanager
---

# Privileged Access Manager IAM roles and permissions

## Signature / Usage

Predefined roles of `privilegedaccessmanager` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Privileged Access Manager Admin (`roles/privilegedaccessmanager.admin`)

- Full access to Privileged Access Manager resources.
- Permissions (18): `privilegedaccessmanager.entitlements.create`, `privilegedaccessmanager.entitlements.delete`, `privilegedaccessmanager.entitlements.get`, `privilegedaccessmanager.entitlements.list`, `privilegedaccessmanager.entitlements.setIamPolicy`, `privilegedaccessmanager.entitlements.update`, `privilegedaccessmanager.grants.get`, `privilegedaccessmanager.grants.list`, `privilegedaccessmanager.grants.revoke`, `privilegedaccessmanager.locations.checkOnboardingStatus`, `privilegedaccessmanager.locations.get`, `privilegedaccessmanager.locations.list`, `privilegedaccessmanager.operations.delete`, `privilegedaccessmanager.operations.get`, `privilegedaccessmanager.operations.list`, `privilegedaccessmanager.settings.fetchEffective`, `privilegedaccessmanager.settings.get`, `resourcemanager.projects.get`

#### Privileged Access Manager Editor (`roles/privilegedaccessmanager.editor`)

- Editor access to Privileged Access Manager resources.
- Permissions (12): `privilegedaccessmanager.entitlements.get`, `privilegedaccessmanager.entitlements.list`, `privilegedaccessmanager.grants.get`, `privilegedaccessmanager.grants.list`, `privilegedaccessmanager.locations.get`, `privilegedaccessmanager.locations.list`, `privilegedaccessmanager.operations.get`, `privilegedaccessmanager.operations.list`, `privilegedaccessmanager.settings.fetchEffective`, `privilegedaccessmanager.settings.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Privileged Access Manager Viewer (`roles/privilegedaccessmanager.viewer`)

- Readonly access to Privileged Access Manager resources.
- Permissions (11): `privilegedaccessmanager.entitlements.get`, `privilegedaccessmanager.entitlements.list`, `privilegedaccessmanager.grants.get`, `privilegedaccessmanager.grants.list`, `privilegedaccessmanager.locations.get`, `privilegedaccessmanager.locations.list`, `privilegedaccessmanager.operations.get`, `privilegedaccessmanager.operations.list`, `privilegedaccessmanager.settings.fetchEffective`, `privilegedaccessmanager.settings.get`, `resourcemanager.projects.get`

#### Privileged Access Manager Settings Admin (`roles/privilegedaccessmanager.settingsAdmin`)

- Launch stage: Beta
- Administrator of Privileged Access Manager Settings.
- Permissions (4): `privilegedaccessmanager.operations.get`, `privilegedaccessmanager.settings.fetchEffective`, `privilegedaccessmanager.settings.get`, `privilegedaccessmanager.settings.update`

#### Privileged Access Manager Settings Viewer (`roles/privilegedaccessmanager.settingsViewer`)

- Launch stage: Beta
- Readonly access to Privileged Access Manager Settings \& Effective Settings.
- Permissions (2): `privilegedaccessmanager.settings.fetchEffective`, `privilegedaccessmanager.settings.get`

#### Privileged Access Manager Folder Service Agent (`roles/privilegedaccessmanager.folderServiceAgent`)

- Gives privileged access manager service account access to modify IAM policies on GCP folders > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (3): `resourcemanager.folders.get`, `resourcemanager.folders.getIamPolicy`, `resourcemanager.folders.setIamPolicy`

#### Privileged Access Manager Organization Service Agent (`roles/privilegedaccessmanager.organizationServiceAgent`)

- Gives privileged access manager service account access to modify IAM policies on GCP organizations > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (4): `iam.roles.get`, `resourcemanager.organizations.get`, `resourcemanager.organizations.getIamPolicy`, `resourcemanager.organizations.setIamPolicy`

#### Privileged Access Manager Project Service Agent (`roles/privilegedaccessmanager.projectServiceAgent`)

- Gives privileged access manager service account access to modify IAM policies on GCP projects > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (4): `iam.roles.get`, `resourcemanager.projects.get`, `resourcemanager.projects.getIamPolicy`, `resourcemanager.projects.setIamPolicy`

#### Privileged Access Manager Service Agent (`roles/privilegedaccessmanager.serviceAgent`)

- Gives privileged access manager service account access to modify IAM policies on GCP resources > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (10): `iam.roles.get`, `resourcemanager.folders.get`, `resourcemanager.folders.getIamPolicy`, `resourcemanager.folders.setIamPolicy`, `resourcemanager.organizations.get`, `resourcemanager.organizations.getIamPolicy`, `resourcemanager.organizations.setIamPolicy`, `resourcemanager.projects.get`, `resourcemanager.projects.getIamPolicy`, `resourcemanager.projects.setIamPolicy`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/privilegedaccessmanager.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `privilegedaccessmanager.entitlements.create` | `roles/admin`, `roles/owner`, `roles/privilegedaccessmanager.admin` |
| `privilegedaccessmanager.entitlements.delete` | `roles/admin`, `roles/owner`, `roles/privilegedaccessmanager.admin` |
| `privilegedaccessmanager.entitlements.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/privilegedaccessmanager.admin`, `roles/privilegedaccessmanager.editor`, `roles/privilegedaccessmanager.viewer`, `roles/iam.supportUser` |
| `privilegedaccessmanager.entitlements.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/privilegedaccessmanager.admin`, `roles/privilegedaccessmanager.editor`, `roles/privilegedaccessmanager.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `privilegedaccessmanager.entitlements.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/iam.securityAdmin`, `roles/privilegedaccessmanager.admin` |
| `privilegedaccessmanager.entitlements.update` | `roles/admin`, `roles/owner`, `roles/privilegedaccessmanager.admin` |
| `privilegedaccessmanager.grants.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/privilegedaccessmanager.admin`, `roles/privilegedaccessmanager.editor`, `roles/privilegedaccessmanager.viewer`, `roles/iam.supportUser` |
| `privilegedaccessmanager.grants.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/privilegedaccessmanager.admin`, `roles/privilegedaccessmanager.editor`, `roles/privilegedaccessmanager.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `privilegedaccessmanager.grants.revoke` | `roles/admin`, `roles/owner`, `roles/privilegedaccessmanager.admin` |
| `privilegedaccessmanager.locations.checkOnboardingStatus` | `roles/admin`, `roles/owner`, `roles/privilegedaccessmanager.admin` |
| `privilegedaccessmanager.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/privilegedaccessmanager.admin`, `roles/privilegedaccessmanager.editor`, `roles/privilegedaccessmanager.viewer`, `roles/iam.supportUser` |
| `privilegedaccessmanager.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/privilegedaccessmanager.admin`, `roles/privilegedaccessmanager.editor`, `roles/privilegedaccessmanager.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `privilegedaccessmanager.operations.delete` | `roles/admin`, `roles/owner`, `roles/privilegedaccessmanager.admin` |
| `privilegedaccessmanager.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/privilegedaccessmanager.admin`, `roles/privilegedaccessmanager.editor`, `roles/privilegedaccessmanager.viewer`, `roles/iam.supportUser`, `roles/privilegedaccessmanager.settingsAdmin` |
| `privilegedaccessmanager.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/privilegedaccessmanager.admin`, `roles/privilegedaccessmanager.editor`, `roles/privilegedaccessmanager.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `privilegedaccessmanager.settings.fetchEffective` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/privilegedaccessmanager.admin`, `roles/privilegedaccessmanager.editor`, `roles/privilegedaccessmanager.viewer`, `roles/iam.supportUser`, `roles/privilegedaccessmanager.settingsAdmin`, `roles/privilegedaccessmanager.settingsViewer` |
| `privilegedaccessmanager.settings.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/privilegedaccessmanager.admin`, `roles/privilegedaccessmanager.editor`, `roles/privilegedaccessmanager.viewer`, `roles/iam.supportUser`, `roles/privilegedaccessmanager.settingsAdmin`, `roles/privilegedaccessmanager.settingsViewer` |
| `privilegedaccessmanager.settings.update` | `roles/privilegedaccessmanager.settingsAdmin` |

## Notes

- Roles and permissions of the `privilegedaccessmanager` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/privilegedaccessmanager (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
