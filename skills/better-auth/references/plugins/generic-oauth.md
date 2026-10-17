# Generic OAuth

The Generic OAuth plugin lets you add any OAuth 2.0 or OpenID Connect (OIDC) provider to your application. Providers are registered as first-class social providers and use the standard `signIn.social` flow, with PKCE and issuer validation enabled by default.

## Signature / Usage

### When to use this plugin

Use it when your provider is not one of the built-in social providers, when you need a corporate identity provider (Keycloak, Okta, Auth0, Microsoft Entra ID), or when a provider has custom or non-standard OAuth endpoints. If your provider is already built-in, use `socialProviders`; built-in providers support mobile id-token sign-in and have provider-specific optimizations.

#### Customization Options

| Need | Config field |
| --- | --- |
| Provider uses non-standard token exchange (GET, custom params) | `getToken` |
| Provider returns a non-standard user profile | `getUserInfo` |
| Map profile fields to your user model | `mapProfileToUser` |
| Extra authorization parameters | `authorizationUrlParams` |
| Extra token parameters | `tokenUrlParams` |
| Custom HTTP headers | `discoveryHeaders`, `authorizationHeaders` |
| Provider does not support OIDC discovery | Set `authorizationUrl`, `tokenUrl`, `userInfoUrl` explicitly |
| Non-standard immutable user identifier | Set `accountSubject` |
| Provider rejects PKCE | Set `pkce: false` |

### Setup (server side)

```typescript
import { betterAuth } from "better-auth"
import { genericOAuth } from "better-auth/plugins"

export const auth = betterAuth({
    plugins: [
        genericOAuth({
            config: [{
                providerId: "provider-id",
                clientId: "test-client-id",
                clientSecret: "test-client-secret",
                discoveryUrl: "https://auth.example.com/.well-known/openid-configuration"
            }]
        })
    ]
})
```

No client plugin is needed: `genericOAuthClient()` is no longer used, the standard social client APIs apply.

### Sign in

```typescript
await authClient.signIn.social({
    provider: "provider-id",
    callbackURL: "/dashboard",
})
```

`additionalData` (a `Record<string, any>`) round-trips client data through the flow; read it on the callback with `getOAuthState()` and treat it as untrusted.

### Sign In with an ID Token

Providers configured with a `discoveryUrl` whose discovery document publishes a `jwks_uri` also accept a client-obtained `id_token` directly, skipping the redirect flow. The token is verified against the provider's JWKS before any claims are trusted.

```typescript
await authClient.signIn.social({
    provider: "provider-id",
    idToken: { token: idTokenFromProvider },
})
```

Providers configured with explicit endpoints instead of `discoveryUrl` return `ID_TOKEN_NOT_SUPPORTED`.

### Link Account

```typescript
await authClient.linkSocial({
    provider: "provider-id",
    callbackURL: "/settings",
})
```

### Callback handling

The plugin uses the core OAuth callback route at `/callback/:providerId`; by default `${baseURL}/api/auth/callback/:providerId`. The `:providerId` parameter is required and must match your configured provider ID.

### Validate OAuth User Info

`user.validateUserInfo` rejects Generic OAuth users before Better Auth creates a user (`create-user`), links a new account (`link-account`), or signs an existing user back in (`sign-in`). Check `source.oauth?.providerId` to scope validation to a provider and `source.oauth?.profile` for provider-specific fields.

```typescript
export const auth = betterAuth({
  user: {
    validateUserInfo: ({ user, source }) => {
      if (source.oauth?.providerId !== "company-oauth") return;
      if (!user.email?.endsWith("@example.com")) {
        return { error: "email_not_allowed", errorDescription: "Use your example.com email to sign in" };
      }
    },
  },
  plugins: [genericOAuth({ config: [{ providerId: "company-oauth", clientId: "...", clientSecret: "...", discoveryUrl: "https://auth.example.com/.well-known/openid-configuration" }] })],
});
```

Return nothing to allow the flow; return an object with `error` to reject it. Redirect-based flows send the rejection to the configured error URL; programmatic flows return a `403` API error.

### RP-Initiated Logout

For OIDC providers that expose an `end_session_endpoint`, `authClient.signOut()` clears the Better Auth session and then redirects the browser to the provider logout endpoint (read from discovery, or set `endSessionEndpoint`). Pass `callbackURL` to return the user to your app (it must be registered as a post-logout redirect URI). With multiple linked providers supporting it, the most recently updated account's provider is used. Set `disableRedirect: true` to use the returned `data.url` yourself, or `disableProviderLogout: true` in the config to keep sign-out local.

```typescript
await authClient.signOut({ callbackURL: "/login" })
```

### Provider Helpers

Built-in and community-maintained provider helpers (Auth0, HubSpot, Keycloak, LINE, Microsoft Entra ID, Okta, Slack, Patreon, ...) are listed under Other Social Providers (`other-social-providers.md`).

### Custom token exchange

```typescript
genericOAuth({
    config: [{
        providerId: "custom-provider",
        clientId: process.env.CUSTOM_CLIENT_ID!,
        clientSecret: process.env.CUSTOM_CLIENT_SECRET,
        authorizationUrl: "https://provider.example.com/oauth/authorize",
        scopes: ["profile", "email"],
        getToken: async ({ code, redirectURI }) => {
            const response = await fetch(/* GET or custom request */)
            const data = await response.json()
            return {
                accessToken: data.access_token,
                refreshToken: data.refresh_token,
                accessTokenExpiresAt: new Date(Date.now() + data.expires_in * 1000),
                scopes: data.scope?.split(" ") ?? [],
                raw: data
            }
        },
        getUserInfo: async (tokens) => {
            const response = await fetch(/* ... */)
            const data = await response.json()
            return { id: tokens.raw?.user_id, name: data.display_name, email: data.email, image: data.avatar_url, emailVerified: data.email_verified }
        }
    }]
})
```

`tokens.raw` preserves the original token response for provider-specific fields.

### IDP-Initiated Flows

For providers (e.g. Clever) that redirect users to your callback with a `code` but no `state`, set `allowIdpInitiated: true`. Better Auth discards the provider-issued code and restarts the flow server-side with a fresh `state` and PKCE verifier. Leave it off for any provider that always initiates the flow from your side. Set the global `baseURL` when enabling it, or the bounce fails with `CALLBACK_URL_REQUIRED`.

## Options / Props

```typescript
interface GenericOAuthConfig {
  providerId: string;
  accountSubject?: (context: OAuthAccountKeyContext<GenericOAuthUserInfo>) => string | number | Promise<string | number>;
  discoveryUrl?: string;
  requireIdTokenVerification?: boolean;
  authorizationUrl?: string;
  tokenUrl?: string;
  userInfoUrl?: string;
  endSessionEndpoint?: string;
  postLogoutRedirectURI?: string;
  disableProviderLogout?: boolean;
  clientId: string;
  clientSecret?: string;
  tokenEndpointAuth?: TokenEndpointAuth;
  scopes?: string[];
  redirectURI?: string;
  responseType?: string;
  prompt?: string;
  pkce?: boolean;
  accessType?: string;
  accessTokenExpiresIn?: number;
  getUserInfo?: (tokens: OAuth2Tokens) => Promise<GenericOAuthUserInfo | null>;
}
```

| Option | Type | Description |
| --- | --- | --- |
| `providerId` | string | Unique identifier for the provider config |
| `accountSubject` | function | Resolves the immutable provider user identifier. OIDC discovery providers use the verified `sub`; plain OAuth providers use `id`; no runtime switching. `mapProfileToUser` cannot set it |
| `discoveryUrl` | string | OIDC discovery URL; endpoints auto-discovered at startup. With a `jwks_uri`, `id_token`s are verified (signature, issuer, audience, signing algorithms) and bound to a server-generated `nonce`; a token that fails verification rejects the sign-in. A provider with invalid or unusable discovery is skipped and retried on the next request (`PROVIDER_NOT_FOUND` / `error=oauth_provider_not_found` until then) |
| `requireIdTokenVerification` | boolean | Require discovery to provide a usable issuer and `jwks_uri` before registering the provider; enable when identity derives from ID-token claims. `microsoftEntraId` enables it automatically |
| `disableIdTokenNonceBinding` | boolean | Turn off OIDC `nonce` binding for discovery providers (removes `id_token` replay protection) |
| `authorizationUrl` / `tokenUrl` / `userInfoUrl` | string | Endpoints; not required with `discoveryUrl` |
| `endSessionEndpoint` | string | OIDC RP-Initiated Logout endpoint |
| `postLogoutRedirectURI` | string | Default `post_logout_redirect_uri`; must be registered with the provider |
| `disableProviderLogout` | boolean | Keep sign-out local |
| `clientId` / `clientSecret` | string | OAuth client credentials |
| `tokenEndpointAuth` | object | `{ method: "private_key_jwt", getClientAssertion }`, `"client_secret_basic"`, `"client_secret_post"`, `"none"`, or `"custom"` with `customizeRequest({ body })`. Secret methods require `clientSecret`; do not combine `clientSecret` with `private_key_jwt` / `none` |
| `authentication` | `'basic'` \| `'post'` | Secret-based token request authentication (default `'post'`) |
| `scopes` | string[] | Requested scopes |
| `redirectURI` | string | Custom redirect; must include the `:providerId` placeholder |
| `responseType` | string | Default `"code"` |
| `responseMode` | string | e.g. `"query"` or `"form_post"` |
| `prompt` | string | Authentication experience |
| `pkce` | boolean | Default `true`; disable only for providers that reject PKCE |
| `accessType` | string | `"offline"` to request a refresh token |
| `accessTokenExpiresIn` | number | Fallback lifetime (seconds) when the token response omits `expires_in` |
| `getToken` | function | Custom code-to-token exchange |
| `getUserInfo` | function | Custom user info retrieval |
| `mapProfileToUser` | function | Map provider profile to mutable user fields |
| `authorizationUrlParams` | Record<string, string> | Extra authorization query params; reserved keys (`state`, `client_id`, `redirect_uri`, `response_type`, `code_challenge`, `code_challenge_method`, `nonce`, `scope`) are ignored |
| `tokenUrlParams` | Record<string, string> | Extra token URL params; parameters set by Better Auth are preserved |
| `refreshTokenParams` | object \| function | Extra body params on refresh (function form receives request headers / cookies; validate derived values); `grant_type`, `refresh_token`, `client_id` cannot be overridden |
| `discoveryHeaders` / `authorizationHeaders` | Record<string, string> | Custom headers |
| `overrideUserInfo` | boolean | Update user info on every sign-in (default `false`) |
| `disableImplicitSignUp` | boolean | Require explicit sign-up intent |
| `disableSignUp` | boolean | Only existing users can sign in |
| `allowIdpInitiated` | boolean | Accept stateless IdP-initiated callbacks |

For `private_key_jwt`, supply `getClientAssertion` or use `createPrivateKeyJwtClientAssertionGetter({ privateKeyJwk, kid, algorithm })` from `better-auth/oauth2`.

## Notes

- Rebuilt in 1.7 on the social-provider path. Replace `signIn.oauth2({ providerId })` with `signIn.social({ provider })`, `oauth2.link()` with `linkSocial()`, update the provider callback URL from `/api/auth/oauth2/callback/:id` to `/api/auth/callback/:id`, and remove `genericOAuthClient()`.
- Changed in 1.7: PKCE now defaults to on; set `pkce: false` only for a provider that rejects it. `authorizationUrlParams` and `tokenUrlParams` accept only plain string maps.
- Removed in 1.7: `issuer` and `requireIssuerValidation`; issuer validation is now automatic (the old "Security: Issuer Validation" section with `issuer_mismatch` / `issuer_missing` is gone from the docs).
- Changed in 1.7: identity tokens go through one verifier; each provider declares an `idToken` config (keys, issuer, audience). A custom provider should replace its `verifyIdToken` method with an `idToken` config. PayPal no longer accepts identity-token login (use the redirect flow).
- Changed in 1.7: `generateState(c, link, additionalData)` is now `generateState(c, options)`.
- Renamed in 1.7: the OAuth callback redirect error `email_doesn't_match` is now `email_does_not_match`.
- Changed in 1.7: a discovery-URL provider verifies its identity token; a token that fails verification is rejected. Confirm the provider's published keys, issuer, and audience.
- Changed in 1.7: signed-assertion (`private_key_jwt`) setups are validated at creation (unsupported algorithm, key with no material, algorithm/key mismatch fail immediately). `createAuthorizationCodeRequest`, `createRefreshAccessTokenRequest`, and `createClientCredentialsTokenRequest` are replaced by the async `authorizationCodeRequest`, `refreshAccessTokenRequest`, and `clientCredentialsTokenRequest`.
- The Microsoft Entra ID helper requires a concrete tenant GUID (`common` / `organizations` / `consumers` should use the built-in Microsoft social provider) and its account identifier moves to the `oid` claim (see social-microsoft.md).

## Related

- [oauth-provider.md](./oauth-provider.md)
- [dub.md](./dub.md)
- [../concepts/oauth.md](../concepts/oauth.md)
- [../authentication/other-social-providers.md](../authentication/other-social-providers.md)
