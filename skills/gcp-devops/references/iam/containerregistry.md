---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/containerregistry
---

# Container Registry IAM roles and permissions

## Signature / Usage

Predefined roles of `containerregistry` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Container Registry Service Agent (`roles/containerregistry.ServiceAgent`)

- Access for Container Registry > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (4): `pubsub.topics.publish`, `storage.objects.get`, `storage.objects.getIamPolicy`, `storage.objects.list`

### Example: inspect a role

Generated example (not in the official docs) describing the first role on this page; every role on this page is a service agent role, which is granted to the service agent by Google Cloud and must not be granted to users:

```bash
gcloud iam roles describe roles/containerregistry.ServiceAgent
```

## Notes

- Roles and permissions of the `containerregistry` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Shut down product: "Container Registry is deprecated. Effective March 18, 2025, Container Registry is shut down and writing images to Container Registry is unavailable." The roles on this page are kept only for auditing existing IAM policies that still grant them; use Artifact Registry instead (see the `artifact-registry-docker-gcr-transition` category; https://docs.cloud.google.com/artifact-registry/docs/transition/transition-from-gcr, retrieved 2026-11-19).
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/containerregistry (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
