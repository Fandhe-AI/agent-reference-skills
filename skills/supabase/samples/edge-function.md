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
// supabase/functions/with-db/index.ts — access the database
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

Deno.serve(async (req: Request) => {
  // Forward the user's JWT to enforce RLS
  const authHeader = req.headers.get('Authorization')!
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: authHeader } } }
  )

  const { data, error } = await supabase.from('todos').select('*')
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 })

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  })
})
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
- `SUPABASE_URL` and `SUPABASE_ANON_KEY` are automatically injected at runtime; no need to add them as secrets
- Pass the user's `Authorization` header to the client so RLS policies are enforced inside the function
- Use `supabase functions serve --env-file .env.local` to load local secrets during development
