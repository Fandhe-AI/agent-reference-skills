---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/storagetransfer
---

# Storage Transfer Service IAM roles and permissions

## Signature / Usage

Predefined roles of `storagetransfer` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Storage Transfer Admin (`roles/storagetransfer.admin`)

- Create, update and manage transfer jobs and operations.
- Permissions (22): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `storagetransfer.agentpools.create`, `storagetransfer.agentpools.delete`, `storagetransfer.agentpools.get`, `storagetransfer.agentpools.list`, `storagetransfer.agentpools.report`, `storagetransfer.agentpools.update`, `storagetransfer.jobs.create`, `storagetransfer.jobs.delete`, `storagetransfer.jobs.get`, `storagetransfer.jobs.list`, `storagetransfer.jobs.run`, `storagetransfer.jobs.update`, `storagetransfer.operations.assign`, `storagetransfer.operations.cancel`, `storagetransfer.operations.get`, `storagetransfer.operations.list`, `storagetransfer.operations.pause`, `storagetransfer.operations.report`, `storagetransfer.operations.resume`, `storagetransfer.projects.getServiceAccount`

#### Storage Transfer Viewer (`roles/storagetransfer.viewer`)

- Read access to storage transfer jobs and operations.
- Permissions (9): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `storagetransfer.agentpools.get`, `storagetransfer.agentpools.list`, `storagetransfer.jobs.get`, `storagetransfer.jobs.list`, `storagetransfer.operations.get`, `storagetransfer.operations.list`, `storagetransfer.projects.getServiceAccount`

#### Storage Transfer Agent (`roles/storagetransfer.transferAgent`)

- Perform transfers from an agent.
- Permissions (15): `logging.logEntries.create`, `monitoring.timeSeries.create`, `pubsub.subscriptions.consume`, `pubsub.subscriptions.create`, `pubsub.subscriptions.delete`, `pubsub.subscriptions.get`, `pubsub.topics.attachSubscription`, `pubsub.topics.create`, `pubsub.topics.get`, `pubsub.topics.list`, `pubsub.topics.publish`, `storagetransfer.agentpools.report`, `storagetransfer.operations.assign`, `storagetransfer.operations.get`, `storagetransfer.operations.report`

#### Storage Transfer User (`roles/storagetransfer.user`)

- Create and update storage transfer jobs and operations.
- Permissions (20): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `storagetransfer.agentpools.create`, `storagetransfer.agentpools.get`, `storagetransfer.agentpools.list`, `storagetransfer.agentpools.report`, `storagetransfer.agentpools.update`, `storagetransfer.jobs.create`, `storagetransfer.jobs.get`, `storagetransfer.jobs.list`, `storagetransfer.jobs.run`, `storagetransfer.jobs.update`, `storagetransfer.operations.assign`, `storagetransfer.operations.cancel`, `storagetransfer.operations.get`, `storagetransfer.operations.list`, `storagetransfer.operations.pause`, `storagetransfer.operations.report`, `storagetransfer.operations.resume`, `storagetransfer.projects.getServiceAccount`

#### Storage Transfer Service Agent (`roles/storagetransfer.serviceAgent`)

- Grants Storage Transfer Service Agent permissions required to run transfers > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (11): `pubsub.subscriptions.consume`, `pubsub.subscriptions.create`, `pubsub.subscriptions.delete`, `pubsub.subscriptions.get`, `pubsub.subscriptions.update`, `pubsub.topics.attachSubscription`, `pubsub.topics.create`, `pubsub.topics.delete`, `pubsub.topics.get`, `pubsub.topics.publish`, `pubsub.topics.update`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Project):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/storagetransfer.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `storagetransfer.agentpools.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/storagetransfer.admin`, `roles/storagetransfer.user` |
| `storagetransfer.agentpools.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/storagetransfer.admin` |
| `storagetransfer.agentpools.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/storagetransfer.admin`, `roles/storagetransfer.viewer`, `roles/iam.supportUser`, `roles/storagetransfer.user` |
| `storagetransfer.agentpools.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/storagetransfer.admin`, `roles/storagetransfer.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/storagetransfer.user`, `roles/wiz.cloudInventoryViewer` |
| `storagetransfer.agentpools.report` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/storagetransfer.admin`, `roles/storagetransfer.transferAgent`, `roles/storagetransfer.user` |
| `storagetransfer.agentpools.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/storagetransfer.admin`, `roles/storagetransfer.user` |
| `storagetransfer.jobs.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/storagetransfer.admin`, `roles/storagetransfer.user` |
| `storagetransfer.jobs.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/storagetransfer.admin` |
| `storagetransfer.jobs.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/storagetransfer.admin`, `roles/storagetransfer.viewer`, `roles/iam.supportUser`, `roles/storagetransfer.user` |
| `storagetransfer.jobs.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/storagetransfer.admin`, `roles/storagetransfer.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/storagetransfer.user`, `roles/wiz.cloudInventoryViewer` |
| `storagetransfer.jobs.run` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/storagetransfer.admin`, `roles/storagetransfer.user` |
| `storagetransfer.jobs.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/storagetransfer.admin`, `roles/storagetransfer.user` |
| `storagetransfer.operations.assign` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/storagetransfer.admin`, `roles/storagetransfer.transferAgent`, `roles/storagetransfer.user` |
| `storagetransfer.operations.cancel` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/storagetransfer.admin`, `roles/storagetransfer.user` |
| `storagetransfer.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/storagetransfer.admin`, `roles/storagetransfer.viewer`, `roles/iam.supportUser`, `roles/storagetransfer.transferAgent`, `roles/storagetransfer.user` |
| `storagetransfer.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/storagetransfer.admin`, `roles/storagetransfer.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/storagetransfer.user` |
| `storagetransfer.operations.pause` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/storagetransfer.admin`, `roles/storagetransfer.user` |
| `storagetransfer.operations.report` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/storagetransfer.admin`, `roles/storagetransfer.transferAgent`, `roles/storagetransfer.user` |
| `storagetransfer.operations.resume` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/storagetransfer.admin`, `roles/storagetransfer.user` |
| `storagetransfer.projects.getServiceAccount` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/storagetransfer.admin`, `roles/storagetransfer.viewer`, `roles/iam.supportUser`, `roles/storagetransfer.user` |

## Notes

- Roles and permissions of the `storagetransfer` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/storagetransfer (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
