# Management API: シークレット管理

## エンドポイント一覧

| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/v1/projects/{ref}/secrets` | シークレット一覧取得 |
| POST | `/v1/projects/{ref}/secrets` | シークレット作成/更新 |
| DELETE | `/v1/projects/{ref}/secrets` | シークレット削除 |

## シークレット一覧取得

```
GET /v1/projects/{ref}/secrets
```

### パスパラメータ

| パラメータ | 説明 |
|-----------|------|
| `ref` | プロジェクト参照ID |

### レスポンス (200)

```json
[
  {
    "name": "MY_API_KEY",
    "value": "[hidden]"
  },
  {
    "name": "DATABASE_URL",
    "value": "[hidden]"
  },
  {
    "name": "STRIPE_SECRET_KEY",
    "value": "[hidden]"
  }
]
```

注意: セキュリティ上、値は `[hidden]` としてマスクされる場合がある。

## シークレット作成/更新

```
POST /v1/projects/{ref}/secrets
```

既存のシークレット名と同じ名前で POST すると、値が更新される。

### リクエストボディ

配列形式で複数のシークレットを一度に設定可能。

| パラメータ | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| `name` | string | はい | シークレット名 |
| `value` | string | はい | シークレット値 |

### リクエスト例（単一）

```bash
curl -X POST "https://api.supabase.com/v1/projects/<ref>/secrets" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '[
    {
      "name": "MY_API_KEY",
      "value": "sk-1234567890abcdef"
    }
  ]'
```

### リクエスト例（複数）

```bash
curl -X POST "https://api.supabase.com/v1/projects/<ref>/secrets" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '[
    {
      "name": "STRIPE_SECRET_KEY",
      "value": "sk_live_..."
    },
    {
      "name": "STRIPE_WEBHOOK_SECRET",
      "value": "whsec_..."
    },
    {
      "name": "SENDGRID_API_KEY",
      "value": "SG...."
    }
  ]'
```

### レスポンス (201)

成功時は空レスポンス。

## シークレット削除

```
DELETE /v1/projects/{ref}/secrets
```

### リクエストボディ

削除するシークレット名の配列。

```bash
curl -X DELETE "https://api.supabase.com/v1/projects/<ref>/secrets" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '["MY_API_KEY", "OLD_SECRET"]'
```

### レスポンス (200)

成功時は空レスポンス。

## Edge Functions からのシークレット参照

Edge Functions 内では、設定したシークレットを環境変数として参照できる。

```typescript
// Edge Function 内
const apiKey = Deno.env.get("MY_API_KEY");
const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
```

## 予約済みシークレット

以下のシークレットは Supabase が自動的に設定するため、手動で変更しないこと。

| 名前 | 説明 |
|------|------|
| `SUPABASE_URL` | プロジェクトURL |
| `SUPABASE_ANON_KEY` | 匿名キー |
| `SUPABASE_SERVICE_ROLE_KEY` | サービスロールキー |
| `SUPABASE_DB_URL` | データベースURL |

## 命名規則

- 大文字英数字とアンダースコアのみ使用推奨（`MY_SECRET_KEY`）
- 先頭は英字またはアンダースコア
- 最大長: 制限あり（プロジェクトごとの制限に従う）

## 関連

- [Edge Functions シークレット](../functions/secrets.md) — 環境変数管理
- [CLI project コマンド](../cli/project-commands.md) — CLI でのシークレット管理
