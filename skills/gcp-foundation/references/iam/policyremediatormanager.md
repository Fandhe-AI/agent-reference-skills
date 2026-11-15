---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/policyremediatormanager
---

# Policy Remediator Manager IAM roles and permissions

## Signature / Usage

Predefined roles of `policyremediatormanager` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Policyremediatormanager Admin (`roles/policyremediatormanager.admin`)

- Launch stage: Beta
- Admin role for policyremediatormanager
- Permissions (11): `policyremediatormanager.locations.get`, `policyremediatormanager.locations.list`, `policyremediatormanager.operations.cancel`, `policyremediatormanager.operations.delete`, `policyremediatormanager.operations.get`, `policyremediatormanager.operations.list`, `policyremediatormanager.remediatorServices.disable`, `policyremediatormanager.remediatorServices.enable`, `policyremediatormanager.remediatorServices.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Policyremediatormanager Viewer (`roles/policyremediatormanager.viewer`)

- Launch stage: Beta
- Viewer role for policyremediatormanager
- Permissions (7): `policyremediatormanager.locations.get`, `policyremediatormanager.locations.list`, `policyremediatormanager.operations.get`, `policyremediatormanager.operations.list`, `policyremediatormanager.remediatorServices.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Policy Remediator Admin (`roles/policyremediatormanager.policyRemediatorAdmin`)

- Launch stage: Beta
- Grants the ability to enable and disable the usage of the policy remediator for the organization
- Permissions (9): `policyremediatormanager.locations.get`, `policyremediatormanager.locations.list`, `policyremediatormanager.operations.cancel`, `policyremediatormanager.operations.delete`, `policyremediatormanager.operations.get`, `policyremediatormanager.operations.list`, `policyremediatormanager.remediatorServices.disable`, `policyremediatormanager.remediatorServices.enable`, `policyremediatormanager.remediatorServices.get`

#### Policy Remediator Reader (`roles/policyremediatormanager.policyRemediatorReader`)

- Launch stage: Beta
- Grants the ability to read/view the state of the policy remediator for the organization
- Permissions (5): `policyremediatormanager.locations.get`, `policyremediatormanager.locations.list`, `policyremediatormanager.operations.get`, `policyremediatormanager.operations.list`, `policyremediatormanager.remediatorServices.get`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Project):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/policyremediatormanager.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `policyremediatormanager.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/policyremediatormanager.admin`, `roles/policyremediatormanager.viewer`, `roles/iam.supportUser`, `roles/policyremediatormanager.policyRemediatorAdmin`, `roles/policyremediatormanager.policyRemediatorReader` |
| `policyremediatormanager.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/policyremediatormanager.admin`, `roles/policyremediatormanager.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/policyremediatormanager.policyRemediatorAdmin`, `roles/policyremediatormanager.policyRemediatorReader` |
| `policyremediatormanager.operations.cancel` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/policyremediatormanager.admin`, `roles/policyremediatormanager.policyRemediatorAdmin` |
| `policyremediatormanager.operations.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/policyremediatormanager.admin`, `roles/policyremediatormanager.policyRemediatorAdmin` |
| `policyremediatormanager.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/policyremediatormanager.admin`, `roles/policyremediatormanager.viewer`, `roles/iam.supportUser`, `roles/policyremediatormanager.policyRemediatorAdmin`, `roles/policyremediatormanager.policyRemediatorReader` |
| `policyremediatormanager.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/policyremediatormanager.admin`, `roles/policyremediatormanager.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/policyremediatormanager.policyRemediatorAdmin`, `roles/policyremediatormanager.policyRemediatorReader` |
| `policyremediatormanager.remediatorServices.disable` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/policyremediatormanager.admin`, `roles/policyremediatormanager.policyRemediatorAdmin` |
| `policyremediatormanager.remediatorServices.enable` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/policyremediatormanager.admin`, `roles/policyremediatormanager.policyRemediatorAdmin` |
| `policyremediatormanager.remediatorServices.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/policyremediatormanager.admin`, `roles/policyremediatormanager.viewer`, `roles/iam.supportUser`, `roles/policyremediatormanager.policyRemediatorAdmin`, `roles/policyremediatormanager.policyRemediatorReader` |

## Notes

- Roles and permissions of the `policyremediatormanager` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/policyremediatormanager (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
