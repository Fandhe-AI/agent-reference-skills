# Atlassian

## Signature / Usage

```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    socialProviders: {
        atlassian: {
            clientId: process.env.ATLASSIAN_CLIENT_ID as string,
            clientSecret: process.env.ATLASSIAN_CLIENT_SECRET as string,
        },
    },
})
```

```typescript
import { createAuthClient } from "better-auth/client"
const authClient = createAuthClient()

const signIn = async () => {
    const data = await authClient.signIn.social({
        provider: "atlassian"
    })
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `clientId` | string | `ATLASSIAN_CLIENT_ID` — obtain from the [Atlassian Developer Console](https://developer.atlassian.com/console/myapps/) |
| `clientSecret` | string | `ATLASSIAN_CLIENT_SECRET` — obtain from the [Atlassian Developer Console](https://developer.atlassian.com/console/myapps/) |

## Notes

- Redirect URL: `https://yourdomain.com/api/auth/callback/atlassian` — configure it in the Atlassian Developer Console; update it if the auth route base path changes
- **Default scopes**: `read:jira-user` and `offline_access`
- For additional scopes, consult the [Atlassian OAuth 2.0 (3LO) apps documentation](https://developer.atlassian.com/cloud/confluence/oauth-2-3lo-apps/)

## Related

- [Social Providers Common](./social-providers-common.md)
