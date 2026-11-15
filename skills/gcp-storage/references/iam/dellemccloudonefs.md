---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/dellemccloudonefs
---

# Dell EMC Cloud OneFS IAM roles and permissions

## Signature / Usage

Predefined roles of `dellemccloudonefs` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Dell EMC Cloud OneFS Admin (`roles/dellemccloudonefs.admin`)

- Launch stage: Beta
- This role is managed by Dell EMC, not Google.
- Permissions (14): `cloudonefs.isiloncloud.com/*`, `cloudonefs.isiloncloud.com/clusters.create`, `cloudonefs.isiloncloud.com/clusters.delete`, `cloudonefs.isiloncloud.com/clusters.get`, `cloudonefs.isiloncloud.com/clusters.list`, `cloudonefs.isiloncloud.com/clusters.update`, `cloudonefs.isiloncloud.com/clusters.updateAdvancedSettings`, `cloudonefs.isiloncloud.com/fileshares.create`, `cloudonefs.isiloncloud.com/fileshares.delete`, `cloudonefs.isiloncloud.com/fileshares.get`, `cloudonefs.isiloncloud.com/fileshares.list`, `cloudonefs.isiloncloud.com/fileshares.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Dell EMC Cloud OneFS Viewer (`roles/dellemccloudonefs.viewer`)

- Launch stage: Beta
- This role is managed by Dell EMC, not Google.
- Permissions (6): `cloudonefs.isiloncloud.com/clusters.get`, `cloudonefs.isiloncloud.com/clusters.list`, `cloudonefs.isiloncloud.com/fileshares.get`, `cloudonefs.isiloncloud.com/fileshares.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Dell EMC Cloud OneFS User (`roles/dellemccloudonefs.user`)

- Launch stage: Beta
- This role is managed by Dell EMC, not Google.
- Permissions (12): `cloudonefs.isiloncloud.com/clusters.create`, `cloudonefs.isiloncloud.com/clusters.delete`, `cloudonefs.isiloncloud.com/clusters.get`, `cloudonefs.isiloncloud.com/clusters.list`, `cloudonefs.isiloncloud.com/clusters.update`, `cloudonefs.isiloncloud.com/fileshares.create`, `cloudonefs.isiloncloud.com/fileshares.delete`, `cloudonefs.isiloncloud.com/fileshares.get`, `cloudonefs.isiloncloud.com/fileshares.list`, `cloudonefs.isiloncloud.com/fileshares.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Project):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/dellemccloudonefs.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `cloudonefs.isiloncloud.com/clusters.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/dellemccloudonefs.admin`, `roles/dellemccloudonefs.user` |
| `cloudonefs.isiloncloud.com/clusters.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/dellemccloudonefs.admin`, `roles/dellemccloudonefs.user` |
| `cloudonefs.isiloncloud.com/clusters.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/dellemccloudonefs.admin`, `roles/dellemccloudonefs.viewer`, `roles/dellemccloudonefs.user`, `roles/iam.supportUser` |
| `cloudonefs.isiloncloud.com/clusters.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/dellemccloudonefs.admin`, `roles/dellemccloudonefs.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/dellemccloudonefs.user`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `cloudonefs.isiloncloud.com/clusters.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/dellemccloudonefs.admin`, `roles/dellemccloudonefs.user` |
| `cloudonefs.isiloncloud.com/clusters.updateAdvancedSettings` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/dellemccloudonefs.admin` |
| `cloudonefs.isiloncloud.com/fileshares.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/dellemccloudonefs.admin`, `roles/dellemccloudonefs.user` |
| `cloudonefs.isiloncloud.com/fileshares.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/dellemccloudonefs.admin`, `roles/dellemccloudonefs.user` |
| `cloudonefs.isiloncloud.com/fileshares.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/dellemccloudonefs.admin`, `roles/dellemccloudonefs.viewer`, `roles/dellemccloudonefs.user`, `roles/iam.supportUser` |
| `cloudonefs.isiloncloud.com/fileshares.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/dellemccloudonefs.admin`, `roles/dellemccloudonefs.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/dellemccloudonefs.user`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `cloudonefs.isiloncloud.com/fileshares.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/dellemccloudonefs.admin`, `roles/dellemccloudonefs.user` |

## Notes

- Roles and permissions of the `dellemccloudonefs` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/dellemccloudonefs (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
