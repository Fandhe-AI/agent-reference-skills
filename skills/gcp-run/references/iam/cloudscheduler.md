---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/cloudscheduler
---

# Cloud Scheduler IAM roles and permissions

## Signature / Usage

Predefined roles of `cloudscheduler` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Cloud Scheduler Admin (`roles/cloudscheduler.admin`)

- Full access to jobs and executions. Note that a Cloud Scheduler Admin (or any custom role with the permission cloudscheduler.jobs.create) can create jobs that publish to any Pub/Sub topics within the project. Lowest-level resources where you can grant this role: - Project
- Permissions (26): `appengine.applications.get`, `cloudscheduler.jobs.create`, `cloudscheduler.jobs.delete`, `cloudscheduler.jobs.enable`, `cloudscheduler.jobs.fullView`, `cloudscheduler.jobs.get`, `cloudscheduler.jobs.list`, `cloudscheduler.jobs.pause`, `cloudscheduler.jobs.run`, `cloudscheduler.jobs.update`, `cloudscheduler.locations.get`, `cloudscheduler.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `serviceusage.catalogs.listMembers`, `serviceusage.consumerpolicy.analyze`, `serviceusage.consumerpolicy.get`, `serviceusage.effectivepolicy.get`, `serviceusage.groups.list`, `serviceusage.groups.listExpandedMembers`, `serviceusage.groups.listMembers`, `serviceusage.services.get`, `serviceusage.services.list`, `serviceusage.services.listApis`, `serviceusage.services.listDependentServices`, `serviceusage.values.test`

#### Cloud Scheduler Viewer (`roles/cloudscheduler.viewer`)

- Get and list access to jobs, executions, and locations. Lowest-level resources where you can grant this role: - Project
- Permissions (20): `appengine.applications.get`, `cloudscheduler.jobs.fullView`, `cloudscheduler.jobs.get`, `cloudscheduler.jobs.list`, `cloudscheduler.locations.get`, `cloudscheduler.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `serviceusage.catalogs.listMembers`, `serviceusage.consumerpolicy.analyze`, `serviceusage.consumerpolicy.get`, `serviceusage.effectivepolicy.get`, `serviceusage.groups.list`, `serviceusage.groups.listExpandedMembers`, `serviceusage.groups.listMembers`, `serviceusage.services.get`, `serviceusage.services.list`, `serviceusage.services.listApis`, `serviceusage.services.listDependentServices`, `serviceusage.values.test`

#### Cloud Scheduler Job Runner (`roles/cloudscheduler.jobRunner`)

- Access to run jobs. Lowest-level resources where you can grant this role: - Project
- Permissions (17): `appengine.applications.get`, `cloudscheduler.jobs.fullView`, `cloudscheduler.jobs.run`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `serviceusage.catalogs.listMembers`, `serviceusage.consumerpolicy.analyze`, `serviceusage.consumerpolicy.get`, `serviceusage.effectivepolicy.get`, `serviceusage.groups.list`, `serviceusage.groups.listExpandedMembers`, `serviceusage.groups.listMembers`, `serviceusage.services.get`, `serviceusage.services.list`, `serviceusage.services.listApis`, `serviceusage.services.listDependentServices`, `serviceusage.values.test`

#### Cloud Scheduler Service Agent (`roles/cloudscheduler.serviceAgent`)

- Grants Cloud Scheduler Service Account access to manage resources. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (5): `iam.serviceAccounts.getAccessToken`, `iam.serviceAccounts.getOpenIdToken`, `logging.logEntries.create`, `logging.logEntries.route`, `pubsub.topics.publish`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Project):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/cloudscheduler.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `cloudscheduler.jobs.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudscheduler.admin` (+4 service agent roles) |
| `cloudscheduler.jobs.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudscheduler.admin` (+4 service agent roles) |
| `cloudscheduler.jobs.enable` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudscheduler.admin` (+2 service agent roles) |
| `cloudscheduler.jobs.fullView` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudscheduler.admin`, `roles/cloudscheduler.viewer`, `roles/cloudscheduler.jobRunner`, `roles/iam.supportUser` (+2 service agent roles) |
| `cloudscheduler.jobs.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudscheduler.admin`, `roles/cloudscheduler.viewer`, `roles/iam.supportUser` (+4 service agent roles) |
| `cloudscheduler.jobs.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudscheduler.admin`, `roles/cloudscheduler.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` (+1 service agent role) |
| `cloudscheduler.jobs.pause` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudscheduler.admin` (+2 service agent roles) |
| `cloudscheduler.jobs.run` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudscheduler.admin`, `roles/cloudscheduler.jobRunner` (+2 service agent roles) |
| `cloudscheduler.jobs.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudscheduler.admin` (+3 service agent roles) |
| `cloudscheduler.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudscheduler.admin`, `roles/cloudscheduler.viewer`, `roles/iam.supportUser` (+2 service agent roles) |
| `cloudscheduler.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudscheduler.admin`, `roles/cloudscheduler.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` (+2 service agent roles) |

## Notes

- Roles and permissions of the `cloudscheduler` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/cloudscheduler (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
