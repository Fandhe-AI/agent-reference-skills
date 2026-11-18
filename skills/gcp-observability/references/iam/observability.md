---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/observability
---

# Google Cloud Observability IAM roles and permissions

## Signature / Usage

Predefined roles of `observability` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Observability Admin (`roles/observability.admin`)

- Full access to Observability resources.
- Permissions (43): `observability.analyticsViews.create`, `observability.analyticsViews.delete`, `observability.analyticsViews.get`, `observability.analyticsViews.list`, `observability.analyticsViews.update`, `observability.buckets.create`, `observability.buckets.delete`, `observability.buckets.get`, `observability.buckets.list`, `observability.buckets.undelete`, `observability.buckets.update`, `observability.datasets.create`, `observability.datasets.delete`, `observability.datasets.get`, `observability.datasets.list`, `observability.datasets.undelete`, `observability.datasets.update`, `observability.links.create`, `observability.links.delete`, `observability.links.get`, `observability.links.list`, `observability.links.update`, `observability.locations.get`, `observability.locations.list`, `observability.operations.cancel`, `observability.operations.delete`, `observability.operations.get`, `observability.operations.list`, `observability.scopes.get`, `observability.scopes.update`, `observability.settings.get`, `observability.settings.update`, `observability.traceScopes.create`, `observability.traceScopes.delete`, `observability.traceScopes.get`, `observability.traceScopes.list`, `observability.traceScopes.update`, `observability.views.access`, `observability.views.create`, `observability.views.delete`, `observability.views.get`, `observability.views.list`, `observability.views.update`

#### Observability Editor (`roles/observability.editor`)

- Edit access to Observability resources.
- Permissions (38): `observability.analyticsViews.create`, `observability.analyticsViews.delete`, `observability.analyticsViews.get`, `observability.analyticsViews.list`, `observability.analyticsViews.update`, `observability.buckets.create`, `observability.buckets.get`, `observability.buckets.list`, `observability.buckets.update`, `observability.datasets.create`, `observability.datasets.get`, `observability.datasets.list`, `observability.datasets.update`, `observability.links.create`, `observability.links.delete`, `observability.links.get`, `observability.links.list`, `observability.links.update`, `observability.locations.get`, `observability.locations.list`, `observability.operations.cancel`, `observability.operations.delete`, `observability.operations.get`, `observability.operations.list`, `observability.scopes.get`, `observability.scopes.update`, `observability.settings.get`, `observability.settings.update`, `observability.traceScopes.create`, `observability.traceScopes.delete`, `observability.traceScopes.get`, `observability.traceScopes.list`, `observability.traceScopes.update`, `observability.views.create`, `observability.views.delete`, `observability.views.get`, `observability.views.list`, `observability.views.update`

#### Observability Viewer (`roles/observability.viewer`)

- Read only access to Observability resources.
- Permissions (18): `observability.analyticsViews.get`, `observability.analyticsViews.list`, `observability.buckets.get`, `observability.buckets.list`, `observability.datasets.get`, `observability.datasets.list`, `observability.links.get`, `observability.links.list`, `observability.locations.get`, `observability.locations.list`, `observability.operations.get`, `observability.operations.list`, `observability.scopes.get`, `observability.settings.get`, `observability.traceScopes.get`, `observability.traceScopes.list`, `observability.views.get`, `observability.views.list`

#### Observability Analytics User (`roles/observability.analyticsUser`)

- Grants permissions to use Cloud Observability Analytics.
- Permissions (24): `logging.queries.getShared`, `logging.queries.listShared`, `logging.queries.usePrivate`, `observability.analyticsViews.create`, `observability.analyticsViews.delete`, `observability.analyticsViews.get`, `observability.analyticsViews.list`, `observability.analyticsViews.update`, `observability.buckets.get`, `observability.buckets.list`, `observability.datasets.get`, `observability.datasets.list`, `observability.links.get`, `observability.links.list`, `observability.locations.get`, `observability.locations.list`, `observability.operations.get`, `observability.operations.list`, `observability.scopes.get`, `observability.settings.get`, `observability.traceScopes.get`, `observability.traceScopes.list`, `observability.views.get`, `observability.views.list`

#### Observability Scopes Editor (`roles/observability.scopesEditor`)

- Grants permission to view and edit Observability, Logging, Trace, and Monitoring scopes
- Permissions (13): `logging.logScopes.create`, `logging.logScopes.delete`, `logging.logScopes.get`, `logging.logScopes.list`, `logging.logScopes.update`, `monitoring.metricsScopes.link`, `observability.scopes.get`, `observability.scopes.update`, `observability.traceScopes.create`, `observability.traceScopes.delete`, `observability.traceScopes.get`, `observability.traceScopes.list`, `observability.traceScopes.update`

#### Observability View Accessor (`roles/observability.viewAccessor`)

- Read only access to data defined by an Observability View.
- Permissions (1): `observability.views.access`

#### Observability Service Agent (`roles/observability.serviceAgent`)

- Grants Observability service account the ability to list, create and link datasets in the consumer project. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (3): `bigquery.datasets.create`, `bigquery.datasets.get`, `bigquery.datasets.link`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/observability.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `observability.analyticsViews.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/observability.admin`, `roles/observability.editor`, `roles/observability.analyticsUser` |
| `observability.analyticsViews.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/observability.admin`, `roles/observability.editor`, `roles/observability.analyticsUser` |
| `observability.analyticsViews.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/observability.admin`, `roles/observability.editor`, `roles/observability.viewer`, `roles/iam.supportUser`, `roles/observability.analyticsUser` |
| `observability.analyticsViews.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/observability.admin`, `roles/observability.editor`, `roles/observability.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/observability.analyticsUser` |
| `observability.analyticsViews.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/observability.admin`, `roles/observability.editor`, `roles/observability.analyticsUser` |
| `observability.buckets.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/observability.admin`, `roles/observability.editor` |
| `observability.buckets.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/observability.admin` |
| `observability.buckets.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/observability.admin`, `roles/observability.editor`, `roles/observability.viewer`, `roles/iam.supportUser`, `roles/observability.analyticsUser` |
| `observability.buckets.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/observability.admin`, `roles/observability.editor`, `roles/observability.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/observability.analyticsUser`, `roles/wiz.cloudInventoryViewer` |
| `observability.buckets.undelete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/observability.admin` |
| `observability.buckets.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/observability.admin`, `roles/observability.editor` |
| `observability.datasets.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/observability.admin`, `roles/observability.editor` |
| `observability.datasets.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/observability.admin` |
| `observability.datasets.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/observability.admin`, `roles/observability.editor`, `roles/observability.viewer`, `roles/iam.supportUser`, `roles/observability.analyticsUser` |
| `observability.datasets.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/observability.admin`, `roles/observability.editor`, `roles/observability.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/observability.analyticsUser` |
| `observability.datasets.undelete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/observability.admin` |
| `observability.datasets.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/observability.admin`, `roles/observability.editor` |
| `observability.links.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/observability.admin`, `roles/observability.editor` (+1 service agent role) |
| `observability.links.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/observability.admin`, `roles/observability.editor` (+1 service agent role) |
| `observability.links.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/observability.admin`, `roles/observability.editor`, `roles/observability.viewer`, `roles/iam.supportUser`, `roles/observability.analyticsUser` (+1 service agent role) |
| `observability.links.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/observability.admin`, `roles/observability.editor`, `roles/observability.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/observability.analyticsUser` (+2 service agent roles) |
| `observability.links.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/observability.admin`, `roles/observability.editor` |
| `observability.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/observability.admin`, `roles/observability.editor`, `roles/observability.viewer`, `roles/iam.supportUser`, `roles/observability.analyticsUser` |
| `observability.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/observability.admin`, `roles/observability.editor`, `roles/observability.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/observability.analyticsUser`, `roles/wiz.cloudInventoryViewer` |
| `observability.operations.cancel` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/observability.admin`, `roles/observability.editor` |
| `observability.operations.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/observability.admin`, `roles/observability.editor` |
| `observability.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/observability.admin`, `roles/observability.editor`, `roles/observability.viewer`, `roles/iam.supportUser`, `roles/observability.analyticsUser` (+1 service agent role) |
| `observability.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/observability.admin`, `roles/observability.editor`, `roles/observability.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/observability.analyticsUser` (+1 service agent role) |
| `observability.scopes.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudtrace.admin`, `roles/cloudtrace.user`, `roles/discoveryengine.admin`, `roles/logging.admin`, `roles/logging.privateLogViewer`, `roles/logging.viewer`, `roles/observability.admin`, `roles/observability.editor`, `roles/observability.viewer`, `roles/telcoautomation.admin`, `roles/cloudhub.operator`, `roles/dataproc.hubAgent`, `roles/discoveryengine.agentspaceAdmin`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.devOps`, `roles/iam.infrastructureAdmin`, `roles/iam.mlEngineer`, `roles/iam.networkAdmin`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser`, `roles/logging.configWriter`, `roles/observability.analyticsUser`, `roles/observability.scopesEditor`, `roles/telcoautomation.opsAdminTier1`, `roles/telcoautomation.opsAdminTier4` (+2 service agent roles) |
| `observability.scopes.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/observability.admin`, `roles/observability.editor`, `roles/observability.scopesEditor` |
| `observability.settings.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/observability.admin`, `roles/observability.editor`, `roles/observability.viewer`, `roles/iam.supportUser`, `roles/observability.analyticsUser` |
| `observability.settings.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/observability.admin`, `roles/observability.editor` |
| `observability.traceScopes.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudtrace.admin`, `roles/cloudtrace.user`, `roles/discoveryengine.admin`, `roles/observability.admin`, `roles/observability.editor`, `roles/discoveryengine.agentspaceAdmin`, `roles/iam.siteReliabilityEngineer`, `roles/observability.scopesEditor` |
| `observability.traceScopes.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudtrace.admin`, `roles/cloudtrace.user`, `roles/discoveryengine.admin`, `roles/observability.admin`, `roles/observability.editor`, `roles/discoveryengine.agentspaceAdmin`, `roles/iam.siteReliabilityEngineer`, `roles/observability.scopesEditor` |
| `observability.traceScopes.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudtrace.admin`, `roles/cloudtrace.user`, `roles/discoveryengine.admin`, `roles/observability.admin`, `roles/observability.editor`, `roles/observability.viewer`, `roles/discoveryengine.agentspaceAdmin`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser`, `roles/observability.analyticsUser`, `roles/observability.scopesEditor` |
| `observability.traceScopes.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudtrace.admin`, `roles/cloudtrace.user`, `roles/discoveryengine.admin`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/observability.admin`, `roles/observability.editor`, `roles/observability.viewer`, `roles/discoveryengine.agentspaceAdmin`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser`, `roles/observability.analyticsUser`, `roles/observability.scopesEditor` |
| `observability.traceScopes.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudtrace.admin`, `roles/cloudtrace.user`, `roles/discoveryengine.admin`, `roles/observability.admin`, `roles/observability.editor`, `roles/discoveryengine.agentspaceAdmin`, `roles/iam.siteReliabilityEngineer`, `roles/observability.scopesEditor` |
| `observability.views.access` | `roles/admin`, `roles/owner`, `roles/observability.admin`, `roles/observability.viewAccessor` (+1 service agent role) |
| `observability.views.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/observability.admin`, `roles/observability.editor` |
| `observability.views.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/observability.admin`, `roles/observability.editor` |
| `observability.views.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/observability.admin`, `roles/observability.editor`, `roles/observability.viewer`, `roles/iam.supportUser`, `roles/observability.analyticsUser` |
| `observability.views.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/observability.admin`, `roles/observability.editor`, `roles/observability.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/observability.analyticsUser` |
| `observability.views.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/observability.admin`, `roles/observability.editor` |

## Notes

- Roles and permissions of the `observability` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/observability (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
