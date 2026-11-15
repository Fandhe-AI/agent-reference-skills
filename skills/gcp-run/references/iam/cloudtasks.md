---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/cloudtasks
---

# Cloud Tasks IAM roles and permissions

## Signature / Usage

Predefined roles of `cloudtasks` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Cloud Tasks Admin (`roles/cloudtasks.admin`)

- Full access to queues and tasks.
- Permissions (24): `cloudtasks.cmekConfig.get`, `cloudtasks.cmekConfig.update`, `cloudtasks.locations.get`, `cloudtasks.locations.list`, `cloudtasks.operations.get`, `cloudtasks.queues.create`, `cloudtasks.queues.delete`, `cloudtasks.queues.get`, `cloudtasks.queues.getIamPolicy`, `cloudtasks.queues.list`, `cloudtasks.queues.pause`, `cloudtasks.queues.purge`, `cloudtasks.queues.resume`, `cloudtasks.queues.setIamPolicy`, `cloudtasks.queues.update`, `cloudtasks.tasks.create`, `cloudtasks.tasks.delete`, `cloudtasks.tasks.fullView`, `cloudtasks.tasks.get`, `cloudtasks.tasks.list`, `cloudtasks.tasks.run`, `monitoring.timeSeries.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud Tasks Editor (`roles/cloudtasks.editor`)

- Editor role for cloudtasks
- Permissions (21): `cloudtasks.cmekConfig.get`, `cloudtasks.locations.get`, `cloudtasks.locations.list`, `cloudtasks.operations.get`, `cloudtasks.queues.create`, `cloudtasks.queues.delete`, `cloudtasks.queues.get`, `cloudtasks.queues.list`, `cloudtasks.queues.pause`, `cloudtasks.queues.purge`, `cloudtasks.queues.resume`, `cloudtasks.queues.update`, `cloudtasks.tasks.create`, `cloudtasks.tasks.delete`, `cloudtasks.tasks.fullView`, `cloudtasks.tasks.get`, `cloudtasks.tasks.list`, `cloudtasks.tasks.run`, `monitoring.timeSeries.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud Tasks Viewer (`roles/cloudtasks.viewer`)

- Get and list access to tasks, queues, and locations.
- Permissions (12): `cloudtasks.cmekConfig.get`, `cloudtasks.locations.get`, `cloudtasks.locations.list`, `cloudtasks.operations.get`, `cloudtasks.queues.get`, `cloudtasks.queues.list`, `cloudtasks.tasks.fullView`, `cloudtasks.tasks.get`, `cloudtasks.tasks.list`, `monitoring.timeSeries.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud Tasks Enqueuer (`roles/cloudtasks.enqueuer`)

- Launch stage: Beta
- Access to create tasks.
- Permissions (5): `cloudtasks.operations.get`, `cloudtasks.tasks.create`, `cloudtasks.tasks.fullView`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud Tasks Queue Admin (`roles/cloudtasks.queueAdmin`)

- Admin access to queues.
- Permissions (14): `cloudtasks.locations.get`, `cloudtasks.locations.list`, `cloudtasks.queues.create`, `cloudtasks.queues.delete`, `cloudtasks.queues.get`, `cloudtasks.queues.getIamPolicy`, `cloudtasks.queues.list`, `cloudtasks.queues.pause`, `cloudtasks.queues.purge`, `cloudtasks.queues.resume`, `cloudtasks.queues.setIamPolicy`, `cloudtasks.queues.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud Tasks Task Deleter (`roles/cloudtasks.taskDeleter`)

- Access to delete tasks.
- Permissions (3): `cloudtasks.tasks.delete`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud Tasks Task Runner (`roles/cloudtasks.taskRunner`)

- Launch stage: Beta
- Access to run tasks.
- Permissions (4): `cloudtasks.tasks.fullView`, `cloudtasks.tasks.run`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud Tasks Service Agent (`roles/cloudtasks.serviceAgent`)

- Grants Cloud Tasks Service Account access to manage resources. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (3): `iam.serviceAccounts.getAccessToken`, `iam.serviceAccounts.getOpenIdToken`, `logging.logEntries.create`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Project):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/cloudtasks.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `cloudtasks.cmekConfig.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudtasks.admin`, `roles/cloudtasks.editor`, `roles/cloudtasks.viewer`, `roles/iam.supportUser` |
| `cloudtasks.cmekConfig.update` | `roles/admin`, `roles/owner`, `roles/cloudtasks.admin` |
| `cloudtasks.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudtasks.admin`, `roles/cloudtasks.editor`, `roles/cloudtasks.viewer`, `roles/cloudtasks.queueAdmin`, `roles/iam.supportUser` (+1 service agent role) |
| `cloudtasks.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudtasks.admin`, `roles/cloudtasks.editor`, `roles/cloudtasks.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/cloudtasks.queueAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` (+1 service agent role) |
| `cloudtasks.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudtasks.admin`, `roles/cloudtasks.editor`, `roles/cloudtasks.viewer`, `roles/cloudtasks.enqueuer`, `roles/iam.supportUser` |
| `cloudtasks.queues.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudtasks.admin`, `roles/cloudtasks.editor`, `roles/cloudtasks.queueAdmin` (+2 service agent roles) |
| `cloudtasks.queues.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudtasks.admin`, `roles/cloudtasks.editor`, `roles/cloudtasks.queueAdmin` (+2 service agent roles) |
| `cloudtasks.queues.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudtasks.admin`, `roles/cloudtasks.editor`, `roles/cloudtasks.viewer`, `roles/cloudtasks.queueAdmin`, `roles/iam.supportUser` (+2 service agent roles) |
| `cloudtasks.queues.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/cloudtasks.admin`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/cloudtasks.queueAdmin`, `roles/iam.securityAuditor` (+1 service agent role) |
| `cloudtasks.queues.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudtasks.admin`, `roles/cloudtasks.editor`, `roles/cloudtasks.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/cloudtasks.queueAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` (+1 service agent role) |
| `cloudtasks.queues.pause` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudtasks.admin`, `roles/cloudtasks.editor`, `roles/cloudtasks.queueAdmin` (+1 service agent role) |
| `cloudtasks.queues.purge` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudtasks.admin`, `roles/cloudtasks.editor`, `roles/cloudtasks.queueAdmin` (+1 service agent role) |
| `cloudtasks.queues.resume` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudtasks.admin`, `roles/cloudtasks.editor`, `roles/cloudtasks.queueAdmin` (+1 service agent role) |
| `cloudtasks.queues.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/cloudtasks.admin`, `roles/iam.securityAdmin`, `roles/cloudtasks.queueAdmin` (+1 service agent role) |
| `cloudtasks.queues.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudtasks.admin`, `roles/cloudtasks.editor`, `roles/cloudtasks.queueAdmin` (+1 service agent role) |
| `cloudtasks.tasks.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudtasks.admin`, `roles/cloudtasks.editor`, `roles/cloudtasks.enqueuer` (+1 service agent role) |
| `cloudtasks.tasks.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudtasks.admin`, `roles/cloudtasks.editor`, `roles/cloudtasks.taskDeleter` |
| `cloudtasks.tasks.fullView` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudtasks.admin`, `roles/cloudtasks.editor`, `roles/cloudtasks.viewer`, `roles/cloudtasks.enqueuer`, `roles/cloudtasks.taskRunner`, `roles/iam.supportUser` (+1 service agent role) |
| `cloudtasks.tasks.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudtasks.admin`, `roles/cloudtasks.editor`, `roles/cloudtasks.viewer`, `roles/iam.supportUser` |
| `cloudtasks.tasks.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudtasks.admin`, `roles/cloudtasks.editor`, `roles/cloudtasks.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `cloudtasks.tasks.run` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudtasks.admin`, `roles/cloudtasks.editor`, `roles/cloudtasks.taskRunner` |

## Notes

- Roles and permissions of the `cloudtasks` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/cloudtasks (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
