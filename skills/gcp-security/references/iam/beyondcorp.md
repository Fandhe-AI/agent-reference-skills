---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/beyondcorp
---

# Chrome Enterprise Premium IAM roles and permissions

## Signature / Usage

Predefined roles of `beyondcorp` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Cloud BeyondCorp Admin (`roles/beyondcorp.admin`)

- Launch stage: Beta
- Full access to all Cloud BeyondCorp resources.
- Permissions (61): `beyondcorp.appConnections.create`, `beyondcorp.appConnections.createTagBinding`, `beyondcorp.appConnections.delete`, `beyondcorp.appConnections.deleteTagBinding`, `beyondcorp.appConnections.get`, `beyondcorp.appConnections.getIamPolicy`, `beyondcorp.appConnections.list`, `beyondcorp.appConnections.listEffectiveTags`, `beyondcorp.appConnections.listTagBindings`, `beyondcorp.appConnections.setIamPolicy`, `beyondcorp.appConnections.update`, `beyondcorp.appConnectors.create`, `beyondcorp.appConnectors.createTagBinding`, `beyondcorp.appConnectors.delete`, `beyondcorp.appConnectors.deleteTagBinding`, `beyondcorp.appConnectors.get`, `beyondcorp.appConnectors.getIamPolicy`, `beyondcorp.appConnectors.list`, `beyondcorp.appConnectors.listEffectiveTags`, `beyondcorp.appConnectors.listTagBindings`, `beyondcorp.appConnectors.reportStatus`, `beyondcorp.appConnectors.setIamPolicy`, `beyondcorp.appConnectors.update`, `beyondcorp.appGateways.create`, `beyondcorp.appGateways.createTagBinding`, `beyondcorp.appGateways.delete`, `beyondcorp.appGateways.deleteTagBinding`, `beyondcorp.appGateways.get`, `beyondcorp.appGateways.getIamPolicy`, `beyondcorp.appGateways.list`, `beyondcorp.appGateways.listEffectiveTags`, `beyondcorp.appGateways.listTagBindings`, `beyondcorp.appGateways.setIamPolicy`, `beyondcorp.appGateways.update`, `beyondcorp.locations.get`, `beyondcorp.locations.list`, `beyondcorp.operations.cancel`, `beyondcorp.operations.delete`, `beyondcorp.operations.get`, `beyondcorp.operations.list`, `beyondcorp.securityGateways.create`, `beyondcorp.securityGateways.delete`, `beyondcorp.securityGateways.get`, `beyondcorp.securityGateways.getIamPolicy`, `beyondcorp.securityGateways.list`, `beyondcorp.securityGateways.setIamPolicy`, `beyondcorp.securityGateways.update`, `beyondcorp.sgApplications.create`, `beyondcorp.sgApplications.delete`, `beyondcorp.sgApplications.get`, `beyondcorp.sgApplications.getIamPolicy`, `beyondcorp.sgApplications.list`, `beyondcorp.sgApplications.setIamPolicy`, `beyondcorp.sgApplications.update`, `beyondcorp.subscriptions.create`, `beyondcorp.subscriptions.get`, `beyondcorp.subscriptions.list`, `beyondcorp.subscriptions.terminate`, `beyondcorp.subscriptions.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud BeyondCorp Editor (`roles/beyondcorp.editor`)

- Launch stage: Beta
- Editor role for Cloud BeyondCorp
- Permissions (51): `beyondcorp.appConnections.create`, `beyondcorp.appConnections.delete`, `beyondcorp.appConnections.get`, `beyondcorp.appConnections.getIamPolicy`, `beyondcorp.appConnections.list`, `beyondcorp.appConnections.listEffectiveTags`, `beyondcorp.appConnections.listTagBindings`, `beyondcorp.appConnections.update`, `beyondcorp.appConnectors.create`, `beyondcorp.appConnectors.delete`, `beyondcorp.appConnectors.get`, `beyondcorp.appConnectors.getIamPolicy`, `beyondcorp.appConnectors.list`, `beyondcorp.appConnectors.listEffectiveTags`, `beyondcorp.appConnectors.listTagBindings`, `beyondcorp.appConnectors.reportStatus`, `beyondcorp.appConnectors.update`, `beyondcorp.appGateways.create`, `beyondcorp.appGateways.delete`, `beyondcorp.appGateways.get`, `beyondcorp.appGateways.getIamPolicy`, `beyondcorp.appGateways.list`, `beyondcorp.appGateways.listEffectiveTags`, `beyondcorp.appGateways.listTagBindings`, `beyondcorp.appGateways.update`, `beyondcorp.locations.get`, `beyondcorp.locations.list`, `beyondcorp.operations.cancel`, `beyondcorp.operations.delete`, `beyondcorp.operations.get`, `beyondcorp.operations.list`, `beyondcorp.securityGateways.create`, `beyondcorp.securityGateways.delete`, `beyondcorp.securityGateways.get`, `beyondcorp.securityGateways.getIamPolicy`, `beyondcorp.securityGateways.list`, `beyondcorp.securityGateways.update`, `beyondcorp.sgApplications.create`, `beyondcorp.sgApplications.delete`, `beyondcorp.sgApplications.get`, `beyondcorp.sgApplications.getIamPolicy`, `beyondcorp.sgApplications.list`, `beyondcorp.sgApplications.update`, `beyondcorp.subscriptions.create`, `beyondcorp.subscriptions.get`, `beyondcorp.subscriptions.list`, `beyondcorp.subscriptions.terminate`, `beyondcorp.subscriptions.update`, `resourcemanager.organizations.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud BeyondCorp Viewer (`roles/beyondcorp.viewer`)

- Launch stage: Beta
- Read-only access to all Cloud BeyondCorp resources.
- Permissions (30): `beyondcorp.appConnections.get`, `beyondcorp.appConnections.getIamPolicy`, `beyondcorp.appConnections.list`, `beyondcorp.appConnections.listEffectiveTags`, `beyondcorp.appConnections.listTagBindings`, `beyondcorp.appConnectors.get`, `beyondcorp.appConnectors.getIamPolicy`, `beyondcorp.appConnectors.list`, `beyondcorp.appConnectors.listEffectiveTags`, `beyondcorp.appConnectors.listTagBindings`, `beyondcorp.appGateways.get`, `beyondcorp.appGateways.getIamPolicy`, `beyondcorp.appGateways.list`, `beyondcorp.appGateways.listEffectiveTags`, `beyondcorp.appGateways.listTagBindings`, `beyondcorp.locations.get`, `beyondcorp.locations.list`, `beyondcorp.operations.get`, `beyondcorp.operations.list`, `beyondcorp.securityGateways.get`, `beyondcorp.securityGateways.getIamPolicy`, `beyondcorp.securityGateways.list`, `beyondcorp.sgApplications.get`, `beyondcorp.sgApplications.getIamPolicy`, `beyondcorp.sgApplications.list`, `beyondcorp.subscriptions.get`, `beyondcorp.subscriptions.list`, `resourcemanager.organizations.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud BeyondCorp SecurityGateway Service Discovery User (`roles/beyondcorp.serviceDiscoveryUser`)

- Launch stage: Beta
- Security Gateway Service Discovery User
- Permissions: none listed on the source page.

#### Cloud BeyondCorp SecurityGateway Application resource User (`roles/beyondcorp.sgApplicationUser`)

- Launch stage: Beta
- Access SecurityGateway Application resource
- Permissions: none listed on the source page.

#### Cloud BeyondCorp Subscription Admin (`roles/beyondcorp.subscriptionAdmin`)

- Launch stage: Beta
- Full access to all BeyondCorp Subscription resources.
- Permissions (6): `beyondcorp.subscriptions.create`, `beyondcorp.subscriptions.get`, `beyondcorp.subscriptions.list`, `beyondcorp.subscriptions.terminate`, `beyondcorp.subscriptions.update`, `resourcemanager.organizations.get`

#### Cloud BeyondCorp Subscription Viewer (`roles/beyondcorp.subscriptionViewer`)

- Launch stage: Beta
- Read-only access to all BeyondCorp Subscription resources.
- Permissions (3): `beyondcorp.subscriptions.get`, `beyondcorp.subscriptions.list`, `resourcemanager.organizations.get`

#### Cloud BeyondCorp SecurityGateway Upstream Access (`roles/beyondcorp.upstreamAccess`)

- Launch stage: Beta
- Access Security Gateway upstreams
- Permissions: none listed on the source page.

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/beyondcorp.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `beyondcorp.appConnections.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/beyondcorp.admin`, `roles/beyondcorp.editor` |
| `beyondcorp.appConnections.createTagBinding` | `roles/admin`, `roles/owner`, `roles/beyondcorp.admin`, `roles/resourcemanager.tagUser`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver` |
| `beyondcorp.appConnections.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/beyondcorp.admin`, `roles/beyondcorp.editor` |
| `beyondcorp.appConnections.deleteTagBinding` | `roles/admin`, `roles/owner`, `roles/beyondcorp.admin`, `roles/resourcemanager.tagUser`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver` |
| `beyondcorp.appConnections.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/beyondcorp.admin`, `roles/beyondcorp.editor`, `roles/beyondcorp.viewer`, `roles/iam.supportUser` |
| `beyondcorp.appConnections.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/beyondcorp.admin`, `roles/beyondcorp.editor`, `roles/beyondcorp.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `beyondcorp.appConnections.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/beyondcorp.admin`, `roles/beyondcorp.editor`, `roles/beyondcorp.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `beyondcorp.appConnections.listEffectiveTags` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/beyondcorp.admin`, `roles/beyondcorp.editor`, `roles/beyondcorp.viewer`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `beyondcorp.appConnections.listTagBindings` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/beyondcorp.admin`, `roles/beyondcorp.editor`, `roles/beyondcorp.viewer`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `beyondcorp.appConnections.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/beyondcorp.admin`, `roles/iam.securityAdmin` |
| `beyondcorp.appConnections.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/beyondcorp.admin`, `roles/beyondcorp.editor` |
| `beyondcorp.appConnectors.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/beyondcorp.admin`, `roles/beyondcorp.editor` |
| `beyondcorp.appConnectors.createTagBinding` | `roles/admin`, `roles/owner`, `roles/beyondcorp.admin`, `roles/resourcemanager.tagUser`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver` |
| `beyondcorp.appConnectors.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/beyondcorp.admin`, `roles/beyondcorp.editor` |
| `beyondcorp.appConnectors.deleteTagBinding` | `roles/admin`, `roles/owner`, `roles/beyondcorp.admin`, `roles/resourcemanager.tagUser`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver` |
| `beyondcorp.appConnectors.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/beyondcorp.admin`, `roles/beyondcorp.editor`, `roles/beyondcorp.viewer`, `roles/iam.supportUser` |
| `beyondcorp.appConnectors.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/beyondcorp.admin`, `roles/beyondcorp.editor`, `roles/beyondcorp.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `beyondcorp.appConnectors.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/beyondcorp.admin`, `roles/beyondcorp.editor`, `roles/beyondcorp.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `beyondcorp.appConnectors.listEffectiveTags` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/beyondcorp.admin`, `roles/beyondcorp.editor`, `roles/beyondcorp.viewer`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `beyondcorp.appConnectors.listTagBindings` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/beyondcorp.admin`, `roles/beyondcorp.editor`, `roles/beyondcorp.viewer`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `beyondcorp.appConnectors.reportStatus` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/beyondcorp.admin`, `roles/beyondcorp.editor` |
| `beyondcorp.appConnectors.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/beyondcorp.admin`, `roles/iam.securityAdmin` |
| `beyondcorp.appConnectors.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/beyondcorp.admin`, `roles/beyondcorp.editor` |
| `beyondcorp.appGateways.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/beyondcorp.admin`, `roles/beyondcorp.editor` |
| `beyondcorp.appGateways.createTagBinding` | `roles/admin`, `roles/owner`, `roles/beyondcorp.admin`, `roles/resourcemanager.tagUser`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver` |
| `beyondcorp.appGateways.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/beyondcorp.admin`, `roles/beyondcorp.editor` |
| `beyondcorp.appGateways.deleteTagBinding` | `roles/admin`, `roles/owner`, `roles/beyondcorp.admin`, `roles/resourcemanager.tagUser`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver` |
| `beyondcorp.appGateways.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/beyondcorp.admin`, `roles/beyondcorp.editor`, `roles/beyondcorp.viewer`, `roles/iam.supportUser` |
| `beyondcorp.appGateways.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/beyondcorp.admin`, `roles/beyondcorp.editor`, `roles/beyondcorp.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `beyondcorp.appGateways.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/beyondcorp.admin`, `roles/beyondcorp.editor`, `roles/beyondcorp.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `beyondcorp.appGateways.listEffectiveTags` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/beyondcorp.admin`, `roles/beyondcorp.editor`, `roles/beyondcorp.viewer`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `beyondcorp.appGateways.listTagBindings` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/beyondcorp.admin`, `roles/beyondcorp.editor`, `roles/beyondcorp.viewer`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `beyondcorp.appGateways.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/beyondcorp.admin`, `roles/iam.securityAdmin` |
| `beyondcorp.appGateways.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/beyondcorp.admin`, `roles/beyondcorp.editor` |
| `beyondcorp.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/beyondcorp.admin`, `roles/beyondcorp.editor`, `roles/beyondcorp.viewer`, `roles/iam.supportUser` |
| `beyondcorp.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/beyondcorp.admin`, `roles/beyondcorp.editor`, `roles/beyondcorp.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `beyondcorp.operations.cancel` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/beyondcorp.admin`, `roles/beyondcorp.editor` |
| `beyondcorp.operations.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/beyondcorp.admin`, `roles/beyondcorp.editor` |
| `beyondcorp.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/beyondcorp.admin`, `roles/beyondcorp.editor`, `roles/beyondcorp.viewer`, `roles/iam.supportUser` |
| `beyondcorp.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/beyondcorp.admin`, `roles/beyondcorp.editor`, `roles/beyondcorp.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `beyondcorp.securityGateways.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/beyondcorp.admin`, `roles/beyondcorp.editor` |
| `beyondcorp.securityGateways.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/beyondcorp.admin`, `roles/beyondcorp.editor` |
| `beyondcorp.securityGateways.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/beyondcorp.admin`, `roles/beyondcorp.editor`, `roles/beyondcorp.viewer`, `roles/iam.supportUser` |
| `beyondcorp.securityGateways.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/beyondcorp.admin`, `roles/beyondcorp.editor`, `roles/beyondcorp.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `beyondcorp.securityGateways.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/beyondcorp.admin`, `roles/beyondcorp.editor`, `roles/beyondcorp.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `beyondcorp.securityGateways.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/beyondcorp.admin`, `roles/iam.securityAdmin` |
| `beyondcorp.securityGateways.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/beyondcorp.admin`, `roles/beyondcorp.editor` |
| `beyondcorp.sgApplications.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/beyondcorp.admin`, `roles/beyondcorp.editor` |
| `beyondcorp.sgApplications.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/beyondcorp.admin`, `roles/beyondcorp.editor` |
| `beyondcorp.sgApplications.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/beyondcorp.admin`, `roles/beyondcorp.editor`, `roles/beyondcorp.viewer`, `roles/iam.supportUser` |
| `beyondcorp.sgApplications.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/beyondcorp.admin`, `roles/beyondcorp.editor`, `roles/beyondcorp.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `beyondcorp.sgApplications.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/beyondcorp.admin`, `roles/beyondcorp.editor`, `roles/beyondcorp.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `beyondcorp.sgApplications.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/beyondcorp.admin`, `roles/iam.securityAdmin` |
| `beyondcorp.sgApplications.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/beyondcorp.admin`, `roles/beyondcorp.editor` |
| `beyondcorp.subscriptions.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/beyondcorp.admin`, `roles/beyondcorp.editor`, `roles/beyondcorp.subscriptionAdmin` |
| `beyondcorp.subscriptions.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/beyondcorp.admin`, `roles/beyondcorp.editor`, `roles/beyondcorp.viewer`, `roles/beyondcorp.subscriptionAdmin`, `roles/beyondcorp.subscriptionViewer`, `roles/iam.supportUser` |
| `beyondcorp.subscriptions.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/beyondcorp.admin`, `roles/beyondcorp.editor`, `roles/beyondcorp.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/beyondcorp.subscriptionAdmin`, `roles/beyondcorp.subscriptionViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `beyondcorp.subscriptions.terminate` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/beyondcorp.admin`, `roles/beyondcorp.editor`, `roles/beyondcorp.subscriptionAdmin` |
| `beyondcorp.subscriptions.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/beyondcorp.admin`, `roles/beyondcorp.editor`, `roles/beyondcorp.subscriptionAdmin` |

## Notes

- Roles and permissions of the `beyondcorp` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/beyondcorp (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
