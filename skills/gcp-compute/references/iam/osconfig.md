---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/osconfig
---

# Cloud OS Config IAM roles and permissions

## Signature / Usage

Predefined roles of `osconfig` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### OS Config Admin (`roles/osconfig.admin`)

- Full access to OS Config resources
- Permissions (48): `osconfig.guestPolicies.create`, `osconfig.guestPolicies.delete`, `osconfig.guestPolicies.get`, `osconfig.guestPolicies.list`, `osconfig.guestPolicies.update`, `osconfig.instanceOSPoliciesCompliances.get`, `osconfig.instanceOSPoliciesCompliances.list`, `osconfig.inventories.get`, `osconfig.inventories.list`, `osconfig.locations.get`, `osconfig.locations.list`, `osconfig.operations.cancel`, `osconfig.operations.delete`, `osconfig.operations.get`, `osconfig.operations.list`, `osconfig.osPolicyAssignmentReports.get`, `osconfig.osPolicyAssignmentReports.list`, `osconfig.osPolicyAssignmentReports.searchSummaries`, `osconfig.osPolicyAssignments.create`, `osconfig.osPolicyAssignments.delete`, `osconfig.osPolicyAssignments.get`, `osconfig.osPolicyAssignments.list`, `osconfig.osPolicyAssignments.searchPolicies`, `osconfig.osPolicyAssignments.update`, `osconfig.patchDeployments.create`, `osconfig.patchDeployments.delete`, `osconfig.patchDeployments.execute`, `osconfig.patchDeployments.get`, `osconfig.patchDeployments.list`, `osconfig.patchDeployments.pause`, `osconfig.patchDeployments.resume`, `osconfig.patchDeployments.update`, `osconfig.patchJobs.exec`, `osconfig.patchJobs.get`, `osconfig.patchJobs.list`, `osconfig.policyOrchestrators.create`, `osconfig.policyOrchestrators.delete`, `osconfig.policyOrchestrators.get`, `osconfig.policyOrchestrators.list`, `osconfig.policyOrchestrators.update`, `osconfig.projectFeatureSettings.get`, `osconfig.projectFeatureSettings.update`, `osconfig.upgradeReports.get`, `osconfig.upgradeReports.getSummary`, `osconfig.upgradeReports.list`, `osconfig.upgradeReports.searchSummaries`, `osconfig.vulnerabilityReports.get`, `osconfig.vulnerabilityReports.list`

#### OS Config Viewer (`roles/osconfig.viewer`)

- Readonly access to OS Config resources
- Permissions (29): `osconfig.guestPolicies.get`, `osconfig.guestPolicies.list`, `osconfig.instanceOSPoliciesCompliances.get`, `osconfig.instanceOSPoliciesCompliances.list`, `osconfig.inventories.get`, `osconfig.inventories.list`, `osconfig.locations.get`, `osconfig.locations.list`, `osconfig.operations.get`, `osconfig.operations.list`, `osconfig.osPolicyAssignmentReports.get`, `osconfig.osPolicyAssignmentReports.list`, `osconfig.osPolicyAssignmentReports.searchSummaries`, `osconfig.osPolicyAssignments.get`, `osconfig.osPolicyAssignments.list`, `osconfig.osPolicyAssignments.searchPolicies`, `osconfig.patchDeployments.get`, `osconfig.patchDeployments.list`, `osconfig.patchJobs.get`, `osconfig.patchJobs.list`, `osconfig.policyOrchestrators.get`, `osconfig.policyOrchestrators.list`, `osconfig.projectFeatureSettings.get`, `osconfig.upgradeReports.get`, `osconfig.upgradeReports.getSummary`, `osconfig.upgradeReports.list`, `osconfig.upgradeReports.searchSummaries`, `osconfig.vulnerabilityReports.get`, `osconfig.vulnerabilityReports.list`

#### GuestPolicy Admin (`roles/osconfig.guestPolicyAdmin`)

- Launch stage: Beta
- Full admin access to GuestPolicies
- Permissions (7): `osconfig.guestPolicies.create`, `osconfig.guestPolicies.delete`, `osconfig.guestPolicies.get`, `osconfig.guestPolicies.list`, `osconfig.guestPolicies.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### GuestPolicy Editor (`roles/osconfig.guestPolicyEditor`)

- Launch stage: Beta
- Editor of GuestPolicy resources
- Permissions (5): `osconfig.guestPolicies.get`, `osconfig.guestPolicies.list`, `osconfig.guestPolicies.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### GuestPolicy Viewer (`roles/osconfig.guestPolicyViewer`)

- Launch stage: Beta
- Viewer of GuestPolicy resources
- Permissions (4): `osconfig.guestPolicies.get`, `osconfig.guestPolicies.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### InstanceOSPoliciesCompliance Viewer (`roles/osconfig.instanceOSPoliciesComplianceViewer`)

- Launch stage: Beta
- Viewer of OS Policies Compliance of VM instances
- Permissions (4): `osconfig.instanceOSPoliciesCompliances.get`, `osconfig.instanceOSPoliciesCompliances.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### OS Inventory Viewer (`roles/osconfig.inventoryViewer`)

- Viewer of OS Inventories
- Permissions (4): `osconfig.inventories.get`, `osconfig.inventories.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### OSPolicyAssignment Admin (`roles/osconfig.osPolicyAssignmentAdmin`)

- Full admin access to OS Policy Assignments
- Permissions (8): `osconfig.osPolicyAssignments.create`, `osconfig.osPolicyAssignments.delete`, `osconfig.osPolicyAssignments.get`, `osconfig.osPolicyAssignments.list`, `osconfig.osPolicyAssignments.searchPolicies`, `osconfig.osPolicyAssignments.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### OSPolicyAssignment Editor (`roles/osconfig.osPolicyAssignmentEditor`)

- Editor of OS Policy Assignments
- Permissions (6): `osconfig.osPolicyAssignments.get`, `osconfig.osPolicyAssignments.list`, `osconfig.osPolicyAssignments.searchPolicies`, `osconfig.osPolicyAssignments.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### OSPolicyAssignmentReport Viewer (`roles/osconfig.osPolicyAssignmentReportViewer`)

- Viewer of OS policy assignment reports for VM instances
- Permissions (5): `osconfig.osPolicyAssignmentReports.get`, `osconfig.osPolicyAssignmentReports.list`, `osconfig.osPolicyAssignmentReports.searchSummaries`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### OSPolicyAssignment Viewer (`roles/osconfig.osPolicyAssignmentViewer`)

- Viewer of OS Policy Assignments
- Permissions (5): `osconfig.osPolicyAssignments.get`, `osconfig.osPolicyAssignments.list`, `osconfig.osPolicyAssignments.searchPolicies`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### PatchDeployment Admin (`roles/osconfig.patchDeploymentAdmin`)

- Full admin access to PatchDeployments
- Permissions (10): `osconfig.patchDeployments.create`, `osconfig.patchDeployments.delete`, `osconfig.patchDeployments.execute`, `osconfig.patchDeployments.get`, `osconfig.patchDeployments.list`, `osconfig.patchDeployments.pause`, `osconfig.patchDeployments.resume`, `osconfig.patchDeployments.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### PatchDeployment Viewer (`roles/osconfig.patchDeploymentViewer`)

- Viewer of PatchDeployment resources
- Permissions (4): `osconfig.patchDeployments.get`, `osconfig.patchDeployments.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Patch Job Executor (`roles/osconfig.patchJobExecutor`)

- Access to execute Patch Jobs.
- Permissions (5): `osconfig.patchJobs.exec`, `osconfig.patchJobs.get`, `osconfig.patchJobs.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Patch Job Viewer (`roles/osconfig.patchJobViewer`)

- Get and list Patch Jobs.
- Permissions (4): `osconfig.patchJobs.get`, `osconfig.patchJobs.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### PolicyOrchestrator Admin (`roles/osconfig.policyOrchestratorAdmin`)

- Admin of PolicyOrchestrator resources
- Permissions (8): `osconfig.locations.get`, `osconfig.locations.list`, `osconfig.operations.get`, `osconfig.policyOrchestrators.create`, `osconfig.policyOrchestrators.delete`, `osconfig.policyOrchestrators.get`, `osconfig.policyOrchestrators.list`, `osconfig.policyOrchestrators.update`

#### PolicyOrchestrator Viewer (`roles/osconfig.policyOrchestratorViewer`)

- Viewer of PolicyOrchestrator resources
- Permissions (5): `osconfig.locations.get`, `osconfig.locations.list`, `osconfig.operations.get`, `osconfig.policyOrchestrators.get`, `osconfig.policyOrchestrators.list`

#### Project Feature Settings Editor (`roles/osconfig.projectFeatureSettingsEditor`)

- Read/write access to project feature settings
- Permissions (4): `osconfig.projectFeatureSettings.get`, `osconfig.projectFeatureSettings.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Project Feature Settings Viewer (`roles/osconfig.projectFeatureSettingsViewer`)

- Read access to project feature settings
- Permissions (3): `osconfig.projectFeatureSettings.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Upgrade Report Viewer (`roles/osconfig.upgradeReportViewer`)

- Provides read-only access to VM Manager Upgrade Reports
- Permissions (6): `osconfig.upgradeReports.get`, `osconfig.upgradeReports.getSummary`, `osconfig.upgradeReports.list`, `osconfig.upgradeReports.searchSummaries`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### OS VulnerabilityReport Viewer (`roles/osconfig.vulnerabilityReportViewer`)

- Viewer of OS VulnerabilityReports
- Permissions (4): `osconfig.vulnerabilityReports.get`, `osconfig.vulnerabilityReports.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud OS Config Rollout Service Agent (`roles/osconfig.rolloutServiceAgent`)

- Grants OS Config Rollout Service Account access to zonal OS Config resources. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (4): `osconfig.operations.get`, `osconfig.osPolicyAssignments.delete`, `osconfig.osPolicyAssignments.get`, `osconfig.osPolicyAssignments.update`

#### Cloud OS Config Service Agent (`roles/osconfig.serviceAgent`)

- Grants OS Config Service Account access to Google Compute Engine instances. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (27): `cloudasset.assets.listOSConfigOSPolicyAssignments`, `cloudasset.assets.listPatchDeployments`, `compute.globalOperations.get`, `compute.instances.get`, `compute.instances.getGuestAttributes`, `compute.instances.list`, `compute.instances.setMetadata`, `compute.projects.get`, `compute.projects.setCommonInstanceMetadata`, `compute.zones.get`, `compute.zones.list`, `containeranalysis.notes.attachOccurrence`, `containeranalysis.notes.create`, `containeranalysis.notes.delete`, `containeranalysis.notes.get`, `containeranalysis.notes.list`, `containeranalysis.notes.update`, `containeranalysis.occurrences.create`, `containeranalysis.occurrences.delete`, `containeranalysis.occurrences.get`, `containeranalysis.occurrences.list`, `containeranalysis.occurrences.update`, `iam.serviceAccounts.actAs`, `osconfig.projectFeatureSettings.get`, `osconfig.projectFeatureSettings.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/osconfig.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `osconfig.guestPolicies.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/osconfig.admin`, `roles/osconfig.guestPolicyAdmin` |
| `osconfig.guestPolicies.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/osconfig.admin`, `roles/osconfig.guestPolicyAdmin` |
| `osconfig.guestPolicies.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/osconfig.admin`, `roles/osconfig.viewer`, `roles/iam.supportUser`, `roles/osconfig.guestPolicyAdmin`, `roles/osconfig.guestPolicyEditor`, `roles/osconfig.guestPolicyViewer` |
| `osconfig.guestPolicies.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/osconfig.admin`, `roles/osconfig.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/osconfig.guestPolicyAdmin`, `roles/osconfig.guestPolicyEditor`, `roles/osconfig.guestPolicyViewer` |
| `osconfig.guestPolicies.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/osconfig.admin`, `roles/osconfig.guestPolicyAdmin`, `roles/osconfig.guestPolicyEditor` |
| `osconfig.instanceOSPoliciesCompliances.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/osconfig.admin`, `roles/osconfig.viewer`, `roles/iam.supportUser`, `roles/osconfig.instanceOSPoliciesComplianceViewer` |
| `osconfig.instanceOSPoliciesCompliances.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/osconfig.admin`, `roles/osconfig.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/osconfig.instanceOSPoliciesComplianceViewer` |
| `osconfig.inventories.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/osconfig.admin`, `roles/osconfig.viewer`, `roles/iam.supportUser`, `roles/osconfig.inventoryViewer` |
| `osconfig.inventories.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/osconfig.admin`, `roles/osconfig.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/osconfig.inventoryViewer` |
| `osconfig.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/osconfig.admin`, `roles/osconfig.viewer`, `roles/iam.supportUser`, `roles/osconfig.policyOrchestratorAdmin`, `roles/osconfig.policyOrchestratorViewer` |
| `osconfig.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/osconfig.admin`, `roles/osconfig.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/osconfig.policyOrchestratorAdmin`, `roles/osconfig.policyOrchestratorViewer` |
| `osconfig.operations.cancel` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/osconfig.admin` |
| `osconfig.operations.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/osconfig.admin` |
| `osconfig.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/osconfig.admin`, `roles/osconfig.viewer`, `roles/iam.supportUser`, `roles/osconfig.policyOrchestratorAdmin`, `roles/osconfig.policyOrchestratorViewer` (+1 service agent role) |
| `osconfig.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/osconfig.admin`, `roles/osconfig.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `osconfig.osPolicyAssignmentReports.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/osconfig.admin`, `roles/osconfig.viewer`, `roles/iam.supportUser`, `roles/osconfig.osPolicyAssignmentReportViewer` |
| `osconfig.osPolicyAssignmentReports.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/osconfig.admin`, `roles/osconfig.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/osconfig.osPolicyAssignmentReportViewer` |
| `osconfig.osPolicyAssignmentReports.searchSummaries` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/osconfig.admin`, `roles/osconfig.viewer`, `roles/iam.supportUser`, `roles/osconfig.osPolicyAssignmentReportViewer` |
| `osconfig.osPolicyAssignments.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/osconfig.admin`, `roles/osconfig.osPolicyAssignmentAdmin` |
| `osconfig.osPolicyAssignments.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/osconfig.admin`, `roles/osconfig.osPolicyAssignmentAdmin` (+1 service agent role) |
| `osconfig.osPolicyAssignments.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/osconfig.admin`, `roles/osconfig.viewer`, `roles/iam.supportUser`, `roles/osconfig.osPolicyAssignmentAdmin`, `roles/osconfig.osPolicyAssignmentEditor`, `roles/osconfig.osPolicyAssignmentViewer` (+1 service agent role) |
| `osconfig.osPolicyAssignments.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/osconfig.admin`, `roles/osconfig.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/osconfig.osPolicyAssignmentAdmin`, `roles/osconfig.osPolicyAssignmentEditor`, `roles/osconfig.osPolicyAssignmentViewer` |
| `osconfig.osPolicyAssignments.searchPolicies` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/osconfig.admin`, `roles/osconfig.viewer`, `roles/iam.supportUser`, `roles/osconfig.osPolicyAssignmentAdmin`, `roles/osconfig.osPolicyAssignmentEditor`, `roles/osconfig.osPolicyAssignmentViewer` |
| `osconfig.osPolicyAssignments.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/osconfig.admin`, `roles/osconfig.osPolicyAssignmentAdmin`, `roles/osconfig.osPolicyAssignmentEditor` (+1 service agent role) |
| `osconfig.patchDeployments.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/osconfig.admin`, `roles/osconfig.patchDeploymentAdmin` |
| `osconfig.patchDeployments.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/osconfig.admin`, `roles/osconfig.patchDeploymentAdmin` |
| `osconfig.patchDeployments.execute` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/osconfig.admin`, `roles/osconfig.patchDeploymentAdmin` |
| `osconfig.patchDeployments.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/osconfig.admin`, `roles/osconfig.viewer`, `roles/iam.supportUser`, `roles/osconfig.patchDeploymentAdmin`, `roles/osconfig.patchDeploymentViewer` |
| `osconfig.patchDeployments.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/osconfig.admin`, `roles/osconfig.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/osconfig.patchDeploymentAdmin`, `roles/osconfig.patchDeploymentViewer`, `roles/wiz.cloudInventoryViewer` |
| `osconfig.patchDeployments.pause` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/osconfig.admin`, `roles/osconfig.patchDeploymentAdmin` |
| `osconfig.patchDeployments.resume` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/osconfig.admin`, `roles/osconfig.patchDeploymentAdmin` |
| `osconfig.patchDeployments.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/osconfig.admin`, `roles/osconfig.patchDeploymentAdmin` |
| `osconfig.patchJobs.exec` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/osconfig.admin`, `roles/osconfig.patchJobExecutor` |
| `osconfig.patchJobs.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/osconfig.admin`, `roles/osconfig.viewer`, `roles/iam.supportUser`, `roles/osconfig.patchJobExecutor`, `roles/osconfig.patchJobViewer` |
| `osconfig.patchJobs.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/osconfig.admin`, `roles/osconfig.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/osconfig.patchJobExecutor`, `roles/osconfig.patchJobViewer` |
| `osconfig.policyOrchestrators.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/osconfig.admin`, `roles/osconfig.policyOrchestratorAdmin` |
| `osconfig.policyOrchestrators.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/osconfig.admin`, `roles/osconfig.policyOrchestratorAdmin` |
| `osconfig.policyOrchestrators.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/osconfig.admin`, `roles/osconfig.viewer`, `roles/iam.supportUser`, `roles/osconfig.policyOrchestratorAdmin`, `roles/osconfig.policyOrchestratorViewer` |
| `osconfig.policyOrchestrators.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/osconfig.admin`, `roles/osconfig.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/osconfig.policyOrchestratorAdmin`, `roles/osconfig.policyOrchestratorViewer` |
| `osconfig.policyOrchestrators.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/osconfig.admin`, `roles/osconfig.policyOrchestratorAdmin` |
| `osconfig.projectFeatureSettings.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/osconfig.admin`, `roles/osconfig.viewer`, `roles/iam.supportUser`, `roles/osconfig.projectFeatureSettingsEditor`, `roles/osconfig.projectFeatureSettingsViewer` (+1 service agent role) |
| `osconfig.projectFeatureSettings.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/osconfig.admin`, `roles/osconfig.projectFeatureSettingsEditor` (+1 service agent role) |
| `osconfig.upgradeReports.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/osconfig.admin`, `roles/osconfig.viewer`, `roles/iam.supportUser`, `roles/osconfig.upgradeReportViewer` |
| `osconfig.upgradeReports.getSummary` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/osconfig.admin`, `roles/osconfig.viewer`, `roles/iam.supportUser`, `roles/osconfig.upgradeReportViewer` |
| `osconfig.upgradeReports.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/osconfig.admin`, `roles/osconfig.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/osconfig.upgradeReportViewer` |
| `osconfig.upgradeReports.searchSummaries` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/osconfig.admin`, `roles/osconfig.viewer`, `roles/iam.supportUser`, `roles/osconfig.upgradeReportViewer` |
| `osconfig.vulnerabilityReports.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/osconfig.admin`, `roles/osconfig.viewer`, `roles/iam.supportUser`, `roles/osconfig.vulnerabilityReportViewer` |
| `osconfig.vulnerabilityReports.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/osconfig.admin`, `roles/osconfig.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/osconfig.vulnerabilityReportViewer` |

## Notes

- Roles and permissions of the `osconfig` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/osconfig (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
