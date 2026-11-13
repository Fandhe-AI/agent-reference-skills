---
source: https://opencode.ai/docs/console/scim/
---

# SCIM Directory Sync

Point an Okta, Microsoft Entra ID, or other SCIM 2.0 identity provider at the Console SCIM base URL with a bearer token.

```text
https://opencode.ai/console/scim/v2
```

```text
Authorization: Bearer <token>
```

Group pushed from the identity provider becomes a tag:

```text
Platform Admins  →  platform-admins
```

## Notes

- Only workspace owners can set up directory sync (**Settings › Security** › **Directory sync** › **Set up**). The token is shown only once; store it in a secrets manager.
- Prerequisites: SSO set up and every sign-in email domain verified.
- Okta: use **SCIM 2.0 Test App (Header Auth)** and enter `Bearer ` followed by the token in **API Token**. Entra ID: set Provisioning to **Automatic**, base URL as **Tenant URL**, token as **Secret Token**.
- Rotate by creating a **New token**, waiting for its last use to appear, then revoking the old one.
- Deactivating a person revokes the API keys they created. Workspaces with a Go subscription cannot add members through directory sync.
