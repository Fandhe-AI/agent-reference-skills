# Social Providers Common Configuration

## Signature / Usage

```typescript
// server
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  socialProviders: {
    providerName: {
      clientId: process.env.PROVIDER_CLIENT_ID as string,
      clientSecret: process.env.PROVIDER_CLIENT_SECRET as string,
    },
  },
});
```

```typescript
// client
import { createAuthClient } from "better-auth/client";
const authClient = createAuthClient();

const signIn = async () => {
  const data = await authClient.signIn.social({
    provider: "providerName",
  });
};
```

Request additional scopes / link an account:

```typescript
const requestAdditionalAccess = async () => {
  await authClient.linkSocial({
    provider: "providerName",
    scopes: ["additional-scope"],
  });
};
```

Sign in with an ID token (no redirect), supported by providers such as Google, Apple, Facebook, and LINE:

```typescript
const data = await authClient.signIn.social({
  provider: "providerName",
  idToken: {
    token: "ID_TOKEN",
    accessToken: "ACCESS_TOKEN",
  },
});
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `clientId` | string | OAuth application Client ID |
| `clientSecret` | string | OAuth application Client Secret |
| `scope` | string[] | Additional scopes to request |
| `redirectURI` | string | Override the callback URL |
| `disableDefaultScope` | boolean | Disable the default scope |
| `mapProfileToUser` | function | Map the provider profile to the user object |
| `getUserInfo` | function | Custom user information retrieval |
| `verifyIdToken` | function | Custom ID token verification |

## Notes

- The callback URL pattern is common to all providers: `/api/auth/callback/{provider}` — local development: `http://localhost:3000/api/auth/callback/{provider}`; production: `https://yourdomain.com/api/auth/callback/{provider}`. If you change the base path of the auth routes, update the redirect URL accordingly
- After authentication, the access token is stored securely on the server and can be used for provider API requests from the server side
- As of Better Auth 1.2.7, requesting additional scopes no longer triggers a "Social account already linked" error

## Related

- [Other Social Providers](./other-social-providers.md)
