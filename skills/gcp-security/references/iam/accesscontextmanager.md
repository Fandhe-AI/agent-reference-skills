---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/accesscontextmanager
---

# Access Context Manager IAM roles and permissions

## Signature / Usage

Predefined roles of `accesscontextmanager` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Access Context Manager Admin (`roles/accesscontextmanager.admin`)

- Admin role for Access Context Manager
- Permissions (33): `accesscontextmanager.accessLevels.create`, `accesscontextmanager.accessLevels.delete`, `accesscontextmanager.accessLevels.get`, `accesscontextmanager.accessLevels.list`, `accesscontextmanager.accessLevels.replaceAll`, `accesscontextmanager.accessLevels.update`, `accesscontextmanager.authorizedOrgsDescs.create`, `accesscontextmanager.authorizedOrgsDescs.delete`, `accesscontextmanager.authorizedOrgsDescs.get`, `accesscontextmanager.authorizedOrgsDescs.list`, `accesscontextmanager.authorizedOrgsDescs.update`, `accesscontextmanager.gcpUserAccessBindings.create`, `accesscontextmanager.gcpUserAccessBindings.delete`, `accesscontextmanager.gcpUserAccessBindings.get`, `accesscontextmanager.gcpUserAccessBindings.list`, `accesscontextmanager.gcpUserAccessBindings.update`, `accesscontextmanager.policies.create`, `accesscontextmanager.policies.delete`, `accesscontextmanager.policies.get`, `accesscontextmanager.policies.getIamPolicy`, `accesscontextmanager.policies.list`, `accesscontextmanager.policies.setIamPolicy`, `accesscontextmanager.policies.update`, `accesscontextmanager.servicePerimeters.commit`, `accesscontextmanager.servicePerimeters.create`, `accesscontextmanager.servicePerimeters.delete`, `accesscontextmanager.servicePerimeters.get`, `accesscontextmanager.servicePerimeters.list`, `accesscontextmanager.servicePerimeters.replaceAll`, `accesscontextmanager.servicePerimeters.update`, `resourcemanager.organizations.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Access Context Manager Editor (`roles/accesscontextmanager.editor`)

- Editor role for Access Context Manager
- Permissions (32): `accesscontextmanager.accessLevels.create`, `accesscontextmanager.accessLevels.delete`, `accesscontextmanager.accessLevels.get`, `accesscontextmanager.accessLevels.list`, `accesscontextmanager.accessLevels.replaceAll`, `accesscontextmanager.accessLevels.update`, `accesscontextmanager.authorizedOrgsDescs.create`, `accesscontextmanager.authorizedOrgsDescs.delete`, `accesscontextmanager.authorizedOrgsDescs.get`, `accesscontextmanager.authorizedOrgsDescs.list`, `accesscontextmanager.authorizedOrgsDescs.update`, `accesscontextmanager.gcpUserAccessBindings.create`, `accesscontextmanager.gcpUserAccessBindings.delete`, `accesscontextmanager.gcpUserAccessBindings.get`, `accesscontextmanager.gcpUserAccessBindings.list`, `accesscontextmanager.gcpUserAccessBindings.update`, `accesscontextmanager.policies.create`, `accesscontextmanager.policies.delete`, `accesscontextmanager.policies.get`, `accesscontextmanager.policies.getIamPolicy`, `accesscontextmanager.policies.list`, `accesscontextmanager.policies.update`, `accesscontextmanager.servicePerimeters.commit`, `accesscontextmanager.servicePerimeters.create`, `accesscontextmanager.servicePerimeters.delete`, `accesscontextmanager.servicePerimeters.get`, `accesscontextmanager.servicePerimeters.list`, `accesscontextmanager.servicePerimeters.replaceAll`, `accesscontextmanager.servicePerimeters.update`, `resourcemanager.organizations.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Access Context Manager Admin (`roles/accesscontextmanager.policyAdmin`)

- Full access to policies, access levels, access zones and authorized orgs descs.
- Permissions (29): `accesscontextmanager.accessLevels.create`, `accesscontextmanager.accessLevels.delete`, `accesscontextmanager.accessLevels.get`, `accesscontextmanager.accessLevels.list`, `accesscontextmanager.accessLevels.replaceAll`, `accesscontextmanager.accessLevels.update`, `accesscontextmanager.authorizedOrgsDescs.create`, `accesscontextmanager.authorizedOrgsDescs.delete`, `accesscontextmanager.authorizedOrgsDescs.get`, `accesscontextmanager.authorizedOrgsDescs.list`, `accesscontextmanager.authorizedOrgsDescs.update`, `accesscontextmanager.policies.create`, `accesscontextmanager.policies.delete`, `accesscontextmanager.policies.get`, `accesscontextmanager.policies.getIamPolicy`, `accesscontextmanager.policies.list`, `accesscontextmanager.policies.setIamPolicy`, `accesscontextmanager.policies.update`, `accesscontextmanager.servicePerimeters.commit`, `accesscontextmanager.servicePerimeters.create`, `accesscontextmanager.servicePerimeters.delete`, `accesscontextmanager.servicePerimeters.get`, `accesscontextmanager.servicePerimeters.list`, `accesscontextmanager.servicePerimeters.replaceAll`, `accesscontextmanager.servicePerimeters.update`, `cloudasset.assets.searchAllResources`, `resourcemanager.organizations.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Access Context Manager Viewer (`roles/accesscontextmanager.viewer`)

- Viewer role for Access Context Manager
- Permissions (14): `accesscontextmanager.accessLevels.get`, `accesscontextmanager.accessLevels.list`, `accesscontextmanager.authorizedOrgsDescs.get`, `accesscontextmanager.authorizedOrgsDescs.list`, `accesscontextmanager.gcpUserAccessBindings.get`, `accesscontextmanager.gcpUserAccessBindings.list`, `accesscontextmanager.policies.get`, `accesscontextmanager.policies.getIamPolicy`, `accesscontextmanager.policies.list`, `accesscontextmanager.servicePerimeters.get`, `accesscontextmanager.servicePerimeters.list`, `resourcemanager.organizations.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud Access Binding Admin (`roles/accesscontextmanager.gcpAccessAdmin`)

- Create, edit, and change Cloud access bindings.
- Permissions (5): `accesscontextmanager.gcpUserAccessBindings.create`, `accesscontextmanager.gcpUserAccessBindings.delete`, `accesscontextmanager.gcpUserAccessBindings.get`, `accesscontextmanager.gcpUserAccessBindings.list`, `accesscontextmanager.gcpUserAccessBindings.update`

#### Cloud Access Binding Reader (`roles/accesscontextmanager.gcpAccessReader`)

- Read access to Cloud access bindings.
- Permissions (2): `accesscontextmanager.gcpUserAccessBindings.get`, `accesscontextmanager.gcpUserAccessBindings.list`

#### Access Context Manager Editor (`roles/accesscontextmanager.policyEditor`)

- Edit access to policies. Create, edit, and change access levels, access zones and authorized orgs descs.
- Permissions (28): `accesscontextmanager.accessLevels.create`, `accesscontextmanager.accessLevels.delete`, `accesscontextmanager.accessLevels.get`, `accesscontextmanager.accessLevels.list`, `accesscontextmanager.accessLevels.replaceAll`, `accesscontextmanager.accessLevels.update`, `accesscontextmanager.authorizedOrgsDescs.create`, `accesscontextmanager.authorizedOrgsDescs.delete`, `accesscontextmanager.authorizedOrgsDescs.get`, `accesscontextmanager.authorizedOrgsDescs.list`, `accesscontextmanager.authorizedOrgsDescs.update`, `accesscontextmanager.policies.create`, `accesscontextmanager.policies.delete`, `accesscontextmanager.policies.get`, `accesscontextmanager.policies.getIamPolicy`, `accesscontextmanager.policies.list`, `accesscontextmanager.policies.update`, `accesscontextmanager.servicePerimeters.commit`, `accesscontextmanager.servicePerimeters.create`, `accesscontextmanager.servicePerimeters.delete`, `accesscontextmanager.servicePerimeters.get`, `accesscontextmanager.servicePerimeters.list`, `accesscontextmanager.servicePerimeters.replaceAll`, `accesscontextmanager.servicePerimeters.update`, `cloudasset.assets.searchAllResources`, `resourcemanager.organizations.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Access Context Manager Reader (`roles/accesscontextmanager.policyReader`)

- Read access to policies, access levels, access zones and authorized orgs descs.
- Permissions (12): `accesscontextmanager.accessLevels.get`, `accesscontextmanager.accessLevels.list`, `accesscontextmanager.authorizedOrgsDescs.get`, `accesscontextmanager.authorizedOrgsDescs.list`, `accesscontextmanager.policies.get`, `accesscontextmanager.policies.getIamPolicy`, `accesscontextmanager.policies.list`, `accesscontextmanager.servicePerimeters.get`, `accesscontextmanager.servicePerimeters.list`, `resourcemanager.organizations.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### VPC Service Controls Troubleshooter Viewer (`roles/accesscontextmanager.vpcScTroubleshooterViewer`)

- —
- Permissions (24): `accesscontextmanager.accessLevels.get`, `accesscontextmanager.accessLevels.list`, `accesscontextmanager.authorizedOrgsDescs.get`, `accesscontextmanager.authorizedOrgsDescs.list`, `accesscontextmanager.policies.get`, `accesscontextmanager.policies.getIamPolicy`, `accesscontextmanager.policies.list`, `accesscontextmanager.servicePerimeters.get`, `accesscontextmanager.servicePerimeters.list`, `iam.roles.get`, `logging.exclusions.get`, `logging.exclusions.list`, `logging.logEntries.list`, `logging.logMetrics.get`, `logging.logMetrics.list`, `logging.logServiceIndexes.list`, `logging.logServices.list`, `logging.logs.list`, `logging.sinks.get`, `logging.sinks.list`, `logging.usage.get`, `resourcemanager.organizations.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on the organization (access policies are organization resources, and the Access Context Manager guides describe the administrator as "an organization-level Access Context Manager administrator", who can also delegate a scoped policy by granting a role on the access policy itself with `gcloud access-context-manager policies add-iam-policy-binding` (`access-context-manager/scoped-policies.md`)):

```bash
gcloud organizations add-iam-policy-binding ORGANIZATION_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/accesscontextmanager.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `accesscontextmanager.accessLevels.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/accesscontextmanager.admin`, `roles/accesscontextmanager.editor`, `roles/accesscontextmanager.policyAdmin`, `roles/accesscontextmanager.policyEditor` (+1 service agent role) |
| `accesscontextmanager.accessLevels.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/accesscontextmanager.admin`, `roles/accesscontextmanager.editor`, `roles/accesscontextmanager.policyAdmin`, `roles/accesscontextmanager.policyEditor` (+1 service agent role) |
| `accesscontextmanager.accessLevels.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/accesscontextmanager.admin`, `roles/accesscontextmanager.editor`, `roles/accesscontextmanager.policyAdmin`, `roles/accesscontextmanager.viewer`, `roles/accesscontextmanager.policyEditor`, `roles/accesscontextmanager.policyReader`, `roles/accesscontextmanager.vpcScTroubleshooterViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+1 service agent role) |
| `accesscontextmanager.accessLevels.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/accesscontextmanager.admin`, `roles/accesscontextmanager.editor`, `roles/accesscontextmanager.policyAdmin`, `roles/accesscontextmanager.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/accesscontextmanager.policyEditor`, `roles/accesscontextmanager.policyReader`, `roles/accesscontextmanager.vpcScTroubleshooterViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `accesscontextmanager.accessLevels.replaceAll` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/accesscontextmanager.admin`, `roles/accesscontextmanager.editor`, `roles/accesscontextmanager.policyAdmin`, `roles/accesscontextmanager.policyEditor` |
| `accesscontextmanager.accessLevels.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/accesscontextmanager.admin`, `roles/accesscontextmanager.editor`, `roles/accesscontextmanager.policyAdmin`, `roles/accesscontextmanager.policyEditor` (+1 service agent role) |
| `accesscontextmanager.authorizedOrgsDescs.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/accesscontextmanager.admin`, `roles/accesscontextmanager.editor`, `roles/accesscontextmanager.policyAdmin`, `roles/accesscontextmanager.policyEditor` |
| `accesscontextmanager.authorizedOrgsDescs.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/accesscontextmanager.admin`, `roles/accesscontextmanager.editor`, `roles/accesscontextmanager.policyAdmin`, `roles/accesscontextmanager.policyEditor` |
| `accesscontextmanager.authorizedOrgsDescs.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/accesscontextmanager.admin`, `roles/accesscontextmanager.editor`, `roles/accesscontextmanager.policyAdmin`, `roles/accesscontextmanager.viewer`, `roles/accesscontextmanager.policyEditor`, `roles/accesscontextmanager.policyReader`, `roles/accesscontextmanager.vpcScTroubleshooterViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `accesscontextmanager.authorizedOrgsDescs.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/accesscontextmanager.admin`, `roles/accesscontextmanager.editor`, `roles/accesscontextmanager.policyAdmin`, `roles/accesscontextmanager.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/accesscontextmanager.policyEditor`, `roles/accesscontextmanager.policyReader`, `roles/accesscontextmanager.vpcScTroubleshooterViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `accesscontextmanager.authorizedOrgsDescs.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/accesscontextmanager.admin`, `roles/accesscontextmanager.editor`, `roles/accesscontextmanager.policyAdmin`, `roles/accesscontextmanager.policyEditor` |
| `accesscontextmanager.gcpUserAccessBindings.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/accesscontextmanager.admin`, `roles/accesscontextmanager.editor`, `roles/accesscontextmanager.gcpAccessAdmin` |
| `accesscontextmanager.gcpUserAccessBindings.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/accesscontextmanager.admin`, `roles/accesscontextmanager.editor`, `roles/accesscontextmanager.gcpAccessAdmin` |
| `accesscontextmanager.gcpUserAccessBindings.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/accesscontextmanager.admin`, `roles/accesscontextmanager.editor`, `roles/accesscontextmanager.viewer`, `roles/accesscontextmanager.gcpAccessAdmin`, `roles/accesscontextmanager.gcpAccessReader`, `roles/iam.supportUser` (+2 service agent roles) |
| `accesscontextmanager.gcpUserAccessBindings.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/accesscontextmanager.admin`, `roles/accesscontextmanager.editor`, `roles/accesscontextmanager.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/accesscontextmanager.gcpAccessAdmin`, `roles/accesscontextmanager.gcpAccessReader`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+2 service agent roles) |
| `accesscontextmanager.gcpUserAccessBindings.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/accesscontextmanager.admin`, `roles/accesscontextmanager.editor`, `roles/accesscontextmanager.gcpAccessAdmin` |
| `accesscontextmanager.policies.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/accesscontextmanager.admin`, `roles/accesscontextmanager.editor`, `roles/accesscontextmanager.policyAdmin`, `roles/accesscontextmanager.policyEditor` |
| `accesscontextmanager.policies.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/accesscontextmanager.admin`, `roles/accesscontextmanager.editor`, `roles/accesscontextmanager.policyAdmin`, `roles/accesscontextmanager.policyEditor` |
| `accesscontextmanager.policies.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/accesscontextmanager.admin`, `roles/accesscontextmanager.editor`, `roles/accesscontextmanager.policyAdmin`, `roles/accesscontextmanager.viewer`, `roles/accesscontextmanager.policyEditor`, `roles/accesscontextmanager.policyReader`, `roles/accesscontextmanager.vpcScTroubleshooterViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `accesscontextmanager.policies.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/accesscontextmanager.admin`, `roles/accesscontextmanager.editor`, `roles/accesscontextmanager.policyAdmin`, `roles/accesscontextmanager.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/accesscontextmanager.policyEditor`, `roles/accesscontextmanager.policyReader`, `roles/accesscontextmanager.vpcScTroubleshooterViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `accesscontextmanager.policies.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/accesscontextmanager.admin`, `roles/accesscontextmanager.editor`, `roles/accesscontextmanager.policyAdmin`, `roles/accesscontextmanager.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/accesscontextmanager.policyEditor`, `roles/accesscontextmanager.policyReader`, `roles/accesscontextmanager.vpcScTroubleshooterViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` (+1 service agent role) |
| `accesscontextmanager.policies.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/accesscontextmanager.admin`, `roles/accesscontextmanager.policyAdmin`, `roles/iam.securityAdmin` |
| `accesscontextmanager.policies.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/accesscontextmanager.admin`, `roles/accesscontextmanager.editor`, `roles/accesscontextmanager.policyAdmin`, `roles/accesscontextmanager.policyEditor` |
| `accesscontextmanager.servicePerimeters.commit` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/accesscontextmanager.admin`, `roles/accesscontextmanager.editor`, `roles/accesscontextmanager.policyAdmin`, `roles/accesscontextmanager.policyEditor` |
| `accesscontextmanager.servicePerimeters.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/accesscontextmanager.admin`, `roles/accesscontextmanager.editor`, `roles/accesscontextmanager.policyAdmin`, `roles/accesscontextmanager.policyEditor` (+1 service agent role) |
| `accesscontextmanager.servicePerimeters.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/accesscontextmanager.admin`, `roles/accesscontextmanager.editor`, `roles/accesscontextmanager.policyAdmin`, `roles/accesscontextmanager.policyEditor` (+1 service agent role) |
| `accesscontextmanager.servicePerimeters.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/accesscontextmanager.admin`, `roles/accesscontextmanager.editor`, `roles/accesscontextmanager.policyAdmin`, `roles/accesscontextmanager.viewer`, `roles/accesscontextmanager.policyEditor`, `roles/accesscontextmanager.policyReader`, `roles/accesscontextmanager.vpcScTroubleshooterViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/securedlandingzone.bqdwOrgRemediator` (+1 service agent role) |
| `accesscontextmanager.servicePerimeters.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/accesscontextmanager.admin`, `roles/accesscontextmanager.editor`, `roles/accesscontextmanager.policyAdmin`, `roles/accesscontextmanager.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/accesscontextmanager.policyEditor`, `roles/accesscontextmanager.policyReader`, `roles/accesscontextmanager.vpcScTroubleshooterViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/securedlandingzone.bqdwOrgRemediator`, `roles/wiz.cloudInventoryViewer` |
| `accesscontextmanager.servicePerimeters.replaceAll` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/accesscontextmanager.admin`, `roles/accesscontextmanager.editor`, `roles/accesscontextmanager.policyAdmin`, `roles/accesscontextmanager.policyEditor` |
| `accesscontextmanager.servicePerimeters.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/accesscontextmanager.admin`, `roles/accesscontextmanager.editor`, `roles/accesscontextmanager.policyAdmin`, `roles/accesscontextmanager.policyEditor`, `roles/securedlandingzone.bqdwOrgRemediator` (+1 service agent role) |

## Notes

- Roles and permissions of the `accesscontextmanager` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/accesscontextmanager (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
