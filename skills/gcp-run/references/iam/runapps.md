---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/runapps
---

# Serverless Integrations IAM roles and permissions

## Signature / Usage

Predefined roles of `runapps` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Runapps Admin (`roles/runapps.admin`)

- Launch stage: Beta
- Admin role for runapps
- Permissions (17): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `runapps.applications.create`, `runapps.applications.delete`, `runapps.applications.get`, `runapps.applications.getStatus`, `runapps.applications.list`, `runapps.applications.update`, `runapps.deployments.create`, `runapps.deployments.get`, `runapps.deployments.list`, `runapps.locations.get`, `runapps.locations.list`, `runapps.operations.cancel`, `runapps.operations.delete`, `runapps.operations.get`, `runapps.operations.list`

#### Serverless Integrations Viewer (`roles/runapps.viewer`)

- Launch stage: Beta
- Read-only access to Serverless Integrations resources.
- Permissions (11): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `runapps.applications.get`, `runapps.applications.getStatus`, `runapps.applications.list`, `runapps.deployments.get`, `runapps.deployments.list`, `runapps.locations.get`, `runapps.locations.list`, `runapps.operations.get`, `runapps.operations.list`

#### Serverless Integrations Developer (`roles/runapps.developer`)

- Launch stage: Beta
- Access to create and change Serverless Integrations and their configuration.
- Permissions (16): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `runapps.applications.create`, `runapps.applications.delete`, `runapps.applications.get`, `runapps.applications.getStatus`, `runapps.applications.list`, `runapps.applications.update`, `runapps.deployments.get`, `runapps.deployments.list`, `runapps.locations.get`, `runapps.locations.list`, `runapps.operations.cancel`, `runapps.operations.delete`, `runapps.operations.get`, `runapps.operations.list`

#### Serverless Integrations Operator (`roles/runapps.operator`)

- Launch stage: Beta
- Access to deploy Serverless Integrations.
- Permissions (14): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `runapps.applications.get`, `runapps.applications.getStatus`, `runapps.applications.list`, `runapps.deployments.create`, `runapps.deployments.get`, `runapps.deployments.list`, `runapps.locations.get`, `runapps.locations.list`, `runapps.operations.cancel`, `runapps.operations.delete`, `runapps.operations.get`, `runapps.operations.list`

#### Serverless Integrations Service Agent (`roles/runapps.serviceAgent`)

- Gives Serverless Integrations Service Account access to customer project resources. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (41): `cloudbuild.builds.create`, `cloudbuild.builds.get`, `cloudsql.databases.get`, `cloudsql.instances.get`, `cloudsql.users.get`, `compute.backendServices.get`, `compute.backendServices.list`, `compute.globalAddresses.get`, `compute.globalAddresses.list`, `compute.globalForwardingRules.get`, `compute.globalForwardingRules.list`, `compute.networks.get`, `compute.networks.list`, `compute.regionNetworkEndpointGroups.get`, `compute.regionNetworkEndpointGroups.list`, `compute.sslCertificates.get`, `compute.sslCertificates.list`, `compute.targetHttpProxies.get`, `compute.targetHttpProxies.list`, `compute.targetHttpsProxies.get`, `compute.targetHttpsProxies.list`, `compute.urlMaps.get`, `compute.urlMaps.list`, `firebasehosting.sites.get`, `iam.serviceAccounts.actAs`, `redis.instances.get`, `redis.instances.list`, `run.jobs.get`, `run.jobs.list`, `run.services.get`, `run.services.list`, `serviceusage.services.use`, `storage.buckets.create`, `storage.buckets.delete`, `storage.buckets.get`, `storage.objects.create`, `storage.objects.delete`, `storage.objects.get`, `storage.objects.list`, `vpcaccess.connectors.get`, `vpcaccess.connectors.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Project):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/runapps.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `runapps.applications.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/runapps.admin`, `roles/runapps.developer` |
| `runapps.applications.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/runapps.admin`, `roles/runapps.developer` |
| `runapps.applications.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/runapps.admin`, `roles/runapps.viewer`, `roles/iam.supportUser`, `roles/runapps.developer`, `roles/runapps.operator` |
| `runapps.applications.getStatus` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/runapps.admin`, `roles/runapps.viewer`, `roles/iam.supportUser`, `roles/runapps.developer`, `roles/runapps.operator` |
| `runapps.applications.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/runapps.admin`, `roles/runapps.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/runapps.developer`, `roles/runapps.operator` |
| `runapps.applications.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/runapps.admin`, `roles/runapps.developer` |
| `runapps.deployments.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/runapps.admin`, `roles/runapps.operator` |
| `runapps.deployments.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/runapps.admin`, `roles/runapps.viewer`, `roles/iam.supportUser`, `roles/runapps.developer`, `roles/runapps.operator` |
| `runapps.deployments.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/runapps.admin`, `roles/runapps.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/runapps.developer`, `roles/runapps.operator` |
| `runapps.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/runapps.admin`, `roles/runapps.viewer`, `roles/iam.supportUser`, `roles/runapps.developer`, `roles/runapps.operator` |
| `runapps.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/runapps.admin`, `roles/runapps.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/runapps.developer`, `roles/runapps.operator` |
| `runapps.operations.cancel` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/runapps.admin`, `roles/runapps.developer`, `roles/runapps.operator` |
| `runapps.operations.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/runapps.admin`, `roles/runapps.developer`, `roles/runapps.operator` |
| `runapps.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/runapps.admin`, `roles/runapps.viewer`, `roles/iam.supportUser`, `roles/runapps.developer`, `roles/runapps.operator` |
| `runapps.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/runapps.admin`, `roles/runapps.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/runapps.developer`, `roles/runapps.operator` |

## Notes

- Roles and permissions of the `runapps` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/runapps (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
