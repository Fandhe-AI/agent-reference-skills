---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/servicesecurityinsights
---

# Service Security Insights IAM roles and permissions

## Signature / Usage

Predefined roles of `servicesecurityinsights` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Security Insights Viewer (`roles/servicesecurityinsights.securityInsightsViewer`)

- Launch stage: Beta
- Read-only access to Security Insights resources
- Permissions (8): `servicesecurityinsights.clusterSecurityInfo.get`, `servicesecurityinsights.clusterSecurityInfo.list`, `servicesecurityinsights.policies.get`, `servicesecurityinsights.projectStates.get`, `servicesecurityinsights.securityInfo.list`, `servicesecurityinsights.securityViews.get`, `servicesecurityinsights.workloadPolicies.list`, `servicesecurityinsights.workloadSecurityInfo.get`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/servicesecurityinsights.securityInsightsViewer"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `servicesecurityinsights.clusterSecurityInfo.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.supportUser`, `roles/servicesecurityinsights.securityInsightsViewer` |
| `servicesecurityinsights.clusterSecurityInfo.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/servicesecurityinsights.securityInsightsViewer` |
| `servicesecurityinsights.policies.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.supportUser`, `roles/servicesecurityinsights.securityInsightsViewer` |
| `servicesecurityinsights.projectStates.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.supportUser`, `roles/servicesecurityinsights.securityInsightsViewer` |
| `servicesecurityinsights.securityInfo.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/servicesecurityinsights.securityInsightsViewer` |
| `servicesecurityinsights.securityViews.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.supportUser`, `roles/servicesecurityinsights.securityInsightsViewer` |
| `servicesecurityinsights.workloadPolicies.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/servicesecurityinsights.securityInsightsViewer` |
| `servicesecurityinsights.workloadSecurityInfo.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.supportUser`, `roles/servicesecurityinsights.securityInsightsViewer` |

## Notes

- Roles and permissions of the `servicesecurityinsights` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/servicesecurityinsights (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
