---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/securityposture
---

# Security Posture API IAM roles and permissions

## Signature / Usage

Predefined roles of `securityposture` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Security Posture Admin (`roles/securityposture.admin`)

- Full access to Security Posture service APIs. Lowest-level resources where you can grant this role: - Organization
- Permissions (47): `orgpolicy.constraints.list`, `orgpolicy.customConstraints.create`, `orgpolicy.customConstraints.delete`, `orgpolicy.customConstraints.get`, `orgpolicy.customConstraints.list`, `orgpolicy.customConstraints.update`, `orgpolicy.policies.create`, `orgpolicy.policies.delete`, `orgpolicy.policies.list`, `orgpolicy.policies.update`, `orgpolicy.policy.get`, `orgpolicy.policy.set`, `resourcemanager.organizations.get`, `securitycenter.securityhealthanalyticssettings.calculate`, `securitycenter.securityhealthanalyticssettings.get`, `securitycenter.securityhealthanalyticssettings.update`, `securitycentermanagement.effectiveSecurityHealthAnalyticsCustomModules.get`, `securitycentermanagement.effectiveSecurityHealthAnalyticsCustomModules.list`, `securitycentermanagement.securityCenterServices.get`, `securitycentermanagement.securityCenterServices.list`, `securitycentermanagement.securityCenterServices.update`, `securitycentermanagement.securityHealthAnalyticsCustomModules.create`, `securitycentermanagement.securityHealthAnalyticsCustomModules.delete`, `securitycentermanagement.securityHealthAnalyticsCustomModules.get`, `securitycentermanagement.securityHealthAnalyticsCustomModules.list`, `securitycentermanagement.securityHealthAnalyticsCustomModules.update`, `securityposture.locations.get`, `securityposture.locations.list`, `securityposture.operations.delete`, `securityposture.operations.get`, `securityposture.operations.list`, `securityposture.postureDeployments.create`, `securityposture.postureDeployments.delete`, `securityposture.postureDeployments.get`, `securityposture.postureDeployments.list`, `securityposture.postureDeployments.update`, `securityposture.postureTemplates.get`, `securityposture.postureTemplates.list`, `securityposture.postures.create`, `securityposture.postures.delete`, `securityposture.postures.extract`, `securityposture.postures.get`, `securityposture.postures.list`, `securityposture.postures.update`, `securityposture.reports.create`, `securityposture.reports.get`, `securityposture.reports.list`

#### Security Posture Viewer (`roles/securityposture.viewer`)

- Read only access to all the SecurityPosture Service resources.
- Permissions (13): `resourcemanager.organizations.get`, `securityposture.locations.get`, `securityposture.locations.list`, `securityposture.operations.get`, `securityposture.operations.list`, `securityposture.postureDeployments.get`, `securityposture.postureDeployments.list`, `securityposture.postureTemplates.get`, `securityposture.postureTemplates.list`, `securityposture.postures.get`, `securityposture.postures.list`, `securityposture.reports.get`, `securityposture.reports.list`

#### Security Posture Deployer (`roles/securityposture.postureDeployer`)

- Mutate and read permissions to the Posture Deployment resource.
- Permissions (28): `orgpolicy.constraints.list`, `orgpolicy.customConstraints.create`, `orgpolicy.customConstraints.delete`, `orgpolicy.customConstraints.get`, `orgpolicy.customConstraints.list`, `orgpolicy.customConstraints.update`, `orgpolicy.policies.create`, `orgpolicy.policies.delete`, `orgpolicy.policies.list`, `orgpolicy.policies.update`, `orgpolicy.policy.get`, `orgpolicy.policy.set`, `resourcemanager.organizations.get`, `securitycenter.securityhealthanalyticssettings.calculate`, `securitycenter.securityhealthanalyticssettings.get`, `securitycenter.securityhealthanalyticssettings.update`, `securitycentermanagement.securityCenterServices.get`, `securitycentermanagement.securityCenterServices.list`, `securitycentermanagement.securityCenterServices.update`, `securitycentermanagement.securityHealthAnalyticsCustomModules.create`, `securitycentermanagement.securityHealthAnalyticsCustomModules.delete`, `securitycentermanagement.securityHealthAnalyticsCustomModules.update`, `securityposture.operations.get`, `securityposture.postureDeployments.create`, `securityposture.postureDeployments.delete`, `securityposture.postureDeployments.get`, `securityposture.postureDeployments.list`, `securityposture.postureDeployments.update`

#### Security Posture Deployments Viewer (`roles/securityposture.postureDeploymentsViewer`)

- Read only access to the Posture Deployment resource.
- Permissions (4): `resourcemanager.organizations.get`, `securityposture.operations.get`, `securityposture.postureDeployments.get`, `securityposture.postureDeployments.list`

#### Security Posture Resource Editor (`roles/securityposture.postureEditor`)

- Mutate and read permissions to the Posture resource.
- Permissions (7): `securityposture.operations.get`, `securityposture.postures.create`, `securityposture.postures.delete`, `securityposture.postures.extract`, `securityposture.postures.get`, `securityposture.postures.list`, `securityposture.postures.update`

#### Security Posture Resource Viewer (`roles/securityposture.postureViewer`)

- Read only access to the Posture resource.
- Permissions (4): `resourcemanager.organizations.get`, `securityposture.operations.get`, `securityposture.postures.get`, `securityposture.postures.list`

#### Security Posture Shift-Left Validator (`roles/securityposture.reportCreator`)

- Create access for Reports, e.g. IaC Validation Report.
- Permissions (4): `securityposture.operations.get`, `securityposture.reports.create`, `securityposture.reports.get`, `securityposture.reports.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Organization):

```bash
gcloud organizations add-iam-policy-binding ORGANIZATION_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/securityposture.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `securityposture.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/securitycenter.admin`, `roles/securityposture.admin`, `roles/securityposture.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/securitycenter.adminEditor`, `roles/securitycenter.adminViewer` |
| `securityposture.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/securitycenter.admin`, `roles/securityposture.admin`, `roles/securityposture.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/securitycenter.adminEditor`, `roles/securitycenter.adminViewer` |
| `securityposture.operations.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/securityposture.admin` |
| `securityposture.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/securitycenter.admin`, `roles/securityposture.admin`, `roles/securityposture.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/securitycenter.adminEditor`, `roles/securitycenter.adminViewer`, `roles/securityposture.postureDeployer`, `roles/securityposture.postureDeploymentsViewer`, `roles/securityposture.postureEditor`, `roles/securityposture.postureViewer`, `roles/securityposture.reportCreator` (+1 service agent role) |
| `securityposture.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/securitycenter.admin`, `roles/securityposture.admin`, `roles/securityposture.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/securitycenter.adminEditor`, `roles/securitycenter.adminViewer` |
| `securityposture.postureDeployments.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/securityposture.admin`, `roles/securityposture.postureDeployer` (+1 service agent role) |
| `securityposture.postureDeployments.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/securityposture.admin`, `roles/securityposture.postureDeployer` (+1 service agent role) |
| `securityposture.postureDeployments.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/securitycenter.admin`, `roles/securityposture.admin`, `roles/securityposture.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/securitycenter.adminEditor`, `roles/securitycenter.adminViewer`, `roles/securityposture.postureDeployer`, `roles/securityposture.postureDeploymentsViewer` (+1 service agent role) |
| `securityposture.postureDeployments.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/securitycenter.admin`, `roles/securityposture.admin`, `roles/securityposture.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/securitycenter.adminEditor`, `roles/securitycenter.adminViewer`, `roles/securityposture.postureDeployer`, `roles/securityposture.postureDeploymentsViewer` (+1 service agent role) |
| `securityposture.postureDeployments.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/securityposture.admin`, `roles/securityposture.postureDeployer` |
| `securityposture.postureTemplates.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/securitycenter.admin`, `roles/securityposture.admin`, `roles/securityposture.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/securitycenter.adminEditor`, `roles/securitycenter.adminViewer` |
| `securityposture.postureTemplates.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/securitycenter.admin`, `roles/securityposture.admin`, `roles/securityposture.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/securitycenter.adminEditor`, `roles/securitycenter.adminViewer` |
| `securityposture.postures.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/securityposture.admin`, `roles/securityposture.postureEditor` (+1 service agent role) |
| `securityposture.postures.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/securityposture.admin`, `roles/securityposture.postureEditor` |
| `securityposture.postures.extract` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/securityposture.admin`, `roles/securityposture.postureEditor` |
| `securityposture.postures.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/securitycenter.admin`, `roles/securityposture.admin`, `roles/securityposture.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/securitycenter.adminEditor`, `roles/securitycenter.adminViewer`, `roles/securityposture.postureEditor`, `roles/securityposture.postureViewer` (+1 service agent role) |
| `securityposture.postures.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/securitycenter.admin`, `roles/securityposture.admin`, `roles/securityposture.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/securitycenter.adminEditor`, `roles/securitycenter.adminViewer`, `roles/securityposture.postureEditor`, `roles/securityposture.postureViewer` |
| `securityposture.postures.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/securityposture.admin`, `roles/securityposture.postureEditor` |
| `securityposture.reports.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/securityposture.admin`, `roles/securityposture.reportCreator` |
| `securityposture.reports.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/securitycenter.admin`, `roles/securityposture.admin`, `roles/securityposture.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/securitycenter.adminEditor`, `roles/securitycenter.adminViewer`, `roles/securityposture.reportCreator` |
| `securityposture.reports.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/securitycenter.admin`, `roles/securityposture.admin`, `roles/securityposture.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/securitycenter.adminEditor`, `roles/securitycenter.adminViewer`, `roles/securityposture.reportCreator` |

## Notes

- Roles and permissions of the `securityposture` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/securityposture (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
