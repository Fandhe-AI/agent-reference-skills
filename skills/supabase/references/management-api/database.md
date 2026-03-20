# Management API: データベース設定

## エンドポイント一覧

| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/v1/projects/{ref}/config/database/postgres` | PostgreSQL 設定取得 |
| PUT | `/v1/projects/{ref}/config/database/postgres` | PostgreSQL 設定更新 |
| GET | `/v1/projects/{ref}/database/migrations` | マイグレーション一覧取得 |
| POST | `/v1/projects/{ref}/database/migrations` | マイグレーション作成 |
| GET | `/v1/projects/{ref}/types/typescript` | TypeScript 型生成 |

## PostgreSQL 設定取得

```
GET /v1/projects/{ref}/config/database/postgres
```

### パスパラメータ

| パラメータ | 説明 |
|-----------|------|
| `ref` | プロジェクト参照ID |

### レスポンス (200)

```json
{
  "max_connections": 100,
  "shared_buffers": "128MB",
  "effective_cache_size": "384MB",
  "maintenance_work_mem": "64MB",
  "work_mem": "4MB",
  "statement_timeout": "120s",
  "session_replication_role": "origin",
  "max_parallel_workers": 2,
  "max_parallel_workers_per_gather": 1,
  "max_worker_processes": 8
}
```

## PostgreSQL 設定更新

```
PUT /v1/projects/{ref}/config/database/postgres
```

### リクエストボディ

| パラメータ | 型 | 説明 |
|-----------|-----|------|
| `max_connections` | integer | 最大接続数 |
| `shared_buffers` | string | 共有バッファサイズ |
| `effective_cache_size` | string | キャッシュサイズ |
| `maintenance_work_mem` | string | メンテナンス作業メモリ |
| `work_mem` | string | 作業メモリ |
| `statement_timeout` | string | ステートメントタイムアウト |
| `max_parallel_workers` | integer | 最大並列ワーカー数 |
| `max_parallel_workers_per_gather` | integer | Gather あたりの最大並列ワーカー数 |
| `max_worker_processes` | integer | 最大ワーカープロセス数 |

### リクエスト例

```bash
curl -X PUT "https://api.supabase.com/v1/projects/<ref>/config/database/postgres" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "max_connections": 200,
    "statement_timeout": "60s"
  }'
```

### レスポンス (200)

更新後の設定が返される。

## マイグレーション一覧取得

```
GET /v1/projects/{ref}/database/migrations
```

### パスパラメータ

| パラメータ | 説明 |
|-----------|------|
| `ref` | プロジェクト参照ID |

### レスポンス (200)

```json
[
  {
    "version": "20240101000000",
    "name": "create_users_table",
    "statements": [
      "CREATE TABLE public.users (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL);"
    ]
  },
  {
    "version": "20240102000000",
    "name": "add_email_to_users",
    "statements": [
      "ALTER TABLE public.users ADD COLUMN email text;"
    ]
  }
]
```

## マイグレーション作成

```
POST /v1/projects/{ref}/database/migrations
```

### リクエストボディ

| パラメータ | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| `name` | string | はい | マイグレーション名 |
| `statements` | string[] | はい | SQL ステートメント |

### リクエスト例

```bash
curl -X POST "https://api.supabase.com/v1/projects/<ref>/database/migrations" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "create_posts_table",
    "statements": [
      "CREATE TABLE public.posts (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), title text NOT NULL, content text, created_at timestamptz DEFAULT now());"
    ]
  }'
```

## TypeScript 型生成

```
GET /v1/projects/{ref}/types/typescript
```

### パスパラメータ

| パラメータ | 説明 |
|-----------|------|
| `ref` | プロジェクト参照ID |

### クエリパラメータ

| パラメータ | 型 | 説明 |
|-----------|-----|------|
| `included_schemas` | string | 対象スキーマ（カンマ区切り。デフォルト: `public`） |

### レスポンス (200)

TypeScript 型定義ファイルの内容がテキストとして返される。

```typescript
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      countries: {
        Row: {
          id: number
          name: string
          capital: string | null
        }
        Insert: {
          id?: number
          name: string
          capital?: string | null
        }
        Update: {
          id?: number
          name?: string
          capital?: string | null
        }
      }
    }
    Views: { ... }
    Functions: { ... }
    Enums: { ... }
  }
}
```

### 使用例

```bash
curl -X GET "https://api.supabase.com/v1/projects/<ref>/types/typescript?included_schemas=public" \
  -H "Authorization: Bearer <access_token>" \
  > database.types.ts
```

## 関連

- [CLI db コマンド](../cli/db-commands.md) — CLI でのスキーマ管理
- [マイグレーション戦略](../deployment/database-migrations.md) — マイグレーション運用
- [型生成](../data-api/generating-types.md) — TypeScript 型生成
