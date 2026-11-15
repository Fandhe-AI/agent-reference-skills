---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/cloudlocationfinder
---

# Cloud Location Finder IAM roles and permissions

## Signature / Usage

Predefined roles of `cloudlocationfinder` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Cloud Location Finder Admin (`roles/cloudlocationfinder.admin`)

- Launch stage: Beta
- Full access to Cloud Location Finder resources.
- Permissions (10): `cloudlocationfinder.cloudLocations.create`, `cloudlocationfinder.cloudLocations.delete`, `cloudlocationfinder.cloudLocations.get`, `cloudlocationfinder.cloudLocations.list`, `cloudlocationfinder.cloudLocations.search`, `cloudlocationfinder.cloudLocations.update`, `cloudlocationfinder.locations.get`, `cloudlocationfinder.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud Location Finder Viewer (`roles/cloudlocationfinder.viewer`)

- Launch stage: Beta
- Readonly access to Cloud Location Finder resources.
- Permissions (7): `cloudlocationfinder.cloudLocations.get`, `cloudlocationfinder.cloudLocations.list`, `cloudlocationfinder.cloudLocations.search`, `cloudlocationfinder.locations.get`, `cloudlocationfinder.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Project):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/cloudlocationfinder.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `cloudlocationfinder.cloudLocations.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudlocationfinder.admin` |
| `cloudlocationfinder.cloudLocations.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudlocationfinder.admin` |
| `cloudlocationfinder.cloudLocations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudlocationfinder.admin`, `roles/cloudlocationfinder.viewer`, `roles/iam.supportUser` |
| `cloudlocationfinder.cloudLocations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudlocationfinder.admin`, `roles/cloudlocationfinder.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `cloudlocationfinder.cloudLocations.search` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudlocationfinder.admin`, `roles/cloudlocationfinder.viewer`, `roles/iam.supportUser` |
| `cloudlocationfinder.cloudLocations.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudlocationfinder.admin` |
| `cloudlocationfinder.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudlocationfinder.admin`, `roles/cloudlocationfinder.viewer`, `roles/iam.supportUser` |
| `cloudlocationfinder.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudlocationfinder.admin`, `roles/cloudlocationfinder.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |

## Notes

- Roles and permissions of the `cloudlocationfinder` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/cloudlocationfinder (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
