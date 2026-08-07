# Notion

## Signature / Usage

```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    socialProviders: {
        notion: {
            clientId: process.env.NOTION_CLIENT_ID as string,
            clientSecret: process.env.NOTION_CLIENT_SECRET as string,
        },
    },
})
```

```typescript
import { createAuthClient } from "better-auth/client"
const authClient = createAuthClient()

const signIn = async () => {
    const data = await authClient.signIn.social({
        provider: "notion"
    })
}
```

Request additional Notion capabilities post-signup with `linkSocial`:

```typescript
const requestNotionAccess = async () => {
    await authClient.linkSocial({
        provider: "notion",
    });
};
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `clientId` | string | — | `NOTION_CLIENT_ID`, obtained from the [Notion Developers Portal](https://www.notion.so/my-integrations) |
| `clientSecret` | string | — | `NOTION_CLIENT_SECRET`, obtained from the [Notion Developers Portal](https://www.notion.so/my-integrations) |

## Notes

- Redirect URL is set in the Notion integration settings' OAuth Domain & URIs — local development: `http://localhost:3000/api/auth/callback/notion`; production: `https://example.com/api/auth/callback/notion`
- Enable the "Read user information including email addresses" capability in your Notion integration for user authentication
- Notion supports two integration models: **public integrations** (installable by any Notion workspace) and **internal integrations** (limited to your own workspace) — choose public for multi-workspace authentication scenarios
- After authentication, use the access token to interact with the Notion API for managing pages, databases, and other workspace content

## Related

- [Social Providers Common](./social-providers-common.md)
