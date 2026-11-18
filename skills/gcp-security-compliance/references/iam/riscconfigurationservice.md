---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/riscconfigurationservice
---

# RISC Configuration Service IAM roles and permissions

## Signature / Usage

Predefined roles of `riscconfigurationservice` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### RISC Configuration Admin (`roles/riscconfigs.admin`)

- Launch stage: Beta
- Read/write access to RISC config resources.
- Permissions (4): `clientauthconfig.clients.list`, `riscconfigurationservice.riscconfigs.createOrUpdate`, `riscconfigurationservice.riscconfigs.delete`, `riscconfigurationservice.riscconfigs.get`

#### RISC Configuration Viewer (`roles/riscconfigs.viewer`)

- Launch stage: Beta
- Read-only access to RISC config resources.
- Permissions (2): `clientauthconfig.clients.list`, `riscconfigurationservice.riscconfigs.get`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/riscconfigs.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `riscconfigurationservice.riscconfigs.createOrUpdate` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/riscconfigs.admin` |
| `riscconfigurationservice.riscconfigs.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/riscconfigs.admin` |
| `riscconfigurationservice.riscconfigs.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/riscconfigs.admin`, `roles/riscconfigs.viewer`, `roles/iam.supportUser` |

## Notes

- Roles and permissions of the `riscconfigurationservice` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/riscconfigurationservice (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
