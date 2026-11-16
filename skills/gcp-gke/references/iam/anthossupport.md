---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/anthossupport
---

# Anthos Support IAM roles and permissions

## Signature / Usage

Predefined roles of `anthossupport` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Anthos Support Service Agent (`roles/anthossupport.serviceAgent`)

- Gives the Anthos Support Service Agent access to Cloud Platform resource. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (41): `gkehub.features.get`, `gkehub.features.getIamPolicy`, `gkehub.features.list`, `gkehub.fleet.get`, `gkehub.fleet.getFreeTrial`, `gkehub.gateway.generateCredentials`, `gkehub.gateway.get`, `gkehub.locations.get`, `gkehub.locations.list`, `gkehub.membershipbindings.get`, `gkehub.membershipbindings.list`, `gkehub.membershipfeatures.get`, `gkehub.membershipfeatures.list`, `gkehub.memberships.generateConnectManifest`, `gkehub.memberships.get`, `gkehub.memberships.getIamPolicy`, `gkehub.memberships.list`, `gkehub.memberships.update`, `gkehub.namespaces.get`, `gkehub.namespaces.list`, `gkehub.operations.get`, `gkehub.operations.list`, `gkehub.rbacrolebindings.get`, `gkehub.rbacrolebindings.list`, `gkehub.scopes.get`, `gkehub.scopes.getIamPolicy`, `gkehub.scopes.list`, `gkehub.scopes.listBoundMemberships`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `serviceusage.catalogs.listMembers`, `serviceusage.consumerpolicy.analyze`, `serviceusage.consumerpolicy.get`, `serviceusage.effectivepolicy.get`, `serviceusage.groups.list`, `serviceusage.groups.listExpandedMembers`, `serviceusage.groups.listMembers`, `serviceusage.services.get`, `serviceusage.services.listApis`, `serviceusage.services.listDependentServices`, `serviceusage.values.test`

### Example: inspect a role

Generated example (not in the official docs) describing the first role on this page; every role on this page is a service agent role, which is granted to the service agent by Google Cloud and must not be granted to users:

```bash
gcloud iam roles describe roles/anthossupport.serviceAgent
```

## Notes

- Roles and permissions of the `anthossupport` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/anthossupport (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
