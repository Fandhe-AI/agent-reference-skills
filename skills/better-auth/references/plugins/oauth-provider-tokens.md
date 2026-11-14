# OAuth Provider: Tokens, Scopes, and Resources

Control which tokens the provider issues, for which APIs, and for how long.

## Signature / Usage

### Token endpoint

`POST /oauth2/token` supports the `authorization_code`, `client_credentials`, and `refresh_token` grants. A confidential client must authenticate with the method it registered, using one of the methods from RFC 6749 §2.3.1 and OIDC Core §9:

| Method | How the client authenticates |
| --- | --- |
| `client_secret_basic` | `client_id` and `client_secret` in an HTTP Basic `Authorization` header (default) |
| `client_secret_post` | `client_id` and `client_secret` in the request body |
| `private_key_jwt` | A signed JWT assertion. See [oauth-provider-clients.md](./oauth-provider-clients.md). |
| `none` | Public client. PKCE is required. |

To get a JWT access token, include a `resource` in the request and enable the JWT plugin. The token's `aud` is that resource. When the scopes also include `openid`, `aud` is an array that also holds the UserInfo endpoint URL. If either is missing, the access token is opaque. Error codes are listed in Token errors in [oauth-provider-reference.md](./oauth-provider-reference.md).

### Scopes

To control which scopes your clients may request, set `scopes`. It defaults to `["openid", "profile", "email", "offline_access"]`. Your provider acts as an OpenID provider only when the list includes `openid`.

| Scope | Grants |
| --- | --- |
| `openid` | An ID token and the `sub` claim |
| `profile` | `name`, `picture`, `given_name`, and `family_name` at UserInfo |
| `email` | `email` and `email_verified` at UserInfo |
| `offline_access` | A refresh token, when the client is registered for `refresh_token` or `authorization_code` |

Standard claims are returned at UserInfo, not in the ID token, as OIDC Core §5.4 describes for flows that issue an access token.

```ts
oauthProvider({
  scopes: ["openid", "profile", "offline_access", "read:post", "write:post"],
})
```

### Resources

A resource is a protected API that your provider issues access tokens for. Its `identifier` is the `resource` parameter value from RFC 8707 §2 and becomes the `aud` of a JWT access token.

A client can get access tokens only for resources it is linked to. The authorize and token endpoints reject any other `resource` with `invalid_target`. To link a client, pass `resources` to `adminCreateOAuthClient` or call `adminLinkClientResource`. Setting `enforcePerClientResources: false` lets any client request any enabled resource, which removes the per-client audience restriction. With dynamic registration or CIMD, a client anyone registered could then get tokens for every enabled API. Keep the default, `true`, and link clients explicitly or through `clientRegistrationDefaultResources`.

```ts
oauthProvider({
  resources: [
    "https://api.example.com",
    {
      identifier: "https://api.example.com/mcp",
      allowedScopes: ["mcp:read", "mcp:write"],
      accessTokenTtl: 300, // 5 minutes, in seconds
    },
  ],
})
```

A string uses the plugin defaults. An object sets per-resource policy:

| Field | Effect |
| --- | --- |
| `name` | Label for admin screens. |
| `allowedScopes` | Requested scopes are narrowed to this list. If none remain, the request fails with `invalid_scope`. |
| `accessTokenTtl` | Access token lifetime in seconds. Defaults to `accessTokenExpiresIn`. |
| `refreshTokenTtl` | Refresh token lifetime in seconds. Defaults to `refreshTokenExpiresIn`. |
| `signingAlgorithm` | JWS algorithm for this resource's access tokens. Defaults to the JWT plugin's latest key. |
| `signingKeyId` | Key ID to sign this resource's access tokens with. |
| `customClaims` | Claims added to every access token for this resource. Reserved JWT claims are stripped. |
| `dpopBoundAccessTokensRequired` | Issue only DPoP-bound tokens for this resource. |
| `disabled` | Stop issuing tokens for this resource. Tokens already issued still verify until they expire. |

In a request for several resources, a `signingAlgorithm` or `signingKeyId` set on one of them applies to the whole token, and resources without one do not conflict with it. The request fails with `invalid_request` only when two resources set different values, because one token carries one signature. To fix it, set the same value on both resources, or leave it unset on one of them.

The resources you configure are written to the `oauthResource` table at startup. Set `resourceSeedMode` to choose what happens to a row that already exists:

- `insertOnly` (default): only adds missing rows, so edits made through the admin endpoints survive restarts.
- `merge`: adds missing rows and updates the fields present in the config.
- `overwrite`: replaces existing rows with the config values.

#### Manage resources at runtime

To change resources without a restart, call these server-only endpoints. Each one needs a session. `resourcePrivileges` decides which users may call them. Without `resourcePrivileges`, any signed-in user may.

| Server method | Method | Path |
| --- | --- | --- |
| `adminCreateOAuthResource` | `POST` | `/admin/oauth2/resources` |
| `adminListOAuthResources` | `GET` | `/admin/oauth2/resources` |
| `adminGetOAuthResource` | `GET` | `/admin/oauth2/resources/:identifier` |
| `adminUpdateOAuthResource` | `PATCH` | `/admin/oauth2/resources/:identifier` |
| `adminDeleteOAuthResource` | `DELETE` | `/admin/oauth2/resources/:identifier` |
| `adminLinkClientResource` | `POST` | `/admin/oauth2/resources/:identifier/clients/:client_id` |
| `adminUnlinkClientResource` | `DELETE` | `/admin/oauth2/resources/:identifier/clients/:client_id` |

```ts
await auth.api.adminLinkClientResource({
  params: { identifier: "https://api.example.com", client_id: clientId },
  headers,
});
```

Deleting a resource makes introspection report its tokens as inactive, while `disabled: true` only stops new issuance. If your API verifies JWTs locally with the JWKS, it keeps accepting them until they expire. Use introspection ([oauth-provider-resource-server.md](./oauth-provider-resource-server.md)) if you need deletion to cut off access immediately. To attach resources during dynamic registration, see Resources for registered clients in [oauth-provider-clients.md](./oauth-provider-clients.md).

If you use Prisma on PostgreSQL, CockroachDB, or MongoDB, declare `allowedScopes` on every resource. Prisma cannot write `null` to a list column, so a resource without `allowedScopes` cannot be stored. Requests that use any configured resource fail until every resource declares it. For the resource the MCP plugin ([mcp.md](./mcp.md)) adds, declare it in `resources` with the same identifier.

### Lifetimes

All values are in seconds.

| Option | Default | Applies to |
| --- | --- | --- |
| `accessTokenExpiresIn` | `3600` (1 hour) | Access tokens issued for a user |
| `m2mAccessTokenExpiresIn` | `3600` (1 hour) | Access tokens from `client_credentials` |
| `idTokenExpiresIn` | `36000` (10 hours) | ID tokens |
| `refreshTokenExpiresIn` | `2592000` (30 days) | Refresh tokens |
| `codeExpiresIn` | `600` (10 minutes) | Authorization codes |
| `assertionMaxLifetime` | `300` (5 minutes) | `private_key_jwt` client assertions |

A refresh token's lifetime restarts at each refresh: the replacement token gets a new `refreshTokenExpiresIn` window. A client that refreshes regularly therefore keeps its grant indefinitely. To end a grant, revoke the refresh token. Deleting the user's consent does not revoke tokens already issued.

To shorten access tokens that carry high-privilege scopes, set `scopeExpirations`. A resource's `accessTokenTtl` and `refreshTokenTtl` can also shorten these lifetimes, but not extend them. When several limits apply, the earliest expiry wins. For example, with the config below, a token with both `read:payments` and `write:payments` expires after 5 minutes.

```ts
oauthProvider({
  scopeExpirations: {
    "write:payments": "5m", // 5 minutes after issuance
    "read:payments": "30m", // 30 minutes after issuance
  },
})
```

### Refresh tokens

Each refresh issues a new refresh token and invalidates the old one, following OAuth 2.1 §4.3.1. Reusing a rotated refresh token is treated as replay: every refresh token the user holds for that client is revoked, and the opaque access tokens they issued are deleted. JWT access tokens stay valid until they expire. After a replay, the refresh fails with `invalid_grant`, and the client must start a new authorization request to get tokens.

Keep the default, `0`, unless your clients lose refresh responses. To let a client retry a refresh after a lost response, set `refreshTokenReuseInterval` to a number of seconds. A retry within that window gets the same response back, including the replacement refresh token. The retry gets that response only when it uses the same client, scopes, resources, and DPoP key as the first refresh. A retry that differs but is otherwise valid gets `invalid_grant`.

Inside the window, reuse is not treated as replay, and the token family is never revoked. A stolen rotated token that passes these checks therefore gets the replacement refresh token. Keep the interval short.

```ts
oauthProvider({
  refreshTokenReuseInterval: 5, // 5 seconds
})
```

To change the string sent to the client, set `formatRefreshToken`. `encrypt` receives the generated refresh token (before it is hashed for storage) and, when there is one, the session ID. It returns the string sent to the client, before the provider adds `prefix.refreshToken`. `decrypt` receives the string the client sends back, without the `prefix.refreshToken` prefix. It must return an object with the `token` that `encrypt` received and, optionally, the `sessionId`.

```ts
oauthProvider({
  formatRefreshToken: {
    encrypt: (token, sessionId) => (sessionId ? `1.${token}.${sessionId}` : token),
    decrypt: (value) => {
      const [version, token, sessionId] = value.split(".");
      return version === "1" && token && sessionId ? { token, sessionId } : { token: value };
    },
  },
})
```

### PKCE

PKCE (RFC 7636) is **required** for every authorization code flow, and only the `S256` method is accepted. To let an admin-created confidential client skip PKCE, set `require_pkce: false` on it. That client then has no protection against intercepted or injected authorization codes beyond its secret and `state` (RFC 9700 §2.1.1). Public clients cannot opt out. For dynamically registered confidential clients, set the default with `clientRegistrationRequirePKCE`.

```ts
await auth.api.adminCreateOAuthClient({
  headers,
  body: {
    redirect_uris: ["https://app.example.com/callback"],
    token_endpoint_auth_method: "client_secret_post",
    require_pkce: false,
  },
})
```

A client without PKCE that requests `offline_access` must send both `openid` and `nonce`. Keep PKCE on unless a legacy client cannot send it, as OAuth 2.1 §7.5.1 recommends.

### DPoP

DPoP stops anyone who lacks the client's private key from replaying a leaked access token, as long as your API verifies the proof. A DPoP-bound token works only alongside a proof signed by that key.

A client gets DPoP-bound tokens (RFC 9449 §4) in any of these cases:

- It registered with `dpop_bound_access_tokens: true` (§5.2).
- It sends `dpop_jkt` on the authorization request.
- It requests a resource with `dpopBoundAccessTokensRequired: true`.
- It sends a `DPoP` proof with the token request.

The token endpoint then requires a DPoP proof (§5) and returns `token_type: "DPoP"`. A refresh needs a proof from the same key. A JWT access token carries the key's thumbprint in `cnf.jkt`. The client calls your API with `Authorization: DPoP <access_token>` and a `DPoP` proof that includes the access token hash, `ath` (§7).

```ts
oauthProvider({
  dpop: {
    proofMaxAgeSeconds: 300, // 5 minutes, in seconds (the default)
    signingAlgorithms: ["ES256", "EdDSA"],
  },
})
```

Set `baseURL` to the public URL clients call. Otherwise proofs fail behind a proxy that rewrites the host, because the expected `htu` comes from `baseURL`, not from the request host.

To verify DPoP-bound tokens in your API, see [Protect your API](./oauth-provider-resource-server.md).

### Custom claims

To add claims to access tokens, set `customAccessTokenClaims`. It receives `user`, `scopes`, `referenceId`, `resources`, and the client's `metadata`. It returns an object of claims to add. Use namespaced claim names, and see RFC 9068 §2.2 for the claims the provider already sets. To stop a token from being issued, for example when the user has left the organization, throw from the callback.

```ts
oauthProvider({
  customAccessTokenClaims: ({ user, scopes, referenceId, resources }) => ({
    "https://example.com/org": referenceId,
    "https://example.com/roles": ["editor"],
  }),
})
```

For ID token and UserInfo claims, see [oauth-provider-openid-connect.md](./oauth-provider-openid-connect.md).

#### Client-specific access token claims

`customAccessTokenClaims` receives only the client's `metadata`. To base a claim on the full client record, add an `extensions[].claims.accessToken` contributor. It receives the full `client` record, `user`, `scopes`, `referenceId`, `resources`, and the client's `metadata`. When a JWT access token is minted, it also receives `grantType`, and `sessionId` for a session-backed grant. It returns an object of claims to add:

```ts
oauthProvider({
  extensions: [{
    claims: {
      accessToken: ({ client }) =>
        client.referenceId ? { "https://example.com/org": client.referenceId } : {},
    },
  }],
})
```

`client.referenceId` is the client's owner, set by `clientReference`. It differs from the top-level `referenceId`, which is the consent reference from `postLogin.consentReferenceId`. Opaque-token introspection re-runs contributors without `grantType` or `sessionId`, so base the claim on the client, scopes, and resources. When names collide, see Claim precedence in [oauth-provider-reference.md](./oauth-provider-reference.md).

A JWT keeps its claims until it expires. An organization claim does not prove the client is still enabled. If your resource server must react to a disabled client right away, it should introspect the token. Introspection reports tokens of disabled clients as inactive.

#### Custom token response fields

To add fields to the token endpoint's JSON response, set `customTokenResponseFields`. It receives `grantType`, `user`, `scopes`, and the client's `metadata`. For the `authorization_code` grant, it also receives `verificationValue`, which holds the original authorization request (`query`), the consent `referenceId`, and the `sessionId`. It returns an object of fields to add. The fields go in the response, not in the token itself. The callback cannot override standard fields such as `access_token` or `scope`. It runs before any token is created.

```ts
oauthProvider({
  customTokenResponseFields: ({ grantType, verificationValue }) =>
    grantType === "authorization_code" && verificationValue?.referenceId
      ? { tenant_id: verificationValue.referenceId }
      : {},
})
```

### Revocation

`POST /oauth2/revoke` implements RFC 7009 §2.1. What it does depends on the token:

- **Opaque access token**: deleted. Refresh tokens from the same grant stay valid.
- **Refresh token**: revoked, and the opaque access tokens it issued are deleted. JWT access tokens it issued stay valid until they expire.
- **JWT access token**: cannot be revoked, because it is never stored. A JWT that still verifies returns 400 `unsupported_token_type` (RFC 7009 §2.2.1). An expired JWT, or one whose audience names a resource that is not registered, is treated as unknown and returns 200.

To limit a JWT access token, keep `accessTokenExpiresIn` short or end the user's session. A JWT that carries a `sid` is reported inactive by introspection and rejected by UserInfo once its session ends. A `client_credentials` JWT has no session. Its lifetime is the only limit.

### Without the JWT plugin

To run without the JWT plugin ([jwt.md](./jwt.md)), set `disableJwtPlugin: true`:

- Access tokens are always opaque, even when a `resource` is requested. The requested resources are still bound to the token and returned by introspection.
- ID tokens are signed with HS256 using the client secret. Public clients have no secret and get no ID token. They can still call UserInfo with the access token.
- `storeClientSecret` defaults to `"encrypted"`, since the secret must be readable to sign ID tokens.

```ts
oauthProvider({
  disableJwtPlugin: true,
})
```

### Storage

By default, your database stores opaque access tokens and refresh tokens as hashes. Client secrets are hashed with the JWT plugin and encrypted without it.

- `storeClientSecret`: `"hashed"` or `{ hash, verify? }` with the JWT plugin; `"encrypted"` or `{ encrypt, decrypt }` without it. The provider fails to start on any other combination.
- `storeTokens`: `"hashed"` or `{ hash: (token, type) => string }`.

To make issued values recognizable to secret scanners, set `prefix`:

```ts
oauthProvider({
  prefix: {
    opaqueAccessToken: "myapp_at_",
    refreshToken: "myapp_rt_",
    clientSecret: "myapp_cs_",
  },
})
```

Set prefixes before your first production deployment and keep them fixed afterwards. To add a prefix to a provider that has already issued values, use `generateOpaqueAccessToken`, `generateRefreshToken`, or `generateClientSecret` instead.

### Device code grant

To enable the device code grant (RFC 8628 §3.4) at `/oauth2/token`, add `oauthDeviceAuthorization()` next to `oauthProvider()`. See [device-authorization.md](./device-authorization.md) for setup.

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `scopes` | `string[]` | `["openid", "profile", "email", "offline_access"]` | Scopes clients may request. Without `openid` the provider is OAuth only. |
| `resources` | `Array<string \| OAuthResourceInput>` | — | Protected resources seeded into `oauthResource` at startup. |
| `resourceSeedMode` | `"insertOnly" \| "merge" \| "overwrite"` | `"insertOnly"` | How seeding treats existing rows. |
| `enforcePerClientResources` | `boolean` | `true` | Requires a client to be linked to every `resource` it requests. |
| `resourcePrivileges` | `(context) => Awaitable<boolean \| undefined>` | — | Authorizes resource actions: `create`, `read`, `update`, `delete`, `list`, `link`, `unlink`. |
| `accessTokenExpiresIn` | `number` | `3600` | Access token lifetime (seconds). |
| `m2mAccessTokenExpiresIn` | `number` | `3600` | `client_credentials` token lifetime (seconds). |
| `idTokenExpiresIn` | `number` | `36000` | ID token lifetime (seconds). |
| `refreshTokenExpiresIn` | `number` | `2592000` | Refresh token lifetime (seconds). |
| `codeExpiresIn` | `number` | `600` | Authorization code lifetime (seconds). |
| `scopeExpirations` | `Record<scope, number \| string \| Date>` | — | Shorter access token lifetimes per scope. Earliest expiry wins. |
| `refreshTokenReuseInterval` | `number` | `0` | Seconds a rotated refresh token can replay the same response. |
| `formatRefreshToken` | `{ encrypt, decrypt }` | — | Custom refresh token encoding sent to clients. |
| `disableJwtPlugin` | `boolean` | `false` | Opaque access tokens and HS256 ID tokens. |
| `dpop` | `{ proofMaxAgeSeconds?, signingAlgorithms? }` | `300` / `["EdDSA", "ES256", "ES512", "PS256", "RS256"]` | DPoP proof validation. |
| `customAccessTokenClaims` | `(info) => Awaitable<Record<string, any>>` | — | Access token claims, also returned by introspection. |
| `customTokenResponseFields` | `(info) => Awaitable<Record<string, unknown>>` | — | Extra token response fields. Standard fields cannot be overridden. |
| `extensions[].claims.accessToken` | `(info) => claims` | — | Client-specific access token claims. Receives the full `client` record, `user`, `scopes`, `referenceId`, `resources`, `metadata`, and, when a JWT is minted, `grantType` / `sessionId`. |
| `storeClientSecret` | `"hashed" \| "encrypted" \| { hash, verify? } \| { encrypt, decrypt }` | `"hashed"` (`"encrypted"` with `disableJwtPlugin`) | Hashing requires the JWT plugin; encryption requires `disableJwtPlugin`. |
| `storeTokens` | `"hashed" \| { hash }` | `"hashed"` | Storage of opaque access tokens and refresh tokens. |
| `prefix` | `{ opaqueAccessToken?, refreshToken?, clientSecret? }` | — | Prefixes for secret scanners; set before first deployment. |

## Notes

- Source: https://www.better-auth.com/docs/plugins/oauth-provider/tokens (better-auth v1.7.23 docs)
- Supported grants: `authorization_code` (S256 PKCE), `refresh_token` (`offline_access` scope), `client_credentials` (machine-to-machine), `device_code` (optional, via `oauthDeviceAuthorization()`). Device code: the device requests codes at `/device/code`, the user approves, and the client polls `/oauth2/token`; the standalone fallback for a client ID unknown to OAuth Provider applies only when `oauthDeviceAuthorization({ validateClient })` accepts it (from the 1.7.10 page; consistent with [device-authorization.md](./device-authorization.md)).
- Failed `client_secret_post` returns `400`; failed `client_secret_basic` returns `401` with a Basic `WWW-Authenticate` challenge. The client is authenticated before the grant is looked up, so an unknown `client_id` returns `invalid_client`.
- Changed in 1.7: protected resources replace the audience list. `validAudiences` is removed; move entries into `resources`; the shortest applicable refresh-token lifetime wins. The token target is locked to the login (later requests can narrow but not widen); custom-claims callbacks receive a list of resources.
- Changed in 1.7: `/oauth2/revoke` on a still-valid JWT access token returns `400 unsupported_token_type`; sign-out revokes session-bound tokens (serverless platforms should set `advanced.backgroundTasks.handler`).
- Changed in 1.7: token, introspection, userinfo, registration and device responses send `Cache-Control: no-store`; code-redemption failures return `400 invalid_grant`; confidential and OIDC PKCE rules (see PKCE) and `refreshTokenReuseInterval` (strict `0` here; `mcp()` defaults to 30).

## Related

- [oauth-provider.md](./oauth-provider.md)
- [oauth-provider-clients.md](./oauth-provider-clients.md)
- [oauth-provider-resource-server.md](./oauth-provider-resource-server.md)
- [oauth-provider-openid-connect.md](./oauth-provider-openid-connect.md)
- [oauth-provider-reference.md](./oauth-provider-reference.md)
- [device-authorization.md](./device-authorization.md)
- [cimd.md](./cimd.md)
- [mcp.md](./mcp.md)
- [jwt.md](./jwt.md)
