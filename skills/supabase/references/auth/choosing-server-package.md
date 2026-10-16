# サーバー用パッケージの選択

サーバー上で `@supabase/supabase-js` / `@supabase/ssr` / `@supabase/server` のどれを使うかの判断基準。

## Signature / Usage

JavaScript からサーバー側で Supabase を使う場合、3 つのパッケージがある。互いに代替ではなく、`@supabase/ssr` と `@supabase/server` はどちらも `supabase-js` の上に構築され、解決する問題が異なる。他言語（Python / Swift / Kotlin 等）の SDK ではなく、いずれも JavaScript パッケージ。

判断はユーザー ID がコードへどう届くかで決める。

- セッションが **Cookie** にある（Next.js / SvelteKit 等の SSR フレームワーク）→ `@supabase/ssr`
- 認証がリクエストごとに **ヘッダー**（`Authorization: Bearer <jwt>`）で届く → `@supabase/server`
- ベースクライアントが欲しい、または認証を自前で扱う → `@supabase/supabase-js`

| Package | Use it when | Runs in | Auth model |
| --- | --- | --- | --- |
| `@supabase/supabase-js` | ベースクライアントが欲しい / 認証を自前管理 | Browser and server | You wire up auth |
| `@supabase/ssr` | セッションが Cookie に保存される | SSR frameworks (Next.js, SvelteKit, TanStack Start) | Cookie-based sessions, with refresh-token rotation |
| `@supabase/server` | 認証がリクエストごとにヘッダーで届く | Edge Functions, Workers, Vercel, Bun, and framework APIs (Hono, H3, Elysia, NestJS) | Stateless Bearer JWT + `apikey` |

### `@supabase/server`

ヘッダーベースのステートレス認証向け。エンドポイントの呼び出し可能者を宣言すると、呼び出し元スコープのクライアント（RLS 適用）と admin クライアントを含むコンテキストを受け取る。JWT の検証と新 API キー（`SUPABASE_PUBLISHABLE_KEYS` / `SUPABASE_SECRET_KEYS`）の解決も行う。MCP サーバー用でもあり、`withOAuthProtectedResource` ミドルウェアが MCP クライアント向けの OAuth discovery を処理し、`withSupabase({ auth: 'user' })` と合成すると各ツール呼び出しがサインイン中ユーザーとして実行される。

### コード例

```ts
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!)
```

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

## Notes

- `@supabase/ssr` と `@supabase/server` は共存し、互いの置き換えではない。`@supabase/ssr` は非推奨ではない（公式明記）
- Cookie ベースのフレームワークで両者を合成することも可能。`@supabase/ssr` が Cookie セッションのライフサイクルを持ち、解決済みトークンを `@supabase/server` のプリミティブへ渡す。設定は増え、より深い公式統合はロードマップ上（公式ガイド: `@supabase/server` の `docs/ssr-frameworks.md`）
- 出典: https://supabase.com/docs/guides/auth/choosing-a-server-package（取得日 2026-10）

## Related

- [サーバーサイド認証（SSR）](./server-side.md)
- [JWT 構造](./jwts.md)
- [Auth 概要](./overview.md)
