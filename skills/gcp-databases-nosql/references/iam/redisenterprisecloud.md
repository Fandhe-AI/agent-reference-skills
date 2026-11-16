---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/redisenterprisecloud
---

# Redis Enterprise Cloud IAM roles and permissions

## Signature / Usage

Predefined roles of `redisenterprisecloud` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Redis Enterprise Cloud Admin (`roles/redisenterprisecloud.admin`)

- Launch stage: Beta
- This role is managed by Redis Labs, not Google.
- Permissions (13): `gcp.redisenterprise.com/*`, `gcp.redisenterprise.com/databases.create`, `gcp.redisenterprise.com/databases.delete`, `gcp.redisenterprise.com/databases.get`, `gcp.redisenterprise.com/databases.list`, `gcp.redisenterprise.com/databases.update`, `gcp.redisenterprise.com/subscriptions.create`, `gcp.redisenterprise.com/subscriptions.delete`, `gcp.redisenterprise.com/subscriptions.get`, `gcp.redisenterprise.com/subscriptions.list`, `gcp.redisenterprise.com/subscriptions.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Redis Enterprise Cloud Viewer (`roles/redisenterprisecloud.viewer`)

- Launch stage: Beta
- This role is managed by Redis Labs, not Google.
- Permissions (6): `gcp.redisenterprise.com/databases.get`, `gcp.redisenterprise.com/databases.list`, `gcp.redisenterprise.com/subscriptions.get`, `gcp.redisenterprise.com/subscriptions.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Project):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/redisenterprisecloud.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `gcp.redisenterprise.com/databases.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/redisenterprisecloud.admin` |
| `gcp.redisenterprise.com/databases.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/redisenterprisecloud.admin` |
| `gcp.redisenterprise.com/databases.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/redisenterprisecloud.admin`, `roles/redisenterprisecloud.viewer`, `roles/iam.supportUser` |
| `gcp.redisenterprise.com/databases.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/redisenterprisecloud.admin`, `roles/redisenterprisecloud.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `gcp.redisenterprise.com/databases.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/redisenterprisecloud.admin` |
| `gcp.redisenterprise.com/subscriptions.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/redisenterprisecloud.admin` |
| `gcp.redisenterprise.com/subscriptions.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/redisenterprisecloud.admin` |
| `gcp.redisenterprise.com/subscriptions.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/redisenterprisecloud.admin`, `roles/redisenterprisecloud.viewer`, `roles/iam.supportUser` |
| `gcp.redisenterprise.com/subscriptions.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/redisenterprisecloud.admin`, `roles/redisenterprisecloud.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `gcp.redisenterprise.com/subscriptions.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/redisenterprisecloud.admin` |

## Notes

- Roles and permissions of the `redisenterprisecloud` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/redisenterprisecloud (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
