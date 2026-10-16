# Middleware

`@supabase/server` middleware and entries. Everything except `withSupabase` composes into `pipeline([...], handler)` from `@supabase/middleware`.

## Signature / Usage

| Name | Import | Contributes / Role |
| --- | --- | --- |
| `withSupabase` | `@supabase/server` | Wraps a handler with auth, client creation, and CORS handling (not deprecated) |
| `createSupabaseContext` | `@supabase/server` | Builds a `SupabaseContext` from a request, returns `{ data, error }` |
| `withClaims` | `@supabase/server/middleware/claims` | `ctx.jwtClaims` (`null` when no token; not a gate) |
| `withRequiredClaims` | `@supabase/server/middleware/required-claims` | Non-null `ctx.jwtClaims` (user-mode gate) |
| `withSupabaseClient` | `@supabase/server/middleware/client` | `ctx.supabase` (RLS applies) |
| `withSupabaseAdminClient` | `@supabase/server/middleware/admin-client` | `ctx.supabaseAdmin` (bypasses RLS) |
| `withPostgresClient` | `@supabase/server/middleware/postgres` | `ctx.postgres` (RLS-scoped `pg`) |
| `withPostgresAdminClient` | `@supabase/server/middleware/postgres-admin` | `ctx.postgresAdmin` (`pg` that bypasses RLS) |
| `withOAuthProtectedResource` | `@supabase/server` | RFC 9728 OAuth Protected Resource |
| `fromSupabaseUrl` | `@supabase/server` | Points `authorizationServer` at a Supabase project's Auth issuer |
| `ident` | (import not stated in the source) | Quote a Postgres identifier |

Config types: `WithClaimsConfig`, `WithRequiredClaimsConfig`, `WithSupabaseClientConfig`, `WithSupabaseAdminClientConfig`, `WithPostgresClientConfig`, `WithPostgresAdminClientConfig` (the source describes each only as "Configuration for <name>"; `WithSupabaseClientConfig` is the same environment and client options `createContextClient` accepts minus the per-request auth identity, `WithSupabaseAdminClientConfig` the same for `createAdminClient`). `PostgresApi` is the shape of `ctx.postgres` and `ctx.postgresAdmin`: both expose the same surface; `withPostgresClient` wraps every query in a transaction that injects the caller's claims and drops to their role, `withPostgresAdminClient` runs it as-is, as the connection-string role. `PostgresPoolOptions` is the pool sizing for both; two entries on the same connection string share a pool only when their options resolve to the same values. `RequestClaims` is the minimal claims shape `withPostgresClient` needs on the upstream context (it only reads `role` and serializes the whole object into `request.jwt.claims`).

### withSupabase

Wraps a request handler with Supabase auth, client creation, and CORS handling. Built for the Web API `Request`/`Response` standard that all modern runtimes implement natively. Handles CORS preflight, credential verification, context creation, and error responses. Your handler only runs on successful auth.

```ts
import { withSupabase } from '@supabase/server'

export default {
  fetch: withSupabase({ auth: 'user' }, async (req, ctx) => {
    const { data } = await ctx.supabase.rpc('get_my_profile')
    return Response.json(data)
  }),
}
```

### createSupabaseContext

Creates a SupabaseContext directly from a request. Use this when you need the context without the full withSupabase wrapper, e.g., inside framework route handlers or custom middleware. Returns a result tuple instead of producing a `Response`.

```ts
const { data: ctx, error } = await createSupabaseContext(request, { auth: 'user' })
if (error) {
  // `toJSON()` yields { source, code, message, hint, docs, details }
  return Response.json(error.toJSON(), { status: error.status })
}
const { data } = await ctx.supabase.rpc('get_my_items')
```

### withClaims

Contributes `ctx.jwtClaims` by verifying the caller's Bearer token against the project JWKS, the same verification core `withSupabase` uses for its `user` auth mode.

Use this when composing a standalone `pipeline([...], handler)` that is not wrapped by `withSupabase`, for example a Supabase-agnostic Edge Function that still wants the caller's verified claims available to a downstream middleware such as `withPostgresClient`. Inside `withSupabase`, the context already carries `jwtClaims`, so `withClaims` is unnecessary.

- No `Authorization: Bearer` token (or an `sb_*` API key in that position): contributes `null`; the request proceeds as anonymous.
- Token present but invalid: short-circuits with a 401 JSON response (`{ message, code }`, matching `withSupabase`'s error shape).
- Token present but no JWKS configured: short-circuits with a 500. Verification is not optional; there is no decode-only mode.

`withClaims` is not an auth gate. It never rejects a request that has no token. A pipeline like `[withClaims(), withSupabaseClient()]` accepts anonymous callers and is not the composable form of `withSupabase({ auth: 'user' })`, which rejects token-less requests with a 401. To require an authenticated caller, compose `withRequiredClaims` instead. The two entries share the `jwtClaims` key, so a pipeline picks "claims if present" or "claims required"; composing both is a compile-time conflict.

```ts
import { pipeline } from '@supabase/middleware'
import { withClaims } from '@supabase/server/middleware/claims'
import { withPostgresClient } from '@supabase/server/middleware/postgres'

export default {
  fetch: pipeline([withClaims(), withPostgresClient()], async (req, ctx) => {
    const rows = await ctx.postgres.query`select id, title from posts`
    return Response.json({ rows, caller: ctx.jwtClaims?.sub ?? 'anon' })
  }),
}
```

### withRequiredClaims

The user-mode auth gate: requires a valid user JWT and contributes non-null `ctx.jwtClaims`. Verification runs against the project JWKS, the same core `withSupabase` uses for its `user` auth mode. This is the required-caller counterpart to `withClaims`.

Every short-circuit uses the standard error payload, with the same code `withSupabase({ auth: 'user' })` returns for an identical request:

- No `Authorization: Bearer` token: 401 `MISSING_CREDENTIALS`. The handler never runs.
- An `sb_*` API key in that position: 401 `UNUSABLE_CREDENTIAL` (a credential arrived, just not a user JWT).
- Token present but invalid: 401 `INVALID_JWT`, naming the specific reason.
- Token present but no JWKS configured: 500 `JWKS_NOT_CONFIGURED`; verification is not optional and there is no decode-only mode.

Because the contribution is non-null, gated handlers read `ctx.jwtClaims` directly, with no `?.sub ?? 'anon'` fallbacks. Downstream entries declaring a `jwtClaims` prerequisite, such as `withPostgresClient`, compose with no further verification.

The 401 and 500 short-circuits carry no CORS headers, and a bare pipeline answers no `OPTIONS` preflight. For browser callers, compose `withCors` (`@supabase/middleware/cors`) ahead of the gate: it answers preflight before the gate runs and stamps `Access-Control-*` headers on the short-circuit responses.

After `withSupabase` in a pipeline the context already carries verified `jwtClaims`, so this gate is unnecessary there and placing it after `withSupabase` is a compile-time conflict. Use `withSupabase({ auth: 'user' })` to gate that path.

```ts
import { pipeline } from '@supabase/middleware'
import { withRequiredClaims } from '@supabase/server/middleware/required-claims'
import { withPostgresClient } from '@supabase/server/middleware/postgres'

export default {
  fetch: pipeline([withRequiredClaims(), withPostgresClient()], async (req, ctx) => {
    const rows = await ctx.postgres.query`select id, title from posts`
    return Response.json({ rows, caller: ctx.jwtClaims.sub })
  }),
}
```

### withSupabaseClient

Contributes `ctx.supabase`, a Supabase client scoped to the caller's identity, so Row-Level Security policies apply. This is the same middleware `withSupabase` composes internally to build its context.

Standalone, the caller's Bearer token (when present) is attached unverified; PostgREST verifies it on every query. Compose `withClaims` upstream when the pipeline itself needs verified claims.

```ts
import { pipeline } from '@supabase/middleware'
import { withSupabaseClient } from '@supabase/server/middleware/client'

export default {
  fetch: pipeline([withSupabaseClient()], async (req, ctx) => {
    const { data } = await ctx.supabase.from('posts').select('id, title')
    return Response.json(data)
  }),
}
```

### withSupabaseAdminClient

Contributes `ctx.supabaseAdmin`, an admin Supabase client that bypasses Row-Level Security, authenticated with a secret key. This is the same middleware `withSupabase` composes internally to build its context.

The client is constructed on the first property access of `ctx.supabaseAdmin` and memoized for the request. A handler that never accesses it requires no secret key.

```ts
import { pipeline } from '@supabase/middleware'
import { withRequiredClaims } from '@supabase/server/middleware/required-claims'
import { withSupabaseAdminClient } from '@supabase/server/middleware/admin-client'

export default {
  fetch: pipeline([withRequiredClaims(), withSupabaseAdminClient()], async (req, ctx) => {
    await ctx.supabaseAdmin.from('audit_log').insert({ action: 'ping', actor: ctx.jwtClaims.sub })
    return Response.json({ ok: true })
  }),
}
```

The upstream example is a pipeline without a gate; here `withRequiredClaims()` is placed upstream. A `withSupabaseAdminClient` pipeline with no gate allows any caller RLS-bypassing access.

For secret-key callers there is no composable gate. Use `withSupabase({ auth: 'secret' })`, which itself provides `ctx.supabaseAdmin`.

### withPostgresClient

Contributes `ctx.postgres`, an RLS-scoped `pg` client, the safe version of "authenticate, then query as the user". This is the direct-connection counterpart to `withSupabaseClient`, and its service-role companion is `withPostgresAdminClient`.

Every query runs in its own short transaction that injects the caller's claims and drops to their role, exactly like PostgREST:

```sql
begin;
select set_config('request.jwt.claims', $claims, true);  -- auth.uid() resolves
set local role "authenticated";                          -- RLS now enforces
<your query>
commit;
```

Everything is transaction-local, so nothing leaks onto the pooled connection.

Only `authenticated` and `anon` are assumed. A token naming any other role, including `service_role`, is refused with a 500 and `code: 'UNSUPPORTED_ROLE'`, never silently downgraded to `anon`. Bypassing RLS is a separate, explicit opt-in: compose `withPostgresAdminClient`.

Custom roles: Supabase supports custom Postgres roles via the `role` claim, and RLS still applies to them. They are not supported here yet, so such a token is refused rather than downgraded.

Reads the caller's claims from `ctx.jwtClaims`, which `withSupabase` populates (JWKS-verified), so after `withSupabase` in a pipeline it composes directly. Standalone (no `withSupabase`), pair it with `withClaims` so `ctx.jwtClaims` is present before it runs.

Table grants: queries run as `authenticated` or `anon`, so those roles need explicit table privileges (e.g. `grant select, insert on <table> to authenticated`) in addition to RLS policies. A missing grant fails with `permission denied` (SQLSTATE 42501) before RLS is consulted.

Runtime note: `pg` needs raw TCP, so this runs on Node/Deno (including the Supabase Edge runtime), not on Workers-style isolates.

```ts
pipeline([withSupabase({ auth: 'user' }), withPostgresClient()], handler)
```

### withPostgresAdminClient

Contributes `ctx.postgresAdmin`, a `pg` client that bypasses RLS, for full-table access. The direct-connection counterpart to `withSupabaseAdminClient`, and the deliberate opt-out from the guardrails `withPostgresClient` enforces.

Queries run as-is, as the role in the connection string: no claim injection, no role switching, no wrapping transaction. Whatever that role may read, the caller may read.

Unlike `withPostgresClient` this declares no upstream prerequisite. It never looks at `ctx.jwtClaims`, so it composes in any auth mode, including `auth: 'secret'` and `auth: 'none'`:

```ts
import { pipeline } from '@supabase/middleware'
import { withSupabase } from '@supabase/server'
import { withPostgresAdminClient } from '@supabase/server/middleware/postgres-admin'

pipeline([withSupabase({ auth: 'secret' }), withPostgresAdminClient()], handler)
```

Compose both halves when a handler needs each in turn. They share one pool, and `ctx.postgres` stays RLS-scoped regardless:

```ts
pipeline([withSupabase({ auth: 'user' }), withPostgresClient(), withPostgresAdminClient()], handler)
```

Authorization is yours now. RLS is not consulted, so any per-user scoping has to be a `where` clause you write. Reach for `withPostgresClient` unless you specifically need to cross user boundaries. `pg` needs raw TCP, so this runs on Node/Deno (including the Supabase Edge runtime), not on Workers-style isolates.

### withOAuthProtectedResource

Wraps a request handler with OAuth 2.1 Protected Resource behavior (RFC 9728).

- Serves OAuth Protected Resource Metadata at `GET {resource}/oauth-protected-resource` (with permissive CORS, including the `OPTIONS` preflight, so browser-based clients can read it)
- Enriches a `401` from the inner handler with `WWW-Authenticate: Bearer resource_metadata="..."`, unless the handler already set a `WWW-Authenticate` header (its value wins)
- Passes any other path through to the inner handler unchanged (composition, not routing, decides what happens to it)
- Answers a default URL it cannot derive with the JSON error response `withSupabase` returns for its own configuration failures (`500`, `x-supabase-server-error`); a throw from a configured `resourceServer` or `authorizationServer` function is the caller's and propagates

The metadata route is matched on the path suffix, so any `GET` or `OPTIONS` ending in `/oauth-protected-resource` is answered here and never reaches the inner handler, at any depth. Other methods pass through.

Zero-config on Supabase Edge Functions. Elsewhere `OAuthProtectedResourceConfig.resourceServer` is required and `OAuthProtectedResourceConfig.authorizationServer` falls back to `SUPABASE_URL`; one that cannot be resolved is reported as `MISSING_RESOURCE_SERVER` / `MISSING_AUTHORIZATION_SERVER`.

Contributes `ctx.oauthProtectedResource` (the resolved metadata URL) to the downstream context. Nested under `withSupabase`, the key is typed on the handler's `ctx` when the outermost call is anchored with `satisfies FetchHandler`. Placed directly after `withSupabase` with an auth mode that requires credentials, the composition is refused when the stack is built, since the gate would answer discovery and preflight before this middleware runs.

Supabase Edge Functions, zero config:

```ts
import { withOAuthProtectedResource, withSupabase } from '@supabase/server'

Deno.serve(
  withOAuthProtectedResource(
    withSupabase({ auth: 'user' }, async (_req, { supabase }) => {
      const { data, error } = await supabase.from('items').select('*')
      if (error) throw error
      return Response.json(data)
    }),
  ),
)
```

Any other backend:

```ts
import { withOAuthProtectedResource, fromSupabaseUrl } from '@supabase/server'

export default {
  fetch: withOAuthProtectedResource(
    {
      resourceServer: (req) => new URL(req.url).origin + '/api/mcp',
      authorizationServer: fromSupabaseUrl('https://abc123.supabase.co'),
    },
    handler,
  ),
}
```

A non-Supabase authorization server:

```ts
withOAuthProtectedResource(
  {
    resourceServer: 'https://api.example.com/mcp',
    authorizationServer: 'https://example.clerk.accounts.dev',
  },
  handler,
)
```

Related helpers: `resourceMetadataResponse` (RFC 9728 OAuth Protected Resource Metadata response; advertises the authorization server, resource URI, and bearer methods supported; URLs default to the Edge Functions derivation and throw off platform, so pass `resource` / `authorizationServers` to override; options type `ResourceMetadataOptions`) and `unauthorizedResponse` (`401` response with a `WWW-Authenticate: Bearer resource_metadata="..."` header (RFC 9728); the metadata URL defaults to the Edge Functions derivation and throws off platform, so pass `resourceMetadataUrl` to override). The config type `OAuthProtectedResourceConfig` is in types.md.

### fromSupabaseUrl

Points `authorizationServer` at a Supabase project's Auth issuer. Use this off Supabase Edge Functions, where the app's own origin is unrelated to the Supabase project's, so the issuer cannot be derived from the request.

```ts
import { withOAuthProtectedResource, fromSupabaseUrl } from '@supabase/server'

withOAuthProtectedResource(
  {
    resourceServer: (req) => new URL(req.url).origin + '/api/mcp',
    authorizationServer: fromSupabaseUrl('https://abc123.supabase.co'),
  },
  handler,
)
```

### ident

Quote a Postgres identifier (a table, column, or role name) for safe interpolation into SQL text.

Bind parameters cover values and nothing else: `order by $1` sorts every row by the constant string `$1`, and `select $1 from t` selects a literal, not a column. Identifiers therefore have to reach the server as SQL text, which is the one place string-building is unavoidable. This makes that step safe by quoting the name and doubling any embedded quote, so the result is always exactly one identifier no matter what it contains.

It is not an allowlist. Quoting a caller-supplied name yields a valid identifier, not a permitted one: `ident(req.query.sort)` cannot inject SQL but can still read a column the caller was never meant to see. Check the name against a fixed set you control first, then quote it.

```ts
const SORTABLE = new Set(['created_at', 'title'])
if (!SORTABLE.has(column)) throw new Error('unsupported sort column')
const rows = await ctx.postgres.queryRaw(
  `select id, title from posts order by ${ident(column)} desc`,
)
```

## Notes

- Source: https://supabase.com/llms/server.txt (Middleware section, fetched 2026-10). The source does not show function signatures, so argument and return types are not written here.
- Inside `withSupabase`, `jwtClaims` is already present, so `withClaims` is unnecessary there; standalone pipelines differ.
- `@supabase/server` middleware is separate from the middleware concept of web frameworks such as Hono / H3 (connected through a bridge; see frameworks.md).

## Related

- [primitives](./primitives.md)
- [types](./types.md)
- [errors](./errors.md)
- [frameworks](./frameworks.md)
- [migrating-off-adapters](./migrating-off-adapters.md)
