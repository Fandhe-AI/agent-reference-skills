# Management API: Storage 設定管理

## エンドポイント一覧

| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/v1/projects/{ref}/config/storage` | Storage 設定取得 |
| PATCH | `/v1/projects/{ref}/config/storage` | Storage 設定更新 |
| GET | `/v1/projects/{ref}/storage/buckets` | バケット一覧取得 |
| POST | `/v1/projects/{ref}/storage/buckets` | バケット作成 |
| GET | `/v1/projects/{ref}/storage/buckets/{id}` | バケット詳細取得 |
| PUT | `/v1/projects/{ref}/storage/buckets/{id}` | バケット更新 |
| DELETE | `/v1/projects/{ref}/storage/buckets/{id}` | バケット削除 |

## Storage 設定取得

```
GET /v1/projects/{ref}/config/storage
```

### レスポンス (200)

```json
{
  "fileSizeLimit": 52428800,
  "features": {
    "imageTransformation": {
      "enabled": true
    }
  }
}
```

## Storage 設定更新

```
PATCH /v1/projects/{ref}/config/storage
```

### リクエストボディ

| パラメータ | 型 | 説明 |
|-----------|-----|------|
| `fileSizeLimit` | integer | 最大ファイルサイズ（バイト） |
| `features.imageTransformation.enabled` | boolean | 画像変換機能の有効/無効 |

### リクエスト例

```bash
curl -X PATCH "https://api.supabase.com/v1/projects/<ref>/config/storage" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "fileSizeLimit": 104857600
  }'
```

## バケット一覧取得

```
GET /v1/projects/{ref}/storage/buckets
```

### レスポンス (200)

```json
[
  {
    "id": "avatars",
    "name": "avatars",
    "public": true,
    "file_size_limit": 5242880,
    "allowed_mime_types": ["image/png", "image/jpeg"],
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  },
  {
    "id": "documents",
    "name": "documents",
    "public": false,
    "file_size_limit": null,
    "allowed_mime_types": null,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
]
```

## バケット作成

```
POST /v1/projects/{ref}/storage/buckets
```

### リクエストボディ

| パラメータ | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| `name` | string | はい | バケット名 |
| `id` | string | いいえ | バケットID（省略時は name と同じ） |
| `public` | boolean | いいえ | 公開バケットかどうか（デフォルト: false） |
| `file_size_limit` | integer | いいえ | ファイルサイズ上限（バイト） |
| `allowed_mime_types` | string[] | いいえ | 許可する MIME タイプ |

### リクエスト例

```bash
curl -X POST "https://api.supabase.com/v1/projects/<ref>/storage/buckets" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "avatars",
    "public": true,
    "file_size_limit": 5242880,
    "allowed_mime_types": ["image/png", "image/jpeg", "image/webp"]
  }'
```

### レスポンス (201)

```json
{
  "name": "avatars"
}
```

## バケット詳細取得

```
GET /v1/projects/{ref}/storage/buckets/{id}
```

### レスポンス (200)

```json
{
  "id": "avatars",
  "name": "avatars",
  "public": true,
  "file_size_limit": 5242880,
  "allowed_mime_types": ["image/png", "image/jpeg"],
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z"
}
```

## バケット更新

```
PUT /v1/projects/{ref}/storage/buckets/{id}
```

### リクエストボディ

| パラメータ | 型 | 説明 |
|-----------|-----|------|
| `public` | boolean | 公開設定 |
| `file_size_limit` | integer | ファイルサイズ上限（バイト） |
| `allowed_mime_types` | string[] | 許可 MIME タイプ |

### リクエスト例

```bash
curl -X PUT "https://api.supabase.com/v1/projects/<ref>/storage/buckets/avatars" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "public": false,
    "file_size_limit": 10485760
  }'
```

## バケット削除

```
DELETE /v1/projects/{ref}/storage/buckets/{id}
```

バケットを削除する前に、バケット内の全ファイルを削除する必要がある。

### レスポンス

- 200: 削除成功
- 400: バケットが空でない場合
- 404: バケット未検出

## バケットの公開/非公開

| 設定 | 説明 |
|------|------|
| `public: true` | 認証不要でファイルにアクセス可能。公開URL が使用可能 |
| `public: false` | 認証必須。署名付きURL またはダウンロード API を使用 |

## MIME タイプ制限

`allowed_mime_types` を設定すると、指定された MIME タイプのファイルのみアップロード可能になる。

```json
{
  "allowed_mime_types": [
    "image/png",
    "image/jpeg",
    "image/webp",
    "image/gif",
    "application/pdf"
  ]
}
```

`null` または未設定の場合、全ての MIME タイプが許可される。

## 関連

- [Storage 概要](../storage/overview.md) — Storage バケット管理
- [Management API 概要](./overview.md) — API 認証
