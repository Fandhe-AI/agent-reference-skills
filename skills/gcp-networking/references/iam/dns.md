---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/dns
---

# Cloud DNS IAM roles and permissions

## Signature / Usage

Predefined roles of `dns` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### DNS Administrator (`roles/dns.admin`)

- Provides read-write access to all Cloud DNS resources. Lowest-level resources where you can grant this role: - Managed zone
- Permissions (63): `compute.networks.get`, `compute.networks.list`, `dns.changes.create`, `dns.changes.get`, `dns.changes.list`, `dns.dnsKeys.get`, `dns.dnsKeys.list`, `dns.gkeClusters.bindDNSResponsePolicy`, `dns.gkeClusters.bindPrivateDNSZone`, `dns.locations.get`, `dns.locations.list`, `dns.managedZoneOperations.get`, `dns.managedZoneOperations.list`, `dns.managedZones.create`, `dns.managedZones.delete`, `dns.managedZones.get`, `dns.managedZones.getIamPolicy`, `dns.managedZones.list`, `dns.managedZones.setIamPolicy`, `dns.managedZones.update`, `dns.networks.bindDNSResponsePolicy`, `dns.networks.bindPrivateDNSPolicy`, `dns.networks.bindPrivateDNSZone`, `dns.networks.targetWithPeeringZone`, `dns.networks.useHealthSignals`, `dns.operations.cancel`, `dns.operations.delete`, `dns.operations.get`, `dns.operations.list`, `dns.outboundEndpoints.bindPrivateDNSPolicy`, `dns.outboundEndpoints.bindPrivateDNSZone`, `dns.outboundEndpoints.create`, `dns.outboundEndpoints.delete`, `dns.outboundEndpoints.get`, `dns.outboundEndpoints.list`, `dns.outboundEndpoints.update`, `dns.policies.create`, `dns.policies.createTagBinding`, `dns.policies.delete`, `dns.policies.deleteTagBinding`, `dns.policies.get`, `dns.policies.list`, `dns.policies.listEffectiveTags`, `dns.policies.listTagBindings`, `dns.policies.update`, `dns.projects.get`, `dns.resourceRecordSets.create`, `dns.resourceRecordSets.delete`, `dns.resourceRecordSets.get`, `dns.resourceRecordSets.list`, `dns.resourceRecordSets.update`, `dns.responsePolicies.create`, `dns.responsePolicies.delete`, `dns.responsePolicies.get`, `dns.responsePolicies.list`, `dns.responsePolicies.update`, `dns.responsePolicyRules.create`, `dns.responsePolicyRules.delete`, `dns.responsePolicyRules.get`, `dns.responsePolicyRules.list`, `dns.responsePolicyRules.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### DNS Editor (`roles/dns.editor`)

- Editor role for DNS resources.
- Permissions (60): `compute.networks.get`, `compute.networks.list`, `dns.changes.create`, `dns.changes.get`, `dns.changes.list`, `dns.dnsKeys.get`, `dns.dnsKeys.list`, `dns.gkeClusters.bindDNSResponsePolicy`, `dns.gkeClusters.bindPrivateDNSZone`, `dns.locations.get`, `dns.locations.list`, `dns.managedZoneOperations.get`, `dns.managedZoneOperations.list`, `dns.managedZones.create`, `dns.managedZones.delete`, `dns.managedZones.get`, `dns.managedZones.getIamPolicy`, `dns.managedZones.list`, `dns.managedZones.update`, `dns.networks.bindDNSResponsePolicy`, `dns.networks.bindPrivateDNSPolicy`, `dns.networks.bindPrivateDNSZone`, `dns.networks.targetWithPeeringZone`, `dns.networks.useHealthSignals`, `dns.operations.cancel`, `dns.operations.delete`, `dns.operations.get`, `dns.operations.list`, `dns.outboundEndpoints.bindPrivateDNSPolicy`, `dns.outboundEndpoints.bindPrivateDNSZone`, `dns.outboundEndpoints.create`, `dns.outboundEndpoints.delete`, `dns.outboundEndpoints.get`, `dns.outboundEndpoints.list`, `dns.outboundEndpoints.update`, `dns.policies.create`, `dns.policies.delete`, `dns.policies.get`, `dns.policies.list`, `dns.policies.listEffectiveTags`, `dns.policies.listTagBindings`, `dns.policies.update`, `dns.projects.get`, `dns.resourceRecordSets.create`, `dns.resourceRecordSets.delete`, `dns.resourceRecordSets.get`, `dns.resourceRecordSets.list`, `dns.resourceRecordSets.update`, `dns.responsePolicies.create`, `dns.responsePolicies.delete`, `dns.responsePolicies.get`, `dns.responsePolicies.list`, `dns.responsePolicies.update`, `dns.responsePolicyRules.create`, `dns.responsePolicyRules.delete`, `dns.responsePolicyRules.get`, `dns.responsePolicyRules.list`, `dns.responsePolicyRules.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### DNS Viewer (`roles/dns.viewer`)

- Viewer role for DNS resources.
- Permissions (29): `compute.networks.get`, `dns.changes.get`, `dns.changes.list`, `dns.dnsKeys.get`, `dns.dnsKeys.list`, `dns.locations.get`, `dns.locations.list`, `dns.managedZoneOperations.get`, `dns.managedZoneOperations.list`, `dns.managedZones.get`, `dns.managedZones.getIamPolicy`, `dns.managedZones.list`, `dns.operations.get`, `dns.operations.list`, `dns.outboundEndpoints.get`, `dns.outboundEndpoints.list`, `dns.policies.get`, `dns.policies.list`, `dns.policies.listEffectiveTags`, `dns.policies.listTagBindings`, `dns.projects.get`, `dns.resourceRecordSets.get`, `dns.resourceRecordSets.list`, `dns.responsePolicies.get`, `dns.responsePolicies.list`, `dns.responsePolicyRules.get`, `dns.responsePolicyRules.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### DNS Peer (`roles/dns.peer`)

- Access to target networks with DNS peering zones
- Permissions (1): `dns.networks.targetWithPeeringZone`

#### DNS Reader (`roles/dns.reader`)

- Provides read-only access to all Cloud DNS resources. Lowest-level resources where you can grant this role: - Managed zone
- Permissions (28): `compute.networks.get`, `dns.changes.get`, `dns.changes.list`, `dns.dnsKeys.get`, `dns.dnsKeys.list`, `dns.locations.get`, `dns.locations.list`, `dns.managedZoneOperations.get`, `dns.managedZoneOperations.list`, `dns.managedZones.get`, `dns.managedZones.list`, `dns.operations.get`, `dns.operations.list`, `dns.outboundEndpoints.get`, `dns.outboundEndpoints.list`, `dns.policies.get`, `dns.policies.list`, `dns.policies.listEffectiveTags`, `dns.policies.listTagBindings`, `dns.projects.get`, `dns.resourceRecordSets.get`, `dns.resourceRecordSets.list`, `dns.responsePolicies.get`, `dns.responsePolicies.list`, `dns.responsePolicyRules.get`, `dns.responsePolicyRules.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud DNS Service Agent (`roles/dns.serviceAgent`)

- Gives Cloud DNS Service Agent access to Cloud Platform resources. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (20): `compute.addresses.create`, `compute.addresses.createInternal`, `compute.addresses.delete`, `compute.addresses.deleteInternal`, `compute.addresses.get`, `compute.addresses.list`, `compute.addresses.use`, `compute.addresses.useInternal`, `compute.globalNetworkEndpointGroups.attachNetworkEndpoints`, `compute.globalNetworkEndpointGroups.create`, `compute.globalNetworkEndpointGroups.delete`, `compute.globalNetworkEndpointGroups.detachNetworkEndpoints`, `compute.globalNetworkEndpointGroups.get`, `compute.globalOperations.get`, `compute.healthChecks.get`, `compute.networks.get`, `compute.networks.use`, `compute.subnetworks.get`, `compute.subnetworks.list`, `compute.subnetworks.use`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role's lowest-level resource is Managed zone; granting it there instead limits the scope, but this example does not show that command):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/dns.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `dns.changes.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/dns.admin`, `roles/dns.editor`, `roles/iam.networkAdmin` (+11 service agent roles) |
| `dns.changes.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/dns.admin`, `roles/dns.editor`, `roles/dns.viewer`, `roles/dns.reader`, `roles/iam.networkAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+9 service agent roles) |
| `dns.changes.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/dns.admin`, `roles/dns.editor`, `roles/dns.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/dns.reader`, `roles/iam.networkAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+8 service agent roles) |
| `dns.dnsKeys.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/dns.admin`, `roles/dns.editor`, `roles/dns.viewer`, `roles/dns.reader`, `roles/iam.networkAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+6 service agent roles) |
| `dns.dnsKeys.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/dns.admin`, `roles/dns.editor`, `roles/dns.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/dns.reader`, `roles/iam.networkAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+6 service agent roles) |
| `dns.gkeClusters.bindDNSResponsePolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/dns.admin`, `roles/dns.editor`, `roles/iam.networkAdmin` (+4 service agent roles) |
| `dns.gkeClusters.bindPrivateDNSZone` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/dns.admin`, `roles/dns.editor`, `roles/iam.networkAdmin` (+4 service agent roles) |
| `dns.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/dns.admin`, `roles/dns.editor`, `roles/dns.viewer`, `roles/dns.reader`, `roles/iam.networkAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+5 service agent roles) |
| `dns.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/dns.admin`, `roles/dns.editor`, `roles/dns.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/dns.reader`, `roles/iam.networkAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+5 service agent roles) |
| `dns.managedZoneOperations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/dns.admin`, `roles/dns.editor`, `roles/dns.viewer`, `roles/dns.reader`, `roles/iam.networkAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+7 service agent roles) |
| `dns.managedZoneOperations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/dns.admin`, `roles/dns.editor`, `roles/dns.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/dns.reader`, `roles/iam.networkAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+7 service agent roles) |
| `dns.managedZones.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/dns.admin`, `roles/dns.editor`, `roles/iam.networkAdmin` (+12 service agent roles) |
| `dns.managedZones.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/dns.admin`, `roles/dns.editor`, `roles/iam.networkAdmin` (+12 service agent roles) |
| `dns.managedZones.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/dns.admin`, `roles/dns.editor`, `roles/dns.viewer`, `roles/composer.sharedVpcAgent`, `roles/dns.reader`, `roles/iam.networkAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` (+13 service agent roles) |
| `dns.managedZones.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/dns.admin`, `roles/dns.editor`, `roles/dns.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.networkAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+5 service agent roles) |
| `dns.managedZones.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/dns.admin`, `roles/dns.editor`, `roles/dns.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/workloadmanager.admin`, `roles/composer.sharedVpcAgent`, `roles/dns.reader`, `roles/iam.networkAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer`, `roles/workloadmanager.deploymentAdmin` (+17 service agent roles) |
| `dns.managedZones.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/dns.admin`, `roles/iam.securityAdmin`, `roles/iam.networkAdmin` |
| `dns.managedZones.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/dns.admin`, `roles/dns.editor`, `roles/iam.networkAdmin` (+9 service agent roles) |
| `dns.networks.bindDNSResponsePolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/dns.admin`, `roles/dns.editor`, `roles/container.hostServiceAgentUser`, `roles/iam.networkAdmin` (+5 service agent roles) |
| `dns.networks.bindPrivateDNSPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/dns.admin`, `roles/dns.editor`, `roles/container.hostServiceAgentUser`, `roles/iam.networkAdmin` (+6 service agent roles) |
| `dns.networks.bindPrivateDNSZone` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/dns.admin`, `roles/dns.editor`, `roles/container.hostServiceAgentUser`, `roles/iam.networkAdmin` (+14 service agent roles) |
| `dns.networks.targetWithPeeringZone` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/dns.admin`, `roles/dns.editor`, `roles/composer.sharedVpcAgent`, `roles/dns.peer`, `roles/iam.networkAdmin` (+17 service agent roles) |
| `dns.networks.useHealthSignals` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/dns.admin`, `roles/dns.editor`, `roles/iam.networkAdmin` (+5 service agent roles) |
| `dns.operations.cancel` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/dns.admin`, `roles/dns.editor`, `roles/iam.networkAdmin` (+4 service agent roles) |
| `dns.operations.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/dns.admin`, `roles/dns.editor`, `roles/iam.networkAdmin` (+5 service agent roles) |
| `dns.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/dns.admin`, `roles/dns.editor`, `roles/dns.viewer`, `roles/dns.reader`, `roles/iam.networkAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+5 service agent roles) |
| `dns.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/dns.admin`, `roles/dns.editor`, `roles/dns.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/dns.reader`, `roles/iam.networkAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+5 service agent roles) |
| `dns.outboundEndpoints.bindPrivateDNSPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/dns.admin`, `roles/dns.editor`, `roles/iam.networkAdmin` (+4 service agent roles) |
| `dns.outboundEndpoints.bindPrivateDNSZone` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/dns.admin`, `roles/dns.editor`, `roles/iam.networkAdmin` (+4 service agent roles) |
| `dns.outboundEndpoints.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/dns.admin`, `roles/dns.editor`, `roles/iam.networkAdmin` (+5 service agent roles) |
| `dns.outboundEndpoints.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/dns.admin`, `roles/dns.editor`, `roles/iam.networkAdmin` (+5 service agent roles) |
| `dns.outboundEndpoints.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/dns.admin`, `roles/dns.editor`, `roles/dns.viewer`, `roles/dns.reader`, `roles/iam.networkAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+5 service agent roles) |
| `dns.outboundEndpoints.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/dns.admin`, `roles/dns.editor`, `roles/dns.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/dns.reader`, `roles/iam.networkAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+5 service agent roles) |
| `dns.outboundEndpoints.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/dns.admin`, `roles/dns.editor`, `roles/iam.networkAdmin` (+5 service agent roles) |
| `dns.policies.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/dns.admin`, `roles/dns.editor`, `roles/iam.networkAdmin` (+6 service agent roles) |
| `dns.policies.createTagBinding` | `roles/admin`, `roles/owner`, `roles/dns.admin`, `roles/resourcemanager.tagUser`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.networkAdmin` (+1 service agent role) |
| `dns.policies.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/dns.admin`, `roles/dns.editor`, `roles/iam.networkAdmin` (+7 service agent roles) |
| `dns.policies.deleteTagBinding` | `roles/admin`, `roles/owner`, `roles/dns.admin`, `roles/resourcemanager.tagUser`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.networkAdmin` (+1 service agent role) |
| `dns.policies.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/dns.admin`, `roles/dns.editor`, `roles/dns.viewer`, `roles/dns.reader`, `roles/iam.networkAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+7 service agent roles) |
| `dns.policies.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/dns.admin`, `roles/dns.editor`, `roles/dns.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/dns.reader`, `roles/iam.networkAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` (+6 service agent roles) |
| `dns.policies.listEffectiveTags` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/dns.admin`, `roles/dns.editor`, `roles/dns.viewer`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/dns.reader`, `roles/iam.networkAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+5 service agent roles) |
| `dns.policies.listTagBindings` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/dns.admin`, `roles/dns.editor`, `roles/dns.viewer`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/dns.reader`, `roles/iam.networkAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+5 service agent roles) |
| `dns.policies.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/dns.admin`, `roles/dns.editor`, `roles/iam.networkAdmin` (+6 service agent roles) |
| `dns.projects.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/dns.admin`, `roles/dns.editor`, `roles/dns.viewer`, `roles/dns.reader`, `roles/iam.networkAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+6 service agent roles) |
| `dns.resourceRecordSets.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/dns.admin`, `roles/dns.editor`, `roles/iam.networkAdmin` (+11 service agent roles) |
| `dns.resourceRecordSets.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/dns.admin`, `roles/dns.editor`, `roles/iam.networkAdmin` (+11 service agent roles) |
| `dns.resourceRecordSets.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/dns.admin`, `roles/dns.editor`, `roles/dns.viewer`, `roles/dns.reader`, `roles/iam.networkAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+9 service agent roles) |
| `dns.resourceRecordSets.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/dns.admin`, `roles/dns.editor`, `roles/dns.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/dns.reader`, `roles/iam.networkAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` (+12 service agent roles) |
| `dns.resourceRecordSets.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/dns.admin`, `roles/dns.editor`, `roles/iam.networkAdmin` (+11 service agent roles) |
| `dns.responsePolicies.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/dns.admin`, `roles/dns.editor`, `roles/container.hostServiceAgentUser`, `roles/iam.networkAdmin` (+6 service agent roles) |
| `dns.responsePolicies.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/dns.admin`, `roles/dns.editor`, `roles/container.hostServiceAgentUser`, `roles/iam.networkAdmin` (+6 service agent roles) |
| `dns.responsePolicies.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/dns.admin`, `roles/dns.editor`, `roles/dns.viewer`, `roles/container.hostServiceAgentUser`, `roles/dns.reader`, `roles/iam.networkAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` (+6 service agent roles) |
| `dns.responsePolicies.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/dns.admin`, `roles/dns.editor`, `roles/dns.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/container.hostServiceAgentUser`, `roles/dns.reader`, `roles/iam.networkAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` (+6 service agent roles) |
| `dns.responsePolicies.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/dns.admin`, `roles/dns.editor`, `roles/container.hostServiceAgentUser`, `roles/iam.networkAdmin` (+6 service agent roles) |
| `dns.responsePolicyRules.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/dns.admin`, `roles/dns.editor`, `roles/container.hostServiceAgentUser`, `roles/iam.networkAdmin` (+6 service agent roles) |
| `dns.responsePolicyRules.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/dns.admin`, `roles/dns.editor`, `roles/container.hostServiceAgentUser`, `roles/iam.networkAdmin` (+6 service agent roles) |
| `dns.responsePolicyRules.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/dns.admin`, `roles/dns.editor`, `roles/dns.viewer`, `roles/container.hostServiceAgentUser`, `roles/dns.reader`, `roles/iam.networkAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` (+6 service agent roles) |
| `dns.responsePolicyRules.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/dns.admin`, `roles/dns.editor`, `roles/dns.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/container.hostServiceAgentUser`, `roles/dns.reader`, `roles/iam.networkAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` (+6 service agent roles) |
| `dns.responsePolicyRules.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/dns.admin`, `roles/dns.editor`, `roles/container.hostServiceAgentUser`, `roles/iam.networkAdmin` (+6 service agent roles) |

## Notes

- Roles and permissions of the `dns` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/dns (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
