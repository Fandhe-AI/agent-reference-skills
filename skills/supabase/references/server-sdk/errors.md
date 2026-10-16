# Errors

Every error type and error code `@supabase/server` produces.

## Signature / Usage

All errors extend the base class `SupabaseServerError`, which carries `code`, `message`, `hint`, `docs`, `status`, and `toJSON()` (members confirmed from the examples). `withSupabase` sets the `ErrorCodeHeader` response header on every error response, carrying the error `code`; the body is an `ErrorPayload` (a `MinimalErrorPayload` when `errors: { detailed: false }` is set).

### Classes and types

| Name | Description |
| --- | --- |
| `SupabaseServerError` | Base class for every error `@supabase/server` produces. Catch this to handle anything originating from this library, regardless of whether it's an `EnvError` or an `AuthError` |
| `SupabaseServerErrorOptions` | Optional diagnostics attached to a `SupabaseServerError` |
| `AuthError` | Thrown when authentication or authorization fails. Carries an HTTP `status` (`401` when the request's credentials are at fault, `500` when the server is misconfigured and could not have authenticated anyone) |
| `EnvError` | Thrown when a required environment variable is missing or malformed. Always `status: 500` |
| `PostgresPoolError` | Thrown when the Postgres pool cannot hand a query a connection. Always `status: 503`; both conditions are transient, so the request can be retried |
| `Errors` | Factory map for all error types. Keyed by error code constant, each entry returns a pre-configured `EnvError`, `AuthError`, or `PostgresPoolError` complete with `hint`, `docs`, and `details` |
| `ErrorSource` | Package identifier stamped on every error this library produces: `source` on each error instance, the `source` field of the JSON body `withSupabase` returns, and a `[@supabase/server]` prefix on every `message` |
| `ErrorCodeHeader` | Response header `withSupabase` sets on every error response, carrying the error `code` |
| `ErrorPayload` | Serializable form of a `SupabaseServerError`: the exact JSON body `withSupabase` returns on failure |
| `MinimalErrorPayload` | Reduced error body produced when `errors: { detailed: false }` is set. `message` keeps its `[@supabase/server]` prefix |
| `ApiKeyFormat` | How an `apikey` header value was classified by its public prefix. Used in diagnostics so a format mismatch can be reported without echoing the key |
| `AuthFailureContext` | Everything the auth pipeline knows about a failed attempt, minus anything secret. Used to build messages, hints, and `details` |
| `ReceivedCredentials` | Non-sensitive summary of the credentials a request carried |
| `AuthGenericError` | Generic authentication error code |
| `EnvGenericError` | Generic environment error code |

### Error-code errors

| Name | Meaning |
| --- | --- |
| `MissingCredentialsError` | The request carried no credentials at all (neither an `apikey` header nor an `Authorization: Bearer` token) and no accepted auth mode allows that |
| `UnusableCredentialError` | A credential did arrive, but not one any accepted auth mode can use: an `sb_*` API key in the `Authorization` header, or a header this library cannot read a bearer token out of (wrong scheme, wrong casing, bare value, empty token). Distinct from `MissingCredentialsError` on purpose: the two partition the "nothing authenticated" space exactly, so the code stays true on its own when `errors: { detailed: false }` strips `hint` and `details` |
| `InvalidApiKeyError` | An `apikey` header was present but matched none of the keys configured for the accepted auth modes |
| `InvalidJwtError` | A JWT was present in the `Authorization` header but failed verification. `details.jwt` and the message carry the specific reason (expired, bad signature, unknown `kid`, malformed token or claim, no `sub`, mismatched or missing `aud` / `iss`, `nbf` in the future) |
| `InvalidCredentialsError` | Generic credential failure, retained as the fallback code for cases that don't match a more specific one. Prior to v1.5 this was the only code `withSupabase` ever returned for a failed request. Prefer matching on `MissingCredentialsError`, `InvalidApiKeyError`, `InvalidJwtError` |
| `JwksFetchFailedError` | The remote JWKS endpoint could not be fetched or returned something unusable. Server-side / upstream failure (`status: 500`) |
| `JwksNotConfiguredError` | Auth mode `"user"` was requested and a JWT was supplied, but no JWKS is configured, so the token cannot be verified. Server misconfiguration (`status: 500`) |
| `NoKeysConfiguredError` | A `"publishable"` or `"secret"` auth mode was requested but no keys of that kind are configured, so the mode could never match. Server misconfiguration (`status: 500`) |
| `UnsupportedRoleError` | The caller's verified `role` claim names a Postgres role the middleware will not assume (one that would bypass RLS, or one it does not support yet). Returned by `withPostgresClient` instead of silently running the query as `anon` |
| `MissingSupabaseURLError` | `SUPABASE_URL` is not set |
| `MissingPublishableKeyError` | Named publishable key not found in `SUPABASE_PUBLISHABLE_KEYS` |
| `MissingSecretKeyError` | Named secret key not found in `SUPABASE_SECRET_KEYS` |
| `MissingDefaultPublishableKeyError` | No default publishable key found |
| `MissingDefaultSecretKeyError` | No default secret key found |
| `MissingConnectionStringError` | No Postgres connection string is configured, so `withPostgresClient` / `withPostgresAdminClient` cannot connect |
| `MissingResourceServerError` | `withOAuthProtectedResource` has no `resourceServer` and cannot derive one |
| `MissingAuthorizationServerError` | `withOAuthProtectedResource` has no `authorizationServer` and cannot derive one |
| `CreateSupabaseClientError` | Failed to create a Supabase client after auth succeeded |
| `PostgresPoolBusyError` | Every pooled connection stayed busy for the whole checkout wait, so the query could not get one. `details.max` is the pool size and `details.waitedMs` the wait |
| `PostgresConnectPausedError` | A connection attempt failed and the pool is pausing new attempts, so a query that needed a new connection was refused without trying. `cause` is the failure and `details.retryAfterMs` the time left in the pause |

### Examples

Catching an AuthError:

```ts
import { createSupabaseContext } from '@supabase/server'

const { data: ctx, error } = await createSupabaseContext(request, { auth: 'user' })
if (error) {
  // error is an AuthError — `toJSON()` includes source, code, message, hint, docs, details
  return Response.json(error.toJSON(), { status: error.status })
}
```

Catching an EnvError:

```ts
import { EnvError } from '@supabase/server'

try {
  const client = createAdminClient()
} catch (e) {
  if (e instanceof EnvError) {
    console.error(`[${e.code}] ${e.message}\n${e.hint}`)
    // → "[MISSING_SUPABASE_URL] [@supabase/server] SUPABASE_URL is required but not set."
    //   "Set SUPABASE_URL to your project URL (https://<project-ref>.supabase.co), …"
  }
}
```

Catching any library error:

```ts
import { SupabaseServerError } from '@supabase/server'

try {
  const supabase = createAdminClient()
} catch (e) {
  if (e instanceof SupabaseServerError) {
    console.error(e.code, e.message, e.hint, e.docs)
    return Response.json(e.toJSON(), { status: e.status })
  }
  throw e
}
```

Throwing typed errors (`Errors` factory):

```ts
throw Errors[MissingSupabaseURLError]()
throw Errors[MissingPublishableKeyError]('mobile', ['default', 'web'])
```

Answering 503 with a `Retry-After` header:

```ts
import { PostgresPoolError } from '@supabase/server'

try {
  return Response.json(await ctx.postgres.query`select * from notes`)
} catch (e) {
  if (e instanceof PostgresPoolError) {
    const retryAfterMs = Number(e.details?.retryAfterMs ?? 1000)
    return Response.json(e.toJSON(), {
      status: e.status,
      headers: { 'Retry-After': String(Math.ceil(retryAfterMs / 1000)) },
    })
  }
  throw e
}
```

## Notes

- Source: https://supabase.com/llms/server.txt (Errors section, fetched 2026-10)
- `ctx.postgres` and `ctx.postgresAdmin` throw `PostgresPoolError` from the query call. The middleware do not turn it into a response; the handler or the host's error handler decides how the request answers.
- `EnvError` timing: `withSupabaseClient()` throws from the entry chain (before the handler); `withSupabaseAdminClient()` throws on the first `supabaseAdmin` access (inside the handler). The bridges do not catch either (see migrating-off-adapters.md).
- String code values (`MISSING_CREDENTIALS`, `UNUSABLE_CREDENTIAL`, `INVALID_JWT`, `JWKS_FETCH_FAILED`, `JWKS_NOT_CONFIGURED`, `UNSUPPORTED_ROLE`, `MISSING_SUPABASE_URL`, `MISSING_RESOURCE_SERVER`, `MISSING_AUTHORIZATION_SERVER`) are limited to those confirmed elsewhere in the source. String codes for the other errors are not stated in the source and are not written here.
- Separate from Supabase Auth's own errors (GoTrue `AuthApiError` etc.); see `auth/error-codes.md` in the auth category.

## Related

- [middleware](./middleware.md)
- [primitives](./primitives.md)
- [types](./types.md)
