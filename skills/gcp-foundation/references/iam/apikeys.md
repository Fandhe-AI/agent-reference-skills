---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/apikeys
---

# API Keys IAM roles and permissions

## Signature / Usage

Predefined roles of `apikeys` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Example: inspect a role that contains these permissions

Generated example (not in the official docs) describing the first predefined role listed in the table below:

```bash
gcloud iam roles describe roles/serviceusage.apiKeysAdmin
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `apikeys.keys.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/serviceusage.apiKeysAdmin` (+1 service agent role) |
| `apikeys.keys.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/serviceusage.apiKeysAdmin` |
| `apikeys.keys.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/firebase.admin`, `roles/firebase.editor`, `roles/firebase.viewer`, `roles/serviceusage.apiKeysAdmin`, `roles/firebase.developAdmin`, `roles/firebase.developViewer`, `roles/firebase.growthAdmin`, `roles/firebase.growthViewer`, `roles/firebase.qualityAdmin`, `roles/firebase.qualityViewer`, `roles/iam.supportUser`, `roles/serviceusage.apiKeysViewer` (+1 service agent role) |
| `apikeys.keys.getKeyString` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/firebase.admin`, `roles/serviceusage.apiKeysAdmin`, `roles/firebase.developAdmin`, `roles/iam.supportUser`, `roles/serviceusage.apiKeysViewer` (+1 service agent role) |
| `apikeys.keys.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/firebase.admin`, `roles/firebase.editor`, `roles/firebase.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/serviceusage.apiKeysAdmin`, `roles/firebase.developAdmin`, `roles/firebase.developViewer`, `roles/firebase.growthAdmin`, `roles/firebase.growthViewer`, `roles/firebase.qualityAdmin`, `roles/firebase.qualityViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/serviceusage.apiKeysViewer`, `roles/wiz.cloudInventoryViewer` (+2 service agent roles) |
| `apikeys.keys.lookup` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/firebase.admin`, `roles/serviceusage.apiKeysAdmin`, `roles/firebase.developAdmin`, `roles/iam.supportUser`, `roles/serviceusage.apiKeysViewer` |
| `apikeys.keys.undelete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/serviceusage.apiKeysAdmin` |
| `apikeys.keys.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/serviceusage.apiKeysAdmin` (+1 service agent role) |

## Notes

- Roles and permissions of the `apikeys` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/apikeys (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
