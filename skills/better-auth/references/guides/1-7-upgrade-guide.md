# Upgrading to Better Auth 1.7

Upgrade guide from Better Auth 1.6 to 1.7. Most changes are additive; OAuth, OpenID Connect, SAML, SCIM, two-factor, MCP, custom storage, and proxy setups need care.

## Signature / Usage

```bash
npx auth upgrade
```

Upgrade `better-auth` and every `@better-auth/*` package together. The `auth` CLI requires Node.js 22.12 or newer.

Recommended order:

1. Check for duplicate `(providerId, accountId)` account keys and finish manual preparation (OAuth client records, SCIM, Device Authorization).
2. Apply the 1.7 schema: `npx auth migrate` (built-in Kysely adapter), or `npx auth generate` then apply with your own tooling (Drizzle, Prisma, custom).
3. Deploy the 1.7 packages and configuration changes together.
4. Complete post-deployment work (e.g. SCIM reprovisioning).

```sql
SELECT "providerId", "accountId", count(*) FROM account GROUP BY 1, 2 HAVING count(*) > 1;
```

## Options / Props

Schema-changing features and whether manual preparation is needed:

| Feature | What it adds | Manual preparation? |
| --- | --- | --- |
| Protected resources | New resource tables and key columns | No |
| Resource-bound tokens | Resource columns on the token tables | No |
| DPoP | A token-binding column | No |
| Refresh-token reuse window | A cached replay-response column on refresh tokens | No |
| Authorization-code replay | An indexed `authorizationCodeId` column on both token tables | No |
| Back-channel logout | Logout-URL and revoked columns | No |
| Requested user-info claims | A requested-claims column on the token and consent tables | No |
| SCIM | Seven provisioning models plus three optional managed-catalog models, replacing legacy SCIM models | Yes, reprovision |
| Organization team counters | `team.memberCount` and `teamMember.membershipKey` columns | No |
| Provider client store | `oauthApplication` becomes `oauthClient`, plus new token tables | Yes, move client data |
| Device Authorization | Unique indexes on `deviceCode` and `userCode`; optional OAuth grant adds `oauthClientId` and `resources` | Yes, deduplicate; MySQL/SQL Server also bound strings |

Which section applies:

| If your project | Section |
| --- | --- |
| Uses email/password, social login, generic OAuth, One Tap, or SSO | As a login client |
| Uses Expo or React Native | Expo and React Native |
| Runs its own OAuth or OpenID provider | As an identity provider |
| Runs MCP | MCP |
| Uses SAML or SSO domain verification | Enterprise SSO |
| Uses SCIM | SCIM |
| Uses Stripe billing | Stripe |
| Uses two-factor auth, magic links, or email OTP | Two-factor and passwordless security |
| Uses the Device Authorization plugin | Device Authorization |
| Uses a custom database adapter, secondary storage, or rate-limit store | Custom adapters and storage |

## Notes

### As a login client

- Account identity: 1.7.0 through 1.7.2 added a required `issuer` column and a unique index on `issuer` + `accountId`; 1.7.3 removes the requirement. Accounts are recognized by `providerId` + `accountId` as in 1.6. Databases that ran 1.7.0-1.7.2 must relax the constraint (drop index `account_issuer_accountId_uidx` before dropping the column; Postgres: `ALTER COLUMN issuer DROP NOT NULL`; MySQL: `ALTER TABLE account MODIFY issuer VARCHAR(255) NULL` then `DROP INDEX account_issuer_accountId_uidx ON account` (non-strict MySQL fills `issuer` with an empty string instead of rejecting inserts, so the unique index silently becomes a constraint on `accountId` alone; relax the column there too); SQL Server: `ALTER TABLE account ALTER COLUMN issuer <existing column type> NULL` (keep the existing type) then `DROP INDEX account_issuer_accountId_uidx ON account` (the upstream tab shows the MySQL `MODIFY` form for both MySQL and SQL Server, but T-SQL has no `MODIFY`; use `ALTER COLUMN`); SQLite: drop index then column; Prisma/Drizzle: `npx auth@latest generate`; MongoDB: `db.account.dropIndex("account_issuer_accountId_uidx")`).
- Account selectors: `unlinkAccount` takes `accountId` (the `id` from `listAccounts`). `getAccessToken`, `refreshToken`, `accountInfo` take exactly one of `{ accountId: account.id, userId? }` or `{ useAccountCookie: true, userId? }`. Remove `providerId` from selectors.
- Custom OAuth providers: OIDC discovery providers use verified `sub`, plain OAuth providers use `id`; set `accountSubject` if neither is immutable. `getUserInfo().user` holds only mutable local-user fields; `mapProfileToUser` can no longer return `id`; `accountInfo` exposes `account.accountId` instead of `user.id`.
- Microsoft accounts use the stable `oid` claim instead of pairwise `sub`; migrate `providerId: "microsoft"` and `"microsoft-entra-id"` rows before production traffic. Generic OAuth `microsoftEntraId` helper requires a concrete tenant GUID (not `common` / `organizations` / `consumers`).
- Generic OAuth is rebuilt on the social-provider path: `signIn.oauth2({ providerId })` -> `signIn.social({ provider })`; `oauth2.link()` -> `linkSocial()`; callback `/api/auth/oauth2/callback/:id` -> `/api/auth/callback/:id`; remove `genericOAuthClient()`; PKCE defaults on; remove `issuer` / `requireIssuerValidation`; `authorizationUrlParams` / `tokenUrlParams` accept only plain string maps.
- One identity-token verifier: replace a custom provider's `verifyIdToken` with an `idToken` config (keys, issuer, audience). PayPal no longer accepts identity-token login (use redirect flow).
- Electron: requires S256 PKCE; upgrade `@better-auth/electron` client and server together; app URL scheme must be in `trustedOrigins`; `disableOriginOverride` removed.
- `generateState(c, link, additionalData)` -> `generateState(c, options)`.
- Callback error `email_doesn't_match` renamed `email_does_not_match`.
- Google One Tap requires `clientId` on `oneTap()` or the Google provider; accounts bind to verified Google subject.
- Scopes are kept across re-login and token refresh via `account.scope` (no schema change).
- SIWE: remove wallet address / chain from `siwe.nonce()` / `siwe.getNonce()`; server `getNonce` must return an ERC-4361 nonce of 8-250 alphanumeric chars.
- Discovery providers now verify identity tokens; unverifiable tokens are rejected.
- Signed-assertion (private-key JWT) setups are validated at startup; `createAuthorizationCodeRequest` / `createRefreshAccessTokenRequest` / `createClientCredentialsTokenRequest` are replaced by async `authorizationCodeRequest` / `refreshAccessTokenRequest` / `clientCredentialsTokenRequest`.
- `addOAuthServerContext` carries trusted data (e.g. anonymous-link state) across the OAuth redirect.

### Expo and React Native

- Expo client uses async SecureStore APIs; `authClient.getCookie()` returns a promise (`const cookie = await authClient.getCookie();`). Custom storage must provide `getItem`, `getItemAsync`, `setItem`, `setItemAsync`.

### As an identity provider (`@better-auth/oauth-provider`)

- Migrate `oauthApplication` -> `oauthClient` manually (`redirectUrls` -> `redirectUris`, `metadata` to JSON, set grant types and token-endpoint auth method); drop/rename legacy `oauthAccessToken` before creating the 1.7 token tables. For existing `oauthClient` rows: add nullable `applicationType`, `clientDiscoveryId`, `clientCredentialsScopes`; remove `clientCredentialGrantDefaultScopes`; dedupe `oauthClientResource`; drop `type` and `public` columns. `jwks: [key]` -> `jwks: { keys: [key] }`; `oauthProvider.silenceWarnings` removed.
- `validAudiences` removed; audiences are `resources`. Shortest applicable refresh-token lifetime wins. Dynamic clients: set `enforcePerClientResources: false` if needed and register `grant_types` explicitly. Configure `clientRegistrationDefaultResources` / `clientRegistrationAllowedResources` before enabling Dynamic Client Registration.
- Token target is locked to the login; custom-claims callbacks receive a resource list.
- DPoP: `verifyAccessToken` renamed `verifyBearerToken` (rejects DPoP tokens); use `verifyAccessTokenRequest` on DPoP-capable endpoints; requires database-backed verification storage. Behind a proxy, canonicalize request scheme/host to `baseURL` before the provider reads it.
- Scope options: `scopes` -> `requiredScopes`, `challengeScopes` for `WWW-Authenticate`; use `createInsufficientScopeError` and `createResourceServerChallenge`.
- Sign-out revokes session-bound tokens and sends back-channel logout (requires JWT plugin; HTTPS public URLs only). On serverless set `advanced.backgroundTasks.handler`.
- `/oauth2/end-session` accepts form POST and may require browser confirmation without a valid `id_token_hint`.
- Custom ID-token claims cannot override reserved protocol claims; ID tokens report `acr: "0"` and drop profile/email scope claims (use UserInfo); `jwt.sign` callback alg must match `keyPairConfig.alg`.
- `/oauth2/revoke` on a valid JWT access token returns `400 unsupported_token_type`; `max_age` is enforced (store timestamps with date/timestamp types); client creation returns `201`; unauthenticated DCR clients default to confidential `client_secret_basic` (register `token_endpoint_auth_method: "none"` for public); token requests must use the registered auth method; `response_types` / `grant_types` must be reciprocal; OAuth endpoints return RFC 6749 `{ error, error_description }`; UserInfo accepts form-body bearer token (not both header and body); server-side OAuth requests refuse redirects; PKCE rules (`clientRegistrationRequirePKCE: false` only for confidential clients); `refreshTokenReuseInterval` tolerates retries (strict `0` default for OAuth Provider; `mcp()` defaults 30 s).
- Extension surface: `extendOAuthProvider(ctx, ...)` in a plugin's `init(ctx)`; `provider.issueTokens(...)`, `provider.authenticateClient(...)`, `provider.hashToken(...)`.
- The old `oidcProvider` plugin is removed: use `oauthProvider` from `@better-auth/oauth-provider`.

### MCP

- MCP moves to `@better-auth/mcp` (with `@better-auth/cimd` and the official v2 `@modelcontextprotocol/client` / `server`). Requires `jwt()`; compose `mcp()` with `cimd({ fetchClientMetadataResource, metadataProfile: "mcp-2026-07-28" })`. Move `oidcConfig` options to top level, set one HTTPS `resource`, rename `withMcpAuth` -> `requireMcpAuth`, `mcpHandler` -> `createMcpProtectedRequestHandler`; expose only `POST`. Endpoints move from `/mcp/*` to `/oauth2/*`. Unauthenticated DCR is off unless both `allowDynamicClientRegistration` and `allowUnauthenticatedClientRegistration` are set.

### Enterprise SSO

- OIDC uses verified `sub`, SAML uses signed `NameID`; `oidcConfig.mapping.id` / `samlConfig.mapping.id` removed. Manual SAML without `idpMetadata.metadata` must set `idpMetadata.entityID`.
- IdP-initiated SAML is off by default (`saml.allowIdpInitiated: true` to restore).
- SAML certificates may be a list; every config needs a signing-cert source. ACS URL: `/sso/saml2/sp/acs/:providerId`; set post-login redirect via `callbackURL` in `signIn.sso()`; error codes in redirects are full lowercased codes (e.g. `saml_multiple_assertions`).
- `wantAssertionsSigned` now verifies the assertion element itself. `/sso/update-provider` rejects partial mappings. OIDC SSO discovery works on Cloudflare Workers.

### SCIM

- Three connection modes: static (`scim({ connections })`), application-owned runtime (`authentication.verifyBearerToken`), plugin-managed (`managedConnections`). Legacy runtime endpoints, SCIM client plugin, `defaultSCIM`, `staticProviders`, `trustedDomains`, `providerOwnership` removed. Full reprovisioning is required (maintenance window; new tables `scimConnectionBinding`, `scimIdentityTombstone`, `scimSubject`, `scimUser`, `scimGroup`, `scimGroupMember`, `scimProjectionGrant`, plus managed `scimManagedConnection`, `scimManagedCredential`, `scimManagedConnectionEvent`). Requires native interactive transactions (Cloudflare D1 unsupported). Never links by email; use `identity.resolveUser` for retained Users (otherwise `409 Conflict`).

### Stripe

- Organization-scoped subscriptions require `organization: { enabled: true }` in `stripe()`. `onSubscriptionCancel` `event` is now required.

### Behind a proxy

- With `baseURL: { allowedHosts }`, forwarded headers are ignored unless `advanced.trustedProxyHeaders: true`. Without `baseURL.fallback`, dynamic base URLs fail closed. Canonicalize incoming scheme/host to `baseURL` for consent/login redirects and DPoP `htu`.

### Custom adapters and storage

- `incrementOne` / `consumeOne` are optional again on database adapters. Secondary storage must implement `increment(key, ttl)` and `getAndDelete(key)`. Rate-limit storage needs a single `consume(key, rule)` (no `get` / `set`).
- `experimental: { joins: true }` -> `advanced: { database: { joins: true } }`. With `usePlural: true` Drizzle many-to-one relation keys are singular. `getIp` renamed `getIP`.

### Captcha

- Rules match full paths or explicit wildcards: replace `/sign-in` with `/sign-in/*` or `/sign-in/**`.

### Device Authorization

- Unique indexes on `deviceCode` and `userCode`; dedupe first. MySQL/SQL Server must bound columns and clean values over 191 characters (custom generators stay within 191). OAuth device grants are opt-in via `oauthDeviceAuthorization()` alongside `oauthProvider()`; client side `oauthDeviceAuthorizationClient()` from `@better-auth/oauth-provider/client`.

### Two-factor and passwordless

- `enableTwoFactor` accepts `method` of `"otp"` or `"totp"` (default `"totp"`) and returns it; `totpURI` and backup codes only for `"totp"`.
- Magic-link / email-OTP sign-in removes unproven passwords and linked accounts and revokes sessions for never-verified emails.

### Other behavior changes

- Token/introspection/userinfo/registration/device responses send `Cache-Control: no-store`; userinfo returns `401 invalid_token`; code-redemption failures return `400 invalid_grant`; Drizzle adapter throws on invalid affected-row count; `organization.updateTeam` no longer accepts `id` / `createdAt` / `updatedAt`; cookie cache is bound to the `session_token` cookie; `session.delete` hooks run on sign-out with `secondaryStorage` + `preserveSessionInDatabase`; failed two-factor challenge cleanup returns `FAILED_TO_INVALIDATE_TWO_FACTOR_CHALLENGE`.

- Source: https://www.better-auth.com/docs/guides/1-7-upgrade-guide (better-auth v1.7.10 docs)

## Related

- [Create a DB Adapter](./create-a-db-adapter.md)
- [Dynamic Base URL](./dynamic-base-url.md)
