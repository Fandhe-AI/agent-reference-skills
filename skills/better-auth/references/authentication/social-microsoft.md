# Microsoft

Via Azure Entra ID (formerly Active Directory).

## Signature / Usage

```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    socialProviders: {
        microsoft: {
            clientId: process.env.MICROSOFT_CLIENT_ID as string,
            clientSecret: process.env.MICROSOFT_CLIENT_SECRET as string,
            // Optional configuration
            tenantId: 'common',
            authority: "https://login.microsoftonline.com",
            prompt: "select_account",
        },
    },
})
```

```typescript
import { createAuthClient } from "better-auth/client";

const authClient = createAuthClient();

const signIn = async () => {
  const data = await authClient.signIn.social({
    provider: "microsoft",
    callbackURL: "/dashboard",
  });
};
```

### Client assertions

Use `clientAssertion` instead of `clientSecret` when your Entra ID app is configured for `private_key_jwt` or workload identity federation. The callback receives the token request context and must return a JWT assertion. Do not combine `clientAssertion` with `clientSecret`.

```typescript
import { createPrivateKeyJwtClientAssertionGetter } from "better-auth/oauth2"

microsoft: {
    clientId: process.env.MICROSOFT_CLIENT_ID as string,
    tenantId: process.env.MICROSOFT_TENANT_ID as string,
    clientAssertion: createPrivateKeyJwtClientAssertionGetter({
        privateKeyPem: process.env.MICROSOFT_PRIVATE_KEY_PEM as string,
        kid: process.env.MICROSOFT_PRIVATE_KEY_ID,
        algorithm: "RS256",
    }),
},
```

### Preselecting an organizational domain

To skip the account picker for users known to belong to a tenant or domain, forward Microsoft's `domain_hint` parameter:

```typescript
await authClient.signIn.social({
  provider: "microsoft",
  additionalParams: { domain_hint: "contoso.com" },
});
```

### Account identifiers

Better Auth uses the verified Microsoft Entra `oid` claim as the provider-owned account identifier. `mapProfileToUser` can map local user fields but cannot replace this identifier.

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `clientId` | string | — | `MICROSOFT_CLIENT_ID`, generated through the Microsoft Entra ID dashboard |
| `clientSecret` | string | — | `MICROSOFT_CLIENT_SECRET`, generated through the Microsoft Entra ID dashboard |
| `tenantId` | string | `'common'` | Tenant ID for multi-tenant applications |
| `authority` | string | `https://login.microsoftonline.com` | Authority URL; use `https://<tenant-id>.ciamlogin.com` for CIAM (Customer Identity and Access Management) implementations |
| `prompt` | string | — | Set to `"select_account"` to force account selection during authentication |

## Notes

- Redirect URL: `http://localhost:3000/api/auth/callback/microsoft` (local development)
- The `signIn.social` function accepts the provider name and optional `callbackURL` for post-authentication redirection
- See the Microsoft Entra ID documentation for detailed setup instructions
- Changed in 1.7: Microsoft accounts use the stable directory `oid` claim instead of the pairwise, app-specific `sub` claim. Migrate existing rows before accepting production traffic on 1.7: (1) inventory rows with `providerId: "microsoft"` for the built-in provider and `providerId: "microsoft-entra-id"` for the Generic OAuth helper; (2) replace each row's old `sub`-based `accountId` with the verified `oid` for that directory user; (3) when stored Microsoft ID tokens are available, verify each token and copy its `oid` claim (`mapProfileToUser` cannot override this provider-owned identifier); (4) when stored ID tokens are unavailable, pause Microsoft sign-in and account linking during the cutover and obtain the mapping from a trusted Microsoft Entra export (Better Auth cannot derive `oid` from the old account row; accepting traffic before the migration can create duplicate accounts).
- For the Generic OAuth `microsoftEntraId` helper with custom scopes or `getToken`, make sure the token exchange still returns Microsoft's `id_token` and discovery provides the issuer and JWKS metadata needed to verify it. The helper requires a concrete tenant GUID; replace `common`, `organizations`, or `consumers` configurations with the built-in Microsoft social provider, which validates tenant claims and derives the token's actual issuer.
- Entra does not emit the `email` claim for managed users by default, and the value is tenant-mutable and never verified by Microsoft; do not use it for authorization. Request `email` as an optional claim and use `profile.oid` (plus `profile.tid` across tenants) as the stable identity anchor.

## Related

- [Social Providers Common](./social-providers-common.md)
