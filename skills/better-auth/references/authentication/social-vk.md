# VK (VK ID Provider)

## Signature / Usage

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

```typescript
import { createAuthClient } from "better-auth/client";

const authClient = createAuthClient();

const signIn = async () => {
  const data = await authClient.signIn.social({
    provider: "vk",
  });
};
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `clientId` | string | — | `VK_CLIENT_ID`, obtained from the [VK ID Developer Portal](https://id.vk.com/about/business/go/docs) |
| `clientSecret` | string | — | `VK_CLIENT_SECRET`, obtained from the [VK ID Developer Portal](https://id.vk.com/about/business/go/docs) |

## Notes

- Redirect URL — local development: `http://localhost:3000/api/auth/callback/vk`; production: update to your application's URL. If you modify the base path of auth routes, adjust the redirect URL accordingly
- The `signIn.social` function initiates the authentication flow with the VK provider; the `provider` value must be `"vk"`
- Environment variables should be securely stored and loaded from your configuration system

## Related

- [Social Providers Common](./social-providers-common.md)
