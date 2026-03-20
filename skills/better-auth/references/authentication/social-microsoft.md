# Microsoft

Via Azure Entra ID (formerly Active Directory).

## Credentials

- `MICROSOFT_CLIENT_ID`
- `MICROSOFT_CLIENT_SECRET`

Generate through the Microsoft Entra ID dashboard. See the Microsoft Entra ID documentation for detailed setup instructions.

## サーバー設定

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

## クライアントサインイン

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

## リダイレクト URL

`http://localhost:3000/api/auth/callback/microsoft` (ローカル開発)

## プロバイダー固有の設定・注意点

- **Authority URL**: Use `https://login.microsoftonline.com` for standard Entra ID scenarios or `https://<tenant-id>.ciamlogin.com` for CIAM (Customer Identity and Access Management) implementations
- **Tenant ID**: Defaults to `'common'` for multi-tenant applications
- **Prompt Parameter**: Set to `"select_account"` to force account selection during authentication
- The `signIn.social` function accepts the provider name and optional callback URL for post-authentication redirection
