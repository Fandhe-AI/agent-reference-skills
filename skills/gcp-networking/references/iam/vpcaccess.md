---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/vpcaccess
---

# Serverless VPC Access IAM roles and permissions

## Signature / Usage

Predefined roles of `vpcaccess` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Serverless VPC Access Admin (`roles/vpcaccess.admin`)

- Full access to all Serverless VPC Access resources
- Permissions (10): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `vpcaccess.connectors.create`, `vpcaccess.connectors.delete`, `vpcaccess.connectors.get`, `vpcaccess.connectors.list`, `vpcaccess.connectors.update`, `vpcaccess.locations.list`, `vpcaccess.operations.get`, `vpcaccess.operations.list`

#### Serverless VPC Access User (`roles/vpcaccess.user`)

- User of Serverless VPC Access connectors
- Permissions (8): `compute.networks.access`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `vpcaccess.connectors.get`, `vpcaccess.connectors.list`, `vpcaccess.locations.list`, `vpcaccess.operations.get`, `vpcaccess.operations.list`

#### Serverless VPC Access Viewer (`roles/vpcaccess.viewer`)

- Viewer of all Serverless VPC Access resources
- Permissions (7): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `vpcaccess.connectors.get`, `vpcaccess.connectors.list`, `vpcaccess.locations.list`, `vpcaccess.operations.get`, `vpcaccess.operations.list`

#### Serverless VPC Access Service Agent (`roles/vpcaccess.serviceAgent`)

- Can create and manage resources to support serverless application to connect to virtual private cloud. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (99): `billing.accounts.get`, `compute.addresses.createInternal`, `compute.addresses.deleteInternal`, `compute.addresses.get`, `compute.addresses.list`, `compute.autoscalers.create`, `compute.autoscalers.delete`, `compute.autoscalers.get`, `compute.autoscalers.list`, `compute.autoscalers.update`, `compute.disks.create`, `compute.firewalls.create`, `compute.firewalls.delete`, `compute.firewalls.get`, `compute.firewalls.list`, `compute.firewalls.update`, `compute.healthChecks.create`, `compute.healthChecks.delete`, `compute.healthChecks.get`, `compute.healthChecks.list`, `compute.healthChecks.update`, `compute.healthChecks.use`, `compute.healthChecks.useReadOnly`, `compute.httpHealthChecks.create`, `compute.httpHealthChecks.delete`, `compute.httpHealthChecks.get`, `compute.httpHealthChecks.list`, `compute.httpHealthChecks.use`, `compute.httpHealthChecks.useReadOnly`, `compute.httpsHealthChecks.create`, `compute.httpsHealthChecks.delete`, `compute.httpsHealthChecks.get`, `compute.httpsHealthChecks.update`, `compute.httpsHealthChecks.use`, `compute.httpsHealthChecks.useReadOnly`, `compute.images.get`, `compute.images.useReadOnly`, `compute.instanceGroupManagers.create`, `compute.instanceGroupManagers.delete`, `compute.instanceGroupManagers.get`, `compute.instanceGroupManagers.update`, `compute.instanceGroupManagers.use`, `compute.instanceGroups.create`, `compute.instanceGroups.delete`, `compute.instanceGroups.get`, `compute.instanceGroups.update`, `compute.instanceTemplates.create`, `compute.instanceTemplates.delete`, `compute.instanceTemplates.get`, `compute.instanceTemplates.useReadOnly`, `compute.instances.create`, `compute.instances.delete`, `compute.instances.get`, `compute.instances.getGuestAttributes`, `compute.instances.list`, `compute.instances.reset`, `compute.instances.setLabels`, `compute.instances.setMetadata`, `compute.instances.setTags`, `compute.instances.start`, `compute.instances.stop`, `compute.instances.use`, `compute.machineTypes.get`, `compute.networks.get`, `compute.networks.updatePolicy`, `compute.networks.use`, `compute.projects.get`, `compute.projects.setCommonInstanceMetadata`, `compute.regionOperations.get`, `compute.regionOperations.list`, `compute.regions.get`, `compute.regions.list`, `compute.subnetworks.create`, `compute.subnetworks.delete`, `compute.subnetworks.get`, `compute.subnetworks.list`, `compute.subnetworks.use`, `compute.zoneOperations.get`, `compute.zoneOperations.list`, `compute.zones.get`, `compute.zones.list`, `deploymentmanager.compositeTypes.get`, `deploymentmanager.deployments.create`, `deploymentmanager.deployments.delete`, `deploymentmanager.deployments.get`, `deploymentmanager.deployments.list`, `deploymentmanager.deployments.update`, `deploymentmanager.manifests.get`, `deploymentmanager.manifests.list`, `deploymentmanager.operations.get`, `deploymentmanager.operations.list`, `deploymentmanager.typeProviders.create`, `deploymentmanager.typeProviders.get`, `logging.logEntries.create`, `logging.logMetrics.create`, `logging.logMetrics.delete`, `logging.logMetrics.get`, `logging.logMetrics.update`, `resourcemanager.projects.get`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/vpcaccess.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `vpcaccess.connectors.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/vpcaccess.admin` (+1 service agent role) |
| `vpcaccess.connectors.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/vpcaccess.admin` (+1 service agent role) |
| `vpcaccess.connectors.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/vpcaccess.admin`, `roles/vpcaccess.user`, `roles/vpcaccess.viewer`, `roles/iam.supportUser` (+5 service agent roles) |
| `vpcaccess.connectors.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/vpcaccess.admin`, `roles/vpcaccess.user`, `roles/vpcaccess.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` (+1 service agent role) |
| `vpcaccess.connectors.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/vpcaccess.admin` |
| `vpcaccess.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/vpcaccess.admin`, `roles/vpcaccess.user`, `roles/vpcaccess.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` |
| `vpcaccess.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/vpcaccess.admin`, `roles/vpcaccess.user`, `roles/vpcaccess.viewer`, `roles/iam.supportUser` (+1 service agent role) |
| `vpcaccess.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/vpcaccess.admin`, `roles/vpcaccess.user`, `roles/vpcaccess.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |

## Notes

- Roles and permissions of the `vpcaccess` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/vpcaccess (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
