# Supabase CLI: Edge Functions コマンド

## supabase functions new

新しい Edge Function を作成する。`supabase/functions/<name>/` ディレクトリにテンプレートファイルが生成される。

```bash
supabase functions new <name>
```

### 引数

| 引数 | 説明 |
|------|------|
| `name` | 関数名（URL パスに使用される。ケバブケース推奨） |

### 使用例

```bash
supabase functions new hello-world
```

### 生成されるファイル

```
supabase/functions/
├── hello-world/
│   └── index.ts
└── _shared/          # 共有モジュール用（任意）
```

### 生成されるテンプレート

```typescript
// supabase/functions/hello-world/index.ts
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

Deno.serve(async (req) => {
  const { name } = await req.json()
  const data = {
    message: `Hello ${name}!`,
  }

  return new Response(
    JSON.stringify(data),
    { headers: { "Content-Type": "application/json" } },
  )
})
```

## supabase functions serve

Edge Functions をローカルで実行する。ホットリロード対応。

```bash
supabase functions serve
```

### フラグ

| フラグ | 説明 |
|-------|------|
| `--env-file <path>` | 環境変数ファイルのパス |
| `--no-verify-jwt` | JWT 検証を無効化 |
| `--import-map <path>` | Import Map ファイルのパス |
| `--inspect-mode <mode>` | デバッグモード（`brk`, `wait`） |

### 使用例

```bash
# 全関数をローカル実行
supabase functions serve

# JWT 検証を無効化（開発時）
supabase functions serve --no-verify-jwt

# 環境変数ファイルを指定
supabase functions serve --env-file ./supabase/.env.local

# Import Map 指定
supabase functions serve --import-map ./supabase/functions/import_map.json

# デバッグモード
supabase functions serve --inspect-mode brk
```

### ローカル実行時の呼び出し

```bash
# JWT 検証無効の場合
curl -X POST http://127.0.0.1:54321/functions/v1/hello-world \
  -H "Content-Type: application/json" \
  -d '{"name": "world"}'

# JWT 検証有効の場合（anon key 必要）
curl -X POST http://127.0.0.1:54321/functions/v1/hello-world \
  -H "Authorization: Bearer <anon-key>" \
  -H "Content-Type: application/json" \
  -d '{"name": "world"}'
```

### 環境変数ファイル

```env
# supabase/.env.local
MY_API_KEY=sk-1234567890
STRIPE_SECRET_KEY=sk_test_...
CUSTOM_VARIABLE=value
```

## supabase functions deploy

Edge Functions をリモートプロジェクトにデプロイする。

```bash
supabase functions deploy [function-name]
```

### フラグ

| フラグ | 説明 |
|-------|------|
| `--no-verify-jwt` | JWT 検証を無効化してデプロイ |
| `--import-map <path>` | Import Map ファイルのパス |
| `--project-ref <ref>` | プロジェクト参照ID |

### 使用例

```bash
# 特定の関数をデプロイ
supabase functions deploy hello-world

# 全関数をデプロイ
supabase functions deploy

# JWT 検証を無効化してデプロイ
supabase functions deploy hello-world --no-verify-jwt

# Import Map 付きでデプロイ
supabase functions deploy hello-world --import-map ./supabase/functions/import_map.json

# プロジェクト指定
supabase functions deploy hello-world --project-ref <ref>
```

### 出力例

```
Bundling Function hello-world...
Deploying Function hello-world...
Deployed Function hello-world.
Endpoint URL: https://<project-ref>.supabase.co/functions/v1/hello-world
```

## supabase functions delete

リモートの Edge Function を削除する。

```bash
supabase functions delete <function-name>
```

### フラグ

| フラグ | 説明 |
|-------|------|
| `--project-ref <ref>` | プロジェクト参照ID |

### 使用例

```bash
supabase functions delete hello-world
```

## supabase functions download

リモートの Edge Function をローカルにダウンロードする。

```bash
supabase functions download <function-name>
```

### フラグ

| フラグ | 説明 |
|-------|------|
| `--project-ref <ref>` | プロジェクト参照ID |

### 使用例

```bash
supabase functions download hello-world
```

ダウンロードされたファイルは `supabase/functions/<function-name>/` に保存される。

## Import Map

Deno の Import Map を使用して、外部モジュールのバージョンを管理できる。

### import_map.json

```json
{
  "imports": {
    "lodash/": "https://esm.sh/lodash@4.17.21/",
    "stripe": "https://esm.sh/stripe@13.0.0?target=deno",
    "@supabase/supabase-js": "https://esm.sh/@supabase/supabase-js@2"
  }
}
```

### 関数内での使用

```typescript
import { createClient } from "@supabase/supabase-js"
import Stripe from "stripe"
```

## 共有モジュール

`supabase/functions/_shared/` ディレクトリに共有コードを配置できる。

```
supabase/functions/
├── _shared/
│   ├── cors.ts
│   └── supabase-client.ts
├── hello-world/
│   └── index.ts
└── process-webhook/
    └── index.ts
```

### 共有モジュール例

```typescript
// supabase/functions/_shared/cors.ts
export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
}
```

### 関数からのインポート

```typescript
// supabase/functions/hello-world/index.ts
import { corsHeaders } from "../_shared/cors.ts"

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }
  // ...
})
```

## JWT 検証

| 設定 | 説明 |
|------|------|
| `--no-verify-jwt` 未指定 | JWT 検証有効（デフォルト）。`Authorization: Bearer <token>` ヘッダー必須 |
| `--no-verify-jwt` 指定 | JWT 検証無効。認証ヘッダー不要。Webhook 受信などに使用 |

JWT 検証有効時に使用可能なトークン:
- `anon` キー
- `service_role` キー
- ユーザーの JWT トークン

## 関連

- [Edge Functions デプロイ](../functions/deploy.md) — デプロイ設定
- [Edge Functions クイックスタート](../functions/quickstart.md) — 入門
- [CLI 概要](./overview.md) — CLI 基本設定
