---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/cloudcontrolspartner
---

# Cloud Controls Partner API IAM roles and permissions

## Signature / Usage

Predefined roles of `cloudcontrolspartner` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Cloud Controls Partner Admin (`roles/cloudcontrolspartner.admin`)

- Full access to Cloud Controls Partner resources.
- Permissions (12): `cloudcontrolspartner.accessapprovalrequests.list`, `cloudcontrolspartner.customers.create`, `cloudcontrolspartner.customers.delete`, `cloudcontrolspartner.customers.get`, `cloudcontrolspartner.customers.list`, `cloudcontrolspartner.ekmconnections.get`, `cloudcontrolspartner.inspectabilityevents.get`, `cloudcontrolspartner.partnerpermissions.get`, `cloudcontrolspartner.partners.get`, `cloudcontrolspartner.platformcontrols.get`, `cloudcontrolspartner.violations.list`, `cloudcontrolspartner.workloads.list`

#### Cloud Controls Partner Editor (`roles/cloudcontrolspartner.editor`)

- Editor access to Cloud Controls Partner resources.
- Permissions (14): `cloudcontrolspartner.accessapprovalrequests.list`, `cloudcontrolspartner.customers.create`, `cloudcontrolspartner.customers.delete`, `cloudcontrolspartner.customers.get`, `cloudcontrolspartner.customers.list`, `cloudcontrolspartner.ekmconnections.get`, `cloudcontrolspartner.inspectabilityevents.get`, `cloudcontrolspartner.partnerpermissions.get`, `cloudcontrolspartner.partners.get`, `cloudcontrolspartner.platformcontrols.get`, `cloudcontrolspartner.violations.get`, `cloudcontrolspartner.violations.list`, `cloudcontrolspartner.workloads.get`, `cloudcontrolspartner.workloads.list`

#### Cloudcontrolspartner Viewer (`roles/cloudcontrolspartner.viewer`)

- Viewer role for cloudcontrolspartner
- Permissions (14): `cloudcontrolspartner.accessapprovalrequests.list`, `cloudcontrolspartner.customers.get`, `cloudcontrolspartner.customers.list`, `cloudcontrolspartner.ekmconnections.get`, `cloudcontrolspartner.inspectabilityevents.get`, `cloudcontrolspartner.partnerpermissions.get`, `cloudcontrolspartner.partners.get`, `cloudcontrolspartner.platformcontrols.get`, `cloudcontrolspartner.violations.get`, `cloudcontrolspartner.violations.list`, `cloudcontrolspartner.workloads.get`, `cloudcontrolspartner.workloads.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud Controls Partner Inspectability Reader (`roles/cloudcontrolspartner.inspectabilityReader`)

- Readonly access to Cloud Controls Partner inspectability resources.
- Permissions (4): `cloudcontrolspartner.customers.get`, `cloudcontrolspartner.customers.list`, `cloudcontrolspartner.inspectabilityevents.get`, `cloudcontrolspartner.platformcontrols.get`

#### Cloud Controls Partner Monitoring Reader (`roles/cloudcontrolspartner.monitoringReader`)

- Read-only access to Cloud Controls Partner monitoring resources.
- Permissions (6): `cloudcontrolspartner.customers.get`, `cloudcontrolspartner.customers.list`, `cloudcontrolspartner.violations.get`, `cloudcontrolspartner.violations.list`, `cloudcontrolspartner.workloads.get`, `cloudcontrolspartner.workloads.list`

#### Cloud Controls Partner Reader (`roles/cloudcontrolspartner.reader`)

- Read-only access to Cloud Controls Partner resources.
- Permissions (12): `cloudcontrolspartner.accessapprovalrequests.list`, `cloudcontrolspartner.customers.get`, `cloudcontrolspartner.customers.list`, `cloudcontrolspartner.ekmconnections.get`, `cloudcontrolspartner.inspectabilityevents.get`, `cloudcontrolspartner.partnerpermissions.get`, `cloudcontrolspartner.partners.get`, `cloudcontrolspartner.platformcontrols.get`, `cloudcontrolspartner.violations.get`, `cloudcontrolspartner.violations.list`, `cloudcontrolspartner.workloads.get`, `cloudcontrolspartner.workloads.list`

#### Cloud Controls Partner Access Approval Service Agent (`roles/cloudcontrolspartner.accessApprovalServiceAgent`)

- Gives the Partner Console service account access to read Access Approval Requests for workloads associated with a partner. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (2): `accessapproval.requests.get`, `accessapproval.requests.list`

#### Cloud Controls Partner EKM Service Agent (`roles/cloudcontrolspartner.ekmServiceAgent`)

- Gives Cloud Controls Partner service agent permission to list EKM connections, get EKM connection status, and provide EKM diagnostic information. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (4): `cloudkms.ekmConnections.get`, `cloudkms.ekmConnections.getIamPolicy`, `cloudkms.ekmConnections.list`, `cloudkms.ekmConnections.verifyConnectivity`

#### Cloud Controls Partner Monitoring Service Agent (`roles/cloudcontrolspartner.monitoringServiceAgent`)

- Gives Cloud Controls Partner monitoring service agent permission to view and list Assured Workload violations. The role is assigned to enable partner monitoring capability. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (2): `assuredworkloads.violations.get`, `assuredworkloads.violations.list`

#### Cloud Controls Partner Support Case Service Agent (`roles/cloudcontrolspartner.supportCaseServiceAgent`)

- Gives the Partner Console service account access to support cases for workloads associated with a partner. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (1): `cloudsupport.techCases.get`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/cloudcontrolspartner.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `cloudcontrolspartner.accessapprovalrequests.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudcontrolspartner.admin`, `roles/cloudcontrolspartner.editor`, `roles/cloudcontrolspartner.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/cloudcontrolspartner.reader`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `cloudcontrolspartner.customers.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudcontrolspartner.admin`, `roles/cloudcontrolspartner.editor` |
| `cloudcontrolspartner.customers.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudcontrolspartner.admin`, `roles/cloudcontrolspartner.editor` |
| `cloudcontrolspartner.customers.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudcontrolspartner.admin`, `roles/cloudcontrolspartner.editor`, `roles/cloudcontrolspartner.viewer`, `roles/cloudcontrolspartner.inspectabilityReader`, `roles/cloudcontrolspartner.monitoringReader`, `roles/cloudcontrolspartner.reader`, `roles/iam.supportUser` |
| `cloudcontrolspartner.customers.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudcontrolspartner.admin`, `roles/cloudcontrolspartner.editor`, `roles/cloudcontrolspartner.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/cloudcontrolspartner.inspectabilityReader`, `roles/cloudcontrolspartner.monitoringReader`, `roles/cloudcontrolspartner.reader`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `cloudcontrolspartner.ekmconnections.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudcontrolspartner.admin`, `roles/cloudcontrolspartner.editor`, `roles/cloudcontrolspartner.viewer`, `roles/cloudcontrolspartner.reader`, `roles/iam.supportUser` |
| `cloudcontrolspartner.inspectabilityevents.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudcontrolspartner.admin`, `roles/cloudcontrolspartner.editor`, `roles/cloudcontrolspartner.viewer`, `roles/cloudcontrolspartner.inspectabilityReader`, `roles/cloudcontrolspartner.reader`, `roles/iam.supportUser` |
| `cloudcontrolspartner.partnerpermissions.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudcontrolspartner.admin`, `roles/cloudcontrolspartner.editor`, `roles/cloudcontrolspartner.viewer`, `roles/cloudcontrolspartner.reader`, `roles/iam.supportUser` |
| `cloudcontrolspartner.partners.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudcontrolspartner.admin`, `roles/cloudcontrolspartner.editor`, `roles/cloudcontrolspartner.viewer`, `roles/cloudcontrolspartner.reader`, `roles/iam.supportUser` |
| `cloudcontrolspartner.platformcontrols.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudcontrolspartner.admin`, `roles/cloudcontrolspartner.editor`, `roles/cloudcontrolspartner.viewer`, `roles/cloudcontrolspartner.inspectabilityReader`, `roles/cloudcontrolspartner.reader`, `roles/iam.supportUser` |
| `cloudcontrolspartner.violations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudcontrolspartner.editor`, `roles/cloudcontrolspartner.viewer`, `roles/cloudcontrolspartner.monitoringReader`, `roles/cloudcontrolspartner.reader`, `roles/iam.supportUser` |
| `cloudcontrolspartner.violations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudcontrolspartner.admin`, `roles/cloudcontrolspartner.editor`, `roles/cloudcontrolspartner.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/cloudcontrolspartner.monitoringReader`, `roles/cloudcontrolspartner.reader`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `cloudcontrolspartner.workloads.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudcontrolspartner.editor`, `roles/cloudcontrolspartner.viewer`, `roles/cloudcontrolspartner.monitoringReader`, `roles/cloudcontrolspartner.reader`, `roles/iam.supportUser` |
| `cloudcontrolspartner.workloads.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudcontrolspartner.admin`, `roles/cloudcontrolspartner.editor`, `roles/cloudcontrolspartner.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/cloudcontrolspartner.monitoringReader`, `roles/cloudcontrolspartner.reader`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |

## Notes

- Roles and permissions of the `cloudcontrolspartner` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/cloudcontrolspartner (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
