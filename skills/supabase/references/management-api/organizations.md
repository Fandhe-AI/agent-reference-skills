# Management API: 組織管理

## エンドポイント一覧

| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/v1/organizations` | 組織一覧取得 |
| POST | `/v1/organizations` | 組織作成 |
| GET | `/v1/organizations/{slug}` | 組織詳細取得 |
| GET | `/v1/organizations/{slug}/members` | メンバー一覧取得 |

## 組織一覧取得

```
GET /v1/organizations
```

### レスポンス (200)

```json
[
  {
    "id": "org-id-uuid",
    "name": "My Organization",
    "slug": "my-organization",
    "billing_email": "billing@example.com",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
]
```

## 組織作成

```
POST /v1/organizations
```

### リクエストボディ

| パラメータ | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| `name` | string | はい | 組織名 |

### リクエスト例

```bash
curl -X POST "https://api.supabase.com/v1/organizations" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Organization"
  }'
```

### レスポンス (201)

```json
{
  "id": "org-id-uuid",
  "name": "My Organization",
  "slug": "my-organization",
  "billing_email": "user@example.com",
  "created_at": "2024-01-01T00:00:00.000Z"
}
```

## 組織詳細取得

```
GET /v1/organizations/{slug}
```

### パスパラメータ

| パラメータ | 説明 |
|-----------|------|
| `slug` | 組織スラッグ |

### レスポンス (200)

```json
{
  "id": "org-id-uuid",
  "name": "My Organization",
  "slug": "my-organization",
  "billing_email": "billing@example.com",
  "created_at": "2024-01-01T00:00:00.000Z"
}
```

## メンバー一覧取得

```
GET /v1/organizations/{slug}/members
```

### パスパラメータ

| パラメータ | 説明 |
|-----------|------|
| `slug` | 組織スラッグ |

### レスポンス (200)

```json
[
  {
    "user_id": "user-id-uuid",
    "user_name": "John Doe",
    "email": "john@example.com",
    "role_id": 1,
    "role_name": "Owner",
    "mfa_enabled": true,
    "created_at": "2024-01-01T00:00:00.000Z"
  },
  {
    "user_id": "user-id-uuid-2",
    "user_name": "Jane Smith",
    "email": "jane@example.com",
    "role_id": 2,
    "role_name": "Administrator",
    "mfa_enabled": false,
    "created_at": "2024-02-01T00:00:00.000Z"
  }
]
```

## ロール

| ロールID | ロール名 | 説明 |
|---------|---------|------|
| 1 | Owner | 組織オーナー。全権限。組織削除可能 |
| 2 | Administrator | 管理者。プロジェクト管理・メンバー管理 |
| 3 | Developer | 開発者。プロジェクトの読み書き |
| 4 | Read only | 読み取り専用。プロジェクトの閲覧のみ |

### ロールの権限

| 操作 | Owner | Administrator | Developer | Read only |
|------|-------|--------------|-----------|-----------|
| 組織設定変更 | o | o | x | x |
| プロジェクト作成 | o | o | o | x |
| プロジェクト削除 | o | o | x | x |
| メンバー招待 | o | o | x | x |
| メンバー削除 | o | o | x | x |
| API キー閲覧 | o | o | o | o |
| DB 設定変更 | o | o | o | x |
| 組織削除 | o | x | x | x |

## 関連

- [プロジェクト管理](./projects.md) — プロジェクト CRUD
- [アクセス制御](../platform/access-control.md) — メンバー権限
