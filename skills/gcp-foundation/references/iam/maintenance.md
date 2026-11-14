---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/maintenance
---

# Maintenance API IAM roles and permissions

## Signature / Usage

Predefined roles of `maintenance` (role ID, description, included permissions). The permissions table below lists the roles that contain each permission.

### Roles

### Maintenance Admin (`roles/maintenance.admin`)

- Admin role for maintenance
- Permissions (7): `maintenance.*`, `maintenance.locations.get`, `maintenance.locations.list`, `maintenance.resourceMaintenances.get`, `maintenance.resourceMaintenances.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Maintenance API Viewer (`roles/maintenance.viewer`)

- Readonly access to Maintenance API resources.
- Permissions (7): `maintenance.*`, `maintenance.locations.get`, `maintenance.locations.list`, `maintenance.resourceMaintenances.get`, `maintenance.resourceMaintenances.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `maintenance.locations.get` | [Admin](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/admin`) [Owner (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/owner`) [Writer](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/writer`) [Editor (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/editor`) [Reader](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/reader`) [Viewer (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/viewer`) [Maintenance Admin](https://docs.cloud.google.com/iam/docs/roles-permissions/maintenance#maintenance.admin) (`roles/maintenance.admin`) [Maintenance API Viewer](https://docs.cloud.google.com/iam/docs/roles-permissions/maintenance#maintenance.viewer) (`roles/maintenance.viewer`) [Cloud Hub Operator](https://docs.cloud.google.com/iam/docs/roles-permissions/cloudhub#cloudhub.operator) (`roles/cloudhub.operator`) [Support User](https://docs.cloud.google.com/iam/docs/roles-permissions/jobfunctions#iam.supportUser) (`roles/iam.supportUser`) |
| `maintenance.locations.list` | [Admin](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/admin`) [Owner (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/owner`) [Writer](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/writer`) [Editor (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/editor`) [Reader](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/reader`) [Viewer (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/viewer`) [Security Admin](https://docs.cloud.google.com/iam/docs/roles-permissions/iam#iam.securityAdmin) (`roles/iam.securityAdmin`) [Security Reviewer](https://docs.cloud.google.com/iam/docs/roles-permissions/iam#iam.securityReviewer) (`roles/iam.securityReviewer`) [Maintenance Admin](https://docs.cloud.google.com/iam/docs/roles-permissions/maintenance#maintenance.admin) (`roles/maintenance.admin`) [Maintenance API Viewer](https://docs.cloud.google.com/iam/docs/roles-permissions/maintenance#maintenance.viewer) (`roles/maintenance.viewer`) [Cloud Hub Operator](https://docs.cloud.google.com/iam/docs/roles-permissions/cloudhub#cloudhub.operator) (`roles/cloudhub.operator`) [Security Auditor](https://docs.cloud.google.com/iam/docs/roles-permissions/jobfunctions#iam.securityAuditor) (`roles/iam.securityAuditor`) [Support User](https://docs.cloud.google.com/iam/docs/roles-permissions/jobfunctions#iam.supportUser) (`roles/iam.supportUser`) |
| `maintenance.resourceMaintenances.get` | [Admin](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/admin`) [Owner (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/owner`) [Writer](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/writer`) [Editor (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/editor`) [Reader](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/reader`) [Viewer (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/viewer`) [Maintenance Admin](https://docs.cloud.google.com/iam/docs/roles-permissions/maintenance#maintenance.admin) (`roles/maintenance.admin`) [Maintenance API Viewer](https://docs.cloud.google.com/iam/docs/roles-permissions/maintenance#maintenance.viewer) (`roles/maintenance.viewer`) [Cloud Hub Operator](https://docs.cloud.google.com/iam/docs/roles-permissions/cloudhub#cloudhub.operator) (`roles/cloudhub.operator`) [Support User](https://docs.cloud.google.com/iam/docs/roles-permissions/jobfunctions#iam.supportUser) (`roles/iam.supportUser`) |
| `maintenance.resourceMaintenances.list` | [Admin](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/admin`) [Owner (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/owner`) [Writer](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/writer`) [Editor (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/editor`) [Reader](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/reader`) [Viewer (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/viewer`) [Security Admin](https://docs.cloud.google.com/iam/docs/roles-permissions/iam#iam.securityAdmin) (`roles/iam.securityAdmin`) [Security Reviewer](https://docs.cloud.google.com/iam/docs/roles-permissions/iam#iam.securityReviewer) (`roles/iam.securityReviewer`) [Maintenance Admin](https://docs.cloud.google.com/iam/docs/roles-permissions/maintenance#maintenance.admin) (`roles/maintenance.admin`) [Maintenance API Viewer](https://docs.cloud.google.com/iam/docs/roles-permissions/maintenance#maintenance.viewer) (`roles/maintenance.viewer`) [Cloud Hub Operator](https://docs.cloud.google.com/iam/docs/roles-permissions/cloudhub#cloudhub.operator) (`roles/cloudhub.operator`) [Security Auditor](https://docs.cloud.google.com/iam/docs/roles-permissions/jobfunctions#iam.securityAuditor) (`roles/iam.securityAuditor`) [Support User](https://docs.cloud.google.com/iam/docs/roles-permissions/jobfunctions#iam.supportUser) (`roles/iam.supportUser`) |

## Notes

- Roles and permissions of the `maintenance` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/maintenance (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
