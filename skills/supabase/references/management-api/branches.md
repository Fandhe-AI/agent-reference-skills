# Management API: Database Branching

## 概要

Database Branching は、Git ブランチと同様にデータベースのブランチを作成・管理する機能。開発・テスト環境の分離に使用する。Pro プラン以上で利用可能。

## エンドポイント一覧

| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/v1/projects/{ref}/branches` | ブランチ一覧取得 |
| POST | `/v1/projects/{ref}/branches` | ブランチ作成 |
| GET | `/v1/branches/{branch_id}` | ブランチ詳細取得 |
| PATCH | `/v1/branches/{branch_id}` | ブランチ更新 |
| DELETE | `/v1/branches/{branch_id}` | ブランチ削除 |
| POST | `/v1/branches/{branch_id}/disable` | ブランチ一時停止 |
| POST | `/v1/branches/{branch_id}/reset` | ブランチリセット |

## ブランチ一覧取得

```
GET /v1/projects/{ref}/branches
```

### パスパラメータ

| パラメータ | 説明 |
|-----------|------|
| `ref` | プロジェクト参照ID |

### レスポンス (200)

```json
[
  {
    "id": "branch-id-uuid",
    "name": "feature/user-auth",
    "project_ref": "project-ref",
    "parent_project_ref": "parent-project-ref",
    "is_default": false,
    "git_branch": "feature/user-auth",
    "status": "ACTIVE_HEALTHY",
    "created_at": "2024-01-15T00:00:00.000Z",
    "updated_at": "2024-01-15T00:00:00.000Z"
  },
  {
    "id": "branch-id-uuid-2",
    "name": "main",
    "project_ref": "project-ref",
    "parent_project_ref": null,
    "is_default": true,
    "git_branch": "main",
    "status": "ACTIVE_HEALTHY",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
]
```

## ブランチ作成

```
POST /v1/projects/{ref}/branches
```

### リクエストボディ

| パラメータ | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| `branch_name` | string | はい | ブランチ名 |
| `git_branch` | string | いいえ | 紐付ける Git ブランチ名 |
| `region` | string | いいえ | リージョン（デフォルト: 親プロジェクトと同じ） |

### リクエスト例

```bash
curl -X POST "https://api.supabase.com/v1/projects/<ref>/branches" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "branch_name": "feature/user-auth",
    "git_branch": "feature/user-auth"
  }'
```

### レスポンス (201)

```json
{
  "id": "branch-id-uuid",
  "name": "feature/user-auth",
  "project_ref": "new-branch-project-ref",
  "parent_project_ref": "parent-project-ref",
  "is_default": false,
  "git_branch": "feature/user-auth",
  "status": "COMING_UP",
  "created_at": "2024-01-15T00:00:00.000Z",
  "updated_at": "2024-01-15T00:00:00.000Z"
}
```

## ブランチ詳細取得

```
GET /v1/branches/{branch_id}
```

### パスパラメータ

| パラメータ | 説明 |
|-----------|------|
| `branch_id` | ブランチID (UUID) |

### レスポンス (200)

```json
{
  "id": "branch-id-uuid",
  "name": "feature/user-auth",
  "project_ref": "branch-project-ref",
  "parent_project_ref": "parent-project-ref",
  "is_default": false,
  "git_branch": "feature/user-auth",
  "status": "ACTIVE_HEALTHY",
  "created_at": "2024-01-15T00:00:00.000Z",
  "updated_at": "2024-01-15T00:00:00.000Z"
}
```

## ブランチ更新

```
PATCH /v1/branches/{branch_id}
```

### リクエストボディ

| パラメータ | 型 | 説明 |
|-----------|-----|------|
| `branch_name` | string | ブランチ名 |
| `git_branch` | string | 紐付ける Git ブランチ名 |

### リクエスト例

```bash
curl -X PATCH "https://api.supabase.com/v1/branches/<branch_id>" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "branch_name": "feature/user-auth-v2",
    "git_branch": "feature/user-auth-v2"
  }'
```

## ブランチ削除

```
DELETE /v1/branches/{branch_id}
```

### パスパラメータ

| パラメータ | 説明 |
|-----------|------|
| `branch_id` | ブランチID (UUID) |

### レスポンス

- 200: 削除成功
- 404: ブランチ未検出
- 403: デフォルトブランチは削除不可

```bash
curl -X DELETE "https://api.supabase.com/v1/branches/<branch_id>" \
  -H "Authorization: Bearer <access_token>"
```

## ブランチ一時停止

```
POST /v1/branches/{branch_id}/disable
```

ブランチのデータベースを一時停止する。コスト削減のため未使用ブランチを停止する場合に使用。

```bash
curl -X POST "https://api.supabase.com/v1/branches/<branch_id>/disable" \
  -H "Authorization: Bearer <access_token>"
```

## ブランチリセット

```
POST /v1/branches/{branch_id}/reset
```

ブランチのデータベースをリセットし、親プロジェクトのマイグレーションを再適用する。

### リクエストボディ

| パラメータ | 型 | 説明 |
|-----------|-----|------|
| `migration_version` | string | リセット先のマイグレーションバージョン（省略時は全マイグレーション適用） |

```bash
curl -X POST "https://api.supabase.com/v1/branches/<branch_id>/reset" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

## ブランチステータス

| ステータス | 説明 |
|-----------|------|
| `ACTIVE_HEALTHY` | 正常稼働中 |
| `COMING_UP` | 起動中 |
| `GOING_DOWN` | 停止中 |
| `INACTIVE` | 一時停止中 |
| `INIT_FAILED` | 初期化失敗 |

## ワークフロー

1. **ブランチ作成**: Git ブランチに対応するデータベースブランチを作成
2. **開発**: ブランチ上でマイグレーションやスキーマ変更を行う
3. **テスト**: ブランチ環境で検証
4. **マージ/削除**: Git ブランチマージ後にデータベースブランチを削除

## 関連

- [Database Branching](../platform/branching.md) — Branching の概要
- [環境管理](../deployment/managing-environments.md) — 環境管理戦略
