---
source: https://opencode.ai/docs/console/scim/
---

# Directory sync

Directory sync (SCIM 2.0) adds people to the workspace when you assign them in your identity provider, and removes their access when you unassign them. Roles stay managed in the Console.

## Signature / Usage

```text
https://opencode.ai/console/scim/v2
```

### Before you start

- Set up [SSO](./sso.md) for the workspace.
- [Verify](./sso.md) every email domain your people sign in with. Directory sync only adds people on a verified domain; invite anyone else from [Members](./members.md).

### Create a token

Only workspace owners can set up directory sync or create and revoke its tokens.

1. Open **Settings › Security** and click **Set up** under **Directory sync**.
2. Copy the **SCIM base URL** and the token. The token is shown only once, so store it in a secrets manager.

Your identity provider sends the token on every request.

```text
Authorization: Bearer <token>
```

### Connect your identity provider

#### Okta

1. Add the **SCIM 2.0 Test App (Header Auth)** app.
2. Set the base URL, and enter `Bearer ` followed by the token in **API Token**.
3. Enable **Create Users**, **Update User Attributes**, and **Deactivate Users**. Leave **Import Groups** and password sync off.

#### Microsoft Entra ID

1. In your enterprise app, open **Provisioning** and set the mode to **Automatic**.
2. Enter the base URL as **Tenant URL** and the token as **Secret Token**.
3. Assign users and groups, then start provisioning.

#### Other providers

Use a SCIM 2.0 app with header token authentication, pointed at the base URL. Console supports the `/Users` and `/Groups` endpoints.

Assign one test person first. **Directory sync** shows **Connected to your identity provider** after the first request.

### What syncs

| In your identity provider | In the Console |
| --- | --- |
| Assign a person | Added as **Member**. Existing members keep their role. |
| Update a name | Profile updated. |
| Unassign or deactivate | Access suspended and shown as **Deactivated**. API keys they created are revoked. |
| Reassign | Access restored. Revoked keys stay revoked. |
| Delete | Removed from the workspace. Their account and other workspaces are unaffected. |

- Roles and email addresses are not changed by directory sync.
- The last owner cannot be deactivated or deleted.
- Workspaces with a [Go](../console/go-overview.md) subscription cannot add members through directory sync.

### Groups

Push groups to tag their members, for example with Okta **Push Groups** or Entra group assignment. Assign the people before pushing their groups.

```text
Platform Admins  →  platform-admins
```

Each group tags its members with a tag named after the group. Under **Settings › Security › Group tags** you can rename a tag, point several groups at one tag, or stop tagging a group. Leaving a group removes its tag.

### Rotate the token

1. Click **New token** and install it in your identity provider.
2. Wait until the new token shows a last use.
3. Revoke the old token.

Revoking a token stops future updates but does not change existing members. Deleting the SSO connection revokes all tokens.

### SSO and directory sync

Once a workspace has issued a token, SSO no longer [adds members automatically](./sso.md). The directory decides who belongs, even if the token is later revoked.

## Notes

- The SCIM token is shown only once; store it in a secrets manager and never commit it.
- Group tags are what budget policies can target with "Members tagged with" (see [Budgets](./budgets.md)).
- OpenCode Go is a Console subscription name, not the Go programming language (go-echo).

## Related

- [SSO](./sso.md)
- [Members](./members.md)
- [Budgets](./budgets.md)
