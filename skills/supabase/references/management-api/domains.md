# Management API: カスタムドメイン・Vanity Subdomain

## カスタムドメイン

### エンドポイント一覧

| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/v1/projects/{ref}/custom-hostname` | カスタムホスト名取得 |
| POST | `/v1/projects/{ref}/custom-hostname/initialize` | カスタムホスト名初期化 |
| POST | `/v1/projects/{ref}/custom-hostname/reverify` | DNS 検証の再実行 |
| POST | `/v1/projects/{ref}/custom-hostname/activate` | カスタムホスト名有効化 |
| DELETE | `/v1/projects/{ref}/custom-hostname` | カスタムホスト名削除 |

### カスタムホスト名取得

```
GET /v1/projects/{ref}/custom-hostname
```

#### レスポンス (200)

```json
{
  "status": "ACTIVE",
  "custom_hostname": "api.example.com",
  "data": {
    "custom_hostname": "api.example.com",
    "hostname": "<project-ref>.supabase.co",
    "ssl": {
      "status": "active"
    },
    "ownership_verification": {
      "type": "txt",
      "name": "_cf-custom-hostname.api.example.com",
      "value": "verification-token-here"
    }
  }
}
```

#### ステータス

| ステータス | 説明 |
|-----------|------|
| `ACTIVE` | アクティブ（使用可能） |
| `REMOVED` | 削除済み |
| `1_INITIATED` | 初期化済み（DNS 設定待ち） |
| `2_OWNERSHIP_VERIFIED` | 所有権検証済み |
| `3_ORIGIN_SETUP_COMPLETED` | オリジン設定完了 |

### カスタムホスト名初期化

```
POST /v1/projects/{ref}/custom-hostname/initialize
```

#### リクエストボディ

| パラメータ | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| `custom_hostname` | string | はい | カスタムドメイン名 |

#### リクエスト例

```bash
curl -X POST "https://api.supabase.com/v1/projects/<ref>/custom-hostname/initialize" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "custom_hostname": "api.example.com"
  }'
```

#### レスポンス (201)

```json
{
  "status": "1_INITIATED",
  "custom_hostname": "api.example.com",
  "data": {
    "ownership_verification": {
      "type": "txt",
      "name": "_cf-custom-hostname.api.example.com",
      "value": "verification-token-here"
    }
  }
}
```

### DNS 設定手順

1. **TXT レコード追加**: 所有権検証用
   - 名前: `_cf-custom-hostname.api.example.com`
   - 値: レスポンスの `ownership_verification.value`

2. **CNAME レコード追加**: トラフィック転送用
   - 名前: `api.example.com`
   - 値: `<project-ref>.supabase.co`

### DNS 検証の再実行

```
POST /v1/projects/{ref}/custom-hostname/reverify
```

DNS 設定後に検証を再実行する。

```bash
curl -X POST "https://api.supabase.com/v1/projects/<ref>/custom-hostname/reverify" \
  -H "Authorization: Bearer <access_token>"
```

### カスタムホスト名有効化

```
POST /v1/projects/{ref}/custom-hostname/activate
```

DNS 検証成功後にカスタムホスト名を有効化する。

```bash
curl -X POST "https://api.supabase.com/v1/projects/<ref>/custom-hostname/activate" \
  -H "Authorization: Bearer <access_token>"
```

### カスタムホスト名削除

```
DELETE /v1/projects/{ref}/custom-hostname
```

```bash
curl -X DELETE "https://api.supabase.com/v1/projects/<ref>/custom-hostname" \
  -H "Authorization: Bearer <access_token>"
```

## Vanity Subdomain

### エンドポイント一覧

| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/v1/projects/{ref}/vanity-subdomain` | Vanity Subdomain 取得 |
| POST | `/v1/projects/{ref}/vanity-subdomain` | Vanity Subdomain 作成 |
| DELETE | `/v1/projects/{ref}/vanity-subdomain` | Vanity Subdomain 削除 |
| POST | `/v1/projects/{ref}/vanity-subdomain/check-availability` | 利用可能性チェック |

### Vanity Subdomain とは

デフォルトの `<project-ref>.supabase.co` の代わりに、カスタムサブドメイン `<custom-name>.supabase.co` を使用できる機能。Pro プラン以上で利用可能。

### 利用可能性チェック

```
POST /v1/projects/{ref}/vanity-subdomain/check-availability
```

#### リクエストボディ

| パラメータ | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| `vanity_subdomain` | string | はい | 希望するサブドメイン名 |

#### リクエスト例

```bash
curl -X POST "https://api.supabase.com/v1/projects/<ref>/vanity-subdomain/check-availability" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "vanity_subdomain": "my-cool-app"
  }'
```

#### レスポンス (200)

```json
{
  "available": true
}
```

### Vanity Subdomain 作成

```
POST /v1/projects/{ref}/vanity-subdomain
```

#### リクエストボディ

| パラメータ | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| `vanity_subdomain` | string | はい | サブドメイン名 |

#### リクエスト例

```bash
curl -X POST "https://api.supabase.com/v1/projects/<ref>/vanity-subdomain" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "vanity_subdomain": "my-cool-app"
  }'
```

### Vanity Subdomain 取得

```
GET /v1/projects/{ref}/vanity-subdomain
```

#### レスポンス (200)

```json
{
  "status": "ACTIVE",
  "custom_domain": "my-cool-app.supabase.co"
}
```

### Vanity Subdomain 削除

```
DELETE /v1/projects/{ref}/vanity-subdomain
```

削除後、デフォルトの `<project-ref>.supabase.co` に戻る。

## 関連

- [カスタムドメイン](../platform/custom-domains.md) — ダッシュボードでの設定
- [Management API 概要](./overview.md) — API 認証
