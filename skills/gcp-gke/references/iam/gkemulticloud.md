---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/gkemulticloud
---

# GKE Multi-Cloud IAM roles and permissions

## Signature / Usage

Predefined roles of `gkemulticloud` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Anthos Multi-cloud Admin (`roles/gkemulticloud.admin`)

- Admin access to Anthos Multi-cloud resources.
- Permissions (49): `gkemulticloud.attachedClusters.create`, `gkemulticloud.attachedClusters.createTagBinding`, `gkemulticloud.attachedClusters.delete`, `gkemulticloud.attachedClusters.deleteTagBinding`, `gkemulticloud.attachedClusters.generateInstallManifest`, `gkemulticloud.attachedClusters.get`, `gkemulticloud.attachedClusters.import`, `gkemulticloud.attachedClusters.list`, `gkemulticloud.attachedClusters.listEffectiveTags`, `gkemulticloud.attachedClusters.listTagBindings`, `gkemulticloud.attachedClusters.update`, `gkemulticloud.attachedServerConfigs.get`, `gkemulticloud.awsClusters.create`, `gkemulticloud.awsClusters.delete`, `gkemulticloud.awsClusters.generateAccessToken`, `gkemulticloud.awsClusters.get`, `gkemulticloud.awsClusters.getAdminKubeconfig`, `gkemulticloud.awsClusters.list`, `gkemulticloud.awsClusters.update`, `gkemulticloud.awsNodePools.create`, `gkemulticloud.awsNodePools.delete`, `gkemulticloud.awsNodePools.get`, `gkemulticloud.awsNodePools.list`, `gkemulticloud.awsNodePools.update`, `gkemulticloud.awsServerConfigs.get`, `gkemulticloud.azureClients.create`, `gkemulticloud.azureClients.delete`, `gkemulticloud.azureClients.get`, `gkemulticloud.azureClients.list`, `gkemulticloud.azureClusters.create`, `gkemulticloud.azureClusters.delete`, `gkemulticloud.azureClusters.generateAccessToken`, `gkemulticloud.azureClusters.get`, `gkemulticloud.azureClusters.getAdminKubeconfig`, `gkemulticloud.azureClusters.list`, `gkemulticloud.azureClusters.update`, `gkemulticloud.azureNodePools.create`, `gkemulticloud.azureNodePools.delete`, `gkemulticloud.azureNodePools.get`, `gkemulticloud.azureNodePools.list`, `gkemulticloud.azureNodePools.update`, `gkemulticloud.azureServerConfigs.get`, `gkemulticloud.operations.cancel`, `gkemulticloud.operations.delete`, `gkemulticloud.operations.get`, `gkemulticloud.operations.list`, `gkemulticloud.operations.wait`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Anthos Multi-cloud Editor (`roles/gkemulticloud.editor`)

- Editor role for Anthos Multi-cloud
- Permissions (45): `gkemulticloud.attachedClusters.create`, `gkemulticloud.attachedClusters.delete`, `gkemulticloud.attachedClusters.generateInstallManifest`, `gkemulticloud.attachedClusters.get`, `gkemulticloud.attachedClusters.import`, `gkemulticloud.attachedClusters.list`, `gkemulticloud.attachedClusters.listEffectiveTags`, `gkemulticloud.attachedClusters.listTagBindings`, `gkemulticloud.attachedClusters.update`, `gkemulticloud.attachedServerConfigs.get`, `gkemulticloud.awsClusters.create`, `gkemulticloud.awsClusters.delete`, `gkemulticloud.awsClusters.generateAccessToken`, `gkemulticloud.awsClusters.get`, `gkemulticloud.awsClusters.list`, `gkemulticloud.awsClusters.update`, `gkemulticloud.awsNodePools.create`, `gkemulticloud.awsNodePools.delete`, `gkemulticloud.awsNodePools.get`, `gkemulticloud.awsNodePools.list`, `gkemulticloud.awsNodePools.update`, `gkemulticloud.awsServerConfigs.get`, `gkemulticloud.azureClients.create`, `gkemulticloud.azureClients.delete`, `gkemulticloud.azureClients.get`, `gkemulticloud.azureClients.list`, `gkemulticloud.azureClusters.create`, `gkemulticloud.azureClusters.delete`, `gkemulticloud.azureClusters.generateAccessToken`, `gkemulticloud.azureClusters.get`, `gkemulticloud.azureClusters.list`, `gkemulticloud.azureClusters.update`, `gkemulticloud.azureNodePools.create`, `gkemulticloud.azureNodePools.delete`, `gkemulticloud.azureNodePools.get`, `gkemulticloud.azureNodePools.list`, `gkemulticloud.azureNodePools.update`, `gkemulticloud.azureServerConfigs.get`, `gkemulticloud.operations.cancel`, `gkemulticloud.operations.delete`, `gkemulticloud.operations.get`, `gkemulticloud.operations.list`, `gkemulticloud.operations.wait`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Anthos Multi-cloud Viewer (`roles/gkemulticloud.viewer`)

- Viewer access to Anthos Multi-cloud resources.
- Permissions (25): `gkemulticloud.attachedClusters.generateInstallManifest`, `gkemulticloud.attachedClusters.get`, `gkemulticloud.attachedClusters.list`, `gkemulticloud.attachedClusters.listEffectiveTags`, `gkemulticloud.attachedClusters.listTagBindings`, `gkemulticloud.attachedServerConfigs.get`, `gkemulticloud.awsClusters.generateAccessToken`, `gkemulticloud.awsClusters.get`, `gkemulticloud.awsClusters.list`, `gkemulticloud.awsNodePools.get`, `gkemulticloud.awsNodePools.list`, `gkemulticloud.awsServerConfigs.get`, `gkemulticloud.azureClients.get`, `gkemulticloud.azureClients.list`, `gkemulticloud.azureClusters.generateAccessToken`, `gkemulticloud.azureClusters.get`, `gkemulticloud.azureClusters.list`, `gkemulticloud.azureNodePools.get`, `gkemulticloud.azureNodePools.list`, `gkemulticloud.azureServerConfigs.get`, `gkemulticloud.operations.get`, `gkemulticloud.operations.list`, `gkemulticloud.operations.wait`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Anthos Multi-cloud Telemetry Writer (`roles/gkemulticloud.telemetryWriter`)

- Grant access to write cluster telemetry data such as logs, metrics, and resource metadata.
- Permissions (12): `kubernetesmetadata.metadata.config`, `kubernetesmetadata.metadata.publish`, `kubernetesmetadata.metadata.snapshot`, `logging.logEntries.create`, `logging.logEntries.route`, `monitoring.metricDescriptors.create`, `monitoring.metricDescriptors.get`, `monitoring.metricDescriptors.list`, `monitoring.monitoredResourceDescriptors.get`, `monitoring.monitoredResourceDescriptors.list`, `monitoring.timeSeries.create`, `opsconfigmonitoring.resourceMetadata.write`

#### Anthos Multi-Cloud Container Service Agent (`roles/gkemulticloud.containerServiceAgent`)

- Grants the Anthos Multi-Cloud Container Service Account access to manage resources. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (49): `binaryauthorization.platformPolicies.evaluatePolicy`, `binaryauthorization.platformPolicies.get`, `binaryauthorization.platformPolicies.list`, `binaryauthorization.policy.evaluatePolicy`, `binaryauthorization.policy.get`, `cloudnotifications.activities.list`, `kubernetesmetadata.metadata.config`, `kubernetesmetadata.metadata.publish`, `kubernetesmetadata.metadata.snapshot`, `logging.logEntries.create`, `logging.logEntries.route`, `monitoring.alertPolicies.get`, `monitoring.alertPolicies.list`, `monitoring.alertPolicies.listEffectiveTags`, `monitoring.alertPolicies.listTagBindings`, `monitoring.alerts.get`, `monitoring.alerts.list`, `monitoring.dashboards.get`, `monitoring.dashboards.list`, `monitoring.dashboards.listEffectiveTags`, `monitoring.dashboards.listTagBindings`, `monitoring.groups.get`, `monitoring.groups.list`, `monitoring.metricDescriptors.create`, `monitoring.metricDescriptors.get`, `monitoring.metricDescriptors.list`, `monitoring.monitoredResourceDescriptors.get`, `monitoring.monitoredResourceDescriptors.list`, `monitoring.notificationChannelDescriptors.get`, `monitoring.notificationChannelDescriptors.list`, `monitoring.notificationChannels.get`, `monitoring.notificationChannels.list`, `monitoring.services.get`, `monitoring.services.list`, `monitoring.slos.get`, `monitoring.slos.list`, `monitoring.snoozes.get`, `monitoring.snoozes.list`, `monitoring.timeSeries.create`, `monitoring.timeSeries.list`, `monitoring.uptimeCheckConfigs.get`, `monitoring.uptimeCheckConfigs.list`, `opsconfigmonitoring.resourceMetadata.list`, `opsconfigmonitoring.resourceMetadata.write`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `serviceusage.services.use`, `stackdriver.projects.get`, `stackdriver.resourceMetadata.list`

#### Anthos Multi-Cloud Control Plane Machine Service Agent (`roles/gkemulticloud.controlPlaneMachineServiceAgent`)

- Grants the Anthos Multi-Cloud Control Plane Machine Service Account access to manage resources. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (4): `artifactregistry.dockerimages.get`, `artifactregistry.repositories.downloadArtifacts`, `artifactregistry.repositories.get`, `serviceusage.services.use`

#### Anthos Multi-Cloud Node Pool Machine Service Agent (`roles/gkemulticloud.nodePoolMachineServiceAgent`)

- Grants the Anthos Multi-Cloud Node Pool Machine Service Account access to manage resources. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (4): `artifactregistry.dockerimages.get`, `artifactregistry.repositories.downloadArtifacts`, `artifactregistry.repositories.get`, `serviceusage.services.use`

#### Anthos Multi-Cloud Service Agent (`roles/gkemulticloud.serviceAgent`)

- Grants the Anthos Multi-Cloud Service Account access to manage resources. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (63): `gkehub.endpoints.connect`, `gkehub.features.create`, `gkehub.features.delete`, `gkehub.features.get`, `gkehub.features.getIamPolicy`, `gkehub.features.list`, `gkehub.features.setIamPolicy`, `gkehub.features.update`, `gkehub.fleet.create`, `gkehub.fleet.createFreeTrial`, `gkehub.fleet.delete`, `gkehub.fleet.get`, `gkehub.fleet.getFreeTrial`, `gkehub.fleet.update`, `gkehub.fleet.updateFreeTrial`, `gkehub.locations.get`, `gkehub.locations.list`, `gkehub.membershipbindings.create`, `gkehub.membershipbindings.delete`, `gkehub.membershipbindings.get`, `gkehub.membershipbindings.list`, `gkehub.membershipbindings.update`, `gkehub.membershipfeatures.create`, `gkehub.membershipfeatures.delete`, `gkehub.membershipfeatures.get`, `gkehub.membershipfeatures.list`, `gkehub.membershipfeatures.update`, `gkehub.memberships.create`, `gkehub.memberships.delete`, `gkehub.memberships.generateConnectManifest`, `gkehub.memberships.get`, `gkehub.memberships.getIamPolicy`, `gkehub.memberships.list`, `gkehub.memberships.setIamPolicy`, `gkehub.memberships.update`, `gkehub.namespaces.create`, `gkehub.namespaces.delete`, `gkehub.namespaces.get`, `gkehub.namespaces.list`, `gkehub.namespaces.update`, `gkehub.operations.cancel`, `gkehub.operations.delete`, `gkehub.operations.get`, `gkehub.operations.list`, `gkehub.rbacrolebindings.create`, `gkehub.rbacrolebindings.delete`, `gkehub.rbacrolebindings.get`, `gkehub.rbacrolebindings.list`, `gkehub.rbacrolebindings.update`, `gkehub.scopes.create`, `gkehub.scopes.delete`, `gkehub.scopes.get`, `gkehub.scopes.getIamPolicy`, `gkehub.scopes.list`, `gkehub.scopes.listBoundMemberships`, `gkehub.scopes.update`, `gkemulticloud.awsClusters.delete`, `gkemulticloud.awsNodePools.delete`, `gkemulticloud.azureClients.delete`, `gkemulticloud.azureClusters.delete`, `gkemulticloud.azureNodePools.delete`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Project):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/gkemulticloud.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `gkemulticloud.attachedClusters.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkemulticloud.admin`, `roles/gkemulticloud.editor` |
| `gkemulticloud.attachedClusters.createTagBinding` | `roles/admin`, `roles/owner`, `roles/gkemulticloud.admin`, `roles/resourcemanager.tagUser`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver` |
| `gkemulticloud.attachedClusters.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkemulticloud.admin`, `roles/gkemulticloud.editor` |
| `gkemulticloud.attachedClusters.deleteTagBinding` | `roles/admin`, `roles/owner`, `roles/gkemulticloud.admin`, `roles/resourcemanager.tagUser`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver` |
| `gkemulticloud.attachedClusters.generateInstallManifest` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkemulticloud.admin`, `roles/gkemulticloud.editor`, `roles/gkemulticloud.viewer`, `roles/iam.supportUser` |
| `gkemulticloud.attachedClusters.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkemulticloud.admin`, `roles/gkemulticloud.editor`, `roles/gkemulticloud.viewer`, `roles/iam.supportUser` |
| `gkemulticloud.attachedClusters.import` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkemulticloud.admin`, `roles/gkemulticloud.editor` |
| `gkemulticloud.attachedClusters.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkemulticloud.admin`, `roles/gkemulticloud.editor`, `roles/gkemulticloud.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `gkemulticloud.attachedClusters.listEffectiveTags` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkemulticloud.admin`, `roles/gkemulticloud.editor`, `roles/gkemulticloud.viewer`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `gkemulticloud.attachedClusters.listTagBindings` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkemulticloud.admin`, `roles/gkemulticloud.editor`, `roles/gkemulticloud.viewer`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `gkemulticloud.attachedClusters.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkemulticloud.admin`, `roles/gkemulticloud.editor` |
| `gkemulticloud.attachedServerConfigs.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkemulticloud.admin`, `roles/gkemulticloud.editor`, `roles/gkemulticloud.viewer`, `roles/iam.supportUser` |
| `gkemulticloud.awsClusters.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkemulticloud.admin`, `roles/gkemulticloud.editor` |
| `gkemulticloud.awsClusters.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkemulticloud.admin`, `roles/gkemulticloud.editor` (+1 service agent role) |
| `gkemulticloud.awsClusters.generateAccessToken` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkemulticloud.admin`, `roles/gkemulticloud.editor`, `roles/gkemulticloud.viewer`, `roles/iam.supportUser` |
| `gkemulticloud.awsClusters.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkemulticloud.admin`, `roles/gkemulticloud.editor`, `roles/gkemulticloud.viewer`, `roles/iam.supportUser` (+1 service agent role) |
| `gkemulticloud.awsClusters.getAdminKubeconfig` | `roles/admin`, `roles/owner`, `roles/gkemulticloud.admin` |
| `gkemulticloud.awsClusters.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkemulticloud.admin`, `roles/gkemulticloud.editor`, `roles/gkemulticloud.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `gkemulticloud.awsClusters.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkemulticloud.admin`, `roles/gkemulticloud.editor` |
| `gkemulticloud.awsNodePools.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkemulticloud.admin`, `roles/gkemulticloud.editor` |
| `gkemulticloud.awsNodePools.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkemulticloud.admin`, `roles/gkemulticloud.editor` (+1 service agent role) |
| `gkemulticloud.awsNodePools.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkemulticloud.admin`, `roles/gkemulticloud.editor`, `roles/gkemulticloud.viewer`, `roles/iam.supportUser` |
| `gkemulticloud.awsNodePools.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkemulticloud.admin`, `roles/gkemulticloud.editor`, `roles/gkemulticloud.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `gkemulticloud.awsNodePools.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkemulticloud.admin`, `roles/gkemulticloud.editor` |
| `gkemulticloud.awsServerConfigs.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkemulticloud.admin`, `roles/gkemulticloud.editor`, `roles/gkemulticloud.viewer`, `roles/iam.supportUser` |
| `gkemulticloud.azureClients.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkemulticloud.admin`, `roles/gkemulticloud.editor` |
| `gkemulticloud.azureClients.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkemulticloud.admin`, `roles/gkemulticloud.editor` (+1 service agent role) |
| `gkemulticloud.azureClients.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkemulticloud.admin`, `roles/gkemulticloud.editor`, `roles/gkemulticloud.viewer`, `roles/iam.supportUser` |
| `gkemulticloud.azureClients.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkemulticloud.admin`, `roles/gkemulticloud.editor`, `roles/gkemulticloud.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `gkemulticloud.azureClusters.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkemulticloud.admin`, `roles/gkemulticloud.editor` |
| `gkemulticloud.azureClusters.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkemulticloud.admin`, `roles/gkemulticloud.editor` (+1 service agent role) |
| `gkemulticloud.azureClusters.generateAccessToken` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkemulticloud.admin`, `roles/gkemulticloud.editor`, `roles/gkemulticloud.viewer`, `roles/iam.supportUser` |
| `gkemulticloud.azureClusters.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkemulticloud.admin`, `roles/gkemulticloud.editor`, `roles/gkemulticloud.viewer`, `roles/iam.supportUser` (+1 service agent role) |
| `gkemulticloud.azureClusters.getAdminKubeconfig` | `roles/admin`, `roles/owner`, `roles/gkemulticloud.admin` |
| `gkemulticloud.azureClusters.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkemulticloud.admin`, `roles/gkemulticloud.editor`, `roles/gkemulticloud.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `gkemulticloud.azureClusters.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkemulticloud.admin`, `roles/gkemulticloud.editor` |
| `gkemulticloud.azureNodePools.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkemulticloud.admin`, `roles/gkemulticloud.editor` |
| `gkemulticloud.azureNodePools.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkemulticloud.admin`, `roles/gkemulticloud.editor` (+1 service agent role) |
| `gkemulticloud.azureNodePools.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkemulticloud.admin`, `roles/gkemulticloud.editor`, `roles/gkemulticloud.viewer`, `roles/iam.supportUser` |
| `gkemulticloud.azureNodePools.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkemulticloud.admin`, `roles/gkemulticloud.editor`, `roles/gkemulticloud.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `gkemulticloud.azureNodePools.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkemulticloud.admin`, `roles/gkemulticloud.editor` |
| `gkemulticloud.azureServerConfigs.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkemulticloud.admin`, `roles/gkemulticloud.editor`, `roles/gkemulticloud.viewer`, `roles/iam.supportUser` |
| `gkemulticloud.operations.cancel` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkemulticloud.admin`, `roles/gkemulticloud.editor` |
| `gkemulticloud.operations.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkemulticloud.admin`, `roles/gkemulticloud.editor` |
| `gkemulticloud.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkemulticloud.admin`, `roles/gkemulticloud.editor`, `roles/gkemulticloud.viewer`, `roles/iam.supportUser` |
| `gkemulticloud.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkemulticloud.admin`, `roles/gkemulticloud.editor`, `roles/gkemulticloud.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `gkemulticloud.operations.wait` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkemulticloud.admin`, `roles/gkemulticloud.editor`, `roles/gkemulticloud.viewer`, `roles/iam.supportUser` |

## Notes

- Roles and permissions of the `gkemulticloud` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/gkemulticloud (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
