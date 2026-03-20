# Management API: Edge Functions 管理

## エンドポイント一覧

| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/v1/projects/{ref}/functions` | 関数一覧取得 |
| POST | `/v1/projects/{ref}/functions` | 関数作成 |
| GET | `/v1/projects/{ref}/functions/{slug}` | 関数詳細取得 |
| PATCH | `/v1/projects/{ref}/functions/{slug}` | 関数更新 |
| DELETE | `/v1/projects/{ref}/functions/{slug}` | 関数削除 |
| GET | `/v1/projects/{ref}/functions/{slug}/body` | 関数ソースコード取得 |

## 関数一覧取得

```
GET /v1/projects/{ref}/functions
```

### パスパラメータ

| パラメータ | 説明 |
|-----------|------|
| `ref` | プロジェクト参照ID |

### レスポンス (200)

```json
[
  {
    "id": "function-id-uuid",
    "slug": "hello-world",
    "name": "hello-world",
    "status": "ACTIVE",
    "version": 1,
    "created_at": 1704067200,
    "updated_at": 1704067200,
    "verify_jwt": true,
    "import_map": false,
    "entrypoint_path": "index.ts"
  }
]
```

## 関数作成

```
POST /v1/projects/{ref}/functions
```

### リクエストボディ

| パラメータ | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| `slug` | string | はい | 関数スラッグ（URL パス名） |
| `name` | string | はい | 関数名 |
| `body` | string | はい | 関数のソースコード（base64 エンコード / マルチパート） |
| `verify_jwt` | boolean | いいえ | JWT 検証を有効化（デフォルト: true） |
| `import_map` | boolean | いいえ | import map を使用 |
| `entrypoint_path` | string | いいえ | エントリーポイントファイルパス |

### リクエスト例

```bash
curl -X POST "https://api.supabase.com/v1/projects/<ref>/functions" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "hello-world",
    "name": "hello-world",
    "verify_jwt": true
  }'
```

### レスポンス (201)

```json
{
  "id": "function-id-uuid",
  "slug": "hello-world",
  "name": "hello-world",
  "status": "ACTIVE",
  "version": 1,
  "created_at": 1704067200,
  "updated_at": 1704067200,
  "verify_jwt": true
}
```

## 関数詳細取得

```
GET /v1/projects/{ref}/functions/{slug}
```

### パスパラメータ

| パラメータ | 説明 |
|-----------|------|
| `ref` | プロジェクト参照ID |
| `slug` | 関数スラッグ |

### レスポンス (200)

```json
{
  "id": "function-id-uuid",
  "slug": "hello-world",
  "name": "hello-world",
  "status": "ACTIVE",
  "version": 3,
  "created_at": 1704067200,
  "updated_at": 1704153600,
  "verify_jwt": true,
  "import_map": false,
  "entrypoint_path": "index.ts"
}
```

## 関数更新（デプロイ）

```
PATCH /v1/projects/{ref}/functions/{slug}
```

### リクエストボディ

| パラメータ | 型 | 説明 |
|-----------|-----|------|
| `body` | string | 更新後のソースコード |
| `verify_jwt` | boolean | JWT 検証設定 |
| `import_map` | boolean | import map 使用設定 |
| `entrypoint_path` | string | エントリーポイントパス |

### リクエスト例

```bash
curl -X PATCH "https://api.supabase.com/v1/projects/<ref>/functions/hello-world" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "verify_jwt": false
  }'
```

### レスポンス (200)

```json
{
  "id": "function-id-uuid",
  "slug": "hello-world",
  "name": "hello-world",
  "status": "ACTIVE",
  "version": 4,
  "verify_jwt": false
}
```

## 関数削除

```
DELETE /v1/projects/{ref}/functions/{slug}
```

### パスパラメータ

| パラメータ | 説明 |
|-----------|------|
| `ref` | プロジェクト参照ID |
| `slug` | 関数スラッグ |

### レスポンス

- 200: 削除成功
- 404: 関数未検出

## 関数ソースコード取得

```
GET /v1/projects/{ref}/functions/{slug}/body
```

### パスパラメータ

| パラメータ | 説明 |
|-----------|------|
| `ref` | プロジェクト参照ID |
| `slug` | 関数スラッグ |

### レスポンス (200)

関数のソースコードがテキストとして返される。

## 関数ステータス

| ステータス | 説明 |
|-----------|------|
| `ACTIVE` | アクティブ（実行可能） |
| `REMOVED` | 削除済み |
| `THROTTLED` | スロットル中 |

## 関数呼び出し（実行）

Edge Functions の呼び出しは Management API ではなく、プロジェクトのエッジエンドポイントを使用する。

```bash
curl -X POST "https://<project-ref>.supabase.co/functions/v1/hello-world" \
  -H "Authorization: Bearer <anon-key-or-user-jwt>" \
  -H "Content-Type: application/json" \
  -d '{"name": "world"}'
```

## 関連

- [Edge Functions デプロイ](../functions/deploy.md) — CLI でのデプロイ
- [CLI functions コマンド](../cli/functions-commands.md) — CLI 操作
