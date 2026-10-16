# Edge Function

Create and invoke a Deno-based Edge Function that runs globally close to users.

```bash
# Create a new function
supabase functions new hello-world

# Serve all functions locally
supabase functions serve

# Deploy to production
supabase functions deploy hello-world
```

```typescript
// supabase/functions/hello-world/index.ts
Deno.serve(async (req: Request) => {
  const { name } = await req.json()

  return new Response(
    JSON.stringify({ message: `Hello ${name}!` }),
    { headers: { 'Content-Type': 'application/json' } }
  )
})
```

```typescript
// supabase/functions/with-db/index.ts — authenticated user, RLS-scoped client
import { withSupabase } from 'npm:@supabase/server@1'

export default {
  fetch: withSupabase({ auth: 'user' }, async (_req, ctx) => {
    const { supabase, supabaseAdmin, userClaims, jwtClaims, authMode } = ctx
    // supabase       — RLS-scoped to the authenticated user
    // supabaseAdmin  — bypasses RLS (service role)
    // userClaims     — user identity from JWT (id, email, role)
    // jwtClaims      — full JWT claims
    // authMode       — which auth mode matched

    // your business logic goes here
    return Response.json({ email: ctx.userClaims?.email })
  }),
}
```

```typescript
// Invoke from the browser using supabase-js
const { data, error } = await supabase.functions.invoke('hello-world', {
  body: { name: 'World' },
})
console.log(data.message) // "Hello World!"
```

```bash
# Store a secret for use inside functions
supabase secrets set OPENAI_API_KEY=sk-...

# Access it inside the function
Deno.env.get('OPENAI_API_KEY')
```

## Notes

- The function entry point is always `index.ts` inside the function's directory
- `withSupabase` accepts the `auth` modes `'user'`, `'secret'`, `'publishable'`, and `'none'`; pass an array such as `['user', 'secret']` to combine modes and read `ctx.authMode`
- `ctx.supabase` applies the caller's RLS policies; `ctx.supabaseAdmin` bypasses RLS, so filter by the caller's ID from `ctx.userClaims` or use `ctx.supabase`
- For a custom 401 response, use `createSupabaseContext(req, { auth: 'user' })` from `npm:@supabase/server@1` instead of `withSupabase`; it returns `{ data, error }` and `error.status` holds the HTTP status
- `@supabase/server` reads `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEYS`, `SUPABASE_SECRET_KEYS`, and `SUPABASE_JWKS`, which the platform and CLI provision; no need to add them as secrets
- Use `supabase functions serve --env-file .env.local` to load local secrets during development
