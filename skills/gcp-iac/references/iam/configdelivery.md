---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/configdelivery
---

# Config Delivery IAM roles and permissions

## Signature / Usage

Predefined roles of `configdelivery` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Configdelivery Admin (`roles/configdelivery.admin`)

- Admin role for configdelivery
- Permissions (33): `configdelivery.fleetPackages.create`, `configdelivery.fleetPackages.delete`, `configdelivery.fleetPackages.get`, `configdelivery.fleetPackages.list`, `configdelivery.fleetPackages.update`, `configdelivery.locations.get`, `configdelivery.locations.list`, `configdelivery.operations.cancel`, `configdelivery.operations.delete`, `configdelivery.operations.get`, `configdelivery.operations.list`, `configdelivery.releases.create`, `configdelivery.releases.delete`, `configdelivery.releases.get`, `configdelivery.releases.list`, `configdelivery.releases.update`, `configdelivery.resourceBundles.create`, `configdelivery.resourceBundles.delete`, `configdelivery.resourceBundles.get`, `configdelivery.resourceBundles.list`, `configdelivery.resourceBundles.update`, `configdelivery.rollouts.abort`, `configdelivery.rollouts.get`, `configdelivery.rollouts.list`, `configdelivery.rollouts.resume`, `configdelivery.rollouts.suspend`, `configdelivery.variants.create`, `configdelivery.variants.delete`, `configdelivery.variants.get`, `configdelivery.variants.list`, `configdelivery.variants.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Configdelivery Viewer (`roles/configdelivery.viewer`)

- Viewer role for configdelivery
- Permissions (16): `configdelivery.fleetPackages.get`, `configdelivery.fleetPackages.list`, `configdelivery.locations.get`, `configdelivery.locations.list`, `configdelivery.operations.get`, `configdelivery.operations.list`, `configdelivery.releases.get`, `configdelivery.releases.list`, `configdelivery.resourceBundles.get`, `configdelivery.resourceBundles.list`, `configdelivery.rollouts.get`, `configdelivery.rollouts.list`, `configdelivery.variants.get`, `configdelivery.variants.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### ConfigDelivery Admin (`roles/configdelivery.configDeliveryAdmin`)

- Grants full access to all Config Delivery resources. Lets users create, remove and manage fleet packages and resource bundles.
- Permissions (33): `configdelivery.fleetPackages.create`, `configdelivery.fleetPackages.delete`, `configdelivery.fleetPackages.get`, `configdelivery.fleetPackages.list`, `configdelivery.fleetPackages.update`, `configdelivery.locations.get`, `configdelivery.locations.list`, `configdelivery.operations.cancel`, `configdelivery.operations.delete`, `configdelivery.operations.get`, `configdelivery.operations.list`, `configdelivery.releases.create`, `configdelivery.releases.delete`, `configdelivery.releases.get`, `configdelivery.releases.list`, `configdelivery.releases.update`, `configdelivery.resourceBundles.create`, `configdelivery.resourceBundles.delete`, `configdelivery.resourceBundles.get`, `configdelivery.resourceBundles.list`, `configdelivery.resourceBundles.update`, `configdelivery.rollouts.abort`, `configdelivery.rollouts.get`, `configdelivery.rollouts.list`, `configdelivery.rollouts.resume`, `configdelivery.rollouts.suspend`, `configdelivery.variants.create`, `configdelivery.variants.delete`, `configdelivery.variants.get`, `configdelivery.variants.list`, `configdelivery.variants.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### ConfigDelivery Viewer (`roles/configdelivery.configDeliveryViewer`)

- Grants read access to all Config Delivery resources. Lets users view existing fleet packages and resource bundles, but they will not be able to make any changes.
- Permissions (16): `configdelivery.fleetPackages.get`, `configdelivery.fleetPackages.list`, `configdelivery.locations.get`, `configdelivery.locations.list`, `configdelivery.operations.get`, `configdelivery.operations.list`, `configdelivery.releases.get`, `configdelivery.releases.list`, `configdelivery.resourceBundles.get`, `configdelivery.resourceBundles.list`, `configdelivery.rollouts.get`, `configdelivery.rollouts.list`, `configdelivery.variants.get`, `configdelivery.variants.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Config Delivery Resource Bundle Publisher (`roles/configdelivery.resourceBundlePublisher`)

- Grants read and write permissions to Config Delivery ResourceBundles and Releases.
- Permissions (18): `configdelivery.locations.get`, `configdelivery.locations.list`, `configdelivery.operations.get`, `configdelivery.operations.list`, `configdelivery.releases.create`, `configdelivery.releases.get`, `configdelivery.releases.list`, `configdelivery.releases.update`, `configdelivery.resourceBundles.create`, `configdelivery.resourceBundles.get`, `configdelivery.resourceBundles.list`, `configdelivery.resourceBundles.update`, `configdelivery.variants.create`, `configdelivery.variants.get`, `configdelivery.variants.list`, `configdelivery.variants.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Config Delivery Service Agent (`roles/configdelivery.serviceAgent`)

- Gives the Config Delivery service account permission to manage resources > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (42): `artifactregistry.dockerimages.get`, `artifactregistry.dockerimages.list`, `artifactregistry.projectsettings.get`, `artifactregistry.repositories.create`, `artifactregistry.repositories.downloadArtifacts`, `artifactregistry.repositories.get`, `artifactregistry.repositories.getIamPolicy`, `artifactregistry.repositories.list`, `artifactregistry.repositories.listEffectiveTags`, `artifactregistry.repositories.listTagBindings`, `artifactregistry.repositories.setIamPolicy`, `artifactregistry.repositories.uploadArtifacts`, `artifactregistry.tags.create`, `artifactregistry.tags.delete`, `artifactregistry.tags.get`, `artifactregistry.tags.list`, `artifactregistry.tags.update`, `artifactregistry.versions.delete`, `artifactregistry.versions.get`, `artifactregistry.versions.list`, `cloudbuild.builds.create`, `cloudbuild.builds.get`, `cloudbuild.builds.list`, `cloudbuild.builds.update`, `cloudbuild.repositories.get`, `container.customResourceDefinitions.get`, `container.customResourceDefinitions.list`, `container.serviceAccounts.get`, `container.serviceAccounts.list`, `container.thirdPartyObjects.create`, `container.thirdPartyObjects.delete`, `container.thirdPartyObjects.get`, `container.thirdPartyObjects.list`, `container.thirdPartyObjects.update`, `gkehub.gateway.delete`, `gkehub.gateway.generateCredentials`, `gkehub.gateway.get`, `gkehub.gateway.patch`, `gkehub.gateway.post`, `gkehub.gateway.put`, `gkehub.memberships.get`, `iam.serviceAccounts.actAs`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/configdelivery.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `configdelivery.fleetPackages.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/configdelivery.admin`, `roles/configdelivery.configDeliveryAdmin` |
| `configdelivery.fleetPackages.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/configdelivery.admin`, `roles/configdelivery.configDeliveryAdmin` |
| `configdelivery.fleetPackages.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/configdelivery.admin`, `roles/configdelivery.viewer`, `roles/configdelivery.configDeliveryAdmin`, `roles/configdelivery.configDeliveryViewer`, `roles/iam.supportUser` |
| `configdelivery.fleetPackages.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/configdelivery.admin`, `roles/configdelivery.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/configdelivery.configDeliveryAdmin`, `roles/configdelivery.configDeliveryViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `configdelivery.fleetPackages.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/configdelivery.admin`, `roles/configdelivery.configDeliveryAdmin` |
| `configdelivery.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/configdelivery.admin`, `roles/configdelivery.viewer`, `roles/configdelivery.configDeliveryAdmin`, `roles/configdelivery.configDeliveryViewer`, `roles/configdelivery.resourceBundlePublisher`, `roles/iam.supportUser` |
| `configdelivery.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/configdelivery.admin`, `roles/configdelivery.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/configdelivery.configDeliveryAdmin`, `roles/configdelivery.configDeliveryViewer`, `roles/configdelivery.resourceBundlePublisher`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `configdelivery.operations.cancel` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/configdelivery.admin`, `roles/configdelivery.configDeliveryAdmin` |
| `configdelivery.operations.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/configdelivery.admin`, `roles/configdelivery.configDeliveryAdmin` |
| `configdelivery.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/configdelivery.admin`, `roles/configdelivery.viewer`, `roles/configdelivery.configDeliveryAdmin`, `roles/configdelivery.configDeliveryViewer`, `roles/configdelivery.resourceBundlePublisher`, `roles/iam.supportUser` |
| `configdelivery.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/configdelivery.admin`, `roles/configdelivery.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/configdelivery.configDeliveryAdmin`, `roles/configdelivery.configDeliveryViewer`, `roles/configdelivery.resourceBundlePublisher`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `configdelivery.releases.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/configdelivery.admin`, `roles/configdelivery.configDeliveryAdmin`, `roles/configdelivery.resourceBundlePublisher` |
| `configdelivery.releases.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/configdelivery.admin`, `roles/configdelivery.configDeliveryAdmin` |
| `configdelivery.releases.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/configdelivery.admin`, `roles/configdelivery.viewer`, `roles/configdelivery.configDeliveryAdmin`, `roles/configdelivery.configDeliveryViewer`, `roles/configdelivery.resourceBundlePublisher`, `roles/iam.supportUser` |
| `configdelivery.releases.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/configdelivery.admin`, `roles/configdelivery.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/configdelivery.configDeliveryAdmin`, `roles/configdelivery.configDeliveryViewer`, `roles/configdelivery.resourceBundlePublisher`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `configdelivery.releases.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/configdelivery.admin`, `roles/configdelivery.configDeliveryAdmin`, `roles/configdelivery.resourceBundlePublisher` |
| `configdelivery.resourceBundles.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/configdelivery.admin`, `roles/configdelivery.configDeliveryAdmin`, `roles/configdelivery.resourceBundlePublisher` |
| `configdelivery.resourceBundles.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/configdelivery.admin`, `roles/configdelivery.configDeliveryAdmin` |
| `configdelivery.resourceBundles.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/configdelivery.admin`, `roles/configdelivery.viewer`, `roles/configdelivery.configDeliveryAdmin`, `roles/configdelivery.configDeliveryViewer`, `roles/configdelivery.resourceBundlePublisher`, `roles/iam.supportUser` |
| `configdelivery.resourceBundles.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/configdelivery.admin`, `roles/configdelivery.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/configdelivery.configDeliveryAdmin`, `roles/configdelivery.configDeliveryViewer`, `roles/configdelivery.resourceBundlePublisher`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `configdelivery.resourceBundles.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/configdelivery.admin`, `roles/configdelivery.configDeliveryAdmin`, `roles/configdelivery.resourceBundlePublisher` |
| `configdelivery.rollouts.abort` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/configdelivery.admin`, `roles/configdelivery.configDeliveryAdmin` |
| `configdelivery.rollouts.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/configdelivery.admin`, `roles/configdelivery.viewer`, `roles/configdelivery.configDeliveryAdmin`, `roles/configdelivery.configDeliveryViewer`, `roles/iam.supportUser` |
| `configdelivery.rollouts.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/configdelivery.admin`, `roles/configdelivery.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/configdelivery.configDeliveryAdmin`, `roles/configdelivery.configDeliveryViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `configdelivery.rollouts.resume` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/configdelivery.admin`, `roles/configdelivery.configDeliveryAdmin` |
| `configdelivery.rollouts.suspend` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/configdelivery.admin`, `roles/configdelivery.configDeliveryAdmin` |
| `configdelivery.variants.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/configdelivery.admin`, `roles/configdelivery.configDeliveryAdmin`, `roles/configdelivery.resourceBundlePublisher` |
| `configdelivery.variants.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/configdelivery.admin`, `roles/configdelivery.configDeliveryAdmin` |
| `configdelivery.variants.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/configdelivery.admin`, `roles/configdelivery.viewer`, `roles/configdelivery.configDeliveryAdmin`, `roles/configdelivery.configDeliveryViewer`, `roles/configdelivery.resourceBundlePublisher`, `roles/iam.supportUser` |
| `configdelivery.variants.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/configdelivery.admin`, `roles/configdelivery.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/configdelivery.configDeliveryAdmin`, `roles/configdelivery.configDeliveryViewer`, `roles/configdelivery.resourceBundlePublisher`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `configdelivery.variants.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/configdelivery.admin`, `roles/configdelivery.configDeliveryAdmin`, `roles/configdelivery.resourceBundlePublisher` |

## Notes

- Roles and permissions of the `configdelivery` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/configdelivery (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
