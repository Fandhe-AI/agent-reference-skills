# Adapters (deprecated)

Framework adapters under `@supabase/server/adapters/*`. Deprecated; removed on December 1, 2026. The API reference lists the Elysia adapter's `withSupabase` and `SupabaseError`.

## Signature / Usage

- `withSupabase` (Elysia plugin) creates a SupabaseContext and makes it available in route handlers. Skips if a previous plugin already set the context, enabling route-level overrides.
- Throws a `SupabaseError` on auth failure. `.status` is on the error directly; the original `AuthError` is available as the typed `.cause`. Discriminate in `onError` via `code === 'SupabaseError'`.
- `SupabaseError` wraps an AuthError as an Elysia-compatible error.
- Replacement: the Elysia bridge from the framework integration guide answers auth failures with a `Response` instead.

App-wide auth via `.use()`:

```ts
import { Elysia } from 'elysia'
import { withSupabase } from '@supabase/server/adapters/elysia'

const app = new Elysia()
  .use(withSupabase({ auth: 'user' }))
  .get('/games', async ({ supabaseContext }) => {
    const { data } = await supabaseContext.supabase.from('favorite_games').select()
    return data
  })

app.listen(3000)
```

Per-route auth via scoped `.use()`:

```ts
import { Elysia } from 'elysia'
import { withSupabase } from '@supabase/server/adapters/elysia'

const app = new Elysia()
  .get('/health', () => ({ status: 'ok' }))
  .group('/api', (app) =>
    app
      .use(withSupabase({ auth: 'user' }))
      .get('/profile', async ({ supabaseContext }) => {
        return supabaseContext.userClaims
      })
  )

app.listen(3000)
```

## Notes

- Source: https://supabase.com/llms/server.txt (Adapters section, fetched 2026-10)
- Both `SupabaseError` and the Elysia `withSupabase` are marked "Deprecated. Removed on December 1, 2026." in the source.
- For the auth trap when moving from an adapter to a bridge (`withClaims()` turns a 401 into a silent 200), see migrating-off-adapters.md.
- The top-level `withSupabase(config, handler)` from `@supabase/server` is not deprecated.
- `supabaseContext.userClaims` through an adapter becomes `jwtClaims` (`.id` becomes `.sub`) after migrating to a bridge.

## Related

- [migrating-off-adapters](./migrating-off-adapters.md)
- [frameworks](./frameworks.md)
- [middleware](./middleware.md)
