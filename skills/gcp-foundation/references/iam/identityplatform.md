---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/identityplatform
---

# Identity Platform IAM roles and permissions

## Signature / Usage

Predefined roles of `identityplatform` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Identity Platform Admin (`roles/identityplatform.admin`)

- Launch stage: Beta
- Full access to Identity Platform resources.
- Permissions (18): `firebaseauth.configs.create`, `firebaseauth.configs.get`, `firebaseauth.configs.getHashConfig`, `firebaseauth.configs.getSecret`, `firebaseauth.configs.update`, `firebaseauth.users.create`, `firebaseauth.users.createSession`, `firebaseauth.users.delete`, `firebaseauth.users.get`, `firebaseauth.users.sendEmail`, `firebaseauth.users.update`, `identitytoolkit.tenants.create`, `identitytoolkit.tenants.delete`, `identitytoolkit.tenants.get`, `identitytoolkit.tenants.getIamPolicy`, `identitytoolkit.tenants.list`, `identitytoolkit.tenants.setIamPolicy`, `identitytoolkit.tenants.update`

#### Identity Platform Viewer (`roles/identityplatform.viewer`)

- Launch stage: Beta
- Read access to Identity Platform resources.
- Permissions (5): `firebaseauth.configs.get`, `firebaseauth.users.get`, `identitytoolkit.tenants.get`, `identitytoolkit.tenants.getIamPolicy`, `identitytoolkit.tenants.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Project):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/identityplatform.admin"
```

## Notes

- Roles and permissions of the `identityplatform` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/identityplatform (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
