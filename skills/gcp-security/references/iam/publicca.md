---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/publicca
---

# Public Certificate Authority IAM roles and permissions

## Signature / Usage

Predefined roles of `publicca` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Publicca Admin (`roles/publicca.admin`)

- Launch stage: Beta
- Admin role for publicca
- Permissions (3): `publicca.externalAccountKeys.create`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### External Account Key Creator (`roles/publicca.externalAccountKeyCreator`)

- Launch stage: Beta
- This role can create a new externalAccountKey resource.
- Permissions (3): `publicca.externalAccountKeys.create`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/publicca.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `publicca.externalAccountKeys.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/publicca.admin`, `roles/publicca.externalAccountKeyCreator` |

## Notes

- Roles and permissions of the `publicca` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/publicca (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
