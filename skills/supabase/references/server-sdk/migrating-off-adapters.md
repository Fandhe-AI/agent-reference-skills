# Moving off the adapters

Migration from `@supabase/server/adapters/*` (Hono / H3 / Elysia / NestJS) to `@supabase/middleware` entries plus a bridge. Adapters are deprecated and will be removed on December 1, 2026.

## Signature / Usage

Each adapter solved the same problem in a framework-specific way: build a `SupabaseContext` and stash it where the handler can reach it. That meant a published entry point, a peer dependency range, and a release cycle per framework, all to wrap one call. The engine replaced the model. A middleware is now an entry, a `(handler) => handler` wrapper over the Web `Request` and `Response` pair, and `withSupabaseClient()`, `withSupabaseAdminClient()`, `withRequiredClaims()`, and the rest are ordinary entries you compose. What remains is the bridge, and it belongs in your project, not in a package that has to track your framework's major versions.

The adapters are deprecated. They still work today and will be removed on December 1, 2026. `withSupabase(config, handler)` from `@supabase/server` is not part of this change.

Three changes come with the migration. The first can open an endpoint up.

### The auth trap

The adapters rejected unauthenticated requests. `withClaims()` does not. Migrating an `auth: 'user'` endpoint onto it instead of `withRequiredClaims()` turns a 401 into a silent 200.

```ts
// Before: an anonymous request gets 401 and the handler never runs.
app.use('*', withSupabase({ auth: 'user' }))

// After, wrong: an anonymous request gets 200. The handler runs with
// jwtClaims === null and an unauthenticated Supabase client.
app.use('*', toHono([withClaims(), withSupabaseClient()]))

// After, right: the same gate the adapter applied.
app.use('*', toHono([withRequiredClaims(), withSupabaseClient()]))
```

`withClaims()` rejects a token that is present and invalid. A request with no credentials at all is not an error to it. It contributes `jwtClaims: null` and falls through, by design, because many pipelines want an anonymous path. Nothing throws and nothing logs. The endpoint returns 200 with whatever Row Level Security lets the anonymous role see, often an empty array. That reads like a data bug, and it can sit in production for a long time before anyone reads it as an auth bug.

`withRequiredClaims()` from `@supabase/server/middleware/required-claims` is the required-caller counterpart. It verifies against the same project JWKS, rejects before your handler runs, and contributes non-null `jwtClaims`, so gated handlers read `jwtClaims.sub` with no `?.` fallback. The two are mutually exclusive. Both declare the `jwtClaims` key, so composing them is a compile-time conflict, not a fallback.

Which endpoints are affected is written in the adapter config, not in the handler. That is what makes it easy to miss in review.

| Adapter config | Rejected before | Replacement |
| --- | --- | --- |
| `auth: 'user'`, or no config | missing or invalid JWT | `withRequiredClaims()` |
| `auth: 'none'` | nothing | nothing; the client entries alone |
| `auth: 'publishable'` | missing or wrong `apikey` | none. Keep `withSupabase` |
| `auth: 'secret'` | missing or wrong `apikey` | none. Keep `withSupabase` |

A bare `withSupabase()` with no config was `auth: 'user'` and did reject.

No composable gate exists for `publishable` or `secret`. Those endpoints stay on `withSupabase({ auth: 'publishable' })` or `withSupabase({ auth: 'secret' })`, which needs no changes. Hand-rolling a key check is how endpoints get opened up. Two details catch people who try. Those modes read the `apikey` header and never `Authorization`, so a caller sending `Authorization: Bearer <key>` gets a bare 401. And `auth: 'secret:<name>'` also points `supabaseAdmin` at `secretKeys['<name>']`, so that entry has to hold a real Supabase secret key.

`withRequiredClaims` answers with the standard error payload, with the same codes `withSupabase({ auth: 'user' })` returns for the same request.

| Request | Status | `code` |
| --- | --- | --- |
| No `Authorization` header | 401 | `MISSING_CREDENTIALS` |
| An `sb_*` API key in the `Authorization` slot | 401 | `UNUSABLE_CREDENTIAL` |
| A token that fails verification | 401 | `INVALID_JWT` |
| A token, but the JWKS could not be fetched | 500 | `JWKS_FETCH_FAILED` |
| A token, but no JWKS source and no usable project URL | 500 | `JWKS_NOT_CONFIGURED` |

The adapters emitted none of these. Each rejected in its own framework-native shape. Hono threw an `HTTPException`, which renders as `text/plain` with no `code`. H3 threw an `HTTPError`. Elysia surfaced a `SupabaseError` through your `onError` handler. Only the NestJS adapter threw `HttpException({ message, code }, status)`. A client that branches on the 401 status is fine. A client that parses the body needs rechecking.

Neither entry answers a CORS preflight, and the short-circuits carry no CORS headers. For browser callers, compose `withCors` from `@supabase/middleware/cors` ahead of the gate. CORS is an entry like any other, so a route that composes no entries has no CORS. A public route a browser calls, such as a health check, needs its own array with `withCors` in it. Under `curl` the response is an ordinary 200; only a browser refuses it.

### Keep `withSupabase` where it fits

`withSupabase(config, handler)` still does the verify-then-reject work for you, and it is not deprecated. It wraps a fetch handler rather than composing into a framework chain, so it does not slot into a bridge. If an endpoint is already a plain fetch handler, staying on `withSupabase()` is a legitimate end state. It is also the only way to get the full `SupabaseContext`, `userClaims` and `authMode` included, behind an auth gate.

To compose other entries around it, `withSupabase({ auth: 'user' })` with no handler is a `pipeline` entry placed by position. Entries before it run ahead of the auth gate. Entries after it receive the full `SupabaseContext`. Nesting, as in `withSupabase(config, entry(handler))`, still works. The entry form needs 1.6.0 or later.

```ts
import { pipeline } from '@supabase/middleware'
import { withCors } from '@supabase/middleware/cors'
import { withSupabase } from '@supabase/server'

export default {
  fetch: pipeline(
    [
      withCors({ origin: ['https://app.example.com'] }),
      withSupabase({ auth: 'user', cors: 'disabled' }),
    ],
    async (_req, ctx) => Response.json({ user: ctx.userClaims?.id })
  ),
}
```

`withSupabaseClient()` and `withSupabaseAdminClient()` throw an `EnvError` when configuration is missing, and the bridges do not catch it. The adapters turned it into a clean 500. The two fail at different moments. `withSupabaseClient()` throws from the entry chain, before your handler runs. `withSupabaseAdminClient()` builds lazily and throws on the first `supabaseAdmin` property access, inside your handler. Map both in your framework's error boundary.

### The shape change

Adapters exposed one nested object. The entries contribute flat keys, one per middleware.

```ts
// Before
const { supabase, userClaims } = c.var.supabaseContext

// After
const supabase = c.var.supabase
const jwtClaims = c.var.jwtClaims
```

For `supabase` and `supabaseAdmin` the rewrite is mechanical. For claims it is not. No entry contributes `userClaims`. `withClaims()` and `withRequiredClaims()` both contribute `jwtClaims`, the raw JWT payload, and the field names differ.

| `userClaims` (adapters) | `jwtClaims` (middleware) |
| --- | --- |
| `.id` | `.sub` |
| `.role` | `.role` |
| `.email` | `.email` |
| `.appMetadata` | `.app_metadata` |
| `.userMetadata` | `.user_metadata` |

A blanket rename of `userClaims` to `jwtClaims` fails to compile in TypeScript. In plain JavaScript, or behind an `as`, `jwtClaims.id` is `undefined` with no error, and `.id` is usually the value rows get written with. Rewrite each read against the table.

### Step by step

Do the steps in order. The auth inventory comes before any code change, because the step that follows it is the one that can open an endpoint up. Follow the steps yourself, or hand them to a coding agent with the prompt at the end of this section.

#### 1. Check your versions

The bridges need `@supabase/server` 1.6.0 or later and Node 22 or later.

Then decide whether you need the response phase: an entry that sees the outgoing response and can rewrite it, which is what CORS and header-stamping middleware do. If you only read `supabase` inside a handler, you do not need it.

```bash
npm ls @supabase/server   # 1.6.0 or later
node --version            # 22 or later
```

#### 2. Inventory every adapter registration

Do this before editing anything. What you need is in the adapter config, not in the handlers, and it stops being visible the moment you start swapping imports.

For each hit, find the `withSupabase(...)` call it feeds and write down its `auth` value. A bare `withSupabase()` with no config counts as `auth: 'user'`. Keep that list. Step 7 checks against it.

```bash
grep -rn "@supabase/server/adapters" src/
```

#### 3. Decide what replaces each auth value

Use the table in "The auth trap" above. `auth: 'user'` and a bare `withSupabase()` become `withRequiredClaims()`. `auth: 'none'` needs no gate. `auth: 'publishable'` and `auth: 'secret'` have no composable gate: those endpoints stay on `withSupabase`, and leaving them unmigrated is the better outcome.

Do not reach for `withClaims()` here. It lets anonymous requests through by design.

```ts
// auth: 'user', or no config
toHono([withRequiredClaims(), withSupabaseClient()])

// auth: 'none'
toHono([withSupabaseClient()])

// auth: 'publishable' or auth: 'secret'
// Stop. Keep withSupabase for this endpoint.
```

#### 4. Copy the bridge for your framework

One file, yours to own from here on: `src/lib/supabase-middleware.ts`, or `src/lib/supabase.guard.ts` for NestJS. Copy it as is. Some lines look redundant and are not. The Hono `c.res` clear-then-assign is the clearest example, and it carries the comment explaining why. Keep the comments.

```bash
npm install @supabase/middleware
mkdir -p src/lib
curl --fail -o src/lib/supabase-middleware.ts \
  https://raw.githubusercontent.com/supabase/server/main/examples/frameworks/hono/supabase-middleware.ts
```

#### 5. Swap the registrations

One at a time, using the decision from step 3. Add `withSupabaseAdminClient()` from `@supabase/server/middleware/admin-client` only where the old code read `supabaseAdmin`. It needs the secret key.

```ts
// Before
import { withSupabase } from '@supabase/server/adapters/hono'
app.use('*', withSupabase({ auth: 'user' }))

// After
import { withRequiredClaims } from '@supabase/server/middleware/required-claims'
import { withSupabaseClient } from '@supabase/server/middleware/client'
import { toHono } from './lib/supabase-middleware.js'
app.use('*', toHono([withRequiredClaims(), withSupabaseClient()]))
```

#### 6. Rewrite the call sites

The adapters exposed one nested object. The entries contribute flat keys. The same shape applies to `event.context` (H3), the route context (Elysia), and `req` (NestJS).

`userClaims` is not on that list. No entry contributes it. Rewrite each claims read against the field table in "The shape change" above.

```text
c.var.supabaseContext.supabase       ->  c.var.supabase
c.var.supabaseContext.supabaseAdmin  ->  c.var.supabaseAdmin
c.var.supabaseContext.userClaims.id  ->  c.var.jwtClaims.sub
```

```bash
grep -rn "supabaseContext" src/    # expect no results
```

#### 7. Verify

Three checks, in this order. The second is what this procedure exists for.

Types: run the typecheck.

Auth: for every endpoint step 2 recorded as rejecting, prove it still rejects. A clean typecheck says nothing about it. A `200` on the first call is the failure this page is arranged around. It means the gate is missing, not that the endpoint is healthy.

Behavior: run your test suite, then exercise one migrated endpoint end to end. If it was behind `auth: 'user'`, sign in and confirm the handler sees the caller: `jwtClaims.sub` is the user id.

The rejection body changed even when the status did not. See the code table in "The auth trap" above.

```bash
npx tsc --noEmit

BASE=http://localhost:3000

# no credentials -> expect 401
curl -s -o /dev/null -w "%{http_code}\n" $BASE/your-endpoint

# a valid user token -> expect 200
curl -s -o /dev/null -w "%{http_code}\n" \
  -H "Authorization: Bearer $TOKEN" $BASE/your-endpoint
```

#### 8. Clean up

Anything left is either an endpoint you kept on purpose (the `publishable` and `secret` cases from step 3) or one you missed. Uninstall the framework peer dependency only if nothing else uses it.

```bash
grep -rn "@supabase/server/adapters" src/
```

### Call-site cheat sheet

| Before | After |
| --- | --- |
| `import { withSupabase } from '@supabase/server/adapters/hono'` | `import { toHono } from './lib/supabase-middleware.js'` |
| `app.use('*', withSupabase({ auth: 'user' }))` | `app.use('*', toHono([withRequiredClaims(), withSupabaseClient()]))` |
| `app.use('*', withSupabase({ auth: 'none' }))` | `app.use('*', toHono([withSupabaseClient()]))` |
| `c.var.supabaseContext.supabase` | `c.var.supabase` |
| `c.var.supabaseContext.supabaseAdmin` | `c.var.supabaseAdmin` |
| `c.var.supabaseContext.userClaims.id` | `c.var.jwtClaims.sub` (the field names change too; see the table) |
| `event.context.supabaseContext.supabase` (H3) | `event.context.supabase` |
| `req.supabaseContext.supabase` (NestJS) | `req.supabase` |

The adapters took `auth: 'user' | 'publishable' | 'secret' | 'none'` and did two jobs with it: verified the credentials, and rejected the request when they were missing or wrong. Of the composable entries, only `withRequiredClaims()` does both, and only for user mode. If you want the adapter's exact verify-then-build behavior with no rewrite, keep the top-level `withSupabase()`. It is not deprecated, and as an entry it composes with `pipeline`.

### Hand it to an agent

Paste this, and replace `hono` in the URL with `h3`, `elysia`, or `nestjs` (`supabase.guard.ts` for NestJS).

```text
Migrate this project off @supabase/server's framework adapters
(@supabase/server/adapters/*) onto @supabase/middleware entries. Work in the
order below. Do not start at step 3.

STEP 1: INVENTORY. Do this before editing anything.
Grep for `@supabase/server/adapters` and list every withSupabase(...)
registration it feeds, with that call's `auth` value. A bare withSupabase()
with no config means auth: 'user'. Show me this list before you edit.

STEP 2: DECIDE THE AUTH REPLACEMENT for each one. This is the step that can
open an endpoint up, so do it deliberately:
  auth: 'user' (or no config) -> withRequiredClaims() from
      '@supabase/server/middleware/required-claims'
  auth: 'none'                -> no gate needed
  auth: 'publishable'/'secret' -> STOP. There is no composable gate. Leave the
      endpoint on withSupabase and tell me about it. Do not hand-roll a key
      check.
The adapters REJECTED unauthenticated requests. withClaims() does NOT: it
contributes jwtClaims: null and falls through, turning a 401 endpoint into a
200 endpoint silently. Never use withClaims() as the replacement for
auth: 'user'. Never compose withClaims() and withRequiredClaims() together;
they share the jwtClaims key and that is a compile-time conflict.

STEP 3: FETCH THE BRIDGE. Add @supabase/middleware as a direct dependency of
the project; the bridge imports it. Then download
https://raw.githubusercontent.com/supabase/server/main/examples/frameworks/hono/supabase-middleware.ts
and save it as src/lib/supabase-middleware.ts, verbatim. Do not "improve",
condense, or drop comments from it.

STEP 4: SWAP each registration to the bridge called on an entry array, e.g.
  toHono([withRequiredClaims(), withSupabaseClient()])
For NestJS, call toNestGuard(entries) once, assign it to a const, and pass
that const to every @UseGuards().
Import the client entries from '@supabase/server/middleware/client' and
'@supabase/server/middleware/admin-client'. Only include
withSupabaseAdminClient() where the old code actually read supabaseAdmin.

STEP 5: REWRITE call sites from the nested shape to flat keys:
  c.var.supabaseContext.supabase       -> c.var.supabase
  c.var.supabaseContext.supabaseAdmin  -> c.var.supabaseAdmin
Apply the equivalent for event.context / the Elysia context / req.
userClaims is NOT one of these. No middleware contributes that key;
c.var.userClaims does not exist. The entries contribute jwtClaims, the RAW JWT
payload, with different field names:
  userClaims.id            -> jwtClaims.sub
  userClaims.role          -> jwtClaims.role
  userClaims.email         -> jwtClaims.email
  userClaims.appMetadata   -> jwtClaims.app_metadata
  userClaims.userMetadata  -> jwtClaims.user_metadata
Rewrite each read individually. Do NOT do a blanket rename; in plain
JavaScript that leaves .id undefined with no error.
When finished there must be no remaining reference to `supabaseContext`.

STEP 6: VERIFY. Run the typecheck. Then, for every endpoint you listed in
step 1 as rejecting, confirm an unauthenticated request still returns 401 and
an authenticated one still returns 200. A passing typecheck does not prove
this; check it separately.

CONSTRAINTS
- Do NOT remove the `c.res = undefined` line in the Hono bridge or its comment.
  It looks redundant and is not: when a response-phase entry returns a new
  Response, Hono merges the previous response's headers over it, reverting
  anything the entry rewrote.
- On Hono, put a second entry array in its own sub-app mounted with
  app.route(). A second app.use() statement leaves c.var untyped.
- On NestJS, do not put withCors in the guard's array. CORS is
  app.enableCors().

REPORT, as a table: every adapter registration you found, its old `auth` value,
and whether the migrated version still rejects anonymous requests. Then list
every file you changed and anything you could not migrate.
```

## Notes

- Source: https://supabase.com/docs/reference/server/frameworks#moving-off-the-adapters (original: https://supabase.com/llms/server.txt, fetched 2026-10)
- Adapter removal date: December 1, 2026.
- The bridge download URLs (here and in the agent prompt) reference the `main` branch of `supabase/server` as in the official text, so they are not pinned to a release. The `curl --fail -o` only saves the file; review the downloaded bridge before using it.

## Related

- [frameworks](./frameworks.md)
- [adapters](./adapters.md)
- [middleware](./middleware.md)
