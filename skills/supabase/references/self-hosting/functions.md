# Edge Functions ランタイム（Self-Hosting）

## 概要

自己ホスティング環境での Edge Functions は、Deno ベースのリレーサーバーとして動作する。Supabase の Edge Runtime を使用する。

## Deno Relay サーバー

### Docker Compose での設定

```yaml
functions:
  image: supabase/edge-runtime:v1.x.x
  restart: unless-stopped
  depends_on:
    - analytics
  environment:
    JWT_SECRET: ${JWT_SECRET}
    SUPABASE_URL: http://kong:8000
    SUPABASE_ANON_KEY: ${ANON_KEY}
    SUPABASE_SERVICE_ROLE_KEY: ${SERVICE_ROLE_KEY}
    SUPABASE_DB_URL: postgresql://postgres:${POSTGRES_PASSWORD}@db:5432/postgres
    VERIFY_JWT: ${FUNCTIONS_VERIFY_JWT:-true}
  volumes:
    - ./volumes/functions:/home/deno/functions:Z
  command:
    - start
    - --main-service
    - /home/deno/functions/main
```

### 環境変数

| 変数 | 説明 | デフォルト |
|------|------|-----------|
| JWT_SECRET | JWT 検証用シークレット | 必須 |
| SUPABASE_URL | 内部 API URL | 必須 |
| SUPABASE_ANON_KEY | Anon キー | 必須 |
| SUPABASE_SERVICE_ROLE_KEY | Service Role キー | 必須 |
| SUPABASE_DB_URL | データベース接続 URL | 必須 |
| VERIFY_JWT | JWT 検証の有効/無効 | true |

## デプロイ方法

### ファイル配置

Edge Functions を `volumes/functions/` ディレクトリに配置する。

```
volumes/
  functions/
    main/
      index.ts           # メインルーター
    hello-world/
      index.ts           # 個別の関数
    send-email/
      index.ts
```

### メインルーター

```typescript
// volumes/functions/main/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

serve(async (req: Request) => {
  const url = new URL(req.url)
  const path = url.pathname

  // パスに基づいて関数をルーティング
  if (path === '/hello-world') {
    const mod = await import('../hello-world/index.ts')
    return mod.default(req)
  }

  return new Response('Not Found', { status: 404 })
})
```

### 関数の例

```typescript
// volumes/functions/hello-world/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req: Request) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    {
      global: {
        headers: { Authorization: req.headers.get('Authorization')! },
      },
    }
  )

  const { data, error } = await supabase.from('posts').select('*').limit(10)

  return new Response(JSON.stringify({ data, error }), {
    headers: { 'Content-Type': 'application/json' },
  })
})
```

### 関数の更新

ファイルを更新後、コンテナを再起動する。

```bash
# 関数コンテナのみ再起動
docker compose restart functions

# または全体を再起動
docker compose up -d
```

## Kong での API ルーティング

Kong の設定で Edge Functions へのルーティングを追加する。

```yaml
# volumes/api/kong.yml
_format_version: "2.1"

services:
  - name: functions-v1
    url: http://functions:9000
    routes:
      - name: functions-v1-all
        strip_path: true
        paths:
          - /functions/v1/
    plugins:
      - name: cors
```

### アクセス方法

```bash
# 外部からのアクセス
curl -i \
  -H "Authorization: Bearer ${ANON_KEY}" \
  "http://localhost:8000/functions/v1/hello-world"
```

## シークレットの管理

自己ホスティング環境では、シークレットは環境変数として Docker Compose で渡す。

```yaml
functions:
  environment:
    MY_API_KEY: ${MY_API_KEY}
    EXTERNAL_SERVICE_URL: ${EXTERNAL_SERVICE_URL}
```

```bash
# .env
MY_API_KEY=your-api-key
EXTERNAL_SERVICE_URL=https://api.external.com
```

## ベストプラクティス

- 関数ファイルはバージョン管理に含める
- 各関数は独立したディレクトリに配置する
- シークレットは `.env` ファイルで管理し、バージョン管理に含めない
- 本番環境では VERIFY_JWT を true にする
- ヘルスチェックを設定する
- ログを外部サービスに転送する

## 関連

- [Edge Functions 概要](../functions/overview.md) — Edge Functions アーキテクチャ
- [Docker セットアップ](./docker.md) — Docker Compose 設定
