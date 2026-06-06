# Client Setup

Initialize the Supabase JavaScript client with environment variables and optional TypeScript types.

```typescript
import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

// Basic client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Typed client (after generating types with CLI)
const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Server-side client (disable session persistence)
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)
```

```bash
# Generate TypeScript types from your project
npx supabase gen types typescript --project-id your-project-id > database.types.ts

# Or from local dev environment
npx supabase gen types typescript --local > database.types.ts
```

## Notes

- Use `anon` key on the client side and protect data with RLS policies
- Never expose `service_role` key in client-side code; use it only in server environments
- For Next.js App Router, use `@supabase/ssr` with `createBrowserClient` / `createServerClient` instead
- The typed client enables full type inference for all `.from()` queries
