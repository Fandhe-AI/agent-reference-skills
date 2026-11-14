---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/resourcesettings
---

# Resource Settings IAM roles and permissions

## Signature / Usage

Predefined roles of `resourcesettings` (role ID, description, included permissions). The permissions table below lists the roles that contain each permission.

### Roles

### Resource Settings Administrator (`roles/resourcesettings.admin`)

- Provides admin capabilities to set Resource Setting Values on resources. Lowest-level resources where you can grant this role: - Organization
- Permissions (4): `resourcesettings.*`, `resourcesettings.settings.get`, `resourcesettings.settings.list`, `resourcesettings.settings.update`

### Resource Settings Viewer (`roles/resourcesettings.viewer`)

- Provides capabilities to view Resource Settings and Resource Setting Values on resources.
- Permissions (2): `resourcesettings.settings.get`, `resourcesettings.settings.list`

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `resourcesettings.settings.get` | [Admin](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/admin`) [Owner (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/owner`) [Writer](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/writer`) [Editor (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/editor`) [Reader](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/reader`) [Viewer (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/viewer`) [Resource Settings Administrator](https://docs.cloud.google.com/iam/docs/roles-permissions/resourcesettings#resourcesettings.admin) (`roles/resourcesettings.admin`) [Resource Settings Viewer](https://docs.cloud.google.com/iam/docs/roles-permissions/resourcesettings#resourcesettings.viewer) (`roles/resourcesettings.viewer`) [Support User](https://docs.cloud.google.com/iam/docs/roles-permissions/jobfunctions#iam.supportUser) (`roles/iam.supportUser`) |
| `resourcesettings.settings.list` | [Admin](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/admin`) [Owner (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/owner`) [Writer](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/writer`) [Editor (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/editor`) [Reader](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/reader`) [Viewer (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/viewer`) [Security Admin](https://docs.cloud.google.com/iam/docs/roles-permissions/iam#iam.securityAdmin) (`roles/iam.securityAdmin`) [Security Reviewer](https://docs.cloud.google.com/iam/docs/roles-permissions/iam#iam.securityReviewer) (`roles/iam.securityReviewer`) [Resource Settings Administrator](https://docs.cloud.google.com/iam/docs/roles-permissions/resourcesettings#resourcesettings.admin) (`roles/resourcesettings.admin`) [Resource Settings Viewer](https://docs.cloud.google.com/iam/docs/roles-permissions/resourcesettings#resourcesettings.viewer) (`roles/resourcesettings.viewer`) [Security Auditor](https://docs.cloud.google.com/iam/docs/roles-permissions/jobfunctions#iam.securityAuditor) (`roles/iam.securityAuditor`) [Support User](https://docs.cloud.google.com/iam/docs/roles-permissions/jobfunctions#iam.supportUser) (`roles/iam.supportUser`) |
| `resourcesettings.settings.update` | [Resource Settings Administrator](https://docs.cloud.google.com/iam/docs/roles-permissions/resourcesettings#resourcesettings.admin) (`roles/resourcesettings.admin`) |

## Notes

- Roles and permissions of the `resourcesettings` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/resourcesettings (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
