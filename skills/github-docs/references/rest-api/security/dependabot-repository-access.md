# Dependabot Repository Access API

Organization（および Enterprise）で Dependabot がアクセスできるリポジトリの一覧取得・更新と、既定のアクセスレベル設定を行うエンドポイント。

公式ドキュメント: https://docs.github.com/en/rest/dependabot/repository-access

## エンドポイント

### Organization

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/orgs/{org}/dependabot/repository-access` | Dependabot がアクセスできるリポジトリ一覧取得 |
| PATCH | `/orgs/{org}/dependabot/repository-access` | アクセス可能リポジトリリストの更新（追加・削除） |
| PUT | `/orgs/{org}/dependabot/repository-access/default-level` | 既定のアクセスレベル設定 |

### Enterprise

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/enterprises/{enterprise}/dependabot/repository-access` | Enterprise 内で Dependabot がアクセスできるリポジトリ一覧取得 |
| PATCH | `/enterprises/{enterprise}/dependabot/repository-access` | アクセス可能リポジトリリストの更新 |
| PUT | `/enterprises/{enterprise}/dependabot/repository-access/default-level` | 既定のアクセスレベル設定 |

## 例

```curl
curl -L \
  -X PUT \
  https://api.github.com/orgs/ORG/dependabot/repository-access/default-level \
  -d '{
  "default_level": "public"
}'
```

## パラメータ

| パラメータ | 型 | 対象 | 説明 |
|---|---|---|---|
| `org` | string (path, 必須) | Organization | Organization 名（大文字小文字は区別しない） |
| `enterprise` | string (path, 必須) | Enterprise | Enterprise 名の slug |
| `page` | integer (query) | GET | ページ番号。既定 `1` |
| `per_page` | integer (query) | GET | 1 ページの件数。既定 `30` |
| `repository_ids_to_add` | array of integers (body) | PATCH | 追加するリポジトリ ID |
| `repository_ids_to_remove` | array of integers (body) | PATCH | 削除するリポジトリ ID |
| `default_level` | string (body, 必須) | PUT default-level | `public` または `internal` |

PATCH のリクエストボディ例:

```json
{
  "repository_ids_to_add": [123, 456],
  "repository_ids_to_remove": [789]
}
```

## レスポンス

- GET: 200。スキーマは `default_level`（`public` / `internal` / `null`）と `accessible_repositories`（object の配列）
- PATCH / PUT: 204 No Content
- 共通エラー: 403 Forbidden、404 Resource not found

## 注意事項

- `default_level` の意味: `public` は公開リポジトリのみ（非公開リポジトリは明示的に許可した場合を除く）、`internal` は公開と internal リポジトリ（private は明示的に許可した場合を除く）にアクセスできる
- Enterprise 系エンドポイントは Enterprise owner のみ利用可能
- Organization 系はサーバー間（server-to-server）・ユーザー間（user-to-server）の両アクセスに対応し、権限のないユーザーにはエンドポイントの存在が見えない
- Organization の PATCH / PUT は OAuth app トークンと personal access token (classic) に `write:org` スコープが必要
- 公式ドキュメントの標準ヘッダー: `Authorization: Bearer <YOUR-TOKEN>`、`Accept: application/vnd.github+json`、`X-GitHub-Api-Version: 2026-03-10`（上記 curl 例では省略）
- Dependabot シークレットは別 API（`dependabot-secrets.md`）

## Related

- [dependabot-secrets.md](./dependabot-secrets.md)
- [dependabot-alerts.md](./dependabot-alerts.md)
