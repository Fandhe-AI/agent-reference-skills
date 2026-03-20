# Edge Functions シークレット管理

Edge Functions での環境変数とシークレットの管理方法。

## 概要

Edge Functions のシークレット（API キー、パスワード等）は `supabase secrets set` コマンドで設定し、関数内で `Deno.env.get()` で取得する。Supabase が自動的に設定するデフォルトの環境変数（`SUPABASE_URL`、`SUPABASE_ANON_KEY` 等）もある。ローカル開発では `.env.local` ファイルを使用する。

### デフォルトの環境変数

以下の環境変数は Supabase が自動的に設定するため、手動設定は不要。

| 環境変数 | 説明 |
|---|---|
| `SUPABASE_URL` | プロジェクトの API URL |
| `SUPABASE_ANON_KEY` | 匿名キー（RLS 適用） |
| `SUPABASE_SERVICE_ROLE_KEY` | サービスロールキー（RLS バイパス） |
| `SUPABASE_DB_URL` | データベース接続文字列 |

## コード例

### シークレットの設定

```bash
# 単一のシークレットを設定
supabase secrets set STRIPE_SECRET_KEY=sk_live_xxx

# 複数のシークレットを一括設定
supabase secrets set STRIPE_SECRET_KEY=sk_live_xxx RESEND_API_KEY=re_xxx

# .env ファイルから一括設定
supabase secrets set --env-file .env.production

# シークレットの一覧を確認
supabase secrets list

# シークレットを削除
supabase secrets unset STRIPE_SECRET_KEY
```

### 関数内でのシークレット取得

```typescript
Deno.serve(async (req: Request) => {
  // デフォルトの環境変数
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!
  const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

  // カスタムシークレット
  const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')
  const resendKey = Deno.env.get('RESEND_API_KEY')

  if (!stripeKey) {
    return new Response(
      JSON.stringify({ error: 'STRIPE_SECRET_KEY is not set' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    )
  }

  // シークレットを使った処理
  const response = await fetch('https://api.stripe.com/v1/charges', {
    headers: {
      'Authorization': `Bearer ${stripeKey}`,
    },
  })

  const data = await response.json()

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  })
})
```

### ローカル開発での .env.local

```bash
# supabase/.env.local（ローカル開発用）
STRIPE_SECRET_KEY=sk_test_xxx
RESEND_API_KEY=re_test_xxx
MY_CUSTOM_SECRET=my_value
```

```bash
# .env.local を使ってローカル実行
supabase functions serve --env-file supabase/.env.local
```

### .env ファイルを使ったシークレット管理

```bash
# .env.production（本番用シークレット）
STRIPE_SECRET_KEY=sk_live_xxx
RESEND_API_KEY=re_xxx
OPENAI_API_KEY=sk-xxx
```

```bash
# .env.production からシークレットを一括設定
supabase secrets set --env-file .env.production
```

### シークレットを利用した外部 API 連携

```typescript
import Stripe from 'https://esm.sh/stripe@14.14.0?target=deno'

Deno.serve(async (req: Request) => {
  const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
    apiVersion: '2023-10-16',
    httpClient: Stripe.createFetchHttpClient(),
  })

  const customers = await stripe.customers.list({ limit: 10 })

  return new Response(JSON.stringify(customers), {
    headers: { 'Content-Type': 'application/json' },
  })
})
```

## 注意点

- `.env.local` は `.gitignore` に追加してリポジトリにコミットしないこと
- `Deno.env.get()` は存在しない環境変数に対して `undefined` を返す（例外は投げない）
- シークレットの設定後、関数の再デプロイは不要（次回のリクエストから新しい値が反映される）
- デフォルト環境変数（`SUPABASE_URL` 等）は `supabase secrets set` で上書きしないこと
- `supabase secrets list` はシークレットの名前のみ表示し、値は表示されない
- ローカル実行時（`supabase functions serve`）は自動的にローカルの Supabase の URL・キーが設定される
- シークレット名にはアルファベット大文字、数字、アンダースコアを使用すること

## 関連

- [概要](./overview.md)
- [クイックスタート](./quickstart.md)
- [デプロイ](./deploy.md)
- [デバッグ](./debugging.md)
