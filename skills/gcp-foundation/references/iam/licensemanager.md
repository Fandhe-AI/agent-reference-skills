---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/licensemanager
---

# Cloud License Manager IAM roles and permissions

## Signature / Usage

Predefined roles of `licensemanager` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Cloud License Manager Admin (`roles/licensemanager.admin`)

- Full access to Cloud License Manager resources.
- Permissions (19): `licensemanager.configurations.aggregateUsage`, `licensemanager.configurations.create`, `licensemanager.configurations.delete`, `licensemanager.configurations.get`, `licensemanager.configurations.list`, `licensemanager.configurations.queryLicenseUsage`, `licensemanager.configurations.update`, `licensemanager.instances.get`, `licensemanager.instances.list`, `licensemanager.locations.get`, `licensemanager.locations.list`, `licensemanager.operations.cancel`, `licensemanager.operations.delete`, `licensemanager.operations.get`, `licensemanager.operations.list`, `licensemanager.products.get`, `licensemanager.products.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud License Manager Viewer (`roles/licensemanager.viewer`)

- Readonly access to Cloud License Manager resources.
- Permissions (12): `licensemanager.configurations.get`, `licensemanager.configurations.list`, `licensemanager.instances.get`, `licensemanager.instances.list`, `licensemanager.locations.get`, `licensemanager.locations.list`, `licensemanager.operations.get`, `licensemanager.operations.list`, `licensemanager.products.get`, `licensemanager.products.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Project):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/licensemanager.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `licensemanager.configurations.aggregateUsage` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/licensemanager.admin`, `roles/iam.supportUser` |
| `licensemanager.configurations.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/licensemanager.admin` |
| `licensemanager.configurations.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/licensemanager.admin` |
| `licensemanager.configurations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/licensemanager.admin`, `roles/licensemanager.viewer`, `roles/iam.supportUser` |
| `licensemanager.configurations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/licensemanager.admin`, `roles/licensemanager.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `licensemanager.configurations.queryLicenseUsage` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/licensemanager.admin`, `roles/iam.supportUser` |
| `licensemanager.configurations.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/licensemanager.admin` |
| `licensemanager.instances.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/licensemanager.admin`, `roles/licensemanager.viewer`, `roles/iam.supportUser` |
| `licensemanager.instances.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/licensemanager.admin`, `roles/licensemanager.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `licensemanager.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/licensemanager.admin`, `roles/licensemanager.viewer`, `roles/iam.supportUser` |
| `licensemanager.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/licensemanager.admin`, `roles/licensemanager.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `licensemanager.operations.cancel` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/licensemanager.admin` |
| `licensemanager.operations.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/licensemanager.admin` |
| `licensemanager.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/licensemanager.admin`, `roles/licensemanager.viewer`, `roles/iam.supportUser` |
| `licensemanager.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/licensemanager.admin`, `roles/licensemanager.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `licensemanager.products.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/licensemanager.admin`, `roles/licensemanager.viewer`, `roles/iam.supportUser` |
| `licensemanager.products.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/licensemanager.admin`, `roles/licensemanager.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |

## Notes

- Roles and permissions of the `licensemanager` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/licensemanager (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
