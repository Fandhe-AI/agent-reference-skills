---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/multiclustermetering
---

# Multi-Cluster Metering IAM roles and permissions

## Signature / Usage

Predefined roles of `multiclustermetering` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Multi-cluster metering Service Agent (`roles/multiclustermetering.serviceAgent`)

- Gives the Multi-cluster metering service agent access to CloudPlatform resources. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (11): `gkehub.features.get`, `gkehub.gateway.delete`, `gkehub.gateway.generateCredentials`, `gkehub.gateway.get`, `gkehub.gateway.patch`, `gkehub.gateway.post`, `gkehub.gateway.put`, `gkehub.locations.get`, `gkehub.locations.list`, `gkehub.memberships.get`, `gkehub.memberships.list`

### Example: inspect a role

Generated example (not in the official docs) describing the first role on this page; every role on this page is a service agent role, which is granted to the service agent by Google Cloud and must not be granted to users:

```bash
gcloud iam roles describe roles/multiclustermetering.serviceAgent
```

## Notes

- Roles and permissions of the `multiclustermetering` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/multiclustermetering (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
