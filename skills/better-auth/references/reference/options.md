# Configuration Options

## Signature / Usage

```typescript
betterAuth({
  appName: "My App",
  baseURL: "https://example.com",
  secret: process.env.BETTER_AUTH_SECRET,
  // ...see Options / Props below for all groups
})
```

## Options / Props

Complete reference for all configuration options available in `betterAuth({...})`.

### Core Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `appName` | `string` | — | Application name identifier |
| `baseURL` | `string` | inferred from request | Base URL where your application server is hosted. Always set explicitly in production. Fallback: `BETTER_AUTH_URL` env var |
| `basePath` | `string` | `/api/auth` | Path where Better Auth routes are mounted. Overridden if path component exists in `baseURL` |
| `secret` | `string` | `"better-auth-secret-..."` | Secret used for encryption, signing, and hashing. Fallback: `BETTER_AUTH_SECRET` or `AUTH_SECRET` env vars. Generate with `openssl rand -base64 32` |
| `secrets` | `Array<{ version: number; value: string }>` | — | Versioned secrets for non-destructive rotation within the same encryption format and purpose. First entry is current key; remaining are decryption-only. Data encrypted for a purpose stays valid while its key remains configured. Env: `BETTER_AUTH_SECRETS=2:key,1:key`. When set, `secret` (singular) is only a fallback for decrypting legacy pre-envelope data within the same purpose; retaining it does not preserve pending OAuth or SAML state cookies or OAuth Proxy payloads when upgrading from shared keys to purpose-specific keys (see security.md) |

#### Dynamic Base URL (`baseURL` object form)

```typescript
baseURL: {
  allowedHosts: ["myapp.com", "preview-*.myapp.com"],
  protocol: "https",
  fallback: "https://myapp.com",
}
```

Better Auth derives the host from the `Host` header and then the request URL, validates it against `allowedHosts`, and builds the request-specific base URL. Forwarded host and protocol headers are ignored unless you set `advanced.trustedProxyHeaders: true` (changed in 1.7). `allowedHosts` supports exact matches, wildcards (`*.vercel.app`, `preview-*.myapp.com`) and port wildcards (`localhost:*`), and is added to `trustedOrigins` (localhost entries get both `http` and `https`). Because `allowedHosts` entries become trusted origins, avoid wildcards over shared hosting suffixes such as `*.vercel.app` (they match deployments you do not control); restrict patterns to domains you own. `protocol`: `"http"`, `"https"`, or `"auto"` (default); `"auto"` uses `x-forwarded-proto` only when `advanced.trustedProxyHeaders` is `true`, then the request URL, then HTTP for local loopback hosts, otherwise HTTPS; it also affects the cookie `Secure` flag (override with `advanced.useSecureCookies`). `fallback`: used when no request host is available or the host does not match; without it, unresolved or unknown hosts throw (fail closed). Its origin is added to `trustedOrigins`. Use `fallback` carefully; it can hide misconfiguration.

### `emailVerification`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `sendVerificationEmail` | `function` | — | Function to send verification emails |
| `sendOnSignUp` | `true \| false \| undefined` | — | `undefined` follows `requireEmailVerification` setting |
| `sendOnSignIn` | `boolean` | `false` | Send verification email on sign in |
| `autoSignInAfterVerification` | `boolean` | — | Automatically sign in after email is verified |
| `expiresIn` | `number` (seconds) | `3600` | Verification token expiry |

### `emailAndPassword`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | `boolean` | `false` | Enable email/password authentication |
| `disableSignUp` | `boolean` | — | Disable new user registration |
| `requireEmailVerification` | `boolean` | — | Require verified email before sign in |
| `minPasswordLength` | `number` | `8` | Minimum password length |
| `maxPasswordLength` | `number` | `128` | Maximum password length |
| `autoSignIn` | `boolean` | — | Auto sign in after registration |
| `sendResetPassword` | `function` | — | Function to send password reset email |
| `resetPasswordTokenExpiresIn` | `number` (seconds) | `3600` | Password reset token expiry |
| `onPasswordReset` | `function` | — | Callback triggered after a user's password is reset. Runs after the new password is saved and, when `revokeSessionsOnPasswordReset` is enabled, after sessions are revoked |
| `revokeSessionsOnPasswordReset` | `boolean` | `false` | Revoke all of the user's sessions when resetting the password. For database sessions, revocation and the password change run in one transaction when transactions are enabled for the adapter; secondary-storage sessions are removed after commit on a best-effort basis |
| `onExistingUserSignUp` | `function` | — | Callback when existing user signs up again |
| `password` | `object` | — | Custom `hash` and `verify` functions |

### `session`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `modelName` | `string` | `"sessions"` | Database model/table name |
| `expiresIn` | `number` (seconds) | `604800` (7 days) | Session lifespan |
| `updateAge` | `number` (seconds) | `86400` (1 day) | Threshold for extending expiry on use |
| `disableSessionRefresh` | `boolean` | `false` | Disable automatic session refresh |
| `storeSessionInDatabase` | `boolean` | `false` | Store session in database |
| `preserveSessionInDatabase` | `boolean` | `false` | Keep session in DB after expiry |
| `cookieCache.enabled` | `boolean` | — | Enable short-lived signed cookie cache |
| `cookieCache.maxAge` | `number` (seconds) | — | Cookie cache duration |
| `cookieCache.strategy` | `"compact" \| "jwt" \| "jwe"` | `"compact"` | Cookie cache encoding; `"jwt"` uses HS256 by default, or the JWT plugin's keys with `sessionCookieCache: true` |

### `account`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `modelName` | `string` | `"accounts"` | Database model/table name |
| `encryptOAuthTokens` | `boolean` | `false` | Encrypt stored OAuth tokens |
| `updateAccountOnSignIn` | `boolean` | — | Update account data on each sign in |
| `storeAccountCookie` | `boolean` | `false` (auto-true if no DB) | Store account in cookie (five-minute max age, refreshed when provider account data is rewritten; forward the returned `Set-Cookie` in server-side code). `getAccessToken`, `refreshToken`, and `accountInfo` require an explicit `accountId` or `useAccountCookie: true` |
| `accountLinking.enabled` | `boolean` | `true` | Allow linking multiple providers |
| `accountLinking.trustedProviders` | `string[] \| async function` | — | Providers allowed for automatic linking |
| `accountLinking.allowDifferentEmails` | `boolean` | — | Allow linking accounts with different emails |
| `accountLinking.allowUnlinkingAll` | `boolean` | — | Allow unlinking all providers |

### `database`

| Option | Type | Description |
|--------|------|-------------|
| `dialect` | string | Database dialect (e.g., `"postgres"`, `"mysql"`, `"sqlite"`) |
| `type` | string | Database type |

Supported databases: PostgreSQL, MySQL, SQLite.

### `secondaryStorage`

Secondary storage for session data, verification records, and rate limit data. Suitable for Redis or KV stores.

### `verification`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `disableCleanup` | `boolean` | `false` | Disable automatic cleanup of expired records |
| `storeIdentifier` | `"plain" \| "hashed" \| function` | `"hashed"` | How to store the identifier |
| `storeInDatabase` | `boolean` | `false` | Store verification records in database even when `secondaryStorage` is configured |

With `storeIdentifier.overrides`, Magic Link identifiers start with `magic-link:` and database-backed OAuth and SAML relay-state identifiers start with `auth-state:`. Overrides match these purpose prefixes before the identifier is stored or hashed; the token sent in a Magic Link and the state sent to an OAuth / SAML provider are unchanged. Custom `storeIdentifier` hashers should hash the complete identifier including its prefix. When upgrading, update overrides targeting these flows, upgrade servers sharing verification storage together, expect previously issued Magic Links to stop redeeming, and restart OAuth / SAML sign-ins using Better Auth-generated state that began before the upgrade. No verification table schema or user/account migration is required.

### `socialProviders`

Object with provider names as keys. Per-provider options:

| Option | Type | Description |
|--------|------|-------------|
| `clientId` | `string` | OAuth client ID |
| `clientSecret` | `string` | OAuth client secret |
| `clientKey` | `string` | Client key (some providers) |
| `redirectURI` | `string` | Override redirect URI |
| `scope` | `string[]` | OAuth scopes to request |
| `mapProfileToUser` | `function` | Map provider profile to user fields |
| `disableSignUp` | `boolean` | Disable new account creation via this provider |
| `disableImplicitSignUp` | `boolean` | Disable implicit sign up |
| `overrideUserInfoOnSignIn` | `boolean` | Update user info from provider on each sign in |
| `requireEmailVerification` | `boolean` | Require this provider's email to be verified before a session is created. Opt-in per provider, independent of `emailAndPassword.requireEmailVerification`; only for providers with a trustworthy `email_verified` signal |
| `prompt` | `"select_account" \| "consent" \| "login" \| "none" \| "select_account consent"` | OAuth prompt parameter |
| `responseMode` | `"query" \| "form_post"` | OAuth response mode |
| `getUserInfo` | `function` | Custom user info retrieval |
| `refreshAccessToken` | `function` | Custom token refresh |
| `verifyIdToken` | `function` | Custom ID token verification |
| `disableIdTokenSignIn` | `boolean` | Disable sign in via ID token |
| `authorizationEndpoint` | `string` | Custom authorization endpoint URL |

### `trustedOrigins`

| Type | Description |
|------|-------------|
| `string[]` | Static list of trusted origins |
| `async function` | Dynamic function returning origins per request |

Wildcard pattern support:
- `?` — exactly one character (except `/`)
- `*` — zero or more characters not crossing `/`
- `**` — zero or more characters including `/`

```typescript
trustedOrigins: [
  "https://example.com",
  "https://*.example.com",       // all subdomains
  "exp://192.168.*.*:*/**",      // custom scheme with path
  "chrome-extension://EXTENSION_ID",
]
```

For `http://` and `https://` URLs, patterns match the full origin (paths and query strings ignored). For custom schemes (like `exp://` or `myapp://`), wildcard patterns match against the full URL including paths. A non-wildcard pattern matches by scheme and authority: a host-less entry such as `myapp://` or `exp://` trusts every host of that scheme, while a host-bearing entry such as `myapp://callback` must match that host exactly (not `myapp://callback.attacker.tld`). The separator is `/`, so `http://*.example.com` matches both `http://api.example.com` and `http://api.app.example.com` (changed in 1.7).

### `user`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `modelName` | `string` | `"user"` | Database model/table name |
| `fields` | `object` | — | Map to rename columns in the database |
| `additionalFields` | `object` | — | Add custom fields to the user table |
| `changeEmail.enabled` | `boolean` | — | Allow email changes |
| `changeEmail.sendChangeEmailConfirmation` | `function` | — | Send confirmation email on change |
| `changeEmail.updateEmailWithoutVerification` | `boolean` | — | Skip verification on email change |
| `deleteUser.enabled` | `boolean` | — | Allow account deletion |
| `deleteUser.sendDeleteAccountVerification` | `function` | — | Send verification before deletion |
| `deleteUser.beforeDelete` | `function` | — | Hook before user deletion |
| `deleteUser.afterDelete` | `function` | — | Hook after user deletion |

### `rateLimit`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | `boolean` | `true` in prod, `false` in dev | Enable rate limiting |
| `window` | `number` (seconds) | `10` | Rate limit window |
| `max` | `number` | `100` | Max requests per window |
| `customRules` | `object` | — | Path-specific rate limit rules |
| `storage` | `"memory" \| "database" \| "secondary-storage"` | `"memory"` | Where to store rate limit state |
| `modelName` | `string` | `"rateLimit"` | Database model name |

### `advanced`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `ipAddress.ipAddressHeaders` | `string[]` | — | Custom headers for IP detection |
| `ipAddress.disableIpTracking` | `boolean` | — | Disable IP address tracking |
| `useSecureCookies` | `boolean` | — | Force secure cookies |
| `disableCSRFCheck` | `boolean` | — | Disable all CSRF protection |
| `disableOriginCheck` | `boolean` | — | Disable origin validation (open redirect risk) |
| `crossSubDomainCookies.enabled` | `boolean` | — | Share cookies across subdomains |
| `crossSubDomainCookies.additionalCookies` | `string[]` | — | Additional cookies to share |
| `crossSubDomainCookies.domain` | `string` | — | Root domain for cross-subdomain cookies |
| `cookies` | `object` | — | Per-cookie customization |
| `defaultCookieAttributes` | `object` | — | Default attributes for all cookies (`httpOnly`, `secure`, etc.) |
| `cookiePrefix` | `string` | — | Custom prefix for cookie names |
| `database.generateId` | `function \| false \| "serial" \| "uuid"` | — | Custom ID generation strategy |
| `database.defaultFindManyLimit` | `number` | `100` | Default limit for findMany queries |
| `database.joins` | `boolean` | `false` | Enable database joins for adapters that support them; when disabled, related data is fetched via separate queries. Renamed in 1.7 from `database.experimentalJoins` (and `experimental.joins`) |
| `database.validateSchema` | `boolean` | `true` | Compare the schema with the tables Better Auth writes before the first request and report every difference with its fix. Enabled by default, including in production; set `false` to disable |
| `backgroundTasks.handler` | `function` | — | Handler for background tasks (e.g., `waitUntil` in serverless) |
| `skipTrailingSlashes` | `boolean` | `false` | Normalize trailing slashes in routes |
| `trustedProxyHeaders` | `boolean` | — | Trust `X-Forwarded-Host` / `X-Forwarded-Proto` when resolving a dynamic base URL (`baseURL` with `allowedHosts`); they are ignored otherwise (changed in 1.7) |

### `logger`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `disabled` | `boolean` | — | Disable all logging |
| `disableColors` | `boolean` | — | Disable colored output |
| `level` | `"debug" \| "info" \| "warn" \| "error"` | `"warn"` | Minimum log level |
| `log` | `function` | — | Custom log handler `(level, message, ...args)` |

### `hooks`

Request lifecycle hooks:

| Option | Type | Description |
|--------|------|-------------|
| `before` | `function` | Execute before request processing |
| `after` | `function` | Execute after request processing |

### `databaseHooks`

Per-model lifecycle hooks. Available models: `user`, `session`, `account`, `verification`.

| Option | Type | Description |
|--------|------|-------------|
| `{model}.create.before` | `function` | Before record creation |
| `{model}.create.after` | `function` | After record creation |
| `{model}.update.before` | `function` | Before record update |
| `{model}.update.after` | `function` | After record update |

### `onAPIError`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `throw` | `boolean` | — | Re-throw errors instead of returning error responses |
| `onError` | `function` | — | Custom error handler |
| `errorURL` | `string` | `/api/auth/error` | URL for error redirects |
| `customizeDefaultErrorPage` | `object` | — | Customize error page appearance (colors, sizes, fonts) |

### `disabledPaths`

Disable specific authentication endpoints:

```typescript
disabledPaths: ["/sign-up/email", "/sign-in/email"]
```

### `telemetry`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | `boolean` | `false` | Enable telemetry |

### `plugins`

Array of plugin instances to extend Better Auth functionality.

```typescript
plugins: [myPlugin(), anotherPlugin()]
```

## Notes

- Most string options support environment variable fallbacks
- Options marked with warnings disable security checks — use with caution
- For `baseURL`, always set explicitly rather than relying on request inference
- The official example uses `*.vercel.app`; this page substitutes a self-owned domain pattern because shared-suffix wildcards also trust third-party deployments.
- Background tasks enable optimistic responses in serverless environments
- `database.validateSchema` defaults to `true` in every environment, including production (the official options table says "true outside production", which contradicts the database docs and the v1.7.10 source, where validation runs unless the option is `false`) (Adapted from the official docs).

## Related

- [security](./security.md)
- [telemetry](./telemetry.md)
