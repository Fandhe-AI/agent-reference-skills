# OAuth Provider

The OAuth 2.1 Provider plugin (`@better-auth/oauth-provider`) turns a Better Auth server into an OAuth authorization server. Applications request user access through the authorization code flow, while services use client credentials. Add the `openid` scope when clients also need OpenID Connect (OIDC) identity claims.

Supported grants: `authorization_code` (S256 PKCE), `refresh_token` (`offline_access` scope), `client_credentials` (machine-to-machine), `device_code` (optional, via `oauthDeviceAuthorization()`).

`client_credentials` is fail closed. A client's user-delegated `scope` metadata never authorizes machine access. Administrators must assign a non-empty `client_credentials_scopes` value through the administrative create or update endpoint, and `clientPrivileges` must explicitly approve the `configure-client-credentials-scopes` action. The assigned value is both the maximum requestable scope set and the default when the token request omits `scope`.

## Signature / Usage

### Installation

```typescript
import { betterAuth } from "better-auth"
import { jwt } from "better-auth/plugins"
import { oauthProvider } from "@better-auth/oauth-provider"

const auth = betterAuth({
    disabledPaths: ["/token"],
    plugins: [
        jwt(),
        oauthProvider({
            loginPage: "/sign-in",
            consentPage: "/consent",
        })
    ],
})
```

```bash
npx auth migrate
# or
npx auth generate
```

Better Auth serves OAuth Authorization Server metadata (`{issuer}/.well-known/oauth-authorization-server` and `/.well-known/oauth-authorization-server/[issuer-path]`) and OpenID Connect discovery (`{issuer}/.well-known/openid-configuration`, needs the `openid` scope) from the auth handler. If your framework route does not forward them, add a route calling `oauthProviderOpenIdConfigMetadata(auth)` or `oauthProviderAuthServerMetadata(auth)`.

Create a first confidential client (set `token_endpoint_auth_method: "none"` for a public client):

```typescript
const client = await auth.api.createOAuthClient({
    headers,
    body: { redirect_uris: [redirectUri] }
});
```

### Client plugins

```typescript
import { createAuthClient } from "better-auth/client"
import { oauthProviderClient } from "@better-auth/oauth-provider/client"

export const authClient = createAuthClient({
    plugins: [oauthProviderClient()],
})
```

Resource client (runs in the API that receives access tokens):

```typescript
import { auth } from "@/lib/auth"
import { createAuthClient } from "better-auth/client"
import { oauthProviderResourceClient } from "@better-auth/oauth-provider/resource-client"

export const serverClient = createAuthClient({
    plugins: [oauthProviderResourceClient(auth)], // auth optional
})
```

### OAuth clients

Authentication capability and application topology are separate. Public clients use `token_endpoint_auth_method: "none"`; confidential clients use `client_secret_basic`, `client_secret_post`, or `private_key_jwt`. `application_type` is `web` or `native` and controls redirect URI validation only.

- `GET /oauth2/get-client` (`client_id`) - get a client
- `GET /oauth2/public-client` (`client_id`) - public client fields for consent pages (signed-in user)
- `POST /oauth2/public-client-prelogin` (`client_id`, `oauth_query`) - needs `allowPublicClientPrelogin: true`
- `GET /oauth2/get-clients` - list clients
- `/oauth2/create-client` (`createOAuthClient`) - parameters equivalent to RFC 7591 registration
- `auth.api.adminCreateOAuthClient(...)` / `adminUpdateOAuthClient(...)` - server-only; restricted fields: `client_secret_expires_at`, `skip_consent`, `enable_end_session`, `metadata`
- `POST /oauth2/update-client` (`client_id`, `update`) - cannot change `token_endpoint_auth_method` or the secret
- `POST /oauth2/client/rotate-secret` (`client_id`) - rotates immediately; the previous secret is invalidated immediately
- `POST /oauth2/delete-client` (`client_id`)
- `adminUpdateOAuthClient` with `update: { disabled: true }` pauses token issuance; introspection reports existing tokens as inactive

### Consent

- `GET /oauth2/get-consent` (`id`), `GET /oauth2/get-consents`, `POST /oauth2/update-consent` (`id`, `update`), `POST /oauth2/delete-consent` (`id`)
- `POST /oauth2/consent` — `{ accept: boolean, scope?: string, claims?: string | Record<string, unknown> }`
- `POST /oauth2/continue` — `{ selected?, created?, postLogin? }` (resumes after account selection / sign-up / post-login pages; `postLogin.shouldRedirect` runs again with `isContinuation: true`)

### Dynamic Client Registration

```typescript
oauthProvider({
    allowDynamicClientRegistration: true,
    allowUnauthenticatedClientRegistration: true,
})

const client = await authClient.oauth2.register({
    client_name: "My Client",
    redirect_uris: ["https://client.example.com/callback"],
})
```

- For MCP public-client identity use the CIMD plugin; the MCP 2026-07-28 spec deprecates DCR in favor of CIMD.
- Dynamic registration keeps only the requested `grant_types` this server supports; a registration that shares no grant with the server is rejected with `invalid_client_metadata`.
- `application_type` defaults to `web`. A `web` client requires `https` redirect URIs on non-loopback hosts. A `native` client may use a claimed `https` URI, an `http` loopback URI on `localhost` / `127.0.0.1` / `[::1]` (any port), an authority-free reverse-domain private-use URI (`com.example.app:/callback`), or a custom-scheme URI with host and path (`cursor://anysphere.cursor-mcp/oauth/callback`).
- `clientRegistrationDefaultApplicationType`: `"web"` (default), `"native"`, or `"infer"` (native when any redirect URI uses a non-http(s) scheme or `http` on a loopback host; otherwise web).
- `sector_identifier_uri` is not supported.
- Protected DCR: define `validateInitialAccessToken({ initialAccessToken, clientMetadata })` and return `{ referenceId }` or `false`; Bearer tokens to the registration endpoint are rejected while it is undefined.
- `clientRegistrationClientSecretExpiration: "30d"` expires dynamically registered confidential clients (default: never).
- `clientRegistrationDefaultScopes` / `clientRegistrationAllowedScopes` describe the scopes a client may request (capabilities, not user consent); the effective set is their deduplicated union, or `scopes` when both are omitted.
- `clientRegistrationDefaultResources` / `clientRegistrationAllowedResources`: closed by default; a requested resource outside the effective allowlist is rejected with `invalid_target`. Every value must also be present in `resources`.

### Authorize endpoint

Only `response_type: "code"`; `code_challenge_method: "plain"` is not supported. All authorization responses include the RFC 9207 `iss` parameter. Use `resource` indicators (RFC 8707) to restrict tokens to a resource. Requests without `state` are accepted and `state` is echoed when provided.

### Token endpoint

Supports `authorization_code`, `client_credentials`, `refresh_token`.

#### Client Authentication Methods

- `client_secret_basic` - HTTP Basic header (default)
- `client_secret_post` - credentials in the request body
- `private_key_jwt` - signed JWT assertion (RFC 7523)
- `none` - public client (PKCE required)

With the JWT plugin enabled, sending `resource` yields a JWT access token with that resource in `aud`. With `disableJwtPlugin: true`, access tokens stay opaque. A confidential client must use its registered `token_endpoint_auth_method`. Failed `client_secret_post` returns `400`; failed `client_secret_basic` returns `401` with a Basic `WWW-Authenticate` challenge. The client is authenticated before the grant is looked up, so an unknown `client_id` returns `invalid_client`.

#### DPoP sender-constrained tokens

RFC 9449 DPoP. A client asks for DPoP-bound tokens by registering with `dpop_bound_access_tokens: true`, by sending `dpop_jkt` on the authorization request, or by requesting a resource configured with `dpopBoundAccessTokensRequired: true`. A bound token requires a valid `DPoP` proof at the token endpoint (proof `htu` must be the endpoint's public URL built from `baseURL`), returns `token_type: "DPoP"`, JWT access tokens carry `cnf.jkt`, refresh rotation requires a proof from the same key, and resource requests use `Authorization: DPoP <access_token>` with a proof containing `ath`.

```typescript
oauthProvider({
    dpop: {
        proofMaxAgeSeconds: 300,
        signingAlgorithms: ["ES256", "EdDSA"],
    },
    resources: [
        { identifier: "https://api.example.com", dpopBoundAccessTokensRequired: true },
    ],
})
```

#### Private Key JWT Authentication

Register the client's public keys via `jwks` (an RFC 7517 JWK Set object with a non-empty `keys` array; a bare key array is rejected) or `jwks_uri` (HTTPS, public host); they are mutually exclusive.

```typescript
await auth.api.adminCreateOAuthClient({
    headers,
    body: {
        redirect_uris: ["https://app.example.com/callback"],
        token_endpoint_auth_method: "private_key_jwt",
        jwks: { keys: [{ kty: "RSA", kid: "my-key-1", alg: "RS256", use: "sig", n: "...", e: "..." }] },
    },
});
```

The client sends `client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer` and `client_assertion`. Assertion claims: `iss` and `sub` = `client_id`; `aud` contains the receiving endpoint URL or the issuer; `exp` required and not beyond `assertionMaxLifetime`; `jti` required, single-use; `iat` optional. Algorithms: RS256/384/512, PS256/384/512, ES256/384/512, EdDSA.

Client key rotation: set `allowClientKeyRotation: true`; the client POSTs `/oauth2/client/rotate-keys` with `client_assertion_type`, `client_assertion` (aud must include the rotation endpoint URL) and its complete new `jwks`. Roll keys in two steps (old + new signed by old; then new only signed by new). Not allowed with the memory adapter or `generateId: "serial"`; only for inline-`jwks` clients.

#### Refresh token grant

A new refresh token is issued on every refresh. `refreshTokenReuseInterval` (default `0` = strict replay detection) lets a rotated token be reused for a short interval and receive the same cached response (same client, scopes, resources, and sender constraint); a mismatch returns `invalid_grant`; after the interval, reuse invalidates the family.

#### Device code grant

RFC 8628. Add `oauthDeviceAuthorization()` alongside `oauthProvider()` to register the `urn:ietf:params:oauth:grant-type:device_code` grant and advertise `device_authorization_endpoint`. The device requests codes at `/device/code`, the user approves, and the client polls `/oauth2/token`. Standalone fallback for an unknown OAuth client ID only when `oauthDeviceAuthorization({ validateClient })` accepts it.

### Introspect, revoke, end session, back-channel logout, UserInfo

- Introspect (RFC 7662): the caller must be a registered client and either issued the token or be a resource server linked to one of the token's resources (`adminLinkClientResource` for existing clients). Others get `{ active: false }`. Refresh tokens can only be introspected by the requesting client. Opaque and JWT tokens return the same claims for the same grant (extension `claims.accessToken`, `customAccessTokenClaims`, per-resource `customClaims`); reserved names are dropped. Opaque tokens are recomputed per call; JWTs are frozen at issuance.
- Revoke (RFC 7009): opaque access token deleted immediately; refresh token deletes every access token it minted; a still-valid JWT access token returns `400 unsupported_token_type` (expired or invalid-audience JWTs are a `200` no-op). Keep JWT lifetimes short (`accessTokenExpiresIn`, `m2mAccessTokenExpiresIn`); a JWT carrying `sid` is `active: false` at introspection and rejected by userinfo once its session ends.
- End session (RP-Initiated Logout 1.0): clients with `enable_end_session: true`; accepts `GET` query or form-encoded `POST`. A verified `id_token_hint` ends its session immediately; otherwise (or when the hint refers to another session) the browser user must confirm. Redirect only when `post_logout_redirect_uri` exactly matches a registered URI; `state` is added only to that redirect.
- Back-channel logout: register `backchannel_logout_uri` (absolute public HTTPS, no credentials or fragment; private / reserved / tunneled / metadata hosts rejected) and optionally `backchannel_logout_session_required`. The OP POSTs a signed `logout_token` (`typ: logout+jwt`, lifetime capped at 120 s, 5 s per-RP timeout, no retry) to each client with tokens bound to the ending session, then revokes refresh tokens without `offline_access` and session-bound access tokens. Requires the `jwt` plugin. Delivery runs through `advanced.backgroundTasks.handler` when configured. Discovery advertises `backchannel_logout_supported` and `backchannel_logout_session_supported`.
- UserInfo (`/oauth2/userinfo`): needs `openid`; `profile` -> `name`, `picture`, `given_name`, `family_name`; `email` -> `email`, `email_verified`. Expired / revoked / ended-session tokens return `401 invalid_token`. Honors the OIDC `claims.userinfo` request (per-claim selection applies to opaque tokens only).

### Verification (API server)

```typescript
import { requestToResourceInput, verifyAccessTokenRequest } from "better-auth/oauth2"

export const GET = async (req: Request) => {
    const payload = await verifyAccessTokenRequest(requestToResourceInput(req), {
        verifyOptions: {
            issuer: "https://auth.example.com",
            audience: "https://api.example.com",
        },
        requiredScopes: ["read:post"], // optional
    });
}
```

`verifyAccessTokenRequest` (also available as `serverClient.verifyAccessTokenRequest(req, ...)`) verifies the token and, for DPoP-bound tokens, the method, URL, scheme, proof key, replay `jti`, and `ath`. `verifyBearerToken` remains for raw bearer tokens and rejects DPoP-bound tokens. DPoP replay protection defaults to an in-memory store (single instance only); for multi-instance use `dpop.replayStore` such as `createDpopReplayStore(ctx.context.internalAdapter)`, which needs database-backed verification storage. Behind a proxy forward the externally visible scheme, host and path.

JWT tokens: verify the signature with JWKS, `iss`, `aud`, `exp` / `nbf`, and `scope`. Opaque tokens: call `/oauth2/introspect` and require `active: true`. Accepting only JWTs is simplest (fast, no client secret needed).

## Options / Props

### Redirect screens

```typescript
oauthProvider({
    loginPage: "/sign-in",
    consentPage: "/consent",
    signUp: { page: "/sign-up", shouldRedirect: async ({ headers }) => { /* ... */ } },
    selectAccount: { page: "/select-account", shouldRedirect: async ({ headers }) => { /* ... */ } },
    postLogin: {
        page: "/select-organization",
        shouldRedirect: async ({ session, scopes, headers, isContinuation }) => { /* ... */ },
        consentReferenceId: ({ session, scopes }) => { /* ... */ },
    },
})
```

Verify the signed consent query on the server with `verifyOAuthQueryParams(query, secret)` (`const { secret } = await auth.$context`). Consent is stored per `consentReferenceId`.

### Resources

`resources` lists protected resources (RFC 8707 `resource`; becomes JWT `aud`). Entries are a string or `{ identifier, allowedScopes?, accessTokenTtl?, dpopBoundAccessTokensRequired?, ... }`. They are written to the `oauthResource` table at startup (`resourceSeedMode` controls existing rows). With Prisma on PostgreSQL / CockroachDB / MongoDB, a resource without `allowedScopes` cannot be stored. `adminCreateOAuthClient({ body: { resources } })` links resources to a client (`resourcePrivileges` is called with the `link` action).

### Other options

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `scopes` | string[] | `openid`, `profile`, `email`, `offline_access` | Supported scopes; `openid` makes it an OIDC server |
| `validateRedirectUri` | (uri, registeredUris, defaultResult) => boolean \| Promise | exact match | Custom redirect URI acceptance; returning `true` accepts even if `defaultResult` is `false` |
| `cachedTrustedClients` | Set<string> | — | Clients cached in memory and immune to CRUD changes |
| `customIdTokenClaims` | ({ user, scopes, metadata }) | — | Additive ID token claims; protocol-reserved names are stripped |
| `customAccessTokenClaims` | ({ user, scopes, referenceId, resources, metadata }) | — | Access token claims |
| `customUserInfoClaims` | ({ user, scopes, requestedClaims, jwt }) | — | UserInfo claims |
| `customTokenResponseFields` | ({ grantType, user, scopes, metadata, verificationValue }) | — | Extra token endpoint JSON fields |
| `extensions[].claims.accessToken` | ({ client, resources }) | — | Client-specific access token claims (receives the full `client` record) |
| `accessTokenExpiresIn` | string \| number | `1h` | Access token lifetime |
| `m2mAccessTokenExpiresIn` | string \| number | `1h` | `client_credentials` token lifetime |
| `idTokenExpiresIn` | string \| number | `10h` | ID token lifetime |
| `refreshTokenExpiresIn` | string \| number | `30d` | Refresh token lifetime |
| `refreshTokenReuseInterval` | number | `0` | Seconds a rotated refresh token can be replayed |
| `codeExpiresIn` | string \| number | `10m` | Authorization code lifetime |
| `assertionMaxLifetime` | string \| number | `5m` | Max `private_key_jwt` assertion lifetime |
| `scopeExpirations` | Record<string, string> | — | Lower access token lifetimes per scope (earliest wins) |
| `clientRegistrationRequirePKCE` | boolean | — | Server-owned PKCE default for dynamically registered confidential clients |
| `clientReference` | ({ session }) => string \| undefined | — | Owner reference (e.g. `activeOrganizationId`) assigned at registration |
| `clientPrivileges` | ({ action, headers, user, session, clientId }) | owner-matching | Can only deny; actions `create`, `list`, `read`, `update`, `delete`, `rotate`, `configure-client-credentials-scopes` |
| `storeClientSecret` | `"hashed"` \| `"encrypted"` \| `"plain"` | `"hashed"` | `encrypted` when `disableJwtPlugin: true` |
| `storeTokens` | `"hashed"` \| ... | `"hashed"` | Storage of refresh tokens and opaque access tokens |
| `prefix` | `{ opaqueAccessToken?, refreshToken?, clientSecret? }` | — | Token prefixes for secret scanners; treat as immutable once deployed |
| `formatRefreshToken` | `{ encrypt(token, sessionId), decrypt(token) }` | — | Custom refresh token format / encryption |
| `advertisedMetadata` | `{ scopes_supported?, claims_supported? }` | — | Metadata differing from what the server can deliver |
| `disableJwtPlugin` | boolean | false | Opaque access tokens; ID tokens signed HS256 with `client_secret` |
| `pairwiseSecret` | string (>= 32 chars) | — | Enables pairwise `sub`; clients opt in with `subject_type: "pairwise"`; treat as permanent |
| `allowPublicClientPrelogin` | boolean | false | Enables `/oauth2/public-client-prelogin` |
| `allowClientKeyRotation` | boolean | false | Enables `/oauth2/client/rotate-keys` |

### Rate limiting

Per-IP per-endpoint; applies only when global rate limiting is enabled.

| Endpoint | Window | Max |
| --- | --- | --- |
| `/oauth2/token` | 60s | 20 |
| `/oauth2/authorize` | 60s | 30 |
| `/oauth2/introspect` | 60s | 100 |
| `/oauth2/revoke` | 60s | 30 |
| `/oauth2/register` | 60s | 5 |
| `/oauth2/client/rotate-keys` | 60s | 5 |
| `/oauth2/userinfo` | 60s | 60 |

Configure with `rateLimit: { token: { window, max }, ..., rotateClientKeys, userinfo }`; set an endpoint to `false` to fall back to global limits.

### PKCE

PKCE is required for all clients by default. Always required for `token_endpoint_auth_method: "none"` and for `offline_access` requests unless a confidential client has opted out and the OIDC request includes both `openid` and `nonce`. Admin-created confidential clients can set `require_pkce: false`; dynamic registration does not accept `require_pkce` from requests (use `clientRegistrationRequirePKCE`).

### Provider extensions

`extendOAuthProvider(ctx, { grants, clientAuthentication, metadata, claims, ... })` from a plugin `init()` hook adds token grants, assertion-based client authentication methods, additive discovery metadata, token / UserInfo claims, and client-id discovery sources (used by `@better-auth/cimd`). Dispatched kinds (`grants`, `clientAuthentication`) must be disjoint across extensions; additive kinds (`metadata`, `claims`) never override core. A grant handler receives `provider` (`getClient`, `authenticateClient`, `issueTokens`, `hashToken`, `validateAccessToken`, `requireActiveAccessToken`); `getOAuthProviderApi(ctx, opts, grantType?)` gives the same object. Pass `confirmation` to `issueTokens` to sender-constrain (RFC 7800 `cnf`). A `clientAuthentication` strategy returns only `{ clientId }` and must call `consumeClientAssertion(ctx, opts, { namespace, payload, expectedAudience })`.

Claim precedence (lowest to highest): access token - extension `claims.accessToken` < per-issuance `accessTokenClaims` < `customAccessTokenClaims` < per-resource `customClaims`; ID token - subject/authentication claims < `customIdTokenClaims`; UserInfo - scope and `claims.userinfo` identity claims < extension `claims.userInfo` < `customUserInfoClaims` (`sub` re-pinned last).

### DB schema

`oauthClient`: `id`, `clientId`, `clientSecret?`, `disabled?`, `skipConsent?`, `enableEndSession?`, `subjectType?`, `scopes?`, `userId?`, `referenceId?`, `createdAt?`, `updatedAt?`, `name?`, `uri?`, `icon?`, `contacts?`, `tos?`, `policy?`, `softwareId?`, `softwareVersion?`, `softwareStatement?`, `redirectUris`, `postLogoutRedirectUris?`, `backchannelLogoutUri?`, `backchannelLogoutSessionRequired?`, `tokenEndpointAuthMethod?`, `grantTypes?`, `responseTypes?`, `applicationType?`, `jwks?`, `jwksUri?`, `clientDiscoveryId?`, `requirePKCE?`, `dpopBoundAccessTokens?`, `metadata?`

`oauthRefreshToken`: `id`, `token`, `clientId`, `sessionId?`, `userId`, `referenceId?`, `scopes`, `revoked?`, `rotatedAt?`, `rotationReplayResponse?`, `rotationReplayExpiresAt?`, `authTime?`, `createdAt`, `expiresAt`, `confirmation?`

`oauthAccessToken`: `id`, `token`, `clientId`, `sessionId?`, `refreshId?`, `userId?`, `referenceId?`, `scopes`, `createdAt`, `expiresAt`, `confirmation?`, `revoked?`

`oauthConsent`: `id`, `userId`, `clientId`, `referenceId?`, `scopes`, `requestedUserInfoClaims?`, `createdAt`, `updatedAt`

`oauthClientAssertion`: `id` (digest of `private_key_jwt:<clientId>:<jti>`), `expiresAt`; no job prunes expired rows.

## Notes

- PKCE is required by default (OAuth 2.1); confidential clients can opt out per client.
- Client secrets are hashed by default and shown only once. Refresh tokens are rotated on every refresh.
- `disableJwtPlugin: true` switches to opaque-access-token-only mode (back-channel logout is then unavailable).
- Removed in 1.7: the in-core `oidcProvider` plugin; migrate to `oauthProvider`. The old "Migrations (From OIDC Provider / From MCP Plugin)" docs sections are gone from the 1.7 page; the upgrade guide's "Migrate OAuth client records" replaces them: copy or re-register each `oauthApplication` as an `oauthClient` (map `redirectUrls` to `redirectUris`, `metadata` to JSON, set grant types and token-endpoint auth method), expire old access tokens, drop or rename the legacy `oauthAccessToken` table.
- Changed in 1.7 (existing `oauthClient` rows): add nullable `applicationType`, `clientDiscoveryId`, `clientCredentialsScopes`; drop the removed `type` and `public` columns after backfill; replace bare JWK arrays with JWK Set objects (`jwks: { keys: [key] }`); remove `oauthProvider.silenceWarnings`; remove `clientCredentialGrantDefaultScopes`.
- Changed in 1.7: protected resources replace the audience list. `validAudiences` is removed; move entries into `resources`; the shortest applicable refresh-token lifetime wins. For dynamic clients the resource model enforces per-client resources by default (`invalid_target`); set `enforcePerClientResources: false` and register each client's `grant_types` explicitly (else `unauthorized_client`).
- Changed in 1.7: the token target is locked to the login (later requests can narrow but not widen); custom-claims callbacks receive a list of resources.
- Renamed in 1.7: DPoP verifier `verifyAccessToken` -> `verifyBearerToken` (now rejects DPoP tokens); use `verifyAccessTokenRequest` for DPoP-capable endpoints. Protected-operation `scopes` -> `requiredScopes`, `challengeScopes` for the `WWW-Authenticate` hint, `createInsufficientScopeError` / `createResourceServerChallenge` helpers.
- Changed in 1.7: sign-out revokes session-bound tokens; serverless platforms should set `advanced.backgroundTasks.handler`.
- Changed in 1.7: custom ID-token claims cannot override protocol claims (issuer, subject, audience, expiry, nonce, session binding, `auth_time`, `acr`, `amr`, `azp`); ID tokens report `acr: "0"`; ID tokens no longer carry profile / email scope claims (read them from UserInfo); a custom `jwt.sign` callback must match `keyPairConfig.alg`.
- Changed in 1.7: `/oauth2/revoke` on a still-valid JWT access token returns `400 unsupported_token_type`; `max_age` is enforced (re-login prompt; store session timestamps with a date / timestamp type to avoid login loops); client creation returns `201 Created` (use `validateInitialAccessToken` for machine registration); OAuth endpoints return RFC 6749 `{ error, error_description }` envelopes; registration requires reciprocal `response_types` / `grant_types`; token requests must use the client's registered auth method.
- Changed in 1.7: unauthenticated registration without `token_endpoint_auth_method` is now confidential (`client_secret_basic`, generated secret); register `"none"` explicitly for public clients.
- Changed in 1.7: `/oauth2/end-session` also accepts form-encoded `POST` and may require browser confirmation; authorize and userinfo accept form-encoded requests; the `request` / `request_uri` parameters are rejected; userinfo accepts the token in a form body but not in both header and body.
- Changed in 1.7: server-side OAuth requests (token exchange, refresh, client credentials, introspection, JWKS) refuse HTTP redirects; token, introspection, userinfo, registration and device responses send `Cache-Control: no-store`; code-redemption failures return `400 invalid_grant`.
- Changed in 1.7: confidential and OIDC PKCE rules (see PKCE) and `refreshTokenReuseInterval` (strict `0` here; `mcp()` defaults to 30).
- Behind a TLS-terminating proxy, canonicalize the incoming request scheme and host to `baseURL` at the route boundary before the provider reads it (DPoP `htu`, consent / login redirects).

## Related

- [mcp.md](./mcp.md)
- [oidc-provider.md](./oidc-provider.md)
- [jwt.md](./jwt.md)
- [device-authorization.md](./device-authorization.md)
- [cimd.md](./cimd.md)
