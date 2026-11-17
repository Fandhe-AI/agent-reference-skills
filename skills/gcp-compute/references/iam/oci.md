---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/oci
---

# Oracle Database@Google Cloud service agent IAM roles and permissions

## Signature / Usage

Predefined roles of `oci` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Oracle Database@Google Cloud Service Agent (`roles/oci.serviceAgent`)

- Grants Oracle Database@Google Cloud access to services and APIs in the user project > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (109): `compute.addresses.get`, `compute.addresses.list`, `compute.globalAddresses.get`, `compute.globalAddresses.list`, `compute.globalOperations.get`, `compute.globalOperations.list`, `compute.interconnectAttachments.create`, `compute.interconnectAttachments.delete`, `compute.interconnectAttachments.get`, `compute.interconnectAttachments.list`, `compute.interconnectAttachments.setLabels`, `compute.interconnectAttachments.update`, `compute.interconnectAttachments.use`, `compute.interconnectLocations.get`, `compute.interconnectLocations.list`, `compute.interconnectRemoteLocations.get`, `compute.interconnectRemoteLocations.list`, `compute.interconnects.create`, `compute.interconnects.delete`, `compute.interconnects.get`, `compute.interconnects.getMacsecConfig`, `compute.interconnects.list`, `compute.interconnects.setLabels`, `compute.interconnects.update`, `compute.interconnects.use`, `compute.networkAttachments.get`, `compute.networks.get`, `compute.networks.list`, `compute.networks.updatePolicy`, `compute.projects.get`, `compute.regionOperations.get`, `compute.regionOperations.list`, `compute.regions.get`, `compute.regions.list`, `compute.routers.create`, `compute.routers.delete`, `compute.routers.get`, `compute.routers.list`, `compute.routers.update`, `compute.routers.use`, `compute.routes.get`, `compute.routes.list`, `compute.subnetworks.get`, `compute.subnetworks.list`, `compute.zones.get`, `compute.zones.list`, `dns.changes.create`, `dns.changes.get`, `dns.changes.list`, `dns.dnsKeys.get`, `dns.dnsKeys.list`, `dns.managedZoneOperations.get`, `dns.managedZoneOperations.list`, `dns.managedZones.create`, `dns.managedZones.delete`, `dns.managedZones.get`, `dns.managedZones.getIamPolicy`, `dns.managedZones.list`, `dns.managedZones.update`, `dns.networks.bindDNSResponsePolicy`, `dns.networks.bindPrivateDNSPolicy`, `dns.networks.bindPrivateDNSZone`, `dns.networks.targetWithPeeringZone`, `dns.networks.useHealthSignals`, `dns.policies.create`, `dns.policies.delete`, `dns.policies.get`, `dns.policies.list`, `dns.policies.listEffectiveTags`, `dns.policies.listTagBindings`, `dns.policies.update`, `dns.projects.get`, `dns.resourceRecordSets.create`, `dns.resourceRecordSets.delete`, `dns.resourceRecordSets.get`, `dns.resourceRecordSets.list`, `dns.resourceRecordSets.update`, `dns.responsePolicies.create`, `dns.responsePolicies.delete`, `dns.responsePolicies.get`, `dns.responsePolicies.list`, `dns.responsePolicies.update`, `dns.responsePolicyRules.create`, `dns.responsePolicyRules.delete`, `dns.responsePolicyRules.get`, `dns.responsePolicyRules.list`, `dns.responsePolicyRules.update`, `networkconnectivity.internalRanges.create`, `networkconnectivity.internalRanges.delete`, `networkconnectivity.internalRanges.get`, `networkconnectivity.internalRanges.list`, `networkconnectivity.internalRanges.update`, `networkconnectivity.operations.get`, `networkconnectivity.operations.list`, `oracledatabase.cloudVmClusters.disableIdentityConnector`, `oracledatabase.cloudVmClusters.enableIdentityConnector`, `oracledatabase.exadbVmClusters.disableIdentityConnector`, `oracledatabase.exadbVmClusters.enableIdentityConnector`, `oracledatabase.odbNetworks.create`, `oracledatabase.odbNetworks.get`, `oracledatabase.odbNetworks.list`, `oracledatabase.odbSubnets.create`, `oracledatabase.odbSubnets.get`, `oracledatabase.odbSubnets.list`, `oracledatabase.odbSubnets.use`, `oracledatabase.operations.get`, `oracledatabase.operations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.updateLiens`

### Example: inspect a role

Generated example (not in the official docs) describing the first role on this page; every role on this page is a service agent role, which is granted to the service agent by Google Cloud and must not be granted to users:

```bash
gcloud iam roles describe roles/oci.serviceAgent
```

## Notes

- Roles and permissions of the `oci` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/oci (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
