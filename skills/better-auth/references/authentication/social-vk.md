# VK (VK ID Provider)

## Credentials

- `VK_CLIENT_ID`
- `VK_CLIENT_SECRET`

Obtain from the [VK ID Developer Portal](https://id.vk.com/about/business/go/docs).

## サーバー設定

```typescript
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  socialProviders: {
    vk: {
      clientId: process.env.VK_CLIENT_ID as string,
      clientSecret: process.env.VK_CLIENT_SECRET as string,
    },
  },
});
```

## クライアントサインイン

```typescript
import { createAuthClient } from "better-auth/client";

const authClient = createAuthClient();

const signIn = async () => {
  const data = await authClient.signIn.social({
    provider: "vk",
  });
};
```

## リダイレクト URL

- **Local Development**: `http://localhost:3000/api/auth/callback/vk`
- **Production**: Update to your application's URL
- If you modify the base path of auth routes, adjust the redirect URL accordingly

## プロバイダー固有の設定・注意点

- The `signIn.social` function initiates the authentication flow with the VK provider
- Provider value must be set to `"vk"`
- Environment variables should be securely stored and loaded from your configuration system
