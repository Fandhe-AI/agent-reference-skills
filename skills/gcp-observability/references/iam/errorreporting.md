---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/errorreporting
---

# Error Reporting IAM roles and permissions

## Signature / Usage

Predefined roles of `errorreporting` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Error Reporting Admin (`roles/errorreporting.admin`)

- Launch stage: Beta
- Provides full access to Error Reporting data. Lowest-level resources where you can grant this role: - Project
- Permissions (16): `cloudnotifications.activities.list`, `errorreporting.applications.list`, `errorreporting.errorEvents.create`, `errorreporting.errorEvents.delete`, `errorreporting.errorEvents.list`, `errorreporting.groupMetadata.get`, `errorreporting.groupMetadata.update`, `errorreporting.groups.list`, `logging.notificationRules.create`, `logging.notificationRules.delete`, `logging.notificationRules.get`, `logging.notificationRules.list`, `logging.notificationRules.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `stackdriver.projects.get`

#### Error Reporting User (`roles/errorreporting.user`)

- Launch stage: Beta
- Provides the permissions to read and write Error Reporting data, except for sending new error events. Lowest-level resources where you can grant this role: - Project
- Permissions (15): `cloudnotifications.activities.list`, `errorreporting.applications.list`, `errorreporting.errorEvents.delete`, `errorreporting.errorEvents.list`, `errorreporting.groupMetadata.get`, `errorreporting.groupMetadata.update`, `errorreporting.groups.list`, `logging.notificationRules.create`, `logging.notificationRules.delete`, `logging.notificationRules.get`, `logging.notificationRules.list`, `logging.notificationRules.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `stackdriver.projects.get`

#### Error Reporting Viewer (`roles/errorreporting.viewer`)

- Launch stage: Beta
- Provides read-only access to Error Reporting data. Lowest-level resources where you can grant this role: - Project
- Permissions (10): `cloudnotifications.activities.list`, `errorreporting.applications.list`, `errorreporting.errorEvents.list`, `errorreporting.groupMetadata.get`, `errorreporting.groups.list`, `logging.notificationRules.get`, `logging.notificationRules.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `stackdriver.projects.get`

#### Error Reporting Writer (`roles/errorreporting.writer`)

- Launch stage: Beta
- Provides the permissions to send error events to Error Reporting. Lowest-level resources where you can grant this role: - Service Account
- Permissions (1): `errorreporting.errorEvents.create`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Project):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/errorreporting.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `errorreporting.applications.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/errorreporting.admin`, `roles/errorreporting.user`, `roles/errorreporting.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/cloudhub.operator`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser` |
| `errorreporting.errorEvents.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/errorreporting.admin`, `roles/errorreporting.writer` |
| `errorreporting.errorEvents.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/errorreporting.admin`, `roles/errorreporting.user` |
| `errorreporting.errorEvents.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/errorreporting.admin`, `roles/errorreporting.user`, `roles/errorreporting.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/cloudhub.operator`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser` |
| `errorreporting.groupMetadata.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/errorreporting.admin`, `roles/errorreporting.user`, `roles/errorreporting.viewer`, `roles/cloudhub.operator`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser` |
| `errorreporting.groupMetadata.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/errorreporting.admin`, `roles/errorreporting.user` |
| `errorreporting.groups.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/errorreporting.admin`, `roles/errorreporting.user`, `roles/errorreporting.viewer`, `roles/firebase.admin`, `roles/firebase.editor`, `roles/firebase.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/cloudhub.operator`, `roles/firebase.developAdmin`, `roles/firebase.developViewer`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser` |

## Notes

- Roles and permissions of the `errorreporting` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/errorreporting (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
