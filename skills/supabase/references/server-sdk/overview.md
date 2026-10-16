# @supabase/server overview

`@supabase/server` is a framework-agnostic library for authenticating requests in server-side JavaScript environments.

## Signature / Usage

It verifies JWTs, resolves Supabase API keys, and creates pre-configured Supabase clients, exposing everything through a single `SupabaseContext` that is identical regardless of which adapter or primitive produced it.

Adapters for Hono, H3, Elysia, and NestJS are included (deprecated, see adapters.md). You can also compose the lower-level primitives directly for custom frameworks or edge runtimes.

For cookie-based sessions in SSR frameworks, use `@supabase/ssr` instead.

### Installing

Install `@supabase/server` via your package manager.

```sh
npm install @supabase/server
```

```sh
yarn add @supabase/server
```

```sh
pnpm add @supabase/server
```

`@supabase/server` is also published to JSR for Deno and Bun environments.

```sh
deno add jsr:@supabase/server
```

```sh
bunx jsr add @supabase/server
```

#### Optional peer dependencies on Deno

Some entry points rely on optional peer dependencies. `@supabase/server/middleware/postgres` and `@supabase/server/middleware/postgres-admin` need `pg`. Deno resolves an optional peer only when your own code imports it. A pin in `deno.json` alone is not enough: `deno check` passes and the function fails at startup with `Could not find package 'pg'`.

Add a bare import once, at the top of your entry module. No separate `deno add npm:pg` or `package.json` entry is needed. `deno info` lists `npm:/pg@...` once the package is in the module graph.

Deno 2.9 and later apply a minimum dependency age to npm packages. To use a release published the same day, pass `--minimum-dependency-age 0` to `deno check`.

```ts
import 'pg'
import { withPostgresClient } from '@supabase/server/middleware/postgres'
```

```sh
deno info index.ts | grep "npm:/pg@"
```

### Usage examples

Each example is a Fetch handler. Deno, Bun, and Supabase Edge Functions run the `export default { fetch }` shape as is. Cloudflare Workers also need the `nodejs_compat` flag or the `env` option, so `withSupabase` can read your project's URL and keys. On Node, use an adapter or the primitives with your framework.

#### Protect an endpoint with a user JWT

`withSupabase` wraps your handler. With `auth: 'user'`, it checks the caller's JWT before your handler runs. A request without valid credentials gets a JSON error response, and your handler never runs.

`withSupabase` also answers every `OPTIONS` request with `204` and adds CORS headers to every response. Set `cors: 'disabled'` when your framework handles CORS.

`ctx.supabase` is scoped to the caller, so Row Level Security policies apply. `ctx.supabaseAdmin` bypasses RLS. Use it only for work that needs full database access.

```ts
import { withSupabase } from '@supabase/server'

export default {
  fetch: withSupabase({ auth: 'user' }, async (_req, ctx) => {
    const { data } = await ctx.supabase.from('todos').select()
    return Response.json(data)
  }),
}
```

#### Serve a public endpoint

`auth: 'none'` lets every request through. `ctx.userClaims` is `null`, and `ctx.supabase` runs as an anonymous client.

Supabase Edge Functions check for a valid JWT on every request by default. For a function that uses `auth: 'none'`, `auth: 'publishable'`, or `auth: 'secret'`, turn that check off in `supabase/config.toml`. The `auth` setting on `withSupabase` then decides who gets in.

```ts
import { withSupabase } from '@supabase/server'

export default {
  fetch: withSupabase({ auth: 'none' }, async () => {
    return Response.json({ status: 'ok', time: new Date().toISOString() })
  }),
}
```

```toml
[functions.my-function]
verify_jwt = false
```

#### Build the context yourself

`createSupabaseContext` runs the same auth checks as `withSupabase` but returns `{ data, error }` instead of a response. Use it inside a framework route handler, or anywhere you want to shape the error response yourself.

On success, `data` is the same `SupabaseContext` that `withSupabase` passes to your handler. On failure, `error.status` holds the HTTP status to send. `createSupabaseContext` does not handle CORS.

```ts
import { createSupabaseContext } from '@supabase/server'

export default {
  fetch: async (req: Request) => {
    const { data: ctx, error } = await createSupabaseContext(req, { auth: 'user' })
    if (error) {
      return Response.json(error.toJSON(), { status: error.status })
    }

    const { data } = await ctx.supabase.from('todos').select()
    return Response.json(data)
  },
}
```

## Notes

- Source: https://supabase.com/docs/reference/server/introduction (original: https://supabase.com/llms/server.txt, fetched 2026-10)
- Which package to use: https://supabase.com/docs/guides/auth/choosing-a-server-package

## Related

- [frameworks](./frameworks.md)
- [middleware](./middleware.md)
- [primitives](./primitives.md)
- [types](./types.md)
- [errors](./errors.md)
