---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/enterprisepurchasing
---

# Enterprise Purchasing API IAM roles and permissions

## Signature / Usage

Predefined roles of `enterprisepurchasing` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

### Enterprise Purchasing Admin (`roles/enterprisepurchasing.admin`)

- Launch stage: Beta
- Full access to Enterprise Purchasing resources.
- Permissions (16): `enterprisepurchasing.gcveCuds.create`, `enterprisepurchasing.gcveCuds.get`, `enterprisepurchasing.gcveCuds.list`, `enterprisepurchasing.gcveNodePricingInfo.list`, `enterprisepurchasing.licenseKeys.create`, `enterprisepurchasing.licenseKeys.delete`, `enterprisepurchasing.licenseKeys.get`, `enterprisepurchasing.licenseKeys.list`, `enterprisepurchasing.locations.get`, `enterprisepurchasing.locations.list`, `enterprisepurchasing.operations.cancel`, `enterprisepurchasing.operations.delete`, `enterprisepurchasing.operations.get`, `enterprisepurchasing.operations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Enterprise Purchasing Editor (`roles/enterprisepurchasing.editor`)

- Launch stage: Beta
- Edit access to Enterprise Purchasing resources.
- Permissions (11): `enterprisepurchasing.gcveCuds.get`, `enterprisepurchasing.gcveCuds.list`, `enterprisepurchasing.gcveNodePricingInfo.list`, `enterprisepurchasing.licenseKeys.get`, `enterprisepurchasing.licenseKeys.list`, `enterprisepurchasing.locations.get`, `enterprisepurchasing.locations.list`, `enterprisepurchasing.operations.get`, `enterprisepurchasing.operations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Enterprise Purchasing Viewer (`roles/enterprisepurchasing.viewer`)

- Launch stage: Beta
- Readonly access to Enterprise Purchasing resources.
- Permissions (11): `enterprisepurchasing.gcveCuds.get`, `enterprisepurchasing.gcveCuds.list`, `enterprisepurchasing.gcveNodePricingInfo.list`, `enterprisepurchasing.licenseKeys.get`, `enterprisepurchasing.licenseKeys.list`, `enterprisepurchasing.locations.get`, `enterprisepurchasing.locations.list`, `enterprisepurchasing.operations.get`, `enterprisepurchasing.operations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Project):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/enterprisepurchasing.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `enterprisepurchasing.gcveCuds.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/enterprisepurchasing.admin` |
| `enterprisepurchasing.gcveCuds.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/enterprisepurchasing.admin`, `roles/enterprisepurchasing.editor`, `roles/enterprisepurchasing.viewer`, `roles/iam.supportUser` |
| `enterprisepurchasing.gcveCuds.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/enterprisepurchasing.admin`, `roles/enterprisepurchasing.editor`, `roles/enterprisepurchasing.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `enterprisepurchasing.gcveNodePricingInfo.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/enterprisepurchasing.admin`, `roles/enterprisepurchasing.editor`, `roles/enterprisepurchasing.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `enterprisepurchasing.licenseKeys.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/enterprisepurchasing.admin` |
| `enterprisepurchasing.licenseKeys.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/enterprisepurchasing.admin` |
| `enterprisepurchasing.licenseKeys.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/enterprisepurchasing.admin`, `roles/enterprisepurchasing.editor`, `roles/enterprisepurchasing.viewer`, `roles/iam.supportUser` |
| `enterprisepurchasing.licenseKeys.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/enterprisepurchasing.admin`, `roles/enterprisepurchasing.editor`, `roles/enterprisepurchasing.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `enterprisepurchasing.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/enterprisepurchasing.admin`, `roles/enterprisepurchasing.editor`, `roles/enterprisepurchasing.viewer`, `roles/iam.supportUser` |
| `enterprisepurchasing.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/enterprisepurchasing.admin`, `roles/enterprisepurchasing.editor`, `roles/enterprisepurchasing.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `enterprisepurchasing.operations.cancel` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/enterprisepurchasing.admin` |
| `enterprisepurchasing.operations.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/enterprisepurchasing.admin` |
| `enterprisepurchasing.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/enterprisepurchasing.admin`, `roles/enterprisepurchasing.editor`, `roles/enterprisepurchasing.viewer`, `roles/iam.supportUser` |
| `enterprisepurchasing.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/enterprisepurchasing.admin`, `roles/enterprisepurchasing.editor`, `roles/enterprisepurchasing.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |

## Notes

- Roles and permissions of the `enterprisepurchasing` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/enterprisepurchasing (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
