---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/edgecontainer
---

# Distributed Cloud Edge Container IAM roles and permissions

## Signature / Usage

Predefined roles of `edgecontainer` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Edge Container Admin (`roles/edgecontainer.admin`)

- Full access to Edge Container all resources.
- Permissions (70): `edgecontainer.apikeys.create`, `edgecontainer.apikeys.delete`, `edgecontainer.apikeys.get`, `edgecontainer.apikeys.list`, `edgecontainer.clusters.create`, `edgecontainer.clusters.delete`, `edgecontainer.clusters.generateAccessToken`, `edgecontainer.clusters.generateOfflineCredential`, `edgecontainer.clusters.get`, `edgecontainer.clusters.getIamPolicy`, `edgecontainer.clusters.list`, `edgecontainer.clusters.setIamPolicy`, `edgecontainer.clusters.update`, `edgecontainer.clusters.upgrade`, `edgecontainer.identityproviders.create`, `edgecontainer.identityproviders.delete`, `edgecontainer.identityproviders.get`, `edgecontainer.identityproviders.list`, `edgecontainer.locations.get`, `edgecontainer.locations.list`, `edgecontainer.machines.create`, `edgecontainer.machines.delete`, `edgecontainer.machines.get`, `edgecontainer.machines.getIamPolicy`, `edgecontainer.machines.list`, `edgecontainer.machines.setIamPolicy`, `edgecontainer.machines.update`, `edgecontainer.machines.use`, `edgecontainer.nodePools.create`, `edgecontainer.nodePools.delete`, `edgecontainer.nodePools.get`, `edgecontainer.nodePools.getIamPolicy`, `edgecontainer.nodePools.list`, `edgecontainer.nodePools.setIamPolicy`, `edgecontainer.nodePools.update`, `edgecontainer.operations.cancel`, `edgecontainer.operations.delete`, `edgecontainer.operations.get`, `edgecontainer.operations.list`, `edgecontainer.serverconfig.get`, `edgecontainer.serviceaccounts.create`, `edgecontainer.serviceaccounts.delete`, `edgecontainer.serviceaccounts.describekey`, `edgecontainer.serviceaccounts.disablekey`, `edgecontainer.serviceaccounts.generatekey`, `edgecontainer.serviceaccounts.get`, `edgecontainer.serviceaccounts.list`, `edgecontainer.serviceaccounts.listkeys`, `edgecontainer.vpnConnections.create`, `edgecontainer.vpnConnections.delete`, `edgecontainer.vpnConnections.get`, `edgecontainer.vpnConnections.getIamPolicy`, `edgecontainer.vpnConnections.list`, `edgecontainer.vpnConnections.setIamPolicy`, `edgecontainer.vpnConnections.update`, `edgecontainer.zonalProjects.disable`, `edgecontainer.zonalProjects.enable`, `edgecontainer.zonalProjects.get`, `edgecontainer.zonalProjects.list`, `edgecontainer.zonalservices.disable`, `edgecontainer.zonalservices.enable`, `edgecontainer.zonalservices.get`, `edgecontainer.zonalservices.list`, `edgecontainer.zones.get`, `edgecontainer.zones.getZoneIamPolicy`, `edgecontainer.zones.list`, `edgecontainer.zones.listRoles`, `edgecontainer.zones.setZoneIamPolicy`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Edge Container Editor (`roles/edgecontainer.editor`)

- Editor role for Edge Container resources.
- Permissions (64): `edgecontainer.apikeys.create`, `edgecontainer.apikeys.delete`, `edgecontainer.apikeys.get`, `edgecontainer.apikeys.list`, `edgecontainer.clusters.create`, `edgecontainer.clusters.delete`, `edgecontainer.clusters.generateAccessToken`, `edgecontainer.clusters.get`, `edgecontainer.clusters.getIamPolicy`, `edgecontainer.clusters.list`, `edgecontainer.clusters.update`, `edgecontainer.clusters.upgrade`, `edgecontainer.identityproviders.create`, `edgecontainer.identityproviders.delete`, `edgecontainer.identityproviders.get`, `edgecontainer.identityproviders.list`, `edgecontainer.locations.get`, `edgecontainer.locations.list`, `edgecontainer.machines.create`, `edgecontainer.machines.delete`, `edgecontainer.machines.get`, `edgecontainer.machines.getIamPolicy`, `edgecontainer.machines.list`, `edgecontainer.machines.update`, `edgecontainer.machines.use`, `edgecontainer.nodePools.create`, `edgecontainer.nodePools.delete`, `edgecontainer.nodePools.get`, `edgecontainer.nodePools.getIamPolicy`, `edgecontainer.nodePools.list`, `edgecontainer.nodePools.update`, `edgecontainer.operations.cancel`, `edgecontainer.operations.delete`, `edgecontainer.operations.get`, `edgecontainer.operations.list`, `edgecontainer.serverconfig.get`, `edgecontainer.serviceaccounts.create`, `edgecontainer.serviceaccounts.delete`, `edgecontainer.serviceaccounts.describekey`, `edgecontainer.serviceaccounts.disablekey`, `edgecontainer.serviceaccounts.generatekey`, `edgecontainer.serviceaccounts.get`, `edgecontainer.serviceaccounts.list`, `edgecontainer.serviceaccounts.listkeys`, `edgecontainer.vpnConnections.create`, `edgecontainer.vpnConnections.delete`, `edgecontainer.vpnConnections.get`, `edgecontainer.vpnConnections.getIamPolicy`, `edgecontainer.vpnConnections.list`, `edgecontainer.vpnConnections.update`, `edgecontainer.zonalProjects.disable`, `edgecontainer.zonalProjects.enable`, `edgecontainer.zonalProjects.get`, `edgecontainer.zonalProjects.list`, `edgecontainer.zonalservices.disable`, `edgecontainer.zonalservices.enable`, `edgecontainer.zonalservices.get`, `edgecontainer.zonalservices.list`, `edgecontainer.zones.get`, `edgecontainer.zones.getZoneIamPolicy`, `edgecontainer.zones.list`, `edgecontainer.zones.listRoles`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Edge Container Viewer (`roles/edgecontainer.viewer`)

- Read-only access to Edge Container all resources.
- Permissions (37): `edgecontainer.apikeys.get`, `edgecontainer.apikeys.list`, `edgecontainer.clusters.generateAccessToken`, `edgecontainer.clusters.get`, `edgecontainer.clusters.getIamPolicy`, `edgecontainer.clusters.list`, `edgecontainer.identityproviders.get`, `edgecontainer.identityproviders.list`, `edgecontainer.locations.get`, `edgecontainer.locations.list`, `edgecontainer.machines.get`, `edgecontainer.machines.getIamPolicy`, `edgecontainer.machines.list`, `edgecontainer.nodePools.get`, `edgecontainer.nodePools.getIamPolicy`, `edgecontainer.nodePools.list`, `edgecontainer.operations.get`, `edgecontainer.operations.list`, `edgecontainer.serverconfig.get`, `edgecontainer.serviceaccounts.describekey`, `edgecontainer.serviceaccounts.generatekey`, `edgecontainer.serviceaccounts.get`, `edgecontainer.serviceaccounts.list`, `edgecontainer.serviceaccounts.listkeys`, `edgecontainer.vpnConnections.get`, `edgecontainer.vpnConnections.getIamPolicy`, `edgecontainer.vpnConnections.list`, `edgecontainer.zonalProjects.get`, `edgecontainer.zonalProjects.list`, `edgecontainer.zonalservices.get`, `edgecontainer.zonalservices.list`, `edgecontainer.zones.get`, `edgecontainer.zones.getZoneIamPolicy`, `edgecontainer.zones.list`, `edgecontainer.zones.listRoles`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Edge Container API Key Admin (`roles/edgecontainer.apiKeyAdmin`)

- Access to manage API Keys.
- Permissions (10): `edgecontainer.apikeys.create`, `edgecontainer.apikeys.delete`, `edgecontainer.apikeys.get`, `edgecontainer.apikeys.list`, `edgecontainer.locations.get`, `edgecontainer.locations.list`, `edgecontainer.operations.cancel`, `edgecontainer.operations.delete`, `edgecontainer.operations.get`, `edgecontainer.operations.list`

#### Edge Container API Key Viewer (`roles/edgecontainer.apiKeyViewer`)

- Read-only access to API Keys.
- Permissions (6): `edgecontainer.apikeys.get`, `edgecontainer.apikeys.list`, `edgecontainer.locations.get`, `edgecontainer.locations.list`, `edgecontainer.operations.get`, `edgecontainer.operations.list`

#### Edge Container Identity Provider Admin (`roles/edgecontainer.identityProviderAdmin`)

- Access to manage Identity Providers.
- Permissions (6): `edgecontainer.identityproviders.create`, `edgecontainer.identityproviders.delete`, `edgecontainer.identityproviders.get`, `edgecontainer.identityproviders.list`, `edgecontainer.locations.get`, `edgecontainer.locations.list`

#### Edge Container Identity Provider Viewer (`roles/edgecontainer.identityProviderViewer`)

- Read-only access to Identity Providers.
- Permissions (4): `edgecontainer.identityproviders.get`, `edgecontainer.identityproviders.list`, `edgecontainer.locations.get`, `edgecontainer.locations.list`

#### Edge Container Machine User (`roles/edgecontainer.machineUser`)

- Access to use Edge Container Machine resources.
- Permissions (6): `edgecontainer.machines.get`, `edgecontainer.machines.getIamPolicy`, `edgecontainer.machines.list`, `edgecontainer.machines.use`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Edge Container Cluster offline Credential User (`roles/edgecontainer.offlineCredentialUser`)

- Access to get Edge Container cluster offline credentials
- Permissions (3): `edgecontainer.clusters.generateOfflineCredential`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Edge Container Service Account Admin (`roles/edgecontainer.serviceAccountAdmin`)

- Access to manage Service Accounts.
- Permissions (6): `edgecontainer.locations.get`, `edgecontainer.locations.list`, `edgecontainer.serviceaccounts.create`, `edgecontainer.serviceaccounts.delete`, `edgecontainer.serviceaccounts.get`, `edgecontainer.serviceaccounts.list`

#### Edge Container Service Account Key Admin (`roles/edgecontainer.serviceAccountKeyAdmin`)

- Access to manage Service Account Keys.
- Permissions (6): `edgecontainer.serviceaccounts.describekey`, `edgecontainer.serviceaccounts.disablekey`, `edgecontainer.serviceaccounts.generatekey`, `edgecontainer.serviceaccounts.get`, `edgecontainer.serviceaccounts.list`, `edgecontainer.serviceaccounts.listkeys`

#### Edge Container Service Account Key Viewer (`roles/edgecontainer.serviceAccountKeyViewer`)

- Access to view Service Account Keys.
- Permissions (4): `edgecontainer.serviceaccounts.describekey`, `edgecontainer.serviceaccounts.get`, `edgecontainer.serviceaccounts.list`, `edgecontainer.serviceaccounts.listkeys`

#### Edge Container Service Account Viewer (`roles/edgecontainer.serviceAccountViewer`)

- Read-only access to Service Accounts.
- Permissions (4): `edgecontainer.locations.get`, `edgecontainer.locations.list`, `edgecontainer.serviceaccounts.get`, `edgecontainer.serviceaccounts.list`

#### Edge Container Zonal Project Admin (`roles/edgecontainer.zonalProjectAdmin`)

- Access to manage zonal projects.
- Permissions (12): `edgecontainer.locations.get`, `edgecontainer.locations.list`, `edgecontainer.operations.cancel`, `edgecontainer.operations.delete`, `edgecontainer.operations.get`, `edgecontainer.operations.list`, `edgecontainer.zonalProjects.disable`, `edgecontainer.zonalProjects.enable`, `edgecontainer.zonalProjects.get`, `edgecontainer.zonalProjects.list`, `edgecontainer.zones.get`, `edgecontainer.zones.list`

#### Edge Container Zonal Project Viewer (`roles/edgecontainer.zonalProjectViewer`)

- Read-only access to zonal projects.
- Permissions (8): `edgecontainer.locations.get`, `edgecontainer.locations.list`, `edgecontainer.operations.get`, `edgecontainer.operations.list`, `edgecontainer.zonalProjects.get`, `edgecontainer.zonalProjects.list`, `edgecontainer.zones.get`, `edgecontainer.zones.list`

#### Edge Container Zonal Service Admin (`roles/edgecontainer.zonalServiceAdmin`)

- Access to mutate zonal service.
- Permissions (10): `edgecontainer.locations.get`, `edgecontainer.locations.list`, `edgecontainer.operations.cancel`, `edgecontainer.operations.delete`, `edgecontainer.operations.get`, `edgecontainer.operations.list`, `edgecontainer.zonalservices.disable`, `edgecontainer.zonalservices.enable`, `edgecontainer.zonalservices.get`, `edgecontainer.zonalservices.list`

#### Edge Container Zonal Service Viewer (`roles/edgecontainer.zonalServiceViewer`)

- Read-only access to zonal services.
- Permissions (6): `edgecontainer.locations.get`, `edgecontainer.locations.list`, `edgecontainer.operations.get`, `edgecontainer.operations.list`, `edgecontainer.zonalservices.get`, `edgecontainer.zonalservices.list`

#### Edge Container Zone Iam Policy Admin (`roles/edgecontainer.zoneIamAdmin`)

- Access to manage Iam Policy in the zone.
- Permissions (5): `edgecontainer.locations.get`, `edgecontainer.locations.list`, `edgecontainer.zones.getZoneIamPolicy`, `edgecontainer.zones.listRoles`, `edgecontainer.zones.setZoneIamPolicy`

#### Edge Container Zone Iam Policy Viewer (`roles/edgecontainer.zoneIamViewer`)

- Read-only access to Iam Policy in the zone.
- Permissions (3): `edgecontainer.locations.get`, `edgecontainer.locations.list`, `edgecontainer.zones.getZoneIamPolicy`

#### Edge Container Roles Viewer (`roles/edgecontainer.zoneRolesViewer`)

- Read-only access to Roles in the zone.
- Permissions (3): `edgecontainer.locations.get`, `edgecontainer.locations.list`, `edgecontainer.zones.listRoles`

#### Edge Container Zone Viewer (`roles/edgecontainer.zoneViewer`)

- Read-only access to zones.
- Permissions (6): `edgecontainer.locations.get`, `edgecontainer.locations.list`, `edgecontainer.operations.get`, `edgecontainer.operations.list`, `edgecontainer.zones.get`, `edgecontainer.zones.list`

#### Edge Container Cluster Service Agent (`roles/edgecontainer.clusterServiceAgent`)

- Grants the Edge Container Cluster Service Account access to manage resources. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (94): `cloudnotifications.activities.list`, `gkehub.endpoints.connect`, `gkehub.features.create`, `gkehub.features.get`, `gkehub.features.list`, `gkehub.features.update`, `gkehub.fleet.create`, `gkehub.fleet.delete`, `gkehub.fleet.get`, `gkehub.locations.get`, `gkehub.locations.list`, `gkehub.memberships.create`, `gkehub.memberships.delete`, `gkehub.memberships.generateConnectManifest`, `gkehub.memberships.get`, `gkehub.memberships.list`, `gkehub.memberships.update`, `gkehub.operations.cancel`, `gkehub.operations.delete`, `gkehub.operations.get`, `gkehub.operations.list`, `kubernetesmetadata.metadata.config`, `kubernetesmetadata.metadata.publish`, `kubernetesmetadata.metadata.snapshot`, `logging.logEntries.create`, `monitoring.alertPolicies.get`, `monitoring.alertPolicies.list`, `monitoring.alertPolicies.listEffectiveTags`, `monitoring.alertPolicies.listTagBindings`, `monitoring.alerts.get`, `monitoring.alerts.list`, `monitoring.dashboards.create`, `monitoring.dashboards.delete`, `monitoring.dashboards.get`, `monitoring.dashboards.list`, `monitoring.dashboards.listEffectiveTags`, `monitoring.dashboards.listTagBindings`, `monitoring.dashboards.update`, `monitoring.groups.get`, `monitoring.groups.list`, `monitoring.metricDescriptors.create`, `monitoring.metricDescriptors.get`, `monitoring.metricDescriptors.list`, `monitoring.monitoredResourceDescriptors.get`, `monitoring.monitoredResourceDescriptors.list`, `monitoring.notificationChannelDescriptors.get`, `monitoring.notificationChannelDescriptors.list`, `monitoring.notificationChannels.get`, `monitoring.notificationChannels.list`, `monitoring.services.get`, `monitoring.services.list`, `monitoring.slos.get`, `monitoring.slos.list`, `monitoring.snoozes.get`, `monitoring.snoozes.list`, `monitoring.timeSeries.create`, `monitoring.timeSeries.list`, `monitoring.uptimeCheckConfigs.get`, `monitoring.uptimeCheckConfigs.list`, `opsconfigmonitoring.resourceMetadata.list`, `opsconfigmonitoring.resourceMetadata.write`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `serviceusage.catalogs.listMembers`, `serviceusage.consumerpolicy.analyze`, `serviceusage.consumerpolicy.get`, `serviceusage.consumerpolicy.update`, `serviceusage.contentsecuritypolicy.get`, `serviceusage.effectivemcppolicy.get`, `serviceusage.effectivepolicy.get`, `serviceusage.groups.list`, `serviceusage.groups.listExpandedMembers`, `serviceusage.groups.listMembers`, `serviceusage.mcppolicy.get`, `serviceusage.operations.get`, `serviceusage.quotas.get`, `serviceusage.services.enable`, `serviceusage.services.get`, `serviceusage.services.list`, `serviceusage.services.listApis`, `serviceusage.services.listDependentServices`, `serviceusage.values.test`, `stackdriver.projects.get`, `stackdriver.resourceMetadata.list`, `stackdriver.resourceMetadata.write`, `storage.buckets.create`, `storage.buckets.get`, `storage.buckets.list`, `storage.buckets.update`, `storage.objects.create`, `storage.objects.delete`, `storage.objects.get`, `storage.objects.list`, `storage.objects.update`

#### Edge Container Service Agent (`roles/edgecontainer.serviceAgent`)

- Grants the Edge Container Service Account access to manage resources. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (53): `compute.externalVpnGateways.create`, `compute.externalVpnGateways.delete`, `compute.externalVpnGateways.get`, `compute.externalVpnGateways.use`, `compute.globalOperations.get`, `compute.networks.get`, `compute.networks.updatePolicy`, `compute.regionOperations.get`, `compute.routers.create`, `compute.routers.delete`, `compute.routers.get`, `compute.routers.list`, `compute.routers.update`, `compute.routers.use`, `compute.vpnGateways.create`, `compute.vpnGateways.delete`, `compute.vpnGateways.get`, `compute.vpnGateways.use`, `compute.vpnTunnels.create`, `compute.vpnTunnels.delete`, `compute.vpnTunnels.get`, `gkehub.endpoints.connect`, `gkehub.features.create`, `gkehub.features.get`, `gkehub.features.list`, `gkehub.features.update`, `gkehub.fleet.create`, `gkehub.fleet.delete`, `gkehub.fleet.get`, `gkehub.locations.get`, `gkehub.locations.list`, `gkehub.memberships.create`, `gkehub.memberships.delete`, `gkehub.memberships.generateConnectManifest`, `gkehub.memberships.get`, `gkehub.memberships.list`, `gkehub.memberships.update`, `gkehub.operations.cancel`, `gkehub.operations.delete`, `gkehub.operations.get`, `gkehub.operations.list`, `serviceusage.catalogs.listMembers`, `serviceusage.consumerpolicy.analyze`, `serviceusage.consumerpolicy.get`, `serviceusage.effectivepolicy.get`, `serviceusage.groups.list`, `serviceusage.groups.listExpandedMembers`, `serviceusage.groups.listMembers`, `serviceusage.services.get`, `serviceusage.services.list`, `serviceusage.services.listApis`, `serviceusage.services.listDependentServices`, `serviceusage.values.test`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/edgecontainer.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `edgecontainer.apikeys.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor`, `roles/edgecontainer.apiKeyAdmin` |
| `edgecontainer.apikeys.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor`, `roles/edgecontainer.apiKeyAdmin` |
| `edgecontainer.apikeys.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor`, `roles/edgecontainer.viewer`, `roles/edgecontainer.apiKeyAdmin`, `roles/edgecontainer.apiKeyViewer`, `roles/iam.supportUser` |
| `edgecontainer.apikeys.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor`, `roles/edgecontainer.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/edgecontainer.apiKeyAdmin`, `roles/edgecontainer.apiKeyViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `edgecontainer.clusters.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor` |
| `edgecontainer.clusters.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor` |
| `edgecontainer.clusters.generateAccessToken` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor`, `roles/edgecontainer.viewer`, `roles/iam.supportUser` |
| `edgecontainer.clusters.generateOfflineCredential` | `roles/admin`, `roles/owner`, `roles/edgecontainer.admin`, `roles/edgecontainer.offlineCredentialUser` |
| `edgecontainer.clusters.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor`, `roles/edgecontainer.viewer`, `roles/iam.supportUser` |
| `edgecontainer.clusters.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor`, `roles/edgecontainer.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `edgecontainer.clusters.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor`, `roles/edgecontainer.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `edgecontainer.clusters.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/edgecontainer.admin`, `roles/iam.securityAdmin` |
| `edgecontainer.clusters.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor` |
| `edgecontainer.clusters.upgrade` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor` |
| `edgecontainer.identityproviders.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor`, `roles/edgecontainer.identityProviderAdmin` |
| `edgecontainer.identityproviders.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor`, `roles/edgecontainer.identityProviderAdmin` |
| `edgecontainer.identityproviders.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor`, `roles/edgecontainer.viewer`, `roles/edgecontainer.identityProviderAdmin`, `roles/edgecontainer.identityProviderViewer`, `roles/iam.supportUser` |
| `edgecontainer.identityproviders.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor`, `roles/edgecontainer.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/edgecontainer.identityProviderAdmin`, `roles/edgecontainer.identityProviderViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `edgecontainer.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor`, `roles/edgecontainer.viewer`, `roles/edgecontainer.apiKeyAdmin`, `roles/edgecontainer.apiKeyViewer`, `roles/edgecontainer.identityProviderAdmin`, `roles/edgecontainer.identityProviderViewer`, `roles/edgecontainer.serviceAccountAdmin`, `roles/edgecontainer.serviceAccountViewer`, `roles/edgecontainer.zonalProjectAdmin`, `roles/edgecontainer.zonalProjectViewer`, `roles/edgecontainer.zonalServiceAdmin`, `roles/edgecontainer.zonalServiceViewer`, `roles/edgecontainer.zoneIamAdmin`, `roles/edgecontainer.zoneIamViewer`, `roles/edgecontainer.zoneRolesViewer`, `roles/edgecontainer.zoneViewer`, `roles/iam.supportUser` |
| `edgecontainer.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor`, `roles/edgecontainer.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/edgecontainer.apiKeyAdmin`, `roles/edgecontainer.apiKeyViewer`, `roles/edgecontainer.identityProviderAdmin`, `roles/edgecontainer.identityProviderViewer`, `roles/edgecontainer.serviceAccountAdmin`, `roles/edgecontainer.serviceAccountViewer`, `roles/edgecontainer.zonalProjectAdmin`, `roles/edgecontainer.zonalProjectViewer`, `roles/edgecontainer.zonalServiceAdmin`, `roles/edgecontainer.zonalServiceViewer`, `roles/edgecontainer.zoneIamAdmin`, `roles/edgecontainer.zoneIamViewer`, `roles/edgecontainer.zoneRolesViewer`, `roles/edgecontainer.zoneViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `edgecontainer.machines.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor` |
| `edgecontainer.machines.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor` |
| `edgecontainer.machines.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor`, `roles/edgecontainer.viewer`, `roles/edgecontainer.machineUser`, `roles/iam.supportUser` |
| `edgecontainer.machines.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor`, `roles/edgecontainer.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/edgecontainer.machineUser`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `edgecontainer.machines.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor`, `roles/edgecontainer.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/edgecontainer.machineUser`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `edgecontainer.machines.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/edgecontainer.admin`, `roles/iam.securityAdmin` |
| `edgecontainer.machines.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor` |
| `edgecontainer.machines.use` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor`, `roles/edgecontainer.machineUser` |
| `edgecontainer.nodePools.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor` |
| `edgecontainer.nodePools.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor` |
| `edgecontainer.nodePools.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor`, `roles/edgecontainer.viewer`, `roles/iam.supportUser` |
| `edgecontainer.nodePools.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor`, `roles/edgecontainer.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `edgecontainer.nodePools.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor`, `roles/edgecontainer.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `edgecontainer.nodePools.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/edgecontainer.admin`, `roles/iam.securityAdmin` |
| `edgecontainer.nodePools.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor` |
| `edgecontainer.operations.cancel` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor`, `roles/edgecontainer.apiKeyAdmin`, `roles/edgecontainer.zonalProjectAdmin`, `roles/edgecontainer.zonalServiceAdmin` |
| `edgecontainer.operations.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor`, `roles/edgecontainer.apiKeyAdmin`, `roles/edgecontainer.zonalProjectAdmin`, `roles/edgecontainer.zonalServiceAdmin` |
| `edgecontainer.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor`, `roles/edgecontainer.viewer`, `roles/edgecontainer.apiKeyAdmin`, `roles/edgecontainer.apiKeyViewer`, `roles/edgecontainer.zonalProjectAdmin`, `roles/edgecontainer.zonalProjectViewer`, `roles/edgecontainer.zonalServiceAdmin`, `roles/edgecontainer.zonalServiceViewer`, `roles/edgecontainer.zoneViewer`, `roles/iam.supportUser` |
| `edgecontainer.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor`, `roles/edgecontainer.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/edgecontainer.apiKeyAdmin`, `roles/edgecontainer.apiKeyViewer`, `roles/edgecontainer.zonalProjectAdmin`, `roles/edgecontainer.zonalProjectViewer`, `roles/edgecontainer.zonalServiceAdmin`, `roles/edgecontainer.zonalServiceViewer`, `roles/edgecontainer.zoneViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `edgecontainer.serverconfig.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor`, `roles/edgecontainer.viewer`, `roles/iam.supportUser` |
| `edgecontainer.serviceaccounts.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor`, `roles/edgecontainer.serviceAccountAdmin` |
| `edgecontainer.serviceaccounts.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor`, `roles/edgecontainer.serviceAccountAdmin` |
| `edgecontainer.serviceaccounts.describekey` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor`, `roles/edgecontainer.viewer`, `roles/edgecontainer.serviceAccountKeyAdmin`, `roles/edgecontainer.serviceAccountKeyViewer`, `roles/iam.supportUser` |
| `edgecontainer.serviceaccounts.disablekey` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor`, `roles/edgecontainer.serviceAccountKeyAdmin` |
| `edgecontainer.serviceaccounts.generatekey` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor`, `roles/edgecontainer.viewer`, `roles/edgecontainer.serviceAccountKeyAdmin`, `roles/iam.supportUser` |
| `edgecontainer.serviceaccounts.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor`, `roles/edgecontainer.viewer`, `roles/edgecontainer.serviceAccountAdmin`, `roles/edgecontainer.serviceAccountKeyAdmin`, `roles/edgecontainer.serviceAccountKeyViewer`, `roles/edgecontainer.serviceAccountViewer`, `roles/iam.supportUser` |
| `edgecontainer.serviceaccounts.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor`, `roles/edgecontainer.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/edgecontainer.serviceAccountAdmin`, `roles/edgecontainer.serviceAccountKeyAdmin`, `roles/edgecontainer.serviceAccountKeyViewer`, `roles/edgecontainer.serviceAccountViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `edgecontainer.serviceaccounts.listkeys` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor`, `roles/edgecontainer.viewer`, `roles/edgecontainer.serviceAccountKeyAdmin`, `roles/edgecontainer.serviceAccountKeyViewer`, `roles/iam.supportUser` |
| `edgecontainer.vpnConnections.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor` |
| `edgecontainer.vpnConnections.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor` |
| `edgecontainer.vpnConnections.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor`, `roles/edgecontainer.viewer`, `roles/iam.supportUser` |
| `edgecontainer.vpnConnections.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor`, `roles/edgecontainer.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `edgecontainer.vpnConnections.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor`, `roles/edgecontainer.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `edgecontainer.vpnConnections.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/edgecontainer.admin`, `roles/iam.securityAdmin` |
| `edgecontainer.vpnConnections.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor` |
| `edgecontainer.zonalProjects.disable` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor`, `roles/edgecontainer.zonalProjectAdmin` |
| `edgecontainer.zonalProjects.enable` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor`, `roles/edgecontainer.zonalProjectAdmin` |
| `edgecontainer.zonalProjects.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor`, `roles/edgecontainer.viewer`, `roles/edgecontainer.zonalProjectAdmin`, `roles/edgecontainer.zonalProjectViewer`, `roles/iam.supportUser` |
| `edgecontainer.zonalProjects.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor`, `roles/edgecontainer.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/edgecontainer.zonalProjectAdmin`, `roles/edgecontainer.zonalProjectViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `edgecontainer.zonalservices.disable` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor`, `roles/edgecontainer.zonalServiceAdmin` |
| `edgecontainer.zonalservices.enable` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor`, `roles/edgecontainer.zonalServiceAdmin` |
| `edgecontainer.zonalservices.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor`, `roles/edgecontainer.viewer`, `roles/edgecontainer.zonalServiceAdmin`, `roles/edgecontainer.zonalServiceViewer`, `roles/iam.supportUser` |
| `edgecontainer.zonalservices.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor`, `roles/edgecontainer.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/edgecontainer.zonalServiceAdmin`, `roles/edgecontainer.zonalServiceViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `edgecontainer.zones.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor`, `roles/edgecontainer.viewer`, `roles/edgecontainer.zonalProjectAdmin`, `roles/edgecontainer.zonalProjectViewer`, `roles/edgecontainer.zoneViewer`, `roles/iam.supportUser` |
| `edgecontainer.zones.getZoneIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor`, `roles/edgecontainer.viewer`, `roles/edgecontainer.zoneIamAdmin`, `roles/edgecontainer.zoneIamViewer`, `roles/iam.supportUser` |
| `edgecontainer.zones.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor`, `roles/edgecontainer.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/edgecontainer.zonalProjectAdmin`, `roles/edgecontainer.zonalProjectViewer`, `roles/edgecontainer.zoneViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `edgecontainer.zones.listRoles` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/edgecontainer.admin`, `roles/edgecontainer.editor`, `roles/edgecontainer.viewer`, `roles/edgecontainer.zoneIamAdmin`, `roles/edgecontainer.zoneRolesViewer`, `roles/iam.supportUser` |
| `edgecontainer.zones.setZoneIamPolicy` | `roles/admin`, `roles/owner`, `roles/edgecontainer.admin`, `roles/edgecontainer.zoneIamAdmin` |

## Notes

- Roles and permissions of the `edgecontainer` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/edgecontainer (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
