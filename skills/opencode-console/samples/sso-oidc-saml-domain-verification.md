---
source: https://opencode.ai/docs/console/sso/
---

# SSO Callback URLs and Domain Verification

Register the OIDC callback or SAML ACS values with your identity provider and publish the domain verification TXT record.

OIDC callback URL:

```text
https://opencode.ai/console/auth/sso/ssoconn_.../callback
```

SAML values:

```text
ACS URL:       https://opencode.ai/console/auth/sso/ssoconn_.../callback
SP Entity ID:  https://opencode.ai/console/auth/sso/ssoconn_.../metadata
```

Domain verification record:

```text
Name:   _opencode-console-challenge.example.com
Type:   TXT
Value:  oc-verify=...
```

## Notes

- Owners configure SSO in **Settings › Security** (**Configure SSO**); each workspace has one SSO connection. Use the scopes `openid`, `email`, and `profile` for OIDC.
- Your SAML provider must sign the response or the assertion, and send the user's email as an `email` attribute or as the NameID.
- Click **Verify Domain** after the TXT record is published; DNS propagation can take a while. Each domain can belong to only one workspace.
- Once active, admins and members must sign in through SSO; owners can still sign in without it.
