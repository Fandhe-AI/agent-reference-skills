---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/clouddebugger
---

# Cloud Debugger IAM roles and permissions

## Signature / Usage

Predefined roles of `clouddebugger` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Cloud Debugger Agent (`roles/clouddebugger.agent`)

- Launch stage: Beta
- Provides permissions to register the debug target, read active breakpoints, and report breakpoint results. Lowest-level resources where you can grant this role: - Service Account
- Permissions (4): `clouddebugger.breakpoints.list`, `clouddebugger.breakpoints.listActive`, `clouddebugger.breakpoints.update`, `clouddebugger.debuggees.create`

#### Cloud Debugger User (`roles/clouddebugger.user`)

- Launch stage: Beta
- Provides permissions to create, view, list, and delete breakpoints (snapshots \& logpoints) as well as list debug targets (debuggees). Lowest-level resources where you can grant this role: - Project
- Permissions (5): `clouddebugger.breakpoints.create`, `clouddebugger.breakpoints.delete`, `clouddebugger.breakpoints.get`, `clouddebugger.breakpoints.list`, `clouddebugger.debuggees.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Service Account):

```bash
gcloud iam service-accounts add-iam-policy-binding SERVICE_ACCOUNT_EMAIL \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/clouddebugger.agent"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `clouddebugger.breakpoints.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/clouddebugger.user` |
| `clouddebugger.breakpoints.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/clouddebugger.user` |
| `clouddebugger.breakpoints.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/clouddebugger.user` |
| `clouddebugger.breakpoints.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/clouddebugger.agent`, `roles/clouddebugger.user`, `roles/iam.securityAuditor` (+1 service agent role) |
| `clouddebugger.breakpoints.listActive` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/clouddebugger.agent` (+1 service agent role) |
| `clouddebugger.breakpoints.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/clouddebugger.agent` (+1 service agent role) |
| `clouddebugger.debuggees.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/clouddebugger.agent` (+1 service agent role) |
| `clouddebugger.debuggees.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/clouddebugger.user`, `roles/iam.securityAuditor` |

## Notes

- Roles and permissions of the `clouddebugger` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Shut down product: "Cloud Debugger was deprecated on May 16, 2022 and the service was shut down on May 31, 2023." The roles on this page are kept only for auditing existing IAM policies that still grant them; use the open source Snapshot Debugger instead (see `observability-overview/deprecations.md`; https://docs.cloud.google.com/stackdriver/docs/deprecations/debugger-deprecation, retrieved 2026-11-18).
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/clouddebugger (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
