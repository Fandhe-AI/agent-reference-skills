# Primitives

Framework-agnostic low-level functions (`@supabase/server/core`). Compose them yourself for custom frameworks or edge runtimes.

## Signature / Usage

| Name | Role |
| --- | --- |
| `createAdminClient` | Admin Supabase client that bypasses Row-Level Security (secret key) |
| `createContextClient` | Supabase client scoped to the caller's context (publishable key and optionally the caller's JWT; RLS applies) |
| `extractCredentials` | Pure extraction of the `Authorization` / `apikey` headers (no validation) |
| `resolveEnv` | Resolves Supabase environment configuration from runtime environment variables |
| `verifyAuth` | Extracts credentials and verifies them in a single step |
| `verifyCredentials` | Verifies pre-extracted credentials against allowed auth modes |

Option types: `VerifyAuthOptions` (options for `verifyAuth`), `VerifyCredentialsOptions` (options for `verifyCredentials`). `CreateAdminClientOptions` / `CreateContextClientOptions` are in types.md.

### createAdminClient

Creates an admin Supabase client that bypasses Row-Level Security. Uses a secret key for authentication, giving full access to all data. Stateless: one client per request.

Which key is used: with `auth.keyName` set, that named key from `SUPABASE_SECRET_KEYS` is used, and it throws if the key doesn't exist. With `keyName` omitted, the `default` key is used, falling back to the first key in the set when no `default` exists. This differs from the `"secret"` auth mode, which matches the `default` key only and never falls back (see `AuthModeWithKey` in types.md).

```ts
// Uses the `default` secret key (or the first key if no `default` exists)
const supabaseAdmin = createAdminClient()
const { data } = await supabaseAdmin.from('audit_log').insert({ action: 'user_login' })
```

```ts
const supabaseAdmin = createAdminClient({ auth: { keyName: 'internal' } })
```

### createContextClient

Creates a Supabase client scoped to the caller's context. Configured with a publishable key and (optionally) the caller's JWT, so Row-Level Security policies apply. Stateless: one client per request.

Which key is used: with `auth.keyName` set, that named key from `SUPABASE_PUBLISHABLE_KEYS` is used, and it throws if the key doesn't exist. With `keyName` omitted, the `default` key is used, falling back to the first key in the set when no `default` exists. This differs from the `"publishable"` auth mode, which matches the `default` key only and never falls back.

```ts
const { data: auth, error } = await verifyAuth(request, { auth: 'user' })
if (error) {
  return Response.json(error.toJSON(), { status: error.status })
}
const supabase = createContextClient({
  auth: { token: auth.token, keyName: auth.keyName },
})
const { data } = await supabase.rpc('get_my_items')
```

### extractCredentials

Extracts authentication credentials from an incoming HTTP request. Reads two headers: `Authorization: Bearer <token>` is extracted as `token`, and `apikey: <key>` as `apikey`. This is a pure extraction step; no validation or verification is performed. Pass the result to `verifyCredentials` to validate against allowed auth modes.

```ts
import { extractCredentials } from '@supabase/server/core'

const creds = extractCredentials(request)
// Log only whether credentials are present, never the values themselves
console.log(creds.token !== null, creds.apikey !== null)
```

### resolveEnv

Resolves Supabase environment configuration from runtime environment variables. Reads `SUPABASE_URL`, keys (`SUPABASE_PUBLISHABLE_KEYS` / `SUPABASE_SECRET_KEYS`), and the JWKS source (`SUPABASE_JWKS` for inline keys, `SUPABASE_JWKS_URL` for a remote endpoint, or the well-known endpoint derived from `SUPABASE_PUBLIC_URL` / the resolved `url`). Works across Deno, Node.js, and Bun. For Cloudflare Workers, use `overrides` or enable node-compat.

```ts
const { data: env, error } = resolveEnv()
if (error) throw error

// Override for tests
const { data: env } = resolveEnv({ url: 'http://localhost:54321' })
```

### verifyAuth

Extracts credentials from a request and verifies them in a single step. This is a convenience function that combines `extractCredentials` and `verifyCredentials`. Use it when you want the full auth flow without needing to inspect the raw credentials.

```ts
import { verifyAuth } from '@supabase/server/core'

const { data: auth, error } = await verifyAuth(request, {
  auth: 'user',
})

if (error) {
  return Response.json({ message: error.message }, { status: error.status })
}

console.log(auth.userClaims!.id) // "d0f1a2b3-..."
```

### verifyCredentials

Verifies pre-extracted credentials against one or more allowed auth modes. Tries each mode in order; first match wins. A mode is only tried when its credential is present; a JWT that is present but fails verification short-circuits the chain with `InvalidJwtError` instead of falling through to the next mode. Use `verifyAuth` to extract and verify in a single call.

When every mode falls through, the returned error names the actual cause rather than a generic failure: `MissingCredentialsError` when the request carried nothing, `InvalidApiKeyError` when an `apikey` matched no configured key, or a `500` (`JwksNotConfiguredError`, `NoKeysConfiguredError`) when the server is configured such that no request could ever have succeeded. Every error carries `hint`, `docs`, and non-sensitive `details`.

A misconfiguration `500` is only reported once nothing has matched, so an allowed mode that does match the request's credentials still wins, e.g. `['user', 'secret']` with no JWKS but a valid apikey authenticates as `secret`. `sb_*` values in the Authorization slot are API keys, not user tokens, and stay a caller error.

```ts
const credentials = extractCredentials(request)
const { data: auth, error } = await verifyCredentials(credentials, {
  auth: ['user', 'publishable'],
})
if (error) {
  console.error(error.code, error.message, error.hint)
  return Response.json(error.toJSON(), { status: error.status })
}
```

## Notes

- Source: https://supabase.com/llms/server.txt (Primitives section, fetched 2026-10). The import path `@supabase/server/core` is confirmed only for `extractCredentials` / `verifyAuth` (from the source examples); the source does not state import paths for the other primitives.
- The source does not show function signatures, so argument and return types are not written here (the `{ data, error }` tuple is confirmed from the examples).
- Differences from the official examples: the `extractCredentials` example in the source logs the raw `creds.token` and `creds.apikey` values; here it logs only whether they are present so that bearer tokens and API keys do not end up in logs. The `createContextClient` example in the source reads `auth.token` without checking `error`; here it uses the same `error` guard as the `verifyCredentials` example, because `auth` is not usable when credentials are missing or invalid.

## Related

- [middleware](./middleware.md)
- [types](./types.md)
- [errors](./errors.md)
