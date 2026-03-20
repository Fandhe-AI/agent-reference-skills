# Management API: ネットワーク制限・SSL 設定

## ネットワーク制限

### エンドポイント一覧

| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/v1/projects/{ref}/network-restrictions` | ネットワーク制限取得 |
| POST | `/v1/projects/{ref}/network-restrictions/apply` | ネットワーク制限適用 |

### ネットワーク制限取得

```
GET /v1/projects/{ref}/network-restrictions
```

#### パスパラメータ

| パラメータ | 説明 |
|-----------|------|
| `ref` | プロジェクト参照ID |

#### レスポンス (200)

```json
{
  "config": {
    "dbAllowedCidrs": [
      "0.0.0.0/0"
    ],
    "dbAllowedCidrsV6": [
      "::/0"
    ]
  },
  "status": "APPLIED",
  "old_config": null
}
```

### ネットワーク制限適用

```
POST /v1/projects/{ref}/network-restrictions/apply
```

#### リクエストボディ

| パラメータ | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| `dbAllowedCidrs` | string[] | はい | 許可する IPv4 CIDR ブロック |
| `dbAllowedCidrsV6` | string[] | いいえ | 許可する IPv6 CIDR ブロック |

#### リクエスト例（特定IPのみ許可）

```bash
curl -X POST "https://api.supabase.com/v1/projects/<ref>/network-restrictions/apply" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "dbAllowedCidrs": [
      "203.0.113.0/24",
      "198.51.100.0/24"
    ]
  }'
```

#### リクエスト例（全IP許可 = 制限なし）

```bash
curl -X POST "https://api.supabase.com/v1/projects/<ref>/network-restrictions/apply" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "dbAllowedCidrs": ["0.0.0.0/0"],
    "dbAllowedCidrsV6": ["::/0"]
  }'
```

#### レスポンス (201)

```json
{
  "config": {
    "dbAllowedCidrs": [
      "203.0.113.0/24",
      "198.51.100.0/24"
    ]
  },
  "status": "APPLIED"
}
```

#### ステータス

| ステータス | 説明 |
|-----------|------|
| `APPLIED` | 制限が適用済み |
| `APPLYING` | 適用中 |

### CIDR 表記例

| CIDR | 説明 |
|------|------|
| `0.0.0.0/0` | 全 IPv4 アドレス（制限なし） |
| `::/0` | 全 IPv6 アドレス（制限なし） |
| `203.0.113.10/32` | 単一 IP アドレス |
| `203.0.113.0/24` | 203.0.113.0 ~ 203.0.113.255 (256個) |
| `10.0.0.0/8` | 10.0.0.0 ~ 10.255.255.255 |

## SSL 設定

### エンドポイント一覧

| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/v1/projects/{ref}/ssl-enforcement` | SSL 強制設定取得 |
| PUT | `/v1/projects/{ref}/ssl-enforcement` | SSL 強制設定更新 |

### SSL 強制設定取得

```
GET /v1/projects/{ref}/ssl-enforcement
```

#### レスポンス (200)

```json
{
  "currentConfig": {
    "database": true
  },
  "appliedSuccessfully": true
}
```

### SSL 強制設定更新

```
PUT /v1/projects/{ref}/ssl-enforcement
```

#### リクエストボディ

| パラメータ | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| `requestedConfig.database` | boolean | はい | DB接続にSSLを強制するか |

#### リクエスト例（SSL 強制有効化）

```bash
curl -X PUT "https://api.supabase.com/v1/projects/<ref>/ssl-enforcement" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "requestedConfig": {
      "database": true
    }
  }'
```

#### リクエスト例（SSL 強制無効化）

```bash
curl -X PUT "https://api.supabase.com/v1/projects/<ref>/ssl-enforcement" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "requestedConfig": {
      "database": false
    }
  }'
```

#### レスポンス (200)

```json
{
  "currentConfig": {
    "database": true
  },
  "appliedSuccessfully": true
}
```

## ネットワークバン

### エンドポイント一覧

| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/v1/projects/{ref}/network-bans` | バンされた IP 一覧取得 |
| DELETE | `/v1/projects/{ref}/network-bans` | IP バン解除 |

### バンされた IP 一覧取得

```
GET /v1/projects/{ref}/network-bans
```

#### レスポンス (200)

```json
{
  "banned_ipv4_addresses": [
    "192.0.2.1",
    "198.51.100.50"
  ]
}
```

### IP バン解除

```
DELETE /v1/projects/{ref}/network-bans
```

#### リクエストボディ

| パラメータ | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| `ipv4_addresses` | string[] | はい | バン解除する IP アドレス |

#### リクエスト例

```bash
curl -X DELETE "https://api.supabase.com/v1/projects/<ref>/network-bans" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "ipv4_addresses": ["192.0.2.1"]
  }'
```

## セキュリティ推奨事項

- **本番環境**: ネットワーク制限を設定し、必要な IP のみ許可
- **SSL 強制**: 本番環境では常に有効化推奨
- **ネットワークバン**: 不審なアクセスを検出した場合に自動バンされる。正当なIPがバンされた場合は手動解除

## 関連

- [ネットワーク制限](../platform/network.md) — プラットフォーム設定
- [SSL とネットワーク](../security/ssl-and-network.md) — セキュリティ設定
