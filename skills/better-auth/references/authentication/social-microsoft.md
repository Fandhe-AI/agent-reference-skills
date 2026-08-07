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

## Related

- [Social Providers Common](./social-providers-common.md)
