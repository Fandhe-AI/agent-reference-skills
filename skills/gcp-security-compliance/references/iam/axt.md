---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/axt
---

# Access Transparency IAM roles and permissions

## Signature / Usage

Predefined roles of `axt` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Access Transparency Admin (`roles/axt.admin`)

- Enable Access Transparency for Organization Lowest-level resources where you can grant this role: - Project
- Permissions (5): `axt.labels.get`, `axt.labels.set`, `resourcemanager.organizations.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Project):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/axt.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `axt.labels.get` | `roles/axt.admin` (+1 service agent role) |
| `axt.labels.set` | `roles/assuredworkloads.admin`, `roles/assuredworkloads.editor`, `roles/axt.admin` |

## Notes

- Roles and permissions of the `axt` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/axt (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
