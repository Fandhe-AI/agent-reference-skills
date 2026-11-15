---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/appdevelopmentexperience
---

# App Development Experience IAM roles and permissions

## Signature / Usage

Predefined roles of `appdevelopmentexperience` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### App Development Experience Service Agent (`roles/appdevelopmentexperience.serviceAgent`)

- Give the App Development Experience service agent access to Cloud Platform resources. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (13): `container.clusters.get`, `container.clusters.update`, `gkehub.features.get`, `gkehub.gateway.delete`, `gkehub.gateway.generateCredentials`, `gkehub.gateway.get`, `gkehub.gateway.patch`, `gkehub.gateway.post`, `gkehub.gateway.put`, `gkehub.locations.get`, `gkehub.locations.list`, `gkehub.memberships.get`, `gkehub.memberships.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Project):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/appdevelopmentexperience.serviceAgent"
```

## Notes

- Roles and permissions of the `appdevelopmentexperience` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/appdevelopmentexperience (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
