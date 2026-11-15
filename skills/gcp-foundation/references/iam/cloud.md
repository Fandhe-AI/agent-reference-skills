---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/cloud
---

# Google Cloud IAM roles and permissions

## Signature / Usage

Predefined roles of `cloud` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Cloud Admin (`roles/cloud.admin`)

- Launch stage: Beta
- Admin role for cloud
- Permissions (4): `cloud.locations.get`, `cloud.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud Viewer (`roles/cloud.viewer`)

- Launch stage: Beta
- Viewer role for cloud
- Permissions (4): `cloud.locations.get`, `cloud.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Location reader (`roles/cloud.locationReader`)

- Launch stage: Beta
- Read and enumerate locations available for resource creation.
- Permissions (2): `cloud.locations.get`, `cloud.locations.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Project):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/cloud.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `cloud.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloud.admin`, `roles/cloud.viewer`, `roles/cloud.locationReader`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` |
| `cloud.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloud.admin`, `roles/cloud.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/cloud.locationReader`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |

## Notes

- Roles and permissions of the `cloud` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/cloud (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
