# Figma

## Credentials

- `FIGMA_CLIENT_ID`
- `FIGMA_CLIENT_SECRET`

Obtain from [Figma Developer Apps](https://www.figma.com/developers/apps).

### Getting Your Credentials

1. Sign in to your Figma account
2. Navigate to the [Developer Apps page](https://www.figma.com/developers/apps)
3. Click "Create new app"
4. Complete app details (name, description, etc.)
5. Configure your redirect URI: `https://yourdomain.com/api/auth/callback/figma`
6. Copy your Client ID and Client Secret

## サーバー設定

```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    socialProviders: {
        figma: {
            clientId: process.env.FIGMA_CLIENT_ID as string,
            clientSecret: process.env.FIGMA_CLIENT_SECRET as string,
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
        provider: "figma"
    })
}
```

## リダイレクト URL

`https://yourdomain.com/api/auth/callback/figma`

## プロバイダー固有の設定・注意点

- **Default scope**: `current_user:read`
- For additional scopes like `file_content:read`, consult the [Figma OAuth scopes documentation](https://developers.figma.com/docs/rest-api/scopes)
- Ensure your redirect URI matches your application's callback URL exactly
- Reference the [official Figma API documentation](https://www.figma.com/developers/api) for comprehensive OAuth details
