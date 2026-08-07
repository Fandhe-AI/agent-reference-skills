# OAuth

Better Auth provides built-in OAuth 2.0 and OpenID Connect support for authenticating users through popular providers such as Google, Facebook, and GitHub. Unsupported providers can be integrated with custom code via the Generic OAuth Plugin.

## Signature / Usage

### Setup

```typescript
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  socialProviders: {
    google: {
      clientId: "YOUR_GOOGLE_CLIENT_ID",
      clientSecret: "YOUR_GOOGLE_CLIENT_SECRET",
    },
  },
});
```

### Sign-in operations

**Client-side:**

```typescript
await authClient.signIn.social({
  provider: "google",
});
```

**Server-side:**

```typescript
await auth.api.signInSocial({
  body: { provider: "google" },
});
```

### Account linking

**Client-side:**

```typescript
await authClient.linkSocial({
  provider: "google",
});
```

**Server-side:**

```typescript
await auth.api.linkSocialAccount({
  body: { provider: "google" },
  headers: await headers(),
});
```

### Getting the access token

Automatically refreshes expired tokens:

```typescript
const { accessToken } = await authClient.getAccessToken({
  providerId: "google",
  accountId: "accountId", // optional
});
```

### Provider account info

```typescript
const info = await authClient.accountInfo({
  accountId: "accountId",
});
```

### Additional scopes

Request additional permissions after the initial sign-up (re-invoke `linkSocial`). Requires Better Auth 1.2.7 or later:

```typescript
await authClient.linkSocial({
  provider: "google",
  scopes: ["https://www.googleapis.com/auth/drive.file"],
});
```

### Passing custom data through the OAuth flow

Send temporary data without persisting it to the database:

```typescript
// Client-side
await authClient.signIn.social({
  provider: "google",
  additionalData: {
    referralCode: "ABC123",
    source: "landing-page",
  },
});

// Server-side
await auth.api.signInSocial({
  body: {
    provider: "google",
    additionalData: {
      referralCode: "ABC123",
    },
  },
});
```

### Accessing additional data in hooks

Use `getOAuthState` during the OAuth callback:

```typescript
import { getOAuthState } from "better-auth/api";

export const auth = betterAuth({
  hooks: {
    after: [
      {
        matcher: () => true,
        handler: async (ctx) => {
          if (ctx.path === "/callback/:id") {
            const additionalData = await getOAuthState<{
              referralCode?: string;
              source?: string;
            }>();
            // Validate and process the data
          }
        },
      },
    ],
  },
});
```

### Profile mapping example

```typescript
socialProviders: {
  google: {
    clientId: "YOUR_CLIENT_ID",
    clientSecret: "YOUR_CLIENT_SECRET",
    mapProfileToUser: (profile) => {
      return {
        firstName: profile.given_name,
        lastName: profile.family_name,
      };
    },
  },
}
```

Configure `user.additionalFields` to set additional user fields.

## Options / Props

| Option | Type | Description |
|--------|------|-------------|
| `scope` | `string[]` | OAuth scopes to request (e.g. `["email", "profile"]`) |
| `redirectURI` | `string` | Custom callback URI. Default: `/api/auth/callback/${provider}` |
| `disableSignUp` | `boolean` | Prevent new user registration |
| `disableIdTokenSignIn` | `boolean` | Disable using the ID token for sign-in |
| `verifyIdToken` | `function` | Custom ID token verification function |
| `overrideUserInfoOnSignIn` | `boolean` | Update user data on every sign-in (default: false) |
| `mapProfileToUser` | `function` | Map the provider profile to the database user object |
| `refreshAccessToken` | `function` | Custom token refresh implementation |
| `clientKey` | `string` | Alternative to `clientId` for TikTok |
| `getUserInfo` | `function` | Override the default user info fetching |
| `disableImplicitSignUp` | `boolean` | Require an explicit `requestSignUp` flag |
| `prompt` | `string` | Auth flow prompt (`"select_account"`, `"consent"`, `"login"`, `"none"`) |
| `responseMode` | `string` | Response delivery method (`"query"`, `"form_post"`) |
| `disableDefaultScope` | `boolean` | Ignore provider defaults and use only the specified scopes |

### Built-in OAuth state data

| Field | Description |
|-------|-------------|
| `callbackURL` | OAuth flow callback destination |
| `codeVerifier` | PKCE code verifier |
| `errorURL` | Error redirect destination |
| `newUserURL` | New user redirect destination |
| `link` | Email and user ID information |
| `requestSignUp` | New user sign-up flag |
| `expiresAt` | State expiration timestamp |

## Notes

- Built-in social providers support a custom token refresh function, but the Generic OAuth Plugin does not currently provide this feature
- User info mapping requires configuring `user.additionalFields` for custom database fields
- All OAuth state data comes from the client and should be validated before use in critical operations
- TikTok uses `clientKey` instead of `clientId`

### Security

- Validate and sanitize all client-provided data before use

## Related

- [Users & Accounts](./users-accounts.md)
- [Client](./client.md)
