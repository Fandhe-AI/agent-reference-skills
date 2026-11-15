---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/clientauthconfig
---

# Client Auth Config IAM roles and permissions

## Signature / Usage

Predefined roles of `clientauthconfig` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Example: inspect a role that contains these permissions

Generated example (not in the official docs) describing the first predefined role listed in the table below:

```bash
gcloud iam roles describe roles/oauthconfig.editor
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `clientauthconfig.brands.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/oauthconfig.editor` (+1 service agent role) |
| `clientauthconfig.brands.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/oauthconfig.editor` |
| `clientauthconfig.brands.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/firebase.admin`, `roles/firebase.editor`, `roles/firebase.viewer`, `roles/oauthconfig.editor`, `roles/oauthconfig.viewer`, `roles/firebase.developAdmin`, `roles/firebase.developViewer`, `roles/iam.supportUser` (+1 service agent role) |
| `clientauthconfig.brands.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/firebase.admin`, `roles/firebase.editor`, `roles/firebase.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/oauthconfig.editor`, `roles/oauthconfig.viewer`, `roles/firebase.developAdmin`, `roles/firebase.developViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` (+1 service agent role) |
| `clientauthconfig.brands.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/firebase.admin`, `roles/oauthconfig.editor`, `roles/firebase.developAdmin` (+1 service agent role) |
| `clientauthconfig.clients.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/firebase.admin`, `roles/oauthconfig.editor`, `roles/appmetadata.workspaceMarketplaceAppConfigurationAdmin` (+1 service agent role) |
| `clientauthconfig.clients.createSecret` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/oauthconfig.editor` |
| `clientauthconfig.clients.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/firebase.admin`, `roles/oauthconfig.editor` (+1 service agent role) |
| `clientauthconfig.clients.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/firebase.admin`, `roles/oauthconfig.editor`, `roles/oauthconfig.viewer`, `roles/firebase.developAdmin`, `roles/firebase.growthAdmin`, `roles/iam.supportUser` (+1 service agent role) |
| `clientauthconfig.clients.getWithSecret` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/oauthconfig.editor` (+1 service agent role) |
| `clientauthconfig.clients.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/firebase.admin`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/oauthconfig.editor`, `roles/oauthconfig.viewer`, `roles/riscconfigs.admin`, `roles/riscconfigs.viewer`, `roles/firebase.developAdmin`, `roles/firebase.growthAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+5 service agent roles) |
| `clientauthconfig.clients.listWithSecrets` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/oauthconfig.editor` |
| `clientauthconfig.clients.undelete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/oauthconfig.editor` |
| `clientauthconfig.clients.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/firebase.admin`, `roles/oauthconfig.editor` (+1 service agent role) |

## Notes

- Roles and permissions of the `clientauthconfig` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/clientauthconfig (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
