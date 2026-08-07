# Linear

## Signature / Usage

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

```typescript
import { createAuthClient } from "better-auth/client"
const authClient = createAuthClient()

const signIn = async () => {
    const data = await authClient.signIn.social({
        provider: "linear"
    })
}
```

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

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `clientId` | string | `LINEAR_CLIENT_ID` — obtain from the [Linear Developer Portal](https://linear.app/settings/api) |
| `clientSecret` | string | `LINEAR_CLIENT_SECRET` — obtain from the [Linear Developer Portal](https://linear.app/settings/api) |
| `scope` | string[] | Additional OAuth scopes; see Available Scopes below |

### Available Scopes

| Scope | Purpose |
| --- | --- |
| `read` | Default scope; read access for user account |
| `write` | Write access for user account |
| `issues:create` | Create new issues and attachments |
| `comments:create` | Create issue comments |
| `timeSchedule:write` | Create and modify time schedules |
| `admin` | Full admin-level endpoint access (use cautiously) |

## Notes

- Redirect URL:
  - Local Development: `http://localhost:3000/api/auth/callback/linear`
  - Production: your application's URL with the same callback path

## Related

- [Social Providers Common](./social-providers-common.md)
