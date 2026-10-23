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

### Validate OAuth User Info

`user.validateUserInfo` rejects an OAuth identity before Better Auth creates a user, links a new account, or signs a returning user back in. It receives the mapped `user` and, in `source.oauth`, the provider id and raw provider profile. It runs when an identity is first provisioned (`create-user` from a regular callback, ID-token sign-in, One Tap, or OAuth Proxy), when a new account is linked (`link-account`), and on every sign-in of an existing OAuth user (`sign-in`, where `user` carries the fresh provider email). It works in stateless setups.

```typescript
export const auth = betterAuth({
  user: {
    validateUserInfo: ({ user, source }) => {
      if (source.oauth?.providerId !== "google") return;
      if (!user.email?.endsWith("@example.com")) {
        return { error: "email_not_allowed", errorDescription: "Use your example.com email to sign in" };
      }
    },
  },
  socialProviders: { google: { clientId: process.env.GOOGLE_CLIENT_ID!, clientSecret: process.env.GOOGLE_CLIENT_SECRET! } },
});
```

### Getting the access token

Every token or provider-profile request must select the account explicitly: pass the Better Auth account record's `id` as `accountId` (from `listAccounts`), or pass `useAccountCookie: true` to select the account from its signed cookie (when `account.storeAccountCookie` is enabled). A `providerId` is never an account selector, and a request without either selector is invalid. An expired access token is refreshed before it is returned.

```typescript
const { data: accounts } = await authClient.listAccounts();
const account = accounts?.find((a) => a.providerId === "google");
if (!account) {
  throw new Error("No linked Google account");
}

// authClient methods return `{ data, error }` instead of the bare payload
const { data: tokenData, error } = await authClient.getAccessToken({
  accountId: account.id,
});
if (error || !tokenData) {
  throw new Error(error?.message ?? "Could not get an access token");
}
const accessToken = tokenData.accessToken;

// signed account cookie
await authClient.getAccessToken({ useAccountCookie: true });
```

Server-side: `auth.api.getAccessToken({ body: { accountId: account.id }, headers: await headers() })`; a trusted server call can also provide `userId` when it does not include session headers.

### Refresh Access Token

`refreshToken` refreshes the selected account's access token immediately, with the same selector contract as `getAccessToken`.

```typescript
const tokens = await authClient.refreshToken({ accountId: account.id });

await auth.api.refreshToken({
  body: { useAccountCookie: true },
  headers: await headers(),
});
```

### Provider account info

Pass the Better Auth account record's `id`, not the provider's subject identifier. The response keeps identity and profile data separate: `account` is the selected Better Auth record and its provider key, `user` holds mutable profile fields, `data` is the raw provider response.

```typescript
const info = await authClient.accountInfo({
  query: { accountId: account.id }, // or { useAccountCookie: true }
});

const providerAccountId = info.data?.account.accountId;
// `info.data?.user` holds mutable profile fields (name, email, ...); do not log them (PII)
const profile = info.data?.user;
```

### Customizing the Authorization URL

Pass `additionalParams` to `signIn.social` or `linkSocial` to forward extra query parameters to the provider's authorization endpoint. They are applied after the state, PKCE challenge, and `redirect_uri` are written; the reserved keys `state`, `client_id`, `redirect_uri`, `response_type`, `code_challenge`, `code_challenge_method`, and `scope` are rejected with a 400. Provider baked-in parameters (e.g. Google's `include_granted_scopes=true`, Facebook's `config_id`, Cognito's `identity_provider` via `identityProvider`) are merged with call-time `additionalParams`; the call-time value wins on collisions.

```typescript
await authClient.signIn.social({
  provider: "cognito",
  additionalParams: { identity_provider: "Google" },
});

await authClient.linkSocial({
  provider: "google",
  loginHint: "user@example.com",
  additionalParams: { access_type: "offline", prompt: "consent" },
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
import { createAuthMiddleware, getOAuthState } from "better-auth/api";

export const auth = betterAuth({
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/callback/:id") {
        const additionalData = await getOAuthState<{
          referralCode?: string;
          source?: string;
        }>();
        // Validate and process the data
      }
    }),
  },
});
```

### Passing Server-Trusted Data

`additionalData` is client-supplied. To carry server-derived data across the redirect, use `addOAuthServerContext`: it writes to a server-only slot the client cannot populate, readable on the callback under `serverContext`.

```typescript
import { addOAuthServerContext, createAuthMiddleware, getOAuthState } from "better-auth/api";

export const auth = betterAuth({
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-in/social") {
        await addOAuthServerContext({ tenantId: ctx.context.tenantId });
      }
    }),
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/callback/:id") {
        const tenantId = (await getOAuthState())?.serverContext?.tenantId;
      }
    }),
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
| `requireEmailVerification` | `boolean` | Require this provider's email to be verified before a session is created (default `false`) |

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
| `serverContext` | Server-set values that survive the redirect (see Passing Server-Trusted Data) |
| `[key: string]` | The `additionalData` you passed in; client-originated, so treat as untrusted |

## Notes

- Built-in social providers support a custom token refresh function, but the Generic OAuth Plugin does not currently provide this feature
- User info mapping requires configuring `user.additionalFields` for custom database fields
- All OAuth state data comes from the client and should be validated before use in critical operations
- TikTok uses `clientKey` instead of `clientId`
- Per-provider `requireEmailVerification`: when the provider reports the email as unverified, Better Auth still creates or links the user and account but issues no session. The OAuth callback redirects with `?error=email_not_verified`; ID token sign-in returns `403` `EMAIL_NOT_VERIFIED`. A verification email is sent per `emailVerification` (`sendOnSignUp` for new users, `sendOnSignIn` for returning users). The gate checks the local user's verification state, not the provider's claim per request; it is independent of `emailAndPassword.requireEmailVerification`. Enable only for providers with a trustworthy `email_verified` signal.
- Providers without email: placeholder emails use the reserved `.invalid` domain (for example `${profile.id}@discord.placeholder.invalid`; the older `.placeholder.local` form is gone). The section "Synthesize a placeholder email" is now "Create a placeholder email with `mapProfileToUser`". Roblox falls back to a non-routable placeholder from `profile.sub`; Microsoft Entra ID's stable fallback ID is `profile.oid` (stable within `profile.tid`). The linked Better Auth user still requires an email address (issue #9124 tracks emailless users).
- `verifyIdToken` replaces the provider's built-in verification (signature, issuer, audience, and the `exp` / `nbf` / `iat` time checks, which allow 30 seconds of clock skew); your callback must perform those checks including any clock tolerance (e.g. `clockTolerance: 30`).
- Profile mapping cannot redefine the provider account identity; built-in providers derive identity from their documented immutable profile field, and Generic OAuth uses `accountSubject`.
- Changed in 1.7 (login client): account identity keeps the provider key. 1.7.0 through 1.7.2 added a required `issuer` column on `account`; 1.7.3 removes that requirement, so accounts are recognized by `providerId` and `accountId` as in 1.6 and the account schema is unchanged. Only databases that ran 1.7.0-1.7.2 need to relax the `issuer` constraint (drop the index `account_issuer_accountId_uidx` before the column). Check for duplicate `(providerId, accountId)` pairs before upgrading.
- Changed in 1.7: account APIs use explicit selectors (see Getting the access token); `providerId` is removed from selectors. `listAccounts` returns `id`, passed as `accountId` to `unlinkAccount`. `getUserInfo().user` contains only mutable local-user fields (keep the provider identifier in `getUserInfo().data`); `mapProfileToUser` can no longer return `id`; `accountInfo` exposes the selected identity as `account.accountId` instead of `user.id`. Plain OAuth providers use `id` and OIDC discovery providers the verified `sub`; set `accountSubject` when neither is the immutable identifier.
- Changed in 1.7: granted scopes are kept across re-login and token refresh (existing `account.scope`; no schema change).
- Renamed in 1.7: the OAuth callback redirect error `email_doesn't_match` is now `email_does_not_match`.
- Changed in 1.7: signed-assertion (`private_key_jwt`) login is validated at startup (unsupported algorithm, key with no material, algorithm/key mismatch fail immediately); `createAuthorizationCodeRequest`, `createRefreshAccessTokenRequest`, `createClientCredentialsTokenRequest` are replaced by async `authorizationCodeRequest`, `refreshAccessTokenRequest`, `clientCredentialsTokenRequest`. Identity tokens go through one verifier: custom provider implementations replace their `verifyIdToken` method with an `idToken` config (keys, issuer, audience), while the per-provider `verifyIdToken` option documented above remains; `generateState(c, options)` takes an options object.
- Changed in 1.7: Microsoft account identifiers use the stable `oid` claim instead of `sub` (data migration required; see social-microsoft.md).

### Security

- Validate and sanitize all client-provided data before use
- `authClient.getAccessToken` and `listAccounts` return `{ data, error }`, not the bare payload; the sample destructures `data`, handles `error`, and guards a missing account instead of using `accessToken` directly (Adapted from the official docs)
- The provider account info example reads `info.data` without logging the email address (PII); the official sample logs it with `console.log` (Adapted from the official docs)

## Related

- [Users & Accounts](./users-accounts.md)
- [Client](./client.md)
