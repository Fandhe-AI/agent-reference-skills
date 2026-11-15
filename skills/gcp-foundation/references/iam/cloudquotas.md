---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/cloudquotas
---

# Cloud Quotas IAM roles and permissions

## Signature / Usage

Predefined roles of `cloudquotas` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Cloud Quotas Admin (`roles/cloudquotas.admin`)

- Full access to Cloud Quotas resources.
- Permissions (5): `cloudquotas.quotas.get`, `cloudquotas.quotas.update`, `monitoring.timeSeries.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud Quotas Viewer (`roles/cloudquotas.viewer`)

- Readonly access to Cloud Quotas resources.
- Permissions (3): `cloudquotas.quotas.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Project):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/cloudquotas.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `cloudquotas.quotas.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/capacityplanner.admin`, `roles/capacityplanner.viewer`, `roles/cloudquotas.admin`, `roles/cloudquotas.viewer`, `roles/serviceusage.serviceUsageAdmin`, `roles/telcoautomation.admin`, `roles/capacityplanner.planner`, `roles/cloudhub.operator`, `roles/config.agent`, `roles/iam.supportUser`, `roles/servicemanagement.quotaAdmin`, `roles/servicemanagement.quotaViewer` (+1 service agent role) |
| `cloudquotas.quotas.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudquotas.admin`, `roles/serviceusage.serviceUsageAdmin`, `roles/telcoautomation.admin`, `roles/servicemanagement.quotaAdmin` |

## Notes

- Roles and permissions of the `cloudquotas` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/cloudquotas (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
