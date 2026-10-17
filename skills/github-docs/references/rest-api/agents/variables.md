# Agent Variables API

agents 用変数（Organization / リポジトリ単位）を管理するエンドポイント。シークレットと異なり値は平文で送受信され、取得時に値も返る。出典: https://docs.github.com/en/rest/agents/variables

## エンドポイント

### Organization 変数

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/orgs/{org}/agents/variables` | 変数一覧（値を含む） |
| POST | `/orgs/{org}/agents/variables` | 作成（201） |
| GET | `/orgs/{org}/agents/variables/{name}` | 単一変数取得 |
| PATCH | `/orgs/{org}/agents/variables/{name}` | 更新（204） |
| DELETE | `/orgs/{org}/agents/variables/{name}` | 削除（204） |
| GET | `/orgs/{org}/agents/variables/{name}/repositories` | 選択リポジトリ一覧（200 / 409） |
| PUT | `/orgs/{org}/agents/variables/{name}/repositories` | 選択リポジトリを置換（204 / 409） |
| PUT | `/orgs/{org}/agents/variables/{name}/repositories/{repository_id}` | 選択リポジトリを追加（204 / 409） |
| DELETE | `/orgs/{org}/agents/variables/{name}/repositories/{repository_id}` | 選択リポジトリを削除（204 / 409） |

### リポジトリ変数

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/repos/{owner}/{repo}/agents/organization-variables` | リポジトリと共有されている Organization 変数一覧 |
| GET | `/repos/{owner}/{repo}/agents/variables` | リポジトリ変数一覧 |
| POST | `/repos/{owner}/{repo}/agents/variables` | 作成（201） |
| GET | `/repos/{owner}/{repo}/agents/variables/{name}` | 単一変数取得 |
| PATCH | `/repos/{owner}/{repo}/agents/variables/{name}` | 更新（204） |
| DELETE | `/repos/{owner}/{repo}/agents/variables/{name}` | 削除（204） |

## 例

```curl
curl -L \
  -X POST \
  https://api.github.com/orgs/ORG/agents/variables \
  -d '{
  "name": "USERNAME",
  "value": "octocat",
  "visibility": "selected",
  "selected_repository_ids": [
    1296269,
    1296280
  ]
}'
```

## パラメータ

### 一覧クエリ（変数一覧）

| Name | Type | Default | Description |
|---|---|---|---|
| `per_page` | integer | `10` | 1 ページの件数（最大 30） |
| `page` | integer | `1` | ページ番号 |

### 一覧クエリ（選択リポジトリ一覧 `GET .../repositories`）

| Name | Type | Default | Description |
|---|---|---|---|
| `per_page` | integer | `30` | 1 ページの件数（最大 100） |
| `page` | integer | `1` | ページ番号 |

### 作成・更新ボディ

| Name | Type | Create | Update | Description |
|---|---|---|---|---|
| `name` | string | 必須 | 任意 | 変数名 |
| `value` | string | 必須 | 任意 | 変数の値 |
| `visibility` | string | 必須（Organization のみ） | 任意 | `all` / `private` / `selected` |
| `selected_repository_ids` | array of integers | 任意 | 任意 | `visibility` が `selected` のときのみ指定可 |

### リポジトリ変数ボディ

| Name | Type | Create | Update | Description |
|---|---|---|---|---|
| `name` | string | 必須 | 任意 | 変数名 |
| `value` | string | 必須 | 任意 | 変数の値 |

### 選択リポジトリ置換ボディ（`PUT .../repositories`）

| Name | Type | Required | Description |
|---|---|---|---|
| `selected_repository_ids` | array of integers | yes | 置換後の選択リポジトリ ID 一覧 |

### レスポンス

| Endpoint | Fields |
|---|---|
| 一覧 (200) | `total_count` と `variables` 配列。要素は `name` / `value` / `created_at` / `updated_at`。Organization 側は加えて `visibility` と `selected_repositories_url` |
| 選択リポジトリ一覧 (200) | `total_count` と `repositories`（Minimal Repository の配列） |

## 注意事項

- 全エンドポイントで `X-GitHub-Api-Version: 2026-03-10` を使用（原文ヘッダー注記）。curl 例は標準ヘッダーを省略している
- 認証: classic PAT / OAuth app トークンは Organization 系で `admin:org`（private リポジトリでは `repo` も）、リポジトリ系で `repo` スコープが必要。操作にはリポジトリへの collaborator アクセスが必要
- 選択リポジトリ系は visibility が `selected` でないと 409
- 変数一覧の `per_page` は最大 30・既定 10 で、secrets（最大 100・既定 30）と異なる
- Actions の変数 API は別パス（`/actions/variables`）で、本ページの `/agents/variables` とは別物

## Related

- [secrets.md](./secrets.md)
- [../actions/variables.md](../actions/variables.md)
