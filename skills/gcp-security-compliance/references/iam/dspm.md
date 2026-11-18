---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/dspm
---

# Data Security Posture Management IAM roles and permissions

## Signature / Usage

Predefined roles of `dspm` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Data Security Posture Management Admin (`roles/dspm.admin`)

- Full access to Data Security Posture Management resources.
- Permissions (12): `dspm.locations.computeAggregation`, `dspm.locations.fetchDataGovernanceAnalytics`, `dspm.locations.fetchDspmGovernedProjects`, `dspm.locations.fetchGovernedResourceMetrics`, `dspm.locations.fetchLineageConnections`, `dspm.locations.get`, `dspm.locations.list`, `dspm.operations.cancel`, `dspm.operations.delete`, `dspm.operations.get`, `dspm.operations.list`, `resourcemanager.organizations.get`

#### Data Security Posture Management Viewer (`roles/dspm.viewer`)

- Readonly access to Data Security Posture Management resources.
- Permissions (10): `dspm.locations.computeAggregation`, `dspm.locations.fetchDataGovernanceAnalytics`, `dspm.locations.fetchDspmGovernedProjects`, `dspm.locations.fetchGovernedResourceMetrics`, `dspm.locations.fetchLineageConnections`, `dspm.locations.get`, `dspm.locations.list`, `dspm.operations.get`, `dspm.operations.list`, `resourcemanager.organizations.get`

#### DSPM Service Agent (`roles/dspm.serviceAgent`)

- Gives DSPM Service Account access to consumer resources. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (98): `aiplatform.artifacts.list`, `aiplatform.contexts.list`, `aiplatform.dataItems.list`, `aiplatform.datasets.get`, `aiplatform.datasets.list`, `aiplatform.endpoints.list`, `aiplatform.entityTypes.list`, `aiplatform.executions.list`, `aiplatform.metadataSchemas.list`, `aiplatform.modelEvaluations.list`, `aiplatform.models.list`, `aiplatform.trainingPipelines.list`, `aiplatform.tuningJobs.list`, `bigquery.datasets.createTagBinding`, `bigquery.datasets.deleteTagBinding`, `bigquery.datasets.listEffectiveTags`, `bigquery.datasets.listTagBindings`, `bigquery.jobs.create`, `bigquery.tables.createTagBinding`, `bigquery.tables.deleteTagBinding`, `bigquery.tables.getData`, `bigquery.tables.list`, `bigquery.tables.listEffectiveTags`, `bigquery.tables.listTagBindings`, `cloudasset.assets.exportResource`, `cloudasset.assets.listResource`, `cloudasset.assets.queryResource`, `cloudasset.assets.searchAllResources`, `cloudasset.feeds.create`, `cloudasset.feeds.delete`, `cloudasset.feeds.get`, `cloudasset.feeds.update`, `cloudsecuritycompliance.cloudControlDeployments.create`, `cloudsecuritycompliance.cloudControlDeployments.delete`, `cloudsecuritycompliance.cloudControlDeployments.get`, `cloudsecuritycompliance.cloudControlDeployments.list`, `cloudsecuritycompliance.cloudControls.get`, `cloudsecuritycompliance.cloudControls.list`, `cloudsecuritycompliance.frameworkDeployments.create`, `cloudsecuritycompliance.frameworkDeployments.delete`, `cloudsecuritycompliance.frameworkDeployments.get`, `cloudsecuritycompliance.frameworkDeployments.list`, `cloudsecuritycompliance.frameworks.get`, `resourcemanager.folders.getIamPolicy`, `resourcemanager.hierarchyNodes.createTagBinding`, `resourcemanager.hierarchyNodes.deleteTagBinding`, `resourcemanager.hierarchyNodes.listEffectiveTags`, `resourcemanager.hierarchyNodes.listTagBindings`, `resourcemanager.organizations.getIamPolicy`, `resourcemanager.projects.getIamPolicy`, `resourcemanager.tagKeys.create`, `resourcemanager.tagKeys.delete`, `resourcemanager.tagKeys.get`, `resourcemanager.tagKeys.getIamPolicy`, `resourcemanager.tagKeys.list`, `resourcemanager.tagKeys.update`, `resourcemanager.tagValueBindings.create`, `resourcemanager.tagValueBindings.delete`, `resourcemanager.tagValues.create`, `resourcemanager.tagValues.delete`, `resourcemanager.tagValues.get`, `resourcemanager.tagValues.getIamPolicy`, `resourcemanager.tagValues.list`, `resourcemanager.tagValues.update`, `securitycenter.securityhealthanalyticssettings.calculate`, `securitycenter.securityhealthanalyticssettings.get`, `securitycenter.securityhealthanalyticssettings.update`, `securitycentermanagement.effectiveSecurityHealthAnalyticsCustomModules.get`, `securitycentermanagement.securityCenterServices.get`, `securitycentermanagement.securityCenterServices.update`, `securitycentermanagement.securityHealthAnalyticsCustomModules.create`, `securitycentermanagement.securityHealthAnalyticsCustomModules.get`, `securityposture.operations.get`, `securityposture.postureDeployments.create`, `securityposture.postureDeployments.delete`, `securityposture.postureDeployments.get`, `securityposture.postureDeployments.list`, `securityposture.postures.create`, `securityposture.postures.get`, `serviceusage.catalogs.listMembers`, `serviceusage.consumerpolicy.analyze`, `serviceusage.consumerpolicy.get`, `serviceusage.consumerpolicy.update`, `serviceusage.effectivepolicy.get`, `serviceusage.groups.list`, `serviceusage.groups.listExpandedMembers`, `serviceusage.groups.listMembers`, `serviceusage.services.enable`, `serviceusage.services.get`, `serviceusage.services.list`, `serviceusage.services.listApis`, `serviceusage.services.listDependentServices`, `serviceusage.values.test`, `storage.buckets.createTagBinding`, `storage.buckets.deleteTagBinding`, `storage.buckets.listEffectiveTags`, `storage.buckets.listTagBindings`, `storage.intelligenceConfigs.get`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/dspm.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `dspm.locations.computeAggregation` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/dspm.admin`, `roles/dspm.viewer`, `roles/securitycenter.admin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/securitycenter.adminEditor`, `roles/securitycenter.adminViewer` |
| `dspm.locations.fetchDataGovernanceAnalytics` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/dspm.admin`, `roles/dspm.viewer`, `roles/securitycenter.admin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/securitycenter.adminEditor`, `roles/securitycenter.adminViewer` |
| `dspm.locations.fetchDspmGovernedProjects` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/dspm.admin`, `roles/dspm.viewer`, `roles/securitycenter.admin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/securitycenter.adminEditor`, `roles/securitycenter.adminViewer` |
| `dspm.locations.fetchGovernedResourceMetrics` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/dspm.admin`, `roles/dspm.viewer`, `roles/securitycenter.admin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/securitycenter.adminEditor`, `roles/securitycenter.adminViewer` |
| `dspm.locations.fetchLineageConnections` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/dspm.admin`, `roles/dspm.viewer`, `roles/securitycenter.admin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/securitycenter.adminEditor`, `roles/securitycenter.adminViewer` |
| `dspm.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/dspm.admin`, `roles/dspm.viewer`, `roles/securitycenter.admin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/securitycenter.adminEditor`, `roles/securitycenter.adminViewer` |
| `dspm.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/dspm.admin`, `roles/dspm.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/securitycenter.admin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/securitycenter.adminEditor`, `roles/securitycenter.adminViewer` |
| `dspm.operations.cancel` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/dspm.admin`, `roles/securitycenter.admin` |
| `dspm.operations.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/dspm.admin`, `roles/securitycenter.admin` |
| `dspm.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/dspm.admin`, `roles/dspm.viewer`, `roles/securitycenter.admin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/securitycenter.adminEditor`, `roles/securitycenter.adminViewer` |
| `dspm.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/dspm.admin`, `roles/dspm.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/securitycenter.admin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/securitycenter.adminEditor`, `roles/securitycenter.adminViewer` |

## Notes

- Roles and permissions of the `dspm` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/dspm (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
