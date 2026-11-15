---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/serviceconsumermanagement
---

# Service Consumer Management IAM roles and permissions

## Signature / Usage

Predefined roles of `serviceconsumermanagement` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

### Service Consumer Management Admin (`roles/serviceconsumermanagement.admin`)

- Launch stage: Beta
- Admin role for Service Consumer Management
- Permissions (10): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `serviceconsumermanagement.consumers.get`, `serviceconsumermanagement.quota.get`, `serviceconsumermanagement.quota.update`, `serviceconsumermanagement.tenancyu.addResource`, `serviceconsumermanagement.tenancyu.create`, `serviceconsumermanagement.tenancyu.delete`, `serviceconsumermanagement.tenancyu.list`, `serviceconsumermanagement.tenancyu.removeResource`

### Service Consumer Management Viewer (`roles/serviceconsumermanagement.viewer`)

- Launch stage: Beta
- Viewer role for Service Consumer Management
- Permissions (5): `resourcemanager.projects.get`, `resourcemanager.projects.list`, `serviceconsumermanagement.consumers.get`, `serviceconsumermanagement.quota.get`, `serviceconsumermanagement.tenancyu.list`

### Admin of Tenancy Units (`roles/serviceconsumermanagement.tenancyUnitsAdmin`)

- Launch stage: Beta
- Administrate tenancy units
- Permissions (5): `serviceconsumermanagement.tenancyu.addResource`, `serviceconsumermanagement.tenancyu.create`, `serviceconsumermanagement.tenancyu.delete`, `serviceconsumermanagement.tenancyu.list`, `serviceconsumermanagement.tenancyu.removeResource`

### Viewer of Tenancy Units (`roles/serviceconsumermanagement.tenancyUnitsViewer`)

- Launch stage: Beta
- View tenancy units
- Permissions (1): `serviceconsumermanagement.tenancyu.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Project):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/serviceconsumermanagement.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `serviceconsumermanagement.consumers.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/serviceconsumermanagement.admin`, `roles/serviceconsumermanagement.viewer`, `roles/servicemanagement.admin`, `roles/iam.supportUser` |
| `serviceconsumermanagement.quota.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/serviceconsumermanagement.admin`, `roles/serviceconsumermanagement.viewer`, `roles/servicemanagement.admin`, `roles/iam.supportUser` |
| `serviceconsumermanagement.quota.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/serviceconsumermanagement.admin`, `roles/servicemanagement.admin` |
| `serviceconsumermanagement.tenancyu.addResource` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/serviceconsumermanagement.admin`, `roles/servicemanagement.admin`, `roles/serviceconsumermanagement.tenancyUnitsAdmin` (+1 service agent role) |
| `serviceconsumermanagement.tenancyu.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/serviceconsumermanagement.admin`, `roles/servicemanagement.admin`, `roles/serviceconsumermanagement.tenancyUnitsAdmin` (+1 service agent role) |
| `serviceconsumermanagement.tenancyu.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/serviceconsumermanagement.admin`, `roles/servicemanagement.admin`, `roles/serviceconsumermanagement.tenancyUnitsAdmin` (+1 service agent role) |
| `serviceconsumermanagement.tenancyu.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/serviceconsumermanagement.admin`, `roles/serviceconsumermanagement.viewer`, `roles/servicemanagement.admin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/serviceconsumermanagement.tenancyUnitsAdmin`, `roles/serviceconsumermanagement.tenancyUnitsViewer` |
| `serviceconsumermanagement.tenancyu.removeResource` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/serviceconsumermanagement.admin`, `roles/servicemanagement.admin`, `roles/serviceconsumermanagement.tenancyUnitsAdmin` (+1 service agent role) |

## Notes

- Roles and permissions of the `serviceconsumermanagement` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/serviceconsumermanagement (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
