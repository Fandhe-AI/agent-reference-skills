# Linear

## Credentials

- `LINEAR_CLIENT_ID`
- `LINEAR_CLIENT_SECRET`

Obtain from the [Linear Developer Portal](https://linear.app/settings/api).

## サーバー設定

```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    socialProviders: {
        linear: {
            clientId: process.env.LINEAR_CLIENT_ID as string,
            clientSecret: process.env.LINEAR_CLIENT_SECRET as string,
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
        provider: "linear"
    })
}
```

## リダイレクト URL

- **Local Development**: `http://localhost:3000/api/auth/callback/linear`
- **Production**: Your application's URL with the same callback path

## プロバイダー固有の設定・注意点

### Available Scopes

| Scope | Purpose |
|-------|---------|
| `read` | Default scope; read access for user account |
| `write` | Write access for user account |
| `issues:create` | Create new issues and attachments |
| `comments:create` | Create issue comments |
| `timeSchedule:write` | Create and modify time schedules |
| `admin` | Full admin-level endpoint access (use cautiously) |

### Configuring Custom Scopes

```typescript
export const auth = betterAuth({
    socialProviders: {
        linear: {
            clientId: process.env.LINEAR_CLIENT_ID as string,
            clientSecret: process.env.LINEAR_CLIENT_SECRET as string,
            scope: ["read", "write"]
        },
    },
})
```

Specify your desired scopes in the `scope` array to request additional permissions beyond the default read access.
