---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/transferappliance
---

# Transfer Appliance IAM roles and permissions

## Signature / Usage

Predefined roles of `transferappliance` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Transfer Appliance Admin (`roles/transferappliance.admin`)

- Launch stage: Beta
- Full access to Transfer Appliance all resources.
- Permissions (24): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `transferappliance.appliances.create`, `transferappliance.appliances.delete`, `transferappliance.appliances.get`, `transferappliance.appliances.list`, `transferappliance.appliances.update`, `transferappliance.credentials.get`, `transferappliance.locations.get`, `transferappliance.locations.list`, `transferappliance.operations.cancel`, `transferappliance.operations.delete`, `transferappliance.operations.get`, `transferappliance.operations.list`, `transferappliance.orders.create`, `transferappliance.orders.delete`, `transferappliance.orders.get`, `transferappliance.orders.list`, `transferappliance.orders.update`, `transferappliance.savedAddresses.create`, `transferappliance.savedAddresses.delete`, `transferappliance.savedAddresses.get`, `transferappliance.savedAddresses.list`, `transferappliance.savedAddresses.update`

#### Transfer Appliance Viewer (`roles/transferappliance.viewer`)

- Launch stage: Beta
- Read-only access to Transfer Appliance all resources.
- Permissions (12): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `transferappliance.appliances.get`, `transferappliance.appliances.list`, `transferappliance.locations.get`, `transferappliance.locations.list`, `transferappliance.operations.get`, `transferappliance.operations.list`, `transferappliance.orders.get`, `transferappliance.orders.list`, `transferappliance.savedAddresses.get`, `transferappliance.savedAddresses.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/transferappliance.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `transferappliance.appliances.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/transferappliance.admin` |
| `transferappliance.appliances.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/transferappliance.admin` |
| `transferappliance.appliances.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/transferappliance.admin`, `roles/transferappliance.viewer`, `roles/iam.supportUser` |
| `transferappliance.appliances.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/transferappliance.admin`, `roles/transferappliance.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `transferappliance.appliances.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/transferappliance.admin` |
| `transferappliance.credentials.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/transferappliance.admin`, `roles/iam.supportUser` |
| `transferappliance.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/transferappliance.admin`, `roles/transferappliance.viewer`, `roles/iam.supportUser` |
| `transferappliance.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/transferappliance.admin`, `roles/transferappliance.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `transferappliance.operations.cancel` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/transferappliance.admin` |
| `transferappliance.operations.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/transferappliance.admin` |
| `transferappliance.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/transferappliance.admin`, `roles/transferappliance.viewer`, `roles/iam.supportUser` |
| `transferappliance.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/transferappliance.admin`, `roles/transferappliance.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `transferappliance.orders.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/transferappliance.admin` |
| `transferappliance.orders.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/transferappliance.admin` |
| `transferappliance.orders.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/transferappliance.admin`, `roles/transferappliance.viewer`, `roles/iam.supportUser` |
| `transferappliance.orders.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/transferappliance.admin`, `roles/transferappliance.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `transferappliance.orders.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/transferappliance.admin` |
| `transferappliance.savedAddresses.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/transferappliance.admin` |
| `transferappliance.savedAddresses.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/transferappliance.admin` |
| `transferappliance.savedAddresses.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/transferappliance.admin`, `roles/transferappliance.viewer`, `roles/iam.supportUser` |
| `transferappliance.savedAddresses.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/transferappliance.admin`, `roles/transferappliance.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `transferappliance.savedAddresses.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/transferappliance.admin` |

## Notes

- Roles and permissions of the `transferappliance` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/transferappliance (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
