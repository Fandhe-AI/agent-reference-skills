---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/apphub
---

# App Hub IAM roles and permissions (part 2/2)

## Signature / Usage

Predefined roles of `apphub` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Example: inspect a role that contains these permissions

Generated example (not in the official docs) describing the first predefined role listed in the table below:

```bash
gcloud iam roles describe roles/apphub.admin
```

### Permissions and the roles that contain them (continued)

| Permission | Roles |
|---|---|
| `apphub.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/apphub.admin`, `roles/apphub.editor`, `roles/apphub.viewer`, `roles/designcenter.admin`, `roles/geminicloudassist.admin`, `roles/geminicloudassist.editor`, `roles/geminicloudassist.user`, `roles/geminicloudassist.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/designcenter.applicationAdmin`, `roles/designcenter.applicationEditor`, `roles/designcenter.applicationViewer`, `roles/iam.supportUser` |
| `apphub.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/apphub.admin`, `roles/apphub.editor`, `roles/apphub.viewer`, `roles/designcenter.admin`, `roles/geminicloudassist.admin`, `roles/geminicloudassist.editor`, `roles/geminicloudassist.user`, `roles/geminicloudassist.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/designcenter.applicationAdmin`, `roles/designcenter.applicationEditor`, `roles/designcenter.applicationViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` |
| `apphub.operations.cancel` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/apphub.admin`, `roles/apphub.editor` |
| `apphub.operations.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/apphub.admin`, `roles/apphub.editor` |
| `apphub.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/apphub.admin`, `roles/apphub.editor`, `roles/apphub.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.supportUser` (+2 service agent roles) |
| `apphub.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/apphub.admin`, `roles/apphub.editor`, `roles/apphub.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+1 service agent role) |
| `apphub.serviceProjectAttachments.attach` | `roles/admin`, `roles/owner`, `roles/apphub.admin` |
| `apphub.serviceProjectAttachments.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/apphub.admin`, `roles/apphub.editor` |
| `apphub.serviceProjectAttachments.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/apphub.admin`, `roles/apphub.editor` |
| `apphub.serviceProjectAttachments.detach` | `roles/admin`, `roles/owner`, `roles/apphub.admin` |
| `apphub.serviceProjectAttachments.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/apphub.admin`, `roles/apphub.editor`, `roles/apphub.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.supportUser` (+1 service agent role) |
| `apphub.serviceProjectAttachments.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/apphub.admin`, `roles/apphub.editor`, `roles/apphub.viewer`, `roles/designcenter.admin`, `roles/geminicloudassist.admin`, `roles/geminicloudassist.editor`, `roles/geminicloudassist.user`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/designcenter.applicationAdmin`, `roles/designcenter.applicationEditor`, `roles/designcenter.user`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+1 service agent role) |
| `apphub.serviceProjectAttachments.lookup` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/apphub.admin`, `roles/apphub.editor`, `roles/apphub.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.supportUser` (+1 service agent role) |
| `apphub.services.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/apphub.admin`, `roles/apphub.editor` (+2 service agent roles) |
| `apphub.services.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/apphub.admin`, `roles/apphub.editor` (+1 service agent role) |
| `apphub.services.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/apphub.admin`, `roles/apphub.editor`, `roles/apphub.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.supportUser` (+1 service agent role) |
| `apphub.services.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/apphub.admin`, `roles/apphub.editor`, `roles/apphub.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` (+2 service agent roles) |
| `apphub.services.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/apphub.admin`, `roles/apphub.editor` |
| `apphub.workloads.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/apphub.admin`, `roles/apphub.editor` (+2 service agent roles) |
| `apphub.workloads.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/apphub.admin`, `roles/apphub.editor` (+1 service agent role) |
| `apphub.workloads.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/apphub.admin`, `roles/apphub.editor`, `roles/apphub.viewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.supportUser` (+1 service agent role) |
| `apphub.workloads.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/apphub.admin`, `roles/apphub.editor`, `roles/apphub.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` (+2 service agent roles) |
| `apphub.workloads.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/apphub.admin`, `roles/apphub.editor` |

## Notes

- Roles and permissions of the `apphub` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/apphub (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
