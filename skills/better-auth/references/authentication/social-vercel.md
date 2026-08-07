# Vercel

## Signature / Usage

```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    socialProviders: {
        vercel: {
            clientId: process.env.VERCEL_CLIENT_ID as string,
            clientSecret: process.env.VERCEL_CLIENT_SECRET as string,
        },
    },
})
```

```typescript
import { createAuthClient } from "better-auth/client"
const authClient = createAuthClient()

const signIn = async () => {
    const data = await authClient.signIn.social({
        provider: "vercel"
    })
}
```

Request a subset of scopes:

```typescript
vercel: {
    clientId: process.env.VERCEL_CLIENT_ID as string,
    clientSecret: process.env.VERCEL_CLIENT_SECRET as string,
    scope: ["openid", "email", "profile"],
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `clientId` | string | — | `VERCEL_CLIENT_ID`, obtained by creating a Vercel App in the [Vercel Dashboard](https://vercel.com/dashboard) |
| `clientSecret` | string | — | `VERCEL_CLIENT_SECRET`, obtained by creating a Vercel App in the [Vercel Dashboard](https://vercel.com/dashboard) |
| `scope` | string[] | Vercel App-configured | Supported values: `openid` (default), `email`, `profile`, `offline_access` |

## Notes

- Redirect URL — local development: `http://localhost:3000/api/auth/callback/vercel`; production: set to your application's URL. Adjust the redirect path if you've customized your auth route base path
- Scopes are configured at the Vercel App level
- Vercel requires PKCE (Proof Key for Code Exchange) for enhanced security; this is automatically handled by Better Auth

## Related

- [Social Providers Common](./social-providers-common.md)
