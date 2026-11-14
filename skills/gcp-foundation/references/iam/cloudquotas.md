---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/cloudquotas
---

# Cloud Quotas IAM roles and permissions

## Signature / Usage

Predefined roles of `cloudquotas` (role ID, description, included permissions). The permissions table below lists the roles that contain each permission.

### Roles

### Cloud Quotas Admin (`roles/cloudquotas.admin`)

- Full access to Cloud Quotas resources.
- Permissions (6): `cloudquotas.*`, `cloudquotas.quotas.get`, `cloudquotas.quotas.update`, `monitoring.timeSeries.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Cloud Quotas Viewer (`roles/cloudquotas.viewer`)

- Readonly access to Cloud Quotas resources.
- Permissions (3): `cloudquotas.quotas.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `cloudquotas.quotas.get` | [Admin](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/admin`) [Owner (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/owner`) [Writer](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/writer`) [Editor (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/editor`) [Reader](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/reader`) [Viewer (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/viewer`) [Capacityplanner Admin](https://docs.cloud.google.com/iam/docs/roles-permissions/capacityplanner#capacityplanner.admin) (`roles/capacityplanner.admin`) [Capacity Planner Viewer](https://docs.cloud.google.com/iam/docs/roles-permissions/capacityplanner#capacityplanner.viewer) (`roles/capacityplanner.viewer`) [Cloud Quotas Admin](https://docs.cloud.google.com/iam/docs/roles-permissions/cloudquotas#cloudquotas.admin) (`roles/cloudquotas.admin`) [Cloud Quotas Viewer](https://docs.cloud.google.com/iam/docs/roles-permissions/cloudquotas#cloudquotas.viewer) (`roles/cloudquotas.viewer`) [Service Usage Admin](https://docs.cloud.google.com/iam/docs/roles-permissions/serviceusage#serviceusage.serviceUsageAdmin) (`roles/serviceusage.serviceUsageAdmin`) [Telco Automation Admin](https://docs.cloud.google.com/iam/docs/roles-permissions/telcoautomation#telcoautomation.admin) (`roles/telcoautomation.admin`) [Capacity Planner](https://docs.cloud.google.com/iam/docs/roles-permissions/capacityplanner#capacityplanner.planner) (`roles/capacityplanner.planner`) [Cloud Hub Operator](https://docs.cloud.google.com/iam/docs/roles-permissions/cloudhub#cloudhub.operator) (`roles/cloudhub.operator`) [Cloud Infrastructure Manager Agent](https://docs.cloud.google.com/iam/docs/roles-permissions/config#config.agent) (`roles/config.agent`) [Support User](https://docs.cloud.google.com/iam/docs/roles-permissions/jobfunctions#iam.supportUser) (`roles/iam.supportUser`) [Quota Administrator](https://docs.cloud.google.com/iam/docs/roles-permissions/servicemanagement#servicemanagement.quotaAdmin) (`roles/servicemanagement.quotaAdmin`) [Quota Viewer](https://docs.cloud.google.com/iam/docs/roles-permissions/servicemanagement#servicemanagement.quotaViewer) (`roles/servicemanagement.quotaViewer`) Service agent roles > [!WARNING] > \*\*Warning:\*\* Don't grant service agent roles to any principals except [service agents](https://docs.cloud.google.com/iam/docs/service-agents). - [Cluster Director Service Agent](https://docs.cloud.google.com/iam/docs/roles-permissions/hypercomputecluster#hypercomputecluster.serviceAgent) (`roles/hypercomputecluster.serviceAgent`) |
| `cloudquotas.quotas.update` | [Admin](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/admin`) [Owner (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/owner`) [Writer](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/writer`) [Editor (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/editor`) [Cloud Quotas Admin](https://docs.cloud.google.com/iam/docs/roles-permissions/cloudquotas#cloudquotas.admin) (`roles/cloudquotas.admin`) [Service Usage Admin](https://docs.cloud.google.com/iam/docs/roles-permissions/serviceusage#serviceusage.serviceUsageAdmin) (`roles/serviceusage.serviceUsageAdmin`) [Telco Automation Admin](https://docs.cloud.google.com/iam/docs/roles-permissions/telcoautomation#telcoautomation.admin) (`roles/telcoautomation.admin`) [Quota Administrator](https://docs.cloud.google.com/iam/docs/roles-permissions/servicemanagement#servicemanagement.quotaAdmin) (`roles/servicemanagement.quotaAdmin`) |

## Notes

- Roles and permissions of the `cloudquotas` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/cloudquotas (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
