# Paybin

An OAuth 2.0 social authentication provider.

## Signature / Usage

```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    socialProviders: {
        paybin: {
            clientId: process.env.PAYBIN_CLIENT_ID as string,
            clientSecret: process.env.PAYBIN_CLIENT_SECRET as string,
        },
    },
})
```

```typescript
import { createAuthClient } from "better-auth/client"
const authClient = createAuthClient()

const signIn = async () => {
    const data = await authClient.signIn.social({
        provider: "paybin"
    })
}
```

Custom scopes:

```typescript
export const auth = betterAuth({
    socialProviders: {
        paybin: {
            clientId: process.env.PAYBIN_CLIENT_ID as string,
            clientSecret: process.env.PAYBIN_CLIENT_SECRET as string,
            scope: ["openid", "email", "profile", "transactions"],
        },
    },
})
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `clientId` | string | — | `PAYBIN_CLIENT_ID`, obtained from your Paybin Portfolio application's Developer Settings or OAuth Applications section |
| `clientSecret` | string | — | `PAYBIN_CLIENT_SECRET`, obtained from your Paybin Portfolio application's Developer Settings or OAuth Applications section |
| `scope` | string[] | `["openid", "email", "profile"]` | Additional OAuth scopes, e.g. `"transactions"` |

## Notes

- Redirect URL — local development: `http://localhost:3000/api/auth/callback/paybin`; production: `https://yourdomain.com/api/auth/callback/paybin`
- Paybin follows OpenID Connect standards and automatically extracts: `id` from the `sub` claim, `name` from `name`/`preferred_username`/`email` (in priority order), `email` from the `email` claim, `image` from the `picture` claim, and `emailVerified` from the `email_verified` claim

## Related

- [Social Providers Common](./social-providers-common.md)
