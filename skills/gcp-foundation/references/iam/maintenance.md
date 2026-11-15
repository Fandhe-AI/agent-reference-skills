---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/maintenance
---

# Maintenance API IAM roles and permissions

## Signature / Usage

Predefined roles of `maintenance` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Maintenance Admin (`roles/maintenance.admin`)

- Admin role for maintenance
- Permissions (6): `maintenance.locations.get`, `maintenance.locations.list`, `maintenance.resourceMaintenances.get`, `maintenance.resourceMaintenances.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Maintenance API Viewer (`roles/maintenance.viewer`)

- Readonly access to Maintenance API resources.
- Permissions (6): `maintenance.locations.get`, `maintenance.locations.list`, `maintenance.resourceMaintenances.get`, `maintenance.resourceMaintenances.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Project):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/maintenance.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `maintenance.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/maintenance.admin`, `roles/maintenance.viewer`, `roles/cloudhub.operator`, `roles/iam.supportUser` |
| `maintenance.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/maintenance.admin`, `roles/maintenance.viewer`, `roles/cloudhub.operator`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `maintenance.resourceMaintenances.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/maintenance.admin`, `roles/maintenance.viewer`, `roles/cloudhub.operator`, `roles/iam.supportUser` |
| `maintenance.resourceMaintenances.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/maintenance.admin`, `roles/maintenance.viewer`, `roles/cloudhub.operator`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |

## Notes

- Roles and permissions of the `maintenance` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/maintenance (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
