# Management API 概要

## ベースURL

```
https://api.supabase.com
```

## 認証

全てのリクエストに Bearer トークンが必要。

```
Authorization: Bearer <access_token>
```

### トークンの種類

| トークン種別 | 取得方法 | 用途 |
|-------------|---------|------|
| Personal Access Token | Supabase Dashboard > Account > Access Tokens | 個人利用・スクリプト・CI/CD |
| OAuth Token | OAuth 2.0 フロー | サードパーティアプリ連携 |

### Personal Access Token の生成

1. [Supabase Dashboard](https://supabase.com/dashboard/account/tokens) にアクセス
2. "Generate new token" をクリック
3. トークン名を入力して生成
4. 表示されたトークンを安全に保存（再表示不可）

### リクエスト例

```bash
curl -X GET "https://api.supabase.com/v1/projects" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json"
```

## レート制限

| 制限種別 | 値 |
|---------|-----|
| リクエスト/秒 | プランにより異なる |
| バースト制限 | あり |

レート制限に達した場合、`429 Too Many Requests` が返される。`Retry-After` ヘッダーに再試行までの秒数が含まれる。

## レスポンス形式

- Content-Type: `application/json`
- 成功: `2xx` ステータスコード
- エラー: `4xx` / `5xx` ステータスコード

### エラーレスポンス形式

```json
{
  "message": "エラーの説明"
}
```

### 一般的なステータスコード

| コード | 説明 |
|-------|------|
| 200 | 成功 |
| 201 | 作成成功 |
| 400 | リクエスト不正 |
| 401 | 認証エラー（トークン無効・期限切れ） |
| 403 | 権限不足 |
| 404 | リソース未検出 |
| 429 | レート制限超過 |
| 500 | サーバーエラー |

## API バージョニング

- 現在のバージョン: `v1`
- エンドポイントパスに含まれる: `/v1/projects`, `/v1/organizations` など

## 主要リソース

| リソース | パス | 説明 |
|---------|------|------|
| Projects | `/v1/projects` | プロジェクト管理 |
| Organizations | `/v1/organizations` | 組織管理 |
| Functions | `/v1/projects/{ref}/functions` | Edge Functions 管理 |
| Secrets | `/v1/projects/{ref}/secrets` | シークレット管理 |
| Database | `/v1/projects/{ref}/config/database` | DB 設定 |
| Auth Config | `/v1/projects/{ref}/config/auth` | 認証設定 |
| Storage | `/v1/projects/{ref}/config/storage` | Storage 設定 |
| Custom Domains | `/v1/projects/{ref}/custom-hostname` | カスタムドメイン |
| Branches | `/v1/projects/{ref}/branches` | データベースブランチ |
| Network | `/v1/projects/{ref}/network-restrictions` | ネットワーク制限 |
| SSL | `/v1/projects/{ref}/ssl-enforcement` | SSL 設定 |

## 関連

- [プロジェクト管理](./projects.md) — プロジェクト CRUD
- [CLI 概要](../cli/overview.md) — CLI によるプロジェクト管理
