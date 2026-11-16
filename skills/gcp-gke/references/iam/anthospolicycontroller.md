---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/anthospolicycontroller
---

# Policy Controller IAM roles and permissions

## Signature / Usage

Predefined roles of `anthospolicycontroller` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Anthos Policy Controller Service Agent (`roles/anthospolicycontroller.serviceAgent`)

- Gives the Anthos Policy Controller service agent access toCloud Platform resources. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (11): `gkehub.features.get`, `gkehub.gateway.delete`, `gkehub.gateway.generateCredentials`, `gkehub.gateway.get`, `gkehub.gateway.patch`, `gkehub.gateway.post`, `gkehub.gateway.put`, `gkehub.locations.get`, `gkehub.locations.list`, `gkehub.memberships.get`, `gkehub.memberships.list`

### Example: inspect a role

Generated example (not in the official docs) describing the first role on this page; every role on this page is a service agent role, which is granted to the service agent by Google Cloud and must not be granted to users:

```bash
gcloud iam roles describe roles/anthospolicycontroller.serviceAgent
```

## Notes

- Roles and permissions of the `anthospolicycontroller` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Deprecated product: "Policy Controller is deprecated as of November 12, 2026, and reaches end of support on December 31, 2027. In version 1.39 and later, Google Kubernetes Engine (GKE) clusters don't support Policy Controller." Migrate admission policies to Kubernetes ValidatingAdmissionPolicies or self-managed OPA Gatekeeper (see `config-sync-policy/policy-controller-deprecation.md`; https://docs.cloud.google.com/kubernetes-engine/docs/deprecations/policy-controller, retrieved 2026-11-16).
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/anthospolicycontroller (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
