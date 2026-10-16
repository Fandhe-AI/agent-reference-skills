# Edge Functions 認証・CORS 設定

Edge Functions の認証（`@supabase/server` の `withSupabase`）と CORS ヘッダーの設定方法。

## Signature / Usage

公式ガイド "Securing Edge Functions" は、関数が受け付ける資格情報を宣言する方式を採る。`@supabase/server` パッケージ（`npm:@supabase/server@1`）の `withSupabase` ラッパーが、設定した `auth` モードに従って各呼び出し元を検査し、ハンドラーには設定済みの Supabase client を `ctx` として渡す。

`verify_jwt = true`（既定）ではハンドラー実行前にプラットフォームが JWT を検証する。ユーザー向け関数では有効のままにすること（推奨）。開発中の 401 を消すために無効化すると、プラットフォームの検査がなくなり `withSupabase` だけが呼び出し元を検証することになる。`supabase-js` の `functions.invoke()` はログイン済みユーザーのアクセストークンを自動的に付与する。ブラウザからの直接呼び出しでは CORS ヘッダーの設定が必要。

### 認証モード

| Mode | Accepts |
| --- | --- |
| `'user'` | A valid user JWT on `Authorization` |
| `'secret'` | The `default` secret key on `apikey` |
| `'publishable'` | The `default` publishable key on `apikey` |
| `'none'` | Any caller, no check (for signed webhooks) |

- `'secret'` は名前が `default` の secret key のみ受け付ける。別のキーは `auth: 'secret:<name>'`、プロジェクト内の任意の secret key は `auth: 'secret:*'`。publishable も同じ書式（`'publishable:<name>'` / `'publishable:*'`）
- `'secret'`（service-to-service。cron / worker / `pg_net` / 他の Edge Function）は `verify_jwt` を無効化して使う。ハンドラーは `ctx.supabaseAdmin`（RLS をバイパス）を使える
- `'none'`（公開関数・署名付き Webhook）は `verify_jwt = false` と併用し、Webhook ではハンドラー内でプロバイダーの署名を検証する

```toml
[functions.health]
verify_jwt = false
```

### `auth: 'user'` と ctx

```ts
import { withSupabase } from 'npm:@supabase/server@1'

export default {
  fetch: withSupabase({ auth: 'user' }, async (_req, ctx) => {
    const { supabase, supabaseAdmin, userClaims, jwtClaims, authMode } = ctx
    // supabase       — RLS-scoped to the authenticated user
    // supabaseAdmin  — bypasses RLS (service role)
    // userClaims     — user identity from JWT (id, email, role)
    // jwtClaims      — full JWT claims
    // authMode       — which auth mode matched
    return Response.json({ email: ctx.userClaims?.email })
  }),
}
```

ログイン済み呼び出し元向けのハンドラーでは `ctx.supabase`（呼び出し元の RLS ポリシーが適用される）を使い、`ctx.supabaseAdmin` は RLS を越える必要がある処理にのみ使う。`ctx.supabaseAdmin` で共有テーブルを呼び出し元 ID で絞らずに照会すると全ユーザーの行が返る（`ctx.userClaims` の ID で絞るか `ctx.supabase` を使う）。

### モードの組み合わせ

`auth` に配列を渡すと、順に試して最初に一致したモードを使う。`ctx.authMode` で一致したモードを判別できる。

```ts
import { withSupabase } from 'npm:@supabase/server@1'

export default {
  fetch: withSupabase({ auth: ['user', 'secret'] }, async (req, ctx) => {
    if (ctx.authMode === 'user') {
      // ctx.supabase is scoped to the user
      return Response.json({ ok: true })
    }
    // ctx.supabaseAdmin bypasses RLS
    return Response.json({ ok: true })
  }),
}
```

### 独自の 401 レスポンス

`withSupabase` の代わりに `createSupabaseContext` を使うと `{ data, error }` を返すので、エラー応答を自分で組み立てられる。

```ts
import { createSupabaseContext } from 'npm:@supabase/server@1'

export default {
  fetch: async (req: Request) => {
    const { data: ctx, error } = await createSupabaseContext(req, { auth: 'user' })
    if (error) {
      return Response.json({ message: error.message, code: error.code }, { status: error.status })
    }
    return Response.json({ message: `hello ${ctx.userClaims?.email}` })
  },
}
```

### 環境変数

`@supabase/server` は標準の環境変数から設定を読む（Supabase Platform と CLI が自動設定）。

| Variable | What it is |
| --- | --- |
| `SUPABASE_URL` | Your project URL |
| `SUPABASE_PUBLISHABLE_KEYS` | Named publishable keys as a JSON object |
| `SUPABASE_SECRET_KEYS` | Named secret keys as a JSON object |
| `SUPABASE_JWKS` | JSON Web Key Set used to verify user JWTs |

CLI のローカル開発は単一キー構成のため、`SUPABASE_PUBLISHABLE_KEY` / `SUPABASE_SECRET_KEY` もフォールバックとして受け付ける。Node.js / Bun / Cloudflare Workers / セルフホスト Deno でも同じ変数で動作する。

### CORS の設定パターン

ブラウザからの直接アクセスには CORS ヘッダーが必要。v2.95.0 以降の `@supabase/supabase-js` では SDK から直接インポートする方法が推奨。古い環境では共通ヘッダーを `_shared/cors.ts` に定義して再利用する。

### CORS 共通設定（推奨: SDK からインポート、v2.95.0+）

```typescript
// supabase/functions/hello-world/index.ts
// SDK 側でヘッダーが追加されると自動的に同期される
import { corsHeaders } from '@supabase/supabase-js/cors'

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  // ...
})
```

### CORS 共通設定（レガシー: 手動定義）

```typescript
// supabase/functions/_shared/cors.ts
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}
```

### CORS 対応した関数

```typescript
// supabase/functions/hello-world/index.ts
import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req: Request) => {
  // CORS preflight リクエストの処理
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { name } = await req.json()

    const data = {
      message: `Hello ${name}!`,
    }

    return new Response(
      JSON.stringify(data),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
```

### JWT からユーザー情報を取得（以前のパターン）

`@supabase/server` 導入前の手動パターン。現行の公式ガイドは上記の `withSupabase` を中心に記述している。

```typescript
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

Deno.serve(async (req: Request) => {
  const authHeader = req.headers.get('Authorization')!

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    {
      global: {
        headers: { Authorization: authHeader },
      },
    },
  )

  // JWT からユーザーを取得
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } },
    )
  }

  return new Response(
    JSON.stringify({ user_id: user.id, email: user.email }),
    { headers: { 'Content-Type': 'application/json' } },
  )
})
```

### supabase-js からの呼び出し（自動トークン付与）

```typescript
// クライアント側
const { data, error } = await supabase.functions.invoke('hello-world', {
  body: { name: 'World' },
})
// Authorization ヘッダーが自動的に付与される
```

### Service Role Key での呼び出し

```typescript
// サーバーサイドでの管理者呼び出し
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

const { data, error } = await supabase.functions.invoke('admin-function', {
  body: { action: 'reset' },
})
```

## Notes

- 「JWT からユーザー情報を取得」の `createClient` + `Authorization` ヘッダーの手動パターンは以前の方式。現行の公式ガイドは `withSupabase` / `createSupabaseContext`（`npm:@supabase/server@1`）に置き換わっている
- `auth: 'none'` は全ての資格情報検査を無効化する。機密データを扱う関数ではハンドラー内で呼び出し元を自分で検証すること
- デフォルトでは `anon` キーまたはログインユーザーの JWT が必要
- `--no-verify-jwt` を使う場合、関数内で独自の認証ロジックを実装すること（Webhook 受信時など）
- CORS の `Access-Control-Allow-Origin: '*'` は開発環境向け。本番では特定のオリジンを指定すること
- `OPTIONS` リクエスト（preflight）は JWT 検証をバイパスする
- `supabase-js` の `functions.invoke()` を使う場合、CORS 設定は不要（同一オリジン扱い）
- Service Role Key は秘密鍵であり、クライアント側には絶対に露出させない

## Related

- [概要](./overview.md)
- [デプロイ](./deploy.md)
- [シークレット管理](./secrets.md)
- [データベースアクセス](./database-access.md)
