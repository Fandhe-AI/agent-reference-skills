---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/cloudnotifications
---

# Cloud Notifications IAM roles and permissions

## Signature / Usage

Predefined roles of `cloudnotifications` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Example: inspect a role that contains these permissions

Generated example (not in the official docs) describing the first predefined role listed in the table below:

```bash
gcloud iam roles describe roles/apptopology.admin
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `cloudnotifications.activities.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/apptopology.admin`, `roles/apptopology.viewer`, `roles/billing.admin`, `roles/discoveryengine.admin`, `roles/errorreporting.admin`, `roles/errorreporting.user`, `roles/errorreporting.viewer`, `roles/firebase.admin`, `roles/firebase.editor`, `roles/firebase.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/monitoring.admin`, `roles/monitoring.editor`, `roles/monitoring.viewer`, `roles/securitycenter.admin`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/discoveryengine.agentspaceAdmin`, `roles/firebase.analyticsAdmin`, `roles/firebase.analyticsViewer`, `roles/firebase.developAdmin`, `roles/firebase.developViewer`, `roles/firebase.growthAdmin`, `roles/firebase.growthViewer`, `roles/firebase.qualityAdmin`, `roles/firebase.qualityViewer`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.devOps`, `roles/iam.infrastructureAdmin`, `roles/iam.mlEngineer`, `roles/iam.networkAdmin`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser`, `roles/securitycenter.adminEditor`, `roles/securitycenter.adminViewer` (+8 service agent roles) |

## Notes

- Roles and permissions of the `cloudnotifications` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/cloudnotifications (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
