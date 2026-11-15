---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/servicemanagement
---

# Service Management IAM roles and permissions

## Signature / Usage

Predefined roles of `servicemanagement` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

### Service Management Administrator (`roles/servicemanagement.admin`)

- Full control of Google Service Management resources.
- Permissions (37): `monitoring.timeSeries.list`, `resourcemanager.folders.get`, `resourcemanager.folders.list`, `resourcemanager.organizations.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `serviceconsumermanagement.consumers.get`, `serviceconsumermanagement.quota.get`, `serviceconsumermanagement.quota.update`, `serviceconsumermanagement.tenancyu.addResource`, `serviceconsumermanagement.tenancyu.create`, `serviceconsumermanagement.tenancyu.delete`, `serviceconsumermanagement.tenancyu.list`, `serviceconsumermanagement.tenancyu.removeResource`, `servicemanagement.services.bind`, `servicemanagement.services.check`, `servicemanagement.services.create`, `servicemanagement.services.delete`, `servicemanagement.services.get`, `servicemanagement.services.getIamPolicy`, `servicemanagement.services.list`, `servicemanagement.services.quota`, `servicemanagement.services.report`, `servicemanagement.services.setIamPolicy`, `servicemanagement.services.update`, `serviceusage.catalogs.listMembers`, `serviceusage.consumerpolicy.analyze`, `serviceusage.consumerpolicy.get`, `serviceusage.effectivepolicy.get`, `serviceusage.groups.list`, `serviceusage.groups.listExpandedMembers`, `serviceusage.groups.listMembers`, `serviceusage.quotas.get`, `serviceusage.services.get`, `serviceusage.services.listApis`, `serviceusage.services.listDependentServices`, `serviceusage.values.test`

### Service Management Editor (`roles/servicemanagement.editor`)

- Editor role for Service Management.
- Permissions (11): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `servicemanagement.services.bind`, `servicemanagement.services.check`, `servicemanagement.services.create`, `servicemanagement.services.delete`, `servicemanagement.services.get`, `servicemanagement.services.list`, `servicemanagement.services.quota`, `servicemanagement.services.report`, `servicemanagement.services.update`

### Service Management Viewer (`roles/servicemanagement.viewer`)

- Viewer role for Service Management.
- Permissions (4): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `servicemanagement.services.get`, `servicemanagement.services.list`

### Service Checker (`roles/servicemanagement.checker`)

- Can check admission of a service during runtime.
- Permissions (1): `servicemanagement.services.check`

### Service Config Editor (`roles/servicemanagement.configEditor`)

- Access to update the service config and create rollouts.
- Permissions (2): `servicemanagement.services.get`, `servicemanagement.services.update`

### Quota Administrator (`roles/servicemanagement.quotaAdmin`)

- Launch stage: Beta
- Provides access to administer service quotas. Lowest-level resources where you can grant this role: - Project
- Permissions (32): `cloudquotas.quotas.get`, `cloudquotas.quotas.update`, `monitoring.alertPolicies.create`, `monitoring.alertPolicies.createTagBinding`, `monitoring.alertPolicies.delete`, `monitoring.alertPolicies.deleteTagBinding`, `monitoring.alertPolicies.get`, `monitoring.alertPolicies.list`, `monitoring.alertPolicies.listEffectiveTags`, `monitoring.alertPolicies.listTagBindings`, `monitoring.alertPolicies.update`, `monitoring.timeSeries.list`, `resourcemanager.organizations.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `serviceusage.catalogs.listMembers`, `serviceusage.consumerpolicy.analyze`, `serviceusage.consumerpolicy.get`, `serviceusage.consumerpolicy.update`, `serviceusage.effectivepolicy.get`, `serviceusage.groups.list`, `serviceusage.groups.listExpandedMembers`, `serviceusage.groups.listMembers`, `serviceusage.quotas.get`, `serviceusage.quotas.update`, `serviceusage.services.disable`, `serviceusage.services.enable`, `serviceusage.services.get`, `serviceusage.services.list`, `serviceusage.services.listApis`, `serviceusage.services.listDependentServices`, `serviceusage.values.test`

### Quota Viewer (`roles/servicemanagement.quotaViewer`)

- Launch stage: Beta
- Provides access to view service quotas. Lowest-level resources where you can grant this role: - Project
- Permissions (15): `cloudquotas.quotas.get`, `monitoring.timeSeries.list`, `serviceusage.catalogs.listMembers`, `serviceusage.consumerpolicy.analyze`, `serviceusage.consumerpolicy.get`, `serviceusage.effectivepolicy.get`, `serviceusage.groups.list`, `serviceusage.groups.listExpandedMembers`, `serviceusage.groups.listMembers`, `serviceusage.quotas.get`, `serviceusage.services.get`, `serviceusage.services.list`, `serviceusage.services.listApis`, `serviceusage.services.listDependentServices`, `serviceusage.values.test`

### Service Reporter (`roles/servicemanagement.reporter`)

- Can report usage of a service during runtime.
- Permissions (1): `servicemanagement.services.report`

### Service Consumer (`roles/servicemanagement.serviceConsumer`)

- Can enable the service.
- Permissions (1): `servicemanagement.services.bind`

### Service Controller (`roles/servicemanagement.serviceController`)

- Can check preconditions and report usage of a service during runtime. Lowest-level resources where you can grant this role: - Project
- Permissions (4): `servicemanagement.services.check`, `servicemanagement.services.get`, `servicemanagement.services.quota`, `servicemanagement.services.report`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Project):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/servicemanagement.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `servicemanagement.services.bind` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/servicemanagement.admin`, `roles/servicemanagement.editor`, `roles/servicemanagement.serviceConsumer` (+3 service agent roles) |
| `servicemanagement.services.check` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/servicemanagement.admin`, `roles/servicemanagement.editor`, `roles/servicemanagement.checker`, `roles/servicemanagement.serviceController` (+2 service agent roles) |
| `servicemanagement.services.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/servicemanagement.admin`, `roles/servicemanagement.editor` (+1 service agent role) |
| `servicemanagement.services.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/servicemanagement.admin`, `roles/servicemanagement.editor` (+1 service agent role) |
| `servicemanagement.services.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/apigateway.admin`, `roles/apigateway.editor`, `roles/apigateway.viewer`, `roles/servicemanagement.admin`, `roles/servicemanagement.editor`, `roles/servicemanagement.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/servicemanagement.configEditor`, `roles/servicemanagement.serviceController`, `roles/wiz.cloudInventoryViewer` (+3 service agent roles) |
| `servicemanagement.services.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/servicemanagement.admin`, `roles/iam.securityAuditor` |
| `servicemanagement.services.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/servicemanagement.admin`, `roles/servicemanagement.editor`, `roles/servicemanagement.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` (+2 service agent roles) |
| `servicemanagement.services.quota` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/servicemanagement.admin`, `roles/servicemanagement.editor`, `roles/servicemanagement.serviceController` (+2 service agent roles) |
| `servicemanagement.services.report` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/servicemanagement.admin`, `roles/servicemanagement.editor`, `roles/servicemanagement.reporter`, `roles/servicemanagement.serviceController` (+8 service agent roles) |
| `servicemanagement.services.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/iam.securityAdmin`, `roles/servicemanagement.admin` |
| `servicemanagement.services.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/servicemanagement.admin`, `roles/servicemanagement.editor`, `roles/servicemanagement.configEditor` (+1 service agent role) |

## Notes

- Roles and permissions of the `servicemanagement` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/servicemanagement (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
