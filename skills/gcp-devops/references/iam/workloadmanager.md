---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/workloadmanager
---

# Workload Manager IAM roles and permissions

## Signature / Usage

Predefined roles of `workloadmanager` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Workload Manager Admin (`roles/workloadmanager.admin`)

- Launch stage: Beta
- Full access to Workload Manager all resources.
- Permissions (65): `compute.acceleratorTypes.list`, `compute.diskTypes.list`, `compute.machineTypes.list`, `compute.networks.list`, `compute.projects.get`, `compute.regions.list`, `compute.subnetworks.list`, `compute.zones.list`, `dns.managedZones.list`, `iam.serviceAccounts.list`, `monitoring.timeSeries.list`, `orgpolicy.policy.get`, `resourcemanager.projects.get`, `resourcemanager.projects.getIamPolicy`, `resourcemanager.projects.list`, `serviceusage.catalogs.listMembers`, `serviceusage.consumerpolicy.analyze`, `serviceusage.consumerpolicy.get`, `serviceusage.effectivepolicy.get`, `serviceusage.groups.list`, `serviceusage.groups.listExpandedMembers`, `serviceusage.groups.listMembers`, `serviceusage.quotas.get`, `serviceusage.services.get`, `serviceusage.services.listApis`, `serviceusage.services.listDependentServices`, `serviceusage.values.test`, `storage.buckets.list`, `storage.objects.list`, `workloadmanager.actuations.create`, `workloadmanager.actuations.delete`, `workloadmanager.actuations.get`, `workloadmanager.actuations.list`, `workloadmanager.deployments.create`, `workloadmanager.deployments.delete`, `workloadmanager.deployments.get`, `workloadmanager.deployments.list`, `workloadmanager.discoveredprofiles.get`, `workloadmanager.discoveredprofiles.getHealth`, `workloadmanager.discoveredprofiles.list`, `workloadmanager.evaluations.create`, `workloadmanager.evaluations.delete`, `workloadmanager.evaluations.get`, `workloadmanager.evaluations.list`, `workloadmanager.evaluations.run`, `workloadmanager.evaluations.update`, `workloadmanager.executions.delete`, `workloadmanager.executions.get`, `workloadmanager.executions.list`, `workloadmanager.findings.create`, `workloadmanager.findings.list`, `workloadmanager.insights.delete`, `workloadmanager.insights.export`, `workloadmanager.insights.listSapSystems`, `workloadmanager.insights.write`, `workloadmanager.locations.get`, `workloadmanager.locations.list`, `workloadmanager.operations.cancel`, `workloadmanager.operations.delete`, `workloadmanager.operations.get`, `workloadmanager.operations.list`, `workloadmanager.results.list`, `workloadmanager.rules.list`, `workloadmanager.workloads.get`, `workloadmanager.workloads.list`

#### Workload Manager Viewer (`roles/workloadmanager.viewer`)

- Launch stage: Beta
- Read-only access to Workload Manager all resources.
- Permissions (17): `orgpolicy.policy.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `workloadmanager.actuations.get`, `workloadmanager.actuations.list`, `workloadmanager.deployments.get`, `workloadmanager.deployments.list`, `workloadmanager.discoveredprofiles.get`, `workloadmanager.discoveredprofiles.getHealth`, `workloadmanager.discoveredprofiles.list`, `workloadmanager.evaluations.get`, `workloadmanager.evaluations.list`, `workloadmanager.executions.get`, `workloadmanager.executions.list`, `workloadmanager.findings.list`, `workloadmanager.results.list`, `workloadmanager.rules.list`

#### Workload Manager Deployment Admin (`roles/workloadmanager.deploymentAdmin`)

- Launch stage: Beta
- Full access to Workload Manager deployment resources.
- Permissions (42): `compute.acceleratorTypes.list`, `compute.diskTypes.list`, `compute.machineTypes.list`, `compute.networks.list`, `compute.projects.get`, `compute.regions.list`, `compute.subnetworks.list`, `compute.zones.list`, `dns.managedZones.list`, `iam.serviceAccounts.list`, `monitoring.timeSeries.list`, `resourcemanager.projects.get`, `resourcemanager.projects.getIamPolicy`, `resourcemanager.projects.list`, `serviceusage.catalogs.listMembers`, `serviceusage.consumerpolicy.analyze`, `serviceusage.consumerpolicy.get`, `serviceusage.effectivepolicy.get`, `serviceusage.groups.list`, `serviceusage.groups.listExpandedMembers`, `serviceusage.groups.listMembers`, `serviceusage.quotas.get`, `serviceusage.services.get`, `serviceusage.services.listApis`, `serviceusage.services.listDependentServices`, `serviceusage.values.test`, `storage.buckets.list`, `storage.objects.list`, `workloadmanager.actuations.create`, `workloadmanager.actuations.delete`, `workloadmanager.actuations.get`, `workloadmanager.actuations.list`, `workloadmanager.deployments.create`, `workloadmanager.deployments.delete`, `workloadmanager.deployments.get`, `workloadmanager.deployments.list`, `workloadmanager.locations.get`, `workloadmanager.locations.list`, `workloadmanager.operations.cancel`, `workloadmanager.operations.delete`, `workloadmanager.operations.get`, `workloadmanager.operations.list`

#### Workload Manager Deployment Viewer (`roles/workloadmanager.deploymentViewer`)

- Launch stage: Beta
- Read-only access to Workload Manager deployment resources.
- Permissions (6): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `workloadmanager.actuations.get`, `workloadmanager.actuations.list`, `workloadmanager.deployments.get`, `workloadmanager.deployments.list`

#### Workload Manager Evaluation Admin (`roles/workloadmanager.evaluationAdmin`)

- Launch stage: Beta
- Full access to Workload Manager evaluation resources.
- Permissions (22): `orgpolicy.policy.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `workloadmanager.evaluations.create`, `workloadmanager.evaluations.delete`, `workloadmanager.evaluations.get`, `workloadmanager.evaluations.list`, `workloadmanager.evaluations.run`, `workloadmanager.evaluations.update`, `workloadmanager.executions.delete`, `workloadmanager.executions.get`, `workloadmanager.executions.list`, `workloadmanager.findings.create`, `workloadmanager.findings.list`, `workloadmanager.locations.get`, `workloadmanager.locations.list`, `workloadmanager.operations.cancel`, `workloadmanager.operations.delete`, `workloadmanager.operations.get`, `workloadmanager.operations.list`, `workloadmanager.results.list`, `workloadmanager.rules.list`

#### Workload Manager Evaluation Viewer (`roles/workloadmanager.evaluationViewer`)

- Launch stage: Beta
- Read-only access to Workload Manager evaluation resources.
- Permissions (9): `orgpolicy.policy.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `workloadmanager.evaluations.get`, `workloadmanager.evaluations.list`, `workloadmanager.executions.get`, `workloadmanager.executions.list`, `workloadmanager.results.list`, `workloadmanager.rules.list`

#### Workload Manager Insights Writer (`roles/workloadmanager.insightWriter`)

- Launch stage: Beta
- The role used to write data to WLM data warehouse.
- Permissions (2): `workloadmanager.insights.delete`, `workloadmanager.insights.write`

#### Workload Manager Worker (`roles/workloadmanager.worker`)

- Launch stage: Beta
- The role used by Workload Manager application runners to read and update workloads.
- Permissions (28): `orgpolicy.policy.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `workloadmanager.actuations.create`, `workloadmanager.actuations.delete`, `workloadmanager.actuations.get`, `workloadmanager.actuations.list`, `workloadmanager.deployments.create`, `workloadmanager.deployments.delete`, `workloadmanager.deployments.get`, `workloadmanager.deployments.list`, `workloadmanager.discoveredprofiles.get`, `workloadmanager.discoveredprofiles.getHealth`, `workloadmanager.discoveredprofiles.list`, `workloadmanager.evaluations.create`, `workloadmanager.evaluations.delete`, `workloadmanager.evaluations.get`, `workloadmanager.evaluations.list`, `workloadmanager.evaluations.run`, `workloadmanager.evaluations.update`, `workloadmanager.executions.delete`, `workloadmanager.executions.get`, `workloadmanager.executions.list`, `workloadmanager.findings.create`, `workloadmanager.findings.list`, `workloadmanager.insights.write`, `workloadmanager.results.list`, `workloadmanager.rules.list`

#### Workload Manager Workload Viewer (`roles/workloadmanager.workloadViewer`)

- Launch stage: Beta
- The role used to view the workload related data.
- Permissions (19): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `serviceusage.catalogs.listMembers`, `serviceusage.consumerpolicy.analyze`, `serviceusage.consumerpolicy.get`, `serviceusage.effectivepolicy.get`, `serviceusage.groups.list`, `serviceusage.groups.listExpandedMembers`, `serviceusage.groups.listMembers`, `serviceusage.services.get`, `serviceusage.services.list`, `serviceusage.services.listApis`, `serviceusage.services.listDependentServices`, `serviceusage.values.test`, `workloadmanager.discoveredprofiles.get`, `workloadmanager.discoveredprofiles.getHealth`, `workloadmanager.discoveredprofiles.list`, `workloadmanager.workloads.get`, `workloadmanager.workloads.list`

#### Workload Manager Service Agent (`roles/workloadmanager.serviceAgent`)

- Gives Workload Manager Service Agent access to CAI export functions and Cloud Monitoring. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (33): `cloudasset.assets.exportAccessPolicy`, `cloudasset.assets.exportIamPolicy`, `cloudasset.assets.exportOSInventories`, `cloudasset.assets.exportOrgPolicy`, `cloudasset.assets.exportResource`, `cloudasset.assets.listAccessPolicy`, `cloudasset.assets.listIamPolicy`, `cloudasset.assets.listOSInventories`, `cloudasset.assets.listOrgPolicy`, `cloudasset.assets.listResource`, `cloudasset.assets.searchAllResources`, `config.deployments.create`, `config.deployments.delete`, `config.deployments.get`, `config.deployments.list`, `config.deployments.update`, `config.locations.get`, `config.locations.list`, `config.operations.cancel`, `config.operations.delete`, `config.operations.get`, `config.operations.list`, `config.resources.list`, `config.revisions.get`, `config.revisions.list`, `monitoring.metricDescriptors.get`, `monitoring.metricDescriptors.list`, `monitoring.monitoredResourceDescriptors.get`, `monitoring.monitoredResourceDescriptors.list`, `monitoring.timeSeries.list`, `serviceusage.services.use`, `workloadmanager.insights.export`, `workloadmanager.insights.listSapSystems`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/workloadmanager.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `workloadmanager.actuations.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/workloadmanager.admin`, `roles/workloadmanager.deploymentAdmin`, `roles/workloadmanager.worker` |
| `workloadmanager.actuations.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/workloadmanager.admin`, `roles/workloadmanager.deploymentAdmin`, `roles/workloadmanager.worker` |
| `workloadmanager.actuations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/workloadmanager.admin`, `roles/workloadmanager.viewer`, `roles/iam.supportUser`, `roles/workloadmanager.deploymentAdmin`, `roles/workloadmanager.deploymentViewer`, `roles/workloadmanager.worker` |
| `workloadmanager.actuations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/workloadmanager.admin`, `roles/workloadmanager.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/workloadmanager.deploymentAdmin`, `roles/workloadmanager.deploymentViewer`, `roles/workloadmanager.worker` |
| `workloadmanager.deployments.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/workloadmanager.admin`, `roles/workloadmanager.deploymentAdmin`, `roles/workloadmanager.worker` |
| `workloadmanager.deployments.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/workloadmanager.admin`, `roles/workloadmanager.deploymentAdmin`, `roles/workloadmanager.worker` |
| `workloadmanager.deployments.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/workloadmanager.admin`, `roles/workloadmanager.viewer`, `roles/iam.supportUser`, `roles/workloadmanager.deploymentAdmin`, `roles/workloadmanager.deploymentViewer`, `roles/workloadmanager.worker` |
| `workloadmanager.deployments.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/workloadmanager.admin`, `roles/workloadmanager.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/workloadmanager.deploymentAdmin`, `roles/workloadmanager.deploymentViewer`, `roles/workloadmanager.worker` |
| `workloadmanager.discoveredprofiles.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/workloadmanager.admin`, `roles/workloadmanager.viewer`, `roles/iam.supportUser`, `roles/workloadmanager.worker`, `roles/workloadmanager.workloadViewer` |
| `workloadmanager.discoveredprofiles.getHealth` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/workloadmanager.admin`, `roles/workloadmanager.viewer`, `roles/iam.supportUser`, `roles/workloadmanager.worker`, `roles/workloadmanager.workloadViewer` |
| `workloadmanager.discoveredprofiles.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/workloadmanager.admin`, `roles/workloadmanager.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/workloadmanager.worker`, `roles/workloadmanager.workloadViewer` |
| `workloadmanager.evaluations.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/workloadmanager.admin`, `roles/workloadmanager.evaluationAdmin`, `roles/workloadmanager.worker` |
| `workloadmanager.evaluations.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/workloadmanager.admin`, `roles/workloadmanager.evaluationAdmin`, `roles/workloadmanager.worker` |
| `workloadmanager.evaluations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/workloadmanager.admin`, `roles/workloadmanager.viewer`, `roles/iam.supportUser`, `roles/workloadmanager.evaluationAdmin`, `roles/workloadmanager.evaluationViewer`, `roles/workloadmanager.worker` |
| `workloadmanager.evaluations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/workloadmanager.admin`, `roles/workloadmanager.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer`, `roles/workloadmanager.evaluationAdmin`, `roles/workloadmanager.evaluationViewer`, `roles/workloadmanager.worker` |
| `workloadmanager.evaluations.run` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/workloadmanager.admin`, `roles/workloadmanager.evaluationAdmin`, `roles/workloadmanager.worker` |
| `workloadmanager.evaluations.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/workloadmanager.admin`, `roles/workloadmanager.evaluationAdmin`, `roles/workloadmanager.worker` |
| `workloadmanager.executions.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/workloadmanager.admin`, `roles/workloadmanager.evaluationAdmin`, `roles/workloadmanager.worker` |
| `workloadmanager.executions.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/workloadmanager.admin`, `roles/workloadmanager.viewer`, `roles/iam.supportUser`, `roles/workloadmanager.evaluationAdmin`, `roles/workloadmanager.evaluationViewer`, `roles/workloadmanager.worker` |
| `workloadmanager.executions.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/workloadmanager.admin`, `roles/workloadmanager.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/workloadmanager.evaluationAdmin`, `roles/workloadmanager.evaluationViewer`, `roles/workloadmanager.worker` |
| `workloadmanager.findings.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/workloadmanager.admin`, `roles/workloadmanager.evaluationAdmin`, `roles/workloadmanager.worker` |
| `workloadmanager.findings.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/workloadmanager.admin`, `roles/workloadmanager.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/workloadmanager.evaluationAdmin`, `roles/workloadmanager.worker` |
| `workloadmanager.insights.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/workloadmanager.admin`, `roles/workloadmanager.insightWriter` |
| `workloadmanager.insights.export` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/workloadmanager.admin`, `roles/iam.supportUser` (+1 service agent role) |
| `workloadmanager.insights.listSapSystems` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/workloadmanager.admin`, `roles/iam.supportUser` (+1 service agent role) |
| `workloadmanager.insights.write` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/workloadmanager.admin`, `roles/workloadmanager.insightWriter`, `roles/workloadmanager.worker` |
| `workloadmanager.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/workloadmanager.admin`, `roles/iam.supportUser`, `roles/workloadmanager.deploymentAdmin`, `roles/workloadmanager.evaluationAdmin` |
| `workloadmanager.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/workloadmanager.admin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer`, `roles/workloadmanager.deploymentAdmin`, `roles/workloadmanager.evaluationAdmin` |
| `workloadmanager.operations.cancel` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/workloadmanager.admin`, `roles/workloadmanager.deploymentAdmin`, `roles/workloadmanager.evaluationAdmin` |
| `workloadmanager.operations.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/workloadmanager.admin`, `roles/workloadmanager.deploymentAdmin`, `roles/workloadmanager.evaluationAdmin` |
| `workloadmanager.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/workloadmanager.admin`, `roles/iam.supportUser`, `roles/workloadmanager.deploymentAdmin`, `roles/workloadmanager.evaluationAdmin` |
| `workloadmanager.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/workloadmanager.admin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/workloadmanager.deploymentAdmin`, `roles/workloadmanager.evaluationAdmin` |
| `workloadmanager.results.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/workloadmanager.admin`, `roles/workloadmanager.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/workloadmanager.evaluationAdmin`, `roles/workloadmanager.evaluationViewer`, `roles/workloadmanager.worker` |
| `workloadmanager.rules.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/workloadmanager.admin`, `roles/workloadmanager.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/workloadmanager.evaluationAdmin`, `roles/workloadmanager.evaluationViewer`, `roles/workloadmanager.worker` |
| `workloadmanager.workloads.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/workloadmanager.admin`, `roles/iam.supportUser`, `roles/workloadmanager.workloadViewer` |
| `workloadmanager.workloads.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/workloadmanager.admin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/workloadmanager.workloadViewer` |

## Notes

- Roles and permissions of the `workloadmanager` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/workloadmanager (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
