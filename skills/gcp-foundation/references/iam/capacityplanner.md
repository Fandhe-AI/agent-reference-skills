---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/capacityplanner
---

# Capacity Planner IAM roles and permissions

## Signature / Usage

Predefined roles of `capacityplanner` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

### Capacityplanner Admin (`roles/capacityplanner.admin`)

- Launch stage: Beta
- Admin role for capacityplanner
- Permissions (34): `capacityplanner.capacityPlans.create`, `capacityplanner.capacityPlans.delete`, `capacityplanner.capacityPlans.get`, `capacityplanner.capacityPlans.list`, `capacityplanner.capacityPlans.update`, `capacityplanner.forecasts.list`, `capacityplanner.messages.generate`, `capacityplanner.operations.get`, `capacityplanner.planAlertInsights.list`, `capacityplanner.usageAlertInsights.list`, `capacityplanner.usageHistories.list`, `capacityplanner.usageHistories.summarize`, `cloudquotas.quotas.get`, `compute.futureReservations.get`, `compute.futureReservations.list`, `compute.reservations.get`, `compute.reservations.list`, `monitoring.timeSeries.list`, `resourcemanager.folders.get`, `resourcemanager.organizations.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `serviceusage.catalogs.listMembers`, `serviceusage.consumerpolicy.analyze`, `serviceusage.consumerpolicy.get`, `serviceusage.effectivepolicy.get`, `serviceusage.groups.list`, `serviceusage.groups.listExpandedMembers`, `serviceusage.groups.listMembers`, `serviceusage.quotas.get`, `serviceusage.services.get`, `serviceusage.services.listApis`, `serviceusage.services.listDependentServices`, `serviceusage.values.test`

### Capacity Planner Viewer (`roles/capacityplanner.viewer`)

- Launch stage: Beta
- Read-only access to Capacity Planner resources
- Permissions (31): `capacityplanner.capacityPlans.get`, `capacityplanner.capacityPlans.list`, `capacityplanner.forecasts.list`, `capacityplanner.messages.generate`, `capacityplanner.operations.get`, `capacityplanner.planAlertInsights.list`, `capacityplanner.usageAlertInsights.list`, `capacityplanner.usageHistories.list`, `capacityplanner.usageHistories.summarize`, `cloudquotas.quotas.get`, `compute.futureReservations.get`, `compute.futureReservations.list`, `compute.reservations.get`, `compute.reservations.list`, `monitoring.timeSeries.list`, `resourcemanager.folders.get`, `resourcemanager.organizations.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `serviceusage.catalogs.listMembers`, `serviceusage.consumerpolicy.analyze`, `serviceusage.consumerpolicy.get`, `serviceusage.effectivepolicy.get`, `serviceusage.groups.list`, `serviceusage.groups.listExpandedMembers`, `serviceusage.groups.listMembers`, `serviceusage.quotas.get`, `serviceusage.services.get`, `serviceusage.services.listApis`, `serviceusage.services.listDependentServices`, `serviceusage.values.test`

### Capacity Planner (`roles/capacityplanner.planner`)

- Launch stage: Beta
- Role that enables capacity planning
- Permissions (34): `capacityplanner.capacityPlans.create`, `capacityplanner.capacityPlans.delete`, `capacityplanner.capacityPlans.get`, `capacityplanner.capacityPlans.list`, `capacityplanner.capacityPlans.update`, `capacityplanner.forecasts.list`, `capacityplanner.messages.generate`, `capacityplanner.operations.get`, `capacityplanner.planAlertInsights.list`, `capacityplanner.usageAlertInsights.list`, `capacityplanner.usageHistories.list`, `capacityplanner.usageHistories.summarize`, `cloudquotas.quotas.get`, `compute.futureReservations.get`, `compute.futureReservations.list`, `compute.reservations.get`, `compute.reservations.list`, `monitoring.timeSeries.list`, `resourcemanager.folders.get`, `resourcemanager.organizations.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `serviceusage.catalogs.listMembers`, `serviceusage.consumerpolicy.analyze`, `serviceusage.consumerpolicy.get`, `serviceusage.effectivepolicy.get`, `serviceusage.groups.list`, `serviceusage.groups.listExpandedMembers`, `serviceusage.groups.listMembers`, `serviceusage.quotas.get`, `serviceusage.services.get`, `serviceusage.services.listApis`, `serviceusage.services.listDependentServices`, `serviceusage.values.test`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Project):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/capacityplanner.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `capacityplanner.capacityPlans.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/capacityplanner.admin`, `roles/capacityplanner.planner` |
| `capacityplanner.capacityPlans.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/capacityplanner.admin`, `roles/capacityplanner.planner` |
| `capacityplanner.capacityPlans.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/capacityplanner.admin`, `roles/capacityplanner.viewer`, `roles/capacityplanner.planner`, `roles/cloudhub.operator`, `roles/iam.supportUser` |
| `capacityplanner.capacityPlans.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/capacityplanner.admin`, `roles/capacityplanner.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/capacityplanner.planner`, `roles/cloudhub.operator`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `capacityplanner.capacityPlans.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/capacityplanner.admin`, `roles/capacityplanner.planner` |
| `capacityplanner.forecasts.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/capacityplanner.admin`, `roles/capacityplanner.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/capacityplanner.planner`, `roles/cloudhub.operator`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `capacityplanner.messages.generate` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/capacityplanner.admin`, `roles/capacityplanner.viewer`, `roles/capacityplanner.planner`, `roles/cloudhub.operator`, `roles/iam.supportUser` |
| `capacityplanner.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/capacityplanner.admin`, `roles/capacityplanner.viewer`, `roles/capacityplanner.planner`, `roles/cloudhub.operator`, `roles/iam.supportUser` |
| `capacityplanner.planAlertInsights.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/capacityplanner.admin`, `roles/capacityplanner.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/capacityplanner.planner`, `roles/cloudhub.operator`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `capacityplanner.usageAlertInsights.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/capacityplanner.admin`, `roles/capacityplanner.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/capacityplanner.planner`, `roles/cloudhub.operator`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `capacityplanner.usageHistories.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/capacityplanner.admin`, `roles/capacityplanner.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/capacityplanner.planner`, `roles/cloudhub.operator`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `capacityplanner.usageHistories.summarize` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/capacityplanner.admin`, `roles/capacityplanner.viewer`, `roles/capacityplanner.planner`, `roles/cloudhub.operator`, `roles/iam.supportUser` |

## Notes

- Roles and permissions of the `capacityplanner` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/capacityplanner (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
