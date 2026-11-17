---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/containersecurity
---

# Container Security IAM roles and permissions

## Signature / Usage

Predefined roles of `containersecurity` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Containersecurity Admin (`roles/containersecurity.admin`)

- Launch stage: Beta
- Admin role for containersecurity
- Permissions (7): `container.clusters.list`, `containersecurity.clusterSummaries.list`, `containersecurity.findings.list`, `containersecurity.locations.get`, `containersecurity.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### GKE Security Posture Viewer (`roles/containersecurity.viewer`)

- Launch stage: Beta
- Read-only access to GKE Security Posture resources.
- Permissions (7): `container.clusters.list`, `containersecurity.clusterSummaries.list`, `containersecurity.findings.list`, `containersecurity.locations.get`, `containersecurity.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/containersecurity.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `containersecurity.clusterSummaries.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/containersecurity.admin`, `roles/containersecurity.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor` |
| `containersecurity.findings.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/containersecurity.admin`, `roles/containersecurity.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor` |
| `containersecurity.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/containersecurity.admin`, `roles/containersecurity.viewer`, `roles/iam.supportUser` |
| `containersecurity.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/containersecurity.admin`, `roles/containersecurity.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |

## Notes

- Roles and permissions of the `containersecurity` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/containersecurity (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
