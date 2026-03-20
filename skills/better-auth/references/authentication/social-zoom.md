# Zoom

## Credentials

- `ZOOM_CLIENT_ID`
- `ZOOM_CLIENT_SECRET`

### Setup Instructions

1. Visit [Zoom Marketplace](https://marketplace.zoom.us)
2. Hover on the `Develop` button and select `Build App`
3. Select `General App` and click `Create`
4. Under "Select how the app is managed," choose `User-managed`
5. Under "App Credentials," copy your `Client ID` and `Client Secret`

## サーバー設定

```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
  socialProviders: {
    zoom: {
      clientId: process.env.ZOOM_CLIENT_ID as string,
      clientSecret: process.env.ZOOM_CLIENT_SECRET as string,
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
    provider: "zoom"
  })
}
```

## リダイレクト URL

Set your OAuth Redirect URL in the Zoom app settings under "OAuth Information" > "OAuth Redirect URL":
- **Development**: `http://localhost:3000/api/auth/callback/zoom`
- **Production**: Update to your application's actual URL
- Adjust the path if you've customized your auth route base path

## プロバイダー固有の設定・注意点

### Required Scopes

The minimum required scope is:
- **`user:read:user`** (View a user)

Add any additional scopes your application needs through the Zoom app dashboard.
