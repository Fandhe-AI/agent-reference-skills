---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/databasesconsole
---

# Studio Query IAM roles and permissions

## Signature / Usage

Predefined roles of `databasesconsole` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Databasesconsole Editor (`roles/databasesconsole.editor`)

- Launch stage: Beta
- Editor role for databasesconsole
- Permissions (16): `databasesconsole.databaseCenterViews.create`, `databasesconsole.databaseCenterViews.delete`, `databasesconsole.databaseCenterViews.search`, `databasesconsole.databaseCenterViews.update`, `databasesconsole.locations.get`, `databasesconsole.locations.list`, `databasesconsole.operations.cancel`, `databasesconsole.operations.delete`, `databasesconsole.operations.get`, `databasesconsole.operations.list`, `databasesconsole.studioQueries.create`, `databasesconsole.studioQueries.delete`, `databasesconsole.studioQueries.search`, `databasesconsole.studioQueries.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Databasesconsole Viewer (`roles/databasesconsole.viewer`)

- Launch stage: Beta
- Viewer role for databasesconsole
- Permissions (8): `databasesconsole.databaseCenterViews.search`, `databasesconsole.locations.get`, `databasesconsole.locations.list`, `databasesconsole.operations.get`, `databasesconsole.operations.list`, `databasesconsole.studioQueries.search`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Studio Query Admin (`roles/databasesconsole.studioQueryAdmin`)

- Launch stage: Beta
- Full access to Studio Query resources.
- Permissions (14): `databasesconsole.locations.get`, `databasesconsole.locations.list`, `databasesconsole.operations.cancel`, `databasesconsole.operations.delete`, `databasesconsole.operations.get`, `databasesconsole.operations.list`, `databasesconsole.studioQueries.create`, `databasesconsole.studioQueries.delete`, `databasesconsole.studioQueries.get`, `databasesconsole.studioQueries.list`, `databasesconsole.studioQueries.search`, `databasesconsole.studioQueries.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Studio Query User (`roles/databasesconsole.studioQueryUser`)

- Launch stage: Beta
- Access to create, update, search and delete studio queries.
- Permissions (10): `databasesconsole.locations.get`, `databasesconsole.locations.list`, `databasesconsole.operations.get`, `databasesconsole.operations.list`, `databasesconsole.studioQueries.create`, `databasesconsole.studioQueries.delete`, `databasesconsole.studioQueries.search`, `databasesconsole.studioQueries.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Project):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/databasesconsole.editor"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `databasesconsole.databaseCenterViews.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/databasecenter.admin`, `roles/databasesconsole.editor` |
| `databasesconsole.databaseCenterViews.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/databasecenter.admin`, `roles/databasesconsole.editor` |
| `databasesconsole.databaseCenterViews.search` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/databasecenter.admin`, `roles/databasecenter.viewer`, `roles/databasesconsole.editor`, `roles/databasesconsole.viewer`, `roles/iam.supportUser` |
| `databasesconsole.databaseCenterViews.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/databasecenter.admin`, `roles/databasesconsole.editor` |
| `databasesconsole.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/alloydb.admin`, `roles/cloudsql.admin`, `roles/databasecenter.admin`, `roles/databasecenter.viewer`, `roles/databasesconsole.editor`, `roles/databasesconsole.viewer`, `roles/datastore.admin`, `roles/datastore.editor`, `roles/datastore.owner`, `roles/datastore.user`, `roles/datastore.viewer`, `roles/firebase.admin`, `roles/alloydb.databaseUser`, `roles/cloudsql.studioUser`, `roles/databasesconsole.studioQueryAdmin`, `roles/databasesconsole.studioQueryUser`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/firebase.developAdmin`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.supportUser` (+3 service agent roles) |
| `databasesconsole.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/alloydb.admin`, `roles/cloudsql.admin`, `roles/databasecenter.admin`, `roles/databasecenter.viewer`, `roles/databasesconsole.editor`, `roles/databasesconsole.viewer`, `roles/datastore.admin`, `roles/datastore.editor`, `roles/datastore.owner`, `roles/datastore.user`, `roles/datastore.viewer`, `roles/firebase.admin`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/alloydb.databaseUser`, `roles/cloudsql.studioUser`, `roles/databasesconsole.studioQueryAdmin`, `roles/databasesconsole.studioQueryUser`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/firebase.developAdmin`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+3 service agent roles) |
| `databasesconsole.operations.cancel` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/databasesconsole.editor`, `roles/databasesconsole.studioQueryAdmin` |
| `databasesconsole.operations.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/databasesconsole.editor`, `roles/databasesconsole.studioQueryAdmin` |
| `databasesconsole.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/databasesconsole.editor`, `roles/databasesconsole.viewer`, `roles/databasesconsole.studioQueryAdmin`, `roles/databasesconsole.studioQueryUser`, `roles/iam.supportUser` |
| `databasesconsole.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/databasesconsole.editor`, `roles/databasesconsole.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/databasesconsole.studioQueryAdmin`, `roles/databasesconsole.studioQueryUser`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `databasesconsole.studioQueries.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/alloydb.admin`, `roles/cloudsql.admin`, `roles/databasesconsole.editor`, `roles/datastore.owner`, `roles/datastore.user`, `roles/firebase.admin`, `roles/databasesconsole.studioQueryAdmin`, `roles/databasesconsole.studioQueryUser`, `roles/firebase.developAdmin`, `roles/iam.databasesAdmin` (+3 service agent roles) |
| `databasesconsole.studioQueries.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/alloydb.admin`, `roles/cloudsql.admin`, `roles/databasesconsole.editor`, `roles/datastore.owner`, `roles/datastore.user`, `roles/firebase.admin`, `roles/databasesconsole.studioQueryAdmin`, `roles/databasesconsole.studioQueryUser`, `roles/firebase.developAdmin`, `roles/iam.databasesAdmin` (+3 service agent roles) |
| `databasesconsole.studioQueries.get` | `roles/admin`, `roles/owner`, `roles/alloydb.admin`, `roles/cloudsql.admin`, `roles/datastore.owner`, `roles/firebase.admin`, `roles/databasesconsole.studioQueryAdmin`, `roles/firebase.developAdmin`, `roles/iam.databasesAdmin` (+1 service agent role) |
| `databasesconsole.studioQueries.list` | `roles/admin`, `roles/owner`, `roles/alloydb.admin`, `roles/cloudsql.admin`, `roles/datastore.owner`, `roles/firebase.admin`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/databasesconsole.studioQueryAdmin`, `roles/firebase.developAdmin`, `roles/iam.databasesAdmin`, `roles/iam.securityAuditor` (+1 service agent role) |
| `databasesconsole.studioQueries.search` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/alloydb.admin`, `roles/cloudsql.admin`, `roles/databasesconsole.editor`, `roles/databasesconsole.viewer`, `roles/datastore.admin`, `roles/datastore.editor`, `roles/datastore.owner`, `roles/datastore.user`, `roles/datastore.viewer`, `roles/firebase.admin`, `roles/alloydb.databaseUser`, `roles/cloudsql.studioUser`, `roles/databasesconsole.studioQueryAdmin`, `roles/databasesconsole.studioQueryUser`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/firebase.developAdmin`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.supportUser` (+3 service agent roles) |
| `databasesconsole.studioQueries.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/alloydb.admin`, `roles/cloudsql.admin`, `roles/databasesconsole.editor`, `roles/datastore.owner`, `roles/datastore.user`, `roles/firebase.admin`, `roles/databasesconsole.studioQueryAdmin`, `roles/databasesconsole.studioQueryUser`, `roles/firebase.developAdmin`, `roles/iam.databasesAdmin` (+3 service agent roles) |

## Notes

- Roles and permissions of the `databasesconsole` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/databasesconsole (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
