---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/bigquerymigration
---

# BigQuery Migration API IAM roles and permissions

## Signature / Usage

Predefined roles of `bigquerymigration` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Bigquerymigration Admin (`roles/bigquerymigration.admin`)

- Admin role for bigquerymigration
- Permissions (14): `bigquerymigration.subtasks.get`, `bigquerymigration.subtasks.list`, `bigquerymigration.translation.translate`, `bigquerymigration.workflows.create`, `bigquerymigration.workflows.delete`, `bigquerymigration.workflows.enableAiOutputTypes`, `bigquerymigration.workflows.enableLineageOutputTypes`, `bigquerymigration.workflows.enableOutputTypePermissions`, `bigquerymigration.workflows.get`, `bigquerymigration.workflows.list`, `bigquerymigration.workflows.orchestrateTask`, `bigquerymigration.workflows.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### MigrationWorkflow Editor (`roles/bigquerymigration.editor`)

- Editor of EDW migration workflows.
- Permissions (11): `bigquerymigration.subtasks.get`, `bigquerymigration.subtasks.list`, `bigquerymigration.translation.translate`, `bigquerymigration.workflows.create`, `bigquerymigration.workflows.delete`, `bigquerymigration.workflows.enableAiOutputTypes`, `bigquerymigration.workflows.enableLineageOutputTypes`, `bigquerymigration.workflows.enableOutputTypePermissions`, `bigquerymigration.workflows.get`, `bigquerymigration.workflows.list`, `bigquerymigration.workflows.update`

#### MigrationWorkflow Viewer (`roles/bigquerymigration.viewer`)

- Viewer of EDW migration MigrationWorkflow.
- Permissions (4): `bigquerymigration.subtasks.get`, `bigquerymigration.subtasks.list`, `bigquerymigration.workflows.get`, `bigquerymigration.workflows.list`

#### Migration Management Editor (`roles/bigquerymigration.migrationEditor`)

- Launch stage: Beta
- Admin of EDW migrations.
- Permissions: none listed on the source page.

#### Migration Management Viewer (`roles/bigquerymigration.migrationViewer`)

- Launch stage: Beta
- Viewer of EDW migrations.
- Permissions: none listed on the source page.

#### Task Orchestrator (`roles/bigquerymigration.orchestrator`)

- Orchestrator of EDW migration tasks.
- Permissions (2): `bigquerymigration.workflows.orchestrateTask`, `storage.objects.list`

#### Migration Translation User (`roles/bigquerymigration.translationUser`)

- User of EDW migration interactive SQL translation service.
- Permissions (1): `bigquerymigration.translation.translate`

#### Task Worker (`roles/bigquerymigration.worker`)

- Worker that executes EDW migration subtasks.
- Permissions (3): `storage.objects.create`, `storage.objects.get`, `storage.objects.list`

#### BigQuery Migration Service Agent (`roles/bigquerymigration.serviceAgent`)

- Access required for the BigQuery Migration Service to perform data discovery, metadata registration, and manage data transfers. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (1): `resourcemanager.projects.get`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/bigquerymigration.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `bigquerymigration.subtasks.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/bigquerymigration.admin`, `roles/bigquerymigration.editor`, `roles/bigquerymigration.viewer`, `roles/iam.supportUser` |
| `bigquerymigration.subtasks.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/bigquerymigration.admin`, `roles/bigquerymigration.editor`, `roles/bigquerymigration.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `bigquerymigration.translation.translate` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/bigquery.admin`, `roles/bigquery.studioAdmin`, `roles/bigquery.user`, `roles/bigquerymigration.admin`, `roles/bigquerymigration.editor`, `roles/bigquerymigration.translationUser`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.databasesAdmin` (+3 service agent roles) |
| `bigquerymigration.workflows.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/bigquerymigration.admin`, `roles/bigquerymigration.editor` |
| `bigquerymigration.workflows.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/bigquerymigration.admin`, `roles/bigquerymigration.editor` |
| `bigquerymigration.workflows.enableAiOutputTypes` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/bigquerymigration.admin`, `roles/bigquerymigration.editor` |
| `bigquerymigration.workflows.enableLineageOutputTypes` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/bigquerymigration.admin`, `roles/bigquerymigration.editor` |
| `bigquerymigration.workflows.enableOutputTypePermissions` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/bigquerymigration.admin`, `roles/bigquerymigration.editor` |
| `bigquerymigration.workflows.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/bigquerymigration.admin`, `roles/bigquerymigration.editor`, `roles/bigquerymigration.viewer`, `roles/iam.supportUser` |
| `bigquerymigration.workflows.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/bigquerymigration.admin`, `roles/bigquerymigration.editor`, `roles/bigquerymigration.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `bigquerymigration.workflows.orchestrateTask` | `roles/admin`, `roles/owner`, `roles/bigquerymigration.admin`, `roles/bigquerymigration.orchestrator` |
| `bigquerymigration.workflows.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/bigquerymigration.admin`, `roles/bigquerymigration.editor` |

## Notes

- Roles and permissions of the `bigquerymigration` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/bigquerymigration (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
