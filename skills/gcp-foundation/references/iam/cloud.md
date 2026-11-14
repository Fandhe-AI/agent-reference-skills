---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/cloud
---

# Google Cloud IAM roles and permissions

## Signature / Usage

Predefined roles of `cloud` (role ID, description, included permissions). The permissions table below lists the roles that contain each permission.

### Roles

### Cloud Admin (`roles/cloud.admin`)

- Launch stage: Beta
- Admin role for cloud
- Permissions (5): `cloud.*`, `cloud.locations.get`, `cloud.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Cloud Viewer (`roles/cloud.viewer`)

- Launch stage: Beta
- Viewer role for cloud
- Permissions (5): `cloud.*`, `cloud.locations.get`, `cloud.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Location reader (`roles/cloud.locationReader`)

- Launch stage: Beta
- Read and enumerate locations available for resource creation.
- Permissions (3): `cloud.*`, `cloud.locations.get`, `cloud.locations.list`

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `cloud.locations.get` | [Admin](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/admin`) [Owner (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/owner`) [Writer](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/writer`) [Editor (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/editor`) [Reader](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/reader`) [Viewer (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/viewer`) [Cloud Admin](https://docs.cloud.google.com/iam/docs/roles-permissions/cloud#cloud.admin) (`roles/cloud.admin`) [Cloud Viewer](https://docs.cloud.google.com/iam/docs/roles-permissions/cloud#cloud.viewer) (`roles/cloud.viewer`) [Location reader](https://docs.cloud.google.com/iam/docs/roles-permissions/cloud#cloud.locationReader) (`roles/cloud.locationReader`) [Support User](https://docs.cloud.google.com/iam/docs/roles-permissions/jobfunctions#iam.supportUser) (`roles/iam.supportUser`) [Wiz Cloud Inventory Viewer](https://docs.cloud.google.com/iam/docs/roles-permissions/wiz#wiz.cloudInventoryViewer) (`roles/wiz.cloudInventoryViewer`) |
| `cloud.locations.list` | [Admin](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/admin`) [Owner (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/owner`) [Writer](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/writer`) [Editor (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/editor`) [Reader](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/reader`) [Viewer (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/viewer`) [Cloud Admin](https://docs.cloud.google.com/iam/docs/roles-permissions/cloud#cloud.admin) (`roles/cloud.admin`) [Cloud Viewer](https://docs.cloud.google.com/iam/docs/roles-permissions/cloud#cloud.viewer) (`roles/cloud.viewer`) [Security Admin](https://docs.cloud.google.com/iam/docs/roles-permissions/iam#iam.securityAdmin) (`roles/iam.securityAdmin`) [Security Reviewer](https://docs.cloud.google.com/iam/docs/roles-permissions/iam#iam.securityReviewer) (`roles/iam.securityReviewer`) [Location reader](https://docs.cloud.google.com/iam/docs/roles-permissions/cloud#cloud.locationReader) (`roles/cloud.locationReader`) [Security Auditor](https://docs.cloud.google.com/iam/docs/roles-permissions/jobfunctions#iam.securityAuditor) (`roles/iam.securityAuditor`) [Support User](https://docs.cloud.google.com/iam/docs/roles-permissions/jobfunctions#iam.supportUser) (`roles/iam.supportUser`) |

## Notes

- Roles and permissions of the `cloud` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/cloud (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
