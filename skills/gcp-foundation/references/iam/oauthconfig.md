---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/oauthconfig
---

# OAuthConfig IAM roles and permissions

## Signature / Usage

Predefined roles of `oauthconfig` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

### OAuth Config Editor (`roles/oauthconfig.editor`)

- Launch stage: Beta
- Read/write access to OAuth config resources
- Permissions (28): `clientauthconfig.brands.create`, `clientauthconfig.brands.delete`, `clientauthconfig.brands.get`, `clientauthconfig.brands.list`, `clientauthconfig.brands.update`, `clientauthconfig.clients.create`, `clientauthconfig.clients.createSecret`, `clientauthconfig.clients.delete`, `clientauthconfig.clients.get`, `clientauthconfig.clients.getWithSecret`, `clientauthconfig.clients.list`, `clientauthconfig.clients.listWithSecrets`, `clientauthconfig.clients.undelete`, `clientauthconfig.clients.update`, `firebase.clients.create`, `firebase.clients.get`, `firebase.clients.list`, `firebase.clients.update`, `firebaseappcheck.resourcePolicies.get`, `firebaseappcheck.resourcePolicies.update`, `oauthconfig.clientpolicy.get`, `oauthconfig.testusers.get`, `oauthconfig.testusers.update`, `oauthconfig.verification.get`, `oauthconfig.verification.submit`, `oauthconfig.verification.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### OAuth Config Viewer (`roles/oauthconfig.viewer`)

- Launch stage: Beta
- Read-only access to OAuth config resources
- Permissions (12): `clientauthconfig.brands.get`, `clientauthconfig.brands.list`, `clientauthconfig.clients.get`, `clientauthconfig.clients.list`, `firebase.clients.get`, `firebase.clients.list`, `firebaseappcheck.resourcePolicies.get`, `oauthconfig.clientpolicy.get`, `oauthconfig.testusers.get`, `oauthconfig.verification.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Project):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/oauthconfig.editor"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `oauthconfig.clientpolicy.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/oauthconfig.editor`, `roles/oauthconfig.viewer`, `roles/iam.supportUser` |
| `oauthconfig.testusers.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/oauthconfig.editor`, `roles/oauthconfig.viewer`, `roles/iam.supportUser` |
| `oauthconfig.testusers.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/oauthconfig.editor` |
| `oauthconfig.verification.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/firebase.admin`, `roles/firebase.editor`, `roles/firebase.viewer`, `roles/oauthconfig.editor`, `roles/oauthconfig.viewer`, `roles/appmetadata.workspaceMarketplaceAppConfigurationAdmin`, `roles/firebase.developAdmin`, `roles/firebase.developViewer`, `roles/iam.supportUser` |
| `oauthconfig.verification.submit` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/oauthconfig.editor` |
| `oauthconfig.verification.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/oauthconfig.editor` |

## Notes

- Roles and permissions of the `oauthconfig` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/oauthconfig (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
