# OAuth 2.1 Provider

The OAuth Provider plugin (`@better-auth/oauth-provider`) turns your Better Auth server into an authorization server that implements OAuth 2.1, OpenID Connect Core, and RFC 8414 metadata. Other applications send users to your app to sign in and receive access tokens for your APIs. To sign users in to your app with another provider, use social providers, Generic OAuth, or SSO instead.

This page covers setup and the first flow. Details live in sibling pages: [sign-in and consent screens](./oauth-provider-sign-in-flow.md), [clients](./oauth-provider-clients.md), [tokens, scopes, resources](./oauth-provider-tokens.md), [protect your API](./oauth-provider-resource-server.md), [OpenID Connect and logout](./oauth-provider-openid-connect.md), [reference](./oauth-provider-reference.md).

## Signature / Usage

### What the provider supports

| OAuth concept | Support |
| --- | --- |
| Grants | Authorization code, client credentials, and rotating refresh tokens with `offline_access`. Device code through `oauthDeviceAuthorization()`. Other grants through extensions. |
| Authorization requests | `response_type=code` with the `query` response mode. `prompt` accepts `none`, `login`, `consent`, `select_account`, and `create`. |
| PKCE | Required by default, `S256` only (RFC 7636). An admin can exempt a confidential client. |
| Redirect URIs | Exact match by default. A native client may vary the loopback port. |
| Client authentication | `client_secret_basic`, `client_secret_post`, `private_key_jwt` (RFC 7523), and `none` for public clients. Other assertion-based methods through extensions. |
| Client registration | Admin and user client APIs, dynamic registration (RFC 7591), and Client ID Metadata Documents. |
| Resource indicators | Resources (RFC 8707). By default, a client gets tokens only for the resources it is linked to. |
| Access tokens | JWT (RFC 9068) when the request names a resource and the JWT plugin is enabled. Otherwise opaque. |
| Sender-constrained tokens | DPoP (RFC 9449). |
| Introspection and revocation | Introspection (RFC 7662) and revocation (RFC 7009). |
| Discovery | Authorization server metadata (RFC 8414) and OpenID Connect discovery. `iss` in every authorization response (RFC 9207). Protected resource metadata for your API (RFC 9728). |
| Consent | Stored per user, client, and optional reference, such as an organization. Users can list, update, and delete their consents. |
| OpenID Connect | ID tokens and UserInfo, the `claims` parameter, and pairwise subjects. |
| Logout | RP-initiated and back-channel logout. |

Not built in:

- Implicit and password grants. OAuth 2.1 removes both.
- The `id_token` and hybrid response types, and the `form_post` response mode.
- Request objects (JAR).
- A pushed authorization request endpoint. `requestUriResolver` can resolve `request_uri` values from your own endpoint.
- `client_secret_jwt` and mutual-TLS client authentication.
- Token exchange (RFC 8693). An extension grant can add it.
- Front-channel logout and OpenID Connect session management.
- The RFC 7592 client configuration endpoint. Use the client APIs instead.

### Installation

Install `@better-auth/oauth-provider`. Your provider signs tokens with the JWT plugin. Disable the JWT plugin's `/token` route and its `set-auth-jwt` header. Both give the browser session JWTs signed with the same key as access tokens. Clients get tokens from `/oauth2/token` instead (see OAuth Provider Mode in [jwt.md](./jwt.md)).

```ts
import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { oauthProvider } from "@better-auth/oauth-provider";

export const auth = betterAuth({
  disabledPaths: ["/token"],
  plugins: [
    jwt({ disableSettingJwtHeader: true }),
    oauthProvider({
      loginPage: "/sign-in",
      consentPage: "/consent",
    }),
  ],
});
```

If you use secondary storage, also set `session.storeSessionInDatabase: true`. The provider looks sessions up in the database. Without `storeSessionInDatabase`, the server fails at startup.

Migrate the database (see [Schema](./oauth-provider-reference.md) to add the fields manually):

```bash
npx auth migrate
# or
npx auth generate
```

### Expose the well-known metadata

Clients fetch your provider's metadata from the paths below, and the auth handler serves them when requests reach it. Most frameworks forward only your auth base path, such as `/api/auth/*`, to `auth.handler`. For each path outside it, such as the RFC 8414 path at the root of your domain, add a route.

| Metadata | Path | Helper |
| --- | --- | --- |
| RFC 8414 authorization server | `{issuer}/.well-known/oauth-authorization-server` and `/.well-known/oauth-authorization-server/{issuer-path}` | `oauthProviderAuthServerMetadata` |
| OpenID Connect Discovery | `{issuer}/.well-known/openid-configuration` | `oauthProviderOpenIdConfigMetadata` |

The OpenID configuration is served only when `scopes` includes `openid`, which it does by default. Without a custom issuer, the issuer path is your `basePath`, such as `/api/auth`.

```ts
import { oauthProviderAuthServerMetadata } from "@better-auth/oauth-provider";
import { auth } from "@/lib/auth";

export const GET = oauthProviderAuthServerMetadata(auth);
```

If a browser-based client fetches your metadata from another origin, enable CORS on these routes. The metadata is public, so `oauthProviderAuthServerMetadata(auth, { headers: { "Access-Control-Allow-Origin": "*" } })` is fine. Do not allow credentials.

### Add the client plugins

To resume the flow after each step, add `oauthProviderClient` to the app that renders your login and consent pages. It carries the authorization request through sign-in and consent.

```ts
import { createAuthClient } from "better-auth/client";
import { oauthProviderClient } from "@better-auth/oauth-provider/client";

export const authClient = createAuthClient({
  plugins: [oauthProviderClient()],
});
```

To verify access tokens in your API, use `oauthProviderResourceClient`; see [Protect your API](./oauth-provider-resource-server.md).

### Login and consent pages

The authorize endpoint redirects to `loginPage` when the user has no session, and to `consentPage` when the client needs the user's approval. Both receive a signed copy of the authorization request. On your login page, sign the user in as usual. When the session is created, the plugin continues the authorization request. On your consent page, call `authClient.oauth2.consent`. On both pages, the auth client sends the browser to the next step, so your pages need no redirect code. See [Sign-in and consent screens](./oauth-provider-sign-in-flow.md).

### Run your first flow

This flow issues an access token for one API, `https://api.example.com`. Build your login and consent pages first, because step 3 redirects to them.

1. Register the API and a client. Add the API to `resources`, then create a client linked to it. The authorize and token endpoints reject a `resource` the client is not linked to. `adminCreateOAuthClient` runs only on the server and needs a signed-in user's session, so call it from a route that only administrators can reach, checks the request's `Origin` (CSRF protection), and passes the request's headers.

```ts
oauthProvider({
  loginPage: "/sign-in",
  consentPage: "/consent",
  resources: ["https://api.example.com"],
})
```

```ts
// Inside an admin-only server route that receives `request`; check its Origin first
const client = await auth.api.adminCreateOAuthClient({
  headers: request.headers,
  body: {
    client_name: "Example App",
    redirect_uris: ["https://app.example.com/callback"],
    resources: ["https://api.example.com"],
  },
});
// Store client.client_id and client.client_secret in the client app.
```

To register a public client, such as a single-page or native app, add `token_endpoint_auth_method: "none"`. The client gets no secret and authenticates with PKCE alone.

2. Send the user to the authorize endpoint. The client app generates a PKCE verifier, then redirects with its S256 challenge (RFC 7636 §4.2).

```txt
https://auth.example.com/api/auth/oauth2/authorize
  ?response_type=code
  &client_id=CLIENT_ID
  &redirect_uri=https://app.example.com/callback
  &scope=openid profile offline_access
  &state=STATE
  &code_challenge=CODE_CHALLENGE
  &code_challenge_method=S256
  &resource=https://api.example.com
```

3. Sign in and consent. The user signs in on `loginPage` and approves on `consentPage`. The provider then redirects to `redirect_uri` with `code`, `state`, and `iss`.

4. Exchange the code for tokens. The client app posts the code and the PKCE verifier to the token endpoint. The response holds an access token for `https://api.example.com`, an ID token, and a refresh token.

```bash
curl -X POST https://auth.example.com/api/auth/oauth2/token \
  -u "CLIENT_ID:CLIENT_SECRET" \
  -d grant_type=authorization_code \
  -d code=CODE \
  -d redirect_uri=https://app.example.com/callback \
  -d code_verifier=CODE_VERIFIER \
  -d resource=https://api.example.com
```

5. Check the token. Call UserInfo with the access token. A 200 response with the user's `sub` and `name` means the flow worked.

```bash
curl https://auth.example.com/api/auth/oauth2/userinfo \
  -H "Authorization: Bearer ACCESS_TOKEN"
```

## Notes

- Source: https://www.better-auth.com/docs/plugins/oauth-provider (better-auth v1.7.23 docs)
- The 1.7.10 single page `plugins/oauth-provider` was split in 1.7.23 into this page and six sub-pages; the old option table, rate limits, schema, and endpoint lists are now in [oauth-provider-reference.md](./oauth-provider-reference.md).
- `mcp()` replaces `oauthProvider()`, so do not register both. Use [mcp.md](./mcp.md) to protect an MCP server with this provider.
- Hosts that terminate TLS in front of Better Auth: canonicalize the incoming request scheme and host to `baseURL` at the route boundary before the provider reads it (DPoP `htu`, consent / login redirects).

### Migration to 1.7 (from the 1.7 upgrade guide, carried over from the 1.7.10 notes)

- Removed in 1.7: the in-core `oidcProvider` plugin; migrate to `oauthProvider` (see [oidc-provider.md](./oidc-provider.md)). The old "Migrations (From OIDC Provider / From MCP Plugin)" docs sections are gone; the upgrade guide's "Migrate OAuth client records" replaces them: copy or re-register each `oauthApplication` as an `oauthClient` (map `redirectUrls` to `redirectUris`, `metadata` to JSON, set grant types and token-endpoint auth method), expire old access tokens, drop or rename the legacy `oauthAccessToken` table.
- Changed in 1.7 (existing `oauthClient` rows): add nullable `applicationType`, `clientDiscoveryId`, `clientCredentialsScopes`; drop the removed `type` and `public` columns after backfill; replace bare JWK arrays with JWK Set objects (`jwks: { keys: [key] }`); remove `oauthProvider.silenceWarnings`; remove `clientCredentialGrantDefaultScopes`.
- Changed in 1.7: server-side OAuth requests (token exchange, refresh, client credentials, introspection, JWKS) refuse HTTP redirects; OAuth endpoints return RFC 6749 `{ error, error_description }` envelopes; authorize and userinfo accept form-encoded requests; request objects (the `request` parameter) are not supported, and a `request_uri` is resolved only through `requestUriResolver` (1.7.10 notes: both parameters were rejected).
- Changed in 1.7: `max_age` is enforced (re-login prompt; store session timestamps with a date / timestamp type to avoid login loops).
- Doc difference between versions: the 1.7.10 docs example used `signUp: { page, shouldRedirect }`; the 1.7.23 docs use `signup` everywhere (see [oauth-provider-sign-in-flow.md](./oauth-provider-sign-in-flow.md)).
- Per-topic 1.7 migration notes (resources replacing `validAudiences`, `verifyAccessToken` rename, refresh reuse interval, ID token claims, revoke, client creation `201`) are in the matching sibling pages.

## Related

- [oauth-provider-sign-in-flow.md](./oauth-provider-sign-in-flow.md)
- [oauth-provider-clients.md](./oauth-provider-clients.md)
- [oauth-provider-tokens.md](./oauth-provider-tokens.md)
- [oauth-provider-resource-server.md](./oauth-provider-resource-server.md)
- [oauth-provider-openid-connect.md](./oauth-provider-openid-connect.md)
- [oauth-provider-reference.md](./oauth-provider-reference.md)
- [mcp.md](./mcp.md)
- [oidc-provider.md](./oidc-provider.md)
- [jwt.md](./jwt.md)
- [device-authorization.md](./device-authorization.md)
- [cimd.md](./cimd.md)
