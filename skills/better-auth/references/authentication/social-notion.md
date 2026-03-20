# Notion

## Credentials

- `NOTION_CLIENT_ID`
- `NOTION_CLIENT_SECRET`

Obtain from the [Notion Developers Portal](https://www.notion.so/my-integrations).

## サーバー設定

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

## クライアントサインイン

```typescript
import { createAuthClient } from "better-auth/client"
const authClient = createAuthClient()

const signIn = async () => {
    const data = await authClient.signIn.social({
        provider: "notion"
    })
}
```

## リダイレクト URL

Notion integration settings の OAuth Domain & URIs で設定:
- **Local development**: `http://localhost:3000/api/auth/callback/notion`
- **Production**: `https://example.com/api/auth/callback/notion`

## プロバイダー固有の設定・注意点

### Required Capabilities

Enable the "Read user information including email addresses" capability in your Notion integration for user authentication.

### Integration Types

Notion supports two integration models:
- **Public integrations**: Installable by any Notion workspace
- **Internal integrations**: Limited to your own workspace

Choose public for multi-workspace authentication scenarios.

### Additional Scopes

Request additional Notion capabilities post-signup using the `linkSocial` method:

```typescript
const requestNotionAccess = async () => {
    await authClient.linkSocial({
        provider: "notion",
    });
};
```

After authentication, leverage the access token to interact with the Notion API for managing pages, databases, and other workspace content.
