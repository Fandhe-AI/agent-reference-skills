# LINE

A messaging platform popular in Asia for social authentication.

## Credentials

- `LINE_CLIENT_ID` - Your Channel ID
- `LINE_CLIENT_SECRET` - Your Channel secret

Obtain from the LINE Developers Console.

## サーバー設定

```typescript
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  socialProviders: {
    line: {
      clientId: process.env.LINE_CLIENT_ID as string,
      clientSecret: process.env.LINE_CLIENT_SECRET as string,
      // redirectURI: "https://your.app/api/auth/callback/line",
      // scope: ["custom"],
      // disableDefaultScope: true,
    },
  },
});
```

## クライアントサインイン

### Standard OAuth Flow

```typescript
import { createAuthClient } from "better-auth/client";
const authClient = createAuthClient();

async function signInWithLINE() {
  const res = await authClient.signIn.social({ provider: "line" });
}
```

### Direct ID Token Sign-In

```typescript
await authClient.signIn.social({
  provider: "line",
  idToken: {
    token: "<LINE_ID_TOKEN>",
    accessToken: "<LINE_ACCESS_TOKEN>",
  },
});
```

## リダイレクト URL

LINE Developers Console で設定する。Redirect URI must match exactly what's configured.

## プロバイダー固有の設定・注意点

- **Default Scopes**: `openid profile email` (customizable via provider options)
- **ID Token Verification**: Uses the official endpoint and checks audience and optional nonce per spec

### Multi-Channel Support

LINE requires separate OAuth channels for different countries (Japan, Thailand, Taiwan). Use the Generic OAuth plugin with the `line()` helper:

```typescript
import { betterAuth } from "better-auth";
import { genericOAuth, line } from "better-auth/plugins";

export const auth = betterAuth({
  plugins: [
    genericOAuth({
      config: [
        line({
          providerId: "line-jp",
          clientId: process.env.LINE_JP_CLIENT_ID,
          clientSecret: process.env.LINE_JP_CLIENT_SECRET,
        }),
        // Additional channels...
      ],
    }),
  ],
});
```

Sign in using the appropriate `providerId` like `"line-jp"`, `"line-th"`, or `"line-tw"`.
