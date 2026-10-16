# Adapters (deprecated)

`@supabase/server/adapters/*` の framework adapter。deprecated で 2026-12-01 に削除される。原文 API リファレンスに載るのは Elysia adapter の `withSupabase` と `SupabaseError`。

## Signature / Usage

- Elysia plugin の `withSupabase` は `SupabaseContext` を作り route handler で使えるようにする。前の plugin が既に context を設定していればスキップする（route 単位の override 用）
- 認証失敗時は `SupabaseError` を throw する。`.status` は error 上に直接あり、元の `AuthError` は型付き `.cause` として取得できる。`onError` で `code === 'SupabaseError'` で判別する
- `SupabaseError` は `AuthError` を Elysia 互換エラーとして wrap する。Elysia adapter と同時に削除される
- 代替: framework integration guide の Elysia bridge（認証失敗を `Response` で返す）

## Usage

App 全体の認証（`.use()`）:

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

scoped `.use()` による route 単位の認証:

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

- 出典: https://supabase.com/llms/server.txt （Adapters 節、2026-10 取得）
- 原文: "Deprecated. Removed on December 1, 2026."（`SupabaseError` / Elysia `withSupabase` とも）
- adapter から bridge へ移行する際の認証 trap（`withClaims()` では 401 が無言の 200 になる）は `migrating-off-adapters.md` 参照
- トップレベルの `withSupabase(config, handler)`（`@supabase/server`）は deprecated ではない
- adapter 経由の `supabaseContext.userClaims` は bridge 移行後 `jwtClaims`（`.id` は `.sub`）に変わる

## Related

- [migrating-off-adapters](./migrating-off-adapters.md)
- [frameworks](./frameworks.md)
- [middleware](./middleware.md)
