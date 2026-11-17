---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/gkehub
---

# GKE Hub IAM roles and permissions

## Signature / Usage

Predefined roles of `gkehub` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Fleet Admin (formerly GKE Hub Admin) (`roles/gkehub.admin`)

- Full access to Fleet resources.
- Permissions (59): `gkehub.endpoints.connect`, `gkehub.features.create`, `gkehub.features.delete`, `gkehub.features.get`, `gkehub.features.getIamPolicy`, `gkehub.features.list`, `gkehub.features.setIamPolicy`, `gkehub.features.update`, `gkehub.fleet.create`, `gkehub.fleet.createFreeTrial`, `gkehub.fleet.delete`, `gkehub.fleet.get`, `gkehub.fleet.getFreeTrial`, `gkehub.fleet.update`, `gkehub.fleet.updateFreeTrial`, `gkehub.locations.get`, `gkehub.locations.list`, `gkehub.membershipbindings.create`, `gkehub.membershipbindings.delete`, `gkehub.membershipbindings.get`, `gkehub.membershipbindings.list`, `gkehub.membershipbindings.update`, `gkehub.membershipfeatures.create`, `gkehub.membershipfeatures.delete`, `gkehub.membershipfeatures.get`, `gkehub.membershipfeatures.list`, `gkehub.membershipfeatures.update`, `gkehub.memberships.create`, `gkehub.memberships.delete`, `gkehub.memberships.generateConnectManifest`, `gkehub.memberships.get`, `gkehub.memberships.getIamPolicy`, `gkehub.memberships.list`, `gkehub.memberships.setIamPolicy`, `gkehub.memberships.update`, `gkehub.namespaces.create`, `gkehub.namespaces.delete`, `gkehub.namespaces.get`, `gkehub.namespaces.list`, `gkehub.namespaces.update`, `gkehub.operations.cancel`, `gkehub.operations.delete`, `gkehub.operations.get`, `gkehub.operations.list`, `gkehub.rbacrolebindings.create`, `gkehub.rbacrolebindings.delete`, `gkehub.rbacrolebindings.get`, `gkehub.rbacrolebindings.list`, `gkehub.rbacrolebindings.update`, `gkehub.scopes.create`, `gkehub.scopes.delete`, `gkehub.scopes.get`, `gkehub.scopes.getIamPolicy`, `gkehub.scopes.list`, `gkehub.scopes.listBoundMemberships`, `gkehub.scopes.setIamPolicy`, `gkehub.scopes.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Fleet Editor (formerly GKE Hub Editor) (`roles/gkehub.editor`)

- Edit access to Fleet resources.
- Permissions (55): `gkehub.features.create`, `gkehub.features.delete`, `gkehub.features.get`, `gkehub.features.getIamPolicy`, `gkehub.features.list`, `gkehub.features.update`, `gkehub.fleet.create`, `gkehub.fleet.createFreeTrial`, `gkehub.fleet.delete`, `gkehub.fleet.get`, `gkehub.fleet.getFreeTrial`, `gkehub.fleet.update`, `gkehub.fleet.updateFreeTrial`, `gkehub.locations.get`, `gkehub.locations.list`, `gkehub.membershipbindings.create`, `gkehub.membershipbindings.delete`, `gkehub.membershipbindings.get`, `gkehub.membershipbindings.list`, `gkehub.membershipbindings.update`, `gkehub.membershipfeatures.create`, `gkehub.membershipfeatures.delete`, `gkehub.membershipfeatures.get`, `gkehub.membershipfeatures.list`, `gkehub.membershipfeatures.update`, `gkehub.memberships.create`, `gkehub.memberships.delete`, `gkehub.memberships.generateConnectManifest`, `gkehub.memberships.get`, `gkehub.memberships.getIamPolicy`, `gkehub.memberships.list`, `gkehub.memberships.update`, `gkehub.namespaces.create`, `gkehub.namespaces.delete`, `gkehub.namespaces.get`, `gkehub.namespaces.list`, `gkehub.namespaces.update`, `gkehub.operations.cancel`, `gkehub.operations.delete`, `gkehub.operations.get`, `gkehub.operations.list`, `gkehub.rbacrolebindings.create`, `gkehub.rbacrolebindings.delete`, `gkehub.rbacrolebindings.get`, `gkehub.rbacrolebindings.list`, `gkehub.rbacrolebindings.update`, `gkehub.scopes.create`, `gkehub.scopes.delete`, `gkehub.scopes.get`, `gkehub.scopes.getIamPolicy`, `gkehub.scopes.list`, `gkehub.scopes.listBoundMemberships`, `gkehub.scopes.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Fleet Viewer (formerly GKE Hub Viewer) (`roles/gkehub.viewer`)

- Read-only access to Fleets and related resources.
- Permissions (27): `gkehub.features.get`, `gkehub.features.getIamPolicy`, `gkehub.features.list`, `gkehub.fleet.get`, `gkehub.fleet.getFreeTrial`, `gkehub.locations.get`, `gkehub.locations.list`, `gkehub.membershipbindings.get`, `gkehub.membershipbindings.list`, `gkehub.membershipfeatures.get`, `gkehub.membershipfeatures.list`, `gkehub.memberships.generateConnectManifest`, `gkehub.memberships.get`, `gkehub.memberships.getIamPolicy`, `gkehub.memberships.list`, `gkehub.namespaces.get`, `gkehub.namespaces.list`, `gkehub.operations.get`, `gkehub.operations.list`, `gkehub.rbacrolebindings.get`, `gkehub.rbacrolebindings.list`, `gkehub.scopes.get`, `gkehub.scopes.getIamPolicy`, `gkehub.scopes.list`, `gkehub.scopes.listBoundMemberships`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### GKE Connect Agent (`roles/gkehub.connect`)

- Ability to set up GKE Connect between external clusters and Google.
- Permissions (1): `gkehub.endpoints.connect`

#### Connect Gateway Admin (`roles/gkehub.gatewayAdmin`)

- Full access to Connect Gateway.
- Permissions (19): `gkehub.gateway.delete`, `gkehub.gateway.generateCredentials`, `gkehub.gateway.get`, `gkehub.gateway.patch`, `gkehub.gateway.post`, `gkehub.gateway.put`, `gkehub.gateway.stream`, `gkehub.memberships.get`, `serviceusage.catalogs.listMembers`, `serviceusage.consumerpolicy.analyze`, `serviceusage.consumerpolicy.get`, `serviceusage.effectivepolicy.get`, `serviceusage.groups.list`, `serviceusage.groups.listExpandedMembers`, `serviceusage.groups.listMembers`, `serviceusage.services.get`, `serviceusage.services.listApis`, `serviceusage.services.listDependentServices`, `serviceusage.values.test`

#### Connect Gateway Editor (`roles/gkehub.gatewayEditor`)

- Edit access to Connect Gateway.
- Permissions (18): `gkehub.gateway.delete`, `gkehub.gateway.generateCredentials`, `gkehub.gateway.get`, `gkehub.gateway.patch`, `gkehub.gateway.post`, `gkehub.gateway.put`, `gkehub.memberships.get`, `serviceusage.catalogs.listMembers`, `serviceusage.consumerpolicy.analyze`, `serviceusage.consumerpolicy.get`, `serviceusage.effectivepolicy.get`, `serviceusage.groups.list`, `serviceusage.groups.listExpandedMembers`, `serviceusage.groups.listMembers`, `serviceusage.services.get`, `serviceusage.services.listApis`, `serviceusage.services.listDependentServices`, `serviceusage.values.test`

#### Connect Gateway Reader (`roles/gkehub.gatewayReader`)

- Read-only access to Connect Gateway.
- Permissions (14): `gkehub.gateway.generateCredentials`, `gkehub.gateway.get`, `gkehub.memberships.get`, `serviceusage.catalogs.listMembers`, `serviceusage.consumerpolicy.analyze`, `serviceusage.consumerpolicy.get`, `serviceusage.effectivepolicy.get`, `serviceusage.groups.list`, `serviceusage.groups.listExpandedMembers`, `serviceusage.groups.listMembers`, `serviceusage.services.get`, `serviceusage.services.listApis`, `serviceusage.services.listDependentServices`, `serviceusage.values.test`

#### Fleet Scope Admin (`roles/gkehub.scopeAdmin`)

- Admin access to Fleet Scopes to set IAM Bindings and RBACRoleBindings.
- Permissions (13): `gkehub.namespaces.create`, `gkehub.namespaces.delete`, `gkehub.namespaces.get`, `gkehub.namespaces.list`, `gkehub.rbacrolebindings.create`, `gkehub.rbacrolebindings.delete`, `gkehub.rbacrolebindings.get`, `gkehub.rbacrolebindings.list`, `gkehub.rbacrolebindings.update`, `gkehub.scopes.get`, `gkehub.scopes.getIamPolicy`, `gkehub.scopes.listBoundMemberships`, `gkehub.scopes.setIamPolicy`

#### Fleet Scope Editor (`roles/gkehub.scopeEditor`)

- Edit access to Namespaces under Fleet Scopes.
- Permissions (9): `gkehub.namespaces.create`, `gkehub.namespaces.delete`, `gkehub.namespaces.get`, `gkehub.namespaces.list`, `gkehub.rbacrolebindings.get`, `gkehub.rbacrolebindings.list`, `gkehub.scopes.get`, `gkehub.scopes.getIamPolicy`, `gkehub.scopes.listBoundMemberships`

#### Fleet Project-level Scope Editor (`roles/gkehub.scopeEditorProjectLevel`)

- Role for project-level permissions for editor of Fleet Scopes.
- Permissions (22): `gkehub.gateway.delete`, `gkehub.gateway.generateCredentials`, `gkehub.gateway.get`, `gkehub.gateway.patch`, `gkehub.gateway.post`, `gkehub.gateway.put`, `gkehub.memberships.get`, `gkehub.operations.get`, `monitoring.timeSeries.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `serviceusage.catalogs.listMembers`, `serviceusage.consumerpolicy.analyze`, `serviceusage.consumerpolicy.get`, `serviceusage.effectivepolicy.get`, `serviceusage.groups.list`, `serviceusage.groups.listExpandedMembers`, `serviceusage.groups.listMembers`, `serviceusage.services.get`, `serviceusage.services.listApis`, `serviceusage.services.listDependentServices`, `serviceusage.values.test`

#### Fleet Scope Viewer (`roles/gkehub.scopeViewer`)

- Viewer of Fleet Scopes and associated resources.
- Permissions (7): `gkehub.namespaces.get`, `gkehub.namespaces.list`, `gkehub.rbacrolebindings.get`, `gkehub.rbacrolebindings.list`, `gkehub.scopes.get`, `gkehub.scopes.getIamPolicy`, `gkehub.scopes.listBoundMemberships`

#### Fleet Project-level Scope Viewer (`roles/gkehub.scopeViewerProjectLevel`)

- Role for project-level permissions for viewer of Fleet Scopes.
- Permissions (17): `gkehub.gateway.generateCredentials`, `gkehub.gateway.get`, `gkehub.memberships.get`, `monitoring.timeSeries.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `serviceusage.catalogs.listMembers`, `serviceusage.consumerpolicy.analyze`, `serviceusage.consumerpolicy.get`, `serviceusage.effectivepolicy.get`, `serviceusage.groups.list`, `serviceusage.groups.listExpandedMembers`, `serviceusage.groups.listMembers`, `serviceusage.services.get`, `serviceusage.services.listApis`, `serviceusage.services.listDependentServices`, `serviceusage.values.test`

#### GKE Hub Cross Project Service Agent (`roles/gkehub.crossProjectServiceAgent`)

- Gives the GKE Hub service agent permission to manage the project for cross-project fleet registration. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (2): `resourcemanager.projects.getIamPolicy`, `resourcemanager.projects.setIamPolicy`

#### GKE Hub Service Agent (`roles/gkehub.serviceAgent`)

- Gives the GKE Hub service agent access to Cloud Platform resources. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (83): `container.clusterRoleBindings.create`, `container.clusterRoleBindings.delete`, `container.clusterRoleBindings.get`, `container.clusterRoleBindings.list`, `container.clusterRoleBindings.update`, `container.clusterRoles.bind`, `container.clusterRoles.create`, `container.clusterRoles.delete`, `container.clusterRoles.escalate`, `container.clusterRoles.get`, `container.clusterRoles.list`, `container.clusterRoles.update`, `container.clusters.connect`, `container.clusters.get`, `container.clusters.list`, `container.clusters.update`, `container.customResourceDefinitions.create`, `container.customResourceDefinitions.delete`, `container.customResourceDefinitions.get`, `container.customResourceDefinitions.list`, `container.customResourceDefinitions.update`, `container.namespaces.get`, `container.operations.get`, `container.thirdPartyObjects.create`, `container.thirdPartyObjects.delete`, `container.thirdPartyObjects.get`, `container.thirdPartyObjects.list`, `container.thirdPartyObjects.update`, `gkehub.features.create`, `gkehub.features.get`, `gkehub.features.list`, `gkehub.fleet.create`, `gkehub.fleet.get`, `gkehub.gateway.delete`, `gkehub.gateway.generateCredentials`, `gkehub.gateway.get`, `gkehub.gateway.patch`, `gkehub.gateway.post`, `gkehub.gateway.put`, `gkehub.locations.get`, `gkehub.locations.list`, `gkehub.memberships.create`, `gkehub.memberships.generateConnectManifest`, `gkehub.memberships.get`, `gkehub.memberships.list`, `gkehub.operations.get`, `gkemulticloud.awsClusters.get`, `gkemulticloud.azureClusters.get`, `gkeonprem.bareMetalClusters.get`, `gkeonprem.vmwareClusters.get`, `logging.buckets.create`, `logging.buckets.get`, `logging.buckets.list`, `logging.buckets.update`, `logging.exclusions.create`, `logging.exclusions.delete`, `logging.exclusions.get`, `logging.exclusions.list`, `logging.exclusions.update`, `logging.sinks.create`, `logging.sinks.delete`, `logging.sinks.get`, `logging.sinks.list`, `logging.sinks.update`, `logging.views.create`, `logging.views.get`, `logging.views.list`, `logging.views.update`, `monitoring.metricsScopes.link`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `serviceusage.catalogs.listMembers`, `serviceusage.consumerpolicy.analyze`, `serviceusage.consumerpolicy.get`, `serviceusage.effectivepolicy.get`, `serviceusage.groups.list`, `serviceusage.groups.listExpandedMembers`, `serviceusage.groups.listMembers`, `serviceusage.services.get`, `serviceusage.services.list`, `serviceusage.services.listApis`, `serviceusage.services.listDependentServices`, `serviceusage.values.test`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/gkehub.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `gkehub.endpoints.connect` | `roles/admin`, `roles/owner`, `roles/gkehub.admin`, `roles/cloudmigration.inframanager`, `roles/cloudmigration.velostrataconnect`, `roles/gkehub.connect` (+4 service agent roles) |
| `gkehub.features.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkehub.admin`, `roles/gkehub.editor` (+5 service agent roles) |
| `gkehub.features.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkehub.admin`, `roles/gkehub.editor` (+2 service agent roles) |
| `gkehub.features.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkehub.admin`, `roles/gkehub.editor`, `roles/gkehub.viewer`, `roles/iam.supportUser` (+21 service agent roles) |
| `gkehub.features.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkehub.admin`, `roles/gkehub.editor`, `roles/gkehub.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+6 service agent roles) |
| `gkehub.features.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkehub.admin`, `roles/gkehub.editor`, `roles/gkehub.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+9 service agent roles) |
| `gkehub.features.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/gkehub.admin`, `roles/iam.securityAdmin` (+2 service agent roles) |
| `gkehub.features.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkehub.admin`, `roles/gkehub.editor` (+4 service agent roles) |
| `gkehub.fleet.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkehub.admin`, `roles/gkehub.editor` (+6 service agent roles) |
| `gkehub.fleet.createFreeTrial` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkehub.admin`, `roles/gkehub.editor` (+2 service agent roles) |
| `gkehub.fleet.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkehub.admin`, `roles/gkehub.editor` (+4 service agent roles) |
| `gkehub.fleet.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkehub.admin`, `roles/gkehub.editor`, `roles/gkehub.viewer`, `roles/iam.supportUser` (+10 service agent roles) |
| `gkehub.fleet.getFreeTrial` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkehub.admin`, `roles/gkehub.editor`, `roles/gkehub.viewer`, `roles/iam.supportUser` (+5 service agent roles) |
| `gkehub.fleet.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkehub.admin`, `roles/gkehub.editor` (+2 service agent roles) |
| `gkehub.fleet.updateFreeTrial` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkehub.admin`, `roles/gkehub.editor` (+2 service agent roles) |
| `gkehub.gateway.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkehub.gatewayAdmin`, `roles/gkehub.gatewayEditor`, `roles/gkehub.scopeEditorProjectLevel` (+14 service agent roles) |
| `gkehub.gateway.generateCredentials` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkehub.gatewayAdmin`, `roles/gkehub.gatewayEditor`, `roles/gkehub.gatewayReader`, `roles/gkehub.scopeEditorProjectLevel`, `roles/gkehub.scopeViewerProjectLevel`, `roles/iam.supportUser` (+15 service agent roles) |
| `gkehub.gateway.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkehub.gatewayAdmin`, `roles/gkehub.gatewayEditor`, `roles/gkehub.gatewayReader`, `roles/gkehub.scopeEditorProjectLevel`, `roles/gkehub.scopeViewerProjectLevel`, `roles/iam.supportUser` (+15 service agent roles) |
| `gkehub.gateway.patch` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkehub.gatewayAdmin`, `roles/gkehub.gatewayEditor`, `roles/gkehub.scopeEditorProjectLevel` (+14 service agent roles) |
| `gkehub.gateway.post` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkehub.gatewayAdmin`, `roles/gkehub.gatewayEditor`, `roles/gkehub.scopeEditorProjectLevel` (+14 service agent roles) |
| `gkehub.gateway.put` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkehub.gatewayAdmin`, `roles/gkehub.gatewayEditor`, `roles/gkehub.scopeEditorProjectLevel` (+14 service agent roles) |
| `gkehub.gateway.stream` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkehub.gatewayAdmin` (+2 service agent roles) |
| `gkehub.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkehub.admin`, `roles/gkehub.editor`, `roles/gkehub.viewer`, `roles/iam.supportUser` (+21 service agent roles) |
| `gkehub.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkehub.admin`, `roles/gkehub.editor`, `roles/gkehub.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+21 service agent roles) |
| `gkehub.membershipbindings.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkehub.admin`, `roles/gkehub.editor` (+2 service agent roles) |
| `gkehub.membershipbindings.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkehub.admin`, `roles/gkehub.editor` (+2 service agent roles) |
| `gkehub.membershipbindings.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkehub.admin`, `roles/gkehub.editor`, `roles/gkehub.viewer`, `roles/iam.supportUser` (+5 service agent roles) |
| `gkehub.membershipbindings.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkehub.admin`, `roles/gkehub.editor`, `roles/gkehub.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+5 service agent roles) |
| `gkehub.membershipbindings.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkehub.admin`, `roles/gkehub.editor` (+2 service agent roles) |
| `gkehub.membershipfeatures.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkehub.admin`, `roles/gkehub.editor` (+2 service agent roles) |
| `gkehub.membershipfeatures.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkehub.admin`, `roles/gkehub.editor` (+2 service agent roles) |
| `gkehub.membershipfeatures.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkehub.admin`, `roles/gkehub.editor`, `roles/gkehub.viewer`, `roles/iam.supportUser` (+5 service agent roles) |
| `gkehub.membershipfeatures.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkehub.admin`, `roles/gkehub.editor`, `roles/gkehub.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+5 service agent roles) |
| `gkehub.membershipfeatures.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkehub.admin`, `roles/gkehub.editor` (+2 service agent roles) |
| `gkehub.memberships.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkehub.admin`, `roles/gkehub.editor` (+5 service agent roles) |
| `gkehub.memberships.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkehub.admin`, `roles/gkehub.editor` (+5 service agent roles) |
| `gkehub.memberships.generateConnectManifest` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkehub.admin`, `roles/gkehub.editor`, `roles/gkehub.viewer`, `roles/iam.supportUser` (+8 service agent roles) |
| `gkehub.memberships.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkehub.admin`, `roles/gkehub.editor`, `roles/gkehub.viewer`, `roles/gkehub.gatewayAdmin`, `roles/gkehub.gatewayEditor`, `roles/gkehub.gatewayReader`, `roles/gkehub.scopeEditorProjectLevel`, `roles/gkehub.scopeViewerProjectLevel`, `roles/iam.supportUser` (+23 service agent roles) |
| `gkehub.memberships.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkehub.admin`, `roles/gkehub.editor`, `roles/gkehub.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+6 service agent roles) |
| `gkehub.memberships.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkehub.admin`, `roles/gkehub.editor`, `roles/gkehub.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+21 service agent roles) |
| `gkehub.memberships.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/gkehub.admin`, `roles/iam.securityAdmin` (+2 service agent roles) |
| `gkehub.memberships.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkehub.admin`, `roles/gkehub.editor` (+6 service agent roles) |
| `gkehub.namespaces.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkehub.admin`, `roles/gkehub.editor`, `roles/gkehub.scopeAdmin`, `roles/gkehub.scopeEditor` (+2 service agent roles) |
| `gkehub.namespaces.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkehub.admin`, `roles/gkehub.editor`, `roles/gkehub.scopeAdmin`, `roles/gkehub.scopeEditor` (+2 service agent roles) |
| `gkehub.namespaces.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkehub.admin`, `roles/gkehub.editor`, `roles/gkehub.viewer`, `roles/gkehub.scopeAdmin`, `roles/gkehub.scopeEditor`, `roles/gkehub.scopeViewer`, `roles/iam.supportUser` (+5 service agent roles) |
| `gkehub.namespaces.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkehub.admin`, `roles/gkehub.editor`, `roles/gkehub.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/gkehub.scopeAdmin`, `roles/gkehub.scopeEditor`, `roles/gkehub.scopeViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+5 service agent roles) |
| `gkehub.namespaces.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkehub.admin`, `roles/gkehub.editor` (+2 service agent roles) |
| `gkehub.operations.cancel` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkehub.admin`, `roles/gkehub.editor` (+4 service agent roles) |
| `gkehub.operations.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkehub.admin`, `roles/gkehub.editor` (+4 service agent roles) |
| `gkehub.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkehub.admin`, `roles/gkehub.editor`, `roles/gkehub.viewer`, `roles/gkehub.scopeEditorProjectLevel`, `roles/iam.supportUser` (+9 service agent roles) |
| `gkehub.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkehub.admin`, `roles/gkehub.editor`, `roles/gkehub.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+7 service agent roles) |
| `gkehub.rbacrolebindings.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkehub.admin`, `roles/gkehub.editor`, `roles/gkehub.scopeAdmin` (+2 service agent roles) |
| `gkehub.rbacrolebindings.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkehub.admin`, `roles/gkehub.editor`, `roles/gkehub.scopeAdmin` (+2 service agent roles) |
| `gkehub.rbacrolebindings.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkehub.admin`, `roles/gkehub.editor`, `roles/gkehub.viewer`, `roles/gkehub.scopeAdmin`, `roles/gkehub.scopeEditor`, `roles/gkehub.scopeViewer`, `roles/iam.supportUser` (+5 service agent roles) |
| `gkehub.rbacrolebindings.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkehub.admin`, `roles/gkehub.editor`, `roles/gkehub.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/gkehub.scopeAdmin`, `roles/gkehub.scopeEditor`, `roles/gkehub.scopeViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+5 service agent roles) |
| `gkehub.rbacrolebindings.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkehub.admin`, `roles/gkehub.editor`, `roles/gkehub.scopeAdmin` (+2 service agent roles) |
| `gkehub.scopes.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkehub.admin`, `roles/gkehub.editor` (+2 service agent roles) |
| `gkehub.scopes.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkehub.admin`, `roles/gkehub.editor` (+2 service agent roles) |
| `gkehub.scopes.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkehub.admin`, `roles/gkehub.editor`, `roles/gkehub.viewer`, `roles/gkehub.scopeAdmin`, `roles/gkehub.scopeEditor`, `roles/gkehub.scopeViewer`, `roles/iam.supportUser` (+5 service agent roles) |
| `gkehub.scopes.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkehub.admin`, `roles/gkehub.editor`, `roles/gkehub.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/gkehub.scopeAdmin`, `roles/gkehub.scopeEditor`, `roles/gkehub.scopeViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+5 service agent roles) |
| `gkehub.scopes.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkehub.admin`, `roles/gkehub.editor`, `roles/gkehub.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+5 service agent roles) |
| `gkehub.scopes.listBoundMemberships` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/gkehub.admin`, `roles/gkehub.editor`, `roles/gkehub.viewer`, `roles/gkehub.scopeAdmin`, `roles/gkehub.scopeEditor`, `roles/gkehub.scopeViewer`, `roles/iam.supportUser` (+5 service agent roles) |
| `gkehub.scopes.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/gkehub.admin`, `roles/iam.securityAdmin`, `roles/gkehub.scopeAdmin` |
| `gkehub.scopes.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/gkehub.admin`, `roles/gkehub.editor` (+2 service agent roles) |

## Notes

- Roles and permissions of the `gkehub` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/gkehub (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
