---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/assuredworkloads
---

# Assured Workloads IAM roles and permissions

## Signature / Usage

Predefined roles of `assuredworkloads` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Assured Workloads Administrator (`roles/assuredworkloads.admin`)

- Grants full access to Assured Workloads resources, CRM resources - project/folder and Organization Policy administration
- Permissions (46): `assuredworkloads.dbControlComplianceSummaries.list`, `assuredworkloads.dbFindingSummaries.list`, `assuredworkloads.dbFrameworkComplianceReports.aggregate`, `assuredworkloads.dbFrameworkComplianceReports.get`, `assuredworkloads.dbFrameworkComplianceSummaries.list`, `assuredworkloads.operations.get`, `assuredworkloads.operations.list`, `assuredworkloads.updates.list`, `assuredworkloads.updates.update`, `assuredworkloads.violations.get`, `assuredworkloads.violations.list`, `assuredworkloads.violations.update`, `assuredworkloads.workload.create`, `assuredworkloads.workload.delete`, `assuredworkloads.workload.get`, `assuredworkloads.workload.list`, `assuredworkloads.workload.update`, `axt.labels.set`, `bigquery.config.update`, `cloudsecuritycompliance.cloudControlPredictions.create`, `cloudsecuritycompliance.cloudControlPredictions.get`, `cloudsecuritycompliance.cloudControlPredictions.list`, `cloudsecuritycompliance.cloudControls.create`, `cloudsecuritycompliance.cloudControls.delete`, `cloudsecuritycompliance.cloudControls.get`, `cloudsecuritycompliance.cloudControls.list`, `cloudsecuritycompliance.cloudControls.update`, `cloudsecuritycompliance.frameworks.create`, `cloudsecuritycompliance.frameworks.delete`, `cloudsecuritycompliance.frameworks.get`, `cloudsecuritycompliance.frameworks.list`, `cloudsecuritycompliance.frameworks.update`, `logging.settings.update`, `orgpolicy.policies.create`, `orgpolicy.policies.delete`, `orgpolicy.policies.list`, `orgpolicy.policies.update`, `orgpolicy.policy.get`, `orgpolicy.policy.set`, `resourcemanager.folders.create`, `resourcemanager.folders.get`, `resourcemanager.folders.list`, `resourcemanager.organizations.get`, `resourcemanager.projects.create`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Assured Workloads Editor (`roles/assuredworkloads.editor`)

- Grants read, write access to Assured Workloads resources, CRM resources - project/folder and Organization Policy administration
- Permissions (46): `assuredworkloads.dbControlComplianceSummaries.list`, `assuredworkloads.dbFindingSummaries.list`, `assuredworkloads.dbFrameworkComplianceReports.aggregate`, `assuredworkloads.dbFrameworkComplianceReports.get`, `assuredworkloads.dbFrameworkComplianceSummaries.list`, `assuredworkloads.operations.get`, `assuredworkloads.operations.list`, `assuredworkloads.updates.list`, `assuredworkloads.updates.update`, `assuredworkloads.violations.get`, `assuredworkloads.violations.list`, `assuredworkloads.violations.update`, `assuredworkloads.workload.create`, `assuredworkloads.workload.delete`, `assuredworkloads.workload.get`, `assuredworkloads.workload.list`, `assuredworkloads.workload.update`, `axt.labels.set`, `bigquery.config.update`, `cloudsecuritycompliance.cloudControlPredictions.create`, `cloudsecuritycompliance.cloudControlPredictions.get`, `cloudsecuritycompliance.cloudControlPredictions.list`, `cloudsecuritycompliance.cloudControls.create`, `cloudsecuritycompliance.cloudControls.delete`, `cloudsecuritycompliance.cloudControls.get`, `cloudsecuritycompliance.cloudControls.list`, `cloudsecuritycompliance.cloudControls.update`, `cloudsecuritycompliance.frameworks.create`, `cloudsecuritycompliance.frameworks.delete`, `cloudsecuritycompliance.frameworks.get`, `cloudsecuritycompliance.frameworks.list`, `cloudsecuritycompliance.frameworks.update`, `logging.settings.update`, `orgpolicy.policies.create`, `orgpolicy.policies.delete`, `orgpolicy.policies.list`, `orgpolicy.policies.update`, `orgpolicy.policy.get`, `orgpolicy.policy.set`, `resourcemanager.folders.create`, `resourcemanager.folders.get`, `resourcemanager.folders.list`, `resourcemanager.organizations.get`, `resourcemanager.projects.create`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Assured Workloads Viewer (`roles/assuredworkloads.viewer`)

- Viewer role for Assured Workloads
- Permissions (25): `assuredworkloads.dbControlComplianceSummaries.list`, `assuredworkloads.dbFindingSummaries.list`, `assuredworkloads.dbFrameworkComplianceReports.aggregate`, `assuredworkloads.dbFrameworkComplianceReports.get`, `assuredworkloads.dbFrameworkComplianceSummaries.list`, `assuredworkloads.operations.get`, `assuredworkloads.operations.list`, `assuredworkloads.updates.list`, `assuredworkloads.violations.get`, `assuredworkloads.violations.list`, `assuredworkloads.workload.get`, `assuredworkloads.workload.list`, `cloudsecuritycompliance.cloudControlPredictions.get`, `cloudsecuritycompliance.cloudControlPredictions.list`, `cloudsecuritycompliance.cloudControls.get`, `cloudsecuritycompliance.cloudControls.list`, `cloudsecuritycompliance.frameworks.get`, `cloudsecuritycompliance.frameworks.list`, `orgpolicy.policies.list`, `orgpolicy.policy.get`, `resourcemanager.folders.get`, `resourcemanager.folders.list`, `resourcemanager.organizations.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Assured Workloads Reader (`roles/assuredworkloads.reader`)

- Grants read access to all Assured Workloads resources and CRM resources - project/folder
- Permissions (25): `assuredworkloads.dbControlComplianceSummaries.list`, `assuredworkloads.dbFindingSummaries.list`, `assuredworkloads.dbFrameworkComplianceReports.aggregate`, `assuredworkloads.dbFrameworkComplianceReports.get`, `assuredworkloads.dbFrameworkComplianceSummaries.list`, `assuredworkloads.operations.get`, `assuredworkloads.operations.list`, `assuredworkloads.updates.list`, `assuredworkloads.violations.get`, `assuredworkloads.violations.list`, `assuredworkloads.workload.get`, `assuredworkloads.workload.list`, `cloudsecuritycompliance.cloudControlPredictions.get`, `cloudsecuritycompliance.cloudControlPredictions.list`, `cloudsecuritycompliance.cloudControls.get`, `cloudsecuritycompliance.cloudControls.list`, `cloudsecuritycompliance.frameworks.get`, `cloudsecuritycompliance.frameworks.list`, `orgpolicy.policies.list`, `orgpolicy.policy.get`, `resourcemanager.folders.get`, `resourcemanager.folders.list`, `resourcemanager.organizations.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Assured Workloads Monitoring Service Agent (`roles/assuredworkloads.monitoringServiceAgent`)

- Gives the Assured Workloads service account access to create CAIS feed and monitor Assured Workloads. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (7): `cloudasset.assets.exportIamPolicy`, `cloudasset.assets.exportResource`, `cloudasset.assets.listResource`, `cloudasset.feeds.create`, `cloudasset.feeds.delete`, `cloudasset.feeds.get`, `cloudasset.feeds.list`

#### Assured Workloads Service Agent (`roles/assuredworkloads.serviceAgent`)

- Gives the Assured Workloads service account access to create KMS keyrings and keys, monitor Assured Workloads and read Organization Policies. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (18): `cloudkms.cryptoKeys.create`, `cloudkms.keyRings.create`, `orgpolicy.policies.list`, `orgpolicy.policy.get`, `serviceusage.catalogs.listMembers`, `serviceusage.consumerpolicy.analyze`, `serviceusage.consumerpolicy.get`, `serviceusage.consumerpolicy.update`, `serviceusage.effectivepolicy.get`, `serviceusage.groups.list`, `serviceusage.groups.listExpandedMembers`, `serviceusage.groups.listMembers`, `serviceusage.services.enable`, `serviceusage.services.get`, `serviceusage.services.listApis`, `serviceusage.services.listDependentServices`, `serviceusage.services.use`, `serviceusage.values.test`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/assuredworkloads.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `assuredworkloads.dbControlComplianceSummaries.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/assuredworkloads.admin`, `roles/assuredworkloads.editor`, `roles/assuredworkloads.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/assuredworkloads.reader`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `assuredworkloads.dbFindingSummaries.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/assuredworkloads.admin`, `roles/assuredworkloads.editor`, `roles/assuredworkloads.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/assuredworkloads.reader`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `assuredworkloads.dbFrameworkComplianceReports.aggregate` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/assuredworkloads.admin`, `roles/assuredworkloads.editor`, `roles/assuredworkloads.viewer`, `roles/assuredworkloads.reader`, `roles/iam.supportUser` |
| `assuredworkloads.dbFrameworkComplianceReports.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/assuredworkloads.admin`, `roles/assuredworkloads.editor`, `roles/assuredworkloads.viewer`, `roles/assuredworkloads.reader`, `roles/iam.supportUser` |
| `assuredworkloads.dbFrameworkComplianceSummaries.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/assuredworkloads.admin`, `roles/assuredworkloads.editor`, `roles/assuredworkloads.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/assuredworkloads.reader`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `assuredworkloads.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/assuredworkloads.admin`, `roles/assuredworkloads.editor`, `roles/assuredworkloads.viewer`, `roles/assuredworkloads.reader`, `roles/iam.supportUser` |
| `assuredworkloads.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/assuredworkloads.admin`, `roles/assuredworkloads.editor`, `roles/assuredworkloads.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/assuredworkloads.reader`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `assuredworkloads.updates.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/assuredworkloads.admin`, `roles/assuredworkloads.editor`, `roles/assuredworkloads.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/assuredworkloads.reader`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `assuredworkloads.updates.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/assuredworkloads.admin`, `roles/assuredworkloads.editor` |
| `assuredworkloads.violations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/assuredworkloads.admin`, `roles/assuredworkloads.editor`, `roles/assuredworkloads.viewer`, `roles/assuredworkloads.reader`, `roles/iam.supportUser` (+1 service agent role) |
| `assuredworkloads.violations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/assuredworkloads.admin`, `roles/assuredworkloads.editor`, `roles/assuredworkloads.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/assuredworkloads.reader`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+1 service agent role) |
| `assuredworkloads.violations.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/assuredworkloads.admin`, `roles/assuredworkloads.editor` |
| `assuredworkloads.workload.create` | `roles/assuredworkloads.admin`, `roles/assuredworkloads.editor` |
| `assuredworkloads.workload.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/assuredworkloads.admin`, `roles/assuredworkloads.editor` |
| `assuredworkloads.workload.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/assuredworkloads.admin`, `roles/assuredworkloads.editor`, `roles/assuredworkloads.viewer`, `roles/assuredworkloads.reader`, `roles/iam.supportUser` |
| `assuredworkloads.workload.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/assuredworkloads.admin`, `roles/assuredworkloads.editor`, `roles/assuredworkloads.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/assuredworkloads.reader`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `assuredworkloads.workload.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/assuredworkloads.admin`, `roles/assuredworkloads.editor` |

## Notes

- Roles and permissions of the `assuredworkloads` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/assuredworkloads (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
