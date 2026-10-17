# Types

Public types of `@supabase/server`: auth modes, configuration, context, claims, and more.

## Signature / Usage

| Name | Description |
| --- | --- |
| `AuthMode` | Authentication mode that determines what credentials a request must provide |
| `AuthModeWithKey` | Extended auth mode that supports targeting a specific named key |
| `AuthConfig` | Accepted shape of the `auth` option: one mode, or an ordered list of modes tried left to right |
| `CredentialedAuthMode` | An auth mode that requires a credential: every `AuthModeWithKey` except `"none"`, keyed forms included |
| `AuthResult` | Result of credential verification: the resolved auth mode, the verified token (for `"user"` mode), decoded JWT claims, and the matched key name (for `"publishable"` / `"secret"` modes) |
| `Credentials` | Raw credentials extracted from an incoming HTTP request, produced by `core.extractCredentials` from the `Authorization` and `apikey` headers |
| `ClientAuth` | Auth identity for client creation functions |
| `CreateAdminClientOptions` | Options for `core.createAdminClient` |
| `CreateContextClientOptions` | Options for `core.createContextClient` |
| `ErrorResponseConfig` | Controls how much of an error goes in the response body (`errors`) |
| `ShortCircuitConfig` | The option shared by every middleware that answers a request itself; each applies `errors` to its own responses |
| `OAuthProtectedResourceConfig` | Configuration for `withOAuthProtectedResource`. Both options accept a fixed string or a function of the request, and both default to values derived from the request as it arrives through the Supabase Edge Functions proxy, so no configuration is needed there |
| `ResourceMetadataOptions` | Options for `resourceMetadataResponse` |
| `SupabaseContext` | The Supabase context created for each authenticated request. Contains pre-configured Supabase clients and the caller's identity. Identical regardless of which layer or adapter produced it |
| `JWTClaims` | Standard JWT claims as defined by RFC 7519, extended with Supabase-specific fields. The raw JWT payload; use `UserClaims` for a normalized, camelCase view |
| `SupabaseEnv` | Resolved Supabase environment configuration: the project URL, API keys, and JWKS. Typically resolved automatically from environment variables by `core.resolveEnv`, but can be passed explicitly via the `env` option |
| `UserClaims` | Normalized, camelCase view of the authenticated user's identity, derived from `JWTClaims`. For the full Supabase `User` object (including email confirmation status, providers, etc.), call `supabase.auth.getUser()` using the context client |
| `WithSupabaseConfig` | Configuration for `withSupabase` and `createSupabaseContext`: which auth modes are accepted, environment overrides, and CORS behavior |
| `UrlOption` | A configured URL: either a fixed value, or derived per request |
| `UnauthorizedResponseOptions` | Options for `unauthorizedResponse` |

### AuthMode

- `"none"`: No credentials required. Every request is accepted.
- `"publishable"`: Requires a valid publishable key in the `apikey` header. Matches only the `default` key.
- `"secret"`: Requires a valid secret key in the `apikey` header (timing-safe comparison). Matches only the `default` key.
- `"user"`: Requires a valid JWT in the `Authorization: Bearer <token>` header.

Bare `"publishable"` / `"secret"` resolve the `default` key from `SUPABASE_PUBLISHABLE_KEYS` / `SUPABASE_SECRET_KEYS`. To target another key or accept any key, see `AuthModeWithKey`.

```ts
// Single mode
withSupabase({ auth: 'user' }, handler)

// Multiple modes — the first match wins.
// A mode is tried only when its credential is present; a JWT that is
// present but fails verification rejects immediately rather than falling
// through to the next mode.
withSupabase({ auth: ['user', 'publishable'] }, handler)
```

### AuthModeWithKey

Use the colon syntax (`"publishable:web_app"`) to require a specific named key from the `SUPABASE_PUBLISHABLE_KEYS` or `SUPABASE_SECRET_KEYS` JSON object. Use `"publishable:*"` or `"secret:*"` to accept any key in the set. The bare form without a colon (`"publishable"` / `"secret"`) matches only the `default` key.

```ts
// Accept only the "mobile" publishable key
withSupabase({ auth: 'publishable:mobile' }, handler)

// Accept any secret key
withSupabase({ auth: 'secret:*' }, handler)

// Mix named keys with other modes
withSupabase({ auth: ['user', 'publishable:web_app'] }, handler)
```

### AuthConfig

Accepted shape of the `auth` option: one mode, or an ordered list of modes tried left to right.

`"none"` accepts every request, so it only carries meaning as the last entry of a list: the modes before it are the ones that can produce an identity, and anything after it is unreachable. On its own in a list (`["none"]`) it says nothing that a bare `auth: 'none'` doesn't. So the type accepts `"none"` alone or in final position behind at least one credentialed mode, and nowhere else.

A single mode needs no wrapping array: `"user"` and `["user"]` are the same configuration, and the unwrapped form is the one the union names first, so it is what shows up in editor completions.

```ts
withSupabase({ auth: 'user' }, handler)              // one mode
withSupabase({ auth: ['secret', 'user'] }, handler)  // first match wins
withSupabase({ auth: ['user', 'none'] }, handler)    // optional user
withSupabase({ auth: 'none' }, handler)              // no credentials required
```

### ErrorResponseConfig

Accepted as `errors` by `withSupabase` and by every middleware that answers a request directly: `withClaims`, `withRequiredClaims`, `withPostgresClient`, `withPostgresAdminClient` and `withOAuthProtectedResource`.

```ts
// Full payload: source, code, message, hint, docs, details
withSupabase({ auth: 'user' }, handler)

// Trimmed: code and message only
withSupabase({ auth: 'user', errors: { detailed: false } }, handler)
```

### WithSupabaseConfig

```ts
// Require authenticated users, auto-CORS enabled (default)
const config: WithSupabaseConfig = { auth: 'user' }

// Accept users or service-to-service calls, custom CORS headers
const config: WithSupabaseConfig = {
  auth: ['user', 'secret'],
  cors: { 'Access-Control-Allow-Origin': 'https://myapp.com' },
}

// No auth required, CORS disabled
const config: WithSupabaseConfig = { auth: 'none', cors: 'disabled' }
```

### Deprecated

- `Allow`: Deprecated. Use `AuthMode` instead. Will be removed in a future major release.
- `AllowWithKey`: Deprecated. Use `AuthModeWithKey` instead. Will be removed in a future major release.

## Notes

- Source: https://supabase.com/llms/server.txt (Types section, fetched 2026-10). The source does not list the fields of each type. The only `SupabaseContext` members confirmed from the examples are `supabase`, `supabaseAdmin`, `userClaims`, `jwtClaims`, `authMode`; no other fields are written here.
- `Allow` / `AllowWithKey` are deprecated (successors: `AuthMode` / `AuthModeWithKey`).
- `AuthResult` carries `userClaims` (e.g. `auth.userClaims!.id`), a different normalized shape from the bridge's `jwtClaims` (`sub`); see the mapping table in migrating-off-adapters.md.

## Related

- [middleware](./middleware.md)
- [primitives](./primitives.md)
- [errors](./errors.md)
- [overview](./overview.md)
