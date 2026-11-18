---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/cloudtrace
---

# Cloud Trace IAM roles and permissions

## Signature / Usage

Predefined roles of `cloudtrace` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Cloud Trace Admin (`roles/cloudtrace.admin`)

- Provides full access to the Trace console and read-write access to traces. Lowest-level resources where you can grant this role: - Project
- Permissions (24): `cloudtrace.insights.get`, `cloudtrace.insights.list`, `cloudtrace.stats.get`, `cloudtrace.tasks.create`, `cloudtrace.tasks.delete`, `cloudtrace.tasks.get`, `cloudtrace.tasks.list`, `cloudtrace.traceScopes.create`, `cloudtrace.traceScopes.delete`, `cloudtrace.traceScopes.get`, `cloudtrace.traceScopes.list`, `cloudtrace.traceScopes.update`, `cloudtrace.traces.get`, `cloudtrace.traces.list`, `cloudtrace.traces.patch`, `observability.scopes.get`, `observability.traceScopes.create`, `observability.traceScopes.delete`, `observability.traceScopes.get`, `observability.traceScopes.list`, `observability.traceScopes.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `telemetry.traces.write`

#### Cloud Trace User (`roles/cloudtrace.user`)

- Provides full access to the Trace console and read access to traces. Lowest-level resources where you can grant this role: - Project
- Permissions (22): `cloudtrace.insights.get`, `cloudtrace.insights.list`, `cloudtrace.stats.get`, `cloudtrace.tasks.create`, `cloudtrace.tasks.delete`, `cloudtrace.tasks.get`, `cloudtrace.tasks.list`, `cloudtrace.traceScopes.create`, `cloudtrace.traceScopes.delete`, `cloudtrace.traceScopes.get`, `cloudtrace.traceScopes.list`, `cloudtrace.traceScopes.update`, `cloudtrace.traces.get`, `cloudtrace.traces.list`, `observability.scopes.get`, `observability.traceScopes.create`, `observability.traceScopes.delete`, `observability.traceScopes.get`, `observability.traceScopes.list`, `observability.traceScopes.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud Trace Agent (`roles/cloudtrace.agent`)

- For service accounts. Provides ability to write traces by sending the data to Stackdriver Trace. Lowest-level resources where you can grant this role: - Project
- Permissions (2): `cloudtrace.traces.patch`, `telemetry.traces.write`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Project):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/cloudtrace.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `cloudtrace.insights.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudtrace.admin`, `roles/cloudtrace.user`, `roles/discoveryengine.admin`, `roles/discoveryengine.agentspaceAdmin`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser` |
| `cloudtrace.insights.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudtrace.admin`, `roles/cloudtrace.user`, `roles/discoveryengine.admin`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/discoveryengine.agentspaceAdmin`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser` |
| `cloudtrace.stats.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudtrace.admin`, `roles/cloudtrace.user`, `roles/discoveryengine.admin`, `roles/discoveryengine.agentspaceAdmin`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser` |
| `cloudtrace.tasks.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudtrace.admin`, `roles/cloudtrace.user`, `roles/discoveryengine.admin`, `roles/discoveryengine.agentspaceAdmin`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser` |
| `cloudtrace.tasks.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudtrace.admin`, `roles/cloudtrace.user`, `roles/discoveryengine.admin`, `roles/discoveryengine.agentspaceAdmin`, `roles/iam.siteReliabilityEngineer` |
| `cloudtrace.tasks.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudtrace.admin`, `roles/cloudtrace.user`, `roles/discoveryengine.admin`, `roles/discoveryengine.agentspaceAdmin`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser` |
| `cloudtrace.tasks.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudtrace.admin`, `roles/cloudtrace.user`, `roles/discoveryengine.admin`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/discoveryengine.agentspaceAdmin`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser` |
| `cloudtrace.traceScopes.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudtrace.admin`, `roles/cloudtrace.user`, `roles/discoveryengine.admin`, `roles/discoveryengine.agentspaceAdmin`, `roles/iam.siteReliabilityEngineer` |
| `cloudtrace.traceScopes.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudtrace.admin`, `roles/cloudtrace.user`, `roles/discoveryengine.admin`, `roles/discoveryengine.agentspaceAdmin`, `roles/iam.siteReliabilityEngineer` |
| `cloudtrace.traceScopes.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudtrace.admin`, `roles/cloudtrace.user`, `roles/discoveryengine.admin`, `roles/discoveryengine.agentspaceAdmin`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser` |
| `cloudtrace.traceScopes.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudtrace.admin`, `roles/cloudtrace.user`, `roles/discoveryengine.admin`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/discoveryengine.agentspaceAdmin`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser` |
| `cloudtrace.traceScopes.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudtrace.admin`, `roles/cloudtrace.user`, `roles/discoveryengine.admin`, `roles/discoveryengine.agentspaceAdmin`, `roles/iam.siteReliabilityEngineer` |
| `cloudtrace.traces.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudtrace.admin`, `roles/cloudtrace.user`, `roles/discoveryengine.admin`, `roles/discoveryengine.agentspaceAdmin`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser` (+1 service agent role) |
| `cloudtrace.traces.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudtrace.admin`, `roles/cloudtrace.user`, `roles/discoveryengine.admin`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/discoveryengine.agentspaceAdmin`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser` (+2 service agent roles) |
| `cloudtrace.traces.patch` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudtrace.admin`, `roles/cloudtrace.agent`, `roles/firebaseapphosting.computeRunner` (+8 service agent roles) |

## Notes

- Roles and permissions of the `cloudtrace` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/cloudtrace (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
