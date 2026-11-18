---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/monitoring
---

# Cloud Monitoring IAM roles and permissions (part 2/2)

## Signature / Usage

Predefined roles of `monitoring` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Example: inspect a role that contains these permissions

Generated example (not in the official docs) describing the first predefined role listed in the table below:

```bash
gcloud iam roles describe roles/apptopology.admin
```

### Permissions and the roles that contain them (continued)

| Permission | Roles |
|---|---|
| `monitoring.uptimeCheckConfigs.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/apptopology.admin`, `roles/apptopology.viewer`, `roles/discoveryengine.admin`, `roles/monitoring.admin`, `roles/monitoring.editor`, `roles/monitoring.viewer`, `roles/securitycenter.admin`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/discoveryengine.agentspaceAdmin`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.devOps`, `roles/iam.infrastructureAdmin`, `roles/iam.mlEngineer`, `roles/iam.networkAdmin`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser`, `roles/monitoring.uptimeCheckConfigEditor`, `roles/monitoring.uptimeCheckConfigViewer`, `roles/securitycenter.adminEditor`, `roles/securitycenter.adminViewer` (+9 service agent roles) |
| `monitoring.uptimeCheckConfigs.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/apptopology.admin`, `roles/apptopology.viewer`, `roles/discoveryengine.admin`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/monitoring.admin`, `roles/monitoring.editor`, `roles/monitoring.viewer`, `roles/securitycenter.admin`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/discoveryengine.agentspaceAdmin`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.devOps`, `roles/iam.infrastructureAdmin`, `roles/iam.mlEngineer`, `roles/iam.networkAdmin`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser`, `roles/monitoring.uptimeCheckConfigEditor`, `roles/monitoring.uptimeCheckConfigViewer`, `roles/securitycenter.adminEditor`, `roles/securitycenter.adminViewer`, `roles/wiz.cloudInventoryViewer` (+8 service agent roles) |
| `monitoring.uptimeCheckConfigs.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/monitoring.admin`, `roles/monitoring.editor`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.devOps`, `roles/iam.infrastructureAdmin`, `roles/iam.networkAdmin`, `roles/iam.siteReliabilityEngineer`, `roles/monitoring.uptimeCheckConfigEditor` (+1 service agent role) |
| `opsconfigmonitoring.resourceMetadata.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/apptopology.admin`, `roles/apptopology.viewer`, `roles/discoveryengine.admin`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/monitoring.admin`, `roles/monitoring.editor`, `roles/monitoring.viewer`, `roles/opsconfigmonitoring.admin`, `roles/opsconfigmonitoring.viewer`, `roles/securitycenter.admin`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/discoveryengine.agentspaceAdmin`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.devOps`, `roles/iam.infrastructureAdmin`, `roles/iam.mlEngineer`, `roles/iam.networkAdmin`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser`, `roles/opsconfigmonitoring.resourceMetadata.viewer`, `roles/securitycenter.adminEditor`, `roles/securitycenter.adminViewer` (+8 service agent roles) |
| `opsconfigmonitoring.resourceMetadata.write` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/monitoring.admin`, `roles/monitoring.editor`, `roles/opsconfigmonitoring.admin`, `roles/gkemulticloud.telemetryWriter`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.devOps`, `roles/iam.infrastructureAdmin`, `roles/iam.networkAdmin`, `roles/iam.siteReliabilityEngineer`, `roles/opsconfigmonitoring.resourceMetadata.writer` (+2 service agent roles) |
| `stackdriver.projects.edit` | `roles/admin`, `roles/owner`, `roles/monitoring.admin`, `roles/monitoring.editor`, `roles/stackdriver.admin`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.devOps`, `roles/iam.infrastructureAdmin`, `roles/iam.networkAdmin`, `roles/iam.siteReliabilityEngineer`, `roles/stackdriver.accounts.editor` |
| `stackdriver.projects.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/apptopology.admin`, `roles/apptopology.viewer`, `roles/discoveryengine.admin`, `roles/errorreporting.admin`, `roles/errorreporting.user`, `roles/errorreporting.viewer`, `roles/firebase.admin`, `roles/monitoring.admin`, `roles/monitoring.editor`, `roles/monitoring.viewer`, `roles/securitycenter.admin`, `roles/stackdriver.admin`, `roles/stackdriver.viewer`, `roles/storage.admin`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/discoveryengine.agentspaceAdmin`, `roles/firebase.developAdmin`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.devOps`, `roles/iam.infrastructureAdmin`, `roles/iam.mlEngineer`, `roles/iam.networkAdmin`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser`, `roles/securitycenter.adminEditor`, `roles/securitycenter.adminViewer`, `roles/stackdriver.accounts.editor`, `roles/stackdriver.accounts.viewer` (+18 service agent roles) |
| `stackdriver.resourceMetadata.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/apptopology.admin`, `roles/apptopology.viewer`, `roles/discoveryengine.admin`, `roles/firebase.admin`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/monitoring.admin`, `roles/monitoring.editor`, `roles/monitoring.viewer`, `roles/securitycenter.admin`, `roles/stackdriver.admin`, `roles/stackdriver.viewer`, `roles/storage.admin`, `roles/apphub.appManagementViewer`, `roles/cloudhub.operator`, `roles/discoveryengine.agentspaceAdmin`, `roles/firebase.developAdmin`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.devOps`, `roles/iam.infrastructureAdmin`, `roles/iam.mlEngineer`, `roles/iam.networkAdmin`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser`, `roles/securitycenter.adminEditor`, `roles/securitycenter.adminViewer` (+15 service agent roles) |
| `stackdriver.resourceMetadata.write` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/monitoring.admin`, `roles/monitoring.editor`, `roles/stackdriver.admin`, `roles/stackdriver.resourceMetadata.writer`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.devOps`, `roles/iam.infrastructureAdmin`, `roles/iam.networkAdmin`, `roles/iam.siteReliabilityEngineer` (+1 service agent role) |

## Notes

- Roles and permissions of the `monitoring` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/monitoring (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
