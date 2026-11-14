---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/oauthconfig
---

# OAuthConfig IAM roles and permissions

## Signature / Usage

Predefined roles of `oauthconfig` (role ID, description, included permissions). The permissions table below lists the roles that contain each permission.

### Roles

### OAuth Config Editor (`roles/oauthconfig.editor`)

- Launch stage: Beta
- Read/write access to OAuth config resources
- Permissions (31): `clientauthconfig.*`, `clientauthconfig.brands.create`, `clientauthconfig.brands.delete`, `clientauthconfig.brands.get`, `clientauthconfig.brands.list`, `clientauthconfig.brands.update`, `clientauthconfig.clients.create`, `clientauthconfig.clients.createSecret`, `clientauthconfig.clients.delete`, `clientauthconfig.clients.get`, `clientauthconfig.clients.getWithSecret`, `clientauthconfig.clients.list`, `clientauthconfig.clients.listWithSecrets`, `clientauthconfig.clients.undelete`, `clientauthconfig.clients.update`, `firebase.clients.create`, `firebase.clients.get`, `firebase.clients.list`, `firebase.clients.update`, `firebaseappcheck.resourcePolicies.*`, `firebaseappcheck.resourcePolicies.get`, `firebaseappcheck.resourcePolicies.update`, `oauthconfig.*`, `oauthconfig.clientpolicy.get`, `oauthconfig.testusers.get`, `oauthconfig.testusers.update`, `oauthconfig.verification.get`, `oauthconfig.verification.submit`, `oauthconfig.verification.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### OAuth Config Viewer (`roles/oauthconfig.viewer`)

- Launch stage: Beta
- Read-only access to OAuth config resources
- Permissions (12): `clientauthconfig.brands.get`, `clientauthconfig.brands.list`, `clientauthconfig.clients.get`, `clientauthconfig.clients.list`, `firebase.clients.get`, `firebase.clients.list`, `firebaseappcheck.resourcePolicies.get`, `oauthconfig.clientpolicy.get`, `oauthconfig.testusers.get`, `oauthconfig.verification.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `oauthconfig.clientpolicy.get` | [Admin](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/admin`) [Owner (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/owner`) [Writer](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/writer`) [Editor (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/editor`) [Reader](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/reader`) [Viewer (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/viewer`) [OAuth Config Editor](https://docs.cloud.google.com/iam/docs/roles-permissions/oauthconfig#oauthconfig.editor) (`roles/oauthconfig.editor`) [OAuth Config Viewer](https://docs.cloud.google.com/iam/docs/roles-permissions/oauthconfig#oauthconfig.viewer) (`roles/oauthconfig.viewer`) [Support User](https://docs.cloud.google.com/iam/docs/roles-permissions/jobfunctions#iam.supportUser) (`roles/iam.supportUser`) |
| `oauthconfig.testusers.get` | [Admin](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/admin`) [Owner (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/owner`) [Writer](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/writer`) [Editor (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/editor`) [Reader](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/reader`) [Viewer (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/viewer`) [OAuth Config Editor](https://docs.cloud.google.com/iam/docs/roles-permissions/oauthconfig#oauthconfig.editor) (`roles/oauthconfig.editor`) [OAuth Config Viewer](https://docs.cloud.google.com/iam/docs/roles-permissions/oauthconfig#oauthconfig.viewer) (`roles/oauthconfig.viewer`) [Support User](https://docs.cloud.google.com/iam/docs/roles-permissions/jobfunctions#iam.supportUser) (`roles/iam.supportUser`) |
| `oauthconfig.testusers.update` | [Admin](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/admin`) [Owner (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/owner`) [Writer](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/writer`) [Editor (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/editor`) [OAuth Config Editor](https://docs.cloud.google.com/iam/docs/roles-permissions/oauthconfig#oauthconfig.editor) (`roles/oauthconfig.editor`) |
| `oauthconfig.verification.get` | [Admin](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/admin`) [Owner (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/owner`) [Writer](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/writer`) [Editor (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/editor`) [Reader](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/reader`) [Viewer (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/viewer`) [Firebase Admin](https://docs.cloud.google.com/iam/docs/roles-permissions/firebase#firebase.admin) (`roles/firebase.admin`) [Firebase Editor](https://docs.cloud.google.com/iam/docs/roles-permissions/firebase#firebase.editor) (`roles/firebase.editor`) [Firebase Viewer](https://docs.cloud.google.com/iam/docs/roles-permissions/firebase#firebase.viewer) (`roles/firebase.viewer`) [OAuth Config Editor](https://docs.cloud.google.com/iam/docs/roles-permissions/oauthconfig#oauthconfig.editor) (`roles/oauthconfig.editor`) [OAuth Config Viewer](https://docs.cloud.google.com/iam/docs/roles-permissions/oauthconfig#oauthconfig.viewer) (`roles/oauthconfig.viewer`) [Workspace Marketplace App Configuration Admin](https://docs.cloud.google.com/iam/docs/roles-permissions/workspacemarketplace#appmetadata.workspaceMarketplaceAppConfigurationAdmin) (`roles/appmetadata.workspaceMarketplaceAppConfigurationAdmin`) [Firebase Develop Admin](https://docs.cloud.google.com/iam/docs/roles-permissions/firebase#firebase.developAdmin) (`roles/firebase.developAdmin`) [Firebase Develop Viewer](https://docs.cloud.google.com/iam/docs/roles-permissions/firebase#firebase.developViewer) (`roles/firebase.developViewer`) [Support User](https://docs.cloud.google.com/iam/docs/roles-permissions/jobfunctions#iam.supportUser) (`roles/iam.supportUser`) |
| `oauthconfig.verification.submit` | [Admin](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/admin`) [Owner (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/owner`) [Writer](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/writer`) [Editor (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/editor`) [OAuth Config Editor](https://docs.cloud.google.com/iam/docs/roles-permissions/oauthconfig#oauthconfig.editor) (`roles/oauthconfig.editor`) |
| `oauthconfig.verification.update` | [Admin](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/admin`) [Owner (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/owner`) [Writer](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/writer`) [Editor (Legacy)](https://docs.cloud.google.com/iam/docs/roles-overview#basic) (`roles/editor`) [OAuth Config Editor](https://docs.cloud.google.com/iam/docs/roles-permissions/oauthconfig#oauthconfig.editor) (`roles/oauthconfig.editor`) |

## Notes

- Roles and permissions of the `oauthconfig` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/oauthconfig (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
