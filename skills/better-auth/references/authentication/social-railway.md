# Railway

## Credentials

- `RAILWAY_CLIENT_ID`
- `RAILWAY_CLIENT_SECRET`

### Getting Credentials

Navigate to [Railway Developer Settings](https://railway.com/workspace/developer) and:
1. Create a new OAuth App
2. Select "Web Application" as the type
3. Set redirect URL to `http://localhost:3000/api/auth/callback/railway` (development) or your production domain

## サーバー設定

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

## クライアントサインイン

```typescript
import { createAuthClient } from "better-auth/client"
const authClient = createAuthClient()

const signIn = async () => {
    const data = await authClient.signIn.social({
        provider: "railway"
    })
}
```

## リダイレクト URL

- **Development**: `http://localhost:3000/api/auth/callback/railway`
- **Production**: Your application's domain

## プロバイダー固有の設定・注意点

### Available Scopes

| Scope | Purpose |
|-------|---------|
| `openid` | Required (default) |
| `email` | User email access (default) |
| `profile` | User name/picture (default) |
| `offline_access` | Refresh tokens |
| `workspace:viewer` | Workspace read access |
| `workspace:member` | Workspace member access |
| `workspace:admin` | Workspace admin access |
| `project:viewer` | Project read access |
| `project:member` | Project member access |

### Scope Configuration

```typescript
railway: {
    clientId: process.env.RAILWAY_CLIENT_ID as string,
    clientSecret: process.env.RAILWAY_CLIENT_SECRET as string,
    scope: ["workspace:viewer", "project:viewer"],
}
```

### Special Requirements

For `offline_access` scope, include `prompt: "consent"`:

```typescript
railway: {
    clientId: process.env.RAILWAY_CLIENT_ID as string,
    clientSecret: process.env.RAILWAY_CLIENT_SECRET as string,
    scope: ["offline_access"],
    prompt: "consent",
}
```

### Security Notes

- Railway implements PKCE, which Better Auth handles automatically
- Update redirect URL if you modify auth base path
- Store credentials securely in environment variables
