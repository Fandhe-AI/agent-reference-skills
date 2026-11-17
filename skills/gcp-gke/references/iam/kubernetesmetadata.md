---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/kubernetesmetadata
---

# Kubernetes Metadata API IAM roles and permissions

## Signature / Usage

Predefined roles of `kubernetesmetadata` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Kubernetesmetadata Admin (`roles/kubernetesmetadata.admin`)

- Admin role for kubernetesmetadata
- Permissions (5): `kubernetesmetadata.metadata.config`, `kubernetesmetadata.metadata.publish`, `kubernetesmetadata.metadata.snapshot`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Kubernetesmetadata Viewer (`roles/kubernetesmetadata.viewer`)

- Viewer role for kubernetesmetadata
- Permissions (3): `kubernetesmetadata.metadata.config`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Metadata Publisher (`roles/kubernetesmetadata.publisher`)

- Publisher of Kubernetes clusters metadata
- Permissions (3): `kubernetesmetadata.metadata.config`, `kubernetesmetadata.metadata.publish`, `kubernetesmetadata.metadata.snapshot`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/kubernetesmetadata.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `kubernetesmetadata.metadata.config` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/kubernetesmetadata.admin`, `roles/kubernetesmetadata.viewer`, `roles/gkemulticloud.telemetryWriter`, `roles/iam.supportUser`, `roles/kubernetesmetadata.publisher` (+2 service agent roles) |
| `kubernetesmetadata.metadata.publish` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/kubernetesmetadata.admin`, `roles/gkemulticloud.telemetryWriter`, `roles/kubernetesmetadata.publisher` (+2 service agent roles) |
| `kubernetesmetadata.metadata.snapshot` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/kubernetesmetadata.admin`, `roles/gkemulticloud.telemetryWriter`, `roles/kubernetesmetadata.publisher` (+2 service agent roles) |

## Notes

- Roles and permissions of the `kubernetesmetadata` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/kubernetesmetadata (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
