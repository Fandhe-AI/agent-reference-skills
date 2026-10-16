# @supabase/server 概要

サーバーサイド JavaScript 環境でリクエストを認証するフレームワーク非依存ライブラリ。JWT 検証・API キー解決・設定済み Supabase クライアント生成を単一の `SupabaseContext` に集約する。

## Signature / Usage

- JWT を検証し、Supabase API キーを解決し、クライアントを事前構成して `SupabaseContext` として公開する。adapter / primitive のどちらで生成しても同一形状
- Hono / H3 / Elysia / NestJS 向け adapter が同梱される（deprecated、2026-12-01 削除。`adapters.md` / `migrating-off-adapters.md` 参照）。低レベル primitive を直接組み合わせてカスタムフレームワークや edge runtime にも使える
- Cookie ベースのセッションを使う SSR フレームワークでは `@supabase/server` ではなく `@supabase/ssr` を使う

## インストール

```sh
npm install @supabase/server
```

```sh
yarn add @supabase/server
```

```sh
pnpm add @supabase/server
```

### JSR（Deno / Bun）

```sh
deno add jsr:@supabase/server
```

```sh
bunx jsr add @supabase/server
```

### Deno の optional peer dependency

`@supabase/server/middleware/postgres` と `@supabase/server/middleware/postgres-admin` は `pg` を必要とする。Deno は自コードが import した場合のみ optional peer を解決するため、`deno.json` の pin だけでは不十分（`deno check` は通るが起動時に `Could not find package 'pg'` で失敗）。entry module の先頭に bare import を 1 つ置く。別途 `deno add npm:pg` や `package.json` 記載は不要。`deno info` で `npm:/pg@...` が出れば module graph に入っている。

Deno 2.9 以降は npm パッケージに minimum dependency age が適用される。公開当日のリリースを使うには `deno check` に `--minimum-dependency-age 0` を渡す。

```ts
import 'pg'
import { withPostgresClient } from '@supabase/server/middleware/postgres'
```

```sh
deno info index.ts | grep "npm:/pg@"
```

## 使用例

各例は Fetch handler。Deno / Bun / Supabase Edge Functions は `export default { fetch }` 形をそのまま実行する。Cloudflare Workers は `nodejs_compat` フラグか `env` option が必要（`withSupabase` がプロジェクト URL / キーを読むため）。Node では adapter か primitive をフレームワークと併用する。

### ユーザー JWT でエンドポイントを保護

`auth: 'user'` で handler 実行前に JWT を検証。無効な場合は JSON エラーレスポンスで handler は実行されない。`withSupabase` は全 `OPTIONS` に `204` を返し全レスポンスに CORS ヘッダーを付与する（フレームワーク側で CORS を扱う場合は `cors: 'disabled'`）。`ctx.supabase` は呼び出し元スコープで RLS 適用、`ctx.supabaseAdmin` は RLS をバイパスする。

```ts
import { withSupabase } from '@supabase/server'

export default {
  fetch: withSupabase({ auth: 'user' }, async (_req, ctx) => {
    const { data } = await ctx.supabase.from('todos').select()
    return Response.json(data)
  }),
}
```

### 公開エンドポイント

`auth: 'none'` は全リクエストを通す。`ctx.userClaims` は `null`、`ctx.supabase` は anonymous クライアント。Supabase Edge Functions は既定で全リクエストの JWT を検査するため、`auth: 'none'` / `'publishable'` / `'secret'` の関数では `supabase/config.toml` で無効化する。

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

### Context を自前で構築

`createSupabaseContext` は `withSupabase` と同じ認証検査を行い、レスポンスではなく `{ data, error }` を返す。失敗時は `error.status` に返すべき HTTP ステータスが入る。CORS は処理しない。

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

- 出典: https://supabase.com/docs/reference/server/introduction （原本 https://supabase.com/llms/server.txt、2026-10 取得）
- パッケージ選択の判断は https://supabase.com/docs/guides/auth/choosing-a-server-package

## Related

- [frameworks](./frameworks.md)
- [middleware](./middleware.md)
- [primitives](./primitives.md)
- [types](./types.md)
- [errors](./errors.md)
