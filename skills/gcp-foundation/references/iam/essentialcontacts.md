---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/essentialcontacts
---

# Essential Contacts IAM roles and permissions

## Signature / Usage

Predefined roles of `essentialcontacts` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Essential Contacts Admin (`roles/essentialcontacts.admin`)

- Full access to all essential contacts
- Permissions (6): `essentialcontacts.contacts.create`, `essentialcontacts.contacts.delete`, `essentialcontacts.contacts.get`, `essentialcontacts.contacts.list`, `essentialcontacts.contacts.send`, `essentialcontacts.contacts.update`

#### Essential Contacts Viewer (`roles/essentialcontacts.viewer`)

- Viewer for all essential contacts
- Permissions (2): `essentialcontacts.contacts.get`, `essentialcontacts.contacts.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/essentialcontacts.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `essentialcontacts.contacts.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/essentialcontacts.admin`, `roles/resourcemanager.folderAdmin`, `roles/resourcemanager.organizationAdmin` |
| `essentialcontacts.contacts.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/essentialcontacts.admin`, `roles/resourcemanager.folderAdmin`, `roles/resourcemanager.organizationAdmin` |
| `essentialcontacts.contacts.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/essentialcontacts.admin`, `roles/essentialcontacts.viewer`, `roles/resourcemanager.folderAdmin`, `roles/resourcemanager.organizationAdmin`, `roles/iam.supportUser`, `roles/resourcemanager.folderCreator`, `roles/resourcemanager.folderEditor`, `roles/resourcemanager.folderViewer` |
| `essentialcontacts.contacts.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/essentialcontacts.admin`, `roles/essentialcontacts.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/resourcemanager.folderAdmin`, `roles/resourcemanager.organizationAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/resourcemanager.folderCreator`, `roles/resourcemanager.folderEditor`, `roles/resourcemanager.folderViewer`, `roles/wiz.cloudInventoryViewer` |
| `essentialcontacts.contacts.send` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/essentialcontacts.admin`, `roles/resourcemanager.folderAdmin`, `roles/resourcemanager.organizationAdmin` |
| `essentialcontacts.contacts.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/essentialcontacts.admin`, `roles/resourcemanager.folderAdmin`, `roles/resourcemanager.organizationAdmin` |

## Notes

- Roles and permissions of the `essentialcontacts` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/essentialcontacts (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
