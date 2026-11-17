---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/servicenetworking
---

# Service Networking IAM roles and permissions

## Signature / Usage

Predefined roles of `servicenetworking` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Service Networking Admin (`roles/servicenetworking.admin`)

- Launch stage: Beta
- Admin role for Service Networking
- Permissions (24): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `servicenetworking.operations.cancel`, `servicenetworking.operations.delete`, `servicenetworking.operations.get`, `servicenetworking.operations.list`, `servicenetworking.services.addDnsRecordSet`, `servicenetworking.services.addDnsZone`, `servicenetworking.services.addPeering`, `servicenetworking.services.addSubnetwork`, `servicenetworking.services.createPeeredDnsDomain`, `servicenetworking.services.deleteConnection`, `servicenetworking.services.deletePeeredDnsDomain`, `servicenetworking.services.disableVpcServiceControls`, `servicenetworking.services.enableVpcServiceControls`, `servicenetworking.services.get`, `servicenetworking.services.getConsumerConfig`, `servicenetworking.services.getVpcServiceControls`, `servicenetworking.services.listPeeredDnsDomains`, `servicenetworking.services.removeDnsRecordSet`, `servicenetworking.services.removeDnsZone`, `servicenetworking.services.updateConsumerConfig`, `servicenetworking.services.updateDnsRecordSet`, `servicenetworking.services.use`

#### Service Networking Editor (`roles/servicenetworking.editor`)

- Launch stage: Beta
- Editor role for Service Networking
- Permissions (23): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `servicenetworking.operations.cancel`, `servicenetworking.operations.delete`, `servicenetworking.operations.get`, `servicenetworking.operations.list`, `servicenetworking.services.addDnsRecordSet`, `servicenetworking.services.addDnsZone`, `servicenetworking.services.addSubnetwork`, `servicenetworking.services.createPeeredDnsDomain`, `servicenetworking.services.deleteConnection`, `servicenetworking.services.deletePeeredDnsDomain`, `servicenetworking.services.disableVpcServiceControls`, `servicenetworking.services.enableVpcServiceControls`, `servicenetworking.services.get`, `servicenetworking.services.getConsumerConfig`, `servicenetworking.services.getVpcServiceControls`, `servicenetworking.services.listPeeredDnsDomains`, `servicenetworking.services.removeDnsRecordSet`, `servicenetworking.services.removeDnsZone`, `servicenetworking.services.updateConsumerConfig`, `servicenetworking.services.updateDnsRecordSet`, `servicenetworking.services.use`

#### Service Networking Viewer (`roles/servicenetworking.viewer`)

- Launch stage: Beta
- Viewer role for Service Networking
- Permissions (9): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `servicenetworking.operations.get`, `servicenetworking.operations.list`, `servicenetworking.services.get`, `servicenetworking.services.getConsumerConfig`, `servicenetworking.services.getVpcServiceControls`, `servicenetworking.services.listPeeredDnsDomains`, `servicenetworking.services.use`

#### Service Networking Admin (`roles/servicenetworking.networksAdmin`)

- Launch stage: Beta
- Full control of service networking with projects.
- Permissions (22): `servicenetworking.operations.cancel`, `servicenetworking.operations.delete`, `servicenetworking.operations.get`, `servicenetworking.operations.list`, `servicenetworking.services.addDnsRecordSet`, `servicenetworking.services.addDnsZone`, `servicenetworking.services.addPeering`, `servicenetworking.services.addSubnetwork`, `servicenetworking.services.createPeeredDnsDomain`, `servicenetworking.services.deleteConnection`, `servicenetworking.services.deletePeeredDnsDomain`, `servicenetworking.services.disableVpcServiceControls`, `servicenetworking.services.enableVpcServiceControls`, `servicenetworking.services.get`, `servicenetworking.services.getConsumerConfig`, `servicenetworking.services.getVpcServiceControls`, `servicenetworking.services.listPeeredDnsDomains`, `servicenetworking.services.removeDnsRecordSet`, `servicenetworking.services.removeDnsZone`, `servicenetworking.services.updateConsumerConfig`, `servicenetworking.services.updateDnsRecordSet`, `servicenetworking.services.use`

#### Service Networking Service Agent (`roles/servicenetworking.serviceAgent`)

- Gives permission to manage network configuration, such as establishing network peering, necessary for service producers > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (81): `compute.globalAddresses.get`, `compute.globalAddresses.list`, `compute.globalOperations.get`, `compute.networks.addPeering`, `compute.networks.create`, `compute.networks.delete`, `compute.networks.get`, `compute.networks.list`, `compute.networks.listPeeringRoutes`, `compute.networks.removePeering`, `compute.networks.update`, `compute.networks.updatePeering`, `compute.networks.updatePolicy`, `compute.projects.get`, `compute.regionOperations.get`, `compute.routers.get`, `compute.routers.list`, `compute.routes.list`, `compute.subnetworks.create`, `compute.subnetworks.delete`, `compute.subnetworks.get`, `compute.subnetworks.list`, `dns.changes.create`, `dns.changes.get`, `dns.changes.list`, `dns.dnsKeys.get`, `dns.dnsKeys.list`, `dns.gkeClusters.bindDNSResponsePolicy`, `dns.gkeClusters.bindPrivateDNSZone`, `dns.locations.get`, `dns.locations.list`, `dns.managedZoneOperations.get`, `dns.managedZoneOperations.list`, `dns.managedZones.create`, `dns.managedZones.delete`, `dns.managedZones.get`, `dns.managedZones.getIamPolicy`, `dns.managedZones.list`, `dns.managedZones.update`, `dns.networks.bindDNSResponsePolicy`, `dns.networks.bindPrivateDNSPolicy`, `dns.networks.bindPrivateDNSZone`, `dns.networks.targetWithPeeringZone`, `dns.networks.useHealthSignals`, `dns.operations.cancel`, `dns.operations.delete`, `dns.operations.get`, `dns.operations.list`, `dns.outboundEndpoints.bindPrivateDNSPolicy`, `dns.outboundEndpoints.bindPrivateDNSZone`, `dns.outboundEndpoints.create`, `dns.outboundEndpoints.delete`, `dns.outboundEndpoints.get`, `dns.outboundEndpoints.list`, `dns.outboundEndpoints.update`, `dns.policies.create`, `dns.policies.delete`, `dns.policies.get`, `dns.policies.list`, `dns.policies.listEffectiveTags`, `dns.policies.listTagBindings`, `dns.policies.update`, `dns.projects.get`, `dns.resourceRecordSets.create`, `dns.resourceRecordSets.delete`, `dns.resourceRecordSets.get`, `dns.resourceRecordSets.list`, `dns.resourceRecordSets.update`, `dns.responsePolicies.create`, `dns.responsePolicies.delete`, `dns.responsePolicies.get`, `dns.responsePolicies.list`, `dns.responsePolicies.update`, `dns.responsePolicyRules.create`, `dns.responsePolicyRules.delete`, `dns.responsePolicyRules.get`, `dns.responsePolicyRules.list`, `dns.responsePolicyRules.update`, `networkconnectivity.internalRanges.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/servicenetworking.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `servicenetworking.operations.cancel` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/servicenetworking.admin`, `roles/servicenetworking.editor`, `roles/servicenetworking.networksAdmin` |
| `servicenetworking.operations.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/servicenetworking.admin`, `roles/servicenetworking.editor`, `roles/servicenetworking.networksAdmin` |
| `servicenetworking.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/compute.networkAdmin`, `roles/servicenetworking.admin`, `roles/servicenetworking.editor`, `roles/servicenetworking.viewer`, `roles/iam.infrastructureAdmin`, `roles/iam.networkAdmin`, `roles/iam.supportUser`, `roles/servicenetworking.networksAdmin` (+6 service agent roles) |
| `servicenetworking.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/servicenetworking.admin`, `roles/servicenetworking.editor`, `roles/servicenetworking.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/servicenetworking.networksAdmin` |
| `servicenetworking.services.addDnsRecordSet` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/servicenetworking.admin`, `roles/servicenetworking.editor`, `roles/servicenetworking.networksAdmin` |
| `servicenetworking.services.addDnsZone` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/servicenetworking.admin`, `roles/servicenetworking.editor`, `roles/servicenetworking.networksAdmin` |
| `servicenetworking.services.addPeering` | `roles/admin`, `roles/owner`, `roles/compute.networkAdmin`, `roles/servicenetworking.admin`, `roles/iam.infrastructureAdmin`, `roles/iam.networkAdmin`, `roles/servicenetworking.networksAdmin` (+6 service agent roles) |
| `servicenetworking.services.addSubnetwork` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/servicenetworking.admin`, `roles/servicenetworking.editor`, `roles/servicenetworking.networksAdmin` |
| `servicenetworking.services.createPeeredDnsDomain` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/compute.networkAdmin`, `roles/servicenetworking.admin`, `roles/servicenetworking.editor`, `roles/iam.infrastructureAdmin`, `roles/iam.networkAdmin`, `roles/servicenetworking.networksAdmin` (+4 service agent roles) |
| `servicenetworking.services.deleteConnection` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/compute.networkAdmin`, `roles/servicenetworking.admin`, `roles/servicenetworking.editor`, `roles/iam.infrastructureAdmin`, `roles/iam.networkAdmin`, `roles/servicenetworking.networksAdmin` (+5 service agent roles) |
| `servicenetworking.services.deletePeeredDnsDomain` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/compute.networkAdmin`, `roles/servicenetworking.admin`, `roles/servicenetworking.editor`, `roles/iam.infrastructureAdmin`, `roles/iam.networkAdmin`, `roles/servicenetworking.networksAdmin` (+5 service agent roles) |
| `servicenetworking.services.disableVpcServiceControls` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/compute.networkAdmin`, `roles/servicenetworking.admin`, `roles/servicenetworking.editor`, `roles/iam.infrastructureAdmin`, `roles/iam.networkAdmin`, `roles/servicenetworking.networksAdmin` (+4 service agent roles) |
| `servicenetworking.services.enableVpcServiceControls` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/compute.networkAdmin`, `roles/servicenetworking.admin`, `roles/servicenetworking.editor`, `roles/iam.infrastructureAdmin`, `roles/iam.networkAdmin`, `roles/servicenetworking.networksAdmin` (+4 service agent roles) |
| `servicenetworking.services.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/compute.networkAdmin`, `roles/compute.networkUser`, `roles/compute.networkViewer`, `roles/servicenetworking.admin`, `roles/servicenetworking.editor`, `roles/servicenetworking.viewer`, `roles/iam.infrastructureAdmin`, `roles/iam.networkAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/servicenetworking.networksAdmin` (+8 service agent roles) |
| `servicenetworking.services.getConsumerConfig` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/servicenetworking.admin`, `roles/servicenetworking.editor`, `roles/servicenetworking.viewer`, `roles/iam.supportUser`, `roles/servicenetworking.networksAdmin` |
| `servicenetworking.services.getVpcServiceControls` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/compute.networkAdmin`, `roles/servicenetworking.admin`, `roles/servicenetworking.editor`, `roles/servicenetworking.viewer`, `roles/iam.infrastructureAdmin`, `roles/iam.networkAdmin`, `roles/iam.supportUser`, `roles/servicenetworking.networksAdmin` (+4 service agent roles) |
| `servicenetworking.services.listPeeredDnsDomains` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/compute.networkAdmin`, `roles/servicenetworking.admin`, `roles/servicenetworking.editor`, `roles/servicenetworking.viewer`, `roles/iam.infrastructureAdmin`, `roles/iam.networkAdmin`, `roles/iam.supportUser`, `roles/servicenetworking.networksAdmin` (+5 service agent roles) |
| `servicenetworking.services.removeDnsRecordSet` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/servicenetworking.admin`, `roles/servicenetworking.editor`, `roles/servicenetworking.networksAdmin` |
| `servicenetworking.services.removeDnsZone` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/servicenetworking.admin`, `roles/servicenetworking.editor`, `roles/servicenetworking.networksAdmin` |
| `servicenetworking.services.updateConsumerConfig` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/servicenetworking.admin`, `roles/servicenetworking.editor`, `roles/servicenetworking.networksAdmin` |
| `servicenetworking.services.updateDnsRecordSet` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/servicenetworking.admin`, `roles/servicenetworking.editor`, `roles/servicenetworking.networksAdmin` |
| `servicenetworking.services.use` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/servicenetworking.admin`, `roles/servicenetworking.editor`, `roles/servicenetworking.viewer`, `roles/iam.supportUser`, `roles/servicenetworking.networksAdmin` |

## Notes

- Roles and permissions of the `servicenetworking` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/servicenetworking (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
