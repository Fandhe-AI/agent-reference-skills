---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/identitytoolkit
---

# Identity Toolkit IAM roles and permissions

## Signature / Usage

Predefined roles of `identitytoolkit` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Identity Toolkit Admin (`roles/identitytoolkit.admin`)

- Full access to Identity Toolkit resources.
- Permissions (18): `firebaseauth.configs.create`, `firebaseauth.configs.get`, `firebaseauth.configs.getHashConfig`, `firebaseauth.configs.getSecret`, `firebaseauth.configs.update`, `firebaseauth.users.create`, `firebaseauth.users.createSession`, `firebaseauth.users.delete`, `firebaseauth.users.get`, `firebaseauth.users.sendEmail`, `firebaseauth.users.update`, `identitytoolkit.tenants.create`, `identitytoolkit.tenants.delete`, `identitytoolkit.tenants.get`, `identitytoolkit.tenants.getIamPolicy`, `identitytoolkit.tenants.list`, `identitytoolkit.tenants.setIamPolicy`, `identitytoolkit.tenants.update`

#### Identity Toolkit editor (`roles/identitytoolkit.editor`)

- Write access to Identity Toolkit resources.
- Permissions (22): `firebase.clients.get`, `firebase.clients.list`, `firebase.projects.get`, `firebaseauth.configs.create`, `firebaseauth.configs.get`, `firebaseauth.configs.getHashConfig`, `firebaseauth.configs.getSecret`, `firebaseauth.configs.update`, `firebaseauth.users.create`, `firebaseauth.users.createSession`, `firebaseauth.users.delete`, `firebaseauth.users.get`, `firebaseauth.users.sendEmail`, `firebaseauth.users.update`, `identitytoolkit.tenants.create`, `identitytoolkit.tenants.delete`, `identitytoolkit.tenants.get`, `identitytoolkit.tenants.getIamPolicy`, `identitytoolkit.tenants.list`, `identitytoolkit.tenants.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Identity Toolkit Viewer (`roles/identitytoolkit.viewer`)

- Read access to Identity Toolkit resources.
- Permissions (5): `firebaseauth.configs.get`, `firebaseauth.users.get`, `identitytoolkit.tenants.get`, `identitytoolkit.tenants.getIamPolicy`, `identitytoolkit.tenants.list`

#### Identity Platform Service Agent (`roles/identitytoolkit.serviceAgent`)

- Gives Identity Platform service account access to customer project resources. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (5): `cloudfunctions.functions.invoke`, `recaptchaenterprise.assessments.create`, `recaptchaenterprise.keys.create`, `recaptchaenterprise.keys.delete`, `recaptchaenterprise.keys.get`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Project):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/identitytoolkit.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `identitytoolkit.tenants.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/identityplatform.admin`, `roles/identitytoolkit.admin`, `roles/identitytoolkit.editor` (+1 service agent role) |
| `identitytoolkit.tenants.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/identityplatform.admin`, `roles/identitytoolkit.admin`, `roles/identitytoolkit.editor` (+1 service agent role) |
| `identitytoolkit.tenants.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/identityplatform.admin`, `roles/identityplatform.viewer`, `roles/identitytoolkit.admin`, `roles/identitytoolkit.editor`, `roles/identitytoolkit.viewer`, `roles/iam.supportUser` (+1 service agent role) |
| `identitytoolkit.tenants.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/identityplatform.admin`, `roles/identityplatform.viewer`, `roles/identitytoolkit.admin`, `roles/identitytoolkit.editor`, `roles/identitytoolkit.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+1 service agent role) |
| `identitytoolkit.tenants.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/identityplatform.admin`, `roles/identityplatform.viewer`, `roles/identitytoolkit.admin`, `roles/identitytoolkit.editor`, `roles/identitytoolkit.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+1 service agent role) |
| `identitytoolkit.tenants.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/iam.securityAdmin`, `roles/identityplatform.admin`, `roles/identitytoolkit.admin` (+1 service agent role) |
| `identitytoolkit.tenants.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/identityplatform.admin`, `roles/identitytoolkit.admin`, `roles/identitytoolkit.editor` (+1 service agent role) |

## Notes

- Roles and permissions of the `identitytoolkit` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/identitytoolkit (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
