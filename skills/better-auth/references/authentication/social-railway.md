# Railway

## Signature / Usage

```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    socialProviders: {
        railway: {
            clientId: process.env.RAILWAY_CLIENT_ID as string,
            clientSecret: process.env.RAILWAY_CLIENT_SECRET as string,
        },
    },
})
```

```typescript
import { createAuthClient } from "better-auth/client"
const authClient = createAuthClient()

const signIn = async () => {
    const data = await authClient.signIn.social({
        provider: "railway"
    })
}
```

Restrict or extend scopes:

```typescript
railway: {
    clientId: process.env.RAILWAY_CLIENT_ID as string,
    clientSecret: process.env.RAILWAY_CLIENT_SECRET as string,
    scope: ["workspace:viewer", "project:viewer"],
}
```

For the `offline_access` scope, also set `prompt: "consent"`:

```typescript
railway: {
    clientId: process.env.RAILWAY_CLIENT_ID as string,
    clientSecret: process.env.RAILWAY_CLIENT_SECRET as string,
    scope: ["offline_access"],
    prompt: "consent",
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `clientId` | string | — | `RAILWAY_CLIENT_ID`, obtained from [Railway Developer Settings](https://railway.com/workspace/developer) |
| `clientSecret` | string | — | `RAILWAY_CLIENT_SECRET`, obtained from [Railway Developer Settings](https://railway.com/workspace/developer) |
| `scope` | string[] | `["openid", "email", "profile"]` | Additional scopes (see table below) |
| `prompt` | string | — | Set to `"consent"` to obtain refresh tokens with `offline_access` |

Available scopes:

| Scope | Purpose |
| --- | --- |
| `openid` | Required (default) |
| `email` | User email access (default) |
| `profile` | User name/picture (default) |
| `offline_access` | Refresh tokens |
| `workspace:viewer` | Workspace read access |
| `workspace:member` | Workspace member access |
| `workspace:admin` | Workspace admin access |
| `project:viewer` | Project read access |
| `project:member` | Project member access |

## Notes

- Getting credentials: navigate to [Railway Developer Settings](https://railway.com/workspace/developer), create a new OAuth App, select "Web Application" as the type, and set the redirect URL to `http://localhost:3000/api/auth/callback/railway` (development) or your production domain
- Redirect URL — development: `http://localhost:3000/api/auth/callback/railway`; production: your application's domain
- Railway implements PKCE, which Better Auth handles automatically
- Update the redirect URL if you modify the auth base path
- Store credentials securely in environment variables

## Related

- [Social Providers Common](./social-providers-common.md)
