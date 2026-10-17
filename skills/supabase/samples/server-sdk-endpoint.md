# Server SDK Endpoint

Protect or serve a Fetch-handler endpoint with `@supabase/server`, and bridge its middleware into Hono.

```ts
// Protect an endpoint with a user JWT
import { withSupabase } from '@supabase/server'

export default {
  fetch: withSupabase({ auth: 'user' }, async (_req, ctx) => {
    const { data } = await ctx.supabase.from('todos').select()
    return Response.json(data)
  }),
}
```

```ts
// Serve a public endpoint
import { withSupabase } from '@supabase/server'

export default {
  fetch: withSupabase({ auth: 'none' }, async () => {
    return Response.json({ status: 'ok', time: new Date().toISOString() })
  }),
}
```

```toml
# supabase/config.toml
[functions.my-function]
verify_jwt = false
```

```ts
// Hono bridge (copy hono/supabase-middleware.ts from the server repository's examples/frameworks into ./lib/)
import { Hono } from 'hono'
import { withRequiredClaims } from '@supabase/server/middleware/required-claims'
import { withSupabaseClient } from '@supabase/server/middleware/client'

import { toHono } from './lib/supabase-middleware.js'

const app = new Hono()
  .use('*', toHono([withRequiredClaims(), withSupabaseClient()]))
  .get('/todos', async (c) => {
    const { data, error } = await c.var.supabase.from('todos').select()
    if (error) return c.json({ error: error.message }, 500)
    return c.json(data)
  })
  .get('/me', (c) => c.json({ id: c.var.jwtClaims.sub }))

export default { fetch: app.fetch }
```

## Notes

- The framework adapters `@supabase/server/adapters/*` are deprecated and will be removed on December 1, 2026 (2026-12-01); use the bridge shown above. `withSupabase(config, handler)` itself is not deprecated
- Migrating an adapter `auth: 'user'` endpoint to `withClaims()` instead of `withRequiredClaims()` turns a 401 into a silent 200; use `withRequiredClaims()` to keep rejecting unauthenticated requests
- `withSupabase` answers `OPTIONS` with `204` and adds CORS headers; set `cors: 'disabled'` when the framework handles CORS
- In Hono, register the middleware with a chained `.use()` before the routes it gates so `c.var` is typed. For Edge Function auth see `edge-function.md`
- Source: https://supabase.com/docs/reference/server/introduction (original: https://supabase.com/llms/server.txt, `@supabase/server` 1.9.2, fetched 2026-10)
