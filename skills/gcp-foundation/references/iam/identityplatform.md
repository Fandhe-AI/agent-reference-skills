---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/identityplatform
---

# Identity Platform IAM roles and permissions

## Signature / Usage

Predefined roles of `identityplatform` (role ID, description, included permissions). The permissions table below lists the roles that contain each permission.

### Roles

### Identity Platform Admin (`roles/identityplatform.admin`)

- Launch stage: Beta
- Full access to Identity Platform resources.
- Permissions (20): `firebaseauth.*`, `firebaseauth.configs.create`, `firebaseauth.configs.get`, `firebaseauth.configs.getHashConfig`, `firebaseauth.configs.getSecret`, `firebaseauth.configs.update`, `firebaseauth.users.create`, `firebaseauth.users.createSession`, `firebaseauth.users.delete`, `firebaseauth.users.get`, `firebaseauth.users.sendEmail`, `firebaseauth.users.update`, `identitytoolkit.*`, `identitytoolkit.tenants.create`, `identitytoolkit.tenants.delete`, `identitytoolkit.tenants.get`, `identitytoolkit.tenants.getIamPolicy`, `identitytoolkit.tenants.list`, `identitytoolkit.tenants.setIamPolicy`, `identitytoolkit.tenants.update`

### Identity Platform Viewer (`roles/identityplatform.viewer`)

- Launch stage: Beta
- Read access to Identity Platform resources.
- Permissions (5): `firebaseauth.configs.get`, `firebaseauth.users.get`, `identitytoolkit.tenants.get`, `identitytoolkit.tenants.getIamPolicy`, `identitytoolkit.tenants.list`

## Notes

- Roles and permissions of the `identityplatform` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/identityplatform (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
