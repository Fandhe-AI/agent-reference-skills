# Edge Functions 認証・CORS 設定

Edge Functions における JWT 認証と CORS ヘッダーの設定方法。

## 概要

Edge Functions はデフォルトで JWT 検証が有効になっており、リクエストには有効な Authorization ヘッダーが必要。`supabase-js` の `functions.invoke()` はログイン済みユーザーのアクセストークンを自動的に付与する。ブラウザからの直接呼び出しでは CORS ヘッダーの設定が必要。`--no-verify-jwt` オプションで JWT 検証を無効化できる。

### JWT 検証の仕組み

1. クライアントが `Authorization: Bearer <JWT>` ヘッダーを付けてリクエスト
2. Edge Functions のゲートウェイが JWT を検証
3. 検証成功時のみ関数が実行される
4. 関数内で `req.headers.get('Authorization')` からトークンを取得可能

### CORS の設定パターン

ブラウザからの直接アクセスには CORS ヘッダーが必要。共通ヘッダーを `_shared/cors.ts` に定義して再利用する。

## コード例

### CORS 共通設定

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

### JWT からユーザー情報を取得

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

## 注意点

- デフォルトでは `anon` キーまたはログインユーザーの JWT が必要
- `--no-verify-jwt` を使う場合、関数内で独自の認証ロジックを実装すること（Webhook 受信時など）
- CORS の `Access-Control-Allow-Origin: '*'` は開発環境向け。本番では特定のオリジンを指定すること
- `OPTIONS` リクエスト（preflight）は JWT 検証をバイパスする
- `supabase-js` の `functions.invoke()` を使う場合、CORS 設定は不要（同一オリジン扱い）
- Service Role Key は秘密鍵であり、クライアント側には絶対に露出させない

## 関連

- [概要](./overview.md)
- [デプロイ](./deploy.md)
- [シークレット管理](./secrets.md)
- [データベースアクセス](./database-access.md)
