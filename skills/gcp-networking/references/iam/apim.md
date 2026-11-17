---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/apim
---

# API Management IAM roles and permissions

## Signature / Usage

Predefined roles of `apim` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### API Management Admin (`roles/apim.admin`)

- Launch stage: Beta
- Full access to API Management resources.
- Permissions (25): `apim.apiObservations.batchEditTags`, `apim.apiObservations.get`, `apim.apiObservations.list`, `apim.apiOperations.get`, `apim.apiOperations.list`, `apim.entitlements.get`, `apim.locations.get`, `apim.locations.list`, `apim.locations.listApiObservationTags`, `apim.observationJobs.create`, `apim.observationJobs.delete`, `apim.observationJobs.disable`, `apim.observationJobs.enable`, `apim.observationJobs.get`, `apim.observationJobs.list`, `apim.observationSources.create`, `apim.observationSources.delete`, `apim.observationSources.get`, `apim.observationSources.list`, `apim.operations.cancel`, `apim.operations.delete`, `apim.operations.get`, `apim.operations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### API Management Viewer (`roles/apim.viewer`)

- Launch stage: Beta
- Readonly access to API Management resources.
- Permissions (16): `apim.apiObservations.get`, `apim.apiObservations.list`, `apim.apiOperations.get`, `apim.apiOperations.list`, `apim.entitlements.get`, `apim.locations.get`, `apim.locations.list`, `apim.locations.listApiObservationTags`, `apim.observationJobs.get`, `apim.observationJobs.list`, `apim.observationSources.get`, `apim.observationSources.list`, `apim.operations.get`, `apim.operations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### APIM API Discovery Service Agent (`roles/apim.apiDiscoveryServiceAgent`)

- Gives APIM the ability to manage resources in consumer project > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (27): `compute.backendServices.create`, `compute.backendServices.delete`, `compute.backendServices.get`, `compute.backendServices.list`, `compute.backendServices.update`, `compute.backendServices.use`, `compute.globalOperations.get`, `compute.networks.use`, `compute.regionBackendServices.create`, `compute.regionBackendServices.delete`, `compute.regionBackendServices.get`, `compute.regionBackendServices.list`, `compute.regionBackendServices.update`, `compute.regionBackendServices.use`, `compute.regionNetworkEndpointGroups.attachNetworkEndpoints`, `compute.regionNetworkEndpointGroups.create`, `compute.regionNetworkEndpointGroups.delete`, `compute.regionNetworkEndpointGroups.detachNetworkEndpoints`, `compute.regionNetworkEndpointGroups.get`, `compute.regionNetworkEndpointGroups.list`, `compute.regionNetworkEndpointGroups.use`, `compute.regionOperations.get`, `compute.subnetworks.use`, `networkservices.operations.cancel`, `networkservices.operations.delete`, `networkservices.operations.get`, `networkservices.operations.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/apim.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `apim.apiObservations.batchEditTags` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/apim.admin` |
| `apim.apiObservations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/apim.admin`, `roles/apim.viewer`, `roles/iam.supportUser` |
| `apim.apiObservations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/apim.admin`, `roles/apim.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `apim.apiOperations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/apim.admin`, `roles/apim.viewer`, `roles/iam.supportUser` |
| `apim.apiOperations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/apim.admin`, `roles/apim.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `apim.entitlements.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/apim.admin`, `roles/apim.viewer`, `roles/iam.supportUser` |
| `apim.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/apim.admin`, `roles/apim.viewer`, `roles/iam.supportUser` |
| `apim.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/apim.admin`, `roles/apim.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `apim.locations.listApiObservationTags` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/apim.admin`, `roles/apim.viewer`, `roles/iam.supportUser` |
| `apim.observationJobs.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/apim.admin` |
| `apim.observationJobs.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/apim.admin` |
| `apim.observationJobs.disable` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/apim.admin` |
| `apim.observationJobs.enable` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/apim.admin` |
| `apim.observationJobs.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/apim.admin`, `roles/apim.viewer`, `roles/iam.supportUser` |
| `apim.observationJobs.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/apim.admin`, `roles/apim.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `apim.observationSources.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/apim.admin` |
| `apim.observationSources.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/apim.admin` |
| `apim.observationSources.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/apim.admin`, `roles/apim.viewer`, `roles/iam.supportUser` |
| `apim.observationSources.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/apim.admin`, `roles/apim.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `apim.operations.cancel` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/apim.admin` |
| `apim.operations.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/apim.admin` |
| `apim.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/apim.admin`, `roles/apim.viewer`, `roles/iam.supportUser` |
| `apim.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/apim.admin`, `roles/apim.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |

## Notes

- Roles and permissions of the `apim` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/apim (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
