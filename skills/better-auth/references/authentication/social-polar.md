# Polar

A provider for OAuth 2.0 social authentication.

## Signature / Usage

```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    socialProviders: {
        polar: {
            clientId: process.env.POLAR_CLIENT_ID as string,
            clientSecret: process.env.POLAR_CLIENT_SECRET as string,
        },
    },
})
```

```typescript
import { createAuthClient } from "better-auth/client"
const authClient = createAuthClient()

const signIn = async () => {
    const data = await authClient.signIn.social({
        provider: "polar"
    })
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `clientId` | string | — | `POLAR_CLIENT_ID`, obtained from [Polar User Settings](https://polar.sh/dashboard/account/developer) |
| `clientSecret` | string | — | `POLAR_CLIENT_SECRET`, obtained from [Polar User Settings](https://polar.sh/dashboard/account/developer) |

## Notes

- Getting credentials: navigate to Polar User Settings' OAuth section, create a new OAuth Client, and configure Application Name, Client Type, Redirect URIs (`http://localhost:3000/api/auth/callback/polar` for development, `https://yourdomain.com/api/auth/callback/polar` for production), Scopes (`openid`, `profile`, `email` by default), and Homepage URL; Logo/Terms of Service URL/Privacy Policy URL are optional
- Redirect URL — development: `http://localhost:3000/api/auth/callback/polar`; production: `https://yourdomain.com/api/auth/callback/polar`
- Update redirect URIs if changing the base path of auth routes
- Keep the Client Secret secure (never expose it in client code)
- Default scopes include `openid`, `profile`, and `email` permissions

## Related

- [Social Providers Common](./social-providers-common.md)
