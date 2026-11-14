---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/policyanalyzer
---

# Policy Analyzer IAM roles and permissions

## Signature / Usage

Predefined roles of `policyanalyzer` (role ID, description, included permissions). The permissions table below lists the roles that contain each permission.

### Roles

### Policyanalyzer Admin (`roles/policyanalyzer.admin`)

- Launch stage: Beta
- Admin role for policyanalyzer
- Permissions (6): `policyanalyzer.*`, `policyanalyzer.resourceAuthorizationActivities.query`, `policyanalyzer.serviceAccountKeyLastAuthenticationActivities.query`, `policyanalyzer.serviceAccountLastAuthenticationActivities.query`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Policyanalyzer Viewer (`roles/policyanalyzer.viewer`)

- Launch stage: Beta
- Viewer role for policyanalyzer
- Permissions (6): `policyanalyzer.*`, `policyanalyzer.resourceAuthorizationActivities.query`, `policyanalyzer.serviceAccountKeyLastAuthenticationActivities.query`, `policyanalyzer.serviceAccountLastAuthenticationActivities.query`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Activity Analysis Viewer (`roles/policyanalyzer.activityAnalysisViewer`)

- Launch stage: Beta
- Viewer user that can read all activity analysis.
- Permissions (4): `policyanalyzer.*`, `policyanalyzer.resourceAuthorizationActivities.query`, `policyanalyzer.serviceAccountKeyLastAuthenticationActivities.query`, `policyanalyzer.serviceAccountLastAuthenticationActivities.query`

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `policyanalyzer.resourceAuthorizationActivities.query` | [Admin](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/admin`) [Owner (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/owner`) [Writer](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/writer`) [Editor (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/editor`) [Reader](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/reader`) [Viewer (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/viewer`) [Policyanalyzer Admin](https://docs.cloud.google.com/iam/docs/roles-permissions/policyanalyzer#policyanalyzer.admin) (`roles/policyanalyzer.admin`) [Policyanalyzer Viewer](https://docs.cloud.google.com/iam/docs/roles-permissions/policyanalyzer#policyanalyzer.viewer) (`roles/policyanalyzer.viewer`) [Deny Admin](https://docs.cloud.google.com/iam/docs/roles-permissions/iam#iam.denyAdmin) (`roles/iam.denyAdmin`) [Support User](https://docs.cloud.google.com/iam/docs/roles-permissions/jobfunctions#iam.supportUser) (`roles/iam.supportUser`) [Activity Analysis Viewer](https://docs.cloud.google.com/iam/docs/roles-permissions/policyanalyzer#policyanalyzer.activityAnalysisViewer) (`roles/policyanalyzer.activityAnalysisViewer`) |
| `policyanalyzer.serviceAccountKeyLastAuthenticationActivities.query` | [Admin](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/admin`) [Owner (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/owner`) [Writer](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/writer`) [Editor (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/editor`) [Reader](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/reader`) [Viewer (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/viewer`) [Policyanalyzer Admin](https://docs.cloud.google.com/iam/docs/roles-permissions/policyanalyzer#policyanalyzer.admin) (`roles/policyanalyzer.admin`) [Policyanalyzer Viewer](https://docs.cloud.google.com/iam/docs/roles-permissions/policyanalyzer#policyanalyzer.viewer) (`roles/policyanalyzer.viewer`) [Support User](https://docs.cloud.google.com/iam/docs/roles-permissions/jobfunctions#iam.supportUser) (`roles/iam.supportUser`) [Activity Analysis Viewer](https://docs.cloud.google.com/iam/docs/roles-permissions/policyanalyzer#policyanalyzer.activityAnalysisViewer) (`roles/policyanalyzer.activityAnalysisViewer`) [Wiz Cloud Inventory Viewer](https://docs.cloud.google.com/iam/docs/roles-permissions/wiz#wiz.cloudInventoryViewer) (`roles/wiz.cloudInventoryViewer`) |
| `policyanalyzer.serviceAccountLastAuthenticationActivities.query` | [Admin](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/admin`) [Owner (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/owner`) [Writer](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/writer`) [Editor (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/editor`) [Reader](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/reader`) [Viewer (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/viewer`) [Policyanalyzer Admin](https://docs.cloud.google.com/iam/docs/roles-permissions/policyanalyzer#policyanalyzer.admin) (`roles/policyanalyzer.admin`) [Policyanalyzer Viewer](https://docs.cloud.google.com/iam/docs/roles-permissions/policyanalyzer#policyanalyzer.viewer) (`roles/policyanalyzer.viewer`) [Support User](https://docs.cloud.google.com/iam/docs/roles-permissions/jobfunctions#iam.supportUser) (`roles/iam.supportUser`) [Activity Analysis Viewer](https://docs.cloud.google.com/iam/docs/roles-permissions/policyanalyzer#policyanalyzer.activityAnalysisViewer) (`roles/policyanalyzer.activityAnalysisViewer`) [Wiz Cloud Inventory Viewer](https://docs.cloud.google.com/iam/docs/roles-permissions/wiz#wiz.cloudInventoryViewer) (`roles/wiz.cloudInventoryViewer`) |

## Notes

- Roles and permissions of the `policyanalyzer` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/policyanalyzer (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
