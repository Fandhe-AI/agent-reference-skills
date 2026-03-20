# Management API: プロジェクト管理

## エンドポイント一覧

| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/v1/projects` | プロジェクト一覧取得 |
| POST | `/v1/projects` | プロジェクト作成 |
| GET | `/v1/projects/{ref}` | プロジェクト詳細取得 |
| DELETE | `/v1/projects/{ref}` | プロジェクト削除 |
| GET | `/v1/projects/{ref}/api-keys` | API キー取得 |
| PATCH | `/v1/projects/{ref}` | プロジェクト更新 |

## プロジェクト一覧取得

```
GET /v1/projects
```

### レスポンス (200)

```json
[
  {
    "id": "project-id-uuid",
    "organization_id": "org-id-uuid",
    "name": "My Project",
    "region": "ap-northeast-1",
    "created_at": "2024-01-01T00:00:00.000Z",
    "database": {
      "host": "db.<project-ref>.supabase.co",
      "version": "15.1.0.117"
    },
    "status": "ACTIVE_HEALTHY"
  }
]
```

### プロジェクトステータス

| ステータス | 説明 |
|-----------|------|
| `ACTIVE_HEALTHY` | 正常稼働中 |
| `INACTIVE` | 非アクティブ（一時停止） |
| `INIT_FAILED` | 初期化失敗 |
| `COMING_UP` | 起動中 |
| `GOING_DOWN` | 停止中 |
| `RESTORING` | 復元中 |
| `UNKNOWN` | 不明 |

## プロジェクト作成

```
POST /v1/projects
```

### リクエストボディ

| パラメータ | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| `name` | string | はい | プロジェクト名 |
| `organization_id` | string | はい | 組織ID |
| `region` | string | はい | リージョン |
| `plan` | string | いいえ | プラン (`free`, `pro`) |
| `db_pass` | string | はい | データベースパスワード |
| `kps_enabled` | boolean | いいえ | KPS 有効化 |

### 利用可能リージョン

| リージョン値 | 場所 |
|-------------|------|
| `ap-northeast-1` | 東京 |
| `ap-northeast-2` | ソウル |
| `ap-southeast-1` | シンガポール |
| `ap-southeast-2` | シドニー |
| `ap-south-1` | ムンバイ |
| `us-east-1` | バージニア |
| `us-west-1` | 北カリフォルニア |
| `eu-west-1` | アイルランド |
| `eu-west-2` | ロンドン |
| `eu-central-1` | フランクフルト |
| `ca-central-1` | カナダ |
| `sa-east-1` | サンパウロ |

### リクエスト例

```bash
curl -X POST "https://api.supabase.com/v1/projects" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My New Project",
    "organization_id": "org-id-uuid",
    "region": "ap-northeast-1",
    "plan": "free",
    "db_pass": "secure-password-here"
  }'
```

### レスポンス (201)

```json
{
  "id": "project-id-uuid",
  "organization_id": "org-id-uuid",
  "name": "My New Project",
  "region": "ap-northeast-1",
  "created_at": "2024-01-01T00:00:00.000Z",
  "database": {
    "host": "db.<project-ref>.supabase.co",
    "version": "15.1.0.117"
  },
  "status": "COMING_UP"
}
```

## プロジェクト詳細取得

```
GET /v1/projects/{ref}
```

### パスパラメータ

| パラメータ | 説明 |
|-----------|------|
| `ref` | プロジェクト参照ID |

### レスポンス (200)

```json
{
  "id": "project-id-uuid",
  "organization_id": "org-id-uuid",
  "name": "My Project",
  "region": "ap-northeast-1",
  "created_at": "2024-01-01T00:00:00.000Z",
  "database": {
    "host": "db.<project-ref>.supabase.co",
    "version": "15.1.0.117"
  },
  "status": "ACTIVE_HEALTHY"
}
```

## プロジェクト削除

```
DELETE /v1/projects/{ref}
```

### パスパラメータ

| パラメータ | 説明 |
|-----------|------|
| `ref` | プロジェクト参照ID |

### レスポンス

- 200: 削除成功
- 404: プロジェクト未検出

## API キー取得

```
GET /v1/projects/{ref}/api-keys
```

### パスパラメータ

| パラメータ | 説明 |
|-----------|------|
| `ref` | プロジェクト参照ID |

### レスポンス (200)

```json
[
  {
    "name": "anon",
    "api_key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  {
    "name": "service_role",
    "api_key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
]
```

### キーの種類

| キー名 | 説明 | 用途 |
|--------|------|------|
| `anon` | 匿名キー | クライアントサイド。RLS により保護 |
| `service_role` | サービスロールキー | サーバーサイド。RLS をバイパス。秘密にすること |

## プロジェクト更新

```
PATCH /v1/projects/{ref}
```

### リクエストボディ

| パラメータ | 型 | 説明 |
|-----------|-----|------|
| `name` | string | プロジェクト名 |

### リクエスト例

```bash
curl -X PATCH "https://api.supabase.com/v1/projects/<ref>" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Project Name"
  }'
```

## 関連

- [Management API 概要](./overview.md) — 認証・ベースURL
- [組織管理](./organizations.md) — 組織の管理
- [リージョン](../platform/regions.md) — リージョン一覧
