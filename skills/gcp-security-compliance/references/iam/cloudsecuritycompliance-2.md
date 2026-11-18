---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/cloudsecuritycompliance
---

# Cloud Security Compliance IAM roles and permissions (part 2/2)

## Signature / Usage

Predefined roles of `cloudsecuritycompliance` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Example: inspect a role that contains these permissions

Generated example (not in the official docs) describing the first predefined role listed in the table below:

```bash
gcloud iam roles describe roles/assuredworkloads.admin
```

### Permissions and the roles that contain them (continued)

| Permission | Roles |
|---|---|
| `cloudsecuritycompliance.frameworks.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/assuredworkloads.admin`, `roles/assuredworkloads.editor`, `roles/cloudsecuritycompliance.admin`, `roles/securitycenter.admin` |
| `cloudsecuritycompliance.locations.enrollResource` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudsecuritycompliance.admin`, `roles/securitycenter.admin` |
| `cloudsecuritycompliance.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudsecuritycompliance.admin`, `roles/cloudsecuritycompliance.viewer`, `roles/designcenter.admin`, `roles/designcenter.editor`, `roles/designcenter.viewer`, `roles/securitycenter.admin`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/designcenter.applicationAdmin`, `roles/designcenter.applicationEditor`, `roles/designcenter.applicationViewer`, `roles/designcenter.user`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/securitycenter.adminEditor`, `roles/securitycenter.adminViewer` |
| `cloudsecuritycompliance.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudsecuritycompliance.admin`, `roles/cloudsecuritycompliance.viewer`, `roles/designcenter.admin`, `roles/designcenter.editor`, `roles/designcenter.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/securitycenter.admin`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/designcenter.applicationAdmin`, `roles/designcenter.applicationEditor`, `roles/designcenter.applicationViewer`, `roles/designcenter.user`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/securitycenter.adminEditor`, `roles/securitycenter.adminViewer` |
| `cloudsecuritycompliance.operations.cancel` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudsecuritycompliance.admin`, `roles/securitycenter.admin` |
| `cloudsecuritycompliance.operations.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudsecuritycompliance.admin`, `roles/securitycenter.admin` |
| `cloudsecuritycompliance.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudsecuritycompliance.admin`, `roles/cloudsecuritycompliance.viewer`, `roles/designcenter.admin`, `roles/designcenter.editor`, `roles/designcenter.viewer`, `roles/securitycenter.admin`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/designcenter.applicationAdmin`, `roles/designcenter.applicationEditor`, `roles/designcenter.applicationViewer`, `roles/designcenter.user`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/securitycenter.adminEditor`, `roles/securitycenter.adminViewer` (+1 service agent role) |
| `cloudsecuritycompliance.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudsecuritycompliance.admin`, `roles/cloudsecuritycompliance.viewer`, `roles/designcenter.admin`, `roles/designcenter.editor`, `roles/designcenter.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/securitycenter.admin`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/designcenter.applicationAdmin`, `roles/designcenter.applicationEditor`, `roles/designcenter.applicationViewer`, `roles/designcenter.user`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/securitycenter.adminEditor`, `roles/securitycenter.adminViewer` |
| `cloudsecuritycompliance.resourceEnrollmentStatuses.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudsecuritycompliance.admin`, `roles/cloudsecuritycompliance.viewer`, `roles/designcenter.admin`, `roles/designcenter.editor`, `roles/designcenter.viewer`, `roles/securitycenter.admin`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/designcenter.applicationAdmin`, `roles/designcenter.applicationEditor`, `roles/designcenter.applicationViewer`, `roles/designcenter.user`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/securitycenter.adminEditor`, `roles/securitycenter.adminViewer` |
| `cloudsecuritycompliance.resourceEnrollmentStatuses.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudsecuritycompliance.admin`, `roles/cloudsecuritycompliance.viewer`, `roles/designcenter.admin`, `roles/designcenter.editor`, `roles/designcenter.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/securitycenter.admin`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/designcenter.applicationAdmin`, `roles/designcenter.applicationEditor`, `roles/designcenter.applicationViewer`, `roles/designcenter.user`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/securitycenter.adminEditor`, `roles/securitycenter.adminViewer` |

## Notes

- Roles and permissions of the `cloudsecuritycompliance` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/cloudsecuritycompliance (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
