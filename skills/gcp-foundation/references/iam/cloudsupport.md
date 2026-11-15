---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/cloudsupport
---

# Google Cloud Support IAM roles and permissions

## Signature / Usage

Predefined roles of `cloudsupport` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

### Support Administrator (`roles/cloudsupport.admin`)

- Allows management of a support account and support cases. See the Cloud Support documentation (https://docs.cloud.google.com/support/docs/access-control#support_account_admin) for more information. Lowest-level resources where you can grant this role: - Organization
- Permissions (18): `cloudsupport.accounts.create`, `cloudsupport.accounts.delete`, `cloudsupport.accounts.get`, `cloudsupport.accounts.getIamPolicy`, `cloudsupport.accounts.getUserRoles`, `cloudsupport.accounts.list`, `cloudsupport.accounts.purchase`, `cloudsupport.accounts.setIamPolicy`, `cloudsupport.accounts.update`, `cloudsupport.accounts.updateUserRoles`, `cloudsupport.operations.get`, `cloudsupport.properties.get`, `cloudsupport.techCases.create`, `cloudsupport.techCases.escalate`, `cloudsupport.techCases.get`, `cloudsupport.techCases.list`, `cloudsupport.techCases.update`, `resourcemanager.organizations.get`

### Support Viewer (`roles/cloudsupport.viewer`)

- Read-only access to details of a support account. This does not allow viewing cases. See the Cloud Support documentation (https://docs.cloud.google.com/support/docs/access-control#support_account_viewer) for more information. Lowest-level resources where you can grant this role: - Organization
- Permissions (8): `cloudsupport.accounts.get`, `cloudsupport.accounts.getIamPolicy`, `cloudsupport.accounts.getUserRoles`, `cloudsupport.accounts.list`, `cloudsupport.operations.get`, `cloudsupport.properties.get`, `cloudsupport.techCases.get`, `cloudsupport.techCases.list`

### Advisory Support Editor (`roles/cloudsupport.advisorySupportEditor`)

- Full read-write access to advisory support cases applicable for Cloud Customer Care.
- Permissions (4): `cloudasset.assets.searchAllResources`, `cloudsupport.properties.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Advisory Support Viewer (`roles/cloudsupport.advisorySupportViewer`)

- Read-only access to advisory support cases applicable for Cloud Customer Care.
- Permissions (3): `cloudsupport.properties.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Support Subscription Editor (`roles/cloudsupport.supportSubscriptionEditor`)

- Full read-write access to support event subscriptions.
- Permissions (1): `resourcemanager.organizations.get`

### Support Subscription Viewer (`roles/cloudsupport.supportSubscriptionViewer`)

- Read-only access to support event subscriptions.
- Permissions (1): `resourcemanager.organizations.get`

### Tech Support Editor (`roles/cloudsupport.techSupportEditor`)

- Full read-write access to technical support cases (applicable for Cloud Customer Care and Maps support). See the Cloud Support documentation (https://docs.cloud.google.com/support/docs/access-control#tech_support_editor) for more information.
- Permissions (10): `billing.resourceAssociations.list`, `cloudasset.assets.searchAllResources`, `cloudsupport.properties.get`, `cloudsupport.techCases.create`, `cloudsupport.techCases.escalate`, `cloudsupport.techCases.get`, `cloudsupport.techCases.list`, `cloudsupport.techCases.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Tech Support Viewer (`roles/cloudsupport.techSupportViewer`)

- Read-only access to technical support cases (applicable for Cloud Customer Care and Maps support). See the Cloud Support documentation (https://docs.cloud.google.com/support/docs/access-control#tech_support_viewer) for more information.
- Permissions (5): `cloudsupport.properties.get`, `cloudsupport.techCases.get`, `cloudsupport.techCases.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Organization):

```bash
gcloud organizations add-iam-policy-binding ORGANIZATION_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/cloudsupport.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `cloudsupport.accounts.create` | `roles/admin`, `roles/owner`, `roles/cloudsupport.admin` |
| `cloudsupport.accounts.delete` | `roles/admin`, `roles/owner`, `roles/cloudsupport.admin` |
| `cloudsupport.accounts.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudsupport.admin`, `roles/cloudsupport.viewer`, `roles/iam.supportUser` |
| `cloudsupport.accounts.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudsupport.admin`, `roles/cloudsupport.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `cloudsupport.accounts.getUserRoles` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudsupport.admin`, `roles/cloudsupport.viewer`, `roles/iam.supportUser` |
| `cloudsupport.accounts.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudsupport.admin`, `roles/cloudsupport.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `cloudsupport.accounts.purchase` | `roles/admin`, `roles/owner`, `roles/cloudsupport.admin` |
| `cloudsupport.accounts.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/cloudsupport.admin`, `roles/iam.securityAdmin` |
| `cloudsupport.accounts.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudsupport.admin` |
| `cloudsupport.accounts.updateUserRoles` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudsupport.admin` |
| `cloudsupport.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudsupport.admin`, `roles/cloudsupport.viewer`, `roles/iam.supportUser` |
| `cloudsupport.properties.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/billing.admin`, `roles/cloudsupport.admin`, `roles/cloudsupport.viewer`, `roles/cloudhub.operator`, `roles/cloudsupport.advisorySupportEditor`, `roles/cloudsupport.advisorySupportViewer`, `roles/cloudsupport.techSupportEditor`, `roles/cloudsupport.techSupportViewer`, `roles/iam.supportUser` |
| `cloudsupport.techCases.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/billing.admin`, `roles/cloudsupport.admin`, `roles/cloudsupport.techSupportEditor`, `roles/iam.supportUser` |
| `cloudsupport.techCases.escalate` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/billing.admin`, `roles/cloudsupport.admin`, `roles/cloudsupport.techSupportEditor`, `roles/iam.supportUser` |
| `cloudsupport.techCases.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/billing.admin`, `roles/cloudsupport.admin`, `roles/cloudsupport.viewer`, `roles/cloudhub.operator`, `roles/cloudsupport.techSupportEditor`, `roles/cloudsupport.techSupportViewer`, `roles/iam.supportUser` (+1 service agent role) |
| `cloudsupport.techCases.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/billing.admin`, `roles/cloudsupport.admin`, `roles/cloudsupport.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/cloudhub.operator`, `roles/cloudsupport.techSupportEditor`, `roles/cloudsupport.techSupportViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `cloudsupport.techCases.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/billing.admin`, `roles/cloudsupport.admin`, `roles/cloudsupport.techSupportEditor`, `roles/iam.supportUser` |

## Notes

- Roles and permissions of the `cloudsupport` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/cloudsupport (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
