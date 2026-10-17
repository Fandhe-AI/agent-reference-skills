# Agent Secrets API

agents 用シークレット（Organization / リポジトリ単位）を管理するエンドポイント。値は LibSodium で暗号化して送信し、取得時に暗号化値は返らない。出典: https://docs.github.com/en/rest/agents/secrets

## エンドポイント

### Organization シークレット

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/orgs/{org}/agents/secrets` | シークレット一覧（暗号化値は非表示） |
| GET | `/orgs/{org}/agents/secrets/public-key` | 暗号化用の公開鍵取得 |
| GET | `/orgs/{org}/agents/secrets/{secret_name}` | 単一シークレット取得 |
| PUT | `/orgs/{org}/agents/secrets/{secret_name}` | 作成または更新（201 作成 / 204 更新） |
| DELETE | `/orgs/{org}/agents/secrets/{secret_name}` | 削除（204） |
| GET | `/orgs/{org}/agents/secrets/{secret_name}/repositories` | visibility が selected の選択リポジトリ一覧 |
| PUT | `/orgs/{org}/agents/secrets/{secret_name}/repositories` | 選択リポジトリを置換（204） |
| PUT | `/orgs/{org}/agents/secrets/{secret_name}/repositories/{repository_id}` | 選択リポジトリを追加（204 / 409） |
| DELETE | `/orgs/{org}/agents/secrets/{secret_name}/repositories/{repository_id}` | 選択リポジトリを削除（204 / 409） |

### リポジトリシークレット

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/repos/{owner}/{repo}/agents/organization-secrets` | リポジトリと共有されている Organization シークレット一覧 |
| GET | `/repos/{owner}/{repo}/agents/secrets` | リポジトリシークレット一覧 |
| GET | `/repos/{owner}/{repo}/agents/secrets/public-key` | リポジトリ用公開鍵取得 |
| GET | `/repos/{owner}/{repo}/agents/secrets/{secret_name}` | 単一シークレット取得 |
| PUT | `/repos/{owner}/{repo}/agents/secrets/{secret_name}` | 作成または更新（201 / 204） |
| DELETE | `/repos/{owner}/{repo}/agents/secrets/{secret_name}` | 削除（204） |

## 例

```curl
curl -L \
  -X PUT \
  https://api.github.com/orgs/ORG/agents/secrets/SECRET_NAME \
  -d '{
  "encrypted_value": "c2VjcmV0",
  "key_id": "012345678912345678",
  "visibility": "selected",
  "selected_repository_ids": [
    1296269,
    1296280
  ]
}'
```

## パラメータ

### 共通クエリ

| Name | Type | Default | Description |
|---|---|---|---|
| `per_page` | integer | `30` | 1 ページの件数（最大 100） |
| `page` | integer | `1` | ページ番号 |

### 作成・更新ボディ

| Name | Type | Required | Description |
|---|---|---|---|
| `encrypted_value` | string | yes | 公開鍵で LibSodium 暗号化した値 |
| `key_id` | string | yes | 暗号化に使った鍵の ID |
| `visibility` | string | Organization のみ必須 | `all` / `private` / `selected` |
| `selected_repository_ids` | array of integers | no | `visibility` が `selected` のときのみ指定可 |

### 選択リポジトリ置換ボディ（`PUT .../repositories`）

| Name | Type | Required | Description |
|---|---|---|---|
| `selected_repository_ids` | array of integers | yes | 置換後の選択リポジトリ ID 一覧 |

### レスポンス

| Endpoint | Fields |
|---|---|
| 一覧 (200) | `total_count`（integer）と `secrets` 配列。Organization 一覧の要素は `name` / `created_at` / `updated_at` / `visibility`（`all` / `private` / `selected`）/ `selected_repositories_url`、リポジトリ側は `name` / `created_at` / `updated_at` |
| 公開鍵 (200) | `key_id`（必須）/ `key`（必須）/ `id` / `url` / `title` / `created_at` |
| 選択リポジトリ一覧 (200) | `total_count` と `repositories`（Minimal Repository の配列） |

## 注意事項

- 全エンドポイントで `X-GitHub-Api-Version: 2026-03-10` を使用（原文ヘッダー注記）。curl 例は標準ヘッダーを省略している
- 認証: classic PAT / OAuth app トークンは Organization 系で `admin:org`（private リポジトリでは `repo` も）、リポジトリ系で `repo` スコープが必要。操作にはリポジトリへの collaborator アクセスが必要
- 選択リポジトリの追加・削除は visibility が `selected` でないと 409
- 暗号化手順は公式の "Encrypting secrets for the REST API" を参照
- Actions のシークレット API は別パス（`/actions/secrets`）で、本ページの `/agents/secrets` とは別物

## Related

- [variables.md](./variables.md)
- [../actions/secrets.md](../actions/secrets.md)
