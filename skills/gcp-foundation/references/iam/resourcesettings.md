---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/resourcesettings
---

# Resource Settings IAM roles and permissions

## Signature / Usage

Predefined roles of `resourcesettings` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Resource Settings Administrator (`roles/resourcesettings.admin`)

- Provides admin capabilities to set Resource Setting Values on resources. Lowest-level resources where you can grant this role: - Organization
- Permissions (3): `resourcesettings.settings.get`, `resourcesettings.settings.list`, `resourcesettings.settings.update`

#### Resource Settings Viewer (`roles/resourcesettings.viewer`)

- Provides capabilities to view Resource Settings and Resource Setting Values on resources.
- Permissions (2): `resourcesettings.settings.get`, `resourcesettings.settings.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Organization):

```bash
gcloud organizations add-iam-policy-binding ORGANIZATION_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/resourcesettings.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `resourcesettings.settings.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/resourcesettings.admin`, `roles/resourcesettings.viewer`, `roles/iam.supportUser` |
| `resourcesettings.settings.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/resourcesettings.admin`, `roles/resourcesettings.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `resourcesettings.settings.update` | `roles/resourcesettings.admin` |

## Notes

- Roles and permissions of the `resourcesettings` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/resourcesettings (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
