---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/workstations
---

# Cloud Workstations IAM roles and permissions

## Signature / Usage

Predefined roles of `workstations` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Cloud Workstations Admin (`roles/workstations.admin`)

- Grants CRUD access to all Workstation resources.
- Permissions (46): `cloudkms.keyHandles.create`, `cloudkms.keyHandles.get`, `cloudkms.keyHandles.list`, `cloudkms.operations.get`, `cloudkms.projects.showEffectiveAutokeyConfig`, `compute.acceleratorTypes.get`, `compute.acceleratorTypes.list`, `compute.machineTypes.get`, `compute.machineTypes.list`, `compute.networks.get`, `compute.networks.list`, `compute.subnetworks.get`, `compute.subnetworks.list`, `compute.zones.get`, `compute.zones.list`, `iam.serviceAccounts.get`, `iam.serviceAccounts.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `workstations.operations.get`, `workstations.operations.list`, `workstations.workstationClusters.create`, `workstations.workstationClusters.createTagBinding`, `workstations.workstationClusters.delete`, `workstations.workstationClusters.deleteTagBinding`, `workstations.workstationClusters.get`, `workstations.workstationClusters.list`, `workstations.workstationClusters.listEffectiveTags`, `workstations.workstationClusters.listTagBindings`, `workstations.workstationClusters.update`, `workstations.workstationConfigs.create`, `workstations.workstationConfigs.delete`, `workstations.workstationConfigs.get`, `workstations.workstationConfigs.getIamPolicy`, `workstations.workstationConfigs.list`, `workstations.workstationConfigs.setIamPolicy`, `workstations.workstationConfigs.update`, `workstations.workstations.create`, `workstations.workstations.delete`, `workstations.workstations.get`, `workstations.workstations.getIamPolicy`, `workstations.workstations.list`, `workstations.workstations.setIamPolicy`, `workstations.workstations.start`, `workstations.workstations.stop`, `workstations.workstations.update`

#### Cloud Workstations Editor (`roles/workstations.editor`)

- Editor role for Cloud Workstations
- Permissions (25): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `workstations.operations.get`, `workstations.operations.list`, `workstations.workstationClusters.create`, `workstations.workstationClusters.delete`, `workstations.workstationClusters.get`, `workstations.workstationClusters.list`, `workstations.workstationClusters.listEffectiveTags`, `workstations.workstationClusters.listTagBindings`, `workstations.workstationClusters.update`, `workstations.workstationConfigs.create`, `workstations.workstationConfigs.delete`, `workstations.workstationConfigs.get`, `workstations.workstationConfigs.getIamPolicy`, `workstations.workstationConfigs.list`, `workstations.workstationConfigs.update`, `workstations.workstations.create`, `workstations.workstations.delete`, `workstations.workstations.get`, `workstations.workstations.getIamPolicy`, `workstations.workstations.list`, `workstations.workstations.start`, `workstations.workstations.stop`, `workstations.workstations.update`

#### Cloud Workstations Network Admin (`roles/workstations.networkAdmin`)

- Grants ability to connect a Workstation Cluster to a shared VPC network.
- Permissions (25): `compute.addresses.create`, `compute.addresses.createInternal`, `compute.addresses.delete`, `compute.addresses.deleteInternal`, `compute.addresses.get`, `compute.addresses.use`, `compute.forwardingRules.create`, `compute.forwardingRules.delete`, `compute.forwardingRules.get`, `compute.forwardingRules.pscCreate`, `compute.forwardingRules.pscDelete`, `compute.globalOperations.get`, `compute.networks.get`, `compute.networks.updatePolicy`, `compute.networks.use`, `compute.networks.useExternalIp`, `compute.regionOperations.get`, `compute.subnetworks.get`, `compute.subnetworks.use`, `compute.subnetworks.useExternalIp`, `compute.zoneOperations.get`, `servicedirectory.namespaces.create`, `servicedirectory.namespaces.delete`, `servicedirectory.services.create`, `servicedirectory.services.delete`

#### Cloud Workstations Operation Viewer (`roles/workstations.operationViewer`)

- Grants ability to view Cloud Workstations API operations.
- Permissions (2): `workstations.operations.get`, `workstations.operations.list`

#### Cloud Workstations Policy Admin (`roles/workstations.policyAdmin`)

- Grants permission to set IAM policy on workstation.
- Permissions (2): `workstations.workstations.getIamPolicy`, `workstations.workstations.setIamPolicy`

#### Cloud Workstations User (`roles/workstations.user`)

- Grants runtime access to Workstation resources.
- Permissions (8): `workstations.operations.get`, `workstations.operations.list`, `workstations.workstations.delete`, `workstations.workstations.get`, `workstations.workstations.start`, `workstations.workstations.stop`, `workstations.workstations.update`, `workstations.workstations.use`

#### Cloud Workstations Creator (`roles/workstations.workstationCreator`)

- Grants ability to create Workstation resources.
- Permissions (8): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `workstations.operations.get`, `workstations.operations.list`, `workstations.workstationClusters.get`, `workstations.workstationClusters.list`, `workstations.workstationConfigs.get`, `workstations.workstations.create`

#### Cloud Workstations Limit Exempted Creator (`roles/workstations.workstationLimitExemptedCreator`)

- Grants ability to create workstations with exemption from max_usable_workstations Limit.
- Permissions (6): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `workstations.operations.get`, `workstations.operations.list`, `workstations.workstationConfigs.get`, `workstations.workstations.create`

#### Workstations Service Agent (`roles/workstations.serviceAgent`)

- Grants the Workstations Service Account access to manage resources in consumer project. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (87): `compute.addresses.create`, `compute.addresses.createInternal`, `compute.addresses.delete`, `compute.addresses.deleteInternal`, `compute.addresses.get`, `compute.addresses.use`, `compute.disks.create`, `compute.disks.createSnapshot`, `compute.disks.createTagBinding`, `compute.disks.delete`, `compute.disks.deleteTagBinding`, `compute.disks.get`, `compute.disks.list`, `compute.disks.resize`, `compute.disks.setLabels`, `compute.disks.use`, `compute.disks.useReadOnly`, `compute.firewalls.create`, `compute.firewalls.delete`, `compute.firewalls.get`, `compute.firewalls.update`, `compute.forwardingRules.create`, `compute.forwardingRules.delete`, `compute.forwardingRules.get`, `compute.forwardingRules.pscCreate`, `compute.forwardingRules.pscDelete`, `compute.globalOperations.get`, `compute.instances.attachDisk`, `compute.instances.create`, `compute.instances.createTagBinding`, `compute.instances.delete`, `compute.instances.deleteTagBinding`, `compute.instances.detachDisk`, `compute.instances.get`, `compute.instances.getGuestAttributes`, `compute.instances.getSerialPortOutput`, `compute.instances.pscInterfaceCreate`, `compute.instances.resume`, `compute.instances.setLabels`, `compute.instances.setMetadata`, `compute.instances.setServiceAccount`, `compute.instances.setTags`, `compute.instances.suspend`, `compute.networkAttachments.use`, `compute.networks.addPeering`, `compute.networks.get`, `compute.networks.removePeering`, `compute.networks.updatePolicy`, `compute.networks.use`, `compute.networks.useExternalIp`, `compute.regionOperations.get`, `compute.regions.get`, `compute.reservations.get`, `compute.snapshots.create`, `compute.snapshots.createTagBinding`, `compute.snapshots.delete`, `compute.snapshots.deleteTagBinding`, `compute.snapshots.get`, `compute.snapshots.listTagBindings`, `compute.snapshots.setLabels`, `compute.snapshots.useReadOnly`, `compute.subnetworks.get`, `compute.subnetworks.use`, `compute.subnetworks.useExternalIp`, `compute.zoneOperations.get`, `dns.networks.bindPrivateDNSZone`, `dns.networks.targetWithPeeringZone`, `iam.serviceAccounts.actAs`, `iam.serviceAccounts.get`, `iam.serviceAccounts.list`, `resourcemanager.tagValueBindings.create`, `resourcemanager.tagValueBindings.delete`, `servicedirectory.namespaces.create`, `servicedirectory.namespaces.delete`, `servicedirectory.services.create`, `servicedirectory.services.delete`, `serviceusage.catalogs.listMembers`, `serviceusage.consumerpolicy.analyze`, `serviceusage.consumerpolicy.get`, `serviceusage.effectivepolicy.get`, `serviceusage.groups.list`, `serviceusage.groups.listExpandedMembers`, `serviceusage.groups.listMembers`, `serviceusage.services.get`, `serviceusage.services.listApis`, `serviceusage.services.listDependentServices`, `serviceusage.values.test`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/workstations.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `workstations.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/workstations.admin`, `roles/workstations.editor`, `roles/iam.supportUser`, `roles/workstations.operationViewer`, `roles/workstations.user`, `roles/workstations.workstationCreator`, `roles/workstations.workstationLimitExemptedCreator` |
| `workstations.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/workstations.admin`, `roles/workstations.editor`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/workstations.operationViewer`, `roles/workstations.user`, `roles/workstations.workstationCreator`, `roles/workstations.workstationLimitExemptedCreator` |
| `workstations.workstationClusters.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/workstations.admin`, `roles/workstations.editor` |
| `workstations.workstationClusters.createTagBinding` | `roles/admin`, `roles/owner`, `roles/resourcemanager.tagUser`, `roles/workstations.admin`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver` |
| `workstations.workstationClusters.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/workstations.admin`, `roles/workstations.editor` |
| `workstations.workstationClusters.deleteTagBinding` | `roles/admin`, `roles/owner`, `roles/resourcemanager.tagUser`, `roles/workstations.admin`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver` |
| `workstations.workstationClusters.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/workstations.admin`, `roles/workstations.editor`, `roles/iam.supportUser`, `roles/workstations.workstationCreator` |
| `workstations.workstationClusters.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/workstations.admin`, `roles/workstations.editor`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer`, `roles/workstations.workstationCreator` |
| `workstations.workstationClusters.listEffectiveTags` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/workstations.admin`, `roles/workstations.editor`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `workstations.workstationClusters.listTagBindings` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/workstations.admin`, `roles/workstations.editor`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `workstations.workstationClusters.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/workstations.admin`, `roles/workstations.editor` |
| `workstations.workstationConfigs.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/workstations.admin`, `roles/workstations.editor` |
| `workstations.workstationConfigs.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/workstations.admin`, `roles/workstations.editor` |
| `workstations.workstationConfigs.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/workstations.admin`, `roles/workstations.editor`, `roles/iam.supportUser`, `roles/workstations.workstationCreator`, `roles/workstations.workstationLimitExemptedCreator` |
| `workstations.workstationConfigs.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/workstations.admin`, `roles/workstations.editor`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `workstations.workstationConfigs.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/workstations.admin`, `roles/workstations.editor`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` |
| `workstations.workstationConfigs.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/iam.securityAdmin`, `roles/workstations.admin` |
| `workstations.workstationConfigs.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/workstations.admin`, `roles/workstations.editor` |
| `workstations.workstations.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/workstations.admin`, `roles/workstations.editor`, `roles/workstations.workstationCreator`, `roles/workstations.workstationLimitExemptedCreator` |
| `workstations.workstations.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/workstations.admin`, `roles/workstations.editor`, `roles/workstations.user` |
| `workstations.workstations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/workstations.admin`, `roles/workstations.editor`, `roles/iam.supportUser`, `roles/workstations.user` |
| `workstations.workstations.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/workstations.admin`, `roles/workstations.editor`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer`, `roles/workstations.policyAdmin` |
| `workstations.workstations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/workstations.admin`, `roles/workstations.editor`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` |
| `workstations.workstations.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/iam.securityAdmin`, `roles/workstations.admin`, `roles/workstations.policyAdmin` |
| `workstations.workstations.start` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/workstations.admin`, `roles/workstations.editor`, `roles/workstations.user` |
| `workstations.workstations.stop` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/workstations.admin`, `roles/workstations.editor`, `roles/workstations.user` |
| `workstations.workstations.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/workstations.admin`, `roles/workstations.editor`, `roles/workstations.user` |
| `workstations.workstations.use` | `roles/workstations.user` |

## Notes

- Roles and permissions of the `workstations` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/workstations (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
