# Which package to use

When to use supabase-js, @supabase/ssr, or @supabase/server on the server.

## Signature / Usage

When you use Supabase from JavaScript on the server, there are three packages to choose from. They are not alternatives to each other: `@supabase/ssr` and `@supabase/server` both build on top of `supabase-js` and solve different problems. These are JavaScript packages, not separate language SDKs.

The quickest way to decide is by how the user's identity reaches your code:

- The session lives in cookies (an SSR framework like Next.js or SvelteKit) → use `@supabase/ssr`.
- Auth arrives per request in headers (`Authorization: Bearer <jwt>`) → use `@supabase/server`.
- You want the base client, or you're handling auth yourself → use `@supabase/supabase-js` directly.

| Package | Use it when | Runs in | Auth model |
| --- | --- | --- | --- |
| `@supabase/supabase-js` | You want the base client, or you manage auth yourself | Browser and server | You wire up auth |
| `@supabase/ssr` | User sessions are stored in cookies | SSR frameworks (Next.js, SvelteKit, TanStack Start) | Cookie-based sessions, with refresh-token rotation |
| `@supabase/server` | Auth arrives per request in headers | Edge Functions, Workers, Vercel, Bun, and framework APIs (Hono, H3, Elysia, NestJS) | Stateless Bearer JWT + `apikey` |

### `@supabase/supabase-js`

The isomorphic base client. `@supabase/ssr` and `@supabase/server` both wrap it. Reach for `supabase-js` directly when you don't need either wrapper's auth handling.

```ts
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!)
```

### `@supabase/ssr`

For SSR frameworks that store the user's session in cookies. It reads and writes session cookies and handles refresh-token rotation, so the same user and session are available on both the client and the server.

```ts
import { createServerClient } from '@supabase/ssr'

const supabase = createServerClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_PUBLISHABLE_KEY!,
  {
    cookies: {
      getAll() {
        // return the request's cookies
      },
      setAll(cookiesToSet) {
        // write cookies back on the response
      },
    },
  }
)
```

### `@supabase/server`

For stateless, header-based auth in backend runtimes: Edge Functions, Workers, and framework APIs. You declare who may call an endpoint and receive a ready-to-use context (a caller-scoped client that respects RLS, plus an admin client). It verifies JWTs and resolves the new API keys (`SUPABASE_PUBLISHABLE_KEYS` / `SUPABASE_SECRET_KEYS`) for you.

```ts
import { withSupabase } from '@supabase/server'

export default {
  fetch: withSupabase({ auth: 'user' }, async (req, ctx) => {
    // ctx.supabase is scoped to the caller and respects RLS
    const { data } = await ctx.supabase.from('todos').select()
    return Response.json(data)
  }),
}
```

`@supabase/server` is also the package for MCP servers. Its `withOAuthProtectedResource` middleware handles OAuth discovery for MCP clients, and composed with `withSupabase({ auth: 'user' })` every tool call runs as the signed-in user.

## Notes

- `@supabase/ssr` and `@supabase/server` coexist and are not replacements for each other, and `@supabase/ssr` is not deprecated.
- Advanced: in a cookie-based framework you can compose the two. Let `@supabase/ssr` own the cookie session lifecycle and hand the resolved token to `@supabase/server`'s primitives. This requires more setup, and deeper first-party integration is on the roadmap (see the `@supabase/server` SSR frameworks guide, `docs/ssr-frameworks.md` in github.com/supabase/server).
- Source: https://supabase.com/docs/guides/auth/choosing-a-server-package (fetched 2026-10)

## Related

- [Server-side rendering](./server-side.md)
- [JWT structure](./jwts.md)
- [Auth overview](./overview.md)
