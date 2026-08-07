# LINE

A messaging platform popular in Asia for social authentication.

## Signature / Usage

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

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `clientId` | string | `LINE_CLIENT_ID` — your Channel ID, obtained from the LINE Developers Console |
| `clientSecret` | string | `LINE_CLIENT_SECRET` — your Channel secret, obtained from the LINE Developers Console |
| `redirectURI` | string (optional) | Override the callback URL |
| `scope` | string[] (optional) | Additional OAuth scopes |
| `disableDefaultScope` | boolean (optional) | Disable the default scope |

## Notes

- Redirect URL: configured in the LINE Developers Console; must match exactly what's configured
- **Default Scopes**: `openid profile email` (customizable via provider options)
- **ID Token Verification**: uses the official endpoint and checks audience and optional nonce per spec

## Related

- [Social Providers Common](./social-providers-common.md)
- [Other Social Providers](./other-social-providers.md)
