---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/databasecenter
---

# Database Center IAM roles and permissions

## Signature / Usage

Predefined roles of `databasecenter` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

### Database Center Admin (`roles/databasecenter.admin`)

- Admin role for Database Center resource data
- Permissions (23): `cloudaicompanion.entitlements.get`, `databasecenter.databaseGroups.list`, `databasecenter.fleetHealthStats.list`, `databasecenter.fleetInsights.list`, `databasecenter.fleetStats.list`, `databasecenter.locations.list`, `databasecenter.products.list`, `databasecenter.queryStats.list`, `databasecenter.reportConfigs.create`, `databasecenter.reportConfigs.delete`, `databasecenter.reportConfigs.get`, `databasecenter.reportConfigs.list`, `databasecenter.reportConfigs.update`, `databasecenter.userLabels.list`, `databasecenter.userTags.list`, `databasesconsole.databaseCenterViews.create`, `databasesconsole.databaseCenterViews.delete`, `databasesconsole.databaseCenterViews.search`, `databasesconsole.databaseCenterViews.update`, `databasesconsole.locations.get`, `databasesconsole.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Database Center Viewer (`roles/databasecenter.viewer`)

- Viewer role for Database Center resource data
- Permissions (17): `cloudaicompanion.entitlements.get`, `databasecenter.databaseGroups.list`, `databasecenter.fleetHealthStats.list`, `databasecenter.fleetInsights.list`, `databasecenter.fleetStats.list`, `databasecenter.locations.list`, `databasecenter.products.list`, `databasecenter.queryStats.list`, `databasecenter.reportConfigs.get`, `databasecenter.reportConfigs.list`, `databasecenter.userLabels.list`, `databasecenter.userTags.list`, `databasesconsole.databaseCenterViews.search`, `databasesconsole.locations.get`, `databasesconsole.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Project):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/databasecenter.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `databasecenter.databaseGroups.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/databasecenter.admin`, `roles/databasecenter.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+1 service agent role) |
| `databasecenter.fleetHealthStats.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/databasecenter.admin`, `roles/databasecenter.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `databasecenter.fleetInsights.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/databasecenter.admin`, `roles/databasecenter.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `databasecenter.fleetStats.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/databasecenter.admin`, `roles/databasecenter.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+1 service agent role) |
| `databasecenter.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/databasecenter.admin`, `roles/databasecenter.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `databasecenter.products.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/databasecenter.admin`, `roles/databasecenter.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `databasecenter.queryStats.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/databasecenter.admin`, `roles/databasecenter.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `databasecenter.reportConfigs.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/databasecenter.admin` |
| `databasecenter.reportConfigs.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/databasecenter.admin` |
| `databasecenter.reportConfigs.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/databasecenter.admin`, `roles/databasecenter.viewer`, `roles/iam.supportUser` |
| `databasecenter.reportConfigs.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/databasecenter.admin`, `roles/databasecenter.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `databasecenter.reportConfigs.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/databasecenter.admin` |
| `databasecenter.userLabels.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/databasecenter.admin`, `roles/databasecenter.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+1 service agent role) |
| `databasecenter.userTags.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/databasecenter.admin`, `roles/databasecenter.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+1 service agent role) |

## Notes

- Roles and permissions of the `databasecenter` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/databasecenter (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
