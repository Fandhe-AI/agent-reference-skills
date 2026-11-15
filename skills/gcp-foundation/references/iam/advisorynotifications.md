---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/advisorynotifications
---

# Advisory Notifications IAM roles and permissions

## Signature / Usage

Predefined roles of `advisorynotifications` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Advisory Notifications Admin (`roles/advisorynotifications.admin`)

- Grants write access to settings in Advisory Notifications
- Permissions (6): `advisorynotifications.notifications.get`, `advisorynotifications.notifications.list`, `advisorynotifications.settings.get`, `advisorynotifications.settings.update`, `resourcemanager.organizations.get`, `resourcemanager.projects.get`

#### Advisory Notifications Viewer (`roles/advisorynotifications.viewer`)

- Grants view access in Advisory Notifications
- Permissions (5): `advisorynotifications.notifications.get`, `advisorynotifications.notifications.list`, `advisorynotifications.settings.get`, `resourcemanager.organizations.get`, `resourcemanager.projects.get`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Project):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/advisorynotifications.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `advisorynotifications.notifications.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/advisorynotifications.admin`, `roles/advisorynotifications.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `advisorynotifications.notifications.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/advisorynotifications.admin`, `roles/advisorynotifications.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `advisorynotifications.settings.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/advisorynotifications.admin`, `roles/advisorynotifications.viewer`, `roles/iam.supportUser` |
| `advisorynotifications.settings.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/advisorynotifications.admin` |

## Notes

- Roles and permissions of the `advisorynotifications` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/advisorynotifications (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
