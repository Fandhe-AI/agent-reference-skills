# Edge Functions クイックスタート

Edge Functions の作成からデプロイまでの基本的な手順。

## 概要

Supabase CLI を使って Edge Functions を新規作成し、ローカルで開発・テストし、本番環境にデプロイする。`supabase functions new` で雛形生成、`supabase functions serve` でローカル開発サーバー起動、`supabase functions deploy` で本番デプロイを行う。

### 前提条件

- Supabase CLI（v1.50.0 以上）がインストール済み
- Deno がインストール済み（ローカル開発用）
- Supabase プロジェクトが作成済み

### 手順

1. **プロジェクト初期化**（未実施の場合）

```bash
supabase init
```

2. **関数の新規作成**

```bash
supabase functions new hello-world
```

`supabase/functions/hello-world/index.ts` が生成される。

3. **ローカルで実行**

```bash
supabase start  # ローカル Supabase を起動
supabase functions serve
```

ローカルサーバーが `http://localhost:54321/functions/v1/hello-world` で起動する。

4. **デプロイ**

```bash
supabase functions deploy hello-world
```

## コード例

```typescript
// supabase/functions/hello-world/index.ts
Deno.serve(async (req: Request) => {
  const { name } = await req.json()

  const data = {
    message: `Hello ${name}!`,
  }

  return new Response(
    JSON.stringify(data),
    { headers: { 'Content-Type': 'application/json' } },
  )
})
```

### cURL でのテスト

```bash
# ローカル
curl -i --location --request POST \
  'http://localhost:54321/functions/v1/hello-world' \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' \
  --header 'Content-Type: application/json' \
  --data '{"name":"World"}'

# 本番
curl -i --location --request POST \
  'https://<project-ref>.supabase.co/functions/v1/hello-world' \
  --header 'Authorization: Bearer <ANON_KEY>' \
  --header 'Content-Type: application/json' \
  --data '{"name":"World"}'
```

### supabase-js からの呼び出し

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://<project-ref>.supabase.co',
  '<ANON_KEY>'
)

const { data, error } = await supabase.functions.invoke('hello-world', {
  body: { name: 'World' },
})

console.log(data) // { message: 'Hello World!' }
```

## 注意点

- `supabase functions serve` はすべての関数をまとめて起動する（個別関数の指定も可能）
- ローカル実行時は `.env.local` ファイルから環境変数を読み込む
- `supabase functions serve --env-file .env.local` で env ファイルを明示的に指定可能
- 関数名はディレクトリ名がそのまま使われる（ケバブケース推奨）
- `index.ts` が関数のエントリポイントとなる

## 関連

- [概要](./overview.md)
- [デプロイ](./deploy.md)
- [シークレット管理](./secrets.md)
- [デバッグ](./debugging.md)
